/**
 * Shopify HMAC Verification
 *
 * Verifies requests from Shopify using HMAC signatures for security
 */

import crypto from 'crypto';

export interface ShopifyQueryParams {
  [key: string]: string;
}

/**
 * Verify Shopify HMAC signature
 * Used for OAuth callbacks and app installation flows
 */
export function verifyShopifyHMAC(
  query: ShopifyQueryParams,
  secret: string
): boolean {
  const { hmac, ...params } = query;

  if (!hmac) {
    return false;
  }

  // Create message string from params (sorted alphabetically)
  const message = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  // Generate HMAC
  const generatedHash = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');

  try {
    // Timing-safe comparison
    return crypto.timingSafeEqual(
      Buffer.from(hmac),
      Buffer.from(generatedHash)
    );
  } catch (error) {
    console.error('HMAC verification error:', error);
    return false;
  }
}

/**
 * Verify Shopify webhook HMAC
 * Used for webhook endpoints
 */
export function verifyShopifyWebhook(
  body: string,
  hmacHeader: string,
  secret: string
): boolean {
  const generatedHash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(hmacHeader),
      Buffer.from(generatedHash)
    );
  } catch (error) {
    console.error('Webhook HMAC verification error:', error);
    return false;
  }
}

/**
 * Verify proxy request from Shopify storefront
 * Used for app proxy endpoints
 */
export function verifyShopifyProxyRequest(
  query: ShopifyQueryParams,
  secret: string
): boolean {
  const { signature, ...params } = query;

  if (!signature) {
    return false;
  }

  // Create message string
  const message = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('');

  // Generate signature
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(generatedSignature)
    );
  } catch (error) {
    console.error('Proxy signature verification error:', error);
    return false;
  }
}
