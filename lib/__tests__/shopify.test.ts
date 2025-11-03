/**
 * Tests for Shopify Integration
 */

import { applyShopifyFix, generateShopifyOAuthUrl, exchangeShopifyOAuthCode } from '../shopify'
import { decrypt } from '../encryption'
import { createMockConnection, createMockIssue } from '../../tests/utils/factories'

jest.mock('../encryption')
jest.mock('../db')

const mockDecrypt = decrypt as jest.MockedFunction<typeof decrypt>

global.fetch = jest.fn()

describe('Shopify Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('applyShopifyFix', () => {
    it('should update product SEO for missing meta title', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        domain: 'test-store.myshopify.com',
        accessToken: 'encrypted-token',
      })
      const issue = createMockIssue({
        type: 'missing_meta_title',
        pageUrl: '/products/123',
      })
      const fixCode = JSON.stringify({
        title: 'New Product Title',
        description: 'New Product Description',
      })

      mockDecrypt.mockReturnValue('decrypted-token')
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            productUpdate: {
              product: { id: 'gid://shopify/Product/123' },
              userErrors: [],
            },
          },
        }),
      })

      const result = await applyShopifyFix(connection, issue, fixCode)

      expect(result.success).toBe(true)
      expect(result.message).toContain('updated successfully')
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('test-store.myshopify.com'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'X-Shopify-Access-Token': 'decrypted-token',
          }),
        })
      )
    })

    it('should create redirect for broken link', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        domain: 'test-store.myshopify.com',
        accessToken: 'encrypted-token',
      })
      const issue = createMockIssue({
        type: 'broken_link',
        pageUrl: '/old-page',
      })
      const fixCode = JSON.stringify({
        from: '/old-page',
        to: '/new-page',
      })

      mockDecrypt.mockReturnValue('decrypted-token')
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            redirectCreate: {
              redirect: { id: 'redirect-123' },
              userErrors: [],
            },
          },
        }),
      })

      const result = await applyShopifyFix(connection, issue, fixCode)

      expect(result.success).toBe(true)
      expect(result.message).toContain('Redirect created')
    })

    it('should update page content for missing H1', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        domain: 'test-store.myshopify.com',
        accessToken: 'encrypted-token',
      })
      const issue = createMockIssue({
        type: 'missing_h1',
        pageUrl: '/pages/456',
      })
      const fixCode = JSON.stringify({
        bodyHtml: '<h1>New Heading</h1><p>Content</p>',
      })

      mockDecrypt.mockReturnValue('decrypted-token')
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            pageUpdate: {
              page: { id: 'gid://shopify/Page/456' },
              userErrors: [],
            },
          },
        }),
      })

      const result = await applyShopifyFix(connection, issue, fixCode)

      expect(result.success).toBe(true)
      expect(result.message).toContain('Page content updated')
    })

    it('should add structured data metafield', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        domain: 'test-store.myshopify.com',
        accessToken: 'encrypted-token',
      })
      const issue = createMockIssue({
        type: 'missing_schema',
        pageUrl: '/products/789',
      })
      const fixCode = JSON.stringify({
        schemaJson: '{"@type": "Product", "name": "Test"}',
      })

      mockDecrypt.mockReturnValue('decrypted-token')
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            metafieldsSet: {
              metafields: [{ id: 'metafield-123' }],
              userErrors: [],
            },
          },
        }),
      })

      const result = await applyShopifyFix(connection, issue, fixCode)

      expect(result.success).toBe(true)
      expect(result.message).toContain('Structured data added')
    })

    it('should return error if no access token', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        accessToken: null,
      })
      const issue = createMockIssue()

      const result = await applyShopifyFix(connection, issue, '{}')

      expect(result.success).toBe(false)
      expect(result.message).toContain('No access token')
    })

    it('should handle unsupported fix types', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        accessToken: 'encrypted-token',
      })
      const issue = createMockIssue({
        type: 'unsupported_type',
      })

      mockDecrypt.mockReturnValue('decrypted-token')

      const result = await applyShopifyFix(connection, issue, '{}')

      expect(result.success).toBe(false)
      expect(result.message).toContain('Unsupported fix type')
    })

    it('should handle Shopify API errors', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        accessToken: 'encrypted-token',
      })
      const issue = createMockIssue({
        type: 'missing_meta_title',
        pageUrl: '/products/123',
      })
      const fixCode = JSON.stringify({
        title: 'New Title',
      })

      mockDecrypt.mockReturnValue('decrypted-token')
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            productUpdate: {
              userErrors: [{ message: 'Invalid product ID' }],
            },
          },
        }),
      })

      const result = await applyShopifyFix(connection, issue, fixCode)

      expect(result.success).toBe(false)
      expect(result.message).toContain('Invalid product ID')
    })

    it('should handle network errors', async () => {
      const connection = createMockConnection({
        platform: 'SHOPIFY',
        accessToken: 'encrypted-token',
      })
      const issue = createMockIssue({
        type: 'missing_meta_title',
        pageUrl: '/products/123',
      })

      mockDecrypt.mockReturnValue('decrypted-token')
      ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      const result = await applyShopifyFix(connection, issue, '{}')

      expect(result.success).toBe(false)
      expect(result.message).toContain('Network error')
    })
  })

  describe('generateShopifyOAuthUrl', () => {
    it('should generate correct OAuth URL', () => {
      const shop = 'test-store.myshopify.com'
      const state = 'random-state-123'
      const redirectUri = 'https://app.seology.ai/api/auth/shopify/callback'

      const url = generateShopifyOAuthUrl(shop, state, redirectUri)

      expect(url).toContain(shop)
      expect(url).toContain('oauth/authorize')
      expect(url).toContain(`state=${state}`)
      expect(url).toContain(encodeURIComponent(redirectUri))
      expect(url).toContain('read_products')
      expect(url).toContain('write_products')
    })

    it('should include all required scopes', () => {
      const url = generateShopifyOAuthUrl('test.myshopify.com', 'state', 'http://localhost')

      expect(url).toContain('read_products')
      expect(url).toContain('write_products')
      expect(url).toContain('read_content')
      expect(url).toContain('write_content')
      expect(url).toContain('read_themes')
      expect(url).toContain('write_themes')
    })
  })

  describe('exchangeShopifyOAuthCode', () => {
    it('should exchange code for access token', async () => {
      const shop = 'test-store.myshopify.com'
      const code = 'auth-code-123'

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          access_token: 'shop_access_token_123',
        }),
      })

      const token = await exchangeShopifyOAuthCode(shop, code)

      expect(token).toBe('shop_access_token_123')
      expect(global.fetch).toHaveBeenCalledWith(
        `https://${shop}/admin/oauth/access_token`,
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining(code),
        })
      )
    })

    it('should throw error if client secret not configured', async () => {
      const originalSecret = process.env.SHOPIFY_CLIENT_SECRET
      delete process.env.SHOPIFY_CLIENT_SECRET

      await expect(
        exchangeShopifyOAuthCode('test.myshopify.com', 'code')
      ).rejects.toThrow('SHOPIFY_CLIENT_SECRET not configured')

      process.env.SHOPIFY_CLIENT_SECRET = originalSecret
    })

    it('should handle exchange errors', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Invalid code',
      })

      await expect(
        exchangeShopifyOAuthCode('test.myshopify.com', 'invalid-code')
      ).rejects.toThrow('Failed to exchange code')
    })
  })
})
