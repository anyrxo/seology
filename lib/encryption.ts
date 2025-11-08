/**
 * Encryption Utilities
 *
 * Securely encrypt and decrypt sensitive data like CMS access tokens
 * Uses AES-256-GCM for encryption
 */

import * as crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const SALT_LENGTH = 64
const TAG_LENGTH = 16
const KEY_LENGTH = 32

// Get encryption key from environment
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ''

if (ENCRYPTION_KEY && ENCRYPTION_KEY.length < 32) {
  throw new Error('ENCRYPTION_KEY must be at least 32 characters long in environment variables')
}

// Fail in production if encryption key is missing
if (!ENCRYPTION_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('ENCRYPTION_KEY is required in production environment')
}

// Only use fallback key during build (not production runtime)
// During build, Next.js may not have access to .env.local
if (!ENCRYPTION_KEY && typeof window === 'undefined' && process.env.VERCEL !== '1') {
  // Only warn during build, don't throw
  console.warn('Warning: ENCRYPTION_KEY not set. Using placeholder for build.')
}

const EFFECTIVE_KEY = ENCRYPTION_KEY || 'dev_key_for_build_only_32_chars_min'

/**
 * Derive a key from the master key and salt
 */
function deriveKey(salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(
    EFFECTIVE_KEY,
    salt,
    100000,
    KEY_LENGTH,
    'sha512'
  )
}

/**
 * Encrypt a string value
 * Returns base64 encoded string: salt:iv:tag:encrypted
 */
export function encrypt(text: string): string {
  // Generate random salt and IV
  const salt = crypto.randomBytes(SALT_LENGTH)
  const iv = crypto.randomBytes(IV_LENGTH)

  // Derive key from master key and salt
  const key = deriveKey(salt)

  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  // Encrypt
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  // Get auth tag
  const tag = cipher.getAuthTag()

  // Combine salt:iv:tag:encrypted and encode as base64
  const combined = Buffer.concat([
    salt,
    iv,
    tag,
    Buffer.from(encrypted, 'hex')
  ])

  return combined.toString('base64')
}

/**
 * Decrypt an encrypted string
 * Expects base64 encoded string: salt:iv:tag:encrypted
 */
export function decrypt(encryptedData: string): string {
  // Decode from base64
  const combined = Buffer.from(encryptedData, 'base64')

  // Extract components
  const salt = combined.subarray(0, SALT_LENGTH)
  const iv = combined.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
  const tag = combined.subarray(
    SALT_LENGTH + IV_LENGTH,
    SALT_LENGTH + IV_LENGTH + TAG_LENGTH
  )
  const encrypted = combined.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH)

  // Derive key from master key and salt
  const key = deriveKey(salt)

  // Create decipher
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)

  // Decrypt
  let decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

/**
 * Generate a random encryption key
 * Used for generating ENCRYPTION_KEY for .env
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('hex')
}
