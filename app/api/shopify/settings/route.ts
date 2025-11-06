/**
 * API Route: Shopify App Settings
 * Get and update execution mode settings
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
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
    const { shop, executionMode } = await req.json()

    if (!shop || !executionMode) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: 'Shop and executionMode required' } },
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

    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Update user settings
    await db.user.update({
      where: { id: connection.userId },
      data: { executionMode },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        connectionId: connection.id,
        action: 'SETTINGS_UPDATED',
        resource: 'settings',
        resourceId: connection.userId,
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
