# SEOLOGY.AI - Developer Guide

Technical guide for developers extending and maintaining the SEOLOGY.AI Shopify app.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Development Setup](#development-setup)
4. [Key Design Patterns](#key-design-patterns)
5. [Database Schema](#database-schema)
6. [Adding New Features](#adding-new-features)
7. [Testing](#testing)
8. [Performance Optimization](#performance-optimization)
9. [Security Considerations](#security-considerations)
10. [Contributing](#contributing)

---

## Architecture Overview

SEOLOGY.AI is built as a Next.js 14 App Router application with the following architecture:

```
┌─────────────────┐
│  Shopify Admin  │
│   (Merchant)    │
└────────┬────────┘
         │ OAuth
         ↓
┌─────────────────────────────────────┐
│         SEOLOGY.AI (Next.js)        │
├─────────────────────────────────────┤
│  ┌──────────┐    ┌──────────────┐  │
│  │ Frontend │    │  API Routes  │  │
│  │  Pages   │←───│  (Shopify)   │  │
│  └──────────┘    └──────┬───────┘  │
│                          │          │
│  ┌──────────────────────┴────────┐ │
│  │    Core Libraries             │ │
│  │ - shopify-client.ts           │ │
│  │ - automation-engine.ts        │ │
│  │ - seo-agents.ts               │ │
│  └──────────┬────────────────────┘ │
└─────────────┼──────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼────┐      ┌──────▼──────┐
│ Claude │      │  PostgreSQL │
│   AI   │      │  (Prisma)   │
└────────┘      └─────────────┘
```

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/UI, Radix UI, Shopify Polaris
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Anthropic Claude 3.5 Sonnet
- **Authentication**: Shop parameter (Shopify OAuth)
- **Deployment**: Vercel
- **Cron Jobs**: Vercel Cron

### Key Architectural Decisions

**Why Next.js 14 App Router?**
- Server Components for better performance
- Built-in API routes
- File-based routing
- Excellent Vercel integration

**Why Prisma ORM?**
- Type-safe database queries
- Auto-generated client
- Migration system
- Connection pooling

**Why PostgreSQL?**
- Complex relational data (35+ models)
- ACID compliance for financial data
- JSON field support for flexible data
- Excellent performance with indexes

**Why Shop Parameter Auth?**
- Standard for Shopify embedded apps
- No need for separate user management
- Seamless integration with Shopify Admin
- Automatic token refresh

---

## Project Structure

```
seology-ai/
├── app/
│   ├── api/
│   │   ├── shopify/              # Shopify app API routes
│   │   │   ├── products/         # Product endpoints
│   │   │   ├── analyze/          # AI analysis
│   │   │   ├── fix/              # Apply fixes
│   │   │   ├── agents/           # AI agents
│   │   │   ├── timeline/         # Timeline & checkpoints
│   │   │   ├── analytics/        # Usage analytics
│   │   │   ├── monitor/          # Execution monitoring
│   │   │   └── settings/         # User settings
│   │   ├── webhooks/
│   │   │   └── shopify/          # Webhook handlers
│   │   ├── cron/
│   │   │   └── auto-scan/        # Automation cron
│   │   └── onboarding/           # Onboarding API
│   ├── shopify/                  # Frontend pages
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── agents/
│   │   ├── timeline/
│   │   ├── analytics/
│   │   ├── monitor/
│   │   ├── fixes/
│   │   ├── settings/
│   │   ├── support/
│   │   ├── chat/
│   │   ├── onboarding/
│   │   └── layout.tsx            # Shopify app layout
│   └── globals.css
├── lib/
│   ├── shopify-client.ts         # Shopify GraphQL client
│   ├── shopify-session-storage.ts # Session management
│   ├── automation-engine.ts      # Background automation
│   ├── seo-agents.ts             # AI agent system
│   ├── seo-analysis-helpers.ts   # SEO scoring logic
│   ├── usage-tracker.ts          # Claude usage tracking
│   ├── image-scanner.ts          # Image asset detection
│   ├── image-optimizer.ts        # Claude Vision alt text
│   ├── schema-generator.ts       # Schema.org generator
│   ├── meta-generator.ts         # Meta tag optimizer
│   ├── encryption.ts             # Token encryption
│   ├── errors.ts                 # Error classes
│   ├── validation.ts             # Zod schemas
│   ├── rate-limiter.ts           # Rate limiting
│   ├── db.ts                     # Prisma client
│   └── utils.ts                  # Utilities
├── components/
│   ├── ui/                       # Shadcn components
│   ├── shopify/                  # Shopify-specific
│   └── shared/                   # Reusable components
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed data
│   └── migrations/               # Database migrations
├── docs/                         # Documentation
├── public/                       # Static assets
├── types/                        # TypeScript types
├── .env.example                  # Environment template
├── vercel.json                   # Vercel config
├── package.json
└── tsconfig.json
```

---

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Anthropic API key
- Shopify Partner account

### Setup Steps

1. **Clone repository**:
```bash
git clone https://github.com/your-org/seology-ai.git
cd seology-ai
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment**:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/seology"
ANTHROPIC_API_KEY="sk-ant-..."
SHOPIFY_CLIENT_ID="your_client_id"
SHOPIFY_CLIENT_SECRET="your_client_secret"
ENCRYPTION_KEY="your_32_character_key"
CRON_SECRET="your_random_secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Initialize database**:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. **Start development server**:
```bash
npm run dev
```

6. **Test Shopify OAuth** (requires ngrok or similar):
```bash
# In another terminal
ngrok http 3000

# Update NEXT_PUBLIC_APP_URL in .env.local
NEXT_PUBLIC_APP_URL="https://your-ngrok-url.ngrok.io"

# Update Shopify Partner Dashboard URLs:
# - App URL: https://your-ngrok-url.ngrok.io/shopify/dashboard
# - Redirect URL: https://your-ngrok-url.ngrok.io/api/auth/shopify/callback
```

### Development Workflow

**Daily workflow**:
1. Pull latest changes: `git pull origin main`
2. Install dependencies: `npm install`
3. Update Prisma client: `npx prisma generate`
4. Run dev server: `npm run dev`
5. Make changes
6. Test locally
7. Commit: `git commit -m "feat: add feature"`
8. Push: `git push origin feature-branch`
9. Open PR for review

---

## Key Design Patterns

### 1. Shop Parameter Authentication

All Shopify API routes follow this pattern:

```typescript
// app/api/shopify/products/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop')

  if (!shop) {
    return NextResponse.json(
      { error: { code: 'AUTHENTICATION_REQUIRED', message: 'Shop parameter missing' } },
      { status: 401 }
    )
  }

  // Retrieve session for this shop
  const session = await retrieveSession(shop)
  if (!session) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'No active session' } },
      { status: 403 }
    )
  }

  // Use session.accessToken for Shopify API calls
  const products = await shopifyGraphQL(shop, { query: '...' })

  return NextResponse.json({ success: true, data: products })
}
```

### 2. Error Handling with Custom Errors

```typescript
// lib/errors.ts
export class ShopifyAPIError extends Error {
  constructor(message: string, public details?: any) {
    super(message)
    this.name = 'ShopifyAPIError'
  }
}

// Usage in API route
try {
  const result = await shopifyGraphQL(shop, query)
  if (result.errors) {
    throw new ShopifyAPIError('GraphQL errors', result.errors)
  }
} catch (error) {
  if (error instanceof ShopifyAPIError) {
    return NextResponse.json({
      error: {
        code: 'SHOPIFY_API_ERROR',
        message: error.message,
        details: error.details
      }
    }, { status: 502 })
  }
  throw error // Re-throw unknown errors
}
```

### 3. Database Queries with Prisma

```typescript
import { db } from '@/lib/db'

// Always filter by connection to ensure data isolation
const products = await db.shopifyProduct.findMany({
  where: {
    connectionId: connection.id,
    seoScore: { lt: 50 } // Low score filter
  },
  orderBy: { seoScore: 'asc' },
  take: 20,
  skip: (page - 1) * 20
})

// Use transactions for multi-step operations
await db.$transaction([
  db.fix.create({ data: { ... } }),
  db.issue.update({ where: { id: issueId }, data: { status: 'FIXED' } }),
  db.auditLog.create({ data: { action: 'FIX_APPLIED', ... } })
])
```

### 4. Claude AI Integration

```typescript
import Anthropic from '@anthropic-ai/sdk'
import { trackUsage } from '@/lib/usage-tracker'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

async function analyzeProduct(product: any) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20250107',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `Analyze this product for SEO: ${JSON.stringify(product)}`
    }]
  })

  // Track usage for analytics
  await trackUsage({
    userId: connection.userId,
    model: 'claude-3-5-sonnet-20250107',
    tokensInput: response.usage.input_tokens,
    tokensOutput: response.usage.output_tokens,
    endpoint: 'product_analysis'
  })

  return response.content[0].text
}
```

### 5. Webhook Handling

```typescript
// app/api/webhooks/shopify/route.ts
import crypto from 'crypto'

