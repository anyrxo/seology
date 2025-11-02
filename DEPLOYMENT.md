# Deployment Guide - SEOLOGY.AI

## Vercel Deployment Setup

### Required Environment Variables

Add these environment variables in your Vercel project settings:
**Dashboard → Project Settings → Environment Variables**

#### 1. Clerk Authentication (REQUIRED)

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

#### 2. Clerk URLs (REQUIRED)

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/onboarding
```

#### 3. Anthropic Claude AI (REQUIRED)

```bash
ANTHROPIC_API_KEY=your_anthropic_api_key
```

#### 4. Database (REQUIRED - needs setup)

```bash
DATABASE_URL=postgresql://user:password@host:5432/seology
```

**PostgreSQL Options:**
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (recommended, integrated)
- [Supabase](https://supabase.com) (free tier available)
- [Railway](https://railway.app) (free tier available)
- [Neon](https://neon.tech) (serverless Postgres)

#### 5. App URL (REQUIRED)

```bash
NEXT_PUBLIC_APP_URL=https://seology.ai
```

Or use your Vercel deployment URL:
```bash
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

#### 6. Stripe (Optional - for billing)

```bash
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

#### 7. Shopify OAuth (Optional - for Shopify integration)

```bash
SHOPIFY_CLIENT_ID=0b87ac78cf0783fd1dd829bf5421fae5
SHOPIFY_CLIENT_SECRET=your_shopify_client_secret
```

---

## Quick Setup Steps

### 1. Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Select your `seology` project
3. Go to **Settings** → **Environment Variables**
4. Add each variable listed above
5. Select environments: **Production**, **Preview**, **Development**

### 2. Set Up Database

**Option A: Vercel Postgres (Recommended)**
```bash
# In Vercel dashboard:
# Storage → Create Database → Postgres
# This auto-adds DATABASE_URL to your environment variables
```

**Option B: External Provider**
1. Create a PostgreSQL database on Supabase/Railway/Neon
2. Copy the connection string
3. Add as `DATABASE_URL` environment variable in Vercel

### 3. Deploy

Once environment variables are added:

```bash
git push origin main
```

Vercel will automatically:
1. Install dependencies
2. Run `prisma generate` (via postinstall script)
3. Build the Next.js app
4. Deploy to production

### 4. Initialize Database Schema

After first deployment, run Prisma migrations:

```bash
# Option A: Using Vercel CLI locally
npx vercel env pull .env.local  # Pull production env vars
npx prisma db push               # Push schema to database

# Option B: In Vercel dashboard
# Add a one-time build command:
# "prisma db push && next build"
```

---

## Deployment Checklist

- [ ] All environment variables added to Vercel
- [ ] Database created and `DATABASE_URL` configured
- [ ] Clerk domain configured for `seology.ai` in Clerk dashboard
- [ ] Database schema pushed (`prisma db push`)
- [ ] Build successful on Vercel
- [ ] Test sign-in flow
- [ ] Test Claude AI integration
- [ ] (Optional) Stripe webhooks configured
- [ ] (Optional) Clerk webhooks configured

---

## Troubleshooting

### Error: Missing publishableKey

**Cause**: Clerk environment variables not set in Vercel

**Fix**: Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to Vercel environment variables

### Error: Prisma Client not generated

**Cause**: `prisma generate` not running during build

**Fix**: Already fixed in `package.json` with postinstall script. Redeploy.

### Error: Database connection failed

**Cause**: `DATABASE_URL` not set or incorrect

**Fix**:
1. Verify `DATABASE_URL` is added to Vercel environment variables
2. Test connection string format: `postgresql://user:password@host:5432/dbname`
3. Ensure database allows connections from Vercel IPs (usually public access)

### Build succeeds but pages error at runtime

**Cause**: Missing runtime environment variables

**Fix**: Ensure ALL variables (especially `NEXT_PUBLIC_*` vars) are set in Vercel for the correct environment

---

## Post-Deployment Tasks

1. **Configure Clerk Production Instance**
   - Add `seology.ai` to allowed domains
   - Set up OAuth providers (Google, GitHub, etc.)
   - Configure email templates

2. **Set Up Stripe Webhooks** (if using billing)
   - Webhook URL: `https://seology.ai/api/billing/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

3. **Set Up Clerk Webhooks** (if syncing users)
   - Webhook URL: `https://seology.ai/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`

4. **Configure Shopify App** (if using Shopify)
   - Add redirect URL: `https://seology.ai/api/auth/shopify/callback`
   - Update app permissions in Shopify Partner Dashboard

---

## Monitoring

After deployment, monitor:

- Vercel Analytics (automatic)
- Vercel Logs (Dashboard → Deployments → Logs)
- Database connections (Prisma logs)
- API usage (Anthropic dashboard)
- Clerk user activity (Clerk dashboard)

---

## Maintenance

### Database Migrations

When updating the Prisma schema:

```bash
# 1. Update prisma/schema.prisma locally
# 2. Generate migration
npx prisma migrate dev --name your_migration_name

# 3. Commit and push
git add prisma/
git commit -m "Add database migration"
git push origin main

# 4. Vercel will auto-deploy and run migrations
```

### Updating Environment Variables

1. Update in Vercel dashboard
2. Trigger redeployment (Deployments → Redeploy)
3. Verify changes in production

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Clerk Docs**: https://clerk.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs

