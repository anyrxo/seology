# Google Search Console - Database Migration Guide

## Overview
This guide provides step-by-step instructions for updating the Prisma schema to support Google Search Console integration.

---

## Step 1: Backup Current Database

**IMPORTANT**: Always backup before schema changes!

```bash
# Using the project's backup script
npm run db:backup

# Or manually with pg_dump (if using PostgreSQL)
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

---

## Step 2: Update Prisma Schema

### 2.1 Add GSC Models

Open `c:\Users\manna\Downloads\iimagined.webflow (1)\prisma\schema.prisma`

Add these models at the end of the file (before the closing):

```prisma
// ==================== GOOGLE SEARCH CONSOLE INTEGRATION ====================

// Google Search Console Connection
model GoogleSearchConsole {
  id            String   @id @default(uuid())
  connectionId  String   @unique
  connection    Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  siteUrl       String
  propertyType  String @default("sc-domain")

  accessToken   String   @db.Text
  refreshToken  String   @db.Text
  expiresAt     DateTime

  isConnected   Boolean  @default(true)
  lastSync      DateTime?
  lastSyncStatus String? @default("success")
  syncError     String? @db.Text

  isVerified    Boolean @default(false)
  verificationMethod String?

  syncFrequency String @default("daily")
  lookbackDays  Int @default(30)

  totalImpressions Int @default(0)
  totalClicks      Int @default(0)
  avgCTR           Float @default(0)
  avgPosition      Float @default(0)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  analytics     SearchAnalytics[]
  syncHistory   GSCSyncHistory[]

  @@index([connectionId])
  @@index([isConnected])
  @@index([lastSync])
}

model SearchAnalytics {
  id            String   @id @default(uuid())
  gscId         String
  gsc           GoogleSearchConsole @relation(fields: [gscId], references: [id], onDelete: Cascade)

  connectionId  String
  connection    Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  date          DateTime
  url           String
  query         String?
  country       String?
  device        String?

  impressions   Int
  clicks        Int
  ctr           Float
  position      Float

  page          String?
  pageType      String?

  fixId         String?
  fix           Fix?     @relation(fields: [fixId], references: [id], onDelete: SetNull)

  aggregationType String @default("page_query")

  createdAt     DateTime @default(now())

  @@unique([gscId, date, url, query, country, device, aggregationType])
  @@index([gscId])
  @@index([connectionId])
  @@index([date])
  @@index([url])
  @@index([query])
  @@index([fixId])
  @@index([pageType])
  @@index([connectionId, date, url])
  @@index([gscId, date, aggregationType])
}

model GSCSyncHistory {
  id            String   @id @default(uuid())
  gscId         String
  gsc           GoogleSearchConsole @relation(fields: [gscId], references: [id], onDelete: Cascade)

  syncType      String
  status        String

  startDate     DateTime
  endDate       DateTime

  rowsSynced    Int @default(0)
  queriesSynced Int @default(0)
  urlsSynced    Int @default(0)

  durationMs    Int?
  apiCalls      Int @default(0)

  error         String? @db.Text
  warningsCount Int @default(0)
  warnings      String @default("[]")

  triggeredBy   String?

  startedAt     DateTime @default(now())
  completedAt   DateTime?

  @@index([gscId])
  @@index([status])
  @@index([startedAt])
}

model GSCPerformanceSnapshot {
  id            String   @id @default(uuid())
  connectionId  String
  connection    Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  date          DateTime

  totalImpressions Int
  totalClicks      Int
  avgCTR           Float
  avgPosition      Float

  topQueries       String @db.Text
  topPages         String @db.Text
  topCountries     String @db.Text

  desktopImpressions Int @default(0)
  mobileImpressions  Int @default(0)
  tabletImpressions  Int @default(0)
  desktopClicks      Int @default(0)
  mobileClicks       Int @default(0)
  tabletClicks       Int @default(0)

  impressionsChange Float?
  clicksChange      Float?
  ctrChange         Float?
  positionChange    Float?

  createdAt     DateTime @default(now())

  @@unique([connectionId, date])
  @@index([connectionId])
  @@index([date])
}

