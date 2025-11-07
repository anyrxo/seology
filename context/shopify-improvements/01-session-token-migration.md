# Session Token Authentication Migration

**Agent**: AUTH SPECIALIST
**Status**: ✅ Implementation Complete
**Priority**: CRITICAL (Required for modern embedded apps)

---

## Overview

We've implemented session token authentication for embedded Shopify apps. This replaces the long-lived OAuth access tokens with short-lived, automatically-renewed session tokens.

## What Changed

### Before (OAuth Tokens)
```typescript
// Client gets shop from URL params
const shop = searchParams.get('shop')

// API route uses Clerk auth
const { userId } = await auth()
const connection = await db.connection.findFirst({
  where: { userId, platform: 'SHOPIFY' }
})
```

**Problems:**
- Long-lived tokens (security risk)
- Requires redirects during installation
- No automatic token refresh
- User can access any connection (need manual filtering)

### After (Session Tokens)
```typescript
// Client sends session token from App Bridge
const token = await shopify.idToken()
fetch('/api/shopify/products', {
  headers: { 'Authorization': `Bearer ${token}` }
})

// API route verifies token
const connection = await getAuthenticatedConnection(request)
// Automatically verified, shop identified, connection loaded
```

**Benefits:**
- ✅ Short-lived tokens (expires in minutes)
- ✅ Automatically renewed by App Bridge
- ✅ No redirects needed
- ✅ Shop identity embedded in token
- ✅ HMAC verified
- ✅ Recommended by Shopify

## Files Created

### 1. `lib/shopify-session-token.ts`
Core session token verification library with:
- `verifySessionToken(request)` - Verify JWT from Authorization header
- `requireSessionToken(request)` - Middleware for API routes
- `getAuthenticatedConnection(request)` - Get connection from token
- `verifyHMAC()` - For OAuth callback verification

### 2. `app/api/shopify/products/session-example/route.ts`
Example API route showing the new pattern.

## Migration Steps

### Step 1: Update Client-Side Code

**In `app/shopify/layout.tsx` or any Shopify page:**

```typescript
import { getSessionToken } from '@/lib/shopify-app-bridge'

// Get session token before making API call
const token = await getSessionToken()

if (!token) {
  console.error('Failed to get session token')
  return
}

// Make authenticated request
const response = await fetch('/api/shopify/products', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

**Note**: `getSessionToken()` already exists in `lib/shopify-app-bridge.ts` (calls `window.shopify.idToken()`)

### Step 2: Update API Routes

**Old pattern:**
```typescript
export async function GET(req: NextRequest) {
  const { userId } = await auth() // Clerk auth
  const shop = req.nextUrl.searchParams.get('shop')

  const connection = await db.connection.findFirst({
    where: { userId, domain: shop, platform: 'SHOPIFY' }
  })

  if (!connection) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Use connection...
}
```

**New pattern:**
```typescript
import { getAuthenticatedConnection } from '@/lib/shopify-session-token'

export async function GET(req: NextRequest) {
  try {
    // All-in-one: verify token, get shop, load connection
    const connection = await getAuthenticatedConnection(req)

    // Use connection...
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    )
  }
}
```

### Step 3: Keep OAuth for Initial Install

Session tokens only work AFTER the app is installed. We still need OAuth for:
1. Initial app installation
2. Requesting scopes
3. Getting the offline access token

**Keep these files as-is:**
- `app/api/auth/shopify/route.ts` (OAuth initiation)
- `app/api/auth/shopify/callback/route.ts` (OAuth callback)

**Workflow:**
1. User clicks "Install App" → OAuth flow
2. We get offline access token → Store in database
3. App loads in iframe → Use session tokens
4. API requests → Verify session token + use stored access token

## API Routes to Migrate

**High Priority** (embedded app endpoints):
- ✅ `app/api/shopify/products/route.ts` (example created)
- ⏳ `app/api/shopify/analyze/route.ts`
- ⏳ `app/api/shopify/fix/route.ts`
- ⏳ `app/api/shopify/settings/route.ts`
- ⏳ `app/api/shopify/overview/route.ts`

**Low Priority** (non-embedded):
- `app/api/webhooks/shopify/*` (use HMAC verification, not session tokens)
- `app/api/auth/shopify/*` (OAuth flow, not session tokens)

## Testing Checklist

- [ ] Load app in Shopify Admin iframe
- [ ] Open DevTools Network tab
- [ ] Make API request
- [ ] Verify `Authorization: Bearer <token>` header present
- [ ] Verify API returns 200 (not 401)
- [ ] Check server logs for "Session token verification failed"
- [ ] Wait 5+ minutes, make another request (token should refresh)
- [ ] Verify no Clerk authentication errors

## Security Notes

### What We Verify
- ✅ JWT signature (HMAC-SHA256 with client secret)
- ✅ Expiration time (exp claim)
- ✅ Not-before time (nbf claim)
- ✅ Audience matches our API key (aud claim)
- ✅ Issuer is Shopify domain (iss claim)

### What We Don't Store
- ❌ Session tokens (they expire quickly)
- ❌ User passwords (handled by Shopify)
- ❌ Raw client secret in code (environment variable)

### What We Still Store
- ✅ Offline access token (encrypted in database)
- ✅ Shop domain
- ✅ Connection metadata

## Common Issues

### "Missing or invalid Authorization header"
**Cause**: Client not sending token
**Fix**: Call `getSessionToken()` before fetch

### "Session token expired"
**Cause**: Token expired (usually 1 minute)
**Fix**: App Bridge auto-renews, just retry request

### "Invalid signature"
**Cause**: Wrong SHOPIFY_CLIENT_SECRET
**Fix**: Check environment variable matches Partner Dashboard

### "No active connection found"
**Cause**: Shop not connected or status != 'CONNECTED'
**Fix**: Complete OAuth flow first

## Next Steps

1. ✅ Implement session token verification library
2. ⏳ Migrate all embedded API routes
3. ⏳ Test in Shopify Admin iframe
4. ⏳ Update frontend to use session tokens
5. ⏳ Add session token to all Shopify API requests
6. ⏳ Monitor error rates
7. ⏳ Remove Clerk auth from Shopify routes (keep for dashboard)

## References

- **Official Docs**: https://shopify.dev/docs/apps/build/authentication-authorization/session-tokens
- **Implementation**: `lib/shopify-session-token.ts`
- **Example**: `app/api/shopify/products/session-example/route.ts`
- **Context Doc**: `context/shopify-docs/02-authentication-authorization.md`
