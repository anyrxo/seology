/**
 * API Route: Get Automation Snapshot
 * GET /api/snapshots/[id]
 *
 * Get detailed snapshot information for review before rollback
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(
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
      include: {
        report: {
          select: {
            id: true,
            date: true,
            reportType: true,
            executionMode: true,
          },
        },
      },
    })

    if (!snapshot) {
      return NextResponse.json(
        { success: false, error: { code: 'SNAPSHOT_NOT_FOUND', message: 'Snapshot not found' } },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const completeState = JSON.parse(snapshot.completeState)
    const siteSnapshots = JSON.parse(snapshot.siteSnapshots)

    return NextResponse.json({
      success: true,
      data: {
        id: snapshot.id,
        createdAt: snapshot.createdAt,
        snapshotType: snapshot.snapshotType,
        description: snapshot.description,

        // Rollback status
        canRollback: snapshot.canRollback,
        rollbackExpiry: snapshot.rollbackExpiry,
        rolledBackAt: snapshot.rolledBackAt,
        rollbackReason: snapshot.rollbackReason,

        // Summary metrics
        sitesAffected: snapshot.sitesAffected,
        fixesApplied: snapshot.fixesApplied,
        imagesOptimized: snapshot.imagesOptimized,

        // Detailed data
        completeState,
        siteSnapshots,

        // Associated report
        report: snapshot.report,
      },
    })
  } catch (error) {
    console.error('Snapshot fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch snapshot',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
