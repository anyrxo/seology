# Known Issues & Fixes Required

**Status**: Pre-Production
**Last Updated**: 2025-10-31

This document tracks known TypeScript compilation errors that need to be resolved before production deployment.

---

## Critical Issues

### 1. Magic.js API Routes - Missing Models

**Issue**: Magic.js API routes (`app/api/magic/*`) reference database models that don't exist in the Prisma schema.

**Affected Files**:
- `app/api/magic/connect/route.ts`
- `app/api/magic/page-scan/route.ts`
- `app/api/magic/fix-status/route.ts`
- `app/api/magic/pending-fixes/route.ts`

**Problem**:
The Magic.js integration requires a `Site` model separate from `Connection`, but the schema currently doesn't have this model. The API routes expect:
- `Connection` has a `sites` relationship
- `Site` model with fields like `siteId`, `apiKey`, etc.
- `Issue` model has `siteId` field
- `Metric` model has `siteId` field

**Solution Options**:

**Option A**: Add `Site` model to schema (recommended)
```prisma
model Site {
  id            String   @id @default(uuid())
  connectionId  String
  url           String
  apiKey        String?  // For Magic.js integration
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  connection    Connection @relation(fields: [connectionId], references: [id])
  issues        Issue[]
  metrics       Metric[]
  jobs          Job[]

  @@map("sites")
}
```

**Option B**: Remove Magic.js integration
If Universal JavaScript integration is not needed for MVP, remove:
- `/app/api/magic/` folder
- `/public/magic.js` file
- References in documentation

### 2. Prisma Schema - Missing Fields & Relationships

**Issue**: Several models are missing fields that are referenced in the code.

**Required Changes**:

```prisma
model Issue {
  // ADD:
  siteId          String?  // For Magic.js
  site            Site?    @relation(fields: [siteId], references: [id])

  // EXISTING:
  connectionId    String
  // ...
}

model Metric {
  // ADD:
  siteId          String?  // For Magic.js
  site            Site?    @relation(fields: [siteId], references: [id])

  // EXISTING:
  connectionId    String
  // ...
}

model Fix {
  // ADD:
  error           String?  // For failure tracking
  rolledBackAt    DateTime?

  // EXISTING:
  // ...
}

enum FixStatus {
  PENDING
  APPLIED
  ROLLED_BACK
  ROLLING_BACK  // ADD THIS
  ROLLBACK_FAILED  // ADD THIS
  FAILED
}

enum IssueStatus {
  DETECTED
  FIXING
  FIXED
  FAILED
  FIX_FAILED  // ADD THIS
  IGNORED
}

model AuditLog {
  // ADD:
  siteId          String?
  site            Site?    @relation(fields: [siteId], references: [id])

  // EXISTING:
  connectionId    String
  // ...
}

model Connection {
  // ADD (if using Site model):
  sites           Site[]

  // EXISTING:
  // ...
}
```

### 3. Stripe API Version

**Issue**: Stripe API version is outdated.

**Files**:
- `lib/stripe.ts:9` - Change `'2024-10-28.acacia'` to `'2025-02-24.acacia'`
- `scripts/setup-stripe-products.ts:13` - Same change

**Fix**:
```typescript
// OLD:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
})

// NEW:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})
```

### 4. Middleware - Missing Export

**Issue**: `middleware.ts:3` imports `prisma` from `@/lib/db` but it's not exported.

**File**: `lib/db.ts`

**Fix**:
```typescript
// Ensure this is exported:
export const prisma = db
```

Or update middleware.ts:
```typescript
// Change:
import { prisma } from '@/lib/db'

// To:
import { db } from '@/lib/db'
```

### 5. Rollback System - Missing Methods

**Issue**: `lib/rollback.ts:174` calls `shopifyService.updatePageSEO()` which doesn't exist.

**File**: `lib/shopify.ts`

**Fix**: Add missing method or use existing methods:
```typescript
export class ShopifyService {
  // ... existing methods ...

  async updatePageSEO(pageId: string, data: PageSEOData) {
    // Implementation
  }
}
```

---

## Medium Priority Issues

### 6. WordPress Integration - Sites Relationship

**Files**:
- `lib/wordpress.ts:327`
- `lib/wordpress.ts:330`
- `lib/wordpress.ts:366`
- `lib/wordpress.ts:369`

**Issue**: Same as Magic.js - references `sites` on `Connection`

**Fix**: Same as Issue #1 - add Site model or update WordPress integration

### 7. Billing Webhook - Type Issues

**Files**:
- `app/api/billing/webhook/route.ts:195`
- `app/api/billing/webhook/route.ts:234`

**Issue**: Stripe Subscription type not compatible with JsonValue

