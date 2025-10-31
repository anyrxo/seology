# Seology.ai Complete Deployment Guide

**Version 1.0** | Last Updated: 2025-10-31

This comprehensive guide will take you from local development to production deployment in ~30 minutes.

---

## 📋 Table of Contents

1. [Quick Start (5 min)](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Local Development](#local-development)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Vercel Deployment](#vercel-deployment)
7. [Third-Party Services](#third-party-services)
8. [Post-Deployment](#post-deployment)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

For experienced developers who want to get started immediately:

```bash
# 1. Install dependencies
npm install

# 2. Setup database (Docker - fastest)
docker run --name seology-db -e POSTGRES_DB=seology -e POSTGRES_USER=seology -e POSTGRES_PASSWORD=seology123 -p 5432:5432 -d postgres:15

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Initialize database
npx prisma db push && npx prisma generate

# 5. Start development
npm run dev
```

Visit http://localhost:3000

---

## 🎯 Prerequisites

### Required Accounts (Free tiers available)

| Service | Purpose | Sign Up | Cost |
|---------|---------|---------|------|
| **Vercel** | Hosting | [vercel.com](https://vercel.com/signup) | Free |
| **Clerk** | Authentication | [clerk.com](https://clerk.com/sign-up) | Free for 10k MAU |
| **Anthropic** | AI (Claude) | [console.anthropic.com](https://console.anthropic.com/) | Pay-as-you-go |
| **Stripe** | Payments | [stripe.com](https://dashboard.stripe.com/register) | 2.9% + $0.30 per transaction |
| **GitHub** | Repository | [github.com](https://github.com/signup) | Free |

### Required Software

- **Node.js** 18 or higher - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/downloads)
- **Docker Desktop** (optional, for local DB) - [Download](https://www.docker.com/products/docker-desktop/)

### Verify Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version   # Any recent version
```

---

## 💻 Local Development

### 1. Install Dependencies

Dependencies are already installed, but if needed:

```bash
cd "c:\Users\manna\Downloads\iimagined.webflow (1)\app-saas"
npm install
```

### 2. Project Structure

```
app-saas/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── (admin)/           # Admin-only pages
│   ├── (marketing)/       # Public marketing pages
│   └── api/               # API routes (45+ endpoints)
├── components/            # React components
├── lib/                   # Core business logic
│   ├── crawler.ts         # Site crawler (Puppeteer)
│   ├── execution-modes.ts # Auto/Plan/Approve modes
│   ├── rollback.ts        # 90-day rollback system
│   ├── stripe.ts          # Billing integration
│   ├── usage.ts           # Usage tracking
│   ├── queue.ts           # Background jobs
│   └── notifications.ts   # Notification system
├── prisma/                # Database schema
│   └── schema.prisma      # 13 models, PostgreSQL
├── public/                # Static assets
│   └── magic.js           # Universal JavaScript client
├── scripts/               # Utility scripts
└── docs/                  # Documentation
```

---

## 🔐 Environment Configuration

### Step 1: Create Environment File

```bash
cp .env.example .env.local
```

### Step 2: Configure Required Variables

Open `.env.local` and update the following:

#### Database (Required)

```bash
DATABASE_URL="postgresql://seology:seology123@localhost:5432/seology"
```

**Options:**
- **Local Docker**: `postgresql://seology:seology123@localhost:5432/seology`
- **Vercel Postgres**: Get from Vercel dashboard
- **Supabase**: `postgresql://postgres:[PASSWORD]@[PROJECT].supabase.co:5432/postgres`
- **Neon**: `postgresql://[USER]:[PASSWORD]@[HOST].neon.tech/[DB]`

#### Authentication (Required)

Get from https://dashboard.clerk.com/

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_XXXXXXXXXX"
CLERK_SECRET_KEY="sk_test_XXXXXXXXXX"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/onboarding"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"
```

**Clerk Setup:**
1. Create application: https://dashboard.clerk.com/
2. Choose authentication methods (Email, Google, GitHub, etc.)
3. Copy API keys from "API Keys" tab
4. Configure redirect URLs

#### AI (Required)

Get from https://console.anthropic.com/

```bash
ANTHROPIC_API_KEY="sk-ant-XXXXXXXXXX"
```

**Anthropic Setup:**
1. Create account and verify email
2. Add payment method (pay-as-you-go)
3. Generate API key: https://console.anthropic.com/settings/keys
4. Recommended: Set usage limits

#### Payments (Required for billing features)

Get from https://dashboard.stripe.com/

```bash
STRIPE_SECRET_KEY="sk_test_XXXXXXXXXX"
STRIPE_PUBLISHABLE_KEY="pk_test_XXXXXXXXXX"
STRIPE_WEBHOOK_SECRET="whsec_XXXXXXXXXX"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_XXXXXXXXXX"
```

**Stripe Setup:**
1. Create account: https://dashboard.stripe.com/register
2. Get API keys: Dashboard → Developers → API keys
3. Create products (see [Stripe Products](#stripe-products))
4. Setup webhooks (see [Stripe Webhooks](#stripe-webhooks))

#### Security (Required)

```bash
ENCRYPTION_KEY="generate-a-random-32-character-key"
```

**Generate secure key:**
```bash
# Option 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: OpenSSL
openssl rand -hex 32

# Option 3: Online
# https://generate-random.org/api-key-generator
```

#### Application URLs (Required)

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

For production, change to your domain:
```bash
NEXT_PUBLIC_APP_URL="https://seology.ai"
NEXT_PUBLIC_API_URL="https://seology.ai/api"
```

### Step 3: Optional Variables

#### Shopify Integration (Optional)
```bash
SHOPIFY_CLIENT_ID="your_client_id"
SHOPIFY_CLIENT_SECRET="your_secret"
SHOPIFY_SCOPES="read_products,write_products,read_content,write_content"
SHOPIFY_REDIRECT_URI="http://localhost:3000/api/auth/shopify/callback"
```

#### Redis (Optional - for advanced queue management)
```bash
REDIS_URL="redis://localhost:6379"
```

Or use Upstash (serverless):
```bash
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXX..."
```

#### Email (Optional - Resend)
```bash
RESEND_API_KEY="re_XXXXXXXXXX"
```

---

## 🗄️ Database Setup

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed options.

### Quick Setup: Docker (Recommended)

**1. Start PostgreSQL container:**
```bash
docker run --name seology-db \
  -e POSTGRES_DB=seology \
  -e POSTGRES_USER=seology \
  -e POSTGRES_PASSWORD=seology123 \
  -p 5432:5432 \
  -d postgres:15
```

**2. Update .env.local:**
```bash
DATABASE_URL="postgresql://seology:seology123@localhost:5432/seology"
```

**3. Initialize database:**
```bash
npx prisma db push
npx prisma generate
```

**4. Verify (optional):**
```bash
npx prisma studio
```

Opens at http://localhost:5555

### Docker Management Commands

```bash
# Stop database
docker stop seology-db

# Start database
docker start seology-db

# View logs
docker logs seology-db

# Remove database (WARNING: deletes all data)
docker rm -f seology-db
```

### Alternative: Vercel Postgres

```bash
# 1. Link project
vercel link

# 2. Create database in Vercel Dashboard
# Storage → Create Database → Postgres

# 3. Pull environment variables
vercel env pull .env.local

# 4. Initialize
npx prisma db push
npx prisma generate
```

---

## 🚀 Vercel Deployment

### Option 1: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Link project (first time only)
vercel link

# 4. Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

**1. Push to GitHub:**
```bash
# Initialize git (if not already)
git init

# Add remote
git remote add origin https://github.com/YOURUSERNAME/seology-ai.git

# Commit and push
git add .
git commit -m "Initial commit: Seology.ai platform"
git push -u origin main
```

**2. Import to Vercel:**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
4. Add environment variables (copy from .env.local)
5. Click "Deploy"

### Configure Environment Variables in Vercel

Go to: **Project Settings → Environment Variables**

Add all variables from your `.env.local`:

**Production Environment:**
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `ENCRYPTION_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`

**Important:** Update URLs for production:
```bash
NEXT_PUBLIC_APP_URL="https://your-project.vercel.app"  # or your custom domain
NEXT_PUBLIC_API_URL="https://your-project.vercel.app/api"
```

---

## 🔧 Third-Party Services

### Stripe Products

Create 3 subscription plans in Stripe:

**Option A: Manual Setup**

1. Go to https://dashboard.stripe.com/products
2. Click "+ Add product"

**Plan 1: Starter - $29/month**
- Name: Seology Starter
- Price: $29.00 USD
- Billing: Monthly
- Copy Price ID (e.g., `price_XXXXXXXXXX`)

**Plan 2: Professional - $99/month**
- Name: Seology Professional
- Price: $99.00 USD
- Billing: Monthly
- Copy Price ID

**Plan 3: Enterprise - $299/month**
- Name: Seology Enterprise
- Price: $299.00 USD
- Billing: Monthly
- Copy Price ID

3. Update `lib/stripe-plans.ts` with your price IDs

**Option B: Automated Script**

```typescript
// scripts/setup-stripe-products.ts
// Run: npx ts-node scripts/setup-stripe-products.ts
```

### Stripe Webhooks

Configure webhook to receive payment events:

**1. Add Webhook Endpoint:**
- Go to https://dashboard.stripe.com/webhooks
- Click "Add endpoint"
- URL: `https://your-domain.com/api/billing/webhook`

**2. Select Events:**
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`
- ✅ `customer.subscription.trial_will_end`

**3. Copy Webhook Secret:**
- Copy "Signing secret" (starts with `whsec_`)
- Add to environment variables as `STRIPE_WEBHOOK_SECRET`

**Local Testing:**
```bash
# Install Stripe CLI
# Windows: scoop install stripe
# macOS: brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/billing/webhook
```

### Clerk Configuration

**1. Configure URLs:**
Go to https://dashboard.clerk.com/ → Configure → Paths

```
Home URL: https://seology.ai
Sign-in URL: https://seology.ai/sign-in
Sign-up URL: https://seology.ai/sign-up
After sign-in: https://seology.ai/onboarding
After sign-up: https://seology.ai/onboarding
```

**2. Enable Social Providers (Optional):**
- Dashboard → User & Authentication → Social Connections
- Enable: Google, GitHub, Microsoft, etc.

**3. Email Settings:**
- Dashboard → Email, Phone, Username
- Customize email templates
- Configure sender email

**4. Appearance (Optional):**
- Dashboard → Customization → Theme
- Match your brand colors

---

## ✅ Post-Deployment

### 1. Run Database Migrations

```bash
# Pull production environment
vercel env pull .env.production.local

# Run migrations
npx prisma db push

# Generate client
npx prisma generate
```

### 2. Verify Deployment

Visit your deployment URL and check:
- [ ] Homepage loads
- [ ] Sign up works
- [ ] Sign in works
- [ ] Dashboard loads after auth
- [ ] Onboarding wizard works

### 3. Configure Cron Jobs

Cron jobs are configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-jobs",
      "schedule": "* * * * *"
    },
    {
      "path": "/api/cron/daily",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/monthly",
      "schedule": "0 0 1 * *"
    }
  ]
}
```

Verify in: **Vercel Dashboard → Settings → Cron Jobs**

### 4. Setup Custom Domain (Optional)

**1. Add Domain:**
- Vercel Dashboard → Settings → Domains
- Enter your domain (e.g., `seology.ai`)

**2. Configure DNS:**
Add records as instructed by Vercel:
```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**3. SSL:**
- Automatically provisioned by Vercel
- Usually takes 1-2 minutes

### 5. Create Admin Account

**1. Sign up through your app**

**2. Get your user ID:**
```bash
npx prisma studio
# Open Users table, find your email, copy ID
```

**3. Option A: Update code:**
Edit `lib/admin.ts`:
```typescript
const ADMIN_EMAILS = [
  'your-email@domain.com',
  'admin@seology.ai'
]
```

**3. Option B: Database:**
```sql
-- Add isAdmin field if needed, or use email check
UPDATE users SET email = 'your-email@domain.com' WHERE id = 'your-user-id';
```

---

## 🧪 Testing

### Development Testing

**1. Start dev server:**
```bash
npm run dev
```

**2. Test user flow:**
- [ ] Sign up
- [ ] Complete onboarding
- [ ] Connect a website
- [ ] Trigger crawl
- [ ] View issues
- [ ] Apply a fix
- [ ] Test rollback

**3. Test billing:**
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0027 6000 3184`
- CVV: Any 3 digits
- Date: Any future date

### Production Testing

After deployment:
- [ ] Homepage loads correctly
- [ ] Authentication works
- [ ] Onboarding completes
- [ ] Site crawling works
- [ ] Issues are detected
- [ ] Fixes can be applied
- [ ] Rollback works
- [ ] Billing flow works
- [ ] Webhooks are received
- [ ] Notifications appear
- [ ] Admin dashboard accessible
- [ ] Background jobs process

### API Testing

Use Postman or curl:

```bash
# Health check
curl https://your-domain.com/api/health

# Get sites (requires auth)
curl https://your-domain.com/api/sites \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

---

## 🐛 Troubleshooting

### Build Errors

**"Cannot find module"**
```bash
npm install
npm run build
```

**"Prisma Client not generated"**
```bash
npx prisma generate
npm run build
```

**"Type error in build"**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix and rebuild
npm run build
```

### Database Errors

**"P1001: Can't reach database server"**
- ✅ Check DATABASE_URL is correct
- ✅ Verify database is running: `docker ps`
- ✅ Test connection: `npx prisma db pull`

**"P1003: Database does not exist"**
```bash
# Create database first, then:
npx prisma db push
```

**"P1010: User denied access"**
- Check username/password in DATABASE_URL
- Verify user has correct permissions

### Authentication Errors

**"Clerk: Unable to load"**
- Check CLERK_SECRET_KEY is correct
- Verify Clerk application exists
- Check domain is whitelisted in Clerk

**Redirect loops after sign in**
- Clear browser cookies
- Check redirect URLs in Clerk dashboard
- Verify environment variables match

### Stripe Errors

**"No such price"**
- Create products in Stripe dashboard
- Update price IDs in code
- Ensure using correct API keys (test vs live)

**"Invalid webhook signature"**
- Check STRIPE_WEBHOOK_SECRET is correct
- Verify endpoint is registered in Stripe
- For local testing, use Stripe CLI

### Deployment Errors

**"Application Error" on Vercel**
- Check Vercel logs: Dashboard → Deployments → View Function Logs
- Verify all environment variables are set
- Check database connection

**"500 Internal Server Error"**
- View detailed logs in Vercel dashboard
- Check API route implementation
- Verify database schema is up to date

### Performance Issues

**Slow page loads**
- Enable Vercel Analytics to identify bottlenecks
- Check database query performance
- Add database indexes if needed
- Implement caching (Redis)

**Crawler timeouts**
- Reduce maxPages in crawl settings
- Increase Puppeteer timeout
- Implement progressive crawling

---

## 📊 Monitoring

### Vercel Analytics

Built-in monitoring:
- Real User Monitoring (RUM)
- Web Vitals (LCP, FID, CLS)
- View in: Dashboard → Analytics

### Error Tracking (Optional)

**Sentry Integration:**
```bash
npm install @sentry/nextjs
```

Add to environment:
```bash
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
```

### Database Monitoring

**Prisma Studio:**
```bash
npx prisma studio
```

**Database Metrics:**
- Query performance
- Connection pool usage
- Table sizes

### Usage Monitoring

Monitor via Admin Dashboard:
- Total users
- Active subscriptions
- MRR (Monthly Recurring Revenue)
- API usage
- Background job status

---

## 🔒 Security Checklist

- [ ] All API keys in environment variables
- [ ] ENCRYPTION_KEY is random and secure (32+ chars)
- [ ] Stripe webhooks verified
- [ ] Database uses SSL in production
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] CORS configured properly
- [ ] Rate limiting on public endpoints
- [ ] Input validation on all inputs
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection (Next.js handles this)
- [ ] Regular dependency updates: `npm audit`

### Enable Additional Security

**1. Rate Limiting:**
Implement in middleware or API routes

**2. CORS Configuration:**
```typescript
// middleware.ts
export const config = {
  matcher: '/api/:path*',
}
```

**3. Content Security Policy:**
```typescript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
```

---

## 📈 Scaling

### When to Scale

**Indicators:**
- API response time > 200ms consistently
- Database queries > 100ms
- Background job queue backing up
- High memory usage
- Increased error rates

### Scaling Strategies

**Database:**
- [ ] Upgrade to larger plan
- [ ] Add connection pooling (PgBouncer)
- [ ] Implement read replicas
- [ ] Add database indexes
- [ ] Cache frequently accessed data (Redis)

**Background Jobs:**
- [ ] Implement Redis-backed queue (Bull MQ)
- [ ] Add dedicated worker processes
- [ ] Increase job concurrency
- [ ] Optimize job processing logic

**API:**
- [ ] Implement Redis caching
- [ ] Add CDN for static assets
- [ ] Use Edge Functions for global distribution
- [ ] Implement response compression

**Monitoring:**
- [ ] Add APM (Application Performance Monitoring)
- [ ] Set up alerts for critical metrics
- [ ] Implement logging aggregation
- [ ] Track business metrics

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Anthropic Docs](https://docs.anthropic.com/)

### Support
- GitHub Issues: Create issue in your repository
- Discord: Create community server
- Email: support@seology.ai

---

## 🎉 Success!

If you've completed all steps, your Seology.ai platform is now:
- ✅ Fully deployed to production
- ✅ Connected to all services
- ✅ Processing payments
- ✅ Crawling websites
- ✅ Applying SEO fixes
- ✅ Tracking usage
- ✅ Sending notifications

**Next Steps:**
1. Test thoroughly with real websites
2. Invite beta users
3. Monitor performance and errors
4. Gather feedback
5. Iterate and improve

**Marketing Checklist:**
1. Update website copy
2. Add demo video
3. Create pricing page
4. Write launch blog post
5. Share on social media
6. Submit to directories
7. Reach out to first customers

---

**Need help?** Create an issue or reach out to support@seology.ai

**Ready to launch!** 🚀
