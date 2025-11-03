/**
 * Input Validation Schemas
 * Comprehensive Zod schemas for all API inputs
 *
 * SECURITY: All user inputs are validated and sanitized before processing
 */

import { z } from 'zod'
import { Platform, ExecutionMode, Severity, TeamRole } from '@prisma/client'

// ====================
// Common Schemas
// ====================

export const IdSchema = z.string().uuid('Invalid ID format')

export const EmailSchema = z
  .string()
  .email('Invalid email format')
  .min(3, 'Email too short')
  .max(255, 'Email too long')
  .toLowerCase()
  .trim()

export const UrlSchema = z
  .string()
  .url('Invalid URL format')
  .max(2048, 'URL too long')
  .refine(
    (url) => {
      try {
        const parsed = new URL(url)
        // Only allow http and https
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      } catch {
        return false
      }
    },
    { message: 'URL must use HTTP or HTTPS protocol' }
  )

export const DomainSchema = z
  .string()
  .min(3, 'Domain too short')
  .max(255, 'Domain too long')
  .regex(
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    'Invalid domain format'
  )
  .toLowerCase()
  .trim()

export const SafeStringSchema = z
  .string()
  .min(1, 'String cannot be empty')
  .max(1000, 'String too long')
  .trim()
  .refine(
    (str) => {
      // No script tags or dangerous patterns
      const dangerous = /<script|javascript:|onerror=|onclick=/i
      return !dangerous.test(str)
    },
    { message: 'String contains potentially dangerous content' }
  )

export const JsonStringSchema = z.string().refine(
  (str) => {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  },
  { message: 'Invalid JSON string' }
)

// ====================
// Site/Connection Schemas
// ====================

export const CreateSiteSchema = z.object({
  platform: z.nativeEnum(Platform),
  domain: DomainSchema,
  displayName: z.string().min(1).max(255).trim().optional(),
  credentials: z
    .object({
      username: z.string().min(1).max(255).optional(),
      password: z.string().min(1).max(255).optional(),
      appPassword: z.string().min(1).max(255).optional(),
      apiKey: z.string().min(1).max(255).optional(),
    })
    .optional(),
})

export const UpdateSiteSchema = z.object({
  displayName: z.string().min(1).max(255).trim().optional(),
  status: z.enum(['CONNECTED', 'DISCONNECTED', 'ERROR']).optional(),
})

// ====================
// Issue Schemas
// ====================

export const IssueTypeSchema = z.enum([
  'missing_meta_title',
  'missing_meta_description',
  'missing_h1',
  'duplicate_h1',
  'missing_alt',
  'broken_link',
  '404_error',
  'missing_schema',
  'poor_content',
  'slow_page_speed',
  'missing_structured_data',
  'poor_meta_description',
])

export const CreateIssueSchema = z.object({
  type: IssueTypeSchema,
  title: z.string().min(1).max(500).trim(),
  severity: z.nativeEnum(Severity),
  pageUrl: UrlSchema,
  details: JsonStringSchema,
  recommendation: z.string().max(5000).trim().optional(),
})

// ====================
// Fix Execution Schemas
// ====================

export const ExecuteFixesSchema = z.object({
  siteId: IdSchema,
  issueIds: z.array(IdSchema).min(1, 'At least one issue required').max(100, 'Too many issues').optional(),
})

export const ApproveFixSchema = z.object({
  fixId: IdSchema,
})

export const ApprovePlanSchema = z.object({
  siteId: IdSchema,
})

export const RollbackFixSchema = z.object({
  fixId: IdSchema,
})

// ====================
// User Settings Schemas
// ====================

export const UpdateUserSettingsSchema = z.object({
  executionMode: z.nativeEnum(ExecutionMode).optional(),
  notificationPreferences: z
    .object({
      email: z.boolean().optional(),
      inApp: z.boolean().optional(),
      fixApplied: z.boolean().optional(),
      fixFailed: z.boolean().optional(),
      weeklyReport: z.boolean().optional(),
    })
    .optional(),
})

// ====================
// Webhook Schemas
// ====================

export const CreateWebhookSchema = z.object({
  url: UrlSchema,
  events: z
    .array(
      z.enum([
        'issue.detected',
        'fix.applied',
        'fix.failed',
        'crawl.completed',
        'connection.added',
        'connection.error',
      ])
    )
    .min(1, 'At least one event required'),
  enabled: z.boolean().default(true),
})

