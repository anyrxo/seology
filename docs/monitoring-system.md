# Shopify App Performance Monitoring System

## Overview

The monitoring system provides comprehensive observability for the SEOLOGY.AI Shopify app, tracking API performance, GraphQL query costs, rate limits, errors, and overall system health.

## Architecture

### Core Components

1. **Monitoring Library** (`lib/monitoring.ts`)
   - Performance metric tracking
   - GraphQL cost monitoring
   - Rate limit health checks
   - System health aggregation

2. **Error Tracking** (`lib/error-tracking.ts`)
   - Centralized error logging
   - Error categorization and severity detection
   - Alert triggering for critical errors

3. **Enhanced GraphQL Client** (`lib/shopify-graphql.ts`)
   - Automatic cost tracking
   - Rate limit monitoring
   - Performance metrics collection

4. **Analytics API** (`app/api/shopify/monitor/analytics/route.ts`)
   - RESTful endpoint for metrics retrieval
   - Aggregated statistics
   - Hourly/daily trend data

5. **Dashboard Component** (`components/shopify/monitoring/PerformanceMonitor.tsx`)
   - Real-time metrics visualization
   - System health status
   - Rate limit indicators

## Features

### 1. API Performance Tracking

Track every API call with detailed metrics:

```typescript
import { trackAPICall } from '@/lib/monitoring'

const result = await trackAPICall(
  '/api/shopify/products',
  shop,
  userId,
  async () => {
    return await fetchProducts()
  },
  {
    method: 'GET',
    userAgent: req.headers.get('user-agent') || undefined,
  }
)
```

**Captured Metrics:**
- Endpoint URL
- Request method
- Response time (ms)
- Success/failure status
- Error messages
- HTTP status codes
- User agent
- Shop domain
- User ID
- Timestamp

### 2. GraphQL Cost Monitoring

Automatically tracks Shopify GraphQL API costs:

```typescript
import { shopifyGraphQL } from '@/lib/shopify-graphql'

// Automatic cost tracking integrated
const products = await shopifyGraphQL(
  shop,
  accessToken,
  query,
  variables,
  { userId } // Optional: include userId for better tracking
)
```

**Tracked Data:**
- Query cost (Shopify points)
- Query duration
- Rate limit status (available/maximum/restore rate)
- Throttle status
- Query identification (first 100 chars)

### 3. Rate Limit Health Monitoring

Real-time rate limit tracking with alerts:

```typescript
import { getRateLimitHealth, getSystemHealth } from '@/lib/monitoring'

// Get current rate limit status
const rateLimitStatus = await getRateLimitHealth(shop)

if (rateLimitStatus.atRisk) {
  console.warn('Rate limit critical:', rateLimitStatus.percentAvailable)
}

// Get overall system health
const health = await getSystemHealth(shop)
// Returns: { status: 'healthy' | 'degraded' | 'unhealthy', metrics, issues }
```

**Alert Thresholds:**
- **Near Limit**: < 20% capacity available (warning)
- **At Risk**: < 10% capacity available (critical)

### 4. Error Tracking & Categorization

Comprehensive error logging with automatic categorization:

```typescript
import { logError, withErrorTracking } from '@/lib/error-tracking'

// Manual error logging
try {
  // ... operation
} catch (error) {
  await logError(error as Error, {
    endpoint: '/api/shopify/products',
    shop,
    userId,
    statusCode: 500,
  })
  throw error
}

// Automatic error tracking wrapper
const result = await withErrorTracking(
  async () => {
    return await riskyOperation()
  },
  { endpoint, shop, userId }
)
```

**Error Categories:**
- `authentication` - 401 errors, auth failures
- `authorization` - 403 errors, permission issues
- `rate_limit` - 429 errors, throttling
- `api_error` - Shopify API errors
- `database_error` - Prisma/database issues
- `validation_error` - 4xx errors
- `network_error` - Fetch failures
- `unknown` - Uncategorized errors

**Severity Levels:**
- `critical` - Auth errors, database errors, 500 errors
- `high` - Rate limits, authorization issues
- `medium` - API errors, network issues
- `low` - Validation errors

### 5. Analytics API

Retrieve comprehensive performance data:

