# SEOLOGY.AI API Documentation

## Overview

This document provides comprehensive documentation for all API routes in the SEOLOGY.AI platform. All routes follow RESTful conventions and return standardized JSON responses.

## Response Format

All API routes return a standardized response format:

```typescript
interface APIResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
    pages?: number
  }
}
```

## Authentication

Most routes require authentication via Clerk. The `userId` is extracted from the session:

```typescript
const { userId } = await auth()
if (!userId) {
  return NextResponse.json(
    { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
    { status: 401 }
  )
}
```

## API Routes

### Dashboard Routes

#### GET /api/dashboard/stats

Returns dashboard statistics for the authenticated user.

**Authentication:** Required

**Response:**
```typescript
{
  success: true,
  data: {
    sitesCount: number
    activeIssuesCount: number
    fixesThisMonth: number
    fixLimit: number
    usagePercent: number
    recentActivity: Array<{
      id: string
      platform: Platform
      displayName: string
      domain: string
      issuesCount: number
      fixesCount: number
    }>
  }
}
```

**Status:** ✅ Working
**File:** `app/api/dashboard/stats/route.ts`

---

### Sites Routes

#### GET /api/sites

Returns all site connections for the authenticated user.

**Authentication:** Required

**Response:**
```typescript
{
  success: true,
  data: Array<{
    id: string
    platform: Platform
    domain: string
    displayName: string | null
    status: ConnectionStatus
    lastSync: Date | null
    createdAt: Date
    stats: {
      totalIssues: number
      activeIssues: number
      totalFixes: number
    }
  }>
}
```

**Status:** ✅ Working
**File:** `app/api/sites/route.ts`

#### POST /api/sites

Creates a new site connection.

**Authentication:** Required

**Request Body:**
```typescript
{
  platform: Platform
  domain: string
  displayName?: string
  credentials?: Record<string, unknown>
}
```

**Response:**
```typescript
{
  success: true,
  data: Connection
}
```

**Status:** ✅ Working
**File:** `app/api/sites/route.ts`

#### GET /api/sites/[id]

Returns details for a specific site.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/sites/[id]/route.ts`

#### POST /api/sites/[id]/analyze

Triggers analysis for a specific site.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/sites/[id]/analyze/route.ts`

---

### Issues Routes

#### GET /api/issues

Returns all issues for the authenticated user with filtering and pagination.

**Authentication:** Required

**Query Parameters:**
- `status` - Filter by issue status (OPEN, FIXED, IGNORED, etc.)
- `severity` - Filter by severity (CRITICAL, HIGH, MEDIUM, LOW)
- `type` - Filter by issue type
- `connectionId` - Filter by site connection
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50, max: 100)

**Response:**
```typescript
{
  success: true,
  data: Array<Issue>,
  meta: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
```

**Status:** ✅ Working
**File:** `app/api/issues/route.ts`

#### GET /api/issues/[id]

Returns details for a specific issue.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/issues/[id]/route.ts`

#### POST /api/issues/[id]/ignore

Marks an issue as ignored.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/issues/[id]/ignore/route.ts`

---

### Fixes Routes

#### GET /api/fixes

Returns all fixes for the authenticated user with filtering and pagination.

**Authentication:** Required

**Query Parameters:**
- `status` - Filter by fix status (PENDING, APPLIED, ROLLED_BACK, FAILED)
- `connectionId` - Filter by site connection
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50, max: 100)

**Response:**
```typescript
{
  success: true,
  data: Array<Fix>,
  meta: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
```

**Status:** ✅ Working
**File:** `app/api/fixes/route.ts`

#### GET /api/fixes/[id]

Returns details for a specific fix.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/fixes/[id]/route.ts`

#### POST /api/fixes/[id]/approve

Approves a pending fix (for APPROVE execution mode).

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/fixes/[id]/approve/route.ts`

#### POST /api/fixes/[id]/rollback

Rolls back an applied fix.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/fixes/[id]/rollback/route.ts`

#### POST /api/fixes/execute

Executes fixes based on execution mode.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/fixes/execute/route.ts`

#### POST /api/fixes/approve-plan

Approves a pending plan (for PLAN execution mode).

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/fixes/approve-plan/route.ts`

---

### Analytics Routes

#### GET /api/analytics

Returns analytics data for the authenticated user.

**Authentication:** Required

**Query Parameters:**
- `range` - Date range (7d, 30d, 90d, all)

**Response:**
```typescript
{
  success: true,
  data: {
    issuesFixed: number
    timeSaved: string
    seoScoreImprovement: string
    pagesOptimized: number
    weeklyData: Array<{
      week: string
      issues: number
      fixes: number
    }>
    issueBreakdown: Array<{
      type: string
      count: number
      percentage: number
    }>
    recentActions: Array<{
      action: string
      site: string
      time: string
      impact: 'high' | 'medium' | 'low'
    }>
  }
}
```

**Status:** ✅ Working (Fixed issue type parsing)
**File:** `app/api/analytics/route.ts`

#### GET /api/analytics/overview

Returns comprehensive analytics overview.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/analytics/overview/route.ts`

#### GET /api/analytics/[siteId]

