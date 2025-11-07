/**
 * Example: Monitored Shopify Products API Route
 *
 * Demonstrates best practices for integrating performance monitoring,
 * error tracking, and GraphQL cost tracking into a Shopify API route.
 *
 * This is a reference implementation showing how to:
 * - Track API performance
 * - Monitor GraphQL costs
 * - Handle and log errors properly
 * - Maintain rate limit health
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { trackAPICall } from '@/lib/monitoring'
import { withErrorTracking, logError } from '@/lib/error-tracking'
import { shopifyGraphQLWithConnection, getProducts } from '@/lib/shopify-graphql'

/**
 * GET /api/shopify/products/monitored-example
 *
 * Fetch Shopify products with comprehensive monitoring
 *
 * Query params:
 * - shop: Shopify domain (required)
 * - limit: Number of products to fetch (default: 10, max: 250)
 */
export async function GET(req: NextRequest) {
  // Extract query parameters
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get('shop')
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 250)

  // Authenticate user
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      },
      { status: 401 }
    )
  }

  if (!shop) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Shop parameter required' },
      },
      { status: 400 }
    )
  }

  // Wrap entire operation with performance tracking
  return await trackAPICall(
    '/api/shopify/products/monitored-example',
    shop,
    userId,
    async () => {
      // Wrap business logic with error tracking
      return await withErrorTracking(
        async () => {
          // Verify connection exists and user has access
          const connection = await db.connection.findFirst({
            where: {
              userId,
              domain: shop,
              platform: 'SHOPIFY',
              status: 'CONNECTED',
            },
          })

          if (!connection) {
            return NextResponse.json(
              {
                success: false,
                error: {
                  code: 'NOT_FOUND',
                  message: 'Shopify connection not found or disconnected',
                },
              },
              { status: 404 }
            )
          }

          // Check if we have valid credentials
          if (!connection.accessToken) {
            // Log specific error for debugging
            await logError(new Error('Missing access token'), {
              endpoint: '/api/shopify/products/monitored-example',
              shop,
              userId,
              statusCode: 500,
              additionalInfo: {
                connectionId: connection.id,
                connectionStatus: connection.status,
              },
            })

            return NextResponse.json(
              {
                success: false,
                error: {
                  code: 'CONFIGURATION_ERROR',
                  message: 'Invalid Shopify credentials. Please reconnect your store.',
                },
              },
              { status: 500 }
            )
          }

          try {
            // Fetch products using GraphQL (automatically tracked)
            // The shopifyGraphQLWithConnection function internally:
            // - Tracks query cost
            // - Monitors rate limits
            // - Handles throttling
            const result = await getProducts(connection, limit)

            const products = result.products.edges.map(edge => edge.node)

            // Return successful response
            return NextResponse.json({
              success: true,
              data: {
                products,
                pageInfo: result.products.pageInfo,
                count: products.length,
                shop,
              },
              meta: {
                // Include metadata for client-side monitoring
                timestamp: new Date().toISOString(),
                limit,
              },
            })
          } catch (error) {
            // Specific error handling for Shopify API errors
            const err = error as Error

            // Check if it's a rate limit error
            if (err.message.includes('429') || err.message.includes('throttle')) {
              return NextResponse.json(
                {
                  success: false,
                  error: {
                    code: 'RATE_LIMIT',
                    message: 'Shopify API rate limit reached. Please try again in a moment.',
                    retryAfter: 2000, // Suggest retry after 2 seconds
                  },
                },
                { status: 429 }
              )
            }

            // Check if it's an authentication error
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
              return NextResponse.json(
                {
                  success: false,
                  error: {
                    code: 'AUTHENTICATION_ERROR',
                    message: 'Shopify authentication failed. Please reconnect your store.',
                  },
                },
                { status: 401 }
              )
            }

            // Generic API error
            throw error // Let withErrorTracking handle it
          }
        },
        {
          endpoint: '/api/shopify/products/monitored-example',
          shop,
          userId,
          requestId: req.headers.get('x-request-id') || undefined,
        }
      )
    },
    {
      method: 'GET',
      userAgent: req.headers.get('user-agent') || undefined,
    }
  )
}

/**
 * POST /api/shopify/products/monitored-example
 *
 * Update a product with monitoring
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      },
      { status: 401 }
    )
  }

  const body = await req.json()
  const { shop, productId, seo } = body

  if (!shop || !productId || !seo) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Missing required fields: shop, productId, seo',
        },
      },
      { status: 400 }
    )
  }

  // Track the entire operation
  return await trackAPICall(
    '/api/shopify/products/monitored-example',
    shop,
    userId,
    async () => {
      return await withErrorTracking(
        async () => {
          // Get connection
          const connection = await db.connection.findFirst({
            where: {
              userId,
              domain: shop,
              platform: 'SHOPIFY',
              status: 'CONNECTED',
            },
          })

          if (!connection) {
            return NextResponse.json(
              {
                success: false,
                error: { code: 'NOT_FOUND', message: 'Shopify connection not found' },
              },
              { status: 404 }
            )
          }

          // Update product SEO using GraphQL (automatically monitored)
          const mutation = `
            mutation updateProductSEO($input: ProductInput!) {
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
              product: { id: string; seo: { title: string; description: string } }
              userErrors: Array<{ field: string[]; message: string }>
            }
          }>(
            connection,
            mutation,
            {
              input: {
                id: `gid://shopify/Product/${productId}`,
                seo,
              },
            }
          )

          if (result.productUpdate.userErrors.length > 0) {
            const error = result.productUpdate.userErrors[0]
            return NextResponse.json(
              {
                success: false,
                error: {
                  code: 'SHOPIFY_ERROR',
                  message: error.message,
                  field: error.field.join('.'),
                },
              },
              { status: 400 }
            )
          }

          return NextResponse.json({
            success: true,
            data: {
              product: result.productUpdate.product,
            },
          })
        },
        {
          endpoint: '/api/shopify/products/monitored-example',
          shop,
          userId,
        }
      )
    },
    {
      method: 'POST',
      userAgent: req.headers.get('user-agent') || undefined,
    }
  )
}
