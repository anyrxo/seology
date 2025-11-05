# Vercel Environment Setup for Shopify Integration

## Step-by-Step Instructions for Browser Automation

### 1. Navigate to Vercel Dashboard
```
URL: https://vercel.com/dashboard
```
- Log in to your Vercel account
- Find and click on your SEOLOGY project

### 2. Access Environment Variables
```
Click: Settings (tab at top)
Then: Environment Variables (left sidebar)
```

### 3. Add Shopify Client ID

**Click:** "Add New" button

**Field 1 - Key:**
```
SHOPIFY_CLIENT_ID
```

**Field 2 - Value:**
```
[Your Shopify Client ID from Shopify Partner Dashboard]
```

**Field 3 - Environment:**
- ✅ Check "Production"
- ✅ Check "Preview"
- ✅ Check "Development"

**Click:** "Save"

---

### 4. Add Shopify Client Secret

**Click:** "Add New" button

**Field 1 - Key:**
```
SHOPIFY_CLIENT_SECRET
```

**Field 2 - Value:**
```
[Your Shopify Client Secret from Shopify Partner Dashboard]
```

**Field 3 - Environment:**
- ✅ Check "Production"
- ✅ Check "Preview"
- ✅ Check "Development"

**Click:** "Save"

---

### 5. Add Encryption Key

**Click:** "Add New" button

**Field 1 - Key:**
```
ENCRYPTION_KEY
```

**Field 2 - Value:**
```
[Your generated encryption key - see local .env.local file]
```

**Field 3 - Environment:**
- ✅ Check "Production"
- ✅ Check "Preview"
- ✅ Check "Development"

**Click:** "Save"

---

### 6. Update NEXT_PUBLIC_APP_URL (if not already set)

**Check if exists:** Look for `NEXT_PUBLIC_APP_URL` in the list

**If it exists and is set to production URL:** Skip this step

**If it doesn't exist or is set to localhost:**

**Click:** "Add New" button (or "Edit" if it exists)

**Field 1 - Key:**
```
NEXT_PUBLIC_APP_URL
```

**Field 2 - Value:**
```
https://seology.ai
```

**Field 3 - Environment:**
- ✅ Check "Production"
- ✅ Check "Preview"
- ❌ Uncheck "Development" (keep localhost for dev)

**Click:** "Save"

---

### 7. Redeploy Application

**Go to:** Deployments tab (top of page)

**Find:** Latest deployment

**Click:** Three dots menu (•••) on the right

**Click:** "Redeploy"

**Confirm:** Click "Redeploy" in the popup

**Wait:** For deployment to complete (usually 1-2 minutes)

---

## Verification Steps

After deployment completes:

1. **Check deployment logs:**
   - Click on the completed deployment
   - Scroll through logs
   - Look for any errors related to environment variables

2. **Test the OAuth flow:**
   - Go to: `https://seology.ai/dashboard/sites/connect`
   - Select "Shopify"
   - Enter your test store URL
   - Click "Connect"
   - Should redirect to Shopify authorization

---

## Expected Result

✅ After completing these steps:
- Shopify OAuth will work on production
- Users can connect their Shopify stores
- AI chat can directly edit their stores
- Access tokens are encrypted and stored securely

---

## Troubleshooting

### If OAuth fails:
1. Check Vercel deployment logs for errors
2. Verify all environment variables are set correctly
3. Ensure no typos in the values
4. Make sure all three environments are checked (Production, Preview, Development)

### If "Connection failed" error:
1. Go back to Vercel → Environment Variables
2. Click "Edit" on each variable to verify values
3. Check for extra spaces or missing characters
4. Redeploy after fixing

---

## Shopify Dashboard Configuration

After Vercel setup, also configure your Shopify app:

### Go to: Shopify Partners Dashboard
```
URL: https://partners.shopify.com
```

### Navigate to your SEOLOGY app → Configuration

### Set App URL:
```
https://seology.ai
```

### Set Allowed redirection URLs:
```
https://seology.ai/api/auth/shopify/callback
https://seology.ai/api/auth/shopify/install
```

**Click:** Save

---

## Summary Checklist

- [ ] Added `SHOPIFY_CLIENT_ID` to Vercel
- [ ] Added `SHOPIFY_CLIENT_SECRET` to Vercel
- [ ] Added `ENCRYPTION_KEY` to Vercel
- [ ] Updated `NEXT_PUBLIC_APP_URL` (if needed)
- [ ] Redeployed application
- [ ] Verified deployment succeeded
- [ ] Updated Shopify app URLs in partner dashboard
- [ ] Tested OAuth flow on production

---

## Browser Automation Script (Pseudocode)

```
1. Navigate to "https://vercel.com/dashboard"
2. Wait for page load
3. Click on project name containing "seology"
4. Wait for project page
5. Click "Settings" tab
6. Click "Environment Variables" in sidebar
7. For each variable (SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET, ENCRYPTION_KEY):
   a. Click "Add New"
   b. Type key name in first field
   c. Type value in second field
   d. Check all three environment checkboxes
   e. Click "Save"
   f. Wait for success message
8. Click "Deployments" tab
9. Find latest deployment
10. Click three dots menu
11. Click "Redeploy"
12. Confirm redeploy
13. Wait for deployment completion
14. Report success
```

---

## Communication Format

After completing each step, report back:

**Success format:**
```
✅ Step [number] complete: [step name]
```

**Error format:**
```
❌ Step [number] failed: [error description]
```

**Example:**
```
✅ Step 3 complete: Added SHOPIFY_CLIENT_ID
✅ Step 4 complete: Added SHOPIFY_CLIENT_SECRET
✅ Step 5 complete: Added ENCRYPTION_KEY
✅ Step 7 complete: Redeployment triggered
```