Returns analytics for a specific site.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/analytics/[siteId]/route.ts`

#### GET /api/analytics/trends

Returns trend data over time.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/analytics/trends/route.ts`

---

### Notifications Routes

#### GET /api/notifications

Returns all notifications for the authenticated user.

**Authentication:** Required

**Response:**
```typescript
{
  success: true,
  data: Array<Notification>
}
```

**Status:** ✅ Working
**File:** `app/api/notifications/route.ts`

#### GET /api/notifications/unread-count

Returns count of unread notifications.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/notifications/unread-count/route.ts`

#### POST /api/notifications/[id]/read

Marks a notification as read.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/notifications/[id]/read/route.ts`

#### POST /api/notifications/read-all

Marks all notifications as read.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/notifications/read-all/route.ts`

---

### Billing Routes

#### GET /api/billing/usage

Returns current usage statistics for the authenticated user.

**Authentication:** Required

**Response:**
```typescript
{
  success: true,
  data: {
    usage: UsageSummary
    upgradePrompt: UpgradePrompt
  }
}
```

**Status:** ✅ Working
**File:** `app/api/billing/usage/route.ts`

#### POST /api/billing/create-checkout

Creates a Stripe checkout session.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/billing/create-checkout/route.ts`

#### POST /api/billing/portal

Creates a Stripe customer portal session.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/billing/portal/route.ts`

#### POST /api/billing/webhook

Handles Stripe webhook events.

**Authentication:** Stripe signature verification
**Status:** ✅ Working
**File:** `app/api/billing/webhook/route.ts`

---

### User Routes

#### GET /api/user/profile

Returns the authenticated user's profile.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/user/profile/route.ts`

---

### Jobs Routes

#### GET /api/jobs

Returns all jobs for the authenticated user.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/jobs/route.ts`

#### GET /api/jobs/[id]

Returns details for a specific job.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/jobs/[id]/route.ts`

---

### Admin Routes

All admin routes require the user to have the ADMIN role.

#### GET /api/admin/analytics

Returns comprehensive platform analytics for admins.

**Authentication:** Required (Admin only)

**Query Parameters:**
- `days` - Number of days to include (default: 30)

**Response:**
```typescript
{
  success: true,
  data: {
    overview: {
      totalUsers: number
      newUsers: number
      totalConnections: number
      activeConnections: number
      totalIssues: number
      openIssues: number
      totalFixes: number
      appliedFixes: number
      failedFixes: number
      fixSuccessRate: number
      totalRevenue: number
    }
    subscriptions: Array<{ plan: Plan, count: number }>
    userGrowth: Array<{ date: string, count: number }>
    fixesOverTime: Array<{ date: string, count: number }>
    issuesByType: Array<{ type: string, count: number }>
    platformStats: Array<{ platform: Platform, count: number }>
    recentActivity: Array<AuditLog>
  }
}
```

**Status:** ✅ Working
**File:** `app/api/admin/analytics/route.ts`

#### GET /api/admin/users

Returns all users with pagination and filtering.

**Authentication:** Required (Admin only)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `search` - Search by email or name
- `plan` - Filter by plan
- `role` - Filter by role

**Status:** ✅ Working
**File:** `app/api/admin/users/route.ts`

#### GET /api/admin/users/[userId]

Returns details for a specific user.

**Authentication:** Required (Admin only)
**Status:** ✅ Working
**File:** `app/api/admin/users/[userId]/route.ts`

#### GET /api/admin/sites

Returns all site connections with pagination and filtering.

**Authentication:** Required (Admin only)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `platform` - Filter by platform
- `status` - Filter by status
- `search` - Search by domain or display name

**Status:** ✅ Working
**File:** `app/api/admin/sites/route.ts`

#### GET /api/admin/jobs

Returns all jobs with admin-level access.

**Authentication:** Required (Admin only)
**Status:** ✅ Working
**File:** `app/api/admin/jobs/route.ts`

#### POST /api/admin/broadcast

Sends a broadcast notification to all users.

**Authentication:** Required (Admin only)
**Status:** ✅ Working
**File:** `app/api/admin/broadcast/route.ts`

---

### Authentication Routes

#### POST /api/auth/shopify

Initiates Shopify OAuth flow.

**Status:** ✅ Working
**File:** `app/api/auth/shopify/route.ts`

#### GET /api/auth/shopify/callback

Handles Shopify OAuth callback.

**Status:** ✅ Working
**File:** `app/api/auth/shopify/callback/route.ts`

---

### Webhook Routes

#### GET /api/webhooks

Returns all webhooks for the authenticated user.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/webhooks/route.ts`

#### POST /api/webhooks

Creates a new webhook.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/webhooks/route.ts`

#### GET /api/webhooks/[id]

Returns details for a specific webhook.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/webhooks/[id]/route.ts`

#### POST /api/webhooks/test

Tests a webhook endpoint.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/webhooks/test/route.ts`

#### POST /api/webhooks/clerk

Handles Clerk webhook events.

**Authentication:** Clerk signature verification
**Status:** ✅ Working
**File:** `app/api/webhooks/clerk/route.ts`

---

### Team Routes

