/**
 * API Route: Branch from Checkpoint
 * Create a new timeline branch from a checkpoint
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { checkpointId: string } }
) {
  try {
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    const { branchName } = await req.json()
    const { checkpointId } = params

    if (!branchName) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: 'branchName required' } },
        { status: 400 }
      )
    }

    // Find parent checkpoint
    const parentCheckpoint = await db.timelineCheckpoint.findFirst({
      where: {
        id: checkpointId,
        connectionId,
      },
    })

    if (!parentCheckpoint) {
      return NextResponse.json(
        { success: false, error: { code: 'CHECKPOINT_NOT_FOUND', message: 'Parent checkpoint not found' } },
        { status: 404 }
      )
    }

    // Create branch checkpoint
    const branchCheckpoint = await dbWrite.timelineCheckpoint.create({
      data: {
        userId,
        connectionId,
        name: `Branch: ${branchName}`,
        description: `Branched from checkpoint "${parentCheckpoint.name}"`,
        type: 'MANUAL',
        completeState: parentCheckpoint.completeState,
        changesSummary: JSON.stringify({
          branchedFrom: checkpointId,
          parentName: parentCheckpoint.name,
        }),
        fixesIncluded: parentCheckpoint.fixesIncluded,
        totalProducts: parentCheckpoint.totalProducts,
        totalIssues: parentCheckpoint.totalIssues,
        totalFixes: parentCheckpoint.totalFixes,
        avgSeoScore: parentCheckpoint.avgSeoScore,
        canRollback: true,
        rollbackExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        parentCheckpointId: checkpointId,
        branchName,
      },
    })

    // Create audit log
    await dbWrite.auditLog.create({
      data: {
        userId,
        connectionId,
        action: 'CHECKPOINT_BRANCHED',
        resource: 'checkpoint',
        resourceId: branchCheckpoint.id,
        details: JSON.stringify({
          branchName,
          parentCheckpoint: parentCheckpoint.name,
          parentCheckpointId: checkpointId,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: branchCheckpoint,
    })
  } catch (error) {
    console.error('Error creating branch:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create branch' } },
      { status: 500 }
    )
  }
}
