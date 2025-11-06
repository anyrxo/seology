/**
 * Shopify Session Token Verification
 *
 * Handles session token authentication for embedded Shopify apps
 */

import jwt from 'jsonwebtoken';

export interface ShopifySessionToken {
  iss: string; // Issuer (shop domain)
  dest: string; // Destination (shop domain)
  aud: string; // Audience (API key)
  sub: string; // Subject (user ID)
  exp: number; // Expiration
  nbf: number; // Not before
  iat: number; // Issued at
  jti: string; // JWT ID
  sid: string; // Session ID
}

/**
 * Verify Shopify session token (for embedded apps)
 */
export function verifySessionToken(
  token: string,
  clientSecret: string
): ShopifySessionToken | null {
  try {
    const decoded = jwt.verify(token, clientSecret, {
      algorithms: ['HS256'],
    }) as ShopifySessionToken;

    // Verify issuer matches destination
    if (decoded.iss !== decoded.dest) {
      console.error('Session token: issuer does not match destination');
      return null;
    }

    // Verify audience (should be your Shopify API key)
    const apiKey = process.env.SHOPIFY_CLIENT_ID || process.env.NEXT_PUBLIC_SHOPIFY_API_KEY;
    if (decoded.aud !== apiKey) {
      console.error('Session token: invalid audience');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Session token verification failed:', error);
    return null;
  }
}

/**
 * Extract shop domain from session token
 */
export function getShopFromToken(token: string): string | null {
  try {
    const decoded = jwt.decode(token) as ShopifySessionToken;
    return decoded?.dest || null;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as ShopifySessionToken;
    if (!decoded || !decoded.exp) return true;

    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * Middleware to verify session token from request headers
 */
export function getSessionTokenFromHeader(
  authHeader: string | null
): string | null {
  if (!authHeader) return null;

  // Bearer token format: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}
