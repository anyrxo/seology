import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

/**
 * Get all issues for a specific site
 * GET /api/sites/:id/issues?severity=high&category=technical&status=detected
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id: connectionId } = await params
    const searchParams = request.nextUrl.searchParams

    // Parse query parameters
    const severity = searchParams.get('severity')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Get connection and verify ownership
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
      include: { user: true },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: 'Site not found' },
        { status: 404 }
      )
    }

    if (connection.user.clerkUserId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Build where clause for filtering
    const where: any = {
      connectionId: connectionId,
    }

    if (severity) {
      where.severity = severity.toUpperCase()
    }

    if (category) {
      where.category = category.toUpperCase()
    }

    if (status) {
      where.status = status.toUpperCase()
    }

    // Get total count
    const total = await db.issue.count({ where })

    // Get issues with pagination
    const issues = await db.issue.findMany({
      where,
      orderBy: [
        { severity: 'asc' }, // Critical first
        { estimatedImpact: 'desc' }, // Higher impact first
        { detectedAt: 'desc' }, // Newest first
      ],
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json({
      success: true,
      data: {
        issues,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      },
    })
  } catch (error) {
    console.error('Get issues error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get issues' },
      { status: 500 }
    )
  }
}

/**
 * Get issue statistics for a site (helper function - not an API route)
 */
async function getStats(connectionId: string, userId: string) {
  try {
    // Verify ownership
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
      include: { user: true },
    })

    if (!connection || connection.user.clerkUserId !== userId) {
      throw new Error('Unauthorized')
    }

    // Get counts by severity
    const bySeverity = await db.issue.groupBy({
      by: ['severity'],
      where: { connectionId },
      _count: true,
    })

    // Get counts by status
    const byStatus = await db.issue.groupBy({
      by: ['status'],
      where: { connectionId },
      _count: true,
    })

    // Get counts by category
    const byCategory = await db.issue.groupBy({
      by: ['category'],
      where: { connectionId },
      _count: true,
    })

    return {
      bySeverity: bySeverity.reduce((acc, item) => {
        acc[item.severity.toLowerCase()] = item._count
        return acc
      }, {} as Record<string, number>),
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status.toLowerCase()] = item._count
        return acc
      }, {} as Record<string, number>),
      byCategory: byCategory.reduce((acc, item) => {
        acc[item.category.toLowerCase()] = item._count
        return acc
      }, {} as Record<string, number>),
    }
  } catch (error) {
    console.error('Get issue stats error:', error)
    throw error
  }
}
