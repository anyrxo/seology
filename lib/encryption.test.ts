/**
 * Unit Tests: Encryption Utilities
 * Tests AES-256-GCM encryption/decryption
 */

import { encrypt, decrypt, generateEncryptionKey } from './encryption'

describe('encryption', () => {
  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt a string successfully', () => {
      const originalText = 'sensitive_api_token_12345'

      const encrypted = encrypt(originalText)
      const decrypted = decrypt(encrypted)

      expect(decrypted).toBe(originalText)
      expect(encrypted).not.toBe(originalText)
    })

    it('should produce different ciphertext for same input (due to random salt/IV)', () => {
      const text = 'test_token'

      const encrypted1 = encrypt(text)
      const encrypted2 = encrypt(text)

      expect(encrypted1).not.toBe(encrypted2)
      expect(decrypt(encrypted1)).toBe(text)
      expect(decrypt(encrypted2)).toBe(text)
    })

    it('should handle empty strings', () => {
      const encrypted = encrypt('')
      const decrypted = decrypt(encrypted)

      expect(decrypted).toBe('')
    })

    it('should handle long strings', () => {
      const longText = 'a'.repeat(10000)

      const encrypted = encrypt(longText)
      const decrypted = decrypt(encrypted)

      expect(decrypted).toBe(longText)
    })

    it('should handle special characters', () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

      const encrypted = encrypt(specialText)
      const decrypted = decrypt(encrypted)

      expect(decrypted).toBe(specialText)
    })

    it('should handle unicode characters', () => {
      const unicodeText = '你好世界 🌟 émojis & spëciål çhars'

      const encrypted = encrypt(unicodeText)
      const decrypted = decrypt(encrypted)

      expect(decrypted).toBe(unicodeText)
    })

    it('should throw error on invalid encrypted data', () => {
      expect(() => decrypt('invalid_base64_string')).toThrow()
    })

    it('should throw error on tampered data', () => {
      const encrypted = encrypt('test')
      const tampered = encrypted.slice(0, -5) + 'xxxxx'

      expect(() => decrypt(tampered)).toThrow()
    })
  })

  describe('generateEncryptionKey', () => {
    it('should generate a 64-character hex string', () => {
      const key = generateEncryptionKey()

      expect(key).toHaveLength(64)
      expect(/^[a-f0-9]{64}$/.test(key)).toBe(true)
    })

    it('should generate unique keys', () => {
      const key1 = generateEncryptionKey()
      const key2 = generateEncryptionKey()

      expect(key1).not.toBe(key2)
    })
  })
})
