# SEOLOGY.AI Shopify App - Deployment Guide

## Environment Variables Setup

### Required Variables (Copy to Vercel Dashboard)

```bash
# ==========================================
# DATABASE (Required)
# ==========================================
DATABASE_URL="postgresql://user:password@host:5432/seology"
# Get from: Railway.app, Supabase, Neon, or any PostgreSQL provider
# Example: postgresql://postgres:password@db.railway.app:5432/railway

# ==========================================
# CLERK AUTHENTICATION (Required)
# ==========================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."
# Get from: https://dashboard.clerk.com
# 1. Create new application
# 2. Copy API keys from "API Keys" tab
# 3. Create webhook endpoint for /api/webhooks/clerk

# ==========================================
# ANTHROPIC CLAUDE AI (Required)
# ==========================================
ANTHROPIC_API_KEY="sk-ant-..."
# Get from: https://console.anthropic.com/settings/keys
# Pricing: $3 per million input tokens, $15 per million output tokens

# ==========================================
# SHOPIFY OAUTH (Required)
# ==========================================
SHOPIFY_CLIENT_ID="0b87ac78cf0783fd1dd829bf5421fae5"
SHOPIFY_CLIENT_SECRET="..."
# Get from: https://partners.shopify.com/organizations
# 1. Create new app
# 2. Copy Client ID and Client Secret from "App Setup"
# Note: Client ID is already set, just need Secret

# ==========================================
# APP URL (Required)
# ==========================================
NEXT_PUBLIC_APP_URL="https://seology-ai.vercel.app"
# Your Vercel deployment URL (or custom domain)
# Used for: OAuth redirects, webhooks, absolute URLs

# ==========================================
# ENCRYPTION (Required)
# ==========================================
ENCRYPTION_KEY="32-character-random-string-here"
# Generate with: openssl rand -hex 16
# Or use: https://generate-random.org/encryption-key-generator

# ==========================================
# STRIPE BILLING (Required for production)
# ==========================================
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
# Get from: https://dashboard.stripe.com/apikeys
# Set up webhook: https://dashboard.stripe.com/webhooks
# Webhook endpoint: https://your-domain.com/api/billing/webhook

# ==========================================
# OPTIONAL: SENTRY ERROR MONITORING
# ==========================================
SENTRY_DSN="https://..."
SENTRY_ORG="your-org"
SENTRY_PROJECT="your-project"
SENTRY_AUTH_TOKEN="..."
# Get from: https://sentry.io
# Run: npx @sentry/wizard@latest -i nextjs

# ==========================================
# OPTIONAL: LOGGING
# ==========================================
LOG_LEVEL="info"
# Options: debug, info, warn, error
# Default: debug in dev, info in production

LOG_TO_DATABASE="false"
# Set to "true" to persist ERROR/CRITICAL logs to database
# Warning: Can fill up database quickly
```

---

## Deployment Steps

### 1. Deploy to Vercel (5 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 2. Set Environment Variables in Vercel Dashboard

Go to: https://vercel.com/your-project/settings/environment-variables

Add all variables from above ☝️

**CRITICAL:** After adding env vars, redeploy:
```bash
vercel --prod --force
```

### 3. Set Up Database (10 minutes)

**Option A: Railway (Recommended)**
1. Go to https://railway.app
2. Create new project → PostgreSQL
3. Copy DATABASE_URL from "Connect" tab
4. Add to Vercel env vars

**Option B: Supabase**
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from Settings → Database
4. Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

**Option C: Neon**
1. Go to https://neon.tech
2. Create new project
3. Copy connection string

**After database is set up:**
```bash
# Push database schema
npx prisma db push

# (Optional) Seed demo data
npm run db:seed
```

### 4. Configure Shopify Partner Dashboard (10 minutes)

Go to: https://partners.shopify.com/organizations

**4.1 Create Shopify App:**
1. Apps → Create app → Custom app
2. App name: "SEOLOGY.AI"
3. App URL: `https://your-domain.vercel.app`

**4.2 OAuth Configuration:**
- Allowed redirection URL(s):
  ```
  https://your-domain.vercel.app/api/auth/shopify/callback
  ```

**4.3 API Scopes (Access):**
- ✅ `read_products`
- ✅ `write_products`
- ✅ `read_content`
- ✅ `write_content`
- ✅ `read_themes`
- ✅ `write_themes`
- ✅ `read_online_store_pages`
- ✅ `write_online_store_pages`
- ✅ `read_locales`

**4.4 Webhook Subscriptions:**

Add these 3 webhooks:

| Event | URL | Format |
|-------|-----|--------|
| `products/update` | `https://your-domain.vercel.app/api/webhooks/shopify/products/update` | JSON |
| `products/delete` | `https://your-domain.vercel.app/api/webhooks/shopify/products/delete` | JSON |
| `app/uninstalled` | `https://your-domain.vercel.app/api/webhooks/shopify/app/uninstalled` | JSON |

**4.5 GDPR Webhooks (Required by Shopify):**

| Event | URL |
|-------|-----|
| `customers/data_request` | `https://your-domain.vercel.app/api/webhooks/shopify/gdpr/customers-data-request` |
| `customers/redact` | `https://your-domain.vercel.app/api/webhooks/shopify/gdpr/customers-redact` |
| `shop/redact` | `https://your-domain.vercel.app/api/webhooks/shopify/gdpr/shop-redact` |

**4.6 Get Client Secret:**
- Go to "App Setup" tab
- Copy "Client secret"
- Add to Vercel env vars as `SHOPIFY_CLIENT_SECRET`

### 5. Set Up Sentry (Optional - 15 minutes)

