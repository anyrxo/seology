/**
 * Admin Single User API
 * Update user role, plan, and ban/suspend
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/middleware/admin-guard'

export const dynamic = 'force-dynamic'

// GET single user
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const adminCheck = await verifyAdmin()
    if ('error' in adminCheck) {
      return adminCheck.error
    }

    const user = await db.user.findUnique({
      where: { id: params.userId },
      include: {
        connections: {
          include: {
            _count: {
              select: {
                issues: true,
                fixes: true,
              },
            },
          },
        },
        subscriptions: true,
        auditLogs: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'User not found' },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { user },
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch user' },
      },
      { status: 500 }
    )
  }
}

// PATCH update user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const adminCheck = await verifyAdmin()
    if ('error' in adminCheck) {
      return adminCheck.error
    }

    const body = await req.json()
    const { role, plan, executionMode } = body

    interface UserUpdates {
      role?: 'USER' | 'ADMIN'
      plan?: 'STARTER' | 'GROWTH' | 'SCALE'
      executionMode?: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
    }

    const updates: UserUpdates = {}

    if (role && ['USER', 'ADMIN'].includes(role)) {
      updates.role = role as 'USER' | 'ADMIN'
    }

    if (plan && ['STARTER', 'GROWTH', 'SCALE'].includes(plan)) {
      updates.plan = plan as 'STARTER' | 'GROWTH' | 'SCALE'
    }

    if (executionMode && ['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      updates.executionMode = executionMode as 'AUTOMATIC' | 'PLAN' | 'APPROVE'
    }

    const user = await db.user.update({
      where: { id: params.userId },
      data: updates,
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: adminCheck.userId,
        action: 'USER_UPDATED',
        resource: 'user',
        resourceId: params.userId,
        details: JSON.stringify({ updates }),
      },
    })

    return NextResponse.json({
      success: true,
      data: { user },
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to update user' },
      },
      { status: 500 }
    )
  }
}
