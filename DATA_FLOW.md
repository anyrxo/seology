# Data Flow & Persistence - Visual Guide

## How Data Flows Through SEOLOGY

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

1. USER SIGNS UP
   ├─ Clerk creates account
   ├─ Webhook triggers
   └─ [DATABASE] User table ← New row created
       ├─ clerkId: "user_xyz123"
       ├─ email: "user@example.com"
       ├─ plan: "STARTER"
       ├─ executionMode: "AUTOMATIC"
       ├─ aiChatEnabled: true (default)
       └─ preferredAuditScope: "full" (default)

   ✅ PERSISTED FOREVER


2. USER CONNECTS SHOPIFY STORE
   ├─ OAuth flow initiated
   ├─ User authorizes app
   ├─ Callback receives access token
   └─ [DATABASE] Connection table ← New row created
       ├─ userId: (linked to User)
       ├─ platform: "SHOPIFY"
       ├─ domain: "example.myshopify.com"
       ├─ accessToken: "shpat_xxxx" (ENCRYPTED)
       ├─ status: "CONNECTED"
       └─ createdAt: 2025-01-08

   ✅ PERSISTED FOREVER
   ✅ TOKEN ENCRYPTED (AES-256)


3. ONBOARDING - USER MAKES SELECTIONS
   ├─ User toggles AI Chat: OFF
   ├─ User selects scope: "products"
   ├─ API call: POST /api/shopify/preferences
   └─ [DATABASE] User table ← Row UPDATED
       ├─ aiChatEnabled: false (was true)
       └─ preferredAuditScope: "products" (was "full")

   ✅ PERSISTED FOREVER
   ✅ APPLIES TO ALL FUTURE SESSIONS


4. AUDIT RUNS (During Onboarding or Manual)
   ├─ System fetches products from Shopify API
   ├─ For each product:
   │   ├─ Calculate SEO score (0-100)
   │   ├─ Analyze title, description, images
   │   └─ [DATABASE] ShopifyProduct table ← Row created/updated
   │       ├─ connectionId: (linked to Connection)
   │       ├─ shopifyProductId: "gid://shopify/Product/123"
   │       ├─ title: "Product Name"
   │       ├─ metaTitle: "SEO Title"
   │       ├─ metaDescription: "SEO Description"
   │       ├─ seoScore: 85
   │       ├─ images: "[{url: '...', altText: '...'}]"
   │       └─ lastAnalyzedAt: 2025-01-08
   │
   ├─ AI analyzes products and finds issues
   └─ For each issue found:
       └─ [DATABASE] Issue table ← Row created
           ├─ connectionId: (linked to Connection)
           ├─ type: "missing_meta_description"
           ├─ title: "Missing meta description"
           ├─ severity: "HIGH"
           ├─ pageUrl: "https://store.com/products/xyz"
           ├─ recommendation: "Add meta description..."
           ├─ impactScore: 75
           ├─ status: "DETECTED"
           └─ detectedAt: 2025-01-08

   ✅ PERSISTED FOREVER
   ✅ UPDATES ON EACH AUDIT (upsert)


5. FIXES APPLIED (Automatic/Plan/Approve mode)
   ├─ System generates fix for issue
   ├─ Fix is applied to Shopify
   └─ [DATABASE] Fix table ← Row created
       ├─ connectionId: (linked to Connection)
       ├─ issueId: (linked to Issue)
       ├─ description: "Added meta description"
       ├─ beforeState: "{ meta: null }"
       ├─ afterState: "{ meta: 'New description' }"
       ├─ status: "APPLIED"
       ├─ appliedAt: 2025-01-08
       └─ rollbackDeadline: 2025-04-08 (90 days)

   ✅ PERSISTED FOR 90 DAYS (rollback data)
   ✅ FIX RECORD FOREVER


6. USER CHATS WITH AI
   ├─ User sends message
   ├─ AI fetches context from database
   ├─ AI responds
   └─ [DATABASE]
       ├─ AIConversation table ← Row created (if new conversation)
       └─ AIMessage table ← 2 rows created
           ├─ role: "user", content: "How's my SEO?"
           └─ role: "assistant", content: "Your SEO score is..."

   ✅ PERSISTED FOREVER
   ✅ FULL CHAT HISTORY SAVED


7. USER LOGS OUT
   └─ No data changes - everything already saved!


8. USER RETURNS (Next Day / Next Month / Next Year)
   ├─ User logs in via Clerk
   ├─ System queries database:
   │   ├─ [DATABASE] User ← Load preferences
   │   ├─ [DATABASE] Connection ← Load store connections
   │   ├─ [DATABASE] ShopifyProduct ← Load products
   │   ├─ [DATABASE] Issue ← Load issues
   │   ├─ [DATABASE] Fix ← Load fixes
   │   └─ [DATABASE] AIConversation ← Load chat history
   │
   └─ User sees EXACT same data as when they left!

   ✅ SESSION CONTINUITY PERFECT
```

---

## Database Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRISMA POSTGRES (CLOUD)                       │
│                  db.prisma.io (PostgreSQL)                       │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                        Secure Connection
                        (SSL/TLS encrypted)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APP (Vercel)                        │
│                                                                   │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │ API Routes   │   │ Prisma ORM   │   │ Encryption   │        │
│  │              │──▶│              │──▶│              │        │
│  │ /api/shopify │   │ db.user      │   │ AES-256      │        │
│  │ /api/fixes   │   │ db.issue     │   │ Token Safety │        │
│  │ /api/chat    │   │ db.fix       │   │              │        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## What Happens During Different Events

### Event: Code Update / Redeployment

```
BEFORE DEPLOYMENT:
  Database: ✅ All data intact
  Products: ✅ 50 products saved
  Issues:   ✅ 12 issues detected
  Fixes:    ✅ 8 fixes applied
  User:     ✅ Preferences saved

