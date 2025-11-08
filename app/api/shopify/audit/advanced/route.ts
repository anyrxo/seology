/**
 * Advanced SEO Audit API with AI Intelligence
 * Uses Claude to provide world-class SEO analysis and recommendations
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { shopifyGraphQLWithConnection } from '@/lib/shopify-graphql'
import {
  analyzeProductWithAdvancedSEO,
  performKeywordResearch,
  prioritizeFixes,
  calculateSEOHealthScore,
  generateProductSchema,
  type SEOAnalysisContext,
  type SEORecommendation,
  type PrioritizedFix,
  type KeywordResearch,
} from '@/lib/seo-intelligence'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutes for comprehensive analysis

// Shopify Product Types
interface ShopifyImage {
  node: {
    url: string
    altText: string | null
  }
}

interface ShopifyVariant {
  node: {
    title: string
    price: string
    compareAtPrice: string | null
  }
}

interface ShopifyProduct {
  id: string
  title: string
  description: string
  descriptionHtml: string
  productType: string | null
  vendor: string | null
  tags: string[]
  seo: {
    title: string | null
    description: string | null
  } | null
  images: {
    edges: ShopifyImage[]
  } | null
  variants: {
    edges: ShopifyVariant[]
  } | null
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct
    }>
  }
}

interface AuditRequest {
  shop: string
  productIds?: string[] // Optional: specific products, or all if not provided
  includeKeywordResearch?: boolean
  includeCompetitorAnalysis?: boolean
  includeSchemaSuggestions?: boolean
}

interface ProductAnalysis {
  productId: string
  title: string
  currentScore: number
  potentialScore: number
  recommendations: SEORecommendation[]
  prioritizedFixes: PrioritizedFix[]
  keywordResearch?: KeywordResearch
  schemaMarkup?: object
}

interface AuditResponse {
  success: boolean
  data?: {
    overallHealth: {
      score: number
      grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
      technicalSEO: number
      onPageSEO: number
      contentQuality: number
      userExperience: number
    }
    products: ProductAnalysis[]
    summary: {
      totalProducts: number
      productsAnalyzed: number
      criticalIssues: number
      highPriorityIssues: number
      estimatedTrafficIncrease: number
      estimatedRevenueIncrease: number
      topOpportunities: Array<{
        product: string
        opportunity: string
        estimatedImpact: number
      }>
    }
  }
  error?: {
    code: string
    message: string
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<AuditResponse>> {
  try {
    const {
      shop,
      productIds,
      includeKeywordResearch = false,
      includeCompetitorAnalysis = false,
      includeSchemaSuggestions = true,
    }: AuditRequest = await req.json()

    if (!shop) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_SHOP',
            message: 'Shop parameter required',
          },
        },
        { status: 400 }
      )
    }

    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!connection) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NO_CONNECTION',
            message: 'Shop not connected',
          },
        },
        { status: 404 }
      )
    }

    // Fetch products from Shopify using GraphQL
    const productsQuery = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              descriptionHtml
              productType
              vendor
              tags
              seo {
                title
                description
              }
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    title
                    price
                    compareAtPrice
                  }
                }
              }
            }
          }
        }
      }
    `

    const productsResponse = await shopifyGraphQLWithConnection<ProductsResponse>(
      connection,
      productsQuery,
      { first: 50 }
    )

    const shopifyProducts = productsResponse.products.edges.map((edge: { node: ShopifyProduct }) => edge.node)

    // Filter to specific products if requested
    const productsToAnalyze = productIds
      ? shopifyProducts.filter((p: ShopifyProduct) => productIds.includes(p.id))
      : shopifyProducts.slice(0, 50) // Limit to 50 products for performance

    // Analyze each product with advanced AI
    const productAnalyses: ProductAnalysis[] = await Promise.all(
      productsToAnalyze.map(async (product: ShopifyProduct) => {
        // Convert to analysis context
        const context: SEOAnalysisContext = {
          productTitle: product.title,
          productDescription: product.descriptionHtml || product.description || '',
          productType: product.productType || 'General',
          vendor: product.vendor || 'Unknown',
          tags: product.tags || [],
          currentSeoTitle: product.seo?.title || undefined,
          currentSeoDescription: product.seo?.description || undefined,
          images: (product.images?.edges || []).map((edge: ShopifyImage) => ({
            url: edge.node.url,
            altText: edge.node.altText || undefined,
          })),
          price: parseFloat(product.variants?.edges?.[0]?.node?.price || '0'),
          compareAtPrice: product.variants?.edges?.[0]?.node?.compareAtPrice
            ? parseFloat(product.variants.edges[0].node.compareAtPrice)
            : undefined,
          variants: (product.variants?.edges || []).map((edge: ShopifyVariant) => ({
            title: edge.node.title,
            price: parseFloat(edge.node.price),
          })),
          collections: [], // Would be populated from product collections
        }

        // Get AI recommendations
        const recommendations = await analyzeProductWithAdvancedSEO(context)

        // Prioritize fixes by ROI
        const prioritizedFixes = prioritizeFixes(recommendations, context.price, 1000) // Assume 1000 monthly visitors baseline

        // Calculate current and potential scores
        const currentScore = calculateProductScore(context)
        const potentialScore = Math.min(100, currentScore + recommendations.reduce((sum: number, rec: SEORecommendation) => sum + rec.expectedImpact.trafficIncrease / 10, 0))

        // Optional: Keyword research
        let keywordResearch: KeywordResearch | undefined
        if (includeKeywordResearch) {
          keywordResearch = await performKeywordResearch(product.title, product.productType || 'Product', 'US')
        }

        // Optional: Schema markup
        let schemaMarkup: object | undefined
        if (includeSchemaSuggestions) {
          schemaMarkup = generateProductSchema(context)
        }

        return {
          productId: product.id,
          title: product.title,
          currentScore,
          potentialScore,
          recommendations,
          prioritizedFixes,
          keywordResearch,
          schemaMarkup,
        }
      })
    )

    // Calculate overall health metrics
    const allContexts: SEOAnalysisContext[] = productsToAnalyze.map((p: ShopifyProduct) => ({
      productTitle: p.title,
      productDescription: p.descriptionHtml || p.description || '',
      productType: p.productType || 'General',
      vendor: p.vendor || 'Unknown',
      tags: p.tags || [],
      currentSeoTitle: p.seo?.title || undefined,
      currentSeoDescription: p.seo?.description || undefined,
      images: (p.images?.edges || []).map((edge: ShopifyImage) => ({
        url: edge.node.url,
        altText: edge.node.altText || undefined,
      })),
      price: parseFloat(p.variants?.edges?.[0]?.node?.price || '0'),
      variants: (p.variants?.edges || []).map((edge: ShopifyVariant) => ({
        title: edge.node.title,
        price: parseFloat(edge.node.price),
      })),
      collections: [],
    }))

    const healthMetrics = await calculateSEOHealthScore(allContexts)

    // Determine grade
    const grade =
      healthMetrics.overallScore >= 95
        ? 'A+'
        : healthMetrics.overallScore >= 90
        ? 'A'
        : healthMetrics.overallScore >= 80
        ? 'B'
        : healthMetrics.overallScore >= 70
        ? 'C'
        : healthMetrics.overallScore >= 60
        ? 'D'
        : 'F'

    // Calculate summary statistics
    const allRecommendations = productAnalyses.flatMap((p: ProductAnalysis) => p.recommendations)
    const criticalIssues = allRecommendations.filter((r: SEORecommendation) => r.priority === 'critical').length
    const highPriorityIssues = allRecommendations.filter((r: SEORecommendation) => r.priority === 'high').length
    const estimatedTrafficIncrease = Math.round(
      allRecommendations.reduce((sum: number, rec: SEORecommendation) => sum + rec.expectedImpact.trafficIncrease, 0)
    )
    const estimatedRevenueIncrease = Math.round(
      productAnalyses.reduce((sum: number, p: ProductAnalysis) => {
        return sum + p.prioritizedFixes.reduce((fixSum: number, fix: PrioritizedFix) => fixSum + fix.estimatedImpact.revenueIncrease, 0)
      }, 0)
    )

    // Top opportunities
    const topOpportunities = productAnalyses
      .flatMap((p: ProductAnalysis) =>
        p.prioritizedFixes.slice(0, 3).map((fix: PrioritizedFix) => ({
          product: p.title,
          opportunity: fix.description,
          estimatedImpact: fix.estimatedImpact.revenueIncrease,
        }))
      )
      .sort((a: { estimatedImpact: number }, b: { estimatedImpact: number }) => b.estimatedImpact - a.estimatedImpact)
      .slice(0, 10)

    return NextResponse.json({
      success: true,
      data: {
        overallHealth: {
          score: healthMetrics.overallScore,
          grade,
          technicalSEO: healthMetrics.technicalSEO,
          onPageSEO: healthMetrics.onPageSEO,
          contentQuality: healthMetrics.contentQuality,
          userExperience: healthMetrics.userExperience,
        },
        products: productAnalyses,
        summary: {
          totalProducts: shopifyProducts.length,
          productsAnalyzed: productsToAnalyze.length,
          criticalIssues,
          highPriorityIssues,
          estimatedTrafficIncrease,
          estimatedRevenueIncrease,
          topOpportunities,
        },
      },
    })
  } catch (error) {
    console.error('Advanced audit error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to complete advanced audit',
        },
      },
      { status: 500 }
    )
  }
}

// Helper function to calculate product SEO score
function calculateProductScore(context: SEOAnalysisContext): number {
  let score = 100

  // SEO title check (20 points)
  if (!context.currentSeoTitle) {
    score -= 20
  } else if (context.currentSeoTitle.length > 60) {
    score -= 5
  } else if (context.currentSeoTitle.length < 30) {
    score -= 5
  }

  // SEO description check (15 points)
  if (!context.currentSeoDescription) {
    score -= 15
  } else if (context.currentSeoDescription.length > 160) {
    score -= 3
  } else if (context.currentSeoDescription.length < 120) {
    score -= 3
  }

  // Image alt text (15 points)
  const missingAlt = context.images.filter(img => !img.altText).length
  const altPenalty = Math.min(15, missingAlt * 3)
  score -= altPenalty

  // Content quality (20 points)
  const descriptionLength = context.productDescription.length
  if (descriptionLength < 100) {
    score -= 20
  } else if (descriptionLength < 200) {
    score -= 10
  } else if (descriptionLength < 300) {
    score -= 5
  }

  // Product title quality (10 points)
  const titleLength = context.productTitle.length
  if (titleLength < 20) {
    score -= 10
  } else if (titleLength > 100) {
    score -= 5
  }

  // Tags (10 points)
  if (context.tags.length === 0) {
    score -= 10
  } else if (context.tags.length < 3) {
    score -= 5
  }

  // Pricing (10 points) - having a compare-at price is good for conversions
  if (context.compareAtPrice && context.compareAtPrice > context.price) {
    score += 5 // Bonus for sales/discounts
  }

  return Math.max(0, Math.min(100, score))
}
