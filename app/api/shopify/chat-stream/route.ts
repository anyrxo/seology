/**
 * API Route: Shopify Chat with Streaming
 *
 * Next.js 14 App Router streaming implementation with Server-Sent Events
 * Uses streaming responses for real-time AI chat with progressive rendering
 *
 * FEATURES:
 * - Server-Sent Events (SSE) for streaming responses
 * - Rate limiting with enhanced middleware
 * - Smart caching with Next.js cache tags
 * - Optimized database queries with parallel fetching
 * - Credit tracking with optimistic updates
 * - Comprehensive error handling
 */

import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'
import { rateLimit, RateLimits, ClaudeRateLimiter } from '@/lib/rate-limiter'
import { consumeCredit, hasAvailableCredits, getRemainingCredits } from '@/lib/credits'
import { unstable_cache } from 'next/cache'

export const runtime = 'nodejs' // Use Node.js runtime for streaming
export const dynamic = 'force-dynamic'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface RecentIssue {
  type: string
  title: string
  severity: string
  pageUrl: string | null
}

interface RecentFix {
  type: string
  description: string
  appliedAt: Date | null
}

interface StoreContext {
  recentIssues: RecentIssue[]
  recentFixes: RecentFix[]
  productCount: number
}

interface SSEData {
  type: string
  message?: string
  content?: string
  timestamp?: number
  credits?: {
    used: number
    limit: number
    remaining: number
  }
  code?: string
}

/**
 * Cached store context fetcher with Next.js 14 cache tags
 * Revalidates when store data changes
 */
const getCachedStoreContext = unstable_cache(
  async (connectionId: string): Promise<StoreContext> => {
    const [recentIssues, recentFixes, productCount] = await Promise.all([
      db.issue.findMany({
        where: {
          connectionId,
          status: 'DETECTED',
        },
        take: 5,
        orderBy: {
          detectedAt: 'desc',
        },
        select: {
          type: true,
          title: true,
          severity: true,
          pageUrl: true,
        },
      }),
      db.fix.findMany({
        where: {
          connectionId,
          status: 'APPLIED',
        },
        take: 5,
        orderBy: {
          appliedAt: 'desc',
        },
        select: {
          type: true,
          description: true,
          appliedAt: true,
        },
      }),
      db.shopifyProduct.count({
        where: {
          connectionId,
        },
      }),
    ])

    return {
      recentIssues,
      recentFixes,
      productCount,
    }
  },
  ['store-context'],
  {
    revalidate: 300, // Cache for 5 minutes
    tags: [`store-context`],
  }
)

/**
 * Build system context for Claude with cached data
 */
function buildSystemContext(
  shop: string,
  executionMode: string,
  context: StoreContext
): string {
  const modeDescription = {
    AUTOMATIC: 'All SEO fixes are applied instantly without approval',
    PLAN: 'Fixes are grouped into plans for batch approval',
    APPROVE: 'Each fix requires individual approval before being applied',
  }[executionMode] || 'Unknown mode'

  return `You are SEOLOGY.AI's SEO assistant, helping Shopify store owners optimize their products and store for search engines.

Store Context:
- Shop: ${shop}
- Products: ${context.productCount} products in store
- Execution Mode: ${executionMode} (${modeDescription})
- Recent Issues Found: ${context.recentIssues.length} active issues
- Recent Fixes Applied: ${context.recentFixes.length} fixes

${
  context.recentIssues.length > 0
    ? `Active Issues:\n${context.recentIssues.map((issue) => `- ${issue.title} (${issue.severity})`).join('\n')}`
    : ''
}

${
  context.recentFixes.length > 0
    ? `Recent Fixes:\n${context.recentFixes
        .map((fix) => `- ${fix.description} (${fix.appliedAt ? new Date(fix.appliedAt).toLocaleDateString() : 'N/A'})`)
        .join('\n')}`
    : ''
}

Your role:
1. Answer SEO questions clearly and actionably
2. Provide specific recommendations for Shopify stores
3. Explain technical concepts in simple terms
4. Reference the user's actual issues and fixes when relevant
5. Encourage them to use SEOLOGY's automation features

Guidelines:
- Be friendly and encouraging
- Keep responses concise (2-3 paragraphs max)
- Use bullet points for lists
- Provide actionable next steps
- Don't make up information - if you don't know, say so
- Don't promise features that don't exist
- Reference SEOLOGY's execution modes when discussing automation`
}

/**
 * Create Server-Sent Events encoder
 */
