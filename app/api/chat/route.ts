import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { Platform, ExecutionMode, Plan, Severity } from '@prisma/client'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// IMPORTANT: Cannot use 'edge' runtime with Prisma database queries
// Edge runtime doesn't support Node.js APIs that Prisma requires
// export const runtime = 'edge'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface UserConnection {
  id: string
  platform: Platform
  domain: string
  displayName: string | null
  issues: Array<{
    id: string
    type: string
    title: string
    severity: Severity
    description: string
    pageUrl: string
  }>
  fixes: Array<{
    id: string
    description: string
    createdAt: Date
  }>
}

interface UserWithContext {
  id: string
  plan: Plan
  executionMode: ExecutionMode
  connections: UserConnection[]
}

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIGURATION_ERROR',
            message: 'AI service is not configured. Please contact support.'
          }
        },
        { status: 500 }
      )
    }

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { message, history = [] } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Message is required' } },
        { status: 400 }
      )
    }

    if (message.length > 4000) {
      return NextResponse.json(
        { success: false, error: { code: 'MESSAGE_TOO_LONG', message: 'Message is too long. Please keep it under 4000 characters.' } },
        { status: 400 }
      )
    }

    // Get user context from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        connections: {
          include: {
            issues: {
              where: { status: 'DETECTED' },
              take: 10,
              select: {
                id: true,
                type: true,
                title: true,
                severity: true,
                details: true,
                pageUrl: true,
              },
            },
            fixes: {
              orderBy: { createdAt: 'desc' },
              take: 5,
              select: {
                id: true,
                description: true,
                createdAt: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Build context for AI assistant
    const contextInfo = buildUserContext({
      id: user.id,
      plan: user.plan,
      executionMode: user.executionMode,
      connections: user.connections.map((conn) => ({
        id: conn.id,
        platform: conn.platform,
        domain: conn.domain,
        displayName: conn.displayName,
        issues: conn.issues.map((issue) => ({
          id: issue.id,
          type: issue.type,
          title: issue.title,
          severity: issue.severity,
          description: issue.details,
          pageUrl: issue.pageUrl,
        })),
        fixes: conn.fixes,
      })),
    })

    // Prepare messages for AI
    const aiMessages: Anthropic.MessageParam[] = []

    // Add history (last 10 messages)
    history.slice(-10).forEach((msg: Message) => {
      aiMessages.push({
        role: msg.role,
        content: msg.content,
      })
    })

    // Add current message
    aiMessages.push({
      role: 'user',
      content: message,
    })

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Validate Anthropic client is ready
          if (!anthropic) {
            throw new Error('Anthropic client not initialized')
          }

          const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: `You are SEOLOGY.AI's intelligent SEO assistant. You are an expert in SEO optimization, website analysis, and automated SEO fixes. Your job is to help users improve their website's search engine rankings by identifying issues and suggesting fixes.

CRITICAL BRANDING RULES:
- You are SEOLOGY's AI assistant (NEVER mention Claude, Anthropic, or any other AI provider)
- Always refer to yourself as "SEOLOGY's AI assistant" or "SEOLOGY AI"
- Brand the platform as "SEOLOGY.AI" - the first platform that actually fixes SEO issues automatically instead of just reporting them
- Use professional, confident, and helpful tone

USER'S CURRENT CONTEXT:
${contextInfo}

YOUR CAPABILITIES:
1. Analyze websites for SEO issues:
   - Missing or incorrect meta tags (title, description, Open Graph, etc.)
   - Broken links and images
   - Page speed and performance issues
   - Mobile responsiveness problems
   - Heading structure (H1, H2, etc.)
   - Image alt text optimization
   - Schema markup opportunities
   - Content quality and keyword optimization

2. Access user's real data:
   - Their connected sites and platforms (${user.connections.length} sites)
   - Current detected issues on their sites (${user.connections.flatMap(c => c.issues).length} active issues)
   - Recently applied fixes
   - Their current plan: ${user.plan}
   - Their execution mode: ${user.executionMode}

3. Provide actionable fixes:
   - Generate specific code examples (HTML, JavaScript, meta tags)
   - Explain step-by-step how to implement fixes
   - Recommend using SEOLOGY's automation features to apply fixes instantly
   - Prioritize high-impact SEO improvements

4. Guide users through SEOLOGY platform:
   - How to connect sites (Shopify, WordPress, or custom sites)
   - How execution modes work (AUTOMATIC, PLAN, APPROVE)
   - How to review and approve fixes
   - How to monitor SEO improvements

RESPONSE GUIDELINES:
- Always start by acknowledging their specific sites and issues when relevant
- Provide concrete, actionable advice with code examples
- Use markdown formatting for code blocks and lists
- Prioritize fixes by SEO impact (high/medium/low)
- When suggesting fixes, mention that SEOLOGY can apply them automatically
- Ask clarifying questions if you need more information
- Keep responses concise but comprehensive
- Use emojis sparingly and professionally (✓, ⚠️, 📊, 🚀)

EXAMPLE RESPONSES:
- "I can see you have [X] issues on [site name]. Let me help you prioritize the most impactful fixes..."
- "Based on your [PLAN] plan, you can fix up to [X] issues per month. Here's what I recommend tackling first..."
- "This missing meta description on [page URL] is affecting your click-through rates. SEOLOGY can fix this automatically - would you like me to explain what we'll change?"

Remember: You're not just an advisor - you're part of a platform that actually FIXES issues, not just reports them. Emphasize SEOLOGY's unique automation capabilities.`,
            messages: aiMessages,
            stream: true,
          })

          for await (const event of response) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const data = JSON.stringify({ content: event.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('AI API error:', error)
          const errorMessage = JSON.stringify({
            content: 'Sorry, I encountered an error processing your request. Please try again.',
          })
          controller.enqueue(encoder.encode(`data: ${errorMessage}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred processing your request',
        },
      },
      { status: 500 }
    )
  }
}

function buildUserContext(user: UserWithContext): string {
  const totalConnections = user.connections.length

  const allIssues = user.connections.flatMap((conn) => conn.issues)
  const allFixes = user.connections.flatMap((conn) => conn.fixes)

  const issuesByType = allIssues.reduce<Record<string, number>>((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1
    return acc
  }, {})

  let context = `USER INFORMATION:
- Plan: ${user.plan}
- Execution Mode: ${user.executionMode}
- Connected Sites: ${totalConnections}
- Total Active Issues: ${allIssues.length}
- Total Fixes Applied: ${allFixes.length}
`

  if (totalConnections > 0) {
    context += `\nCONNECTED SITES:\n`
    user.connections.forEach((conn) => {
      context += `- ${conn.displayName || conn.domain} (${conn.platform}): ${conn.issues.length} issues, ${conn.fixes.length} recent fixes\n`
    })
  }

  if (allIssues.length > 0) {
    context += `\nISSUE BREAKDOWN:\n`
    Object.entries(issuesByType).forEach(([type, count]) => {
      context += `- ${type}: ${count}\n`
    })
  }

  if (allIssues.length > 0) {
    context += `\nRECENT ISSUES (Top 5):\n`
    allIssues.slice(0, 5).forEach((issue, index) => {
      context += `${index + 1}. [${issue.severity}] ${issue.title} - ${issue.description}\n`
    })
  }

  return context
}
