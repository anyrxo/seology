/**
 * API Route: Rollback Automation Snapshot
 * POST /api/snapshots/[id]/rollback
 *
 * Rolls back a complete automation run to restore previous state
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    const { id: snapshotId } = await params

    // Get snapshot
    const snapshot = await db.automationSnapshot.findFirst({
      where: {
        id: snapshotId,
        userId: user.id,
      },
    })

    if (!snapshot) {
      return NextResponse.json(
        { success: false, error: { code: 'SNAPSHOT_NOT_FOUND', message: 'Snapshot not found' } },
        { status: 404 }
      )
    }

    // Check if snapshot can be rolled back
    if (!snapshot.canRollback) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ROLLBACK_DISABLED',
            message: 'This snapshot cannot be rolled back (already rolled back or expired)',
          },
        },
        { status: 400 }
      )
    }

    // Check if rollback window has expired
    if (snapshot.rollbackExpiry && new Date() > snapshot.rollbackExpiry) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ROLLBACK_EXPIRED',
            message: 'Rollback window has expired (90 days)',
          },
        },
        { status: 400 }
      )
    }

    // Parse snapshot data
    const completeState = JSON.parse(snapshot.completeState)
    const siteSnapshots = JSON.parse(snapshot.siteSnapshots)

    // Parse request body for optional rollback reason
    const body = await req.json().catch(() => ({}))
    const { reason = 'User-initiated rollback' } = body

    // Rollback all fixes from this automation run
    const rollbackResults: Array<{
      fixId: string
      status: 'success' | 'failed'
      error?: string
    }> = []

    for (const fix of completeState.fixesApplied) {
      try {
        // Find the fix in database with connection verification
        const fixRecord = await db.fix.findFirst({
          where: {
            id: fix.fixId,
          },
          include: {
            connection: {
              select: {
                userId: true,
              },
            },
          },
        })

        if (!fixRecord) {
          rollbackResults.push({
            fixId: fix.fixId,
            status: 'failed',
            error: 'Fix not found',
          })
          continue
        }

        // Verify user owns this fix through connection
        if (fixRecord.connection.userId !== user.id) {
          rollbackResults.push({
            fixId: fix.fixId,
            status: 'failed',
            error: 'Unauthorized',
          })
          continue
        }

        // Check if fix has already been rolled back
        if (fixRecord.rolledBackAt) {
          rollbackResults.push({
            fixId: fix.fixId,
            status: 'failed',
            error: 'Fix already rolled back',
          })
          continue
        }

        // Rollback the fix
        await db.fix.update({
          where: { id: fix.fixId },
          data: {
            status: 'ROLLED_BACK',
            rolledBackAt: new Date(),
          },
        })

        rollbackResults.push({
          fixId: fix.fixId,
          status: 'success',
        })
      } catch (error) {
        rollbackResults.push({
          fixId: fix.fixId,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Mark snapshot as rolled back
    await db.automationSnapshot.update({
      where: { id: snapshotId },
      data: {
        canRollback: false,
        rolledBackAt: new Date(),
        rollbackReason: reason,
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'SNAPSHOT_ROLLBACK',
        resource: 'automation_snapshot',
        resourceId: snapshotId,
        details: JSON.stringify({
          snapshotId,
          sitesAffected: snapshot.sitesAffected,
          fixesRolledBack: rollbackResults.filter(r => r.status === 'success').length,
          failedRollbacks: rollbackResults.filter(r => r.status === 'failed').length,
          reason,
        }),
      },
    })

    // Create notification
    await db.notification.create({
      data: {
        userId: user.id,
        type: 'INFO',
        title: 'Automation Rollback Complete',
        message: `Successfully rolled back automation snapshot affecting ${snapshot.sitesAffected} site(s)`,
      },
    })

    const successCount = rollbackResults.filter(r => r.status === 'success').length
    const failedCount = rollbackResults.filter(r => r.status === 'failed').length

    return NextResponse.json({
      success: true,
      message: `Rolled back ${successCount} fix(es) from automation snapshot`,
      data: {
        snapshotId,
        sitesAffected: snapshot.sitesAffected,
        fixesRolledBack: successCount,
        failedRollbacks: failedCount,
        rollbackResults: rollbackResults.filter(r => r.status === 'failed'), // Only return failures
      },
    })
  } catch (error) {
    console.error('Snapshot rollback error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to rollback snapshot',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
