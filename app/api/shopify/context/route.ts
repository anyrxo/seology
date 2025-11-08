/**
 * API Route: Shopify Store Context
 * Get store context including execution mode, product count, and issue count
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getRemainingCredits } from '@/lib/credits'

export const dynamic = 'force-dynamic'

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

    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      include: {
        user: {
          select: {
            id: true,
            executionMode: true,
            plan: true,
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

    // Get product count
    const productCount = await db.shopifyProduct.count({
      where: {
        connectionId: connection.id,
      },
    })

    // Get issue count
    const issueCount = await db.issue.count({
      where: {
        connectionId: connection.id,
        status: 'DETECTED',
      },
    })

    // Get fixes applied count
    const fixesApplied = await db.fix.count({
      where: {
        connectionId: connection.id,
        status: 'APPLIED',
      },
    })

    // Get pending fixes count
    const pendingFixes = await db.fix.count({
      where: {
        connectionId: connection.id,
        status: 'PENDING',
      },
    })

    // Get credit info
    const credits = await getRemainingCredits(connection.userId)

    return NextResponse.json({
      success: true,
      data: {
        executionMode: connection.user.executionMode,
        productCount,
        issueCount,
        fixesApplied,
        pendingFixes,
        planName: connection.user.plan,
        credits,
      },
    })
  } catch (error) {
    console.error('Context fetch error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch store context' } },
      { status: 500 }
    )
  }
}
