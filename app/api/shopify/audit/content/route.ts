/**
 * API Route: Content-Only SEO Audit
 *
 * Focused audit for content resources:
 * - Pages (SEO meta, content quality)
 * - Blog Articles (SEO meta, content quality, featured images)
 * - Collections (descriptions, SEO meta)
 *
 * Optimized for editorial and content marketing analysis
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import {
  getPages,
  getBlogs,
  getCollections
} from '@/lib/shopify-graphql'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'
export const maxDuration = 40 // 40 seconds for content audit

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ContentAuditOptions {
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

interface ContentAuditResult {
  totalResources: number
  issuesFound: number
  issues: SEOIssue[]
  breakdown: {
    pages: { total: number; issues: number }
    blog: { total: number; issues: number }
    collections: { total: number; issues: number }
  }
  issueTypes: {
    missingTitles: number
    missingDescriptions: number
    thinContent: number
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
    const options: ContentAuditOptions = body.options || { limit: 50 }

    console.log(`[Content Audit] Starting for shop: ${context.shop}, limit: ${options.limit}`)

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
      pages: { total: 0, issues: 0 },
      blog: { total: 0, issues: 0 },
      collections: { total: 0, issues: 0 },
    }
    const issueTypes = {
      missingTitles: 0,
      missingDescriptions: 0,
      thinContent: 0,
    }

    // =========================================================================
    // PAGES AUDIT
    // =========================================================================
    console.log('[Content Audit] Analyzing pages...')
    const pagesData = await getPages(connection, options.limit || 20)
    const pages = pagesData.pages.edges.map(e => e.node)
    breakdown.pages.total = pages.length

    for (const page of pages) {
      // Check SEO title
      if (!page.seo.title) {
        issues.push({
          resource: 'page',
          resourceId: page.id,
          resourceTitle: page.title,
          issueType: 'missing_seo_title',
          severity: 'high',
          description: 'Page missing SEO title',
          recommendation: 'Add SEO-optimized title (50-60 characters) targeting primary keyword',
          currentValue: '(empty)',
          suggestedValue: `${page.title} | [Brand Name]`
        })
        breakdown.pages.issues++
        issueTypes.missingTitles++
      }

      // Check SEO description
      if (!page.seo.description) {
        issues.push({
          resource: 'page',
          resourceId: page.id,
          resourceTitle: page.title,
          issueType: 'missing_seo_description',
          severity: 'high',
          description: 'Page missing meta description',
          recommendation: 'Add compelling meta description (120-160 characters) with benefits and call-to-action',
          currentValue: '(empty)',
        })
        breakdown.pages.issues++
        issueTypes.missingDescriptions++
      }

      // Check content length
      if (page.bodySummary && page.bodySummary.length < 200) {
        issues.push({
          resource: 'page',
          resourceId: page.id,
          resourceTitle: page.title,
          issueType: 'thin_content',
          severity: 'medium',
          description: `Page content too short (${page.bodySummary.length} chars, recommended 500+)`,
          recommendation: 'Expand page content to 500+ words with relevant keywords, headings, and value-adding information',
        })
        breakdown.pages.issues++
        issueTypes.thinContent++
      }
    }

    // =========================================================================
    // BLOG ARTICLES AUDIT
    // =========================================================================
    console.log('[Content Audit] Analyzing blog articles...')
    const blogsData = await getBlogs(connection, 10)
    const articles = blogsData.blogs.edges.flatMap(b =>
      b.node.articles.edges.map(a => a.node)
    )
    breakdown.blog.total = articles.length

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
          recommendation: 'Add SEO-optimized title with primary keyword and compelling hook',
          currentValue: '(empty)',
          suggestedValue: `${article.title} | [Blog Name]`
        })
        breakdown.blog.issues++
        issueTypes.missingTitles++
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
          recommendation: 'Add compelling meta description (120-160 characters) to improve click-through rate from search results',
          currentValue: '(empty)',
        })
        breakdown.blog.issues++
        issueTypes.missingDescriptions++
      }

      // Note: Excerpt/content analysis would require fetching individual articles
      // For performance, we only check SEO meta in the content audit
    }

    // =========================================================================
    // COLLECTIONS AUDIT
    // =========================================================================
    console.log('[Content Audit] Analyzing collections...')
    const collectionsData = await getCollections(connection, options.limit || 30)
    const collections = collectionsData.collections.edges.map(e => e.node)
    breakdown.collections.total = collections.length

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
          recommendation: 'Add category-focused SEO title with primary keyword',
          currentValue: '(empty)',
          suggestedValue: `${collection.title} | Shop [Category] at [Brand]`
        })
        breakdown.collections.issues++
        issueTypes.missingTitles++
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
          recommendation: 'Add keyword-rich meta description highlighting category benefits',
          currentValue: '(empty)',
        })
        breakdown.collections.issues++
        issueTypes.missingDescriptions++
      }

      // Check collection description
      if (!collection.descriptionHtml || collection.descriptionHtml.length < 100) {
        issues.push({
          resource: 'collection',
          resourceId: collection.id,
          resourceTitle: collection.title,
          issueType: 'thin_content',
          severity: 'medium',
          description: collection.descriptionHtml
            ? `Collection description too short (${collection.descriptionHtml.length} chars)`
            : 'Collection missing description',
          recommendation: 'Add detailed collection description (200+ words) with category keywords, benefits, and unique value',
        })
        breakdown.collections.issues++
        issueTypes.thinContent++
      }
    }

    // =========================================================================
    // CLAUDE AI ANALYSIS
    // =========================================================================
    console.log('[Content Audit] Generating AI insights...')

    const topIssues = issues
      .sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return severityOrder[a.severity] - severityOrder[b.severity]
      })
      .slice(0, 15)

    const aiPrompt = `You are an expert content marketing and SEO consultant analyzing a Shopify store's content strategy.

Content Overview:
- Pages: ${breakdown.pages.total} (${breakdown.pages.issues} issues)
- Blog Articles: ${breakdown.blog.total} (${breakdown.blog.issues} issues)
- Collections: ${breakdown.collections.total} (${breakdown.collections.issues} issues)

Issue Breakdown:
- Missing SEO Titles: ${issueTypes.missingTitles}
- Missing Meta Descriptions: ${issueTypes.missingDescriptions}
- Thin Content: ${issueTypes.thinContent}

Sample Issues:
${topIssues.slice(0, 10).map(issue => `- ${issue.resourceTitle} (${issue.resource}): ${issue.description}`).join('\n')}

Provide:
1. Overall content SEO health assessment (1-2 sentences)
2. Top 3 content optimization priorities (be specific)
3. Expected impact on organic traffic and engagement

Keep it concise, actionable, and focused on content marketing results.`

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
        action: 'CONTENT_AUDIT_COMPLETED',
        resource: 'content',
        resourceId: context.shop,
        details: JSON.stringify({
          totalResources: breakdown.pages.total + breakdown.blog.total + breakdown.collections.total,
          totalIssues: issues.length,
          breakdown,
          issueTypes,
          timestamp: new Date().toISOString(),
        })
      }
    })

    const totalResources = breakdown.pages.total + breakdown.blog.total + breakdown.collections.total

    const result: ContentAuditResult = {
      totalResources,
      issuesFound: issues.length,
      issues: issues.slice(0, 100), // Return top 100 issues
      breakdown,
      issueTypes,
      aiInsights,
      estimatedImpact: 'Optimizing content SEO can increase organic traffic by 25-45% and improve user engagement by 20-30%'
    }

    console.log(`[Content Audit] Completed - Found ${issues.length} issues across ${totalResources} content resources`)

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('[Content Audit] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CONTENT_AUDIT_ERROR',
          message: error instanceof Error ? error.message : 'Content audit failed'
        }
      },
      { status: 500 }
    )
  }
}
