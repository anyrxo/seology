# Error Handling Quick Reference

Quick copy-paste examples for common error handling scenarios.

## Frontend

### Basic Error Alert

```typescript
import { ErrorAlert } from '@/components/shopify/ErrorAlert'

const [error, setError] = useState<Error | null>(null)

if (error) {
  return (
    <ErrorAlert
      error={error}
      onRetry={async () => {
        await refetch()
        setError(null)
      }}
      onDismiss={() => setError(null)}
    />
  )
}
```

### Error Boundary

```typescript
import { ShopifyErrorBoundary } from '@/components/shopify/ShopifyErrorBoundary'

<ShopifyErrorBoundary onRetry={() => window.location.reload()}>
  <YourComponent />
</ShopifyErrorBoundary>
```

### Feature Error Boundary

```typescript
import { ShopifyFeatureErrorBoundary } from '@/components/shopify/ShopifyErrorBoundary'

<ShopifyFeatureErrorBoundary featureName="Product Optimizer">
  <ProductOptimizerFeature />
</ShopifyFeatureErrorBoundary>
```

### Manual Error Handling

```typescript
import { classifyShopifyError } from '@/lib/shopify-errors'

try {
  await updateProduct()
} catch (error) {
  const errorInfo = classifyShopifyError(error)

  if (errorInfo.retryable) {
    // Show retry UI
    setError(error)
  } else {
    // Show error message
    toast.error(errorInfo.userFriendlyMessage)
    console.log('Suggestions:', errorInfo.suggestions)
  }
}
```

## Backend

### API Route Pattern

```typescript
import { NextRequest } from 'next/server'
import { toNextResponse, successResponse } from '@/lib/errors'
import { shopifyGraphQLWithConnectionRetry } from '@/lib/shopify-graphql'
import { ShopifyValidationError, ShopifyAuthenticationError } from '@/lib/shopify-errors'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // 1. Validate input
    const shop = request.nextUrl.searchParams.get('shop')
    if (!shop) {
      throw new ShopifyValidationError('Shop parameter is required')
    }

    // 2. Get connection
    const connection = await db.connection.findFirst({
      where: { domain: shop, platform: 'SHOPIFY' }
    })

    if (!connection) {
      throw new ShopifyAuthenticationError('Shop not connected')
    }

    // 3. GraphQL query with retry
    const result = await shopifyGraphQLWithConnectionRetry(
      connection,
      query,
      variables,
      { maxRetries: 3 }
    )

    // 4. Success response
    return successResponse(result)

  } catch (error) {
    // 5. Error response
    return toNextResponse(error instanceof Error ? error : new Error('Unknown'))
  }
}
```

### Custom Retry Logic

```typescript
import { retryWithBackoff } from '@/lib/shopify-retry'

const result = await retryWithBackoff(
  () => dangerousOperation(),
  {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    onRetry: (error, attempt, delay) => {
      console.log(`Retry ${attempt} after ${delay}ms`)
    }
  }
)
```

## Error Types

### Throw Custom Errors

```typescript
import {
  ShopifyRateLimitError,
  ShopifyAuthenticationError,
  ShopifySessionExpiredError,
  ShopifyPermissionError,
  ShopifyResourceNotFoundError,
  ShopifyGraphQLError,
  ShopifyNetworkError,
  ShopifyValidationError,
} from '@/lib/shopify-errors'

// Rate limit
throw new ShopifyRateLimitError(2) // retry after 2 seconds

// Auth failed
throw new ShopifyAuthenticationError('Invalid token')

// Session expired
throw new ShopifySessionExpiredError()

// Permission denied
throw new ShopifyPermissionError('Missing read_products scope', 'read_products')

// Not found
throw new ShopifyResourceNotFoundError('Product', 'gid://shopify/Product/123')

// GraphQL error
throw new ShopifyGraphQLError('Query failed', [{ message: 'Field not found' }])

// Network error
throw new ShopifyNetworkError('Connection timeout')

// Validation error
throw new ShopifyValidationError('Invalid input', [
  { field: ['price'], message: 'Must be positive' }
])
```

### Check Error Type

```typescript
import { classifyShopifyError } from '@/lib/shopify-errors'

const errorInfo = classifyShopifyError(error)

if (errorInfo.type === 'rate_limit') {
  console.log('Rate limited!')
}

if (errorInfo.retryable) {
  console.log('Can retry this error')
}

console.log(errorInfo.userFriendlyMessage) // Show to user
console.log(errorInfo.suggestions) // Show recovery steps
```

## GraphQL

### With Retry (Recommended)

```typescript
import { shopifyGraphQLWithRetry } from '@/lib/shopify-graphql'

const result = await shopifyGraphQLWithRetry(
  shop,
  accessToken,
  query,
  variables,
  { maxRetries: 3 }
)
```

### With Connection and Retry

```typescript
import { shopifyGraphQLWithConnectionRetry } from '@/lib/shopify-graphql'

const result = await shopifyGraphQLWithConnectionRetry(
  connection,
  query,
  variables,
  { maxRetries: 3 }
)
```

