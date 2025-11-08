/**
 * API Route: Analyze & Fix (Combined Operation)
 *
 * POST /api/shopify/analyze-and-fix
 *
 * Runs audit + creates fixes in one operation
 * Perfect for chat interface commands like "fix my products"
 */

import { NextRequest, NextResponse } from 'next/server'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { db } from '@/lib/db'
import { createFixesFromAudit, type SEOIssue } from '@/lib/shopify-fix-engine'
import { getProducts, getPages, getBlogs, getCollections } from '@/lib/shopify-graphql'
import Anthropic from '@anthropic-ai/sdk'
import { canApplyFixes } from '@/lib/usage-enforcement'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface AnalyzeAndFixOptions {
  scope?: 'full' | 'products' | 'content' | 'technical'
  limit?: number
  autoApply?: boolean // If true and mode is AUTOMATIC, applies immediately
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const body = await req.json()
    const options: AnalyzeAndFixOptions = body.options || { scope: 'products', limit: 20 }

    console.log(`[Analyze & Fix] Starting for shop: ${context.shop}, scope: ${options.scope}`)

    // Get full connection object
    const connection = await db.connection.findUnique({
      where: { id: context.connection.id },
      include: {
        user: {
          select: {
            id: true,
            executionMode: true,
            plan: true,
          }
        }
      }
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    const issues: SEOIssue[] = []
    let totalResources = 0

    // =========================================================================
    // PRODUCTS AUDIT
    // =========================================================================
    if (options.scope === 'full' || options.scope === 'products') {
      console.log('[Analyze & Fix] Analyzing products...')
      const productsData = await getProducts(connection, options.limit || 20)
      const products = productsData.products.edges.map(e => e.node)
      totalResources += products.length

      for (const product of products) {
        // Missing SEO title
        if (!product.seo.title) {
          issues.push({
            resource: 'product',
            resourceId: product.id,
            resourceTitle: product.title,
            issueType: 'missing_seo_title',
            severity: 'high',
            description: 'Missing SEO title',
            recommendation: 'Add SEO-optimized title',
            currentValue: '(empty)',
            suggestedValue: `${product.title} - Premium Quality | Shop Now`
          })
        }

        // Missing SEO description
        if (!product.seo.description) {
          issues.push({
            resource: 'product',
            resourceId: product.id,
            resourceTitle: product.title,
            issueType: 'missing_seo_description',
            severity: 'high',
            description: 'Missing meta description',
            recommendation: 'Add compelling meta description',
            currentValue: '(empty)',
            suggestedValue: `Shop ${product.title} - High quality, fast shipping, great prices. Order now!`
          })
        }

        // Missing image alt text
        const imagesWithoutAlt = product.images.edges.filter(e => !e.node.altText)
        if (imagesWithoutAlt.length > 0) {
          issues.push({
            resource: 'product',
            resourceId: product.id,
            resourceTitle: product.title,
            issueType: 'missing_image_alt',
            severity: 'medium',
            description: `${imagesWithoutAlt.length} image(s) missing alt text`,
            recommendation: 'Add descriptive alt text to all images',
          })
        }
      }
    }

    // =========================================================================
    // CONTENT AUDIT (Pages, Blog, Collections)
    // =========================================================================
    if (options.scope === 'full' || options.scope === 'content') {
      console.log('[Analyze & Fix] Analyzing content...')

      // Pages
      const pagesData = await getPages(connection, 10)
      const pages = pagesData.pages.edges.map(e => e.node)
      totalResources += pages.length

      for (const page of pages) {
        if (!page.seo.title) {
          issues.push({
            resource: 'page',
            resourceId: page.id,
            resourceTitle: page.title,
            issueType: 'missing_seo_title',
            severity: 'high',
            description: 'Page missing SEO title',
            recommendation: 'Add SEO title',
            currentValue: '(empty)',
            suggestedValue: `${page.title} | Your Store`
          })
        }

        if (!page.seo.description) {
          issues.push({
            resource: 'page',
            resourceId: page.id,
            resourceTitle: page.title,
            issueType: 'missing_seo_description',
            severity: 'high',
            description: 'Page missing meta description',
            recommendation: 'Add meta description',
            currentValue: '(empty)',
          })
        }
      }

      // Collections
      const collectionsData = await getCollections(connection, 10)
      const collections = collectionsData.collections.edges.map(e => e.node)
      totalResources += collections.length

      for (const collection of collections) {
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
            suggestedValue: `Shop ${collection.title} | Best Selection`
          })
        }
      }
    }

    console.log(`[Analyze & Fix] Found ${issues.length} issues across ${totalResources} resources`)

    // =========================================================================
    // CREATE FIXES
    // =========================================================================
    if (issues.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          totalResources,
          issuesFound: 0,
          fixesCreated: 0,
          message: 'Great! No SEO issues found. Your store is optimized.',
        }
      })
    }

    const executionMode = connection.user.executionMode || 'PLAN'

    // Check usage limits before creating fixes
    if (executionMode === 'AUTOMATIC') {
      const usageCheck = await canApplyFixes(context.userId, issues.length)
      if (!usageCheck.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'USAGE_LIMIT_EXCEEDED',
              message: `Found ${issues.length} issues but you've reached your monthly limit. ${usageCheck.error}`,
              details: {
                issuesFound: issues.length,
                used: usageCheck.current,
                limit: usageCheck.limit,
                remaining: usageCheck.remaining,
              }
            }
          },
          { status: 403 }
        )
      }
    }

    // Create fixes
    const fixResult = await createFixesFromAudit(
      connection.id,
      context.userId,
      issues,
      executionMode
    )

    // =========================================================================
    // CLAUDE AI SUMMARY
    // =========================================================================
    const aiPrompt = `You are SEOLOGY's SEO assistant. Summarize this audit in 2-3 sentences for the user.

Issues Found: ${issues.length}
Scope: ${options.scope}
Execution Mode: ${executionMode}

Top Issues:
${issues.slice(0, 5).map(i => `- ${i.resourceTitle}: ${i.description}`).join('\n')}

Provide:
1. Brief summary of what was found
2. What will happen next based on execution mode
3. Encouraging message

Keep it friendly and concise.`

    const aiResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: aiPrompt
      }]
    })

    const aiContent = aiResponse.content[0]
    const aiSummary = aiContent.type === 'text' ? aiContent.text : 'Analysis complete!'

    // =========================================================================
    // RETURN RESULTS
    // =========================================================================
    return NextResponse.json({
      success: true,
      data: {
        totalResources,
        issuesFound: issues.length,
        fixesCreated: fixResult.fixIds.length,
        executionMode,
        planId: fixResult.planId,
        fixIds: fixResult.fixIds,
        summary: aiSummary,
        nextSteps: executionMode === 'AUTOMATIC'
          ? 'Fixes are being applied automatically.'
          : executionMode === 'PLAN'
          ? 'Review and approve your fix plan to apply all changes at once.'
          : 'Review and approve each fix individually.',
      }
    })

  } catch (error) {
    console.error('[Analyze & Fix] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'ANALYZE_FIX_ERROR',
          message: error instanceof Error ? error.message : 'Failed to analyze and create fixes'
        }
      },
      { status: 500 }
    )
  }
}