model GSCQueryInsight {
  id            String   @id @default(uuid())
  connectionId  String
  connection    Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  query         String

  searchVolume  Int?
  competitiveness Float?
  intent        String?

  avgPosition   Float
  avgCTR        Float
  totalImpressions Int
  totalClicks   Int

  opportunityScore Float @default(0)
  recommendedAction String?

  currentBestPage String?
  recommendedPage String?

  isTracking    Boolean @default(false)
  isOpportunity Boolean @default(false)

  aiAnalysis    String? @db.Text
  suggestedKeywords String @default("[]")

  lastUpdated   DateTime @default(now())
  createdAt     DateTime @default(now())

  @@unique([connectionId, query])
  @@index([connectionId])
  @@index([opportunityScore])
  @@index([isOpportunity])
  @@index([avgPosition])
}

model GSCPagePerformance {
  id            String   @id @default(uuid())
  connectionId  String
  connection    Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  url           String
  pageType      String?

  periodStart   DateTime
  periodEnd     DateTime

  totalImpressions Int
  totalClicks      Int
  avgCTR           Float
  avgPosition      Float

  topQueries    String @db.Text
  queryCount    Int @default(0)

  impressionsTrend String @default("[]")
  clicksTrend      String @default("[]")
  positionTrend    String @default("[]")

  impressionsChange Float?
  clicksChange      Float?
  ctrChange         Float?
  positionChange    Float?

  fixId         String?
  fix           Fix?     @relation(fields: [fixId], references: [id], onDelete: SetNull)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@unique([connectionId, url, periodStart, periodEnd])
  @@index([connectionId])
  @@index([url])
  @@index([fixId])
  @@index([periodStart])
}
```

### 2.2 Update Existing Models

Find the `Connection` model and add these relations:

```prisma
model Connection {
  // ... existing fields ...

  // ADD THESE NEW RELATIONS AT THE END:
  googleSearchConsole GoogleSearchConsole?
  searchAnalytics     SearchAnalytics[]
  gscSnapshots        GSCPerformanceSnapshot[]
  gscQueryInsights    GSCQueryInsight[]
  gscPagePerformance  GSCPagePerformance[]

  // Keep existing @@index and @@unique directives
}
```

Find the `Fix` model and add these relations:

```prisma
model Fix {
  // ... existing fields ...

  // ADD THESE NEW RELATIONS AT THE END:
  searchAnalytics    SearchAnalytics[]
  gscPagePerformance GSCPagePerformance[]

  // Keep existing @@index directives
}
```

Find the `CSRFToken` model and update the provider enum:

```prisma
model CSRFToken {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  provider  String // SHOPIFY, WORDPRESS, GOOGLE  <-- Add GOOGLE here in comment
  metadata  String?  @default("{}") // ADD THIS FIELD if not present
  createdAt DateTime @default(now())
  expiresAt DateTime

  @@index([userId])
  @@index([token])
  @@index([expiresAt])
}
```

---

## Step 3: Generate Prisma Client

```bash
npx prisma generate
```

**Expected Output:**
```
✔ Generated Prisma Client (v6.x.x) to ./node_modules/@prisma/client
```

---

## Step 4: Push Schema to Database

```bash
npx prisma db push
```

**Expected Output:**
```
🚀  Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client (v6.x.x) to ./node_modules/@prisma/client
```

**What This Does:**
- Creates new tables: `GoogleSearchConsole`, `SearchAnalytics`, `GSCSyncHistory`, `GSCPerformanceSnapshot`, `GSCQueryInsight`, `GSCPagePerformance`
- Adds indexes for query performance
- Updates relations in existing tables
- No data loss (non-destructive operation)

---

## Step 5: Verify Migration

### 5.1 Check Tables Created

```bash
npx prisma studio
```

Navigate to the database and verify these new tables exist:
- ✅ GoogleSearchConsole
- ✅ SearchAnalytics
- ✅ GSCSyncHistory
- ✅ GSCPerformanceSnapshot
- ✅ GSCQueryInsight
- ✅ GSCPagePerformance

### 5.2 Verify Relations

In Prisma Studio:
1. Open `Connection` model
2. Verify new relation fields appear
3. Open `Fix` model
4. Verify new relation fields appear

### 5.3 Test TypeScript Types

Create a test file `test-gsc-types.ts`:

```typescript
import { db } from '@/lib/db'

async function testGSCTypes() {
  // Should compile without errors
  const gsc = await db.googleSearchConsole.findFirst({
    include: {
      connection: true,
      analytics: true,
      syncHistory: true
    }
  })

  const analytics = await db.searchAnalytics.findMany({
    where: {
      date: {
        gte: new Date('2024-01-01')
      }
    },
    include: {
      gsc: true,
      connection: true,
      fix: true
    }
  })

  console.log('Types are working correctly!')
}
```

Run:
```bash
npx ts-node test-gsc-types.ts
```

If no TypeScript errors, schema is correctly integrated!

---

## Step 6: Rollback (If Needed)

If something goes wrong:

```bash
# Restore from backup
psql $DATABASE_URL < backup_YYYYMMDD_HHMMSS.sql

