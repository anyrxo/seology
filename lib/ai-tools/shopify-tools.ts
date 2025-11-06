/**
 * Shopify-Specific AI Tools
 *
 * AI function tools for analyzing and fixing Shopify stores
 * Integrates with Claude AI chat system
 */

import { db } from '@/lib/db'
import { createShopifyClient, getPrioritizedProducts } from '@/lib/shopify-api-client'
import type { PrioritizedProduct } from '@/lib/shopify-api-client'

// ==================== TOOL DEFINITIONS ====================

export const shopifyTools = [
  {
    name: 'analyze_shopify_products',
    description:
      'Analyzes all products in the connected Shopify store and identifies SEO issues. Returns a prioritized list of products based on revenue impact and SEO quality. Use this when the user wants to understand which products need SEO optimization.',
    input_schema: {
      type: 'object' as const,
      properties: {
        limit: {
          type: 'number' as const,
          description:
            'Maximum number of products to analyze (default 50, max 250)',
          default: 50,
        },
      },
    },
  },
  {
    name: 'get_product_details',
    description:
      'Fetches detailed information about a specific Shopify product including title, description, images, variants, and current SEO metadata. Use this when you need to examine a specific product before making fixes.',
    input_schema: {
      type: 'object' as const,
      properties: {
        productId: {
          type: 'string' as const,
          description: 'The Shopify product ID',
        },
      },
      required: ['productId'],
    },
  },
  {
    name: 'fix_product_seo',
    description:
      'Applies SEO fixes to a Shopify product. Can update title, description, meta tags, and image alt text. Use this after analyzing a product and determining what fixes are needed.',
    input_schema: {
      type: 'object' as const,
      properties: {
        productId: {
          type: 'string' as const,
          description: 'The Shopify product ID to fix',
        },
        fixes: {
          type: 'object' as const,
          description: 'The SEO fixes to apply',
          properties: {
            title: {
              type: 'string' as const,
              description: 'New optimized product title (if needed)',
            },
            description: {
              type: 'string' as const,
              description: 'New optimized product description HTML (if needed)',
            },
            metaTitle: {
              type: 'string' as const,
              description: 'SEO meta title (if different from product title)',
            },
            metaDescription: {
              type: 'string' as const,
              description: 'SEO meta description for search results',
            },
          },
        },
      },
      required: ['productId', 'fixes'],
    },
  },
  {
    name: 'analyze_shopify_collections',
    description:
      'Analyzes all collections in the Shopify store and identifies SEO issues with collection pages. Returns collections that need optimization.',
    input_schema: {
      type: 'object' as const,
      properties: {
        limit: {
          type: 'number' as const,
          description: 'Maximum number of collections to analyze (default 50)',
          default: 50,
        },
      },
    },
  },
  {
    name: 'fix_collection_seo',
    description:
      'Applies SEO fixes to a Shopify collection page. Can update title, description, and meta tags.',
    input_schema: {
      type: 'object' as const,
      properties: {
        collectionId: {
          type: 'string' as const,
          description: 'The Shopify collection ID to fix',
        },
        fixes: {
          type: 'object' as const,
          description: 'The SEO fixes to apply',
          properties: {
            title: {
              type: 'string' as const,
              description: 'New optimized collection title',
            },
            description: {
              type: 'string' as const,
              description: 'New optimized collection description HTML',
            },
            metaTitle: {
              type: 'string' as const,
              description: 'SEO meta title',
            },
            metaDescription: {
              type: 'string' as const,
              description: 'SEO meta description',
            },
          },
        },
      },
      required: ['collectionId', 'fixes'],
    },
  },
  {
    name: 'get_store_overview',
    description:
      'Gets an overview of the Shopify store including total products, collections, revenue data, and overall SEO health score. Use this to provide context about the store.',
    input_schema: {
      type: 'object' as const,
      properties: {},
    },
  },
]

// ==================== TOOL HANDLERS ====================

interface ToolContext {
  userId: string
  connectionId: string
}

/**
 * Helper to get Shopify client from connection
 */
async function getShopifyClientFromConnection(connectionId: string) {
  const connection = await db.connection.findUnique({
    where: { id: connectionId },
  })

  if (!connection) {
    throw new Error('Connection not found')
  }

  if (!connection.accessToken) {
    throw new Error('Connection missing access token')
  }

  return createShopifyClient({
    domain: connection.domain,
    accessToken: connection.accessToken,
  })
}

/**
 * Analyze Shopify products and return prioritized list
 */
