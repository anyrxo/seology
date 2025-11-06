/**
 * Cron Job: Automatic SEO Scanning
 * Runs automation engine for all active Shopify connections
 */

import { NextRequest, NextResponse } from 'next/server'
import { runAllAutomations } from '@/lib/automation-engine'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[Cron] Starting automatic SEO scanning...')
    await runAllAutomations()
    console.log('[Cron] Automatic SEO scanning completed')

    return NextResponse.json({
      success: true,
      message: 'Automation completed successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Cron] Error running automation:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to run automation',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
