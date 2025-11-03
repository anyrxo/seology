# SEOLOGY.AI Database Schema Documentation

**Version:** 2.0
**Last Updated:** 2025-11-03
**Database:** PostgreSQL with Prisma ORM

## Overview

This document describes the complete database schema for SEOLOGY.AI, an AI-powered SEO automation SaaS platform that automatically fixes SEO issues across multiple CMS platforms.

---

## Core Models

### User
**Purpose:** Stores user authentication, preferences, and account settings

**Key Fields:**
- `clerkId` (unique) - Integration with Clerk authentication
- `email` (unique) - User email address
- `plan` - Subscription tier (STARTER, GROWTH, SCALE)
- `role` - User role (USER, ADMIN)
- `executionMode` - Default fix execution behavior (AUTOMATIC, PLAN, APPROVE)
- `onboardingCompleted` - Boolean flag for onboarding completion
- `onboardingStep` - Current step in onboarding wizard (0-7)

**Indexes:**
- `clerkId` (unique)
- `email` (unique + indexed)
- `plan` (indexed for reporting)

**Relations:**
- connections (1:N) - User's CMS connections
- usageRecords (1:N) - Monthly usage tracking
- subscriptions (1:N) - Billing subscriptions
- pendingPlans (1:N) - Fix plans awaiting approval
- notifications (1:N) - In-app notifications
- auditLogs (1:N) - Audit trail

---

### Connection
**Purpose:** Represents a connected website/CMS platform

**Key Fields:**
- `platform` - CMS type (SHOPIFY, WORDPRESS, WIX, CUSTOM)
- `domain` - Website domain
- `displayName` - User-friendly name for the connection
- `accessToken` (encrypted) - OAuth access token
- `refreshToken` (encrypted) - OAuth refresh token
- `credentials` (encrypted) - Platform-specific credentials (JSON)
- `status` - Connection health (PENDING, CONNECTED, ERROR, DISCONNECTED)
- `healthStatus` - Health indicator ('healthy', 'warning', 'error', 'unknown')
- `pageCount` - Number of pages crawled
- `issueCount` - Number of active issues
- `lastCrawlAt` - Last successful crawl timestamp
- `lastAnalysisAt` - Last AI analysis timestamp

**Critical Security:**
- All tokens and credentials are encrypted at rest using `lib/encryption.ts`
- Use `encrypt()` before saving, `decrypt()` when reading

**Indexes:**
- `userId` (for user isolation)
- `teamId` (for team access)
- `platform` (for platform-specific queries)
- `status` (for health monitoring)
- `domain` (for lookup)

**Relations:**
- user (N:1) - Owner of the connection
- team (N:1) - Optional team association
- issues (1:N) - Detected SEO issues
- fixes (1:N) - Applied fixes
- metrics (1:N) - Performance metrics
- crawls (1:N) - Crawl history

---

### Issue
**Purpose:** SEO problems detected by the crawler or AI analysis

**Key Fields:**
- `type` - Issue category (e.g., 'missing_meta', 'broken_link', 'missing_alt')
- `title` - Human-readable issue title
- `severity` - Priority level (CRITICAL, HIGH, MEDIUM, LOW)
- `pageUrl` - URL where issue was found
- `details` - JSON string with issue specifics
- `recommendation` - AI-generated fix recommendation
- `status` - Current state (OPEN, IN_PROGRESS, FIXED, FAILED, IGNORED, DETECTED, FIXING)
- `impactScore` - Estimated SEO impact (0-100)
- `estimatedTraffic` - Estimated monthly traffic impact
- `elementSelector` - CSS selector for the problematic element

**Indexes:**
- `connectionId` (for filtering by site)
- `status` (for dashboard views)
- `severity` (for prioritization)
- `type` (for grouping)

**Relations:**
- connection (N:1) - The site where issue was found
- fixes (1:N) - Applied fixes for this issue