function createSSEEncoder() {
  return new TextEncoder()
}

/**
 * Format SSE message
 */
function formatSSE(data: SSEData, event?: string): string {
  const lines = []
  if (event) {
    lines.push(`event: ${event}`)
  }
  lines.push(`data: ${JSON.stringify(data)}`)
  lines.push('\n')
  return lines.join('\n')
}

/**
 * POST handler with streaming support
 */
export async function POST(req: NextRequest) {
  const encoder = createSSEEncoder()
  let stream: ReadableStream<Uint8Array>
  let controller: ReadableStreamDefaultController<Uint8Array>

  try {
    const { shop, messages } = await req.json()

    // Validation
    if (!shop) {
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: 'MISSING_SHOP', message: 'Shop parameter required' }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: 'INVALID_MESSAGES', message: 'Messages array required' }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Find connection with optimized query
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            id: true,
            executionMode: true,
            plan: true,
          },
        },
      },
    })

    if (!connection) {
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: 'NO_CONNECTION', message: 'Shop not connected' }
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Rate limiting - use Claude-specific rate limit
    try {
      await rateLimit(connection.userId, RateLimits.CLAUDE_API)
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many AI chat requests. Please try again in a minute.'
          }
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      )
    }

    // Credit check
    const hasCredits = await hasAvailableCredits(connection.userId)
    if (!hasCredits) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INSUFFICIENT_CREDITS',
            message: 'You have reached your monthly AI chat limit. Please upgrade your plan or wait until next month.',
          },
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get cached store context (parallel fetching)
    const storeContext = await getCachedStoreContext(connection.id)

    // Build system context
    const systemContext = buildSystemContext(
      shop,
      connection.user.executionMode || 'PLAN',
      storeContext
    )

    // Wait for Claude API slot (rate limiting)
    await ClaudeRateLimiter.waitForSlot(connection.userId)

    // Create streaming response
    stream = new ReadableStream({
      async start(ctrl) {
        controller = ctrl

        try {
          // Send initial connection event
          controller.enqueue(
            encoder.encode(
              formatSSE({ type: 'connected', message: 'AI assistant connected' }, 'status')
            )
          )

          // Convert messages to Claude format
          const claudeMessages: Anthropic.MessageParam[] = messages.map((msg: ChatMessage) => ({
            role: msg.role,
            content: msg.content,
          }))

          // Stream from Claude API
          const claudeStream = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            system: systemContext,
            messages: claudeMessages,
            stream: true,
          })

          let fullResponse = ''

          // Stream chunks to client
          for await (const event of claudeStream) {
            if (event.type === 'content_block_delta') {
              if (event.delta.type === 'text_delta') {
                const chunk = event.delta.text
                fullResponse += chunk

                // Send chunk to client
                controller.enqueue(
                  encoder.encode(
                    formatSSE({
                      type: 'chunk',
                      content: chunk,
                      timestamp: Date.now()
                    }, 'message')
                  )
                )
              }
            }
          }

          // Consume credit after successful response
          const updatedCredits = await consumeCredit(connection.userId)

          // Log to audit log (fire and forget - don't block stream)
          db.auditLog.create({
            data: {
              userId: connection.userId,
              connectionId: connection.id,
              action: 'CHAT_MESSAGE',
              resource: 'chat',
              resourceId: connection.id,
              details: JSON.stringify({
                userMessage: messages[messages.length - 1]?.content,
                assistantResponse: fullResponse.substring(0, 500), // Truncate for storage
                creditsRemaining: updatedCredits.remaining,
                streamedChunks: true,
              }),
            },
          }).catch(err => console.error('Audit log error:', err))

          // Send completion event with updated credits
          controller.enqueue(
            encoder.encode(
              formatSSE({
                type: 'complete',
                message: fullResponse,
                credits: updatedCredits
              }, 'complete')
            )
          )

          // Close stream
          controller.close()

        } catch (error) {
          console.error('Streaming error:', error)

          // Send error event
          controller.enqueue(
            encoder.encode(
              formatSSE({
                type: 'error',
                message: error instanceof Error ? error.message : 'Unknown error',
                code: 'STREAM_ERROR'
              }, 'error')
            )
          )

          controller.close()
        }
      },

      cancel() {
        console.log('Stream cancelled by client')
      },
    })

    // Return streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable buffering in nginx
      },
    })

  } catch (error) {
    console.error('Chat stream error:', error)

    // Return error as JSON if stream not started
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to process chat message'
        }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
