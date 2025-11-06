/**
 * API Route: Shopify Store Overview
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fetchProducts } from '@/lib/shopify-client'
import { cached } from '@/lib/cache'

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

    // PERFORMANCE: Cache connection lookup for 5 minutes
    const connection = await cached(
      `connection:${shop}:shopify`,
      async () => {
        return await db.connection.findFirst({
          where: {
            domain: shop,
            platform: 'SHOPIFY',
            status: 'CONNECTED',
          },
        })
      },
      300 // 5 minutes
    )

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // PERFORMANCE: Cache overview data for 2 minutes
    const overviewData = await cached(
      `overview:${shop}`,
      async () => {
        // Fetch products from Shopify
        const products = await fetchProducts(connection.userId, shop)

        // Get issues from database
        const issues = await db.issue.findMany({
          where: {
            connection: {
              domain: shop,
              platform: 'SHOPIFY',
            },
            status: 'OPEN',
          },
        })

        // Get applied fixes count
        const appliedFixes = await db.fix.count({
          where: {
            issue: {
              connection: {
                domain: shop,
                platform: 'SHOPIFY',
              },
            },
            status: 'APPLIED',
          },
        })

        // Calculate average SEO score (placeholder - would need actual analysis)
        const avgScore = 75

        return {
          totalProducts: products.length,
          totalIssues: issues.length,
          appliedFixes,
          avgScore,
        }
      },
      120 // 2 minutes cache
    )

    return NextResponse.json({
      success: true,
      data: overviewData,
    })
  } catch (error) {
    console.error('Error fetching Shopify overview:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch store overview' } },
      { status: 500 }
    )
  }
}
