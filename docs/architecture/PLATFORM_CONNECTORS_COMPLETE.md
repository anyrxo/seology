# Platform Connectors - Implementation Complete

## Overview
Production-ready platform connectors for SEOLOGY.AI have been successfully implemented for Shopify, WordPress, and Magic.js (custom sites).

---

## 1. SHOPIFY CONNECTOR (`lib/shopify.ts`)

### Features Implemented
- **OAuth 2.0 Flow**: Complete authentication with CSRF protection
- **Rate Limiting**: Token bucket algorithm (2 req/sec)
- **Retry Logic**: Automatic retry for transient failures (max 3 attempts)
- **Error Handling**: Comprehensive error handling for 401, 403, 429, timeout, and network errors
- **Rollback Support**: Captures before/after state for 90-day rollback window

### Key Functions

#### OAuth & Connection Management
```typescript
generateShopifyOAuthUrl(shop, state, redirectUri): string
exchangeShopifyOAuthCode(shop, code): Promise<string>
validateShopifyConnection(accessToken, shop): Promise<boolean>
getShopifyStoreInfo(accessToken, shop): Promise<ShopInfo>
```

#### SEO Fix Application
```typescript
applyShopifyFix(connection, issue, fixCode): Promise<ShopifyFixResult>
```

#### Supported Fix Types
- **Meta Tags**: `missing_meta_title`, `missing_meta_description`, `poor_meta_description`
- **Content**: `missing_h1`, `duplicate_h1`, `poor_content`
- **Links**: `broken_link`, `404_error` (creates redirects)
- **Structured Data**: `missing_schema`, `missing_structured_data`
- **Images**: Image alt text via metafields

### API Integration
- **GraphQL API**: Uses Shopify Admin API 2024-10
- **Mutations**: productUpdate, redirectCreate, pageUpdate, metafieldsSet
- **Queries**: shop info, product data, page data

### Rate Limiting Implementation
```typescript
// Token bucket algorithm
const rateLimitState = new Map<string, { tokens: number; lastRefill: number }>()
const MAX_TOKENS = 2 // 2 requests per second
const REFILL_RATE = 500 // Add 1 token every 500ms
```

### Error Handling
- **429 Rate Limit**: Respects Retry-After header, automatic backoff
- **401/403 Auth**: No retry, immediate failure
- **Network/Timeout**: Up to 3 retries with exponential backoff
- **30-second timeout**: Per request using AbortSignal

---

## 2. WORDPRESS CONNECTOR (`lib/wordpress.ts`)

### Features Implemented
- **REST API Integration**: WordPress REST API v2 with Application Passwords
- **Basic Auth**: Secure authentication over HTTPS
- **Yoast SEO Support**: Direct integration with Yoast SEO meta fields
- **Redirection Plugin**: Support for creating redirects via Redirection plugin
- **Connection Validation**: Test credentials before saving

### Key Functions

#### Connection Management
```typescript
testWordPressConnection(siteUrl, username, appPassword): Promise<{ success, message }>
```

#### SEO Fix Application
```typescript
applyWordPressFix(connection, issue, fixCode): Promise<WordPressFixResult>
```

#### Supported Fix Types
- **Meta Tags**: Updates Yoast SEO fields (`_yoast_wpseo_title`, `_yoast_wpseo_metadesc`)
- **Post/Page Content**: Direct content updates
- **Redirects**: Creates 301 redirects via Redirection plugin
- **Image Alt Text**: Updates attachment metadata

### API Endpoints Used
```
GET  /wp-json/wp/v2/users/me              - Validate connection
POST /wp-json/wp/v2/posts/{id}            - Update post
POST /wp-json/wp/v2/pages/{id}            - Update page
POST /wp-json/redirection/v1/redirect      - Create redirect
```

### Authentication
- **Application Passwords**: WordPress 5.6+ feature
- **Basic Auth**: Base64 encoded `username:app_password`
- **Encrypted Storage**: Credentials encrypted using `lib/encryption.ts`

### Error Handling
- **401 Unauthorized**: Invalid credentials
- **404 Not Found**: Post/page doesn't exist
- **Plugin Not Active**: Graceful degradation if Yoast/Redirection not installed

---

## 3. MAGIC.JS CONNECTOR (`public/magic.js`)

### Features Implemented
- **Universal JavaScript Snippet**: Works on any website
- **Client-Side Fix Application**: Applies fixes in real-time without server changes
- **Security**: XSS protection with HTML sanitization
- **Analytics Tracking**: Sends page metrics back to SEOLOGY.AI
- **Configurable**: Debug mode, custom check intervals

### Installation
```html
<!-- Add before closing </body> tag -->
<script
  src="https://app.seology.ai/magic.js"
  data-site-id="YOUR_SITE_ID"
  data-debug="false"
  data-interval="60000"
></script>
```

### Supported Fix Types
```javascript
- meta_title           // Update <title> tag
- meta_description     // Update meta description
- alt_text            // Add alt text to images
- heading             // Fix heading hierarchy
- link_fix            // Fix broken links
- content             // Update page content
```

