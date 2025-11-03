# SEOLOGY.AI - Database Schema Documentation

Visual documentation of the complete database schema with relationships and constraints.

---

## Schema Overview

**Database:** PostgreSQL
**ORM:** Prisma 6.18.0
**Total Models:** 16
**Total Enums:** 11

---

## Entity Relationship Diagram (Text Format)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER (Central Entity)                    │
│─────────────────────────────────────────────────────────────────│
│ • id (PK, UUID)                                                  │
│ • clerkId (UNIQUE)                                               │
│ • email (UNIQUE)                                                 │
│ • plan (STARTER | GROWTH | SCALE)                                │
│ • executionMode (AUTOMATIC | PLAN | APPROVE)                     │
└─────────────────────────────────────────────────────────────────┘
         │
         ├──[1:N]─→ CONNECTION (CMS integrations)
         │           └──[1:N]─→ ISSUE (SEO problems)
         │           │          └──[1:N]─→ FIX (Applied fixes)
         │           ├──[1:N]─→ FIX (Direct relation)
         │           ├──[1:N]─→ METRIC (Performance tracking)
         │           └──[1:N]─→ CRAWL (Crawl jobs)
         │
         ├──[1:N]─→ AI_CONVERSATION (Claude AI chats)
         ├──[1:N]─→ AUDIT_LOG (Activity tracking)
         ├──[1:N]─→ SUBSCRIPTION (Stripe billing)
         ├──[1:N]─→ NOTIFICATION (In-app alerts)
         ├──[1:N]─→ WEBHOOK (Event subscriptions)
         │
         ├──[1:N]─→ TEAM (Owned teams)
         ├──[1:N]─→ TEAM_MEMBER (Team memberships)
         └──[1:N]─→ TEAM_INVITATION (Sent invitations)

┌─────────────────────────────────────────────────────────────────┐
│                              TEAM                                │
│─────────────────────────────────────────────────────────────────│
│ • id (PK, UUID)                                                  │
│ • name                                                           │
│ • ownerId (FK → User.id)                                         │
│ • plan (STARTER | GROWTH | SCALE)                                │
└─────────────────────────────────────────────────────────────────┘
         │
         ├──[1:N]─→ TEAM_MEMBER (Team members)
         ├──[1:N]─→ TEAM_INVITATION (Pending invitations)
         └──[1:N]─→ CONNECTION (Shared connections)
