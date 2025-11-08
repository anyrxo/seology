# Database Persistence - What's Being Saved

## YES - You Have a Real PostgreSQL Database! ✅

**Database Provider**: Prisma Postgres (Cloud-hosted PostgreSQL)
**Location**: `db.prisma.io` (managed database)
**Data Persistence**: **PERMANENT** - All data is saved persistently and survives:
- App restarts
- Code updates
- Server redeployments
- User sessions ending/starting

## What Data Is Being Saved

### 1. User Data (PERMANENT)
**Table**: `User`
**Saved When**: User signs up via Clerk
**What's Stored**:
- ✅ User ID (from Clerk)
- ✅ Email address
- ✅ Name
- ✅ Subscription plan (STARTER, GROWTH, SCALE)
- ✅ Execution mode preference (AUTOMATIC, PLAN, APPROVE)
- ✅ **AI Chat visibility** (`aiChatEnabled`) - NEW ✨
- ✅ **Preferred audit scope** (`preferredAuditScope`) - NEW ✨
- ✅ Onboarding progress and completion status
- ✅ Daily automation settings
- ✅ Stripe customer/subscription IDs

**Persistence**: FOREVER (unless user deletes account)

### 2. Shopify Store Connections (PERMANENT)
**Table**: `Connection`
**Saved When**: User connects Shopify store via OAuth
**What's Stored**:
- ✅ Store domain (e.g., "example.myshopify.com")
- ✅ Encrypted access tokens (secure!)
- ✅ Connection status (CONNECTED, ERROR, DISCONNECTED)
- ✅ Last sync timestamp
- ✅ Health status
- ✅ Page count, issue count

**Persistence**: FOREVER (unless user disconnects store)

### 3. Products from Shopify (PERMANENT)
**Table**: `ShopifyProduct`
**Saved When**: During onboarding audit OR any audit
**What's Stored**:
- ✅ Product ID from Shopify
- ✅ Product title
- ✅ Product handle (URL slug)
- ✅ Product description (bodyHtml)
- ✅ SEO meta title
- ✅ SEO meta description
- ✅ Product images (as JSON)
- ✅ **SEO Score (0-100)** - calculated automatically
- ✅ Last analyzed timestamp

