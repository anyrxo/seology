import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { queue } from '@/lib/queue'

/**
 * Get job status
 * GET /api/jobs/[id]/status
 *
 * Response:
 * {
 *   "id": "uuid",
 *   "type": "CRAWL_SITE",
 *   "status": "PROCESSING",
 *   "progress": 50,
 *   "result": null,
 *   "error": null,
 *   "createdAt": "2024-01-01T00:00:00Z",
 *   "startedAt": "2024-01-01T00:01:00Z",
 *   "completedAt": null
 * }
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id: jobId } = await params

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      )
    }

    // Get job status
    const jobStatus = await queue.getJobStatus(jobId)

    if (!jobStatus) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // TODO: Verify user has access to this job
    // For now, any authenticated user can check job status

    return NextResponse.json({
      success: true,
      job: jobStatus,
    })
  } catch (error) {
    console.error('Error getting job status:', error)
    return NextResponse.json(
      {
        error: 'Failed to get job status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
