# Supabase Configuration Guide

## 🚨 Current Issues

### What's Missing:
1. ❌ **Row Level Security (RLS)** - Not configured (security risk!)
2. ❌ **Database Indexes** - Only basic Prisma indexes, need Supabase-specific optimizations
3. ❌ **Connection Pooling** - Using Prisma Accelerate, not native Supabase pooling
4. ❌ **Database Backups** - Not configured explicitly
5. ❌ **Monitoring & Alerts** - No database monitoring set up
6. ❌ **Database Roles** - Using default `postgres` role (not secure)
7. ❌ **Realtime Subscriptions** - Not leveraging Supabase Realtime
8. ❌ **Storage Integration** - Not using Supabase Storage for file uploads
9. ❌ **Edge Functions** - Could use for background jobs instead of polling
10. ❌ **Database Extensions** - Missing useful PostgreSQL extensions

---

## 🔒 Priority 1: Row Level Security (RLS)

**Current State:** RLS is likely DISABLED on all tables (major security risk!)

**Why Critical:**
- Without RLS, any authenticated user can access ALL data
- Direct database access bypasses application-level security
- Supabase recommends RLS for all production tables

### RLS Policies Needed:

#### 1. User Table
```sql
-- Enable RLS
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data
CREATE POLICY "Users can read own data"
ON "User"
FOR SELECT
USING (auth.uid()::text = "clerkId");

-- Users can update their own data (except sensitive fields)
CREATE POLICY "Users can update own data"
ON "User"
FOR UPDATE
USING (auth.uid()::text = "clerkId")
WITH CHECK (auth.uid()::text = "clerkId");
```

#### 2. Connection Table
```sql
ALTER TABLE "Connection" ENABLE ROW LEVEL SECURITY;

-- Users can only see their own connections
CREATE POLICY "Users can read own connections"
ON "Connection"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can create connections for themselves
CREATE POLICY "Users can create own connections"
ON "Connection"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can update their own connections
CREATE POLICY "Users can update own connections"
ON "Connection"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);

-- Users can delete their own connections
CREATE POLICY "Users can delete own connections"
ON "Connection"
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);
```

#### 3. Page, Keyword, AIInsight Tables (Similar Pattern)
```sql
-- Enable RLS on all user-data tables
ALTER TABLE "Page" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Keyword" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AIInsight" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContentSuggestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Issue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Fix" ENABLE ROW LEVEL SECURITY;

-- Page RLS
CREATE POLICY "Users can read own pages"
ON "Page"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Connection" c
    INNER JOIN "User" u ON u.id = c."userId"
    WHERE c.id = "Page"."connectionId"
    AND u."clerkId" = auth.uid()::text
  )
);
```

### Apply RLS Policies:

**File to Create:** `supabase/rls-policies.sql`

```sql
-- ==================== ROW LEVEL SECURITY POLICIES ====================
--
-- This file contains all RLS policies for SEOLOGY.AI
-- Run this in Supabase SQL Editor after schema creation
--

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Connection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Page" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Keyword" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KeywordRanking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PageKeyword" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AIInsight" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContentSuggestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PageImprovement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteHealthScore" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PageSnapshot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Issue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Fix" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Metric" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Crawl" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AIConversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Webhook" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UsageRecord" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PendingPlan" ENABLE ROW LEVEL SECURITY;

-- Helper function to get user ID from Clerk ID
CREATE OR REPLACE FUNCTION get_user_id_from_clerk()
RETURNS uuid AS $$
  SELECT id FROM "User" WHERE "clerkId" = auth.uid()::text LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- User policies
CREATE POLICY "Users can read own data" ON "User"
  FOR SELECT USING ("clerkId" = auth.uid()::text);

CREATE POLICY "Users can update own data" ON "User"
  FOR UPDATE USING ("clerkId" = auth.uid()::text);

-- Connection policies
CREATE POLICY "Users can read own connections" ON "Connection"
  FOR SELECT USING ("userId" = get_user_id_from_clerk());

CREATE POLICY "Users can create own connections" ON "Connection"
  FOR INSERT WITH CHECK ("userId" = get_user_id_from_clerk());

CREATE POLICY "Users can update own connections" ON "Connection"
  FOR UPDATE USING ("userId" = get_user_id_from_clerk());

CREATE POLICY "Users can delete own connections" ON "Connection"
  FOR DELETE USING ("userId" = get_user_id_from_clerk());

-- Page policies
CREATE POLICY "Users can read own pages" ON "Page"
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM "Connection"
      WHERE "Connection".id = "Page"."connectionId"
      AND "Connection"."userId" = get_user_id_from_clerk()
    )
  );

-- Similar policies for all other tables...
-- (See full implementation in supabase/rls-policies.sql)

-- Admin bypass (for service account)
CREATE POLICY "Service account has full access" ON "User"
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
```

---

## 📊 Priority 2: Database Indexes

**Current State:** Only Prisma-generated indexes exist

