import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/sites/[id] - Get single site details
export async function GET(req: NextRequest, context: RouteContext) {
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

  // Get connection with full details
  const connection = await db.connection.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      issues: {
        orderBy: { detectedAt: 'desc' },
        take: 50,
      },
      fixes: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      metrics: {
        orderBy: { date: 'desc' },
        take: 30,
      },
      _count: {
        select: {
          issues: true,
          fixes: true,
        },
      },
    },
  })

  if (!connection) {
    return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: connection,
  })
}

// PATCH /api/sites/[id] - Update site connection
export async function PATCH(req: NextRequest, context: RouteContext) {
  const session = await auth()
  const { id } = await context.params

  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { displayName, status } = body

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: session.userId },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Update connection
  const connection = await db.connection.updateMany({
    where: {
      id,
      userId: user.id,
    },
    data: {
      ...(displayName && { displayName }),
      ...(status && { status }),
      updatedAt: new Date(),
    },
  })

  if (connection.count === 0) {
    return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
  }

  // Create audit log
  await db.auditLog.create({
    data: {
      userId: user.id,
      connectionId: id,
      action: 'CONNECTION_UPDATED',
      details: JSON.stringify({ displayName, status }),
    },
  })

  return NextResponse.json({
    success: true,
  })
}

// DELETE /api/sites/[id] - Delete site connection
export async function DELETE(req: NextRequest, context: RouteContext) {
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

  // Delete connection (cascades to all related records)
  const connection = await db.connection.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  })

  if (connection.count === 0) {
    return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
  }

  // Create audit log
  await db.auditLog.create({
    data: {
      userId: user.id,
      action: 'CONNECTION_DELETED',
      details: JSON.stringify({ connectionId: id }),
    },
  })

  return NextResponse.json({
    success: true,
  })
}
