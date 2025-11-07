/**
 * API Route: Apply SEO Fixes to Product
 * Uses Claude to generate and apply fixes to products
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fetchProducts, updateProductSEO } from '@/lib/shopify-client'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import Anthropic from '@anthropic-ai/sdk'

export const dynamic = 'force-dynamic'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    // Authenticate with session token middleware
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const { productId } = await req.json()

    if (!productId) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: 'productId required' } },
        { status: 400 }
      )
    }

    // Fetch products using authenticated context
    const products = await fetchProducts(context.userId, context.shop)
    const product = products.find((p) => p.id === productId)

    if (!product) {
      return NextResponse.json(
        { success: false, error: { code: 'PRODUCT_NOT_FOUND', message: 'Product not found' } },
        { status: 404 }
      )
    }

    // Generate optimized SEO with Claude
    const prompt = `You are an SEO expert. Generate optimized SEO content for this Shopify product.

Product Details:
- Title: ${product.title}
- Description: ${product.description || '(empty)'}
- Current SEO Title: ${product.seo.title || '(not set)'}
- Current SEO Description: ${product.seo.description || '(not set)'}

Generate optimized SEO content following these rules:
1. SEO Title: 50-60 characters, include main keyword, compelling
2. SEO Description: 120-160 characters, include call-to-action, benefits
3. Make it natural, not keyword-stuffed
4. Focus on user intent and conversion

Return ONLY valid JSON:
{
  "seoTitle": "Optimized SEO title here",
  "seoDescription": "Optimized SEO description here"
}`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    const optimizedSEO = JSON.parse(content.text)

    // Store current state for rollback
    const beforeState = {
      seoTitle: product.seo.title,
      seoDescription: product.seo.description,
    }

    // Apply fix to Shopify
    await updateProductSEO(context.userId, context.shop, product.id, {
      title: optimizedSEO.seoTitle,
      description: optimizedSEO.seoDescription,
    })

    // Get open issues for this product
    const issues = await db.issue.findMany({
      where: {
        connectionId: context.connection.id,
        pageUrl: `https://${context.shop}/products/${product.handle}`,
        status: 'DETECTED',
      },
    })

    // Create fix records for each issue
    for (const issue of issues) {
      await db.fix.create({
        data: {
          connectionId: context.connection.id,
          issueId: issue.id,
          type: 'SEO_OPTIMIZATION',
          description: `Optimized SEO title and description`,
          changes: JSON.stringify({
            action: 'UPDATE_PRODUCT_SEO',
            productId: product.id,
            updates: {
              seoTitle: optimizedSEO.seoTitle,
              seoDescription: optimizedSEO.seoDescription,
            },
          }),
          beforeState: JSON.stringify(beforeState),
          afterState: JSON.stringify({
            seoTitle: optimizedSEO.seoTitle,
            seoDescription: optimizedSEO.seoDescription,
          }),
          targetUrl: `https://${context.shop}/products/${product.handle}`,
          method: 'AUTOMATIC',
          status: 'APPLIED',
          appliedAt: new Date(),
          rollbackDeadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        },
      })

      // Mark issue as fixed
      await db.issue.update({
        where: { id: issue.id },
        data: {
          status: 'FIXED',
          fixedAt: new Date(),
        },
      })
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: context.userId,
        connectionId: context.connection.id,
        action: 'FIX_APPLIED',
        resource: 'product',
        resourceId: product.id,
        details: JSON.stringify({
          productTitle: product.title,
          fixesApplied: issues.length,
          before: beforeState,
          after: optimizedSEO,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        fixesApplied: issues.length,
        optimizedSEO,
      },
    })
  } catch (error) {
    console.error('Error applying fixes:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to apply fixes' } },
      { status: 500 }
    )
  }
}
