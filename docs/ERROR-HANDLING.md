# Shopify App Error Handling System

## Overview

The Shopify app includes a comprehensive error handling system designed to improve reliability and user experience. This system provides:

- **Custom error types** for different Shopify API failures
- **Automatic retry logic** with exponential backoff
- **User-friendly error messages** with recovery suggestions
- **Enhanced error boundaries** for React components
- **Standardized error responses** for API routes

## Architecture

### Error Classification

All errors are automatically classified into types:

| Error Type | Description | Retryable | Example |
|------------|-------------|-----------|---------|
| `rate_limit` | Shopify API rate limit exceeded | ✅ Yes | Too many requests in short time |
| `auth_failed` | Authentication failure | ❌ No | Invalid access token |
| `session_expired` | Session token expired | ❌ No | User needs to reload app |
| `permission_denied` | Missing required permissions | ❌ No | App scope insufficient |
| `network` | Network/connection error | ✅ Yes | Internet connection issues |
| `validation` | Invalid input data | ❌ No | Malformed GraphQL query |
| `resource_not_found` | Resource doesn't exist | ❌ No | Product ID not found |
| `graphql_error` | GraphQL API error | Depends | Various GraphQL issues |
| `internal` | Server-side error | ✅ Yes | Unexpected server failures |
| `unknown` | Unclassified error | ❌ No | Fallback for edge cases |

### Error Classes

#### Core Error Classes (`lib/shopify-errors.ts`)

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
  classifyShopifyError,
} from '@/lib/shopify-errors'
```

**Example:**
```typescript
// Throw a rate limit error
throw new ShopifyRateLimitError(2) // Retry after 2 seconds

// Throw an authentication error
throw new ShopifyAuthenticationError('Invalid access token')

// Classify any error for UI display
const errorInfo = classifyShopifyError(error)
console.log(errorInfo.userFriendlyMessage) // "Your session has expired"
console.log(errorInfo.suggestions) // ["Reload the page", "Re-open app..."]
```

## Retry Logic

### Retry Utility (`lib/shopify-retry.ts`)

The retry system provides intelligent retry logic:

```typescript
import {
  retryWithBackoff,
  retryWithRateLimit,
  retryGraphQL,
  CircuitBreaker,
} from '@/lib/shopify-retry'
```

**Basic Retry:**
```typescript
const result = await retryWithBackoff(
  () => shopifyGraphQL(shop, token, query),
  {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
  }
)
```

**Rate Limit Retry:**
```typescript
const result = await retryWithRateLimit(
  () => shopifyGraphQL(shop, token, query)
)
// Automatically respects Retry-After header
```

**GraphQL Retry:**
```typescript
const result = await retryGraphQL(
  () => shopifyGraphQL(shop, token, query)
)
// Smart retry logic for GraphQL-specific errors
```

**Circuit Breaker:**
```typescript
const breaker = new CircuitBreaker(5, 60000) // 5 failures, 60s timeout

const result = await breaker.execute(
  () => shopifyGraphQL(shop, token, query)
)
```

### GraphQL with Retry (`lib/shopify-graphql.ts`)

**Recommended: Use retry-enabled wrappers**

```typescript
import {
  shopifyGraphQLWithRetry,
  shopifyGraphQLWithConnectionRetry,
} from '@/lib/shopify-graphql'

// With shop and token
const products = await shopifyGraphQLWithRetry(
  shop,
  accessToken,
  query,
  variables,
  { maxRetries: 3 }
)

// With connection object
const products = await shopifyGraphQLWithConnectionRetry(
  connection,
  query,
  variables,
  { maxRetries: 3 }
)
```

## Frontend Error Handling

### Error Boundaries

#### Shopify Error Boundary (`components/shopify/ShopifyErrorBoundary.tsx`)

Wrap your Shopify app components:

```typescript
import { ShopifyErrorBoundary } from '@/components/shopify/ShopifyErrorBoundary'