export async function POST(request: Request) {
  const body = await request.text()
  const hmac = request.headers.get('X-Shopify-Hmac-Sha256')
  const topic = request.headers.get('X-Shopify-Topic')
  const shop = request.headers.get('X-Shopify-Shop-Domain')

  // Verify webhook signature
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_CLIENT_SECRET!)
    .update(body)
    .digest('base64')

  if (hash !== hmac) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
  }

  const payload = JSON.parse(body)

  // Handle different webhook topics
  switch (topic) {
    case 'products/update':
      await handleProductUpdate(shop, payload)
      break
    case 'app/uninstalled':
      await handleAppUninstall(shop)
      break
  }

  return NextResponse.json({ success: true })
}
```

---

## Database Schema

### Core Models

**User** (linked to Shopify store):
```prisma
model User {
  id      String  @id @default(uuid())
  clerkId String? @unique  // Optional: for admin panel
  email   String  @unique
  plan    Plan    @default(STARTER)

  executionMode ExecutionMode @default(AUTOMATIC)

  connections Connection[]
  // ... relations
}
```

**Connection** (Shopify store connection):
```prisma
model Connection {
  id     String @id @default(uuid())
  userId String

  platform Platform @default(SHOPIFY)
  domain   String   // store.myshopify.com

  accessToken  String? // Encrypted OAuth token
  refreshToken String?

  status ConnectionStatus @default(CONNECTED)

  // Relations
  shopifyProducts ShopifyProduct[]
  issues          Issue[]
  fixes           Fix[]
}
```

**ShopifyProduct**:
```prisma
model ShopifyProduct {
  id              String @id @default(uuid())
  connectionId    String
  shopifyProductId String  // Shopify's product.id

  title           String
  seoScore        Int @default(0)
  lastAnalyzedAt  DateTime?

  // SEO fields
  metaTitle       String?
  metaDescription String?

  // ... more fields
}
```

### Indexes for Performance

Critical indexes (already in schema):

```prisma
// Compound index for automation queries
@@index([connectionId, status, detectedAt])

