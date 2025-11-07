/**
 * Type-Safe Shopify GraphQL Client
 *
 * Wrapper around shopify-graphql.ts that provides full type safety
 * using generated types from GraphQL Code Generator.
 *
 * USAGE:
 *   import { executeTypedQuery, executeTypedMutation } from '@/lib/shopify-graphql-typed'
 *   import { GET_PRODUCT } from '@/lib/shopify-queries'
 *
 *   const result = await executeTypedQuery<GetProductQuery, GetProductQueryVariables>(
 *     connection,
 *     GET_PRODUCT,
 *     { id: 'gid://shopify/Product/123' }
 *   )
 *
 *   // result.product is now fully typed!
 *
 * After running `npm run graphql:generate`, import the generated types:
 *   import type { GetProductQuery, GetProductQueryVariables } from '@/types/shopify-graphql.generated'
 */

import { Connection } from '@prisma/client'
import { shopifyGraphQL, shopifyGraphQLWithConnection } from './shopify-graphql'

/**
 * Execute a typed GraphQL query with a Connection object
 *
 * @template TData - The expected response data type
 * @template TVariables - The query variables type
 * @param connection - Shopify connection from database
 * @param query - GraphQL query string
 * @param variables - Query variables (optional)
 * @returns Typed response data
 *
 * @example
 * ```ts
 * import type { GetProductQuery, GetProductQueryVariables } from '@/types/shopify-graphql.generated'
 * import { GET_PRODUCT } from '@/lib/shopify-queries'
 *
 * const result = await executeTypedQuery<GetProductQuery, GetProductQueryVariables>(
 *   connection,
 *   GET_PRODUCT,
 *   { id: 'gid://shopify/Product/123' }
 * )
 *
 * console.log(result.product.title) // Fully typed!
 * ```
 */
export async function executeTypedQuery<
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>
>(
  connection: Connection,
  query: string,
  variables?: TVariables
): Promise<TData> {
  return shopifyGraphQLWithConnection<TData>(connection, query, variables)
}

/**
 * Execute a typed GraphQL mutation with a Connection object
 *
 * @template TData - The expected response data type
 * @template TVariables - The mutation variables type
 * @param connection - Shopify connection from database
 * @param mutation - GraphQL mutation string
 * @param variables - Mutation variables
 * @returns Typed response data
 *
 * @example
 * ```ts
 * import type { UpdateProductSeoMutation, UpdateProductSeoMutationVariables } from '@/types/shopify-graphql.generated'
 * import { UPDATE_PRODUCT_SEO } from '@/lib/shopify-queries'
 *
 * const result = await executeTypedMutation<UpdateProductSeoMutation, UpdateProductSeoMutationVariables>(
 *   connection,
 *   UPDATE_PRODUCT_SEO,
 *   {
 *     input: {
 *       id: 'gid://shopify/Product/123',
 *       seo: {
 *         title: 'New SEO Title',
 *         description: 'New SEO Description'
 *       }
 *     }
 *   }
 * )
 *
 * if (result.productUpdate.userErrors.length > 0) {
 *   throw new Error(result.productUpdate.userErrors[0].message)
 * }
 *
 * console.log(result.productUpdate.product.seo.title) // Fully typed!
 * ```
 */
export async function executeTypedMutation<
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>
>(
  connection: Connection,
  mutation: string,
  variables: TVariables
): Promise<TData> {
  return shopifyGraphQLWithConnection<TData>(connection, mutation, variables)
}

/**
 * Execute a typed GraphQL query with direct shop/token credentials
 *
 * @template TData - The expected response data type
 * @template TVariables - The query variables type
 * @param shop - Shop domain (e.g., 'mystore.myshopify.com')
 * @param accessToken - Shopify access token
 * @param query - GraphQL query string
 * @param variables - Query variables (optional)
 * @returns Typed response data
 */
export async function executeTypedQueryDirect<
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>
>(
  shop: string,
  accessToken: string,
  query: string,
  variables?: TVariables
): Promise<TData> {
  return shopifyGraphQL<TData>(shop, accessToken, query, variables)
}

