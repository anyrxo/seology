# Shopify GraphQL Admin API Overview

**Source**: https://shopify.dev/docs/api/admin-graphql

---

## Purpose & Access
The Admin API enables developers to build apps extending Shopify's admin capabilities. All requests require valid access tokens via the `X-Shopify-Access-Token` header or OAuth authentication.

## Getting Started

**Official Client Libraries:**
- React Router: `@shopify/shopify-app-react-router`
- Node.js: `@shopify/shopify-api`
- Ruby: `shopify_api` gem
- cURL: Direct HTTP requests with authentication headers

Installation examples include `npm install --save @shopify/shopify-api` for JavaScript projects and `bundle add shopify_api` for Ruby applications.

## API Endpoints & Queries

GraphQL requests use POST to: `https://{store_name}.myshopify.com/admin/api/2025-10/graphql.json`

Queries begin from QueryRoot objects serving as schema entry points. A basic query retrieves product information:

```graphql
query getProducts {
  products (first: 3) {
    edges {
      node {
        id
        title
      }
    }
  }
}
```

The documentation notes that "Queries are equivalent to making a GET request in REST."

## Versioning

Multiple API versions are available (unstable, 2026-01 RC, 2025-10 latest, 2025-07, 2025-04, 2025-01), allowing developers to select appropriate stability and feature levels.

## Rate Limiting

The system uses calculated query costs measured in points. Responses include throttle status showing maximum available points, currently available capacity, and restore rate for recovery between requests.

## Key Resources

- GraphiQL Explorer for interactive query building
- Shopify GraphiQL app for shop-specific data testing
- Authentication guides covering OAuth and admin app tokens
- Access scope documentation for permission management

---

## SEOLOGY.AI GraphQL Implementation

### Current Status

We are **NOT using GraphQL yet** - we need to migrate from REST API!

### Why We Should Use GraphQL

1. **More Efficient**: Get exactly what we need in one request
2. **Better Performance**: Fewer API calls = lower rate limit usage
3. **Modern**: REST API is legacy (deprecated Oct 2024)
4. **Required**: New public apps MUST use GraphQL (as of April 2025)

### Example: Current REST vs Future GraphQL

**Current REST Approach** (multiple requests):
```typescript
// Get product
const product = await fetch(`https://${shop}/admin/api/2025-10/products/${productId}.json`)

// Get metafields
const metafields = await fetch(`https://${shop}/admin/api/2025-10/products/${productId}/metafields.json`)

// Get images
const images = await fetch(`https://${shop}/admin/api/2025-10/products/${productId}/images.json`)

// Total: 3 API calls
```

**Future GraphQL Approach** (single request):
```typescript
const query = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      descriptionHtml
      seo {
        title
        description
      }
      metafields(first: 10) {
        edges {
          node {
            id
            key
            value
            namespace
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
    }
  }
`

const response = await fetch(`https://${shop}/admin/api/2025-10/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': accessToken
  },
  body: JSON.stringify({
    query,
    variables: { id: `gid://shopify/Product/${productId}` }
  })
})

// Total: 1 API call
```

### GraphQL Operations for SEO Fixes

#### 1. Analyze Product SEO
```graphql
query analyzeProductSEO($id: ID!) {
  product(id: $id) {
    id
    title
    handle
    descriptionHtml
    seo {
      title
      description
    }
    metafields(first: 50) {
      edges {
        node {
          key
          value
          namespace
        }
      }
    }
    images(first: 50) {
      edges {
        node {
          id
          url
          altText
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          sku
        }
      }
    }
  }
}
```

#### 2. Update Product SEO
```graphql
mutation updateProductSEO($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      seo {
        title
        description
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

**Variables**:
```json
{
  "input": {
    "id": "gid://shopify/Product/1234567890",
    "seo": {
      "title": "Optimized Product Title - Brand Name",
      "description": "Improved meta description with keywords"
    }
  }
}
```

#### 3. Update Image Alt Text
```graphql
mutation updateImageAltText($input: ProductImageUpdateInput!) {
  productImageUpdate(input: $input) {
    image {
      id
      altText
    }
    userErrors {
      field
      message
    }
  }
}
```

#### 4. Bulk Product Analysis
```graphql
query bulkAnalyzeProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        seo {
          title
          description
        }
        images(first: 1) {
          edges {
            node {
              altText
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### GraphQL Client Implementation

**Create GraphQL client**:
```typescript
// lib/shopify-graphql.ts
export async function shopifyGraphQL(
  shop: string,
  accessToken: string,
  query: string,
  variables?: any
) {
  const response = await fetch(
    `https://${shop}/admin/api/2025-10/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({ query, variables })
    }
  )

  const json = await response.json()

  if (json.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}
```

**Use in API routes**:
```typescript
// app/api/shopify/products/[id]/route.ts
import { shopifyGraphQL } from '@/lib/shopify-graphql'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const shop = request.nextUrl.searchParams.get('shop')
  const connection = await getConnection(shop)

  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        seo { title description }
      }
    }
  `

  const data = await shopifyGraphQL(
    connection.shop,
    connection.accessToken,
    query,
    { id: `gid://shopify/Product/${params.id}` }
  )

  return Response.json({ success: true, product: data.product })
}
```

### Rate Limit Management

GraphQL uses **query cost** instead of request counts:

```typescript
const response = await shopifyGraphQL(shop, token, query, variables)

// Check rate limit from response extensions
const extensions = response.extensions
const { currentlyAvailable, maximumAvailable, restoreRate } = extensions.cost.throttleStatus

console.log(`Rate limit: ${currentlyAvailable}/${maximumAvailable} (restores ${restoreRate}/second)`)

// If running low, slow down
if (currentlyAvailable < 100) {
  await new Promise(resolve => setTimeout(resolve, 1000))
}
```

### Migration Plan

1. **Keep REST for now** - it still works
2. **Add GraphQL client** - create `lib/shopify-graphql.ts`
3. **Migrate critical paths** - products, metafields, images
4. **Test thoroughly** - ensure same results as REST
5. **Remove REST** - once GraphQL is stable
6. **Use bulk operations** - for analyzing many products at once

### GraphQL Best Practices

1. **Request only needed fields** - don't over-fetch
2. **Use fragments** - reuse common field sets
3. **Handle errors** - GraphQL can return partial success
4. **Monitor costs** - watch throttle status
5. **Use batch operations** - for multiple updates

### Next Steps

1. ✅ Read GraphQL documentation
2. **Install GraphQL client** - if needed
3. **Create shopify-graphql.ts** - wrapper library
4. **Test with simple queries** - get single product
5. **Migrate products API** - convert to GraphQL
6. **Add error handling** - proper GraphQL error management