**Common Issue Types:**
```javascript
{
  "missing_meta_title": "Page missing title tag",
  "missing_meta_description": "Page missing meta description",
  "broken_link": "Page contains broken links",
  "missing_alt_text": "Images missing alt attributes",
  "duplicate_content": "Duplicate content detected",
  "slow_page_speed": "Page load time too slow",
  "missing_h1": "Page missing H1 heading",
  "thin_content": "Insufficient content on page"
}
```

---

### Fix
**Purpose:** Records of SEO fixes applied to websites

**Key Fields:**
- `description` - Human-readable fix description
- `type` - Fix category (default: 'seo_fix')
- `targetUrl` - URL where fix was applied
- `changes` - JSON string containing the actual fix code/changes
- `beforeState` - JSON snapshot before fix (for rollback)
- `afterState` - JSON snapshot after fix
- `method` - How fix was applied (AUTOMATIC, MANUAL, PENDING)
- `status` - Current state (PENDING, APPLIED, ROLLED_BACK, FAILED)
- `appliedAt` - Timestamp when fix was applied
- `rollbackDeadline` - Auto-calculated (appliedAt + 90 days)
- `impactMetrics` - JSON tracking actual vs. expected impact
- `platform` - Platform-specific implementation details

**Rollback Strategy:**
- Fixes are reversible for 90 days after application
- `beforeState` stores complete state needed for rollback
- After 90 days, CLEANUP_ROLLBACKS job removes old rollback data

**Indexes:**
- `connectionId` (for site filtering)
- `status` (for status filtering)
- `appliedAt` (for time-based queries)
- `rollbackDeadline` (for cleanup job)
- `planId` (for plan association)

**Relations:**
- connection (N:1) - The site where fix was applied
- issue (N:1) - The issue this fix addresses
- plan (N:1) - The plan this fix belongs to (if PLAN mode)

**State Machine:**
```
PENDING -> APPLIED -> [ROLLED_BACK]
        \-> FAILED
```

---

### PendingPlan
**Purpose:** Batch of fixes awaiting approval (for PLAN execution mode)

**Key Fields:**
- `title` - Plan summary title
- `description` - Detailed plan description
- `estimatedImpact` - JSON of expected improvements
- `status` - Current state (PENDING, APPROVED, REJECTED, EXECUTING, COMPLETED, FAILED)
- `approvedAt` - When user approved the plan
- `rejectedAt` - When user rejected the plan
- `executedAt` - When plan execution completed
- `rejectionReason` - Why user rejected (optional)

**Workflow:**
1. AI analyzes site and creates PendingPlan with status=PENDING
2. User reviews and either approves or rejects
3. If approved, status -> EXECUTING, fixes are applied
4. When all fixes complete, status -> COMPLETED

**Indexes:**
- `userId` (for user filtering)
- `connectionId` (for site filtering)
- `status` (for filtering by state)
- `createdAt` (for chronological ordering)

**Relations:**
- user (N:1) - User who must approve
- fixes (1:N) - All fixes included in this plan

---

### Job
**Purpose:** Background job queue for long-running tasks

**Key Fields:**
- `type` - Job category (CRAWL_SITE, ANALYZE_SITE, APPLY_FIX, etc.)
- `status` - Execution state (PENDING, RUNNING, COMPLETED, FAILED, CANCELLED, RETRYING)
- `priority` - Execution priority (1=highest, 10=lowest)
- `payload` - JSON input data for the job
- `result` - JSON output data after completion
- `error` - Error message if failed
- `attempts` - Number of execution attempts
- `maxAttempts` - Maximum retry limit (default: 3)
- `progress` - Completion percentage (0-100)
- `estimatedCompletion` - Estimated finish time
- `scheduledFor` - When job should start

