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
      model: 'claude-3-5-sonnet-20241022',
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
        model: 'claude-3-5-sonnet-20241022',
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