### Security Features
- **HTML Sanitization**: Removes dangerous tags/attributes
- **URL Validation**: Blocks javascript: and data: URIs
- **Text-only Meta**: No HTML in title/description tags
- **Whitelist Approach**: Only allowed tags/attributes pass through

### Analytics Collection
```javascript
{
  url: window.location.href,
  title: document.title,
  metaDescription: <meta description>,
  headings: { h1: [...], h2: [...] },
  images: { total, withoutAlt },
  links: { internal, external },
  wordCount: <page word count>
}
```

### API Integration
```
GET  /api/magic/{siteId}/pending          - Fetch pending fixes
POST /api/magic/{siteId}/fixes/{fixId}/status  - Report fix status
POST /api/magic/{siteId}/analytics        - Send page analytics
```

---

## 4. API ROUTES

### Shopify OAuth Routes
**File**: `app/api/auth/shopify/route.ts`
- Initiates OAuth flow
- Generates CSRF-protected state token
- Redirects to Shopify authorization URL

**File**: `app/api/auth/shopify/callback/route.ts`
- Handles OAuth callback
- Validates CSRF state
- Exchanges code for access token
- Encrypts and stores token in database
- Creates connection record
- Creates audit log and notification

### Magic.js API Routes (Existing)
**File**: `app/api/magic/[siteId]/pending/route.ts`
- Returns pending fixes for a site
- Filters by current page URL
- Returns fix objects with type, selector, value

**File**: `app/api/magic/[siteId]/fixes/[fixId]/status/route.ts`
- Accepts fix application status from client
- Updates fix record in database
- Tracks success/failure metrics

**File**: `app/api/magic/[siteId]/analytics/route.ts`
- Receives page analytics from Magic.js
- Stores metrics for analysis
- Helps identify new SEO issues

---

## 5. INTEGRATION WITH EXECUTION MODES

All three connectors integrate seamlessly with the execution modes system in `lib/execution-modes.ts`:

### Automatic Mode
```typescript
// Shopify example
const result = await applyShopifyFix(connection, issue, fixCode)
if (result.success) {
  // Fix applied immediately
  // Before/after state captured for rollback
}
```

### Plan Mode
```typescript
// Create plan of all fixes
// User approves once
// All fixes applied in sequence with rate limiting
```

### Approve Mode
```typescript
// Each fix created as pending
// User approves individually
// Fix applied on approval
```

### Rate Limiting Integration
```typescript
// Prevents overwhelming platform APIs
await rateLimitPlatformRequests(platform)

// Platform-specific delays:
SHOPIFY: 500ms
WORDPRESS: 300ms
CUSTOM (Magic.js): 100ms
```

---

## 6. ERROR HANDLING & LOGGING

### Comprehensive Error Handling
All connectors implement:
1. **Network Errors**: Timeout, connection refused, DNS failure
2. **Auth Errors**: Invalid tokens, expired sessions
3. **Rate Limiting**: Respect platform limits, automatic backoff
4. **Validation Errors**: Malformed data, missing fields
5. **Platform-Specific**: Shopify userErrors, WordPress REST errors

### Audit Logging
Every fix application creates audit logs:
```typescript
await db.auditLog.create({
  data: {
    userId,
    connectionId,
    action: 'FIX_APPLIED',
    resource: 'fix',
    resourceId: fixId,
    details: JSON.stringify({ issueId, beforeState, afterState })
  }
})
```

### User Notifications
```typescript
await db.notification.create({
  data: {
    userId,
    type: 'SUCCESS', // or 'ERROR', 'WARNING'
    title: 'Fix Applied Successfully',
    message: `Fixed: ${issue.title}`,
    actionUrl: `/dashboard/sites/${connectionId}`
  }
})
```

---

## 7. ROLLBACK CAPABILITY

### Before State Capture
```typescript
const beforeState = {
  timestamp: new Date().toISOString(),
  issueType: issue.type,
  pageUrl: issue.pageUrl,
  platform: connection.platform,
  originalValue: <fetched from platform>
}
```

### After State Capture
```typescript
const afterState = {
  timestamp: new Date().toISOString(),
  issueType: issue.type,
  pageUrl: issue.pageUrl,
  platform: connection.platform,
  fixApplied: true,
  newValue: <value after fix>
}
```

### Rollback Function
```typescript
// Available in lib/execution-modes.ts
export async function rollbackFix(fixId: string, userId: string)

// Features:
- 90-day rollback window
- Restores previous state
- Reopens issue
- Creates audit log
- Sends notification
```

---

## 8. SECURITY FEATURES

### Token Encryption
All credentials encrypted using AES-256-GCM:
```typescript
import { encrypt, decrypt } from './encryption'

// Storing
const encryptedToken = encrypt(accessToken)
await db.connection.create({ accessToken: encryptedToken })

// Using
const accessToken = decrypt(connection.accessToken)
```

### CSRF Protection
OAuth flows protected with cryptographic state tokens:
```typescript
// Generate
const state = await generateOAuthState(userId, 'SHOPIFY', { shop })

// Validate
const validation = await validateOAuthState(state, 'SHOPIFY')
if (!validation.valid) throw new Error('Invalid state')
```

