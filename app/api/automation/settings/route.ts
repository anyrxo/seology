import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// Mark this route as dynamic (uses auth/headers)
export const dynamic = 'force-dynamic'

/**
 * GET /api/automation/settings
 * Get user's daily automation settings
 */
export async function GET() {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user with automation settings
    const user = await db.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        dailyAutomationEnabled: true,
        dailyAutomationTime: true,
        dailyAutomationTimezone: true,
        dailyReportEmail: true,
        dailyReportDashboard: true,
        lastAutomationRun: true,
        executionMode: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        enabled: user.dailyAutomationEnabled,
        time: user.dailyAutomationTime,
        timezone: user.dailyAutomationTimezone,
        emailReports: user.dailyReportEmail,
        dashboardReports: user.dailyReportDashboard,
        lastRun: user.lastAutomationRun,
        executionMode: user.executionMode,
      },
    })
  } catch (error) {
    console.error('Automation settings fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch automation settings',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/automation/settings
 * Update user's daily automation settings
 */
export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      enabled,
      time,
      timezone,
      emailReports,
      dashboardReports,
    } = body

    // Validate time format (HH:MM)
    if (time && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM (e.g., 09:00)' },
        { status: 400 }
      )
    }

    // Update user settings
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        dailyAutomationEnabled: enabled !== undefined ? enabled : undefined,
        dailyAutomationTime: time || undefined,
        dailyAutomationTimezone: timezone || undefined,
        dailyReportEmail: emailReports !== undefined ? emailReports : undefined,
        dailyReportDashboard: dashboardReports !== undefined ? dashboardReports : undefined,
      },
      select: {
        dailyAutomationEnabled: true,
        dailyAutomationTime: true,
        dailyAutomationTimezone: true,
        dailyReportEmail: true,
        dailyReportDashboard: true,
        executionMode: true,
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'AUTOMATION_SETTINGS_UPDATED',
        resource: 'automation_settings',
        resourceId: user.id,
        details: JSON.stringify({
          enabled,
          time,
          timezone,
          emailReports,
          dashboardReports,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Automation settings updated successfully',
      data: {
        enabled: updatedUser.dailyAutomationEnabled,
        time: updatedUser.dailyAutomationTime,
        timezone: updatedUser.dailyAutomationTimezone,
        emailReports: updatedUser.dailyReportEmail,
        dashboardReports: updatedUser.dailyReportDashboard,
        executionMode: updatedUser.executionMode,
      },
    })
  } catch (error) {
    console.error('Automation settings update error:', error)
    return NextResponse.json(
      {
        error: 'Failed to update automation settings',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