export const UpdateWebhookSchema = z.object({
  url: UrlSchema.optional(),
  events: z
    .array(
      z.enum([
        'issue.detected',
        'fix.applied',
        'fix.failed',
        'crawl.completed',
        'connection.added',
        'connection.error',
      ])
    )
    .min(1)
    .optional(),
  enabled: z.boolean().optional(),
})

// ====================
// Team Schemas
// ====================

export const CreateTeamSchema = z.object({
  name: z.string().min(1, 'Team name required').max(255).trim(),
  description: z.string().max(1000).trim().optional(),
})

export const UpdateTeamSchema = z.object({
  name: z.string().min(1).max(255).trim().optional(),
  description: z.string().max(1000).trim().optional(),
})

export const InviteTeamMemberSchema = z.object({
  email: EmailSchema,
  role: z.nativeEnum(TeamRole),
})

export const UpdateTeamMemberSchema = z.object({
  role: z.nativeEnum(TeamRole),
})

// ====================
// Analysis Schemas
// ====================

export const AnalyzeSiteSchema = z.object({
  siteId: IdSchema,
  deepScan: z.boolean().default(false),
  includeContent: z.boolean().default(true),
  maxPages: z.number().int().min(1).max(1000).default(100),
})

export const AskClaudeSchema = z.object({
  siteId: IdSchema.optional(),
  question: z.string().min(1, 'Question required').max(5000).trim(),
  context: JsonStringSchema.optional(),
})

// ====================
// Admin Schemas
// ====================

export const AdminUpdateUserSchema = z.object({
  plan: z.enum(['STARTER', 'GROWTH', 'SCALE']).optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  executionMode: z.nativeEnum(ExecutionMode).optional(),
})

export const AdminSearchSchema = z.object({
  query: z.string().min(1).max(255).trim().optional(),
  filter: z.enum(['all', 'users', 'sites', 'issues', 'fixes']).default('all'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
})

// ====================
// Billing Schemas
// ====================

export const CreateCheckoutSchema = z.object({
  plan: z.enum(['STARTER', 'GROWTH', 'SCALE']),
  billingCycle: z.enum(['monthly', 'annual']).default('monthly'),
})

// ====================
// Query Parameter Schemas
// ====================

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export const SortSchema = z.object({
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const FilterSchema = z.object({
  status: z.string().max(50).optional(),
  severity: z.nativeEnum(Severity).optional(),
  platform: z.nativeEnum(Platform).optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
})

// ====================
// Magic.js Schemas
// ====================

export const MagicRequestSchema = z.object({
  siteId: IdSchema,
  userAgent: z.string().max(500).optional(),
  referrer: UrlSchema.optional(),
})

// ====================
// OAuth Schemas
// ====================

export const ShopifyOAuthSchema = z.object({
  code: z.string().min(1, 'Authorization code required'),
  shop: DomainSchema,
  state: z.string().min(1, 'State parameter required'),
  hmac: z.string().optional(),
})

export const WordPressConnectionSchema = z.object({
  siteUrl: UrlSchema,
  username: z.string().min(1).max(255).trim(),
  appPassword: z.string().min(1).max(255).trim(),
})

// ====================
// Validation Helper Functions
// ====================

/**
 * Validate request body against schema
 */
export function validateBody<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, errors: result.error }
}

/**
 * Validate query parameters
 */
export function validateQuery<T>(
  schema: z.ZodSchema<T>,
  params: URLSearchParams | Record<string, string | string[]>
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  let data: Record<string, unknown> = {}

  if (params instanceof URLSearchParams) {
    params.forEach((value, key) => {
      data[key] = value
    })
  } else {
    data = params as Record<string, unknown>
  }

  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, errors: result.error }
}

/**
 * Format Zod errors for API response
 */
export function formatValidationErrors(errors: z.ZodError): {
  field: string
  message: string
}[] {
  return errors.issues.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  // Basic XSS prevention - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/javascript:/gi, '')
    .trim()
}

/**
 * Sanitize SQL-like inputs (for raw queries)
 */
export function sanitizeSqlInput(input: string): string {
  // Remove SQL injection patterns
  return input
    .replace(/['";\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .trim()
}
