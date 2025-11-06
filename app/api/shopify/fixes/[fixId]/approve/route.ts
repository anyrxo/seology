/**
 * API Route: Approve Individual Fix
 * Approves and applies a single pending fix
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'
import { updateProductSEO } from '@/lib/shopify-client'

export const dynamic = 'force-dynamic'

interface ApproveFixResponse {
  success: boolean
  data?: {
    fix: {
      id: string
      status: string
      appliedAt: Date | null
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
): Promise<NextResponse<ApproveFixResponse>> {
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
      include: {
        issue: true,
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

    // Parse the changes to apply
    let changes: { productId?: string; seo?: { title?: string; description?: string } }
    try {
      changes = JSON.parse(fix.changes)
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CHANGES',
            message: 'Fix changes are malformed',
          },
        },
        { status: 500 }
      )
    }

    // Apply the fix to Shopify
    let appliedFix
    try {
      if (changes.productId && changes.seo) {
        // Update product SEO via Shopify API
        await updateProductSEO(connection.userId, shop, changes.productId, changes.seo)
      }

      // Update fix status in database with transaction
      appliedFix = await dbWrite.$transaction(async (tx) => {
        // Update fix status
        const updatedFix = await tx.fix.update({
          where: { id: fixId },
          data: {
            status: 'APPLIED',
            appliedAt: new Date(),
            rollbackDeadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
          },
        })

        // Update issue status if exists
        if (fix.issueId) {
          await tx.issue.update({
            where: { id: fix.issueId },
            data: {
              status: 'FIXED',
              fixedAt: new Date(),
            },
          })
        }

        // Create audit log
        await tx.auditLog.create({
          data: {
            userId: connection.userId,
            connectionId: connection.id,
            action: 'FIX_APPROVED',
            resource: 'fix',
            resourceId: fixId,
            details: JSON.stringify({
              fixType: fix.type,
              targetUrl: fix.targetUrl,
              issueId: fix.issueId,
            }),
          },
        })

        return updatedFix
      })
    } catch (error) {
      console.error('Error applying fix:', error)

      // Mark fix as failed
      await dbWrite.fix.update({
        where: { id: fixId },
        data: {
          status: 'FAILED',
        },
      })

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'APPLICATION_FAILED',
            message: 'Failed to apply fix to Shopify',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        fix: {
          id: appliedFix.id,
          status: appliedFix.status,
          appliedAt: appliedFix.appliedAt,
        },
      },
    })
  } catch (error) {
    console.error('Error approving fix:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to approve fix',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
