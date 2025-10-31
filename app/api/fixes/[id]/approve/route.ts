import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { approveFix } from '@/lib/execution-modes'

/**
 * POST /api/fixes/[id]/approve
 * Approve a single fix (for APPROVE mode)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: fixId } = await params

    // Approve and apply the fix
    const result = await approveFix(fixId, userId)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to approve fix' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Fix approved and applied successfully',
    })
  } catch (error) {
    console.error('Error approving fix:', error)
    return NextResponse.json(
      {
        error: 'Failed to approve fix',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
