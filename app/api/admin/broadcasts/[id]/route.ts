import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/middleware/admin-guard'

// GET /api/admin/broadcasts/[id] - Get single broadcast
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const hasAdminRole = await isAdmin(session.userId)
    if (!hasAdminRole) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      )
    }

    const broadcast = await db.broadcast.findUnique({
      where: { id: params.id },
    })

    if (!broadcast) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Broadcast not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: broadcast,
    })
  } catch (error) {
    console.error('Failed to fetch broadcast:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch broadcast',
        },
      },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/broadcasts/[id] - Update broadcast
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const hasAdminRole = await isAdmin(session.userId)
    if (!hasAdminRole) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      )
    }

    const body = await request.json()

    const broadcast = await db.broadcast.update({
      where: { id: params.id },
      data: body,
    })

    return NextResponse.json({
      success: true,
      data: broadcast,
    })
  } catch (error) {
    console.error('Failed to update broadcast:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update broadcast',
        },
      },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/broadcasts/[id] - Delete broadcast
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const hasAdminRole = await isAdmin(session.userId)
    if (!hasAdminRole) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      )
    }

    await db.broadcast.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      data: { message: 'Broadcast deleted successfully' },
    })
  } catch (error) {
    console.error('Failed to delete broadcast:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to delete broadcast',
        },
      },
      { status: 500 }
    )
  }
}
