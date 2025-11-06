# Shopify Webhook Registration Guide

## IMPORTANT: Your App Structure

Your SEOLOGY app is **NOT a Shopify CLI app** - it's a custom Next.js app with OAuth integration. This means:

❌ You DON'T use `shopify.app.toml`
❌ You DON'T use `shopify app deploy`
✅ You register webhooks **manually** in Shopify Partner Dashboard
✅ Your webhook routes already exist in code

---

## How to Register Webhooks (Manual Method)

Since Comet couldn't add webhooks through the UI (Shopify Partner Dashboard has moved this), you need to use the **Shopify Partner API** or register them when a merchant installs your app.

### Method 1: Register Webhooks via Shopify Admin API (Recommended)

Add this code to your OAuth callback to auto-register webhooks after installation:

**File:** `app/api/auth/shopify/callback/route.ts`

Add after line 95 (after storing the connection):

```typescript
// Register webhooks automatically after successful OAuth
const webhooks = [
  { topic: 'products/update', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/products/update` },
  { topic: 'products/delete', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/products/delete` },
  { topic: 'app/uninstalled', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/app/uninstalled` },
  { topic: 'customers/data_request', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/customers-data-request` },
  { topic: 'customers/redact', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/customers-redact` },
  { topic: 'shop/redact', address: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/shop-redact` },
]

for (const webhook of webhooks) {
  try {
    const webhookResponse = await fetch(
      `https://${shop}/admin/api/2025-10/webhooks.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhook: {
            topic: webhook.topic,
            address: webhook.address,
            format: 'json',
          },
        }),
      }
    )

    if (!webhookResponse.ok) {
      console.error(`Failed to register webhook: ${webhook.topic}`)
    } else {
      console.log(`✅ Registered webhook: ${webhook.topic}`)
    }
  } catch (error) {
    console.error(`Error registering webhook ${webhook.topic}:`, error)
  }
}
```

### Method 2: Register via Shopify GraphQL Admin API

Create a helper function in `lib/shopify.ts`:

```typescript
export async function registerWebhooks(shop: string, accessToken: string) {
  const client = await createShopifyClient({ domain: shop, accessToken })

  const webhooks = [
    { topic: 'PRODUCTS_UPDATE', callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/products/update` },
    { topic: 'PRODUCTS_DELETE', callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/products/delete` },
    { topic: 'APP_UNINSTALLED', callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/app/uninstalled` },
    { topic: 'CUSTOMERS_DATA_REQUEST', callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/customers-data-request` },
    { topic: 'CUSTOMERS_REDACT', callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/customers-redact` },
    { topic: 'SHOP_REDACT', callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/shopify/gdpr/shop-redact` },
  ]

  for (const webhook of webhooks) {
    const mutation = `
      mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
        webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
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
          userErrors {
            field
            message
          }
        }
      }
    `

    try {
      await client.graphqlRequest(mutation, {
        topic: webhook.topic,
        webhookSubscription: {
          callbackUrl: webhook.callbackUrl,
          format: 'JSON',
        },
      })
      console.log(`✅ Registered webhook: ${webhook.topic}`)
    } catch (error) {
      console.error(`Failed to register webhook ${webhook.topic}:`, error)
    }
  }
}
```

Then call it in your OAuth callback:

```typescript
await registerWebhooks(shop, accessToken)
```

---

## Method 3: Manual Registration via Shopify Partner API (One-Time Setup)

If you want to pre-register webhooks for all installations, use this script:

**File:** `scripts/register-webhooks.ts`

```typescript
// Run with: npx tsx scripts/register-webhooks.ts

const PARTNER_API_KEY = process.env.SHOPIFY_PARTNER_API_KEY
const PARTNER_API_SECRET = process.env.SHOPIFY_PARTNER_API_SECRET
const APP_API_KEY = process.env.SHOPIFY_CLIENT_ID

