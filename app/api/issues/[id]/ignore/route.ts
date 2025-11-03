import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// POST /api/issues/[id]/ignore - Ignore an issue
export const dynamic = 'force-dynamic'

export async function POST(
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

    // Check if already ignored
    if (issue.status === 'IGNORED') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ALREADY_IGNORED',
            message: 'Issue is already ignored'
          }
        },
        { status: 409 }
      )
    }

    // Update issue status to IGNORED
    const updatedIssue = await db.issue.update({
      where: { id },
      data: {
        status: 'IGNORED',
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        connectionId: issue.connectionId,
        action: 'ISSUE_IGNORED',
        resource: 'issue',
        resourceId: id,
        details: JSON.stringify({
          type: issue.type,
          title: issue.title,
          previousStatus: issue.status,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedIssue,
    })
  } catch (error) {
    console.error('POST /api/issues/[id]/ignore error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to ignore issue',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