**Fix**:
```typescript
// OLD:
details: {
  amount: amount_due,
  currency,
  subscriptionId: subscription, // This is wrong
}

// NEW:
details: {
  amount: amount_due,
  currency,
  subscriptionId: typeof subscription === 'string' ? subscription : subscription.id,
}
```

### 8. Execution Modes - Type Mismatches

**Files**:
- Multiple type errors in `lib/execution-modes.ts`

**Issue**: Missing fields and wrong enum values

**Fix**: Update based on actual schema after fixing Issues #1 and #2

---

## Low Priority Issues

### 9. Usage Tracking - Null vs Undefined

**Files**: Multiple files with `Type 'null' is not assignable to type 'string | undefined'`

**Fix**: Add null checks or use `|| undefined`:
```typescript
// OLD:
page: fix.issue.page

// NEW:
page: fix.issue?.page || undefined
```

### 10. Shopify Integration - Missing Methods

**Files**:
- `lib/shopify.ts` - Some methods referenced but not implemented

**Fix**: Either implement missing methods or remove references

---

## Recommended Fix Order

1. **First**: Decide on Magic.js integration
   - If keeping it: Add Site model to schema (Issue #1, #2)
   - If removing it: Delete Magic.js API routes and public file

2. **Second**: Update Prisma schema with missing fields (Issue #2)
   ```bash
   npx prisma format
   npx prisma generate
   npx prisma db push
   ```

3. **Third**: Fix Stripe API version (Issue #3)

4. **Fourth**: Fix middleware export (Issue #4)

5. **Fifth**: Fix rollback methods (Issue #5)

6. **Sixth**: Fix type issues in billing webhook (Issue #7)

7. **Seventh**: Fix remaining type issues (Issues #8, #9, #10)

8. **Finally**: Run TypeScript check
   ```bash
   npx tsc --noEmit
   ```

---

## Quick MVP Solution

If you want to deploy quickly without Magic.js:

### 1. Remove Magic.js Integration

```bash
# Delete Magic.js API routes
rm -rf app/api/magic

# Delete Magic.js client
rm public/magic.js

# Update documentation
# Remove Magic.js references from PRD and guides
```

### 2. Fix Remaining Issues

```bash
# Update Stripe API version
# Fix middleware export
# Fix null/undefined type issues
# Regenerate Prisma Client
npx prisma generate
```

### 3. Verify Build

```bash
npx tsc --noEmit
npm run build
```

### 4. Deploy

Once TypeScript compilation passes:
```bash
vercel --prod
```

---

## Testing After Fixes

After resolving all issues, test:

1. ✅ TypeScript compilation: `npx tsc --noEmit`
2. ✅ Build: `npm run build`
3. ✅ Dev server: `npm run dev`
4. ✅ Database migrations: `npx prisma db push`
5. ✅ API routes: Test each endpoint
6. ✅ User flow: Sign up → Onboard → Connect site
7. ✅ Billing: Test subscription flow
8. ✅ Webhooks: Test Stripe webhooks
9. ✅ Background jobs: Test crawl and analysis
10. ✅ Admin dashboard: Verify all pages work

---

## Notes

- **Database**: Since no database is configured yet, these errors won't affect local development setup until you try to build
- **Magic.js**: This is an advanced feature for universal website integration. Can be implemented post-MVP
- **Priority**: Focus on core features first (Shopify, WordPress, billing, crawling)
- **Workaround**: Comment out problematic code temporarily to get initial deployment working

---

## Status Summary

| Issue | Priority | Status | ETA |
|-------|----------|--------|-----|
| Magic.js Models | Critical | 🟡 Pending | 2-4 hours |
| Prisma Schema Updates | Critical | 🟡 Pending | 1-2 hours |
| Stripe API Version | High | 🟡 Pending | 5 min |
| Middleware Export | High | 🟡 Pending | 5 min |
| Rollback Methods | Medium | 🟡 Pending | 30 min |
| WordPress Sites | Medium | 🟡 Pending | 1 hour |
| Billing Types | Medium | 🟡 Pending | 30 min |
| Type Mismatches | Low | 🟡 Pending | 1 hour |

**Total Estimated Fix Time**: 6-9 hours

---

## Alternative: Quick Deploy Without Magic.js

**Time**: 30-45 minutes

1. Remove Magic.js files (10 min)
2. Fix critical type issues (20 min)
3. Test build (5 min)
4. Deploy (10 min)

This gets you to production faster with core features:
- ✅ Shopify integration
- ✅ WordPress integration
- ✅ Billing & subscriptions
- ✅ Site crawling
- ✅ Issue detection
- ✅ Fix application
- ✅ Admin dashboard
- ✅ Background jobs
- ✅ Notifications

Can add Magic.js in v1.1 after validating core product.

---

**Recommendation**: Start with Quick Deploy option, validate product-market fit, then add Magic.js integration based on customer demand.
