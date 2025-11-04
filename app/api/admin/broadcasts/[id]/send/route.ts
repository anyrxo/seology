import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/middleware/admin-guard'

// POST /api/admin/broadcasts/[id]/send - Send broadcast
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Get the broadcast
    const broadcast = await db.broadcast.findUnique({
      where: { id: params.id },
    })

    if (!broadcast) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Broadcast not found' } },
        { status: 404 }
      )
    }

    // Check if already sent
    if (broadcast.status === 'SENT') {
      return NextResponse.json(
        { success: false, error: { code: 'ALREADY_SENT', message: 'Broadcast already sent' } },
        { status: 400 }
      )
    }

    // Update status to SENDING
    await db.broadcast.update({
      where: { id: params.id },
      data: { status: 'SENDING' },
    })

    // Determine target users
    let targetUserIds: string[] = []

    if (broadcast.targetAudience === 'all') {
      const users = await db.user.findMany({ select: { id: true } })
      targetUserIds = users.map((u) => u.id)
    } else if (broadcast.targetAudience === 'plan') {
      const targetPlans = JSON.parse(broadcast.targetPlans)
      const users = await db.user.findMany({
        where: { plan: { in: targetPlans } },
        select: { id: true },
      })
      targetUserIds = users.map((u) => u.id)
    } else if (broadcast.targetAudience === 'role') {
      const targetRoles = JSON.parse(broadcast.targetRoles)
      const users = await db.user.findMany({
        where: { role: { in: targetRoles } },
        select: { id: true },
      })
      targetUserIds = users.map((u) => u.id)
    } else if (broadcast.targetAudience === 'custom') {
      targetUserIds = JSON.parse(broadcast.targetUserIds)
    }

    // Create notifications for all target users
    const notifications = targetUserIds.map((userId) => ({
      userId,
      type: broadcast.type,
      title: broadcast.title,
      message: broadcast.message,
      actionUrl: broadcast.actionUrl,
      read: false,
    }))

    // Batch create notifications
    await db.notification.createMany({
      data: notifications,
    })

    // Update broadcast status to SENT
    const updatedBroadcast = await db.broadcast.update({
      where: { id: params.id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        deliveredCount: targetUserIds.length,
        recipientCount: targetUserIds.length,
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: session.userId,
        action: 'BROADCAST_SENT',
        resource: 'broadcast',
        resourceId: params.id,
        details: JSON.stringify({
          title: broadcast.title,
          recipientCount: targetUserIds.length,
          targetAudience: broadcast.targetAudience,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedBroadcast,
      meta: {
        recipientCount: targetUserIds.length,
      },
    })
  } catch (error) {
    console.error('Failed to send broadcast:', error)

    // Update status to FAILED if error occurred
    try {
      await db.broadcast.update({
        where: { id: params.id },
        data: { status: 'FAILED' },
      })
    } catch (updateError) {
      console.error('Failed to update broadcast status to FAILED:', updateError)
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to send broadcast',
        },
      },
      { status: 500 }
    )
  }
}
