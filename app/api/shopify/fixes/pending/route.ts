/**
 * API Route: Get Pending Fixes and Plans
 * Fetches all pending fixes and plans for a Shopify store
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface PendingFixesResponse {
  success: boolean
  data?: {
    pendingFixes: Array<{
      id: string
      description: string
      type: string
      targetUrl: string | null
      changes: string
      beforeState: string
      afterState: string
      createdAt: Date
      issue: {
        id: string
        title: string
        severity: string
        pageUrl: string
        type: string
      } | null
    }>
    pendingPlans: Array<{
      id: string
      title: string
      description: string
      estimatedImpact: string
      status: string
      createdAt: Date
      fixes: Array<{
        id: string
        description: string
        type: string
        targetUrl: string | null
      }>
    }>
    executionMode: string
  }
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export async function GET(req: NextRequest): Promise<NextResponse<PendingFixesResponse>> {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_SHOP',
            message: 'Shop parameter required',
          },
        },
        { status: 400 }
      )
    }

    // Find connection by shop domain
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      include: {
        user: {
          select: {
            executionMode: true,
          },
        },
      },
    })

    if (!connection) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NO_CONNECTION',
            message: 'Shop not connected',
          },
        },
        { status: 404 }
      )
    }

    // Fetch pending fixes (for APPROVE mode)
    const pendingFixes = await db.fix.findMany({
      where: {
        connectionId: connection.id,
        status: 'PENDING',
        planId: null, // Individual fixes, not part of a plan
      },
      include: {
        issue: {
          select: {
            id: true,
            title: true,
            severity: true,
            pageUrl: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Fetch pending plans (for PLAN mode)
    const pendingPlans = await db.pendingPlan.findMany({
      where: {
        connectionId: connection.id,
        status: 'PENDING',
      },
      include: {
        fixes: {
          select: {
            id: true,
            description: true,
            type: true,
            targetUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        pendingFixes,
        pendingPlans,
        executionMode: connection.user.executionMode,
      },
    })
  } catch (error) {
    console.error('Error fetching pending fixes:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch pending fixes',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
