import { NextRequest, NextResponse } from 'next/server'
import { queue } from '@/lib/queue'

/**
 * Daily cron job endpoint
 * POST /api/cron/daily
 *
 * Triggered by Vercel Cron once per day.
 * Performs daily maintenance tasks:
 * - Clean up expired rollbacks
 * - Clean up old jobs
 * - Clean up old audit logs
 *
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/daily",
 *     "schedule": "0 0 * * *"
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

    // Enqueue cleanup job
    const jobId = await queue.enqueueRollbackCleanup(90, 1)

    return NextResponse.json({
      success: true,
      message: 'Daily cleanup job queued',
      jobId,
    })
  } catch (error) {
    console.error('Daily cron error:', error)
    return NextResponse.json(
      {
        error: 'Failed to execute daily cron',
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
  return NextResponse.json({
    message: 'Daily cron endpoint',
    info: 'Use POST to trigger the daily cron job',
  })
}
