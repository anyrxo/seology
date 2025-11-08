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

    // Find connection to get user
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      select: {
        userId: true,
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Update user's execution mode
    const updatedUser = await db.user.update({
      where: {
        id: connection.userId,
      },
      data: {
        executionMode,
      },
    })

    console.log(`[Execution Mode] User ${connection.userId} changed mode to: ${executionMode}`)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'EXECUTION_MODE_CHANGED',
        resource: 'user',
        resourceId: connection.userId,
        details: JSON.stringify({
          newMode: executionMode,
          changedVia: 'chat',
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
    console.error('Execution mode change error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to change execution mode' },
      },
      { status: 500 }
    )
  }
}
