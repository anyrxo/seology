import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { Platform, ExecutionMode, Plan, Severity } from '@prisma/client'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export const runtime = 'edge'

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

    // Build context for Claude
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

    // Prepare messages for Claude
    const claudeMessages: Anthropic.MessageParam[] = []

    // Add history (last 10 messages)
    history.slice(-10).forEach((msg: Message) => {
      claudeMessages.push({
        role: msg.role,
        content: msg.content,
      })
    })

    // Add current message
    claudeMessages.push({
      role: 'user',
      content: message,
    })

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: `You are Seology AI Assistant, an expert SEO automation assistant. You help users optimize their websites by analyzing SEO issues and providing actionable fixes.

CONTEXT:
${contextInfo}

CAPABILITIES:
- Analyze websites for SEO issues (missing meta tags, broken links, slow performance, etc.)
- Suggest specific fixes with code examples
- Explain SEO concepts in simple terms
- Guide users through the Seology platform features
- Provide best practices for SEO optimization

GUIDELINES:
- Be helpful, friendly, and concise
- Provide actionable advice with specific examples
- Use the user's site data when available
- Format code suggestions with markdown code blocks
- If you don't have enough information, ask clarifying questions
- Always prioritize the most impactful SEO improvements first

RESPONSE STYLE:
- Use clear, professional language
- Break down complex topics into simple steps
- Include relevant examples from their sites when applicable
- Suggest using Seology's automation features when appropriate`,
            messages: claudeMessages,
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
          console.error('Claude API error:', error)
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