// Covering index for product listing
@@index([connectionId, seoScore, lastAnalyzedAt])

// Unique constraint for preventing duplicates
@@unique([connectionId, shopifyProductId])
```

### Migrations

**Creating a migration**:
```bash
npx prisma migrate dev --name add_new_field
```

**Applying migrations in production**:
```bash
npx prisma migrate deploy
```

**Rolling back** (manual):
```sql
-- Find migration to rollback
SELECT * FROM _prisma_migrations ORDER BY finished_at DESC;

-- Manually revert changes, then mark as rolled back
DELETE FROM _prisma_migrations WHERE migration_name = '20251107_add_field';
```

---

## Adding New Features

### Example: Adding a New AI Agent Template

**Step 1: Define agent in database seed**:

```typescript
// prisma/seed.ts
await db.sEOAgent.create({
  data: {
    userId: systemUserId,
    connectionId: systemConnectionId,
    name: 'Collection Description Optimizer',
    description: 'Optimizes collection page descriptions for SEO',
    specialty: 'collection_description',
    systemPrompt: `You are an expert SEO copywriter specializing in category/collection pages.

Your task:
1. Analyze the collection title and products
2. Write an engaging, keyword-rich description (150-300 words)
3. Include target keywords naturally
4. Add a call-to-action

Return JSON:
{
  "description": "optimized description text",
  "keywords": ["keyword1", "keyword2"],
  "reasoning": "why this approach"
}`,
    isTemplate: true,
    isPublic: true,
    model: 'claude-3-5-sonnet-20250107',
    temperature: 0.7,
    maxTokens: 1500
  }
})
```

**Step 2: Create execution logic**:

```typescript
// lib/seo-agents.ts
export async function executeCollectionAgent(
  agentId: string,
  collectionId: string,
  connectionId: string
) {
  const agent = await db.sEOAgent.findUnique({ where: { id: agentId } })
  const collection = await fetchCollection(connectionId, collectionId)

  const response = await anthropic.messages.create({
    model: agent.model,
    max_tokens: agent.maxTokens,
    temperature: agent.temperature,
    messages: [{
      role: 'user',
      content: `${agent.systemPrompt}\n\nCollection: ${JSON.stringify(collection)}`
    }]
  })

  const result = JSON.parse(response.content[0].text)

  // Apply fix if agent is set to auto-apply
  if (agent.autoApply) {
    await applyCollectionDescriptionFix(collectionId, result.description)
  }

  return result
}
```

**Step 3: Add API endpoint**:

```typescript
// app/api/shopify/agents/collection/route.ts
export async function POST(request: Request) {
  const { agentId, collectionId } = await request.json()
  const shop = new URL(request.url).searchParams.get('shop')!

  const connection = await getConnection(shop)
  const result = await executeCollectionAgent(agentId, collectionId, connection.id)

  return NextResponse.json({ success: true, data: result })
}
```

**Step 4: Add frontend UI**:

```tsx
// app/shopify/agents/page.tsx
export default function AgentsPage() {
  const agents = useAgents()

  return (
    <div>
      {agents.map(agent => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onExecute={(targetId) => executeAgent(agent.id, targetId)}
        />
      ))}
    </div>
  )
}
```

### Example: Adding a New SEO Issue Type

**Step 1: Define issue detection logic**:

```typescript
// lib/seo-analysis-helpers.ts
export function detectCanonicalIssues(product: ShopifyProduct): Issue[] {
  const issues: Issue[] = []

  if (!product.canonicalUrl) {
    issues.push({
      type: 'missing_canonical',
      severity: 'MEDIUM',
      title: 'Missing canonical URL',
      description: 'Product has no canonical URL set',
      recommendation: 'Add canonical URL to prevent duplicate content issues',
      elementSelector: 'meta[rel="canonical"]'
    })
  } else if (!isValidCanonical(product.canonicalUrl)) {
    issues.push({
      type: 'invalid_canonical',
      severity: 'HIGH',
      title: 'Invalid canonical URL',
      description: 'Canonical URL points to non-existent page',
      recommendation: 'Fix canonical URL to point to the correct page'
    })
  }

  return issues
}
```

**Step 2: Integrate into analysis**:

```typescript
// lib/seo-analysis-helpers.ts
export async function analyzeProduct(product: ShopifyProduct): Promise<AnalysisResult> {
  const issues = [
    ...detectMetaIssues(product),
    ...detectImageIssues(product),
    ...detectCanonicalIssues(product), // NEW
    // ... other checks
  ]

  return {
    seoScore: calculateSeoScore(issues),
    issues,
    strengths: identifyStrengths(product),
    opportunities: identifyOpportunities(issues)
  }
}
```

**Step 3: Add fix handler**:

```typescript
// lib/fix-handlers.ts
export async function fixCanonicalUrl(
  productId: string,
  suggestedUrl: string,
  connectionId: string
) {
  const mutation = `
    mutation updateProduct($input: ProductInput!) {
      productUpdate(input: $input) {
        product { id }
        userErrors { field message }
      }
    }
  `

  const result = await shopifyGraphQL(connectionId, {
    query: mutation,
    variables: {
      input: {
        id: productId,
        seo: { canonicalUrl: suggestedUrl }
      }
    }
  })

  return result
}
```

---

## Testing

### Unit Tests

**Test database queries**:

```typescript
// __tests__/lib/db.test.ts
import { db } from '@/lib/db'

