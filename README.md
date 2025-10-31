# Seology.ai - SEO Automation SaaS Platform

## Overview

Seology.ai is an AI-powered SEO automation platform that actually fixes your website - not just tells you what's wrong. Built with Claude AI, Next.js 14, and Prisma.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19 RC, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Payments**: Stripe
- **Deployment**: Vercel (frontend), Railway (database)

## Project Structure

```
app-saas/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── sites/           # Sites management
│   │   ├── connect/         # Platform connection flows
│   │   ├── settings/        # User settings
│   │   └── billing/         # Subscription & usage
│   ├── api/                 # API routes
│   │   ├── auth/shopify/    # Shopify OAuth
│   │   └── connections/     # Platform connectors
│   ├── layout.tsx           # Root layout with Clerk
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
│
├── components/
│   ├── ui/                  # Shadcn/ui components
│   ├── dashboard/           # Dashboard components
│   ├── connections/         # Connection flows
│   └── shared/              # Shared components
│
├── lib/
│   ├── db.ts                # Prisma client
│   ├── claude.ts            # Claude AI integration
│   ├── encryption.ts        # AES-256 encryption utils
│   └── utils.ts             # Utility functions
│
├── prisma/
│   └── schema.prisma        # Database schema
│
└── package.json
```

## Features Implemented

### ✅ Core Infrastructure
- [x] Next.js 14 project setup with TypeScript
- [x] Tailwind CSS + Shadcn/ui components
- [x] Prisma database schema (complete from PRD)
- [x] Clerk authentication integration
- [x] Environment variables template

### ✅ Security & Utilities
- [x] AES-256-GCM encryption for OAuth tokens
- [x] Password hashing with PBKDF2
- [x] API key generation
- [x] Prisma database client

### ✅ AI Integration
- [x] Claude 3.5 Sonnet client
- [x] SEO analysis system prompt
- [x] Site analysis function
- [x] Fix generation function
- [x] AI chat interface

### ✅ Platform Connectors
- [x] Shopify OAuth flow (initiate + callback)
- [x] WordPress REST API connector
- [x] Connection storage with encryption
- [ ] Universal JavaScript connector (TODO)

### ✅ Pages
- [x] Landing page with hero & CTA
- [ ] Dashboard layout (TODO)
- [ ] Sites list page (TODO)
- [ ] Site detail page (TODO)
- [ ] Connect platform flows (TODO)

## Database Schema

Complete schema includes:
- **Users**: Clerk integration, plan, execution mode
- **Connections**: Multi-platform support (Shopify, WordPress, etc.)
- **Issues**: SEO issues detected by Claude
- **Fixes**: Applied fixes with rollback capability
- **Metrics**: Traffic & ranking analytics
- **AI Conversations**: Chat history
- **Audit Logs**: Security & compliance
- **Subscriptions**: Stripe integration
- **Usage**: Monthly fix tracking

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Database
DATABASE_URL="postgresql://..."

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Claude AI
ANTHROPIC_API_KEY=sk-ant-...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Shopify
SHOPIFY_CLIENT_ID=...
SHOPIFY_CLIENT_SECRET=...

# Encryption
ENCRYPTION_KEY=your-32-character-key
```

## Getting Started

### 1. Install Dependencies

```bash
cd app-saas
npm install
```

### 2. Set Up Database

```bash
# Create PostgreSQL database (use Railway, Supabase, or local)
# Update DATABASE_URL in .env.local

# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 3. Configure Clerk

1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Copy API keys to `.env.local`
4. Configure OAuth providers (Google, GitHub)

### 4. Configure Claude AI

1. Get API key from [console.anthropic.com](https://console.anthropic.com)
2. Add to `.env.local` as `ANTHROPIC_API_KEY`

### 5. Configure Shopify App (Optional)

1. Create Shopify Partner account
2. Create app in Partner Dashboard
3. Add OAuth redirect: `http://localhost:3000/api/auth/shopify/callback`
4. Copy Client ID and Secret to `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Next Steps (From PRD)

### Week 1: Foundation ✅
- [x] Project setup
- [x] Core dependencies
- [x] Database schema
- [x] Authentication structure
- [x] Basic utilities

### Week 2: Shopify Integration
- [x] OAuth flow
- [x] Callback handler
- [ ] Data sync (products, pages)
- [ ] First fix type implementation
- [ ] Dashboard display

### Week 3: WordPress & Universal JS
- [x] WordPress REST API connection
- [ ] WordPress fix execution
- [ ] Universal JavaScript snippet
- [ ] DOM manipulation fixes

### Week 4: Core SEO Features
- [ ] Site crawler (Puppeteer)
- [ ] Claude analysis integration
- [ ] Issue detection & storage
- [ ] Execution modes (Automatic, Plan, Approve)
- [ ] Rollback system

### Week 5: Billing & Polish
- [ ] Stripe checkout
- [ ] Subscription management
- [ ] Usage tracking
- [ ] Upgrade prompts
- [ ] Error handling

### Week 6: Launch Prep
- [ ] Marketing site pages
- [ ] Documentation
- [ ] Beta testing
- [ ] Production deployment

## API Routes

### Authentication
- `GET /api/auth/shopify?shop=example.myshopify.com` - Initiate Shopify OAuth
- `GET /api/auth/shopify/callback` - Handle Shopify callback

### Connections
- `POST /api/connections/wordpress` - Connect WordPress site
- `GET /api/connections/wordpress` - List WordPress connections

### Sites (TODO)
- `GET /api/sites` - List all connected sites
- `GET /api/sites/:id` - Get site details
- `POST /api/sites/:id/analyze` - Trigger AI analysis
- `POST /api/sites/:id/fix-all` - Apply all pending fixes

### Fixes (TODO)
- `GET /api/sites/:id/issues` - List detected issues
- `POST /api/fixes/:id/approve` - Approve a fix
- `POST /api/fixes/:id/rollback` - Rollback a fix

## Contributing

This is a private SaaS project. For questions, contact Anyro.

## License

Proprietary - All rights reserved.
