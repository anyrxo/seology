/**
 * Usage Tracker - Track API usage and costs for analytics
 */

import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'

// Type definitions for groupBy results
interface GroupByResult {
  model?: string
  shop?: string | null
  endpoint?: string
  _sum: {
    totalCost: number | null
    totalTokens: number | null
  }
  _count: number
}

// Claude 3.5 Sonnet pricing (as of 2024)
const PRICING = {
  'claude-sonnet-4-5-20250929': {
    input: 0.003, // $3 per million tokens
    output: 0.015, // $15 per million tokens
  },
  'claude-3-5-sonnet-20240620': {
    input: 0.003,
    output: 0.015,
  },
  'claude-3-opus-20240229': {
    input: 0.015,
    output: 0.075,
  },
  'claude-3-haiku-20240307': {
    input: 0.00025,
    output: 0.00125,
  },
} as const

interface UsageTrackingParams {
  userId: string
  model: string
  endpoint: string
  inputTokens: number
  outputTokens: number
  shop?: string
  connectionId?: string
  fixType?: string
  resourceType?: string
  resourceId?: string
  latencyMs?: number
  cached?: boolean
  status?: 'success' | 'error' | 'timeout'
  errorMessage?: string
}

/**
 * Calculate cost for token usage
 */
function calculateCost(model: string, inputTokens: number, outputTokens: number): {
  inputCost: number
  outputCost: number
  totalCost: number
} {
  const pricing = PRICING[model as keyof typeof PRICING] || PRICING['claude-sonnet-4-5-20250929']

  // Convert from per-million to actual cost
  const inputCost = (inputTokens / 1_000_000) * pricing.input
  const outputCost = (outputTokens / 1_000_000) * pricing.output
  const totalCost = inputCost + outputCost

  return {
    inputCost: Number(inputCost.toFixed(6)),
    outputCost: Number(outputCost.toFixed(6)),
    totalCost: Number(totalCost.toFixed(6)),
  }
}

/**
 * Track API usage
 */
export async function trackAPIUsage(params: UsageTrackingParams) {
  try {
    const costs = calculateCost(params.model, params.inputTokens, params.outputTokens)

    // Get or create current usage record
    const currentPeriod = new Date()
    currentPeriod.setDate(1)
    currentPeriod.setHours(0, 0, 0, 0)

    const usageRecord = await db.usageRecord.findFirst({
      where: {
        userId: params.userId,
        period: currentPeriod,
      },
    })

    // Create API usage log
    await db.aPIUsageLog.create({
      data: {
        userId: params.userId,
        usageRecordId: usageRecord?.id,
        model: params.model,
        endpoint: params.endpoint,
        inputTokens: params.inputTokens,
        outputTokens: params.outputTokens,
        totalTokens: params.inputTokens + params.outputTokens,
        inputCost: costs.inputCost,
        outputCost: costs.outputCost,
        totalCost: costs.totalCost,
        shop: params.shop,
        connectionId: params.connectionId,
        fixType: params.fixType,
        resourceType: params.resourceType,
        resourceId: params.resourceId,
        latencyMs: params.latencyMs,
        cached: params.cached || false,
        status: params.status || 'success',
        errorMessage: params.errorMessage,
      },
    })

    // Update usage record counters
    if (usageRecord) {
      await db.usageRecord.update({
        where: { id: usageRecord.id },
        data: {
          apiCallsMade: { increment: 1 },
        },
      })
    }
  } catch (error) {
    console.error('[UsageTracker] Error tracking usage:', error)
    // Don't throw - usage tracking shouldn't break the main flow
  }
}

/**
 * Wrapper for anthropic.messages.create that automatically tracks usage
 */
export async function createMessageWithTracking(
  anthropic: Anthropic,
  params: Anthropic.MessageCreateParamsNonStreaming,
  trackingParams: {
    userId: string
    endpoint: string
    shop?: string
    connectionId?: string
    fixType?: string
    resourceType?: string
    resourceId?: string
  }
): Promise<Anthropic.Message> {
  const startTime = Date.now()

  try {
    const message = await anthropic.messages.create(params)
    const latencyMs = Date.now() - startTime

    // Extract token usage
    const inputTokens = message.usage.input_tokens
    const outputTokens = message.usage.output_tokens

    // Track usage
    await trackAPIUsage({
      userId: trackingParams.userId,
      model: params.model,
      endpoint: trackingParams.endpoint,
      inputTokens,
      outputTokens,
      shop: trackingParams.shop,
      connectionId: trackingParams.connectionId,
      fixType: trackingParams.fixType,
      resourceType: trackingParams.resourceType,
      resourceId: trackingParams.resourceId,
      latencyMs,
      status: 'success',
    })

    return message
  } catch (error) {
    const latencyMs = Date.now() - startTime

    // Track failed API call
    await trackAPIUsage({
      userId: trackingParams.userId,
      model: params.model,
      endpoint: trackingParams.endpoint,
      inputTokens: 0,
      outputTokens: 0,
      shop: trackingParams.shop,
      connectionId: trackingParams.connectionId,
      latencyMs,
      status: error instanceof Error && error.message.includes('timeout') ? 'timeout' : 'error',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    })

    throw error
  }
}

