import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUnreadCount } from '@/lib/notifications'
import { db } from '@/lib/db'

// GET /api/notifications/unread-count - Get unread notification count
export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()

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

  const count = await getUnreadCount(user.id)

  return NextResponse.json({
    success: true,
    data: { count },
  })
}