```

---

## Core Tables

### User
**Purpose:** Authentication and account management (managed by Clerk)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| clerkId | String | UNIQUE, NOT NULL | Clerk authentication ID |
| email | String | UNIQUE, NOT NULL | User email address |
| name | String | NULLABLE | Display name |
| plan | Enum | DEFAULT 'STARTER' | Subscription plan |
| executionMode | Enum | DEFAULT 'AUTOMATIC' | Fix execution mode |
| stripeCustomerId | String | NULLABLE | Stripe customer ID |
| stripeSubscriptionId | String | NULLABLE | Stripe subscription ID |
| createdAt | DateTime | DEFAULT now() | Account creation date |
| updatedAt | DateTime | AUTO UPDATE | Last update timestamp |

**Relationships:**
- Has many: Connections, AIConversations, AuditLogs, Subscriptions, Notifications, Webhooks, TeamMemberships
- Owns many: Teams

**Indexes:**
- PRIMARY: id
- UNIQUE: clerkId, email

---

### Connection
**Purpose:** CMS platform integrations (Shopify, WordPress, etc.)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FK, NOT NULL | Owner user ID |
| teamId | UUID | FK, NULLABLE | Team ID (if shared) |
| platform | Enum | NOT NULL | CMS platform type |
| domain | String | NOT NULL | Website domain |
| displayName | String | NULLABLE | Custom display name |
| accessToken | String | NULLABLE, ENCRYPTED | OAuth access token |
| refreshToken | String | NULLABLE, ENCRYPTED | OAuth refresh token |
| credentials | String | NULLABLE, ENCRYPTED | Platform-specific credentials (JSON) |
| status | Enum | DEFAULT 'PENDING' | Connection status |
| lastSync | DateTime | NULLABLE | Last synchronization time |
| createdAt | DateTime | DEFAULT now() | Connection creation date |
| updatedAt | DateTime | AUTO UPDATE | Last update timestamp |

**Relationships:**
- Belongs to: User, Team (optional)
- Has many: Issues, Fixes, Metrics, Crawls

**Indexes:**
- PRIMARY: id
- INDEX: userId, teamId

**Enums:**
- Platform: SHOPIFY, WORDPRESS, WIX, CUSTOM
- ConnectionStatus: PENDING, CONNECTED, ERROR, DISCONNECTED

---

### Issue
**Purpose:** SEO issues detected on websites

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| connectionId | UUID | FK, NOT NULL | Associated connection |
| type | String | NOT NULL | Issue type identifier |
| title | String | NOT NULL | Human-readable title |
| severity | Enum | NOT NULL | Issue severity level |
| pageUrl | String | NOT NULL | Affected page URL |
| details | String | NOT NULL | Issue details (JSON) |
| recommendation | String | NULLABLE | AI-generated fix suggestion |
| status | Enum | DEFAULT 'DETECTED' | Current status |
| detectedAt | DateTime | DEFAULT now() | Detection timestamp |
| fixedAt | DateTime | NULLABLE | Fix application time |
| createdAt | DateTime | DEFAULT now() | Record creation date |

**Relationships:**
- Belongs to: Connection
- Has many: Fixes

**Indexes:**
- PRIMARY: id
- INDEX: connectionId, status

**Enums:**
- Severity: CRITICAL, HIGH, MEDIUM, LOW
- IssueStatus: OPEN, IN_PROGRESS, FIXED, FAILED, IGNORED, DETECTED, FIXING

**Common Issue Types:**
- missing_meta_title
- missing_meta_description
- broken_link
- missing_alt_text
- duplicate_content
- slow_page_speed
- missing_canonical
- poor_heading_structure
- missing_schema_markup

---

### Fix
**Purpose:** Applied fixes with rollback capability

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| connectionId | UUID | FK, NOT NULL | Associated connection |
| issueId | UUID | FK, NULLABLE | Associated issue |
| description | String | NOT NULL | Fix description |
| type | String | DEFAULT 'seo_fix' | Fix type |
| targetUrl | String | NULLABLE | Target page URL |
| changes | String | NOT NULL | Applied changes (JSON) |
| beforeState | String | DEFAULT '{}' | State before fix (JSON) |
| afterState | String | DEFAULT '{}' | State after fix (JSON) |
| method | Enum | DEFAULT 'AUTOMATIC' | Application method |
| status | Enum | DEFAULT 'PENDING' | Current status |
| appliedAt | DateTime | NULLABLE | Application timestamp |
| rolledBackAt | DateTime | NULLABLE | Rollback timestamp |
| createdAt | DateTime | DEFAULT now() | Record creation date |

**Relationships:**
- Belongs to: Connection, Issue (optional)

**Indexes:**
- PRIMARY: id
- INDEX: connectionId, status

**Enums:**
- FixMethod: AUTOMATIC, MANUAL, PENDING
- FixStatus: PENDING, APPLIED, ROLLED_BACK, FAILED

**Rollback Policy:**
- Fixes can be rolled back within 90 days
- Rollback data cleaned up automatically by cleanup job

---

### Subscription
**Purpose:** Stripe billing and subscription management

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FK, NOT NULL | Associated user |
| stripeSubscriptionId | String | UNIQUE, NOT NULL | Stripe subscription ID |
| plan | Enum | NOT NULL | Subscription plan |
| status | Enum | NOT NULL | Subscription status |
| currentPeriodStart | DateTime | NOT NULL | Billing period start |
| currentPeriodEnd | DateTime | NOT NULL | Billing period end |
| createdAt | DateTime | DEFAULT now() | Subscription creation |

**Relationships:**
- Belongs to: User

**Indexes:**
- PRIMARY: id
- UNIQUE: stripeSubscriptionId
- INDEX: userId

**Enums:**
- SubscriptionStatus: ACTIVE, CANCELLED, PAST_DUE, TRIALING

---

## Supporting Tables

### AIConversation
**Purpose:** Store Claude AI conversation history

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FK, NOT NULL | User ID |
| connectionId | UUID | NULLABLE | Associated connection |
| messages | String | NOT NULL | Conversation messages (JSON array) |
| context | String | NULLABLE | Site-specific context (JSON) |
| createdAt | DateTime | DEFAULT now() | Conversation start |

**Message Format:**
```json
[
  {"role": "user", "content": "Fix my SEO issues"},
  {"role": "assistant", "content": "I'll help you..."}
]
```

---

### AuditLog
**Purpose:** Track all user actions for compliance and debugging

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FK, NOT NULL | User who performed action |
| connectionId | UUID | NULLABLE | Related connection |
| action | String | NOT NULL | Action identifier |
| resource | String | NULLABLE | Resource type |
| resourceId | UUID | NULLABLE | Resource ID |
| details | String | DEFAULT '{}' | Additional details (JSON) |
| ipAddress | String | NULLABLE | Client IP address |
| userAgent | String | NULLABLE | Client user agent |
| createdAt | DateTime | DEFAULT now() | Action timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: userId, createdAt

**Common Actions:**
- FIX_APPLIED
- CONNECTION_CREATED
- SUBSCRIPTION_UPDATED
- ISSUE_DETECTED
- USER_LOGIN

---

### Notification
**Purpose:** In-app notification system

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FK, NOT NULL | Recipient user ID |
| type | String | NOT NULL | Notification type |
| title | String | NOT NULL | Notification title |
| message | String | NOT NULL | Notification message |
| actionUrl | String | NULLABLE | Link to related page |
| read | Boolean | DEFAULT false | Read status |
| createdAt | DateTime | DEFAULT now() | Creation timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: userId, read

**Notification Types:**
- SUCCESS: Fix applied successfully
- ERROR: Fix failed
- INFO: Informational message
- WARNING: Usage limit warning
- USAGE_LIMIT: Approaching/at limit

---

### Webhook
**Purpose:** Event subscription system for integrations

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| userId | UUID | FK, NOT NULL | Webhook owner |
| url | String | NOT NULL | Callback URL |
| events | String | NOT NULL | Subscribed events (JSON array) |
| secret | String | NOT NULL | HMAC signature secret |
| enabled | Boolean | DEFAULT true | Enable/disable webhook |
| failureCount | Int | DEFAULT 0 | Failed delivery attempts |
| lastTriggeredAt | DateTime | NULLABLE | Last trigger time |
| createdAt | DateTime | DEFAULT now() | Webhook creation |
| updatedAt | DateTime | AUTO UPDATE | Last update |

**Indexes:**
- PRIMARY: id
- INDEX: userId, enabled

**Webhook Events:**
- fix.applied
- fix.failed
- issue.detected
- connection.connected
- connection.error
- subscription.updated

---

### Metric
**Purpose:** Track performance metrics over time

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| connectionId | UUID | FK, NOT NULL | Associated connection |
| date | DateTime | DEFAULT now() | Metric date |
| organicTraffic | Int | NULLABLE | Organic traffic count |
| rankings | String | NULLABLE | Keyword rankings (JSON) |
| pageSpeed | Float | NULLABLE | Page speed score |
| issuesCount | Int | NULLABLE | Total issues |
| fixesCount | Int | NULLABLE | Total fixes |
| createdAt | DateTime | DEFAULT now() | Record creation |

**Unique Constraint:**
- connectionId + date (one metric per connection per day)

**Indexes:**
- PRIMARY: id
- UNIQUE: (connectionId, date)
- INDEX: connectionId

---

### Crawl
**Purpose:** Track website crawl jobs

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| connectionId | UUID | FK, NOT NULL | Connection being crawled |
| status | Enum | DEFAULT 'PENDING' | Crawl status |
| pagesFound | Int | NULLABLE | Total pages discovered |
| issuesFound | Int | NULLABLE | Total issues detected |
| startedAt | DateTime | NULLABLE | Crawl start time |
| completedAt | DateTime | NULLABLE | Crawl completion time |
| createdAt | DateTime | DEFAULT now() | Record creation |

**Indexes:**
- PRIMARY: id
- INDEX: connectionId, status

**Enums:**
- CrawlStatus: PENDING, RUNNING, COMPLETED, FAILED

---

## Team Collaboration Tables

### Team
**Purpose:** Team/organization management

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | String | NOT NULL | Team name |
| description | String | NULLABLE | Team description |
| ownerId | UUID | FK, NOT NULL | Team owner user ID |
| plan | Enum | DEFAULT 'STARTER' | Team subscription plan |
| createdAt | DateTime | DEFAULT now() | Team creation |
| updatedAt | DateTime | AUTO UPDATE | Last update |

**Relationships:**
- Belongs to: User (owner)
- Has many: TeamMembers, TeamInvitations, Connections

**Indexes:**
- PRIMARY: id
- INDEX: ownerId

---

### TeamMember
**Purpose:** Team membership and roles

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| teamId | UUID | FK, NOT NULL | Team ID |
| userId | UUID | FK, NOT NULL | Member user ID |
| role | Enum | DEFAULT 'MEMBER' | Team role |
| joinedAt | DateTime | DEFAULT now() | Join timestamp |

**Unique Constraint:**
- teamId + userId (one membership per team)

**Indexes:**
- PRIMARY: id
- UNIQUE: (teamId, userId)
- INDEX: teamId, userId

**Enums:**
- TeamRole: OWNER, ADMIN, MEMBER, VIEWER

**Permissions:**
- OWNER: Full control
- ADMIN: Manage members, edit settings
- MEMBER: Create connections, apply fixes
- VIEWER: Read-only access

---

### TeamInvitation
**Purpose:** Pending team invitations

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| teamId | UUID | FK, NOT NULL | Team ID |
| email | String | NOT NULL | Invitee email |
| role | Enum | DEFAULT 'MEMBER' | Assigned role |
| invitedBy | UUID | FK, NOT NULL | Inviter user ID |
| status | Enum | DEFAULT 'PENDING' | Invitation status |
| token | String | UNIQUE, NOT NULL | Invitation token |
| expiresAt | DateTime | NOT NULL | Expiration date |
| acceptedAt | DateTime | NULLABLE | Acceptance timestamp |
| createdAt | DateTime | DEFAULT now() | Invitation creation |

**Unique Constraints:**
- teamId + email (one active invitation per email)
- token (unique invitation links)

**Indexes:**
- PRIMARY: id
- UNIQUE: (teamId, email), token
- INDEX: teamId, email, token

**Enums:**
- InvitationStatus: PENDING, ACCEPTED, EXPIRED, REVOKED

**Invitation Flow:**
1. Admin sends invitation
2. Email sent with unique token
3. Recipient clicks link
4. Account created/linked
5. Membership activated

---

## Enums Reference

### Plan
```prisma
enum Plan {
  STARTER   // 3 sites, 500 fixes/month, $29
  GROWTH    // 10 sites, 5000 fixes/month, $99
  SCALE     // Unlimited, $299
}
```

### ExecutionMode
```prisma
enum ExecutionMode {
  AUTOMATIC // Apply all fixes immediately
  PLAN      // Create plan, approve once, execute all
  APPROVE   // Each fix requires individual approval
}
```

### Platform
```prisma
enum Platform {
  SHOPIFY   // Shopify store
  WORDPRESS // WordPress site
  WIX       // Wix website
  CUSTOM    // Custom site via Magic.js
}
```

### ConnectionStatus
```prisma
enum ConnectionStatus {
  PENDING      // Initial state
  CONNECTED    // Successfully connected
  ERROR        // Connection error
  DISCONNECTED // Manually disconnected
}
```

### Severity
```prisma
enum Severity {
  CRITICAL // Must fix immediately
  HIGH     // Important, fix soon
  MEDIUM   // Moderate impact
  LOW      // Minor improvement
}
```

### IssueStatus
```prisma
enum IssueStatus {
  OPEN        // Newly detected
  IN_PROGRESS // Being fixed
  FIXED       // Successfully fixed
  FAILED      // Fix attempt failed
  IGNORED     // User chose to ignore
  DETECTED    // Initial detection
  FIXING      // Currently applying fix
}
```

### FixMethod
```prisma
enum FixMethod {
  AUTOMATIC // Auto-applied by system
  MANUAL    // User-approved
  PENDING   // Awaiting approval
}
```

### FixStatus
```prisma
enum FixStatus {
  PENDING      // Awaiting application
  APPLIED      // Successfully applied
  ROLLED_BACK  // Reverted
  FAILED       // Application failed
}
```

### SubscriptionStatus
```prisma
enum SubscriptionStatus {
  ACTIVE    // Active subscription
  CANCELLED // Cancelled, ends at period end
  PAST_DUE  // Payment failed
  TRIALING  // Free trial period
}
```

### CrawlStatus
```prisma
enum CrawlStatus {
  PENDING   // Queued for processing
  RUNNING   // Currently crawling
  COMPLETED // Finished successfully
  FAILED    // Crawl failed
}
```

### TeamRole
```prisma
enum TeamRole {
  OWNER  // Team creator, full control
  ADMIN  // Can manage team members
  MEMBER // Can use team resources
  VIEWER // Read-only access
}
```

### InvitationStatus
```prisma
enum InvitationStatus {
  PENDING  // Awaiting acceptance
  ACCEPTED // Invitation accepted
  EXPIRED  // Past expiration date
  REVOKED  // Cancelled by admin
}
```

---

## Data Flow Examples

### User Onboarding Flow

```
1. User signs up via Clerk
   → User record created (via webhook)