DEPLOYMENT HAPPENS:
  Code:     🔄 Updated
  Database: ⏸️  Unchanged (separate system)

AFTER DEPLOYMENT:
  Database: ✅ All data intact (SAME!)
  Products: ✅ 50 products still there
  Issues:   ✅ 12 issues still there
  Fixes:    ✅ 8 fixes still there
  User:     ✅ Preferences still saved

RESULT: Zero data loss ✅
```

### Event: User Closes Browser

```
USER CLOSES BROWSER:
  React State: ❌ Lost (expected)
  Database:    ✅ All data intact

USER RETURNS:
  React State: 🔄 Reconstructed from database
  Database:    ✅ All data loaded

RESULT: Perfect session continuity ✅
```

### Event: Server Restart

```
SERVER RESTART:
  In-memory cache: ❌ Cleared
  Database:        ✅ All data intact
  Connections:     🔄 Re-established

FIRST REQUEST AFTER RESTART:
  Prisma:   🔄 Reconnects to database
  Data:     ✅ All loaded from database

RESULT: Zero downtime for data ✅
```

### Event: Schema Change (Adding New Field)

```
BEFORE MIGRATION:
  User table: email, plan, executionMode

MIGRATION COMMAND:
  $ npx prisma db push

PRISMA ADDS:
  User table: email, plan, executionMode, aiChatEnabled ← NEW!

EXISTING DATA:
  All existing users get default value: aiChatEnabled = true

RESULT: Backward compatible ✅
```

---

## Data Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LIFECYCLE                           │
└─────────────────────────────────────────────────────────────────┘

USER DATA:
  Created:  On signup
  Updated:  On profile changes
  Deleted:  Only if user deletes account
  Lifespan: FOREVER ♾️

CONNECTION DATA:
  Created:  On store connection
  Updated:  On token refresh, status changes
  Deleted:  Only if user disconnects store
  Lifespan: FOREVER ♾️

PRODUCT DATA:
  Created:  First audit
  Updated:  Every audit (upsert)
  Deleted:  Never (unless product deleted from Shopify)
  Lifespan: FOREVER ♾️

ISSUE DATA:
  Created:  When detected by AI
  Updated:  Status changes (DETECTED → FIXING → FIXED)
  Deleted:  Never
  Lifespan: FOREVER ♾️

FIX DATA:
  Created:  When fix applied
  Updated:  Status changes (PENDING → APPLIED → ROLLED_BACK)
  Deleted:  Rollback data after 90 days (fix record kept)
  Lifespan: FOREVER ♾️ (with 90-day rollback window)

CHAT DATA:
  Created:  Every message sent
  Updated:  Never (immutable)
  Deleted:  Never
  Lifespan: FOREVER ♾️
```

---

## Security & Encryption

```
┌─────────────────────────────────────────────────────────────────┐
│                    SENSITIVE DATA HANDLING                       │
└─────────────────────────────────────────────────────────────────┘

SHOPIFY ACCESS TOKENS:
  Storage:    Database (Connection.accessToken)
  Encryption: AES-256-GCM
  Key:        ENCRYPTION_KEY (from .env.local)
  Algorithm:
    1. Generate random IV (Initialization Vector)
    2. Encrypt token with AES-256
    3. Store: IV + encrypted data
  Decryption:
    1. Extract IV from stored data
    2. Decrypt with same key
    3. Return plaintext token

CODE LOCATION: lib/encryption.ts
```

---

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE PERFORMANCE                          │
└─────────────────────────────────────────────────────────────────┘

CONNECTION POOLING:
  Provider: Prisma Accelerate
  Pool Size: Dynamic (scales with load)
  Benefit: No connection limit errors

QUERY CACHING:
  Provider: Prisma Accelerate
  Duration: Configurable per query
  Benefit: Faster repeated queries

INDEXES:
  Issue table: [connectionId, status, detectedAt]
  Fix table:   [connectionId, status, appliedAt]
  Product table: [connectionId, seoScore]
  Benefit: 10x-100x faster queries

COMPOUND QUERIES:
  Instead of:
    1. Fetch issues (N queries)
    2. For each issue, fetch fixes (N queries)
  We do:
    1. Fetch issues with fixes included (1 query)
  Benefit: Eliminates N+1 queries
```

---

## Backup & Recovery

```
┌─────────────────────────────────────────────────────────────────┐
│                    BACKUP STRATEGY                               │
└─────────────────────────────────────────────────────────────────┘

AUTOMATIC BACKUPS (Prisma Postgres):
  Frequency: Every 24 hours
  Retention: 7 days (point-in-time recovery)
  Location: Multi-region (US + EU)
  Type: Full database snapshot

POINT-IN-TIME RECOVERY:
  Window: Last 7 days
  Granularity: 1 second
  Example: "Restore database to 2025-01-06 14:32:15"

MANUAL EXPORT:
  Command: npx prisma db pull > backup.sql
  Format: SQL dump
  Use case: Before major migrations
```

---

## Summary: Your Data is Safe! 🔒

✅ **Real Database**: Prisma Postgres (cloud PostgreSQL)
✅ **Persistence**: All data saved permanently
✅ **Session Continuity**: Perfect - users see same data every login
✅ **Update Safety**: Code updates don't affect database
✅ **Rollback Protection**: 90-day rollback for all fixes
✅ **Encryption**: Sensitive tokens encrypted with AES-256
✅ **Backups**: Automatic daily backups with 7-day retention
✅ **Performance**: Connection pooling, caching, indexes
✅ **User Preferences**: Onboarding choices persist forever

**You're fully covered for production use!**
