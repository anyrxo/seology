# Database Schema Enhancement - Migration Checklist

## Pre-Migration

- [ ] **Backup Database**
  ```bash
  pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql
  ```

- [ ] **Review Enhanced Schema**
  - [ ] Read `prisma/schema-enhanced.prisma`
  - [ ] Review `prisma/schema-enhancements.md`
  - [ ] Understand new models and fields

- [ ] **Check Current Schema State**
  ```bash
  npx prisma db pull
  npx prisma validate
  ```

- [ ] **Verify No Pending Migrations**
  ```bash
  git status prisma/
  ```

## Migration Steps

### Step 1: Apply Enhanced Schema

- [ ] **Replace Schema File**
  ```bash
  # Backup current schema
  cp prisma/schema.prisma prisma/schema-backup-$(date +%Y%m%d).prisma

  # Apply enhanced schema
  cp prisma/schema-enhanced.prisma prisma/schema.prisma
  ```

- [ ] **Generate Prisma Client**
  ```bash
  npx prisma generate
  ```

- [ ] **Check for TypeScript Errors**
  ```bash
  npx tsc --noEmit
  ```

- [ ] **Dry Run Migration**
  ```bash
  # See what changes will be made
  npx prisma migrate diff \
    --from-schema-datasource prisma/schema-backup.prisma \
    --to-schema-datasource prisma/schema.prisma \
    --script > preview-migration.sql

  # Review the SQL
  cat preview-migration.sql
  ```

### Step 2: Execute Migration

- [ ] **Push Schema Changes**
  ```bash
  # This is safe - all changes are additive
  npx prisma db push
  ```

- [ ] **Verify Migration Success**
  ```bash
  npx prisma studio
  # Check that new models appear
  # Check that new fields appear on existing models
  ```

- [ ] **Test Database Connection**
  ```bash
  # Run a simple query test
  node -e "
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    prisma.user.count().then(count => {
      console.log('Users:', count);
      process.exit(0);
    });
  "
  ```

### Step 3: Verify New Features

- [ ] **Check New Enums**
  - [ ] CanonicalStatus
  - [ ] SchemaType
  - [ ] OpenGraphType
  - [ ] TwitterCardType
  - [ ] RobotsDirective
  - [ ] GSCDataType
  - [ ] MetricChangeType
  - [ ] SchemaStatus

- [ ] **Check New Models**
  - [ ] StructuredData
  - [ ] CanonicalMapping
  - [ ] RobotsMetaTag
  - [ ] OpenGraphMetadata
  - [ ] TwitterCardMetadata
  - [ ] GoogleSearchConsoleData
  - [ ] GoogleSearchConsoleConnection
  - [ ] TrafficImpactMeasurement
  - [ ] RankingPosition
  - [ ] SchemaValidationRule

- [ ] **Check Enhanced Models**
  - [ ] Issue (new fields for canonical, robots, schema, OG, images)
  - [ ] Fix (new fields for metrics, traffic, rankings)
  - [ ] Page (new fields for canonical, robots, OG, Twitter, schema, traffic)
  - [ ] ImageAsset (new fields for schema, accessibility, optimization)
  - [ ] ShopifyProduct (new fields for schema support)

- [ ] **Check Indexes Created**
  ```sql
  -- Run in database
  SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
  FROM pg_indexes
  WHERE schemaname = 'public'
  ORDER BY tablename, indexname;
  ```

## Post-Migration

### Step 4: Deploy Helper Functions

- [ ] **Test Helper Functions**
  ```typescript
  import {
    analyzeCanonicalUrl,
    validateStructuredData,
    generateOpenGraphMetadata,
    parseRobotsDirectives
  } from '@/lib/seo-analysis-helpers'

  // Test canonical analysis
  const status = await analyzeCanonicalUrl(
    'https://example.com/page',
    'https://example.com/page'
  )
  console.log('Canonical status:', status) // Should be 'SELF'

  // Test OG metadata generation
  const og = generateOpenGraphMetadata({
    title: 'Test',
    description: 'Test description',
    url: 'https://example.com'
  })
  console.log('OG tags:', og)

  // Test robots parsing
  const directives = parseRobotsDirectives('index, follow')
  console.log('Directives:', directives) // ['INDEX', 'FOLLOW']
  ```

- [ ] **No TypeScript Errors**
  ```bash
  npx tsc --noEmit
  ```

- [ ] **Lint Check**
  ```bash
  npm run lint
  ```

### Step 5: Update Application Code

- [ ] **Add New Job Types** (optional)
  - Add handlers for new job types in `lib/jobs/index.ts`
  - SYNC_GSC_DATA
  - VALIDATE_STRUCTURED_DATA
  - CHECK_CANONICAL_URLS
  - MEASURE_TRAFFIC_IMPACT
  - UPDATE_RANKING_POSITIONS

