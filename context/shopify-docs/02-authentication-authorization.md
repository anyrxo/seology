# Authentication and Authorization for Shopify Apps

**Source**: https://shopify.dev/docs/apps/build/authentication-authorization

---

## Core Concepts

**Authentication** verifies the identity of users or apps making API requests. **Authorization** grants permissions to apps, allowing them to acquire access tokens and operate within defined scopes.

## Key Authentication Methods

### Session Tokens
Embedded apps must authenticate incoming requests using session tokens, which serve as the primary authentication mechanism for apps running within the Shopify admin interface.

### Access Token Acquisition
The platform supports multiple token acquisition flows:

- **Token Exchange** (recommended for embedded apps): A modern approach that avoids unnecessary redirects and provides better user experience
- **Authorization Code Grant**: Traditional OAuth 2.0 flow supporting both embedded and non-embedded apps
- **Client Credentials Grant**: For apps operating without user interaction within an organization
- **Custom App Tokens**: Generated directly in the Shopify admin for admin-created applications

## Installation Methods

**Shopify Managed Installation** is the preferred approach, as it minimizes user friction by handling the installation process automatically when apps declare their required access scopes through Shopify CLI.

## Best Practices

The platform strongly recommends creating embedded apps using Shopify managed installation paired with token exchange, as this combination "provides the best user experience" according to Shopify's guidance.

## Supporting Tools

Official libraries like `@shopify/shopify-api` (Node.js) and `shopify_api` (Ruby) handle OAuth flows, webhooks, and token management, simplifying implementation.

---

## SEOLOGY.AI Implementation

**Current Approach**: We use **Authorization Code Grant** (traditional OAuth 2.0 flow) with manual implementation.

### Our OAuth Flow

1. **User Clicks "Connect Shopify"** → Redirects to Shopify OAuth URL with:
   - Client ID: `0b87ac78cf0783fd1dd829bf5421fae5`
   - Scopes: `read_products,write_products,read_content,write_content,read_themes,write_themes`
   - Redirect URI: `https://seology.ai/api/auth/shopify/callback`

2. **Shopify Redirects Back** → `app/api/auth/shopify/callback/route.ts` handles:
   - Exchange authorization code for access token
   - Store encrypted access token in database
   - Create Connection record with `platform: 'SHOPIFY'`

3. **Making API Calls** → We retrieve the access token from database and use it in headers

### Session Tokens (Embedded Apps)

**We ARE an embedded app** but we're NOT currently using session tokens. We should migrate to this approach!

**Why Session Tokens Are Better**:
- No redirects needed (better UX)
- Tokens expire quickly (more secure)
- Automatically renewed by App Bridge
- Recommended by Shopify

**Current Issue**: Our app loads in Shopify Admin iframe but we're still using the long-lived OAuth access token. We should upgrade to session tokens.

### What We Need to Implement

```typescript
// In app/shopify/layout.tsx - we already have App Bridge loaded
// Now we need to use it for authentication

// Get session token from App Bridge
const sessionToken = await shopify.idToken();

// Send this token with every API request
fetch('/api/shopify/products', {
  headers: {
    'Authorization': `Bearer ${sessionToken}`
  }
});

// On the server, verify the session token
// Use @shopify/shopify-api library for verification
```

### Access Scopes We Request

From our OAuth flow:
- `read_products` - View products
- `write_products` - Modify products (for SEO fixes)
- `read_content` - View pages, blog posts
- `write_content` - Modify content (for SEO fixes)
- `read_themes` - View theme files
- `write_themes` - Modify theme (for meta tags)

**Important**: We should follow principle of least privilege. Do we really need `write_themes`? Consider removing unnecessary scopes.

### Token Storage

**Current Approach**: We store access tokens encrypted in the `connections` table:
```typescript
{
  userId: string
  platform: 'SHOPIFY'
  credentials: string // JSON.parse() to get { shop, accessToken }
}
```

**Security**:
- ✅ Encrypted using `lib/encryption.ts`
- ✅ Per-user isolation
- ✅ Stored in PostgreSQL (more secure than SQLite)
- ❌ Long-lived tokens (should migrate to session tokens)

### Next Steps

1. **Migrate to Session Tokens** for embedded app authentication
2. **Review Scopes** - remove any unnecessary permissions
3. **Implement Token Refresh** if we stick with OAuth flow
4. **Add Token Validation** on every API request
5. **Add HMAC Verification** for webhook security
