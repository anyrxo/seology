import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/middleware/admin-guard'

// GET /api/admin/broadcasts - List all broadcasts
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'SENT' | 'FAILED' | 'CANCELLED' | null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where = status ? { status } : {}

    const [broadcasts, total] = await Promise.all([
      db.broadcast.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.broadcast.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: broadcasts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Failed to fetch broadcasts:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch broadcasts',
        },
      },
      { status: 500 }
    )
  }
}

// POST /api/admin/broadcasts - Create new broadcast
export async function POST(request: NextRequest) {
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
    const {
      type,
      title,
      message,
      richMessage,
      actionUrl,
      actionText,
      targetAudience,
      targetPlans,
      targetRoles,
      targetUserIds,
      scheduledFor,
      sendImmediately,
      isTemplate,
      templateName,
    } = body

    // Validate required fields
    if (!type || !title || !message) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Type, title, and message are required',
          },
        },
        { status: 400 }
      )
    }

    // Calculate recipient count
    let recipientCount = 0
    if (targetAudience === 'all') {
      recipientCount = await db.user.count()
    } else if (targetAudience === 'plan') {
      const plans = JSON.parse(targetPlans || '[]')
      recipientCount = await db.user.count({
        where: { plan: { in: plans } },
      })
    } else if (targetAudience === 'role') {
      const roles = JSON.parse(targetRoles || '[]')
      recipientCount = await db.user.count({
        where: { role: { in: roles } },
      })
    } else if (targetAudience === 'custom') {
      const userIds = JSON.parse(targetUserIds || '[]')
      recipientCount = userIds.length
    }

    const broadcast = await db.broadcast.create({
      data: {
        type,
        title,
        message,
        richMessage,
        actionUrl,
        actionText,
        targetAudience: targetAudience || 'all',
        targetPlans: targetPlans || '[]',
        targetRoles: targetRoles || '[]',
        targetUserIds: targetUserIds || '[]',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        sendImmediately: sendImmediately ?? true,
        status: sendImmediately ? 'DRAFT' : scheduledFor ? 'SCHEDULED' : 'DRAFT',
        recipientCount,
        isTemplate: isTemplate ?? false,
        templateName,
        createdBy: session.userId,
      },
    })

    return NextResponse.json({
      success: true,
      data: broadcast,
    })
  } catch (error) {
    console.error('Failed to create broadcast:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create broadcast',
        },
      },
      { status: 500 }
    )
  }
}
