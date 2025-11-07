# Monitoring System - Quick Reference

## Quick Start

### 1. Track an API Route

```typescript
import { trackAPICall } from '@/lib/monitoring'
import { withErrorTracking } from '@/lib/error-tracking'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  const shop = req.nextUrl.searchParams.get('shop')!

  return await trackAPICall(
    '/api/your-route',
    shop,
    userId,
    async () => {
      return await withErrorTracking(
        async () => {
          // Your code here
          return NextResponse.json({ success: true })
        },
        { endpoint: '/api/your-route', shop, userId }
      )
    }
  )
}
```

### 2. Use GraphQL (Already Tracked)

```typescript
import { shopifyGraphQL } from '@/lib/shopify-graphql'

// Automatically tracked - just pass userId in options
const result = await shopifyGraphQL(
  shop,
  accessToken,
  query,
  variables,
  { userId } // <- Enables user-level tracking
)
```

### 3. Display Metrics

```tsx
import { PerformanceMonitor } from '@/components/shopify/monitoring/PerformanceMonitor'

<PerformanceMonitor
  shop="example.myshopify.com"
  period="day"
  refreshInterval={60000}
/>
```

## API Endpoints

### Get Analytics

```
GET /api/shopify/monitor/analytics
  ?shop=example.myshopify.com
  &period=day
  &includeHealth=true
  &includeRateLimit=true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "performance": { /* metrics */ },
    "systemHealth": { /* health status */ },
    "rateLimitHealth": { /* rate limit info */ },
    "recentErrors": [ /* errors */ ],
    "costBreakdown": [ /* costs by endpoint */ ],
    "hourlyMetrics": [ /* time series data */ ]
  }
}
```

## Core Functions

### Monitoring (`lib/monitoring.ts`)

```typescript
// Track API call performance
await trackAPICall(endpoint, shop, userId, operation, options?)

// Track GraphQL cost
await trackGraphQLCost({ shop, query, cost, duration, throttleStatus, timestamp })

// Get performance summary
const summary = await getPerformanceSummary(shop, 'day')

// Get rate limit health
const rateLimit = await getRateLimitHealth(shop)

// Get system health
const health = await getSystemHealth(shop)

// Get error rate
const errorRate = await getErrorRate(shop, 24)

// Get avg response time
const avgTime = await getAvgResponseTime(shop, 24)
```

### Error Tracking (`lib/error-tracking.ts`)

```typescript
// Log an error
await logError(error, {
  endpoint: '/api/route',
  shop: 'example.myshopify.com',
  userId: 'user_123',
  statusCode: 500,
  additionalInfo: { /* extra data */ }
})

// Get error stats
const stats = await getErrorStats(shop, 24)

// Wrap operation with error tracking
const result = await withErrorTracking(
  async () => {
    // risky operation
  },
  { endpoint, shop, userId }
)
```

## Error Categories

| Category | Examples | Severity |
|----------|----------|----------|
| `authentication` | 401 errors, auth failures | Critical |
| `authorization` | 403 errors, permissions | High |
| `rate_limit` | 429 errors, throttling | High |
| `api_error` | Shopify API errors | Medium |
| `database_error` | Prisma errors | Critical |
| `validation_error` | 400 errors | Low |
| `network_error` | Network failures | Medium |
| `unknown` | Uncategorized | Varies |

## Alert Thresholds

### Rate Limits
- **Near Limit**: < 20% available (⚠️ Warning)
- **At Risk**: < 10% available (🚨 Critical)

### Error Rates
- **Normal**: < 10% errors (✅ Healthy)
- **Degraded**: 10-25% errors (⚠️ Warning)
- **Unhealthy**: > 25% errors (🚨 Critical)

### Response Times
- **Normal**: < 2000ms (✅ Healthy)
- **Degraded**: 2000-5000ms (⚠️ Warning)
- **Unhealthy**: > 5000ms (🚨 Critical)

## Common Patterns

### Pattern 1: Simple GET Endpoint

```typescript
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  const shop = req.nextUrl.searchParams.get('shop')!

  return trackAPICall('/api/simple', shop, userId, async () => {
    const data = await fetchData()
    return NextResponse.json({ success: true, data })
  })
}
```

### Pattern 2: POST with Validation

```typescript
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  const body = await req.json()

  return trackAPICall('/api/create', body.shop, userId, async () => {
    return withErrorTracking(
      async () => {
        validateInput(body) // throws on invalid
        const result = await createResource(body)
        return NextResponse.json({ success: true, data: result })
      },
      { endpoint: '/api/create', shop: body.shop, userId }
    )
  })
}
```

### Pattern 3: GraphQL Mutation

```typescript
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  const { shop, productId, updates } = await req.json()

  return trackAPICall('/api/update-product', shop, userId, async () => {
    return withErrorTracking(
      async () => {
        const connection = await getConnection(userId, shop)

        const result = await shopifyGraphQL(
          shop,
          accessToken,
          mutation,
          { input: updates },
          { userId } // Track user
        )

        return NextResponse.json({ success: true, data: result })
      },
      { endpoint: '/api/update-product', shop, userId }
    )
  })
}
```

