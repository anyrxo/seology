# Shopify Webhooks Overview

**Source**: https://shopify.dev/docs/apps/build/webhooks

---

## Purpose and Benefits

Webhooks enable apps to receive near-real-time event data when specific actions occur on a Shopify store. They help apps stay synchronized with shop data or trigger additional actions following events, offering better performance than continuous API polling.

## Key Use Cases

According to the documentation, webhooks are valuable for:
- Notifying inventory management systems about stock level changes
- Alerting shipping providers of order, return, or refund modifications
- Removing customer data during app uninstallations
- Syncing order information with accounting software
- Updating product warranty pricing based on price changes

## Core Concepts

**Webhook Topics**: Organize webhooks by event type. Apps subscribe to specific topics (e.g., `orders/create`, `products/update`) to receive relevant event notifications.

**Webhook Subscriptions**: Declare an app's intention to receive webhooks, defined by topic name and subscription endpoint. Shopify supports HTTPS delivery, Google Pub/Sub, and Amazon EventBridge as endpoint options.

## Webhook Headers

Every webhook includes standard headers containing metadata:

- `X-Shopify-Topic`: Event type identifier
- `X-Shopify-Hmac-Sha256`: HMAC verification for HTTPS delivery
- `X-Shopify-Shop-Domain`: Associated store identifier
- `X-Shopify-Webhook-Id`: Unique webhook identifier
- `X-Shopify-Triggered-At`: Event timestamp
- `X-Shopify-Event-Id`: Event occurrence identifier
- `X-Shopify-API-Version`: Admin API version used for payload serialization

**Important**: Header names are case-insensitive; apps must handle any casing variation.

## Important Behaviors

**Event Ordering**: Shopify doesn't guarantee delivery order within or across topics. Developers should use timestamps (`X-Shopify-Triggered-At` or `updated_at`) to organize events.

**Duplicate Handling**: Rare duplicate deliveries may occur. Shopify recommends comparing `X-Shopify-Event-Id` values to detect and ignore duplicates.

**API Versioning**: The `X-Shopify-API-Version` header indicates which API version serialized the payload. If an app uses an unsupported version, Shopify falls forward to the oldest supported version.

## Next Steps

Developers can:
- Create webhook subscriptions through the Admin API or UI
- Configure HTTPS endpoints for webhook delivery
- Customize webhooks with filters and payload modifications
- Consult the Webhooks API reference for complete topic listings and sample payloads

---

## SEOLOGY.AI Webhook Implementation

### Webhooks We NEED

#### 1. Products Events
**Topics**: `products/create`, `products/update`, `products/delete`

**Why**: We need to know when products change so we can:
- Re-analyze SEO when a product is updated
- Add new products to our analysis queue
- Clean up data when products are deleted

**Implementation**:
```typescript
// app/api/webhooks/shopify/products/route.ts
export async function POST(request: Request) {
  // Verify HMAC
  const hmac = request.headers.get('x-shopify-hmac-sha256')
  const verified = verifyWebhook(await request.text(), hmac)

  if (!verified) return new Response('Unauthorized', { status: 401 })

  const payload = await request.json()
  const topic = request.headers.get('x-shopify-topic')

  if (topic === 'products/update') {
    // Queue re-analysis
    await createJob('ANALYZE_PRODUCT', {
      productId: payload.id,
      shopDomain: request.headers.get('x-shopify-shop-domain')
    })
  }

  return new Response('OK', { status: 200 })
}
```

#### 2. App Uninstall
**Topic**: `app/uninstalled`

**Why**: GDPR compliance - we must delete merchant data when they uninstall

**Implementation**:
```typescript
// app/api/webhooks/shopify/app-uninstalled/route.ts
export async function POST(request: Request) {
  const shopDomain = request.headers.get('x-shopify-shop-domain')

  // Find connection by shop domain
  const connection = await db.connection.findFirst({
    where: {
      platform: 'SHOPIFY',
      credentials: { contains: shopDomain }
    }
  })

  if (connection) {
    // Delete all data for this merchant
    await db.$transaction([
      db.fix.deleteMany({ where: { siteId: connection.id } }),
      db.issue.deleteMany({ where: { siteId: connection.id } }),
      db.connection.delete({ where: { id: connection.id } })
    ])
  }

  return new Response('OK', { status: 200 })
}
```

#### 3. Shop Update
**Topic**: `shop/update`

**Why**: Know when shop details change (name, domain, plan)

#### 4. GDPR Webhooks (REQUIRED)
**Topics**:
- `customers/data_request` - Merchant requests customer data
- `customers/redact` - Delete specific customer data
- `shop/redact` - Delete all shop data (48 hours after uninstall)

**Why**: GDPR compliance - these are **MANDATORY** for public apps

### Webhook Security

**HMAC Verification**:
```typescript
import crypto from 'crypto'

export function verifyWebhook(body: string, hmac: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET!

  const hash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64')

  return hash === hmac
}
```

**Important**: Always verify HMAC before processing webhooks!

### Registering Webhooks

**Option 1: Via Admin API** (Recommended for us):
```typescript
const mutation = `
  mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
    webhookSubscriptionCreate(
      topic: $topic
      webhookSubscription: $webhookSubscription
    ) {
      webhookSubscription {
        id
        topic
        endpoint {
          __typename
          ... on WebhookHttpEndpoint {
            callbackUrl
          }
        }
      }
    }
  }
`

const variables = {
  topic: 'PRODUCTS_UPDATE',
  webhookSubscription: {
    callbackUrl: 'https://seology.ai/api/webhooks/shopify/products',
    format: 'JSON'
  }
}
```

**Option 2: Via Shopify Partners Dashboard**:
- Go to app settings
- Add webhook subscriptions
- Enter callback URL
- Select topics

### Handling Duplicates

```typescript
// Track processed webhooks to avoid duplicates
const eventId = request.headers.get('x-shopify-event-id')

const existing = await db.webhookEvent.findUnique({
  where: { eventId }
})

if (existing) {
  console.log('Duplicate webhook, ignoring')
  return new Response('OK', { status: 200 })
}

// Process webhook...

// Mark as processed
await db.webhookEvent.create({
  data: {
    eventId,
    topic: request.headers.get('x-shopify-topic'),
    processedAt: new Date()
  }
})
```

### Webhook Database Schema

```prisma
model WebhookEvent {
  id          String   @id @default(cuid())
  eventId     String   @unique
  topic       String
  shopDomain  String
  payload     String   @db.Text
  processedAt DateTime @default(now())
  createdAt   DateTime @default(now())
}
```

### Next Steps

1. **Create webhook routes** in `app/api/webhooks/shopify/`
2. **Implement HMAC verification**
3. **Register webhooks** for all required topics
4. **Add duplicate prevention**
5. **Implement GDPR webhooks** (mandatory for public apps)
6. **Test with Shopify's webhook tester**

### Testing Webhooks Locally

**Problem**: Webhooks need a public URL, but we develop locally

**Solutions**:
1. **ngrok**: `ngrok http 3000` → gives public URL
2. **Shopify CLI**: Has built-in tunnel
3. **Vercel Preview**: Deploy to preview URL for testing
4. **Webhook Relay**: Service that forwards webhooks to localhost

**Recommendation**: Use Vercel preview deployments for webhook testing