# OR regenerate client from previous schema
git checkout HEAD~1 -- prisma/schema.prisma
npx prisma generate
npx prisma db push --force-reset  # ⚠️ WARNING: This will delete all data!
```

---

## Common Issues & Solutions

### Issue 1: Unique Constraint Error

**Error:**
```
Unique constraint failed on the constraint: `googleSearchConsole_connectionId_key`
```

**Solution:**
```sql
-- Delete duplicate GSC connections
DELETE FROM "GoogleSearchConsole"
WHERE id NOT IN (
  SELECT MIN(id)
  FROM "GoogleSearchConsole"
  GROUP BY "connectionId"
);
```

### Issue 2: Type Not Found

**Error:**
```
Property 'googleSearchConsole' does not exist on type 'PrismaClient'
```

**Solution:**
```bash
# Regenerate Prisma Client
rm -rf node_modules/.prisma
npx prisma generate
```

### Issue 3: Migration Timeout

**Error:**
```
Timed out waiting for the database to be ready
```

**Solution:**
```bash
# Increase timeout
DATABASE_CONNECT_TIMEOUT=60000 npx prisma db push
```

---

## Performance Tuning

### Index Analysis

After migration, analyze query performance:

```sql
-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
  AND tablename LIKE '%GSC%'
ORDER BY idx_scan DESC;

-- Check missing indexes
SELECT
  schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename LIKE '%Search%'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Add Additional Indexes (Optional)

If queries are slow, add these indexes:

```sql
-- For date range queries
CREATE INDEX idx_search_analytics_date_range
ON "SearchAnalytics" (date DESC, connectionId);

-- For fix impact analysis
CREATE INDEX idx_search_analytics_fix_url
ON "SearchAnalytics" (fixId, url, date);

-- For query insights
CREATE INDEX idx_search_analytics_query_metrics
ON "SearchAnalytics" (query, avgPosition, clicks DESC);
```

---

## Data Migration Notes

### No Data Migration Required

This is a **green field** migration - no existing data needs to be transformed.

New tables will be empty until:
1. User connects GSC via OAuth
2. First sync runs
3. Data populates from Google Search Console API

### Initial Data Population

After schema deployment:
1. Users connect GSC through UI
2. OAuth flow stores encrypted tokens
3. Initial sync imports last 30 days of data (configurable)
4. Daily cron job keeps data fresh

---

## Validation Checklist

After migration, verify:

- [ ] All new tables created successfully
- [ ] Indexes created on all specified fields
- [ ] Foreign key constraints working
- [ ] Prisma Client regenerated
- [ ] TypeScript types available
- [ ] No existing data lost
- [ ] Connection relations working
- [ ] Fix relations working
- [ ] Unique constraints enforced
- [ ] Default values applied
- [ ] Database size is reasonable
- [ ] Query performance acceptable

---

## Monitoring Post-Migration

### Database Size Growth

```sql
-- Monitor table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
  pg_total_relation_size(schemaname||'.'||tablename) AS size_bytes
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY size_bytes DESC;
```

### Index Bloat

```sql
-- Check index bloat
SELECT
  schemaname,
  tablename,
  indexname,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC
LIMIT 10;
```

### Query Performance

```sql
-- Slowest queries
SELECT
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
WHERE query LIKE '%SearchAnalytics%'
ORDER BY mean_time DESC
LIMIT 10;
```

---

## Next Steps

After successful migration:

1. ✅ Install googleapis packages (see main implementation plan)
2. ✅ Add environment variables
3. ✅ Implement API routes
4. ✅ Create frontend components
5. ✅ Test OAuth flow
6. ✅ Deploy to production
7. ✅ Monitor sync performance

---

## Support

If you encounter issues:

1. Check Prisma logs: `DEBUG="prisma:*" npx prisma db push`
2. Verify database connection: `npx prisma db pull`
3. Review Prisma documentation: https://www.prisma.io/docs
4. Check database logs for errors

---

## Conclusion

This migration adds full Google Search Console support to SEOLOGY.AI with:
- 6 new tables for GSC data
- Optimized indexes for performance
- Proper relations to existing models
- Zero data loss
- Backward compatible

The schema is production-ready and scales to millions of search analytics rows!
