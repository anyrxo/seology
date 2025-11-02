/**
 * Cron Job: Cleanup Old Data
 * Runs daily to clean up old rollback records
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
    // Create cleanup job
    const jobId = await createJob('CLEANUP_ROLLBACKS', {})

    return NextResponse.json({
      success: true,
      message: 'Cleanup job created',
      jobId,
    })
  } catch (error) {
    console.error('Error creating cleanup job:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create cleanup job',
      },
      { status: 500 }
    )
  }
}
