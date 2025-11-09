/**
 * API Route: Reject Individual Fix
 * Rejects a pending fix without applying it
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

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

    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response as NextResponse<RejectFixResponse>
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId

    // Parse request body
    let body: RejectFixRequest = {}
    try {
      body = await req.json()
    } catch {
      // Body is optional
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
    if (fix.connectionId !== connectionId) {
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
          userId,
          connectionId,
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
