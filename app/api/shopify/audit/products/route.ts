/**
 * API Route: Products-Only SEO Audit
 *
 * Focused audit for product catalog SEO:
 * - Product titles and SEO meta
 * - Product descriptions
 * - Image alt text optimization
 * - Product schema markup
 *
 * Faster than full audit, optimized for product-focused analysis
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { getProducts } from '@/lib/shopify-graphql'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'
export const maxDuration = 30 // 30 seconds for products-only audit

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ProductAuditOptions {
  limit?: number
}

interface SEOIssue {
  resource: string
  resourceId: string
  resourceTitle: string
  issueType: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  recommendation: string
  currentValue?: string
  suggestedValue?: string
}

interface ProductAuditResult {
  totalProducts: number
  issuesFound: number
  issues: SEOIssue[]
  breakdown: {
    missingTitles: number
    shortTitles: number
    missingDescriptions: number
    shortDescriptions: number
    thinContent: number
    missingAltText: number
  }
  aiInsights: string
  estimatedImpact: string
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate with session token middleware
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const body = await req.json()
    const options: ProductAuditOptions = body.options || { limit: 100 }

    console.log(`[Products Audit] Starting for shop: ${context.shop}, limit: ${options.limit}`)

    // Fetch full connection object for GraphQL helpers
    const connection = await db.connection.findUnique({
      where: { id: context.connection.id }
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    const issues: SEOIssue[] = []
    const breakdown = {
      missingTitles: 0,
      shortTitles: 0,
      missingDescriptions: 0,
      shortDescriptions: 0,
      thinContent: 0,
      missingAltText: 0,
    }

    // =========================================================================
    // FETCH PRODUCTS
    // =========================================================================
    console.log('[Products Audit] Fetching products from Shopify...')
    const productsData = await getProducts(connection, options.limit || 100)
    const products = productsData.products.edges.map(e => e.node)

    console.log(`[Products Audit] Analyzing ${products.length} products...`)

    // =========================================================================
    // ANALYZE EACH PRODUCT
    // =========================================================================
    for (const product of products) {
      // Check SEO title
      if (!product.seo.title) {
        issues.push({
          resource: 'product',
          resourceId: product.id,
          resourceTitle: product.title,
          issueType: 'missing_seo_title',
          severity: 'high',
          description: 'Missing SEO title',
          recommendation: 'Add compelling SEO title (50-60 characters) with primary keyword and brand name',
          currentValue: '(empty)',
          suggestedValue: `${product.title.substring(0, 50)} - [Brand Name]`
        })
        breakdown.missingTitles++
      } else if (product.seo.title.length < 30) {
        issues.push({
          resource: 'product',
          resourceId: product.id,
          resourceTitle: product.title,
          issueType: 'short_seo_title',
          severity: 'high',
          description: `SEO title too short (${product.seo.title.length} chars, recommended 50-60)`,
          recommendation: 'Expand SEO title to 50-60 characters with keyword optimization',
          currentValue: product.seo.title,
          suggestedValue: `${product.seo.title} - Benefits & Features | [Brand]`
        })
        breakdown.shortTitles++
      }

      // Check SEO description
      if (!product.seo.description) {
        issues.push({
          resource: 'product',
          resourceId: product.id,
          resourceTitle: product.title,
          issueType: 'missing_seo_description',
          severity: 'high',
          description: 'Missing SEO meta description',
          recommendation: 'Add compelling meta description (120-160 characters) with benefits, keywords, and call-to-action',
          currentValue: '(empty)',
        })
        breakdown.missingDescriptions++
      } else if (product.seo.description.length < 120) {
        issues.push({
          resource: 'product',
          resourceId: product.id,
          resourceTitle: product.title,
          issueType: 'short_seo_description',
          severity: 'high',
          description: `SEO description too short (${product.seo.description.length} chars, recommended 120-160)`,
          recommendation: 'Expand meta description to 120-160 characters with compelling benefits and call-to-action',
          currentValue: product.seo.description,
        })
        breakdown.shortDescriptions++
      }

      // Check product description content
      if (!product.descriptionHtml || product.descriptionHtml.length < 100) {
        issues.push({
          resource: 'product',
          resourceId: product.id,
          resourceTitle: product.title,
          issueType: 'thin_content',
          severity: 'medium',
          description: product.descriptionHtml
            ? `Product description too short (${product.descriptionHtml.length} chars)`
            : 'Missing product description',
          recommendation: 'Add detailed product description (300+ words) with benefits, features, specifications, and target keywords',
          currentValue: product.descriptionHtml || '(empty)',
        })
        breakdown.thinContent++
      }

      // Check images alt text
      const imagesWithoutAlt = product.images.edges.filter(e => !e.node.altText)
      if (imagesWithoutAlt.length > 0) {
        issues.push({
          resource: 'product',
          resourceId: product.id,
          resourceTitle: product.title,
          issueType: 'missing_image_alt',
          severity: 'medium',
          description: `${imagesWithoutAlt.length} of ${product.images.edges.length} image(s) missing alt text`,
          recommendation: 'Add descriptive, keyword-rich alt text to all product images for accessibility and SEO',
        })
        breakdown.missingAltText++
      }
    }

    // =========================================================================
    // CLAUDE AI ANALYSIS
    // =========================================================================
    console.log('[Products Audit] Generating AI insights...')

    const topIssues = issues
      .sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return severityOrder[a.severity] - severityOrder[b.severity]
      })
      .slice(0, 15)

    const aiPrompt = `You are an expert e-commerce SEO consultant analyzing a Shopify product catalog.

Product Catalog Overview:
- Total Products: ${products.length}
- Total Issues: ${issues.length}

Issue Breakdown:
- Missing SEO Titles: ${breakdown.missingTitles}
- Short SEO Titles (<30 chars): ${breakdown.shortTitles}
- Missing Meta Descriptions: ${breakdown.missingDescriptions}
- Short Meta Descriptions (<120 chars): ${breakdown.shortDescriptions}
- Thin Product Content (<100 chars): ${breakdown.thinContent}
- Images Missing Alt Text: ${breakdown.missingAltText}

Sample Issues:
${topIssues.slice(0, 10).map(issue => `- ${issue.resourceTitle}: ${issue.description}`).join('\n')}

Provide:
1. Overall product catalog SEO health assessment (1-2 sentences)
2. Top 3 priorities for product optimization (be specific)
3. Expected impact on product discovery and conversions

Keep it concise, actionable, and focused on e-commerce results.`

    const aiResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: aiPrompt
      }]
    })

    const aiContent = aiResponse.content[0]
    const aiInsights = aiContent.type === 'text' ? aiContent.text : 'Unable to generate insights'

    // =========================================================================
    // STORE AUDIT RESULTS
    // =========================================================================
    await db.auditLog.create({
      data: {
        userId: context.userId,
        connectionId: context.connection.id,
        action: 'PRODUCTS_AUDIT_COMPLETED',
        resource: 'products',
        resourceId: context.shop,
        details: JSON.stringify({
          totalProducts: products.length,
          totalIssues: issues.length,
          breakdown,
          timestamp: new Date().toISOString(),
        })
      }
    })

    const result: ProductAuditResult = {
      totalProducts: products.length,
      issuesFound: issues.length,
      issues: issues.slice(0, 100), // Return top 100 issues
      breakdown,
      aiInsights,
      estimatedImpact: 'Optimizing product SEO can improve product page traffic by 30-50% and increase conversion rates by 15-25%'
    }

    console.log(`[Products Audit] Completed - Found ${issues.length} issues across ${products.length} products`)

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('[Products Audit] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'PRODUCTS_AUDIT_ERROR',
          message: error instanceof Error ? error.message : 'Products audit failed'
        }
      },
      { status: 500 }
    )
  }
}
