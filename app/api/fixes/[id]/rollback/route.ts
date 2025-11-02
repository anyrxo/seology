/**
 * API Route: Rollback Fix
 * POST /api/fixes/[id]/rollback
 *
 * Rolls back a previously applied fix (within 90-day window)
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { rollbackFix } from '@/lib/execution-modes'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const { id: fixId } = await params

    // Rollback the fix
    const result = await rollbackFix(fixId, session.userId)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: { code: 'ROLLBACK_FAILED', message: result.message } },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message
    })
  } catch (error) {
    console.error('Error rolling back fix:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to rollback fix',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
