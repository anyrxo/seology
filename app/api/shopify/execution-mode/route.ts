/**
 * API Route: Change Execution Mode
 * Update user's execution mode preference (AUTOMATIC, PLAN, APPROVE)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { shop, executionMode } = await req.json()

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    if (!executionMode || !['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_MODE', message: 'Invalid execution mode' },
        },
        { status: 400 }
      )
    }

    // Find connection by shop domain (Shopify app - no Clerk needed)
    console.log(`[Execution Mode] Looking for connection with shop: ${shop}`)
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
      select: {
        userId: true,
        id: true,
        status: true,
      },
    })
    console.log(`[Execution Mode] Connection found:`, connection ? `YES (userId: ${connection.userId})` : 'NO')

    if (!connection) {
      // No connection exists - user needs to install the app first
      console.log(`[Execution Mode] No connection found for ${shop} - redirecting to OAuth`)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_INSTALLED',
            message: 'App not installed',
            redirectUrl: `/api/auth/shopify?shop=${shop}`,
          },
        },
        { status: 404 }
      )
    }

    // Update user's execution mode (using raw SQL to bypass Prisma Accelerate cache issues)
    console.log(`[Execution Mode] Updating user ${connection.userId} to mode: ${executionMode}`)
    await db.$executeRaw`
      UPDATE "User"
      SET "executionMode" = ${executionMode}::"ExecutionMode", "updatedAt" = NOW()
      WHERE id = ${connection.userId}
    `
    console.log(`[Execution Mode] ✅ User ${connection.userId} changed mode to: ${executionMode}`)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'EXECUTION_MODE_CHANGED',
        resource: 'user',
        resourceId: connection.userId,
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
