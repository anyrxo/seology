/**
 * Image Assets API
 * GET - List images for a connection
 * POST - Trigger image scan
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { scanConnectionImages, storeScannedImages, getImageStats } from '@/lib/image-scanner'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'
import { ImageStatus, Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    // Authenticate with session token middleware
    const authResult = await withShopifyAuth(request)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')

    // Build filter
    const where: Prisma.ImageAssetWhereInput = {
      connectionId: context.connection.id,
      ...(status && Object.values(ImageStatus).includes(status as ImageStatus)
        ? { status: status as ImageStatus }
        : {}),
    }

    // Get images
    const [images, total, stats] = await Promise.all([
      db.imageAsset.findMany({
        where,
        orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.imageAsset.count({ where }),
      getImageStats(context.connection.id),
    ])

    return NextResponse.json({
      success: true,
      data: {
        images,
        stats,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('[API] Error fetching images:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch images' } },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate with session token middleware
    const authResult = await withShopifyAuth(request)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult

    // Trigger image scan
    const scanResult = await scanConnectionImages(context.connection.id)

    // Store scanned images
    await storeScannedImages(context.connection.id, scanResult.images)

    // Get updated stats
    const stats = await getImageStats(context.connection.id)

    return NextResponse.json({
      success: true,
      data: {
        scanned: scanResult.totalImages,
        stats,
      },
    })
  } catch (error) {
    console.error('[API] Error scanning images:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to scan images' } },
      { status: 500 }
    )
  }
}
