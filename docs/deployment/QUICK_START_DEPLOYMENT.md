# SEOLOGY.AI - Quick Start Deployment Guide

**Goal:** Get SEOLOGY.AI live in production in 2-3 hours

**Current Status:** Code ready, DNS configured, NOT deployed to Vercel yet

---

## Pre-Flight Checklist (5 minutes)

Before starting, gather these items:

- [ ] GitHub account with repo access
- [ ] Vercel account (sign up at vercel.com if needed)
- [ ] Credit card for database provider (or use free tier)
- [ ] Email access for verification codes

---

## Step 1: Database Setup (15 minutes)

### Option A: Supabase (Recommended - Has Free Tier)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - Name: `seology-production`
   - Database Password: Generate strong password (save it!)
   - Region: Choose closest to your users
   - Pricing: Free tier is fine for now
6. Wait 2 minutes for database to provision
7. Go to Settings → Database
8. Copy "Connection string" (URI format)
9. Replace `[YOUR-PASSWORD]` with actual password
10. **Save this as DATABASE_URL** - You'll need it in Step 3

Example: `postgresql://postgres:yourpassword@db.xyz.supabase.co:5432/postgres`

### Option B: Railway (Alternative)

1. Go to https://railway.app
2. Sign in with GitHub
3. New Project → Provision PostgreSQL
4. Copy DATABASE_URL from Variables tab

---

## Step 2: Collect API Keys (20 minutes)

### 2.1 Clerk (Authentication)

1. Go to https://dashboard.clerk.com
2. Sign in or create account
3. Click "+ Create application"
4. Name: `SEOLOGY Production`
5. Sign-in options: Enable Email/Password
6. Click "Create application"
7. You'll see API keys on next screen:
   - Copy **Publishable key** → Save as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy **Secret key** → Save as `CLERK_SECRET_KEY`
8. Go to "Domains" in sidebar
9. Add production domain: `seology.ai`
10. Leave dashboard open (you'll add webhook later)

### 2.2 Anthropic Claude (AI)

1. Go to https://console.anthropic.com
2. Sign in or create account
3. Go to "API Keys" in sidebar
4. Click "Create Key"
5. Name: `SEOLOGY Production`
6. Copy key → Save as `ANTHROPIC_API_KEY`
   - Starts with `sk-ant-api03-...`

### 2.3 Stripe (Payments)

1. Go to https://dashboard.stripe.com
2. Sign in or create account
3. Toggle "Test mode" OFF (top right) - we want LIVE keys
4. Go to Developers → API Keys
5. Copy:
   - **Secret key** → Save as `STRIPE_SECRET_KEY` (starts with `sk_live_...`)
   - **Publishable key** → Save as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with `pk_live_...`)
