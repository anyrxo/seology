/**
 * Jobs API
 * Create and manage background jobs
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { createJob, getQueueStats } from '@/lib/queue'
import type { JobType } from '@/lib/queue'

export const dynamic = 'force-dynamic'

/**
 * GET /api/jobs - Get queue statistics
 */
export async function GET() {
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

  // Get queue stats
  const stats = getQueueStats()

  return NextResponse.json({
    success: true,
    data: stats,
  })
}

/**
 * POST /api/jobs - Create a new background job
 */
export async function POST(req: NextRequest) {
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

  const body = await req.json()
  const { type, data } = body as { type: JobType; data: Record<string, unknown> }

  if (!type) {
    return NextResponse.json(
      { error: 'Missing required field: type' },
      { status: 400 }
    )
  }

  try {
    // Create the job
    const jobId = await createJob(type, {
      ...data,
      userId: user.id,
    })

    return NextResponse.json({
      success: true,
      data: {
        jobId,
        type,
        status: 'PENDING',
      },
    })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      {
        error: 'Failed to create job',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