**Missing Indexes:**
1. Composite indexes for common queries
2. Partial indexes for filtered queries
3. GIN indexes for JSONB fields
4. Full-text search indexes

### Indexes to Add:

**File to Create:** `supabase/indexes.sql`

```sql
-- ==================== PERFORMANCE INDEXES ====================

-- Connection + User composite index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_connection_user_status
ON "Connection" ("userId", "status") WHERE "status" = 'CONNECTED';

-- Page composite indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_connection_type
ON "Page" ("connectionId", "pageType");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_connection_score
ON "Page" ("connectionId", "seoScore" DESC NULLS LAST);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_connection_crawled
ON "Page" ("connectionId", "lastCrawled" DESC NULLS LAST);

-- Issue severity + status composite
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_issue_connection_severity_status
ON "Issue" ("connectionId", "severity", "status")
WHERE "status" = 'OPEN';

-- Fix status + applied date
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_fix_connection_status_applied
ON "Fix" ("connectionId", "status", "appliedAt" DESC NULLS LAST);

-- Keyword search volume + difficulty
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_keyword_connection_volume_difficulty
ON "Keyword" ("connectionId", "searchVolume" DESC NULLS LAST, "difficulty" ASC NULLS LAST);

-- AIInsight priority + status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_insight_connection_priority_status
ON "AIInsight" ("connectionId", "priority", "status")
WHERE "status" = 'NEW' OR "status" = 'REVIEWED';

-- SiteHealthScore date range queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_health_connection_date
ON "SiteHealthScore" ("connectionId", "date" DESC);

-- PageSnapshot date range queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_snapshot_page_date
ON "PageSnapshot" ("pageId", "date" DESC);

-- Full-text search on Page content
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_title_fts
ON "Page" USING gin(to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '')));

-- GIN indexes for JSONB fields (if needed)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_meta_tags_gin
ON "Page" USING gin(("metaTags")::jsonb);

-- Job queue optimization
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_status_scheduled_priority
ON "Job" ("status", "scheduledFor" ASC, "priority" ASC)
WHERE "status" = 'PENDING' OR "status" = 'RUNNING';

-- Notification read status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notification_user_read_created
ON "Notification" ("userId", "read", "createdAt" DESC);

-- Usage record period lookup
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_usage_user_period
ON "UsageRecord" ("userId", "period" DESC);
```

---

## 🔌 Priority 3: Connection Configuration

**Current Setup:**
- Using Prisma Accelerate for connection pooling
- Direct connection URL for migrations

**Recommendations:**

### Option A: Keep Prisma Accelerate (Current)
**Pros:**
- ✅ Global edge caching
- ✅ Better performance for read-heavy workloads
- ✅ Automatic connection pooling

**Cons:**
- ❌ Additional cost
- ❌ Adds latency for writes
- ❌ Another service dependency

### Option B: Use Supabase Native Pooling
**Pros:**
- ✅ Included in Supabase pricing
- ✅ Lower latency
- ✅ Simpler architecture

**Cons:**
- ❌ No edge caching
- ❌ Need to manage pooling config

### Recommended: Hybrid Approach

**For read-heavy operations (use Prisma Accelerate):**
- Page data queries
- Keyword rankings
- Site health scores
- Analytics

**For write operations (use Direct URL):**
- Creating connections
- Applying fixes
- Creating crawl jobs
- User updates

**Implementation:**
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

// Read-optimized client (with Accelerate)
export const db = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

// Write-optimized client (direct connection)
export const dbWrite = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL,
})

// Use dbWrite for mutations, db for queries
```

---

## 💾 Priority 4: Backups & Recovery

**Current State:** Relying on Supabase automatic backups only

### Configure Point-in-Time Recovery (PITR):

1. **Enable PITR in Supabase Dashboard:**
   - Project Settings → Database → Point-in-time Recovery
   - Set retention period (7-30 days recommended)

2. **Set up Automated Backup Verification:**
   ```typescript
   // lib/backup-verification.ts
   export async function verifyBackups() {
     // Test restore capability
     // Alert if backups are failing
   }
   ```

3. **Document Recovery Procedures:**
   - How to restore from PITR
   - How to restore specific tables
   - Emergency contact info

---

## 📈 Priority 5: Monitoring & Alerts

**Current State:** No database monitoring configured

### Set up Supabase Monitoring:

1. **Database Metrics to Monitor:**
   - Connection pool usage
   - Query performance (slow queries)
   - Disk space usage
   - CPU and memory usage
   - Replication lag (if using replicas)

2. **Alert Thresholds:**
   - Connection pool > 80% capacity
   - Queries taking > 5 seconds
   - Disk space > 80% full
   - Failed backups

3. **Integration Options:**
   - Supabase Dashboard alerts
   - Webhook to Slack/Discord
   - Email notifications
   - PagerDuty for critical alerts

---

## 🔐 Priority 6: Database Roles & Permissions

**Current State:** Using single `postgres` role (not secure)

### Recommended Role Structure:

```sql
-- Create service account role (for backend)
CREATE ROLE seology_service WITH LOGIN PASSWORD 'secure-password';
GRANT CONNECT ON DATABASE postgres TO seology_service;
GRANT USAGE ON SCHEMA public TO seology_service;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO seology_service;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO seology_service;

