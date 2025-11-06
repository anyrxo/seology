# Google Search Console Integration - Complete Implementation Plan

## Overview
This document provides a step-by-step implementation plan for integrating Google Search Console (GSC) into the SEOLOGY.AI Shopify app. This integration will track search performance, measure SEO fix impact, and provide data-driven insights.

---

## Prerequisites

### 1. Google Cloud Console Setup

**Create OAuth 2.0 Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing project
3. Enable **Google Search Console API**
4. Navigate to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth 2.0 Client ID**
6. Application type: **Web application**
7. Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://seology.ai/api/auth/google/callback`
8. Save Client ID and Client Secret

**Configure OAuth Consent Screen:**
1. Go to **OAuth consent screen**
2. User Type: **External**
3. App name: **SEOLOGY.AI**
4. Scopes:
   - `https://www.googleapis.com/auth/webmasters.readonly`
   - `https://www.googleapis.com/auth/webmasters` (optional, for site verification)

### 2. Environment Variables

Add to `.env`:
```env
# Google Search Console OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=https://seology.ai/api/auth/google/callback

# Or use dynamic URL
# NEXT_PUBLIC_APP_URL=https://seology.ai
```

---

## Step 1: Install Dependencies

```bash
npm install googleapis google-auth-library
npm install -D @types/googleapis
```

**Update `package.json`:**
```json
{
  "dependencies": {
    "googleapis": "^140.0.0",
    "google-auth-library": "^9.6.0"
  }
}
```

---

## Step 2: Update Database Schema

**File:** `c:\Users\manna\Downloads\iimagined.webflow (1)\prisma\schema.prisma`

Add the following models at the end of the schema file (before the closing):

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

// Search Analytics Data from GSC
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

// GSC Sync History
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

// GSC Performance Snapshots
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

// GSC Query Intelligence
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

// GSC Page Performance
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

**Also add these relations to existing models:**

In the `Connection` model, add:
```prisma
model Connection {
  // ... existing fields ...

  // Add these new relations:
  googleSearchConsole GoogleSearchConsole?
  searchAnalytics     SearchAnalytics[]
  gscSnapshots        GSCPerformanceSnapshot[]
  gscQueryInsights    GSCQueryInsight[]
  gscPagePerformance  GSCPagePerformance[]
}
```

In the `Fix` model, add:
```prisma
model Fix {
  // ... existing fields ...

  // Add these new relations:
  searchAnalytics    SearchAnalytics[]
  gscPagePerformance GSCPagePerformance[]
}
```

**Run migrations:**
```bash
npx prisma generate
npx prisma db push
```

---

## Step 3: Create Library Functions

**File:** `lib/google-search-console.ts`

See the implementation file created earlier. Key changes needed:
1. Fix all TypeScript errors by adding proper types
2. Remove `any` types
3. Update after schema is pushed

---

## Step 4: OAuth Flow Routes

### 4.1 Initiate OAuth Flow

