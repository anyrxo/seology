/**
 * API Route: Execution History
 * List all executions with filtering
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma, AgentExecutionStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')
    const agentId = req.nextUrl.searchParams.get('agentId')
    const status = req.nextUrl.searchParams.get('status')
    const startDate = req.nextUrl.searchParams.get('startDate')
    const endDate = req.nextUrl.searchParams.get('endDate')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50')
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0')

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

    // Build where clause
    const where: Prisma.AgentExecutionWhereInput = {
      connectionId: connection.id,
    }

    if (agentId) {
      where.agentId = agentId
    }

    if (status && status in AgentExecutionStatus) {
      where.status = status as AgentExecutionStatus
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate)
      }
    }

    // Get total count
    const total = await db.agentExecution.count({ where })

    // Fetch executions
    const executions = await db.agentExecution.findMany({
      where,
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            specialty: true,
            icon: true,
            color: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    return NextResponse.json({
      success: true,
      data: executions,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + executions.length < total,
      },
    })
  } catch (error) {
    console.error('Error fetching executions:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch executions' } },
      { status: 500 }
    )
  }
}
