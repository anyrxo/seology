import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { rollbackFix } from '@/lib/rollback'

/**
 * POST /api/fixes/[id]/rollback
 * Rollback a fix to its previous state
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

    // Perform rollback
    const result = await rollbackFix(fixId, userId)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to rollback fix' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Fix rolled back successfully',
      data: result.restoredState,
    })
  } catch (error) {
    console.error('Error rolling back fix:', error)
    return NextResponse.json(
      {
        error: 'Failed to rollback fix',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
