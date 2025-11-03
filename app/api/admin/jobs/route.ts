/**
 * Admin Jobs API
 * Monitor and manage job queue
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/middleware/admin-guard'
import { getQueueStats, getPendingJobs, getJobsByType, retryJob, cancelJob } from '@/lib/queue'
import type { JobType } from '@/lib/queue'

export const dynamic = 'force-dynamic'

// GET job queue status
export async function GET(req: NextRequest) {
  try {
    const adminCheck = await verifyAdmin()
    if ('error' in adminCheck) {
      return adminCheck.error
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') as JobType | null

    // Get queue statistics
    const stats = getQueueStats()

    // Get pending jobs
    const pendingJobs = getPendingJobs()

    // Get jobs by type if specified
    let jobsByType = null
    if (type) {
      jobsByType = getJobsByType(type)
    }

    return NextResponse.json({
      success: true,
      data: {
        statistics: stats,
        pendingJobs: pendingJobs.map((job) => ({
          id: job.id,
          type: job.type,
          status: job.status,
          attempts: job.attempts,
          maxAttempts: job.maxAttempts,
          error: job.error,
          createdAt: job.createdAt.toISOString(),
          startedAt: job.startedAt?.toISOString() || null,
          completedAt: job.completedAt?.toISOString() || null,
          data: job.data,
        })),
        jobsByType: jobsByType
          ? jobsByType.map((job) => ({
              id: job.id,
              type: job.type,
              status: job.status,
              attempts: job.attempts,
              maxAttempts: job.maxAttempts,
              error: job.error,
              createdAt: job.createdAt.toISOString(),
              startedAt: job.startedAt?.toISOString() || null,
              completedAt: job.completedAt?.toISOString() || null,
              data: job.data,
            }))
          : null,
      },
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch jobs' },
      },
      { status: 500 }
    )
  }
}

// POST retry or cancel job
export async function POST(req: NextRequest) {
  try {
    const adminCheck = await verifyAdmin()
    if ('error' in adminCheck) {
      return adminCheck.error
    }

    const body = await req.json()
    const { action, jobId } = body

    if (!action || !jobId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_INPUT', message: 'Missing action or jobId' },
        },
        { status: 400 }
      )
    }

    let result = false

    if (action === 'retry') {
      result = await retryJob(jobId)
    } else if (action === 'cancel') {
      result = cancelJob(jobId)
    } else {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_ACTION', message: 'Invalid action. Use "retry" or "cancel"' },
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: result,
      data: {
        message: result
          ? `Job ${action}ed successfully`
          : `Failed to ${action} job. Check job status.`,
      },
    })
  } catch (error) {
    console.error('Error processing job action:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to process job action' },
      },
      { status: 500 }
    )
  }
}
