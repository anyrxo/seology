# Manual Shopify App Configuration Update

## Problem
Shopify CLI has path resolution issues on Windows. Since all code changes are deployed to Vercel, we just need to update the app configuration in Partner Dashboard manually.

## Steps to Update Configuration

### 1. Access Shopify Partner Dashboard

Go to: https://partners.shopify.com/

Navigate to: **Apps** → **SEOLOGY** (Client ID: c906708ae27d7e173c553e373c5b877d)

### 2. Update App URL

1. Click on **Configuration** tab
2. Scroll to **App URL** section
3. Change from: `https://seology.ai/shopify/dashboard`
4. Change to: `https://seology.ai/shopify`
5. Click **Save**

### 3. Update Allowed Redirection URLs

1. In the same **Configuration** tab
2. Scroll to **Allowed redirection URL(s)** section
3. Ensure these URLs are present (add if missing):
   - `https://seology.ai/api/auth/shopify/callback`
   - `https://seology.ai/shopify`
4. Click **Save**

### 4. Verify Embedded App Settings

1. In **Configuration** tab
2. Scroll to **Distribution** section
3. Verify **App embed** is set to: **Embedded**
4. If not, enable **Embedded** option
5. Click **Save**

## Expected Configuration

After updates, your app configuration should match:

```
App URL: https://seology.ai/shopify
Embedded: Yes

Allowed redirection URLs:
- https://seology.ai/api/auth/shopify/callback
- https://seology.ai/shopify

Scopes:
- read_products
- write_products
- read_content
- write_content
- read_themes
- write_themes
- read_online_store_pages
- write_online_store_pages
```

## Testing After Update

### 1. Clear Cache
1. Open Shopify Admin: https://seology-3.myshopify.com/admin
2. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

### 2. Access SEOLOGY App
1. In Shopify Admin, click **Apps** in left sidebar
2. Click **SEOLOGY**
3. App should now load **INSIDE** Shopify Admin (embedded in iframe)

### 3. Verify Embedded Mode
Check the browser URL bar:

**❌ Wrong (before fix)**:
```
https://seology.ai/shopify/dashboard
```
*Opens in new tab/window*

**✅ Correct (after fix)**:
```
https://admin.shopify.com/store/seology-3/apps/seology
```
*Stays in Shopify Admin, app loads in iframe*

### 4. Test Functionality
Within the embedded app, verify:
- ✅ Products list loads
- ✅ "Analyze SEO" buttons work
- ✅ "Apply SEO" buttons work
- ✅ Navigation stays within Shopify Admin
- ✅ No external redirects

## Troubleshooting

### If app still opens externally:
1. **Wait 1-2 minutes** - Configuration changes can take time to propagate
2. **Clear browser cache** completely
3. **Hard refresh** Shopify Admin page
4. **Try incognito/private window** to test without cache

### If you get authentication errors:
1. Verify Client ID matches: `c906708ae27d7e173c553e373c5b877d`
2. Verify redirect URLs are exactly as specified above
3. Check Vercel environment variables are deployed

### If app shows blank page:
1. Open browser console (F12)
2. Check for App Bridge errors
3. Verify `shopify-api-key` meta tag is present in page source
4. Ensure App Bridge script loads successfully

## Why This Works

All the code changes for embedded app functionality are already deployed:

✅ **App Bridge initialization** - `app/shopify/layout.tsx` loads App Bridge script
✅ **AppBridgeProvider component** - `components/shopify/AppBridgeProvider.tsx` handles host parameter
✅ **Correct entry point** - `app/shopify/page.tsx` routes users properly
✅ **shopify.app.toml** - Configuration file has correct settings (just not deployed via CLI)

The only missing piece is updating the Partner Dashboard configuration to match our code - which you can do manually via the web interface.

## Quick Checklist

- [ ] Go to Shopify Partner Dashboard
- [ ] Navigate to SEOLOGY app → Configuration
- [ ] Update App URL to `https://seology.ai/shopify`
- [ ] Add redirect URLs (if missing)
- [ ] Verify Embedded mode is enabled
- [ ] Save changes
- [ ] Wait 1-2 minutes
- [ ] Hard refresh Shopify Admin
- [ ] Test: Go to Apps → SEOLOGY
- [ ] Verify app loads inside Shopify Admin
- [ ] Test SEO analysis and apply buttons

---

**Once you've made these changes, the app will function as an embedded Shopify app without needing to use Shopify CLI.**
