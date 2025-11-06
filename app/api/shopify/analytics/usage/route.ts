/**
 * API Route: Time-series Usage Data
 * Returns daily/hourly usage trends for charts
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cached } from '@/lib/cache'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')
    const startDate = req.nextUrl.searchParams.get('startDate')
    const endDate = req.nextUrl.searchParams.get('endDate')
    const groupBy = req.nextUrl.searchParams.get('groupBy') || 'day'

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Get connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Parse dates
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    // Cache for 5 minutes
    const usageData = await cached(
      `analytics:usage:${shop}:${start.toISOString()}:${end.toISOString()}:${groupBy}`,
      async () => {
        // Get all logs in date range
        const logs = await db.aPIUsageLog.findMany({
          where: {
            userId: connection.userId,
            shop,
            timestamp: {
              gte: start,
              lte: end,
            },
          },
          orderBy: {
            timestamp: 'asc',
          },
        })

        // Group by day
        const dailyData = new Map<string, { calls: number; cost: number; tokens: number }>()

        for (const log of logs) {
          const dateKey = groupBy === 'hour'
            ? log.timestamp.toISOString().substring(0, 13) + ':00:00'
            : log.timestamp.toISOString().split('T')[0]

          const existing = dailyData.get(dateKey) || { calls: 0, cost: 0, tokens: 0 }
          dailyData.set(dateKey, {
            calls: existing.calls + 1,
            cost: existing.cost + log.totalCost,
            tokens: existing.tokens + log.totalTokens,
          })
        }

        const result = Array.from(dailyData.entries())
          .map(([date, data]) => ({
            date,
            calls: data.calls,
            cost: Number(data.cost.toFixed(4)),
            tokens: data.tokens,
          }))
          .sort((a, b) => a.date.localeCompare(b.date))

        // Simple linear forecast for next 7 days
        const forecast = calculateForecast(result, 7)

        return { historical: result, forecast }
      },
      300 // 5 minute cache
    )

    return NextResponse.json({
      success: true,
      data: usageData,
    })
  } catch (error) {
    console.error('Error fetching usage data:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch usage data' } },
      { status: 500 }
    )
  }
}

// Simple linear regression forecast
function calculateForecast(
  data: Array<{ date: string; calls: number; cost: number; tokens: number }>,
  days: number
) {
  if (data.length < 2) return []

  // Get last 7 days for trend calculation
  const recentData = data.slice(-7)
  const avgDailyCost = recentData.reduce((sum, d) => sum + d.cost, 0) / recentData.length
  const avgDailyCalls = Math.round(recentData.reduce((sum, d) => sum + d.calls, 0) / recentData.length)
  const avgDailyTokens = Math.round(recentData.reduce((sum, d) => sum + d.tokens, 0) / recentData.length)

  // Calculate trend (simple slope)
  const costSlope = (recentData[recentData.length - 1].cost - recentData[0].cost) / recentData.length
  const callsSlope = (recentData[recentData.length - 1].calls - recentData[0].calls) / recentData.length
  const tokensSlope = (recentData[recentData.length - 1].tokens - recentData[0].tokens) / recentData.length

  const lastDate = new Date(data[data.length - 1].date)
  const forecast = []

  for (let i = 1; i <= days; i++) {
    const forecastDate = new Date(lastDate)
    forecastDate.setDate(forecastDate.getDate() + i)

    forecast.push({
      date: forecastDate.toISOString().split('T')[0],
      calls: Math.max(0, Math.round(avgDailyCalls + callsSlope * i)),
      cost: Number(Math.max(0, avgDailyCost + costSlope * i).toFixed(4)),
      tokens: Math.max(0, Math.round(avgDailyTokens + tokensSlope * i)),
      isForecast: true,
    })
  }

  return forecast
}
