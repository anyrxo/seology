# Shopify Online Store App Integration Guide

**Source**: https://shopify.dev/docs/apps/build/online-store

---

## Primary Integration Methods

**Theme App Extensions** are the mandatory approach for new Shopify App Store submissions. These extensions provide two integration types:

- **App Blocks**: Inject inline content directly into theme pages
- **App Embed Blocks**: Add floating or overlaid elements without editing theme code

The documentation emphasizes that theme app extensions offer significant advantages: "Reduced risk of an app introducing breaking changes to the theme" and "Minimized app support debt."

## Alternative Integration Approaches

**ScriptTags API** can supplement theme app extensions specifically for supporting older themes, though the documentation cautions that using this method to modify theme code prevents merchants from upgrading their themes.

**App Proxies** forward requests from a store's domain to external servers, enabling data display without CORS complications. These can serve dynamic content like Liquid templates or JSON responses.

**Storefront API** retrieves customer-facing data through programmatic queries, useful when apps need API-based access rather than visual integration.

## Key Requirements for Developers

Apps adding visible elements must allow merchants to preview before activation. If uninstallation leaves code remnants, developers must provide removal instructions to maintain theme upgrade paths.

The guide recommends familiarizing yourself with theme development patterns and ensuring compatibility with Shopify's theme editor environment for seamless merchant experiences.

---

## SEOLOGY.AI Online Store Strategy

### Do We Need Storefront Integration?

**Answer**: NO, not for core functionality.

**Why**: SEO fixes happen in the backend (meta tags, product descriptions, alt text). These don't require visible storefront UI.

### Where We MIGHT Use Storefront Features

#### 1. ScriptTags API
**What**: Inject JavaScript into the online store

**Potential Use for SEOLOGY**:
- Add structured data (JSON-LD) to all pages
- Inject analytics tracking
- Add SEO-enhancing scripts (e.g., breadcrumb markup)

**Example**:
```typescript
// Create a script tag
const mutation = `
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
        src
      }
    }
  }
`

const variables = {
  input: {
    src: 'https://seology.ai/scripts/seo-enhancements.js',
    displayScope: 'ONLINE_STORE'
  }
}
```

**Script Content** (`public/scripts/seo-enhancements.js`):
```javascript
// Add structured data to all products
if (window.Shopify && window.Shopify.shop) {
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": document.querySelector('h1')?.textContent,
    "image": document.querySelector('img.product-image')?.src,
    "description": document.querySelector('.product-description')?.textContent
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(structuredData)
  document.head.appendChild(script)
}
```

**Should We Do This?**: MAYBE - could enhance SEO, but increases support burden

#### 2. App Proxy
**What**: Serve content from our domain under the shop's domain

**Potential Use for SEOLOGY**:
- SEO reports accessible at `shop.com/apps/seology`
- Public SEO score badge
- Sitemap enhancements

**Example**:
```
Merchant's Store: mystore.myshopify.com
Proxy Path: /apps/seology
Our Server: https://seology.ai/proxy/
Request: mystore.myshopify.com/apps/seology/report
Proxied To: https://seology.ai/proxy/mystore.myshopify.com/report
```

**Implementation**:
```typescript
// app/api/proxy/[shop]/report/route.ts
export async function GET(request: Request, { params }: { params: { shop: string } }) {
  const shop = params.shop

  // Get connection
  const connection = await db.connection.findFirst({
    where: {
      platform: 'SHOPIFY',
      credentials: { contains: shop }
    }
  })

  if (!connection) {
    return new Response('Shop not found', { status: 404 })
  }

  // Get SEO data
  const issues = await db.issue.findMany({
    where: { siteId: connection.id }
  })

  // Return HTML that works on storefront
  return new Response(renderReportHTML(issues), {
    headers: { 'Content-Type': 'text/html' }
  })
}
```

**Should We Do This?**: NO - our reports are for merchants, not customers

#### 3. Storefront API
**What**: Query storefront data from customer-facing applications

**Potential Use for SEOLOGY**:
- Analyze storefront SEO from customer perspective
- Check what customers actually see
- Verify fixes are visible on storefront

**Example**:
```typescript
const query = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      title
      description
      seo {
        title
        description
      }
      metafields(first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
    }
  }
`
```

**Should We Do This?**: YES - this could be very useful for verification!

### What We Should NOT Do

❌ **Theme App Extensions**: We don't need visible UI on storefront
❌ **App Blocks**: No need for drag-and-drop blocks
❌ **App Embed Blocks**: No floating widgets needed
❌ **Checkout Extensions**: Don't need to modify checkout

### What We SHOULD Consider

✅ **ScriptTags**: For adding structured data automatically
✅ **Storefront API**: For verifying our SEO fixes are visible
✅ **Webhooks**: For knowing when storefront content changes

### Implementation Priority

1. **First**: Use Admin API for all SEO fixes (current approach)
2. **Second**: Add Storefront API queries for verification
3. **Third**: Consider ScriptTags for automatic structured data
4. **Later**: Maybe App Proxy for public SEO reports

### Key Insight

**SEOLOGY is a backend SEO tool**, not a storefront feature. We modify meta tags, product descriptions, and content - not the visual appearance of the store.

**Therefore**: We don't need most storefront integration features. Our focus should remain on the Admin API and ensuring our fixes are properly applied to the backend data.

### Exception: Verification Mode

We COULD use Storefront API to verify that our SEO fixes are actually visible to customers:

```typescript
// After applying a fix via Admin API
async function verifyFix(productHandle: string, fixType: string) {
  // Query storefront API
  const storefrontData = await queryStorefrontAPI(productHandle)

  // Compare with what we set via Admin API
  const adminData = await queryAdminAPI(productHandle)

  // Verify they match
  if (storefrontData.seo.title === adminData.seo.title) {
    return { verified: true }
  } else {
    return { verified: false, reason: 'Mismatch between admin and storefront' }
  }
}
```

This would give merchants confidence that our fixes are actually working!
