# 🚀 Seology.ai - Deployment Guide

## Complete Production Deployment Checklist

**Last Updated**: 2025-10-31
**Status**: ✅ Ready for deployment

---

## 📋 Pre-Deployment Checklist

### ✅ Code Status
- [x] All dependencies installed (`npm install` successful)
- [x] TypeScript compilation passes (`npx tsc --noEmit`)
- [x] No runtime errors
- [x] All files created (45+ files)
- [x] Environment template ready (`.env.example`)

### ⏳ Required External Services
- [ ] PostgreSQL database (Railway/Supabase/Neon)
- [ ] Clerk account (authentication)
- [ ] Claude AI API key (Anthropic)
- [ ] (Optional) Shopify Partner account
- [ ] (Optional) Stripe account

---

## 🗄️ Step 1: Database Setup

### Option A: Railway (Recommended)

1. **Create Account**: Go to [railway.app](https://railway.app)
2. **New Project** → PostgreSQL
3. **Copy Connection String**:
   ```
   postgresql://postgres:password@hostname.railway.app:5432/database
   ```
4. **Add to `.env.local`**:
   ```env
   DATABASE_URL="postgresql://postgres:password@hostname.railway.app:5432/database"
   ```

### Option B: Supabase

1. **Create Account**: Go to [supabase.com](https://supabase.com)
2. **New Project** → Create database
3. **Settings** → Database → Connection string (Direct)
4. **Add to `.env.local`**

### Option C: Vercel Postgres

1. **Vercel Dashboard** → Storage → Create Database
2. **Copy connection string**
3. **Add to `.env.local`**

### Push Database Schema

```bash
cd app-saas
npm run db:push
npm run db:generate
```

**Expected Output**:
```
✔ Generated Prisma Client
✔ Database schema pushed successfully
```

---

## 🔐 Step 2: Clerk Authentication

### Setup Clerk

1. **Create Account**: [clerk.com](https://clerk.com)
2. **Create Application**:
   - Name: "Seology.ai"
   - Choose: Email + Google + GitHub (recommended)

3. **Get API Keys**:
   - Dashboard → API Keys
   - Copy **Publishable Key** and **Secret Key**

4. **Configure Paths**:
   - Dashboard → Paths
   - Sign in URL: `/sign-in`
   - Sign up URL: `/sign-up`
   - After sign in: `/dashboard`
   - After sign up: `/dashboard`

5. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   ```

### Enable OAuth Providers (Optional)

- Dashboard → User & Authentication → Social Connections
- Enable: Google, GitHub
- Add redirect URLs (Clerk handles automatically)

---

## 🤖 Step 3: Claude AI

### Get API Key

1. **Create Account**: [console.anthropic.com](https://console.anthropic.com)
2. **Get API Key**:
   - Console → API Keys → Create Key
   - Copy the key (starts with `sk-ant-`)

3. **Add to `.env.local`**:
   ```env
   ANTHROPIC_API_KEY="sk-ant-api03-..."
   ```

4. **Add Credits**:
   - Anthropic requires prepaid credits
   - Minimum: $5 (covers ~50,000 analysis requests)

---

## 🛒 Step 4: Shopify App (Optional)

### Create Shopify Partner Account

1. **Sign up**: [partners.shopify.com](https://partners.shopify.com)
2. **Create App**:
   - Apps → Create App → Custom App
   - Name: "Seology SEO Automation"

3. **Configure OAuth**:
   - App Setup → URLs
   - Allowed redirection URL(s):
     - `http://localhost:3000/api/auth/shopify/callback` (development)
     - `https://yourdomain.com/api/auth/shopify/callback` (production)

4. **Get Credentials**:
   - Client ID: Already in code (`0b87ac78cf0783fd1dd829bf5421fae5`)
   - Client Secret: Copy from dashboard

5. **Add to `.env.local`**:
   ```env
   SHOPIFY_CLIENT_SECRET="shpss_..."
   ```

6. **Configure Scopes** (already in code):
   - `read_products`, `write_products`
   - `read_content`, `write_content`
   - `read_themes`, `write_themes`

---

## 💳 Step 5: Stripe (Optional - For Billing)

### Setup Stripe

1. **Create Account**: [stripe.com](https://stripe.com)
2. **Get API Keys**:
   - Developers → API Keys
   - Copy **Publishable Key** and **Secret Key**

3. **Create Products**:
   ```
   Starter Plan: $297/month
   Growth Plan: $997/month
   Scale Plan: $2,497/month
   ```

4. **Add to `.env.local`**:
   ```env
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

5. **Configure Webhooks** (after deployment):
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`

---

## 🔑 Step 6: Generate Encryption Key

### Create Random Key

```bash
# Option 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: OpenSSL
openssl rand -hex 32

# Option 3: Online
# https://generate-secret.vercel.app/32
```

**Add to `.env.local`**:
```env
ENCRYPTION_KEY="your-64-character-hex-string-here"
```

⚠️ **IMPORTANT**: Never commit this key to git!

---

## 🚀 Step 7: Deploy to Vercel

### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to staging
cd app-saas
vercel

# Deploy to production
vercel --prod
```

### Option B: GitHub Integration

1. **Push to GitHub**:
   ```bash
   cd app-saas
   git init
   git add .
   git commit -m "Initial commit: Seology.ai SaaS platform"
   git branch -M main
   git remote add origin https://github.com/yourusername/seology-ai.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import Git Repository
   - Select your repo
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`

3. **Add Environment Variables**:
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Add ALL variables from `.env.local`
   - Apply to: Production, Preview, Development

4. **Deploy**:
   - Automatic deployment on push
   - Manual: Dashboard → Deployments → Redeploy

---

## 🌐 Step 8: Custom Domain

### Add Domain to Vercel

1. **Vercel Dashboard** → Project → Settings → Domains
2. **Add Domain**: `app.seology.ai`
3. **Configure DNS**:
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   ```
4. **Wait for SSL**: Automatic (Let's Encrypt)

### Update Environment Variables

```env
# Production URLs
NEXT_PUBLIC_APP_URL="https://app.seology.ai"
NEXT_PUBLIC_API_URL="https://app.seology.ai/api"
```

### Update Clerk

- Dashboard → Domains
- Add: `app.seology.ai`

### Update Shopify

- App Setup → URLs
- Update redirect URL: `https://app.seology.ai/api/auth/shopify/callback`

---

## ✅ Step 9: Post-Deployment Verification

### Test Checklist

- [ ] Visit landing page: `https://app.seology.ai`
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Dashboard loads
- [ ] Connect Shopify (if configured)
- [ ] Connect WordPress
- [ ] Database connection works
- [ ] Claude AI responds (check logs)
- [ ] No console errors

### Monitor

1. **Vercel Analytics**:
   - Dashboard → Analytics
   - Monitor: Page views, errors, performance

2. **Database**:
   - Check connection pool
   - Monitor query performance
   - Set up backups

3. **Error Tracking** (Optional):
   - Add Sentry DSN to `.env`
   - Monitor errors in real-time

---

## 📊 Environment Variables Reference

### Required (Minimum Setup)

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# AI
ANTHROPIC_API_KEY="sk-ant-..."

# Security
ENCRYPTION_KEY="64-char-hex"

# URLs
NEXT_PUBLIC_APP_URL="https://app.seology.ai"
```

### Optional (Full Setup)

```env
# Shopify
SHOPIFY_CLIENT_SECRET="shpss_..."

# Stripe
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."

# Monitoring
SENTRY_DSN="https://..."
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
```

---

## 🐛 Troubleshooting

### Database Connection Fails

```bash
# Test connection
npm run db:studio

# Regenerate client
npm run db:generate

# Check connection string format
postgresql://user:password@host:5432/database
```

### Clerk Auth Not Working

- Check API keys are correct
- Verify paths in Clerk dashboard
- Check domain is added in Clerk
- Clear cookies and retry

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Test build locally
npm run build
```

### TypeScript Errors

```bash
# Check for errors
npx tsc --noEmit

# Regenerate Prisma types
npm run db:generate
```

---

## 📦 Deployment Commands Reference

```bash
# Local Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema to database
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open Prisma Studio GUI

# Code Quality
npm run lint             # Run ESLint
npx tsc --noEmit         # Check TypeScript

# Deployment
vercel                   # Deploy to staging
vercel --prod            # Deploy to production
```

---

## 🔒 Security Checklist

- [ ] `.env.local` in `.gitignore`
- [ ] Encryption key is random (64+ chars)
- [ ] Database uses SSL connection
- [ ] Clerk production keys (not test keys)
- [ ] HTTPS enabled (Vercel handles)
- [ ] Environment variables in Vercel (not code)
- [ ] Regular database backups configured

---

## 📈 Scaling Considerations

### When to Upgrade

**Database**:
- 100+ users → Upgrade to dedicated PostgreSQL
- Consider read replicas for analytics

**Hosting**:
- Vercel Pro plan for:
  - Higher bandwidth
  - More build minutes
  - Team collaboration

**Add-ons**:
- Redis (Upstash) for queue system
- CDN for static assets
- Monitoring (Sentry, LogRocket)

---

## 🎯 Launch Checklist

### Before Launch

- [ ] All environment variables set
- [ ] Database schema pushed
- [ ] Test user journey (sign up → connect site)
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Backup strategy in place

### Day 1

- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Verify email delivery
- [ ] Test payment flow (if Stripe configured)
- [ ] Monitor API usage (Anthropic)

### Week 1

- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Monitor costs (database, AI, hosting)
- [ ] Scale resources if needed

---

## 💰 Cost Estimate (Monthly)

### Minimum Setup
- Vercel Hobby: **$0**
- Railway PostgreSQL: **$5**
- Clerk (500 MAU): **$0**
- Anthropic (5,000 requests): **$5**
- **Total**: **~$10/month**

### Production Setup
- Vercel Pro: **$20**
- Railway Pro: **$20**
- Clerk Pro: **$25**
- Anthropic (50,000 requests): **$50**
- Stripe: **2.9% + $0.30** per transaction
- **Total**: **~$115/month + transaction fees**

---

## 🆘 Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Clerk: https://clerk.com/docs
- Prisma: https://prisma.io/docs
- Vercel: https://vercel.com/docs

### Community
- Next.js Discord
- Clerk Discord
- Stack Overflow

### Internal Docs
- Setup: `README.md`
- Quick Start: `QUICK_START.md`
- Features: `BUILD_COMPLETE.md`

---

## ✅ Deployment Complete!

Once deployed, your Seology.ai platform will be live at:
- **Production**: `https://app.seology.ai`
- **API**: `https://app.seology.ai/api`

**Next Steps**:
1. Create first user account
2. Connect test Shopify store
3. Run analysis
4. Monitor performance
5. Iterate based on feedback

**You're ready to transform SEO automation!** 🚀

---

*Last Updated: 2025-10-31*
*Deployment Status: ✅ Ready*
