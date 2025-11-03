import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { FixStatus } from '@prisma/client'

// GET /api/fixes - List all fixes for user
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
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

    // Get query parameters for filtering and pagination
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100)
    const status = searchParams.get('status')
    const connectionId = searchParams.get('connectionId')

    // Build where clause
    const connections = await db.connection.findMany({
      where: { userId: user.id },
      select: { id: true },
    })

    const connectionIds = connections.map((c) => c.id)

    const where = {
      connectionId: connectionId
        ? connectionId
        : { in: connectionIds },
      ...(status && Object.values(FixStatus).includes(status as FixStatus) && { status: status as FixStatus }),
    }

    // Get fixes with pagination
    const [fixes, total] = await Promise.all([
      db.fix.findMany({
        where,
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
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.fix.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: fixes,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET /api/fixes error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch fixes',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
