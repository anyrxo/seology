import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/admin/connection-requests/[id]/reject - Reject connection request
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const adminUser = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true },
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const requestId = params.id
    const { reason } = await req.json()

    // Get the connection request
    const request = await db.connectionRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    if (request.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Request is not pending' },
        { status: 400 }
      )
    }

    // Update request status
    const updatedRequest = await db.connectionRequest.update({
      where: { id: requestId },
      data: {
        status: 'REJECTED',
        rejectionReason: reason || 'Request rejected by admin',
        reviewedBy: adminUser.id,
        reviewedAt: new Date(),
      },
    })

    // Create notification for customer
    await db.notification.create({
      data: {
        userId: request.userId,
        type: 'WARNING',
        title: 'Connection Request Update',
        message: reason || 'Your connection request was not approved at this time. Please contact support for more information.',
        icon: '⚠️',
        color: 'orange',
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: adminUser.id,
        action: 'CONNECTION_REQUEST_REJECTED',
        resource: 'connection_request',
        resourceId: requestId,
        details: JSON.stringify({
          customerUserId: request.userId,
          customerEmail: request.user.email,
          platform: request.platform,
          storeUrl: request.storeUrl,
          rejectionReason: reason,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedRequest,
    })
  } catch (error) {
    console.error('Error rejecting connection request:', error)
    return NextResponse.json(
      { error: 'Failed to reject connection request' },
      { status: 500 }
    )
  }
}