/**
 * Execute a typed GraphQL mutation with direct shop/token credentials
 *
 * @template TData - The expected response data type
 * @template TVariables - The mutation variables type
 * @param shop - Shop domain (e.g., 'mystore.myshopify.com')
 * @param accessToken - Shopify access token
 * @param mutation - GraphQL mutation string
 * @param variables - Mutation variables
 * @returns Typed response data
 */
export async function executeTypedMutationDirect<
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>
>(
  shop: string,
  accessToken: string,
  mutation: string,
  variables: TVariables
): Promise<TData> {
  return shopifyGraphQL<TData>(shop, accessToken, mutation, variables)
}

// =============================================================================
// HELPER: Build Shopify Global ID (GID)
// =============================================================================

/**
 * Build a Shopify Global ID (GID) from a resource type and numeric ID
 *
 * @param resourceType - The Shopify resource type (e.g., 'Product', 'Collection')
 * @param id - The numeric ID or full GID string
 * @returns Formatted Global ID string
 *
 * @example
 * ```ts
 * buildGID('Product', '123')           // => 'gid://shopify/Product/123'
 * buildGID('Product', 123)             // => 'gid://shopify/Product/123'
 * buildGID('Product', 'gid://shopify/Product/123') // => 'gid://shopify/Product/123' (idempotent)
 * ```
 */
export function buildGID(resourceType: string, id: string | number): string {
  // If already a GID, return as-is
  if (typeof id === 'string' && id.startsWith('gid://')) {
    return id
  }

  return `gid://shopify/${resourceType}/${id}`
}

/**
 * Extract numeric ID from Shopify Global ID (GID)
 *
 * @param gid - The Global ID string
 * @returns Numeric ID as string
 *
 * @example
 * ```ts
 * extractIDFromGID('gid://shopify/Product/123')  // => '123'
 * extractIDFromGID('123')                        // => '123' (returns as-is if not GID)
 * ```
 */
export function extractIDFromGID(gid: string): string {
  if (!gid.startsWith('gid://')) {
    return gid
  }

  const parts = gid.split('/')
  return parts[parts.length - 1]
}

/**
 * Extract resource type from Shopify Global ID (GID)
 *
 * @param gid - The Global ID string
 * @returns Resource type string
 *
 * @example
 * ```ts
 * extractResourceTypeFromGID('gid://shopify/Product/123')  // => 'Product'
 * ```
 */
export function extractResourceTypeFromGID(gid: string): string | null {
  if (!gid.startsWith('gid://')) {
    return null
  }

  const parts = gid.split('/')
  return parts.length >= 4 ? parts[3] : null
}

// =============================================================================
// HELPER: Handle User Errors
// =============================================================================

/**
 * User error from Shopify GraphQL mutations
 */
export interface ShopifyUserError {
  field?: string[] | null
  message: string
}

/**
 * Check if a mutation response contains user errors and throw if found
 *
 * @param userErrors - Array of user errors from mutation response
 * @throws Error with user error message if errors exist
 *
 * @example
 * ```ts
 * const result = await executeTypedMutation(...)
 * throwIfUserErrors(result.productUpdate.userErrors)
 * // Safe to use result.productUpdate.product here
 * ```
 */
export function throwIfUserErrors(userErrors: ShopifyUserError[]): void {
  if (userErrors && userErrors.length > 0) {
    const error = userErrors[0]
    const field = error.field ? ` (${error.field.join('.')})` : ''
    throw new Error(`Shopify API Error: ${error.message}${field}`)
  }
}

/**
 * Get the first user error message or null
 *
 * @param userErrors - Array of user errors from mutation response
 * @returns Error message string or null
 */
export function getFirstUserError(userErrors: ShopifyUserError[]): string | null {
  if (userErrors && userErrors.length > 0) {
    return userErrors[0].message
  }
  return null
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Check if a value is a valid Shopify GID
 */
export function isShopifyGID(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('gid://shopify/')
}

/**
 * Check if a mutation result has user errors
 */
export function hasUserErrors(result: { userErrors?: ShopifyUserError[] }): boolean {
  return !!(result.userErrors && result.userErrors.length > 0)
}
