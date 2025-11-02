import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// PATCH /api/notifications/[id]/read - Mark notification as read
// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest, context: RouteContext) {
  const session = await auth()
  const { id } = await context.params

  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: session.userId },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Update notification
  const notification = await db.notification.updateMany({
    where: {
      id,
      userId: user.id,
    },
    data: {
      read: true,
    },
  })

  if (notification.count === 0) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
  })
}