describe('Database queries', () => {
  it('should find products with low SEO score', async () => {
    const products = await db.shopifyProduct.findMany({
      where: {
        connectionId: 'test-connection',
        seoScore: { lt: 50 }
      }
    })

    expect(products).toBeDefined()
    expect(products.every(p => p.seoScore < 50)).toBe(true)
  })
})
```

**Test API routes**:

```typescript
// __tests__/app/api/shopify/products.test.ts
import { GET } from '@/app/api/shopify/products/route'

describe('/api/shopify/products', () => {
  it('should return 401 without shop parameter', async () => {
    const request = new Request('http://localhost:3000/api/shopify/products')
    const response = await GET(request)

    expect(response.status).toBe(401)
    const json = await response.json()
    expect(json.error.code).toBe('AUTHENTICATION_REQUIRED')
  })
})
```

### Integration Tests

**Test Shopify OAuth flow**:

```typescript
// __tests__/integration/oauth.test.ts
describe('Shopify OAuth', () => {
  it('should complete OAuth flow', async () => {
    // 1. Initiate OAuth
    const authUrl = await initiateOAuth('test-store.myshopify.com')
    expect(authUrl).toContain('myshopify.com/admin/oauth/authorize')

    // 2. Simulate callback with code
    const response = await handleCallback({
      shop: 'test-store.myshopify.com',
      code: 'test-code'
    })

    // 3. Verify session created
    const session = await retrieveSession('test-store.myshopify.com')
    expect(session).toBeDefined()
    expect(session.accessToken).toBeDefined()
  })
})
```

### E2E Tests

Use Playwright for end-to-end testing:

```typescript
// e2e/onboarding.spec.ts
import { test, expect } from '@playwright/test'

