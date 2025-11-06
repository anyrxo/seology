/**
 * API Route: Timeline Checkpoints Management
 * List and create checkpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, dbWrite } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

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

    // Fetch checkpoints
    const checkpoints = await db.timelineCheckpoint.findMany({
      where: {
        connectionId: connection.id,
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
    const { shop, name, description } = await req.json()

    if (!shop || !name) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: 'Shop and name required' } },
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

    // Get current statistics
    const [totalProducts, totalIssues, totalFixes] = await Promise.all([
      db.connection.findUnique({
        where: { id: connection.id },
        select: { pageCount: true },
      }),
      db.issue.count({
        where: {
          connectionId: connection.id,
          status: { in: ['OPEN', 'DETECTED'] },
        },
      }),
      db.fix.count({
        where: {
          connectionId: connection.id,
          status: 'APPLIED',
        },
      }),
    ])

    // Calculate average SEO score (if ShopifyProduct data exists)
    const products = await db.shopifyProduct.findMany({
      where: {
        connectionId: connection.id,
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
        connectionId: connection.id,
      },
      include: {
        issue: true,
      },
    })

    // Create complete state snapshot
    const completeState = {
      timestamp: new Date().toISOString(),
      connectionId: connection.id,
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
        userId: connection.userId,
        connectionId: connection.id,
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
        userId: connection.userId,
        connectionId: connection.id,
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
