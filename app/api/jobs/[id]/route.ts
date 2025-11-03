/**
 * Individual Job API
 * Get status of a specific job
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { getJob } from '@/lib/queue'

export const dynamic = 'force-dynamic'

/**
 * GET /api/jobs/[id] - Get job status
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { clerkId: session.userId },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const jobId = params.id
  const job = await getJob(jobId)

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 })
  }

  // Verify job belongs to user (if userId is set on job)
  if (job.userId && job.userId !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  return NextResponse.json({
    success: true,
    data: {
      id: job.id,
      type: job.type,
      status: job.status,
      attempts: job.attempts,
      maxAttempts: job.maxAttempts,
      progress: job.progress,
      error: job.error,
      createdAt: job.createdAt.toISOString(),
      startedAt: job.startedAt?.toISOString() || null,
      completedAt: job.completedAt?.toISOString() || null,
      payload: job.payload,
      result: job.result,
    },
  })
}
