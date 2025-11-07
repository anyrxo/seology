/**
 * Example: Using Type-Safe GraphQL Client
 *
 * This file demonstrates how to use the automated GraphQL type generation
 * system with the Shopify Admin API.
 */

import { Connection } from '@prisma/client'
import { executeTypedQuery, executeTypedMutation, buildGID, throwIfUserErrors } from '@/lib/shopify-graphql-typed'
import { GET_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT_SEO } from '@/lib/shopify-queries'

// Import generated types
// These are auto-generated from Shopify's GraphQL schema
import type {
  Product,
  ProductConnection,
  ProductUpdatePayload,
  Seo,
  Maybe,
} from '@/types/shopify-graphql.generated'

/**
 * Example 1: Fetch a single product with full type safety
 */
export async function fetchProductExample(connection: Connection, productId: string) {
  // Define the expected response structure
  type GetProductResponse = {
    product: Maybe<Product>
  }

  // Execute typed query
  const result = await executeTypedQuery<GetProductResponse>(
    connection,
    GET_PRODUCT,
    { id: buildGID('Product', productId) }
  )

  if (!result.product) {
    throw new Error('Product not found')
  }

  // ✅ Full autocomplete and type checking!
  console.log('Product Title:', result.product.title)
  console.log('Product Handle:', result.product.handle)
  console.log('SEO Title:', result.product.seo?.title)
  console.log('SEO Description:', result.product.seo?.description)

  // Access images with type safety
  result.product.images?.edges?.forEach(({ node: image }) => {
    console.log('Image URL:', image.url)
    console.log('Alt Text:', image.altText)
  })

  return result.product
}

/**
 * Example 2: Fetch multiple products with pagination
 */
export async function fetchProductsExample(connection: Connection, limit: number = 10) {
  type GetProductsResponse = {
    products: ProductConnection
  }

  const result = await executeTypedQuery<GetProductsResponse>(
    connection,
    GET_PRODUCTS,
    { first: limit }
  )

  // ✅ Type-safe access to products and pagination info
  const products = result.products.edges?.map(({ node }) => node) || []
  const hasNextPage = result.products.pageInfo.hasNextPage
  const endCursor = result.products.pageInfo.endCursor

  console.log(`Fetched ${products.length} products`)
  console.log(`Has next page: ${hasNextPage}`)
  console.log(`End cursor: ${endCursor}`)

  return {
    products,
    hasNextPage,
    endCursor,
  }
}

/**
 * Example 3: Update product SEO with mutation
 */
export async function updateProductSEOExample(
  connection: Connection,
  productId: string,
  seoData: { title: string; description: string }
) {
  type UpdateProductSEOResponse = {
    productUpdate: ProductUpdatePayload
  }

  const result = await executeTypedMutation<UpdateProductSEOResponse>(
    connection,
    UPDATE_PRODUCT_SEO,
    {
      input: {
        id: buildGID('Product', productId),
        seo: seoData,
      },
    }
  )

  // ✅ Check for user errors (type-safe)
  throwIfUserErrors(result.productUpdate.userErrors)

  // ✅ Access updated product
  const updatedProduct = result.productUpdate.product
  console.log('Updated SEO Title:', updatedProduct?.seo?.title)
  console.log('Updated SEO Description:', updatedProduct?.seo?.description)

  return updatedProduct
}

/**
 * Example 4: Pagination helper function
 */
export async function fetchAllProducts(connection: Connection) {
  const allProducts: Product[] = []
  let hasNextPage = true
  let cursor: string | null | undefined = null

  type GetProductsResponse = {
    products: ProductConnection
  }

  while (hasNextPage) {
    const result: GetProductsResponse = await executeTypedQuery<GetProductsResponse>(
      connection,
      GET_PRODUCTS,
      {
        first: 50,
        ...(cursor ? { after: cursor } : {}),
      }
    )

    // ✅ Type-safe pagination handling
    const products = result.products.edges?.map(({ node }: { node: Product }) => node) || []
    allProducts.push(...products)

    hasNextPage = result.products.pageInfo.hasNextPage
    cursor = result.products.pageInfo.endCursor
  }

  console.log(`Fetched ${allProducts.length} total products`)
  return allProducts
}

/**
 * Example 5: Error handling
 */
export async function robustProductFetch(connection: Connection, productId: string) {
  try {
    type GetProductResponse = {
      product: Maybe<Product>
    }

    const result = await executeTypedQuery<GetProductResponse>(
      connection,
      GET_PRODUCT,
      { id: buildGID('Product', productId) }
    )

    if (!result.product) {
      return {
        success: false,
        error: 'Product not found',
      }
    }

    return {
      success: true,
      data: result.product,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Example 6: Complex type inference
 */
export async function getProductSEOStatus(connection: Connection, productId: string) {
  type GetProductResponse = {
    product: Maybe<Product>
  }

  const result = await executeTypedQuery<GetProductResponse>(
    connection,
    GET_PRODUCT,
    { id: buildGID('Product', productId) }
  )

  const product = result.product

  if (!product) {
    return null
  }

  // ✅ TypeScript knows all these fields exist and their types
  return {
    productId: product.id,
    title: product.title,
    seoTitle: product.seo?.title,
    seoDescription: product.seo?.description,
    hasSEOTitle: !!product.seo?.title,
    hasSEODescription: !!product.seo?.description,
    needsSEOOptimization:
      !product.seo?.title ||
      !product.seo?.description ||
      product.seo.title.length < 30 ||
      product.seo.description.length < 100,
  }
}