export async function analyzeShopifyProducts(
  context: ToolContext,
  input: { limit?: number }
): Promise<{
  success: boolean
  products: PrioritizedProduct[]
  summary: {
    totalAnalyzed: number
    averageSeoScore: number
    highPriorityCount: number
  }
}> {
  const limit = Math.min(input.limit || 50, 250)

  // Create Shopify client
  const client = await getShopifyClientFromConnection(context.connectionId)

  // Get prioritized products
  const products = await getPrioritizedProducts(client, limit)

  // Calculate summary stats
  const totalAnalyzed = products.length
  const averageSeoScore =
    products.reduce((sum, p) => sum + p.seoScore, 0) / totalAnalyzed
  const highPriorityCount = products.filter((p) => p.priority > 100).length

  return {
    success: true,
    products,
    summary: {
      totalAnalyzed,
      averageSeoScore: Math.round(averageSeoScore),
      highPriorityCount,
    },
  }
}

/**
 * Get detailed information about a specific product
 */
export async function getProductDetails(
  context: ToolContext,
  input: { productId: string }
): Promise<{
  success: boolean
  product: {
    id: number
    title: string
    handle: string
    body_html: string | null
    vendor: string
    product_type: string
    tags: string
    variants: Array<{
      id: number
      title: string
      price: string
      sku: string
    }>
    images: Array<{
      id: number
      src: string
      alt: string | null
    }>
    seoIssues: string[]
  }
}> {
  // Create Shopify client
  const client = await getShopifyClientFromConnection(context.connectionId)

  // Fetch product
  const response = await client.getProduct(input.productId)
  const product = response.product

  // Analyze SEO issues
  const seoIssues: string[] = []

  if (!product.title || product.title.length < 30) {
    seoIssues.push('Title too short (should be 30-60 characters)')
  }
  if (product.title && product.title.length > 60) {
    seoIssues.push('Title too long (should be 30-60 characters)')
  }
  if (!product.body_html || product.body_html.length < 200) {
    seoIssues.push('Description too short (should be 200+ characters)')
  }
  if (product.images.some((img) => !img.alt)) {
    seoIssues.push('Missing alt text on some images')
  }
  if (!product.tags || product.tags.length === 0) {
    seoIssues.push('No product tags (affects discoverability)')
  }

  return {
    success: true,
    product: {
      id: product.id,
      title: product.title,
      handle: product.handle,
      body_html: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
      tags: product.tags,
      variants: product.variants.map((v) => ({
        id: v.id,
        title: v.title,
        price: v.price,
        sku: v.sku,
      })),
      images: product.images.map((img) => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
      })),
      seoIssues,
    },
  }
}

/**
 * Apply SEO fixes to a product
 */
export async function fixProductSEO(
  context: ToolContext,
  input: {
    productId: string
    fixes: {
      title?: string
      description?: string
      metaTitle?: string
      metaDescription?: string
    }
  }
): Promise<{
  success: boolean
  appliedFixes: string[]
  updatedProduct: {
    id: number
    title: string
    handle: string
  }
}> {
  // Create Shopify client
  const client = await getShopifyClientFromConnection(context.connectionId)

  const appliedFixes: string[] = []
  const metafields = []

  // Prepare update data
  const updateData: {
    title?: string
    body_html?: string
    metafields?: Array<{
      namespace: string
      key: string
      value: string
      type: string
    }>
  } = {}

  if (input.fixes.title) {
    updateData.title = input.fixes.title
    appliedFixes.push('Updated product title')
  }

  if (input.fixes.description) {
    updateData.body_html = input.fixes.description
    appliedFixes.push('Updated product description')
  }

  if (input.fixes.metaTitle) {
    metafields.push({
      namespace: 'global',
      key: 'title_tag',
      value: input.fixes.metaTitle,
      type: 'single_line_text_field',
    })
    appliedFixes.push('Set SEO meta title')
  }

  if (input.fixes.metaDescription) {
    metafields.push({
      namespace: 'global',
      key: 'description_tag',
      value: input.fixes.metaDescription,
      type: 'single_line_text_field',
    })
    appliedFixes.push('Set SEO meta description')
  }

  if (metafields.length > 0) {
    updateData.metafields = metafields
  }

  // Apply fixes
  const response = await client.updateProductSEO(input.productId, updateData)

  // Create audit log
  await db.auditLog.create({
    data: {
      userId: context.userId,
      action: 'SHOPIFY_PRODUCT_SEO_UPDATED',
      resource: 'shopify_product',
      resourceId: input.productId,
      details: JSON.stringify({
        fixes: appliedFixes,
        productTitle: response.product.title,
      }),
    },
  })

  return {
    success: true,
    appliedFixes,
    updatedProduct: {
      id: response.product.id,
      title: response.product.title,
      handle: response.product.handle,
    },
  }
}

