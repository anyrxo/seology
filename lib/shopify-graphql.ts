/**
 * Shopify GraphQL Admin API Client
 *
 * Modern API client using GraphQL instead of deprecated REST API
 * Includes rate limiting, error handling, and type-safe operations
 *
 * Documentation: context/shopify-docs/07-admin-graphql-api.md
 *
 * ENHANCED: Now includes automatic retry logic with exponential backoff
 * and comprehensive Shopify-specific error handling
 */

import { Connection } from '@prisma/client'
import { decrypt } from './encryption'
import { trackGraphQLCost } from './monitoring'
import {
  ShopifyRateLimitError,
  ShopifyAuthenticationError,
  ShopifyGraphQLError,
  ShopifyNetworkError,
  ShopifyValidationError,
} from './shopify-errors'
import { retryGraphQL } from './shopify-retry'

// GraphQL API version
const API_VERSION = '2025-10'

/**
 * GraphQL Error from Shopify
 */
interface GraphQLError {
  message: string
  locations?: Array<{ line: number; column: number }>
  path?: string[]
  extensions?: {
    code?: string
    documentation?: string
  }
}

/**
 * GraphQL Response structure
 */
interface GraphQLResponse<T> {
  data?: T
  errors?: GraphQLError[]
  extensions?: {
    cost: {
      requestedQueryCost: number
      actualQueryCost: number
      throttleStatus: {
        maximumAvailable: number
        currentlyAvailable: number
        restoreRate: number
      }
    }
  }
}

/**
 * Rate limit state tracking
 */
interface RateLimitState {
  currentlyAvailable: number
  maximumAvailable: number
  restoreRate: number
  lastUpdate: number
}

const rateLimits = new Map<string, RateLimitState>()

/**
 * Make a GraphQL request to Shopify Admin API
 */
export async function shopifyGraphQL<T = unknown>(
  shop: string,
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
  options?: { userId?: string }
): Promise<T> {
  const url = `https://${shop}/admin/api/${API_VERSION}/graphql.json`
  const startTime = Date.now()

  // Check rate limit before making request
  await checkRateLimit(shop)

  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  } catch (error) {
    // Network errors
    throw new ShopifyNetworkError(
      error instanceof Error ? error.message : 'Network request failed'
    )
  }

  if (!response.ok) {
    // Handle HTTP errors with proper Shopify error types
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After')
      const retryAfterSeconds = retryAfter ? parseInt(retryAfter) : 2
      throw new ShopifyRateLimitError(retryAfterSeconds)
    }

    if (response.status === 401 || response.status === 403) {
      throw new ShopifyAuthenticationError(
        `Authentication failed: ${response.statusText}`
      )
    }

    throw new ShopifyNetworkError(`HTTP ${response.status}: ${response.statusText}`)
  }

  const result: GraphQLResponse<T> = await response.json()
  const duration = Date.now() - startTime

  // Update rate limit state and track cost
  if (result.extensions?.cost?.throttleStatus) {
    const throttle = result.extensions.cost.throttleStatus
    rateLimits.set(shop, {
      currentlyAvailable: throttle.currentlyAvailable,
      maximumAvailable: throttle.maximumAvailable,
      restoreRate: throttle.restoreRate,
      lastUpdate: Date.now(),
    })

    // Track GraphQL cost for monitoring
    trackGraphQLCost({
      shop,
      query: query.substring(0, 100), // First 100 chars for identification
      cost: result.extensions.cost.actualQueryCost,
      duration,
      throttleStatus: throttle,
      timestamp: new Date(),
      userId: options?.userId,
    }).catch(err => {
      // Fail silently - monitoring shouldn't break app
      console.error('[Monitoring] Failed to track GraphQL cost:', err)
    })
  }

  // Handle GraphQL errors with proper error types
  if (result.errors && result.errors.length > 0) {
    const firstError = result.errors[0]
    const errorCode = firstError.extensions?.code?.toLowerCase()

    // Check if it's a validation error
    const isValidationError = errorCode?.includes('invalid') ||
                               errorCode?.includes('validation') ||
                               firstError.message.toLowerCase().includes('invalid')

    if (isValidationError) {
      throw new ShopifyValidationError(
        firstError.message,
        result.errors.map(e => ({
          field: e.path || [],
          message: e.message,
        }))
      )
    }

    // Throw as GraphQL error with all errors included
    throw new ShopifyGraphQLError(
      firstError.message,
      result.errors.map(e => ({
        message: e.message,
        path: e.path,
        extensions: e.extensions,
      })),
      false // GraphQL errors are typically not retryable
    )
  }

  if (!result.data) {
    throw new ShopifyGraphQLError(
      'GraphQL response has no data',
      [{ message: 'Empty data response' }],
      false
    )
  }

  return result.data
}

