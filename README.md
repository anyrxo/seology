# SEOLOGY.AI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](BUILD_STATUS.md)
[![Production Ready](https://img.shields.io/badge/status-production--ready-success.svg)](https://github.com/anyrxo/seology)

> The first platform that automatically fixes SEO issues instead of just reporting them.

SEOLOGY.AI is an AI-powered SEO automation SaaS that connects to your CMS (Shopify, WordPress, or custom sites), analyzes your content for SEO problems, and automatically applies fixes - all powered by Claude AI.

## Quick Links

**Documentation**
- [Page Catalog](./PAGE_CATALOG.md) - All 25 pages documented
- [Component Usage Guide](./COMPONENT_USAGE_GUIDE.md) - How to use UI components
- [Design System](./DESIGN_SYSTEM.md) - Colors, typography, spacing
- [Animation Guide](./ANIMATION_GUIDE.md) - Animation patterns
- [UX Patterns](./UX_PATTERNS.md) - Loading, error, and form patterns
- [CLAUDE.md](./CLAUDE.md) - Developer instructions for Claude Code

**Getting Started**
- [Installation](#installation) - Set up the project
- [Tech Stack](#tech-stack) - Technologies used
- [How It Works](#how-it-works) - Product overview
- [Deployment](#deployment) - Deploy to production

---

## Key Features

- **Automatic SEO Fixes** - First platform to actually log into CMSs and make permanent changes
- **AI-Powered Analysis** - Claude 3.5 Sonnet analyzes your site for SEO issues
- **Multi-Platform Support** - Shopify, WordPress, and custom sites via Magic.js
- **Three Execution Modes** - AUTOMATIC, PLAN, or APPROVE based on your preference
- **90-Day Rollback** - Undo any fix within 90 days
- **Real-Time Notifications** - Stay informed about issues and fixes
- **Team Collaboration** - Invite team members with role-based access
- **Usage Tracking** - Monitor your plan limits and usage
- **Webhooks** - Integrate with your existing tools

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ database
- Accounts for:
  - [Clerk](https://clerk.com) (Authentication)
  - [Anthropic](https://console.anthropic.com) (Claude AI)
  - [Stripe](https://stripe.com) (Payments)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/seology-ai.git
   cd seology-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```bash
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   ANTHROPIC_API_KEY="sk-ant-..."
   ENCRYPTION_KEY="your-32-character-key"
   STRIPE_SECRET_KEY="sk_test_..."
   ```

4. **Set up the database:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Seed demo data (recommended):**
   ```bash
   npm run db:seed
   ```

   This creates comprehensive demo data including:
   - 5 demo users (1 admin, 4 regular users) with various plans
   - 10 platform connections (Shopify, WordPress, Custom)
   - 40+ realistic SEO issues across all sites
   - Applied, pending, and failed fixes
   - 30 days of performance metrics
   - Notifications, audit logs, and AI conversations

   **Demo accounts created:**
   - Admin: `admin@seology.ai` (SCALE plan, PLAN mode)
   - User 1: `sarah@example.com` (STARTER plan, APPROVE mode)
   - User 2: `michael@techstartup.io` (GROWTH plan, PLAN mode)
   - User 3: `jennifer@enterprise.com` (SCALE plan, AUTOMATIC mode)
   - User 4: `alex@shopowner.com` (STARTER plan, AUTOMATIC mode)
   - User 5: `david@digitalagency.com` (GROWTH plan, PLAN mode)

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**

   Visit [http://localhost:3000](http://localhost:3000)

---

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/UI** - Component primitives

### Backend
- **Next.js API Routes** - RESTful API
- **Prisma** - ORM for PostgreSQL
- **Anthropic Claude API** - AI analysis and fix generation
- **Bull** - Background job queue (Redis)

### Integrations
- **Clerk** - Authentication and user management
- **Stripe** - Subscription billing
- **Shopify API** - E-commerce platform integration
- **WordPress REST API** - CMS integration
- **Resend** - Transactional emails

### Infrastructure
- **Vercel** - Hosting and deployment
- **PostgreSQL** - Database (Supabase/Railway)
- **Redis** - Job queue (Upstash)

---

## Documentation

### For Users
- **[User Guide](./USER_GUIDE.md)** - Getting started, connecting sites, using features
- **[Page Catalog](./PAGE_CATALOG.md)** - Complete guide to all 25+ pages in the application

### For Developers
- **[Developer Guide](./DEVELOPER_GUIDE.md)** - Setup, architecture, contributing
- **[API Reference](./API_REFERENCE.md)** - Complete API documentation
- **[Component Usage Guide](./COMPONENT_USAGE_GUIDE.md)** - How to use all UI components
- **[Design System](./DESIGN_SYSTEM.md)** - Colors, typography, spacing, and component variants
- **[Animation Guide](./ANIMATION_GUIDE.md)** - Animation patterns and Framer Motion examples
- **[UX Patterns](./UX_PATTERNS.md)** - Loading states, error handling, forms, and navigation
- **[Changelog](./CHANGELOG.md)** - Version history and updates

---

## Application Structure

### Page Organization

SEOLOGY.AI has **25 pages** organized into 4 main sections:

```
Marketing (5 pages)
├── / - Landing page
├── /pricing - Pricing plans
├── /features - Feature showcase
├── /about - About us
└── /docs - Documentation

Authentication (2 pages)
├── /sign-in - User login
└── /sign-up - User registration

User Dashboard (11 pages)
├── /dashboard - Overview
├── /dashboard/sites - All sites
├── /dashboard/sites/connect - Connect new site
├── /dashboard/sites/[id] - Site details
├── /dashboard/issues - SEO issues
├── /dashboard/fixes - Applied fixes
├── /dashboard/analytics - Performance metrics
├── /dashboard/ai-analysis - AI insights
├── /dashboard/billing - Subscription & usage
├── /dashboard/settings - User settings
├── /dashboard/notifications - Notifications center
└── /dashboard/onboarding - 7-step wizard

Admin (6 pages)
├── /admin - Admin overview
├── /admin/users - User management
├── /admin/sites - All sites (admin view)
├── /admin/jobs - Background job queue
├── /admin/analytics - Platform analytics
└── /admin/broadcast - Send notifications
```

See **[PAGE_CATALOG.md](./PAGE_CATALOG.md)** for detailed documentation of each page.

---

## Project Structure

```
seology-ai/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages (2)
│   ├── (admin)/           # Admin dashboard (6 pages)
│   ├── (marketing)/       # Marketing pages (5)
│   ├── dashboard/         # User dashboard (11 pages)
│   ├── api/               # API routes (50+ endpoints)
│   └── page.tsx           # Landing page
├── components/            # React components (50+)
│   ├── ui/               # Base UI components (20+)
│   ├── dashboard/        # Dashboard-specific
│   ├── admin/            # Admin-specific
│   ├── marketing/        # Marketing components
│   ├── onboarding/       # 7-step wizard components
│   └── notifications/    # Notification system
├── lib/                   # Core business logic
│   ├── execution-modes.ts # Fix execution system
│   ├── claude.ts          # AI integration
│   ├── shopify.ts         # Shopify connector
│   ├── wordpress.ts       # WordPress connector
│   ├── jobs/              # Background jobs
│   ├── queue.ts           # Job queue management
│   ├── stripe.ts          # Billing integration
│   └── notifications.ts   # Notification system
├── prisma/
│   └── schema.prisma      # Database schema (15+ models)
├── public/
│   ├── magic.js           # Universal connector
│   └── images/            # Static assets
└── docs/                  # Documentation
    ├── PAGE_CATALOG.md
    ├── COMPONENT_USAGE_GUIDE.md
    ├── DESIGN_SYSTEM.md
    ├── ANIMATION_GUIDE.md
    └── UX_PATTERNS.md
```

---

## How It Works

### 1. Connect Your Site

Choose your platform and connect:

- **Shopify**: OAuth integration with product/content access
- **WordPress**: REST API with Application Passwords
- **Custom Sites**: Universal Magic.js JavaScript connector

### 2. AI Analysis

Claude AI analyzes your site to detect:

- Missing or poor meta titles/descriptions
- Broken internal/external links
- Missing H1 tags or duplicate headings
- Poor content quality (thin content)
- Missing structured data (Schema.org)
- Image alt text issues
- Page speed problems

### 3. Choose Execution Mode

Select how you want fixes to be handled:

- **AUTOMATIC**: Fixes applied immediately without approval
- **PLAN**: Review all fixes once, approve entire plan
- **APPROVE**: Review and approve each fix individually

### 4. Fixes Are Applied

SEOLOGY.AI makes actual changes to your CMS:

- Updates product meta tags in Shopify
- Modifies content in WordPress
- Applies client-side fixes via Magic.js

### 5. Monitor & Rollback

- View fix history and status
- Track SEO improvements in analytics
- Rollback any fix within 90 days if needed

---

## Key Concepts

### Execution Modes

Three ways to handle fixes based on your comfort level:

```typescript
// AUTOMATIC: Apply immediately
executeFixes(siteId, userId) → fixes applied automatically

// PLAN: Create plan for approval
executeFixes(siteId, userId) → plan created
approvePlan(siteId, userId) → all fixes applied

// APPROVE: Individual approvals
executeFixes(siteId, userId) → pending fixes created
approveFix(fixId, userId) → single fix applied
```

### Platform Connectors

Unified interface for different platforms:

```typescript
interface PlatformConnector {
  connect(credentials): Promise<void>
  applyFix(issue, fix): Promise<Result>
  testConnection(): Promise<boolean>
}
```

Implementations:
- `lib/shopify.ts` - Shopify GraphQL API
- `lib/wordpress.ts` - WordPress REST API
- `public/magic.js` - Universal JavaScript connector

### Background Jobs

Long-running tasks processed asynchronously:

- **CRAWL_SITE**: Crawl website pages using Puppeteer
- **ANALYZE_SITE**: Claude AI analysis for SEO issues
- **CLEANUP_ROLLBACKS**: Remove rollback data older than 90 days
- **RESET_USAGE**: Monthly usage quota reset

---

## API Examples

### Execute Fixes

```bash
curl -X POST https://seology.ai/api/fixes/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "siteId": "uuid",
    "issueIds": ["uuid1", "uuid2"]
  }'
```

### List Sites

```bash
curl https://seology.ai/api/sites \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Usage Stats

```bash
curl https://seology.ai/api/usage \
  -H "Authorization: Bearer YOUR_TOKEN"
```

See [API_REFERENCE.md](./API_REFERENCE.md) for complete documentation.

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

### Environment Variables

Required in production:

```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
ANTHROPIC_API_KEY="sk-ant-..."
ENCRYPTION_KEY="secure-32-char-key"
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
SHOPIFY_CLIENT_ID="..."
SHOPIFY_CLIENT_SECRET="..."
CRON_SECRET="random-secret"
REDIS_URL="redis://..."
```

### Database Migrations

```bash
# Production deployment
npx prisma migrate deploy
```

### Cron Jobs

Set up via Vercel Cron or external service:

- Cleanup: Daily at 2 AM UTC
- Usage Reset: 1st of month at midnight UTC
- Backup: Daily at 3 AM UTC

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed deployment instructions.

---

## Plans & Pricing

| Plan | Price | Sites | Fixes/Month | Team | Support |
|------|-------|-------|-------------|------|---------|
| **STARTER** | $49/mo | 3 | 500 | 1 user | Email |
| **GROWTH** | $149/mo | 10 | 5,000 | 5 users | Priority |
| **SCALE** | $499/mo | Unlimited | Unlimited | Unlimited | Dedicated |

All plans include:
- AI-powered analysis
- Automatic fixes
- 90-day rollback
- Real-time notifications
- Analytics dashboard

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write tests
5. Run linter (`npm run lint`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed contribution guidelines.

### Code Style

- Use TypeScript for all files
- Follow ESLint rules
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## Database Management

### Available Commands

```bash
# Push schema to database (no migrations)
npm run db:push

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed demo data
npm run db:seed

# Reset database and re-seed (DESTRUCTIVE!)
npm run db:reset

# Reset database without seeding
npm run db:reset-only

# Create a migration
npm run db:migrate

# Backup database (requires scripts/backup-db.sh)
npm run db:backup

# Restore database (requires scripts/restore-db.sh)
npm run db:restore
```

### Seeding Details

The seed script (`prisma/seed.ts`) creates:

**Users:**
- 1 admin user with SCALE plan
- 5 regular users across STARTER, GROWTH, and SCALE plans
- Different execution modes: AUTOMATIC, PLAN, APPROVE

**Platform Connections:**
- Multiple Shopify stores
- WordPress sites with REST API
- Custom sites using Magic.js connector
- One connection in ERROR state for testing

**SEO Issues:**
- Missing meta descriptions
- Missing alt text on images
- Broken internal links
- Duplicate content
- Slow page speed warnings
- Missing H1 headings
- Thin content alerts

**Fixes:**
- Applied fixes with timestamps
- Pending fixes awaiting approval
- Failed fixes for error handling
- 90-day rollback data

**Metrics:**
- 30 days of performance data per site
- Organic traffic trends
- Keyword rankings
- Issues detected/fixed counts

**Other Data:**
- Real-time notifications (read/unread)
- Audit logs for all actions
- AI conversation samples
- Webhook configurations
- Team setup for agency users

### Demo User Credentials

**Important:** The seed creates users with Clerk IDs that match the pattern `user_*_demo_*`. To log in with these accounts, you need to either:

1. **Option A - Mock Authentication (Development):**
   - Use Clerk's development mode
   - Manually create matching users in Clerk Dashboard

2. **Option B - Update Clerk IDs (Recommended):**
   - Create real users in Clerk
   - Update the seed script with actual Clerk IDs
   - Run `npm run db:reset`

### Resetting the Database

**Warning:** This will delete ALL data!

```bash
# Reset and re-seed in one command
npm run db:reset

# Reset only (no seeding)
npm run db:reset-only
```

The reset script includes:
- Safety check (production environments blocked)
- 3-second countdown warning
- Proper deletion order (respects foreign keys)
- Comprehensive cleanup of all tables

---

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## Security

### Reporting Vulnerabilities

Please report security vulnerabilities to security@seology.ai. Do not open public issues for security concerns.

### Security Features

- **Encryption**: All CMS credentials encrypted with AES-256-GCM
- **CSRF Protection**: State tokens for OAuth flows
- **Rate Limiting**: API rate limits based on plan
- **Webhook Signatures**: HMAC verification for webhooks
- **Audit Logs**: Complete activity tracking
- **Role-Based Access**: Team permissions and roles

---

## Roadmap

### Phase 1: Core Platform (Completed)
- [x] User authentication (Clerk)
- [x] Database schema and migrations
- [x] Shopify integration
- [x] WordPress integration
- [x] Magic.js connector
- [x] Execution modes system
- [x] Background job queue
- [x] Billing integration (Stripe)

### Phase 2: Advanced Features (In Progress)
- [x] Team collaboration
- [x] Webhooks
- [x] Advanced analytics
- [ ] Keyword rank tracking
- [ ] Competitor analysis
- [ ] Content optimization suggestions

### Phase 3: Enterprise (Planned)
- [ ] White-label solution
- [ ] API access for enterprises
- [ ] Custom integrations
- [ ] Dedicated infrastructure
- [ ] SSO support
- [ ] Advanced reporting

---

## Community

- **Discord**: [Join our community](https://discord.gg/seology)
- **Twitter**: [@seology_ai](https://twitter.com/seology_ai)
- **Blog**: [seology.ai/blog](https://seology.ai/blog)
- **YouTube**: [SEO automation tutorials](https://youtube.com/@seology)

---

## Support

### Documentation
- [User Guide](./USER_GUIDE.md)
- [API Reference](./API_REFERENCE.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)

### Contact
- **Email**: support@seology.ai
- **Live Chat**: Available in dashboard (GROWTH/SCALE plans)
- **GitHub Issues**: [Report bugs or request features](https://github.com/your-org/seology-ai/issues)

### Status
- **System Status**: [status.seology.ai](https://status.seology.ai)
- **API Status**: [api-status.seology.ai](https://api-status.seology.ai)

---

## License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://prisma.io) - Database ORM
- [Clerk](https://clerk.com) - Authentication
- [Anthropic Claude](https://anthropic.com) - AI analysis
- [Stripe](https://stripe.com) - Payments
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Vercel](https://vercel.com) - Hosting

Special thanks to the open-source community for making this possible.

---

**Made with AI by the SEOLOGY.AI team**

[Website](https://seology.ai) • [Documentation](https://docs.seology.ai) • [Twitter](https://twitter.com/seology_ai) • [Discord](https://discord.gg/seology)
# Force deployment
