import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// GET /api/analytics/overview - Get user's SEO performance overview
export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      },
      { status: 401 }
    )
  }

  try {
    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        },
        { status: 404 }
      )
    }

    // Get all user's connections
    const connections = await db.connection.findMany({
      where: { userId: user.id },
      select: { id: true },
    })

    const connectionIds = connections.map((c) => c.id)

    // Parallel queries for analytics data
    const [
      totalIssues,
      openIssues,
      fixedIssues,
      totalFixes,
      appliedFixes,
      failedFixes,
      recentMetrics,
      issuesBySeverity,
      issuesByType,
    ] = await Promise.all([
      // Total issues
      db.issue.count({
        where: { connectionId: { in: connectionIds } },
      }),
      // Open issues
      db.issue.count({
        where: {
          connectionId: { in: connectionIds },
          status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
        },
      }),
      // Fixed issues
      db.issue.count({
        where: {
          connectionId: { in: connectionIds },
          status: 'FIXED',
        },
      }),
      // Total fixes
      db.fix.count({
        where: { connectionId: { in: connectionIds } },
      }),
      // Applied fixes
      db.fix.count({
        where: {
          connectionId: { in: connectionIds },
          status: 'APPLIED',
        },
      }),
      // Failed fixes
      db.fix.count({
        where: {
          connectionId: { in: connectionIds },
          status: 'FAILED',
        },
      }),
      // Recent metrics (last 30 days)
      db.metric.findMany({
        where: {
          connectionId: { in: connectionIds },
          date: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { date: 'desc' },
        take: 30,
      }),
      // Issues by severity
      db.issue.groupBy({
        by: ['severity'],
        where: {
          connectionId: { in: connectionIds },
          status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
        },
        _count: true,
      }),
      // Issues by type
      db.issue.groupBy({
        by: ['type'],
        where: {
          connectionId: { in: connectionIds },
          status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
        },
        _count: true,
        orderBy: {
          _count: {
            type: 'desc',
          },
        },
        take: 10,
      }),
    ])

    // Calculate metrics aggregations
    const avgOrganicTraffic = recentMetrics.length > 0
      ? Math.round(
          recentMetrics
            .filter((m) => m.organicTraffic)
            .reduce((sum, m) => sum + (m.organicTraffic || 0), 0) /
            recentMetrics.filter((m) => m.organicTraffic).length || 0
        )
      : 0

    const avgPageSpeed = recentMetrics.length > 0
      ? parseFloat(
          (
            recentMetrics
              .filter((m) => m.pageSpeed)
              .reduce((sum, m) => sum + (m.pageSpeed || 0), 0) /
            recentMetrics.filter((m) => m.pageSpeed).length || 1
          ).toFixed(2)
        )
      : 0

    // Calculate fix success rate
    const successRate = totalFixes > 0
      ? parseFloat(((appliedFixes / totalFixes) * 100).toFixed(1))
      : 0

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalConnections: connections.length,
          totalIssues,
          openIssues,
          fixedIssues,
          totalFixes,
          appliedFixes,
          failedFixes,
          successRate,
        },
        performance: {
          avgOrganicTraffic,
          avgPageSpeed,
          metricsCount: recentMetrics.length,
        },
        issues: {
          bySeverity: issuesBySeverity.reduce((acc, item) => {
            acc[item.severity] = item._count
            return acc
          }, {} as Record<string, number>),
          byType: issuesByType.map((item) => ({
            type: item.type,
            count: item._count,
          })),
        },
      },
    })
  } catch (error) {
    console.error('GET /api/analytics/overview error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch analytics overview',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
