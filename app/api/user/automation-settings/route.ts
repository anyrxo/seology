/**
 * API Route: User Automation Settings
 * GET/PUT /api/user/automation-settings
 *
 * Manages user's automation preferences including:
 * - Daily automation schedule
 * - Execution mode (AUTOMATIC, PLAN, APPROVE)
 * - Notification preferences
 */

import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

// GET - Fetch user's automation settings
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const user = await db.user.findFirst({
      where: { clerkId: userId },
      select: {
        executionMode: true,
        dailyAutomationEnabled: true,
        dailyAutomationTime: true,
        dailyAutomationTimezone: true,
        dailyReportEmail: true,
        dailyReportDashboard: true,
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
        executionMode: user.executionMode,
        dailyAutomationEnabled: user.dailyAutomationEnabled,
        dailyAutomationTime: user.dailyAutomationTime || '09:00',
        dailyAutomationTimezone: user.dailyAutomationTimezone || 'UTC',
        emailReportsEnabled: user.dailyReportEmail,
        dashboardNotificationsEnabled: user.dailyReportDashboard,
      },
    })
  } catch (error) {
    console.error('Error fetching automation settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch settings' },
      },
      { status: 500 }
    )
  }
}

// PUT - Update user's automation settings
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      executionMode,
      dailyAutomationEnabled,
      dailyAutomationTime,
      dailyAutomationTimezone,
      emailReportsEnabled,
      dashboardNotificationsEnabled,
    } = body

    // Validate execution mode if provided
    if (executionMode && !['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Invalid execution mode. Must be AUTOMATIC, PLAN, or APPROVE' } },
        { status: 400 }
      )
    }

    // Validate time format if provided
    if (dailyAutomationTime && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dailyAutomationTime)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Invalid time format. Use HH:MM (24-hour format)' } },
        { status: 400 }
      )
    }

    // Build update data (only include fields that were provided)
    const updateData: {
      executionMode?: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
      dailyAutomationEnabled?: boolean
      dailyAutomationTime?: string
      dailyAutomationTimezone?: string
      dailyReportEmail?: boolean
      dailyReportDashboard?: boolean
    } = {}

    if (executionMode !== undefined) updateData.executionMode = executionMode
    if (dailyAutomationEnabled !== undefined) updateData.dailyAutomationEnabled = dailyAutomationEnabled
    if (dailyAutomationTime !== undefined) updateData.dailyAutomationTime = dailyAutomationTime
    if (dailyAutomationTimezone !== undefined) updateData.dailyAutomationTimezone = dailyAutomationTimezone
    if (emailReportsEnabled !== undefined) updateData.dailyReportEmail = emailReportsEnabled
    if (dashboardNotificationsEnabled !== undefined) updateData.dailyReportDashboard = dashboardNotificationsEnabled

    const user = await db.user.update({
      where: { clerkId: userId },
      data: updateData,
      select: {
        id: true,
        executionMode: true,
        dailyAutomationEnabled: true,
        dailyAutomationTime: true,
        dailyAutomationTimezone: true,
        dailyReportEmail: true,
        dailyReportDashboard: true,
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SETTINGS_UPDATED',
        resource: 'user_settings',
        details: JSON.stringify({
          settingsChanged: Object.keys(updateData),
          executionMode: user.executionMode
        })
      }
    }).catch(err => console.error('Failed to create audit log:', err))

    return NextResponse.json({
      success: true,
      data: {
        executionMode: user.executionMode,
        dailyAutomationEnabled: user.dailyAutomationEnabled,
        dailyAutomationTime: user.dailyAutomationTime,
        dailyAutomationTimezone: user.dailyAutomationTimezone,
        emailReportsEnabled: user.dailyReportEmail,
        dashboardNotificationsEnabled: user.dailyReportDashboard,
      },
    })
  } catch (error) {
    console.error('Error updating automation settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to update settings' },
      },
      { status: 500 }
    )
  }
}
