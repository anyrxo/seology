/**
 * API Route: Usage Breakdown
 * Returns breakdown by endpoint, model, and product
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cached } from '@/lib/cache'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')
    const groupBy = req.nextUrl.searchParams.get('groupBy') || 'endpoint'

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Get connection
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

    // Cache for 5 minutes
    const breakdownData = await cached(
      `analytics:breakdown:${shop}:${groupBy}`,
      async () => {
        // Get current month
        const currentMonth = new Date()
        currentMonth.setDate(1)
        currentMonth.setHours(0, 0, 0, 0)

        const endOfMonth = new Date(currentMonth)
        endOfMonth.setMonth(endOfMonth.getMonth() + 1)

        if (groupBy === 'endpoint') {
          // Group by endpoint
          const byEndpoint = await db.aPIUsageLog.groupBy({
            by: ['endpoint'],
            where: {
              userId: connection.userId,
              shop,
              timestamp: {
                gte: currentMonth,
                lt: endOfMonth,
              },
            },
            _count: { id: true },
            _sum: {
              totalCost: true,
              totalTokens: true,
              latencyMs: true,
            },
            _avg: {
              latencyMs: true,
            },
          })

          return {
            byEndpoint: byEndpoint.map((item) => ({
              endpoint: item.endpoint,
              calls: item._count.id,
              cost: Number((item._sum.totalCost || 0).toFixed(4)),
              tokens: item._sum.totalTokens || 0,
              avgLatency: item._avg.latencyMs ? Math.round(item._avg.latencyMs) : null,
            })),
          }
        } else if (groupBy === 'model') {
          // Group by model
          const byModel = await db.aPIUsageLog.groupBy({
            by: ['model'],
            where: {
              userId: connection.userId,
              shop,
              timestamp: {
                gte: currentMonth,
                lt: endOfMonth,
              },
            },
            _count: { id: true },
            _sum: {
              totalCost: true,
              totalTokens: true,
            },
          })

          return {
            byModel: byModel.map((item) => ({
              model: item.model,
              calls: item._count.id,
              cost: Number((item._sum.totalCost || 0).toFixed(4)),
              tokens: item._sum.totalTokens || 0,
            })),
          }
        } else if (groupBy === 'product') {
          // Group by product (resourceId where resourceType = 'product')
          const logs = await db.aPIUsageLog.findMany({
            where: {
              userId: connection.userId,
              shop,
              resourceType: 'product',
              timestamp: {
                gte: currentMonth,
                lt: endOfMonth,
              },
            },
          })

          // Group manually by resourceId
          const productMap = new Map<string, { cost: number; calls: number; tokens: number }>()

          for (const log of logs) {
            const id = log.resourceId || 'unknown'
            const existing = productMap.get(id) || { cost: 0, calls: 0, tokens: 0 }
            productMap.set(id, {
              cost: existing.cost + log.totalCost,
              calls: existing.calls + 1,
              tokens: existing.tokens + log.totalTokens,
            })
          }

          // Get product names
          const productIds = Array.from(productMap.keys()).filter((id) => id !== 'unknown')
          const products = await db.shopifyProduct.findMany({
            where: {
              connectionId: connection.id,
              shopifyProductId: { in: productIds },
            },
            select: {
              shopifyProductId: true,
              title: true,
            },
          })

          const productNameMap = new Map(products.map((p) => [p.shopifyProductId, p.title]))

          return {
            byProduct: Array.from(productMap.entries())
              .map(([id, data]) => ({
                productId: id,
                productName: productNameMap.get(id) || 'Unknown Product',
                calls: data.calls,
                cost: Number(data.cost.toFixed(4)),
                tokens: data.tokens,
              }))
              .sort((a, b) => b.cost - a.cost)
              .slice(0, 10), // Top 10
          }
        }

        return {}
      },
      300 // 5 minute cache
    )

    return NextResponse.json({
      success: true,
      data: breakdownData,
    })
  } catch (error) {
    console.error('Error fetching breakdown data:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch breakdown data' } },
      { status: 500 }
    )
  }
}
