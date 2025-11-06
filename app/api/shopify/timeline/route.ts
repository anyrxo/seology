/**
 * API Route: Shopify Timeline Data
 * Fetch all fixes and checkpoints for timeline visualization
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
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Fetch all fixes with related issue data
    const fixes = await db.fix.findMany({
      where: {
        connectionId: connection.id,
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
        connectionId: connection.id,
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
