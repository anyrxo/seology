import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { approvePlan } from '@/lib/execution-modes'

/**
 * POST /api/sites/[id]/approve-plan
 * Approve all pending fixes in a plan (for PLAN mode)
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

    const { id: siteId } = await params

    // Approve and execute all pending fixes
    const result = await approvePlan(siteId, userId)

    return NextResponse.json({
      success: true,
      data: result,
      message: `Applied ${result.fixesApplied} fixes, ${result.fixesFailed} failed`,
    })
  } catch (error) {
    console.error('Error approving plan:', error)
    return NextResponse.json(
      {
        error: 'Failed to approve plan',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
