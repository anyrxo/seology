# SEOLOGY.AI Developer Guide

Complete guide for developers working on SEOLOGY.AI. This covers local development setup, architecture, testing, deployment, and contribution guidelines.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Database Management](#database-management)
6. [Development Workflow](#development-workflow)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Architecture Overview](#architecture-overview)
10. [Contributing Guidelines](#contributing-guidelines)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn
- **PostgreSQL** 14+ (or access to a PostgreSQL database)
- **Git** for version control
- **Redis** (optional, for job queue in production)
- **Code Editor** (VS Code recommended)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- GitLens

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/seology-ai.git
cd seology-ai
```

### 2. Install Dependencies

```bash
npm install
```

This will:
- Install all project dependencies
- Run Prisma client generation automatically (via postinstall script)

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables) section).

### 4. Set Up the Database

**Option A: Local PostgreSQL**

```bash
# Create database
createdb seology_ai_dev

# Set DATABASE_URL in .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/seology_ai_dev"
DIRECT_URL="postgresql://username:password@localhost:5432/seology_ai_dev"
```

**Option B: Supabase (Recommended)**

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings > Database
4. Update `.env.local`:

```bash
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

### 5. Generate Encryption Key

Generate a secure encryption key for storing credentials:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env.local`:

```bash
ENCRYPTION_KEY="your-generated-key-here"
```

### 6. Run Database Migrations

```bash
npx prisma db push
```

This creates all tables in your database based on the Prisma schema.

### 7. Seed the Database (Optional)

```bash
npx prisma db seed
```

Creates sample data for development.

### 8. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 9. Open Prisma Studio (Optional)

View and edit database records:

```bash
npx prisma studio
```

Opens at [http://localhost:5555](http://localhost:5555).

---

## Project Structure

```
seology-ai/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Auth pages (route group)
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (admin)/                  # Admin dashboard (route group)
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── analytics/
│   │       └── users/
│   ├── dashboard/                # User dashboard
│   │   ├── page.tsx
│   │   ├── sites/
│   │   ├── fixes/
│   │   ├── billing/
│   │   └── onboarding/
│   ├── api/                      # API routes
│   │   ├── sites/
│   │   ├── fixes/
│   │   ├── jobs/
│   │   ├── webhooks/
│   │   ├── billing/
│   │   └── cron/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── dashboard/                # Dashboard-specific
│   ├── admin/                    # Admin-specific
│   ├── marketing/                # Marketing site
│   └── onboarding/               # Onboarding wizard
├── lib/                          # Core library code
│   ├── db.ts                     # Prisma client
│   ├── claude.ts                 # Claude AI integration
│   ├── shopify.ts                # Shopify connector
│   ├── wordpress.ts              # WordPress connector
│   ├── execution-modes.ts        # Fix execution logic
│   ├── encryption.ts             # Encryption utilities
│   ├── stripe.ts                 # Billing integration
│   ├── usage.ts                  # Usage tracking
│   ├── notifications.ts          # Notification system
│   ├── queue.ts                  # Job queue
│   └── jobs/                     # Background jobs
│       ├── index.ts
│       ├── crawl-job.ts
│       └── analysis-job.ts
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding
├── public/
│   ├── magic.js                  # Universal connector
│   ├── images/
│   └── fonts/
├── types/                        # TypeScript type definitions
├── .env.example                  # Example environment variables
├── .eslintrc.json                # ESLint configuration
├── next.config.js                # Next.js configuration
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Key Directories Explained

**`app/`** - Next.js 14 App Router with file-based routing. Route groups `(auth)` and `(admin)` organize routes without affecting URLs.

**`lib/`** - Core business logic, separated from UI components. Each file handles a specific domain (AI, billing, platforms, etc.).

**`components/`** - React components organized by feature area. `ui/` contains reusable primitives based on Shadcn.

**`prisma/`** - Database schema and migrations. Schema is the source of truth for data models.

---

## Environment Variables

Create `.env.local` with these variables:

### Required

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard/onboarding"

# Claude AI
ANTHROPIC_API_KEY="sk-ant-..."

# Encryption (32+ characters)
ENCRYPTION_KEY="your-32-character-encryption-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Optional

```bash
# Shopify OAuth
SHOPIFY_CLIENT_ID="0b87ac78cf0783fd1dd829bf5421fae5"
SHOPIFY_CLIENT_SECRET="your-shopify-secret"

# Cron Job Security
CRON_SECRET="random-secret-string"

# Redis (for production job queue)
REDIS_URL="redis://localhost:6379"

# Email (Resend)
RESEND_API_KEY="re_..."

# Logging
NODE_ENV="development"
```

### Getting API Keys

**Clerk (Authentication):**
1. Sign up at [clerk.com](https://clerk.com)
2. Create an application
3. Copy keys from Dashboard > API Keys

**Anthropic (Claude AI):**
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Create API key in Settings
3. Add credits to your account

**Stripe (Billing):**
1. Sign up at [stripe.com](https://stripe.com)
2. Get test keys from Dashboard > Developers > API Keys
3. Set up webhook endpoint at Dashboard > Developers > Webhooks

**Shopify (Optional):**
1. Create Shopify Partner account
2. Create a custom app
3. Get API credentials from App Setup

---

## Database Management

### Prisma Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Push schema to database (dev)
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Format schema file
npx prisma format
```

### Schema Modification Workflow

1. Edit `prisma/schema.prisma`
2. Run `npx prisma format` to format
3. Run `npx prisma db push` to update local database
4. Run `npx prisma generate` to update TypeScript types
5. Test changes locally
6. Create migration: `npx prisma migrate dev --name add_feature`
7. Commit migration files to Git

### Database Seeding

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const user = await prisma.user.create({
    data: {
      clerkId: 'test_user_123',
      email: 'test@example.com',
      name: 'Test User',
      plan: 'GROWTH',
      role: 'USER',
      executionMode: 'PLAN'
    }
  })

  console.log('Created user:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run with: `npx prisma db seed`

---

## Development Workflow

### Starting Development

```bash
# Terminal 1: Start Next.js dev server
npm run dev

# Terminal 2: Watch Prisma schema changes
npx prisma studio

# Terminal 3: Run tests in watch mode (optional)
npm run test:watch
```

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Run linter:**
   ```bash
   npm run lint
   ```

4. **Test locally:**
   ```bash
   npm run build
   npm start
   ```

5. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

6. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- Use TypeScript for all files
- Follow ESLint rules
- Use Prettier for formatting
- Write JSDoc comments for functions
- Use meaningful variable names
- Keep functions small and focused
- Avoid deeply nested conditionals

### File Naming Conventions

- **Components:** PascalCase (e.g., `UserProfile.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **API Routes:** kebab-case (e.g., `approve-plan/route.ts`)
- **Types:** PascalCase with `.d.ts` or inline

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

Create test files alongside source files:

```
lib/
├── shopify.ts
└── shopify.test.ts
```

Example test:

```typescript
import { applyShopifyFix } from './shopify'
import { db } from './db'

describe('applyShopifyFix', () => {
  it('should apply meta title fix', async () => {
    const connection = await db.connection.create({
      data: {
        userId: 'test',
        platform: 'SHOPIFY',
        domain: 'test.myshopify.com',
        accessToken: 'encrypted_token'
      }
    })

    const issue = {
      id: 'issue-1',
      type: 'missing_meta_title',
      pageUrl: '/products/test',
      details: '{}'
    }

    const fixCode = JSON.stringify({ title: 'Test Product' })

    const result = await applyShopifyFix(connection, issue, fixCode)

    expect(result.success).toBe(true)
  })
})
```

### Testing API Routes

Use Supertest for API testing:

```typescript
import request from 'supertest'
import { createMocks } from 'node-mocks-http'

describe('POST /api/sites', () => {
  it('should create a new site connection', async () => {
    const response = await request(app)
      .post('/api/sites')
      .send({
        platform: 'WORDPRESS',
        domain: 'example.com',
        credentials: { username: 'admin', password: 'pass' }
      })
      .expect(200)

    expect(response.body.success).toBe(true)
    expect(response.body.data.platform).toBe('WORDPRESS')
  })
})
```

---

## Deployment

### Vercel (Recommended)

1. **Connect Repository:**
   - Sign up at [vercel.com](https://vercel.com)
   - Import Git repository
   - Select Next.js framework preset

2. **Configure Environment Variables:**
   - Add all production environment variables
   - Use production API keys (not test keys)
   - Set `NODE_ENV=production`

3. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy:**
   - Push to `main` branch triggers automatic deployment
   - Or click "Deploy" in Vercel dashboard

### Database Setup (Production)

**Supabase:**
1. Create production project
2. Enable connection pooling
3. Set both `DATABASE_URL` (pooled) and `DIRECT_URL` (direct)
4. Run migrations: `npx prisma migrate deploy`

**Railway/Render:**
1. Create PostgreSQL instance
2. Get connection string
3. Set as `DATABASE_URL` in Vercel
4. Run migrations

### Cron Jobs Setup

Set up cron jobs to hit these endpoints:

```bash
# Cleanup old rollback data (daily)
curl -X POST https://seology.ai/api/cron/cleanup \
  -H "x-cron-secret: YOUR_CRON_SECRET"

# Reset monthly usage (1st of month)
curl -X POST https://seology.ai/api/cron/reset-usage \
  -H "x-cron-secret: YOUR_CRON_SECRET"

# Backup database (daily)
curl -X POST https://seology.ai/api/cron/backup \
  -H "x-cron-secret: YOUR_CRON_SECRET"
```

**Vercel Cron (Recommended):**

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/reset-usage",
      "schedule": "0 0 1 * *"
    },
    {
      "path": "/api/cron/backup",
      "schedule": "0 3 * * *"
    }
  ]
}
```

### Redis Setup (Job Queue)

For production job queue, set up Redis:

**Upstash (Recommended):**
1. Sign up at [upstash.com](https://upstash.com)
2. Create Redis database
3. Copy REST URL
4. Set `REDIS_URL` in Vercel environment variables

### Monitoring & Logging

**Vercel Analytics:**
- Automatic page analytics
- Enable in Vercel project settings

**Sentry (Error Tracking):**
1. Sign up at [sentry.io](https://sentry.io)
2. Install SDK: `npm install @sentry/nextjs`
3. Configure in `sentry.client.config.ts`

**Logging:**
- Use `console.log` for development
- Use structured logging in production:

```typescript
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
})

logger.info({ userId, action: 'fix_applied' }, 'Fix applied successfully')
```

---

## Architecture Overview

### Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk
- **AI:** Claude 3.5 Sonnet (Anthropic)
- **Payments:** Stripe
- **Job Queue:** Bull (Redis-backed)
- **Deployment:** Vercel

### Key Architectural Decisions

#### 1. Execution Modes System

Three modes (AUTOMATIC, PLAN, APPROVE) allow flexibility:

```typescript
// lib/execution-modes.ts

export async function executeFixes(
  siteId: string,
  userId: string,
  issueIds?: string[]
) {
  const user = await getUser(userId)

  switch (user.executionMode) {
    case 'AUTOMATIC':
      return executeAutomatic(context)
    case 'PLAN':
      return executePlan(context)
    case 'APPROVE':
      return executeApprove(context)
  }
}
```

#### 2. Platform Abstraction

Unified interface for different CMS platforms:

```typescript
// lib/platforms/base.ts

interface PlatformConnector {
  connect(credentials: any): Promise<void>
  applyFix(issue: Issue, fix: Fix): Promise<Result>
  testConnection(): Promise<boolean>
}

// lib/shopify.ts, lib/wordpress.ts implement this
```

#### 3. Job Queue System

Background jobs for long-running tasks:

```typescript
// lib/queue.ts

export async function createJob(type: JobType, data: any) {
  return jobQueue.add(type, data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 }
  })
}

