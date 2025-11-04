import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

/**
 * GET /api/reports/[id]
 * Get detailed report with before/after data and pending approvals
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const reportId = params.id

    // Get report
    const report = await db.dailyReport.findFirst({
      where: {
        id: reportId,
        userId: user.id, // Ensure user owns this report
      },
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const fixesApplied = JSON.parse(report.fixesApplied)
    const pendingApproval = JSON.parse(report.pendingApproval)
    const beforeAfter = JSON.parse(report.beforeAfter)
    const reportData = JSON.parse(report.reportData)

    // Mark as viewed if not already
    if (!report.dashboardViewed) {
      await db.dailyReport.update({
        where: { id: reportId },
        data: {
          dashboardViewed: true,
          dashboardViewedAt: new Date(),
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: report.id,
        date: report.date,
        reportType: report.reportType,
        executionMode: report.executionMode,

        // Summary metrics
        sitesScanned: report.sitesScanned,
        pagesAnalyzed: report.pagesAnalyzed,
        issuesFound: report.issuesFound,
        issuesFixed: report.issuesFixed,
        issuesPending: report.issuesPending,
        imagesOptimized: report.imagesOptimized,

        // Impact metrics
        estimatedTrafficImpact: report.estimatedTrafficImpact,
        seoScoreChange: report.seoScoreChange,
        priorityIssuesResolved: report.priorityIssuesResolved,

        // Detailed data
        fixesApplied,
        pendingApproval,
        beforeAfter,
        reportData,

        // Status
        emailSent: report.emailSent,
        emailSentAt: report.emailSentAt,
        dashboardViewed: true, // Now marked as viewed
        dashboardViewedAt: report.dashboardViewedAt || new Date(),

        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      },
    })
  } catch (error) {
    console.error('Report fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
