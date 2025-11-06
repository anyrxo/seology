/**
 * API Route: Reject Plan
 * Rejects a pending plan without executing any fixes
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface RejectPlanRequest {
  reason?: string
}

interface RejectPlanResponse {
  success: boolean
  data?: {
    plan: {
      id: string
      status: string
    }
  }
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { planId: string } }
): Promise<NextResponse<RejectPlanResponse>> {
  try {
    const { planId } = params
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

    // Parse request body
    let body: RejectPlanRequest = {}
    try {
      body = await req.json()
    } catch {
      // Body is optional
    }

    // Find connection by shop domain
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
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

    // Fetch the pending plan with fixes
    const plan = await db.pendingPlan.findUnique({
      where: {
        id: planId,
      },
      include: {
        fixes: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PLAN_NOT_FOUND',
            message: 'Plan not found',
          },
        },
        { status: 404 }
      )
    }

    // Verify plan belongs to this connection
    if (plan.connectionId !== connection.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Plan does not belong to this shop',
          },
        },
        { status: 403 }
      )
    }

    // Verify plan is pending
    if (plan.status !== 'PENDING') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_STATUS',
            message: `Plan is already ${plan.status.toLowerCase()}`,
          },
        },
        { status: 400 }
      )
    }

    // Update plan status with transaction
    await dbWrite.$transaction(async (tx) => {
      // Update plan status
      await tx.pendingPlan.update({
        where: { id: planId },
        data: {
          status: 'REJECTED',
          rejectedAt: new Date(),
          rejectionReason: body.reason || 'No reason provided',
        },
      })

      // Delete all associated pending fixes
      await tx.fix.deleteMany({
        where: {
          planId: planId,
          status: 'PENDING',
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: connection.userId,
          connectionId: connection.id,
          action: 'PLAN_REJECTED',
          resource: 'plan',
          resourceId: planId,
          details: JSON.stringify({
            planTitle: plan.title,
            totalFixes: plan.fixes.length,
            reason: body.reason || 'No reason provided',
          }),
        },
      })
    })

    return NextResponse.json({
      success: true,
      data: {
        plan: {
          id: plan.id,
          status: 'REJECTED',
        },
      },
    })
  } catch (error) {
    console.error('Error rejecting plan:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to reject plan',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