// lib/jobs/index.ts processes jobs
```

#### 4. Encryption for Credentials

All sensitive data encrypted at rest:

```typescript
// lib/encryption.ts

// Uses AES-256-GCM with salt and IV
export function encrypt(text: string): string
export function decrypt(encrypted: string): string
```

#### 5. Usage Tracking & Enforcement

Track and enforce plan limits:

```typescript
// lib/usage.ts

export async function canApplyFixes(userId: string, count: number) {
  const usage = await getMonthlyUsage(userId)
  const limit = getPlanLimit(user.plan)

  return {
    allowed: usage.fixes + count <= limit,
    remaining: limit - usage.fixes
  }
}
```

### Data Flow Example: Applying a Fix

1. User clicks "Apply Fixes" in dashboard
2. Frontend calls `POST /api/fixes/execute`
3. API route checks authentication (Clerk)
4. Checks usage limits (`lib/usage.ts`)
5. Calls `executeFixes()` from `lib/execution-modes.ts`
6. Routes to correct mode (AUTOMATIC/PLAN/APPROVE)
7. For AUTOMATIC mode:
   - Gets issues to fix from database
   - For each issue:
     - Generates fix using Claude AI
     - Applies fix to platform (Shopify/WordPress)
     - Creates fix record in database
     - Updates issue status to FIXED
     - Creates notification
     - Creates audit log
8. Returns results to frontend
9. Frontend updates UI with success/error messages

---

## Contributing Guidelines

### How to Contribute

1. **Find an Issue:**
   - Check GitHub Issues for open tasks
   - Look for issues labeled `good-first-issue`
   - Or propose a new feature

2. **Discuss First:**
   - Comment on the issue
   - Get assignment from maintainers
   - Clarify requirements

3. **Fork & Branch:**
   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make Changes:**
   - Follow code style guidelines
   - Write tests for new features
   - Update documentation

5. **Test Thoroughly:**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

6. **Submit PR:**
   - Clear title and description
   - Reference related issues
   - Include screenshots if UI changes
   - Wait for review

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested this

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Code Review Process

1. Automated checks run (linting, tests)
2. Maintainer reviews code
3. Feedback provided via comments
4. Make requested changes
5. Re-review
6. Merge when approved

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body

footer
```

