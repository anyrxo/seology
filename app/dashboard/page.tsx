import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  // Ensure user exists in database
  let dbUser = await db.user.findUnique({
    where: { clerkId: userId },
  })

  // Create user if doesn't exist
  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        clerkId: userId,
        email: user?.emailAddresses[0]?.emailAddress || `${userId}@placeholder.com`,
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || null,
        plan: 'STARTER',
        executionMode: 'AUTOMATIC',
        onboardingCompleted: false,
        onboardingStep: 0,
      },
    })
  }

  // Redirect admins to admin panel
  if (dbUser.role === 'ADMIN') {
    redirect('/admin')
  }

  // Redirect new users to onboarding
  if (!dbUser.onboardingCompleted) {
    redirect('/dashboard/onboarding')
  }

  // Fetch comprehensive dashboard data
  const [connections, usageRecord, recentIssues, recentFixes, aiInsights, notifications] = await Promise.all([
    // Get all user connections with stats
    db.connection.findMany({
      where: { userId: dbUser.id },
      orderBy: { lastCrawlAt: 'desc' },
      take: 10,
    }),

    // Get current month usage
    db.usageRecord.findFirst({
      where: {
        userId: dbUser.id,
        period: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    }),

    // Get recent issues
    db.issue.findMany({
      where: {
        connection: { userId: dbUser.id },
      },
      orderBy: { detectedAt: 'desc' },
      take: 20,
      include: {
        connection: {
          select: {
            domain: true,
            displayName: true,
          },
        },
      },
    }),

    // Get recent fixes
    db.fix.findMany({
      where: {
        connection: { userId: dbUser.id },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        connection: {
          select: {
            domain: true,
            displayName: true,
          },
        },
        issue: {
          select: {
            type: true,
            title: true,
            severity: true,
          },
        },
      },
    }),

    // Get AI insights
    db.aIInsight.findMany({
      where: {
        connection: { userId: dbUser.id },
        status: { in: ['NEW', 'REVIEWED'] },
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
      take: 5,
      include: {
        connection: {
          select: {
            domain: true,
            displayName: true,
          },
        },
      },
    }),

    // Get unread notifications
    db.notification.findMany({
      where: {
        userId: dbUser.id,
        read: false,
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  // Calculate aggregate stats
  const totalSites = connections.length
  const totalIssuesOpen = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['DETECTED', 'OPEN'] },
    },
  })

  const totalFixesApplied = await db.fix.count({
    where: {
      connection: { userId: dbUser.id },
      status: 'APPLIED',
    },
  })

  const aiCreditsUsed = usageRecord?.aiCreditsUsed || 0
  const aiCreditsLimit = usageRecord?.aiCreditsLimit || 100

  // Get metrics for trend data (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const metricsData = await db.metric.findMany({
    where: {
      connection: { userId: dbUser.id },
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: 'asc' },
    select: {
      date: true,
      organicTraffic: true,
      pageSpeed: true,
      issuesCount: true,
      fixesCount: true,
      connectionId: true,
    },
  })

  // Get site health scores
  const healthScores = await db.siteHealthScore.findMany({
    where: {
      connection: { userId: dbUser.id },
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: 'asc' },
  })

  // Calculate trends (compare last 7 days to previous 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const fourteenDaysAgo = new Date()
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

  const [recentIssuesCount, previousIssuesCount, recentFixesCount, previousFixesCount] = await Promise.all([
    db.issue.count({
      where: {
        connection: { userId: dbUser.id },
        detectedAt: { gte: sevenDaysAgo },
      },
    }),
    db.issue.count({
      where: {
        connection: { userId: dbUser.id },
        detectedAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo },
      },
    }),
    db.fix.count({
      where: {
        connection: { userId: dbUser.id },
        appliedAt: { gte: sevenDaysAgo },
      },
    }),
    db.fix.count({
      where: {
        connection: { userId: dbUser.id },
        appliedAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo },
      },
    }),
  ])

  const issuesTrend = previousIssuesCount > 0
    ? Math.round(((recentIssuesCount - previousIssuesCount) / previousIssuesCount) * 100)
    : 0

  const fixesTrend = previousFixesCount > 0
    ? Math.round(((recentFixesCount - previousFixesCount) / previousFixesCount) * 100)
    : 0

  // Serialize data for client
  const dashboardData = {
    user: {
      name: dbUser.name || user?.firstName || 'User',
      email: dbUser.email,
      plan: dbUser.plan,
      executionMode: dbUser.executionMode,
    },
    stats: {
      totalSites,
      totalIssuesOpen,
      totalFixesApplied,
      aiCreditsUsed,
      aiCreditsLimit,
      issuesTrend,
      fixesTrend,
    },
    connections: connections.map((conn) => ({
      id: conn.id,
      domain: conn.domain,
      displayName: conn.displayName,
      platform: conn.platform,
      healthStatus: conn.healthStatus,
      pageCount: conn.pageCount,
      issueCount: conn.issueCount,
      lastCrawlAt: conn.lastCrawlAt ? conn.lastCrawlAt.toISOString() : null,
    })),
    recentActivity: [
      ...recentFixes.slice(0, 10).map((fix) => ({
        id: fix.id,
        type: 'fix' as const,
        title: fix.description,
        description: fix.issue?.title || '',
        timestamp: fix.createdAt.toISOString(),
        siteName: fix.connection.displayName || fix.connection.domain,
        status: fix.status === 'APPLIED' ? 'success' as const : fix.status === 'FAILED' ? 'error' as const : 'info' as const,
      })),
      ...recentIssues.slice(0, 10).map((issue) => ({
        id: issue.id,
        type: 'issue' as const,
        title: issue.title,
        description: issue.details,
        timestamp: issue.detectedAt.toISOString(),
        siteName: issue.connection.displayName || issue.connection.domain,
        status: issue.severity === 'CRITICAL' || issue.severity === 'HIGH' ? 'error' as const : 'warning' as const,
      })),
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15),
    insights: aiInsights.map((insight) => ({
      id: insight.id,
      type: insight.type,
      title: insight.title,
      description: insight.description,
      recommendation: insight.recommendation,
      priority: insight.priority,
      estimatedImpact: insight.estimatedImpact,
      siteName: insight.connection.displayName || insight.connection.domain,
    })),
    metrics: {
      traffic: metricsData.map((m) => ({
        date: m.date.toISOString(),
        value: m.organicTraffic || 0,
      })),
      issues: metricsData.map((m) => ({
        date: m.date.toISOString(),
        value: m.issuesCount || 0,
      })),
      fixes: metricsData.map((m) => ({
        date: m.date.toISOString(),
        value: m.fixesCount || 0,
      })),
      health: healthScores.map((h) => ({
        date: h.date.toISOString(),
        overall: h.overallScore,
        technical: h.technicalScore,
        content: h.contentScore,
        performance: h.performanceScore,
      })),
    },
    notifications: notifications.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      createdAt: n.createdAt.toISOString(),
    })),
  }

  return <DashboardClient data={dashboardData} />
}
