/**
 * API Route: Shopify Store Overview
 * Uses session token authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fetchProducts } from '@/lib/shopify-client'
import { cached } from '@/lib/cache'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Authenticate with session token middleware
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult

    // PERFORMANCE: Cache overview data for 2 minutes
    const overviewData = await cached(
      `overview:${context.shop}`,
      async () => {
        // Fetch products from Shopify
        const products = await fetchProducts(context.userId, context.shop)

        // Get issues from database
        const issues = await db.issue.findMany({
          where: {
            connection: {
              domain: context.shop,
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
                domain: context.shop,
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