6. Leave dashboard open (you'll configure webhook later)

NOTE: You can use test keys (`sk_test_...`) initially and switch to live later.

### 2.4 Generate Security Keys

**On Mac/Linux:**
```bash
# Generate encryption key
openssl rand -base64 32

# Generate cron secret
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
# Encryption key
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Cron secret
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Or use online generator:**
https://generate-secret.vercel.app/32

Save as:
- First one → `ENCRYPTION_KEY`
- Second one → `CRON_SECRET`

### Environment Variables Checklist

You should now have:

- [ ] `DATABASE_URL` (from Supabase/Railway)
- [ ] `CLERK_SECRET_KEY` (from Clerk)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (from Clerk)
- [ ] `ANTHROPIC_API_KEY` (from Anthropic)
- [ ] `STRIPE_SECRET_KEY` (from Stripe)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (from Stripe)
- [ ] `ENCRYPTION_KEY` (generated)
- [ ] `CRON_SECRET` (generated)

Keep these in a text file - you'll paste them into Vercel next.

---

## Step 3: Deploy to Vercel (20 minutes)

### 3.1 Import Project

1. Go to https://vercel.com/dashboard
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Find your GitHub repo in the list
   - If not visible, click "Adjust GitHub App Permissions"
5. Click "Import" next to the repo
6. **STOP - Don't click Deploy yet!**

### 3.2 Add Environment Variables

1. Expand "Environment Variables" section
2. Add each variable:
   - Key: `DATABASE_URL`
   - Value: (paste your PostgreSQL URL)
   - Environments: Check "Production" (and optionally Preview/Development)
   - Click "Add"

3. Repeat for ALL 8 variables from Step 2

4. Add one more:
   - Key: `NEXT_PUBLIC_APP_URL`
   - Value: `https://seology.ai`
   - Environments: Production
   - Click "Add"

**Quick paste template:**
```
DATABASE_URL = <your-postgres-url>
CLERK_SECRET_KEY = sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_live_...
ANTHROPIC_API_KEY = sk-ant-api03-...
STRIPE_SECRET_KEY = sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
ENCRYPTION_KEY = <32-char-key>
CRON_SECRET = <32-char-secret>
NEXT_PUBLIC_APP_URL = https://seology.ai
```

### 3.3 Configure Build Settings

1. Framework Preset: Should auto-detect "Next.js" - leave it
2. Build Command: Should show `prisma generate && next build` - leave it
3. Output Directory: `.next` - leave it
4. Install Command: `npm install` - leave it

### 3.4 Deploy!

1. Click "Deploy"
2. Wait 5-10 minutes
3. Watch build logs

**What to expect:**
- Installing dependencies... (2 min)
- Running build... (3-5 min)
- Uploading build outputs... (1 min)
- Should end with "✓ Build successful"

**If build fails:**
- Read error message carefully
- Most common: Missing env var (go back to 3.2)
- Check "Function Logs" tab for details

### 3.5 Initial Deployment URL

Once deployed, Vercel gives you a URL like:
`https://your-project-abc123.vercel.app`

**Test it:**
```bash
curl https://your-project-abc123.vercel.app/api/health
```

Should return JSON with "status": "unhealthy" (database not initialized yet).

---

## Step 4: Configure Custom Domains (15 minutes)

### 4.1 Add Domains to Vercel

1. In Vercel project, go to Settings → Domains
2. Add domain: `seology.ai`
   - Type: `seology.ai`
   - Click "Add"
3. Add domain: `www.seology.ai`
   - Type: `www.seology.ai`
   - Click "Add"
4. Add domain: `app.seology.ai`
   - Type: `app.seology.ai`
   - Click "Add"

### 4.2 Verify DNS Configuration

Vercel will check your DNS records. Based on DNS_FIX_ACTIONS.md, you should have:

**Root domain (seology.ai):**
- Type: A
- Name: @
- Value: 76.76.21.21 (Vercel's IP)

**WWW subdomain:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

**App subdomain:**
- Type: CNAME
- Name: app
- Value: cname.vercel-dns.com

**If Vercel shows "Invalid Configuration":**
1. Follow DNS_FIX_ACTIONS.md to fix DNS
2. Wait 15-30 minutes for propagation
3. Click "Refresh" in Vercel

**If Vercel shows "Valid Configuration":**
- Great! SSL certificates will auto-provision in 5-10 minutes
- Domains will be accessible soon

### 4.3 Check SSL Certificates

1. Wait 5-10 minutes
2. Visit https://seology.ai
3. Should see padlock in browser (SSL working)
4. If you see certificate error, wait a bit longer

---

## Step 5: Initialize Database (10 minutes)

### 5.1 Install Vercel CLI (Local Computer)

```bash
npm install -g vercel
```

### 5.2 Link Project and Pull Env Vars

```bash
# Navigate to project folder
cd "c:\Users\manna\Downloads\iimagined.webflow (1)"

# Login to Vercel
vercel login

# Link to your Vercel project
vercel link

# Pull environment variables
vercel env pull .env.local
```

### 5.3 Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates all tables)
npx prisma db push
```

Expected output:
```
Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

### 5.4 Verify Database

**Option A: Prisma Studio**
```bash
npx prisma studio
```
Opens browser - you should see all tables (empty).

**Option B: Test health endpoint**
```bash
curl https://seology.ai/api/health
```

Should now return:
```json
{
  "status": "healthy",
  "services": {
    "api": "operational",
    "database": "operational"
  }
}
```

---

## Step 6: Configure Webhooks (10 minutes)

### 6.1 Stripe Webhook

1. Go back to Stripe Dashboard
2. Developers → Webhooks
3. Click "Add endpoint"
4. Endpoint URL: `https://seology.ai/api/billing/webhook`
5. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click "Add endpoint"
7. Click on the webhook you just created
8. Reveal "Signing secret"
9. Copy it (starts with `whsec_...`)
10. Go to Vercel → Settings → Environment Variables
11. Add new variable:
    - Key: `STRIPE_WEBHOOK_SECRET`
    - Value: (paste signing secret)
    - Environment: Production
12. Redeploy: Vercel → Deployments → ... → Redeploy

### 6.2 Clerk Webhook (Optional)

1. Go back to Clerk Dashboard
2. Webhooks → Add Endpoint
3. Endpoint URL: `https://seology.ai/api/webhooks/clerk`
4. Subscribe to events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Copy signing secret
6. Add to Vercel as `CLERK_WEBHOOK_SECRET`
7. Redeploy

---

## Step 7: Final Testing (15 minutes)

### 7.1 Test Public Pages

**Landing Page:**
```bash
open https://seology.ai
```
- Should load homepage
- No console errors

**API Docs:**
```bash
open https://seology.ai/docs
```
- Should load Swagger UI
- Shows API endpoints

**Health Check:**
```bash
curl https://seology.ai/api/health
```
- Returns "status": "healthy"
- Both services "operational"

### 7.2 Test Authentication

1. Go to https://seology.ai/sign-up
2. Create account with real email
3. Should receive verification email
4. Complete sign-up
5. Should redirect to https://seology.ai/dashboard/onboarding

### 7.3 Test User Dashboard

1. Complete onboarding wizard
2. Should land on https://seology.ai/dashboard
3. Check:
   - No console errors
   - User name shows in top right
   - Navigation works

### 7.4 Test All Domain Variants

```bash
# All should work
curl -I https://seology.ai
curl -I https://www.seology.ai
curl -I https://app.seology.ai
```

All should return `200 OK` or `308` (redirect).

---

## Step 8: Verify Cron Jobs (5 minutes)

1. Go to Vercel → Project → Cron
2. Should see 3 cron jobs:
   - `/api/cron/backup` - Daily 3 AM
   - `/api/cron/cleanup` - Daily 2 AM
   - `/api/cron/reset-usage` - Monthly 1st
3. Each should show "Scheduled"
4. Click one → "Trigger" to test
5. Check logs for successful execution

---

## Step 9: Monitor First 24 Hours

### Check Every Few Hours:

1. **Vercel Logs:**
   - Vercel → Logs tab
   - Filter by "Errors"
   - Should be empty or minimal

2. **Database Usage:**
   - Supabase → Database → Database usage
   - Should show connected, low usage

3. **User Signups:**
   - Test creating another account
   - Check Clerk dashboard for user count

4. **Error Monitoring:**
   - Vercel → Analytics → Errors
   - Investigate any 500 errors

---

## Success Criteria

Your deployment is successful when:

- [ ] https://seology.ai loads homepage
- [ ] https://seology.ai/docs shows Swagger UI
- [ ] https://seology.ai/api/health returns healthy status
- [ ] Can sign up at https://seology.ai/sign-up
- [ ] New users can complete onboarding
- [ ] Dashboard loads after login
- [ ] All 3 domains (seology.ai, www, app) work
- [ ] SSL certificates valid for all domains
- [ ] No errors in Vercel logs
- [ ] Stripe webhook responding
- [ ] Cron jobs scheduled in Vercel

---

## Troubleshooting Quick Reference

### Build Fails
**Check:**
- Environment variables all set?
- Correct values (no quotes around them)?
- Redeploy with fresh cache (disable cache checkbox)

### Database Connection Error
**Check:**
- DATABASE_URL correct?
- Database running?
- Run `npx prisma db push` locally to initialize schema

### Clerk Auth Not Working
**Check:**
- Both Clerk keys set?
- Keys match (from same Clerk application)?
- Production domain added to Clerk allowed domains?

### 500 Error on Pages
**Check:**
- Vercel Function Logs for specific error
- Missing env var? Add it and redeploy
- Stripe key issue? Verify it's set correctly

### Domain Not Resolving
**Check:**
- DNS propagation: https://dnschecker.org
- Wait 30 minutes after DNS changes
- Click "Refresh" in Vercel Domains page

---

## What's Next?

After successful deployment:

### Immediate (Today):
1. Update Clerk settings (branding, email templates)
2. Configure Stripe products and pricing
3. Test Shopify connection (if using)
4. Invite team members

### This Week:
1. Set up error monitoring (Sentry/LogRocket)
2. Configure email templates (Resend)
3. Test all critical user flows
4. Create admin account and test admin panel

### Ongoing:
1. Monitor error logs daily
2. Review usage metrics weekly
3. Scale database if needed
4. Optimize performance based on real usage

---

## Support Resources

**If stuck:**
1. Check DEPLOYMENT_DIAGNOSIS_REPORT.md (detailed troubleshooting)
2. Check Vercel Status: https://www.vercel-status.com
3. Supabase Status: https://status.supabase.com
4. Clerk Status: https://status.clerk.com

**Documentation:**
- Vercel: https://vercel.com/docs
- Prisma: https://www.prisma.io/docs
- Clerk: https://clerk.com/docs
- Stripe: https://stripe.com/docs

---

## Deployment Time Tracker

- [ ] Step 1: Database (15 min)
- [ ] Step 2: API Keys (20 min)
- [ ] Step 3: Vercel Deploy (20 min)
- [ ] Step 4: Custom Domains (15 min)
- [ ] Step 5: Init Database (10 min)
- [ ] Step 6: Webhooks (10 min)
- [ ] Step 7: Testing (15 min)
- [ ] Step 8: Cron Jobs (5 min)
- [ ] Step 9: Monitoring (ongoing)

**Total Time: ~2 hours** (plus DNS propagation wait time)

---

Good luck with your deployment!

Remember: Take it step by step. Don't skip environment variables. Test after each major step.
