/**
 * API Route: Shopify Products List (GraphQL Version)
 * MIGRATION PROOF OF CONCEPT
 *
 * This replaces the REST API version with modern GraphQL
 * Demonstrates better performance and cleaner code
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getProducts, ProductsList } from '@/lib/shopify-graphql'

export const dynamic = 'force-dynamic'

interface ProductWithAnalysis {
  id: string
  title: string
  description: string
  handle: string
  seo: {
    title: string | null
    description: string | null
  }
  featuredImage: {
    url: string
    altText: string | null
  } | null
  seoScore: number
  issues: string[]
}

// Simple SEO score calculator
function calculateSEOScore(product: {
  seo: { title: string | null; description: string | null }
  descriptionHtml: string
  handle: string
  images: { edges: Array<{ node: { altText: string | null } }> }
}): number {
  let score = 100

  // Check SEO title
  if (!product.seo.title) {
    score -= 20
  } else if (product.seo.title.length < 30 || product.seo.title.length > 60) {
    score -= 10
  }

  // Check SEO description
  if (!product.seo.description) {
    score -= 20
  } else if (product.seo.description.length < 120 || product.seo.description.length > 160) {
    score -= 10
  }

  // Check featured image alt text
  const firstImage = product.images.edges[0]
  if (!firstImage?.node.altText) {
    score -= 15
  }

  // Check product description (strip HTML for length)
  const plainDescription = product.descriptionHtml.replace(/<[^>]*>/g, '')
  if (!plainDescription || plainDescription.length < 100) {
    score -= 15
  }

  // Check handle (URL slug)
  if (product.handle.length > 50) {
    score -= 10
  }

  return Math.max(0, score)
}

function identifyIssues(product: {
  seo: { title: string | null; description: string | null }
  descriptionHtml: string
  handle: string
  images: { edges: Array<{ node: { altText: string | null } }> }
}): string[] {
  const issues: string[] = []

  if (!product.seo.title) {
    issues.push('Missing SEO title')
  } else if (product.seo.title.length < 30) {
    issues.push('SEO title too short (minimum 30 characters)')
  } else if (product.seo.title.length > 60) {
    issues.push('SEO title too long (maximum 60 characters)')
  }

  if (!product.seo.description) {
    issues.push('Missing SEO description')
  } else if (product.seo.description.length < 120) {
    issues.push('SEO description too short (minimum 120 characters)')
  } else if (product.seo.description.length > 160) {
    issues.push('SEO description too long (maximum 160 characters)')
  }

  const firstImage = product.images.edges[0]
  if (!firstImage?.node.altText) {
    issues.push('Missing image alt text')
  }

  const plainDescription = product.descriptionHtml.replace(/<[^>]*>/g, '')
  if (!plainDescription || plainDescription.length < 100) {
    issues.push('Product description too short')
  }

  if (product.handle.length > 50) {
    issues.push('URL handle too long')
  }

  return issues
}

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10')
    const cursor = req.nextUrl.searchParams.get('cursor') || undefined

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Find connection by shop domain
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

    // Fetch products using GraphQL
    const result: ProductsList = await getProducts(connection, limit, cursor)

    // Transform and analyze products
    const productsWithAnalysis: ProductWithAnalysis[] = result.products.edges.map((edge) => {
      const product = edge.node
      const firstImage = product.images.edges[0]

      return {
        id: product.id.replace('gid://shopify/Product/', ''),
        title: product.title,
        description: product.descriptionHtml.replace(/<[^>]*>/g, ''), // Strip HTML
        handle: product.handle,
        seo: product.seo,
        featuredImage: firstImage
          ? {
              url: firstImage.node.url,
              altText: firstImage.node.altText,
            }
          : null,
        seoScore: calculateSEOScore(product),
        issues: identifyIssues(product),
      }
    })

    // Sort by SEO score (worst first)
    productsWithAnalysis.sort((a, b) => a.seoScore - b.seoScore)

    return NextResponse.json({
      success: true,
      data: productsWithAnalysis,
      pagination: {
        hasNextPage: result.products.pageInfo.hasNextPage,
        endCursor: result.products.pageInfo.endCursor,
      },
      meta: {
        count: productsWithAnalysis.length,
        apiVersion: 'GraphQL 2025-10',
        method: 'GraphQL (migrated from REST)',
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch products',
        },
      },
      { status: 500 }
    )
  }
}
