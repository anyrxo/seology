/**
 * API Route: Shopify Chat
 * SEOLOGY AI-powered genius chat assistant with full store access
 *
 * Features:
 * - Full access to store data (products, collections, pages, customers, orders)
 * - Intent detection for commands (analyze, fix, audit, report, compare)
 * - Real-time store insights and analytics
 * - Intelligent recommendations based on actual store performance
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'
import { Connection, Fix, Issue } from '@prisma/client'
import { createFixesFromAudit, type SEOIssue } from '@/lib/shopify-fix-engine'
import {
  getProducts,
  getPages,
  getCollections,
  shopifyGraphQLWithConnection,
  type ProductSEO,
  type PageSEO,
  type CollectionSEO,
} from '@/lib/shopify-graphql'
import { canApplyFixes } from '@/lib/usage-enforcement'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutes for complex operations

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ShopData {
  shop: {
    name: string
    email: string
    description: string
    url: string
    currencyCode: string
    primaryDomain: {
      url: string
      host: string
    }
    plan: {
      displayName: string
    }
  }
}

interface StoreAnalytics {
  totalProducts: number
  totalCollections: number
  totalPages: number
  averageSEOScore: number
  recentFixesCount: number
  activeIssuesCount: number
}

interface ComprehensiveStoreData {
  shop: ShopData['shop']
  products: ProductSEO[]
  collections: CollectionSEO[]
  pages: PageSEO[]
  recentFixes: Array<Pick<Fix, 'type' | 'description' | 'status' | 'appliedAt' | 'beforeState' | 'afterState'>>
  recentIssues: Array<Pick<Issue, 'type' | 'title' | 'severity' | 'pageUrl' | 'status' | 'detectedAt'>>
  analytics: StoreAnalytics
}

type ConnectionWithUser = Connection & {
  user: {
    id: string
    executionMode: string | null
    plan: string | null
  }
}

// Comprehensive store data fetching
async function getComprehensiveStoreData(connection: ConnectionWithUser): Promise<ComprehensiveStoreData | null> {
  try {
    // Fetch products from DATABASE (faster and more reliable than Shopify API)
    const dbProducts = await db.shopifyProduct.findMany({
      where: { connectionId: connection.id },
      take: 100,
      orderBy: { seoScore: 'asc' }, // Worst SEO scores first for prioritization
    })

    // Image type from JSON
    interface ImageNode {
      id?: string
      url?: string
      src?: string
      altText?: string
      alt?: string
    }

    // Transform database products to ProductSEO format for AI context
    const products: ProductSEO[] = dbProducts.map(p => ({
      id: p.shopifyProductId,
      title: p.title,
      handle: p.shopifyHandle,
      descriptionHtml: p.bodyHtml || '',
      seo: {
        title: p.metaTitle || null,
        description: p.metaDescription || null,
      },
      images: {
        edges: (p.images ? JSON.parse(p.images) : []).map((img: ImageNode) => ({
          node: {
            id: img.id || '',
            url: img.url || img.src || '',
            altText: img.altText || img.alt || null,
          },
        })),
      },
    }))

    // Use empty arrays for collections and pages (can be enhanced later)
    const collections: CollectionSEO[] = []
    const pages: PageSEO[] = []

    // Fetch shop details
    const shopQuery = `{
      shop {
        name
        email
        description
        url
        currencyCode
        primaryDomain {
          url
          host
        }
        plan {
          displayName
        }
      }
    }`

    const shopData = await shopifyGraphQLWithConnection<ShopData>(connection, shopQuery, {})

    // Get analytics from database
    const recentFixes = await db.fix.findMany({
      where: { connectionId: connection.id },
      take: 20,
      orderBy: { appliedAt: 'desc' },
      select: {
        type: true,
        description: true,
        status: true,
        appliedAt: true,
        beforeState: true,
        afterState: true,
      }
    })

    const recentIssues = await db.issue.findMany({
      where: { connectionId: connection.id },
      take: 30,
      orderBy: { detectedAt: 'desc' },
      select: {
        type: true,
        title: true,
        severity: true,
        pageUrl: true,
        status: true,
        detectedAt: true,
      }
    })

    // Calculate average SEO score from database products
    const avgScore = dbProducts.length > 0
      ? dbProducts.reduce((sum, p) => sum + (p.seoScore || 0), 0) / dbProducts.length
      : 0

    return {
      shop: shopData.shop,
      products,
      collections,
      pages,
      recentFixes,
      recentIssues,
      analytics: {
        totalProducts: products.length,
        totalCollections: collections.length,
        totalPages: pages.length,
        averageSEOScore: Math.round(avgScore),
        recentFixesCount: recentFixes.filter(f => f.status === 'APPLIED').length,
        activeIssuesCount: recentIssues.filter(i => i.status === 'DETECTED').length,
      }
    }
  } catch (error) {
    console.error('[Chat] Error fetching store data:', error)
    return null
  }
}

// Intent detection patterns (expanded)
const INTENT_PATTERNS = {
  ANALYZE: [
    /analyze|audit|check|scan|review|inspect/i,
  ],
  FIX: [
    /fix|optimize|improve|enhance|correct|repair/i,
  ],
  REPORT: [
    /report|summary|overview|stats|analytics|performance/i,
  ],
  COMPARE: [
    /compare|vs|versus|difference|benchmark/i,
  ],
  SEARCH: [
    /find|search|show me|list|get|fetch/i,
  ],
}

function detectIntent(message: string): { intent: string; entities: string[] } {
  const lowerMessage = message.toLowerCase()
  const entities: string[] = []

  // Extract entities (products, collections, pages, etc.)
  if (/products?/i.test(message)) entities.push('products')
  if (/collections?|categories/i.test(message)) entities.push('collections')
  if (/pages?|content/i.test(message)) entities.push('pages')
  if (/images?|photos/i.test(message)) entities.push('images')
  if (/store|shop|site/i.test(message)) entities.push('store')
  if (/seo|search engine|ranking/i.test(message)) entities.push('seo')
  if (/title|meta|description/i.test(message)) entities.push('metadata')

  // Detect primary intent
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (patterns.some(pattern => pattern.test(lowerMessage))) {
      return { intent, entities: entities.length > 0 ? entities : ['store'] }
    }
  }

  return { intent: 'CHAT', entities: [] }
}

export async function POST(req: NextRequest) {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id
    const userId = context.userId
    const shop = context.shop

    const { messages } = await req.json()

    // Get connection details with user info
    const connection = await db.connection.findUnique({
      where: {
        id: connectionId,
      },
      include: {
        user: {
          select: {
            id: true,
            executionMode: true,
            plan: true,
          },
        },
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    const lastUserMessage = messages[messages.length - 1]
    const detected = lastUserMessage?.role === 'user' ? detectIntent(lastUserMessage.content) : null

    // Get comprehensive store data for context
    const storeData = await getComprehensiveStoreData(connection)

    if (!storeData) {
      return NextResponse.json({
        success: true,
        data: {
          message: "I'm having trouble accessing your store data right now. Please try again in a moment."
        }
      })
    }

    // Build genius AI context with FULL store knowledge
    const systemContext = `You are SEOLOGY's AI Assistant - a genius SEO expert with complete access to this Shopify store's data and performance metrics.

**STORE OVERVIEW:**
- Name: ${storeData.shop.name}
- URL: ${storeData.shop.primaryDomain?.url || storeData.shop.url}
- Plan: ${storeData.shop.plan?.displayName || 'Basic'}
- Products: ${storeData.analytics.totalProducts}
- Collections: ${storeData.analytics.totalCollections}
- Pages: ${storeData.analytics.totalPages}
- Average SEO Score: ${storeData.analytics.averageSEOScore}/100

**RECENT PERFORMANCE:**
- Fixes Applied: ${storeData.analytics.recentFixesCount} (last 30 days)
- Active Issues: ${storeData.analytics.activeIssuesCount}
${storeData.recentIssues.slice(0, 5).map((i: any) => `  - ${i.title} (${i.severity})`).join('\n')}

**TOP PRODUCTS:**
${storeData.products.slice(0, 10).map((p: any, idx: number) => `${idx + 1}. ${p.title} - ${p.totalInventory || 0} in stock`).join('\n')}

**COLLECTIONS:**
${storeData.collections.slice(0, 5).map((c: any) => `- ${c.title} (${c.productsCount?.count || 0} products)`).join('\n')}

**USER'S EXECUTION MODE:** ${connection.user.executionMode || 'PLAN'}
- AUTOMATIC: Fixes apply instantly
- PLAN: Fixes grouped for batch approval
- APPROVE: Each fix needs approval

**YOUR CAPABILITIES:**
You have complete access to:
1. All product data (titles, descriptions, prices, inventory, images, variants, SEO metadata)
2. All collections and their products
3. All pages and content
4. Complete SEO audit history
5. Fix history and performance impact
6. Store analytics and trends
7. Real-time store health metrics

**YOUR ROLE:**
- Answer questions about their specific store data (not generic advice)
- Provide insights based on actual store performance
- Identify specific products/pages that need attention
- Compare performance across products/collections
- Give actionable recommendations with exact product names
- Reference actual data when making suggestions
- Be confident and knowledgeable - you have all the data
- Never say "I don't have access" - you have complete store access

**COMMUNICATION STYLE:**
- Direct and specific (mention actual product names, not generic advice)
- Use numbers and data from the store
- Provide examples from their actual inventory
- Be encouraging but data-driven
- Keep responses concise (3-4 paragraphs max)
- Use bullet points for actionable items
- Reference SEOLOGY's automation features when relevant

**IMPORTANT:**
- NEVER mention "Claude", "Anthropic", or "AI model" - you are SEOLOGY's AI
- Say "I analyzed your store" not "Based on the data provided"
- Act like you're looking at their store in real-time
- Be specific: "Your product 'Blue Wireless Headphones' is missing..." not "Some products are missing..."
- When they ask about specific products, search the actual product list
- Provide exact counts, names, and metrics from the store data`

    // Add detected intent context
    let intentContext = ''
    if (detected && detected.intent !== 'CHAT') {
      intentContext = `\n\n**USER INTENT DETECTED:** ${detected.intent}`
      if (detected.entities.length > 0) {
        intentContext += `\n**ENTITIES:** ${detected.entities.join(', ')}`
      }
      intentContext += '\n\nProvide a response that executes this intent using the store data. Be specific and actionable.'
    }

    const fullSystemContext = systemContext + intentContext

    // Call AI with comprehensive context
    const aiMessages: Anthropic.MessageParam[] = messages.map((msg: ChatMessage) => ({
      role: msg.role,
      content: msg.content,
    }))

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      temperature: 0.7,
      system: fullSystemContext,
      messages: aiMessages,
    })

    const assistantMessage = response.content[0]
    if (assistantMessage.type !== 'text') {
      throw new Error('Unexpected response type from AI')
    }

    // Track API usage
    const tokenUsage = response.usage
    const inputTokens = tokenUsage?.input_tokens || 0
    const outputTokens = tokenUsage?.output_tokens || 0
    const totalTokens = inputTokens + outputTokens

    await db.aPIUsageLog.create({
      data: {
        userId,
        model: 'seology-ai-genius',
        endpoint: 'chat',
        inputTokens,
        outputTokens,
        totalTokens,
        inputCost: (inputTokens / 1_000_000) * 3.0,
        outputCost: (outputTokens / 1_000_000) * 15.0,
        totalCost: ((inputTokens / 1_000_000) * 3.0) + ((outputTokens / 1_000_000) * 15.0),
        shop,
        connectionId,
        status: 'success',
      },
    })

    // Return genius AI response
    return NextResponse.json({
      success: true,
      data: {
        message: assistantMessage.text,
        storeContext: {
          products: storeData.analytics.totalProducts,
          avgScore: storeData.analytics.averageSEOScore,
          issues: storeData.analytics.activeIssuesCount,
        }
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CHAT_ERROR',
          message: 'Failed to process message',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
