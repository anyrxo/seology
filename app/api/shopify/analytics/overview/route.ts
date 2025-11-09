/**
 * API Route: Analytics Overview Stats
 * Returns current month's total calls, tokens, cost
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cached } from '@/lib/cache'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Secure authentication
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const userId = context.userId
    const shop = context.shop

    // Cache for 1 minute
    const overviewData = await cached(
      `analytics:overview:${shop}`,
      async () => {
        // Get current month start
        const currentMonth = new Date()
        currentMonth.setDate(1)
        currentMonth.setHours(0, 0, 0, 0)

        const endOfMonth = new Date(currentMonth)
        endOfMonth.setMonth(endOfMonth.getMonth() + 1)

        // Aggregate current month's usage
        const stats = await db.aPIUsageLog.aggregate({
          where: {
            userId,
            shop,
            timestamp: {
              gte: currentMonth,
              lt: endOfMonth,
            },
          },
          _count: { id: true },
          _sum: {
            totalCost: true,
            totalTokens: true,
            inputTokens: true,
            outputTokens: true,
          },
        })

        const totalCalls = stats._count.id
        const totalCost = stats._sum.totalCost || 0
        const totalTokens = stats._sum.totalTokens || 0
        const inputTokens = stats._sum.inputTokens || 0
        const outputTokens = stats._sum.outputTokens || 0
        const avgCostPerCall = totalCalls > 0 ? totalCost / totalCalls : 0

        // Get budget if set
        const budget = await db.usageBudget.findFirst({
          where: {
            userId,
            isActive: true,
            periodStart: { lte: new Date() },
            periodEnd: { gte: new Date() },
          },
        })

        return {
          totalCalls,
          totalCost: Number(totalCost.toFixed(4)),
          totalTokens,
          inputTokens,
          outputTokens,
          avgCostPerCall: Number(avgCostPerCall.toFixed(6)),
          budget: budget
            ? {
                limit: budget.monthlyLimitUSD,
                spent: budget.currentSpendUSD,
                remaining: budget.monthlyLimitUSD - budget.currentSpendUSD,
                percentUsed: (budget.currentSpendUSD / budget.monthlyLimitUSD) * 100,
              }
            : null,
        }
      },
      60 // 1 minute cache
    )

    return NextResponse.json({
      success: true,
      data: overviewData,
    })
  } catch (error) {
    console.error('Error fetching analytics overview:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch analytics overview' } },
      { status: 500 }
    )
  }
}
