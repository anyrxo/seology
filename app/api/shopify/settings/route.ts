/**
 * API Route: Shopify App Settings
 * Get and update execution mode settings
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Authenticate with session token middleware
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult

    // Find connection with user data
    const connection = await db.connection.findFirst({
      where: {
        id: context.connection.id,
      },
      include: {
        user: true,
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        executionMode: connection.user.executionMode || 'PLAN',
      },
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch settings' } },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate with session token middleware
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const { executionMode } = await req.json()

    if (!executionMode) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: 'executionMode required' } },
        { status: 400 }
      )
    }

    // Validate execution mode
    if (!['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_MODE', message: 'Invalid execution mode' } },
        { status: 400 }
      )
    }

    // Update user settings
    await db.user.update({
      where: { id: context.userId },
      data: { executionMode },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: context.userId,
        connectionId: context.connection.id,
        action: 'SETTINGS_UPDATED',
        resource: 'settings',
        resourceId: context.userId,
        details: JSON.stringify({
          setting: 'executionMode',
          newValue: executionMode,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: { executionMode },
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update settings' } },
      { status: 500 }
    )
  }
}