#### GET /api/teams

Returns all teams for the authenticated user.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/teams/route.ts`

#### POST /api/teams

Creates a new team.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/teams/route.ts`

#### GET /api/teams/[id]

Returns details for a specific team.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/teams/[id]/route.ts`

#### POST /api/teams/[id]/invite

Invites a user to a team.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/teams/[id]/invite/route.ts`

#### GET /api/teams/[id]/members

Returns all members of a team.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/teams/[id]/members/route.ts`

#### POST /api/teams/accept

Accepts a team invitation.

**Authentication:** Required
**Status:** ✅ Working
**File:** `app/api/teams/accept/route.ts`

---

### Cron Routes

All cron routes require the `CRON_SECRET` header for authentication.

#### POST /api/cron/cleanup

Cleans up old rollback data (90+ days old).

**Authentication:** CRON_SECRET header
**Status:** ✅ Working
**File:** `app/api/cron/cleanup/route.ts`

#### POST /api/cron/reset-usage

Resets monthly usage counters.

**Authentication:** CRON_SECRET header
**Status:** ✅ Working
**File:** `app/api/cron/reset-usage/route.ts`

#### POST /api/cron/backup

Creates database backups.

**Authentication:** CRON_SECRET header
**Status:** ✅ Working
**File:** `app/api/cron/backup/route.ts`

---

### Health Routes

#### GET /api/health

Returns system health status.

**Authentication:** None

**Response:**
```typescript
{
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  services: {
    database: 'up' | 'down'
    clerk: 'up' | 'down'
    stripe: 'up' | 'down'
    anthropic: 'up' | 'down'
  }
  uptime: number
}
```

**Status:** ✅ Working
**File:** `app/api/health/route.ts`

---

### Magic.js Routes

Routes for the universal JavaScript connector.

#### GET /api/magic/[siteId]/pending

Returns pending fixes for a site.

**Authentication:** Site-specific token
**Status:** ✅ Working
**File:** `app/api/magic/[siteId]/pending/route.ts`

#### POST /api/magic/[siteId]/fixes/[fixId]/status

Updates fix status from client-side.

**Authentication:** Site-specific token
**Status:** ✅ Working
**File:** `app/api/magic/[siteId]/fixes/[fixId]/status/route.ts`

#### GET /api/magic/[siteId]/analytics

Returns analytics for Magic.js site.

**Authentication:** Site-specific token
**Status:** ✅ Working
**File:** `app/api/magic/[siteId]/analytics/route.ts`

---

## Error Codes

All API routes use standardized error codes:

- `UNAUTHORIZED` - Not authenticated
- `FORBIDDEN` - Insufficient permissions
- `USER_NOT_FOUND` - User not found in database
- `SITE_NOT_FOUND` - Site not found
- `CONNECTION_NOT_FOUND` - Connection not found
- `ISSUE_NOT_FOUND` - Issue not found
- `FIX_NOT_FOUND` - Fix not found
- `JOB_NOT_FOUND` - Job not found
- `INVALID_REQUEST` - Invalid request format
- `MISSING_FIELDS` - Required fields missing
- `INVALID_FIELDS` - Invalid field values
- `SITE_LIMIT_REACHED` - Plan site limit reached
- `FIX_LIMIT_REACHED` - Plan fix limit reached
- `OPERATION_FAILED` - Operation failed
- `ALREADY_EXISTS` - Resource already exists
- `CANNOT_DELETE` - Resource cannot be deleted
- `CANNOT_ROLLBACK` - Fix cannot be rolled back
- `INTERNAL_ERROR` - Internal server error
- `DATABASE_ERROR` - Database operation failed

## Common Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (varies by endpoint)

### Filtering
- `status` - Filter by status
- `type` - Filter by type
- `severity` - Filter by severity
- `connectionId` - Filter by site connection
- `search` - Search query

### Sorting
- `sortBy` - Field to sort by
- `sortOrder` - Sort direction ('asc' or 'desc')

### Date Ranges
- `startDate` - Start date (ISO format)
- `endDate` - End date (ISO format)
- `range` - Predefined range ('7d', '30d', '90d', 'all')

## Testing

To test all API endpoints, run:

```bash
tsx scripts/test-api.ts
```

This will verify that all database queries work correctly and return proper data structures.

## TypeScript Types

All API response types are defined in `types/api.ts`. Import them in your components:

```typescript
import { DashboardStats, Issue, Fix, APIResponse } from '@/types/api'

// Type-safe API calls
const response: APIResponse<DashboardStats> = await fetch('/api/dashboard/stats').then(r => r.json())
if (response.success) {
  const stats = response.data // TypeScript knows the shape
}
```

## Recent Fixes

1. **Dashboard Stats API** - Removed pagination limit on connections query to fetch all user connections
2. **Analytics API** - Fixed issue type parsing to use `issue.type` directly instead of parsing JSON
3. **Issues Page** - Fixed TypeScript type checking for severity filter

## Next Steps

1. Add rate limiting to prevent abuse
2. Implement caching for frequently accessed endpoints
3. Add request/response logging for debugging
4. Implement API versioning strategy
5. Add comprehensive integration tests