```bash
# Install Sentry
npm install @sentry/nextjs

# Run setup wizard
npx @sentry/wizard@latest -i nextjs

# Follow prompts, it will:
# 1. Create sentry.client.config.ts
# 2. Create sentry.server.config.ts
# 3. Update next.config.js
# 4. Add SENTRY_* env vars

# Commit changes
git add .
git commit -m "Add Sentry error monitoring"
git push

# Redeploy
vercel --prod
```

### 6. Testing Checklist

**Test OAuth Flow:**
1. Visit: `https://your-domain.vercel.app/dashboard/shopify`
2. Enter your development store domain (e.g., `dev-store.myshopify.com`)
3. Click "Connect Shopify Store"
4. Authorize on Shopify
5. Should redirect back to dashboard with store connected ✅

**Test AI Chat:**
1. Connected store should show in dashboard
2. Click on Quick Action: "Analyze All Products"
3. AI should analyze products and show results ✅

**Test Webhooks:**
1. Edit a product in Shopify admin
2. Check Vercel logs: `vercel logs --follow`
3. Should see webhook received and processed ✅

**Test Product Sync:**
1. Create new product in Shopify
2. Refresh SEOLOGY dashboard
3. New product should appear in analytics ✅

---

## Vercel Configuration

### vercel.json (Optional - Already optimized)

The app is already configured for Vercel. No changes needed.

Key features:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Edge caching
- ✅ Webhook support
- ✅ Database connections

### Performance Settings

In Vercel Dashboard → Settings → Functions:
- Region: Choose closest to your users (default: auto)
- Timeout: 10s (default) - increase if AI responses are slow

---

## Post-Deployment Monitoring

### 1. Vercel Logs
```bash
# Real-time logs
vercel logs --follow

# Filter by function
vercel logs --follow --filter=/api/chat

# Last 100 logs
vercel logs --tail 100
```

### 2. Sentry Dashboard
- Go to: https://sentry.io/organizations/your-org/issues/
- Monitor errors in real-time
- Set up alerts for critical errors

### 3. Database Monitoring
```bash
# Open Prisma Studio
npx prisma studio

# View connections, users, products, etc.
```

### 4. Shopify Partner Dashboard
- Go to: https://partners.shopify.com
- Analytics → Your App
- Monitor installs, API usage, errors

---

## Troubleshooting

### "ANTHROPIC_API_KEY is not configured"
- ✅ Add `ANTHROPIC_API_KEY` to Vercel env vars
- ✅ Redeploy: `vercel --prod --force`

### "Invalid shop domain"
- ✅ Check domain format: `store.myshopify.com`
- ✅ Don't include `https://`

### "OAuth callback failed"
- ✅ Check `NEXT_PUBLIC_APP_URL` matches your domain
- ✅ Check Shopify Partner Dashboard has correct callback URL
- ✅ Check `SHOPIFY_CLIENT_SECRET` is set

### Webhooks not receiving
- ✅ Check webhook URLs in Shopify Partner Dashboard
- ✅ Verify URLs match your Vercel domain
- ✅ Check Vercel logs: `vercel logs --follow`
- ✅ Test webhook: Shopify Partner Dashboard → Webhooks → Send test event

### Database connection issues
- ✅ Check `DATABASE_URL` is correct
- ✅ Run `npx prisma db push` to sync schema
- ✅ Check database provider dashboard for connection limits

---

## Security Checklist

- [x] All access tokens encrypted with AES-256-GCM
- [x] Webhook HMAC signature verification
- [x] CSRF tokens for OAuth
- [x] Clerk authentication on all protected routes
- [x] Rate limiting on API routes
- [x] Sensitive data redacted in logs
- [x] HTTPS only (enforced by Vercel)
- [x] Environment variables stored securely in Vercel

---

## Cost Estimation

**Monthly costs for 100 active users:**

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Pro | $20 | Includes: Unlimited bandwidth, 1000GB/month |
| PostgreSQL (Railway) | $5 | 500MB storage |
| Clerk Auth | $25 | 5000 MAU (Monthly Active Users) |
| Anthropic Claude API | ~$50 | ~1000 AI chat requests/month |
| Stripe (optional) | 2.9% + $0.30 | Per transaction |
| Sentry (optional) | Free | Up to 5k errors/month |
| **TOTAL** | **~$100/mo** | For 100 users |

**Free tier (development):**
- Vercel: Free (no custom domain)
- Railway: $5/month
- Clerk: 10,000 MAU free
- Anthropic: Pay-as-you-go
- Sentry: Free tier (5k events/month)

---

## Production Launch Checklist

- [ ] All environment variables set in Vercel
- [ ] Database schema pushed: `npx prisma db push`
- [ ] Sentry configured and tested
- [ ] Shopify Partner Dashboard webhooks configured
- [ ] OAuth tested with development store
- [ ] AI chat tested with real products
- [ ] Webhooks tested (edit product, delete product)
- [ ] Stripe connected (if monetizing)
- [ ] Custom domain connected (optional)
- [ ] Privacy policy page live
- [ ] Terms of service page live
- [ ] Contact/support email configured

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Shopify App Docs:** https://shopify.dev/docs/apps
- **Clerk Docs:** https://clerk.com/docs
- **Anthropic API Docs:** https://docs.anthropic.com
- **Prisma Docs:** https://www.prisma.io/docs

---

## Quick Deploy Command

```bash
# Generate encryption key
export ENCRYPTION_KEY=$(openssl rand -hex 16)

# Deploy to Vercel (will prompt for other env vars)
vercel --prod

# Push database schema
npx prisma db push

# Open deployed app
vercel open
```

**Your app will be live at:** `https://your-project.vercel.app` 🚀
