/**
 * API Route: Analyze Product with Claude AI
 * Uses Claude to analyze product and generate SEO recommendations
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fetchProducts } from '@/lib/shopify-client'
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

    // Analyze with Claude AI
    const prompt = `You are an SEO expert analyzing a Shopify product. Analyze the following product and identify ALL SEO issues.

Product Details:
- Title: ${product.title}
- Handle (URL): ${product.handle}
- Description: ${product.description || '(empty)'}
- SEO Title: ${product.seo.title || '(not set)'}
- SEO Description: ${product.seo.description || '(not set)'}
- Featured Image Alt Text: ${product.featuredImage?.altText || '(not set)'}

Analyze and return a JSON object with this structure:
{
  "issues": [
    {
      "type": "MISSING_SEO_TITLE" | "MISSING_SEO_DESCRIPTION" | "MISSING_ALT_TEXT" | "SHORT_DESCRIPTION" | "POOR_TITLE" | "POOR_DESCRIPTION" | "LONG_HANDLE",
      "severity": "critical" | "warning" | "info",
      "title": "Brief issue title",
      "description": "Detailed explanation of the issue",
      "recommendation": "Specific recommendation to fix it"
    }
  ],
  "suggestedSeoTitle": "Optimized SEO title (50-60 chars)",
  "suggestedSeoDescription": "Optimized SEO description (120-160 chars)",
  "suggestedAltText": "Optimized alt text for image"
}

Focus on:
1. SEO title optimization (50-60 characters, include keywords)
2. Meta description optimization (120-160 characters, compelling)
3. Image alt text (descriptive, keyword-rich)
4. URL handle (short, keyword-rich)
5. Product description quality

Return ONLY valid JSON, no additional text.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
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

    const analysis = JSON.parse(content.text)

    // Store issues in database
    for (const issue of analysis.issues) {
      await db.issue.create({
        data: {
          connectionId: context.connection.id,
          type: issue.type,
          severity: issue.severity.toUpperCase(),
          title: issue.title,
          details: JSON.stringify({
            description: issue.description,
            productId: product.id,
            productTitle: product.title,
          }),
          recommendation: issue.recommendation,
          pageUrl: `https://${context.shop}/products/${product.handle}`,
          status: 'DETECTED',
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        issuesFound: analysis.issues.length,
        analysis,
      },
    })
  } catch (error) {
    console.error('Error analyzing product:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to analyze product' } },
      { status: 500 }
    )
  }
}