**Code Location**: [app/api/shopify/audit/route.ts:109-159](app/api/shopify/audit/route.ts#L109-L159)

**Example Save**:
```typescript
await db.shopifyProduct.upsert({
  where: {
    connectionId_shopifyProductId: {
      connectionId: connection.id,
      shopifyProductId: product.id,
    }
  },
  create: {
    connectionId: connection.id,
    shopifyProductId: product.id,
    title: product.title,
    seoScore: 85, // Calculated score
    metaTitle: "Product Title - Brand",
    metaDescription: "Product description...",
    images: JSON.stringify([...]),
    lastAnalyzedAt: new Date(),
  },
  update: {
    // Updates on subsequent audits
    seoScore: 90, // Improved!
    lastAnalyzedAt: new Date(),
  }
})
```

**Persistence**: FOREVER (updated on each audit, never deleted unless product deleted from Shopify)

### 4. SEO Issues Detected (PERMANENT)
**Table**: `Issue`
**Saved When**: AI audit finds SEO problems
**What's Stored**:
- ✅ Issue type (missing_meta, broken_link, missing_alt, etc.)
- ✅ Issue title and description
- ✅ Severity (CRITICAL, HIGH, MEDIUM, LOW)
- ✅ Page URL where issue found
- ✅ AI-generated recommendation
- ✅ Impact score (0-100)
- ✅ Estimated traffic impact
- ✅ Detection timestamp
- ✅ Status (DETECTED, FIXING, FIXED, FAILED)

**Code Location**: [app/api/shopify/issues/route.ts](app/api/shopify/issues/route.ts)

**Persistence**: FOREVER (tracks history of all detected issues)

### 5. SEO Fixes Applied (PERMANENT with 90-day Rollback)
**Table**: `Fix`
**Saved When**: System applies SEO fixes (automatic/plan/approve modes)
**What's Stored**:
- ✅ Fix description
- ✅ Fix type
- ✅ **Before state** (original code/content)
- ✅ **After state** (fixed code/content)
- ✅ Status (PENDING, APPLIED, FAILED, ROLLED_BACK)
- ✅ Applied timestamp
- ✅ **Rollback deadline** (appliedAt + 90 days)
- ✅ Link to related issue

**Code Location**: [app/api/shopify/fixes/route.ts](app/api/shopify/fixes/route.ts)

**Rollback Feature**:
```typescript
rollbackDeadline: fix.appliedAt + 90 days
// User can rollback any fix within 90 days
// After 90 days, rollback data is automatically cleaned up
```

**Persistence**: FOREVER (except rollback data cleaned after 90 days)

### 6. AI Chat Conversations (PERMANENT)
**Table**: `AIConversation` + `AIMessage`
**Saved When**: User chats with AI assistant
**What's Stored**:
- ✅ Full conversation history
- ✅ Each message (user + assistant)
- ✅ Timestamps
- ✅ Context (store data at time of conversation)

**Code Location**: [app/api/shopify/chat/route.ts](app/api/shopify/chat/route.ts)

**Persistence**: FOREVER (entire chat history saved)

### 7. User Preferences from Onboarding (PERMANENT)
**Table**: `User` (fields: `aiChatEnabled`, `preferredAuditScope`)
**Saved When**: User completes onboarding
**What's Stored**:
- ✅ AI Chat toggle (on/off) - affects navigation visibility
- ✅ Audit scope preference:
  - `"full"` - Audit everything
  - `"products"` - Focus on products only
  - `"content"` - Focus on blog/pages
  - `"technical"` - Focus on technical SEO

**Code Location**:
- Save: [app/api/shopify/preferences/route.ts](app/api/shopify/preferences/route.ts)
- Apply: [components/shopify/ShopifyAppNav.tsx:33-45](components/shopify/ShopifyAppNav.tsx#L33-L45)

**Example**:
```typescript
// Saved during onboarding:
await db.user.update({
  where: { id: userId },
  data: {
    aiChatEnabled: false,        // User turned off chat
    preferredAuditScope: "products" // Only audit products
  }
})

// Applied in navigation:
if (item.id === 'chat' && !aiChatEnabled) {
  return false // Hide AI Assistant link
}
```

**Persistence**: FOREVER (preferences persist across all sessions)

### 8. Activity Feed (PERMANENT)
**Table**: `Fix` + `Issue` (queried together)
**Saved When**: Automatic via other operations
**What's Stored**:
- ✅ Recent fixes applied
- ✅ Recent issues detected
- ✅ Timestamps
- ✅ Status changes

**Code Location**: [app/api/shopify/activity/route.ts](app/api/shopify/activity/route.ts)

**Persistence**: FOREVER (full audit trail)

## Database Technology Stack

### Prisma ORM
```typescript
import { db } from '@/lib/db'

// All database operations use Prisma:
const products = await db.shopifyProduct.findMany({
  where: { connectionId: connection.id },
  orderBy: { seoScore: 'asc' }
})
```

### Connection Pooling
- **DATABASE_URL**: Uses Prisma Accelerate for query caching and connection pooling
- **DIRECT_URL**: Direct PostgreSQL connection for migrations

### Data Safety Features

1. **Encryption**: All access tokens encrypted with AES-256
   - Location: `lib/encryption.ts`
   - Key: `ENCRYPTION_KEY` in `.env.local`

2. **Cascade Deletes**: When user deletes account:
   ```prisma
   user User @relation(fields: [userId], references: [id], onDelete: Cascade)
   ```
   - Automatically deletes all connections, issues, fixes, etc.

3. **Transactions**: Multi-step operations use transactions:
   ```typescript
   await db.$transaction([
     db.shopifyProduct.create({ ... }),
     db.issue.update({ ... })
   ])
   // Either ALL succeed or ALL fail (no partial data)
   ```

4. **Indexes**: Fast queries with database indexes:
   ```prisma
   @@index([connectionId, status, detectedAt])
   // Optimized for common queries
   ```

## Data You Can View Right Now

**Prisma Studio**: Database GUI running at http://localhost:5555

You can view/edit:
- All users
- All connections
- All products
- All issues
- All fixes
- All chat messages
- All preferences

## What Happens During App Updates?

### ✅ Safe Operations (Data PRESERVED):
- Code changes (updating TypeScript files)
- Adding new features
- Bug fixes
- UI changes
- API endpoint modifications
- Deploying to Vercel

### ✅ Schema Migrations (Data PRESERVED):
```bash
npx prisma db push
# Adds new fields (like aiChatEnabled, preferredAuditScope)
# Existing data is NEVER deleted
# Only adds new columns with default values
```

### ❌ Destructive Operations (Data LOST):
**You would need to explicitly run these commands** (you haven't):
```bash
npx prisma migrate reset  # ❌ DANGEROUS - Deletes everything
npx prisma db push --force-reset  # ❌ DANGEROUS - Deletes everything
DROP DATABASE  # ❌ DANGEROUS - Deletes everything
```

**We have NOT run any of these - your data is safe!**

## Session Continuity

### What Persists Across Sessions:
✅ User account and preferences
✅ All Shopify store connections
✅ All products and SEO scores
✅ All detected issues
✅ All applied fixes (with rollback data)
✅ Full chat history
✅ Onboarding preferences (chat visibility, audit scope)
✅ Activity feed history

### What Doesn't Persist:
❌ In-memory state (React component state)
❌ Temporary UI state (modals open/closed)
❌ Active API requests (these complete or timeout)

### How Session Continuity Works:

**Scenario 1: User closes browser and returns tomorrow**
```typescript
// On return:
1. User logs in via Clerk ✅
2. System fetches user from database ✅
3. Loads all preferences (chat visibility, audit scope) ✅
4. Loads all products, issues, fixes ✅
5. Loads chat history ✅
6. User sees EXACT same data ✅
```

**Scenario 2: Developer updates code and redeploys**
```typescript
// After deployment:
1. New code runs
2. Database connection unchanged ✅
3. All data still in Prisma Postgres ✅
4. Users see all their historical data ✅
```

**Scenario 3: Server restarts**
```typescript
// After restart:
1. Next.js server restarts
2. Reconnects to Prisma Postgres ✅
3. All data intact ✅
```

## Backup & Recovery

### Automatic Backups
Prisma Postgres includes automatic backups:
- **Point-in-time recovery**: Last 7 days
- **Daily snapshots**: Retained based on plan
- **Geographic replication**: Data replicated across regions

### Manual Export
You can export all data anytime:
```bash
# Export entire database
npx prisma db pull > backup.sql

# Or use Prisma Studio to export specific tables
```

## Summary: You're Covered! ✅

1. **Real Database**: ✅ Prisma Postgres (cloud PostgreSQL)
2. **Data Persistence**: ✅ All data saved permanently
3. **Session Continuity**: ✅ Full state restored on login
4. **Update Safety**: ✅ Code updates don't affect data
5. **Rollback Protection**: ✅ 90-day rollback for all fixes
6. **Backup System**: ✅ Automatic backups by Prisma
7. **Encryption**: ✅ Sensitive data encrypted
8. **User Preferences**: ✅ Onboarding choices persist forever

**Bottom Line**: Users can close the app, come back weeks later, and see ALL their data exactly as they left it!
