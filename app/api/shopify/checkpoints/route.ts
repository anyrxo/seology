/**
 * API Route: Timeline Checkpoints Management
 * List and create checkpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    // Fetch checkpoints
    const checkpoints = await db.timelineCheckpoint.findMany({
      where: {
        connectionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: checkpoints,
    })
  } catch (error) {
    console.error('Error fetching checkpoints:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch checkpoints' } },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    const { name, description } = await req.json()

    if (!name) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: 'Name required' } },
        { status: 400 }
      )
    }

    // Get current statistics
    const [totalProducts, totalIssues, totalFixes] = await Promise.all([
      db.connection.findUnique({
        where: { id: connectionId },
        select: { pageCount: true },
      }),
      db.issue.count({
        where: {
          connectionId,
          status: { in: ['OPEN', 'DETECTED'] },
        },
      }),
      db.fix.count({
        where: {
          connectionId,
          status: 'APPLIED',
        },
      }),
    ])

    // Calculate average SEO score (if ShopifyProduct data exists)
    const products = await db.shopifyProduct.findMany({
      where: {
        connectionId,
      },
      select: {
        seoScore: true,
      },
    })

    const avgSeoScore = products.length > 0
      ? products.reduce((sum, p) => sum + (p.seoScore || 0), 0) / products.length
      : null

    // Get all current fixes to store in snapshot
    const allFixes = await db.fix.findMany({
      where: {
        connectionId,
      },
      include: {
        issue: true,
      },
    })

    // Create complete state snapshot
    const completeState = {
      timestamp: new Date().toISOString(),
      connectionId,
      shop,
      fixes: allFixes,
      statistics: {
        totalProducts: totalProducts?.pageCount || 0,
        totalIssues,
        totalFixes,
        avgSeoScore,
      },
    }

    // Create checkpoint
    const checkpoint = await dbWrite.timelineCheckpoint.create({
      data: {
        userId,
        connectionId,
        name,
        description: description || null,
        type: 'MANUAL',
        completeState: JSON.stringify(completeState),
        changesSummary: JSON.stringify({
          fixesIncluded: allFixes.map(f => f.id),
          totalChanges: allFixes.length,
        }),
        fixesIncluded: JSON.stringify(allFixes.map(f => f.id)),
        totalProducts: totalProducts?.pageCount || 0,
        totalIssues,
        totalFixes,
        avgSeoScore,
        canRollback: true,
        rollbackExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      },
    })

    // Create audit log
    await dbWrite.auditLog.create({
      data: {
        userId,
        connectionId,
        action: 'CHECKPOINT_CREATED',
        resource: 'checkpoint',
        resourceId: checkpoint.id,
        details: JSON.stringify({
          checkpointName: name,
          fixesCount: totalFixes,
          issuesCount: totalIssues,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: checkpoint,
    })
  } catch (error) {
    console.error('Error creating checkpoint:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create checkpoint' } },
      { status: 500 }
    )
  }
}
