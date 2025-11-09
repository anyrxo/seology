/**
 * API Route: Batch Approve Fixes
 * Approves and applies multiple individual fixes at once
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'
import { updateProductSEO } from '@/lib/shopify-client'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

interface BatchApproveRequest {
  fixIds: string[]
}

interface BatchApproveResponse {
  success: boolean
  data?: {
    results: {
      successful: number
      failed: number
      total: number
    }
    fixes: Array<{
      fixId: string
      success: boolean
      error?: string
    }>
  }
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<BatchApproveResponse>> {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response as NextResponse<BatchApproveResponse>
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    // Parse request body
    let body: BatchApproveRequest
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_BODY',
            message: 'Request body must be valid JSON',
          },
        },
        { status: 400 }
      )
    }

    // Validate fixIds
    if (!Array.isArray(body.fixIds) || body.fixIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FIX_IDS',
            message: 'fixIds must be a non-empty array',
          },
        },
        { status: 400 }
      )
    }

    // Fetch all pending fixes
    const fixes = await db.fix.findMany({
      where: {
        id: {
          in: body.fixIds,
        },
        connectionId,
        status: 'PENDING',
        planId: null, // Only individual fixes, not part of a plan
      },
      include: {
        issue: true,
      },
    })

    if (fixes.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NO_FIXES_FOUND',
            message: 'No pending fixes found with the provided IDs',
          },
        },
        { status: 404 }
      )
    }

    // Apply all fixes
    let successfulFixes = 0
    let failedFixes = 0
    const fixResults: Array<{ fixId: string; success: boolean; error?: string }> = []

    for (const fix of fixes) {
      try {
        // Parse the changes to apply
        let changes: { productId?: string; seo?: { title?: string; description?: string } }
        try {
          changes = JSON.parse(fix.changes)
        } catch {
          throw new Error('Malformed fix changes')
        }

        // Apply the fix to Shopify
        if (changes.productId && changes.seo) {
          await updateProductSEO(userId, shop, changes.productId, changes.seo)
        }

        // Update fix status in transaction
        await dbWrite.$transaction(async (tx) => {
          await tx.fix.update({
            where: { id: fix.id },
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

          // Create audit log for this fix
          await tx.auditLog.create({
            data: {
              userId,
              connectionId,
              action: 'FIX_BATCH_APPROVED',
              resource: 'fix',
              resourceId: fix.id,
              details: JSON.stringify({
                fixType: fix.type,
                targetUrl: fix.targetUrl,
                batchSize: body.fixIds.length,
              }),
            },
          })
        })

        successfulFixes++
        fixResults.push({ fixId: fix.id, success: true })
      } catch (error) {
        console.error(`Error applying fix ${fix.id}:`, error)

        // Mark fix as failed
        await dbWrite.fix.update({
          where: { id: fix.id },
          data: {
            status: 'FAILED',
          },
        })

        failedFixes++
        fixResults.push({
          fixId: fix.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Create summary audit log
    await dbWrite.auditLog.create({
      data: {
        userId,
        connectionId,
        action: 'BATCH_APPROVAL_COMPLETED',
        resource: 'fix',
        details: JSON.stringify({
          totalRequested: body.fixIds.length,
          totalProcessed: fixes.length,
          successfulFixes,
          failedFixes,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        results: {
          successful: successfulFixes,
          failed: failedFixes,
          total: fixes.length,
        },
        fixes: fixResults,
      },
    })
  } catch (error) {
    console.error('Error batch approving fixes:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to batch approve fixes',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
