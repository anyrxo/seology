import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

/**
 * GET /api/reports
 * List user's daily reports with pagination
 */
export async function GET(request: NextRequest) {
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

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const unreadOnly = searchParams.get('unread') === 'true'

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.DailyReportWhereInput = { userId: user.id }
    if (unreadOnly) {
      where.dashboardViewed = false
    }

    // Get reports with pagination
    const [reports, total] = await Promise.all([
      db.dailyReport.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          date: true,
          reportType: true,
          executionMode: true,
          sitesScanned: true,
          pagesAnalyzed: true,
          issuesFound: true,
          issuesFixed: true,
          issuesPending: true,
          imagesOptimized: true,
          estimatedTrafficImpact: true,
          seoScoreChange: true,
          priorityIssuesResolved: true,
          emailSent: true,
          emailSentAt: true,
          dashboardViewed: true,
          dashboardViewedAt: true,
          createdAt: true,
        },
      }),
      db.dailyReport.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: reports,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Reports fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch reports',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
