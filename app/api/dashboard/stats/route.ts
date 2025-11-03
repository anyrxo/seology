import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Force dynamic rendering (uses headers for auth)
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // Get user from database
    const dbUser = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        connections: {
          include: {
            issues: {
              where: { status: { not: 'FIXED' } },
            },
            fixes: {
              where: {
                createdAt: {
                  gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
              },
            },
          },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Calculate stats
    const sitesCount = dbUser.connections.length
    const activeIssuesCount = dbUser.connections.reduce((sum, conn) => sum + conn.issues.length, 0)
    const fixesThisMonth = dbUser.connections.reduce((sum, conn) => sum + conn.fixes.length, 0)

    // Usage calculation
    const fixLimit = dbUser.plan === 'STARTER' ? 500 : dbUser.plan === 'GROWTH' ? 5000 : 999999
    const usagePercent = Math.min(Math.round((fixesThisMonth / fixLimit) * 100), 100)

    // Recent activity
    const recentActivity = dbUser.connections.map((conn) => ({
      id: conn.id,
      platform: conn.platform,
      displayName: conn.displayName || conn.domain,
      domain: conn.domain,
      issuesCount: conn.issues.length,
      fixesCount: conn.fixes.length,
    }))

    return NextResponse.json({
      success: true,
      data: {
        sitesCount,
        activeIssuesCount,
        fixesThisMonth,
        fixLimit,
        usagePercent,
        recentActivity,
      },
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch dashboard stats' } },
      { status: 500 }
    )
  }
}
