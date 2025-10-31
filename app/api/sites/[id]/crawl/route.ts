import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { queue } from '@/lib/queue'

/**
 * Trigger a site crawl (background job)
 * POST /api/sites/[id]/crawl
 *
 * This endpoint now enqueues a background job instead of blocking.
 * The crawl will be processed asynchronously.
 *
 * Response:
 * {
 *   "success": true,
 *   "jobId": "uuid",
 *   "message": "Crawl job queued successfully",
 *   "statusUrl": "/api/jobs/[jobId]/status"
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: siteId } = await params

    // Verify site belongs to user
    const site = await db.connection.findFirst({
      where: {
        id: siteId,
        user: {
          clerkUserId: userId,
        },
      },
    })

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    // Parse request body for options
    const body = await request.json().catch(() => ({}))
    const maxPages = body.maxPages || 10

    // Enqueue the crawl job (non-blocking)
    const jobId = await queue.enqueueCrawl(siteId, userId, maxPages)

    // Return immediately with job ID
    // User can poll /api/jobs/[jobId]/status to check progress
    return NextResponse.json(
      {
        success: true,
        jobId,
        message: 'Crawl job queued successfully. The site will be analyzed in the background.',
        statusUrl: `/api/jobs/${jobId}/status`,
      },
      { status: 202 } // 202 Accepted - indicates async processing
    )
  } catch (error) {
    console.error('Error crawling site:', error)
    return NextResponse.json(
      {
        error: 'Failed to crawl site',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
