/**
 * Shopify GraphQL Client
 * Authenticated API client for making requests to Shopify Admin API
 */

import { retrieveSession } from './shopify-session-storage'

interface GraphQLRequest {
  query: string
  variables?: Record<string, unknown>
}

interface GraphQLError {
  message: string
  extensions?: Record<string, unknown>
}

interface GraphQLResponse<T> {
  data?: T
  errors?: GraphQLError[]
}

interface ProductNode {
  id: string
  title: string
  description: string
  handle: string
  seo: {
    title: string | null
    description: string | null
  }
  featuredImage: {
    url: string
    altText: string | null
  } | null
  metafields: {
    edges: Array<{
      node: {
        namespace: string
        key: string
        value: string
      }
    }>
  }
}

interface ProductEdge {
  node: ProductNode
}

interface ProductsResponse {
  products: {
    edges: ProductEdge[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

interface ProductUpdateResponse {
  productUpdate: {
    product: {
      id: string
      seo: {
        title: string | null
        description: string | null
      }
    }
    userErrors: Array<{
      field: string[]
      message: string
    }>
  }
}

interface ShopDetailsResponse {
  shop: {
    name: string
    email: string
    myshopifyDomain: string
    plan: {
      displayName: string
    }
  }
}

/**
 * Make authenticated GraphQL request to Shopify Admin API
 */
export async function shopifyGraphQL<T>(
  userId: string,
  shop: string,
  request: GraphQLRequest
): Promise<GraphQLResponse<T>> {
  const session = await retrieveSession(userId, shop)

  if (!session) {
    throw new Error('No active Shopify session')
  }

  const response = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': session.accessToken,
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch all products from shop with cursor-based pagination
 * PERFORMANCE OPTIMIZATION: Use smaller batches (50 instead of 250) to reduce response time
 */
export async function fetchProducts(userId: string, shop: string): Promise<ProductNode[]> {
  const allProducts: ProductNode[] = []
  let hasNextPage = true
  let cursor: string | null = null
  const BATCH_SIZE = 50 // Smaller batch size for better performance

  while (hasNextPage) {
    const query = `
      query($cursor: String) {
        products(first: ${BATCH_SIZE}, after: $cursor) {
          edges {
            node {
              id
              title
              description
              handle
              seo {
                title
                description
              }
              featuredImage {
                url
                altText
              }
              metafields(first: 10) {
                edges {
                  node {
                    namespace
                    key
                    value
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

    const requestVariables: GraphQLRequest = cursor
      ? { query, variables: { cursor } }
      : { query }

    const graphqlResponse: GraphQLResponse<ProductsResponse> = await shopifyGraphQL<ProductsResponse>(userId, shop, requestVariables)

    if (graphqlResponse.errors) {
      throw new Error(graphqlResponse.errors[0].message)
    }

    const products = graphqlResponse.data?.products?.edges.map((edge: ProductEdge) => edge.node) || []
    allProducts.push(...products)

    hasNextPage = graphqlResponse.data?.products?.pageInfo.hasNextPage || false
    cursor = graphqlResponse.data?.products?.pageInfo.endCursor || null

    // Safety check to prevent infinite loops
    if (allProducts.length > 10000) {
      console.warn(`[Shopify] Reached safety limit of 10,000 products for shop: ${shop}`)
      break
    }
  }

  return allProducts
}

/**
 * Update product SEO
 */
export async function updateProductSEO(
  userId: string,
  shop: string,
  productId: string,
  seo: { title?: string; description?: string }
) {
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

  const variables = {
    input: {
      id: productId,
      seo,
    },
  }

  const response = await shopifyGraphQL<ProductUpdateResponse>(userId, shop, { query: mutation, variables })

  if (response.errors) {
    throw new Error(response.errors[0].message)
  }

  if (response.data?.productUpdate?.userErrors && response.data.productUpdate.userErrors.length > 0) {
    throw new Error(response.data.productUpdate.userErrors[0].message)
  }

  return response.data?.productUpdate?.product
}

/**
 * Get shop details
 */
export async function getShopDetails(userId: string, shop: string) {
  const query = `
    query {
      shop {
        name
        email
        myshopifyDomain
        plan {
          displayName
        }
      }
    }
  `

  const response = await shopifyGraphQL<ShopDetailsResponse>(userId, shop, { query })

  if (response.errors) {
    throw new Error(response.errors[0].message)
  }

  return response.data?.shop
}
