/**
 * DEBUG ENDPOINT - Check connection status
 * Temporary endpoint to diagnose connection issues
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json({
        success: false,
        error: 'Shop parameter required',
      }, { status: 400 })
    }

    // Check if any connection exists for this shop
    const allConnections = await db.connection.findMany({
      where: {
        domain: shop,
      },
      select: {
        id: true,
        platform: true,
        domain: true,
        status: true,
        userId: true,
        displayName: true,
        accessToken: true, // Will be encrypted
        createdAt: true,
        updatedAt: true,
      },
    })

    // Check with SHOPIFY platform filter
    const shopifyConnection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
      select: {
        id: true,
        status: true,
        accessToken: true,
      },
    })

    // Check with CONNECTED status
    const connectedConnection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      select: {
        id: true,
        accessToken: true,
      },
    })

    return NextResponse.json({
      success: true,
      debug: {
        searchedShop: shop,
        totalConnections: allConnections.length,
        connections: allConnections.map(c => ({
          id: c.id,
          platform: c.platform,
          domain: c.domain,
          status: c.status,
          userId: c.userId,
          displayName: c.displayName,
          hasAccessToken: !!c.accessToken,
          accessTokenLength: c.accessToken?.length || 0,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        })),
        shopifyConnection: shopifyConnection ? {
          id: shopifyConnection.id,
          status: shopifyConnection.status,
          hasAccessToken: !!shopifyConnection.accessToken,
        } : null,
        connectedConnection: connectedConnection ? {
          id: connectedConnection.id,
          hasAccessToken: !!connectedConnection.accessToken,
        } : null,
      },
    })
  } catch (error) {
    console.error('[Debug] Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
}