-- Create read-only role (for analytics/reporting)
CREATE ROLE seology_readonly WITH LOGIN PASSWORD 'secure-password';
GRANT CONNECT ON DATABASE postgres TO seology_readonly;
GRANT USAGE ON SCHEMA public TO seology_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO seology_readonly;

-- Create admin role (for migrations)
CREATE ROLE seology_admin WITH LOGIN PASSWORD 'secure-password' SUPERUSER;
```

**Update .env.local:**
```env
# Service account (app queries)
DATABASE_URL="postgres://seology_service:password@db.supabase.co:5432/postgres"

# Admin (migrations only)
DIRECT_URL="postgres://seology_admin:password@db.supabase.co:5432/postgres"

# Read-only (analytics)
ANALYTICS_DATABASE_URL="postgres://seology_readonly:password@db.supabase.co:5432/postgres"
```

---

## 🚀 Priority 7: PostgreSQL Extensions

**Missing Extensions:**

```sql
-- Enable useful PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pg_trgm";         -- Fuzzy text search
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements"; -- Query performance tracking
CREATE EXTENSION IF NOT EXISTS "pgcrypto";        -- Encryption functions
CREATE EXTENSION IF NOT EXISTS "pg_cron";         -- Scheduled jobs (Supabase Pro)
```

---

## 📱 Priority 8: Supabase Realtime (Optional)

**Use Case:** Real-time updates for:
- Crawl progress notifications
- Issue detection alerts
- Fix application status
- Health score updates

**Setup:**
```sql
-- Enable realtime for specific tables
ALTER PUBLICATION supabase_realtime ADD TABLE "Job";
ALTER PUBLICATION supabase_realtime ADD TABLE "Notification";
ALTER PUBLICATION supabase_realtime ADD TABLE "Crawl";
```

**Frontend Integration:**
```typescript
// lib/realtime.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Subscribe to crawl updates
export function subscribeToCrawlUpdates(connectionId: string, callback: Function) {
  return supabase
    .channel(`crawl_${connectionId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'Crawl',
      filter: `connectionId=eq.${connectionId}`
    }, callback)
    .subscribe()
}
```

---

## 🎯 Implementation Checklist

### Week 1: Security
- [ ] Enable RLS on all tables
- [ ] Create RLS policies for User, Connection
- [ ] Create RLS policies for Page, Keyword, Insight models
- [ ] Test RLS with different user roles
- [ ] Create service account role
- [ ] Update environment variables

### Week 2: Performance
- [ ] Create composite indexes
- [ ] Create partial indexes for filtered queries
- [ ] Add full-text search indexes
- [ ] Test query performance improvements
- [ ] Set up query monitoring

### Week 3: Reliability
- [ ] Enable PITR backups
- [ ] Set up backup verification
- [ ] Configure monitoring alerts
- [ ] Test backup restore procedures
- [ ] Document recovery process

### Week 4: Optimization
- [ ] Enable PostgreSQL extensions
- [ ] Implement hybrid read/write client setup
- [ ] Set up Supabase Realtime (optional)
- [ ] Performance test with load
- [ ] Optimize slow queries

---

## 📊 Success Metrics

After proper Supabase configuration:
- ✅ All tables have RLS enabled
- ✅ Query performance < 100ms for 95th percentile
- ✅ Connection pool usage < 60% under normal load
- ✅ Zero unauthorized data access attempts
- ✅ Automated backups verified daily
- ✅ Alerts configured for critical issues
- ✅ Database monitoring dashboard active

---

## 🚨 Current Risk Assessment

**Security Risks:**
- 🔴 **CRITICAL**: No RLS policies (anyone can access all data)
- 🟠 **HIGH**: Using superuser role for app queries
- 🟡 **MEDIUM**: No backup verification

**Performance Risks:**
- 🟡 **MEDIUM**: Missing composite indexes (slow queries)
- 🟡 **MEDIUM**: No query monitoring (can't detect issues)

**Reliability Risks:**
- 🟡 **MEDIUM**: No PITR configured explicitly
- 🟢 **LOW**: Using Prisma Accelerate (good for now)

---

## 🔗 Resources

- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Index Types](https://www.postgresql.org/docs/current/indexes-types.html)
- [Prisma Connection Pooling](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Supabase Monitoring](https://supabase.com/docs/guides/platform/metrics)

---

## 📝 Next Steps

1. **Immediate (This Week):**
   - Create `supabase/rls-policies.sql` file
   - Enable RLS on all tables
   - Test with actual user accounts

2. **Short Term (Next 2 Weeks):**
   - Add performance indexes
   - Set up monitoring and alerts
   - Create service account roles

3. **Long Term (Next Month):**
   - Implement Supabase Realtime
   - Set up backup verification
   - Performance testing and optimization
