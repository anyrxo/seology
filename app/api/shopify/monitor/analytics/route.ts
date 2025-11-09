/**
 * Shopify Monitoring Analytics API
 *
 * Provides aggregated performance metrics, cost analysis, and system health
 * for Shopify app operations.
 *
 * GET /api/shopify/monitor/analytics?shop=<shop>&period=<period>
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  getPerformanceSummary,
  getRateLimitHealth,
  getSystemHealth,
  getErrorRate,
  getAvgResponseTime,
} from '@/lib/monitoring'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

/**
 * GET /api/shopify/monitor/analytics
 *
 * Returns comprehensive analytics for Shopify app performance
 *
 * Query params:
 * - shop: Shopify domain (via session token or parameter)
 * - period: 'hour' | 'day' | 'week' | 'month' (default: 'day')
 * - includeHealth: Include system health check (default: true)
 * - includeRateLimit: Include rate limit status (default: true)
 */
export async function GET(req: NextRequest) {
  try {
    // Secure authentication
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const shop = context.shop

    const searchParams = req.nextUrl.searchParams
    const period = (searchParams.get('period') || 'day') as 'hour' | 'day' | 'week' | 'month'
    const includeHealth = searchParams.get('includeHealth') !== 'false'
    const includeRateLimit = searchParams.get('includeRateLimit') !== 'false'

    // Fetch performance summary
    const performanceSummary = await getPerformanceSummary(shop, period)

    // Fetch optional data
    const [systemHealth, rateLimitHealth] = await Promise.all([
      includeHealth ? getSystemHealth(shop) : null,
      includeRateLimit ? getRateLimitHealth(shop) : null,
    ])

    // Fetch recent errors for detailed view
    const recentErrors = await db.aPIUsageLog.findMany({
      where: {
        shop,
        status: 'error',
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      select: {
        endpoint: true,
        errorMessage: true,
        timestamp: true,
        latencyMs: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 20,
    })

    // Fetch cost breakdown by endpoint
    const costByEndpoint = await db.aPIUsageLog.groupBy({
      by: ['endpoint'],
      where: {
        shop,
        timestamp: {
          gte: getPeriodStartDate(period),
        },
      },
      _sum: {
        totalCost: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          totalCost: 'desc',
        },
      },
      take: 10,
    })

    // Fetch hourly metrics for charts
    const hourlyMetrics = await getHourlyMetrics(shop, period)

    return NextResponse.json({
      success: true,
      data: {
        shop,
        period,
        performance: performanceSummary,
        systemHealth,
        rateLimitHealth,
        recentErrors: recentErrors.map(e => ({
          endpoint: e.endpoint,
          error: e.errorMessage,
          timestamp: e.timestamp,
          latency: e.latencyMs,
        })),
        costBreakdown: costByEndpoint.map(c => ({
          endpoint: c.endpoint,
          totalCost: c._sum.totalCost || 0,
          callCount: c._count.id,
          avgCost: (c._sum.totalCost || 0) / c._count.id,
        })),
        hourlyMetrics,
      },
    })
  } catch (error) {
    console.error('[Analytics API] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch analytics',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}

/**
 * Get start date for period
 */
function getPeriodStartDate(period: 'hour' | 'day' | 'week' | 'month'): Date {
  const now = new Date()
  const startDate = new Date(now)

  switch (period) {
    case 'hour':
      startDate.setHours(now.getHours() - 1)
      break
    case 'day':
      startDate.setDate(now.getDate() - 1)
      break
    case 'week':
      startDate.setDate(now.getDate() - 7)
      break
    case 'month':
      startDate.setMonth(now.getMonth() - 1)
      break
  }

  return startDate
}

/**
 * Get hourly metrics for charting
 */
async function getHourlyMetrics(
  shop: string,
  period: 'hour' | 'day' | 'week' | 'month'
) {
  const startDate = getPeriodStartDate(period)

  // Determine the appropriate time bucket
  const bucketSize = period === 'hour' || period === 'day' ? 'hour' : 'day'

  // Fetch aggregated data
  const logs = await db.aPIUsageLog.findMany({
    where: {
      shop,
      timestamp: {
        gte: startDate,
      },
    },
    select: {
      timestamp: true,
      latencyMs: true,
      status: true,
      totalCost: true,
    },
    orderBy: {
      timestamp: 'asc',
    },
  })

  // Group by time bucket
  const buckets: Record<
    string,
    {
      timestamp: Date
      totalCalls: number
      successCalls: number
      errorCalls: number
      avgLatency: number
      totalCost: number
      latencies: number[]
    }
  > = {}

  logs.forEach(log => {
    let bucketKey: string

    if (bucketSize === 'hour') {
      // Round to hour
      const hour = new Date(log.timestamp)
      hour.setMinutes(0, 0, 0)
      bucketKey = hour.toISOString()
    } else {
      // Round to day
      const day = new Date(log.timestamp)
      day.setHours(0, 0, 0, 0)
      bucketKey = day.toISOString()
    }

    if (!buckets[bucketKey]) {
      buckets[bucketKey] = {
        timestamp: new Date(bucketKey),
        totalCalls: 0,
        successCalls: 0,
        errorCalls: 0,
        avgLatency: 0,
        totalCost: 0,
        latencies: [],
      }
    }

    const bucket = buckets[bucketKey]
    bucket.totalCalls++
    bucket.totalCost += log.totalCost || 0

    if (log.status === 'success') {
      bucket.successCalls++
    } else {
      bucket.errorCalls++
    }

    if (log.latencyMs) {
      bucket.latencies.push(log.latencyMs)
    }
  })

  // Calculate averages and format
  return Object.values(buckets).map(bucket => ({
    timestamp: bucket.timestamp,
    totalCalls: bucket.totalCalls,
    successCalls: bucket.successCalls,
    errorCalls: bucket.errorCalls,
    errorRate: bucket.totalCalls > 0 ? (bucket.errorCalls / bucket.totalCalls) * 100 : 0,
    avgLatency:
      bucket.latencies.length > 0
        ? bucket.latencies.reduce((sum, l) => sum + l, 0) / bucket.latencies.length
        : 0,
    p95Latency:
      bucket.latencies.length > 0
        ? bucket.latencies.sort((a, b) => a - b)[
            Math.floor(bucket.latencies.length * 0.95)
          ] || 0
        : 0,
    totalCost: bucket.totalCost,
  }))
}
