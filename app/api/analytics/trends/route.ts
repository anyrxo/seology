import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// GET /api/analytics/trends - Get historical trends data
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
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
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30', 10)
    const metric = searchParams.get('metric') || 'all' // 'traffic', 'speed', 'issues', 'fixes', 'all'

    // Validate days parameter
    if (days < 1 || days > 365) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETER',
            message: 'Days parameter must be between 1 and 365'
          }
        },
        { status: 400 }
      )
    }

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
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    // Get metrics data
    const metrics = await db.metric.findMany({
      where: {
        connectionId: { in: connectionIds },
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    })

    // Get issues data over time
    const issuesOverTime = await db.$queryRaw<Array<{ date: Date; count: number }>>`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM "Issue"
      WHERE connection_id IN (${connectionIds.join(',')})
        AND created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // Get fixes data over time
    const fixesOverTime = await db.$queryRaw<Array<{ date: Date; count: number }>>`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM "Fix"
      WHERE connection_id IN (${connectionIds.join(',')})
        AND created_at >= ${startDate}
        AND status = 'APPLIED'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // Define types for metrics aggregation
    interface DayMetrics {
      date: string
      organicTraffic: number[]
      pageSpeed: number[]
      issuesCount: number[]
      fixesCount: number[]
    }

    interface TrendDataPoint {
      date: string
      organicTraffic: number | null
      pageSpeed: number | null
      issuesCount: number | null
      fixesCount: number | null
    }

    // Format metrics by day
    const metricsByDay = metrics.reduce((acc, m) => {
      const dateKey = m.date.toISOString().split('T')[0]
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          organicTraffic: [],
          pageSpeed: [],
          issuesCount: [],
          fixesCount: [],
        }
      }
      if (m.organicTraffic) acc[dateKey].organicTraffic.push(m.organicTraffic)
      if (m.pageSpeed) acc[dateKey].pageSpeed.push(m.pageSpeed)
      if (m.issuesCount) acc[dateKey].issuesCount.push(m.issuesCount)
      if (m.fixesCount) acc[dateKey].fixesCount.push(m.fixesCount)
      return acc
    }, {} as Record<string, DayMetrics>)

    // Calculate averages per day
    const trendsData: TrendDataPoint[] = Object.values(metricsByDay).map((day) => ({
      date: day.date,
      organicTraffic: day.organicTraffic.length > 0
        ? Math.round(day.organicTraffic.reduce((a: number, b: number) => a + b, 0) / day.organicTraffic.length)
        : null,
      pageSpeed: day.pageSpeed.length > 0
        ? parseFloat((day.pageSpeed.reduce((a: number, b: number) => a + b, 0) / day.pageSpeed.length).toFixed(2))
        : null,
      issuesCount: day.issuesCount.length > 0
        ? Math.round(day.issuesCount.reduce((a: number, b: number) => a + b, 0) / day.issuesCount.length)
        : null,
      fixesCount: day.fixesCount.length > 0
        ? Math.round(day.fixesCount.reduce((a: number, b: number) => a + b, 0) / day.fixesCount.length)
        : null,
    }))

    // Add issues and fixes counts from raw queries
    const issuesMap = new Map(issuesOverTime.map(i => [i.date.toISOString().split('T')[0], i.count]))
    const fixesMap = new Map(fixesOverTime.map(f => [f.date.toISOString().split('T')[0], f.count]))

    trendsData.forEach((day) => {
      if (!day.issuesCount && issuesMap.has(day.date)) {
        day.issuesCount = issuesMap.get(day.date) ?? null
      }
      if (!day.fixesCount && fixesMap.has(day.date)) {
        day.fixesCount = fixesMap.get(day.date) ?? null
      }
    })

    // Filter by metric type if specified
    let filteredData: Array<Partial<TrendDataPoint> & { date: string }> = trendsData
    if (metric !== 'all') {
      filteredData = trendsData.map((day) => {
        const filtered: Partial<TrendDataPoint> & { date: string } = { date: day.date }
        if (metric === 'traffic') filtered.organicTraffic = day.organicTraffic
        if (metric === 'speed') filtered.pageSpeed = day.pageSpeed
        if (metric === 'issues') filtered.issuesCount = day.issuesCount
        if (metric === 'fixes') filtered.fixesCount = day.fixesCount
        return filtered
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        period: {
          days,
          startDate: startDate.toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
        },
        trends: filteredData,
      },
    })
  } catch (error) {
    console.error('GET /api/analytics/trends error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch trends data',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
