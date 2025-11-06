/**
 * API Route: Restore Checkpoint
 * Rollback all fixes applied after a specific checkpoint
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'
import { updateProductSEO } from '@/lib/shopify-client'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { checkpointId: string } }
) {
  try {
    const { shop } = await req.json()
    const { checkpointId } = params

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Find checkpoint
    const checkpoint = await db.timelineCheckpoint.findFirst({
      where: {
        id: checkpointId,
        connectionId: connection.id,
      },
    })

    if (!checkpoint) {
      return NextResponse.json(
        { success: false, error: { code: 'CHECKPOINT_NOT_FOUND', message: 'Checkpoint not found' } },
        { status: 404 }
      )
    }

    if (!checkpoint.canRollback) {
      return NextResponse.json(
        { success: false, error: { code: 'ROLLBACK_NOT_ALLOWED', message: 'This checkpoint cannot be rolled back' } },
        { status: 400 }
      )
    }

    // Get all fixes applied after this checkpoint
    const fixesToRollback = await db.fix.findMany({
      where: {
        connectionId: connection.id,
        status: 'APPLIED',
        appliedAt: {
          gte: checkpoint.createdAt,
        },
      },
      orderBy: {
        appliedAt: 'desc', // Rollback in reverse order
      },
    })

    let rolledBackCount = 0
    const errors: string[] = []

    // Rollback each fix
    for (const fix of fixesToRollback) {
      try {
        const beforeState = JSON.parse(fix.beforeState)
        const changes = JSON.parse(fix.changes)

        // Apply rollback based on fix type
        if (changes.action === 'UPDATE_PRODUCT_SEO' && changes.productId) {
          await updateProductSEO(connection.userId, shop, changes.productId, {
            title: beforeState.seoTitle,
            description: beforeState.seoDescription,
          })
        }

        // Update fix status
        await dbWrite.fix.update({
          where: { id: fix.id },
          data: {
            status: 'ROLLED_BACK',
            rolledBackAt: new Date(),
          },
        })

        // Update related issue status
        if (fix.issueId) {
          await dbWrite.issue.update({
            where: { id: fix.issueId },
            data: {
              status: 'DETECTED',
              fixedAt: null,
            },
          })
        }

        rolledBackCount++
      } catch (error) {
        console.error(`Error rolling back fix ${fix.id}:`, error)
        errors.push(`Failed to rollback fix ${fix.id}`)
      }
    }

    // Update checkpoint
    await dbWrite.timelineCheckpoint.update({
      where: { id: checkpointId },
      data: {
        rolledBackAt: new Date(),
        rollbackReason: 'Manual restore',
      },
    })

    // Create audit log
    await dbWrite.auditLog.create({
      data: {
        userId: connection.userId,
        connectionId: connection.id,
        action: 'CHECKPOINT_RESTORED',
        resource: 'checkpoint',
        resourceId: checkpointId,
        details: JSON.stringify({
          checkpointName: checkpoint.name,
          fixesRolledBack: rolledBackCount,
          errors: errors.length > 0 ? errors : undefined,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        fixesRolledBack: rolledBackCount,
        errors,
      },
    })
  } catch (error) {
    console.error('Error restoring checkpoint:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to restore checkpoint' } },
      { status: 500 }
    )
  }
}
