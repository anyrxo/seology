/**
 * API Route: Reject Individual Fix
 * Rejects a pending fix without applying it
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface RejectFixRequest {
  reason?: string
}

interface RejectFixResponse {
  success: boolean
  data?: {
    fix: {
      id: string
      status: string
    }
  }
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { fixId: string } }
): Promise<NextResponse<RejectFixResponse>> {
  try {
    const { fixId } = params
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_SHOP',
            message: 'Shop parameter required',
          },
        },
        { status: 400 }
      )
    }

    // Parse request body
    let body: RejectFixRequest = {}
    try {
      body = await req.json()
    } catch {
      // Body is optional
    }

    // Find connection by shop domain
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NO_CONNECTION',
            message: 'Shop not connected',
          },
        },
        { status: 404 }
      )
    }

    // Fetch the pending fix
    const fix = await db.fix.findUnique({
      where: {
        id: fixId,
      },
    })

    if (!fix) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FIX_NOT_FOUND',
            message: 'Fix not found',
          },
        },
        { status: 404 }
      )
    }

    // Verify fix belongs to this connection
    if (fix.connectionId !== connection.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Fix does not belong to this shop',
          },
        },
        { status: 403 }
      )
    }

    // Verify fix is pending
    if (fix.status !== 'PENDING') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_STATUS',
            message: `Fix is already ${fix.status.toLowerCase()}`,
          },
        },
        { status: 400 }
      )
    }

    // Update fix status with transaction
    const rejectedFix = await dbWrite.$transaction(async (tx) => {
      // Delete the fix (it's rejected, so we don't need to keep it)
      await tx.fix.delete({
        where: { id: fixId },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: connection.userId,
          connectionId: connection.id,
          action: 'FIX_REJECTED',
          resource: 'fix',
          resourceId: fixId,
          details: JSON.stringify({
            fixType: fix.type,
            targetUrl: fix.targetUrl,
            reason: body.reason || 'No reason provided',
          }),
        },
      })

      return fix
    })

    return NextResponse.json({
      success: true,
      data: {
        fix: {
          id: rejectedFix.id,
          status: 'REJECTED',
        },
      },
    })
  } catch (error) {
    console.error('Error rejecting fix:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to reject fix',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
