# SEOLOGY.AI Dashboard Implementation Plan

## Current Status
✅ Marketing site complete (13 blog posts, careers, pricing, etc.)
❌ SaaS dashboard NOT built yet

## Goal
Build a fully functional SaaS dashboard where users can:
1. Sign up / Sign in (authentication)
2. Connect their website (Shopify, WordPress, or Magic.js)
3. View detected SEO issues
4. Review and approve/reject fixes
5. Monitor applied fixes and rollback if needed
6. Manage billing and settings

## Tech Stack for Dashboard

### Frontend
- **Framework**: Next.js 14 (already set up)
- **UI Components**: Dashflow X (Webflow template conversion)
- **Styling**: Tailwind CSS + Dashflow CSS
- **State Management**: React Context + SWR for data fetching

### Backend/Auth
- **Authentication**: Clerk (clerk.com)
  - Sign-in/Sign-up pages
  - Protected routes
  - User management
  - Session handling

### Database
- **ORM**: Prisma (already in package.json)
- **Database**: PostgreSQL (hosted on Supabase or Railway)
- **Schema**: Already defined in `prisma/schema.prisma` (from CLAUDE.md)

### API
- **Framework**: Next.js API Routes
- **AI**: Anthropic Claude SDK
- **CMS Integrations**: Shopify, WordPress REST API

---

## Phase 1: Foundation Setup (2-3 hours)

### 1.1 Install Clerk Authentication
```bash
npm install @clerk/nextjs
```

