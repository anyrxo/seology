/**
 * API Route: Shopify Chat
 * Claude AI powered chat assistant for SEO help
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
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

    // Build context for Claude
    const systemContext = `You are SEOLOGY.AI's SEO assistant, helping Shopify store owners optimize their products and store for search engines.

Store Context:
- Shop: ${shop}
- Execution Mode: ${connection.user.executionMode || 'PLAN'}
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
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: systemContext,
      messages: claudeMessages,
    })

    const assistantMessage = response.content[0]
    if (assistantMessage.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Store conversation in database
    // Note: We create individual chat messages linked to conversations
    // For now, we'll just log the conversation without persistent storage
    // In a full implementation, you'd track conversationId across requests
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
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        message: assistantMessage.text,
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
