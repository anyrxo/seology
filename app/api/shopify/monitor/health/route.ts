/**
 * API Route: System Health Status
 * Monitor system health metrics
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
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
    const connectionId = context.connection.id

    // Get active executions count
    const activeExecutions = await db.agentExecution.count({
      where: {
        connectionId,
        status: 'RUNNING',
      },
    })

    // Get queued executions count
    const queueDepth = await db.agentExecution.count({
      where: {
        connectionId,
        status: 'PENDING',
      },
    })

    // Calculate error rate (last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const recentExecutions = await db.agentExecution.count({
      where: {
        connectionId,
        startedAt: {
          gte: oneHourAgo,
        },
      },
    })

    const recentFailures = await db.agentExecution.count({
      where: {
        connectionId,
        status: 'FAILED',
        startedAt: {
          gte: oneHourAgo,
        },
      },
    })

    const errorRate = recentExecutions > 0 ? (recentFailures / recentExecutions) * 100 : 0

    // Test database connection
    let databaseConnected = true
    try {
      await db.$queryRaw`SELECT 1`
    } catch {
      databaseConnected = false
    }

    // Determine overall health status
    let status: 'healthy' | 'degraded' | 'down' = 'healthy'
    if (!databaseConnected) {
      status = 'down'
    } else if (errorRate > 10 || queueDepth > 50) {
      status = 'degraded'
    }

    // API rate limit (Claude API - simplified, in production use actual API headers)
    const apiRateLimit = {
      remaining: 1000 - activeExecutions * 10, // Simplified calculation
      total: 1000,
      resetAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: {
        status,
        activeExecutions,
        queueDepth,
        errorRate,
        apiRateLimit,
        databaseConnected,
      },
    })
  } catch (error) {
    console.error('Error fetching health status:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch health status' } },
      { status: 500 }
    )
  }
}
