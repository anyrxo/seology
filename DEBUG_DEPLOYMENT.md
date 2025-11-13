# Deployment Debug Checklist

## Current Status (2025-11-14 02:15)

**ROOT CAUSE FOUND**: App was loading as standalone website instead of being embedded in Shopify admin.

## Commits Timeline
1. `4063c63` - Fix Shopify chat network error with enhanced diagnostics
2. `04d7e6d` - Fix chat 400 error: Add shop parameter to URL query string ✅
3. `45f9ca3` - Add debug logging to chat requests
4. `c952440` - Fix auto-fix button: Add shop parameter to fix API endpoint ✅
5. `667e436` - Fix all Shopify API endpoints: Add shop parameter to URL query string ✅
6. `7954183` - Force cache bust: Add deployment notes
7. `5a1df76` - Fix: Add X-Shopify-Retry header for 401 auth errors
8. `[NEXT]` - **CRITICAL FIX**: Redirect to OAuth if app not embedded ✅

## What Should Be Working

All these endpoints now include `?shop=${shop}` in the URL:

### Already Fixed (commits 04d7e6d & c952440):
- ✅ `/api/shopify/chat` (POST)
- ✅ `/api/shopify/fix` (POST)

### Fixed in Latest Commit (667e436):
- ✅ `/api/shopify/support` (POST)
- ✅ `/api/shopify/settings` (POST)
- ✅ `/api/shopify/fixes/create` (POST)
- ✅ `/api/shopify/execution-mode` (POST)
- ✅ `/api/shopify/images` (POST)
- ✅ `/api/shopify/images/generate-alt` (POST)
- ✅ `/api/shopify/images/apply-fixes` (POST)
- ✅ `/api/shopify/audit/advanced` (POST)
- ✅ `/api/shopify/analyze` (POST)
- ✅ `/api/shopify/fixes/approve-plan` (POST)
- ✅ `/api/shopify/fixes/reject-plan` (POST)
- ✅ `/api/shopify/fixes/approve` (POST)
- ✅ `/api/shopify/fixes/reject` (POST)

## Debugging Steps

### 1. Check Vercel Deployment
```bash
# In Vercel dashboard:
1. Go to https://vercel.com/your-project/deployments
2. Find the deployment with commit SHA: 667e436
3. Verify status is "Ready" (not "Building" or "Failed")
4. Check deployment URL matches your production domain
```

### 2. Verify Code is Live
Open browser console (F12) on the Shopify app and run:
```javascript
// Check if shop parameter exists
const urlParams = new URLSearchParams(window.location.search);
console.log('Shop parameter:', urlParams.get('shop'));

// This should show the chat endpoint with ?shop=
console.log('Expected chat URL:', `/api/shopify/chat?shop=${urlParams.get('shop')}`);
```

### 3. Clear All Caches
1. **Browser Cache**: Hard refresh
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Vercel Edge Cache**: In Vercel dashboard
   - Go to Settings → Domains
   - Click "Purge Cache" for your domain

3. **Shopify App Cache**: Reinstall
   - Uninstall app from Shopify admin
   - Reinstall from app URL

### 4. Check Network Request
In browser DevTools → Network tab:
1. Filter by "Fetch/XHR"
2. Send a chat message
3. Find the `/api/shopify/chat` request
4. Check Request URL - should include `?shop=your-store.myshopify.com`
5. Check Request Headers - should have Authorization token
6. If URL is missing `?shop=`, the old code is still cached

### 5. Check Console Logs
With debug logging enabled, you should see:
```
[Chat] Sending message to: /api/shopify/chat?shop=your-store.myshopify.com
[Chat] Shop parameter: your-store.myshopify.com
```

If you see `Shop parameter: null` or undefined, that's the issue!

## Root Cause - App Not Embedded

**Issue**: When accessing `https://seology.ai/shopify?shop=seology-3.myshopify.com` directly, the app loads as a standalone website instead of being embedded in Shopify admin.

**Why this matters**:
- Shopify apps MUST be embedded in an iframe within Shopify admin
- Without embedding, there's no `host` parameter (required for App Bridge)
- Without App Bridge, session tokens can't be generated
- Without session tokens, all API requests fail with 401 Unauthorized

**The Fix (in latest commit)**:
Added embedded check to `/app/shopify/page.tsx`:
1. Check if app is running in iframe (`window.top !== window.self`)
2. Check if `host` parameter exists (Shopify provides this for embedded apps)
3. If NEITHER condition is true → redirect to OAuth installation
4. OAuth flow will properly install and embed the app in Shopify

**How to access the app correctly**:
1. Go to your Shopify admin: `https://seology-3.myshopify.com/admin`
2. Click on Apps → SEOLOGY.AI
3. App loads embedded with proper authentication

**What was happening before**:
- User accessed `https://seology.ai/shopify?shop=...` directly
- App loaded as standalone website (not embedded)
- No host parameter, no App Bridge initialization
- All API calls failed because no valid session token could be obtained
- Even though OAuth access token was in database, frontend couldn't authenticate

## Verification Test

Once cache is cleared, test with this in browser console:
```javascript
// This should return 200, not 400
fetch('/api/shopify/chat?shop=' + new URLSearchParams(window.location.search).get('shop'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'test' }]
  })
}).then(r => console.log('Status:', r.status));
```

If it returns 400, the middleware is rejecting it. If 200/401/500, the shop parameter is working!