test('onboarding flow', async ({ page }) => {
  await page.goto('http://localhost:3000/shopify/onboarding?shop=test-store.myshopify.com')

  // Step 1: Welcome
  await expect(page.locator('h1')).toContainText('Welcome to SEOLOGY')
  await page.click('button:has-text("Get Started")')

  // Step 2: Choose execution mode
  await page.click('button:has-text("Automatic")')
  await page.click('button:has-text("Continue")')

  // Step 3: Verify redirect to dashboard
  await expect(page).toHaveURL(/.*\/shopify\/dashboard/)
})
```

---

## Performance Optimization

### Database Query Optimization

**Use indexes** (already in schema):
```prisma
@@index([connectionId, status, detectedAt])  // Compound index
```

**Use Prisma's include strategically**:
```typescript
// BAD: N+1 query problem
const products = await db.shopifyProduct.findMany()
for (const product of products) {
  const issues = await db.issue.findMany({ where: { productId: product.id } })
}

// GOOD: Single query with include
const products = await db.shopifyProduct.findMany({
  include: { issues: true }
})
```

**Paginate large result sets**:
```typescript
const products = await db.shopifyProduct.findMany({
  take: 20,
  skip: (page - 1) * 20,
  orderBy: { seoScore: 'asc' }
})
```

### API Response Caching

```typescript
import { unstable_cache } from 'next/cache'

const getCachedProducts = unstable_cache(
  async (connectionId: string) => {
    return await db.shopifyProduct.findMany({
      where: { connectionId }
    })
  },
  ['products-cache'],
  { revalidate: 300 } // 5 minutes
)
```

### Claude API Optimization

**Batch requests when possible**:
```typescript
// Instead of 10 separate API calls
for (const product of products) {
  await analyzeProduct(product)
}

// Batch into single call
const batch = products.map(p => formatProductForAnalysis(p)).join('\n---\n')
const analysis = await claude.messages.create({
  messages: [{ role: 'user', content: `Analyze these products:\n${batch}` }]
})
```

**Use prompt caching** (Anthropic feature):
```typescript
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20250107',
  system: [
    {
      type: 'text',
      text: 'You are an SEO expert...',
      cache_control: { type: 'ephemeral' } // Cache this prompt
    }
  ],
  messages: [{ role: 'user', content: productData }]
})
```

---

## Security Considerations

### Input Validation with Zod

```typescript
import { z } from 'zod'