### Pattern 4: Batch Operations

```typescript
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  const { shop, operations } = await req.json()

  return trackAPICall('/api/batch', shop, userId, async () => {
    return withErrorTracking(
      async () => {
        const results = []

        for (const op of operations) {
          // Each GraphQL call is automatically tracked
          const result = await shopifyGraphQL(
            shop,
            accessToken,
            query,
            op,
            { userId }
          )
          results.push(result)

          // Small delay to avoid rate limits
          await delay(100)
        }

        return NextResponse.json({ success: true, data: results })
      },
      {
        endpoint: '/api/batch',
        shop,
        userId,
        additionalInfo: { operationCount: operations.length }
      }
    )
  })
}
```

## Dashboard Examples

### Minimal Dashboard

```tsx
import { PerformanceMonitor } from '@/components/shopify/monitoring/PerformanceMonitor'

export default function MonitoringPage({ shop }: { shop: string }) {
  return <PerformanceMonitor shop={shop} period="day" />
}
```

### Multi-Period Dashboard

```tsx
export default function MonitoringPage({ shop }: { shop: string }) {
  const [period, setPeriod] = useState<'hour' | 'day' | 'week'>('day')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setPeriod('hour')}>Last Hour</button>
        <button onClick={() => setPeriod('day')}>Last Day</button>
        <button onClick={() => setPeriod('week')}>Last Week</button>
      </div>

      <PerformanceMonitor shop={shop} period={period} />
    </div>
  )
}
```

### Multi-Shop Dashboard (Admin)

```tsx
export default async function AdminMonitoring() {
  const shops = await getAllActiveShops()

  return (
    <div className="space-y-8">
      {shops.map(shop => (
        <section key={shop.id}>
          <h2 className="text-xl font-bold mb-4">
            {shop.displayName}
          </h2>
          <PerformanceMonitor
            shop={shop.domain}
            period="day"
            refreshInterval={120000} // 2 minutes
          />
        </section>
      ))}
    </div>
  )
}
```

## Debugging

### Check if Tracking Works

```typescript
// In any API route
console.log('[Debug] Tracking API call...')
await trackAPICall('/api/test', shop, userId, async () => {
  console.log('[Debug] Inside tracked operation')
  return { test: true }
})

// Then query database:
// SELECT * FROM "APIUsageLog" WHERE endpoint = '/api/test' ORDER BY timestamp DESC LIMIT 5;
```

### View Recent Errors

```sql
SELECT
  endpoint,
  "errorMessage",
  timestamp,
  shop,
  "userId"
FROM "APIUsageLog"
WHERE status = 'error'
ORDER BY timestamp DESC
LIMIT 20;
```

### View Slowest Endpoints

```sql
SELECT
  endpoint,
  AVG("latencyMs") as avg_latency,
  MAX("latencyMs") as max_latency,
  COUNT(*) as call_count
FROM "APIUsageLog"
WHERE "latencyMs" IS NOT NULL
  AND timestamp > NOW() - INTERVAL '24 hours'
GROUP BY endpoint
ORDER BY avg_latency DESC
LIMIT 10;
```

### View GraphQL Costs

```sql
SELECT
  shop,
  endpoint,
  AVG("totalCost") as avg_cost,
  SUM("totalCost") as total_cost,
  COUNT(*) as query_count
FROM "APIUsageLog"
WHERE endpoint = 'shopify_graphql'
  AND timestamp > NOW() - INTERVAL '24 hours'
GROUP BY shop, endpoint
ORDER BY total_cost DESC;
```

## Troubleshooting

### Metrics Not Appearing

1. Check auth: Ensure `userId` is provided
2. Check shop param: Verify shop domain is correct
3. Check database: Query `APIUsageLog` directly
4. Check console: Look for monitoring errors (non-blocking)

### High Error Rate

1. Check `recentErrors` in analytics response
2. Review error categories to identify pattern
3. Check Shopify API status page
4. Review rate limit status

### Slow Response Times

1. Check `slowestEndpoints` in analytics
2. Review `costliestQueries` for expensive GraphQL ops
3. Add indexes to database queries
4. Consider caching frequently accessed data

## Environment Variables

Optional - for enhanced features:

```env
# Slack webhook for critical error alerts
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# PagerDuty integration key
PAGERDUTY_INTEGRATION_KEY=...

# DataDog API key
DATADOG_API_KEY=...
```

## Testing Checklist

- [ ] Analytics API returns data
- [ ] Dashboard component renders
- [ ] Metrics update on refresh
- [ ] Error tracking logs to database
- [ ] GraphQL costs are tracked
- [ ] Rate limit status displays correctly
- [ ] System health updates based on thresholds
- [ ] Critical errors trigger console warnings

## Resources

- **Full Documentation**: `docs/monitoring-system.md`
- **Example Implementation**: `app/api/shopify/products/monitored-example/route.ts`
- **Component Source**: `components/shopify/monitoring/PerformanceMonitor.tsx`
- **Core Library**: `lib/monitoring.ts`
- **Error Tracking**: `lib/error-tracking.ts`

---

**Need Help?** Check the comprehensive documentation in `docs/monitoring-system.md`
