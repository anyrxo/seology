/**
 * Input Validation Schemas
 *
 * Zod schemas for validating API request inputs
 * Prevents injection attacks, validates data types, and sanitizes inputs
 */

import { z } from 'zod'

/**
 * Shopify shop domain validation
 * Must be a valid .myshopify.com domain
 */
export const shopDomainSchema = z
  .string()
  .min(1, 'Shop domain is required')
  .regex(
    /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/,
    'Invalid shop domain format. Must be a valid .myshopify.com domain'
  )
  .max(100, 'Shop domain too long')

/**
 * MongoDB ObjectId validation (24 hex characters)
 */
export const objectIdSchema = z
  .string()
  .length(24, 'Invalid ID format')
  .regex(/^[a-f0-9]{24}$/i, 'Invalid ID format')

/**
 * UUID validation
 */
export const uuidSchema = z
  .string()
  .uuid('Invalid UUID format')

/**
 * Safe string validation (prevents XSS)
 * Removes HTML tags and dangerous characters
 */
export const safeStringSchema = (minLength = 0, maxLength = 1000) =>
  z
    .string()
    .min(minLength)
    .max(maxLength)
    .transform((val) => {
      // Remove HTML tags
      let sanitized = val.replace(/<[^>]*>/g, '')
      // Remove null bytes
      sanitized = sanitized.replace(/\0/g, '')
      return sanitized.trim()
    })

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(3)
  .max(255)
  .toLowerCase()

/**
 * URL validation
 */
export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .max(2048, 'URL too long')

/**
 * Pagination parameters
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

/**
 * Date range validation
 */
export const dateRangeSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine((data) => data.endDate >= data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
})

/**
 * Shopify OAuth callback parameters
 */
export const shopifyCallbackSchema = z.object({
  shop: shopDomainSchema,
  code: z.string().min(1, 'Authorization code required'),
  hmac: z.string().min(1, 'HMAC signature required'),
  state: z.string().min(1, 'State parameter required'),
  timestamp: z.string().optional(),
  host: z.string().optional(),
})

/**
 * Shopify webhook validation
 */
export const shopifyWebhookSchema = z.object({
  shop: shopDomainSchema,
  topic: z.string().min(1),
  hmac: z.string().min(1),
})

/**
 * Product SEO update schema
 */
export const productSEOSchema = z.object({
  shop: shopDomainSchema,
  productId: z.string().startsWith('gid://shopify/Product/', 'Invalid Shopify product ID'),
  seo: z.object({
    title: z.string().min(30, 'SEO title too short (min 30 chars)').max(60, 'SEO title too long (max 60 chars)').optional(),
    description: z.string().min(120, 'SEO description too short (min 120 chars)').max(160, 'SEO description too long (max 160 chars)').optional(),
  }).refine((data) => data.title || data.description, {
    message: 'At least one of title or description must be provided',
  }),
})

/**
 * Connection create/update schema
 */
export const connectionSchema = z.object({
  platform: z.enum(['SHOPIFY', 'WORDPRESS', 'CUSTOM', 'GITHUB']),
  domain: z.string().min(1).max(255),
  displayName: z.string().min(1).max(255).optional(),
  credentials: z.record(z.string(), z.unknown()).optional(),
})

/**
 * User execution mode schema
 */
export const executionModeSchema = z.object({
  executionMode: z.enum(['AUTOMATIC', 'PLAN', 'APPROVE']),
})

/**
 * Fix approval schema
 */
export const fixApprovalSchema = z.object({
  fixId: objectIdSchema,
  approved: z.boolean(),
})

/**
 * Billing checkout schema
 */
export const checkoutSchema = z.object({
  plan: z.enum(['STARTER', 'GROWTH', 'SCALE']),
  billingCycle: z.enum(['MONTHLY', 'ANNUAL']).default('MONTHLY'),
})

/**
 * Webhook registration schema
 */
export const webhookRegistrationSchema = z.object({
  url: urlSchema,
  events: z.array(z.string()).min(1, 'At least one event required'),
  secret: z.string().min(32, 'Webhook secret must be at least 32 characters').optional(),
})

/**
 * Issue creation schema
 */
