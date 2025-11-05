/**
 * POST /api/images/[connectionId]/scan
 * Start an image scanning job for a connection
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { createJob } from '@/lib/queue'

// Mark this route as dynamic (uses auth/headers)
export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const connectionId = params.connectionId

    // Verify user owns this connection
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        user: { clerkId }
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    // Check if there's already a running scan job
    const existingJob = await db.job.findFirst({
      where: {
        connectionId,
        type: 'SCAN_IMAGES',
        status: { in: ['PENDING', 'RUNNING'] }
      }
    })

    if (existingJob) {
      return NextResponse.json({
        success: true,
        message: 'Image scan already in progress',
        data: {
          jobId: existingJob.id,
          status: existingJob.status,
          progress: existingJob.progress
        }
      })
    }

    // Create scan job
    const jobId = await createJob('SCAN_IMAGES', {
      connectionId
    })

    return NextResponse.json({
      success: true,
      message: 'Image scan job started',
      data: {
        jobId,
        status: 'PENDING'
      }
    })
  } catch (error) {
    console.error('Start image scan error:', error)
    return NextResponse.json(
      {
        error: 'Failed to start image scan',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
