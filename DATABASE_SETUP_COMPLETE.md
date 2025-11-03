# Database Setup Complete - SEOLOGY.AI

Complete database setup documentation including schema overview, relationships, seed data, migrations, and common queries.

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [Entity Relationships](#entity-relationships)
3. [Database Setup](#database-setup)
4. [Seed Data](#seed-data)
5. [Migrations](#migrations)
6. [Common Queries](#common-queries)
7. [Backup & Restore](#backup--restore)
8. [Database Utilities](#database-utilities)
9. [Performance Tips](#performance-tips)
10. [Troubleshooting](#troubleshooting)

---

## Schema Overview

SEOLOGY.AI uses PostgreSQL with Prisma ORM. The database consists of 15 core models organized into logical domains:

### Core Domains

#### 1. Users & Authentication
- **User** - Main user accounts (managed by Clerk)
  - Fields: id, clerkId, email, name, plan, role, executionMode
  - Plans: STARTER, GROWTH, SCALE
  - Roles: USER, ADMIN
  - Execution Modes: AUTOMATIC, PLAN, APPROVE

#### 2. Site Connections
- **Connection** - CMS platform connections
  - Platforms: SHOPIFY, WORDPRESS, WIX, CUSTOM
  - Status: PENDING, CONNECTED, ERROR, DISCONNECTED
  - Stores encrypted credentials using AES-256-GCM

#### 3. SEO Management
- **Issue** - Detected SEO problems
  - Types: missing_meta, broken_link, missing_alt, etc.
  - Severity: CRITICAL, HIGH, MEDIUM, LOW
  - Status: DETECTED, OPEN, IN_PROGRESS, FIXED, FAILED, IGNORED

- **Fix** - Applied SEO fixes
  - Stores before/after state for rollback capability
  - Status: PENDING, APPLIED, FAILED, ROLLED_BACK
  - 90-day rollback window

#### 4. Analytics & Monitoring
- **Metric** - Performance tracking
  - Organic traffic, rankings, page speed
  - Issues count, fixes count
  - Daily data points

- **Crawl** - Site crawling jobs
  - Status: PENDING, RUNNING, COMPLETED, FAILED
  - Tracks pages found and issues discovered

#### 5. AI & Automation
- **AIConversation** - Claude AI chat history
  - Stores messages and site context
  - Used for AI-powered recommendations

#### 6. User Management
- **Subscription** - Stripe subscription data
  - Status: ACTIVE, CANCELLED, PAST_DUE, TRIALING
  - Synced with Stripe webhooks

- **Notification** - In-app notifications
  - Types: SUCCESS, ERROR, INFO, WARNING
  - Read/unread tracking

- **AuditLog** - Action tracking
  - All user actions logged
  - IP address and user agent tracking

#### 7. Integrations
- **Webhook** - Outbound webhooks
  - Event subscriptions
  - HMAC signature verification
  - Failure tracking

#### 8. Collaboration
- **Team** - Team workspaces
- **TeamMember** - Team membership
- **TeamInvitation** - Pending invitations

#### 9. Security
- **CSRFToken** - OAuth flow protection
  - Tokens expire after use
  - Provider-specific (SHOPIFY, WORDPRESS, GOOGLE)

---

## Entity Relationships

```
User
├── Connections (1:N)
│   ├── Issues (1:N)
│   │   └── Fixes (1:N)
│   ├── Fixes (1:N)
│   ├── Metrics (1:N)
│   └── Crawls (1:N)
├── Subscriptions (1:N)
├── Notifications (1:N)
├── AuditLogs (1:N)
├── AIConversations (1:N)
├── Webhooks (1:N)
├── OwnedTeams (1:N)
└── TeamMemberships (N:M via TeamMember)

Team
├── Members (N:M via TeamMember)
├── Invitations (1:N)
└── Connections (1:N)
```

### Key Relationships

1. **User → Connection (1:N)**
   - One user can have multiple site connections
   - Cascade delete: deleting user removes all connections

2. **Connection → Issue (1:N)**
   - One connection can have many SEO issues
   - Cascade delete: deleting connection removes all issues

3. **Issue → Fix (1:N)**
   - One issue can have multiple fix attempts
   - Optional relationship (fixes can exist without issues)

4. **Connection → Metric (1:N)**
   - Daily metrics per connection
   - Unique constraint on (connectionId, date)

5. **Team → Connection (1:N)**
   - Teams can manage shared connections
   - Optional relationship (connections can be user-only)

---

## Database Setup

### Prerequisites

1. PostgreSQL 14+ installed
2. Node.js 18+ installed
3. Environment variables configured

### Environment Variables

Create `.env` file in project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/seology_dev"
DIRECT_URL="postgresql://user:password@localhost:5432/seology_dev"

# Encryption (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
ENCRYPTION_KEY="your-32-character-encryption-key-here"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Claude AI
ANTHROPIC_API_KEY="sk-ant-..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Shopify
SHOPIFY_CLIENT_ID="..."
SHOPIFY_CLIENT_SECRET="..."
```

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Push schema to database
npm run db:push

# 4. Seed database with demo data
npm run db:seed

# 5. Open Prisma Studio to view data
npm run db:studio
```

---

## Seed Data

The seed script creates comprehensive demo data:

### Demo Accounts

**Admin Account:**
- Email: admin@seology.ai
- Clerk ID: user_admin_demo_001
- Plan: SCALE
- Role: ADMIN

**Regular Users (5):**
1. Sarah Johnson (sarah@example.com) - STARTER plan, APPROVE mode
2. Michael Chen (michael@techstartup.io) - GROWTH plan, PLAN mode
3. Jennifer Williams (jennifer@enterprise.com) - SCALE plan, AUTOMATIC mode
4. Alex Martinez (alex@shopowner.com) - STARTER plan, AUTOMATIC mode
5. David Thompson (david@digitalagency.com) - GROWTH plan, PLAN mode

### Data Generated

- 6 Users (1 admin + 5 regular)
- 6 Subscriptions
- 10 Platform Connections (Shopify, WordPress, Custom)
- 30-50 SEO Issues per connection
- 15-30 Fixes per connection
- 30 days of metrics per connection
- 2-4 Notifications per user
- Audit logs for all actions
- 3 AI conversation samples
- 2 Webhook configurations
- 1 Team with members

### Running Seed Script

```bash
# Seed database
npm run db:seed

# Reset database and seed (WARNING: deletes all data)
npm run db:reset
```

### Seed Script Options

The seed script automatically:
- Cleans existing data in development mode
- Creates realistic timestamps (past 30 days)
- Encrypts sensitive credentials
- Generates varied data distributions
- Creates relationships between entities

---

## Migrations

### Creating Migrations

```bash
# Create a new migration
npm run db:migrate

# Name your migration descriptively
# Example: "add_role_to_user"
```

### Migration Best Practices

1. **Always create migrations for schema changes**
   - Use `prisma migrate dev` for development
   - Use `prisma migrate deploy` for production

2. **Migration naming conventions**
   - `add_field_to_table` - Adding new field
   - `remove_field_from_table` - Removing field
   - `create_table` - New table
   - `update_table_relationship` - Relationship changes

3. **Test migrations**
   ```bash
   # Test on local database
   npm run db:migrate

   # Verify with Prisma Studio
   npm run db:studio
   ```

4. **Production migrations**
   ```bash
   # Deploy migrations to production
   npx prisma migrate deploy
   ```

### Schema Update Workflow

```bash
# 1. Update prisma/schema.prisma
# 2. Create migration
npm run db:migrate

# 3. Migration is created in prisma/migrations/
# 4. Review the SQL file
# 5. Apply to development database
# 6. Test changes
# 7. Commit migration files to git
# 8. Deploy to production with `prisma migrate deploy`
```

---

## Common Queries

### Using Database Utilities

```typescript
import { dbUtils } from '@/lib/db-utils'

// Get user with all related data
const user = await dbUtils.getUserWithRelations(userId)

// Get dashboard metrics
const metrics = await dbUtils.getDashboardMetrics()

// Get connection with issues and fixes
const connection = await dbUtils.getConnectionWithRelations(connectionId, userId)

// Get site performance trends
const trends = await dbUtils.getSitePerformanceTrends(connectionId, 30)

// Create notification
await dbUtils.createNotification({
  userId,
  type: 'SUCCESS',
  title: 'SEO Issues Fixed',
  message: '5 issues have been automatically resolved',
  actionUrl: '/dashboard',
})

// Create audit log
await dbUtils.createAuditLog({
  userId,
  connectionId,
  action: 'FIX_APPLIED',
  resource: 'fix',
  resourceId: fixId,
  details: { type: 'missing_meta', page: '/about' },
  ipAddress: req.ip,
  userAgent: req.headers['user-agent'],
})
```

### Direct Prisma Queries

```typescript
import { db } from '@/lib/db'

// Get user connections with counts
const connections = await db.connection.findMany({
  where: { userId },
  include: {
    _count: {
      select: {
        issues: true,
        fixes: true,
      },
    },
  },
})

// Get critical issues
const criticalIssues = await db.issue.findMany({
  where: {
    severity: 'CRITICAL',
    status: { in: ['DETECTED', 'OPEN'] },
    connection: { userId },
  },
  include: {
    connection: true,
  },
  orderBy: { detectedAt: 'desc' },
})

// Get recent fixes
const recentFixes = await db.fix.findMany({
  where: {
    connection: { userId },
    status: 'APPLIED',
  },
  include: {
    issue: true,
    connection: true,
  },
  orderBy: { appliedAt: 'desc' },
  take: 10,
})

// Get metrics for date range
const startDate = new Date()
startDate.setDate(startDate.getDate() - 30)

const metrics = await db.metric.findMany({
  where: {
    connectionId,
    date: { gte: startDate },
  },
  orderBy: { date: 'asc' },
})

// Get unread notifications
const unreadNotifications = await db.notification.findMany({
  where: {
    userId,
    read: false,
  },
  orderBy: { createdAt: 'desc' },
})

// Create transaction for multi-step operations
await db.$transaction([
  db.issue.update({
    where: { id: issueId },
    data: { status: 'FIXED', fixedAt: new Date() },
  }),
  db.fix.create({
    data: {
      connectionId,
      issueId,
      description: 'Fixed missing meta description',
      status: 'APPLIED',
      appliedAt: new Date(),
      changes: JSON.stringify({ /* fix details */ }),
    },
  }),
  db.notification.create({
    data: {
      userId,
      type: 'SUCCESS',
      title: 'Issue Fixed',
      message: 'Meta description has been added',
    },
  }),
])
```

---

## Backup & Restore

### Automated Backups

**Linux/Mac:**
```bash
# Manual backup
npm run db:backup

# Schedule with cron (daily at 2 AM)
0 2 * * * cd /path/to/project && npm run db:backup >> /var/log/seology-backup.log 2>&1
```

**Windows:**
```batch
# Manual backup
scripts\backup-db.bat

# Schedule with Task Scheduler
schtasks /create /tn "SEOLOGY DB Backup" /tr "C:\path\to\scripts\backup-db.bat" /sc daily /st 02:00
```

### Backup Features

- Automatic compression (.gz)
- 30-day rotation (configurable)
- Backup verification
- Error logging
- Cloud upload support (S3 ready)

### Restore Database

```bash
# Restore from backup
npm run db:restore backups/database/seology_backup_20240315_120000.sql.gz

# Safety features:
# - Creates pre-restore backup
# - Confirmation prompt
# - Handles compressed files automatically
```

### Backup Best Practices

1. **Regular backups**
   - Daily automated backups minimum
   - Before major deployments
   - Before schema migrations

2. **Test restores regularly**
   ```bash
   # Test restore on staging database
   DATABASE_URL="postgresql://..." npm run db:restore backup.sql.gz
   ```

3. **Off-site storage**
   - Store backups in cloud storage (S3, GCS, Azure)
   - Keep 90 days of backups minimum
   - Encrypt sensitive backups

4. **Monitor backup jobs**
   - Check backup logs regularly
   - Verify backup file sizes
   - Alert on failures

---

## Database Utilities

### Available Utilities

The `lib/db-utils.ts` file provides comprehensive helper functions:

#### User Utilities
- `getUserWithRelations(userId)` - Get user with all related data
- `getUserByClerkId(clerkId)` - Find user by Clerk ID
- `getOrCreateUser(clerkData)` - Get or create from Clerk
- `getUserStats()` - Aggregate user statistics

#### Connection Utilities
- `getConnectionWithRelations(connectionId, userId)` - Full connection data
- `getUserConnections(userId)` - All user connections
- `getSiteStats()` - Site-wide statistics

#### Issue Utilities
- `getConnectionIssues(connectionId, userId, options)` - Filtered issues
- `getIssueStats()` - Issue statistics by severity/status

#### Fix Utilities
- `getConnectionFixes(connectionId, userId, options)` - Filtered fixes
- `getFixStats()` - Fix statistics and success rate

#### Metrics Utilities
- `getDashboardMetrics()` - Complete dashboard stats
- `getMetricsForDateRange(connectionId, startDate, endDate)` - Date range metrics
- `getSitePerformanceTrends(connectionId, days)` - Trend analysis

#### Notification Utilities
- `createNotification(data)` - Create notification
- `getUnreadNotificationCount(userId)` - Count unread
- `markNotificationAsRead(notificationId, userId)` - Mark read
- `markAllNotificationsAsRead(userId)` - Mark all read

#### Audit Log Utilities
- `createAuditLog(data)` - Create audit entry
- `getUserAuditLogs(userId, options)` - Get user audit logs

#### Health & Maintenance
- `checkDatabaseHealth()` - Health check with metrics
- `cleanupOldData(daysToKeep)` - Remove old data (90 days)
- `getDatabaseStats()` - Database size and counts

### Usage Examples

```typescript
// Health check
const health = await dbUtils.checkDatabaseHealth()
if (!health.healthy) {
  console.error('Database unhealthy:', health.errors)
}

// Cleanup old data (called by cron job)
const results = await dbUtils.cleanupOldData(90)
console.log(`Deleted ${results.deletedFixes} old fixes`)

// Get comprehensive dashboard data
const metrics = await dbUtils.getDashboardMetrics()
console.log(`Total users: ${metrics.userStats.totalUsers}`)
console.log(`Total issues: ${metrics.issueStats.totalIssues}`)
console.log(`Fix success rate: ${metrics.fixStats.fixSuccessRate}%`)
```

---

## Performance Tips

### Indexing Strategy

The schema includes strategic indexes:

```prisma
// User lookups
@@index([userId])

// Status filtering
@@index([status])

// Time-based queries
@@index([createdAt])

// Unique constraints
@@unique([connectionId, date]) // Metrics
```

### Query Optimization

1. **Use select to limit fields**
   ```typescript
   const users = await db.user.findMany({
     select: {
       id: true,
       email: true,
       plan: true,
     },
   })
   ```

2. **Pagination for large datasets**
   ```typescript
   const issues = await db.issue.findMany({
     where: { connectionId },
     take: 50,
     skip: page * 50,
     orderBy: { detectedAt: 'desc' },
   })
   ```

3. **Use transactions for consistency**
   ```typescript
   await db.$transaction([
     db.issue.update({ /* ... */ }),
     db.fix.create({ /* ... */ }),
   ])
   ```

4. **Batch operations**
   ```typescript
   await db.issue.createMany({
     data: issues,
     skipDuplicates: true,
   })
   ```

### Connection Pooling

Prisma automatically manages connection pooling:

- Default pool size: 10 connections
- Adjust with `DATABASE_URL?connection_limit=20`
- Monitor with `checkDatabaseHealth()`

---

## Troubleshooting

### Common Issues

#### 1. Connection Errors

**Problem:** `Can't reach database server`

**Solutions:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

#### 2. Migration Errors

**Problem:** `Migration failed to apply`

**Solutions:**
```bash
# Reset development database
npm run db:reset

# For production, manually fix and mark as applied
npx prisma migrate resolve --applied "migration_name"
```

#### 3. Seed Errors

**Problem:** `Unique constraint violation`

**Solutions:**
```bash
# Clean database first
npm run db:reset

# Or delete specific records in Prisma Studio
npm run db:studio
```

#### 4. Encryption Errors

**Problem:** `ENCRYPTION_KEY must be at least 32 characters`

**Solution:**
```bash
# Generate new key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
ENCRYPTION_KEY="generated_key_here"
```

#### 5. Performance Issues

**Problem:** Slow queries

**Solutions:**
```typescript
// Add indexes in schema.prisma
@@index([field])

// Use query optimization
// - Select only needed fields
// - Add pagination
// - Use proper WHERE clauses
```

### Debug Mode

Enable Prisma query logging:

```typescript
// lib/db.ts
export const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
```

### Health Check Endpoint

Create API route for monitoring:

```typescript
// app/api/health/db/route.ts
import { dbUtils } from '@/lib/db-utils'

export async function GET() {
  const health = await dbUtils.checkDatabaseHealth()
  return Response.json(health, {
    status: health.healthy ? 200 : 503,
  })
}
```

---

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js with Prisma](https://www.prisma.io/nextjs)
- Project CLAUDE.md for architecture details

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev                 # Start Next.js dev server
npm run db:studio          # Open Prisma Studio

# Database
npm run db:push            # Push schema changes
npm run db:migrate         # Create migration
npm run db:seed            # Seed database
npm run db:reset           # Reset and seed

# Backup
npm run db:backup          # Create backup
npm run db:restore         # Restore from backup

# Build
npm run build              # Production build
```

### File Locations

- Schema: `prisma/schema.prisma`
- Seed: `prisma/seed.ts`
- Utilities: `lib/db-utils.ts`
- Backup: `scripts/backup-db.sh`
- Restore: `scripts/restore-db.sh`

---

## Status: COMPLETE

All database setup components are now in place:

- ✅ Comprehensive schema with 15 models
- ✅ Seed data with realistic demo accounts
- ✅ Database utilities for common operations
- ✅ Backup and restore scripts
- ✅ Complete documentation
- ✅ Migration workflow
- ✅ Performance optimization
- ✅ Health checks and monitoring

The database is production-ready and fully documented.
