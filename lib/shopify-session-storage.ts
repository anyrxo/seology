/**
 * Shopify Session Storage
 * Based on Shopify's official session handling patterns
 * Adapted to work with our existing Prisma schema
 */

import { db } from './db'
import { encrypt, decrypt } from './encryption'

export interface ShopifySession {
  shop: string
  accessToken: string
  scope: string
  isOnline: boolean // true = user token, false = shop token
}

/**
 * Store a Shopify session
 * Uses existing Connection model (domain field stores shop)
 */
export async function storeSession(
  userId: string,
  session: ShopifySession
): Promise<void> {
  const { shop, accessToken } = session

  // Encrypt the access token
  const encryptedToken = encrypt(accessToken)

  // Check if connection already exists (using domain field for shop)
  const existingConnection = await db.connection.findFirst({
    where: {
      userId,
      domain: shop,
      platform: 'SHOPIFY',
    },
  })

  if (existingConnection) {
    // Update existing connection
    await db.connection.update({
      where: { id: existingConnection.id },
      data: {
        accessToken: encryptedToken,
        status: 'CONNECTED',
        lastSync: new Date(),
      },
    })
  } else {
    // Create new connection
    await db.connection.create({
      data: {
        userId,
        domain: shop,
        platform: 'SHOPIFY',
        accessToken: encryptedToken,
        displayName: shop.replace('.myshopify.com', ''),
        status: 'CONNECTED',
      },
    })
  }
}

/**
 * Retrieve a session by shop domain
 */
export async function retrieveSession(
  userId: string,
  shop: string
): Promise<ShopifySession | null> {
  const connection = await db.connection.findFirst({
    where: {
      userId,
      domain: shop,
      platform: 'SHOPIFY',
      status: 'CONNECTED',
    },
  })

  if (!connection || !connection.accessToken) {
    return null
  }

  // Decrypt access token
  const accessToken = decrypt(connection.accessToken)

  return {
    shop: connection.domain,
    accessToken,
    scope: '', // We don't store scope in our schema
    isOnline: false, // We use offline tokens
  }
}

/**
 * Check if a shop has a valid session
 */
export async function hasValidSession(
  userId: string,
  shop: string
): Promise<boolean> {
  const session = await retrieveSession(userId, shop)
  return session !== null
}

/**
 * Destroy a session (on app uninstall or revoke)
 */
export async function destroySession(
  userId: string,
  shop: string
): Promise<void> {
  await db.connection.updateMany({
    where: {
      userId,
      domain: shop,
      platform: 'SHOPIFY',
    },
    data: {
      status: 'DISCONNECTED',
      accessToken: null,
    },
  })
}

/**
 * Check if user is returning (has completed onboarding)
 */
export async function isReturningUser(
  userId: string,
  shop: string
): Promise<boolean> {
  // Check if user has completed onboarding
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { onboardingCompleted: true },
  })

  if (!user?.onboardingCompleted) {
    return false
  }

  // Also check if they have a valid connection
  return hasValidSession(userId, shop)
}