**Job Types:**
- `CRAWL_SITE` - Crawl website for pages and issues
- `ANALYZE_SITE` - AI analysis of site for SEO issues
- `APPLY_FIX` - Apply a single fix
- `ROLLBACK_FIX` - Revert a fix
- `CLEANUP_ROLLBACKS` - Remove old rollback data (90+ days)
- `RESET_USAGE` - Monthly usage quota reset
- `SYNC_METRICS` - Update performance metrics
- `GENERATE_REPORT` - Create analytics report

**Retry Logic:**
- Failed jobs automatically retry up to `maxAttempts`
- Exponential backoff between retries
- After max attempts, status -> FAILED

**Indexes:**
- `status` (for job processor)
- `scheduledFor` (for scheduling)
- `priority` (for queue ordering)
- `type` (for filtering)
- `connectionId` (for site-specific jobs)
- `userId` (for user-specific jobs)

**Job Processor:**
```typescript
// lib/jobs/index.ts
export async function processJobs() {
  const job = await db.job.findFirst({
    where: {
      status: 'PENDING',
      scheduledFor: { lte: new Date() }
    },
    orderBy: [
      { priority: 'asc' },
      { scheduledFor: 'asc' }
    ]
  })
  // Execute job based on type
}
```

---

### UsageRecord
**Purpose:** Track monthly usage against plan limits

**Key Fields:**
- `period` - First day of month (e.g., 2024-01-01)
- `sitesUsed` - Number of connected sites
- `fixesApplied` - Number of fixes applied this month
- `crawlsExecuted` - Number of crawls run
- `apiCallsMade` - API calls made
- `sitesLimit` - Cached limit from user's plan
- `fixesLimit` - Cached limit from user's plan
- `overageOccurred` - Flag if user exceeded limits
- `limitWarningShown` - Flag if warning was shown

**Plan Limits:**
```javascript
{
  STARTER: { sites: 3, fixes: 500 },
  GROWTH: { sites: 10, fixes: 5000 },
  SCALE: { sites: 999, fixes: 999999 }
}
```

**Reset Process:**
- RESET_USAGE job runs monthly (cron)
- Creates new UsageRecord for new period
- Maintains historical records for analytics

**Indexes:**
- `userId` (for user lookup)
- `period` (for time-based queries)
- `userId + period` (unique constraint)

**Relations:**
- user (N:1) - User being tracked

---

## Supporting Models

### Crawl
**Purpose:** Track website crawl jobs

**Fields:**
- `status` - PENDING, RUNNING, COMPLETED, FAILED
- `pagesFound` - Number of pages discovered
- `issuesFound` - Number of issues detected
- `startedAt` - Crawl start time
- `completedAt` - Crawl end time

### Metric
**Purpose:** Time-series performance data

**Fields:**
- `date` - Date of metric snapshot
- `organicTraffic` - Organic traffic count
- `rankings` - JSON of keyword rankings
- `pageSpeed` - Page speed score
- `issuesCount` - Number of active issues
- `fixesCount` - Number of applied fixes

### AIConversation
**Purpose:** Store Claude AI conversations for context

**Fields:**
- `messages` - JSON array of {role, content}
- `context` - JSON of site-specific context
- `connectionId` - Associated site (optional)

### AuditLog
**Purpose:** Complete audit trail of all actions

**Fields:**
- `action` - Action performed (e.g., 'FIX_APPLIED', 'PLAN_APPROVED')
- `resource` - Resource type ('fix', 'issue', 'plan')
- `resourceId` - ID of the resource
- `details` - JSON with additional context
- `ipAddress` - User's IP address
- `userAgent` - User's browser/client

### Subscription
**Purpose:** Stripe subscription management

**Fields:**
- `stripeSubscriptionId` - Stripe subscription ID (unique)
- `plan` - Current plan (STARTER, GROWTH, SCALE)
- `status` - ACTIVE, CANCELLED, PAST_DUE, TRIALING
- `currentPeriodStart` - Billing period start
- `currentPeriodEnd` - Billing period end
- `trialEnd` - Trial period end date
- `cancelAtPeriodEnd` - Flag for scheduled cancellation

