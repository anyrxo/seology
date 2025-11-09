/**
 * API Route: Shopify Store Context
 * Get store context including execution mode, product count, and issue count
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getRemainingCredits } from '@/lib/credits'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id

    // Get full connection with user details
    const connection = await db.connection.findUnique({
      where: {
        id: connectionId,
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
