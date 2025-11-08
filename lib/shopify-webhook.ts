/**
 * Shopify Webhook Verification and Handling
 *
 * Utilities for verifying and processing Shopify webhooks
 */

import crypto from 'crypto'

/**
 * Verify Shopify webhook HMAC signature
 * Uses timing-safe comparison to prevent timing attacks
 */
export function verifyWebhook(
  body: string,
  hmacHeader: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64')

  try {
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(hmacHeader)
    )
  } catch (error) {
    // timingSafeEqual throws if buffers have different lengths
    return false
  }
}

/**
 * Extract shop domain from webhook headers
 */
export function getShopDomain(headers: Headers): string | null {
  return headers.get('x-shopify-shop-domain')
}

/**
 * Get webhook topic from headers
 */
export function getWebhookTopic(headers: Headers): string | null {
  return headers.get('x-shopify-topic')
}

/**
 * Webhook event types
 */
export type WebhookTopic =
  | 'products/create'
  | 'products/update'
  | 'products/delete'
  | 'collections/create'
  | 'collections/update'
  | 'collections/delete'
  | 'shop/update'
  | 'app/uninstalled'

/**
 * Product webhook payload
 */
export interface ProductWebhookPayload {
  id: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  handle: string
  status: string
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
  admin_graphql_api_id: string
}

/**
 * Collection webhook payload
 */
export interface CollectionWebhookPayload {
  id: number
  title: string
  body_html: string
  handle: string
  published_at: string | null
  admin_graphql_api_id: string
}

/**
 * Shop update webhook payload
 */
export interface ShopWebhookPayload {
  id: number
  name: string
  email: string
  domain: string
  myshopify_domain: string
  plan_name: string
  plan_display_name: string
}

/**
 * App uninstalled webhook payload
 */
export interface AppUninstalledPayload {
  id: number
  name: string
  email: string
  domain: string
  myshopify_domain: string
}
