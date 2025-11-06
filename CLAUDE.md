# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Workflow - Claudia (Opcode) Integration

This project uses **[Claudia (Opcode)](https://github.com/winfunc/opcode)** - an open-source desktop GUI for managing Claude Code sessions.

### Claudia Features

**What is Claudia?**
Claudia is a Tauri desktop app that provides a visual command center for Claude Code, making AI-assisted development more intuitive and manageable.

**Key Features in Use:**

1. **Custom AI Agents** (`.claude/agents/`)
   - Specialized agents for different development tasks
   - Shopify integration agent
   - Database schema designer agent
   - API development agent
   - Isolated background execution with full history tracking

2. **Session Management with Timeline**
   - Visual timeline of all development sessions
   - Checkpoint system for version snapshots
   - Branch navigation through session history
   - One-click restoration to previous states
   - Diff viewer showing changes between checkpoints

3. **Usage Analytics Dashboard**
   - Real-time API usage monitoring
   - Token consumption breakdowns by model, project, and time
   - Cost tracking and budget optimization
   - Visual charts showing usage trends
   - Data export for financial reporting

4. **MCP Server Management**
   - Centralized UI for Model Context Protocol servers
   - Configuration import from Claude Desktop
   - Connection verification and health checks
   - Easy server activation/deactivation

5. **CLAUDE.md Live Editor**
   - Built-in markdown editor with syntax highlighting
   - Live preview of rendered markdown
   - Real-time project configuration updates
   - Version history tracking

**Privacy & Security:**
- All operations run locally - no data collection
- Process isolation for agent execution
- Configurable permissions per agent
- Full control over AI interactions

**Integration with SEOLOGY:**
- Project sessions tracked with checkpoints before major changes
- Custom agents for Shopify SEO optimization tasks
- Usage analytics to optimize AI API costs
- Timeline branching for experimenting with different approaches

## Project Overview

SEOLOGY.AI is an AI-powered SEO automation SaaS that automatically fixes SEO issues instead of just reporting them. The platform connects to CMSs (Shopify, WordPress, custom sites via JavaScript) and uses Claude AI to analyze, plan, and execute SEO fixes automatically.

**Core Innovation**: First platform to actually log into CMSs and make permanent SEO changes, not just report issues.

## Build Status

**CURRENT PHASE**: Rebuilding from Webflow templates

This project is being rebuilt from scratch using 3 premium Webflow templates:
1. **Dashflow X** - Dashboard/SaaS UI components (for user dashboard and admin panel)
2. **Noura** - Playful agency template (potential for marketing pages)
3. **Craflow** - Dark sophisticated template with 3D animations (potential for marketing pages)

The complete product specification is in [breakdown.txt](breakdown.txt).

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Shadcn/UI
- **Backend**: Next.js API Routes (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI**: Claude 3.5 Sonnet (Anthropic SDK)
- **Payments**: Stripe
- **Job Queue**: Background job system (see `lib/jobs/`)
- **Deployment**: Vercel (frontend + API)

## Development Commands

```bash
# Install dependencies
npm install

# Database setup
npx prisma generate        # Generate Prisma client
npx prisma db push         # Push schema to database
npx prisma studio          # Open database GUI

# Development
npm run dev                # Start Next.js dev server (localhost:3000)

# Build
npm run build              # Production build
npm start                  # Start production server

# Linting
npm run lint               # Run ESLint
```

## Architecture Overview

### Route Structure

The app uses Next.js 14 App Router with route groups:

- `app/(auth)/` - Authentication pages (sign-in, sign-up)
- `app/(admin)/` - Admin dashboard (analytics, users, sites, jobs, issues)
- `app/dashboard/` - User dashboard (sites, analytics, billing, notifications, onboarding)
- `app/api/` - API routes
- `app/` - Marketing pages (landing, pricing)

**IMPORTANT**: Route groups in Next.js 14 use parentheses but do NOT appear in URLs. For example:
- `app/(auth)/sign-in/page.tsx` → URL: `/sign-in`
- `app/(admin)/admin/page.tsx` → URL: `/admin`
- `app/dashboard/page.tsx` → URL: `/dashboard`

### Core Systems

#### 1. Execution Modes (`lib/execution-modes.ts`)

Three ways to handle SEO fixes:

- **AUTOMATIC**: Applies all fixes immediately without approval
- **PLAN**: Creates a batch of fixes, asks for single approval to execute all
- **APPROVE**: Creates fixes individually, each requires manual approval

Each user has a default `executionMode` stored in the database.

**Key Functions**:
- `executeFixes(siteId, userId, issueIds?)` - Main entry point, routes to correct mode
- `executeAutomatic(context)` - Applies all fixes immediately
- `executePlan(context)` - Creates plan, waits for approval
- `executeApprove(context)` - Creates pending fixes
- `approveFix(fixId, userId)` - Approve and apply single fix
- `approvePlan(siteId, userId)` - Approve and apply all fixes in plan

#### 2. Job System (`lib/jobs/`)

Background job processor for long-running tasks:

- **CRAWL_SITE**: Crawl website pages for analysis
- **ANALYZE_SITE**: Claude AI analyzes site for SEO issues
- **CLEANUP_ROLLBACKS**: Clean up old rollback data (90 days)
- **RESET_USAGE**: Monthly usage quota reset

**Architecture**:
- `lib/jobs/index.ts` - Job dispatcher
- `lib/jobs/crawl-job.ts` - Crawling logic (using Puppeteer)
- `lib/jobs/analysis-job.ts` - Claude AI analysis
- `lib/jobs/cleanup-job.ts` - Data cleanup
- `lib/jobs/usage-reset-job.ts` - Usage reset logic
- `lib/queue.ts` - Job queue management

Jobs are created via API routes and processed in the background.

#### 3. Platform Integrations

**Shopify** (`lib/shopify.ts`):
- OAuth flow: `app/api/auth/shopify/route.ts` → `app/api/auth/shopify/callback/route.ts`
- Client ID: `0b87ac78cf0783fd1dd829bf5421fae5`
- Scopes: products, content, themes (read/write)
- Stores encrypted access tokens in `connections` table

**WordPress** (`lib/wordpress.ts`):
- REST API with Application Passwords
- Plugin-based connection (optional)
- Uses basic auth over HTTPS

**Magic.js** (`public/magic.js`):
- Universal JavaScript connector for custom sites
- Embeds snippet that fetches and applies fixes client-side
- API: `app/api/magic/` routes

#### 4. Claude AI Integration (`lib/claude.ts`)

Uses Anthropic's Claude API to:
- Analyze sites for SEO issues
- Generate fix plans with exact implementation code
- Provide intelligent, context-aware SEO recommendations

Model: `claude-3-5-sonnet-20241022`

**Key Pattern**: The system caches site context to avoid re-sending large payloads on every request.

#### 5. Notifications System (`lib/notifications.ts`)

In-app notification system:
- Real-time updates for fix status
- Component: `components/notifications/NotificationCenter.tsx`
- API: `app/api/notifications/` routes
- Features: mark as read, read all, unread count

#### 6. Billing & Usage (`lib/stripe.ts`, `lib/usage.ts`)

**Plans**:
- STARTER: 3 sites, 500 fixes/month
- GROWTH: 10 sites, 5000 fixes/month
- SCALE: Unlimited

**Usage Tracking**:
- `lib/usage.ts` - Track and enforce usage limits
- `lib/middleware/usage-enforcement.ts` - Middleware to check limits
- Monthly reset via `RESET_USAGE` job

**Stripe Integration**:
- Checkout: `app/api/billing/create-checkout/route.ts`
- Portal: `app/api/billing/portal/route.ts`
- Webhooks: `app/api/billing/webhook/route.ts`

#### 7. Onboarding Flow

Multi-step wizard for new users (`components/onboarding/`):

1. **Welcome** - Introduction
2. **Connect Site** - Link first site (Shopify/WordPress/Magic.js)
3. **Scanning** - Crawl site for pages
4. **Review Issues** - Show detected SEO issues
5. **Execution Mode** - Choose AUTOMATIC/PLAN/APPROVE
6. **First Fix** - Apply first fix
7. **Complete** - Onboarding finished

Route: `app/dashboard/onboarding/page.tsx`

### Database Schema

Key models (see `prisma/schema.prisma`):

- **User**: Authentication, plan, execution mode, onboarding state
- **Connection**: CMS connections (Shopify, WordPress, etc.) with encrypted credentials
- **Site**: Individual sites (for Magic.js)
- **Issue**: Detected SEO problems (missing meta, broken links, etc.)
- **Fix**: Applied fixes with before/after state, rollback capability (90-day window)
- **Job**: Background jobs queue
- **Metric**: Performance tracking (traffic, rankings)
- **AuditLog**: All user actions
- **Subscription**: Stripe subscription data
- **Notification**: In-app notifications
- **UsageRecord**: Track monthly usage against plan limits

**Critical Relationships**:
- User → Connections → Sites → Issues → Fixes
- User → Subscription (one-to-one)
- Connection stores encrypted tokens using `lib/encryption.ts`

### API Routes Pattern

All API routes follow this structure:

```typescript
interface APIResponse<T> {
  success: boolean
  data?: T
  error?: { code: string; message: string; details?: any }
  meta?: { page?: number; limit?: number; total?: number }
}
```

**Authentication**: Most routes use Clerk's `auth()` helper to get `userId`.

**Error Handling**: Wrap in try/catch, return standardized error responses.

## Environment Variables

See `.env.example` for complete list. Critical variables:

- `DATABASE_URL` - PostgreSQL connection
- `NEXT_PUBLIC_CLERK_*` - Clerk authentication
- `CLERK_SECRET_KEY` - Server-side Clerk key
- `ANTHROPIC_API_KEY` - Claude AI
- `STRIPE_SECRET_KEY` - Stripe payments
- `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` - Shopify OAuth
- `ENCRYPTION_KEY` - 32-char key for encrypting tokens
- `CRON_SECRET` - Secure cron job endpoints

## Important Patterns

### Security

1. **Token Encryption**: All CMS tokens stored encrypted via `lib/encryption.ts`
2. **Cron Protection**: Cron endpoints check `CRON_SECRET` header
3. **User Isolation**: All queries filter by `userId` to prevent data leaks
4. **Clerk Auth**: Use `auth()` helper, check for `userId` presence

### Database Access

```typescript
import { db } from '@/lib/db'

// Always filter by user
const sites = await db.site.findMany({
  where: { userId }
})

// Use transactions for multi-step operations
await db.$transaction([
  db.fix.create({ ... }),
  db.issue.update({ ... })
])
```

### Job Creation

```typescript
import { createJob } from '@/lib/queue'

await createJob('CRAWL_SITE', {
  siteId: site.id,
  url: site.url
})
```

### Audit Logging

Always create audit logs for important actions:

```typescript
await db.auditLog.create({
  data: {
    siteId,
    userId,
    action: 'FIX_APPLIED',
    resource: 'fix',
    resourceId: fixId,
    details: { /* additional context */ }
  }
})
```

## Common Workflows

### Adding a New SEO Fix Type

1. Add issue type detection in `lib/crawler.ts`
2. Add fix generation logic in `lib/execution-modes.ts` → `generateFixForIssue()`
3. Add fix application logic in `lib/shopify.ts` or `lib/wordpress.ts`
4. Update UI in `components/seo/IssueCard.tsx` to display new type

### Adding a New Platform Integration

1. Add platform to `Platform` enum in `prisma/schema.prisma`
2. Create connector in `lib/[platform].ts`
3. Add OAuth flow in `app/api/auth/[platform]/`
4. Add connection UI in `app/dashboard/connect/`
5. Update `lib/execution-modes.ts` to handle new platform

### Deployment Notes

- **Vercel**: Frontend + API routes deploy automatically
- **Database**: PostgreSQL (managed, e.g., Supabase/Railway)
- **Cron Jobs**: Use Vercel Cron or external service to hit `/api/cron/*` endpoints
- **Route Groups**: Next.js 14 handles these natively, no special Vercel config needed

## Design System & Templates

### Webflow Template Sources

Located in `C:\Users\manna\Downloads\Website inspo\`:

1. **anyros-wondrous-site.webflow** (Dashflow X)
   - Full dashboard UI kit with components
   - Pre-built: buttons, inputs, avatars, badges, tooltips, notifications, cards, tables, modals, tabs, breadcrumbs
   - Perfect for: User dashboard, admin panel, settings pages
   - Color scheme: Modern SaaS (light/dark modes)

2. **anyros-fresh-site.webflow** (Noura)
   - Playful, animated agency template
   - Smooth animations and bold visuals
   - Perfect for: Marketing landing page, about page
   - Color scheme: Bright, playful

3. **anyros-fantabulous-site.webflow** (Craflow)
   - Dark, sophisticated with 3D animations
   - Modern, premium feel
   - Perfect for: Marketing landing page (alternative to Noura)
   - Color scheme: Dark mode, sophisticated

### Design System Strategy

**For Dashboard** (User & Admin):
- Use Dashflow X components directly converted to React
- Extract CSS from `anyros-wondrous-site.webflow/css/`
- Convert Webflow classes to Tailwind where possible
- Keep Webflow custom CSS for complex components

**For Marketing**:
- Choose either Noura (playful) OR Craflow (sophisticated) as base
- Extract hero sections, feature sections, pricing tables
- Maintain animations using Framer Motion or GSAP

**UI Component Library**:
- Convert Dashflow X components to Shadcn/UI compatible components
- Store in `components/ui/` following Shadcn conventions
- Create variants for different use cases

## Conversion Strategy: Webflow → Next.js

### CSS Conversion

Webflow exports 3 CSS files:
1. `normalize.css` - Standard CSS reset (use as-is)
2. `webflow.css` - Webflow framework styles (use as-is)
3. `[template].webflow.css` - Custom template styles (convert selectively)

**Approach**:
```bash
# Keep Webflow CSS in public/webflow/
public/
  webflow/
    dashflow.css
    noura.css  # or craflow.css
    normalize.css
    webflow.css

# Import in app/layout.tsx
import './globals.css'
// Webflow CSS loaded via <link> tags for dashboard pages
```

### Component Extraction Pattern

For each Webflow component:
1. Copy HTML structure
2. Convert to JSX (className, onClick, etc.)
3. Extract inline styles to Tailwind or CSS modules
4. Replace static content with props
5. Add TypeScript types

**Example**:
```tsx
// Webflow HTML
<div class="card header-dropdown-card">
  <div class="text-100 dropdown-column-title">Title</div>
</div>

// React Component
interface CardProps {
  title: string
  children: React.ReactNode
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="card header-dropdown-card">
      <div className="text-100 dropdown-column-title">{title}</div>
      {children}
    </div>
  )
}
```

### Animation Conversion

Webflow uses:
- GSAP (GreenSock) for animations
- Custom data attributes (data-w-id, data-animation)
- Inline transform styles

**Convert to**:
- Framer Motion for React animations
- CSS transitions for simple effects
- Keep GSAP for complex 3D animations (Craflow)

### Image Asset Management

All templates include `/images` and `/fonts` folders:

```bash
# Copy to Next.js public folder
public/
  images/
    dashboard/  # from Dashflow X
    marketing/  # from Noura or Craflow
  fonts/       # from templates
```

**Usage in Next.js**:
```tsx
import Image from 'next/image'

<Image
  src="/images/dashboard/logo.svg"
  alt="Logo"
  width={200}
  height={50}
/>
```

## Build Sequence

### Phase 1: Foundation (Week 1)
1. Initialize Next.js 14 project
2. Set up Tailwind CSS
3. Copy Webflow CSS files to public/
4. Set up Prisma with schema from breakdown.txt
5. Configure Clerk authentication
6. Create basic routing structure

### Phase 2: Dashboard UI (Week 2)
1. Convert Dashflow X components to React
2. Build user dashboard layout (sidebar, header)
3. Build admin dashboard layout
4. Create reusable UI components library
5. Implement dark/light mode toggle

### Phase 3: Marketing Pages (Week 3)
1. Convert chosen template (Noura or Craflow) to React
2. Build landing page
3. Build pricing page
4. Build about/features pages
5. Implement animations

### Phase 4: Core Functionality (Week 4-6)
1. Implement API routes
2. Build platform connectors (Shopify, WordPress, Magic.js)
3. Integrate Claude AI
4. Build execution modes system
5. Implement job queue system

### Phase 5: Features (Week 7-8)
1. Build onboarding flow
2. Implement notifications system
3. Add billing/subscription management
4. Build admin controls
5. Add usage tracking

### Phase 6: Polish & Deploy (Week 9)
1. Testing and bug fixes
2. Performance optimization
3. SEO optimization (dogfooding!)
4. Vercel deployment
5. Production environment setup

## File Structure (Final)

```
seology-ai/
├── app/
│   ├── (auth)/              # Auth pages (Clerk)
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (admin)/             # Admin dashboard
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── analytics/
│   │       ├── users/
│   │       ├── sites/
│   │       └── jobs/
│   ├── dashboard/           # User dashboard
│   │   ├── page.tsx
│   │   ├── sites/
│   │   ├── billing/
│   │   ├── settings/
│   │   ├── onboarding/
│   │   └── notifications/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── billing/
│   │   ├── sites/
│   │   ├── fixes/
│   │   ├── jobs/
│   │   ├── magic/
│   │   └── cron/
│   ├── page.tsx             # Landing page
│   ├── pricing/
│   ├── about/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                  # Shadcn + Dashflow components
│   ├── dashboard/           # Dashboard-specific
│   ├── admin/               # Admin-specific
│   ├── marketing/           # Marketing site
│   ├── onboarding/          # Onboarding wizard
│   └── notifications/       # Notifications
├── lib/
│   ├── db.ts                # Prisma client
│   ├── claude.ts            # Claude AI integration
│   ├── shopify.ts           # Shopify connector
│   ├── wordpress.ts         # WordPress connector
│   ├── execution-modes.ts   # Fix execution logic
│   ├── jobs/                # Background jobs
│   ├── queue.ts             # Job queue
│   ├── stripe.ts            # Billing
│   ├── usage.ts             # Usage tracking
│   ├── notifications.ts     # Notifications
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── webflow/             # Webflow CSS
│   ├── images/
│   │   ├── dashboard/
│   │   └── marketing/
│   ├── fonts/
│   └── magic.js             # Universal connector
├── types/
│   └── *.ts
├── breakdown.txt            # Product specification
├── CLAUDE.md                # This file
└── package.json
```

## Recent Critical Fixes

- All files were deleted in previous cleanup - working directory is clean
- Rebuilding from scratch using Webflow templates
- Following the complete specification in breakdown.txt

## Key Files Reference

- `lib/execution-modes.ts` - Core execution logic for all three modes
- `lib/jobs/index.ts` - Job dispatcher
- `lib/claude.ts` - Claude AI integration
- `lib/plans.ts` - Plan definitions and limits
- `lib/usage.ts` - Usage tracking and enforcement
- `lib/subscription-guard.ts` - Middleware for subscription checks
- `app/dashboard/onboarding/page.tsx` - Onboarding wizard
- `components/onboarding/` - Onboarding step components
- `prisma/schema.prisma` - Complete database schema

## Testing

The project uses manual testing. For testing integrations:

- **Shopify**: Use development store
- **WordPress**: Use local WP install with REST API enabled
- **Magic.js**: Test with `public/test.html`

## Admin Dashboard

Located at `/admin`:
- User management
- Site monitoring
- Job queue status
- System analytics
- Issue broadcasts
- Manual user upgrades

Protected by Clerk role checks (admin role required).

---

## Design Review & Visual Development

SEOLOGY.AI follows **S-Tier SaaS Dashboard standards** as defined in the [OneRedOak design review framework](https://github.com/OneRedOak/claude-code-workflows/tree/main/design-review).

### Design Documentation

All visual development must reference these documents:

1. **[Design Principles](context/design-principles.md)** - S-Tier standards for all UI/UX decisions
2. **[Style Guide](context/style-guide.md)** - SEOLOGY.AI brand-specific styling

### Quick Visual Check Process

Before committing UI changes, verify:

```bash
# ✅ Accessibility
- [ ] 4.5:1 color contrast minimum (text)
- [ ] 3:1 color contrast minimum (large text, UI components)
- [ ] 44x44px minimum touch targets
- [ ] Focus indicators visible (2px outline + 4px shadow)
- [ ] Keyboard navigation works
- [ ] Screen reader labels present (aria-label, aria-labelledby)
- [ ] Semantic HTML used (<header>, <nav>, <main>, <button>, etc.)

# ✅ Responsiveness
- [ ] Desktop (1440px) - optimal layout
- [ ] Tablet (768px) - responsive adaptations
- [ ] Mobile (375px) - mobile-first view
- [ ] No horizontal scroll at any breakpoint
- [ ] Text remains readable (16px minimum on mobile)
- [ ] Touch targets 44x44px on mobile

# ✅ Design System Compliance
- [ ] Uses 8px grid system (gap-2, gap-4, gap-8)
- [ ] Colors from design tokens (--brand-primary-*, --neutral-*)
- [ ] Typography scale followed (text-h1, text-h2, text-body)
- [ ] Consistent border radius (rounded-lg, rounded-xl)
- [ ] Glassmorphism for cards (bg-white/5 backdrop-blur-xl)

# ✅ Data Tables (if applicable)
- [ ] Numeric columns right-aligned with monospace font
- [ ] Mobile card view enabled (mobileCardView={true})
- [ ] Sortable columns have sort indicators
- [ ] Pagination present for >10 rows
- [ ] Search functionality if >20 rows

# ✅ Dark Mode
- [ ] Never pure black backgrounds (use #0a0f1f)
- [ ] Sufficient contrast on dark backgrounds
- [ ] Glassmorphism effects work on dark
- [ ] No pure white text (use #ffffff with opacity or #d1d5db)
```

### Comprehensive Design Review

For new features or major UI changes, run a full design review:

```bash
# Run the design review slash command
/design-review
```

This triggers a **7-phase review process**:

1. **Phase 0: Preparation** - Gather context from git diff and design docs
2. **Phase 1: Interaction & User Flow** - Test user journeys and interactions
3. **Phase 2: Responsiveness** - Verify layouts at 1440px, 768px, 375px
4. **Phase 3: Visual Polish** - Check spacing, alignment, typography, colors
5. **Phase 4: Accessibility** - WCAG 2.1 AA compliance audit
6. **Phase 5: Robustness** - Edge cases, long content, empty states
7. **Phase 6: Code Health** - Component quality, maintainability
8. **Phase 7: Content & Console** - Copy quality, browser console errors

The review generates a detailed report with:
- Overall grade (A-F, S-Tier if 95+)
- Phase-by-phase scores
- Specific issues found
- Actionable recommendations
- Priority levels (Critical, High, Medium, Low)

### Design Review Agent

You can also invoke the specialized design review agent manually:

```typescript
// In Claude Code
Use the Task tool with subagent_type="design-review-agent"
```

This agent:
- Takes screenshots at multiple breakpoints using Playwright
- Analyzes visual quality against design principles
- Validates accessibility with automated tools
- Provides specific code suggestions
- Tracks issues across multiple review sessions

### When to Run Design Reviews

**Always review before:**
- Merging to main branch
- Deploying to production
- Marking features as "complete"
- Major refactors or redesigns

**Quick checks during development:**
- After adding new components
- When changing layouts
- After updating responsive breakpoints
- When modifying color schemes or typography

### Common Design Issues to Avoid

❌ **Don't:**
- Use pure black (#000000) or pure white (#ffffff) backgrounds
- Skip focus indicators
- Hardcode colors (use design tokens)
- Left-align numeric table columns
- Skip mobile testing
- Use small touch targets (<44px)
- Break 8px grid system
- Add animations without checking prefers-reduced-motion

✅ **Do:**
- Use design tokens (--brand-primary-500, --neutral-600)
- Test all breakpoints (1440px, 768px, 375px)
- Right-align numbers with monospace font
- Add aria-labels to interactive elements
- Use semantic HTML
- Follow 4.5:1 contrast ratio minimum
- Implement mobile card views for tables
- Provide skip links for keyboard navigation

### Integration with Development Workflow

The design review system integrates with your workflow:

1. **During Development**: Quick checks using design principles doc
2. **Before Commit**: Run `/design-review` for comprehensive audit
3. **In Code Review**: Reference design review report in PR
4. **Continuous**: Design review agent monitors visual quality

### Design Tokens Quick Reference

```css
/* Most-used tokens */
--brand-primary-500: #3b82f6    /* Primary CTAs, links */
--brand-secondary-500: #a855f7  /* Accents, highlights */
--brand-accent-500: #06b6d4     /* AI features, tech elements */

--neutral-50: #0a0f1f           /* Base background */
--neutral-100: #1f2d54          /* Card backgrounds */
--neutral-600: #9ca3af          /* Accessible gray text */
--neutral-1000: #ffffff         /* White text/elements */

--semantic-success: #14ca74
--semantic-error: #ff5a65
--semantic-warning: #ff9e2c
--semantic-info: #1d88fe
```

### Accessibility Minimum Requirements

All UI must meet these non-negotiable standards:

- **WCAG 2.1 Level AA** compliance
- **4.5:1 contrast ratio** for normal text
- **3:1 contrast ratio** for large text (18px+) and UI components
- **44x44px minimum** touch targets on mobile
- **Keyboard navigation** fully functional
- **Screen reader support** with ARIA labels
- **Focus indicators** visible (2px solid outline + 4px shadow)
- **Semantic HTML** for all content structure
- **Alt text** for all meaningful images
- **Form labels** for all inputs

### Mobile-First Development

SEOLOGY.AI uses mobile-first responsive design:

```tsx
// Default styles are mobile (375px)
<div className="flex flex-col gap-4 p-4">

// Tablet breakpoint (768px+)
<div className="md:flex-row md:gap-6 md:p-6">

// Desktop breakpoint (1440px+)
<div className="lg:gap-8 lg:p-8">
```

**Breakpoints:**
- Mobile: 375px - 767px (default)
- Tablet: 768px - 991px (md:)
- Desktop: 992px - 1440px (lg:)
- Large Desktop: 1441px+ (xl:)

### Design System Component Library

Reusable components are in `components/ui/`:

- **Button** - Primary, secondary, destructive, ghost variants
- **Input** - Text, with icons, error states
- **Card** - Standard, hoverable, featured variants
- **DataTable** - Sortable, searchable, mobile-responsive
- **Badge** - Status indicators (success, warning, error, info)
- **Modal** - Overlays with backdrop blur
- **Tooltip** - Hover information
- **EmptyState** - No-data scenarios
- **LoadingSpinner** - Loading indicators

All components follow design principles and include full accessibility support.

---
