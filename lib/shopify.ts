/**
 * Shopify Integration
 * Complete OAuth flow and SEO fix application for Shopify stores
 */

import { Connection } from '@prisma/client'
import { decrypt } from './encryption'
import { db } from './db'

interface ShopifyFixResult {
  success: boolean
  message: string
  data?: unknown
}

interface ShopifyProduct {
  id: number
  title: string
  body_html: string
  handle: string
  metafields_global_title_tag?: string
  metafields_global_description_tag?: string
}

interface ShopifyPage {
  id: number
  title: string
  body_html: string
  handle: string
  metafields?: Array<{
    key: string
    value: string
    namespace: string
  }>
}

/**
 * Shopify API client
 */
class ShopifyAPI {
  private shop: string
  private accessToken: string

  constructor(shop: string, accessToken: string) {
    this.shop = shop
    this.accessToken = accessToken
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `https://${this.shop}/admin/api/2024-10/graphql.json`

    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Shopify-Access-Token': this.accessToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getProduct(productId: string): Promise<ShopifyProduct> {
    const query = `
      query {
        product(id: "gid://shopify/Product/${productId}") {
          id
          title
          descriptionHtml
          handle
          seo {
            title
            description
          }
        }
      }
    `

    const result = await this.request('/admin/api/2024-10/graphql.json', {
      method: 'POST',
      body: JSON.stringify({ query }),
    })

    return result.data.product
  }

  async updateProductSEO(productId: string, seo: { title?: string; description?: string }) {
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
        id: `gid://shopify/Product/${productId}`,
        seo: {
          title: seo.title,
          description: seo.description,
        },
      },
    }

    const result = await this.request('/admin/api/2024-10/graphql.json', {
      method: 'POST',
      body: JSON.stringify({ query: mutation, variables }),
    })

    if (result.data.productUpdate.userErrors.length > 0) {
      throw new Error(result.data.productUpdate.userErrors[0].message)
    }

    return result.data.productUpdate.product
  }

  async createRedirect(path: string, target: string) {
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

    const variables = {
      redirect: {
        path,
        target,
      },
    }

    const result = await this.request('/admin/api/2024-10/graphql.json', {
      method: 'POST',
      body: JSON.stringify({ query: mutation, variables }),
    })

    if (result.data.redirectCreate.userErrors.length > 0) {
      throw new Error(result.data.redirectCreate.userErrors[0].message)
    }

    return result.data.redirectCreate.redirect
  }

  async updatePage(pageId: string, updates: { title?: string; bodyHtml?: string }) {
    const mutation = `
      mutation pageUpdate($id: ID!, $page: PageInput!) {
        pageUpdate(id: $id, page: $page) {
          page {
            id
            title
            bodySummary
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      id: `gid://shopify/Page/${pageId}`,
      page: updates,
    }

    const result = await this.request('/admin/api/2024-10/graphql.json', {
      method: 'POST',
      body: JSON.stringify({ query: mutation, variables }),
    })

    if (result.data.pageUpdate.userErrors.length > 0) {
      throw new Error(result.data.pageUpdate.userErrors[0].message)
    }

    return result.data.pageUpdate.page
  }

  async updateMetafield(
    ownerId: string,
    ownerType: 'PRODUCT' | 'PAGE' | 'COLLECTION',
    key: string,
    value: string,
    namespace: string = 'custom'
  ) {
    const mutation = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
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

    const variables = {
      metafields: [
        {
          ownerId: `gid://shopify/${ownerType}/${ownerId}`,
          namespace,
          key,
          value,
          type: 'single_line_text_field',
        },
      ],
    }

    const result = await this.request('/admin/api/2024-10/graphql.json', {
      method: 'POST',
      body: JSON.stringify({ query: mutation, variables }),
    })

    if (result.data.metafieldsSet.userErrors.length > 0) {
      throw new Error(result.data.metafieldsSet.userErrors[0].message)
    }

    return result.data.metafieldsSet.metafields[0]
  }
}

/**
 * Apply an SEO fix to a Shopify store
 */
export async function applyShopifyFix(
  connection: Connection,
  issue: { id: string; type: string; pageUrl: string; details: string },
  fixCode: string
): Promise<ShopifyFixResult> {
  try {
    if (!connection.accessToken) {
      throw new Error('No access token found for Shopify connection')
    }

    // Decrypt access token
    const accessToken = decrypt(connection.accessToken)

    // Create Shopify API client
    const shopify = new ShopifyAPI(connection.domain, accessToken)

    // Parse fix code to determine what action to take
    const fixData = JSON.parse(fixCode)

    switch (issue.type) {
      case 'missing_meta_title':
      case 'missing_meta_description':
      case 'poor_meta_description': {
        // Update product SEO
        const productId = extractIdFromUrl(issue.pageUrl)
        await shopify.updateProductSEO(productId, {
          title: fixData.title,
          description: fixData.description,
        })
        return {
          success: true,
          message: 'Product SEO updated successfully',
        }
      }

      case 'broken_link':
      case '404_error': {
        // Create redirect
        await shopify.createRedirect(fixData.from, fixData.to)
        return {
          success: true,
          message: 'Redirect created successfully',
        }
      }

      case 'missing_h1':
      case 'duplicate_h1':
      case 'poor_content': {
        // Update page content
        const pageId = extractIdFromUrl(issue.pageUrl)
        await shopify.updatePage(pageId, {
          bodyHtml: fixData.bodyHtml,
        })
        return {
          success: true,
          message: 'Page content updated successfully',
        }
      }

      case 'missing_schema':
      case 'missing_structured_data': {
        // Add metafield for structured data
        const resourceId = extractIdFromUrl(issue.pageUrl)
        const resourceType = determineResourceType(issue.pageUrl)
        await shopify.updateMetafield(
          resourceId,
          resourceType,
          'structured_data',
          fixData.schemaJson,
          'seo'
        )
        return {
          success: true,
          message: 'Structured data added successfully',
        }
      }

      default:
        throw new Error(`Unsupported fix type: ${issue.type}`)
    }
  } catch (error) {
    console.error('Shopify fix error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Extract resource ID from Shopify URL
 */
function extractIdFromUrl(url: string): string {
  // Extract ID from URL like /products/123 or /pages/456
  const match = url.match(/\/(products|pages|collections)\/(\d+)/)
  return match ? match[2] : ''
}

/**
 * Determine resource type from URL
 */
function determineResourceType(url: string): 'PRODUCT' | 'PAGE' | 'COLLECTION' {
  if (url.includes('/products/')) return 'PRODUCT'
  if (url.includes('/pages/')) return 'PAGE'
  if (url.includes('/collections/')) return 'COLLECTION'
  return 'PRODUCT' // default
}

/**
 * Generate OAuth URL for Shopify
 */
export function generateShopifyOAuthUrl(
  shop: string,
  state: string,
  redirectUri: string
): string {
  const clientId = process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5'
  const scopes = 'read_products,write_products,read_content,write_content,read_themes,write_themes'

  const params = new URLSearchParams({
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    state,
  })

  return `https://${shop}/admin/oauth/authorize?${params.toString()}`
}

/**
 * Exchange OAuth code for access token
 */
export async function exchangeShopifyOAuthCode(
  shop: string,
  code: string
): Promise<string> {
  const clientId = process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5'
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET

  if (!clientSecret) {
    throw new Error('SHOPIFY_CLIENT_SECRET not configured')
  }

  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to exchange code: ${response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}
