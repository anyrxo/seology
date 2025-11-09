/**
 * API Route: Get SEO Fixes
 * Fetch all applied and pending fixes for a Shopify store
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
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

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') // 'APPLIED', 'PENDING', 'FAILED'

    // Get all fixes
    const fixes = await db.fix.findMany({
      where: {
        connectionId,
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
