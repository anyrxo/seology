# SEOLOGY.AI Database Enhancements Summary

## ✅ Successfully Deployed to Supabase

All schema enhancements have been pushed to your Supabase PostgreSQL database.

---

## 🆕 New Database Models

### 1. **ImageAsset** - Image SEO Tracking
Comprehensive image tracking for SEO optimization.

**Fields:**
- **Identification**: `url`, `filename`, `format`, `sizeBytes`, `width`, `height`
- **SEO Attributes**: `altText`, `suggestedAltText` (AI-generated), `title`, `caption`
- **Status Tracking**: `status` (DETECTED → ANALYZING → OPTIMIZED), `hasAltText`, `isOptimized`, `hasLazyLoading`
- **AI Analysis**: `aiDescription`, `aiConfidence`, `aiTags` (JSON array)
- **Impact Metrics**: `impactScore` (0-100), `priority` (1-10), `estimatedValue`
- **Context**: `context` (hero/product/thumbnail/etc.), `pageUrl`
- **Optimization**: `optimizedUrl`, `optimizedSizeBytes`, `compressionRatio`, `webpUrl`

**Indexes:**
- `connectionId`, `pageId`, `status`, `hasAltText`, `isOptimized`, `priority`
- **Unique constraint**: `[connectionId, url]`

**Relationship:** `Connection → ImageAsset[]`

---

### 2. **ImageOptimizationBatch** - Batch Job Tracking
Tracks image optimization batch jobs with progress and metrics.

**Fields:**
- **Counts**: `totalImages`, `processedImages`, `optimizedImages`, `failedImages`, `skippedImages`
- **Status**: `status` (PENDING/RUNNING/COMPLETED/FAILED/CANCELLED), `progress` (0-100%)
- **Metrics**: `totalBytesSaved`, `avgCompressionRatio`
- **Timing**: `startedAt`, `completedAt`, `estimatedCompletion`
- **Settings**: `settings` (JSON), `error`

**Indexes:** `connectionId`, `status`, `createdAt`

---

### 3. **AICreditPurchase** - One-Time Credit Purchases
Tracks purchased AI credits separate from monthly subscription quotas.

**Fields:**
- **Purchase Info**: `creditsAmount`, `pricePerCredit`, `totalPrice`, `stripePaymentId`
- **Usage Tracking**: `creditsRemaining`, `creditsUsed`
- **Status**: `status` (PENDING/COMPLETED/FAILED/REFUNDED)
- **Expiry**: `expiresAt` (optional - can be null for never-expiring credits)

**Indexes:** `userId`, `status`, `expiresAt`

**Relationship:** `User → AICreditPurchase[]`

**Credit Consumption Logic:**
1. **Monthly credits used first** (they reset anyway)
2. **Then purchased credits** (preserve paid credits)
3. **FIFO for purchased credits** (oldest first)

---

## 📊 Enhanced Existing Models

### **User Model**
**Added:**
- `aiCreditPurchases` relation to `AICreditPurchase[]`
- `connectionRequests` relation to `ConnectionRequest[]`

---

### **Connection Model**
**Added:**
- `imageAssets` relation to `ImageAsset[]` for image SEO tracking

---

### **UsageRecord Model**
**Added:**
- `aiCreditsUsed` - Track AI chat message credits consumed
- `aiCreditsLimit` - Monthly AI credit limit from plan

**Purpose:** Track monthly AI credit consumption with automatic reset on 1st of each month.

---

### **Plan Limits** (in `lib/plans.ts`)
**Added:**
- `aiCreditsPerMonth` to all plans:
  - **STARTER**: 10 AI chat messages/month
  - **GROWTH**: 100 AI chat messages/month
  - **SCALE/ENTERPRISE**: Unlimited (-1)

---

## 🔧 New Enums

### **ImageStatus**
Tracks image optimization lifecycle:
- `DETECTED` - Image found, not yet analyzed
- `ANALYZING` - AI currently analyzing
- `NEEDS_ALT_TEXT` - Missing alt text
- `NEEDS_OPTIMIZATION` - Has alt text, needs compression
- `OPTIMIZING` - Currently being optimized
- `OPTIMIZED` - Fully optimized
- `FAILED` - Optimization failed
- `IGNORED` - User chose to ignore

### **BatchStatus**
Tracks batch job progress:
- `PENDING`, `RUNNING`, `PAUSED`, `COMPLETED`, `FAILED`, `CANCELLED`

### **PurchaseStatus**
Tracks credit purchase lifecycle:
- `PENDING`, `COMPLETED`, `FAILED`, `REFUNDED`

### **Platform Enum**
**Added:** `GITHUB` for GitHub Pages integration

### **JobType Enum**
**Added:**
- `SCAN_IMAGES` - Scan site for all images
- `OPTIMIZE_IMAGES` - AI-optimize images with Claude Vision

---

## 🎯 Key Features Enabled

### 1. **Image SEO System**
- Scan entire sites for images across all pages
- Track every image with comprehensive metadata
- AI-powered alt text generation using Claude Vision
- Context detection (hero, product, thumbnail, etc.)
- Decorative image detection
- Batch optimization with progress tracking
- SEO impact scoring (0-100)
- Priority ranking (1-10)

### 2. **AI Credit System**
- Monthly credit quotas per subscription plan
- One-time credit purchases (never expire unless set)
- Automatic credit consumption tracking
- Smart consumption order (monthly → purchased → FIFO)
- Credit depletion blocking with upgrade prompts
- Real-time balance checking
- Usage statistics and warnings (below 20%)