export const issueSchema = z.object({
  connectionId: objectIdSchema,
  type: z.enum([
    'MISSING_META_TITLE',
    'MISSING_META_DESCRIPTION',
    'DUPLICATE_CONTENT',
    'BROKEN_LINK',
    'MISSING_ALT_TEXT',
    'SLOW_PAGE_SPEED',
    'MISSING_SCHEMA',
    'POOR_MOBILE_UX',
    'MISSING_H1',
    'THIN_CONTENT',
  ]),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  pageUrl: urlSchema,
  title: z.string().min(1).max(255),
  description: z.string().max(1000),
  recommendation: z.string().max(1000).optional(),
})

/**
 * AI chat message schema
 */
export const chatMessageSchema = z.object({
  message: z.string().min(1).max(5000),
  connectionId: objectIdSchema.optional(),
  context: z.record(z.string(), z.unknown()).optional(),
})

/**
 * File upload schema
 */
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z.array(z.string()).default(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
}).refine((data) => data.file.size <= data.maxSize, {
  message: 'File size exceeds maximum allowed size',
  path: ['file'],
}).refine((data) => data.allowedTypes.includes(data.file.type), {
  message: 'File type not allowed',
  path: ['file'],
})

/**
 * Team invitation schema
 */
export const teamInvitationSchema = z.object({
  email: emailSchema,
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'VIEWER']),
  teamId: objectIdSchema,
})

/**
 * Automation settings schema
 */
export const automationSettingsSchema = z.object({
  autoScan: z.boolean(),
  scanFrequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
  autoFix: z.boolean(),
  notifyOnIssues: z.boolean(),
  notifyOnFixes: z.boolean(),
})

/**
 * Search and filter schema
 */
export const searchFilterSchema = z.object({
  query: z.string().max(255).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  sort: z.object({
    field: z.string(),
    order: z.enum(['asc', 'desc']),
  }).optional(),
  ...paginationSchema.shape,
})

/**
 * Cron job authentication
 */
export const cronAuthSchema = z.object({
  secret: z.string().min(32, 'Invalid cron secret'),
})

/**
 * API key creation schema
 */
export const apiKeySchema = z.object({
  name: z.string().min(1).max(100),
  scopes: z.array(z.string()).min(1, 'At least one scope required'),
  expiresAt: z.coerce.date().optional(),
})

/**
 * Sanitize HTML input (prevent XSS)
 */
export function sanitizeHTML(html: string): string {
  // Remove script tags
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '')

  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, '')

  return sanitized
}

/**
 * Validate and sanitize shop parameter from query
 */
export function validateShopParam(shop: string | null): string {
  if (!shop) {
    throw new Error('Shop parameter is required')
  }

  const result = shopDomainSchema.safeParse(shop)

  if (!result.success) {
    throw new Error('Invalid shop parameter: ' + result.error.issues[0].message)
  }

  return result.data
}

/**
 * Validate pagination parameters
 */
export function validatePagination(params: unknown) {
  return paginationSchema.parse(params)
}

/**
 * Validate object ID
 */
export function validateObjectId(id: string | null | undefined, fieldName = 'ID'): string {
  if (!id) {
    throw new Error(`${fieldName} is required`)
  }

  const result = objectIdSchema.safeParse(id)

  if (!result.success) {
    throw new Error(`Invalid ${fieldName}: ${result.error.issues[0].message}`)
  }

  return result.data
}

/**
 * SQL injection prevention - escape special characters
 * Note: Use Prisma's parameterized queries instead when possible
 */
export function escapeSQLString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x00/g, '\\0')
    .replace(/\x1a/g, '\\Z')
}

/**
 * Path traversal prevention
 */
export function sanitizeFilePath(path: string): string {
  // Remove .. and ensure no path traversal
  return path.replace(/\.\./g, '').replace(/^\/+/, '')
}

/**
 * Validate request origin (CSRF protection)
 */
export function validateRequestOrigin(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false

  return allowedOrigins.some((allowed) => {
    if (allowed === origin) return true
    if (allowed.endsWith('*')) {
      const prefix = allowed.slice(0, -1)
      return origin.startsWith(prefix)
    }
    return false
  })
}