**Endpoint:** `GET /api/shopify/monitor/analytics`

**Query Parameters:**
- `shop` (required) - Shopify domain
- `period` - `hour` | `day` | `week` | `month` (default: `day`)
- `includeHealth` - Include system health check (default: `true`)
- `includeRateLimit` - Include rate limit status (default: `true`)

**Response:**

```json
{
  "success": true,
  "data": {
    "shop": "example.myshopify.com",
    "period": "day",
    "performance": {
      "totalCalls": 1250,
      "successfulCalls": 1230,
      "failedCalls": 20,
      "avgDuration": 245,
      "p50Duration": 180,
      "p95Duration": 650,
      "p99Duration": 1200,
      "totalCost": 15000,
      "avgCost": 12,
      "errors": [
        { "type": "rate_limit", "count": 5 },
        { "type": "api_error", "count": 15 }
      ],
      "slowestEndpoints": [
        { "endpoint": "/api/shopify/products", "avgDuration": 450, "count": 300 }
      ],
      "costliestQueries": [
        { "query": "query getProducts...", "avgCost": 50, "count": 200 }
      ]
    },
    "systemHealth": {
      "status": "healthy",
      "metrics": {
        "errorRate": 1.6,
        "avgResponseTime": 245,
        "rateLimitHealth": {
          "percentAvailable": 75.5,
          "nearLimit": false,
          "atRisk": false
        }
      },
      "issues": []
    },
    "recentErrors": [...],
    "costBreakdown": [...],
    "hourlyMetrics": [...]
  }
}
```

### 6. Dashboard Component

React component for visualizing metrics:

```tsx
import { PerformanceMonitor } from '@/components/shopify/monitoring/PerformanceMonitor'

export default function MonitoringPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Performance Monitoring</h1>
      <PerformanceMonitor
        shop="example.myshopify.com"
        period="day"
        refreshInterval={60000} // 1 minute
      />
    </div>
  )
}
```

**Features:**
- Real-time metrics display
- Auto-refresh (configurable interval)
- System health status badge
- Rate limit progress bar
- Error rate tracking
- Response time charts
- Success/failure breakdowns

## Database Schema

All metrics are stored in the `APIUsageLog` table:

```prisma
model APIUsageLog {
  id             String   @id @default(cuid())
  userId         String
  shop           String?
  endpoint       String
  model          String

  // Performance
  latencyMs      Int?

  // Status
  status         String   @default("success") // 'success' | 'error'
  errorMessage   String?

  // Cost tracking
  totalCost      Float    @default(0)
  inputCost      Float    @default(0)
  outputCost     Float    @default(0)

  // Tokens (used for GraphQL cost)
  totalTokens    Int      @default(0)
  inputTokens    Int      @default(0)
  outputTokens   Int      @default(0)

  timestamp      DateTime @default(now())

  @@index([userId, timestamp])
  @@index([shop, timestamp])
  @@index([endpoint])
  @@index([status])
}
```

## Usage Examples

### Example 1: Track a Shopify API Route

```typescript
// app/api/shopify/products/route.ts
import { trackAPICall } from '@/lib/monitoring'
import { withErrorTracking } from '@/lib/error-tracking'

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop')
  const { userId } = await auth()

  return await trackAPICall(
    '/api/shopify/products',
    shop,
    userId,
    async () => {
      return await withErrorTracking(
        async () => {
          const products = await getProducts(connection)
          return NextResponse.json({ success: true, data: products })
        },
        { endpoint: '/api/shopify/products', shop, userId }
      )
    }
  )
}
```

### Example 2: Monitor GraphQL Operations

```typescript
// lib/shopify-operations.ts
import { shopifyGraphQL } from '@/lib/shopify-graphql'

export async function bulkUpdateProducts(
  connection: Connection,
  userId: string,
  updates: ProductUpdate[]
) {
  const results = []

  for (const update of updates) {
    // Automatic cost tracking and rate limit monitoring
    const result = await shopifyGraphQL(
      connection.domain,
      accessToken,
      mutation,
      { input: update },
      { userId } // Track which user triggered the operation
    )
    results.push(result)
  }

  return results
}
```

### Example 3: Display Monitoring Dashboard

