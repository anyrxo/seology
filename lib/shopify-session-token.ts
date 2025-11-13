/**
 * Shopify Session Token Authentication
 *
 * Modern authentication for embedded apps using session tokens
 * Replaces long-lived OAuth access tokens with short-lived session tokens
 *
 * Documentation: context/shopify-docs/02-authentication-authorization.md
 */

import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { db } from './db'

interface SessionTokenPayload {
  iss: string // Issuer (shop domain with https://)
  dest: string // Destination (shop domain with https://)
  aud: string // Audience (Shopify API key)
  sub: string // Subject (user ID)
  exp: number // Expiration (unix timestamp)
  nbf: number // Not before (unix timestamp)
  iat: number // Issued at (unix timestamp)
  jti: string // JWT ID (unique identifier)
  sid: string // Session ID
}

/**
 * Verify session token from Authorization header
 * Returns decoded payload if valid, throws error if invalid
 */
export async function verifySessionToken(
  request: NextRequest
): Promise<SessionTokenPayload> {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header')
  }

  const token = authHeader.substring(7) // Remove "Bearer "

  // Decode JWT (base64url)
  const [headerB64, payloadB64, signatureB64] = token.split('.')

  if (!headerB64 || !payloadB64 || !signatureB64) {
    throw new Error('Invalid JWT format')
  }

  // Decode payload
  const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8')
  const payload: SessionTokenPayload = JSON.parse(payloadJson)

  // Verify expiration
  const now = Math.floor(Date.now() / 1000)
  if (payload.exp < now) {
    throw new Error('Session token expired')
  }

  // Verify not before
  if (payload.nbf > now) {
    throw new Error('Session token not yet valid')
  }

  // Verify audience (must match our API key)
  const apiKey = process.env.SHOPIFY_CLIENT_ID
  if (!apiKey) {
    throw new Error('SHOPIFY_CLIENT_ID not configured')
  }

  if (payload.aud !== apiKey) {
    throw new Error('Invalid audience')
  }

  // Verify signature
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET
  if (!clientSecret) {
    throw new Error('SHOPIFY_CLIENT_SECRET not configured')
  }

  const signatureInput = `${headerB64}.${payloadB64}`
  const expectedSignature = crypto
    .createHmac('sha256', clientSecret)
    .update(signatureInput)
    .digest('base64url')

  if (signatureB64 !== expectedSignature) {
    throw new Error('Invalid signature')
  }

  return payload
}

/**
 * Get shop domain from session token
 */
export function getShopFromToken(payload: SessionTokenPayload): string {
  // Extract shop domain from iss (e.g., "https://my-shop.myshopify.com")
  return payload.iss.replace('https://', '')
}

/**
 * Get user ID from session token
 */
export function getUserIdFromToken(payload: SessionTokenPayload): string {
  return payload.sub
}

/**
 * Middleware: Verify session token and attach shop + user info to request
 * Use this in API routes that require Shopify authentication
 *
 * @example
 * export async function GET(request: NextRequest) {
 *   const { shop, userId } = await requireSessionToken(request)
 *   // Now you have authenticated shop and user
 * }
 */
export async function requireSessionToken(
  request: NextRequest
): Promise<{ shop: string; userId: string; payload: SessionTokenPayload }> {
  try {
    const payload = await verifySessionToken(request)
    const shop = getShopFromToken(payload)
    const userId = getUserIdFromToken(payload)

    return { shop, userId, payload }
  } catch (error) {
    throw new Error(`Session token verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Get connection for authenticated shop
 * Combines session token verification with database lookup
 */
export async function getAuthenticatedConnection(request: NextRequest) {
  const { shop } = await requireSessionToken(request)

  const connection = await db.connection.findFirst({
    where: {
      platform: 'SHOPIFY',
      domain: shop,
      status: 'CONNECTED',
    },
    include: {
      user: true,
    },
  })

  if (!connection) {
    throw new Error(`No active connection found for shop: ${shop}`)
  }

  return connection
}

/**
 * Exchange session token for offline access token
 * Use this when the stored access token is invalid/expired
 *
 * Documentation: https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/token-exchange
 */
export async function exchangeSessionTokenForAccessToken(
  sessionToken: string,
  shop: string
): Promise<{ accessToken: string; scope: string }> {
  const clientId = process.env.SHOPIFY_CLIENT_ID
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('SHOPIFY_CLIENT_ID or SHOPIFY_CLIENT_SECRET not configured')
  }

  // Token exchange endpoint
  const tokenExchangeUrl = `https://${shop}/admin/oauth/access_token`

  const response = await fetch(tokenExchangeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token: sessionToken,
      subject_token_type: 'urn:ietf:params:oauth:token-type:id_token',
      requested_token_type: 'urn:shopify:params:oauth:token-type:offline-access-token',
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[Token Exchange] Failed:', response.status, errorText)
    throw new Error(`Token exchange failed: ${response.status} ${errorText}`)
  }

  const data = await response.json()

  if (!data.access_token) {
    throw new Error('No access token in token exchange response')
  }

  return {
    accessToken: data.access_token,
    scope: data.scope || '',
  }
}

/**
 * Verify HMAC signature on request (for non-embedded contexts)
 * Used during OAuth callback and initial app load
 */
export function verifyHMAC(
  queryParams: Record<string, string>,
  secret: string
): boolean {
  const hmac = queryParams.hmac
  if (!hmac) return false

  // Create message from sorted query params (excluding hmac and signature)
  const message = Object.keys(queryParams)
    .filter(key => key !== 'hmac' && key !== 'signature')
    .sort()
    .map(key => `${key}=${queryParams[key]}`)
    .join('&')

  // Calculate expected HMAC
  const expectedHmac = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex')

  return hmac === expectedHmac
}
