import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { executeFixes } from '@/lib/execution-modes'
import { checkFixLimit, getUserDbId } from '@/lib/middleware/usage-enforcement'
import { trackFixApplied } from '@/lib/usage'

/**
 * POST /api/sites/[id]/execute
 * Execute fixes based on the site's execution mode
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

    // Check usage limit before executing
    const limitCheck = await checkFixLimit(userId)
    if (limitCheck) {
      return limitCheck
    }

    const { id: siteId } = await params

    // Parse request body for optional issue IDs
    const body = await request.json().catch(() => ({}))
    const issueIds = body.issueIds as string[] | undefined

    // Execute fixes based on site's execution mode
    const result = await executeFixes(siteId, userId, issueIds)

    // Track usage for each fix applied
    const userDbId = await getUserDbId(userId)
    if (userDbId && result.fixesApplied > 0) {
      // Track each fix applied
      for (let i = 0; i < result.fixesApplied; i++) {
        await trackFixApplied(userDbId, siteId)
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Error executing fixes:', error)
    return NextResponse.json(
      {
        error: 'Failed to execute fixes',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
