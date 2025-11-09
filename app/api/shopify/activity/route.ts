/**
 * API Route: Recent Activity Feed
 * Returns real activity from the database (fixes, issues, audits)
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
    const limit = parseInt(searchParams.get('limit') || '10')

    // Fetch recent fixes
    const recentFixes = await db.fix.findMany({
      where: { connectionId },
      take: Math.ceil(limit / 2),
      orderBy: { appliedAt: 'desc' },
      select: {
        id: true,
        type: true,
        description: true,
        status: true,
        appliedAt: true,
      },
    })

    // Fetch recent issues
    const recentIssues = await db.issue.findMany({
      where: { connectionId },
      take: Math.ceil(limit / 2),
      orderBy: { detectedAt: 'desc' },
      select: {
        id: true,
        type: true,
        title: true,
        severity: true,
        status: true,
        detectedAt: true,
      },
    })

    // Combine and format activity
    const activity = [
      ...recentFixes
        .filter(fix => fix.appliedAt !== null)
        .map(fix => ({
          id: fix.id,
          type: 'FIX' as const,
          description: fix.description,
          timestamp: fix.appliedAt!,
          status: fix.status === 'APPLIED' ? 'SUCCESS' : fix.status === 'PENDING' ? 'PENDING' : 'FAILED',
        })),
      ...recentIssues
        .filter(issue => issue.detectedAt !== null)
        .map(issue => ({
          id: issue.id,
          type: 'AUDIT' as const,
          description: issue.title,
          timestamp: issue.detectedAt!,
          status: issue.status === 'DETECTED' ? 'PENDING' : issue.status === 'FIXED' ? 'SUCCESS' : 'FAILED',
        })),
    ]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      data: activity,
    })
  } catch (error) {
    console.error('Activity fetch error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch activity' } },
      { status: 500 }
    )
  }
}
