/**
 * API Route: Apply Individual SEO Fix
 *
 * POST /api/shopify/fixes/apply
 *
 * Applies a single fix to the Shopify store
 * Used in APPROVE mode where each fix requires individual approval
 */

import { NextRequest, NextResponse } from 'next/server'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { applyFixById } from '@/lib/shopify-fix-engine'
import { canApplyFixes, trackFixUsage } from '@/lib/usage-enforcement'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const body = await req.json()
    const { fixId } = body

    if (!fixId) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_FIX_ID', message: 'Fix ID is required' } },
        { status: 400 }
      )
    }

    console.log(`[Apply Fix] Applying fix ${fixId} for user ${context.userId}`)

    // Check usage limits
    const usageCheck = await canApplyFixes(context.userId, 1)

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
            }
          }
        },
        { status: 403 }
      )
    }

    const result = await applyFixById(fixId, context.userId)

    if (result.success) {
      // Track usage
      await trackFixUsage(context.userId, 1)

      return NextResponse.json({
        success: true,
        data: {
          fixId,
          message: 'Fix applied successfully'
        }
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FIX_APPLICATION_FAILED',
          message: result.error || 'Failed to apply fix'
        }
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('[Apply Fix] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'APPLY_FIX_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error applying fix'
        }
      },
      { status: 500 }
    )
  }
}