**Files to create**:
- `.env.local` with Clerk keys
- `middleware.ts` for protected routes
- `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- `app/(auth)/sign-up/[[...sign-up]]/page.tsx`

### 1.2 Set Up Prisma Database
```bash
npx prisma init
npx prisma generate
npx prisma db push
```

**Files to create**:
- `.env` with `DATABASE_URL`
- Verify `prisma/schema.prisma` matches CLAUDE.md spec

### 1.3 Convert Dashflow X to React Components
**Extract from**: `C:\Users\manna\Downloads\Website inspo\anyros-wondrous-site.webflow\`

**Components to create**:
- `components/dashboard/Sidebar.tsx`
- `components/dashboard/Header.tsx`
- `components/dashboard/Card.tsx`
- `components/dashboard/Table.tsx`
- `components/dashboard/Badge.tsx`
- `components/dashboard/Button.tsx`
- `components/dashboard/Modal.tsx`

---

## Phase 2: User Dashboard (4-6 hours)

### 2.1 Dashboard Layout
**Route**: `app/dashboard/layout.tsx`

**Structure**:
```
+------------------+---------------------------+
| Sidebar          | Header (user avatar, noti |
|                  +---------------------------+
| - Dashboard      | Main Content Area         |
| - Sites          |                           |
| - Issues         |                           |
| - Fixes          |                           |
| - Settings       |                           |
| - Billing        |                           |
+------------------+---------------------------+
```

### 2.2 Dashboard Home Page
**Route**: `app/dashboard/page.tsx`

**Features**:
- Overview stats (sites connected, issues detected, fixes applied)
- Recent activity feed
- Quick actions (connect new site, run scan)

### 2.3 Sites Management
**Route**: `app/dashboard/sites/page.tsx`

**Features**:
- List all connected sites
- "Connect New Site" button → modal
- Site status (active, scanning, error)
- Actions: Edit, Disconnect, Run Scan

**Route**: `app/dashboard/sites/[siteId]/page.tsx`
- Site details
- SEO health score
- Recent scans
- Connected platform (Shopify/WordPress/Magic.js)

### 2.4 Issues Page
**Route**: `app/dashboard/issues/page.tsx`

**Features**:
- Table of all detected issues
- Filters: Site, Severity, Type, Status
- Columns: Issue Type, Description, Page, Severity, Status
- Actions: View Details, Create Fix

### 2.5 Fixes Page
**Route**: `app/dashboard/fixes/page.tsx`

**Features**:
- Table of all fixes (pending, applied, rolled back)
- Execution modes:
  - **AUTOMATIC**: Fixes applied instantly
  - **PLAN**: Batch approval required
  - **APPROVE**: Individual approval required
- Actions: Approve, Reject, Rollback

### 2.6 Settings Page
**Route**: `app/dashboard/settings/page.tsx`

**Tabs**:
- Profile (name, email, avatar)
- Execution Mode (AUTOMATIC/PLAN/APPROVE)
- Notifications (email preferences)
- API Keys (for Magic.js)

### 2.7 Billing Page
**Route**: `app/dashboard/billing/page.tsx`

**Features**:
- Current plan (STARTER, GROWTH, SCALE)
- Usage stats (sites used, fixes this month)
- Upgrade/downgrade buttons
- Payment method
- Billing history

---

## Phase 3: Onboarding Flow (2-3 hours)

### 3.1 Onboarding Wizard
**Route**: `app/dashboard/onboarding/page.tsx`

**Steps**:
1. Welcome
2. Connect Your First Site
3. Site Scanning (progress indicator)
4. Review Issues Found
5. Choose Execution Mode
6. Apply First Fix
7. Complete!

---

## Phase 4: Admin Dashboard (3-4 hours)

### 4.1 Admin Layout
**Route**: `app/admin/layout.tsx`

**Similar sidebar but with admin sections**:
- Analytics
- Users
- Sites
- Jobs
- Issues
- Audit Logs

### 4.2 Admin Analytics
**Route**: `app/admin/page.tsx`

**Metrics**:
- Total users, sites, issues, fixes
- Revenue (MRR, ARR)
- Churn rate
- Active users

### 4.3 User Management
**Route**: `app/admin/users/page.tsx`

**Features**:
- User list with search/filter
- User details (plan, sites, usage)
- Actions: Upgrade, Suspend, Delete

---

## Phase 5: API Routes (4-5 hours)

### 5.1 Sites API
- `POST /api/sites` - Create new site connection
- `GET /api/sites` - List user's sites
- `GET /api/sites/[id]` - Get site details
- `DELETE /api/sites/[id]` - Disconnect site
- `POST /api/sites/[id]/scan` - Trigger scan

### 5.2 Issues API
- `GET /api/issues` - List issues (with filters)
- `GET /api/issues/[id]` - Get issue details
- `POST /api/issues/[id]/fix` - Create fix for issue

### 5.3 Fixes API
- `GET /api/fixes` - List fixes
- `GET /api/fixes/[id]` - Get fix details
- `POST /api/fixes/[id]/approve` - Approve fix
- `POST /api/fixes/[id]/reject` - Reject fix
- `POST /api/fixes/[id]/rollback` - Rollback fix

### 5.4 Billing API
- `POST /api/billing/create-checkout` - Create Stripe checkout
- `POST /api/billing/portal` - Customer portal
- `POST /api/billing/webhook` - Stripe webhook handler

### 5.5 Execution API
- `POST /api/execute/automatic` - Execute automatic mode
- `POST /api/execute/plan` - Create plan
- `POST /api/execute/approve-plan` - Approve entire plan

---

## Phase 6: Platform Integrations (4-6 hours)

### 6.1 Shopify Integration
**Files**: `lib/shopify.ts`, `app/api/auth/shopify/route.ts`

**Flow**:
1. User clicks "Connect Shopify"
2. OAuth flow → Shopify app authorization
3. Store access token (encrypted)
4. Fetch store data, products, pages
5. Run SEO analysis

### 6.2 WordPress Integration
**Files**: `lib/wordpress.ts`

**Flow**:
1. User enters WordPress URL + Application Password
2. Test REST API connection
3. Store credentials (encrypted)
4. Fetch posts, pages, media
5. Run SEO analysis

### 6.3 Magic.js Integration
**Files**: `public/magic.js`, `app/api/magic/route.ts`

**Flow**:
1. User generates API key
2. User adds `<script>` tag to their site
3. Magic.js pings SEOLOGY.AI API
4. Fetches and applies fixes client-side

---

## Phase 7: Claude AI Integration (3-4 hours)

### 7.1 Analysis Engine
**File**: `lib/claude-analysis.ts`

**Function**: `analyzeSite(siteId)`
- Fetch all site pages
- Send to Claude with analysis prompt
- Parse response for issues
- Store issues in database

### 7.2 Fix Generation
**File**: `lib/claude-fixes.ts`

**Function**: `generateFixes(issueIds)`
- For each issue, ask Claude for fix
- Claude returns exact code/content
- Store fix with before/after state

---

## Phase 8: Background Jobs (2-3 hours)

### 8.1 Job Queue System
**Files**: `lib/queue.ts`, `lib/jobs/index.ts`

**Job Types**:
- `CRAWL_SITE` - Crawl site pages
- `ANALYZE_SITE` - Run Claude analysis
- `EXECUTE_FIXES` - Apply fixes in batch
- `CLEANUP_ROLLBACKS` - Clean old rollback data
- `RESET_USAGE` - Monthly usage reset

---

## File Structure (Final)

```
seology-ai/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx                  # Dashboard shell
│   │   ├── page.tsx                    # Dashboard home
│   │   ├── sites/
│   │   │   ├── page.tsx               # Sites list
│   │   │   └── [siteId]/page.tsx      # Site details
│   │   ├── issues/page.tsx            # Issues list
│   │   ├── fixes/page.tsx             # Fixes list
│   │   ├── settings/page.tsx          # User settings
│   │   ├── billing/page.tsx           # Billing management
│   │   └── onboarding/page.tsx        # Onboarding wizard
│   ├── admin/
│   │   ├── layout.tsx                  # Admin shell
│   │   ├── page.tsx                   # Admin analytics
│   │   ├── users/page.tsx             # User management
│   │   ├── sites/page.tsx             # All sites
│   │   └── jobs/page.tsx              # Background jobs
│   └── api/
│       ├── sites/route.ts
│       ├── issues/route.ts
│       ├── fixes/route.ts
│       ├── billing/route.ts
│       └── execute/route.ts
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── StatsCard.tsx
│   │   ├── IssueTable.tsx
│   │   ├── FixCard.tsx
│   │   └── Modal.tsx
│   └── ui/                            # Shadcn components
├── lib/
│   ├── db.ts                          # Prisma client
│   ├── claude.ts                      # Claude AI
│   ├── shopify.ts                     # Shopify integration
│   ├── wordpress.ts                   # WordPress integration
│   ├── execution-modes.ts             # Fix execution logic
│   ├── queue.ts                       # Job queue
│   └── stripe.ts                      # Billing
├── prisma/
│   └── schema.prisma                  # Database schema
└── middleware.ts                      # Clerk auth protection
```

---

## Development Timeline

**Week 1**: Foundation + User Dashboard
- Day 1-2: Auth setup (Clerk), database (Prisma)
- Day 3-4: Dashboard layout, Dashflow conversion
- Day 5-7: Sites, Issues, Fixes pages

**Week 2**: Integrations + AI
- Day 8-9: Shopify, WordPress integrations
- Day 10-11: Claude AI analysis + fix generation
- Day 12-14: Background jobs, billing

**Week 3**: Admin + Polish
- Day 15-16: Admin dashboard
- Day 17-18: Onboarding flow
- Day 19-21: Testing, bug fixes, deployment

**Total Estimated Time**: 60-80 hours (3 weeks full-time)

---

## Immediate Next Steps

1. Install Clerk: `npm install @clerk/nextjs`
2. Set up Clerk account, get API keys
3. Create auth pages (sign-in, sign-up)
4. Set up Prisma with PostgreSQL
5. Convert first Dashflow component (Sidebar)
6. Build dashboard layout
7. Create first dashboard page (Sites)

---

## Decision: Start Now or Continue Marketing?

**Option A**: Start building dashboard now
**Pros**: Get functional SaaS sooner, can demo to users
**Cons**: Big time investment, marketing site is already great

**Option B**: Polish marketing site more
**Pros**: More blog content, better SEO, professional appearance
**Cons**: Delays actual product functionality

**Recommendation**: Start building dashboard incrementally alongside marketing improvements.
