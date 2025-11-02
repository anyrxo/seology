/**
 * API Route: Execute Fixes
 * POST /api/fixes/execute
 *
 * Executes fixes based on user's execution mode preference
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { executeFixes } from '@/lib/execution-modes'

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

    // Execute fixes based on user's execution mode
    const result = await executeFixes(siteId, session.userId, issueIds)

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
