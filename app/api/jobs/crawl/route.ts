import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { queue } from '@/lib/queue'

/**
 * Trigger a background crawl job
 * POST /api/jobs/crawl
 *
 * Request body:
 * {
 *   "siteId": "uuid",
 *   "maxPages": 10 (optional)
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "jobId": "uuid",
 *   "message": "Crawl job queued successfully"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { siteId, maxPages = 10 } = body

    if (!siteId) {
      return NextResponse.json(
        { error: 'siteId is required' },
        { status: 400 }
      )
    }

    // Verify site exists and belongs to user
    const site = await db.connection.findFirst({
      where: {
        id: siteId,
        user: {
          clerkUserId: userId,
        },
      },
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Site not found or unauthorized' },
        { status: 404 }
      )
    }

    // Enqueue the crawl job
    const jobId = await queue.enqueueCrawl(siteId, userId, maxPages)

    return NextResponse.json(
      {
        success: true,
        jobId,
        message: 'Crawl job queued successfully',
      },
      { status: 202 } // 202 Accepted
    )
  } catch (error) {
    console.error('Error queueing crawl job:', error)
    return NextResponse.json(
      {
        error: 'Failed to queue crawl job',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
