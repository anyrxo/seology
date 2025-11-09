/**
 * API Route: Shopify Timeline Data
 * Fetch all fixes and checkpoints for timeline visualization
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    // Fetch all fixes with related issue data
    const fixes = await db.fix.findMany({
      where: {
        connectionId,
      },
      include: {
        issue: {
          select: {
            title: true,
            type: true,
            severity: true,
          },
        },
      },
      orderBy: {
        appliedAt: 'desc',
      },
    })

    // Fetch all checkpoints
    const checkpoints = await db.timelineCheckpoint.findMany({
      where: {
        connectionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        fixes,
        checkpoints,
      },
    })
  } catch (error) {
    console.error('Error fetching timeline data:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch timeline data' } },
      { status: 500 }
    )
  }
}