### 3. **GitHub Integration**
- GitHub OAuth connection support
- GitHub Pages website detection
- Repository-based site management
- Static site optimization

---

## 📈 Data Relationships Map

```
User
├── Connections
│   ├── Sites
│   ├── Issues
│   ├── Fixes
│   ├── Pages
│   └── ImageAssets ⭐ NEW
│       └── AI Analysis Data
├── AICreditPurchases ⭐ NEW
├── UsageRecords (with aiCreditsUsed) ⭐ ENHANCED
└── ConnectionRequests

ImageOptimizationBatch ⭐ NEW
└── Tracks batch image processing jobs
```

---

## 🔍 Performance Optimizations

### Database Indexes Added
All new models have optimized indexes for common query patterns:

**ImageAsset:**
- `connectionId` - Fast filtering by site
- `pageId` - Fast filtering by page
- `status` - Quick status-based queries
- `hasAltText` - Filter missing alt text
- `isOptimized` - Filter optimization status
- `priority` - Sort by importance
- **Compound unique**: `[connectionId, url]` - Prevent duplicates

**ImageOptimizationBatch:**
- `connectionId` - Filter by site
- `status` - Active job queries
- `createdAt` - Chronological ordering

**AICreditPurchase:**
- `userId` - User's purchases
- `status` - Active purchases
- `expiresAt` - Find expiring credits

---

## 💾 Storage Estimates

Based on typical usage:

### Per Site:
- **~500 images** average
- **ImageAsset records**: ~25 KB each
  - **Total**: ~12.5 MB per site
- **ImageOptimizationBatch**: ~2 KB per batch
  - **~5 batches per site**: ~10 KB

### Per User (10 sites):
- **Image data**: ~125 MB
- **Credit purchases**: ~5 KB (minimal)
- **Usage records**: ~2 KB/month

### Database Growth (1000 users):
- **Images**: ~125 GB
- **Other data**: ~50 MB
- **Acceptable** for Supabase's storage tiers

---

## 🚀 API Endpoints Added

### Image SEO APIs:
- `GET /api/images/[connectionId]` - List images with stats
- `POST /api/images/[connectionId]/scan` - Start image scan job
- `POST /api/images/[connectionId]/optimize` - Start AI optimization job

### Credit Management APIs:
- `GET /api/credits/balance` - Get current credit balance
- Credit consumption built into `/api/chat` endpoint

---

## 📊 Supabase Dashboard Views

You can now query these tables in your Supabase dashboard:

### Most Useful Queries:

**1. Sites with most images needing alt text:**
```sql
SELECT c.domain, COUNT(i.id) as missing_alt_count
FROM "Connection" c
JOIN "ImageAsset" i ON i."connectionId" = c.id
WHERE i."hasAltText" = false
  AND i."isDecorative" = false
GROUP BY c.domain
ORDER BY missing_alt_count DESC;
```

**2. Image optimization progress:**
```sql
SELECT
  b."connectionId",
  b.status,
  b."totalImages",
  b."optimizedImages",
  b.progress,
  b."totalBytesSaved"
FROM "ImageOptimizationBatch" b
WHERE b.status = 'RUNNING'
ORDER BY b."createdAt" DESC;
```

**3. Users running low on AI credits:**
```sql
SELECT
  u.email,
  u.plan,
  ur."aiCreditsUsed",
  ur."aiCreditsLimit",
  (ur."aiCreditsLimit" - ur."aiCreditsUsed") as remaining
FROM "User" u
JOIN "UsageRecord" ur ON ur."userId" = u.id
WHERE ur.period >= date_trunc('month', CURRENT_DATE)
  AND (ur."aiCreditsLimit" - ur."aiCreditsUsed") < 10
ORDER BY remaining ASC;
```

**4. Credit purchase revenue:**
```sql
SELECT
  DATE_TRUNC('month', "createdAt") as month,
  COUNT(*) as purchases,
  SUM("totalPrice") as revenue,
  SUM("creditsAmount") as credits_sold
FROM "AICreditPurchase"
WHERE status = 'COMPLETED'
GROUP BY month
ORDER BY month DESC;
```

---

## 🔐 Security Considerations

### Row-Level Security (RLS)
All new tables respect existing RLS policies through:
- `connectionId` relationships (inherits from Connection)
- `userId` relationships (inherits from User)
- API routes verify ownership before access

### Data Encryption
- `AICreditPurchase.stripePaymentId` - Sensitive payment data
- Image URLs stored as-is (public URLs)
- AI analysis data (descriptions, tags) - No PII

### Access Control
- Users can only access their own:
  - Image assets (via connection ownership)
  - Credit purchases
  - Usage records
- Admin dashboard has separate views for all data

---

## 🎉 Summary

Your Supabase database now includes:
- **3 new models** (ImageAsset, ImageOptimizationBatch, AICreditPurchase)
- **4 new enums** (ImageStatus, BatchStatus, PurchaseStatus, Platform.GITHUB)
- **2 enhanced models** (User, Connection, UsageRecord)
- **8+ new indexes** for optimal performance
- **2 new job types** (SCAN_IMAGES, OPTIMIZE_IMAGES)

All changes are **live and deployed** to your Supabase instance! 🚀

---

## 📝 Next Steps

1. ✅ Database schema deployed
2. ✅ Backend services implemented
3. ✅ API endpoints created
4. ⏳ **Build React UI components** for image management dashboard
5. ⏳ **Test with real websites** and image data
6. ⏳ **Add actual image compression** (WebP conversion, optimization)

The foundation is rock-solid! Ready to build the UI next. 💪
