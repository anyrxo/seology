/**
 * API Route: Save User Preferences
 * Save onboarding selections and user preferences
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { shop, aiChatEnabled, preferredAuditScope } = await req.json()

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
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

    // Update user preferences
    const updatedUser = await db.user.update({
      where: {
        id: connection.userId,
      },
      data: {
        ...(typeof aiChatEnabled === 'boolean' ? { aiChatEnabled } : {}),
        ...(preferredAuditScope ? { preferredAuditScope } : {}),
      },
    })

    console.log(`[Preferences] Updated user ${connection.userId}:`, {
      aiChatEnabled: updatedUser.aiChatEnabled,
      preferredAuditScope: updatedUser.preferredAuditScope,
    })

    return NextResponse.json({
      success: true,
      data: {
        aiChatEnabled: updatedUser.aiChatEnabled,
        preferredAuditScope: updatedUser.preferredAuditScope,
      },
    })
  } catch (error) {
    console.error('Preferences save error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to save preferences' },
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const shop = searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
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
        user: {
          select: {
            aiChatEnabled: true,
            preferredAuditScope: true,
          },
        },
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
        aiChatEnabled: connection.user.aiChatEnabled,
        preferredAuditScope: connection.user.preferredAuditScope,
      },
    })
  } catch (error) {
    console.error('Preferences fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch preferences' },
      },
      { status: 500 }
    )
  }
}