### Notification
**Purpose:** In-app notifications

**Fields:**
- `type` - SUCCESS, ERROR, INFO, WARNING
- `title` - Notification title
- `message` - Notification body
- `actionUrl` - Optional link to relevant page
- `icon` - Icon identifier
- `color` - Color scheme
- `read` - Read status (boolean)

---

## Team Collaboration Models

### Team
**Purpose:** Team/organization management

**Fields:**
- `name` - Team name
- `description` - Team description
- `ownerId` - User who owns the team
- `plan` - Team's subscription plan

### TeamMember
**Purpose:** Team membership

**Fields:**
- `teamId` - Team ID
- `userId` - User ID
- `role` - OWNER, ADMIN, MEMBER, VIEWER
- `joinedAt` - When user joined

### TeamInvitation
**Purpose:** Team invitations

**Fields:**
- `email` - Invitee email
- `role` - Assigned role
- `token` - Unique invitation token
- `status` - PENDING, ACCEPTED, EXPIRED, REVOKED
- `expiresAt` - Expiration timestamp

---

## Security Models

### CSRFToken
**Purpose:** OAuth flow protection

**Fields:**
- `userId` - User initiating OAuth
- `token` - Unique CSRF token
- `provider` - Platform (SHOPIFY, WORDPRESS, GOOGLE)
- `expiresAt` - Token expiration

### Webhook
**Purpose:** Outbound webhook configuration

**Fields:**
- `url` - Webhook endpoint
- `events` - JSON array of event types to send
- `secret` - HMAC secret for signature
- `enabled` - Active status
- `failureCount` - Failed delivery count
- `lastTriggeredAt` - Last successful trigger

---

## Key Relationships

```
User
├── Connections (1:N)
│   ├── Issues (1:N)
│   │   └── Fixes (1:N)
│   ├── Fixes (1:N)
│   ├── Metrics (1:N)
│   └── Crawls (1:N)
├── UsageRecords (1:N)
├── Subscriptions (1:N)
├── PendingPlans (1:N)
│   └── Fixes (1:N)
├── Notifications (1:N)
├── AuditLogs (1:N)
└── Webhooks (1:N)
```

---

## Execution Modes

### AUTOMATIC Mode
1. Issue detected → Fix created (status=PENDING)
2. Fix immediately applied (status=APPLIED)
3. No user approval required

### PLAN Mode
1. Issues detected → PendingPlan created
2. Multiple fixes grouped in plan
3. User approves/rejects entire plan
4. If approved, all fixes applied as batch

### APPROVE Mode
1. Issue detected → Fix created (status=PENDING)
2. User reviews and approves individual fix
3. Only approved fixes are applied

---

## Performance Indexes

**Critical Indexes:**
```sql
-- User lookups
CREATE INDEX idx_user_clerkid ON User(clerkId);
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_user_plan ON User(plan);

-- Connection health monitoring
CREATE INDEX idx_connection_userid ON Connection(userId);
CREATE INDEX idx_connection_status ON Connection(status);
CREATE INDEX idx_connection_platform ON Connection(platform);

-- Issue prioritization
CREATE INDEX idx_issue_connectionid ON Issue(connectionId);
CREATE INDEX idx_issue_status ON Issue(status);
CREATE INDEX idx_issue_severity ON Issue(severity);
CREATE INDEX idx_issue_type ON Issue(type);

-- Fix tracking
CREATE INDEX idx_fix_connectionid ON Fix(connectionId);
CREATE INDEX idx_fix_status ON Fix(status);
CREATE INDEX idx_fix_appliedat ON Fix(appliedAt);
CREATE INDEX idx_fix_rollbackdeadline ON Fix(rollbackDeadline);

-- Job queue processing
CREATE INDEX idx_job_status ON Job(status);
CREATE INDEX idx_job_scheduledfor ON Job(scheduledFor);
CREATE INDEX idx_job_priority ON Job(priority);
CREATE INDEX idx_job_type ON Job(type);

-- Audit trail
CREATE INDEX idx_auditlog_userid ON AuditLog(userId);
CREATE INDEX idx_auditlog_createdat ON AuditLog(createdAt);
CREATE INDEX idx_auditlog_action ON AuditLog(action);

-- Time-series metrics
CREATE INDEX idx_metric_connectionid ON Metric(connectionId);
CREATE INDEX idx_metric_date ON Metric(date);
```

