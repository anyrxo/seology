import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin, getAdminUser } from '@/lib/admin'

/**
 * POST /api/admin/broadcast
 * Send notification to all users
 * Admin only
 */
export async function POST(request: Request) {
  try {
    // Verify admin access
    const admin = await getAdminUser()

    const { title, message, type } = await request.json()

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: 'Title and message are required' },
        { status: 400 }
      )
    }

    // Get all users
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true
      }
    })

    // In production, this would integrate with an email service
    // For now, we'll just create audit logs
    const auditLogs = users.map(user => ({
      userId: user.id,
      action: 'admin_broadcast_received',
      resource: 'notification',
      resourceId: 'broadcast',
      details: {
        title,
        message,
        type: type || 'info',
        sentBy: admin?.emailAddresses?.[0]?.emailAddress
      }
    }))

    // Create all audit logs
    await db.auditLog.createMany({
      data: auditLogs
    })

    // Log the broadcast action
    await db.auditLog.create({
      data: {
        userId: admin?.id || 'admin',
        action: 'admin_broadcast_sent',
        resource: 'notification',
        resourceId: 'broadcast',
        details: {
          title,
          message,
          type: type || 'info',
          recipientCount: users.length,
          adminEmail: admin?.emailAddresses?.[0]?.emailAddress
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        recipientCount: users.length,
        message: 'Broadcast notification sent successfully'
      }
    })
  } catch (error) {
    console.error('Admin broadcast error:', error)
    return NextResponse.json(
      { success: false, error: 'Unauthorized or error sending broadcast' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    )
  }
}
