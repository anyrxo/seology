# Shopify App Best Practices - Learnings from Official Templates

## Overview

This document captures best practices learned from analyzing official and community Shopify app templates:
- [Shopify Official Template](https://github.com/Shopify/shopify-app-template-node)
- [Next.js + Prisma Template](https://github.com/kinngh/shopify-nextjs-prisma-app)
- [Express + MongoDB Template](https://github.com/kinngh/shopify-node-express-mongodb-app)
- [Node Starter](https://github.com/carstenlebek/shopify-node-app-starter)

---

## ✅ What We're Doing Right

### 1. **Session Storage with Prisma**
```typescript
// ✅ SEOLOGY uses Prisma for session persistence
model Connection {
  id          String   @id @default(uuid())
  userId      String
  platform    Platform
  accessToken String?  // Encrypted token storage
  credentials String?  // Additional session data
}
```

**Why it's good:**
- Prisma ORM provides type safety
- PostgreSQL scales better than SQLite
- Encrypted token storage adds security layer

### 2. **OAuth Flow with CSRF Protection**
```typescript
// ✅ SEOLOGY implements proper CSRF protection
// Generate state token
const state = crypto.randomBytes(32).toString('hex')

// Store with expiry
await db.cSRFToken.create({
  data: {
    userId,
    token: state,
    provider: 'SHOPIFY',
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  },
})
```

**Why it's good:**
- 10-minute token expiry prevents replay attacks
- Database-backed validation is more secure
- Follows OAuth 2.0 security standards

### 3. **HMAC Verification**
```typescript
// ✅ SEOLOGY verifies all Shopify callbacks
const isValid = verifyShopifyHMAC(queryParams, clientSecret)
if (!isValid) {
  return NextResponse.redirect('/dashboard?error=invalid_hmac')
}
```

**Why it's good:**
- Prevents man-in-the-middle attacks
- Ensures requests are actually from Shopify
- Critical for production security

### 4. **Type-Safe API Client**
```typescript
// ✅ SEOLOGY uses TypeScript throughout
export interface ShopifyProduct {
  id: number
  title: string
  variants: ShopifyVariant[]
  // ...18+ TypeScript interfaces
}
```

**Why it's good:**
- Catch errors at compile-time
- Better IDE autocomplete
- Self-documenting code

---

## 🔧 Improvements to Make

### 1. **Add Webhook Handling** (Critical)

**Problem:** We're missing webhook support for real-time updates.

**Official Template Pattern:**
```typescript
// app/api/webhooks/products/update/route.ts
export async function POST(req: Request) {
  const hmac = req.headers.get('x-shopify-hmac-sha256')
  const shop = req.headers.get('x-shopify-shop-domain')

  // Verify webhook signature
  const verified = verifyWebhook(body, hmac, secret)

  if (!verified) {
    return new Response('Unauthorized', { status: 401 })
  }

  const data = await req.json()

  // Update our database
  await db.shopifyProduct.update({
    where: { shopifyProductId: data.id },
    data: { /* updated fields */ }
  })

  return new Response('OK', { status: 200 })
}
```

**Webhooks to implement:**
- `products/update` - Product changes
- `products/delete` - Product deletions
- `collections/update` - Collection changes
- `shop/update` - Store settings changes
- `app/uninstalled` - App removed (cleanup)

### 2. **Session Management with Redis** (Recommended)

**Problem:** Current implementation stores everything in PostgreSQL.

**Best Practice:**
```typescript
// Use Redis for session caching, PostgreSQL for permanent data

// lib/session-store.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function getSession(sessionId: string) {
  // Check Redis cache first
  const cached = await redis.get(`session:${sessionId}`)
  if (cached) return JSON.parse(cached)

  // Fall back to database
  const session = await db.connection.findUnique({
    where: { id: sessionId }
  })

  // Cache for 1 hour
  await redis.set(`session:${sessionId}`, JSON.stringify(session), {
    ex: 3600
  })

  return session
}
```

**Benefits:**
- Faster session lookups (Redis is in-memory)
- Reduces database load
- Better scalability

### 3. **App Bridge Integration** (For Embedded Apps)

**Problem:** SEOLOGY currently works as standalone app, not embedded in Shopify admin.

**Official Pattern:**
```typescript
// app/shopify-dashboard/page.tsx (Embedded)
'use client'

import { AppProvider } from '@shopify/shopify-app-remix'
import { useAppBridge } from '@shopify/app-bridge-react'

export default function ShopifyEmbeddedApp() {
  const app = useAppBridge()

  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            /* translations */
          }
        }
      }}
    >
      {/* Shopify Polaris components */}
    </AppProvider>
  )
}
```

**Benefits:**
- Native Shopify admin UX
- Automatic authentication
- Polaris design system

**Decision:** Keep SEOLOGY as standalone for now (more flexible UI), but consider embedded mode for v2.

### 4. **GraphQL Code Generation** (Type Safety++)

**Problem:** We're using REST API with manual typing.

**Best Practice:**
```bash
# Install GraphQL codegen
npm install -D @graphql-codegen/cli @graphql-codegen/typescript

# codegen.yml
schema: https://shopify.dev/admin-graphql-direct-proxy
documents:
  - 'lib/graphql/**/*.graphql'
generates:
  lib/graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-query
```

```graphql
# lib/graphql/queries/products.graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        seo {
          title
          description
        }
      }
    }
  }
}
```

```typescript
// Auto-generated hook
import { useGetProductsQuery } from '@/lib/graphql/generated'

const { data, loading } = useGetProductsQuery({ first: 50 })
```

**Benefits:**
- Complete type safety from GraphQL schema
- Auto-generated React hooks
- Catches breaking API changes at compile-time

### 5. **Offline Access Tokens**

**Problem:** Our access tokens expire after 24 hours.

**Official Pattern:**
```typescript
// Add to OAuth scopes
const scopes = [
  'read_products',
  'write_products',
  // ...
  'offline_access' // ← Enables long-lived tokens
].join(',')
```

**Benefits:**
- Tokens don't expire
- No need to re-authenticate users
- Better user experience

**Already in our scopes:** ✅ We can just add this!

### 6. **Error Handling & Retry Logic**

**Problem:** Basic error handling in API client.

**Best Practice:**
```typescript
// lib/shopify-api-client.ts
import { retry } from '@lifeomic/attempt'

async function makeRequest<T>(url: string, options: RequestInit): Promise<T> {
  return retry(
    async () => {
      const response = await fetch(url, options)

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        await sleep(parseInt(retryAfter) * 1000)
        throw new Error('Rate limited')
      }

      // Handle Shopify errors
      if (!response.ok) {
        const error = await response.json()
        throw new ShopifyAPIError(error)
      }

      return response.json()
    },
    {
      maxAttempts: 3,
      delay: 1000,
      factor: 2, // Exponential backoff
    }
  )
}
```

**Benefits:**
- Automatic retry on transient failures
- Handles Shopify rate limits gracefully
- Better reliability

### 7. **Logging & Monitoring**

**Problem:** Console.log statements everywhere.

**Best Practice:**
```typescript
// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

// Usage
logger.info({ shopId: '12345', action: 'product_updated' }, 'Product SEO updated')
logger.error({ err, shopId: '12345' }, 'Failed to update product')
```

**Add monitoring:**
```typescript
// lib/monitoring.ts
import { init } from '@sentry/nextjs'

init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

---

## 📋 Implementation Checklist

### Phase 1: Critical (Do Now)

- [ ] **Add webhook handlers** for:
  - [ ] `products/update`
  - [ ] `products/delete`
  - [ ] `collections/update`
  - [ ] `app/uninstalled`
- [ ] **Add offline_access scope** to OAuth
- [ ] **Implement retry logic** with exponential backoff
- [ ] **Add proper logging** with Pino
- [ ] **Set up error monitoring** with Sentry

### Phase 2: Optimization (Next Sprint)

- [ ] **Implement Redis caching** for sessions
- [ ] **Add GraphQL codegen** for type safety
- [ ] **Create webhook verification utility**
- [ ] **Add rate limit handling**
- [ ] **Implement connection health checks**

### Phase 3: Advanced (Future)

- [ ] **Embedded app mode** with App Bridge
- [ ] **Polaris component library**
- [ ] **Multi-language support** (i18next)
- [ ] **Advanced analytics** dashboard
- [ ] **Bulk operations** API

---

## 🔒 Security Checklist

Based on official templates:

- [x] **HMAC verification** on all Shopify callbacks
- [x] **CSRF protection** with state tokens
- [x] **Token encryption** at rest (AES-256-GCM)
- [x] **Scope minimization** (only request needed permissions)
- [ ] **Webhook signature verification**
- [ ] **Rate limit enforcement**
- [ ] **Input validation** on all API routes
- [ ] **SQL injection protection** (Prisma handles this)
- [ ] **XSS prevention** (React handles this)
- [x] **User data isolation** (filter by userId)

---

## 🚀 Performance Checklist

- [ ] **Redis session caching**
- [ ] **GraphQL query optimization**
- [ ] **Database connection pooling**
- [ ] **API response caching**
- [ ] **Lazy loading** for large product catalogs
- [ ] **Pagination** for all list endpoints
- [x] **Type-safe API client**
- [ ] **Background job processing** (for bulk updates)

---

## 📊 Monitoring & Observability

### Recommended Tools

```bash
# Logging
npm install pino pino-pretty

# Error tracking
npm install @sentry/nextjs

# APM (Application Performance Monitoring)
npm install @vercel/analytics

# Uptime monitoring
# Use UptimeRobot or Pingdom for webhook endpoints
```

### Key Metrics to Track

```typescript
// lib/metrics.ts
export const metrics = {
  // OAuth flow
  oauth_initiated: 0,
  oauth_completed: 0,
  oauth_failed: 0,

  // API calls
  shopify_api_calls: 0,
  shopify_api_errors: 0,
  shopify_rate_limits: 0,

  // Webhooks
  webhooks_received: 0,
  webhooks_processed: 0,
  webhooks_failed: 0,

  // SEO fixes
  products_analyzed: 0,
  products_fixed: 0,
  fix_errors: 0,
}
```

---

## 🧪 Testing Strategy

### Unit Tests
```typescript
// __tests__/lib/shopify-api-client.test.ts
import { ShopifyAPIClient } from '@/lib/shopify-api-client'

describe('ShopifyAPIClient', () => {
  it('should verify HMAC correctly', () => {
    const params = { code: 'abc', shop: 'test.myshopify.com', hmac: 'xyz' }
    const secret = 'test_secret'

    expect(verifyShopifyHMAC(params, secret)).toBe(true)
  })

  it('should handle rate limits with retry', async () => {
    // Mock rate limit response
    // Test exponential backoff
  })
})
```

### Integration Tests
```typescript
// __tests__/api/auth/shopify/callback.test.ts
import { POST } from '@/app/api/auth/shopify/callback/route'

describe('Shopify OAuth Callback', () => {
  it('should exchange code for access token', async () => {
    // Mock Shopify API
    // Test full OAuth flow
  })
})
```

### E2E Tests
```typescript
// playwright/shopify-flow.spec.ts
test('complete Shopify connection flow', async ({ page }) => {
  await page.goto('/dashboard/shopify')
  await page.fill('[name="shop"]', 'teststore.myshopify.com')
  await page.click('button:text("Connect")')

  // Mock Shopify OAuth
  await expect(page).toHaveURL('/dashboard/shopify?success=true')
})
```

---

## 📖 Documentation Updates Needed

1. **Environment Variables**
   ```bash
   # Add to .env.example
   UPSTASH_REDIS_REST_URL=""
   UPSTASH_REDIS_REST_TOKEN=""
   SENTRY_DSN=""
   LOG_LEVEL="info"
   ```

2. **Webhook Setup Guide**
   - Document webhook endpoint URLs
   - HMAC verification process
   - Local testing with ngrok

3. **Deployment Checklist**
   - Shopify Partner account setup
   - App listing requirements
   - Production environment variables
   - Webhook configuration

---

## 🎯 Next Steps

1. **Immediate:** Implement webhook handlers (critical for production)
2. **Week 1:** Add Redis caching and retry logic
3. **Week 2:** GraphQL codegen and error monitoring
4. **Week 3:** Embedded app mode exploration
5. **Week 4:** Production deployment and app store listing

---

## 📚 Additional Resources

- [Shopify App Development Docs](https://shopify.dev/docs/apps)
- [App Bridge Documentation](https://shopify.dev/docs/api/app-bridge)
- [Webhook Best Practices](https://shopify.dev/docs/apps/webhooks/best-practices)
- [API Rate Limits](https://shopify.dev/docs/api/usage/rate-limits)
- [OAuth Security](https://shopify.dev/docs/apps/auth/oauth)

---

**Status:**
- ✅ Core OAuth implementation complete
- 🔄 Webhooks needed for production
- 📈 Performance optimizations planned
- 🎯 Ready for testing with dev store
