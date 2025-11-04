import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/middleware/admin-guard'

// GET /api/admin/broadcasts/stats - Get broadcast statistics
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const hasAdminRole = await isAdmin(session.userId)
    if (!hasAdminRole) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      )
    }

    // Get counts by status
    const [
      totalBroadcasts,
      draftCount,
      scheduledCount,
      sentCount,
      failedCount,
      totalRecipients,
      totalDelivered,
    ] = await Promise.all([
      db.broadcast.count(),
      db.broadcast.count({ where: { status: 'DRAFT' } }),
      db.broadcast.count({ where: { status: 'SCHEDULED' } }),
      db.broadcast.count({ where: { status: 'SENT' } }),
      db.broadcast.count({ where: { status: 'FAILED' } }),
      db.broadcast.aggregate({
        _sum: { recipientCount: true },
      }),
      db.broadcast.aggregate({
        _sum: { deliveredCount: true },
      }),
    ])

    // Get recent broadcasts
    const recentBroadcasts = await db.broadcast.findMany({
      where: { status: 'SENT' },
      orderBy: { sentAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        type: true,
        sentAt: true,
        recipientCount: true,
        deliveredCount: true,
      },
    })

    // Get broadcast performance over time (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const broadcastsOverTime = await db.broadcast.findMany({
      where: {
        sentAt: { gte: thirtyDaysAgo },
        status: 'SENT',
      },
      select: {
        sentAt: true,
        recipientCount: true,
      },
      orderBy: { sentAt: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalBroadcasts,
          draftCount,
          scheduledCount,
          sentCount,
          failedCount,
          totalRecipients: totalRecipients._sum.recipientCount || 0,
          totalDelivered: totalDelivered._sum.deliveredCount || 0,
          deliveryRate:
            totalRecipients._sum.recipientCount
              ? ((totalDelivered._sum.deliveredCount || 0) /
                  totalRecipients._sum.recipientCount) *
                100
              : 0,
        },
        recentBroadcasts,
        broadcastsOverTime: broadcastsOverTime.map((b) => ({
          date: b.sentAt?.toISOString().split('T')[0],
          count: 1,
          recipients: b.recipientCount,
        })),
      },
    })
  } catch (error) {
    console.error('Failed to fetch broadcast stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch broadcast statistics',
        },
      },
      { status: 500 }
    )
  }
}
