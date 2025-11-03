import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// GET /api/user/profile - Get current user profile
export const dynamic = 'force-dynamic'

export async function GET() {
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
    // Get user from database with relations
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            connections: true,
            notifications: { where: { read: false } },
            webhooks: true,
            teamMemberships: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User profile not found'
          }
        },
        { status: 404 }
      )
    }

    // Return sanitized user profile
    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        plan: user.plan,
        role: user.role,
        executionMode: user.executionMode,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        subscription: user.subscriptions[0] || null,
        stats: {
          connections: user._count.connections,
          unreadNotifications: user._count.notifications,
          webhooks: user._count.webhooks,
          teams: user._count.teamMemberships,
        },
      },
    })
  } catch (error) {
    console.error('GET /api/user/profile error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch user profile',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}

// PATCH /api/user/profile - Update user profile
export async function PATCH(req: NextRequest) {
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
    const body = await req.json()
    const { name, executionMode } = body

    // Validate input
    if (executionMode && !['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Invalid execution mode. Must be AUTOMATIC, PLAN, or APPROVE'
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
            message: 'User profile not found'
          }
        },
        { status: 404 }
      )
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(executionMode && { executionMode }),
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'PROFILE_UPDATED',
        resource: 'user',
        resourceId: user.id,
        details: JSON.stringify({
          changes: {
            ...(name !== undefined && { name }),
            ...(executionMode && { executionMode }),
          }
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        executionMode: updatedUser.executionMode,
        updatedAt: updatedUser.updatedAt,
      },
    })
  } catch (error) {
    console.error('PATCH /api/user/profile error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update user profile',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}

// DELETE /api/user/account - Delete user account (soft delete, mark for deletion)
export async function DELETE() {
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
      include: {
        connections: true,
        subscriptions: { where: { status: 'ACTIVE' } },
      },
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

    // Check for active subscriptions
    if (user.subscriptions.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ACTIVE_SUBSCRIPTION',
            message: 'Please cancel your active subscription before deleting your account',
            details: { subscriptionId: user.subscriptions[0].stripeSubscriptionId }
          }
        },
        { status: 409 }
      )
    }

    // Create final audit log before deletion
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'ACCOUNT_DELETED',
        resource: 'user',
        resourceId: user.id,
        details: JSON.stringify({
          connectionsCount: user.connections.length,
          deletedAt: new Date().toISOString()
        }),
      },
    })

    // Delete user (cascade will handle related records)
    await db.user.delete({
      where: { id: user.id },
    })

    return NextResponse.json({
      success: true,
      data: {
        message: 'Account successfully deleted',
        deletedAt: new Date().toISOString()
      },
    })
  } catch (error) {
    console.error('DELETE /api/user/account error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to delete account',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
