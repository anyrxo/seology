/**
 * API Route: Delete Connection
 *
 * Allows users to disconnect their CMS connections
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find connection
    const connection = await db.connection.findUnique({
      where: { id: params.id },
    })

    if (!connection) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
    }

    // Verify ownership
    if (connection.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Delete connection (cascades to related records)
    await db.connection.delete({
      where: { id: params.id },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: `${connection.platform}_DISCONNECTED`,
        resource: 'connection',
        resourceId: connection.id,
        details: JSON.stringify({
          platform: connection.platform,
          domain: connection.domain,
        }),
      },
    })

    // Create notification
    await db.notification.create({
      data: {
        userId: user.id,
        type: 'INFO',
        title: 'Store Disconnected',
        message: `${connection.displayName || connection.domain} has been disconnected.`,
        icon: '🔌',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Connection deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting connection:', error)
    return NextResponse.json(
      { error: 'Failed to delete connection' },
      { status: 500 }
    )
  }
}
