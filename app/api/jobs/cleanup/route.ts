import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { queue } from '@/lib/queue'

/**
 * Trigger a background cleanup job (Admin only)
 * POST /api/jobs/cleanup
 *
 * Request body:
 * {
 *   "daysOld": 90 (optional)
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "jobId": "uuid",
 *   "message": "Cleanup job queued successfully"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user and check if admin
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // TODO: Add admin check when admin field is added to User model
    // For now, only allow SCALE plan users to trigger cleanup
    if (user.plan !== 'SCALE') {
      return NextResponse.json(
        { error: 'Only administrators can trigger cleanup jobs' },
        { status: 403 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { daysOld = 90 } = body

    // Enqueue the cleanup job
    const jobId = await queue.enqueueRollbackCleanup(daysOld)

    return NextResponse.json(
      {
        success: true,
        jobId,
        message: 'Cleanup job queued successfully',
      },
      { status: 202 } // 202 Accepted
    )
  } catch (error) {
    console.error('Error queueing cleanup job:', error)
    return NextResponse.json(
      {
        error: 'Failed to queue cleanup job',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
