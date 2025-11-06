/**
 * API Route: Shopify Products List
 * Fetches all products with SEO analysis
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fetchProducts } from '@/lib/shopify-client'

export const dynamic = 'force-dynamic'

interface ProductForAnalysis {
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
}

// Simple SEO score calculator
function calculateSEOScore(product: ProductForAnalysis): number {
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
  if (!product.featuredImage?.altText) {
    score -= 15
  }

  // Check product description
  if (!product.description || product.description.length < 100) {
    score -= 15
  }

  // Check handle (URL slug)
  if (product.handle.length > 50) {
    score -= 10
  }

  return Math.max(0, score)
}

function identifyIssues(product: ProductForAnalysis): string[] {
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

  if (!product.featuredImage?.altText) {
    issues.push('Missing image alt text')
  }

  if (!product.description || product.description.length < 100) {
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

    // Fetch products from Shopify
    const products = await fetchProducts(connection.userId, shop)

    // Calculate SEO scores and identify issues
    const productsWithScores = products.map((product) => ({
      ...product,
      seoScore: calculateSEOScore(product),
      issues: identifyIssues(product),
    }))

    // Sort by SEO score (worst first)
    productsWithScores.sort((a, b) => a.seoScore - b.seoScore)

    return NextResponse.json({
      success: true,
      data: productsWithScores,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch products' } },
      { status: 500 }
    )
  }
}
