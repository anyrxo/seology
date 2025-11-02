/**
 * API Route: Execute Fixes
 * POST /api/fixes/execute
 *
 * Executes fixes based on user's execution mode preference
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { executeFixes } from '@/lib/execution-modes'
import { canApplyFixes } from '@/lib/usage'
import { db } from '@/lib/db'
import { IssueStatus } from '@prisma/client'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { siteId, issueIds } = body

    if (!siteId) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'siteId is required' } },
        { status: 400 }
      )
    }

    // Get user to check limits
    const user = await db.user.findFirst({
      where: { clerkId: session.userId }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Count how many issues will be fixed
    const issueCount = issueIds?.length || await db.issue.count({
      where: {
        connectionId: siteId,
        status: { in: [IssueStatus.OPEN, IssueStatus.IN_PROGRESS] }
      }
    })

    // Check if user can apply fixes
    const usageCheck = await canApplyFixes(user.id, issueCount)

    if (!usageCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USAGE_LIMIT_EXCEEDED',
            message: usageCheck.reason,
            details: {
              currentCount: usageCheck.currentCount,
              limit: usageCheck.limit,
              remaining: usageCheck.remaining
            }
          }
        },
        { status: 403 }
      )
    }

    // Execute fixes based on user's execution mode
    const result = await executeFixes(siteId, user.id, issueIds)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: { code: 'EXECUTION_FAILED', message: result.message } },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data
    })
  } catch (error) {
    console.error('Error executing fixes:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to execute fixes',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
