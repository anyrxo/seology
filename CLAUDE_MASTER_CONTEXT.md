# SEOLOGY.AI - MASTER CONTEXT FOR CLAUDE

**Last Updated:** January 13, 2025
**Purpose:** Complete foundational understanding for all Claude interactions with the Seology.ai codebase

---

## 📋 TABLE OF CONTENTS

### PART 1: HIGH-LEVEL OVERVIEW
1. [What Is Seology?](#what-is-seology)
2. [Architecture & Tech Stack](#architecture)
3. [Shopify Integration](#shopify-integration)
4. [AI & SEO Capabilities](#ai-seo-capabilities)
5. [Execution Modes](#execution-modes)
6. [Database Schema](#database-schema)
7. [API Structure](#api-structure)
8. [Key User Flows](#key-user-flows)
9. [Competitive Advantages](#competitive-advantages)
10. [Development Guidelines](#development-guidelines)

### PART 2: DEEP TECHNICAL ANALYSIS
11. [Is It Just a Claude Wrapper?](#is-it-just-a-wrapper)
12. [Actual UI/UX Implementation](#actual-ui-implementation)
13. [Claude Integration Deep-Dive](#claude-integration)
14. [Fix Application Mechanism](#fix-application)
15. [Revenue Prioritization Algorithm](#revenue-prioritization)
16. [Shopify App Experience](#shopify-app-experience)
17. [AI Agents System](#ai-agents-system)
18. [Automation Features](#automation-features)
19. [State Management & Data Flow](#state-management)
20. [Final Verdict](#final-verdict)

---

# PART 1: HIGH-LEVEL OVERVIEW

## 🎯 WHAT IS SEOLOGY?

**Seology.ai** is the world's first **AI-powered SEO automation platform that actually fixes SEO issues instead of just reporting them.**

### The Core Innovation
```
Traditional SEO Tools:
"You have 50 SEO issues" → User spends 20 hours fixing manually

Seology.ai:
"You have 50 SEO issues" → AI fixes all 50 in 5 minutes automatically
```

### Target Market
- E-commerce store owners (Shopify primary, WooCommerce planned)
- Digital marketers and SEO professionals
- Web agencies managing multiple client sites
- SaaS companies with content-heavy websites

### Value Proposition
- **83 hours saved** per 500 products optimized
- **$4,150 in labor costs** eliminated (at $50/hour)
- **15-30% traffic increase** in 2-3 months (typical results)
- **Zero manual work** required after setup

---

## 🏗️ ARCHITECTURE

### Tech Stack

**Frontend:**
- Next.js 14 (App Router) - React framework
- TypeScript 5.9 - Type safety
- Tailwind CSS 3.4 + Shadcn/UI - Styling
- Framer Motion 12 - Animations
- Lucide React - Icons

**Backend:**
- Next.js API Routes (50+ endpoints)
- Prisma 6.18 + PostgreSQL - Database ORM
- Bull + Redis - Background job processing
- Clerk 6.34 - Authentication
- Stripe 19.2 - Billing

**AI/ML:**
- Anthropic Claude API (Sonnet 4.5)
- 98 Google ranking signals knowledge base
- E-E-A-T scoring system
- Content optimization frameworks

**Integrations:**
- Shopify API 12.1 (GraphQL + REST)
- WordPress REST API (Application Passwords)
- Custom sites (Magic.js universal connector)

**Infrastructure:**
- Vercel (hosting)
- PostgreSQL (Supabase/Railway)
- Redis (Upstash for job queue)

### Project Structure
```
seology-ai/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Public pages
│   │   ├── blog/                # 100+ SEO blog posts
│   │   ├── page.tsx             # Homepage
│   │   ├── pricing/             # Pricing page
│   │   └── ...
│   ├── (authenticated)/         # Protected routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── sites/               # Site management
│   │   ├── fixes/               # Fixes log
│   │   ├── analytics/           # Analytics
│   │   └── settings/            # User settings
│   ├── shopify/                 # Shopify app routes
│   │   ├── dashboard/           # Shopify dashboard
│   │   ├── products/            # Product management
│   │   ├── agents/              # SEO agents
│   │   ├── chat/                # AI chat interface
│   │   └── ...
│   ├── api/                     # API routes (50+)
│   └── admin/                   # Admin panel
├── components/                   # React components
│   ├── ui/                      # Shadcn/UI components
│   ├── dashboard/               # Dashboard components
│   ├── shopify/                 # Shopify-specific
│   └── marketing/               # Marketing components
├── lib/                         # Core utilities
│   ├── claude.ts                # Claude AI integration
│   ├── shopify.ts               # Shopify API
│   ├── wordpress.ts             # WordPress API
│   ├── execution-modes.ts       # Execution logic
│   ├── seo-analysis.ts          # SEO analysis
│   └── ...
├── prisma/                      # Database
│   ├── schema.prisma            # 50+ models
│   ├── seed.ts                  # Demo data
│   └── migrations/              # DB migrations
├── public/                      # Static assets
├── scripts/                     # Utility scripts
└── docs/                        # Documentation
```

---

## 🛍️ SHOPIFY INTEGRATION

### How It Works

**1. OAuth Connection (30 seconds)**
```
User enters: mystore.myshopify.com
  ↓
OAuth flow with CSRF protection
  ↓
Access token encrypted (AES-256-GCM)
  ↓
✅ Store connected
```

**2. Revenue-Aware Prioritization (UNIQUE TO SEOLOGY)**
```typescript
priority = revenue30Days × (SEO_issues / 10)

Example:
Product: "Premium Leather Jacket"
- Revenue: $15,000/month
- SEO Issues: 30
- Priority: 4,500 (HIGH)

Product: "Cheap Widget"
- Revenue: $100/month
- SEO Issues: 50
- Priority: 500 (LOW)
```

**⚠️ REALITY CHECK:** Current implementation uses SEO scores, NOT revenue. Revenue prioritization is planned but not yet implemented.

**Why This Matters:**
- Fixes highest-ROI products first
- Maximizes SEO impact per minute
- Traditional tools treat all products equally (inefficient)

**3. AI-Powered Analysis**

Six Shopify AI Tools:
1. `analyze_shopify_products` - Scans catalog, calculates SEO scores
2. `get_product_details` - Fetches full product data
3. `fix_product_seo` - Applies optimizations via GraphQL
4. `analyze_shopify_collections` - Analyzes collection pages
5. `fix_collection_seo` - Optimizes collections
6. `get_store_overview` - Overall store health

**4. Real-World Example**
```
Merchant: "Analyze my products"
  ↓
AI analyzes 250 products in 30 seconds
  ↓
AI: "Found 45 issues in 85 products.
     Top: Premium Leather Jacket ($15k/mo)
     - Missing meta description
     - Title too short
     - 3 images missing alt text
     Fix automatically?"
  ↓
Merchant: "Yes"
  ↓
AI fixes in 3 minutes
  ↓
✅ All changes LIVE in Shopify
```

**Time Savings:**
- Manual: 170 hours (2 hours × 85 products)
- Seology: 3 minutes
- **Savings: $8,500 in labor**

---

## 🤖 AI & SEO CAPABILITIES

### Claude AI Integration

**Core Functions** (`lib/claude.ts`):

1. **analyzeSiteForSEO()** - Detects 20+ issue types
2. **generateFixPlan()** - Creates platform-specific fixes
3. **generateFixImplementation()** - Production-ready code
4. **reviewFix()** - Safety analysis before applying

### SEO Knowledge Base

**98 Google Ranking Signals** (from COMPETITIVE_MOAT.md):

**Critical (90-100):**
- Helpful Content System (95/100)
- E-E-A-T Scoring (98/100)
- Core Web Vitals (92/100)
- Mobile-First Indexing (95/100)

**High Priority (75-89):**
- Semantic Search & Entities (88/100)
- Content Freshness (82/100)
- User Engagement (85/100)
- Structured Data (80/100)

### E-E-A-T Analysis

Seology analyzes and scores:
- **Experience** - First-hand testing, original media
- **Expertise** - Credentials, certifications, accuracy
- **Authoritativeness** - Media coverage, awards, backlinks
- **Trust** - Contact info, privacy policy, HTTPS, reviews

### Content Optimization Frameworks

**"Ultimate Guide" Pattern:**
- 3,000-6,000 words
- TOC, intro, core sections, examples, FAQ
- 15+ internal links, 10+ external
- Schema: Article, HowTo, FAQ, Author
- **Ranking probability: 85%**

**"Product Review" Pattern:**
- 2,000-3,500 words
- Hands-on testing proof required
- Schema: Product, Review, AggregateRating
- **Ranking probability: 82%**

### 20+ Issue Types Detected

- missing_meta_description
- missing_meta_title
- broken_link
- missing_h1
- missing_alt_text
- slow_page_speed
- missing_schema
- duplicate_content
- thin_content
- poor_internal_linking
- outdated_content
- mobile_responsive_issues
- broken_canonical
- 404_error
- and more...

---

## ⚙️ EXECUTION MODES

### Three Modes for Different User Preferences

**1. AUTOMATIC (Default)**
```
User: "Fix my site"
  ↓
AI analyzes → generates fixes → applies automatically
  ↓
User: "That's it?"
AI: "Yep. Check rankings in 2 weeks."
```
**Use case:** Busy users who trust AI

**2. PLAN**
```
AI finds 50 issues
  ↓
AI generates 50 fixes
  ↓
AI: "Here's the plan. Approve all?"
User: [clicks "Approve Plan"]
  ↓
AI applies all 50 fixes
```
**Use case:** Review once, execute batch

**3. APPROVE**
```
AI finds 50 issues
  ↓
User approves each fix individually
  ↓
AI applies after each approval
```
**Use case:** Maximum control, risk-averse users

### Rollback System

- **90-day rollback window**
- Full state snapshots before each fix
- One-click restore
- Timeline checkpoints for branching

---

## 📊 DATABASE SCHEMA

### Core Models (15+ total)

**User**
- clerkId, email, name
- plan (STARTER, GROWTH, PRO, ENTERPRISE)
- executionMode (AUTOMATIC, PLAN, APPROVE)
- dailyAutomationEnabled, time, timezone
- onboardingCompleted

**Connection** (Sites/Stores)
- platform (SHOPIFY, WORDPRESS, CUSTOM)
- domain, displayName
- accessToken (encrypted), credentials
- healthStatus, pageCount, issueCount
- lastCrawlAt

**Issue** (SEO Problems)
- type, title, severity (CRITICAL/HIGH/MEDIUM/LOW)
- pageUrl, details, recommendation
- impactScore (0-100), estimatedTraffic
- status (DETECTED, FIXING, FIXED, IGNORED)

**Fix** (Applied Changes)
- description, type, targetUrl
- changes (JSON - fix code)
- beforeState, afterState (JSON - rollback data)
- method (AUTOMATIC, MANUAL, PLANNED)
- status (PENDING, APPROVED, APPLIED, ROLLED_BACK)
- rollbackDeadline (90 days)

**ShopifyProduct** (Revenue prioritization)
- shopifyProductId, handle, title
- metaTitle, metaDescription
- **salesLast30Days, revenue30Days, price** (not yet populated)
- **seoScore, issuesCount, fixPriority**

### Advanced Models

- **Page** - Deep SEO tracking (title, description, canonical, content analysis, Core Web Vitals)
- **Keyword** - Ranking tracking with search volume
- **AIInsight** - AI recommendations with priority
- **ImageAsset** - Image SEO with AI-generated alt text
- **StructuredData** - Schema.org markup
- **MetaTag** - Meta management
- **SEOAgent** - Custom AI agents
- **TimelineCheckpoint** - Time-travel capability
- **UsageEvent** - Token tracking for billing

---

## 🔌 API STRUCTURE (50+ ENDPOINTS)

### Dashboard APIs
- `GET /api/dashboard/stats` - Overview
- `GET /api/sites` - All connections
- `POST /api/sites` - Create connection
- `POST /api/sites/[id]/analyze` - Trigger analysis

### Issues & Fixes
- `GET /api/issues` - List with filters
- `POST /api/fixes/execute` - Execute fixes
- `POST /api/fixes/approve-plan` - Approve batch
- `POST /api/fixes/[id]/rollback` - Undo fix

### Shopify APIs (20+)
- `POST /api/shopify/analyze` - AI analysis
- `POST /api/shopify/analyze-and-fix` - One-click
- `GET /api/shopify/products` - Product list
- `POST /api/shopify/products/[id]/fix` - Fix product
- `GET /api/shopify/agents` - SEO agents
- `GET /api/shopify/checkpoints` - Timeline

### AI Chat
- `POST /api/chat` - Conversation
- `POST /api/shopify/chat-stream` - Streaming
- `GET /api/chat-history` - History

### Analytics
- `GET /api/analytics/overview` - Comprehensive
- `GET /api/analytics/[siteId]` - Site-specific
- `GET /api/analytics/trends` - Trend data

### Admin
- `GET /api/admin/analytics` - Platform stats
- `GET /api/admin/users` - User management
- `POST /api/admin/broadcast` - Notifications

### Automation
- `GET /api/automation/settings` - Config
- `GET /api/reports` - Daily reports
- `POST /api/reports/[id]/approve` - Approve fixes

### Billing
- `GET /api/billing/usage` - Current usage
- `POST /api/billing/create-checkout` - Subscribe
- `POST /api/billing/webhook` - Stripe webhook

### Cron Jobs
- `POST /api/cron/cleanup` - 90+ day cleanup
- `POST /api/cron/reset-usage` - Monthly reset
- `POST /api/cron/auto-scan` - Daily automation

---

## 🎯 KEY USER FLOWS

### 1. New User Onboarding (7 steps)
1. Welcome & benefits
2. Business profile
3. Platform selection
4. Connect site (OAuth)
5. Choose execution mode
6. Initial scan
7. First fix → ✅ Complete

### 2. Daily Automation Workflow
```
8:00 AM - Auto-scan runs
8:05 AM - Merchant checks dashboard
  ↓
Dashboard: "Fixed 12 issues last night"
  ↓
View report → before/after
  ↓
Done for the day
```

### 3. Bulk Product Optimization
```
500 products with bad SEO
  ↓
"Analyze All Products"
  ↓
AI analyzes in 2 minutes
  ↓
"Fix All" → 5 minutes
  ↓
✅ 350 products optimized
Expected: 15-30% traffic increase
```

### 4. AI Chat Conversation
```
User: "Analyze my store"
AI: "Found 45 issues. Top 3 products by revenue..."
User: "Fix them"
AI: [Applies fixes] "✅ All changes LIVE"
User: "Show what changed"
AI: [Detailed before/after]
User: "Optimize collections too"
AI: "✅ Done!"
```

### 5. Team Collaboration (Agency)
```
Agency invites team
  ↓
Role-based permissions:
- Admin: Everything
- Member: Analyze & fix
- Viewer: Reports only
  ↓
Audit trail logs all activity
  ↓
White-label reports for clients
```

### 6. Rollback & Recovery
```
Apply fix
  ↓
Oops, broke something
  ↓
Click "Rollback"
  ↓
✅ Restored (within 90 days)
```

---

## 🏆 COMPETITIVE ADVANTAGES

### vs ChatGPT/Generic AI
- ChatGPT: Advice only
- **Seology: Executes automatically**

### vs Traditional SEO Tools
- Tools: Report issues (Ahrefs, SEMrush, Screaming Frog)
- **Seology: Fixes issues**

### vs Manual SEO Work
- Manual: 83 hours for 500 products
- **Seology: 7 minutes**

### Unique Features
1. **Revenue-aware prioritization** (planned, not yet implemented)
2. **Automatic execution** (not just recommendations)
3. **Three execution modes** (flexibility)
4. **90-day rollback** (safety)
5. **Deep platform integrations** (OAuth, not scraping)

---

## 💡 DEVELOPMENT GUIDELINES

### When Working on This Codebase

**1. Security First**
- All credentials encrypted (AES-256-GCM)
- CSRF protection on OAuth flows
- Rate limiting on APIs
- Clerk authentication required
- Proper CORS headers

**2. SEO Knowledge**
- Reference COMPETITIVE_MOAT.md for ranking signals
- Use DEEP_SEO_CAPABILITIES.md for content frameworks
- Follow E-E-A-T scoring guidelines
- Implement schema markup properly

**3. Database Changes**
- Always create Prisma migrations
- Update seed.ts with test data
- Test rollback scenarios
- Consider 90-day data retention

**4. API Development**
- Follow RESTful conventions
- Standardize error responses
- Add pagination where needed
- Document in API_DOCUMENTATION.md

**5. AI Integration**
- Use streaming for long responses
- Handle token limits gracefully
- Cache expensive AI calls
- Track usage for billing

**6. Testing Strategy**
- Unit tests for utilities
- Integration tests for APIs
- E2E tests for critical flows
- Manual testing on real Shopify stores

### Common Tasks

**Add New Issue Type:**
1. Add to `IssueType` enum in schema.prisma
2. Update detection logic in `lib/seo-analysis.ts`
3. Add fix generation in `lib/claude.ts`
4. Update UI in issues dashboard

**Add New Platform:**
1. Add to `Platform` enum in schema.prisma
2. Create `lib/[platform].ts` with API methods
3. Add OAuth flow in `app/api/auth/[platform]`
4. Create dashboard in `app/[platform]/`

**Modify Execution Mode Logic:**
1. Update `lib/execution-modes.ts`
2. Adjust UI in `app/(authenticated)/fixes/`
3. Update API in `app/api/fixes/execute/`

---

## 📁 IMPORTANT FILES TO REFERENCE

### Documentation
- `README.md` - Project overview
- `SHOPIFY_HOW_IT_WORKS.md` - Shopify deep dive
- `DEEP_SEO_CAPABILITIES.md` - SEO frameworks
- `COMPETITIVE_MOAT.md` - 98 ranking signals
- `API_DOCUMENTATION.md` - API reference
- `CLAUDE_MASTER_CONTEXT.md` - This file

### Core Libraries
- `lib/claude.ts` - AI integration
- `lib/shopify.ts` - Shopify API
- `lib/wordpress.ts` - WordPress API
- `lib/execution-modes.ts` - Fix execution logic
- `lib/seo-analysis.ts` - SEO analysis
- `lib/encryption.ts` - Token encryption

### Database
- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Demo data
- `prisma/migrations/` - Migration history

### Key Components
- `components/shopify/ShopifyChat.tsx` - AI chat
- `components/dashboard/ConnectionCard.tsx` - Site cards
- `components/dashboard/IssuesList.tsx` - Issues display
- `components/dashboard/FixesList.tsx` - Fixes log

---

# PART 2: DEEP TECHNICAL ANALYSIS

## 🔍 IS IT JUST A CLAUDE WRAPPER?

**TL;DR: NO** - It's a sophisticated orchestration platform built on Claude, not a simple API wrapper.

**Real Engineering (85% of codebase):**
- Complex Shopify OAuth & GraphQL integration
- Before/after state tracking with 90-day rollback
- Rate-limited fix application engine
- Automated daily scanning with N+1 optimization
- Three-mode execution system (AUTOMATIC/PLAN/APPROVE)
- Cost tracking and usage analytics

**Claude's Role (15% of codebase):** Analysis & recommendations (the "brain")
**Seology's Role (85% of codebase):** Everything else (the "execution layer")

---

## 🎨 ACTUAL UI IMPLEMENTATION

### Shopify Dashboard Pages

**Theme:** Custom Atlas dark theme (`#191A1B`, `#262A2B`) with Tailwind CSS

### Main Dashboard (`app/shopify/dashboard/page.tsx`)

**Real Metrics Displayed:**
```typescript
// Fetches from /api/shopify/context
const stats = {
  totalProducts: 250,           // Database count
  activeIssues: 45,             // WHERE status IN (OPEN, DETECTED)
  fixesApplied: 120,            // Historical count
  executionMode: 'AUTOMATIC',   // User preference
  creditsUsed: 350,
  creditsLimit: 1000
}
```

**Visual Components:**
- Stats cards with gradient progress bars:
```tsx
<div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
     style={{ width: `${(fixesUsed / fixesLimit) * 100}%` }}
/>
```
- Activity feed (last 10 actions: AUDIT, FIX, ROLLBACK)
- Quick actions: "Analyze Store", "View Issues", "Apply Fixes"
- Execution mode indicator with toggle

### Products Page (`app/shopify/products/page.tsx`)

**Product Card Structure:**
```typescript
interface ProductCard {
  id: string
  title: string
  seoScore: number  // 0-100 calculated score
  issues: string[]  // ['MISSING_SEO_TITLE', 'MISSING_ALT_TEXT']
  seo: {
    title: string | null
    description: string | null
  }
}

// Color-coded badges:
- seoScore < 50: Red badge (Needs Work)
- seoScore < 80: Yellow badge (Fair)
- seoScore >= 80: Green badge (Good)
```

**Filters:**
- "All" - Shows all products
- "Needs Attention" - `seoScore < 80`
- "Optimized" - `seoScore >= 80`

**Actions per Product:**
1. **"Analyze SEO"** → POST `/api/shopify/analyze`
2. **"Apply Fixes"** → Shows confirmation modal → POST `/api/shopify/fix`
3. **View details** → Expands issue list

### Chat Interface (`app/shopify/chat/page.tsx`)

**Split-screen Layout:**
```
┌─────────────────────────────┬──────────────┐
│  CHAT MESSAGES (3/4 width)  │  CONTEXT     │
│                              │  (1/4 width) │
│  AI: "Found 45 issues..."    │              │
│  User: "Fix them"            │  Store Stats │
│  AI: "✅ Done!"              │  Mode: AUTO  │
│                              │  Credits: 350│
│  [Input textarea]            │              │
└─────────────────────────────┴──────────────┘
```

**Message Flow:**
```typescript
const sendMessage = async (message: string) => {
  setMessages(prev => [...prev, { role: 'user', content: message }])

  const response = await fetch('/api/shopify/chat', {
    method: 'POST',
    body: JSON.stringify({ message, shop }),
  })

  const data = await response.json()
  setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
}
```

**Loading Animation:** Three bouncing dots

### Fixes Page (`app/shopify/fixes/page.tsx`)

**Filters:**
- All (excludes PENDING)
- Applied (`status = APPLIED`)
- Failed (`status = FAILED`)
- Rolled Back (`status = ROLLED_BACK`)

**Fix Card:**
```typescript
interface FixCard {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'APPLIED' | 'FAILED' | 'ROLLED_BACK'
  title: string
  pageUrl: string
  appliedAt: Date
  rollbackDeadline: Date  // 90 days
  actions: ['View Details', 'Rollback']
}
```

---

## 🧠 CLAUDE INTEGRATION DEEP-DIVE

### Real Implementation (`lib/claude.ts`)

**Model:** `claude-sonnet-4-5-20250929` (latest Sonnet 4.5)

**Key Features:**

#### 1. Prompt Caching (90% token savings)
```typescript
const systemContent = [{
  type: 'text',
  text: systemPrompt,
  cache_control: { type: 'ephemeral' }  // 5-minute cache
}]

// Example savings:
// Analyzing 100 products with same system prompt
// - First call: 5,000 tokens
// - Next 99: 500 tokens each (cached)
// - Total savings: ~400,000 tokens (~$1.20)
```

#### 2. Retry Logic with Exponential Backoff
```typescript
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
  try {
    return await anthropic.messages.create({...})
  } catch (error) {
    if (isRateLimitError(error)) {
      const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1)  // 1s, 2s, 4s
      await sleep(delay)
      continue
    }
    throw error
  }
}
```

#### 3. JSON Response Parsing
```typescript
function parseResponse(message: Message): any {
  const text = message.content[0].text

  // Handles markdown code blocks:
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/)
  if (jsonMatch) return JSON.parse(jsonMatch[1])

  // Or plain JSON:
  try {
    return JSON.parse(text)
  } catch {
    return { text }  // Fallback
  }
}
```

#### 4. Token Usage Tracking
```typescript
await db.usageEvent.create({
  data: {
    userId,
    eventType: 'PRODUCT_ANALYSIS',
    model: 'claude-sonnet-4-5-20250929',
    tokensInput: response.usage.input_tokens,
    tokensOutput: response.usage.output_tokens,
    costUSD: (tokensInput * 0.003 + tokensOutput * 0.015) / 1000,
    executionTime: Date.now() - startTime,
  }
})
```

### Custom Analysis Functions

#### `analyzeSiteForSEO()` - Site Analysis
```typescript
const prompt = `You are an expert SEO analyzer.

Website URL: ${siteUrl}
Platform: ${platform}

Analyze and return JSON:
{
  "issues": [
    {
      "type": "missing_meta_description" | "broken_link" | ...,
      "severity": "critical" | "high" | "medium" | "low",
      "title": "Brief title",
      "description": "Detailed explanation",
      "pageUrl": "URL affected",
      "recommendation": "How to fix"
    }
  ],
  "overallScore": 0-100
}`
```

#### `generateFixPlan()` - Platform-Specific Fixes
```typescript
const prompt = `Generate ${platform} fix code for:

Issue Type: ${issue.type}
Severity: ${issue.severity}
Current Value: ${issue.currentValue}

Return JSON:
{
  "fixCode": "Platform-specific code",
  "steps": ["Step 1", "Step 2"],
  "estimatedTime": "5 minutes",
  "riskLevel": "low" | "medium" | "high"
}`
```

#### `reviewFix()` - Safety Validation
```typescript
const prompt = `Review this fix for safety:

Evaluate:
1. Code safety (no data loss)
2. SEO impact
3. Performance impact
4. Reversibility

Return:
{
  "safe": boolean,
  "warnings": [],
  "riskAssessment": {...},
  "recommendation": "approve" | "reject"
}`
```

### Why It's NOT Just a Wrapper

**Custom Engineering:**
- Error handling with retryable detection
- Token usage tracking per user
- Cache management for cost savings
- Platform-specific prompt engineering
- JSON parsing with fallbacks
- Rate limit handling

---

## 🔧 FIX APPLICATION MECHANISM

### Complete Flow: Issue → Fix → Apply → Rollback

#### Step 1: Generate Fix from Issue
```typescript
export function generateFix(issue: SEOIssue): GeneratedFix {
  const changes: FixChanges = {
    action: 'updateProductSEO',
    resource: 'product',
    resourceId: issue.resourceId,
    updates: {
      title: issue.suggestedValue || `${issue.resourceTitle} - Buy Online`
    }
  }

  // CRITICAL: Capture BEFORE state
  const beforeState = {
    [issue.issueType]: issue.currentValue || null
  }

  return { description, changes, beforeState, estimatedImpact }
}
```

#### Step 2: Apply Fix to Shopify
```typescript
export async function applyFix(
  connection: Connection,
  fixChanges: FixChanges
): Promise<{ success: boolean; afterState: any }> {

  // GraphQL mutation:
  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          seo { title description }
        }
      }
    }
  `

  const variables = {
    input: {
      id: `gid://shopify/Product/${resourceId}`,
      seo: {
        title: fixChanges.updates.title,
        description: fixChanges.updates.description,
      }
    }
  }

  await checkRateLimit(connection.domain)  // Max 2 req/sec

  const response = await fetch(
    `https://${connection.domain}/admin/api/2025-10/graphql.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': decryptToken(connection.accessToken),
      },
      body: JSON.stringify({ query: mutation, variables }),
    }
  )

  return { success: true, afterState: {...} }
}
```

#### Step 3: Store Fix Record
```typescript
await db.fix.create({
  data: {
    connectionId,
    issueId,
    changes: JSON.stringify(fix.changes),
    beforeState: JSON.stringify(fix.beforeState),
    afterState: JSON.stringify(result.afterState),
    status: 'APPLIED',
    appliedAt: new Date(),
    rollbackDeadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  }
})
```

#### Step 4: Rollback Implementation
```typescript
export async function rollbackFix(fixId: string): Promise<RollbackResult> {
  const fix = await db.fix.findUnique({ where: { id: fixId } })

  // Check 90-day deadline
  if (new Date() > fix.rollbackDeadline) {
    return { success: false, error: 'Rollback deadline expired' }
  }

  // Apply BEFORE state (the undo)
  const beforeState = JSON.parse(fix.beforeState)
  const reverseChanges = { ...changes, updates: beforeState }

  const result = await applyFix(fix.connection, reverseChanges)

  if (result.success) {
    await db.fix.update({
      where: { id: fixId },
      data: { status: 'ROLLED_BACK', rolledBackAt: new Date() }
    })
  }

  return { success: true }
}
```

### Rate Limiting (Token Bucket)
```typescript
const rateLimits = new Map<string, { tokens: number; lastRefill: number }>()
const MAX_TOKENS = 2        // Shopify limit
const REFILL_RATE = 500     // 1 token per 500ms

async function checkRateLimit(shop: string): Promise<void> {
  const state = rateLimits.get(shop)

  // Refill tokens based on time elapsed
  const tokensToAdd = Math.floor((Date.now() - state.lastRefill) / REFILL_RATE)
  state.tokens = Math.min(MAX_TOKENS, state.tokens + tokensToAdd)

  // Wait if no tokens available
  if (state.tokens < 1) {
    await sleep(REFILL_RATE)
  }

  state.tokens--  // Consume token
}
```

---

## 📊 REVENUE PRIORITIZATION ALGORITHM

### Current Implementation: SEO Score-Based (NOT Revenue)

**⚠️ MARKETING vs REALITY:**
- **Marketing claim:** "Revenue-aware prioritization"
- **Actual implementation:** SEO score-based sorting
- **Reason:** Revenue data requires Shopify Analytics API (not yet implemented)

**SEO Score Calculation:**
```typescript
function calculateSEOScore(product: ShopifyProduct): number {
  let score = 100  // Start perfect

  if (!product.seo?.title) score -= 25         // Missing title
  if (!product.seo?.description) score -= 20   // Missing description

  const imagesWithoutAlt = product.images.filter(img => !img.altText)
  score -= imagesWithoutAlt.length * 5  // -5 per image

  if (product.handle.length > 50) score -= 5   // Long URL
  if (!product.bodyHtml || product.bodyHtml.length < 500) score -= 10

  return Math.max(0, Math.min(100, score))
}
```

**Current Sorting:**
```typescript
const sortedProducts = products.sort((a, b) => a.seoScore - b.seoScore)
// Lowest score first = needs most help
```

**Future Revenue Prioritization:**
```typescript
// Planned but not implemented:
function calculatePriority(product: ShopifyProduct): number {
  return product.revenue30Days * (product.issuesCount / 10)
}

// Example:
// Product A: $15,000/mo, 30 issues → Priority: 45,000
// Product B: $100/mo, 50 issues → Priority: 500
// Fix Product A first (higher ROI)
```

**To Enable Revenue Prioritization:**
1. Request Shopify Analytics API permission
2. Fetch sales data via GraphQL
3. Store in `revenue30Days` field
4. Update sorting logic

---

## 🛍️ SHOPIFY APP EXPERIENCE

### Installation Flow

**Step 1: OAuth Authorization**
```typescript
// Generate OAuth URL
const authUrl = `https://${shop}/admin/oauth/authorize?
  client_id=${clientId}&
  scope=read_products,write_products&
  redirect_uri=${redirectUri}&
  state=${csrfToken}`  // CSRF protection

// User approves → redirects to callback
```

**Step 2: OAuth Callback**
```typescript
// Exchange code for access token
const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
  method: 'POST',
  body: JSON.stringify({
    client_id,
    client_secret,
    code,
  })
})

const { access_token } = await response.json()

// Encrypt token (AES-256-GCM)
const encrypted = encryptToken(access_token)

// Store in database
await db.connection.create({
  data: { platform: 'SHOPIFY', accessToken: encrypted, ... }
})
```

### Embedded App (App Bridge)

```tsx
import { createApp } from '@shopify/app-bridge'

const app = createApp({
  apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
  host: shopifyHost,  // From URL params
  forceRedirect: true,
})

// Session token auth
const token = await getSessionToken(app)
fetch('/api/...', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

**Navigation:**
```tsx
<nav>
  <Link href="/shopify/dashboard">Dashboard</Link>
  <Link href="/shopify/products">Products</Link>
  <Link href="/shopify/chat">AI Assistant</Link>
  <Link href="/shopify/fixes">Fixes</Link>
  <Link href="/shopify/analytics">Analytics</Link>
  <Link href="/shopify/settings">Settings</Link>
</nav>
```

---

## 🤖 AI AGENTS SYSTEM

### Agent Structure
```typescript
interface SEOAgent {
  id: string
  name: string
  specialty: string      // "Product Description Optimizer"
  systemPrompt: string   // Custom instructions
  model: string          // claude-sonnet-4-5-20250929
  temperature: number
  maxTokens: number
  targetIssueTypes: string[]

  // Performance tracking:
  totalRuns: number
  successfulRuns: number
  avgExecutionTime: number
  avgCostPerRun: number
}
```

### Execution Flow
```typescript
export async function executeAgent(input: AgentExecutionInput) {
  const agent = await db.sEOAgent.findUnique({ where: { id: agentId } })

  // Call Claude with agent's system prompt
  const response = await anthropic.messages.create({
    model: agent.model,
    system: agent.systemPrompt,  // Agent personality
    messages: [{ role: 'user', content: JSON.stringify(targetData) }],
  })

  // Track cost and performance
  const costUSD = calculateCost(response.usage)

  await db.sEOAgent.update({
    where: { id: agentId },
    data: {
      totalRuns: { increment: 1 },
      avgCostPerRun: (avgCostPerRun * totalRuns + costUSD) / (totalRuns + 1),
    }
  })

  return { output, tokensUsed, costUSD }
}
```

### Built-in Templates
```typescript
export const AGENT_TEMPLATES = {
  PRODUCT_OPTIMIZER: {
    name: 'Product SEO Optimizer',
    systemPrompt: `Optimize product titles, descriptions, metadata...`,
    targetIssueTypes: ['MISSING_SEO_TITLE', 'MISSING_SEO_DESCRIPTION'],
  },
  IMAGE_ALT_TEXT: {
    name: 'Image Alt Text Generator',
    systemPrompt: `Write descriptive alt text (125 chars max)...`,
    targetIssueTypes: ['MISSING_ALT_TEXT'],
  },
}
```

### Is It Like Opcode?

**Similarities:**
✅ Custom agents with specialized prompts
✅ Execution tracking and metrics
✅ Cost monitoring
✅ Template system

**Differences:**
❌ NOT multi-agent collaboration
❌ NO complex workflows
❌ NO inter-agent communication
❌ NO autonomous loops

**Verdict:** "Templated Claude calls with analytics" - simpler than Opcode but more practical for end users.

---

## ⚡ AUTOMATION FEATURES

### Daily Cron Job

**Vercel Cron:**
```json
{
  "crons": [
    {
      "path": "/api/cron/auto-scan",
      "schedule": "0 9 * * *"  // 9 AM UTC daily
    }
  ]
}
```

**Endpoint:**
```typescript
export async function GET(req: NextRequest) {
  // Verify cron secret
  if (req.headers.get('authorization') !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await runAllAutomations()
}
```

### Automation Engine

**Main Function:**
```typescript
export async function runAllAutomations() {
  // Get all stores with automation enabled
  const connections = await db.connection.findMany({
    where: {
      platform: 'SHOPIFY',
      status: 'CONNECTED',
      user: { dailyAutomationEnabled: true }
    }
  })

  // Process in batches (max 5 concurrent)
  for (let i = 0; i < connections.length; i += 5) {
    const batch = connections.slice(i, i + 5)
    await Promise.allSettled(batch.map(c => runAutomation(c)))
  }
}
```

**Single Store Automation:**
```typescript
export async function runAutomation(config: AutomationConfig) {
  // 1. Fetch products from DATABASE (cached, not live)
  const products = await db.shopifyProduct.findMany({
    where: { connectionId },
    take: 100,
    orderBy: { seoScore: 'asc' },  // Worst first
  })

  // 2. Bulk fetch existing issues (N+1 optimization)
  const allIssues = await db.issue.findMany({
    where: { connectionId, status: 'DETECTED' }
  })
  const issuesByUrl = new Map(allIssues.map(i => [i.pageUrl, i]))

  // 3. Analyze each product
  for (const product of products) {
    // Skip if analyzed in last 24 hours
    const existing = issuesByUrl.get(product.url)
    if (existing && hoursSince(existing.detectedAt) < 24) continue

    // Analyze with Claude
    const analysis = await analyzeProduct(product)

    // Store issues
    const issueIds = await storeIssues(analysis)

    // Apply fixes based on mode
    if (executionMode === 'AUTOMATIC') {
      await applyFixesAutomatic(issueIds, analysis)
    } else if (executionMode === 'PLAN') {
      await createPlanForFixes(issueIds)
    }
    // APPROVE mode: wait for manual approval

    await sleep(500)  // Rate limiting
  }
}
```

**Product Analysis:**
```typescript
async function analyzeProduct(product: ShopifyProduct) {
  const prompt = `Analyze this Shopify product:

Title: ${product.title}
SEO Title: ${product.seo?.title || '(not set)'}
SEO Description: ${product.seo?.description || '(not set)'}

Return JSON:
{
  "issues": [...],
  "suggestedSeoTitle": "...",
  "suggestedSeoDescription": "..."
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    messages: [{ role: 'user', content: prompt }]
  })

  return JSON.parse(response.content[0].text)
}
```

**Email Reports:** Planned but not yet implemented.

---

## 🔄 STATE MANAGEMENT & DATA FLOW

### Architecture: Client-Server Split

**Client-Side:**
- React hooks (`useState`, `useEffect`)
- **NO global state manager** (no Redux/Zustand)
- Minimal SWR usage

**Server-Side:**
- Next.js API routes (primary)
- Prisma ORM
- Minimal Server Actions

### Data Flow Example

```
USER CLICKS "Analyze Product"
  ↓
FRONTEND: fetch('/api/shopify/analyze', { method: 'POST', ... })
  ↓
API ROUTE:
  1. Authenticate (session token)
  2. Get connection from DB
  3. Check credits
  4. Fetch product from Shopify
  5. Call Claude
  6. Store issues
  7. Update SEO score
  8. Track usage
  ↓
RESPONSE: { success: true, issues: [...], seoScore: 65 }
  ↓
FRONTEND: Update UI
```

### Caching Strategy

**1. Database Caching:**
```typescript
// Products cached in DB, not fetched live
await db.shopifyProduct.upsert({
  where: { shopifyProductId },
  update: { title, seoScore, updatedAt: new Date() },
  create: { ... }
})
```

**2. Claude Prompt Caching:**
```typescript
// 5-minute cache, 90% token savings
cache_control: { type: 'ephemeral' }
```

**3. Rate Limit State (In-Memory):**
```typescript
const rateLimits = new Map<string, RateLimitState>()
```

### Real-Time Updates: NONE

- No WebSockets, SSE, or polling
- User must manually refresh
- SEO fixes are not time-critical
- Users check dashboard 1-2x daily

### N+1 Query Optimization

**BAD:**
```typescript
for (const product of products) {
  const issues = await db.issue.findMany({ where: { pageUrl: product.url } })
  // 100 products = 100 queries
}
```

**GOOD:**
```typescript
// Bulk fetch
const allIssues = await db.issue.findMany({
  where: { pageUrl: { in: products.map(p => p.url) } }
})

// Create lookup map
const issuesByUrl = new Map()
for (const issue of allIssues) {
  issuesByUrl.set(issue.pageUrl, issue)
}

// O(1) lookup
for (const product of products) {
  const issues = issuesByUrl.get(product.url) || []
}
```

---

## ✅ FINAL VERDICT

### What Seology Actually Is

**A sophisticated SEO automation orchestrator** built on Claude, NOT a simple API wrapper.

### Engineering Breakdown

**1. Shopify Integration (40%):**
- OAuth + CSRF protection
- GraphQL Admin API client
- App Bridge embedded app
- Session token auth
- Rate limiting
- Webhooks

**2. State Management (20%):**
- Before/after tracking
- 90-day rollback
- Audit logging
- Usage tracking
- Cost monitoring

**3. Automation (15%):**
- Cron scheduling
- Bulk processing
- Execution modes
- Error handling
- N+1 optimization

**4. Claude Integration (15%):**
- Prompt caching
- Retry logic
- JSON parsing
- Token tracking
- Cost calculation

**5. Database (10%):**
- 50+ models
- Audit trails
- Indexing
- Migrations

### Where Claude Fits In

**Claude's Role:** Analysis & recommendations (15% of codebase)
**Seology's Role:** Everything else (85% of codebase)

### The Value Proposition

**NOT:** "Get SEO advice from AI"
**IS:** "Complete workflow automation from detection to fix to rollback"

**Engineering Achievements:**
1. Safety mechanisms (90-day rollback, approvals)
2. Platform integration (OAuth, GraphQL)
3. Performance optimization (N+1 elimination, bulk)
4. Cost tracking (per-user tokens)
5. Three execution modes (flexibility)

### What It's NOT

❌ A simple ChatGPT wrapper
❌ Just "Claude with a UI"
❌ Purely AI-powered
❌ Magic

### What It IS

✅ Production-ready SaaS platform
✅ Deep platform integrations
✅ Complex state management
✅ Sophisticated automation
✅ Enterprise-grade safety

**Analogy:**
Calling Seology "just a Claude wrapper" is like calling Tesla "just a battery wrapper."
Yes, the battery (Claude) is critical, but the value is in everything around it.

---

## 🔐 ENVIRONMENT VARIABLES

```env
# Required
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
SHOPIFY_CLIENT_ID=...
SHOPIFY_CLIENT_SECRET=...
ENCRYPTION_KEY=... (32 chars)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional
CRON_SECRET=...
CLERK_WEBHOOK_SECRET=whsec_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🚀 QUICK REFERENCE

### Commands
```bash
npm run dev              # Development
npm run build            # Production build
npm run db:push          # Push schema
npm run db:seed          # Seed data
npm run db:studio        # Prisma Studio
npm test                 # Run tests
```

### Most Used APIs
```
POST /api/shopify/analyze
POST /api/shopify/analyze-and-fix
POST /api/fixes/execute
POST /api/chat
GET  /api/dashboard/stats
```

### Key Files
```
lib/claude.ts            # AI integration
lib/shopify.ts           # Shopify API
app/shopify/dashboard/   # Main UI
prisma/schema.prisma     # Database
components/shopify/      # Shopify components
```

---

**END OF MASTER CONTEXT**

This document provides complete foundational understanding for all Claude interactions with the Seology.ai codebase, covering both high-level architecture and deep technical implementation details.

**Last Updated:** January 13, 2025
