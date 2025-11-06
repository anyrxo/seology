/**
 * Shopify API Client
 *
 * Unified client for Shopify REST and GraphQL APIs
 * Handles authentication, rate limiting, and API versioning
 */

import { decrypt } from './encryption'
import { retryShopifyRequest } from './retry'
import { logger } from './logger'

const SHOPIFY_API_VERSION = '2024-01'

// ==================== TYPE DEFINITIONS ====================

export interface ShopifyAPIClientConfig {
  shop: string
  accessToken: string
}

interface GraphQLCost {
  requestedQueryCost?: number
  actualQueryCost?: number
  throttleStatus?: {
    maximumAvailable?: number
    currentlyAvailable?: number
    restoreRate?: number
  }
}

interface GraphQLExtensions {
  cost?: GraphQLCost
  [key: string]: unknown
}

interface GraphQLError {
  message: string
  locations?: Array<{ line: number; column: number }>
  path?: Array<string | number>
  extensions?: Record<string, unknown>
}

interface GraphQLResponse<T> {
  data: T
  extensions?: GraphQLExtensions
  errors?: GraphQLError[]
}

export interface ShopifyProduct {
  id: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  handle: string
  status: string
  tags: string
  variants: ShopifyVariant[]
  images: ShopifyImage[]
  image: ShopifyImage | null
}

export interface ShopifyVariant {
  id: number
  product_id: number
  title: string
  price: string
  sku: string
  inventory_quantity: number
}

export interface ShopifyImage {
  id: number
  product_id: number
  position: number
  src: string
  alt: string | null
}

export interface ShopifyProductsResponse {
  products: ShopifyProduct[]
}

export interface ShopifyProductResponse {
  product: ShopifyProduct
}

export interface ShopifyMetafield {
  id?: number
  namespace: string
  key: string
  value: string
  type: string
  owner_id?: number
  owner_resource?: string
}

export interface ShopifyMetafieldsResponse {
  metafields: ShopifyMetafield[]
}

export interface ShopifyCollection {
  id: number
  title: string
  body_html: string
  handle: string
  published_at: string | null
  image: ShopifyImage | null
}

export interface ShopifyCollectionsResponse {
  custom_collections: ShopifyCollection[]
}

export interface ShopifyCollectionResponse {
  custom_collection: ShopifyCollection
}

export interface ShopifyPage {
  id: number
  title: string
  body_html: string
  handle: string
  published_at: string | null
}

export interface ShopifyPagesResponse {
  pages: ShopifyPage[]
}

export interface ShopifyPageResponse {
  page: ShopifyPage
}

export interface ShopifyTheme {
  id: number
  name: string
  role: 'main' | 'unpublished' | 'demo'
  created_at: string
  updated_at: string
}

export interface ShopifyThemesResponse {
  themes: ShopifyTheme[]
}

export interface ShopifyAsset {
  key: string
  value?: string
  attachment?: string
  public_url?: string
  content_type?: string
  size?: number
}

export interface ShopifyAssetResponse {
  asset: ShopifyAsset
}

export interface ShopifyShop {
  id: number
  name: string
  email: string
  domain: string
  myshopify_domain: string
  currency: string
  timezone: string
  plan_name: string
  plan_display_name: string
}

export interface ShopifyShopResponse {
  shop: ShopifyShop
}

export interface GraphQLProductNode {
  id: string
  title: string
  handle: string
  status: string
  totalInventory: number
  priceRangeV2: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  seo: {
    title: string | null
    description: string | null
  }
  featuredImage: {
    url: string
    altText: string | null
  } | null
}

export interface GraphQLProductEdge {
  node: GraphQLProductNode
}

