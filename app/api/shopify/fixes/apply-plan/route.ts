/**
 * API Route: Apply Plan (Batch Fix Approval)
 *
 * POST /api/shopify/fixes/apply-plan
 *
 * Applies all fixes in a plan at once
 * Used in PLAN mode where user approves a batch of fixes together
 */

import { NextRequest, NextResponse } from 'next/server'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { applyPlan } from '@/lib/shopify-fix-engine'
import { canApplyFixes, trackFixUsage } from '@/lib/usage-enforcement'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Longer timeout for batch operations

export async function POST(req: NextRequest) {
  try {
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const body = await req.json()
    const { planId } = body

    if (!planId) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PLAN_ID', message: 'Plan ID is required' } },
        { status: 400 }
      )
    }

    console.log(`[Apply Plan] Applying plan ${planId} for user ${context.userId}`)

    // Get plan to check how many fixes it contains
    const plan = await db.pendingPlan.findUnique({
      where: { id: planId },
      include: {
        fixes: {
          where: { status: 'PENDING' }
        }
      }
    })

    if (!plan) {
      return NextResponse.json(
        { success: false, error: { code: 'PLAN_NOT_FOUND', message: 'Plan not found' } },
        { status: 404 }
      )
    }

    // Check usage limits
    const usageCheck = await canApplyFixes(context.userId, plan.fixes.length)

    if (!usageCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USAGE_LIMIT_EXCEEDED',
            message: usageCheck.error,
            details: {
              used: usageCheck.current,
              limit: usageCheck.limit,
              remaining: usageCheck.remaining,
              requestedFixes: plan.fixes.length,
            }
          }
        },
        { status: 403 }
      )
    }

    const result = await applyPlan(planId, context.userId)

    if (result.success) {
      // Track successful fixes
      if (result.appliedCount > 0) {
        await trackFixUsage(context.userId, result.appliedCount)
      }

      return NextResponse.json({
        success: true,
        data: {
          planId,
          appliedCount: result.appliedCount,
          failedCount: result.failedCount,
          message: `Successfully applied ${result.appliedCount} fixes`
        }
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'PLAN_APPLICATION_FAILED',
          message: `Applied ${result.appliedCount} fixes, but ${result.failedCount} failed`,
          details: result.errors
        }
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('[Apply Plan] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'APPLY_PLAN_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error applying plan'
        }
      },
      { status: 500 }
    )
  }
}
