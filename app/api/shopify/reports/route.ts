/**
 * API Route: SEO Reports
 * Get analytics and fix history
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

    // Get all fixes
    const allFixes = await db.fix.findMany({
      where: {
        connectionId,
        status: 'APPLIED',
      },
      include: {
        issue: {
          select: {
            title: true,
            pageUrl: true,
          },
        },
      },
      orderBy: {
        appliedAt: 'desc',
      },
    })

    // Calculate stats
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const fixesThisWeek = allFixes.filter(
      (fix) => fix.appliedAt && new Date(fix.appliedAt) >= oneWeekAgo
    ).length

    const fixesThisMonth = allFixes.filter(
      (fix) => fix.appliedAt && new Date(fix.appliedAt) >= oneMonthAgo
    ).length

    // Get resolved issues count
    const issuesResolved = await db.issue.count({
      where: {
        connectionId,
        status: 'FIXED',
      },
    })

    // Calculate average SEO scores (placeholder - would need actual tracking)
    const avgSeoScoreBefore = 65
    const avgSeoScoreAfter = 78

    // Get recent fixes (last 20)
    const recentFixes = allFixes.slice(0, 20)

    return NextResponse.json({
      success: true,
      data: {
        totalFixes: allFixes.length,
        fixesThisWeek,
        fixesThisMonth,
        issuesResolved,
        avgSeoScoreBefore,
        avgSeoScoreAfter,
        recentFixes: recentFixes.map((fix) => ({
          id: fix.id,
          description: fix.description,
          type: fix.type,
          appliedAt: fix.appliedAt?.toISOString() || '',
          beforeState: fix.beforeState,
          afterState: fix.afterState,
          issue: fix.issue || { title: 'Unknown Issue', pageUrl: '' },
        })),
      },
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch reports' } },
      { status: 500 }
    )
  }
}