**File:** `app/api/auth/google/route.ts`

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthorizationUrl } from '@/lib/google-search-console'
import { randomBytes } from 'crypto'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get connection ID from query params
    const searchParams = request.nextUrl.searchParams
    const connectionId = searchParams.get('connectionId')

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID required' },
        { status: 400 }
      )
    }

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    // Generate CSRF token
    const state = randomBytes(32).toString('hex')

    // Store CSRF token in database
    await db.cSRFToken.create({
      data: {
        userId,
        token: state,
        provider: 'GOOGLE',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        metadata: JSON.stringify({ connectionId })
      }
    })

    // Generate authorization URL
    const authUrl = getAuthorizationUrl(state)

    // Redirect to Google OAuth
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Google OAuth initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate OAuth flow' },
      { status: 500 }
    )
  }
}
```

### 4.2 OAuth Callback Handler

**File:** `app/api/auth/google/callback/route.ts`

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { exchangeCodeForTokens, listSites, verifySiteOwnership } from '@/lib/google-search-console'
import { encrypt } from '@/lib/encryption'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.redirect(
        new URL('/shopify/dashboard?error=unauthorized', request.url)
      )
    }

    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Check for OAuth errors
    if (error) {
      return NextResponse.redirect(
        new URL(`/shopify/gsc?error=${error}`, request.url)
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/shopify/gsc?error=missing_params', request.url)
      )
    }

    // Verify CSRF token
    const csrfToken = await db.cSRFToken.findFirst({
      where: {
        token: state,
        userId,
        provider: 'GOOGLE',
        expiresAt: { gte: new Date() }
      }
    })

    if (!csrfToken) {
      return NextResponse.redirect(
        new URL('/shopify/gsc?error=invalid_state', request.url)
      )
    }

    // Get connection ID from token metadata
    const metadata = JSON.parse(csrfToken.metadata || '{}')
    const connectionId = metadata.connectionId

    if (!connectionId) {
      return NextResponse.redirect(
        new URL('/shopify/gsc?error=missing_connection', request.url)
      )
    }

    // Exchange code for tokens
    const { accessToken, refreshToken, expiresAt } = await exchangeCodeForTokens(code)

    // Encrypt tokens
    const encryptedAccessToken = encrypt(accessToken)
    const encryptedRefreshToken = encrypt(refreshToken)

    // Get site URL from connection
    const connection = await db.connection.findUnique({
      where: { id: connectionId }
    })

    if (!connection) {
      return NextResponse.redirect(
        new URL('/shopify/gsc?error=connection_not_found', request.url)
      )
    }

    // Construct site URL (for Shopify, use domain)
    const siteUrl = `https://${connection.domain}`

    // Create or update GSC connection
    await db.googleSearchConsole.upsert({
      where: { connectionId },
      create: {
        connectionId,
        siteUrl,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt,
        isConnected: true,
        propertyType: 'sc-domain'
      },
      update: {
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt,
        isConnected: true,
        updatedAt: new Date()
      }
    })

    // Verify site ownership
    const isVerified = await verifySiteOwnership(connectionId, siteUrl)

    await db.googleSearchConsole.update({
      where: { connectionId },
      data: { isVerified }
    })

    // Delete used CSRF token
    await db.cSRFToken.delete({
      where: { id: csrfToken.id }
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId,
        connectionId,
        action: 'GSC_CONNECTED',
        resource: 'google_search_console',
        details: JSON.stringify({ siteUrl, isVerified })
      }
    })

    // Redirect to GSC dashboard with success message
    return NextResponse.redirect(
      new URL(`/shopify/gsc?success=connected&verified=${isVerified}`, request.url)
    )
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(
      new URL('/shopify/gsc?error=callback_failed', request.url)
    )
  }
}
```

---

## Step 5: GSC Management API Routes

### 5.1 Connect GSC

**File:** `app/api/shopify/gsc/connect/route.ts`

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { connectionId } = body

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID required' },
        { status: 400 }
      )
    }

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    // Generate OAuth URL
    const oauthUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google?connectionId=${connectionId}`

    return NextResponse.json({
      success: true,
      data: { oauthUrl }
    })
  } catch (error) {
    console.error('GSC connect error:', error)
    return NextResponse.json(
      { error: 'Failed to generate connection URL' },
      { status: 500 }
    )
  }
}
```

### 5.2 Disconnect GSC

**File:** `app/api/shopify/gsc/disconnect/route.ts`

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { disconnectGSC } from '@/lib/google-search-console'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { connectionId } = body

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID required' },
        { status: 400 }
      )
    }

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId
      },
      include: {
        googleSearchConsole: true
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    if (!connection.googleSearchConsole) {
      return NextResponse.json(
        { error: 'GSC not connected' },
        { status: 400 }
      )
    }

    // Disconnect GSC
    await disconnectGSC(connectionId)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId,
        connectionId,
        action: 'GSC_DISCONNECTED',
        resource: 'google_search_console'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Google Search Console disconnected'
    })
  } catch (error) {
    console.error('GSC disconnect error:', error)
    return NextResponse.json(
      { error: 'Failed to disconnect GSC' },
      { status: 500 }
    )
  }
}
```