export default function MyPage() {
  return (
    <ShopifyErrorBoundary onRetry={() => window.location.reload()}>
      <MyComponent />
    </ShopifyErrorBoundary>
  )
}
```

**Custom fallback:**
```typescript
<ShopifyErrorBoundary
  fallback={(error, errorInfo, reset) => (
    <div>
      <h2>{errorInfo.userFriendlyMessage}</h2>
      <ul>
        {errorInfo.suggestions.map(s => <li>{s}</li>)}
      </ul>
      {errorInfo.retryable && <button onClick={reset}>Retry</button>}
    </div>
  )}
>
  <MyComponent />
</ShopifyErrorBoundary>
```

#### Feature Error Boundary

For individual features:

```typescript
import { ShopifyFeatureErrorBoundary } from '@/components/shopify/ShopifyErrorBoundary'

<ShopifyFeatureErrorBoundary featureName="Product Optimizer">
  <ProductOptimizerFeature />
</ShopifyFeatureErrorBoundary>
```

### Error Alerts

#### Inline Error Alert (`components/shopify/ErrorAlert.tsx`)

```typescript
import { ErrorAlert } from '@/components/shopify/ErrorAlert'

function MyComponent() {
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    return (
      <ErrorAlert
        error={error}
        onRetry={async () => {
          await refetchData()
          setError(null)
        }}
        onDismiss={() => setError(null)}
      />
    )
  }

  return <div>Content</div>
}
```

#### Toast Error Alert

```typescript
<ErrorAlert
  error={error}
  variant="toast"
  onRetry={handleRetry}
  onDismiss={handleDismiss}
/>
```

## Backend Error Handling

### API Routes

**Pattern for API routes with enhanced error handling:**

```typescript
import { NextRequest } from 'next/server'
import { toNextResponse, successResponse } from '@/lib/errors'
import {
  ShopifyRateLimitError,
  ShopifyAuthenticationError,
} from '@/lib/shopify-errors'
import { shopifyGraphQLWithRetry } from '@/lib/shopify-graphql'

export async function GET(request: NextRequest) {
  try {
    const shop = request.nextUrl.searchParams.get('shop')

    if (!shop) {
      throw new ShopifyValidationError('Shop parameter is required')
    }

    // Get connection
    const connection = await db.connection.findFirst({
      where: { domain: shop, platform: 'SHOPIFY' }
    })

    if (!connection) {
      throw new ShopifyAuthenticationError('Shop not connected')
    }

    // Make GraphQL request with automatic retry
    const result = await shopifyGraphQLWithRetry(
      connection.domain,
      decrypt(connection.accessToken!),
      query,
      variables,
      { maxRetries: 3 }
    )

    return successResponse(result)

  } catch (error) {
    // Automatically converts to proper HTTP response
    // with user-friendly error messages
    return toNextResponse(error instanceof Error ? error : new Error('Unknown error'))
  }
}
```

### Error Response Format

All API errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Shopify API rate limit exceeded. Retry after 2 seconds.",
    "details": {
      "retryAfterSeconds": 2
    },
    "timestamp": "2025-01-07T10:30:00.000Z"
  }
}
```

Success responses:

```json
{
  "success": true,
  "data": {
    // Your data here
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Best Practices

### 1. Always Use Retry Wrappers

❌ **Don't:**
```typescript
const result = await shopifyGraphQL(shop, token, query)
```

✅ **Do:**
```typescript
const result = await shopifyGraphQLWithRetry(shop, token, query)
```

### 2. Handle Errors Gracefully

❌ **Don't:**
```typescript
try {
  await updateProduct()
} catch (error) {
  console.error(error)
}
```

✅ **Do:**
```typescript
try {
  await updateProduct()
} catch (error) {
  const errorInfo = classifyShopifyError(error)

  if (errorInfo.retryable) {
    // Show retry UI
    setError(error)
  } else {
    // Show error message with suggestions
    toast.error(errorInfo.userFriendlyMessage)
    console.log('Suggestions:', errorInfo.suggestions)
  }
}
```

### 3. Use Error Boundaries

Wrap features in error boundaries to prevent cascading failures:

```typescript
// ✅ Good - isolated failure
<ShopifyFeatureErrorBoundary featureName="Analytics">
  <AnalyticsWidget />
