/**
 * Apply Image Fixes API
 * POST - Apply AI-generated alt text to images in Shopify
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { applyAltTextFixes } from '@/lib/image-optimizer'

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

    // Apply fixes
    const result = await applyAltTextFixes(connection.id, imageIds, userId)

    return NextResponse.json({
      success: true,
      data: {
        applied: result.applied,
        failed: result.failed,
      },
    })
  } catch (error) {
    console.error('[API] Error applying fixes:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to apply fixes',
        },
      },
      { status: 500 }
    )
  }
}