/**
 * Check rate limit and wait if necessary
 */
async function checkRateLimit(shop: string): Promise<void> {
  const state = rateLimits.get(shop)

  if (!state) {
    // No rate limit data yet, proceed
    return
  }

  // Calculate current available points (with restore rate)
  const timeSinceUpdate = Date.now() - state.lastUpdate
  const pointsRestored = (timeSinceUpdate / 1000) * state.restoreRate
  const currentlyAvailable = Math.min(
    state.currentlyAvailable + pointsRestored,
    state.maximumAvailable
  )

  // If we're running low, wait for more points
  if (currentlyAvailable < 100) {
    const pointsNeeded = 100 - currentlyAvailable
    const waitTime = (pointsNeeded / state.restoreRate) * 1000
    console.log(`[GraphQL] Rate limit low, waiting ${Math.ceil(waitTime)}ms`)
    await new Promise(resolve => setTimeout(resolve, waitTime))
  }
}

/**
 * Helper: Execute GraphQL query using a Connection object
 */
export async function shopifyGraphQLWithConnection<T = unknown>(
  connection: Connection,
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!connection.accessToken) {
    throw new Error('Connection has no access token')
  }

  const accessToken = decrypt(connection.accessToken)
  return shopifyGraphQL<T>(connection.domain, accessToken, query, variables)
}

// =============================================================================
// QUERY HELPERS
// =============================================================================

/**
 * Get product by ID with SEO data
 */
export interface ProductSEO {
  id: string
  title: string
  handle: string
  descriptionHtml: string
  seo: {
    title: string | null
    description: string | null
  }
  images: {
    edges: Array<{
      node: {
        id: string
        url: string
        altText: string | null
      }
    }>
  }
}

export async function getProduct(
  connection: Connection,
  productId: string
): Promise<ProductSEO> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        descriptionHtml
        seo {
          title
          description
        }
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{ product: ProductSEO }>(
    connection,
    query,
    { id: `gid://shopify/Product/${productId}` }
  )

  return result.product
}

/**
 * Get multiple products for analysis
 */
export interface ProductsList {
  products: {
    edges: Array<{
      node: ProductSEO
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export async function getProducts(
  connection: Connection,
  first: number = 10,
  after?: string
): Promise<ProductsList> {
  const query = `
    query getProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            seo {
              title
              description
            }
            images(first: 1) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
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

  return await shopifyGraphQLWithConnection<ProductsList>(
    connection,
    query,
    { first, after }
  )
}

// =============================================================================
// MUTATION HELPERS
// =============================================================================

/**
 * Update product SEO
 */
export interface UpdateProductSEOInput {
  title?: string
  description?: string
}

export async function updateProductSEO(
  connection: Connection,
  productId: string,
  seo: UpdateProductSEOInput
): Promise<ProductSEO> {
  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          seo {
            title
            description
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{
    productUpdate: {
      product: ProductSEO
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(connection, mutation, {
    input: {
      id: `gid://shopify/Product/${productId}`,
      seo,
    },
  })

  if (result.productUpdate.userErrors.length > 0) {
    throw new Error(result.productUpdate.userErrors[0].message)
  }

  return result.productUpdate.product
}

/**
 * Update image alt text
 */
