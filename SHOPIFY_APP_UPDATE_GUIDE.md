# Shopify App Configuration & Testing Guide

**For: Comet AI Browser**
**Task: Update SEOLOGY.AI Shopify app configuration and test all functionality**

---

## 🎯 Mission Overview

Update the SEOLOGY.AI Shopify app in the Partners dashboard with the latest deployment URLs and thoroughly test all pages to verify functionality.

---

## 📋 Prerequisites

**You'll need access to:**
- Shopify Partners account (partners.shopify.com)
- A Shopify development store for testing
- Browser DevTools (F12) for debugging

**Current App Details:**
- **App Name:** SEOLOGY.AI
- **Client ID:** `0b87ac78cf0783fd1dd829bf5421fae5`
- **Custom Domain:** `seology.ai` (production domain)
- **Vercel URL:** `seology-bcjzstgvn-iimagined.vercel.app` (Vercel default deployment URL)

---

## 🌐 Understanding the URLs

### Production Domains:
1. **Custom Domain (Primary):** `https://seology.ai`
   - This is the branded domain
   - Should be used for production once DNS is configured
   - Currently may or may not be active

2. **Vercel Default Domain:** `https://seology-bcjzstgvn-iimagined.vercel.app`
   - Always active and working
   - Use this for current testing
   - Auto-assigned by Vercel

### Which URL to Use?

**For immediate testing: Use the Vercel URL** (`seology-bcjzstgvn-iimagined.vercel.app`)

**For production launch: Use the custom domain** (`seology.ai`)

**Current recommendation:** Configure BOTH URLs in Shopify to ensure the app works regardless of which domain is used.

---

## 📝 Step-by-Step Instructions

### STEP 1: Access Shopify Partners Dashboard

1. Navigate to: `https://partners.shopify.com/`
2. Log in with your Shopify Partners credentials
3. Click **"Apps"** in the left sidebar
4. Locate and click on **"SEOLOGY.AI"** (or the app you created)

**Screenshot needed:** Partners dashboard with app list visible

---

### STEP 2: Navigate to App Configuration

1. Once inside the app, click **"Configuration"** tab (or "App setup")
2. You should see various configuration options including:
   - App URL
   - Allowed redirection URLs
   - OAuth settings
   - Embedded app settings

**Screenshot needed:** Configuration page showing all settings

---

### STEP 3: Update App URLs

Update these fields with BOTH domain options:

#### App URL:
```
https://seology-bcjzstgvn-iimagined.vercel.app/shopify
```

**Note:** This is the main entry point when users install/open the app from Shopify Admin.

#### Allowed Redirection URLs:
Add ALL of these (one per line):
```
https://seology-bcjzstgvn-iimagined.vercel.app/api/auth/shopify/callback
https://seology-bcjzstgvn-iimagined.vercel.app/*
https://seology.ai/api/auth/shopify/callback
https://seology.ai/*
```

**Why both domains?**
- Vercel URL: Currently active and working
- Custom domain: Future-proof for when seology.ai DNS is configured
- Wildcards (*): Allow all app routes to load within Shopify Admin

**Screenshot needed:** Redirection URLs field showing all 4 URLs added

---

### STEP 4: Verify OAuth Settings

Scroll to **"App credentials"** section:

