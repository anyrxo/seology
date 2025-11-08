/**
 * API Route: Rollback SEO Fix
 *
 * POST /api/shopify/fixes/rollback
 *
 * Rolls back an applied fix to its previous state
 * Only works within 90-day rollback window
 */

import { NextRequest, NextResponse } from 'next/server'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { rollbackFix } from '@/lib/shopify-fix-engine'

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

    console.log(`[Rollback Fix] Rolling back fix ${fixId} for user ${context.userId}`)

    const result = await rollbackFix(fixId, context.userId)

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: {
          fixId,
          message: 'Fix rolled back successfully'
        }
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'ROLLBACK_FAILED',
          message: result.error || 'Failed to rollback fix'
        }
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('[Rollback Fix] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'ROLLBACK_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error rolling back fix'
        }
      },
      { status: 500 }
    )
  }
}