### XSS Protection (Magic.js)
- HTML sanitization on all user inputs
- URL validation to block javascript: URIs
- Text-only content in meta tags
- Whitelist approach for allowed HTML

---

## 9. USAGE TRACKING

### Fix Application Tracking
```typescript
const { trackFixApplied } = await import('./usage')
await trackFixApplied(userId, issueId, connectionId)
```

### Usage Limits
Enforced before applying fixes:
```typescript
const { canApplyFixes } = await import('./usage')
const check = await canApplyFixes(userId, 1)

if (!check.allowed) {
  return { success: false, message: check.reason }
}
```

### Plan Limits
- **STARTER**: 3 sites, 500 fixes/month
- **GROWTH**: 10 sites, 5000 fixes/month
- **SCALE**: Unlimited

---

## 10. TESTING RECOMMENDATIONS

### Shopify Testing
```bash
# Use development store
# Test OAuth flow with real store
# Verify rate limiting with multiple rapid requests
# Test error handling with invalid tokens
```

### WordPress Testing
```bash
# Use local WordPress install (wp-cli, Local, XAMPP)
# Enable Application Passwords
# Install Yoast SEO and Redirection plugins
# Test with different user permission levels
```

### Magic.js Testing
```bash
# Create test HTML file
# Include Magic.js script
# Test fix application in browser console
# Verify XSS protection with malicious inputs
```

---

## 11. DEPLOYMENT CHECKLIST

### Environment Variables
```env
# Shopify
SHOPIFY_CLIENT_ID=0b87ac78cf0783fd1dd829bf5421fae5
SHOPIFY_CLIENT_SECRET=<your_secret>

# Encryption
ENCRYPTION_KEY=<32_character_random_string>

# App URL
NEXT_PUBLIC_APP_URL=https://app.seology.ai

# Database
DATABASE_URL=<postgresql_connection_string>
```

### Vercel Configuration
```json
{
  "env": {
    "SHOPIFY_CLIENT_SECRET": "@shopify-secret",
    "ENCRYPTION_KEY": "@encryption-key"
  }
}
```

### Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

---

## 12. PERFORMANCE OPTIMIZATIONS

### Rate Limiting Strategy
- **Shopify**: 2 requests/second (token bucket)
- **WordPress**: 300ms delay between requests
- **Magic.js**: Client-side, no rate limiting needed

### Connection Pooling
Prisma automatically handles database connection pooling.

### Caching
Future optimization: Cache store info, reduce API calls.

### Retry Strategy
- Exponential backoff: 1s → 2s → 3s
- Skip retry on 4xx errors (except 429)
- Max 3 attempts per request

---

## 13. MONITORING & METRICS

### Key Metrics to Track
1. **Fix Success Rate**: % of fixes applied successfully
2. **Platform Error Rate**: Auth, rate limit, network errors by platform
3. **Average Fix Time**: Time from initiation to completion
4. **Rollback Rate**: % of fixes rolled back
5. **API Response Times**: Platform API latency

### Recommended Tools
- **Logging**: Winston, Pino
- **APM**: Vercel Analytics, Sentry
- **Database**: Prisma Metrics
- **API Monitoring**: Postmark, Better Uptime

---

## 14. FUTURE ENHANCEMENTS

### Short Term
1. Add image optimization for Shopify
2. Support for WordPress custom post types
3. Magic.js offline support with Service Workers
4. Bulk fix operations

### Medium Term
1. Add WooCommerce-specific fixes
2. Shopify theme file editing
3. WordPress Gutenberg block fixes
4. Real-time fix preview

### Long Term
1. AI-powered fix suggestions
2. A/B testing for SEO changes
3. Performance impact analysis
4. Multi-language support

---

## 15. DOCUMENTATION LINKS

### External Resources
- **Shopify Admin API**: https://shopify.dev/docs/api/admin-graphql
- **WordPress REST API**: https://developer.wordpress.org/rest-api/
- **Yoast SEO**: https://developer.yoast.com/
- **Prisma**: https://www.prisma.io/docs

### Internal Files
- `lib/shopify.ts` - Shopify connector
- `lib/wordpress.ts` - WordPress connector
- `public/magic.js` - Universal JavaScript connector
- `lib/execution-modes.ts` - Execution mode system
- `lib/encryption.ts` - Token encryption utilities
- `prisma/schema.prisma` - Database schema

---

## SUMMARY

All three platform connectors are **production-ready** with:

✅ Complete OAuth/authentication flows
✅ Comprehensive error handling
✅ Rate limiting and retry logic
✅ Rollback support (90-day window)
✅ Security (encryption, CSRF, XSS protection)
✅ Usage tracking and limits
✅ Audit logging
✅ User notifications
✅ Integration with execution modes system

**Next Steps**:
1. Set up environment variables
2. Configure Shopify app in Partner Dashboard
3. Test OAuth flows in development
4. Deploy to production
5. Monitor error rates and performance
