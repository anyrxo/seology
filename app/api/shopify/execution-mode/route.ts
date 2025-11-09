/**
 * API Route: Change Execution Mode
 * Update user's execution mode preference (AUTOMATIC, PLAN, APPROVE)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const userId = context.userId
    const shop = context.shop

    const { executionMode } = await req.json()

    if (!executionMode || !['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_MODE', message: 'Invalid execution mode' },
        },
        { status: 400 }
      )
    }

    // Update user's execution mode (using raw SQL to bypass Prisma Accelerate cache issues)
    console.log(`[Execution Mode] Updating user ${userId} to mode: ${executionMode}`)
    await db.$executeRaw`
      UPDATE "User"
      SET "executionMode" = ${executionMode}::"ExecutionMode", "updatedAt" = NOW()
      WHERE id = ${userId}
    `
    console.log(`[Execution Mode] ✅ User ${userId} changed mode to: ${executionMode}`)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId,
        action: 'EXECUTION_MODE_CHANGED',
        resource: 'user',
        resourceId: userId,
        details: JSON.stringify({
          newMode: executionMode,
          changedVia: 'onboarding',
          shop,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        executionMode,
      },
    })
  } catch (error) {
    console.error('[Execution Mode] ERROR:', error)
    console.error('[Execution Mode] Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to change execution mode',
          details: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 500 }
    )
  }
}