- [ ] **Create API Routes** (optional)
  - `/api/connections/:id/gsc/connect`
  - `/api/pages/:id/canonical`
  - `/api/pages/:id/structured-data`
  - `/api/pages/:id/social-metadata`
  - `/api/fixes/:id/impact`

- [ ] **Add UI Components** (optional)
  - Canonical URL health widget
  - Schema markup validator
  - Social media preview
  - Traffic impact charts
  - Ranking position graphs

### Step 6: Data Backfill (Optional)

- [ ] **Backfill Canonical Status**
  ```typescript
  // Create a script or job to analyze existing pages
  const pages = await db.page.findMany({
    where: { canonicalStatus: null },
    take: 1000
  })

  for (const page of pages) {
    const status = await analyzeCanonicalUrl(page.url, page.canonical)
    await db.page.update({
      where: { id: page.id },
      data: { canonicalStatus: status }
    })
  }
  ```

- [ ] **Detect Issues for Existing Pages**
  ```typescript
  import { detectCanonicalIssues } from '@/lib/seo-analysis-helpers'

  const issuesFound = await detectCanonicalIssues(connectionId)
  console.log(`Found ${issuesFound} canonical issues`)
  ```

### Step 7: Testing

- [ ] **Unit Tests**
  - Test helper functions
  - Test new queries
  - Test model relationships

- [ ] **Integration Tests**
  - Test full flow: detect issue → create fix → measure impact
  - Test GSC sync (if implemented)
  - Test schema validation

- [ ] **Performance Tests**
  - Query performance for large datasets
  - Index utilization
  - N+1 query detection

### Step 8: Monitoring

- [ ] **Set Up Monitoring**
  - Database query performance
  - Error rates
  - New model usage
  - Index hit rates

- [ ] **Create Dashboards**
  - Schema adoption rate
  - Issue detection rate
  - Fix impact metrics
  - GSC sync status

## Rollback Plan

If issues occur, follow these steps:

1. **Restore Schema**
   ```bash
   cp prisma/schema-backup-YYYYMMDD.prisma prisma/schema.prisma
   npx prisma generate
   ```

2. **Rollback Database** (if needed)
   ```bash
   # Note: This will lose data in new tables
   # Only do this if absolutely necessary
   psql $DATABASE_URL < backup-YYYYMMDD-HHMMSS.sql
   ```

3. **Verify Application**
   ```bash
   npm run dev
   # Test core functionality
   ```

## Verification Tests

Run these queries to verify the migration:

```typescript
// 1. Check new models exist
const structuredDataCount = await db.structuredData.count()
const canonicalMappingCount = await db.canonicalMapping.count()
console.log('New models working:', structuredDataCount >= 0, canonicalMappingCount >= 0)

// 2. Check new fields on existing models
const page = await db.page.findFirst({
  select: {
    id: true,
    canonicalStatus: true,
    hasNoindex: true,
    ogType: true,
    twitterCard: true,
    primarySchemaType: true,
    clicks30d: true,
    avgPosition: true
  }
})
console.log('Enhanced Page model:', page)

// 3. Check relationships work
const pageWithMetadata = await db.page.findFirst({
  include: {
    structuredData: true,
    robotsMetaTags: true,
    openGraphMetadata: true,
    twitterCardMetadata: true
  }
})
console.log('Page relationships:', pageWithMetadata)

// 4. Check indexes exist
// Run this SQL query:
SELECT
  tablename,
  indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN (
    'Page',
    'Issue',
    'Fix',
    'GoogleSearchConsoleData',
    'RankingPosition',
    'ImageAsset'
  )
ORDER BY tablename, indexname;
```

## Success Criteria

- [ ] All new models accessible via Prisma Studio
- [ ] All new fields visible on existing models
- [ ] No TypeScript compilation errors
- [ ] Helper functions work correctly
- [ ] Existing functionality unchanged
- [ ] Query performance acceptable
- [ ] No runtime errors in logs

## Timeline

- **Pre-Migration**: 30 minutes
- **Migration**: 15 minutes
- **Verification**: 30 minutes
- **Backfill** (optional): 1-2 hours
- **Testing**: 1-2 hours
- **Total**: ~3-5 hours

## Notes

- All changes are **additive** - no breaking changes
- Existing queries continue to work
- New fields have defaults or are nullable
- Migration is **reversible**
- Can be done during business hours (low risk)

## Support

If issues occur:
1. Check `DATABASE-SCHEMA-ENHANCEMENT-SUMMARY.md` for details
2. Review `prisma/schema-enhancements.md` for specifics
3. Check helper functions in `lib/seo-analysis-helpers.ts`
4. Rollback using backup if needed

---

**Migration completed on**: _______________
**Completed by**: _______________
**Issues encountered**: _______________
**Notes**: _______________
