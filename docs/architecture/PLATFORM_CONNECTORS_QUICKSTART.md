# Platform Connectors - Quick Start Guide

## Quick Reference

### Shopify Connection Flow
```typescript
// 1. User initiates connection
// Navigate to: /api/auth/shopify?shop=mystore.myshopify.com

// 2. Shopify redirects back to callback
// Callback URL: /api/auth/shopify/callback
// Creates connection in database with encrypted token

// 3. Apply fixes
import { applyShopifyFix } from '@/lib/shopify'

const result = await applyShopifyFix(connection, issue, fixCode)
if (result.success) {
  console.log('Fix applied!', result.message)
}
```

### WordPress Connection Flow
```typescript
// 1. User provides credentials
import { testWordPressConnection } from '@/lib/wordpress'

const test = await testWordPressConnection(
  'https://mysite.com',
  'username',
  'application_password'
)

if (test.success) {
  // Save connection with encrypted credentials
}

// 2. Apply fixes
import { applyWordPressFix } from '@/lib/wordpress'

const result = await applyWordPressFix(connection, issue, fixCode)
```

### Magic.js Integration
```html
<!-- Add to any website -->
<script
  src="https://app.seology.ai/magic.js"
  data-site-id="conn_abc123"
  data-debug="true"
></script>
```

```typescript
// Create fix in database
await db.fix.create({
  data: {
    connectionId: 'conn_abc123',
    issueId: issue.id,
    type: 'meta_title',
    status: 'PENDING',
    changes: JSON.stringify({
      type: 'meta_title',
      selector: 'title',
      value: 'New Page Title'
    })
  }
})

// Magic.js will fetch and apply automatically
```

---

## Fix Code Examples

### Shopify Fix Codes
```javascript
// Meta title/description
{
  "title": "New Product Title | Brand",
  "description": "Compelling product description under 160 characters"
}

// Redirect (broken link fix)
{
  "from": "/old-product",
  "to": "/new-product"
}

// Page content update
{
  "bodyHtml": "<h1>New Heading</h1><p>Updated content...</p>"
}

// Structured data
{
  "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"Product\",...}"
}
```

### WordPress Fix Codes
```javascript
// Yoast SEO meta
{
  "title": "Page Title for SEO",
  "description": "Meta description for this page"
}

// Redirect
{
  "from": "/old-page",
  "to": "/new-page"
}

// Post content
{
  "title": "New Post Title",
  "content": "<p>Updated post content...</p>"
}
```

### Magic.js Fix Codes
```javascript
// Meta title
{
  "type": "meta_title",
  "selector": "title",
  "value": "New Page Title"
}

// Meta description
{
  "type": "meta_description",
  "selector": "meta[name='description']",
  "value": "New meta description"
}

// Image alt text
{
  "type": "alt_text",
  "selector": "img.product-image",
  "value": "Descriptive alt text"
}

// Fix heading
{
  "type": "heading",
  "selector": "h1",
  "value": "New Heading Text"
}

// Fix broken link
{
  "type": "link_fix",
  "selector": "a[href='/old-url']",
  "oldValue": "/old-url",
  "value": "/new-url"
}

// Update content
{
  "type": "content",
  "selector": ".main-content",
  "value": "New content text",
  "html": false  // Set to true for HTML content
}
```

---

## Common Issue Types

### Meta Tags
- `missing_meta_title` → Update title tag
- `missing_meta_description` → Add meta description
- `poor_meta_description` → Improve meta description

### Content Issues
- `missing_h1` → Add H1 heading
- `duplicate_h1` → Fix multiple H1s
- `poor_content` → Enhance page content
- `thin_content` → Add more content

### Link Issues
- `broken_link` → Create redirect or fix link
- `404_error` → Create redirect to valid page
- `missing_canonical` → Add canonical tag

### Image Issues
- `missing_alt_text` → Add descriptive alt text
- `large_image_size` → Optimize image

### Technical SEO
- `missing_schema` → Add structured data
- `missing_sitemap` → Generate sitemap
- `slow_page_speed` → Performance fixes

---

## Error Handling Examples

### Shopify
```typescript
try {
  const result = await applyShopifyFix(connection, issue, fixCode)

  if (!result.success) {
    if (result.message.includes('401')) {
      // Re-authenticate required
      console.error('Token expired, need to reconnect')
    } else if (result.message.includes('429')) {
      // Rate limited, retry later
      console.error('Rate limited, will retry')
    } else {
      // Other error
      console.error('Fix failed:', result.message)
    }
  }
} catch (error) {
  console.error('Unexpected error:', error)
}
```

### WordPress
```typescript
try {
  const result = await applyWordPressFix(connection, issue, fixCode)

  if (!result.success) {
    if (result.message.includes('Invalid credentials')) {
      // Update credentials
    } else if (result.message.includes('Plugin not active')) {
      // Yoast or Redirection plugin not installed
    }
  }
} catch (error) {
  console.error('WordPress error:', error)
}
```