export interface GraphQLProductsResponse {
  products: {
    edges: GraphQLProductEdge[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export interface GraphQLAnalyticsData {
  views: number
  addToCarts: number
  purchases: number
  revenue: {
    amount: string
    currencyCode: string
  }
}

export interface GraphQLProductAnalyticsResponse {
  product: {
    id: string
    title: string
    analytics: GraphQLAnalyticsData
  }
}

export interface PrioritizedProduct {
  id: string
  title: string
  handle: string
  revenue30Days: number
  seoScore: number
  priority: number
}

export interface ProductUpdateData {
  title?: string
  body_html?: string
}

export interface CollectionUpdateData {
  title?: string
  body_html?: string
}

export interface PageUpdateData {
  title?: string
  body_html?: string
}

export interface SEOMetafieldData {
  title?: string
  body_html?: string
  metafields?: ShopifyMetafield[]
}

export class ShopifyAPIClient {
  private shop: string
  private accessToken: string
  private baseUrl: string
  private graphqlUrl: string

  constructor(config: ShopifyAPIClientConfig) {
    this.shop = config.shop
    this.accessToken = config.accessToken
    this.baseUrl = `https://${this.shop}/admin/api/${SHOPIFY_API_VERSION}`
    this.graphqlUrl = `${this.baseUrl}/graphql.json`
  }

  /**
   * Make a REST API request with automatic retry logic
   */
  private async restRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    return retryShopifyRequest<T>(async () => {
      const response = await fetch(url, {
        ...options,
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      // Check rate limit headers
      const rateLimitRemaining = response.headers.get('X-Shopify-Shop-Api-Call-Limit')
      if (rateLimitRemaining) {
        const [used, limit] = rateLimitRemaining.split('/')
        if (parseInt(used) >= parseInt(limit) * 0.9) {
          logger.warn('SHOPIFY', 'Approaching Shopify API rate limit', {
            rateLimitRemaining,
            used: parseInt(used),
            limit: parseInt(limit),
            shop: this.shop,
          })
        }
      }

      return response
    })
  }

  /**
   * Make a GraphQL API request with automatic retry logic
   */
  private async graphqlRequest<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    return retryShopifyRequest<GraphQLResponse<T>>(async () => {
      return fetch(this.graphqlUrl, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })
    }).then((result) => {
      if (result.errors) {
        throw new Error(
          `GraphQL errors: ${JSON.stringify(result.errors)}`
        )
      }

      // Check rate limit
      const cost = result.extensions?.cost
      if (cost && cost.throttleStatus?.currentlyAvailable !== undefined && cost.throttleStatus.currentlyAvailable < 100) {
        logger.warn('SHOPIFY', 'GraphQL query cost approaching limit', {
          currentlyAvailable: cost.throttleStatus.currentlyAvailable,
          maximumAvailable: cost.throttleStatus.maximumAvailable,
          requestedQueryCost: cost.requestedQueryCost,
          actualQueryCost: cost.actualQueryCost,
          shop: this.shop,
        })
      }

      return result.data
    })
  }

  // ==================== PRODUCT APIs ====================

  /**
   * Get all products with pagination
   */
  async getProducts(params: {
    limit?: number
    since_id?: string
    fields?: string[]
  } = {}): Promise<ShopifyProductsResponse> {
    const queryParams = new URLSearchParams()
    if (params.limit) queryParams.set('limit', params.limit.toString())
    if (params.since_id) queryParams.set('since_id', params.since_id)
    if (params.fields) queryParams.set('fields', params.fields.join(','))

    const endpoint = `/products.json?${queryParams.toString()}`
    return this.restRequest<ShopifyProductsResponse>(endpoint)
  }

  /**
   * Get a single product by ID
   */
  async getProduct(productId: string): Promise<ShopifyProductResponse> {
    return this.restRequest<ShopifyProductResponse>(`/products/${productId}.json`)
  }

  /**
   * Update product SEO fields
   */
  async updateProductSEO(productId: string, seoData: SEOMetafieldData): Promise<ShopifyProductResponse> {
    const updateData: ProductUpdateData = {}

    if (seoData.title) {
      updateData.title = seoData.title
    }

    if (seoData.body_html) {
      updateData.body_html = seoData.body_html
    }

    // Update product
    const productResponse = await this.restRequest<ShopifyProductResponse>(`/products/${productId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ product: updateData }),
    })

    // Update metafields if provided
    if (seoData.metafields && seoData.metafields.length > 0) {
      for (const metafield of seoData.metafields) {
        await this.restRequest<{ metafield: ShopifyMetafield }>(`/products/${productId}/metafields.json`, {
          method: 'POST',
          body: JSON.stringify({ metafield }),
        })
      }
    }

    return productResponse
  }

  /**
   * Get product metafields (including SEO meta tags)
   */
  async getProductMetafields(productId: string): Promise<ShopifyMetafieldsResponse> {
    return this.restRequest<ShopifyMetafieldsResponse>(`/products/${productId}/metafields.json`)
  }

  /**
   * Get products with analytics data (GraphQL)
   */
  async getProductsWithAnalytics(limit: number = 50): Promise<GraphQLProductsResponse> {
    const query = `
      query GetProductsWithAnalytics($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              status
              totalInventory
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              seo {
                title
                description
              }
              featuredImage {
                url
                altText
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `

    return this.graphqlRequest(query, { first: limit })
  }

  // ==================== COLLECTION APIs ====================

  /**
   * Get all collections
   */
  async getCollections(params: {
    limit?: number
    since_id?: string
  } = {}): Promise<ShopifyCollectionsResponse> {
    const queryParams = new URLSearchParams()
    if (params.limit) queryParams.set('limit', params.limit.toString())
    if (params.since_id) queryParams.set('since_id', params.since_id)

    const endpoint = `/custom_collections.json?${queryParams.toString()}`
    return this.restRequest<ShopifyCollectionsResponse>(endpoint)
  }

  /**
   * Update collection SEO
   */
  async updateCollectionSEO(collectionId: string, seoData: SEOMetafieldData): Promise<ShopifyCollectionResponse> {
    const updateData: CollectionUpdateData = {}

    if (seoData.title) updateData.title = seoData.title
    if (seoData.body_html) updateData.body_html = seoData.body_html

    const response = await this.restRequest<ShopifyCollectionResponse>(
      `/custom_collections/${collectionId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({ custom_collection: updateData }),
      }
    )

    // Update metafields if provided
    if (seoData.metafields && seoData.metafields.length > 0) {
      for (const metafield of seoData.metafields) {
        await this.restRequest<{ metafield: ShopifyMetafield }>(
          `/custom_collections/${collectionId}/metafields.json`,
          {
            method: 'POST',
            body: JSON.stringify({ metafield }),
          }
        )
      }
    }

    return response
  }

  // ==================== PAGE APIs ====================

  /**
   * Get all pages
   */
  async getPages(params: {
    limit?: number
    since_id?: string
  } = {}): Promise<ShopifyPagesResponse> {
    const queryParams = new URLSearchParams()
    if (params.limit) queryParams.set('limit', params.limit.toString())
    if (params.since_id) queryParams.set('since_id', params.since_id)

    const endpoint = `/pages.json?${queryParams.toString()}`
    return this.restRequest<ShopifyPagesResponse>(endpoint)
  }

  /**
   * Update page content and SEO
   */
  async updatePage(pageId: string, data: SEOMetafieldData): Promise<ShopifyPageResponse> {
    const updateData: PageUpdateData = {}

    if (data.title) updateData.title = data.title
    if (data.body_html) updateData.body_html = data.body_html

    const response = await this.restRequest<ShopifyPageResponse>(`/pages/${pageId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ page: updateData }),
    })

    // Update metafields if provided
    if (data.metafields && data.metafields.length > 0) {
      for (const metafield of data.metafields) {
        await this.restRequest<{ metafield: ShopifyMetafield }>(`/pages/${pageId}/metafields.json`, {
          method: 'POST',
          body: JSON.stringify({ metafield }),
        })
      }
    }

    return response
  }

  // ==================== THEME APIs ====================

  /**
   * Get all themes
   */
  async getThemes(): Promise<ShopifyThemesResponse> {
    return this.restRequest<ShopifyThemesResponse>('/themes.json')
  }

  /**
   * Get theme assets (for modifying theme files)
   */
  async getThemeAsset(themeId: string, assetKey: string): Promise<ShopifyAssetResponse> {
    const endpoint = `/themes/${themeId}/assets.json?asset[key]=${encodeURIComponent(
      assetKey
    )}`
    return this.restRequest<ShopifyAssetResponse>(endpoint)
  }

  /**
   * Update theme asset (for injecting SEO code)
   */
  async updateThemeAsset(
    themeId: string,
    assetKey: string,
    value: string
  ): Promise<ShopifyAssetResponse> {
    return this.restRequest<ShopifyAssetResponse>(`/themes/${themeId}/assets.json`, {
      method: 'PUT',
      body: JSON.stringify({
        asset: {
          key: assetKey,
          value: value,
        },
      }),
    })
  }

  // ==================== SHOP INFO APIs ====================

  /**
   * Get shop information
   */
  async getShopInfo(): Promise<ShopifyShopResponse> {
    return this.restRequest<ShopifyShopResponse>('/shop.json')
  }

  // ==================== ANALYTICS APIs (GraphQL) ====================

  /**
   * Get product analytics (sales, views, conversion)
   */
  async getProductAnalytics(
    productId: string,
    dateRange: { start: string; end: string }
  ): Promise<GraphQLProductAnalyticsResponse> {
    const query = `
      query GetProductAnalytics($productId: ID!, $startDate: DateTime!, $endDate: DateTime!) {
        product(id: $productId) {
          id
          title
          analytics(from: $startDate, to: $endDate) {
            views
            addToCarts
            purchases
            revenue {
              amount
              currencyCode
            }
          }
        }
      }
    `

    return this.graphqlRequest(query, {
      productId: `gid://shopify/Product/${productId}`,
      startDate: dateRange.start,
      endDate: dateRange.end,
    })
  }

  // ==================== METAFIELD UTILITIES ====================

  /**
   * Create SEO metafield (for meta description, title tag overrides)
   */
  async createSEOMetafield(
    resourceType: 'product' | 'collection' | 'page',
    resourceId: string,
    key: 'title_tag' | 'description_tag',
    value: string
  ): Promise<{ metafield: ShopifyMetafield }> {
    const metafield = {
      namespace: 'global',
      key: key,
      value: value,
      type: 'single_line_text_field',
    }

    return this.restRequest<{ metafield: ShopifyMetafield }>(`/${resourceType}s/${resourceId}/metafields.json`, {
      method: 'POST',
      body: JSON.stringify({ metafield }),
    })
  }
}

/**
 * Factory function to create Shopify API client from encrypted connection
 */
export async function createShopifyClient(connection: {
  domain: string
  accessToken: string
}): Promise<ShopifyAPIClient> {
  // Decrypt access token
  const decryptedToken = decrypt(connection.accessToken)

  return new ShopifyAPIClient({
    shop: connection.domain,
    accessToken: decryptedToken,
  })
}

/**
 * Revenue-aware product prioritization
 * Returns products sorted by SEO impact potential (revenue × issues)
 */
export async function getPrioritizedProducts(
  client: ShopifyAPIClient,
  limit: number = 50
): Promise<PrioritizedProduct[]> {
  // Get products with analytics
  const productsData = await client.getProductsWithAnalytics(limit)

  // Calculate priority score for each product
  const prioritized = productsData.products.edges.map((edge: GraphQLProductEdge): PrioritizedProduct => {
    const product = edge.node

    // Calculate SEO score (0-100)
    let seoScore = 100

    // Deduct points for missing SEO elements
    if (!product.seo?.title || product.seo.title.length < 30) seoScore -= 20
    if (!product.seo?.description || product.seo.description.length < 100)
      seoScore -= 20
    if (!product.featuredImage?.altText) seoScore -= 15

    // Estimate revenue (simplified - would integrate with actual analytics)
    const price = parseFloat(product.priceRangeV2?.minVariantPrice?.amount || '0')
    const estimatedRevenue = price * 10 // Placeholder: average 10 sales/month

    // Priority = revenue impact × SEO issues
    const issuesCount = 100 - seoScore
    const priority = estimatedRevenue * (issuesCount / 10)

    return {
      id: product.id.replace('gid://shopify/Product/', ''),
      title: product.title,
      handle: product.handle,
      revenue30Days: estimatedRevenue,
      seoScore,
      priority: Math.round(priority),
    }
  })

  // Sort by priority (highest first)
  return prioritized.sort((a: PrioritizedProduct, b: PrioritizedProduct) => b.priority - a.priority)
}
