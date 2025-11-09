/**
 * Shopify Onboarding Status API
 * Checks if a shop has completed the onboarding process
 *
 * Reference: https://shopify.dev/docs/apps/build
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export async function GET(request: NextRequest) {
  try {
    const authResult = await withShopifyAuth(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    // Fetch the full connection for createdAt
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
      select: { createdAt: true },
    })

    if (!connection) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'CONNECTION_NOT_FOUND',
          message: 'Connection not found',
        },
      }, { status: 404 })
    }

    // Check if user has completed onboarding
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        onboardingCompleted: true,
        executionMode: true,
        createdAt: true,
      },
    })

    if (!user) {
      // User doesn't exist = needs onboarding
      return NextResponse.json({
        success: true,
        data: {
          completed: false,
          shop,
          reason: 'no_user',
        },
      })
    }

    // Return onboarding status
    return NextResponse.json({
      success: true,
      data: {
        completed: user.onboardingCompleted || false,
        shop,
        userId: user.id,
        executionMode: user.executionMode,
        connectedAt: connection.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Failed to check onboarding status:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to check onboarding status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
    }, { status: 500 })
  }
}