2. User connects Shopify store
   → Connection record created (PENDING status)
   → OAuth flow → tokens encrypted and stored

3. User initiates crawl
   → Crawl record created (PENDING)
   → Job queued → status RUNNING
   → Pages discovered

4. Issues detected
   → Issue records created (DETECTED status)
   → Severity assigned by Claude AI

5. User selects execution mode
   → User.executionMode updated

6. Fixes applied
   → Fix records created (PENDING → APPLIED)
   → Issue.status updated (DETECTED → FIXED)
   → Notification created (SUCCESS)
   → AuditLog created (FIX_APPLIED)
```

### Team Collaboration Flow

```
1. User creates team
   → Team record created
   → TeamMember record (OWNER role)

2. Owner invites member
   → TeamInvitation created (PENDING)
   → Email sent with token

3. Member accepts invitation
   → TeamMember record created
   → TeamInvitation.status = ACCEPTED

4. Member creates connection
   → Connection.teamId = team.id
   → All team members can access

5. Member applies fix
   → Fix created under team connection
   → AuditLog tracks which member
```

---

## Performance Considerations

### Indexed Queries (Fast)
```sql
-- These queries use indexes
SELECT * FROM "Connection" WHERE "userId" = ?
SELECT * FROM "Issue" WHERE "connectionId" = ?
SELECT * FROM "Fix" WHERE "status" = ?
SELECT * FROM "Notification" WHERE "userId" = ? AND "read" = false
```

### Non-Indexed Queries (Slower)
```sql
-- These might need additional indexes in production
SELECT * FROM "Issue" WHERE "severity" = ?
SELECT * FROM "Fix" WHERE "appliedAt" > ?
SELECT * FROM "AuditLog" WHERE "action" = ?
```

### Recommended Additional Indexes for Scale
```prisma
// Add these if query performance degrades
@@index([severity]) on Issue
@@index([appliedAt]) on Fix
@@index([action]) on AuditLog
@@index([status, createdAt]) on Crawl
```

---

## Data Retention Policies

### Fix Rollback Data
- **Retention:** 90 days
- **Cleanup:** Automated via cleanup job
- **Job:** CLEANUP_ROLLBACKS (runs monthly)

### Audit Logs
- **Retention:** Indefinite (compliance)
- **Archival:** Consider archiving logs older than 1 year
- **Storage:** May grow large, monitor size

### Notifications
- **Retention:** Consider deleting read notifications older than 30 days
- **Cleanup:** Manual or scheduled job
- **User Impact:** None (already read)

### Crawl Records
- **Retention:** Keep last 10 crawls per connection
- **Cleanup:** Optional, older records provide history
- **Value:** Trend analysis

---

## Security Measures

### Encrypted Fields
All sensitive credentials encrypted using AES-256-GCM:
- Connection.accessToken
- Connection.refreshToken
- Connection.credentials

### User Isolation
All queries MUST filter by userId:
```typescript
// Correct
const connections = await db.connection.findMany({
  where: { userId } // Always filter by user
})