---

## Data Retention Policies

**90-Day Rollback Window:**
- Fix rollback data is retained for 90 days
- CLEANUP_ROLLBACKS job runs daily to remove old data
- After 90 days, `beforeState` is cleared but Fix record remains

**Audit Log Retention:**
- Audit logs retained indefinitely for compliance
- Can be archived to cold storage after 1 year

**Metrics Retention:**
- Daily metrics retained for 2 years
- Aggregated to monthly after 90 days

---

## Migration Strategy

**Current Status:** Schema is ready for initial migration

**Steps to Deploy:**

1. **Generate Prisma Client:**
```bash
npx prisma generate
```

2. **Create Initial Migration:**
```bash
npx prisma migrate dev --name init
```

3. **Push to Production:**
```bash
npx prisma migrate deploy
```

**Schema Versioning:**
- All schema changes tracked via Prisma migrations
- Each migration includes up/down scripts
- Production migrations use `prisma migrate deploy`
- Development uses `prisma migrate dev`

---

## Common Queries

**Get User's Active Issues:**
```typescript
const issues = await db.issue.findMany({
  where: {
    connection: { userId },
    status: { in: ['OPEN', 'IN_PROGRESS'] }
  },
  orderBy: [
    { severity: 'asc' },
    { impactScore: 'desc' }
  ],
  include: {
    connection: true,
    fixes: true
  }
})
```

**Get Pending Jobs:**
```typescript
const jobs = await db.job.findMany({
  where: {
    status: 'PENDING',
    scheduledFor: { lte: new Date() }
  },
  orderBy: [
    { priority: 'asc' },
    { scheduledFor: 'asc' }
  ],
  take: 10
})
```

**Check Usage Limits:**
```typescript
const currentPeriod = new Date()
currentPeriod.setDate(1)
currentPeriod.setHours(0, 0, 0, 0)

const usage = await db.usageRecord.findUnique({
  where: {
    userId_period: {
      userId,
      period: currentPeriod
    }
  }
})

const canAddSite = usage.sitesUsed < usage.sitesLimit
const canApplyFix = usage.fixesApplied < usage.fixesLimit
```

**Get Pending Plans:**
```typescript
const plans = await db.pendingPlan.findMany({
  where: {
    userId,
    status: 'PENDING'
  },
  include: {
    fixes: {
      include: {
        issue: true
      }
    }
  },
  orderBy: { createdAt: 'desc' }
})
```

---

## Schema Health Checklist

- [x] All foreign keys have proper onDelete behavior
- [x] Critical fields have indexes
- [x] Unique constraints on natural keys
- [x] Timestamp fields on all models
- [x] Proper enum definitions
- [x] JSON fields documented
- [x] Encrypted fields identified
- [x] Cascading deletes configured
- [x] Default values set appropriately
- [x] Required fields marked correctly

---

## Next Steps

1. Run `npx prisma generate` to generate TypeScript types
2. Run `npx prisma migrate dev --name init` to create initial migration
3. Seed database with test data using `prisma/seed.ts`
4. Implement backup strategy (daily PostgreSQL dumps)
5. Set up monitoring for connection pool exhaustion
6. Configure read replicas for analytics queries (future)

---

**Schema Version:** 2.0
**Total Models:** 21
**Total Enums:** 13
**Total Indexes:** 50+