### Without Retry (Not Recommended)

```typescript
import { shopifyGraphQL } from '@/lib/shopify-graphql'

// Only use if you have specific retry logic
const result = await shopifyGraphQL(shop, accessToken, query, variables)
```

## Circuit Breaker

```typescript
import { CircuitBreaker } from '@/lib/shopify-retry'

const breaker = new CircuitBreaker(
  5,      // threshold: open after 5 failures
  60000   // timeout: 60 seconds
)

const result = await breaker.execute(
  () => dangerousOperation(),
  { maxRetries: 3 }
)

// Check state
console.log(breaker.getState()) // 'closed' | 'open' | 'half-open'

// Reset
breaker.reset()
```

## Batch Operations

```typescript
import { batchRetry } from '@/lib/shopify-retry'

const operations = products.map(product =>
  () => updateProduct(product)
)

const results = await batchRetry(operations, { maxRetries: 2 })

results.forEach((result, i) => {
  if (result.success) {
    console.log(`Product ${i} updated:`, result.data)
  } else {
    console.error(`Product ${i} failed:`, result.error)
  }
})
```

## Testing

### Simulate Errors

```typescript
// Rate limit
throw new ShopifyRateLimitError(2)

// Network error
throw new ShopifyNetworkError('Timeout')

// Auth error
throw new ShopifyAuthenticationError('Expired')
```

### Test Retry

```typescript
let attempts = 0

const unreliable = async () => {
  attempts++
  if (attempts < 3) {
    throw new ShopifyRateLimitError(1)
  }
  return 'success'
}

const result = await retryWithBackoff(unreliable)
console.log(result) // 'success' after 3 attempts
```

## Common Patterns

### API Route with Validation

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    if (!body.productId) {
      throw new ShopifyValidationError('productId is required')
    }

    // Execute
    const result = await shopifyGraphQLWithConnectionRetry(
      connection,
      mutation,
      { id: body.productId }
    )

    return successResponse(result)
  } catch (error) {
    return toNextResponse(error instanceof Error ? error : new Error('Unknown'))
  }
}
```

### Component with Error State

```typescript
function ProductList() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/shopify/products')
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error.message)
      }

      setProducts(data.data.products)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown'))
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <ErrorAlert
        error={error}
        onRetry={fetchProducts}
        onDismiss={() => setError(null)}
      />
    )
  }

  if (loading) return <Loading />

  return <div>{/* products */}</div>
}
```

### Rate Limit Handling

```typescript
async function fetchWithRateLimit(url: string) {
  const response = await fetch(url)
  const data = await response.json()

  if (!data.success && data.error.code === 'RATE_LIMIT_EXCEEDED') {
    const delay = data.error.details.retryAfterSeconds * 1000
    await new Promise(resolve => setTimeout(resolve, delay))
    return fetchWithRateLimit(url) // Retry
  }

  return data
}
```

## Error Response Examples

### Success

```json
{
  "success": true,
  "data": { /* ... */ },
  "meta": { "count": 10 }
}
```

### Rate Limit

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Shopify API rate limit exceeded. Retry after 2 seconds.",
    "details": { "retryAfterSeconds": 2 },
    "timestamp": "2025-01-07T10:30:00.000Z"
  }
}
```

### Validation

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Shop parameter is required",
    "timestamp": "2025-01-07T10:30:00.000Z"
  }
}
```

### Auth

```json
{
  "success": false,
  "error": {
    "code": "SHOPIFY_API_ERROR",
    "message": "Shop not connected. Please install the app first.",
    "timestamp": "2025-01-07T10:30:00.000Z"
  }
}
```

## Cheat Sheet

| Scenario | Use This |
|----------|----------|
| API route | `toNextResponse(error)` |
| GraphQL call | `shopifyGraphQLWithConnectionRetry()` |
| React error | `<ShopifyErrorBoundary>` |
| Feature isolation | `<ShopifyFeatureErrorBoundary>` |
| Inline error | `<ErrorAlert error={error} />` |
| Custom retry | `retryWithBackoff(() => fn())` |
| Rate limit retry | `retryWithRateLimit(() => fn())` |
| Batch operations | `batchRetry([...operations])` |
| Circuit breaker | `new CircuitBreaker().execute()` |
| Classify error | `classifyShopifyError(error)` |
| Check retryable | `errorInfo.retryable` |
| Get suggestions | `errorInfo.suggestions` |

## Files Reference

| File | Purpose |
|------|---------|
| `lib/shopify-errors.ts` | Error classes and classification |
| `lib/shopify-retry.ts` | Retry logic and utilities |
| `lib/shopify-graphql.ts` | GraphQL client with retry |
| `components/shopify/ShopifyErrorBoundary.tsx` | Error boundaries |
| `components/shopify/ErrorAlert.tsx` | Error UI components |
| `lib/errors.ts` | Core error utilities |
| `docs/ERROR-HANDLING.md` | Full documentation |
| `docs/API-ROUTE-ERROR-HANDLING-EXAMPLE.md` | Migration guide |
