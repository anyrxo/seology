/**
 * API Route: Shopify Store Overview
 *
 * Returns store analytics and top priority products
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { createShopifyClient, getPrioritizedProducts } from '@/lib/shopify-api-client'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get connectionId from query params
    const connectionId = req.nextUrl.searchParams.get('connectionId')

    if (!connectionId) {
      return NextResponse.json(
        { error: 'connectionId is required' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get connection
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
    })

    if (!connection) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
    }

    // Verify ownership
    if (connection.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    if (!connection.accessToken) {
      return NextResponse.json(
        { error: 'Connection missing access token' },
        { status: 400 }
      )
    }

    // Create Shopify client
    const client = await createShopifyClient({
      domain: connection.domain,
      accessToken: connection.accessToken,
    })

    // Get prioritized products
    const products = await getPrioritizedProducts(client, 50)

    // Calculate stats
    const averageSeoScore = Math.round(
      products.reduce((sum, p) => sum + p.seoScore, 0) / products.length
    )
    const criticalIssuesCount = products.filter((p) => p.seoScore < 60).length

    // Parse credentials
    const credentials = JSON.parse(connection.credentials || '{}')

    // Get top products with issues
    const topProducts = products.slice(0, 10).map((product) => {
      const issues: string[] = []

      // We'll need to fetch full product details to get specific issues
      // For now, return generic issues based on score
      if (product.seoScore < 80) {
        issues.push('SEO optimization needed')
      }
      if (product.seoScore < 60) {
        issues.push('Critical SEO issues')
      }

      return {
        ...product,
        issues,
      }
    })

    return NextResponse.json({
      success: true,
      store: {
        name: credentials.name || connection.displayName || '',
        domain: connection.domain,
        productsAnalyzed: products.length,
        averageSeoScore,
        criticalIssuesCount,
        currency: credentials.currency || 'USD',
      },
      topProducts,
    })
  } catch (error) {
    console.error('Error fetching Shopify overview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch store overview' },
      { status: 500 }
    )
  }
}
