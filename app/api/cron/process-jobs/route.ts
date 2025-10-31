import { NextRequest, NextResponse } from 'next/server'
import { queue } from '@/lib/queue'
import { processJob } from '@/lib/jobs'

/**
 * Job processing cron endpoint
 * POST /api/cron/process-jobs
 *
 * Triggered by Vercel Cron every minute to process pending jobs.
 * Processes up to 5 jobs per execution to avoid timeouts.
 *
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/process-jobs",
 *     "schedule": "* * * * *"
 *   }]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid cron secret' },
        { status: 401 }
      )
    }

    const processedJobs: any[] = []
    const maxJobsPerRun = 5
    const maxDuration = 50000 // 50 seconds (Vercel timeout is 60s)
    const startTime = Date.now()

    // Process up to maxJobsPerRun jobs or until we're close to timeout
    for (let i = 0; i < maxJobsPerRun; i++) {
      // Check if we're approaching timeout
      if (Date.now() - startTime > maxDuration) {
        break
      }

      // Get next job
      const job = await queue.getNextJob()

      if (!job) {
        // No more jobs to process
        break
      }

      try {
        // Process the job
        const result = await processJob(job.type, job.payload)

        if (result.success) {
          // Mark job as completed
          await queue.completeJob(job.id, result)

          processedJobs.push({
            jobId: job.id,
            type: job.type,
            status: 'completed',
            result,
          })
        } else {
          // Mark job as failed
          await queue.failJob(
            job.id,
            result.error || 'Job processing failed'
          )

          processedJobs.push({
            jobId: job.id,
            type: job.type,
            status: 'failed',
            error: result.error,
          })
        }
      } catch (processingError) {
        // Mark job as failed
        const errorMessage = processingError instanceof Error
          ? processingError.message
          : 'Unknown processing error'

        await queue.failJob(job.id, errorMessage)

        processedJobs.push({
          jobId: job.id,
          type: job.type,
          status: 'failed',
          error: errorMessage,
        })
      }
    }

    // Get current queue stats
    const stats = await queue.getJobStats()

    return NextResponse.json({
      success: true,
      processedCount: processedJobs.length,
      jobs: processedJobs,
      queueStats: stats,
      duration: Date.now() - startTime,
    })
  } catch (error) {
    console.error('Job processing cron error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process jobs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for testing
 */
export async function GET(request: NextRequest) {
  const stats = await queue.getJobStats()

  return NextResponse.json({
    message: 'Job processing cron endpoint',
    info: 'Use POST to process pending jobs',
    queueStats: stats,
  })
}