async function registerWebhooks() {
  // This requires Partner API access
  // Contact Shopify support to enable Partner API for your account

  const webhooks = [
    { topic: 'products/update', address: 'https://seology-ai.vercel.app/api/webhooks/shopify/products/update' },
    { topic: 'products/delete', address: 'https://seology-ai.vercel.app/api/webhooks/shopify/products/delete' },
    { topic: 'app/uninstalled', address: 'https://seology-ai.vercel.app/api/webhooks/shopify/app/uninstalled' },
    { topic: 'customers/data_request', address: 'https://seology-ai.vercel.app/api/webhooks/shopify/gdpr/customers-data-request' },
    { topic: 'customers/redact', address: 'https://seology-ai.vercel.app/api/webhooks/shopify/gdpr/customers-redact' },
    { topic: 'shop/redact', address: 'https://seology-ai.vercel.app/api/webhooks/shopify/gdpr/shop-redact' },
  ]

  console.log('Note: This requires Shopify Partner API access')
  console.log('Recommended: Use Method 1 (register during OAuth callback)')
}

registerWebhooks()
```

---

## Testing Webhooks

After registration, test each webhook:

### 1. Test products/update
- Go to your development store
- Edit a product
- Check Vercel logs: `vercel logs --follow`
- Should see: "Received products/update webhook"

### 2. Test products/delete
- Delete a product
- Check logs for "products/delete webhook"

### 3. Test app/uninstalled
- Uninstall app from store
- Should see "app/uninstalled webhook"

### 4. Check webhook status
```bash
curl -X GET \
  "https://YOUR_STORE.myshopify.com/admin/api/2025-10/webhooks.json" \
  -H "X-Shopify-Access-Token: YOUR_ACCESS_TOKEN"
```

---

## Current Webhook Routes (Already Built)

These routes are **already implemented** in your codebase:

✅ `/api/webhooks/shopify/products/update` - [route.ts](app/api/webhooks/shopify/products/update/route.ts)
✅ `/api/webhooks/shopify/products/delete` - [route.ts](app/api/webhooks/shopify/products/delete/route.ts)
✅ `/api/webhooks/shopify/app/uninstalled` - [route.ts](app/api/webhooks/shopify/app/uninstalled/route.ts)
✅ `/api/webhooks/shopify/gdpr/customers-data-request` - [route.ts](app/api/webhooks/shopify/gdpr/customers-data-request/route.ts)
✅ `/api/webhooks/shopify/gdpr/customers-redact` - [route.ts](app/api/webhooks/shopify/gdpr/customers-redact/route.ts)
✅ `/api/webhooks/shopify/gdpr/shop-redact` - [route.ts](app/api/webhooks/shopify/gdpr/shop-redact/route.ts)

All routes have:
- HMAC signature verification
- Proper error handling
- Audit logging
- Database updates

---

## Recommended: Use Method 1

**Why Method 1 is best:**
1. ✅ Automatic - registers when merchant installs
2. ✅ No manual configuration needed
3. ✅ Works for all stores that install your app
4. ✅ Handles re-registrations if webhooks expire

**Implementation:** Add the webhook registration code to your OAuth callback route (shown in Method 1 above).

---

## Verification Checklist

After implementation:

- [ ] OAuth callback includes webhook registration code
- [ ] Test app installation on dev store
- [ ] Check Vercel logs for "✅ Registered webhook" messages
- [ ] Edit a product in Shopify → should trigger products/update webhook
- [ ] Check Vercel logs for "Received products/update webhook"
- [ ] Delete a product → should trigger products/delete webhook
- [ ] Verify all 6 webhooks are registered in Shopify admin

---

## Troubleshooting

**Webhooks not firing?**
1. Check webhook is registered: Visit Shopify Admin → Settings → Notifications → Webhooks
2. Check Vercel logs: `vercel logs --follow`
3. Verify HMAC signature is correct
4. Ensure `SHOPIFY_CLIENT_SECRET` matches the one in Partner Dashboard

**Registration failing?**
1. Ensure `NEXT_PUBLIC_APP_URL` is set correctly in Vercel
2. Check access token has webhook permissions
3. Verify shop domain format (must be `store.myshopify.com`)

---

## Summary

Your webhooks will be automatically registered when a merchant installs your app by adding the registration code to your OAuth callback. This is the standard approach for custom Shopify apps (non-CLI apps).
