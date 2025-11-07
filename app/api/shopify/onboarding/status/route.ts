/**
 * Shopify Onboarding Status API
 * Checks if a shop has completed the onboarding process
 *
 * Reference: https://shopify.dev/docs/apps/build
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface ShopifyCredentials {
  shop: string
  accessToken?: string
  [key: string]: unknown
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')

    if (!shop) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_SHOP',
          message: 'Shop parameter is required',
        },
      }, { status: 400 })
    }

    // Find the connection for this shop
    // Note: credentials is a JSON field, so we need to search through all connections
    const connections = await db.connection.findMany({
      where: {
        platform: 'SHOPIFY',
      },
      select: {
        id: true,
        userId: true,
        credentials: true,
        createdAt: true,
      },
    })

    // Filter in-memory to find matching shop
    const connection = connections.find((conn) => {
      if (!conn.credentials) return false
      try {
        const creds = JSON.parse(conn.credentials) as ShopifyCredentials
        return creds?.shop === shop
      } catch {
        return false
      }
    })

    if (!connection) {
      // No connection = new shop = needs onboarding
      return NextResponse.json({
        success: true,
        data: {
          completed: false,
          shop,
          reason: 'no_connection',
        },
      })
    }

    // Check if user has completed onboarding
    const user = await db.user.findUnique({
      where: { id: connection.userId },
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
