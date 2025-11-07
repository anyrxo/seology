/**
 * Shopify GraphQL Admin API Client
 *
 * Modern API client using GraphQL instead of deprecated REST API
 * Includes rate limiting, error handling, and type-safe operations
 *
 * Documentation: context/shopify-docs/07-admin-graphql-api.md
 */

import { Connection } from '@prisma/client'
import { decrypt } from './encryption'

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
  variables?: Record<string, unknown>
): Promise<T> {
  const url = `https://${shop}/admin/api/${API_VERSION}/graphql.json`

  // Check rate limit before making request
  await checkRateLimit(shop)

  const response = await fetch(url, {
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

  if (!response.ok) {
    // Handle HTTP errors
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After')
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000
      await new Promise(resolve => setTimeout(resolve, waitTime))
      // Retry once
      return shopifyGraphQL<T>(shop, accessToken, query, variables)
    }

    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const result: GraphQLResponse<T> = await response.json()

  // Update rate limit state
  if (result.extensions?.cost?.throttleStatus) {
    const throttle = result.extensions.cost.throttleStatus
    rateLimits.set(shop, {
      currentlyAvailable: throttle.currentlyAvailable,
      maximumAvailable: throttle.maximumAvailable,
      restoreRate: throttle.restoreRate,
      lastUpdate: Date.now(),
    })
  }

  // Handle GraphQL errors
  if (result.errors && result.errors.length > 0) {
    const error = result.errors[0]
    throw new Error(`GraphQL Error: ${error.message}${error.extensions?.code ? ` (${error.extensions.code})` : ''}`)
  }

  if (!result.data) {
    throw new Error('GraphQL response has no data')
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
