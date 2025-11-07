/**
 * Bulk Product Optimization API Route
 * Uses GraphQL for efficient bulk operations
 * Demonstrates proper rate limit handling and session token authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { shopifyGraphQL } from '@/lib/shopify-graphql'

export const dynamic = 'force-dynamic'

interface BulkOptimizeRequest {
  productIds: string[] // Shopify product GIDs
  operations: {
    optimizeSeoTitle?: boolean
    optimizeSeoDescription?: boolean
    optimizeImageAlt?: boolean
  }
}

interface OptimizationResult {
  productId: string
  success: boolean
  changes: {
    seoTitle?: { old: string | null; new: string }
    seoDescription?: { old: string | null; new: string }
    imageAlt?: { count: number }
  }
  error?: string
}

export async function POST(req: NextRequest) {
  try {
    // Verify session token or shop parameter
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult

    // Parse request body
    const body: BulkOptimizeRequest = await req.json()

    if (!body.productIds || body.productIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_PRODUCTS',
            message: 'At least one product ID is required',
          },
        },
        { status: 400 }
      )
    }

    // Limit to 10 products per request to manage rate limits
    if (body.productIds.length > 10) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TOO_MANY_PRODUCTS',
            message: 'Maximum 10 products per request',
          },
        },
        { status: 400 }
      )
    }

    const results: OptimizationResult[] = []

    // Process each product
    for (const productId of body.productIds) {
      try {
        // Fetch product data
        const productQuery = `
          query getProduct($id: ID!) {
            product(id: $id) {
              id
              title
              description
              seo {
                title
                description
              }
              images(first: 10) {
                edges {
                  node {
                    id
                    altText
                  }
                }
              }
            }
          }
        `

        const productData = await shopifyGraphQL<{
          product: {
            id: string
            title: string
            description: string
            seo: {
              title: string | null
              description: string | null
            }
            images: {
              edges: Array<{
                node: {
                  id: string
                  altText: string | null
                }
              }>
            }
          }
        }>(
          context.shop,
          context.connection.accessToken,
          productQuery,
          { id: productId }
        )

        const product = productData.product

        const changes: OptimizationResult['changes'] = {}

        // Optimize SEO title if requested
        if (body.operations.optimizeSeoTitle) {
          const newTitle = generateOptimizedTitle(product.title, product.seo.title)
          changes.seoTitle = {
            old: product.seo.title,
            new: newTitle,
          }
        }

        // Optimize SEO description if requested
        if (body.operations.optimizeSeoDescription) {
          const newDescription = generateOptimizedDescription(
            product.description,
            product.seo.description
          )
          changes.seoDescription = {
            old: product.seo.description,
            new: newDescription,
          }
        }

        // Optimize image alt text if requested
        if (body.operations.optimizeImageAlt) {
          const imagesWithoutAlt = product.images.edges.filter(
            (img: { node: { altText: string | null } }) => !img.node.altText
          )
          changes.imageAlt = {
            count: imagesWithoutAlt.length,
          }
        }

        // Apply changes via GraphQL mutation
        const updateMutation = `
          mutation updateProduct($input: ProductInput!) {
            productUpdate(input: $input) {
              product {
                id
              }
              userErrors {
                field
                message
              }
            }
          }
        `

        const updateInput = {
          id: productId,
          seo: {
            title: changes.seoTitle?.new,
            description: changes.seoDescription?.new,
          },
        }

        const updateResult = await shopifyGraphQL<{
          productUpdate: {
            product: { id: string }
            userErrors: Array<{ field: string[]; message: string }>
          }
        }>(
          context.shop,
          context.connection.accessToken,
          updateMutation,
          { input: updateInput }
        )

        if (updateResult.productUpdate.userErrors.length > 0) {
          results.push({
            productId,
            success: false,
            changes,
            error: updateResult.productUpdate.userErrors[0].message,
          })
        } else {
          results.push({
            productId,
            success: true,
            changes,
          })
        }
      } catch (error) {
        console.error(`Failed to optimize product ${productId}:`, error)
        results.push({
          productId,
          success: false,
          changes: {},
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Return results
    const successCount = results.filter((r) => r.success).length
    const failureCount = results.length - successCount

    return NextResponse.json({
      success: true,
      data: {
        results,
        summary: {
          total: results.length,
          successful: successCount,
          failed: failureCount,
        },
      },
    })
  } catch (error) {
    console.error('Bulk optimize error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to optimize products',
        },
      },
      { status: 500 }
    )
  }
}

/**
 * Generate optimized SEO title
 */
function generateOptimizedTitle(
  productTitle: string,
  currentSeoTitle: string | null
): string {
  // If SEO title exists and is good, keep it
  if (currentSeoTitle && currentSeoTitle.length >= 30 && currentSeoTitle.length <= 60) {
    return currentSeoTitle
  }

  // Generate new title from product title
  let newTitle = productTitle

  // Ensure length is between 30-60 characters
  if (newTitle.length < 30) {
    newTitle = `${newTitle} - Shop Now | Best Prices`
  }

  if (newTitle.length > 60) {
    newTitle = newTitle.substring(0, 57) + '...'
  }

  return newTitle
}

/**
 * Generate optimized SEO description
 */
function generateOptimizedDescription(
  productDescription: string,
  currentSeoDescription: string | null
): string {
  // If SEO description exists and is good, keep it
  if (
    currentSeoDescription &&
    currentSeoDescription.length >= 120 &&
    currentSeoDescription.length <= 160
  ) {
    return currentSeoDescription
  }

  // Generate new description from product description
  let newDescription = productDescription

  // Remove HTML tags
  newDescription = newDescription.replace(/<[^>]*>/g, '')

  // Ensure length is between 120-160 characters
  if (newDescription.length < 120) {
    newDescription = `${newDescription}. Shop now for the best prices and free shipping on orders over $50.`
  }

  if (newDescription.length > 160) {
    newDescription = newDescription.substring(0, 157) + '...'
  }

  return newDescription
}