const FixRequestSchema = z.object({
  productId: z.string().startsWith('gid://shopify/Product/'),
  fixes: z.array(z.object({
    type: z.enum(['meta_title', 'meta_description', 'alt_text']),
    value: z.string().min(1).max(500)
  }))
})

// In API route
const body = await request.json()
const validated = FixRequestSchema.parse(body) // Throws if invalid
```

### SQL Injection Prevention

Prisma ORM prevents SQL injection by default:

```typescript
// SAFE: Parameterized query via Prisma
await db.shopifyProduct.findMany({
  where: { title: { contains: userInput } }
})

// DANGEROUS: Raw SQL (avoid unless necessary)
await db.$queryRaw`SELECT * FROM products WHERE title LIKE ${userInput}` // Still safe with Prisma
```

### XSS Prevention

```typescript
// Sanitize user input before storing
import DOMPurify from 'isomorphic-dompurify'

const sanitized = DOMPurify.sanitize(userInput)
await db.shopifyProduct.update({
  where: { id },
  data: { description: sanitized }
})
```

### Rate Limiting

```typescript
// lib/rate-limiter.ts
import { RateLimiter } from '@/lib/rate-limiter'

const limiter = new RateLimiter({
  tokensPerInterval: 30,
  interval: 60000 // 1 minute
})

export async function withRateLimit(userId: string, fn: () => Promise<any>) {
  const remaining = await limiter.removeTokens(userId, 1)

  if (remaining < 0) {
    throw new Error('Rate limit exceeded')
  }

  return fn()
}
```

### Token Encryption

```typescript
// lib/encryption.ts
import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'base64')

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag()

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

export function decrypt(encryptedText: string): string {
  const [ivHex, authTagHex, encrypted] = encryptedText.split(':')

  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)

  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
```

---

## Contributing

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules: `npm run lint`
- Use Prettier for formatting
- Write meaningful commit messages (Conventional Commits)

### Git Workflow

```bash
# Create feature branch
git checkout -b feat/add-collection-optimization

# Make changes
git add .
git commit -m "feat: add collection description optimizer agent"

# Push to remote
git push origin feat/add-collection-optimization

# Open PR on GitHub
```

### Commit Message Format

Follow Conventional Commits:

- `feat: add new feature`
- `fix: bug fix`
- `docs: documentation update`
- `refactor: code refactoring`
- `perf: performance improvement`
- `test: add tests`
- `chore: maintenance tasks`

### Pull Request Process

1. Create PR with descriptive title
2. Fill out PR template
3. Ensure CI passes (tests, linting)
4. Request review from maintainers
5. Address feedback
6. Squash and merge when approved

### Code Review Checklist

- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No sensitive data committed
- [ ] Performance impact considered
- [ ] Security implications reviewed
- [ ] Database migrations safe

---

## Useful Commands

```bash
# Development
npm run dev                     # Start dev server
npm run build                   # Production build
npm start                       # Start production server
npm run lint                    # Run ESLint

# Database
npx prisma studio               # Open database GUI
npx prisma generate             # Generate Prisma client
npx prisma db push              # Push schema to DB (dev only)
npx prisma migrate dev          # Create migration
npx prisma migrate deploy       # Apply migrations (prod)
npm run db:seed                 # Seed database
npm run db:reset                # Reset database

# Testing
npm test                        # Run unit tests
npm run test:watch              # Watch mode
npm run test:coverage           # Coverage report

# Deployment
vercel                          # Deploy to Vercel
vercel --prod                   # Production deployment
vercel logs                     # View logs
vercel env pull                 # Pull environment variables
```

---

## Resources

**Official Docs**:
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Anthropic](https://docs.anthropic.com)
- [Shopify](https://shopify.dev/docs)

**Internal Docs**:
- [API Documentation](./API-DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT-GUIDE.md)
- [User Guide](./USER-GUIDE.md)

**Community**:
- GitHub Discussions
- Discord: discord.gg/seology-ai
- Stack Overflow: [seology-ai] tag
