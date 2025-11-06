/**
 * Image Assets API
 * GET - List images for a connection
 * POST - Trigger image scan
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { scanConnectionImages, storeScannedImages, getImageStats } from '@/lib/image-scanner'

export const dynamic = 'force-dynamic'
import { ImageStatus, Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const shop = searchParams.get('shop')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Get connection
    const connection = await db.connection.findFirst({
      where: {
        userId,
        domain: shop,
        platform: 'SHOPIFY',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    // Build filter
    const where: Prisma.ImageAssetWhereInput = {
      connectionId: connection.id,
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
      getImageStats(connection.id),
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
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { shop } = body

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Get connection
    const connection = await db.connection.findFirst({
      where: {
        userId,
        domain: shop,
        platform: 'SHOPIFY',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    // Trigger image scan
    const scanResult = await scanConnectionImages(connection.id)

    // Store scanned images
    await storeScannedImages(connection.id, scanResult.images)

    // Get updated stats
    const stats = await getImageStats(connection.id)

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
