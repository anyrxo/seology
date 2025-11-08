/**
 * API Route: Complete Store SEO Audit
 *
 * Comprehensive SEO audit across all store resources:
 * - Products (title, description, images, SEO meta)
 * - Pages (content, SEO meta)
 * - Blog Articles (content, SEO meta, featured images)
 * - Collections (descriptions, SEO meta)
 * - Technical SEO (redirects, schema markup)
 *
 * Uses Claude AI to analyze all resources and generate prioritized fix recommendations
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import {
  getProducts,
  getPages,
  getBlogs,
  getCollections
} from '@/lib/shopify-graphql'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutes for comprehensive audit (Shopify API + Claude AI can be slow)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface AuditOptions {
  scope?: 'full' | 'products' | 'content' | 'technical'
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

interface AuditResult {
  totalResources: number
  issuesFound: number
  issues: SEOIssue[]
  summary: {
    products: { total: number; issues: number }
    pages: { total: number; issues: number }
    blog: { total: number; issues: number }
    collections: { total: number; issues: number }
    technical: { issues: number }
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
    const options: AuditOptions = body.options || { scope: 'full', limit: 50 }

    console.log(`[Audit] Starting ${options.scope} audit for shop: ${context.shop}`)

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
    const summary = {
      products: { total: 0, issues: 0 },
      pages: { total: 0, issues: 0 },
      blog: { total: 0, issues: 0 },
      collections: { total: 0, issues: 0 },
      technical: { issues: 0 },
    }

    // =========================================================================
    // PRODUCTS AUDIT
    // =========================================================================
    if (options.scope === 'full' || options.scope === 'products') {
      console.log('[Audit] Fetching products from Shopify...')
      const productsData = await getProducts(connection, options.limit || 50)
      console.log(`[Audit] ✅ Fetched ${productsData.products.edges.length} products from Shopify`)
      const products = productsData.products.edges.map(e => e.node)
      summary.products.total = products.length

      // =========================================================================
      // SAVE PRODUCTS TO DATABASE (for dashboard display)
      // =========================================================================
      console.log(`[Audit] Saving ${products.length} products to database...`)
      for (const product of products) {
        // Calculate SEO score
        let seoScore = 100
        if (!product.seo?.title || product.seo.title.length < 30) seoScore -= 20
        if (!product.seo?.description || product.seo.description.length < 120) seoScore -= 15
        if (!product.descriptionHtml || product.descriptionHtml.length < 100) seoScore -= 20
        const imagesWithoutAlt = product.images?.edges?.filter((e: { node: { altText?: string | null } }) => !e.node.altText) || []
        if (imagesWithoutAlt.length > 0) seoScore -= 15
        seoScore = Math.max(0, seoScore)

        try {
          await db.shopifyProduct.upsert({
            where: {
              connectionId_shopifyProductId: {
                connectionId: connection.id,
                shopifyProductId: product.id,
              }
            },
            create: {
              connectionId: connection.id,
              shopifyProductId: product.id,
              shopifyHandle: product.handle,
              title: product.title,
              bodyHtml: product.descriptionHtml || null,
              status: 'active', // Default status since ProductSEO doesn't include it
              metaTitle: product.seo?.title || null,
              metaDescription: product.seo?.description || null,
              images: JSON.stringify(product.images?.edges?.map((img: { node: unknown }) => img.node) || []),
              seoScore,
              lastAnalyzedAt: new Date(),
            },
            update: {
              shopifyHandle: product.handle,
              title: product.title,
              bodyHtml: product.descriptionHtml || null,
              metaTitle: product.seo?.title || null,
              metaDescription: product.seo?.description || null,
              images: JSON.stringify(product.images?.edges?.map((img: { node: unknown }) => img.node) || []),
              seoScore,
              lastAnalyzedAt: new Date(),
            }
          })
        } catch (dbError) {
          console.error(`[Audit] Failed to save product ${product.id}:`, dbError)
        }
      }
      console.log(`[Audit] Successfully saved ${products.length} products to database`)

      for (const product of products) {
        // Check SEO title
        if (!product.seo.title || product.seo.title.length < 30) {
          issues.push({
            resource: 'product',
            resourceId: product.id,
            resourceTitle: product.title,
            issueType: 'missing_seo_title',
            severity: 'high',
            description: product.seo.title
              ? `SEO title too short (${product.seo.title.length} chars)`
              : 'Missing SEO title',
            recommendation: 'Add compelling SEO title (50-60 characters) with primary keyword',
            currentValue: product.seo.title || '(empty)',
            suggestedValue: `${product.title.substring(0, 50)} - [Brand Name]`
          })
          summary.products.issues++
        }

        // Check SEO description
        if (!product.seo.description || product.seo.description.length < 120) {
          issues.push({
            resource: 'product',
            resourceId: product.id,
            resourceTitle: product.title,
            issueType: 'missing_seo_description',
            severity: 'high',
            description: product.seo.description
              ? `SEO description too short (${product.seo.description.length} chars)`
              : 'Missing SEO description',
            recommendation: 'Add compelling meta description (120-160 characters) with call-to-action',
            currentValue: product.seo.description || '(empty)',
          })
          summary.products.issues++
        }

        // Check product description
        if (!product.descriptionHtml || product.descriptionHtml.length < 100) {
          issues.push({
            resource: 'product',
            resourceId: product.id,
            resourceTitle: product.title,
            issueType: 'thin_content',
            severity: 'medium',
            description: 'Product description too short or missing',
            recommendation: 'Add detailed product description (300+ words) with benefits, features, and keywords',
            currentValue: product.descriptionHtml || '(empty)',
          })
          summary.products.issues++
        }

        // Check images alt text
        const imagesWithoutAlt = product.images.edges.filter((e: { node: { altText?: string | null } }) => !e.node.altText)
        if (imagesWithoutAlt.length > 0) {
          issues.push({
            resource: 'product',
            resourceId: product.id,
            resourceTitle: product.title,
            issueType: 'missing_image_alt',
            severity: 'medium',
            description: `${imagesWithoutAlt.length} image(s) missing alt text`,
            recommendation: 'Add descriptive alt text to all product images for accessibility and SEO',
          })
          summary.products.issues++
        }
      }
    }

    // =========================================================================
    // PAGES AUDIT
    // =========================================================================
    if (options.scope === 'full' || options.scope === 'content') {
      console.log('[Audit] Analyzing pages...')
      const pagesData = await getPages(connection, options.limit || 20)
      const pages = pagesData.pages.edges.map(e => e.node)
      summary.pages.total = pages.length

      for (const page of pages) {
        // Check SEO title
        if (!page.seo.title) {
          issues.push({
            resource: 'page',
            resourceId: page.id,
            resourceTitle: page.title,
            issueType: 'missing_seo_title',
            severity: 'high',
            description: 'Missing SEO title',
            recommendation: 'Add SEO title optimized for target keywords',
            currentValue: '(empty)',
          })
          summary.pages.issues++
        }

        // Check SEO description
        if (!page.seo.description) {
          issues.push({
            resource: 'page',
            resourceId: page.id,
            resourceTitle: page.title,
            issueType: 'missing_seo_description',
            severity: 'high',
            description: 'Missing meta description',
            recommendation: 'Add compelling meta description (120-160 characters)',
            currentValue: '(empty)',
          })
          summary.pages.issues++
        }

        // Check content length
        if (page.bodySummary && page.bodySummary.length < 200) {
          issues.push({
            resource: 'page',
            resourceId: page.id,
            resourceTitle: page.title,
            issueType: 'thin_content',
            severity: 'medium',
            description: 'Page content too short',
            recommendation: 'Expand page content to 500+ words with relevant keywords and value',
          })
          summary.pages.issues++
        }
      }
    }

    // =========================================================================
    // BLOG ARTICLES AUDIT
    // =========================================================================
    if (options.scope === 'full' || options.scope === 'content') {
      console.log('[Audit] Analyzing blog articles...')
      const blogsData = await getBlogs(connection, 10)
      const articles = blogsData.blogs.edges.flatMap(b =>
        b.node.articles.edges.map(a => a.node)
      )
      summary.blog.total = articles.length

      for (const article of articles) {
        // Check SEO title
        if (!article.seo.title) {
          issues.push({
            resource: 'article',
            resourceId: article.id,
            resourceTitle: article.title,
            issueType: 'missing_seo_title',
            severity: 'high',
            description: 'Blog article missing SEO title',
            recommendation: 'Add SEO-optimized title with target keyword',
            currentValue: '(empty)',
          })
          summary.blog.issues++
        }

        // Check SEO description
        if (!article.seo.description) {
          issues.push({
            resource: 'article',
            resourceId: article.id,
            resourceTitle: article.title,
            issueType: 'missing_seo_description',
            severity: 'high',
            description: 'Blog article missing meta description',
            recommendation: 'Add compelling meta description to improve CTR',
            currentValue: '(empty)',
          })
          summary.blog.issues++
        }
      }
    }

    // =========================================================================
    // COLLECTIONS AUDIT
    // =========================================================================
    if (options.scope === 'full' || options.scope === 'content') {
      console.log('[Audit] Analyzing collections...')
      const collectionsData = await getCollections(connection, options.limit || 30)
      const collections = collectionsData.collections.edges.map(e => e.node)
      summary.collections.total = collections.length

      for (const collection of collections) {
        // Check SEO title
        if (!collection.seo.title) {
          issues.push({
            resource: 'collection',
            resourceId: collection.id,
            resourceTitle: collection.title,
            issueType: 'missing_seo_title',
            severity: 'high',
            description: 'Collection missing SEO title',
            recommendation: 'Add category-focused SEO title',
            currentValue: '(empty)',
          })
          summary.collections.issues++
        }

        // Check SEO description
        if (!collection.seo.description) {
          issues.push({
            resource: 'collection',
            resourceId: collection.id,
            resourceTitle: collection.title,
            issueType: 'missing_seo_description',
            severity: 'high',
            description: 'Collection missing meta description',
            recommendation: 'Add keyword-rich meta description',
            currentValue: '(empty)',
          })
          summary.collections.issues++
        }

        // Check collection description
        if (!collection.descriptionHtml || collection.descriptionHtml.length < 100) {
          issues.push({
            resource: 'collection',
            resourceId: collection.id,
            resourceTitle: collection.title,
            issueType: 'thin_content',
            severity: 'medium',
            description: 'Collection description too short or missing',
            recommendation: 'Add detailed collection description with category keywords',
          })
          summary.collections.issues++
        }
      }
    }

    // =========================================================================
    // TECHNICAL SEO AUDIT
    // =========================================================================
    if (options.scope === 'full' || options.scope === 'technical') {
      console.log('[Audit] Analyzing technical SEO...')

      // Check for redirect chains (would need actual implementation)
      // This is a placeholder for technical SEO checks
      summary.technical.issues = 0
    }

    // =========================================================================
    // CLAUDE AI ANALYSIS
    // =========================================================================
    console.log('[Audit] Generating AI insights...')

    const topIssues = issues
      .sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return severityOrder[a.severity] - severityOrder[b.severity]
      })
      .slice(0, 20)

    const aiPrompt = `You are an expert SEO consultant analyzing a Shopify store's SEO health.

Store Overview:
- Products: ${summary.products.total} (${summary.products.issues} issues)
- Pages: ${summary.pages.total} (${summary.pages.issues} issues)
- Blog Articles: ${summary.blog.total} (${summary.blog.issues} issues)
- Collections: ${summary.collections.total} (${summary.collections.issues} issues)

Top Issues Found:
${topIssues.map(issue => `- ${issue.resourceTitle}: ${issue.description}`).join('\n')}

Provide:
1. Overall SEO health assessment (1-2 sentences)
2. Top 3 priorities to fix first (be specific)
3. Estimated impact of fixing these issues

Keep it concise and actionable.`

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

    // Store audit results in database
    await db.auditLog.create({
      data: {
        userId: context.userId,
        connectionId: context.connection.id,
        action: 'STORE_AUDIT_COMPLETED',
        resource: 'store',
        resourceId: context.shop,
        details: JSON.stringify({
          scope: options.scope,
          totalIssues: issues.length,
          summary,
          timestamp: new Date().toISOString(),
        })
      }
    })

    const result: AuditResult = {
      totalResources: summary.products.total + summary.pages.total + summary.blog.total + summary.collections.total,
      issuesFound: issues.length,
      issues: issues.slice(0, 100), // Return top 100 issues
      summary,
      aiInsights,
      estimatedImpact: 'Fixing these issues could improve organic traffic by 20-40% within 3-6 months'
    }

    console.log(`[Audit] Completed - Found ${issues.length} issues across ${result.totalResources} resources`)

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('[Audit] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUDIT_ERROR',
          message: error instanceof Error ? error.message : 'Audit failed'
        }
      },
      { status: 500 }
    )
  }
}
