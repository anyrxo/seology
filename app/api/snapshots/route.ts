/**
 * API Route: List Automation Snapshots
 * GET /api/snapshots
 *
 * List all snapshots for the authenticated user with pagination
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Pagination
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const canRollbackOnly = searchParams.get('canRollback') === 'true'

    // Build where clause
    const where: Prisma.AutomationSnapshotWhereInput = { userId: user.id }
    if (canRollbackOnly) {
      where.canRollback = true
      where.rollbackExpiry = {
        gt: new Date(), // Not expired
      }
    }

    // Fetch snapshots
    const [snapshots, total] = await Promise.all([
      db.automationSnapshot.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
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
      }),
      db.automationSnapshot.count({ where }),
    ])

    // Format response - don't send complete state in list (too large)
    const formattedSnapshots = snapshots.map((snapshot) => ({
      id: snapshot.id,
      createdAt: snapshot.createdAt,
      snapshotType: snapshot.snapshotType,
      description: snapshot.description,
      canRollback: snapshot.canRollback,
      rollbackExpiry: snapshot.rollbackExpiry,
      rolledBackAt: snapshot.rolledBackAt,
      rollbackReason: snapshot.rollbackReason,
      sitesAffected: snapshot.sitesAffected,
      fixesApplied: snapshot.fixesApplied,
      imagesOptimized: snapshot.imagesOptimized,
      report: snapshot.report,
    }))

    return NextResponse.json({
      success: true,
      data: formattedSnapshots,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Snapshots fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch snapshots',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
