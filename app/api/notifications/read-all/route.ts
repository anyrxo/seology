import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { markAllAsRead } from '@/lib/notifications'

export async function PATCH() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await markAllAsRead(userId)
    return NextResponse.json({
      success: true,
      updated: result.count,
    })
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark all notifications as read' },
      { status: 500 }
    )
  }
}