1. **Client ID:** Should show `0b87ac78cf0783fd1dd829bf5421fae5`
2. **Client Secret:** Should be hidden (don't share in screenshots)
3. **Redirect URLs:** Verify the OAuth redirect URLs include both:
   - `https://seology-bcjzstgvn-iimagined.vercel.app/api/auth/shopify/callback`
   - `https://seology.ai/api/auth/shopify/callback`

**Screenshot needed:** OAuth settings (blur out the secret)

---

### STEP 5: Configure Embedded App Settings

Scroll to **"Embedded app"** section:

1. Toggle **"Embedded app"** to **ON** (should be enabled)
2. Verify these settings:
   - **Embedded in Shopify admin:** YES
   - **Frame ancestors:** Should allow Shopify Admin domains

**Why embedded?** SEOLOGY.AI runs inside the Shopify Admin interface, not as a standalone website.

**Screenshot needed:** Embedded app toggle showing ON

---

### STEP 6: Save Configuration

1. Scroll to the bottom of the page
2. Click **"Save"** button
3. Wait for confirmation message: "App settings saved"

**Screenshot needed:** Success message

---

### STEP 7: Install App on Development Store

Now test the app installation:

1. In the Shopify Partners dashboard, find **"Test your app"** or **"Select store"** button
2. Choose a **development store** to install on
3. Click **"Install app"**
4. You'll be redirected to Shopify Admin authorization page
5. Click **"Install"** to approve permissions

**Expected redirect:** `https://seology-bcjzstgvn-iimagined.vercel.app/shopify`

**Screenshot needed:**
- Store selection screen
- Authorization/permissions screen
- Final redirect to app

---

### STEP 8: Test All App Pages

Once installed, the app should open inside Shopify Admin. Test each route:

#### ✅ WORKING PAGES (Should Load Successfully):

1. **Products Page**
   - URL: `/shopify/products`
   - Should display: Product listing with Shopify products
   - Check for: Navigation bar, product grid, search/filter options
   - **Screenshot needed:** Full page view

2. **Images Page**
   - URL: `/shopify/images`
   - Should display: Image optimization interface
   - Check for: Image thumbnails, optimization controls
   - **Screenshot needed:** Full page view

3. **Onboarding Page**
   - URL: `/shopify/onboarding`
   - Should display: Multi-step onboarding wizard
   - Check for: Welcome screen, step indicators
   - **Screenshot needed:** Full page view

4. **Agents Simple Page** (Test page)
   - URL: `/shopify/agents-simple`
   - Should display: Simplified AI agent library
   - Check for: Agent template cards (5 templates)
   - **Screenshot needed:** Full page view

#### ❌ KNOWN BROKEN PAGE:

5. **Agents Page** (Main version)
   - URL: `/shopify/agents`
   - **Expected result:** Blue loading spinner, page never finishes loading
   - **Known issue:** Toast library (sonner) bug causing "c is not a function" error
   - **This is EXPECTED to fail** - we're documenting it for the fix
   - **Screenshot needed:** Stuck loading page + browser console errors

---

### STEP 9: Browser Console Checks

For EACH page you test, open Browser DevTools:

**How to open DevTools:**
- Windows/Linux: Press `F12` or `Ctrl+Shift+I`
- Mac: Press `Cmd+Option+I`

**What to check:**

1. **Console Tab:**
   - Look for errors (red text)
   - Look for warnings (yellow text)
   - Expected on Agents page: `"c is not a function"` error
   - Should be CLEAN on all other pages

2. **Network Tab:**
   - Check if requests are succeeding (green status codes: 200, 304)
   - Check if any requests fail (red status codes: 404, 500)
   - Look for the Shopify App Bridge script loading

**Screenshot needed for EACH page:**
- Console tab showing any errors/warnings
- Network tab showing request status

---

### STEP 10: Document Specific Checks

For each page, verify these specific elements:

#### Products Page (`/shopify/products`):
- [ ] Navigation bar visible at top
- [ ] "Products" heading visible
- [ ] Product cards/grid displays
- [ ] Search bar present
- [ ] Filter options available
- [ ] No console errors

#### Images Page (`/shopify/images`):
- [ ] Navigation bar visible
- [ ] "Images" heading visible
- [ ] Image thumbnails display
- [ ] Optimization controls present
- [ ] No console errors

#### Onboarding Page (`/shopify/onboarding`):
- [ ] Welcome message displays
- [ ] Step indicators (1, 2, 3...) visible
- [ ] "Next" or "Get Started" button present
- [ ] No console errors

#### Agents Simple Page (`/shopify/agents-simple`):
- [ ] Navigation bar visible
- [ ] "AI Agent Library (No Toast Test)" heading
- [ ] 5 agent template cards display
- [ ] Each card shows: icon, name, description, "Use Agent" button
- [ ] No console errors

#### Agents Page (`/shopify/agents`) - EXPECTED TO FAIL:
- [ ] Blue loading spinner appears
- [ ] Page never finishes loading
- [ ] Console shows: "c is not a function" error
- [ ] This is the KNOWN ISSUE being fixed

---

### STEP 11: Test Without Shopify Installation (Alternative)

If you can't complete the full Shopify installation, test directly:

1. Open browser
2. Navigate to these URLs directly:
   ```
   https://seology-bcjzstgvn-iimagined.vercel.app/shopify/products
   https://seology-bcjzstgvn-iimagined.vercel.app/shopify/images
   https://seology-bcjzstgvn-iimagined.vercel.app/shopify/onboarding
   https://seology-bcjzstgvn-iimagined.vercel.app/shopify/agents
   https://seology-bcjzstgvn-iimagined.vercel.app/shopify/agents-simple
   ```

**Note:** Some pages may show authentication errors without proper Shopify context. That's okay - just document what you see.

---

### STEP 12: Test Custom Domain (If Configured)

If the custom domain `seology.ai` is already configured with DNS:

1. Try accessing: `https://seology.ai/shopify/products`
2. Check if it redirects or loads properly
3. Test the same pages as with Vercel URL

**Document:**
- [ ] Does seology.ai resolve? (YES/NO)
- [ ] Does it load the app? (YES/NO)
- [ ] Any SSL certificate warnings? (YES/NO)
- [ ] Same functionality as Vercel URL? (YES/NO)

---

## 📊 Expected Test Results Summary

| Page | URL | Expected Result | Status |
|------|-----|----------------|--------|
| Products | `/shopify/products` | ✅ Loads with product list | Should PASS |
| Images | `/shopify/images` | ✅ Loads with image grid | Should PASS |
| Onboarding | `/shopify/onboarding` | ✅ Loads with wizard | Should PASS |
| Agents Simple | `/shopify/agents-simple` | ✅ Loads with 5 templates | Should PASS |
| Agents Main | `/shopify/agents` | ❌ Stuck on loading | Should FAIL (known) |

---

## 🐛 Known Issues & Troubleshooting

### Issue 1: Agents Page Stuck Loading
- **Error:** "c is not a function" in console
- **Cause:** Toast library (sonner) compatibility issue
- **Status:** Known bug, being fixed
- **Workaround:** Use `/shopify/agents-simple` instead

### Issue 2: "Refused to execute script" CSP Error
- **Error:** CSP violation in console
- **Cause:** Missing script source in Content Security Policy
- **Status:** FIXED in latest deployment
- **Should NOT appear** in current testing

### Issue 3: Shopify App Bridge Not Loading
- **Error:** "Shopify's App Bridge must be included..."
- **Cause:** Script tag missing or loading incorrectly
- **Status:** FIXED in latest deployment
- **Should NOT appear** in current testing

### Issue 4: Authentication Errors
- **Error:** Redirect to sign-in page
- **Cause:** Not properly installed in Shopify store OR missing `shop` parameter
- **Solution:** Ensure app is installed via Shopify Partners dashboard

---

## 📸 Screenshot Checklist

Please provide screenshots of:

1. [ ] Shopify Partners dashboard - App list
2. [ ] App configuration page - App URLs section
3. [ ] App configuration page - Allowed redirection URLs
4. [ ] App configuration page - OAuth credentials (blur secret)
5. [ ] App configuration page - Embedded app settings
6. [ ] Success message after saving
7. [ ] Store selection for installation
8. [ ] App authorization/permissions screen
9. [ ] Products page - Full view
10. [ ] Products page - Browser console
11. [ ] Images page - Full view
12. [ ] Images page - Browser console
13. [ ] Onboarding page - Full view
14. [ ] Onboarding page - Browser console
15. [ ] Agents simple page - Full view
16. [ ] Agents simple page - Browser console
17. [ ] Agents main page - Loading spinner
18. [ ] Agents main page - Console showing "c is not a function" error

---

## 📝 Report Template

After completing all steps, provide a summary report:

```markdown
# SEOLOGY.AI Shopify App Test Report

## Configuration Update
- [ ] App URLs updated successfully
- [ ] OAuth redirects configured
- [ ] Embedded app enabled
- [ ] Settings saved

## Installation Test
- [ ] App installed on development store
- [ ] Authorization completed
- [ ] Redirected to app successfully

## Page Testing Results

### Products Page
- Status: ✅ PASS / ❌ FAIL
- Loads correctly: YES / NO
- Console errors: NONE / [list errors]
- Notes: [any observations]

### Images Page
- Status: ✅ PASS / ❌ FAIL
- Loads correctly: YES / NO
- Console errors: NONE / [list errors]
- Notes: [any observations]

### Onboarding Page
- Status: ✅ PASS / ❌ FAIL
- Loads correctly: YES / NO
- Console errors: NONE / [list errors]
- Notes: [any observations]

### Agents Simple Page
- Status: ✅ PASS / ❌ FAIL
- Loads correctly: YES / NO
- Console errors: NONE / [list errors]
- Notes: [any observations]

### Agents Main Page
- Status: ✅ PASS / ❌ FAIL (Expected: FAIL)
- Stuck loading: YES / NO
- Error: "c is not a function" - YES / NO
- Notes: [any observations]

## Custom Domain Test (if applicable)
- seology.ai resolves: YES / NO / UNKNOWN
- seology.ai loads app: YES / NO / N/A
- SSL certificate valid: YES / NO / N/A

## Overall Assessment
- Working pages: [X] out of 5
- Critical issues: [list any unexpected failures]
- Known issues confirmed: [YES/NO]

## Recommendations
[Any suggestions or concerns]
```

---

## 🔗 Quick Reference Links

- **Shopify Partners Dashboard:** https://partners.shopify.com/
- **Shopify App Bridge Docs:** https://shopify.dev/docs/api/app-bridge
- **Current Deployment:** https://seology-bcjzstgvn-iimagined.vercel.app
- **Custom Domain:** https://seology.ai (may not be active yet)

---

## ⚠️ Important Notes

1. **Do NOT share Client Secret** in any screenshots or reports
2. **Use a development store** for testing, not a live production store
3. **The Agents page is EXPECTED to fail** - this is a known issue being fixed
4. **All other pages should work** - if they don't, that's a new issue to report
5. **Test on latest Chrome/Edge** for best compatibility

---

## 🎯 Success Criteria

The test is successful if:
- ✅ App configuration saved without errors
- ✅ App installs on development store
- ✅ Products page loads and displays products
- ✅ Images page loads and displays UI
- ✅ Onboarding page loads and displays wizard
- ✅ Agents simple page loads and displays 5 templates
- ❌ Agents main page fails (expected - known issue)
- ✅ No unexpected console errors on working pages

---

## 📞 Support

If you encounter unexpected issues or have questions:
- Document everything you see
- Take screenshots of all errors
- Note the exact steps that led to the issue
- Report back with detailed information

---

**End of Guide**