</ShopifyFeatureErrorBoundary>

<ShopifyFeatureErrorBoundary featureName="Products">
  <ProductsList />
</ShopifyFeatureErrorBoundary>
```

### 4. Log Errors for Monitoring

```typescript
import { logError } from '@/lib/errors'

try {
  await dangerousOperation()
} catch (error) {
  logError(error, {
    context: 'product-update',
    productId: product.id,
    userId: user.id,
  })
  throw error
}
```

### 5. Provide User Feedback

Always show users what happened and what they can do:

```typescript
const errorInfo = classifyShopifyError(error)

// Show user-friendly message
toast.error(errorInfo.userFriendlyMessage)

// Show actionable suggestions
if (errorInfo.suggestions.length > 0) {
  console.info('What to try:', errorInfo.suggestions)
}

// Provide retry if applicable
if (errorInfo.retryable) {
  toast.info('Retrying automatically...', {
    action: {
      label: 'Retry Now',
      onClick: () => handleRetry(),
    },
  })
}
```

## Testing Error Handling

### Simulate Errors in Development

```typescript
// Simulate rate limit
throw new ShopifyRateLimitError(2)

// Simulate network error
throw new ShopifyNetworkError('Connection timeout')

// Simulate auth error
throw new ShopifyAuthenticationError('Token expired')
```

### Test Retry Logic

```typescript
let attempts = 0

const unreliableFunction = async () => {
  attempts++
  if (attempts < 3) {
    throw new ShopifyRateLimitError(1)
  }
  return 'success'
}

const result = await retryWithBackoff(unreliableFunction)
console.log(result) // 'success' after 3 attempts
```

## Error Monitoring Integration

The error system is ready for monitoring integration (Sentry, LogRocket, etc.):

```typescript
// In lib/errors.ts
export function logError(error: Error, context?: Record<string, unknown>) {
  // Console logging (always)
  console.error('[ERROR]', error, context)

  // Send to Sentry (when configured)
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(error, { extra: context })
  }

  // Send to custom monitoring
  if (process.env.CUSTOM_ERROR_ENDPOINT) {
    fetch(process.env.CUSTOM_ERROR_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        context,
      }),
    })
  }
}
```

## Troubleshooting

### Common Issues

**Issue: Infinite retry loop**
```typescript
// ❌ Bad - retryable error with no max retries
await retryWithBackoff(() => alwaysFails())

// ✅ Good - set max retries
await retryWithBackoff(() => mightFail(), { maxRetries: 3 })
```

**Issue: Rate limits still occurring**
```typescript
// ❌ Bad - bypassing rate limit checks
const results = await Promise.all(
  products.map(p => shopifyGraphQL(shop, token, updateQuery))
)

// ✅ Good - sequential with rate limiting
for (const product of products) {
  await shopifyGraphQLWithRetry(shop, token, updateQuery)
}
```

**Issue: Auth errors not handled**
```typescript
// ✅ Good - check for auth errors
try {
  await shopifyGraphQLWithRetry(shop, token, query)
} catch (error) {
  if (error instanceof ShopifyAuthenticationError) {
    // Redirect to reconnect flow
    router.push('/shopify/reconnect')
  }
  throw error
}
```

## Summary

The error handling system provides:

✅ **Reliability**: Automatic retries for transient failures
✅ **User Experience**: Clear, actionable error messages
✅ **Developer Experience**: Type-safe error handling
✅ **Monitoring**: Built-in error tracking and logging
✅ **Resilience**: Circuit breakers prevent cascading failures

**Key Files:**
- `lib/shopify-errors.ts` - Error classes and classification
- `lib/shopify-retry.ts` - Retry logic and circuit breakers
- `lib/shopify-graphql.ts` - GraphQL client with retries
- `components/shopify/ShopifyErrorBoundary.tsx` - React error boundaries
- `components/shopify/ErrorAlert.tsx` - Error UI components
- `lib/errors.ts` - Core error handling utilities

For questions or issues, refer to the inline code documentation or create an issue in the project repository.
