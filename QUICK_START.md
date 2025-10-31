# ⚡ Seology.ai - Quick Start Guide

Get your SEO automation platform running in 10 minutes!

## 📋 Prerequisites

- Node.js 20+ installed
- PostgreSQL database (or use Railway/Supabase)
- Clerk account (free)
- Claude AI API key

---

## 🚀 Quick Setup (5 Steps)

### 1. Install Dependencies

```bash
cd app-saas
npm install
```

### 2. Create `.env.local` File

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Database (use Railway, Supabase, or local PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/seology"

# Clerk (get from clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Claude AI (get from console.anthropic.com)
ANTHROPIC_API_KEY="sk-ant-..."

# Encryption (generate random 32 characters)
ENCRYPTION_KEY="your-32-character-encryption-key"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### 3. Set Up Database

```bash
# Push Prisma schema to database
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 4. Configure Clerk

1. Go to [clerk.com](https://clerk.com) → Create account
2. Create new application
3. Copy publishable and secret keys to `.env.local`
4. In Clerk Dashboard:
   - **Paths** → Set sign-in: `/sign-in`, sign-up: `/sign-up`
   - **OAuth** → Enable Google and GitHub (optional)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🧪 Test the Platform

### 1. Create Account
- Go to http://localhost:3000
- Click "Start Free Trial"
- Sign up with email or Google

### 2. Connect a Shopify Store (Optional)
If you have a Shopify Partner account:

1. Create Shopify app in Partner Dashboard
2. Add these to `.env.local`:
   ```env
   SHOPIFY_CLIENT_ID="your-client-id"
   SHOPIFY_CLIENT_SECRET="your-client-secret"
   SHOPIFY_REDIRECT_URI="http://localhost:3000/api/auth/shopify/callback"
   ```
3. In Dashboard → Click "Connect Site" → Shopify
4. Enter your test store URL

### 3. Connect a WordPress Site
1. In Dashboard → Click "Connect Site" → WordPress
2. Enter your WordPress site URL
3. Generate Application Password in WordPress:
   - Users → Your Profile → Application Passwords
   - Name it "Seology"
   - Copy the password
4. Enter username and password in Seology

---

## 📦 Database Schema

The platform includes 11 tables:

```
✅ Users          - Accounts with plans
✅ Connections    - Connected websites
✅ Issues         - SEO problems detected
✅ Fixes          - Applied solutions
✅ Metrics        - Traffic & rankings
✅ AIConversations - Chat history
✅ AuditLogs      - Security tracking
✅ Subscriptions  - Billing (Stripe)
✅ Usage          - Monthly limits
```

View schema: `prisma/schema.prisma`

---

## 🎨 Pages Available

### Public
- `/` - Landing page
- `/sign-in` - Login
- `/sign-up` - Create account

### Dashboard (Protected)
- `/dashboard` - Overview with stats
- `/dashboard/sites` - All connected sites
- `/dashboard/connect` - Add new site
- `/dashboard/settings` - User preferences
- `/dashboard/billing` - Subscription (coming soon)

---

## 🔑 API Endpoints

### Shopify
- `GET /api/auth/shopify?shop=example.myshopify.com`
- `GET /api/auth/shopify/callback`

### WordPress
- `POST /api/connections/wordpress`
  ```json
  {
    "siteUrl": "https://myblog.com",
    "username": "admin",
    "applicationPassword": "xxxx xxxx xxxx xxxx"
  }
  ```

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Database commands
npm run db:push      # Push schema to DB
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio GUI
```

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run db:generate
```

### Prisma client errors
```bash
npm run db:generate
```

### Clerk errors
- Check API keys in `.env.local`
- Verify redirect URLs in Clerk Dashboard match your URLs

### Database connection errors
- Verify DATABASE_URL is correct
- Test connection: `npm run db:studio`
- Check PostgreSQL is running

---

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with Clerk |
| `app/(dashboard)/layout.tsx` | Dashboard layout |
| `lib/claude.ts` | Claude AI integration |
| `lib/shopify.ts` | Shopify service |
| `lib/encryption.ts` | Security utilities |
| `prisma/schema.prisma` | Database schema |
| `middleware.ts` | Route protection |

---

## 🎯 Next Steps

### Immediate
- [ ] Add site detail page (`/dashboard/sites/[id]`)
- [ ] Build issues list page
- [ ] Create fix approval UI
- [ ] Add settings page with execution mode

### Week 3
- [ ] Stripe billing integration
- [ ] Usage tracking & limits
- [ ] Queue system (Bull + Redis)
- [ ] Email notifications (Resend)

### Week 4-6
- [ ] Additional platforms (Wix, Webflow)
- [ ] Advanced SEO fixes
- [ ] Analytics dashboard
- [ ] Production deployment

---

## 📖 Documentation

- **Full PRD**: `../SEOLOGY-PRD-COMPLETE.md` (3,000+ lines)
- **Setup Guide**: `README.md`
- **Progress**: `PROJECT_STATUS.md`
- **Summary**: `IMPLEMENTATION_COMPLETE.md`

---

## 🆘 Need Help?

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Prisma Docs](https://prisma.io/docs)
- [Claude AI Docs](https://docs.anthropic.com)

### Common Issues
1. **Port 3000 in use**: Use `npm run dev -- -p 3001`
2. **Database connection**: Check `DATABASE_URL` format
3. **Clerk redirect**: Verify paths in Clerk Dashboard
4. **Prisma errors**: Run `npm run db:generate`

---

## ✨ Features Ready to Use

- ✅ User authentication (Clerk)
- ✅ Shopify OAuth connection
- ✅ WordPress REST API connection
- ✅ Claude AI SEO analysis
- ✅ Dashboard with stats
- ✅ Sites management
- ✅ Platform connection flows
- ✅ Secure token encryption
- ✅ Database with 11 models

---

## 🎉 You're All Set!

Your Seology.ai platform is ready to:
1. **Connect websites** (Shopify, WordPress, Custom)
2. **Analyze SEO** with Claude AI
3. **Apply fixes** automatically
4. **Track progress** in dashboard

Start by signing up and connecting your first site! 🚀

---

**Questions?** Check `README.md` or `IMPLEMENTATION_COMPLETE.md`

**Happy automating!** 🤖✨
