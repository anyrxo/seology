/**
 * API Route: Approve Entire Plan
 * Approves and executes all fixes in a pending plan
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'
import { updateProductSEO } from '@/lib/shopify-client'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

interface ApprovePlanResponse {
  success: boolean
  data?: {
    plan: {
      id: string
      status: string
      executedAt: Date | null
    }
    results: {
      successful: number
      failed: number
      total: number
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
): Promise<NextResponse<ApprovePlanResponse>> {
  try {
    const { planId } = params

    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response as NextResponse<ApprovePlanResponse>
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    // Fetch the pending plan with all fixes
    const plan = await db.pendingPlan.findUnique({
      where: {
        id: planId,
      },
      include: {
        fixes: {
          include: {
            issue: true,
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
    if (plan.connectionId !== connectionId) {
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

    // Update plan status to EXECUTING
    await dbWrite.pendingPlan.update({
      where: { id: planId },
      data: {
        status: 'EXECUTING',
      },
    })

    // Apply all fixes in the plan
    let successfulFixes = 0
    let failedFixes = 0
    const fixResults: Array<{ fixId: string; success: boolean; error?: string }> = []

    for (const fix of plan.fixes) {
      try {
        // Parse the changes to apply
        let changes: { productId?: string; seo?: { title?: string; description?: string } }
        try {
          changes = JSON.parse(fix.changes)
        } catch {
          throw new Error('Malformed fix changes')
        }

        // Apply the fix to Shopify
        if (changes.productId && changes.seo) {
          await updateProductSEO(userId, shop, changes.productId, changes.seo)
        }

        // Update fix status
        await dbWrite.fix.update({
          where: { id: fix.id },
          data: {
            status: 'APPLIED',
            appliedAt: new Date(),
            rollbackDeadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
          },
        })

        // Update issue status if exists
        if (fix.issueId) {
          await dbWrite.issue.update({
            where: { id: fix.issueId },
            data: {
              status: 'FIXED',
              fixedAt: new Date(),
            },
          })
        }

        successfulFixes++
        fixResults.push({ fixId: fix.id, success: true })
      } catch (error) {
        console.error(`Error applying fix ${fix.id}:`, error)

        // Mark fix as failed
        await dbWrite.fix.update({
          where: { id: fix.id },
          data: {
            status: 'FAILED',
          },
        })

        failedFixes++
        fixResults.push({
          fixId: fix.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Update plan status
    const finalStatus = failedFixes > 0 && successfulFixes === 0 ? 'FAILED' : 'COMPLETED'
    const updatedPlan = await dbWrite.$transaction(async (tx) => {
      const updated = await tx.pendingPlan.update({
        where: { id: planId },
        data: {
          status: finalStatus,
          approvedAt: new Date(),
          executedAt: new Date(),
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId,
          connectionId,
          action: 'PLAN_APPROVED',
          resource: 'plan',
          resourceId: planId,
          details: JSON.stringify({
            planTitle: plan.title,
            totalFixes: plan.fixes.length,
            successfulFixes,
            failedFixes,
            fixResults,
          }),
        },
      })

      return updated
    })

    return NextResponse.json({
      success: true,
      data: {
        plan: {
          id: updatedPlan.id,
          status: updatedPlan.status,
          executedAt: updatedPlan.executedAt,
        },
        results: {
          successful: successfulFixes,
          failed: failedFixes,
          total: plan.fixes.length,
        },
      },
    })
  } catch (error) {
    console.error('Error approving plan:', error)

    // Mark plan as failed if it exists
    try {
      await dbWrite.pendingPlan.update({
        where: { id: params.planId },
        data: {
          status: 'FAILED',
        },
      })
    } catch {
      // Ignore error if plan doesn't exist
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to approve plan',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
