# API Route Error Handling - Example Update

## Before: Basic Error Handling

```typescript
// app/api/shopify/products/route.ts (BEFORE)

import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { shopifyGraphQL } from '@/lib/shopify-graphql'
import { db } from '@/lib/db'
import { decrypt } from '@/lib/encryption'

export async function GET(request: NextRequest) {
  try {
    const shop = request.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { error: 'Shop parameter required' },
        { status: 400 }
      )
    }

    const connection = await db.connection.findFirst({
      where: { domain: shop, platform: 'SHOPIFY' }
    })

    if (!connection || !connection.accessToken) {
      return NextResponse.json(
        { error: 'Shop not connected' },
        { status: 401 }
      )
    }

    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `

    const result = await shopifyGraphQL(
      connection.domain,
      decrypt(connection.accessToken),
      query,
      { first: 10 }
    )

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
```

**Problems:**
- ❌ No automatic retry on transient failures
- ❌ Generic error messages ("Failed to fetch products")
- ❌ No error classification (rate limit vs auth vs network)
- ❌ No retry-after information for rate limits
- ❌ Inconsistent error response format
- ❌ No proper error logging with context

---

## After: Enhanced Error Handling

```typescript
// app/api/shopify/products/route.ts (AFTER)

import { NextRequest } from 'next/server'
import { toNextResponse, successResponse, ValidationError } from '@/lib/errors'
import {
  shopifyGraphQLWithConnectionRetry,
  type ProductsList,
} from '@/lib/shopify-graphql'
import {
  ShopifyAuthenticationError,
  ShopifyValidationError,
} from '@/lib/shopify-errors'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // 1. Validate input
    const shop = request.nextUrl.searchParams.get('shop')
    const limitParam = request.nextUrl.searchParams.get('limit')

    if (!shop) {
      throw new ShopifyValidationError('Shop parameter is required')
    }

    const limit = limitParam ? parseInt(limitParam) : 10
    if (isNaN(limit) || limit < 1 || limit > 250) {
      throw new ShopifyValidationError('Limit must be between 1 and 250')
    }

    // 2. Get connection with proper error if not found
    const connection = await db.connection.findFirst({
      where: { domain: shop, platform: 'SHOPIFY' }
    })

    if (!connection) {
      throw new ShopifyAuthenticationError(
        `Shop ${shop} is not connected. Please install the app first.`
      )
    }

    if (!connection.accessToken) {
      throw new ShopifyAuthenticationError(
        'Connection has no access token. Please reconnect the app.'
      )
    }

    // 3. GraphQL query
    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              descriptionHtml
              seo {
                title
                description
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `

    // 4. Execute with automatic retry logic
    const result = await shopifyGraphQLWithConnectionRetry<ProductsList>(
      connection,
      query,
      { first: limit },
      { maxRetries: 3 } // Will retry rate limits and network errors
    )

    // 5. Return standardized success response
    return successResponse({
      products: result.products.edges.map(e => e.node),
      pageInfo: result.products.pageInfo,
    }, {
      count: result.products.edges.length,
      hasMore: result.products.pageInfo.hasNextPage,
    })

  } catch (error) {
    // 6. Automatic error conversion with proper HTTP status codes
    // and user-friendly messages based on error type
    return toNextResponse(
      error instanceof Error ? error : new Error('Unknown error'),
      request.headers.get('x-request-id') || undefined
    )
  }
}
```

**Improvements:**
- ✅ Automatic retry on rate limits and network errors (3 attempts with backoff)
- ✅ User-friendly error messages based on error type
- ✅ Proper error classification with custom error classes
- ✅ Retry-After header automatically included for rate limits
- ✅ Standardized error response format
- ✅ Request ID tracking for debugging
- ✅ Input validation with specific error messages
- ✅ Type-safe GraphQL responses
- ✅ Metadata in success responses

---

## Error Response Examples

### Rate Limit Error

**Request:**
```
GET /api/shopify/products?shop=example.myshopify.com
```

**Response:** (429 Too Many Requests)
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Shopify API rate limit exceeded. Retry after 2 seconds.",
    "details": {
      "retryAfterSeconds": 2
    },
    "timestamp": "2025-01-07T10:30:00.000Z",
    "requestId": "req_abc123"
  }
}
```

**Client handling:**
```typescript
const response = await fetch('/api/shopify/products?shop=example.myshopify.com')
const data = await response.json()

