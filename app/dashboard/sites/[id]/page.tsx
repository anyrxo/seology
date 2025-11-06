import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}

export default async function SiteDetailPage({ params, searchParams }: PageProps) {
  const { userId } = await auth()
  const { id } = await params
  const search = await searchParams

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Get connection with comprehensive data
  const connection = await db.connection.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      issues: {
        include: {
          fixes: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      fixes: {
        include: {
          issue: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      metrics: {
        orderBy: { createdAt: 'desc' },
        take: 30,
      },
      pages: {
        orderBy: { createdAt: 'desc' },
        take: 100,
      },
      healthScores: {
        orderBy: { createdAt: 'desc' },
        take: 30,
      },
      _count: {
        select: {
          issues: {
            where: { status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] } },
          },
          fixes: true,
        },
      },
    },
  })

  if (!connection) {
    notFound()
  }

  // Calculate statistics
  const openIssues = connection.issues.filter((i: any) =>
    ['OPEN', 'DETECTED', 'IN_PROGRESS'].includes(i.status)
  )

  const criticalIssues = openIssues.filter((i: any) => i.severity === 'CRITICAL').length
  const highIssues = openIssues.filter((i: any) => i.severity === 'HIGH').length
  const mediumIssues = openIssues.filter((i: any) => i.severity === 'MEDIUM').length
  const lowIssues = openIssues.filter((i: any) => i.severity === 'LOW').length

  // Calculate health score (0-100)
  const totalPages = connection.pageCount || 1
  const issuesWeight = {
    CRITICAL: 10,
    HIGH: 5,
    MEDIUM: 2,
    LOW: 1,
  }
  const totalIssueWeight =
    criticalIssues * issuesWeight.CRITICAL +
    highIssues * issuesWeight.HIGH +
    mediumIssues * issuesWeight.MEDIUM +
    lowIssues * issuesWeight.LOW

  const healthScore = Math.max(0, Math.min(100, 100 - totalIssueWeight / totalPages))

  // Group issues by category
  const issuesByCategory = openIssues.reduce((acc: any, issue: any) => {
    const category = issue.type || 'OTHER'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(issue)
    return acc
  }, {} as Record<string, typeof openIssues>)

  // Group issues by severity
  const issuesBySeverity = {
    CRITICAL: openIssues.filter((i: any) => i.severity === 'CRITICAL'),
    HIGH: openIssues.filter((i: any) => i.severity === 'HIGH'),
    MEDIUM: openIssues.filter((i: any) => i.severity === 'MEDIUM'),
    LOW: openIssues.filter((i: any) => i.severity === 'LOW'),
  }

  // Calculate fix success rate
  const totalFixes = connection.fixes.length
  const successfulFixes = connection.fixes.filter((f: any) => f.status === 'APPLIED').length
  const fixSuccessRate = totalFixes > 0 ? Math.round((successfulFixes / totalFixes) * 100) : 0

  // Recent activity (last 10 items)
  const recentActivity = [
    ...connection.issues.slice(0, 5).map((issue: any) => ({
      id: issue.id,
      type: 'issue_detected' as const,
      timestamp: issue.createdAt,
      data: issue,
    })),
    ...connection.fixes.slice(0, 5).map((fix: any) => ({
      id: fix.id,
      type: 'fix_applied' as const,
      timestamp: fix.createdAt,
      data: fix,
    })),
  ]
    .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)

  // Health score history (last 30 days)
  const healthHistory = connection.healthScores.map((h: any) => ({
    date: h.createdAt.toISOString().split('T')[0],
    score: h.overallScore,
    performance: h.performanceScore || 0,
    seo: h.seoScore || 0,
    accessibility: h.accessibilityScore || 0,
  }))

  // Issue resolution trend (last 7 days)
  const now = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now)
    date.setDate(now.getDate() - (6 - i))
    return date
  })

  const issueResolutionTrend = last7Days.map((date) => {
    const dateStr = date.toISOString().split('T')[0]
    const dateStart = new Date(date.setHours(0, 0, 0, 0))
    const dateEnd = new Date(date.setHours(23, 59, 59, 999))

    const detected = connection.issues.filter((i: any) => {
      const createdAt = new Date(i.createdAt)
      return createdAt >= dateStart && createdAt <= dateEnd
    }).length

    const fixed = connection.fixes.filter((f: any) => {
      const createdAt = new Date(f.createdAt)
      return createdAt >= dateStart && createdAt <= dateEnd && f.status === 'APPLIED'
    }).length

    return {
      date: dateStr,
      detected,
      fixed,
    }
  })

  // Quick fix suggestions (top 3 most impactful)
  const quickFixSuggestions = openIssues
    .sort((a: any, b: any) => {
      const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }
      return (
        (severityOrder[b.severity as keyof typeof severityOrder] || 0) -
        (severityOrder[a.severity as keyof typeof severityOrder] || 0)
      )
    })
    .slice(0, 3)

  // Prepare data for client component
  const siteData = {
    connection: {
      id: connection.id,
      domain: connection.domain,
      displayName: connection.displayName,
      platform: connection.platform,
      status: connection.status,
      healthStatus: connection.healthStatus,
      pageCount: connection.pageCount,
      issueCount: connection.issueCount,
      lastCrawlAt: connection.lastCrawlAt?.toISOString() || null,
      lastAnalysisAt: connection.lastAnalysisAt?.toISOString() || null,
      lastSync: connection.lastSync?.toISOString() || null,
      createdAt: connection.createdAt.toISOString(),
      updatedAt: connection.updatedAt.toISOString(),
    },
    stats: {
      healthScore: Math.round(healthScore),
      totalIssues: openIssues.length,
      criticalIssues,
      highIssues,
      mediumIssues,
      lowIssues,
      totalFixes: connection.fixes.length,
      fixSuccessRate,
      totalPages: connection.pageCount,
    },
    issues: openIssues.map((issue: any) => ({
      id: issue.id,
      type: issue.type,
      severity: issue.severity,
      title: issue.title,
      description: issue.description,
      pageUrl: issue.pageUrl,
      status: issue.status,
      details: issue.details,
      detectedAt: issue.detectedAt.toISOString(),
      createdAt: issue.createdAt.toISOString(),
      fixes: issue.fixes.map((fix: any) => ({
        id: fix.id,
        status: fix.status,
        createdAt: fix.createdAt.toISOString(),
      })),
    })),
    issuesByCategory: Object.entries(issuesByCategory).map(([category, issues]) => ({
      category,
      count: (issues as any[]).length,
    })),
    issuesBySeverity: {
      CRITICAL: issuesBySeverity.CRITICAL.length,
      HIGH: issuesBySeverity.HIGH.length,
      MEDIUM: issuesBySeverity.MEDIUM.length,
      LOW: issuesBySeverity.LOW.length,
    },
    fixes: connection.fixes.map((fix: any) => ({
      id: fix.id,
      status: fix.status,
      type: fix.type,
      targetUrl: fix.targetUrl,
      changesMade: fix.changesMade,
      beforeState: fix.beforeState,
      afterState: fix.afterState,
      canRollback: fix.canRollback,
      createdAt: fix.createdAt.toISOString(),
      appliedAt: fix.appliedAt?.toISOString() || null,
      issue: fix.issue
        ? {
            id: fix.issue.id,
            type: fix.issue.type,
            title: fix.issue.title,
            severity: fix.issue.severity,
            pageUrl: fix.issue.pageUrl,
          }
        : null,
    })),
    recentActivity: recentActivity.map((activity: any) => ({
      id: activity.id,
      type: activity.type,
      timestamp: activity.timestamp.toISOString(),
      data:
        activity.type === 'issue_detected'
          ? {
              type: activity.data.type,
              severity: activity.data.severity,
              title: activity.data.title,
              pageUrl: activity.data.pageUrl,
            }
          : {
              status: activity.data.status,
              type: activity.data.type,
            },
    })),
    healthHistory,
    issueResolutionTrend,
    quickFixSuggestions: quickFixSuggestions.map((issue: any) => ({
      id: issue.id,
      type: issue.type,
      severity: issue.severity,
      title: issue.title,
      description: issue.description,
      pageUrl: issue.pageUrl,
    })),
    executionMode: user.executionMode,
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Site Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <pre className="text-sm overflow-auto">{JSON.stringify(siteData, null, 2)}</pre>
      </div>
    </div>
  )
}
