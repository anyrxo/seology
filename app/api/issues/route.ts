import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { IssueStatus, Severity } from '@prisma/client'

// GET /api/issues - List all issues for user
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
    const severity = searchParams.get('severity')
    const connectionId = searchParams.get('connectionId')
    const type = searchParams.get('type')

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
      ...(status && Object.values(IssueStatus).includes(status as IssueStatus) && { status: status as IssueStatus }),
      ...(severity && Object.values(Severity).includes(severity as Severity) && { severity: severity as Severity }),
      ...(type && { type }),
    }

    // Get issues with pagination
    const [issues, total] = await Promise.all([
      db.issue.findMany({
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
          fixes: {
            select: {
              id: true,
              status: true,
              appliedAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: [
          { status: 'asc' },
          { severity: 'asc' },
          { createdAt: 'desc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.issue.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: issues,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET /api/issues error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch issues',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
