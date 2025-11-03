# Comet AI Browser - Vercel Deployment Checklist

## ❌ Current Error on Vercel
```
Error: Neither apiKey nor config.authenticator provided
at /vercel/path0/.next/server/app/api/billing/portal/route.js
```

**Cause**: Stripe API key is not available during Vercel build process.

**Fix Status**: ✅ Code fix committed to GitHub (commit: bc0fa4e)

---

## 🤖 Tasks for Comet

### 1. Verify Latest Code is Deployed

**Navigate to**: https://vercel.com/[your-project]

**Check**:
- [ ] Is the latest commit `bc0fa4e` deployed?
- [ ] Deployment status: Success or Failed?
- [ ] Build logs show "Stripe initialization" fix?

**If not latest commit**:
```
ACTION: Trigger new deployment from main branch
- Click "Deployments" tab
- Click "Redeploy" on latest commit
- Select "Use existing Build Cache: NO" (force fresh build)
```

---

### 2. Verify Environment Variables

**Navigate to**: Vercel Dashboard → Settings → Environment Variables

**Required Variables** (check if ALL are set):

#### Critical (Must Have)
- [ ] `STRIPE_SECRET_KEY` = `sk_live_...` or `sk_test_...`
- [ ] `DATABASE_URL` = PostgreSQL connection string
- [ ] `CLERK_SECRET_KEY` = `sk_live_...` or `sk_test_...`
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_live_...` or `pk_test_...`
- [ ] `ANTHROPIC_API_KEY` = `sk-ant-api03-...`

#### Important
- [ ] `ENCRYPTION_KEY` = 32-character random string
- [ ] `CRON_SECRET` = Random secure string
- [ ] `NEXT_PUBLIC_APP_URL` = Your production URL

#### Optional
- [ ] `RESEND_API_KEY` = Email service key
- [ ] `SHOPIFY_CLIENT_SECRET` = Shopify OAuth secret
- [ ] `STRIPE_WEBHOOK_SECRET` = Stripe webhook secret

**If ANY are missing**:
```
ACTION: Add missing environment variables
- Click "Add New" button
- Enter variable name and value
- Select "Production" environment
- Click "Save"
- IMPORTANT: Redeploy after adding variables!
```

---

### 3. Check Build Logs

**Navigate to**: Vercel Dashboard → Deployments → [Latest] → Build Logs

**Look for**:
- [ ] ✅ "Compiled successfully"
- [ ] ✅ "50 routes" or "Generating static pages (19/19)"
- [ ] ❌ Any errors mentioning "Stripe" or "apiKey"

**If errors found**:
```
Screenshot the error
Copy full error message
Report back with details
```

---

### 4. Test Deployment

**After successful deployment, test these URLs**:

#### Health Check
- [ ] `https://[your-domain]/api/health` → Should return JSON
- [ ] `https://[your-domain]/docs` → Swagger UI should load

#### Pages
- [ ] `https://[your-domain]/` → Landing page loads
- [ ] `https://[your-domain]/sign-in` → Clerk sign-in page
- [ ] `https://[your-domain]/dashboard` → Should redirect to sign-in

**If any fail**:
```
Take screenshot
Note the error message
Check browser console for errors
```

---

### 5. Force Fresh Build (If Still Failing)

**Steps**:
1. Go to Vercel Dashboard → Settings → General
2. Scroll to "Build & Development Settings"
3. Click "Override" on Framework Preset
4. Clear any custom build commands
5. Go to Deployments
6. Click "..." menu on latest deployment
7. Click "Redeploy"
8. **IMPORTANT**: Uncheck "Use existing Build Cache"
9. Click "Redeploy"

---

### 6. Check Runtime Logs (If Deployed but Errors at Runtime)

**Navigate to**: Vercel Dashboard → Logs (Runtime Logs tab)

**Filter by**: Last 1 hour

**Look for**:
- [ ] Errors mentioning "Stripe"
- [ ] "STRIPE_SECRET_KEY is not defined"
- [ ] Database connection errors
- [ ] Clerk authentication errors

**If errors found**:
```
Copy full error stack trace
Note timestamp
Check which endpoint is failing
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Stripe API key" error persists
**Solution**:
1. Verify `STRIPE_SECRET_KEY` is set in Production environment
2. Value should start with `sk_live_` or `sk_test_`
3. Redeploy with fresh build (no cache)

### Issue 2: Build succeeds but runtime errors
**Solution**:
1. Check Runtime Logs in Vercel
2. Ensure ALL environment variables are set for Production
3. Test locally with `npm run build && npm start`

### Issue 3: "Database connection" errors
**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check database is accessible from Vercel's IP ranges
3. Run `npx prisma generate` might be needed

### Issue 4: Old deployment keeps showing
**Solution**:
1. Clear Vercel build cache
2. Redeploy from GitHub (push new commit)
3. Check "Production" branch is set to `main`

---

## ✅ Success Checklist

Deployment is successful when:
- [ ] Latest commit (bc0fa4e or newer) is deployed
- [ ] Build logs show "Compiled successfully"
- [ ] 50 routes are generated
- [ ] All environment variables are set
- [ ] `/docs` page loads successfully
- [ ] No errors in Runtime Logs
- [ ] Can access landing page
- [ ] Can access sign-in page

---

## 📋 Report Template for Comet

When reporting back, use this format:

```
VERCEL DEPLOYMENT STATUS:

✅ Latest Commit Deployed: [Yes/No - commit hash]
✅ Build Status: [Success/Failed]
✅ Environment Variables: [X/15 set]
❌ Errors Found: [Yes/No - paste error if yes]

MISSING ENV VARS:
- Variable 1
- Variable 2

BUILD LOGS SUMMARY:
[Paste relevant lines]

RUNTIME ERRORS:
[Paste if any]

NEXT STEPS NEEDED:
1. [Action 1]
2. [Action 2]
```

---

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/anyrxo/seology
- **Latest Commit**: bc0fa4e (Stripe fix)
- **Deployment Docs**: See DEPLOYMENT.md in repo

---

## ⚡ Quick Fix Commands

If you have Vercel CLI access:

```bash
# Pull latest environment variables
vercel env pull

# Force redeploy
vercel --prod --force

# Check deployment status
vercel inspect [deployment-url]
```

---

**Last Updated**: After commit bc0fa4e (Stripe lazy initialization fix)
