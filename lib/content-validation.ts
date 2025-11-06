/**
 * Server-Side Content Validation
 *
 * This module provides server-side validation to prevent malicious content
 * from being stored in the database. It complements client-side sanitization
 * by catching attacks before data persistence.
 *
 * Security Features:
 * - Zod schema validation
 * - XSS pattern detection
 * - URL protocol validation
 * - Content length limits
 * - SQL injection pattern detection
 */

import { z } from 'zod'

/**
 * Patterns commonly used in XSS attacks
 */
const XSS_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /javascript:/gi,
  /onerror\s*=/gi,
  /onclick\s*=/gi,
  /onload\s*=/gi,
  /onmouseover\s*=/gi,
  /onfocus\s*=/gi,
  /onblur\s*=/gi,
  /<iframe[\s\S]*?>/gi,
  /<object[\s\S]*?>/gi,
  /<embed[\s\S]*?>/gi,
  /eval\s*\(/gi,
  /expression\s*\(/gi,
  /<img[\s\S]*?onerror[\s\S]*?>/gi
]

/**
 * Patterns commonly used in SQL injection attacks
 */
const SQL_INJECTION_PATTERNS = [
  /(\bunion\b.*\bselect\b)/gi,
  /(\bselect\b.*\bfrom\b.*\bwhere\b)/gi,
  /(;\s*drop\s+table)/gi,
  /(;\s*delete\s+from)/gi,
  /(\bor\b\s+1\s*=\s*1)/gi,
  /(';\s*--)/gi,
  /(\bexec\s*\()/gi
]

/**
 * Check if content contains potential XSS vectors
 *
 * @param content - Content to validate
 * @returns true if XSS patterns detected
 */
function containsXSS(content: string): boolean {
  return XSS_PATTERNS.some(pattern => pattern.test(content))
}

/**
 * Check if content contains potential SQL injection
 *
 * @param content - Content to validate
 * @returns true if SQL injection patterns detected
 */
function containsSQLInjection(content: string): boolean {
  return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(content))
}

/**
 * Safe string schema - validates and checks for XSS/SQL injection
 */
const safeStringSchema = z.string()
  .max(10000, 'Content exceeds maximum length of 10,000 characters')
  .refine(
    (val) => !containsXSS(val),
    { message: 'Content contains potentially malicious code (XSS detected)' }
  )
  .refine(
    (val) => !containsSQLInjection(val),
    { message: 'Content contains potentially malicious code (SQL injection detected)' }
  )

/**
 * Safe URL schema - only allows HTTP(S) protocols
 */
const safeURLSchema = z.string()
  .url('Invalid URL format')
  .max(2048, 'URL exceeds maximum length of 2,048 characters')
  .refine(
    (val) => /^https?:\/\//i.test(val),
    { message: 'Only HTTP(S) URLs are allowed' }
  )
  .refine(
    (val) => !containsXSS(val),
    { message: 'URL contains potentially malicious code' }
  )

/**
 * Safe email schema
 */
const safeEmailSchema = z.string()
  .email('Invalid email format')
  .max(254, 'Email exceeds maximum length')
  .refine(
    (val) => !containsXSS(val),
    { message: 'Email contains potentially malicious code' }
  )

/**
 * Safe JSON schema
 */
const safeJSONSchema = z.string()
  .max(100000, 'JSON exceeds maximum length')
  .refine(
    (val) => {
      try {
        JSON.parse(val)
        return true
      } catch {
        return false
      }
    },
    { message: 'Invalid JSON format' }
  )
  .refine(
    (val) => !containsXSS(val),
    { message: 'JSON contains potentially malicious code' }
  )

/**
 * Safe HTML schema - allows limited HTML tags
 */
const safeHTMLSchema = z.string()
  .max(50000, 'HTML content exceeds maximum length')
  .refine(
    (val) => {
      // Only allow specific safe tags
      const allowedTags = /<\s*(b|i|em|strong|a|p|br|ul|ol|li|span|div|h1|h2|h3|h4|h5|h6)\s*[^>]*>/gi
      const allTags = /<\s*[a-z][a-z0-9]*\s*[^>]*>/gi

      const matches = val.match(allTags) || []
      return matches.every(tag => allowedTags.test(tag))
    },
    { message: 'HTML contains disallowed tags' }
  )
  .refine(
    (val) => !containsXSS(val),
    { message: 'HTML contains potentially malicious code' }
  )

/**
 * Validate general text content
 *
 * @param content - Content to validate
 * @returns Validated content
 * @throws ZodError if validation fails
 *
 * @example
 * try {
 *   const safe = validateContent(userInput)
 * } catch (error) {
 *   console.error('Validation failed:', error)
 * }
 */
export function validateContent(content: string): string {
  return safeStringSchema.parse(content)
}

/**
 * Validate URL
 *
 * @param url - URL to validate
 * @returns Validated URL
 * @throws ZodError if validation fails
 *
 * @example
 * try {
 *   const safeUrl = validateURL(userUrl)
 * } catch (error) {
 *   console.error('Invalid URL:', error)
 * }
 */
export function validateURL(url: string): string {
  return safeURLSchema.parse(url)
}

/**
 * Validate email address
 *
 * @param email - Email to validate
 * @returns Validated email
 * @throws ZodError if validation fails
 */
export function validateEmail(email: string): string {
  return safeEmailSchema.parse(email)
}

/**
 * Validate JSON string
 *
 * @param json - JSON string to validate
 * @returns Validated JSON string
 * @throws ZodError if validation fails
 */
export function validateJSON(json: string): string {
  return safeJSONSchema.parse(json)
}

/**
 * Validate HTML content
 *
 * @param html - HTML to validate
 * @returns Validated HTML
 * @throws ZodError if validation fails
 */
export function validateHTML(html: string): string {
  return safeHTMLSchema.parse(html)
}

/**
 * Safe validation wrapper that returns result with error
 *
 * @param content - Content to validate
 * @param validator - Validation function
 * @returns Object with success status and data/error
 *
 * @example
 * const result = safeValidate(userInput, validateContent)
 * if (result.success) {
 *   console.log('Valid:', result.data)
 * } else {
 *   console.error('Error:', result.error)
 * }
 */
export function safeValidate<T>(
  content: string,
  validator: (content: string) => T
): { success: true; data: T } | { success: false; error: string } {
  try {
    const data = validator(content)
    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((issue: z.ZodIssue) => issue.message).join(', ')
      }
    }
    return {
      success: false,
      error: 'Validation failed'
    }
  }
}

