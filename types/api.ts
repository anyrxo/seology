/**
 * Standardized API Types
 *
 * Common types used across all API routes
 */

// ==================== API RESPONSE STRUCTURE ====================

export interface APIResponse<T = unknown> {
  success: boolean
  data?: T
  error?: APIError
  meta?: APIMeta
}

export interface APIError {
  code: string
  message: string
  details?: unknown
}

export interface APIMeta {
  page?: number
  limit?: number
  total?: number
  pages?: number
}

// ==================== ERROR CODES ====================

export const ErrorCodes = {
  // Authentication
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // Resources
  NOT_FOUND: 'NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  SITE_NOT_FOUND: 'SITE_NOT_FOUND',
  CONNECTION_NOT_FOUND: 'CONNECTION_NOT_FOUND',
  ISSUE_NOT_FOUND: 'ISSUE_NOT_FOUND',
  FIX_NOT_FOUND: 'FIX_NOT_FOUND',
  JOB_NOT_FOUND: 'JOB_NOT_FOUND',

  // Validation
  INVALID_REQUEST: 'INVALID_REQUEST',
  MISSING_FIELDS: 'MISSING_FIELDS',
  INVALID_FIELDS: 'INVALID_FIELDS',

  // Usage Limits
  SITE_LIMIT_REACHED: 'SITE_LIMIT_REACHED',
  FIX_LIMIT_REACHED: 'FIX_LIMIT_REACHED',

  // Operations
  OPERATION_FAILED: 'OPERATION_FAILED',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CANNOT_DELETE: 'CANNOT_DELETE',
  CANNOT_ROLLBACK: 'CANNOT_ROLLBACK',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const

// ==================== FILTER & SORT OPTIONS ====================

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface DateRangeFilter {
  startDate?: string
  endDate?: string
}

export type SortOrder = 'asc' | 'desc'

export interface SortParams {
  sortBy?: string
  sortOrder?: SortOrder
}

// ==================== SITE TYPES ====================

export interface SiteResponse {
  id: string
  platform: string
  domain: string
  displayName: string | null
  status: string
  lastSync: Date | null
  createdAt: Date
  stats: {
    totalIssues: number
    activeIssues: number
    totalFixes: number
  }
}

// ==================== CONNECTION TYPES ====================

export interface ConnectionResponse {
  id: string
  platform: string
  domain: string
  displayName: string | null
  status: string
  lastSync: Date | null
  createdAt: Date
}

export interface ConnectionTestResult {
  connected: boolean
  message: string
  details?: unknown
}

// ==================== ISSUE TYPES ====================

export interface IssueResponse {
  id: string
  connectionId: string
  type: string
  title: string
  severity: string
  pageUrl: string
  details: string
  recommendation: string | null
  status: string
  detectedAt: Date
  fixedAt: Date | null
  connection?: {
    id: string
    platform: string
    domain: string
  }
}

export interface IssueUpdateParams {
  status?: 'OPEN' | 'IGNORED' | 'FIXED' | 'IN_PROGRESS'
}

// ==================== FIX TYPES ====================

export interface FixResponse {
  id: string
  connectionId: string
  issueId: string | null
  description: string
  type: string
  targetUrl: string | null
  status: string
  method: string
  appliedAt: Date | null
  rolledBackAt: Date | null
  createdAt: Date
  connection?: {
    id: string
    platform: string
    domain: string
    displayName: string | null
  }
  issue?: {
    id: string
    type: string
    title: string
    severity: string
    pageUrl: string
  }
}

export interface BatchFixParams {
  issueIds?: string[]
  connectionId?: string
}

// ==================== JOB TYPES ====================

export interface JobResponse {
  id: string
  type: string
  status: string
  data: unknown
  error: string | null
  attempts: number
  maxAttempts: number
  createdAt: Date
  startedAt: Date | null
  completedAt: Date | null
}

// ==================== NOTIFICATION TYPES ====================

export interface NotificationResponse {
  id: string
  type: string
  title: string
  message: string
  actionUrl: string | null
  read: boolean
  createdAt: Date
}

// ==================== ANALYTICS TYPES ====================

export interface AnalyticsOverview {
  totalSites: number
  totalIssues: number
  totalFixes: number
  issuesFixed: number
  issuesPending: number
  recentActivity: {
    fixesApplied: number
    issuesDetected: number
    sitesScanned: number
  }
}

export interface TrafficData {
  date: string
  organicTraffic: number
}

export interface RankingData {
  keyword: string
  position: number
  change: number
}

export interface IssueTrendData {
  date: string
  issuesDetected: number
  issuesFixed: number
}

// ==================== ADMIN TYPES ====================

export interface AdminUserResponse {
  id: string
  clerkId: string
  email: string
  name: string | null
  plan: string
  role: string
  executionMode: string
  createdAt: Date
  stats: {
    totalConnections: number
    totalIssues: number
    totalFixes: number
  }
}

export interface AdminStats {
  totalUsers: number
  totalSites: number
  totalIssues: number
  totalFixes: number
  activeJobs: number
  planDistribution: {
    STARTER: number
    GROWTH: number
    SCALE: number
  }
}

// ==================== PLAN TYPES ====================

export interface PlanResponse {
  siteId: string
  fixes: FixResponse[]
  createdAt: Date
  status: 'pending' | 'approved' | 'rejected'
}

// ==================== USAGE TYPES ====================

export interface UsageResponse {
  plan: {
    name: string
    price: number
  }
  sites: {
    used: number
    limit: number
    remaining: number
    percentUsed: number
  }
  fixes: {
    used: number
    limit: number
    remaining: number
    percentUsed: number
  }
  warnings: {
    sitesAtLimit: boolean
    fixesAtLimit: boolean
    fixesNearLimit: boolean
  }
}
