/**
 * API Route: System Health Status
 * Monitor system health metrics
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Find connection
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

    // Get active executions count
    const activeExecutions = await db.agentExecution.count({
      where: {
        connectionId: connection.id,
        status: 'RUNNING',
      },
    })

    // Get queued executions count
    const queueDepth = await db.agentExecution.count({
      where: {
        connectionId: connection.id,
        status: 'PENDING',
      },
    })

    // Calculate error rate (last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const recentExecutions = await db.agentExecution.count({
      where: {
        connectionId: connection.id,
        startedAt: {
          gte: oneHourAgo,
        },
      },
    })

    const recentFailures = await db.agentExecution.count({
      where: {
        connectionId: connection.id,
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