/**
 * Validate Shopify product data
 */
export const shopifyProductSchema = z.object({
  title: safeStringSchema,
  description: safeStringSchema.optional(),
  handle: z.string().max(255).regex(/^[a-z0-9-]+$/, 'Invalid handle format'),
  vendor: safeStringSchema.optional(),
  productType: safeStringSchema.optional(),
  tags: z.array(safeStringSchema).max(250).optional(),
  metaTitle: safeStringSchema.max(70).optional(),
  metaDescription: safeStringSchema.max(320).optional(),
  imageUrl: safeURLSchema.optional(),
  imageAlt: safeStringSchema.max(512).optional()
})

/**
 * Validate SEO fix data
 */
export const seoFixSchema = z.object({
  issueType: z.enum([
    'MISSING_META_TITLE',
    'MISSING_META_DESCRIPTION',
    'MISSING_ALT_TEXT',
    'BROKEN_LINK',
    'DUPLICATE_CONTENT',
    'MISSING_H1',
    'MISSING_CANONICAL',
    'MISSING_SCHEMA'
  ]),
  description: safeStringSchema.max(1000),
  beforeState: safeJSONSchema,
  afterState: safeJSONSchema,
  resourceId: z.string().max(255),
  resourceType: z.enum(['PRODUCT', 'PAGE', 'COLLECTION', 'BLOG_POST']),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
})

/**
 * Validate user input for site connection
 */
export const siteConnectionSchema = z.object({
  platform: z.enum(['SHOPIFY', 'WORDPRESS', 'CUSTOM']),
  shopDomain: z.string().max(255).regex(/^[a-z0-9-]+\.myshopify\.com$/i, 'Invalid Shopify domain').optional(),
  wordpressUrl: safeURLSchema.optional(),
  siteName: safeStringSchema.max(255),
  apiKey: z.string().max(512).optional(),
  apiPassword: z.string().max(512).optional()
})

/**
 * Validate notification content
 */
export const notificationSchema = z.object({
  title: safeStringSchema.max(255),
  message: safeStringSchema.max(1000),
  type: z.enum(['SUCCESS', 'ERROR', 'WARNING', 'INFO']),
  link: safeURLSchema.optional()
})

/**
 * Type exports for use in API routes
 */
export type ShopifyProductInput = z.infer<typeof shopifyProductSchema>
export type SEOFixInput = z.infer<typeof seoFixSchema>
export type SiteConnectionInput = z.infer<typeof siteConnectionSchema>
export type NotificationInput = z.infer<typeof notificationSchema>

/**
 * Validate and parse multipart form data
 *
 * @param formData - FormData object
 * @param schema - Zod schema to validate against
 * @returns Validated data
 */
export function validateFormData<T>(
  formData: FormData,
  schema: z.ZodSchema<T>
): T {
  const data: Record<string, string | string[]> = {}

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      if (data[key]) {
        // Multiple values for same key
        if (Array.isArray(data[key])) {
          (data[key] as string[]).push(value)
        } else {
          data[key] = [data[key] as string, value]
        }
      } else {
        data[key] = value
      }
    }
  }

  return schema.parse(data)
}

/**
 * Sanitize and validate file uploads
 */
export const fileUploadSchema = z.object({
  filename: z.string()
    .max(255)
    .regex(/^[a-zA-Z0-9_\-\.]+$/, 'Invalid filename')
    .refine(
      (val) => !val.includes('..'),
      { message: 'Filename cannot contain path traversal' }
    ),
  mimetype: z.string()
    .regex(/^[a-z]+\/[a-z0-9\-\+\.]+$/i, 'Invalid MIME type'),
  size: z.number()
    .max(10 * 1024 * 1024, 'File size exceeds 10MB limit')
})

/**
 * Validate API rate limiting headers
 */
export function validateRateLimitHeaders(headers: Headers): {
  ip: string
  userAgent: string
} {
  const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown'
  const userAgent = headers.get('user-agent') || 'unknown'

  // Validate IP format (basic check)
  const ipSchema = z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$|^unknown$|^[\da-f:]+$/i)
  const validatedIp = ipSchema.catch('unknown').parse(ip.split(',')[0].trim())

  // Validate user agent length
  const uaSchema = z.string().max(500)
  const validatedUA = uaSchema.catch('unknown').parse(userAgent)

  return {
    ip: validatedIp,
    userAgent: validatedUA
  }
}