// WRONG - security vulnerability
const connections = await db.connection.findMany()
```

### Cascade Deletes
When user deleted, automatically deletes:
- Connections → Issues → Fixes (cascade chain)
- Subscriptions
- Notifications
- AuditLogs (keep for compliance?)
- AIConversations

### Team Data Isolation
- TeamMembers have role-based access
- Connections can be team-owned (teamId)
- Verify team membership before operations

---

## Backup Strategy

### Recommended Approach

1. **Automated Daily Backups**
   ```bash
   pg_dump -h host -U user seology > backup_$(date +%Y%m%d).sql
   ```

2. **Point-in-Time Recovery (PITR)**
   - Enable on production database
   - Allows recovery to any point in time

3. **Backup Retention**
   - Daily: 7 days
   - Weekly: 4 weeks
   - Monthly: 12 months

4. **Test Restores**
   - Monthly restore tests
   - Verify data integrity

---

## Schema Change Process

### Development
```bash
1. Edit prisma/schema.prisma
2. npx prisma db push
3. Test changes
4. Commit schema.prisma
```

### Production
```bash
1. Edit prisma/schema.prisma
2. npx prisma migrate dev --name change_description
3. Test migration
4. Commit schema.prisma + migration files
5. Deploy → prisma migrate deploy (automatic)
```

---

## Useful Queries

### Active Users Count
```sql
SELECT COUNT(*) FROM "User";
```

### Connections by Platform
```sql
SELECT "platform", COUNT(*) as count
FROM "Connection"
GROUP BY "platform";
```

### Most Common Issues
```sql
SELECT "type", COUNT(*) as count
FROM "Issue"
GROUP BY "type"
ORDER BY count DESC
LIMIT 10;
```

### Fix Success Rate
```sql
SELECT
  "status",
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM "Fix"
GROUP BY "status";
```

### Usage by Plan
```sql
SELECT
  u."plan",
  COUNT(DISTINCT u.id) as users,
  COUNT(DISTINCT c.id) as connections,
  COUNT(f.id) as fixes_applied
FROM "User" u
LEFT JOIN "Connection" c ON c."userId" = u.id
LEFT JOIN "Fix" f ON f."connectionId" = c.id AND f."status" = 'APPLIED'
GROUP BY u."plan";
```

---

## Summary

**Total Tables:** 16
**Total Relationships:** 24
**Total Indexes:** 32
**Total Unique Constraints:** 9
**Total Enums:** 11

**Schema Status:** Production-ready
**Last Updated:** 2025-11-03
**Schema File:** `prisma/schema.prisma`

---
