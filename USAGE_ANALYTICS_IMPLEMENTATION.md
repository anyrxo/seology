# Usage Analytics Dashboard Implementation

## Overview

Comprehensive usage analytics system inspired by Opcode, providing real-time tracking of API usage, costs, and optimization insights for the Shopify SEO automation platform.

## Database Schema Enhancements

### APIUsageLog Model

New model for detailed API usage tracking:

```prisma
model APIUsageLog {
  id                String          @id @default(uuid())
  userId            String
  usageRecordId     String?
  usageRecord       UsageRecord?    @relation(fields: [usageRecordId], references: [id])

  // API call details
  model             String          // 'claude-3-5-sonnet-20250107', etc.
  endpoint          String          // 'analyze', 'fix', 'chat', etc.

  // Token tracking
  inputTokens       Int
  outputTokens      Int
  totalTokens       Int

  // Cost tracking (USD)
  inputCost         Float
  outputCost        Float
  totalCost         Float

  // Context
  shop              String?
  connectionId      String?
  fixType           String?
  resourceType      String?         // 'product', 'collection', 'image'
  resourceId        String?

  // Performance
  latencyMs         Int?
  cached            Boolean         @default(false)
  status            String          @default("success")
  errorMessage      String?

  timestamp         DateTime        @default(now())

  @@index([userId, timestamp])
  @@index([shop, timestamp])
}
```

**Key Features:**
- Tracks every Claude API call with full context
- Calculates costs automatically based on token usage
- Links to shops, connections, and resources
- Performance metrics (latency, cache hits)
- Error tracking

## Usage Tracking Library

**File:** `lib/usage-tracker.ts`

### Core Functions

#### `trackAPIUsage(params)`
Logs API usage with automatic cost calculation:
```typescript
await trackAPIUsage({
  userId: 'user-123',
  model: 'claude-3-5-sonnet-20250107',
  endpoint: 'analyze',
  inputTokens: 1500,
  outputTokens: 800,
  shop: 'mystore.myshopify.com',
  resourceType: 'product',
  resourceId: 'prod-456',
  latencyMs: 1250,
})
```

#### `createMessageWithTracking(anthropic, params, trackingParams)`
Wrapper for `anthropic.messages.create()` that automatically tracks usage:
```typescript
const message = await createMessageWithTracking(
  anthropic,
  {
    model: 'claude-3-5-sonnet-20250107',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  },
  {
    userId: connection.userId,
    endpoint: 'analyze_product',
    shop: connection.domain,
    connectionId: connection.id,
    resourceType: 'product',
    resourceId: productId,
  }
)
```

#### Analytics Functions

1. **`getCurrentMonthUsage(userId)`**
   - Returns: `{ totalCost, totalCalls, totalTokens }`
   - Use for dashboard overview cards

2. **`getUsageByModel(userId, startDate, endDate)`**
   - Breakdown by Claude model
   - Returns cost, tokens, and call count per model

3. **`getUsageByShop(userId, startDate, endDate)`**
   - Usage breakdown by Shopify store
   - Identify which shops consume most API credits

4. **`getUsageByEndpoint(userId, startDate, endDate)`**
   - Breakdown by feature (analyze, fix, chat, etc.)
   - Optimize which features to use

5. **`getDailyUsageTrends(userId, startDate, endDate)`**
   - Time-series data for charts
   - Daily cost, tokens, and call counts

6. **`predictNextMonthUsage(userId)`**
   - Projects end-of-month usage based on current trends
   - Returns current and projected metrics
   - Helps with budget planning

### Pricing Configuration

Built-in Claude 3.5 Sonnet pricing:
```typescript
{
  'claude-3-5-sonnet-20250107': {
    input: $0.003 per 1M tokens
    output: $0.015 per 1M tokens
  }
}
```

Costs are calculated automatically and stored in USD.

## Integration Points

### Existing Code Integration

**automation-engine.ts** - Replace direct Claude calls:
```typescript
// OLD:
const message = await anthropic.messages.create({...})

// NEW:
import { createMessageWithTracking } from '@/lib/usage-tracker'

const message = await createMessageWithTracking(
  anthropic,
  { model: '...', messages: [...] },
  {
    userId: config.userId,
    endpoint: 'automation',
    shop: config.shop,
    connectionId: config.connectionId,
  }
)
```

**app/api/shopify/analyze/route.ts** - Already has tracking hooks ready:
```typescript
import { trackAPIUsage } from '@/lib/usage-tracker'

// After Claude API call:
await trackAPIUsage({
  userId: connection.userId,
  model: 'claude-3-5-sonnet-20250107',
  endpoint: 'analyze_product',
  inputTokens: message.usage.input_tokens,
  outputTokens: message.usage.output_tokens,
  shop,
  resourceType: 'product',
  resourceId: productId,
})
```

## Next Steps

### 1. Analytics API Routes

Create `app/api/shopify/analytics/`:
- `GET /usage` - Current month summary
- `GET /usage/trends` - Time-series data for charts
- `GET /usage/breakdown` - By model, shop, endpoint
- `GET /usage/export` - CSV download
- `GET /usage/predictions` - Forecast next month

### 2. Analytics Dashboard UI

Create `app/shopify/analytics/page.tsx`:
- **Overview Cards**: Total cost, requests, tokens, projected cost
- **Line Chart**: Daily usage trends (Recharts)
- **Pie Charts**: Breakdown by model, shop, endpoint
- **Budget Alerts**: Set monthly budget, get warnings at 80%, 90%, 100%
- **Cost Optimization Tips**: AI-powered suggestions
- **Export Button**: Download usage data as CSV
- **Comparison View**: This month vs last month

### 3. Real-time Updates

- Poll analytics API every 10 seconds
- Smooth chart animations with Recharts
- Toast notifications for budget alerts
- Live cost ticker

## Benefits

1. **Cost Transparency**: See exactly what each API call costs
2. **Budget Control**: Set limits and get alerts before overspending
3. **Optimization**: Identify which shops/features use most credits
4. **Forecasting**: Project month-end costs based on current usage
5. **Performance**: Track API latency and identify slow calls
6. **Debugging**: Error tracking for failed API calls

## Technical Notes

- **Model Name**: Prisma generates `aPIUsageLog` (not `apiUsageLog`) due to API prefix
- **Indexing**: Compound indexes on `[userId, timestamp]` and `[shop, timestamp]` for fast queries
- **Cost Precision**: Costs stored with 6 decimal places for accuracy
- **Time Zones**: All timestamps in UTC, convert on display
- **Data Retention**: Consider archiving logs older than 90 days

## Files Created

1. `lib/usage-tracker.ts` - Core tracking library (398 lines)
2. `prisma/schema.prisma` - Enhanced with APIUsageLog model

## Files To Create

1. `app/api/shopify/analytics/usage/route.ts` - Usage summary API
2. `app/api/shopify/analytics/trends/route.ts` - Trends API
3. `app/api/shopify/analytics/breakdown/route.ts` - Breakdown API
4. `app/api/shopify/analytics/export/route.ts` - CSV export API
5. `app/api/shopify/analytics/predictions/route.ts` - Forecasting API
6. `app/shopify/analytics/page.tsx` - Analytics dashboard UI
7. `components/analytics/UsageChart.tsx` - Recharts line chart
8. `components/analytics/BreakdownPieChart.tsx` - Pie charts
9. `components/analytics/BudgetAlerts.tsx` - Budget tracking
10. `components/analytics/OptimizationTips.tsx` - Cost-saving suggestions

## Deployment

Schema changes will be applied automatically on Vercel deploy via `prisma db push` in the build process.
