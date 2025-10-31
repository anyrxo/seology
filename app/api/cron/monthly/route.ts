import { NextRequest, NextResponse } from 'next/server'
import { queue } from '@/lib/queue'

/**
 * Monthly cron job endpoint
 * POST /api/cron/monthly
 *
 * Triggered by Vercel Cron on the 1st of each month.
 * Performs monthly maintenance tasks:
 * - Reset usage counters for all users
 *
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/monthly",
 *     "schedule": "0 0 1 * *"
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

    // Get current month in YYYY-MM format
    const now = new Date()
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    // Enqueue usage reset job with high priority
    const jobId = await queue.enqueueUsageReset(month, 10)

    return NextResponse.json({
      success: true,
      message: 'Monthly usage reset job queued',
      month,
      jobId,
    })
  } catch (error) {
    console.error('Monthly cron error:', error)
    return NextResponse.json(
      {
        error: 'Failed to execute monthly cron',
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
    message: 'Monthly cron endpoint',
    info: 'Use POST to trigger the monthly usage reset job',
  })
}