---

## Testing Locally

### 1. Set Environment Variables
```bash
# .env.local
SHOPIFY_CLIENT_ID=your_client_id
SHOPIFY_CLIENT_SECRET=your_client_secret
ENCRYPTION_KEY=your_32_character_random_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/seology
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Test Shopify OAuth
```
1. Navigate to: http://localhost:3000/api/auth/shopify?shop=yourstore.myshopify.com
2. Complete OAuth on Shopify
3. Redirects back to: http://localhost:3000/api/auth/shopify/callback
4. Check database for new connection record
```

### 4. Test WordPress Connection
```typescript
// In API route or component
const result = await testWordPressConnection(
  'http://localhost:8888',  // Local WordPress URL
  'admin',
  'xxxx xxxx xxxx xxxx'      // Application Password
)
```

### 5. Test Magic.js
```html
<!-- test.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Old Title</title>
  <meta name="description" content="Old description">
</head>
<body>
  <h1>Test Page</h1>
  <img src="test.jpg">

  <script
    src="http://localhost:3000/magic.js"
    data-site-id="test_site_id"
    data-debug="true"
  ></script>
</body>
</html>
```

---

## Production Deployment

### 1. Environment Setup (Vercel)
```bash
# Add secrets
vercel env add SHOPIFY_CLIENT_SECRET
vercel env add ENCRYPTION_KEY

# Deploy
vercel --prod
```

### 2. Configure Shopify App
```
1. Go to Shopify Partners Dashboard
2. Create App
3. Set OAuth redirect URL: https://app.seology.ai/api/auth/shopify/callback
4. Add required scopes
5. Save Client ID and Secret
```

### 3. Update WordPress Sites
```
1. Install Application Passwords plugin (WP < 5.6)
2. Generate Application Password
3. Enter credentials in SEOLOGY.AI dashboard
```

### 4. Deploy Magic.js
```html
<!-- Production snippet -->
<script
  src="https://app.seology.ai/magic.js"
  data-site-id="ACTUAL_SITE_ID"
></script>
```

---

## Monitoring

### Key Logs to Watch
```typescript
// Shopify API errors
console.error('Shopify API error:', error)

// WordPress connection issues
console.error('WordPress API error:', error)

// Magic.js fix application failures
console.error('Failed to apply fix:', error)
```

### Database Queries for Monitoring
```sql
-- Failed fixes in last 24 hours
SELECT * FROM "Fix"
WHERE status = 'FAILED'
AND "createdAt" > NOW() - INTERVAL '24 hours';

-- Fix success rate by platform
SELECT
  c.platform,
  COUNT(*) FILTER (WHERE f.status = 'APPLIED') as successful,
  COUNT(*) as total,
  ROUND(COUNT(*) FILTER (WHERE f.status = 'APPLIED')::numeric / COUNT(*) * 100, 2) as success_rate
FROM "Fix" f
JOIN "Connection" c ON f."connectionId" = c.id
WHERE f."createdAt" > NOW() - INTERVAL '7 days'
GROUP BY c.platform;

-- Rate limit triggers
SELECT
  c.platform,
  c.domain,
  COUNT(*) as fix_count,
  MAX(f."createdAt") as last_fix
FROM "Fix" f
JOIN "Connection" c ON f."connectionId" = c.id
WHERE f."createdAt" > NOW() - INTERVAL '1 hour'
GROUP BY c.platform, c.domain
HAVING COUNT(*) > 10;
```

---

## Troubleshooting

### Shopify: "Access token is invalid"
**Solution**: Token expired or revoked. User needs to reconnect store.

### WordPress: "401 Unauthorized"
**Solution**: Check Application Password, ensure user has admin privileges.

### Magic.js: Fixes not applying
**Solution**:
1. Check browser console for errors
2. Verify site ID is correct
3. Check if fixes are marked as PENDING in database
4. Ensure script is loading (check Network tab)

### Rate Limiting Issues
**Solution**:
1. Check if too many fixes being applied rapidly
2. Verify rate limit logic is working
3. Add delays between fix batches

### Rollback Not Working
**Solution**:
1. Check if within 90-day window
2. Verify beforeState was captured
3. Ensure platform connection still active

---

## Support

For issues or questions:
1. Check TypeScript errors: `npx tsc --noEmit`
2. Review audit logs in database
3. Check Vercel function logs
4. Consult platform documentation

**File Locations**:
- `c:\Users\manna\Downloads\iimagined.webflow (1)\lib\shopify.ts`
- `c:\Users\manna\Downloads\iimagined.webflow (1)\lib\wordpress.ts`
- `c:\Users\manna\Downloads\iimagined.webflow (1)\public\magic.js`
- `c:\Users\manna\Downloads\iimagined.webflow (1)\lib\execution-modes.ts`
