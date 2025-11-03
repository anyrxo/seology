/**
 * Admin Analytics API
 * Provides comprehensive platform analytics for admins
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Helper to check if user is admin
async function isAdmin(userId: string): Promise<boolean> {
  // In production, check user role in Clerk or database
  // For now, we'll use an environment variable for admin emails
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { email: true },
  })

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim())
  return user ? adminEmails.includes(user.email) : false
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const userIsAdmin = await isAdmin(session.userId)
    if (!userIsAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30', 10)

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get platform metrics
    const [
      totalUsers,
      newUsers,
      totalConnections,
      activeConnections,
      totalIssues,
      openIssues,
      totalFixes,
      appliedFixes,
      failedFixes,
      subscriptions,
      recentActivity,
    ] = await Promise.all([
      // Total users
      db.user.count(),

      // New users in period
      db.user.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),

      // Total connections
      db.connection.count(),

      // Active connections
      db.connection.count({
        where: { status: 'CONNECTED' },
      }),

      // Total issues
      db.issue.count(),

      // Open issues
      db.issue.count({
        where: { status: 'OPEN' },
      }),

      // Total fixes
      db.fix.count(),

      // Applied fixes
      db.fix.count({
        where: { status: 'APPLIED' },
      }),

      // Failed fixes
      db.fix.count({
        where: { status: 'FAILED' },
      }),

      // Subscriptions by plan
      db.user.groupBy({
        by: ['plan'],
        _count: true,
      }),

      // Recent activity
      db.auditLog.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: {
          user: {
            select: { email: true, name: true },
          },
        },
      }),
    ])

    // Get user growth over time (daily)
    const userGrowth = await db.$queryRaw<
      Array<{ date: Date; count: bigint }>
    >`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM "User"
      WHERE created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // Get fixes over time (daily)
    const fixesOverTime = await db.$queryRaw<
      Array<{ date: Date; count: bigint }>
    >`
      SELECT DATE(applied_at) as date, COUNT(*)::int as count
      FROM "Fix"
      WHERE applied_at >= ${startDate} AND status = 'APPLIED'
      GROUP BY DATE(applied_at)
      ORDER BY date ASC
    `

    // Get top issues by type
    const issuesByType = await db.issue.groupBy({
      by: ['type'],
      _count: true,
      orderBy: {
        _count: {
          type: 'desc',
        },
      },
      take: 10,
    })

    // Get platform statistics
    const platformStats = await db.connection.groupBy({
      by: ['platform'],
      _count: true,
    })

    // Calculate metrics
    const totalRevenue = subscriptions.reduce((sum, sub) => {
      const planPrices = { STARTER: 29, GROWTH: 99, SCALE: 299 }
      return sum + (planPrices[sub.plan as keyof typeof planPrices] || 0) * sub._count
    }, 0)

    const fixSuccessRate =
      totalFixes > 0 ? ((appliedFixes / totalFixes) * 100).toFixed(1) : '0'

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          newUsers,
          totalConnections,
          activeConnections,
          totalIssues,
          openIssues,
          totalFixes,
          appliedFixes,
          failedFixes,
          fixSuccessRate: parseFloat(fixSuccessRate),
          totalRevenue,
        },
        subscriptions: subscriptions.map((sub) => ({
          plan: sub.plan,
          count: sub._count,
        })),
        userGrowth: userGrowth.map((row) => ({
          date: row.date.toISOString().split('T')[0],
          count: Number(row.count),
        })),
        fixesOverTime: fixesOverTime.map((row) => ({
          date: row.date.toISOString().split('T')[0],
          count: Number(row.count),
        })),
        issuesByType: issuesByType.map((issue) => ({
          type: issue.type,
          count: issue._count,
        })),
        platformStats: platformStats.map((stat) => ({
          platform: stat.platform,
          count: stat._count,
        })),
        recentActivity: recentActivity.map((log) => ({
          id: log.id,
          action: log.action,
          resource: log.resource,
          userEmail: log.user.email,
          userName: log.user.name,
          createdAt: log.createdAt.toISOString(),
        })),
      },
    })
  } catch (error) {
    console.error('Error fetching admin analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
