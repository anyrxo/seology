/**
 * API Route: Approve Single Fix
 * POST /api/fixes/[id]/approve
 *
 * Approves and applies a single fix
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { approveFix } from '@/lib/execution-modes'

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

    // Approve and apply the fix
    const result = await approveFix(fixId, session.userId)

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
    console.error('Error approving fix:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to approve fix',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
