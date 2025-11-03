/**
 * Admin Broadcast API
 * Send platform-wide announcements and notifications
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/middleware/admin-guard'
import { Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'

// POST send broadcast notification
export async function POST(req: NextRequest) {
  try {
    const adminCheck = await verifyAdmin()
    if ('error' in adminCheck) {
      return adminCheck.error
    }

    const body = await req.json()
    const { type, title, message, actionUrl, userIds, plan, role } = body

    if (!type || !title || !message) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_INPUT', message: 'Missing required fields' },
        },
        { status: 400 }
      )
    }

    // Build user filter
    let targetUsers: string[] = []

    if (userIds && Array.isArray(userIds)) {
      // Specific users
      targetUsers = userIds
    } else {
      // Filter by plan or role
      const where: Prisma.UserWhereInput = {}

      if (plan && ['STARTER', 'GROWTH', 'SCALE'].includes(plan)) {
        where.plan = plan as 'STARTER' | 'GROWTH' | 'SCALE'
      }

      if (role && ['USER', 'ADMIN'].includes(role)) {
        where.role = role as 'USER' | 'ADMIN'
      }

      const users = await db.user.findMany({
        where,
        select: { id: true },
      })

      targetUsers = users.map((u) => u.id)
    }

    // Create notifications for all target users
    const notifications = await db.notification.createMany({
      data: targetUsers.map((userId) => ({
        userId,
        type,
        title,
        message,
        actionUrl: actionUrl || null,
      })),
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: adminCheck.userId,
        action: 'BROADCAST_SENT',
        resource: 'notification',
        details: JSON.stringify({
          type,
          title,
          recipientCount: targetUsers.length,
          filters: { plan, role },
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        message: `Broadcast sent to ${targetUsers.length} users`,
        recipientCount: targetUsers.length,
      },
    })
  } catch (error) {
    console.error('Error sending broadcast:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to send broadcast' },
      },
      { status: 500 }
    )
  }
}
