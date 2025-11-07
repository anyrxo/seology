# Shopify Admin REST API Overview

**Source**: https://shopify.dev/docs/api/admin-rest

---

## Status & Migration Notice

The REST Admin API became legacy on October 1, 2024. Starting April 1, 2025, "all new public apps must be built exclusively with the GraphQL Admin API." Developers should consult migration resources for transitioning existing applications.

## Authentication Requirements

All requests require a valid Shopify access token. The token must be included as an `X-Shopify-Access-Token` header on every API query. Authentication approaches vary by app type:

- Public and custom apps use OAuth
- Custom apps created in the Shopify admin use admin-generated tokens

Apps must request specific access scopes during installation, following a principle of minimal necessary permissions.

## API Endpoint Structure

Endpoints follow this pattern: `https://{store_name}.myshopify.com/admin/api/2025-10/{resource}.json`

The current API version is 2025-10, with quarterly releases. Specifying a supported version ensures application stability.

## Supported HTTP Methods

- **POST**: Create resources
- **GET**: Retrieve resources
- **PUT**: Update resources
- **DELETE**: Remove resources

## Client Libraries

Official libraries support multiple languages:
- Node.js
- Ruby
- Remix (TypeScript)
- cURL

## Rate Limits

The API enforces "a limit of 40 requests per app per store per minute," replenishing at 2 requests per second. Shopify Plus stores receive 10x higher limits.

Exceeding limits triggers a `429 Too Many Requests` response with a `Retry-After` header indicating wait time.

## Error Status Codes

- **401**: Invalid credentials
- **402**: Shop payment required
- **403**: Insufficient access scopes
- **404**: Resource not found
- **422**: Request formatting or semantic errors
- **429**: Rate limit exceeded
- **5xx**: Internal Shopify errors

---

## SEOLOGY.AI REST API Usage

### Current Implementation

We ARE using REST API currently in [lib/shopify.ts](../../../lib/shopify.ts).

### Critical Warning

REST API is LEGACY as of October 2024. We MUST migrate to GraphQL before April 2025 for public app submission!

### Current REST Endpoints We Use

#### 1. Products
```typescript
// Get all products
GET https://${shop}/admin/api/2025-10/products.json

// Get single product
GET https://${shop}/admin/api/2025-10/products/${id}.json

// Update product
PUT https://${shop}/admin/api/2025-10/products/${id}.json
Body: { product: { title: '...', body_html: '...' } }
```

#### 2. Product Images
```typescript
// Get product images
GET https://${shop}/admin/api/2025-10/products/${productId}/images.json

// Update image alt text
PUT https://${shop}/admin/api/2025-10/products/${productId}/images/${imageId}.json
Body: { image: { alt: 'Improved alt text' } }
```

#### 3. Metafields
```typescript
// Get product metafields
GET https://${shop}/admin/api/2025-10/products/${productId}/metafields.json

// Create metafield
POST https://${shop}/admin/api/2025-10/products/${productId}/metafields.json
Body: {
  metafield: {
    namespace: 'seo',
    key: 'custom_title',
    value: 'SEO Optimized Title',
    type: 'single_line_text_field'
  }
}
```

#### 4. Pages (Content)
```typescript
// Get pages
GET https://${shop}/admin/api/2025-10/pages.json

// Update page
PUT https://${shop}/admin/api/2025-10/pages/${id}.json
Body: { page: { title: '...', body_html: '...' } }
```

### Rate Limit Handling

```typescript
// lib/shopify.ts - Rate limit management
async function shopifyRequest(url: string, options: RequestInit) {
  const response = await fetch(url, options)

  // Check rate limit headers
  const remaining = parseInt(response.headers.get('X-Shopify-Shop-Api-Call-Limit')?.split('/')[0] || '40')
  const max = parseInt(response.headers.get('X-Shopify-Shop-Api-Call-Limit')?.split('/')[1] || '40')

  console.log(`Rate limit: ${remaining}/${max}`)

  // If rate limited
  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After') || '2')
    console.log(`Rate limited! Waiting ${retryAfter} seconds...`)
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000))
    return shopifyRequest(url, options) // Retry
  }

  return response
}
```

### Migration Priority

**HIGH PRIORITY**: We need to migrate to GraphQL soon!

**Migration Plan**:
1. Create GraphQL client (see [07-admin-graphql-api.md](./07-admin-graphql-api.md))
2. Migrate products endpoints first
3. Migrate images and metafields
4. Test thoroughly
5. Remove REST code
6. Target: Before March 2025 (1 month buffer before deadline)

### Why REST is Still Useful (Temporarily)

- **Familiar**: Team knows REST
- **Stable**: Works with existing code
- **Documentation**: Lots of REST examples online
- **Testing**: Easier to debug with REST tools

But we MUST migrate!

### REST to GraphQL Mapping

**REST**:
```typescript
GET /admin/api/2025-10/products/123.json
```

**GraphQL**:
```graphql
query {
  product(id: "gid://shopify/Product/123") {
    id
    title
  }
}
```

See [07-admin-graphql-api.md](./07-admin-graphql-api.md) for full migration examples.
