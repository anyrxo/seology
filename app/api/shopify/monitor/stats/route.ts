/**
 * API Route: Agent Performance Statistics
 * Compare agent performance metrics
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

    // Get all agents for this connection
    const agents = await db.sEOAgent.findMany({
      where: {
        connectionId,
      },
      include: {
        executions: {
          where: {
            connectionId,
          },
          orderBy: {
            completedAt: 'desc',
          },
          take: 1,
        },
      },
    })

    // Calculate stats for each agent
    const stats = agents.map((agent) => {
      const successRate =
        agent.totalRuns > 0 ? (agent.successfulRuns / agent.totalRuns) * 100 : 0

      return {
        agentId: agent.id,
        agentName: agent.name,
        specialty: agent.specialty,
        totalRuns: agent.totalRuns,
        successfulRuns: agent.successfulRuns,
        failedRuns: agent.failedRuns,
        successRate,
        avgExecutionTime: agent.avgExecutionTime,
        avgTokensUsed: agent.avgTokensUsed,
        avgCostPerRun: agent.avgCostPerRun,
        lastRunAt: agent.executions[0]?.completedAt?.toISOString() || null,
      }
    })

    // Sort by total runs (most active first)
    stats.sort((a, b) => b.totalRuns - a.totalRuns)

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching agent stats:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch agent stats' } },
      { status: 500 }
    )
  }
}
