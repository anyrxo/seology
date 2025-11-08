/**
 * API Route: Recent Activity Feed
 * Returns real activity from the database (fixes, issues, audits)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const shop = searchParams.get('shop')
    const limit = parseInt(searchParams.get('limit') || '10')

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

    // Fetch recent fixes
    const recentFixes = await db.fix.findMany({
      where: { connectionId: connection.id },
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
      where: { connectionId: connection.id },
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
