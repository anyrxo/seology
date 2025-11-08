/**
 * API Route: Get SEO Fixes
 * Fetch all applied and pending fixes for a Shopify store
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const shop = searchParams.get('shop')
    const status = searchParams.get('status') // 'APPLIED', 'PENDING', 'FAILED'

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

    // Get all fixes
    const fixes = await db.fix.findMany({
      where: {
        connectionId: connection.id,
        ...(status ? { status: status as 'PENDING' | 'APPLIED' | 'FAILED' | 'ROLLED_BACK' } : {}),
      },
      orderBy: [
        { appliedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 200, // Limit to prevent overwhelming
      include: {
        issue: {
          select: {
            id: true,
            title: true,
            type: true,
            severity: true,
            pageUrl: true,
          },
        },
      },
    })

    // Transform to frontend format
    const formattedFixes = fixes.map(fix => ({
      id: fix.id,
      type: fix.type,
      description: fix.description,
      status: fix.status,
      appliedAt: fix.appliedAt,
      createdAt: fix.createdAt,
      beforeState: fix.beforeState,
      afterState: fix.afterState,
      rollbackExpiresAt: fix.rollbackDeadline, // Schema uses 'rollbackDeadline' not 'rollbackExpiresAt'
      issue: fix.issue ? {
        id: fix.issue.id,
        title: fix.issue.title,
        type: fix.issue.type,
        severity: fix.issue.severity.toLowerCase(),
        pageUrl: fix.issue.pageUrl,
      } : null,
    }))

    return NextResponse.json({
      success: true,
      data: formattedFixes,
    })
  } catch (error) {
    console.error('Fixes fetch error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch fixes' } },
      { status: 500 }
    )
  }
}