Examples:
```
feat(fixes): add rollback functionality
fix(api): handle empty issue array
docs(readme): update installation steps
refactor(db): optimize query performance
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## Additional Resources

### Documentation
- [API Reference](./API_REFERENCE.md)
- [User Guide](./USER_GUIDE.md)
- [Component Library](./COMPONENTS_LIBRARY.md)

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [Stripe Docs](https://stripe.com/docs)

### Community
- Discord: https://discord.gg/seology
- GitHub Discussions: https://github.com/your-org/seology-ai/discussions
- Twitter: @seology_ai

---

## Troubleshooting

### Common Development Issues

**"Prisma Client not generated"**
```bash
npx prisma generate
```

**"Database connection failed"**
- Check DATABASE_URL in .env.local
- Verify PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

**"Clerk authentication not working"**
- Verify NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set
- Check Clerk dashboard for correct URLs
- Clear browser cookies and try again

**"API route returning 500"**
- Check server logs in terminal
- Verify environment variables are set
- Test API endpoint with curl/Postman

**"Build fails with TypeScript errors"**
- Run `npx prisma generate` to update types
- Check for missing imports
- Verify all dependencies are installed

---

## License

MIT License - See LICENSE file for details

---

**Questions?** Open an issue on GitHub or contact developers@seology.ai