export async function updateImageAltText(
  connection: Connection,
  imageId: string,
  altText: string
): Promise<void> {
  const mutation = `
    mutation productImageUpdate($input: ProductImageUpdateInput!) {
      productImageUpdate(input: $input) {
        image {
          id
          altText
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{
    productImageUpdate: {
      image: { id: string; altText: string | null }
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(connection, mutation, {
    input: {
      id: imageId,
      altText,
    },
  })

  if (result.productImageUpdate.userErrors.length > 0) {
    throw new Error(result.productImageUpdate.userErrors[0].message)
  }
}

/**
 * Create URL redirect
 */
export async function createRedirect(
  connection: Connection,
  path: string,
  target: string
): Promise<{ id: string; path: string; target: string }> {
  const mutation = `
    mutation redirectCreate($redirect: RedirectInput!) {
      redirectCreate(redirect: $redirect) {
        redirect {
          id
          path
          target
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{
    redirectCreate: {
      redirect: { id: string; path: string; target: string }
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(connection, mutation, {
    redirect: {
      path,
      target,
    },
  })

  if (result.redirectCreate.userErrors.length > 0) {
    throw new Error(result.redirectCreate.userErrors[0].message)
  }

  return result.redirectCreate.redirect
}

/**
 * Get shop information
 */
export interface ShopInfo {
  shop: {
    id: string
    name: string
    email: string
    primaryDomain: {
      host: string
    }
    plan: {
      displayName: string
    }
  }
}

export async function getShopInfo(connection: Connection): Promise<ShopInfo> {
  const query = `
    query {
      shop {
        id
        name
        email
        primaryDomain {
          host
        }
        plan {
          displayName
        }
      }
    }
  `

  return await shopifyGraphQLWithConnection<ShopInfo>(connection, query)
}

// =============================================================================
// PAGES SEO HELPERS
// =============================================================================

/**
 * Page with SEO data
 */
export interface PageSEO {
  id: string
  title: string
  handle: string
  body: string
  bodySummary: string
  seo: {
    title: string | null
    description: string | null
  }
  createdAt: string
  updatedAt: string
}

/**
 * Get single page by ID with SEO data
 */
export async function getPage(
  connection: Connection,
  pageId: string
): Promise<PageSEO> {
  const query = `
    query getPage($id: ID!) {
      page(id: $id) {
        id
        title
        handle
        body
        bodySummary
        seo {
          title
          description
        }
        createdAt
        updatedAt
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{ page: PageSEO }>(
    connection,
    query,
    { id: `gid://shopify/Page/${pageId}` }
  )

  return result.page
}

/**
 * Get multiple pages for analysis
 */
export interface PagesList {
  pages: {
    edges: Array<{
      node: PageSEO
      cursor: string
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export async function getPages(
  connection: Connection,
  first: number = 10,
  after?: string
): Promise<PagesList> {
  const query = `
    query getPages($first: Int!, $after: String) {
      pages(first: $first, after: $after) {
        edges {
          node {
            id
            title
            handle
            bodySummary
            seo {
              title
              description
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `

  return await shopifyGraphQLWithConnection<PagesList>(
    connection,
    query,
    { first, after }
  )
}

/**
 * Update page SEO
 */
export interface UpdatePageSEOInput {
  title?: string
  description?: string
}

export async function updatePageSEO(
  connection: Connection,
  pageId: string,
  seo: UpdatePageSEOInput
): Promise<PageSEO> {
  const mutation = `
    mutation pageUpdate($input: PageInput!) {
      pageUpdate(input: $input) {
        page {
          id
          seo {
            title
            description
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{
    pageUpdate: {
      page: PageSEO
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(connection, mutation, {
    input: {
      id: `gid://shopify/Page/${pageId}`,
      metafields: [{
        namespace: 'global',
        key: 'title_tag',
        value: seo.title,
        type: 'single_line_text_field'
      }, {
        namespace: 'global',
        key: 'description_tag',
        value: seo.description,
        type: 'single_line_text_field'
      }]
    },
  })

  if (result.pageUpdate.userErrors.length > 0) {
    throw new Error(result.pageUpdate.userErrors[0].message)
  }

  return result.pageUpdate.page
}

// =============================================================================
// BLOG & ARTICLES SEO HELPERS
// =============================================================================

/**
 * Article with SEO data
 */
export interface ArticleSEO {
  id: string
  title: string
  handle: string
  contentHtml: string
  excerpt: string | null
  seo: {
    title: string | null
    description: string | null
  }
  image: {
    id: string
    url: string
    altText: string | null
  } | null
  blog: {
    id: string
    title: string
  }
  createdAt: string
  updatedAt: string
}

/**
 * Get single article by ID with SEO data
 */
export async function getArticle(
  connection: Connection,
  articleId: string
): Promise<ArticleSEO> {
  const query = `
    query getArticle($id: ID!) {
      article(id: $id) {
        id
        title
        handle
        contentHtml
        excerpt
        seo {
          title
          description
        }
        image {
          id
          url
          altText
        }
        blog {
          id
          title
        }
        createdAt
        updatedAt
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{ article: ArticleSEO }>(
    connection,
    query,
    { id: `gid://shopify/Article/${articleId}` }
  )

  return result.article
}

/**
 * Blog with articles
 */
export interface BlogWithArticles {
  id: string
  title: string
  handle: string
  articles: {
    edges: Array<{
      node: {
        id: string
        title: string
        handle: string
        seo: {
          title: string | null
          description: string | null
        }
      }
    }>
  }
}

/**
 * Get all blogs with their articles
 */
export interface BlogsList {
  blogs: {
    edges: Array<{
      node: BlogWithArticles
    }>
  }
}

export async function getBlogs(
  connection: Connection,
  first: number = 10
): Promise<BlogsList> {
  const query = `
    query getBlogs($first: Int!) {
      blogs(first: $first) {
        edges {
          node {
            id
            title
            handle
            articles(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                  seo {
                    title
                    description
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  return await shopifyGraphQLWithConnection<BlogsList>(
    connection,
    query,
    { first }
  )
}

/**
 * Update article SEO
 */
export interface UpdateArticleSEOInput {
  title?: string
  description?: string
}

export async function updateArticleSEO(
  connection: Connection,
  articleId: string,
  seo: UpdateArticleSEOInput
): Promise<ArticleSEO> {
  const mutation = `
    mutation articleUpdate($input: ArticleUpdateInput!) {
      articleUpdate(input: $input) {
        article {
          id
          seo {
            title
            description
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{
    articleUpdate: {
      article: ArticleSEO
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(connection, mutation, {
    input: {
      id: `gid://shopify/Article/${articleId}`,
      metafields: [{
        namespace: 'global',
        key: 'title_tag',
        value: seo.title,
        type: 'single_line_text_field'
      }, {
        namespace: 'global',
        key: 'description_tag',
        value: seo.description,
        type: 'single_line_text_field'
      }]
    },
  })

  if (result.articleUpdate.userErrors.length > 0) {
    throw new Error(result.articleUpdate.userErrors[0].message)
  }

  return result.articleUpdate.article
}

// =============================================================================
// COLLECTIONS SEO HELPERS
// =============================================================================

/**
 * Collection with SEO data
 */
export interface CollectionSEO {
  id: string
  title: string
  handle: string
  descriptionHtml: string
  seo: {
    title: string | null
    description: string | null
  }
  image: {
    id: string
    url: string
    altText: string | null
  } | null
  productsCount: number
}

/**
 * Get single collection by ID with SEO data
 */
export async function getCollection(
  connection: Connection,
  collectionId: string
): Promise<CollectionSEO> {
  const query = `
    query getCollection($id: ID!) {
      collection(id: $id) {
        id
        title
        handle
        descriptionHtml
        seo {
          title
          description
        }
        image {
          id
          url
          altText
        }
        productsCount
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{ collection: CollectionSEO }>(
    connection,
    query,
    { id: `gid://shopify/Collection/${collectionId}` }
  )

  return result.collection
}

/**
 * Get multiple collections for analysis
 */
export interface CollectionsList {
  collections: {
    edges: Array<{
      node: CollectionSEO
      cursor: string
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export async function getCollections(
  connection: Connection,
  first: number = 10,
  after?: string
): Promise<CollectionsList> {
  const query = `
    query getCollections($first: Int!, $after: String) {
      collections(first: $first, after: $after) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            seo {
              title
              description
            }
            productsCount
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `

  return await shopifyGraphQLWithConnection<CollectionsList>(
    connection,
    query,
    { first, after }
  )
}

/**
 * Update collection SEO
 */
export interface UpdateCollectionSEOInput {
  title?: string
  description?: string
}

export async function updateCollectionSEO(
  connection: Connection,
  collectionId: string,
  seo: UpdateCollectionSEOInput
): Promise<CollectionSEO> {
  const mutation = `
    mutation collectionUpdate($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection {
          id
          seo {
            title
            description
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const result = await shopifyGraphQLWithConnection<{
    collectionUpdate: {
      collection: CollectionSEO
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(connection, mutation, {
    input: {
      id: `gid://shopify/Collection/${collectionId}`,
      seo,
    },
  })

  if (result.collectionUpdate.userErrors.length > 0) {
    throw new Error(result.collectionUpdate.userErrors[0].message)
  }

  return result.collectionUpdate.collection
}

// =============================================================================
// SCHEMA MARKUP & METAFIELDS HELPERS
// =============================================================================

/**
 * Create or update metafield for structured data (schema markup)
 */
export interface MetafieldInput {
  namespace: string
  key: string
  value: string
  type: string
}

export async function updateMetafields(
  connection: Connection,
  ownerId: string,
  metafields: MetafieldInput[]
): Promise<void> {
  const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
          value
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const metafieldsInput = metafields.map(mf => ({
    ownerId,
    namespace: mf.namespace,
    key: mf.key,
    value: mf.value,
    type: mf.type
  }))

  const result = await shopifyGraphQLWithConnection<{
    metafieldsSet: {
      metafields: Array<{ id: string; namespace: string; key: string; value: string }>
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(connection, mutation, {
    metafields: metafieldsInput,
  })

  if (result.metafieldsSet.userErrors.length > 0) {
    throw new Error(result.metafieldsSet.userErrors[0].message)
  }
}

/**
 * Add Product schema markup via metafield
 */
export async function addProductSchema(
  connection: Connection,
  productId: string,
  schemaData: {
    brand?: string
    sku?: string
    gtin?: string
    mpn?: string
  }
): Promise<void> {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    ...schemaData
  }

  await updateMetafields(connection, `gid://shopify/Product/${productId}`, [
    {
      namespace: 'seo',
      key: 'schema_markup',
      value: JSON.stringify(schema),
      type: 'json'
    }
  ])
}

/**
 * Add Article schema markup via metafield
 */
export async function addArticleSchema(
  connection: Connection,
  articleId: string,
  schemaData: {
    headline: string
    datePublished: string
    author: string
    publisher: string
  }
): Promise<void> {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    ...schemaData
  }

  await updateMetafields(connection, `gid://shopify/Article/${articleId}`, [
    {
      namespace: 'seo',
      key: 'schema_markup',
      value: JSON.stringify(schema),
      type: 'json'
    }
  ])
}

// =============================================================================
// RETRY-ENABLED WRAPPERS
// =============================================================================

/**
 * Execute GraphQL query with automatic retry logic
 *
 * This is the recommended way to make GraphQL requests as it includes:
 * - Automatic retry on rate limits and network errors
 * - Exponential backoff
 * - Proper error classification
 *
 * @example
 * ```typescript
 * const result = await shopifyGraphQLWithRetry(
 *   shop,
 *   token,
 *   query,
 *   variables,
 *   { maxRetries: 3 }
 * )
 * ```
 */
export async function shopifyGraphQLWithRetry<T = unknown>(
  shop: string,
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
  options?: { userId?: string; maxRetries?: number }
): Promise<T> {
  return retryGraphQL(
    () => shopifyGraphQL<T>(shop, accessToken, query, variables, options),
    { maxRetries: options?.maxRetries }
  )
}

/**
 * Execute GraphQL query using Connection with automatic retry
 *
 * @example
 * ```typescript
 * const products = await shopifyGraphQLWithConnectionRetry(
 *   connection,
 *   query,
 *   variables
 * )
 * ```
 */
export async function shopifyGraphQLWithConnectionRetry<T = unknown>(
  connection: Connection,
  query: string,
  variables?: Record<string, unknown>,
  options?: { maxRetries?: number }
): Promise<T> {
  if (!connection.accessToken) {
    throw new ShopifyAuthenticationError('Connection has no access token')
  }

  const accessToken = decrypt(connection.accessToken)
  return retryGraphQL(
    () => shopifyGraphQL<T>(connection.domain, accessToken, query, variables),
    { maxRetries: options?.maxRetries }
  )
}
