/**
 * API Route: Shopify Chat
 * Claude AI powered chat assistant for SEO help
 *
 * Features:
 * - Intent detection for commands (analyze, fix, audit)
 * - Direct API execution for actions
 * - Conversational AI fallback for questions
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'
import { createFixesFromAudit, type SEOIssue } from '@/lib/shopify-fix-engine'
import { getProducts, getPages, getCollections } from '@/lib/shopify-graphql'
import { canApplyFixes } from '@/lib/usage-enforcement'

export const dynamic = 'force-dynamic'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Intent detection patterns
const INTENT_PATTERNS = {
  ANALYZE_PRODUCTS: [
    /analyze\s+(my\s+)?products?/i,
    /audit\s+(my\s+)?products?/i,
    /check\s+(my\s+)?products?/i,
    /scan\s+(my\s+)?products?/i,
  ],
  ANALYZE_CONTENT: [
    /analyze\s+(my\s+)?content/i,
    /audit\s+(my\s+)?content/i,
    /check\s+(my\s+)?pages?/i,
    /analyze\s+(my\s+)?pages?/i,
  ],
  ANALYZE_FULL: [
    /analyze\s+(my\s+)?store/i,
    /audit\s+(my\s+)?store/i,
    /check\s+(my\s+)?store/i,
    /scan\s+(my\s+)?store/i,
    /full\s+audit/i,
    /complete\s+audit/i,
  ],
  FIX_PRODUCTS: [
    /fix\s+(my\s+)?products?/i,
    /optimize\s+(my\s+)?products?/i,
    /improve\s+(my\s+)?products?/i,
  ],
  FIX_STORE: [
    /fix\s+(my\s+)?store/i,
    /optimize\s+(my\s+)?store/i,
    /improve\s+(my\s+)?store/i,
    /fix\s+everything/i,
    /fix\s+all/i,
  ],
}

function detectIntent(message: string): { intent: string; scope: string } | null {
  const lowerMessage = message.toLowerCase()

  // Analyze intents
  if (INTENT_PATTERNS.ANALYZE_PRODUCTS.some(pattern => pattern.test(lowerMessage))) {
    return { intent: 'ANALYZE', scope: 'products' }
  }
  if (INTENT_PATTERNS.ANALYZE_CONTENT.some(pattern => pattern.test(lowerMessage))) {
    return { intent: 'ANALYZE', scope: 'content' }
  }
  if (INTENT_PATTERNS.ANALYZE_FULL.some(pattern => pattern.test(lowerMessage))) {
    return { intent: 'ANALYZE', scope: 'full' }
  }

  // Fix intents
  if (INTENT_PATTERNS.FIX_PRODUCTS.some(pattern => pattern.test(lowerMessage))) {
    return { intent: 'FIX', scope: 'products' }
  }
  if (INTENT_PATTERNS.FIX_STORE.some(pattern => pattern.test(lowerMessage))) {
    return { intent: 'FIX', scope: 'full' }
  }

  return null
}

export async function POST(req: NextRequest) {
  try {
    const { shop, messages } = await req.json()

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_MESSAGES', message: 'Messages array required' } },
        { status: 400 }
      )
    }

    // Find connection to get context
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      include: {
        user: {
          select: {
            id: true,
            executionMode: true,
          },
        },
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // =========================================================================
    // COMMAND DETECTION & EXECUTION
    // =========================================================================
    const lastUserMessage = messages[messages.length - 1]
    const detectedIntent = lastUserMessage?.role === 'user' ? detectIntent(lastUserMessage.content) : null

    if (detectedIntent) {
      console.log(`[Chat] Detected intent: ${detectedIntent.intent} - ${detectedIntent.scope}`)

      // Execute the appropriate command
      try {
        if (detectedIntent.intent === 'ANALYZE' || detectedIntent.intent === 'FIX') {
          // Execute analyze-and-fix logic directly (avoid auth issues with internal fetch)
          const issues: SEOIssue[] = []
          let totalResources = 0
          const limit = detectedIntent.scope === 'full' ? 50 : 20

          // Analyze based on scope
          if (detectedIntent.scope === 'full' || detectedIntent.scope === 'products') {
            const productsData = await getProducts(connection, limit)
            const products = productsData.products.edges.map(e => e.node)
            totalResources += products.length

            for (const product of products) {
              if (!product.seo.title) {
                issues.push({
                  resource: 'product',
                  resourceId: product.id,
                  resourceTitle: product.title,
                  issueType: 'missing_seo_title',
                  severity: 'high',
                  description: 'Missing SEO title',
                  recommendation: 'Add SEO-optimized title',
                  currentValue: '(empty)',
                  suggestedValue: `${product.title} - Premium Quality | Shop Now`
                })
              }

              if (!product.seo.description) {
                issues.push({
                  resource: 'product',
                  resourceId: product.id,
                  resourceTitle: product.title,
                  issueType: 'missing_seo_description',
                  severity: 'high',
                  description: 'Missing meta description',
                  recommendation: 'Add compelling meta description',
                  currentValue: '(empty)',
                  suggestedValue: `Shop ${product.title} - High quality, fast shipping, great prices.`
                })
              }

              const imagesWithoutAlt = product.images.edges.filter(e => !e.node.altText)
              if (imagesWithoutAlt.length > 0) {
                issues.push({
                  resource: 'product',
                  resourceId: product.id,
                  resourceTitle: product.title,
                  issueType: 'missing_image_alt',
                  severity: 'medium',
                  description: `${imagesWithoutAlt.length} image(s) missing alt text`,
                  recommendation: 'Add descriptive alt text to all images',
                })
              }
            }
          }

          if (detectedIntent.scope === 'full' || detectedIntent.scope === 'content') {
            const pagesData = await getPages(connection, 10)
            const pages = pagesData.pages.edges.map(e => e.node)
            totalResources += pages.length

            for (const page of pages) {
              if (!page.seo.title) {
                issues.push({
                  resource: 'page',
                  resourceId: page.id,
                  resourceTitle: page.title,
                  issueType: 'missing_seo_title',
                  severity: 'high',
                  description: 'Page missing SEO title',
                  recommendation: 'Add SEO title',
                  currentValue: '(empty)',
                  suggestedValue: `${page.title} | Your Store`
                })
              }
            }

            const collectionsData = await getCollections(connection, 10)
            const collections = collectionsData.collections.edges.map(e => e.node)
            totalResources += collections.length

            for (const collection of collections) {
              if (!collection.seo.title) {
                issues.push({
                  resource: 'collection',
                  resourceId: collection.id,
                  resourceTitle: collection.title,
                  issueType: 'missing_seo_title',
                  severity: 'high',
                  description: 'Collection missing SEO title',
                  recommendation: 'Add category-focused SEO title',
                  currentValue: '(empty)',
                  suggestedValue: `Shop ${collection.title} | Best Selection`
                })
              }
            }
          }

          console.log(`[Chat] Found ${issues.length} issues across ${totalResources} resources`)

          if (issues.length === 0) {
            return NextResponse.json({
              success: true,
              data: {
                message: `Great! I analyzed ${totalResources} resources and found no SEO issues. Your ${detectedIntent.scope === 'full' ? 'store' : detectedIntent.scope} is well-optimized! 🎉`
              }
            })
          }

          const executionMode = connection.user.executionMode || 'PLAN'

          // Check usage limits before creating fixes
          if (executionMode === 'AUTOMATIC') {
            const usageCheck = await canApplyFixes(connection.userId, issues.length)
            if (!usageCheck.allowed) {
              return NextResponse.json({
                success: true,
                data: {
                  message: `I found ${issues.length} issues, but you've reached your monthly limit. ${usageCheck.error}\n\nYou've used ${usageCheck.current} of ${usageCheck.limit} fixes this month.`
                }
              })
            }
          }

          // Create fixes
          const fixResult = await createFixesFromAudit(
            connection.id,
            connection.userId,
            issues,
            executionMode
          )

          // Generate Claude AI summary
          const aiPrompt = `You are SEOLOGY's SEO assistant. Summarize this audit in 2-3 sentences for the user.

Issues Found: ${issues.length}
Scope: ${detectedIntent.scope}
Execution Mode: ${executionMode}

Top Issues:
${issues.slice(0, 5).map(i => `- ${i.resourceTitle}: ${i.description}`).join('\n')}

Provide:
1. Brief summary of what was found
2. What will happen next based on execution mode
3. Encouraging message

Keep it friendly and concise.`

          const aiResponse = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 300,
            messages: [{ role: 'user', content: aiPrompt }]
          })

          const aiContent = aiResponse.content[0]
          const aiSummary = aiContent.type === 'text' ? aiContent.text : 'Analysis complete!'

          // Format response based on execution mode
          let responseMessage = `${aiSummary}\n\n`

          responseMessage += `**Results:**\n`
          responseMessage += `- Analyzed ${totalResources} resources\n`
          responseMessage += `- Found ${issues.length} SEO issues\n`
          responseMessage += `- Created ${fixResult.fixIds.length} fixes\n\n`

          if (executionMode === 'AUTOMATIC') {
            responseMessage += `✅ **Fixes Applied Automatically**\n`
            responseMessage += `All ${fixResult.fixIds.length} fixes have been applied to your store immediately.\n\n`
          } else if (executionMode === 'PLAN') {
            responseMessage += `📋 **Fix Plan Created**\n`
            responseMessage += `I've created a plan with ${fixResult.fixIds.length} fixes. `
            responseMessage += `You can review and approve all fixes at once.\n\n`
            responseMessage += `**Next Steps:**\n`
            responseMessage += `Say "show me the plan" or "apply the plan" to proceed.`
          } else {
            responseMessage += `⏸️ **Fixes Pending Approval**\n`
            responseMessage += `${fixResult.fixIds.length} fixes are waiting for your approval. `
            responseMessage += `Each fix needs individual approval before being applied.\n\n`
            responseMessage += `**Next Steps:**\n`
            responseMessage += `Say "show fixes" or "approve fixes" to review them.`
          }

          // Return command execution result
          return NextResponse.json({
            success: true,
            data: {
              message: responseMessage,
              action: {
                type: detectedIntent.intent,
                scope: detectedIntent.scope,
                issuesFound: issues.length,
                fixesCreated: fixResult.fixIds.length,
                planId: fixResult.planId,
                executionMode,
              },
            },
          })
        }
      } catch (commandError) {
        console.error('[Chat] Command execution error:', commandError)

        // Return error message
        const errorMessage = `I tried to ${detectedIntent.intent === 'ANALYZE' ? 'analyze' : 'fix'} your ${detectedIntent.scope === 'full' ? 'store' : detectedIntent.scope}, but encountered an error:\n\n${commandError instanceof Error ? commandError.message : 'Unknown error'}\n\nPlease try again or contact support if the issue persists.`

        return NextResponse.json({
          success: true,
          data: {
            message: errorMessage,
          },
        })
      }
    }

    // =========================================================================
    // CONVERSATIONAL AI (No command detected)
    // =========================================================================

    // Get current month's usage record for credit tracking
    const currentPeriod = new Date()
    currentPeriod.setDate(1)
    currentPeriod.setHours(0, 0, 0, 0)

    const usageRecord = await db.usageRecord.findUnique({
      where: {
        userId_period: {
          userId: connection.userId,
          period: currentPeriod,
        },
      },
      select: {
        aiCreditsUsed: true,
        aiCreditsLimit: true,
      },
    })

    // Check if user has available AI credits
    if (usageRecord) {
      if (usageRecord.aiCreditsUsed >= usageRecord.aiCreditsLimit) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INSUFFICIENT_CREDITS',
              message: 'You have reached your monthly AI chat limit. Please upgrade your plan or wait until next month.',
            },
          },
          { status: 403 }
        )
      }
    }

    // Get recent issues for context
    const recentIssues = await db.issue.findMany({
      where: {
        connectionId: connection.id,
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
    })

    // Get recent fixes for context
    const recentFixes = await db.fix.findMany({
      where: {
        connectionId: connection.id,
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
    })

    // Get product count for context
    const productCount = await db.shopifyProduct.count({
      where: {
        connectionId: connection.id,
      },
    })

    const executionMode = connection.user.executionMode || 'PLAN'
    const modeDescription = {
      AUTOMATIC: 'All SEO fixes are applied instantly without approval',
      PLAN: 'Fixes are grouped into plans for batch approval',
      APPROVE: 'Each fix requires individual approval before being applied',
    }[executionMode]

    // Build context for Claude
    const systemContext = `You are SEOLOGY.AI's SEO assistant, helping Shopify store owners optimize their products and store for search engines.

Store Context:
- Shop: ${shop}
- Products: ${productCount} products in store
- Execution Mode: ${executionMode} (${modeDescription})
- Recent Issues Found: ${recentIssues.length} active issues
- Recent Fixes Applied: ${recentFixes.length} fixes

${
  recentIssues.length > 0
    ? `Active Issues:\n${recentIssues.map((issue) => `- ${issue.title} (${issue.severity})`).join('\n')}`
    : ''
}

${
  recentFixes.length > 0
    ? `Recent Fixes:\n${recentFixes
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

    // Call Claude API
    const claudeMessages: Anthropic.MessageParam[] = messages.map((msg: ChatMessage) => ({
      role: msg.role,
      content: msg.content,
    }))

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1000,
      system: systemContext,
      messages: claudeMessages,
    })

    const assistantMessage = response.content[0]
    if (assistantMessage.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Extract token usage from Claude API response
    const tokenUsage = response.usage
    const inputTokens = tokenUsage?.input_tokens || 0
    const outputTokens = tokenUsage?.output_tokens || 0
    const totalTokens = inputTokens + outputTokens

    // Calculate actual cost based on Claude 3.5 Sonnet pricing
    // $3 per million input tokens, $15 per million output tokens
    const inputCost = (inputTokens / 1_000_000) * 3.0
    const outputCost = (outputTokens / 1_000_000) * 15.0
    const totalCost = inputCost + outputCost

    // Log API usage with token tracking
    await db.aPIUsageLog.create({
      data: {
        userId: connection.userId,
        model: 'claude-sonnet-4-5-20250929',
        endpoint: 'chat',
        inputTokens,
        outputTokens,
        totalTokens,
        inputCost,
        outputCost,
        totalCost,
        shop,
        connectionId: connection.id,
        status: 'success',
      },
    })

    // Track credit usage (increment aiCreditsUsed in UsageRecord)
    if (usageRecord) {
      await db.usageRecord.update({
        where: {
          userId_period: {
            userId: connection.userId,
            period: currentPeriod,
          },
        },
        data: {
          aiCreditsUsed: {
            increment: 1,
          },
        },
      })
    } else {
      // Create usage record if it doesn't exist (shouldn't happen, but handle gracefully)
      // Get user's plan to determine limits
      const user = await db.user.findUnique({
        where: { id: connection.userId },
        select: { plan: true },
      })

      // Set limits based on plan
      let aiCreditsLimit = 100 // Default for STARTER
      if (user?.plan === 'GROWTH') {
        aiCreditsLimit = 500
      } else if (user?.plan === 'SCALE') {
        aiCreditsLimit = 2000
      }

      await db.usageRecord.create({
        data: {
          userId: connection.userId,
          period: currentPeriod,
          aiCreditsUsed: 1,
          aiCreditsLimit,
          sitesLimit: user?.plan === 'STARTER' ? 3 : user?.plan === 'GROWTH' ? 10 : 999,
          fixesLimit: user?.plan === 'STARTER' ? 500 : user?.plan === 'GROWTH' ? 5000 : 999999,
        },
      })
    }

    // Store conversation in audit log with token metrics
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        connectionId: connection.id,
        action: 'CHAT_MESSAGE',
        resource: 'chat',
        resourceId: connection.id,
        details: JSON.stringify({
          userMessage: messages[messages.length - 1]?.content,
          assistantResponse: assistantMessage.text,
          creditsRemaining: usageRecord
            ? usageRecord.aiCreditsLimit - (usageRecord.aiCreditsUsed + 1)
            : null,
          tokensUsed: {
            input: inputTokens,
            output: outputTokens,
            total: totalTokens,
          },
          costUSD: {
            input: inputCost.toFixed(6),
            output: outputCost.toFixed(6),
            total: totalCost.toFixed(6),
          },
        }),
      },
    })

    // Get updated usage record to return current credit info
    const updatedUsageRecord = await db.usageRecord.findUnique({
      where: {
        userId_period: {
          userId: connection.userId,
          period: currentPeriod,
        },
      },
      select: {
        aiCreditsUsed: true,
        aiCreditsLimit: true,
      },
    })

    // Return response with credit information
    return NextResponse.json({
      success: true,
      data: {
        message: assistantMessage.text,
        credits: updatedUsageRecord
          ? {
              used: updatedUsageRecord.aiCreditsUsed,
              limit: updatedUsageRecord.aiCreditsLimit,
              remaining: updatedUsageRecord.aiCreditsLimit - updatedUsageRecord.aiCreditsUsed,
            }
          : undefined,
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to process chat message' } },
      { status: 500 }
    )
  }
}