/**
 * Get usage summary for current month
 */
export async function getCurrentMonthUsage(userId: string) {
  const currentPeriod = new Date()
  currentPeriod.setDate(1)
  currentPeriod.setHours(0, 0, 0, 0)

  const endOfMonth = new Date(currentPeriod)
  endOfMonth.setMonth(endOfMonth.getMonth() + 1)

  const [totalCost, totalCalls, totalTokens] = await Promise.all([
    db.aPIUsageLog.aggregate({
      where: {
        userId,
        timestamp: {
          gte: currentPeriod,
          lt: endOfMonth,
        },
      },
      _sum: {
        totalCost: true,
      },
    }),
    db.aPIUsageLog.count({
      where: {
        userId,
        timestamp: {
          gte: currentPeriod,
          lt: endOfMonth,
        },
      },
    }),
    db.aPIUsageLog.aggregate({
      where: {
        userId,
        timestamp: {
          gte: currentPeriod,
          lt: endOfMonth,
        },
      },
      _sum: {
        totalTokens: true,
      },
    }),
  ])

  return {
    totalCost: totalCost._sum.totalCost || 0,
    totalCalls,
    totalTokens: totalTokens._sum.totalTokens || 0,
  }
}

/**
 * Get usage breakdown by model
 */
export async function getUsageByModel(userId: string, startDate: Date, endDate: Date) {
  const usage = await db.aPIUsageLog.groupBy({
    by: ['model'],
    where: {
      userId,
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      totalCost: true,
      totalTokens: true,
    },
    _count: true,
  })

  return usage.map((item: GroupByResult) => ({
    model: item.model || 'unknown',
    totalCost: item._sum.totalCost || 0,
    totalTokens: item._sum.totalTokens || 0,
    calls: item._count,
  }))
}

/**
 * Get usage breakdown by shop
 */
export async function getUsageByShop(userId: string, startDate: Date, endDate: Date) {
  const usage = await db.aPIUsageLog.groupBy({
    by: ['shop'],
    where: {
      userId,
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
      shop: {
        not: null,
      },
    },
    _sum: {
      totalCost: true,
      totalTokens: true,
    },
    _count: true,
  })

  return usage.map((item: GroupByResult) => ({
    shop: item.shop || 'Unknown',
    totalCost: item._sum.totalCost || 0,
    totalTokens: item._sum.totalTokens || 0,
    calls: item._count,
  }))
}

/**
 * Get usage breakdown by endpoint
 */
export async function getUsageByEndpoint(userId: string, startDate: Date, endDate: Date) {
  const usage = await db.aPIUsageLog.groupBy({
    by: ['endpoint'],
    where: {
      userId,
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      totalCost: true,
      totalTokens: true,
    },
    _count: true,
  })

  return usage.map((item: GroupByResult) => ({
    endpoint: item.endpoint || 'unknown',
    totalCost: item._sum.totalCost || 0,
    totalTokens: item._sum.totalTokens || 0,
    calls: item._count,
  }))
}

/**
 * Get daily usage trends
 */
export async function getDailyUsageTrends(userId: string, startDate: Date, endDate: Date) {
  const logs = await db.aPIUsageLog.findMany({
    where: {
      userId,
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      timestamp: 'asc',
    },
  })

  // Group by day
  const dailyData = new Map<string, { cost: number; tokens: number; calls: number }>()

  for (const log of logs) {
    const date = log.timestamp.toISOString().split('T')[0]
    const existing = dailyData.get(date) || { cost: 0, tokens: 0, calls: 0 }
    dailyData.set(date, {
      cost: existing.cost + log.totalCost,
      tokens: existing.tokens + log.totalTokens,
      calls: existing.calls + 1,
    })
  }

  return Array.from(dailyData.entries()).map(([date, data]) => ({
    date,
    cost: Number(data.cost.toFixed(4)),
    tokens: data.tokens,
    calls: data.calls,
  }))
}

/**
 * Predict next month's usage based on current trends
 */
export async function predictNextMonthUsage(userId: string) {
  const now = new Date()
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const dayOfMonth = now.getDate()

  // Get usage so far this month
  const currentUsage = await getCurrentMonthUsage(userId)

  // Calculate days in current month
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

  // Project to end of month
  const projectedCost = (currentUsage.totalCost / dayOfMonth) * daysInMonth
  const projectedCalls = Math.round((currentUsage.totalCalls / dayOfMonth) * daysInMonth)
  const projectedTokens = Math.round((currentUsage.totalTokens / dayOfMonth) * daysInMonth)

  return {
    currentCost: currentUsage.totalCost,
    projectedCost: Number(projectedCost.toFixed(2)),
    currentCalls: currentUsage.totalCalls,
    projectedCalls,
    currentTokens: currentUsage.totalTokens,
    projectedTokens,
    daysElapsed: dayOfMonth,
    daysRemaining: daysInMonth - dayOfMonth,
  }
}