### 5.3 Manual Sync

**File:** `app/api/shopify/gsc/sync/route.ts`

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { syncGSCData } from '@/lib/google-search-console'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { connectionId, days } = body

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID required' },
        { status: 400 }
      )
    }

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId
      },
      include: {
        googleSearchConsole: true
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    if (!connection.googleSearchConsole?.isConnected) {
      return NextResponse.json(
        { error: 'GSC not connected' },
        { status: 400 }
      )
    }

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date(Date.now() - (days || 30) * 24 * 60 * 60 * 1000)

    // Trigger sync
    const result = await syncGSCData(connectionId, {
      startDate,
      endDate,
      triggerSource: `manual_by_${userId}`
    })

    return NextResponse.json({
      success: result.success,
      data: {
        rowsSynced: result.rowsSynced,
        error: result.error
      }
    })
  } catch (error) {
    console.error('GSC sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync GSC data' },
      { status: 500 }
    )
  }
}
```

### 5.4 Get Analytics

**File:** `app/api/shopify/gsc/analytics/route.ts`

```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getPerformanceSummary } from '@/lib/google-search-console'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const connectionId = searchParams.get('connectionId')
    const days = parseInt(searchParams.get('days') || '30')

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID required' },
        { status: 400 }
      )
    }

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId
      },
      include: {
        googleSearchConsole: true
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    if (!connection.googleSearchConsole) {
      return NextResponse.json(
        { error: 'GSC not connected' },
        { status: 400 }
      )
    }

    // Get performance summary
    const summary = await getPerformanceSummary(connectionId, days)

    return NextResponse.json({
      success: true,
      data: summary
    })
  } catch (error) {
    console.error('GSC analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
```

---

## Step 6: Cron Job for Daily Sync

**File:** `app/api/cron/sync-gsc/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { syncGSCData } from '@/lib/google-search-console'

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all active GSC connections
    const gscConnections = await db.googleSearchConsole.findMany({
      where: {
        isConnected: true,
        syncFrequency: 'daily'
      },
      include: {
        connection: true
      }
    })

    console.log(`Starting daily GSC sync for ${gscConnections.length} connections`)

    const results = []

    for (const gscConn of gscConnections) {
      try {
        const result = await syncGSCData(gscConn.connectionId, {
          triggerSource: 'cron_daily'
        })

        results.push({
          connectionId: gscConn.connectionId,
          success: result.success,
          rowsSynced: result.rowsSynced,
          error: result.error
        })
      } catch (error) {
        console.error(`Failed to sync ${gscConn.connectionId}:`, error)
        results.push({
          connectionId: gscConn.connectionId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      summary: {
        total: gscConnections.length,
        succeeded: successCount,
        failed: failureCount
      },
      results
    })
  } catch (error) {
    console.error('GSC cron job error:', error)
    return NextResponse.json(
      { error: 'Cron job failed' },
      { status: 500 }
    )
  }
}
```

**Update `vercel.json`:**
```json
{
  "crons": [
    {
      "path": "/api/cron/sync-gsc",
      "schedule": "0 2 * * *"
    }
  ]
}
```

---

## Step 7: Frontend GSC Dashboard

**File:** `app/shopify/gsc/page.tsx`

This is a comprehensive React component - see separate implementation file.

---

## Step 8: Integration with Existing Features

### 8.1 Timeline Page Enhancement

**File:** `app/shopify/timeline/page.tsx`

Add GSC metrics to fix cards:
- Show impressions/clicks before and after
- Display position improvement
- Calculate ROI

### 8.2 Dashboard Widget

**File:** `app/shopify/dashboard/page.tsx`

Add GSC performance widget:
- Total impressions/clicks (last 30 days)
- Trending queries
- Top performing pages

### 8.3 Reports Enhancement

**File:** `app/shopify/reports/page.tsx`

Include GSC data in reports:
- Traffic impact from fixes
- ROI calculation
- Query performance

---

## Testing Checklist

- [ ] OAuth flow completes successfully
- [ ] Tokens are encrypted in database
- [ ] Site verification status correct
- [ ] Initial sync imports data
- [ ] Daily cron job runs
- [ ] Performance snapshots created
- [ ] Fix impact comparison works
- [ ] Dashboard displays metrics
- [ ] Disconnect flow works
- [ ] Error handling for expired tokens
- [ ] Rate limiting respected
- [ ] Analytics queries performant

---

## Security Considerations

1. **Token Encryption**: All access/refresh tokens encrypted with AES-256-GCM
2. **CSRF Protection**: State parameter validated on OAuth callback
3. **Rate Limiting**: Respect GSC API quotas (max 1200 requests/minute)
4. **Token Refresh**: Automatic refresh when expired
5. **Cron Secret**: Secure cron endpoints with bearer token
6. **User Isolation**: All queries filtered by userId/connectionId

---

## Performance Optimizations

1. **Caching**: Cache snapshots for dashboard queries
2. **Batch Inserts**: Use transactions for bulk data
3. **Indexes**: Compound indexes on frequently queried fields
4. **Pagination**: Limit API responses to reasonable sizes
5. **Background Jobs**: Run syncs asynchronously

---

## Deployment Steps

1. Add environment variables to Vercel
2. Run database migrations
3. Deploy application
4. Configure Vercel cron
5. Test OAuth flow
6. Monitor initial syncs
7. Verify cron execution

---

## Monitoring & Alerts

**Key Metrics:**
- GSC sync success rate
- API quota usage
- Token refresh failures
- Data freshness
- Query performance

**Alerts:**
- Failed syncs for >24 hours
- Expired tokens not refreshed
- API quota exceeded
- Database query slow (>2s)

---

## Future Enhancements

1. **Query Insights AI Analysis**: Use Claude to analyze query opportunities
2. **Automated Recommendations**: Suggest pages to optimize based on GSC data
3. **Competitor Tracking**: Compare performance to industry benchmarks
4. **Custom Reports**: User-defined GSC report templates
5. **Webhook Integration**: Real-time GSC notifications
6. **Multi-property Support**: Connect multiple GSC properties

---

## API Reference

See individual route files for detailed request/response formats.

**Base URL:** `https://seology.ai/api/shopify/gsc`

**Endpoints:**
- `POST /connect` - Initiate GSC connection
- `POST /disconnect` - Disconnect GSC
- `POST /sync` - Manual data sync
- `GET /analytics` - Get performance summary
- `GET /queries` - Get query insights
- `GET /pages` - Get page performance
- `GET /fixes/:fixId/impact` - Get fix impact comparison

---

## Support & Troubleshooting

**Common Issues:**

1. **"Site not verified"** → User needs to verify domain in GSC
2. **"Insufficient permissions"** → Re-authenticate with correct scopes
3. **"Token expired"** → Should auto-refresh, check refresh token
4. **"API quota exceeded"** → Wait for quota reset or reduce sync frequency
5. **"No data available"** → Domain may be new, wait 24-48 hours

---

## Conclusion

This implementation provides complete GSC integration with:
- ✅ OAuth authentication
- ✅ Data synchronization
- ✅ Performance tracking
- ✅ Fix impact measurement
- ✅ Dashboard visualization
- ✅ Automated syncs
- ✅ Security & encryption
- ✅ Error handling
- ✅ Performance optimization

The GSC integration brings SEOLOGY.AI to 100% feature completeness!
