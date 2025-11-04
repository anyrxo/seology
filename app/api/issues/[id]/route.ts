import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// GET /api/issues/[id] - Get issue details
export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      },
      { status: 401 }
    )
  }

  try {
    const { id } = params

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        },
        { status: 404 }
      )
    }

    // Get user's connections
    const connections = await db.connection.findMany({
      where: { userId: user.id },
      select: { id: true },
    })

    const connectionIds = connections.map((c) => c.id)

    // Get issue with details
    const issue = await db.issue.findFirst({
      where: {
        id,
        connectionId: { in: connectionIds },
      },
      include: {
        connection: {
          select: {
            id: true,
            platform: true,
            domain: true,
            displayName: true,
          },
        },
        fixes: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            description: true,
            status: true,
            method: true,
            appliedAt: true,
            rolledBackAt: true,
            createdAt: true,
          },
        },
      },
    })

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ISSUE_NOT_FOUND',
            message: 'Issue not found or access denied'
          }
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: issue,
    })
  } catch (error) {
    console.error('GET /api/issues/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch issue details',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}

// PATCH /api/issues/[id] - Update an issue
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      },
      { status: 401 }
    )
  }

  try {
    const { id } = params
    const body = await req.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Status is required'
          }
        },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        },
        { status: 404 }
      )
    }

    // Get user's connections
    const connections = await db.connection.findMany({
      where: { userId: user.id },
      select: { id: true },
    })

    const connectionIds = connections.map((c) => c.id)

    // Verify issue exists and belongs to user
    const issue = await db.issue.findFirst({
      where: {
        id,
        connectionId: { in: connectionIds },
      },
    })

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ISSUE_NOT_FOUND',
            message: 'Issue not found or access denied'
          }
        },
        { status: 404 }
      )
    }

    // Update the issue
    const updatedIssue = await db.issue.update({
      where: { id },
      data: { status },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        connectionId: issue.connectionId,
        action: 'ISSUE_UPDATED',
        resource: 'issue',
        resourceId: id,
        details: JSON.stringify({
          oldStatus: issue.status,
          newStatus: status,
          type: issue.type,
          title: issue.title,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedIssue,
    })
  } catch (error) {
    console.error('PATCH /api/issues/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update issue',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}

// DELETE /api/issues/[id] - Delete an issue
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      },
      { status: 401 }
    )
  }

  try {
    const { id } = params

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        },
        { status: 404 }
      )
    }

    // Get user's connections
    const connections = await db.connection.findMany({
      where: { userId: user.id },
      select: { id: true },
    })

    const connectionIds = connections.map((c) => c.id)

    // Verify issue exists and belongs to user
    const issue = await db.issue.findFirst({
      where: {
        id,
        connectionId: { in: connectionIds },
      },
    })

    if (!issue) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ISSUE_NOT_FOUND',
            message: 'Issue not found or access denied'
          }
        },
        { status: 404 }
      )
    }

    // Delete the issue (cascade will handle related fixes)
    await db.issue.delete({
      where: { id },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        connectionId: issue.connectionId,
        action: 'ISSUE_DELETED',
        resource: 'issue',
        resourceId: id,
        details: JSON.stringify({
          type: issue.type,
          title: issue.title,
          severity: issue.severity,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        message: 'Issue deleted successfully',
        id,
      },
    })
  } catch (error) {
    console.error('DELETE /api/issues/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to delete issue',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
