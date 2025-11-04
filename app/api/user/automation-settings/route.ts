import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

/**
 * GET /api/user/automation-settings
 * Get user's automation settings
 */
export async function GET() {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { clerkId },
      select: {
        dailyAutomationEnabled: true,
        dailyAutomationTime: true,
        dailyAutomationTimezone: true,
        executionMode: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        dailyAutomationEnabled: user.dailyAutomationEnabled || false,
        dailyAutomationTime: user.dailyAutomationTime || '09:00',
        dailyAutomationTimezone: user.dailyAutomationTimezone || 'America/New_York',
        executionMode: user.executionMode,
        emailReportsEnabled: true, // Always enabled for now
        dashboardNotificationsEnabled: true, // Always enabled for now
      },
    })
  } catch (error) {
    console.error('Failed to get automation settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to get automation settings' },
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/user/automation-settings
 * Update user's automation settings
 */
export async function PUT(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      dailyAutomationEnabled,
      dailyAutomationTime,
      dailyAutomationTimezone,
      executionMode,
    } = body

    // Validate execution mode
    if (executionMode && !['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_INPUT', message: 'Invalid execution mode' },
        },
        { status: 400 }
      )
    }

    // Validate time format (HH:MM)
    if (dailyAutomationTime && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dailyAutomationTime)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_INPUT', message: 'Invalid time format. Use HH:MM' },
        },
        { status: 400 }
      )
    }

    const user = await db.user.update({
      where: { clerkId },
      data: {
        dailyAutomationEnabled:
          dailyAutomationEnabled !== undefined ? dailyAutomationEnabled : undefined,
        dailyAutomationTime: dailyAutomationTime || undefined,
        dailyAutomationTimezone: dailyAutomationTimezone || undefined,
        executionMode: executionMode || undefined,
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SETTINGS_UPDATED',
        resource: 'user',
        resourceId: user.id,
        details: JSON.stringify({
          dailyAutomationEnabled,
          dailyAutomationTime,
          dailyAutomationTimezone,
          executionMode,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        dailyAutomationEnabled: user.dailyAutomationEnabled,
        dailyAutomationTime: user.dailyAutomationTime,
        dailyAutomationTimezone: user.dailyAutomationTimezone,
        executionMode: user.executionMode,
      },
    })
  } catch (error) {
    console.error('Failed to update automation settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to update automation settings' },
      },
      { status: 500 }
    )
  }
}
