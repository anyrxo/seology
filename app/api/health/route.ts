/**
 * Health Check Endpoint
 * GET /api/health
 *
 * Returns API health status and database connectivity
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check database connectivity
    await db.$queryRaw`SELECT 1`

    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        database: 'operational',
      },
      version: '1.0.0',
    }

    return NextResponse.json(status, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)

    const status = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        database: 'degraded',
      },
      error: error instanceof Error ? error.message : 'Unknown error',
      version: '1.0.0',
    }

    return NextResponse.json(status, { status: 503 })
  }
}
