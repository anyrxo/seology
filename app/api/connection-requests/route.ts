import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Mark this route as dynamic (uses auth/headers)
export const dynamic = 'force-dynamic'

// POST /api/connection-requests - Create a new connection request
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, email: true, name: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Parse request body
    const { platform, storeUrl, storeName, message } = await req.json()

    // Validation
    if (!platform || !storeUrl) {
      return NextResponse.json(
        { error: 'Platform and store URL are required' },
        { status: 400 }
      )
    }

    // Check if user already has a pending request for this store
    const existingRequest = await db.connectionRequest.findFirst({
      where: {
        userId: user.id,
        storeUrl,
        status: {
          in: ['PENDING', 'APPROVED', 'LINK_SENT'],
        },
      },
    })

    if (existingRequest) {
      return NextResponse.json(
        { error: 'You already have a pending request for this store' },
        { status: 400 }
      )
    }

    // Create connection request
    const connectionRequest = await db.connectionRequest.create({
      data: {
        userId: user.id,
        platform,
        storeUrl,
        storeName,
        message,
        status: 'PENDING',
      },
    })

    // Create notification for admins
    const admins = await db.user.findMany({
      where: { role: 'ADMIN' },
      select: { id: true },
    })

    await Promise.all(
      admins.map((admin) =>
        db.notification.create({
          data: {
            userId: admin.id,
            type: 'INFO',
            title: 'New Connection Request',
            message: `${user.email} requested to connect ${platform} store: ${storeUrl}`,
            actionUrl: '/admin/connection-requests',
            icon: '🔗',
            color: 'blue',
          },
        })
      )
    )

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'CONNECTION_REQUEST_CREATED',
        resource: 'connection_request',
        resourceId: connectionRequest.id,
        details: JSON.stringify({
          platform,
          storeUrl,
          storeName,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: connectionRequest,
    })
  } catch (error) {
    console.error('Error creating connection request:', error)
    return NextResponse.json(
      { error: 'Failed to create connection request' },
      { status: 500 }
    )
  }
}

// GET /api/connection-requests - Get user's connection requests
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user's connection requests
    const requests = await db.connectionRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: requests,
    })
  } catch (error) {
    console.error('Error fetching connection requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch connection requests' },
      { status: 500 }
    )
  }
}
