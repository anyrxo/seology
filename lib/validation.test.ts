/**
 * Unit Tests: Input Validation
 * Tests Zod validation schemas and sanitization functions
 */

import {
  shopDomainSchema,
  objectIdSchema,
  uuidSchema,
  safeStringSchema,
  emailSchema,
  urlSchema,
  paginationSchema,
  dateRangeSchema,
  productSEOSchema,
  executionModeSchema,
  sanitizeHTML,
  validateShopParam,
  validatePagination,
  validateObjectId,
  escapeSQLString,
  sanitizeFilePath,
  validateRequestOrigin,
} from './validation'

describe('validation', () => {
  describe('shopDomainSchema', () => {
    it('should validate correct Shopify domain', () => {
      const result = shopDomainSchema.safeParse('my-store.myshopify.com')
      expect(result.success).toBe(true)
    })

    it('should reject invalid domain format', () => {
      expect(shopDomainSchema.safeParse('invalid-domain.com').success).toBe(false)
      expect(shopDomainSchema.safeParse('store.shopify.com').success).toBe(false)
      expect(shopDomainSchema.safeParse('').success).toBe(false)
    })

    it('should allow hyphens in store name', () => {
      const result = shopDomainSchema.safeParse('my-awesome-store.myshopify.com')
      expect(result.success).toBe(true)
    })
  })

  describe('objectIdSchema', () => {
    it('should validate correct MongoDB ObjectId', () => {
      const result = objectIdSchema.safeParse('507f1f77bcf86cd799439011')
      expect(result.success).toBe(true)
    })

    it('should reject invalid ObjectId', () => {
      expect(objectIdSchema.safeParse('invalid').success).toBe(false)
      expect(objectIdSchema.safeParse('507f1f77bcf86cd79943901').success).toBe(false) // Too short
      expect(objectIdSchema.safeParse('507f1f77bcf86cd799439011x').success).toBe(false) // Invalid char
    })
  })

  describe('uuidSchema', () => {
    it('should validate correct UUID', () => {
      const result = uuidSchema.safeParse('550e8400-e29b-41d4-a716-446655440000')
      expect(result.success).toBe(true)
    })

    it('should reject invalid UUID', () => {
      expect(uuidSchema.safeParse('not-a-uuid').success).toBe(false)
      expect(uuidSchema.safeParse('550e8400-e29b-41d4-a716').success).toBe(false)
    })
  })

  describe('safeStringSchema', () => {
    it('should remove HTML tags', () => {
      const schema = safeStringSchema(0, 100)
      const result = schema.parse('<script>alert("xss")</script>Hello')
      expect(result).toBe('Hello')
    })

    it('should remove null bytes', () => {
      const schema = safeStringSchema(0, 100)
      const result = schema.parse('test\0string')
      expect(result).toBe('teststring')
    })

    it('should trim whitespace', () => {
      const schema = safeStringSchema(0, 100)
      const result = schema.parse('  hello world  ')
      expect(result).toBe('hello world')
    })
  })

  describe('emailSchema', () => {
    it('should validate correct email', () => {
      const result = emailSchema.safeParse('test@example.com')
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('test@example.com')
      }
    })

    it('should convert to lowercase', () => {
      const result = emailSchema.safeParse('Test@Example.COM')
      if (result.success) {
        expect(result.data).toBe('test@example.com')
      }
    })

    it('should reject invalid email', () => {
      expect(emailSchema.safeParse('not-an-email').success).toBe(false)
      expect(emailSchema.safeParse('@example.com').success).toBe(false)
      expect(emailSchema.safeParse('test@').success).toBe(false)
    })
  })

  describe('urlSchema', () => {
    it('should validate correct URL', () => {
      expect(urlSchema.safeParse('https://example.com').success).toBe(true)
      expect(urlSchema.safeParse('http://localhost:3000').success).toBe(true)
    })

    it('should reject invalid URL', () => {
      expect(urlSchema.safeParse('not a url').success).toBe(false)
      expect(urlSchema.safeParse('example.com').success).toBe(false)
    })
  })

  describe('paginationSchema', () => {
    it('should parse valid pagination params', () => {
      const result = paginationSchema.parse({ page: '2', limit: '50' })
      expect(result.page).toBe(2)
      expect(result.limit).toBe(50)
    })

    it('should use default values', () => {
      const result = paginationSchema.parse({})
      expect(result.page).toBe(1)
      expect(result.limit).toBe(20)
    })

    it('should enforce minimum page of 1', () => {
      expect(() => paginationSchema.parse({ page: 0 })).toThrow()
      expect(() => paginationSchema.parse({ page: -1 })).toThrow()
    })

    it('should enforce maximum limit of 100', () => {
      expect(() => paginationSchema.parse({ limit: 101 })).toThrow()
    })
  })

  describe('dateRangeSchema', () => {
    it('should validate correct date range', () => {
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-12-31')
      const result = dateRangeSchema.safeParse({ startDate, endDate })
      expect(result.success).toBe(true)
    })

    it('should reject invalid date range (end before start)', () => {
      const startDate = new Date('2024-12-31')
      const endDate = new Date('2024-01-01')
      const result = dateRangeSchema.safeParse({ startDate, endDate })
      expect(result.success).toBe(false)
    })
  })

  describe('productSEOSchema', () => {
    it('should validate correct product SEO update', () => {
      const data = {
        shop: 'test-shop.myshopify.com',
        productId: 'gid://shopify/Product/123',
        seo: {
          title: 'Premium Leather Wallet - RFID Blocking Protection',
          description: 'Protect your cards with our premium leather wallet featuring RFID blocking technology. Handcrafted from genuine leather. Ships worldwide.',
        },
      }
      const result = productSEOSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject short SEO title', () => {
      const data = {
        shop: 'test-shop.myshopify.com',
        productId: 'gid://shopify/Product/123',
        seo: { title: 'Too short' },
      }
      expect(productSEOSchema.safeParse(data).success).toBe(false)
    })

    it('should reject short SEO description', () => {
      const data = {
        shop: 'test-shop.myshopify.com',
        productId: 'gid://shopify/Product/123',
        seo: { description: 'Too short description' },
      }
      expect(productSEOSchema.safeParse(data).success).toBe(false)
    })
  })

  describe('executionModeSchema', () => {
    it('should validate correct execution modes', () => {
      expect(executionModeSchema.safeParse({ executionMode: 'AUTOMATIC' }).success).toBe(true)
      expect(executionModeSchema.safeParse({ executionMode: 'PLAN' }).success).toBe(true)
      expect(executionModeSchema.safeParse({ executionMode: 'APPROVE' }).success).toBe(true)
    })

    it('should reject invalid execution mode', () => {
      expect(executionModeSchema.safeParse({ executionMode: 'INVALID' }).success).toBe(false)
    })
  })

  describe('sanitizeHTML', () => {
    it('should remove script tags', () => {
      const result = sanitizeHTML('<script>alert("xss")</script>Hello')
      expect(result).toBe('Hello')
    })

    it('should remove event handlers', () => {
      const result = sanitizeHTML('<div onclick="alert(1)">Click me</div>')
      expect(result).toBe('<div>Click me</div>')
    })

    it('should remove javascript protocol', () => {
      const result = sanitizeHTML('<a href="javascript:alert(1)">Link</a>')
      expect(result).toBe('<a href=":alert(1)">Link</a>')
    })

    it('should remove data:text/html protocol', () => {
      const result = sanitizeHTML('<iframe src="data:text/html,<script>alert(1)</script>"></iframe>')
      expect(result).not.toContain('data:text/html')
    })
  })

  describe('validateShopParam', () => {
    it('should validate and return shop domain', () => {
      const result = validateShopParam('test-shop.myshopify.com')
      expect(result).toBe('test-shop.myshopify.com')
    })

    it('should throw error for null shop', () => {
      expect(() => validateShopParam(null)).toThrow('Shop parameter is required')
    })

    it('should throw error for invalid shop', () => {
      expect(() => validateShopParam('invalid')).toThrow('Invalid shop parameter')
    })
  })

  describe('validatePagination', () => {
    it('should validate and return pagination params', () => {
      const result = validatePagination({ page: 2, limit: 50 })
      expect(result.page).toBe(2)
      expect(result.limit).toBe(50)
    })
  })

  describe('validateObjectId', () => {
    it('should validate and return object ID', () => {
      const id = '507f1f77bcf86cd799439011'
      const result = validateObjectId(id)
      expect(result).toBe(id)
    })

    it('should throw error for null ID', () => {
      expect(() => validateObjectId(null)).toThrow('ID is required')
    })

    it('should throw error for invalid ID', () => {
      expect(() => validateObjectId('invalid')).toThrow('Invalid ID')
    })

    it('should use custom field name in error message', () => {
      expect(() => validateObjectId(null, 'User ID')).toThrow('User ID is required')
    })
  })

  describe('escapeSQLString', () => {
    it('should escape single quotes', () => {
      const result = escapeSQLString("it's")
      expect(result).toBe("it\\'s")
    })

    it('should escape backslashes', () => {
      const result = escapeSQLString('path\\to\\file')
      expect(result).toBe('path\\\\to\\\\file')
    })

    it('should escape null bytes', () => {
      const result = escapeSQLString('test\x00string')
      expect(result).toBe('test\\0string')
    })
  })

  describe('sanitizeFilePath', () => {
    it('should remove path traversal attempts', () => {
      const result = sanitizeFilePath('../../../etc/passwd')
      expect(result).toBe('etc/passwd')
    })

    it('should remove leading slashes', () => {
      const result = sanitizeFilePath('///path/to/file')
      expect(result).toBe('path/to/file')
    })
  })

  describe('validateRequestOrigin', () => {
    const allowedOrigins = ['https://example.com', 'https://*.vercel.app']

    it('should allow exact match', () => {
      const result = validateRequestOrigin('https://example.com', allowedOrigins)
      expect(result).toBe(true)
    })

    it('should allow wildcard match', () => {
      const result = validateRequestOrigin('https://my-app.vercel.app', allowedOrigins)
      expect(result).toBe(true)
    })

    it('should reject non-matching origin', () => {
      const result = validateRequestOrigin('https://evil.com', allowedOrigins)
      expect(result).toBe(false)
    })

    it('should reject null origin', () => {
      const result = validateRequestOrigin(null, allowedOrigins)
      expect(result).toBe(false)
    })
  })
})