```tsx
// app/dashboard/monitoring/page.tsx
import { PerformanceMonitor } from '@/components/shopify/monitoring/PerformanceMonitor'

export default function MonitoringDashboard() {
  const { user } = await currentUser()
  const connection = await getActiveConnection(user.id)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Monitoring</h1>
        <p className="text-gray-600 mt-2">
          Real-time metrics for {connection.domain}
        </p>
      </div>

      <PerformanceMonitor
        shop={connection.domain}
        period="day"
        refreshInterval={30000}
      />
    </div>
  )
}
```

## Alert Configuration

### Critical Error Alerts

Critical errors (authentication, database, 500 errors) are automatically logged to console. To enable external alerts:

```typescript
// lib/error-tracking.ts - sendAlert function

// Add Slack webhook
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL

if (SLACK_WEBHOOK) {
  await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🚨 Critical Error: ${errorLog.message}`,
      attachments: [{
        color: 'danger',
        fields: [
          { title: 'Shop', value: errorLog.shop },
          { title: 'Endpoint', value: errorLog.endpoint },
          { title: 'Category', value: errorLog.category },
        ]
      }]
    })
  })
}
```

### Rate Limit Alerts

Rate limit warnings are logged when capacity drops below thresholds. Customize in `lib/monitoring.ts`:

```typescript
async function alertOnRateLimit(shop: string, status: RateLimitStatus) {
  if (status.atRisk) {
    // < 10% available - CRITICAL
    console.error('[RATE LIMIT CRITICAL]', { shop, ...status })
    // Send urgent alert
  } else if (status.nearLimit) {
    // < 20% available - WARNING
    console.warn('[RATE LIMIT WARNING]', { shop, ...status })
    // Send warning notification
  }
}
```

## Performance Optimization

### 1. Monitoring is Non-Blocking

All monitoring operations run asynchronously and never block the main application flow:

```typescript
// Catches errors silently
trackGraphQLCost(metrics).catch(err => {
  console.error('[Monitoring] Failed:', err)
})
```

### 2. Database Writes are Async

Performance logs are written asynchronously after the response is sent.

### 3. Rate Limit Caching

Rate limit state is cached in-memory to avoid excessive database queries.

### 4. Aggregation Queries

Analytics endpoint uses efficient aggregation queries with proper indexes:

```typescript
// Uses grouped queries for efficiency
const costByEndpoint = await db.aPIUsageLog.groupBy({
  by: ['endpoint'],
  _sum: { totalCost: true },
  _count: { id: true },
})
```

## Troubleshooting

### High Error Rate

1. Check recent errors in the dashboard
2. Review error categories to identify patterns
3. Check rate limit status (may be hitting limits)
4. Review Shopify API status page

### Slow Response Times

1. Check `slowestEndpoints` in analytics
2. Review `costliestQueries` for expensive GraphQL operations
3. Check database query performance
4. Consider caching frequently accessed data

### Rate Limit Issues

1. Monitor rate limit percentage in real-time
2. Implement request batching for bulk operations
3. Add delays between operations if consistently hitting limits
4. Review query complexity and optimize queries

## Best Practices

1. **Always Track Critical Paths**: Wrap all Shopify API calls with monitoring
2. **Set Appropriate Refresh Intervals**: Balance real-time data with API load
3. **Review Metrics Regularly**: Check daily for trends and issues
4. **Configure Alerts**: Set up Slack/email alerts for critical errors
5. **Optimize Expensive Queries**: Use cost data to identify and optimize high-cost GraphQL queries
6. **Monitor Rate Limits Proactively**: Don't wait until you hit limits

## Future Enhancements

- [ ] Slack/Discord webhook integration for alerts
- [ ] Email notifications for critical errors
- [ ] Advanced charting with time-series data
- [ ] Cost budgets and spending alerts
- [ ] Automated performance reports
- [ ] Machine learning anomaly detection
- [ ] Comparative analysis (day-over-day, week-over-week)
- [ ] Export metrics to external monitoring services (Datadog, New Relic)

## API Reference

See inline TypeScript documentation in:
- `lib/monitoring.ts`
- `lib/error-tracking.ts`
- `lib/shopify-graphql.ts`
- `app/api/shopify/monitor/analytics/route.ts`
