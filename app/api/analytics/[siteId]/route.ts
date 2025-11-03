import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// GET /api/analytics/[siteId] - Get site-specific analytics
export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { siteId: string } }
) {
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
    const { siteId } = params

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

    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30', 10)

    // Verify connection exists and belongs to user
    const connection = await db.connection.findFirst({
      where: {
        id: siteId,
        userId: user.id,
      },
      include: {
        _count: {
          select: {
            issues: true,
            fixes: true,
          },
        },
      },
    })

    if (!connection) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONNECTION_NOT_FOUND',
            message: 'Connection not found or access denied'
          }
        },
        { status: 404 }
      )
    }

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    // Parallel queries for site analytics
    const [
      issuesCount,
      openIssuesCount,
      fixedIssuesCount,
      fixesCount,
      appliedFixesCount,
      recentMetrics,
      issuesBySeverity,
      issuesByType,
      recentIssues,
      recentFixes,
    ] = await Promise.all([
      // Total issues
      db.issue.count({
        where: { connectionId: siteId },
      }),
      // Open issues
      db.issue.count({
        where: {
          connectionId: siteId,
          status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
        },
      }),
      // Fixed issues
      db.issue.count({
        where: {
          connectionId: siteId,
          status: 'FIXED',
        },
      }),
      // Total fixes
      db.fix.count({
        where: { connectionId: siteId },
      }),
      // Applied fixes
      db.fix.count({
        where: {
          connectionId: siteId,
          status: 'APPLIED',
        },
      }),
      // Recent metrics
      db.metric.findMany({
        where: {
          connectionId: siteId,
          date: { gte: startDate },
        },
        orderBy: { date: 'asc' },
      }),
      // Issues by severity
      db.issue.groupBy({
        by: ['severity'],
        where: {
          connectionId: siteId,
          status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
        },
        _count: true,
      }),
      // Issues by type
      db.issue.groupBy({
        by: ['type'],
        where: {
          connectionId: siteId,
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
      // Recent issues
      db.issue.findMany({
        where: { connectionId: siteId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          type: true,
          title: true,
          severity: true,
          status: true,
          pageUrl: true,
          createdAt: true,
        },
      }),
      // Recent fixes
      db.fix.findMany({
        where: { connectionId: siteId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          description: true,
          status: true,
          appliedAt: true,
          createdAt: true,
        },
      }),
    ])

    // Calculate metrics
    const avgOrganicTraffic = recentMetrics.length > 0
      ? Math.round(
          recentMetrics
            .filter((m) => m.organicTraffic)
            .reduce((sum, m) => sum + (m.organicTraffic || 0), 0) /
            recentMetrics.filter((m) => m.organicTraffic).length || 1
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

    const successRate = fixesCount > 0
      ? parseFloat(((appliedFixesCount / fixesCount) * 100).toFixed(1))
      : 0

    // Format metrics timeline
    const metricsTimeline = recentMetrics.map((m) => ({
      date: m.date.toISOString().split('T')[0],
      organicTraffic: m.organicTraffic,
      pageSpeed: m.pageSpeed,
      issuesCount: m.issuesCount,
      fixesCount: m.fixesCount,
    }))

    return NextResponse.json({
      success: true,
      data: {
        connection: {
          id: connection.id,
          platform: connection.platform,
          domain: connection.domain,
          displayName: connection.displayName,
          status: connection.status,
          lastSync: connection.lastSync,
        },
        summary: {
          totalIssues: issuesCount,
          openIssues: openIssuesCount,
          fixedIssues: fixedIssuesCount,
          totalFixes: fixesCount,
          appliedFixes: appliedFixesCount,
          successRate,
        },
        performance: {
          avgOrganicTraffic,
          avgPageSpeed,
          metricsCount: recentMetrics.length,
          timeline: metricsTimeline,
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
          recent: recentIssues,
        },
        fixes: {
          recent: recentFixes,
        },
      },
    })
  } catch (error) {
    console.error('GET /api/analytics/[siteId] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch site analytics',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
