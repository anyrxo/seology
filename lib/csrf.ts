/**
 * CSRF Protection for OAuth Flows
 * Generates and validates cryptographically secure state tokens
 */

import crypto from 'crypto'
import { db } from './db'

interface CSRFToken {
  id: string
  userId: string
  token: string
  provider: string
  createdAt: Date
  expiresAt: Date
}

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('base64url')
}

/**
 * Store CSRF token in database for validation
 */
export async function storeCSRFToken(
  userId: string,
  token: string,
  provider: 'SHOPIFY' | 'WORDPRESS' | 'GOOGLE',
  expiresInMinutes: number = 10
): Promise<void> {
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000)

  // Clean up expired tokens for this user first
  await db.$executeRaw`
    DELETE FROM "CSRFToken"
    WHERE "userId" = ${userId}
    AND "expiresAt" < NOW()
  `

  // Store new token
  await db.$executeRaw`
    INSERT INTO "CSRFToken" ("id", "userId", "token", "provider", "expiresAt", "createdAt")
    VALUES (gen_random_uuid(), ${userId}, ${token}, ${provider}, ${expiresAt}, NOW())
  `
}

/**
 * Validate and consume CSRF token (one-time use)
 */
export async function validateCSRFToken(
  userId: string,
  token: string,
  provider: 'SHOPIFY' | 'WORDPRESS' | 'GOOGLE'
): Promise<boolean> {
  try {
    // Find and delete the token in a single transaction
    const result = await db.$executeRaw`
      DELETE FROM "CSRFToken"
      WHERE "userId" = ${userId}
      AND "token" = ${token}
      AND "provider" = ${provider}
      AND "expiresAt" > NOW()
      RETURNING *
    `

    return result > 0
  } catch (error) {
    console.error('CSRF token validation error:', error)
    return false
  }
}

/**
 * Clean up expired CSRF tokens (called by cron job)
 */
export async function cleanupExpiredCSRFTokens(): Promise<number> {
  const result = await db.$executeRaw`
    DELETE FROM "CSRFToken"
    WHERE "expiresAt" < NOW()
  `

  return result
}

/**
 * Generate OAuth state parameter with CSRF token
 */
export async function generateOAuthState(
  userId: string,
  provider: 'SHOPIFY' | 'WORDPRESS' | 'GOOGLE',
  additionalData?: Record<string, unknown>
): Promise<string> {
  const csrfToken = generateCSRFToken()

  // Store token in database
  await storeCSRFToken(userId, csrfToken, provider)

  // Encode state parameter
  const stateData = {
    token: csrfToken,
    userId,
    timestamp: Date.now(),
    ...additionalData,
  }

  return Buffer.from(JSON.stringify(stateData)).toString('base64url')
}

/**
 * Validate OAuth state parameter
 */
export async function validateOAuthState(
  state: string,
  provider: 'SHOPIFY' | 'WORDPRESS' | 'GOOGLE'
): Promise<{ valid: boolean; userId?: string; data?: Record<string, unknown> }> {
  try {
    // Decode state parameter
    const decoded = Buffer.from(state, 'base64url').toString('utf8')
    const stateData = JSON.parse(decoded)

    const { token, userId, timestamp, ...additionalData } = stateData

    if (!token || !userId || !timestamp) {
      return { valid: false }
    }

    // Check if state is not too old (10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      return { valid: false }
    }

    // Validate CSRF token
    const isValid = await validateCSRFToken(userId, token, provider)

    if (!isValid) {
      return { valid: false }
    }

    return {
      valid: true,
      userId,
      data: additionalData,
    }
  } catch (error) {
    console.error('OAuth state validation error:', error)
    return { valid: false }
  }
}
