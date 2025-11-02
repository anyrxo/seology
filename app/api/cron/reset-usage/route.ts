/**
 * Cron Job: Reset Monthly Usage
 * Runs on the 1st of each month to reset usage counters
 */

import { NextRequest, NextResponse } from 'next/server'
import { createJob } from '@/lib/queue'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Create usage reset job
    const jobId = await createJob('RESET_USAGE', {})

    return NextResponse.json({
      success: true,
      message: 'Usage reset job created',
      jobId,
    })
  } catch (error) {
    console.error('Error creating usage reset job:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create usage reset job',
      },
      { status: 500 }
    )
  }
}