if (!data.success) {
  if (data.error.code === 'RATE_LIMIT_EXCEEDED') {
    const retryAfter = data.error.details?.retryAfterSeconds || 2
    console.log(`Rate limited. Retry after ${retryAfter} seconds`)

    // Automatic retry after delay
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000))
    return fetch('/api/shopify/products?shop=example.myshopify.com')
  }
}
```

### Authentication Error

**Request:**
```
GET /api/shopify/products?shop=not-connected.myshopify.com
```

**Response:** (401 Unauthorized)
```json
{
  "success": false,
  "error": {
    "code": "SHOPIFY_API_ERROR",
    "message": "Shop not-connected.myshopify.com is not connected. Please install the app first.",
    "timestamp": "2025-01-07T10:30:00.000Z"
  }
}
```

**Client handling:**
```typescript
if (data.error.code === 'SHOPIFY_API_ERROR') {
  // Redirect to app installation
  window.location.href = `/api/auth/shopify/install?shop=${shop}`
}
```

### Validation Error

**Request:**
```
GET /api/shopify/products?shop=example.myshopify.com&limit=500
```

**Response:** (400 Bad Request)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Limit must be between 1 and 250",
    "timestamp": "2025-01-07T10:30:00.000Z"
  }
}
```

### Success Response

**Request:**
```
GET /api/shopify/products?shop=example.myshopify.com&limit=10
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "gid://shopify/Product/123",
        "title": "Example Product",
        "handle": "example-product",
        "descriptionHtml": "<p>Product description</p>",
        "seo": {
          "title": "Example Product - SEO Title",
          "description": "SEO description"
        }
      }
    ],
    "pageInfo": {
      "hasNextPage": true,
      "endCursor": "eyJsYXN0X2lkIjo..."
    }
  },
  "meta": {
    "count": 10,
    "hasMore": true
  }
}
```

---

## Migration Checklist

To update an existing API route:

### 1. Update Imports
```typescript
// Add these imports
import { toNextResponse, successResponse } from '@/lib/errors'
import { shopifyGraphQLWithConnectionRetry } from '@/lib/shopify-graphql'
import {
  ShopifyAuthenticationError,
  ShopifyValidationError,
} from '@/lib/shopify-errors'
```

### 2. Replace shopifyGraphQL calls
```typescript
// Before
const result = await shopifyGraphQL(shop, token, query, variables)

// After
const result = await shopifyGraphQLWithConnectionRetry(
  connection,
  query,
  variables,
  { maxRetries: 3 }
)
```

### 3. Use Custom Error Classes
```typescript
// Before
if (!shop) {
  return NextResponse.json({ error: 'Missing shop' }, { status: 400 })
}

// After
if (!shop) {
  throw new ShopifyValidationError('Shop parameter is required')
}
```

### 4. Use Standard Response Helpers
```typescript
// Before
return NextResponse.json(data)

// After
return successResponse(data, { count: data.length })
```

### 5. Use toNextResponse for Errors
```typescript
// Before
catch (error) {
  return NextResponse.json({ error: 'Failed' }, { status: 500 })
}

// After
catch (error) {
  return toNextResponse(error instanceof Error ? error : new Error('Unknown'))
}
```

---

## Testing the Enhanced Error Handling

### Test Rate Limiting

```typescript
// Send many requests rapidly
const requests = Array(20).fill(null).map(() =>
  fetch('/api/shopify/products?shop=example.myshopify.com')
)

const responses = await Promise.allSettled(requests)

responses.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    const data = await result.value.json()
    if (!data.success && data.error.code === 'RATE_LIMIT_EXCEEDED') {
      console.log(`Request ${i} was rate limited`)
      console.log(`Retry after: ${data.error.details.retryAfterSeconds}s`)
    }
  }
})
```

### Test Error Recovery

```typescript
async function fetchWithRetry(url: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url)
    const data = await response.json()

    if (data.success) {
      return data.data
    }

    if (data.error.code === 'RATE_LIMIT_EXCEEDED') {
      const delay = data.error.details.retryAfterSeconds * 1000
      console.log(`Rate limited, waiting ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
      continue // Retry
    }

    // Non-retryable error
    throw new Error(data.error.message)
  }

  throw new Error('Max retries exceeded')
}
```

---

## Summary

The enhanced error handling provides:

1. **Automatic Retries**: Network and rate limit errors retry automatically
2. **Better UX**: Users see actionable error messages
3. **Type Safety**: TypeScript knows error types
4. **Consistency**: All endpoints use same error format
5. **Monitoring**: Request IDs for tracing errors
6. **Developer Experience**: Less boilerplate, more reliability

Apply this pattern to all Shopify API routes for consistent, robust error handling.
