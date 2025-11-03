import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Force dynamic rendering (uses headers for auth)
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'

    // Get user from database
    const dbUser = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        connections: {
          include: {
            issues: true,
            fixes: true,
          },
        },
      },
    })

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Calculate date range
    const now = new Date()
    const daysMap: Record<string, number> = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      'all': 365 * 10, // 10 years
    }
    const days = daysMap[range] || 30
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    // Calculate analytics
    const allFixes = dbUser.connections.flatMap((c) => c.fixes)
    const allIssues = dbUser.connections.flatMap((c) => c.issues)

    const issuesFixed = allFixes.filter((f) => f.status === 'APPLIED' && f.createdAt >= startDate).length
    const pagesOptimized = new Set(allFixes.map((f) => f.targetUrl)).size

    // Estimate time saved (5 minutes per fix)
    const timeSaved = `${(issuesFixed * 5 / 60).toFixed(1)} hrs`

    // Mock weekly data (in production, calculate from actual data)
    const weeklyData = [
      { week: 'Week 1', issues: 45, fixes: 38 },
      { week: 'Week 2', issues: 52, fixes: 48 },
      { week: 'Week 3', issues: 38, fixes: 35 },
      { week: 'Week 4', issues: 61, fixes: 58 },
    ]

    // Issue breakdown by type
    const issuesByType = allIssues.reduce((acc, issue) => {
      const type = JSON.parse(issue.details).type || 'Other'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const total = Object.values(issuesByType).reduce((sum, count) => sum + count, 0) || 1
    const issueBreakdown = Object.entries(issuesByType).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / total) * 100),
    }))

    // Recent AI actions
    const recentActions = allFixes
      .filter((f) => f.appliedAt)
      .sort((a, b) => (b.appliedAt?.getTime() || 0) - (a.appliedAt?.getTime() || 0))
      .slice(0, 10)
      .map((fix) => {
        const connection = dbUser.connections.find((c) => c.fixes.some((f) => f.id === fix.id))
        return {
          action: fix.type.replace(/_/g, ' '),
          site: connection?.domain || 'Unknown',
          time: getRelativeTime(fix.appliedAt!),
          impact: fix.type.includes('CRITICAL') ? 'high' : fix.type.includes('HIGH') ? 'medium' : 'low',
        }
      })

    return NextResponse.json({
      success: true,
      data: {
        issuesFixed,
        timeSaved,
        seoScoreImprovement: '+34%', // Mock data
        pagesOptimized,
        weeklyData,
        issueBreakdown,
        recentActions,
      },
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch analytics' } },
      { status: 500 }
    )
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}
