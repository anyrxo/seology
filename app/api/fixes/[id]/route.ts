import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// GET /api/fixes/[id] - Get fix details
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

    // Get fix with details
    const fix = await db.fix.findFirst({
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
        issue: {
          select: {
            id: true,
            type: true,
            title: true,
            severity: true,
            pageUrl: true,
            details: true,
            status: true,
          },
        },
      },
    })

    if (!fix) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FIX_NOT_FOUND',
            message: 'Fix not found or access denied'
          }
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: fix,
    })
  } catch (error) {
    console.error('GET /api/fixes/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch fix details',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