/**
 * Analyze Shopify collections
 */
export async function analyzeShopifyCollections(
  context: ToolContext,
  input: { limit?: number }
): Promise<{
  success: boolean
  collections: Array<{
    id: number
    title: string
    handle: string
    seoScore: number
    issues: string[]
  }>
}> {
  const limit = input.limit || 50

  // Create Shopify client
  const client = await getShopifyClientFromConnection(context.connectionId)

  // Fetch collections
  const response = await client.getCollections({ limit })
  const collections = response.custom_collections

  // Analyze each collection
  const analyzed = collections.map((collection) => {
    let seoScore = 100
    const issues: string[] = []

    if (!collection.title || collection.title.length < 30) {
      seoScore -= 20
      issues.push('Title too short')
    }
    if (!collection.body_html || collection.body_html.length < 100) {
      seoScore -= 30
      issues.push('Description too short or missing')
    }
    if (!collection.image) {
      seoScore -= 15
      issues.push('Missing collection image')
    }

    return {
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      seoScore,
      issues,
    }
  })

  return {
    success: true,
    collections: analyzed,
  }
}

/**
 * Fix collection SEO
 */
export async function fixCollectionSEO(
  context: ToolContext,
  input: {
    collectionId: string
    fixes: {
      title?: string
      description?: string
      metaTitle?: string
      metaDescription?: string
    }
  }
): Promise<{
  success: boolean
  appliedFixes: string[]
}> {
  // Create Shopify client
  const client = await getShopifyClientFromConnection(context.connectionId)

  const appliedFixes: string[] = []
  const metafields = []

  const updateData: {
    title?: string
    body_html?: string
    metafields?: Array<{
      namespace: string
      key: string
      value: string
      type: string
    }>
  } = {}

  if (input.fixes.title) {
    updateData.title = input.fixes.title
    appliedFixes.push('Updated collection title')
  }

  if (input.fixes.description) {
    updateData.body_html = input.fixes.description
    appliedFixes.push('Updated collection description')
  }

  if (input.fixes.metaTitle) {
    metafields.push({
      namespace: 'global',
      key: 'title_tag',
      value: input.fixes.metaTitle,
      type: 'single_line_text_field',
    })
    appliedFixes.push('Set SEO meta title')
  }

  if (input.fixes.metaDescription) {
    metafields.push({
      namespace: 'global',
      key: 'description_tag',
      value: input.fixes.metaDescription,
      type: 'single_line_text_field',
    })
    appliedFixes.push('Set SEO meta description')
  }

  if (metafields.length > 0) {
    updateData.metafields = metafields
  }

  // Apply fixes
  await client.updateCollectionSEO(input.collectionId, updateData)

  // Create audit log
  await db.auditLog.create({
    data: {
      userId: context.userId,
      action: 'SHOPIFY_COLLECTION_SEO_UPDATED',
      resource: 'shopify_collection',
      resourceId: input.collectionId,
      details: JSON.stringify({
        fixes: appliedFixes,
      }),
    },
  })

  return {
    success: true,
    appliedFixes,
  }
}

/**
 * Get store overview
 */
export async function getStoreOverview(
  context: ToolContext
): Promise<{
  success: boolean
  store: {
    name: string
    domain: string
    email: string
    currency: string
    planName: string
    stats: {
      productsAnalyzed: number
      averageSeoScore: number
      criticalIssuesCount: number
    }
  }
}> {
  // Get connection for credentials
  const connection = await db.connection.findUnique({
    where: { id: context.connectionId },
  })

  if (!connection) {
    throw new Error('Connection not found')
  }

  // Parse credentials to get shop info
  const credentials = JSON.parse(connection.credentials || '{}')

  // Create Shopify client and get fresh data
  const client = await getShopifyClientFromConnection(context.connectionId)

  // Get prioritized products for stats
  const products = await getPrioritizedProducts(client, 50)

  const averageSeoScore =
    products.reduce((sum, p) => sum + p.seoScore, 0) / products.length
  const criticalIssuesCount = products.filter((p) => p.seoScore < 60).length

  return {
    success: true,
    store: {
      name: credentials.name || connection.displayName || '',
      domain: credentials.domain || connection.domain,
      email: credentials.email || '',
      currency: credentials.currency || 'USD',
      planName: credentials.planDisplayName || credentials.planName || '',
      stats: {
        productsAnalyzed: products.length,
        averageSeoScore: Math.round(averageSeoScore),
        criticalIssuesCount,
      },
    },
  }
}
