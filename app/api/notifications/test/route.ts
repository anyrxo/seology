import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createNotification } from '@/lib/notifications'
import { NotificationType } from '@prisma/client'

// This is a development-only endpoint for testing notifications
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    )
  }

  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, message, metadata } = body

    if (!type || !message) {
      return NextResponse.json(
        { error: 'Type and message are required' },
        { status: 400 }
      )
    }

    // Validate notification type
    const validTypes: NotificationType[] = [
      'CRAWL_COMPLETE',
      'FIX_APPLIED',
      'FIX_FAILED',
      'USAGE_WARNING',
      'USAGE_LIMIT_REACHED',
      'SUBSCRIPTION_UPDATED',
      'PAYMENT_FAILED',
      'ROLLBACK_EXPIRING',
    ]

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid notification type' },
        { status: 400 }
      )
    }

    const notification = await createNotification({
      userId,
      type,
      message,
      metadata: metadata || {},
    })

    return NextResponse.json({
      success: true,
      notification,
    })
  } catch (error) {
    console.error('Error creating test notification:', error)
    return NextResponse.json(
      { error: 'Failed to create test notification' },
      { status: 500 }
    )
  }
}
