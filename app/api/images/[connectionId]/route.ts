/**
 * Image SEO API Routes
 *
 * GET /api/images/[connectionId] - Get image stats and list
 * POST /api/images/[connectionId]/scan - Start image scan job
 * POST /api/images/[connectionId]/optimize - Start AI optimization job
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { getImageStats } from '@/lib/image-scanner'
import { createJob } from '@/lib/queue'

// Mark this route as dynamic (uses auth/headers and searchParams)
export const dynamic = 'force-dynamic'

/**
 * GET /api/images/[connectionId]
 * Get images for a connection with stats
 */
export async function GET(
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

    // Get stats
    const stats = await getImageStats(connectionId)

    // Get paginated images
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') // Filter by status
    const hasAlt = searchParams.get('hasAlt') // 'true', 'false', or null

    const skip = (page - 1) * limit

    const whereClause: Record<string, unknown> = {
      connectionId
    }

    if (status) {
      whereClause.status = status
    }

    if (hasAlt === 'true') {
      whereClause.hasAltText = true
    } else if (hasAlt === 'false') {
      whereClause.hasAltText = false
      whereClause.isDecorative = false
    }

    const images = await db.imageAsset.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: [
        { priority: 'asc' },
        { impactScore: 'desc' }
      ],
      select: {
        id: true,
        url: true,
        altText: true,
        suggestedAltText: true,
        pageUrl: true,
        context: true,
        status: true,
        hasAltText: true,
        isOptimized: true,
        impactScore: true,
        aiConfidence: true,
        width: true,
        height: true,
        format: true,
        sizeBytes: true,
        optimizedSizeBytes: true,
        compressionRatio: true
      }
    })

    const total = await db.imageAsset.count({ where: whereClause })

    return NextResponse.json({
      success: true,
      data: {
        stats,
        images,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get images error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
