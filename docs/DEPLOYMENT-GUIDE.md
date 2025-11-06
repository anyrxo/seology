# SEOLOGY.AI Shopify App - Deployment Guide

Complete step-by-step guide for deploying the SEOLOGY.AI Shopify app to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Database Setup](#database-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Shopify Partner Dashboard Configuration](#shopify-partner-dashboard-configuration)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- **GitHub Repository**: Code pushed to a GitHub repository
- **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
- **Shopify Partner Account**: Sign up at [partners.shopify.com](https://partners.shopify.com)
- **PostgreSQL Database**: Recommended providers:
  - [Supabase](https://supabase.com) (Free tier available)
  - [Railway](https://railway.app) (Free tier available)
  - [Neon](https://neon.tech) (Free tier available)
  - [Vercel Postgres](https://vercel.com/storage/postgres) (Paid)
- **Anthropic API Key**: Get from [console.anthropic.com](https://console.anthropic.com)
- **Domain Name**: Custom domain (optional but recommended)
- **Clerk Account**: Sign up at [clerk.com](https://clerk.com) for admin auth (optional)
- **Stripe Account**: For billing features (optional)

---

## Environment Variables

### Required Variables

All environment variables must be configured in Vercel before deployment.

#### Database

```bash
# PostgreSQL connection string (from your database provider)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Direct database URL (some providers require this for migrations)
DIRECT_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

**How to get**:
- **Supabase**: Project Settings → Database → Connection String (URI)
- **Railway**: Database → Connect → Connection URL
- **Neon**: Connection Details → Connection String

#### Anthropic Claude AI

```bash
# Your Anthropic API key
ANTHROPIC_API_KEY="sk-ant-api03-xxx..."
```

**How to get**:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

**Cost estimate**: $3 per 1M input tokens, $15 per 1M output tokens for Claude 3.5 Sonnet

#### Shopify OAuth

```bash
# Shopify app credentials (from Partner Dashboard)
SHOPIFY_CLIENT_ID="your_shopify_client_id"
SHOPIFY_CLIENT_SECRET="your_shopify_client_secret"
```

**How to get**:
1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Apps → Create app → Create app manually
3. After creation, go to Configuration
4. Copy "Client ID" and "Client secret"

**IMPORTANT**: Do not commit these to version control!

#### Security Keys

```bash
# Encryption key for storing Shopify access tokens
# MUST be exactly 32 characters
ENCRYPTION_KEY="your_32_character_encryption_key"

# Secret for protecting cron job endpoints
CRON_SECRET="your_random_cron_secret_here"
```

**How to generate**:

```bash
# Encryption key (32 characters, base64)
openssl rand -base64 32

# Cron secret (any random string)
openssl rand -hex 32
```

#### App URL

```bash
# Your production URL (update after Vercel deployment)
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
```

**Update this after deployment** with your Vercel URL or custom domain.

### Optional Variables (Recommended)

#### Clerk Authentication (for admin dashboard)

```bash
# Clerk configuration (for admin auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_xxx..."
CLERK_SECRET_KEY="sk_live_xxx..."
CLERK_WEBHOOK_SECRET="whsec_xxx..."

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard/onboarding"
```

**How to get**:
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy API keys from Dashboard → API Keys
4. Configure webhook endpoint for user sync

**Note**: Required only if you want an admin dashboard with user management.

#### Stripe Billing (for subscription features)

```bash
# Stripe configuration (for billing)
STRIPE_SECRET_KEY="sk_live_xxx..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_xxx..."
STRIPE_WEBHOOK_SECRET="whsec_xxx..."
```

**How to get**:
1. Sign up at [stripe.com](https://stripe.com)
2. Get API keys from Developers → API keys
3. Set up webhook endpoint: `/api/billing/webhook`

**Note**: Required only if you want to charge users.

### Environment Variable Checklist

Before deploying, verify you have:

- [ ] `DATABASE_URL` (PostgreSQL connection)
- [ ] `DIRECT_URL` (Direct database connection)
- [ ] `ANTHROPIC_API_KEY` (Claude AI)
- [ ] `SHOPIFY_CLIENT_ID` (Shopify OAuth)
- [ ] `SHOPIFY_CLIENT_SECRET` (Shopify OAuth)
- [ ] `ENCRYPTION_KEY` (32 characters)
- [ ] `CRON_SECRET` (Random secret)
- [ ] `NEXT_PUBLIC_APP_URL` (Your production URL)

Optional:
- [ ] Clerk variables (if using admin auth)
- [ ] Stripe variables (if using billing)

---

## Database Setup

### Step 1: Create PostgreSQL Database

Choose a provider and create a new PostgreSQL database:

**Supabase** (Recommended for free tier):
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to provision (~2 minutes)
4. Go to Project Settings → Database
5. Copy "Connection string" (URI format)
6. Replace `[YOUR-PASSWORD]` with your database password

**Railway**:
1. Go to [railway.app](https://railway.app)
2. New Project → Provision PostgreSQL
3. Copy connection URL from Variables tab

**Neon**:
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy connection string from Connection Details

### Step 2: Configure Database URL

Add to your `.env.local` (for local testing) or Vercel environment variables:

```bash
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
DIRECT_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

**Important**: Ensure `?sslmode=require` is appended for secure connections.

### Step 3: Initialize Database Schema

Run these commands locally (requires Node.js 18+):

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database (creates all tables)
npx prisma db push

# Verify tables were created
npx prisma studio
```

This will create 35+ database tables for the app.

### Step 4: Seed Initial Data (Optional)

```bash
# Seed demo data (optional)
npm run db:seed
```

This creates sample agents and system templates.

### Database Migration Strategy

For production:

1. **Never** use `prisma db push` in production (destructive)
2. **Always** use migrations for schema changes:

```bash
# Create a migration
npx prisma migrate dev --name your_migration_name

# Apply migrations to production
npx prisma migrate deploy
```

3. Set up automated backups with your database provider
4. Keep rollback scripts for critical schema changes

---

## Vercel Deployment

### Step 1: Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the repository containing SEOLOGY.AI

### Step 2: Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

**Important**: The custom build command `npm run vercel-build` includes:
- `prisma generate` (generates Prisma client)
- `next build` (builds Next.js app)
- `node prisma/init-db.js` (initializes database)

### Step 3: Add Environment Variables

In Vercel project settings:

1. Go to Settings → Environment Variables
2. Add all required variables from the [Environment Variables](#environment-variables) section
3. Set environment for each:
   - **Production**: Live environment
   - **Preview**: PR preview deployments
   - **Development**: Local dev (optional)

**Tip**: Use Vercel CLI to bulk import:

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Add environment variables from .env file
vercel env pull .env.production
```

### Step 4: Configure Cron Jobs

The app uses Vercel Cron for background automation.

1. Verify `vercel.json` contains:

```json
{
  "buildCommand": "npm run vercel-build",
  "crons": [
    {
      "path": "/api/cron/auto-scan",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

2. This runs automation every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)

3. Cron jobs are automatically enabled on deployment

**Cron Schedule Options**:
- `0 */6 * * *` - Every 6 hours (default)
- `0 0 * * *` - Daily at midnight UTC
- `0 9 * * *` - Daily at 9 AM UTC
- `0 */1 * * *` - Every hour

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Vercel will provide a production URL (e.g., `your-app.vercel.app`)
4. **Update `NEXT_PUBLIC_APP_URL`** environment variable with this URL
5. Redeploy to apply the change

### Step 6: Add Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain (e.g., `seology.ai`)
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to provision (~10 minutes)
5. Update `NEXT_PUBLIC_APP_URL` with custom domain
6. Redeploy

---

## Shopify Partner Dashboard Configuration

### Step 1: Create Shopify App

1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Navigate to Apps → Create app
3. Select "Create app manually"
4. Enter app name: **SEOLOGY.AI**
5. Click "Create app"

### Step 2: Configure App URLs

In the Configuration tab:

**App URL**:
```
https://your-app.vercel.app/shopify/dashboard
```

**Allowed redirection URL(s)**:
```
https://your-app.vercel.app/api/auth/shopify/callback
https://your-app.vercel.app/api/auth/callback
https://your-app.vercel.app/shopify/dashboard
```

**Important**: Replace `your-app.vercel.app` with your actual domain.

### Step 3: Configure API Scopes

In Configuration → API access scopes, enable:

**Required scopes**:
- `read_products` - Read product data
- `write_products` - Update product SEO fields
- `read_content` - Read content (blog posts, pages)
- `write_content` - Update content SEO
- `read_themes` - Read theme assets
- `write_themes` - Update theme liquid files (for schema.org injection)

**Optional but recommended**:
- `read_orders` - Revenue tracking for ROI calculations
- `read_analytics` - Traffic data integration

Click "Save" to apply scopes.

### Step 4: Set Up Webhooks

Webhooks keep the app synchronized with Shopify events.

In Configuration → Webhooks, add:

**App lifecycle webhooks** (mandatory for app store):

| Event | URL |
|-------|-----|
| `app/uninstalled` | `https://your-app.vercel.app/api/webhooks/shopify` |

**Product webhooks** (automatic sync):

| Event | URL |
|-------|-----|
| `products/create` | `https://your-app.vercel.app/api/webhooks/shopify` |
| `products/update` | `https://your-app.vercel.app/api/webhooks/shopify` |
| `products/delete` | `https://your-app.vercel.app/api/webhooks/shopify` |

**GDPR webhooks** (required for compliance):

| Event | URL |
|-------|-----|
| `customers/data_request` | `https://your-app.vercel.app/api/webhooks/shopify/gdpr` |
| `customers/redact` | `https://your-app.vercel.app/api/webhooks/shopify/gdpr` |
| `shop/redact` | `https://your-app.vercel.app/api/webhooks/shopify/gdpr` |

**Webhook Version**: Use `2024-10` (latest stable)

### Step 5: Copy App Credentials

1. In Configuration, find:
   - **Client ID** (copy to `SHOPIFY_CLIENT_ID`)
   - **Client secret** (click "Show" then copy to `SHOPIFY_CLIENT_SECRET`)

2. Update these in Vercel environment variables

3. Redeploy your app

### Step 6: Set Up App Distribution

**For development/testing**:
- Distribution → Development stores
- Select your test store
- Click "Install app"

**For public release**:
- Distribution → App listing
- Fill in app details (see SHOPIFY-PARTNER-SETUP.md for details)
- Submit for review

---

## Post-Deployment Verification

### Step 1: Test OAuth Flow

1. Create a Shopify development store (if you don't have one):
   - Partners → Stores → Add store
   - Development store → Create development store

2. Install your app:
   - Apps → Your app → Test on development store
   - Click "Select store" → Choose your dev store
   - Authorize permissions

3. Verify OAuth callback:
   - You should be redirected to `/shopify/onboarding`
   - Check Vercel logs for any errors

### Step 2: Verify Database Connection

```bash
# Check database tables were created
npx prisma studio

# Or query directly
psql $DATABASE_URL -c "SELECT tablename FROM pg_tables WHERE schemaname='public';"
```

You should see 35+ tables including:
- `User`
- `Connection`
- `Issue`
- `Fix`
- `ShopifyProduct`
- `SEOAgent`
- etc.

### Step 3: Test Core Features

**Onboarding**:
1. Complete onboarding wizard
2. Choose execution mode (Automatic/Plan/Approve)
3. Verify redirect to dashboard

**Product Analysis**:
1. Navigate to Products page
2. Products should load from Shopify
3. Click "Analyze" on a product
4. Verify Claude AI analysis appears
5. Check Issues tab for detected problems

**Fix Application**:
1. Apply a fix (or approve if in PLAN/APPROVE mode)
2. Verify fix appears in Reports
3. Check Shopify Admin to confirm change was applied

**Automation**:
1. Wait for cron job to run (or trigger manually via API)
2. Check logs: `vercel logs --follow`
3. Verify issues were auto-detected and fixed

### Step 4: Monitor Logs

```bash
# Install Vercel CLI
npm i -g vercel

# Stream production logs
vercel logs --follow

# Filter by function
vercel logs --follow --function=api/shopify/analyze
```

Watch for:
- OAuth redirects
- API errors
- Database connection issues
- Webhook deliveries

### Step 5: Test Webhooks

1. In Shopify Admin, create/update a product
2. Check Vercel logs for webhook receipt
3. Verify database was updated

**Manual webhook test**:
```bash
curl -X POST https://your-app.vercel.app/api/webhooks/shopify \
  -H "X-Shopify-Topic: products/update" \
  -H "X-Shopify-Shop-Domain: your-store.myshopify.com" \
  -H "Content-Type: application/json" \
  -d '{"id": 1234567890}'
```

### Step 6: Performance Check

1. Run Lighthouse audit on `/shopify/dashboard`
2. Verify performance score > 80
3. Check Core Web Vitals
4. Test mobile responsiveness

---

## Troubleshooting

### Database Connection Errors

**Error**: `Error: P1001: Can't reach database server`

**Solutions**:
1. Check `DATABASE_URL` format includes `?sslmode=require`
2. Verify database is running and accessible
3. Check IP allowlist (Supabase: Settings → Database → Connection pooling)
4. Test connection locally: `npx prisma db pull`

**Error**: `Error: P3009: Failed to create database`

**Solutions**:
1. Database may already exist - use `prisma db push` instead
2. Check database user has CREATE permissions
3. Try connecting with `psql` manually

### OAuth Flow Issues

**Error**: `Error: invalid_client`

**Solutions**:
1. Verify `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET` match Partner Dashboard
2. Check App URL in Partner Dashboard matches deployment URL
3. Ensure redirect URLs include `/api/auth/shopify/callback`

**Error**: `Error: shop parameter missing`

**Solutions**:
1. OAuth flow requires `?shop=store.myshopify.com` parameter
2. Ensure app is installed from Shopify Admin
3. Check app is approved for your store

### API Rate Limiting

**Error**: `429 Too Many Requests` from Claude API

**Solutions**:
1. Implement request queuing
2. Add exponential backoff retry logic
3. Upgrade Anthropic plan for higher limits
4. Cache responses when possible

### Cron Job Not Running

**Error**: Automation not executing every 6 hours

**Solutions**:
1. Verify `vercel.json` includes cron configuration
2. Check cron logs: `vercel logs --function=api/cron/auto-scan`
3. Ensure `CRON_SECRET` header is correct
4. Verify Vercel plan includes cron (Pro plan required)

### Webhook Delivery Failures

**Error**: Webhooks not being received

**Solutions**:
1. Check Shopify Partner Dashboard → Webhooks → Recent deliveries
2. Verify webhook URL is publicly accessible
3. Ensure route returns 200 status code within 5 seconds
4. Check webhook signature validation

### Build Failures

**Error**: `Error: Cannot find module '@prisma/client'`

**Solutions**:
1. Ensure `prisma generate` runs before build
2. Check `vercel-build` script includes Prisma generation
3. Verify `prisma` is in `dependencies` (not `devDependencies`)

**Error**: `Error: ENOENT: no such file or directory, open '.env'`

**Solutions**:
1. Use environment variables in Vercel dashboard (not `.env` files)
2. Check `NEXT_PUBLIC_*` variables are set
3. Rebuild to pick up new environment variables

### Memory Issues

**Error**: `JavaScript heap out of memory`

**Solutions**:
1. Upgrade Vercel plan for more memory
2. Optimize large queries with pagination
3. Use streaming for large responses
4. Reduce concurrent API calls

### Slow Performance

**Symptoms**: Pages load slowly, timeouts

**Solutions**:
1. Enable Vercel Edge Network caching
2. Implement database query caching
3. Use Prisma connection pooling
4. Optimize images with Next.js Image component
5. Add database indexes for frequent queries

---

## Security Checklist

Before going live:

- [ ] All environment variables use production values
- [ ] `ENCRYPTION_KEY` is random and 32 characters
- [ ] `CRON_SECRET` is random and not in version control
- [ ] Database requires SSL (`?sslmode=require`)
- [ ] Shopify webhook signatures are validated
- [ ] API routes validate user authentication
- [ ] Sensitive data is encrypted before storage
- [ ] Rate limiting is enabled on API routes
- [ ] CORS is configured correctly
- [ ] Input validation with Zod schemas
- [ ] SQL injection prevented (Prisma ORM)
- [ ] XSS protection enabled

---

## Monitoring & Maintenance

### Set Up Monitoring

**Vercel Analytics**:
1. Enable in Vercel dashboard
2. Monitor real user metrics
3. Track Web Vitals

**Error Tracking** (recommended):
- [Sentry](https://sentry.io) for error monitoring
- [LogRocket](https://logrocket.com) for session replay
- [Datadog](https://www.datadoghq.com) for APM

### Database Backups

**Automated backups**:
- Supabase: Automatic daily backups (Pro plan)
- Railway: Manual snapshots
- Neon: Branching for point-in-time recovery

**Manual backup**:
```bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Regular Maintenance

**Weekly**:
- Review error logs
- Check API usage and costs
- Monitor database size

**Monthly**:
- Update dependencies: `npm update`
- Review and optimize slow queries
- Clean up old rollback data (>90 days)

**Quarterly**:
- Security audit
- Performance optimization review
- Review and update Shopify scopes

---

## Scaling Considerations

### Database Optimization

**Connection Pooling**:
```typescript
// Add to lib/db.ts
import { Pool } from '@prisma/client/runtime/library'

export const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      pool: {
        max: 10,
        min: 2,
        idle: 10000,
      },
    },
  },
})
```

**Indexes** (already optimized in schema):
- Compound indexes for common queries
- Covering indexes for frequently accessed columns

### Vercel Plan Upgrades

**Free → Pro** ($20/mo):
- Required for cron jobs
- 100GB bandwidth
- Better performance

**Pro → Enterprise**:
- Dedicated infrastructure
- Custom limits
- SLA guarantees

### Claude API Optimization

**Cost reduction strategies**:
1. Cache common analysis results
2. Batch product analyses
3. Use prompt caching (Anthropic feature)
4. Implement usage budgets per user

---

## Next Steps

After successful deployment:

1. Submit app to Shopify App Store (see SHOPIFY-PARTNER-SETUP.md)
2. Set up customer support system
3. Create marketing materials
4. Monitor initial user feedback
5. Iterate based on analytics

For questions or issues, refer to:
- [API Documentation](./API-DOCUMENTATION.md)
- [User Guide](./USER-GUIDE.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
