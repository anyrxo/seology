/**
 * Generate Alt Text API
 * POST - Generate AI alt text suggestions for images
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { generateAltTextBatch } from '@/lib/image-optimizer'

export const dynamic = 'force-dynamic'

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
    const { shop, imageIds } = body

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    if (!imageIds || !Array.isArray(imageIds) || imageIds.length === 0) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Image IDs array required' } },
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

    // Generate alt text for images
    const result = await generateAltTextBatch(connection.id, imageIds)

    return NextResponse.json({
      success: true,
      data: {
        successful: result.successful,
        failed: result.failed,
        suggestions: result.suggestions,
      },
    })
  } catch (error) {
    console.error('[API] Error generating alt text:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to generate alt text',
        },
      },
      { status: 500 }
    )
  }
}
