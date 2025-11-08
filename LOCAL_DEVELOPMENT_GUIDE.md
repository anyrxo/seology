# Local Development Guide - Testing Shopify Integration

## The Problem

When testing the Shopify app locally, the browser console shows:

```
POST https://seology.ai/api/shopify/execution-mode 404 (Not Found)
```

This happens because:
1. The app is loaded inside Shopify's admin panel (embedded app)
2. Shopify's App Bridge tries to use the production URL (`seology.ai`)
3. Local dev server is running at `localhost:3000`

## Solution Options

### Option 1: Test Directly (Recommended for Quick Testing)

**Access the onboarding page directly** without going through Shopify admin:

```
http://localhost:3000/shopify/onboarding?shop=YOUR_STORE.myshopify.com
```

**Example**:
```
http://localhost:3000/shopify/onboarding?shop=example.myshopify.com
```

**Pros**:
- Instant testing
- No additional tools needed
- API calls go to localhost

**Cons**:
- Not embedded in Shopify admin
- Won't test App Bridge features
- Different from production experience

### Option 2: Use ngrok Tunnel (Production-Like Testing)

Expose your localhost to the internet so Shopify can access it:

1. **Install ngrok**:
   ```bash
   # Windows
   choco install ngrok

   # Or download from https://ngrok.com/download
   ```

2. **Start ngrok tunnel**:
   ```bash
   ngrok http 3000
   ```

3. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

4. **Update Shopify App Settings**:
   - Go to Shopify Partners Dashboard
   - Select your app
   - Update "App URL" to `https://abc123.ngrok.io/shopify`
   - Update "Allowed redirection URL(s)" to include `https://abc123.ngrok.io/api/auth/shopify/callback`

5. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_APP_URL=https://abc123.ngrok.io
   ```

6. **Restart dev server**:
   ```bash
   npm run dev
   ```

**Pros**:
- Full production-like experience
- Tests App Bridge features
- Embedded in Shopify admin

**Cons**:
- Requires ngrok setup
- URL changes each time (unless you have ngrok paid plan)
- Need to update Shopify app settings

### Option 3: Use Shopify CLI (Official Method)

Shopify provides a CLI tool that handles tunneling automatically:

1. **Install Shopify CLI**:
   ```bash
   npm install -g @shopify/cli @shopify/app
   ```

2. **Initialize Shopify app** (if not done):
   ```bash
   shopify app init
   ```

3. **Start dev with tunnel**:
   ```bash
   shopify app dev
   ```

This automatically:
- Creates an ngrok tunnel
- Updates Shopify app settings
- Opens the app in Shopify admin

**Pros**:
- Official Shopify method
- Auto-configures everything
- Best for production-ready testing

**Cons**:
- More complex setup
- Requires Shopify CLI

## Current Recommended Approach

For now, **use Option 1** (direct URL access) for quick iteration:

### Quick Test Steps:

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open browser** to:
   ```
   http://localhost:3000/shopify/onboarding?shop=YOUR_STORE.myshopify.com
   ```

3. **Check browser console** (F12):
   - Should show `[Onboarding] Step 1: Saving execution mode...`
   - Should see `POST http://localhost:3000/api/shopify/execution-mode`
   - Should complete without 404 errors

4. **Test flow**:
   - Select execution mode (AUTOMATIC)
   - Enable/disable AI chat
   - Select audit scope
   - Click "Proceed"
   - Watch console for progress

### What the Console Should Show:

```
[Onboarding] Step 1: Saving execution mode...
POST http://localhost:3000/api/shopify/execution-mode 200 OK
[Onboarding] ✅ Execution mode saved

[Onboarding] Step 2: Saving preferences...
POST http://localhost:3000/api/shopify/preferences 200 OK
[Onboarding] ✅ Preferences saved

[Onboarding] Step 3: Running audit (this may take 1-3 minutes)...
POST http://localhost:3000/api/shopify/audit 200 OK
[Audit] Fetching products from Shopify...
[Audit] ✅ Fetched 25 products from Shopify
[Audit] Saving 25 products to database...
[Audit] Successfully saved 25 products to database
[Onboarding] ✅ Audit complete: 12 issues found

[Onboarding] Step 4: Marking onboarding complete...
POST http://localhost:3000/api/shopify/onboarding 200 OK
[Onboarding] ✅ Onboarding marked complete

[Onboarding] Step 5: Redirecting...
[Onboarding] Redirecting to dashboard...
```

## Authentication Note

When accessing directly (Option 1), you may need to ensure:

1. **User is authenticated** via Clerk
   - Go to `/sign-in` first if not logged in

2. **Shop connection exists** in database
   - Run Shopify OAuth flow first
   - Or manually create connection in database

3. **Query parameter** is correct:
   - Must include `?shop=YOUR_STORE.myshopify.com`
   - Shop must match a connected store in database

## Troubleshooting

### Error: "Shop not connected"

**Cause**: No connection record in database for this shop

**Fix**:
1. Check database: `npx prisma studio`
2. Look for Connection record with matching `domain`
3. If missing, run OAuth flow: `http://localhost:3000/api/auth/shopify?shop=YOUR_STORE.myshopify.com`

### Error: "Failed to save execution mode"

**Cause**: API endpoint not found or database error

**Fix**:
1. Check dev server is running: `npm run dev`
2. Check endpoint exists: `app/api/shopify/execution-mode/route.ts`
3. Check console for detailed error

### Error: "Audit timed out"

**Cause**: Shopify API slow or rate-limited

**Fix**:
1. Normal for stores with many products
2. Audit should gracefully fail and continue
3. Can re-run audit from dashboard later

## For Production

When deploying to production:

1. **Deploy to Vercel** (or your hosting):
   ```bash
   vercel --prod
   ```

2. **Update Shopify App Settings**:
   - App URL: `https://seology.ai/shopify`
   - Redirect URL: `https://seology.ai/api/auth/shopify/callback`

3. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_APP_URL=https://seology.ai
   ```

4. **Test in Shopify Admin**:
   - Install app from Shopify App Store
   - Or use development store for testing

## Summary

**For Local Development**:
→ Use direct URL: `http://localhost:3000/shopify/onboarding?shop=YOUR_STORE.myshopify.com`

**For Production-Like Testing**:
→ Use ngrok: `ngrok http 3000` + update Shopify app settings

**For Production**:
→ Deploy to Vercel + update Shopify app settings to `https://seology.ai`
