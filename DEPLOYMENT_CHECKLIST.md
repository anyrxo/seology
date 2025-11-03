# SEOLOGY.AI Production Deployment Checklist

Comprehensive checklist for deploying SEOLOGY.AI to production on Vercel. Follow each section in order.

---

## Pre-Deployment Preparation

### 1. Environment Variables Setup

#### Required Environment Variables
- [ ] `DATABASE_URL` - Production PostgreSQL connection string (with connection pooling)
- [ ] `DIRECT_URL` - Direct PostgreSQL connection string (for migrations)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk production publishable key
- [ ] `CLERK_SECRET_KEY` - Clerk production secret key
- [ ] `CLERK_WEBHOOK_SECRET` - Clerk webhook secret for user sync
- [ ] `ANTHROPIC_API_KEY` - Claude AI production API key
- [ ] `STRIPE_SECRET_KEY` - Stripe production secret key
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe production publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- [ ] `SHOPIFY_CLIENT_ID` - Shopify OAuth client ID (0b87ac78cf0783fd1dd829bf5421fae5)
- [ ] `SHOPIFY_CLIENT_SECRET` - Shopify OAuth client secret
- [ ] `ENCRYPTION_KEY` - 32-character encryption key for tokens (generate with: `openssl rand -base64 32`)
- [ ] `CRON_SECRET` - Secret for authenticating cron job requests
- [ ] `NEXT_PUBLIC_APP_URL` - Production URL (https://app.seology.ai)
- [ ] `REDIS_URL` - Redis connection string (for job queue)
- [ ] `SENTRY_DSN` - Sentry DSN for error tracking (optional but recommended)
- [ ] `SENTRY_AUTH_TOKEN` - Sentry auth token for source maps (optional)

#### Optional Environment Variables
- [ ] `UPSTASH_REDIS_REST_URL` - Upstash Redis REST URL (alternative to Redis)
- [ ] `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST token
- [ ] `RESEND_API_KEY` - Resend API key for transactional emails
- [ ] `LOG_LEVEL` - Logging level (info, warn, error)
- [ ] `NODE_ENV` - Set to "production"

### 2. Database Setup

#### PostgreSQL Configuration
- [ ] Provision PostgreSQL database (Supabase, Railway, or Neon recommended)
- [ ] Enable connection pooling (PgBouncer or Supabase pooler)
- [ ] Set up direct connection URL for migrations
- [ ] Configure database backup schedule (daily recommended)
- [ ] Set up point-in-time recovery (PITR)
- [ ] Configure database monitoring and alerts
- [ ] Set max connections limit (100-200 recommended)
- [ ] Enable SSL/TLS connection

---

## Vercel Setup

### Account & Project
- [ ] Vercel account created
- [ ] GitHub account connected to Vercel
- [ ] Repository imported into Vercel
- [ ] Project created (but not deployed yet)

### Environment Variables
- [ ] DATABASE_URL added to Production
- [ ] CLERK_SECRET_KEY added to Production
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY added to Production
- [ ] ANTHROPIC_API_KEY added to Production
- [ ] STRIPE_SECRET_KEY added to Production
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY added to Production
- [ ] ENCRYPTION_KEY added to Production
- [ ] CRON_SECRET added to Production
- [ ] NEXT_PUBLIC_APP_URL added (value: https://seology.ai)

### Build Configuration
- [ ] Framework Preset: Next.js
- [ ] Build Command: `prisma generate && next build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`
- [ ] Node.js Version: 18.x or higher

### Custom Domains
- [ ] Domain `seology.ai` added to Vercel
- [ ] Domain `www.seology.ai` added to Vercel
- [ ] Domain `app.seology.ai` added to Vercel
- [ ] All domains show "Valid Configuration" (may take 15-30 min)

---

## Deployment

### Initial Deploy
- [ ] "Deploy" button clicked in Vercel
- [ ] Build started
- [ ] No errors in build logs
- [ ] Build completed successfully
- [ ] Shows "✓ Build successful"
- [ ] Deployment shows "Ready"
- [ ] Vercel-provided URL accessible (e.g., project-abc123.vercel.app)

### DNS & SSL
- [ ] DNS records verified at dnschecker.org
- [ ] seology.ai resolves to Vercel
- [ ] www.seology.ai resolves to Vercel
- [ ] app.seology.ai resolves to Vercel
- [ ] SSL certificates issued (may take 5-10 min)
- [ ] https://seology.ai accessible
- [ ] No SSL certificate warnings in browser

---

## Database Initialization

### Local Setup
- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] Logged in to Vercel CLI: `vercel login`
- [ ] Project linked: `vercel link`
- [ ] Environment variables pulled: `vercel env pull .env.local`

### Prisma Setup
- [ ] Prisma client generated: `npx prisma generate`
- [ ] Schema pushed to database: `npx prisma db push`
- [ ] No errors during schema push
- [ ] All tables created in database
- [ ] Can verify tables in Prisma Studio: `npx prisma studio`

---

## Post-Deployment Configuration

### Webhooks

#### Stripe Webhook
- [ ] Stripe webhook endpoint created
- [ ] URL: `https://seology.ai/api/billing/webhook`
- [ ] Events selected:
  - [ ] customer.subscription.created
  - [ ] customer.subscription.updated
  - [ ] customer.subscription.deleted
  - [ ] invoice.payment_succeeded
  - [ ] invoice.payment_failed
- [ ] Webhook signing secret copied
- [ ] STRIPE_WEBHOOK_SECRET added to Vercel
- [ ] Vercel redeployed after adding secret

#### Clerk Webhook (Optional)
- [ ] Clerk webhook endpoint created
- [ ] URL: `https://seology.ai/api/webhooks/clerk`
- [ ] Events selected: user.created, user.updated, user.deleted
- [ ] Webhook signing secret copied
- [ ] CLERK_WEBHOOK_SECRET added to Vercel
- [ ] Vercel redeployed after adding secret

### Cron Jobs
- [ ] Vercel Cron tab shows 3 scheduled jobs:
  - [ ] /api/cron/backup (Daily 3 AM)
  - [ ] /api/cron/cleanup (Daily 2 AM)
  - [ ] /api/cron/reset-usage (Monthly 1st)
- [ ] Test triggered one cron job manually
- [ ] Cron job executed successfully

---

## Testing & Verification

### Health Checks

#### API Health
```bash
curl https://seology.ai/api/health
```
- [ ] Returns 200 OK status
- [ ] JSON response shows "status": "healthy"
- [ ] "api": "operational"
- [ ] "database": "operational"

#### Documentation
- [ ] https://seology.ai/docs loads
- [ ] Swagger UI displays
- [ ] API endpoints listed
- [ ] Can expand endpoints and see details

### Public Pages
- [ ] https://seology.ai loads (landing page)
- [ ] https://www.seology.ai loads
- [ ] https://app.seology.ai loads
- [ ] No console errors in browser
- [ ] All images load
- [ ] All CSS loads correctly
- [ ] Page is responsive on mobile

### Authentication Flow
- [ ] https://seology.ai/sign-up loads
- [ ] Clerk sign-up form displays
- [ ] Can create new account
- [ ] Receive verification email
- [ ] Email verification works
- [ ] Redirects to /dashboard/onboarding after signup
- [ ] Can sign out
- [ ] Can sign in at /sign-in

### User Dashboard
- [ ] Onboarding wizard loads
- [ ] Can complete onboarding steps
- [ ] Redirects to /dashboard after onboarding
- [ ] Dashboard displays user info
- [ ] Navigation menu works
- [ ] Can access /dashboard/settings
- [ ] Can access /dashboard/billing

### Protected Routes
- [ ] Accessing /dashboard when logged out redirects to /sign-in
- [ ] After signing in, redirects back to /dashboard
- [ ] User name displays in header
- [ ] Can access all dashboard sections

### Admin Panel (If Applicable)
- [ ] Admin role assigned to test user in Clerk
- [ ] Can access /admin
- [ ] Admin dashboard loads
- [ ] Can view users, sites, jobs

---

## Domain Verification

### DNS Propagation
Check at https://dnschecker.org:

- [ ] seology.ai shows green checkmarks globally
- [ ] www.seology.ai shows green checkmarks globally
- [ ] app.seology.ai shows green checkmarks globally

### SSL Certificates
- [ ] https://seology.ai has valid SSL (padlock icon)
- [ ] https://www.seology.ai has valid SSL
- [ ] https://app.seology.ai has valid SSL
- [ ] No mixed content warnings
- [ ] Certificate issued by Let's Encrypt or similar

### All URLs Work
- [ ] https://seology.ai
- [ ] https://www.seology.ai
- [ ] https://app.seology.ai
- [ ] https://seology.ai/docs
- [ ] https://seology.ai/api/health
- [ ] https://seology.ai/sign-in
- [ ] https://seology.ai/sign-up
- [ ] https://seology.ai/dashboard (when logged in)

---

## Monitoring Setup

### Vercel Monitoring
- [ ] Vercel Analytics enabled
- [ ] Real-time logs accessible
- [ ] Function logs show no errors
- [ ] Build logs show successful builds

### Error Tracking
- [ ] Check Vercel Logs → Errors tab
- [ ] No errors in last 1 hour
- [ ] No errors in API routes
- [ ] No database connection errors

### Performance
- [ ] Page load time < 2 seconds
- [ ] API response time < 500ms
- [ ] Time to First Byte < 300ms
- [ ] Lighthouse score > 80 (run in Chrome DevTools)

---

## Final Verification

### Complete User Flow
- [ ] Visit landing page → Click "Get Started"
- [ ] Sign up with new email
- [ ] Verify email
- [ ] Complete onboarding
- [ ] Connect a test site (or skip)
- [ ] Explore dashboard
- [ ] Update profile settings
- [ ] Sign out and sign back in

### Integration Tests
- [ ] Stripe checkout works (test mode)
- [ ] Webhook endpoints respond
- [ ] Cron jobs execute on schedule
- [ ] Database queries work
- [ ] AI features work (if testing Anthropic)

### Security Checks
- [ ] All pages use HTTPS
- [ ] No API keys exposed in client code
- [ ] Protected routes require authentication
- [ ] Admin routes require admin role
- [ ] CORS configured correctly (if applicable)

---

## Documentation Updates

- [ ] Update README.md with production URLs
- [ ] Update API docs with production server URL
- [ ] Document any environment-specific configuration
- [ ] Create runbook for common operations
- [ ] Document rollback procedure

---

## Go-Live Checklist

### Before Announcing
- [ ] All tests passing
- [ ] No critical errors in logs
- [ ] Database backup configured
- [ ] Monitoring in place
- [ ] Support email configured
- [ ] Terms of Service page live
- [ ] Privacy Policy page live

### Launch Day
- [ ] Send launch announcement
- [ ] Monitor error logs closely
- [ ] Watch for signup spikes
- [ ] Be ready to scale if needed
- [ ] Have rollback plan ready

### Post-Launch (First 24 Hours)
- [ ] Monitor every 2 hours
- [ ] Check error rate
- [ ] Review user feedback
- [ ] Verify all services operational
- [ ] Check database performance

### Post-Launch (First Week)
- [ ] Daily monitoring
- [ ] Review usage patterns
- [ ] Optimize slow queries
- [ ] Address any user-reported issues
- [ ] Celebrate successful launch!

---

## Emergency Contacts

**Vercel Issues:**
- Status: https://www.vercel-status.com
- Support: https://vercel.com/help

**Database Issues:**
- Supabase Status: https://status.supabase.com
- Supabase Support: https://supabase.com/support

**Clerk Issues:**
- Status: https://status.clerk.com
- Docs: https://clerk.com/docs

**Stripe Issues:**
- Status: https://status.stripe.com
- Support: https://support.stripe.com

---

## Notes Section

Use this space to track any custom configurations, issues encountered, or deviations from the standard process:

```
Date: ___________
Issue: _______________________________________________________
Resolution: ___________________________________________________
_______________________________________________________________

Date: ___________
Issue: _______________________________________________________
Resolution: ___________________________________________________
_______________________________________________________________

Date: ___________
Issue: _______________________________________________________
Resolution: ___________________________________________________
_______________________________________________________________
```

---

## Deployment Sign-Off

Once all items are checked:

**Deployed by:** _______________________
**Date:** _______________________
**Time:** _______________________
**Deployment URL:** https://seology.ai
**Status:** [ ] Successful [ ] Partial [ ] Failed

**Notes:**
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________

---

**Congratulations on deploying SEOLOGY.AI!**

Keep this checklist for future reference and for deploying updates.
