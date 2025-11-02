/**
 * API Route: Approve Fix Plan
 * POST /api/fixes/approve-plan
 *
 * Approves and executes all pending fixes in a plan
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { approvePlan } from '@/lib/execution-modes'

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
    const { siteId } = body

    if (!siteId) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'siteId is required' } },
        { status: 400 }
      )
    }

    // Approve and execute all pending fixes
    const result = await approvePlan(siteId, session.userId)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: { code: 'APPROVAL_FAILED', message: result.message } },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data
    })
  } catch (error) {
    console.error('Error approving plan:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to approve plan',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
