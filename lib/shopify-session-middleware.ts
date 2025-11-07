/**
 * Shopify Session Token Middleware
 * Verifies session tokens from embedded Shopify apps
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from './shopify-session-token'
import { db } from './db'

export interface ShopifySessionContext {
  shop: string
  userId: string
  sessionToken: string
  connection: {
    id: string
    accessToken: string
    domain: string
  }
}

/**
 * Middleware to verify Shopify session tokens
 * Returns null if verification fails, context if successful
 */
export async function withShopifySession(
  req: NextRequest
): Promise<{ success: true; context: ShopifySessionContext } | { success: false; response: NextResponse }> {
  try {
    // Verify session token from Authorization header
    const tokenPayload = await verifySessionToken(req)

    if (!tokenPayload) {
      return {
        success: false,
        response: NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_SESSION_TOKEN',
              message: 'Invalid or missing session token',
            },
          },
          { status: 401 }
        ),
      }
    }

    // Extract shop domain from dest URL
    const shop = new URL(tokenPayload.dest).hostname

    // Find connection by shop domain
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      select: {
        id: true,
        userId: true,
        accessToken: true,
        domain: true,
      },
    })

    if (!connection || !connection.accessToken) {
      return {
        success: false,
        response: NextResponse.json(
          {
            success: false,
            error: {
              code: 'NO_CONNECTION',
              message: 'Shop not connected or missing access token',
            },
          },
          { status: 404 }
        ),
      }
    }

    // Decrypt access token (already handled by Prisma middleware)
    return {
      success: true,
      context: {
        shop,
        userId: connection.userId,
        sessionToken: tokenPayload.jti,
        connection: {
          id: connection.id,
          accessToken: connection.accessToken,
          domain: connection.domain,
        },
      },
    }
  } catch (error) {
    console.error('Session verification error:', error)
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: 'SESSION_ERROR',
            message: 'Failed to verify session',
          },
        },
        { status: 500 }
      ),
    }
  }
}

/**
 * Fallback to shop parameter for non-embedded requests
 * Used during development and for external API calls
 */
export async function withShopParameter(
  req: NextRequest
): Promise<{ success: true; context: ShopifySessionContext } | { success: false; response: NextResponse }> {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return {
        success: false,
        response: NextResponse.json(
          {
            success: false,
            error: {
              code: 'MISSING_SHOP',
              message: 'Shop parameter required',
            },
          },
          { status: 400 }
        ),
      }
    }

    // Find connection by shop domain
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      select: {
        id: true,
        userId: true,
        accessToken: true,
        domain: true,
      },
    })

    if (!connection || !connection.accessToken) {
      return {
        success: false,
        response: NextResponse.json(
          {
            success: false,
            error: {
              code: 'NO_CONNECTION',
              message: 'Shop not connected or missing access token',
            },
          },
          { status: 404 }
        ),
      }
    }

    return {
      success: true,
      context: {
        shop,
        userId: connection.userId,
        sessionToken: '', // No session token in fallback mode
        connection: {
          id: connection.id,
          accessToken: connection.accessToken,
          domain: connection.domain,
        },
      },
    }
  } catch (error) {
    console.error('Shop parameter error:', error)
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: 'PARAMETER_ERROR',
            message: 'Failed to process shop parameter',
          },
        },
        { status: 500 }
      ),
    }
  }
}

/**
 * Unified middleware that tries session token first, falls back to shop parameter
 */
export async function withShopifyAuth(
  req: NextRequest
): Promise<{ success: true; context: ShopifySessionContext } | { success: false; response: NextResponse }> {
  // Try session token first (for embedded apps)
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return await withShopifySession(req)
  }

  // Fallback to shop parameter (for development/external)
  return await withShopParameter(req)
}
