/**
 * TEMPORARY ENDPOINT - Fix connection status from DISCONNECTED to CONNECTED
 * DELETE THIS AFTER USE
 */

import { NextRequest, NextResponse } from 'next/server'
import { dbWrite } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json({
        success: false,
        error: 'Shop parameter required',
      }, { status: 400 })
    }

    console.log(`[Fix Status] Looking for connection: ${shop}`)

    // Find the connection
    const connection = await dbWrite.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
      },
      select: {
        id: true,
        domain: true,
        status: true,
        accessToken: true,
        userId: true,
        displayName: true,
      },
    })

    if (!connection) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NO_CONNECTION',
          message: 'No connection found for this shop',
        },
      }, { status: 404 })
    }

    console.log(`[Fix Status] Found connection:`, {
      id: connection.id,
      status: connection.status,
      hasAccessToken: !!connection.accessToken,
    })

    if (connection.status === 'CONNECTED') {
      return NextResponse.json({
        success: true,
        message: 'Connection is already CONNECTED',
        data: {
          id: connection.id,
          domain: connection.domain,
          status: connection.status,
          displayName: connection.displayName,
        },
      })
    }

    if (!connection.accessToken) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'NO_ACCESS_TOKEN',
          message: 'Connection has no access token - re-run OAuth flow',
          redirectUrl: `/api/auth/shopify?shop=${shop}`,
        },
      }, { status: 400 })
    }

    // Update status to CONNECTED
    console.log(`[Fix Status] Updating status to CONNECTED...`)

    const updated = await dbWrite.connection.update({
      where: { id: connection.id },
      data: {
        status: 'CONNECTED',
        lastSync: new Date(),
      },
    })

    console.log(`[Fix Status] ✅ Status updated successfully`)

    // Create audit log
    await dbWrite.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'CONNECTION_STATUS_FIXED',
        resource: 'connection',
        resourceId: connection.id,
        details: JSON.stringify({
          shop: connection.domain,
          oldStatus: connection.status,
          newStatus: 'CONNECTED',
          fixedBy: 'api-endpoint',
        }),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Connection status updated to CONNECTED',
      data: {
        id: updated.id,
        domain: updated.domain,
        status: updated.status,
        displayName: updated.displayName,
        lastSync: updated.lastSync,
      },
    })

  } catch (error) {
    console.error('[Fix Status] Error:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fix connection status',
        details: error instanceof Error ? error.message : String(error),
      },
    }, { status: 500 })
  }
}
