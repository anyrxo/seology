import { NextRequest, NextResponse } from 'next/server'
import { queue } from '@/lib/queue'
import { processJob } from '@/lib/jobs'

/**
 * Process next pending job
 * POST /api/jobs/process
 *
 * This endpoint is called by Vercel Cron or can be triggered manually.
 * It processes one job from the queue.
 *
 * For continuous processing, set up a cron job to call this every minute.
 *
 * Response:
 * {
 *   "success": true,
 *   "jobId": "uuid",
 *   "type": "CRAWL_SITE",
 *   "result": { ... }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret or authentication
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get next job
    const job = await queue.getNextJob()

    if (!job) {
      return NextResponse.json({
        success: true,
        message: 'No pending jobs to process',
      })
    }

    try {
      // Process the job
      const result = await processJob(job.type, job.payload)

      if (result.success) {
        // Mark job as completed
        await queue.completeJob(job.id, result)

        return NextResponse.json({
          success: true,
          jobId: job.id,
          type: job.type,
          result,
        })
      } else {
        // Mark job as failed
        await queue.failJob(
          job.id,
          result.error || 'Job processing failed'
        )

        return NextResponse.json({
          success: false,
          jobId: job.id,
          type: job.type,
          error: result.error,
        })
      }
    } catch (processingError) {
      // Mark job as failed
      const errorMessage = processingError instanceof Error
        ? processingError.message
        : 'Unknown processing error'

      await queue.failJob(job.id, errorMessage)

      return NextResponse.json({
        success: false,
        jobId: job.id,
        type: job.type,
        error: errorMessage,
      })
    }
  } catch (error) {
    console.error('Error processing job:', error)
    return NextResponse.json(
      {
        error: 'Failed to process job',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Get job processing statistics
 * GET /api/jobs/process
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const stats = await queue.getJobStats()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error('Error getting job stats:', error)
    return NextResponse.json(
      {
        error: 'Failed to get job stats',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
