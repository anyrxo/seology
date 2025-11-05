import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AnalyticsClient } from '@/components/dashboard/AnalyticsClient'
import { db } from '@/lib/db'

export default async function AnalyticsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      connections: {
        include: {
          issues: {
            include: {
              fixes: true,
            },
          },
        },
      },
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Calculate real analytics from database
  const allIssues = user.connections.flatMap((c) => c.issues)
  const allFixes = allIssues.flatMap((i) => i.fixes)
  const fixedIssues = allIssues.filter((i) => i.fixes.length > 0)

  // Group issues by type for breakdown
  const issuesByType = allIssues.reduce((acc: Record<string, number>, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1
    return acc
  }, {})

  const totalIssues = allIssues.length
  const issueBreakdown = Object.entries(issuesByType)
    .map(([type, count]) => ({
      type,
      count,
      percentage: totalIssues > 0 ? Math.round((count / totalIssues) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)

  // Calculate weekly data (last 4 weeks)
  const now = new Date()
  const weeklyData = Array.from({ length: 4 }, (_, i) => {
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - (3 - i) * 7)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 7)

    const weekIssues = allIssues.filter((issue) => {
      const createdAt = new Date(issue.createdAt)
      return createdAt >= weekStart && createdAt < weekEnd
    })

    const weekFixes = allFixes.filter((fix) => {
      const createdAt = new Date(fix.createdAt)
      return createdAt >= weekStart && createdAt < weekEnd
    })

    return {
      week: `Week ${i + 1}`,
      issues: weekIssues.length,
      fixes: weekFixes.length,
    }
  })

  // Calculate time saved (estimate: 15 min per fix)
  const minutesSaved = allFixes.length * 15
  const hoursSaved = (minutesSaved / 60).toFixed(1)

  // Calculate pages optimized (unique pages with fixes)
  const uniquePages = new Set(fixedIssues.map((i) => i.pageUrl))

  const analyticsData = {
    issuesFixed: fixedIssues.length,
    timeSaved: `${hoursSaved} hrs`,
    seoScoreImprovement: fixedIssues.length > 0 ? `+${Math.min(Math.round(fixedIssues.length / 10), 100)}%` : '+0%',
    pagesOptimized: uniquePages.size,
    weeklyData,
    issueBreakdown,
  }

  return <AnalyticsClient data={analyticsData} />
}
