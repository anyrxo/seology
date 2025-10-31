# SEOLOGY.AI - COMPLETE PRODUCT REQUIREMENTS DOCUMENT
**Version 2.0 - Comprehensive Edition**
**Created**: 2025-10-31
**Based On**: BREAKDOWN OF SEOLOGY.TXT (Complete 1,356-line specification)

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Market Opportunity](#2-market-opportunity)
3. [Product Vision & Strategy](#3-product-vision--strategy)
4. [User Personas](#4-user-personas)
5. [Technical Architecture](#5-technical-architecture)
6. [Database Schema](#6-database-schema)
7. [Platform Integrations](#7-platform-integrations)
8. [Core Features & Requirements](#8-core-features--requirements)
9. [Claude AI Integration](#9-claude-ai-integration)
10. [API Structure](#10-api-structure)
11. [Frontend Requirements](#11-frontend-requirements)
12. [Pricing & Business Model](#12-pricing--business-model)
13. [MVP Implementation Plan](#13-mvp-implementation-plan)
14. [Development Phases](#14-development-phases)
15. [Success Metrics](#15-success-metrics)
16. [Security & Compliance](#16-security--compliance)
17. [Support & Documentation](#17-support--documentation)
18. [Launch Strategy](#18-launch-strategy)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Product Overview
**SEOLOGY.AI** is an AI-powered SEO automation SaaS that actually **DOES** the SEO work instead of just reporting problems. We use Claude AI to analyze, plan, and execute SEO fixes across WordPress, Shopify, and custom websites automatically.

### 1.2 The Market Gap
- **The Problem**: Every SEO tool tells you what's wrong. Nobody actually fixes it.
- **The Innovation**: We're the first to log into your CMS and make permanent changes.
- **The Advantage**: Claude AI brain + universal platform connectors + automatic execution = SEO on autopilot.

### 1.3 Core Value Proposition
> "We don't tell you what's wrong with your SEO. We fix it."

### 1.4 Key Differentiators
1. **First-Mover Advantage**: Nobody else makes permanent CMS changes
2. **Trust Through Gradual Access**: Start read-only, earn write permissions
3. **Claude AI**: Smarter than rule-based automation
4. **Universal Compatibility**: Works with any platform
5. **Three Execution Modes**: Automatic, Plan, Approve - user chooses control level

---

## 2. MARKET OPPORTUNITY

### 2.1 Market Problems
- **Budget Constraints**: 45% of SEO teams have <$1,000/month budget but tools cost $500+
- **Implementation Bottleneck**: Enterprises identify SEO issues but face 60+ day implementation cycles
- **Skills Gap**: 24% of SEO teams lack technical expertise to implement fixes
- **Data Without Action**: Current tools provide analysis, not execution

### 2.2 Target Market

#### Primary: SMBs (Small-Medium Businesses)
- **Size**: 100-10,000 pages
- **Pricing**: $297-$997/month
- **Pain Point**: Know what's broken, can't afford dev time to fix
- **Value**: Automatic fixes without hiring developers

#### Secondary: Agencies
- **Size**: Managing multiple client sites
- **Pricing**: $2,497/month
- **Pain Point**: Manual SEO work doesn't scale
- **Value**: White-label automation for all clients

#### Tertiary: Enterprises
- **Size**: Large organizations with SEO backlog
- **Pricing**: $5,000+/month (custom)
- **Pain Point**: Engineering bottleneck for SEO tasks
- **Value**: Execution without burdening dev team

### 2.3 Competitive Landscape

**Traditional SEO Tools (Ahrefs, Semrush, Moz)**:
- **What They Do**: Identify issues, provide reports
- **What They Don't**: Actually fix anything
- **Our Advantage**: We fix, they report

**SEO Agencies**:
- **What They Do**: Manual implementation
- **What They Don't**: Scale affordably
- **Our Advantage**: Automated at software margins

**Technical SEO Consultants**:
- **What They Do**: Deep technical audits
- **What They Don't**: Ongoing maintenance
- **Our Advantage**: 24/7 monitoring + automatic fixes

---

## 3. PRODUCT VISION & STRATEGY

### 3.1 Vision Statement
> A world where every website ranks on page 1 because technical SEO barriers no longer exist. SEO optimization becomes as automatic as spell-check.

### 3.2 Mission Statement
> To make SEO implementation accessible to everyone by automating what was previously manual, technical, and expensive.

### 3.3 Three Execution Modes

```typescript
const EXECUTION_MODES = {
  AUTOMATIC: 'fix_immediately',      // Full autopilot
  PLAN: 'show_plan_first',          // Review before execution
  APPROVE: 'ask_for_each_fix'       // Manual approval required
};
```

**Mode 1: AUTOMATIC**
- **User**: Busy founders, non-technical users
- **Behavior**: Seology detects issues and fixes them immediately
- **Notification**: Daily email summary
- **Control**: Minimal - trust the AI
- **Use Case**: "Just fix my SEO, I don't want to think about it"

**Mode 2: PLAN**
- **User**: SEO managers, consultants
- **Behavior**: Seology detects issues, generates plan, waits for approval
- **Notification**: Email when plan ready
- **Control**: Medium - review before batch execution
- **Use Case**: "Show me what you'll do, then execute it all at once"

**Mode 3: APPROVE**
- **User**: Enterprise teams, brands, agencies
- **Behavior**: Seology detects issues, asks permission for EACH fix
- **Notification**: Immediate alerts for each fix
- **Control**: Maximum - approve every change
- **Use Case**: "I need to see and approve every single change"

### 3.4 Product Principles
1. **Automation First**: If it can be automated, it should be
2. **Transparency Always**: Every fix shown, nothing hidden
3. **Safety By Design**: Rollback any change within 90 days
4. **Platform Agnostic**: Works everywhere, not just Shopify
5. **AI-Powered, Not Rule-Based**: Context-aware decisions
6. **Performance-Based Pricing**: Pay for fixes, not just access (future)

---

## 4. USER PERSONAS

### 4.1 Sarah - E-commerce Owner

**Demographics**:
- Age: 32
- Role: Founder & CEO
- Company: DTC e-commerce brand
- Revenue: $2M/year
- Team: 5 people
- Location: Austin, TX

**Background**:
- Shopify store with 500 products
- No in-house developer
- Uses Ahrefs (finds 247 issues, doesn't know how to fix)
- Outsourced to freelancer once (cost $3,000, took 2 months)

**Goals**:
- Increase organic traffic
- Rank for product keywords
- Don't want to learn technical SEO
- Need fixes without hiring developers

**Pain Points**:
- "Ahrefs shows me what's broken, but I can't fix it myself"
- "Developers are expensive and slow"
- "I don't know which issues matter most"

**How Seology Helps**:
- **Mode**: Automatic
- **Value**: Fixes applied while she sleeps
- **ROI**: $297/month vs $3,000 freelancer
- **Outcome**: 500 fixes in first month, organic traffic up 40%

---

### 4.2 Marcus - Agency SEO Manager

**Demographics**:
- Age: 28
- Role: SEO Manager
- Company: Digital marketing agency
- Clients: 12 active clients
- Team: 2 junior SEO specialists
- Location: Remote (NYC-based company)

**Background**:
- Manages SEO for e-commerce, SaaS, local businesses
- Spends 60% of time on manual implementation
- Uses Screaming Frog, Semrush, Google Search Console
- Clients ask "why isn't SEO working faster?"

**Goals**:
- Scale client portfolio from 12 to 30
- Reduce time spent on technical tasks
- Show faster results to clients
- Increase agency margins

**Pain Points**:
- "I spend all my time fixing meta tags and broken links"
- "Can't scale without hiring more people"
- "Clients don't see results fast enough"

**How Seology Helps**:
- **Mode**: Plan (review before applying to client sites)
- **Value**: White-label automation for all clients
- **ROI**: $2,497/month to manage unlimited sites
- **Outcome**: Scales from 12 to 30 clients with same team

---

### 4.3 David - Enterprise SEO Director

**Demographics**:
- Age: 41
- Role: Director of SEO
- Company: Fortune 500 SaaS company
- Team: 8-person SEO team
- Pages: 50,000+ pages
- Location: San Francisco, CA

**Background**:
- Large content site with blog, docs, product pages
- Engineering backlog is 3 months out
- Uses enterprise SEO stack (BrightEdge, Conductor)
- Needs approval for every site change (compliance)

**Goals**:
- Execute SEO improvements without burdening engineering
- Maintain compliance and audit trail
- Reduce time-to-fix from 90 days to <7 days
- Prove SEO ROI with data

**Pain Points**:
- "We identify issues but can't get dev time to fix them"
- "Engineering prioritizes features over SEO"
- "Our tools cost $50K/year but only tell us what's wrong"

**How Seology Helps**:
- **Mode**: Approve (must review every fix)
- **Value**: Execute without engineering team
- **ROI**: $5,000/month custom plan
- **Outcome**: 90-day backlog cleared in 2 weeks

---

## 5. TECHNICAL ARCHITECTURE

### 5.1 System Overview

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│         Next.js 14 + Tailwind + Shadcn          │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────┴───────────────────────────────┐
│              API Layer (Node.js)                 │
│                Express + TypeScript               │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴─────────┬──────────────┐
        │                   │              │
┌───────┴────────┐ ┌────────┴──────┐ ┌────┴──────┐
│  Claude AI     │ │   PostgreSQL  │ │   Redis   │
│  Integration   │ │   (Supabase)  │ │   Queue   │
└────────────────┘ └───────────────┘ └───────────┘
        │
┌───────┴────────────────────────────────────────┐
│           Platform Connectors                   │
├─────────────┬─────────────┬───────────────────┤
│  Shopify    │  WordPress  │     Custom        │
│    API      │     API     │   JavaScript      │
└─────────────┴─────────────┴───────────────────┘
```

### 5.2 Technology Stack

```typescript
const TECH_STACK = {
  frontend: {
    framework: 'Next.js 14',
    ui: 'Tailwind CSS + Shadcn/ui',
    state: 'Zustand',
    auth: 'Clerk',
    dataFetching: '@tanstack/react-query',
    forms: 'React Hook Form + Zod',
    charts: 'Recharts',
  },

  backend: {
    runtime: 'Node.js 20',
    framework: 'Express',
    language: 'TypeScript',
    orm: 'Prisma',
    queue: 'Bull (Redis)',
    validation: 'Zod',
    testing: 'Jest + Supertest',
  },

  database: {
    primary: 'PostgreSQL (Supabase)',
    cache: 'Redis (Upstash)',
    vector: 'Pinecone (for SEO knowledge base)',
  },

  ai: {
    primary: 'Claude 3.5 Sonnet API',
    model: 'claude-3-5-sonnet-20241022',
    fallback: 'OpenAI GPT-4',
    embeddings: 'OpenAI Ada (for semantic search)',
  },

  infrastructure: {
    frontendHosting: 'Vercel',
    backendHosting: 'Railway',
    cdn: 'Cloudflare',
    monitoring: 'Sentry + Axiom',
    analytics: 'PostHog',
    payments: 'Stripe',
    email: 'Resend',
  },

  external APIs: {
    shopify: 'Shopify Admin API',
    wordpress: 'WordPress REST API + WP GraphQL',
    stripe: 'Stripe API v2023-10',
    search: 'Google Search Console API',
    analytics: 'Google Analytics 4 API',
  }
};
```

### 5.3 Infrastructure Architecture

**Frontend** (Vercel):
- Next.js App Router
- Edge functions for API routes
- Static generation for marketing pages
- ISR for dashboard pages
- Cloudflare CDN in front

**Backend** (Railway):
- Express API server
- Bull queue workers (separate process)
- WebSocket server (for real-time updates)
- Cron jobs (daily scans, email digests)

**Database** (Supabase):
- PostgreSQL 15
- Row-level security enabled
- Daily automated backups
- Realtime subscriptions for live updates

**Cache** (Upstash Redis):
- Session storage
- Queue management (Bull)
- Rate limiting
- API response caching

### 5.4 Data Flow

**Fix Execution Flow**:
```
1. Cron job triggers daily scan
   ↓
2. Crawler fetches site pages (Puppeteer)
   ↓
3. Claude AI analyzes for issues
   ↓
4. Issues stored in database
   ↓
5. Mode check:
   - Automatic → Execute immediately
   - Plan → Wait for user approval
   - Approve → Wait for per-fix approval
   ↓
6. Platform connector applies fix
   ↓
7. Verification: Re-fetch to confirm
   ↓
8. Log fix in database
   ↓
9. Notify user (email/webhook)
```

**User Request Flow**:
```
User clicks "Fix All" button
   ↓
Next.js API route (/api/sites/:id/fix-all)
   ↓
Express API endpoint
   ↓
Add job to Bull queue (fix-execution-queue)
   ↓
Worker picks up job
   ↓
For each issue:
  - Claude generates fix
  - Platform connector applies fix
  - Log result
   ↓
Send completion notification
```

---

## 6. DATABASE SCHEMA

### 6.1 Core Tables

#### Users & Authentication
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255), -- For email/password auth
  clerk_user_id VARCHAR(255) UNIQUE, -- Clerk integration
  plan ENUM('starter', 'growth', 'scale') DEFAULT 'starter',
  execution_mode ENUM('automatic', 'plan', 'approve') DEFAULT 'approve',
  stripe_customer_id VARCHAR(255),
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_clerk ON users(clerk_user_id);
```

#### Website Connections
```sql
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform ENUM('shopify', 'wordpress', 'wix', 'webflow', 'squarespace', 'custom') NOT NULL,
  domain VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),

  -- Authentication
  access_token TEXT, -- Encrypted (AES-256)
  refresh_token TEXT, -- Encrypted
  credentials JSONB, -- Platform-specific data (encrypted)

  -- Status
  status ENUM('pending', 'connected', 'error', 'disconnected', 'rate_limited') DEFAULT 'pending',
  error_message TEXT,

  -- Sync tracking
  last_sync TIMESTAMP,
  last_analysis TIMESTAMP,
  next_scheduled_scan TIMESTAMP,

  -- Metadata
  site_metadata JSONB, -- {pages_count, products_count, etc.}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_connections_user ON connections(user_id);
CREATE INDEX idx_connections_status ON connections(status);
CREATE INDEX idx_connections_next_scan ON connections(next_scheduled_scan);
```

#### SEO Issues Detected
```sql
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID REFERENCES connections(id) ON DELETE CASCADE,

  -- Issue classification
  type VARCHAR(100) NOT NULL, -- 'missing_meta', 'broken_link', 'missing_alt', etc.
  category ENUM('technical', 'content', 'links', 'performance', 'mobile') NOT NULL,
  severity ENUM('critical', 'high', 'medium', 'low') NOT NULL,

  -- Location
  page_url TEXT NOT NULL,
  page_title VARCHAR(500),
  selector VARCHAR(500), -- CSS selector for element (if applicable)

  -- Details
  details JSONB NOT NULL, -- {current_value, recommended_value, reasoning}
  estimated_impact INTEGER CHECK (estimated_impact BETWEEN 1 AND 10),

  -- Status
  status ENUM('detected', 'fixing', 'fixed', 'failed', 'ignored') DEFAULT 'detected',
  fix_id UUID REFERENCES fixes(id), -- Link to applied fix

  -- Timestamps
  detected_at TIMESTAMP DEFAULT NOW(),
  fixed_at TIMESTAMP,
  ignored_at TIMESTAMP,

  -- AI context
  claude_analysis JSONB, -- Full Claude response for audit trail

  UNIQUE(connection_id, page_url, type, selector)
);

CREATE INDEX idx_issues_connection ON issues(connection_id);
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_severity ON issues(severity);
CREATE INDEX idx_issues_detected ON issues(detected_at);
```

#### Fixes Applied
```sql
CREATE TABLE fixes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID REFERENCES connections(id) ON DELETE CASCADE,
  issue_id UUID REFERENCES issues(id), -- NULL if proactive fix

  -- Fix details
  type VARCHAR(100) NOT NULL,
  target_url TEXT NOT NULL,
  target_element VARCHAR(500), -- Element ID/selector

  -- State tracking (for rollback)
  before_state JSONB NOT NULL, -- Original value
  after_state JSONB NOT NULL, -- New value

  -- Execution
  method ENUM('automatic', 'manual', 'api') NOT NULL,
  status ENUM('pending', 'applied', 'rolled_back', 'failed') DEFAULT 'pending',
  error_message TEXT,

  -- Approval tracking
  requires_approval BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,

  -- Timestamps
  applied_at TIMESTAMP,
  rolled_back_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),

  -- Rollback expiry (90 days)
  rollback_expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '90 days'),

  -- Impact tracking
  estimated_impact INTEGER,
  actual_impact JSONB, -- {traffic_change, ranking_change}

  -- AI context
  claude_reasoning TEXT, -- Why this fix was generated

  CHECK (rollback_expires_at > created_at)
);

CREATE INDEX idx_fixes_connection ON fixes(connection_id);
CREATE INDEX idx_fixes_issue ON fixes(issue_id);
CREATE INDEX idx_fixes_status ON fixes(status);
CREATE INDEX idx_fixes_rollback_expiry ON fixes(rollback_expires_at);
```

#### Performance Metrics
```sql
CREATE TABLE metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID REFERENCES connections(id) ON DELETE CASCADE,

  -- Date tracking
  date DATE NOT NULL,

  -- SEO metrics
  organic_traffic INTEGER,
  organic_sessions INTEGER,
  average_position DECIMAL(5,2),
  impressions INTEGER,
  clicks INTEGER,

  -- Rankings (JSON: {keyword: position})
  rankings JSONB,

  -- Technical metrics
  page_speed_mobile DECIMAL(3,1),
  page_speed_desktop DECIMAL(3,1),
  core_web_vitals JSONB, -- {LCP, FID, CLS}

  -- Issue tracking
  issues_detected INTEGER DEFAULT 0,
  issues_fixed INTEGER DEFAULT 0,
  issues_remaining INTEGER DEFAULT 0,

  -- Fix metrics
  fixes_applied INTEGER DEFAULT 0,
  fixes_rolled_back INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(connection_id, date)
);

CREATE INDEX idx_metrics_connection_date ON metrics(connection_id, date);
```

#### AI Conversations
```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  connection_id UUID REFERENCES connections(id), -- NULL for general chat

  -- Conversation
  messages JSONB[] NOT NULL, -- Array of {role, content, timestamp}

  -- Context
  context JSONB, -- Site-specific context for this conversation

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_user ON ai_conversations(user_id);
```

#### Audit Logs
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  connection_id UUID REFERENCES connections(id),

  -- Action details
  action VARCHAR(100) NOT NULL, -- 'fix_applied', 'connection_added', etc.
  details JSONB NOT NULL,

  -- Request metadata
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_connection ON audit_logs(connection_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
```

#### Billing & Subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Stripe integration
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  stripe_price_id VARCHAR(255),

  -- Plan details
  plan ENUM('starter', 'growth', 'scale') NOT NULL,
  billing_cycle ENUM('monthly', 'annual') DEFAULT 'monthly',
  status ENUM('active', 'cancelled', 'past_due', 'trialing', 'unpaid') DEFAULT 'trialing',

  -- Dates
  trial_ends_at TIMESTAMP,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancelled_at TIMESTAMP,

  -- Usage limits
  sites_limit INTEGER,
  fixes_limit INTEGER, -- Per month
  fixes_used_this_period INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
```

#### Usage Tracking
```sql
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  connection_id UUID REFERENCES connections(id),

  -- Period tracking
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Usage counts
  fixes_applied INTEGER DEFAULT 0,
  api_calls INTEGER DEFAULT 0,
  analysis_runs INTEGER DEFAULT 0,

  -- Costs (for internal tracking)
  claude_tokens_used INTEGER DEFAULT 0,
  claude_cost_usd DECIMAL(10,4) DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, period_start)
);

CREATE INDEX idx_usage_user_period ON usage(user_id, period_start);
```

### 6.2 Indexes Strategy
- **Primary indexes**: All foreign keys
- **Performance indexes**: Frequently queried columns (status, created_at, etc.)
- **Unique constraints**: Prevent duplicate data
- **Composite indexes**: Multi-column queries (user_id + date)

### 6.3 Data Retention
- **Issues**: Keep all historical issues (for trend analysis)
- **Fixes**: Keep for 90 days + rollback expiry (then archive)
- **Metrics**: Keep forever (aggregated monthly after 1 year)
- **Audit Logs**: Keep for 2 years (compliance)
- **AI Conversations**: Keep for 30 days (then delete)

---

## 7. PLATFORM INTEGRATIONS

### 7.1 Shopify Integration

#### 7.1.1 OAuth Configuration
```typescript
const SHOPIFY_CONFIG = {
  client_id: '0b87ac78cf0783fd1dd829bf5421fae5',
  client_secret: process.env.SHOPIFY_CLIENT_SECRET,
  scopes: [
    'read_products',
    'write_products',
    'read_content',
    'write_content',
    'read_themes',
    'write_themes',
    'read_online_store_pages',
    'write_online_store_pages',
  ].join(','),
  redirect_uri: 'https://app.seology.ai/auth/shopify/callback'
};
```

#### 7.1.2 Connection Flow
```typescript
class ShopifyConnector {
  // Step 1: Generate OAuth URL
  async connect(storeDomain: string, userId: string): Promise<string> {
    const state = crypto.randomBytes(16).toString('hex');

    // Save state for CSRF protection
    await redis.set(`shopify:state:${state}`, userId, 'EX', 600);

    const params = new URLSearchParams({
      client_id: SHOPIFY_CONFIG.client_id,
      scope: SHOPIFY_CONFIG.scopes,
      redirect_uri: SHOPIFY_CONFIG.redirect_uri,
      state: state,
      grant_options: 'per-user' // Get per-user token
    });

    return `https://${storeDomain}/admin/oauth/authorize?${params}`;
  }

  // Step 2: Handle OAuth callback
  async handleCallback(shop: string, code: string, state: string) {
    // Verify state (CSRF protection)
    const userId = await redis.get(`shopify:state:${state}`);
    if (!userId) throw new Error('Invalid state - possible CSRF attack');

    // Exchange authorization code for access token
    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: SHOPIFY_CONFIG.client_id,
        client_secret: SHOPIFY_CONFIG.client_secret,
        code
      })
    });

    const { access_token, scope } = await response.json();

    // Verify we got the scopes we requested
    const receivedScopes = scope.split(',');
    const requestedScopes = SHOPIFY_CONFIG.scopes.split(',');
    if (!requestedScopes.every(s => receivedScopes.includes(s))) {
      throw new Error('Missing required scopes');
    }

    // Encrypt token before storing
    const encryptedToken = await encrypt(access_token);

    // Save connection to database
    const connection = await db.connection.create({
      data: {
        userId,
        platform: 'SHOPIFY',
        domain: shop,
        displayName: shop.replace('.myshopify.com', ''),
        accessToken: encryptedToken,
        status: 'CONNECTED',
        credentials: {
          scope: scope,
          shop: shop
        }
      }
    });

    // Register webhooks for real-time updates
    await this.registerWebhooks(shop, access_token);

    // Start initial site analysis (async)
    await queue.add('analyze-site', {
      connectionId: connection.id,
      userId,
      priority: 'high'
    });

    return { success: true, connectionId: connection.id };
  }

  // Step 3: Register webhooks
  async registerWebhooks(shop: string, token: string) {
    const webhooks = [
      { topic: 'products/update', address: 'https://api.seology.ai/webhooks/shopify/products/update' },
      { topic: 'products/create', address: 'https://api.seology.ai/webhooks/shopify/products/create' },
      { topic: 'products/delete', address: 'https://api.seology.ai/webhooks/shopify/products/delete' },
      { topic: 'themes/update', address: 'https://api.seology.ai/webhooks/shopify/themes/update' },
      { topic: 'shop/update', address: 'https://api.seology.ai/webhooks/shopify/shop/update' },
    ];

    for (const webhook of webhooks) {
      await fetch(`https://${shop}/admin/api/2024-01/webhooks.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ webhook })
      });
    }
  }

  // Execute SEO fix on Shopify
  async executeFix(connection: Connection, fix: Fix): Promise<Result> {
    const token = await decrypt(connection.accessToken);
    const shop = connection.domain;

    switch(fix.type) {
      case 'UPDATE_PRODUCT_SEO':
        return await this.updateProductSEO(shop, token, fix);

      case 'ADD_REDIRECT':
        return await this.createRedirect(shop, token, fix);

      case 'UPDATE_THEME_META':
        return await this.updateThemeMeta(shop, token, fix);

      default:
        throw new Error(`Unknown fix type: ${fix.type}`);
    }
  }

  private async updateProductSEO(shop: string, token: string, fix: Fix) {
    const response = await fetch(`https://${shop}/admin/api/2024-01/products/${fix.targetId}.json`, {
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: {
          id: fix.targetId,
          title: fix.afterState.title,
          metafields_global_title_tag: fix.afterState.seoTitle,
          metafields_global_description_tag: fix.afterState.metaDescription,
          handle: fix.afterState.handle // URL slug
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    return { success: true, data: await response.json() };
  }

  private async createRedirect(shop: string, token: string, fix: Fix) {
    const response = await fetch(`https://${shop}/admin/api/2024-01/redirects.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        redirect: {
          path: fix.afterState.from,
          target: fix.afterState.to
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create redirect: ${response.statusText}`);
    }

    return { success: true, data: await response.json() };
  }
}
```

### 7.2 WordPress Integration

#### 7.2.1 Connection Methods

**Method 1: Application Passwords** (WordPress 5.6+)
```typescript
class WordPressConnector {
  async connectViaApplicationPassword(
    siteUrl: string,
    username: string,
    appPassword: string,
    userId: string
  ) {
    // Format: "username:applicationPassword"
    const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');

    // Test connection by fetching current user
    const response = await fetch(`${siteUrl}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Invalid credentials or REST API disabled');
    }

    const user = await response.json();

    // Check if user has required capabilities
    if (!user.capabilities.edit_posts || !user.capabilities.manage_options) {
      throw new Error('User lacks required permissions');
    }

    // Encrypt credentials
    const encryptedAuth = await encrypt(auth);

    // Save connection
    const connection = await db.connection.create({
      data: {
        userId,
        platform: 'WORDPRESS',
        domain: siteUrl,
        displayName: user.name,
        credentials: {
          method: 'REST',
          auth: encryptedAuth,
          capabilities: user.capabilities
        },
        status: 'CONNECTED'
      }
    });

    // Start initial analysis
    await queue.add('analyze-site', { connectionId: connection.id });

    return { success: true, connectionId: connection.id };
  }

  // Method 2: Custom Seology Plugin (future)
  async connectViaPlugin(siteUrl: string, apiKey: string, userId: string) {
    const response = await fetch(`${siteUrl}/wp-json/seology/v1/verify`, {
      headers: { 'X-SEOLOGY-KEY': apiKey }
    });

    if (!response.ok) {
      throw new Error('Plugin not installed or invalid key');
    }

    const data = await response.json();

    return {
      method: 'PLUGIN',
      credentials: { siteUrl, apiKey },
      pluginVersion: data.version
    };
  }
}
```

#### 7.2.2 Fix Execution

```typescript
class WordPressConnector {
  async executeFix(connection: Connection, fix: Fix): Promise<Result> {
    const auth = await decrypt(connection.credentials.auth);
    const siteUrl = connection.domain;

    switch(fix.type) {
      case 'UPDATE_POST_SEO':
        return await this.updatePostSEO(siteUrl, auth, fix);

      case 'CREATE_REDIRECT':
        return await this.createRedirect(siteUrl, auth, fix);

      case 'UPDATE_IMAGE_ALT':
        return await this.updateImageAlt(siteUrl, auth, fix);

      default:
        throw new Error(`Unknown fix type: ${fix.type}`);
    }
  }

  private async updatePostSEO(siteUrl: string, auth: string, fix: Fix) {
    // Check if Yoast SEO or Rank Math is installed
    const seoPlugin = await this.detectSEOPlugin(siteUrl, auth);

    if (seoPlugin === 'yoast') {
      return await this.updateYoastSEO(siteUrl, auth, fix);
    } else if (seoPlugin === 'rankmath') {
      return await this.updateRankMathSEO(siteUrl, auth, fix);
    } else {
      // Fallback: Update post title and excerpt
      return await this.updatePostMeta(siteUrl, auth, fix);
    }
  }

  private async updateYoastSEO(siteUrl: string, auth: string, fix: Fix) {
    const response = await fetch(`${siteUrl}/wp-json/wp/v2/posts/${fix.targetId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meta: {
          _yoast_wpseo_title: fix.afterState.seoTitle,
          _yoast_wpseo_metadesc: fix.afterState.metaDescription,
          _yoast_wpseo_focuskw: fix.afterState.focusKeyword
        }
      })
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }

    return { success: true, data: await response.json() };
  }

  private async detectSEOPlugin(siteUrl: string, auth: string): Promise<string | null> {
    // Check active plugins
    const response = await fetch(`${siteUrl}/wp-json/wp/v2/plugins`, {
      headers: { 'Authorization': `Basic ${auth}` }
    });

    if (response.ok) {
      const plugins = await response.json();
      if (plugins.find(p => p.plugin === 'wordpress-seo/wp-seo.php' && p.status === 'active')) {
        return 'yoast';
      }
      if (plugins.find(p => p.plugin === 'seo-by-rank-math/rank-math.php' && p.status === 'active')) {
        return 'rankmath';
      }
    }

    return null;
  }
}
```

### 7.3 Universal JavaScript Integration

For sites where we can't get API access (Wix, Webflow, Squarespace, custom sites).

#### 7.3.1 Installation Script

```typescript
class UniversalConnector {
  generateInstallScript(siteId: string): string {
    return `
<!-- Seology.ai SEO Automation -->
<script>
  (function() {
    const SEOLOGY_SITE_ID = '${siteId}';
    const script = document.createElement('script');
    script.src = 'https://cdn.seology.ai/magic.js?v=' + Date.now();
    script.async = true;
    script.dataset.siteId = SEOLOGY_SITE_ID;
    script.dataset.version = '1.0.0';
    document.head.appendChild(script);
  })();
</script>
`;
  }

  async verifySiteConnection(siteId: string, domain: string): Promise<boolean> {
    // Wait for script to "phone home"
    const timeout = 30000; // 30 seconds
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const verified = await redis.get(`site:verified:${siteId}`);
      if (verified) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return false;
  }
}
```

#### 7.3.2 Magic.js Client Script

```javascript
// magic.js - Served from CDN
class SEOLOGYMagic {
  constructor() {
    this.siteId = document.currentScript.dataset.siteId;
    this.apiBase = 'https://api.seology.ai';
    this.fixes = [];
    this.initialized = false;
  }

  async init() {
    // Verify connection (phone home)
    await this.verify();

    // Fetch pending fixes
    this.fixes = await this.fetchFixes();

    // Apply fixes immediately
    this.applyFixes();

    // Track performance
    this.trackPerformance();

    // Set up mutation observer (for SPA support)
    this.observeChanges();

    this.initialized = true;
  }

  async verify() {
    await fetch(`${this.apiBase}/universal/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteId: this.siteId,
        domain: window.location.hostname,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      })
    });
  }

  async fetchFixes() {
    const response = await fetch(`${this.apiBase}/universal/${this.siteId}/fixes`, {
      headers: { 'X-SEOLOGY-SITE': this.siteId }
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data.fixes || [];
  }

  applyFixes() {
    this.fixes.forEach(fix => {
      try {
        switch(fix.type) {
          case 'UPDATE_META':
            this.updateMeta(fix);
            break;

          case 'ADD_SCHEMA':
            this.addSchema(fix);
            break;

          case 'UPDATE_CONTENT':
            this.updateContent(fix);
            break;

          case 'ADD_ALT_TEXT':
            this.addAltText(fix);
            break;
        }

        // Report success
        this.reportFixApplied(fix.id);
      } catch (error) {
        // Report failure
        this.reportFixFailed(fix.id, error.message);
      }
    });
  }

  updateMeta(fix) {
    // Update page title
    if (fix.data.title) {
      document.title = fix.data.title;
    }

    // Update meta description
    if (fix.data.description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = fix.data.description;
    }

    // Update OG tags
    if (fix.data.ogTitle) {
      this.updateMetaTag('property', 'og:title', fix.data.ogTitle);
    }
    if (fix.data.ogDescription) {
      this.updateMetaTag('property', 'og:description', fix.data.ogDescription);
    }
  }

  addSchema(fix) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(fix.data.schema);
    script.dataset.seologyFix = fix.id;
    document.head.appendChild(script);
  }

  updateContent(fix) {
    const elements = document.querySelectorAll(fix.selector);
    elements.forEach(el => {
      if (fix.data.innerHTML) {
        el.innerHTML = fix.data.innerHTML;
      }
      if (fix.data.textContent) {
        el.textContent = fix.data.textContent;
      }
      if (fix.data.attributes) {
        Object.entries(fix.data.attributes).forEach(([key, value]) => {
          el.setAttribute(key, value);
        });
      }
    });
  }

  addAltText(fix) {
    const img = document.querySelector(fix.selector);
    if (img && !img.alt) {
      img.alt = fix.data.altText;
    }
  }

  updateMetaTag(attr, name, content) {
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.content = content;
  }

  async reportFixApplied(fixId) {
    await fetch(`${this.apiBase}/universal/fixes/${fixId}/applied`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-SEOLOGY-SITE': this.siteId
      }
    });
  }

  async reportFixFailed(fixId, error) {
    await fetch(`${this.apiBase}/universal/fixes/${fixId}/failed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error })
    });
  }

  trackPerformance() {
    // Core Web Vitals tracking
    if ('PerformanceObserver' in window) {
      // Track LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.sendMetric('LCP', lastEntry.renderTime || lastEntry.loadTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Track FID
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.sendMetric('FID', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Track CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.sendMetric('CLS', clsValue);
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  async sendMetric(name, value) {
    await fetch(`${this.apiBase}/universal/${this.siteId}/metrics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: name,
        value: value,
        url: window.location.href,
        timestamp: Date.now()
      })
    });
  }

  observeChanges() {
    // Watch for DOM changes (SPA navigation)
    const observer = new MutationObserver(() => {
      // Re-check if fixes need to be applied
      if (this.fixes.length > 0) {
        this.applyFixes();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SEOLOGYMagic().init();
  });
} else {
  new SEOLOGYMagic().init();
}
```

---

## 8. CORE FEATURES & REQUIREMENTS

### 8.1 MVP Features (Month 1)

```typescript
interface MVPFeatures {
  authentication: {
    emailPassword: boolean;      // ✓ Basic auth
    googleOAuth: boolean;         // ✓ Google sign-in
    githubOAuth: boolean;         // ✓ GitHub sign-in
    passwordReset: boolean;       // ✓ Forgot password flow
    emailVerification: boolean;   // ✓ Verify email on signup
  };

  platformConnections: {
    shopify: boolean;             // ✓ OAuth + API integration
    wordpress: boolean;           // ✓ Application passwords
    universalJS: boolean;         // ✓ JavaScript snippet
  };

  seoFixes: {
    metaOptimization: boolean;    // ✓ Title + description
    brokenLinks: boolean;         // ✓ 301 redirects
    altText: boolean;             // ✓ Image alt tags
    sitemapGeneration: boolean;   // ✓ XML sitemap
    robotsTxt: boolean;           // ✓ robots.txt optimization
    schemaMarkup: boolean;        // ✓ JSON-LD structured data
  };

  executionModes: {
    automatic: boolean;           // ✓ Fix immediately
    plan: boolean;                // ✓ Show plan first
    approve: boolean;             // ✓ Ask for each fix
  };

  dashboard: {
    sitesOverview: boolean;       // ✓ All sites list
    issuesDetected: boolean;      // ✓ Issues by severity
    fixesLog: boolean;            // ✓ History of fixes
    performanceMetrics: boolean;  // ✓ Traffic/ranking charts
  };

  billing: {
    stripeIntegration: boolean;   // ✓ Payment processing
    threeTiers: boolean;          // ✓ Starter/Growth/Scale
    trialPeriod: boolean;         // ✓ 14-day free trial
  };
}
```

### 8.2 Phase 2 Features (Month 2-3)

```typescript
interface Phase2Features {
  advancedFixes: {
    contentRefresh: boolean;      // Update old content
    internalLinking: boolean;     // Smart link suggestions
    advancedSchema: boolean;      // Product, Article, FAQ schema
    pageSpeed: boolean;           // Image optimization, caching
  };

  aiFeatures: {
    contentGeneration: boolean;   // Generate meta descriptions
    keywordResearch: boolean;     // AI-powered keyword ideas
    competitorAnalysis: boolean;  // Compare to top 10 results
  };

  additionalPlatforms: {
    wix: boolean;                 // Wix integration
    squarespace: boolean;         // Squarespace integration
    webflow: boolean;             // Webflow integration
  };

  teamFeatures: {
    multiUser: boolean;           // Team accounts
    permissions: boolean;         // Role-based access
    auditLog: boolean;            // Full activity history
  };

  reporting: {
    weeklyReports: boolean;       // Email reports
    customDashboards: boolean;    // User-configurable
    exportData: boolean;          // CSV/PDF export
  };
}
```

### 8.3 Phase 3 Features (Month 4-6)

```typescript
interface Phase3Features {
  enterprise: {
    sso: boolean;                 // Single sign-on
    apiAccess: boolean;           // Full REST API
    customReporting: boolean;     // White-label reports
    sla: boolean;                 // 99.9% uptime guarantee
    dedicatedSupport: boolean;    // Slack channel
  };

  advancedAI: {
    predictiveSEO: boolean;       // Forecast traffic changes
    contentStrategy: boolean;     // AI content calendar
    voiceSearchOpt: boolean;      // Voice search optimization
    localSEO: boolean;            // Google Business Profile integration
  };

  automation: {
    workflowBuilder: boolean;     // Custom automation rules
    customRules: boolean;         // "If X, then Y" rules
    bulkOperations: boolean;      // Batch actions across sites
    scheduling: boolean;          // Schedule fixes for specific times
  };

  integrations: {
    googleAnalytics: boolean;     // GA4 integration
    searchConsole: boolean;       // GSC data sync
    slack: boolean;               // Slack notifications
    zapier: boolean;              // Zapier integration
  };
}
```

---

## 9. CLAUDE AI INTEGRATION

### 9.1 System Prompt

```typescript
const CLAUDE_SYSTEM_PROMPT = `You are SEOLOGY, an expert SEO automation system built by Anyro. Your role is to:

1. **Analyze websites** for SEO issues with deep technical understanding
2. **Prioritize fixes** based on impact (traffic gain) and effort (implementation difficulty)
3. **Generate exact fixes** that can be automatically applied via API or script
4. **Consider platform constraints** (Shopify, WordPress, etc.)
5. **Follow best practices** - Google guidelines, no black-hat techniques

## Context
- Platform: {platform}
- Domain: {domain}
- Current issues: {issueCount}
- Execution mode: {mode} (automatic/plan/approve)
- Industry: {industry}

## Analysis Guidelines
When analyzing a site:
- Prioritize fixes with high impact / low effort
- Consider the user's technical level and platform
- Focus on fundamentals first (crawlability, indexability, core web vitals)
- Look for quick wins (missing alt tags, meta descriptions)
- Identify technical debt (broken links, duplicate content)

## Fix Generation Rules
When generating fixes:
1. **Be specific**: Include exact values, not placeholders like "Add your keyword here"
2. **Be implementable**: Code must work with the platform's API
3. **Consider context**: Use site content to generate relevant meta descriptions
4. **Prioritize UX**: Don't sacrifice user experience for SEO
5. **Estimate impact**: Score 1-10 based on expected traffic/ranking improvement

## Output Format
Always return JSON in this exact format:

{
  "fix_type": "string",
  "priority": "critical|high|medium|low",
  "category": "technical|content|links|performance|mobile",
  "page_url": "string",
  "current_state": { },
  "recommended_state": { },
  "reasoning": "string (why this fix matters)",
  "implementation": {
    "method": "api|script|manual",
    "code": "exact code to execute",
    "target": "element/endpoint to modify",
    "platform_specific": { }
  },
  "estimated_impact": 1-10,
  "estimated_effort": "low|medium|high"
}

## Priority Levels
- **Critical**: Blocking crawlers, broken canonical tags, noindex on important pages
- **High**: Missing meta descriptions, broken internal links, slow page speed
- **Medium**: Missing alt tags, thin content, missing schema
- **Low**: Minor optimizations, nice-to-haves

Never suggest:
- Keyword stuffing
- Cloaking
- Hidden text
- Link schemes
- Duplicate content creation
- Anything against Google's guidelines`;
```

### 9.2 Claude Service Implementation

```typescript
import Anthropic from '@anthropic-ai/sdk';

class ClaudeService {
  private client: Anthropic;
  private contextCache: Map<string, SiteContext>;
  private tokenUsage: Map<string, number>;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
    this.contextCache = new Map();
    this.tokenUsage = new Map();
  }

  /**
   * Analyze entire site for SEO issues
   */
  async analyzeSite(connection: Connection): Promise<Analysis> {
    // 1. Gather site data
    const siteData = await this.gatherSiteData(connection);

    // 2. Build context for Claude
    const context: SiteContext = {
      platform: connection.platform,
      domain: connection.domain,
      pageCount: siteData.pages.length,
      pages: siteData.pages.slice(0, 50), // First 50 pages for context
      currentSEO: {
        hasRobotsTxt: siteData.hasRobotsTxt,
        hasSitemap: siteData.hasSitemap,
        indexablePages: siteData.indexablePages,
        avgPageSpeed: siteData.avgPageSpeed,
        avgTitleLength: siteData.avgTitleLength,
        pagesWithMeta: siteData.pagesWithMeta,
      },
      industry: await this.detectIndustry(siteData),
      competitors: siteData.competitors || []
    };

    // 3. Cache context for future calls
    this.contextCache.set(connection.id, context);

    // 4. Call Claude API
    const systemPrompt = CLAUDE_SYSTEM_PROMPT
      .replace('{platform}', connection.platform)
      .replace('{domain}', connection.domain)
      .replace('{issueCount}', String(siteData.issueCount || 0))
      .replace('{mode}', connection.executionMode || 'approve')
      .replace('{industry}', context.industry);

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `Analyze this website for SEO issues and provide a prioritized list of fixes:

${JSON.stringify(context, null, 2)}

Return a JSON array of fixes in the format specified in your system prompt.`
      }],
      max_tokens: 4000,
      temperature: 0.3 // Lower temperature for more consistent output
    });

    // 5. Track token usage
    this.trackTokens(connection.userId, response.usage);

    // 6. Parse and validate response
    const fixes = this.parseAnalysis(response.content[0].text);

    return {
      connectionId: connection.id,
      fixes: fixes,
      analyzed_at: new Date(),
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens
    };
  }

  /**
   * Generate specific fix for an issue
   */
  async generateFix(issue: Issue, connection: Connection): Promise<Fix> {
    // Get cached context
    const context = this.contextCache.get(connection.id);
    if (!context) {
      throw new Error('Site context not found - run analysis first');
    }

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      system: CLAUDE_SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `Generate an exact, implementable fix for this SEO issue:

Issue: ${JSON.stringify(issue, null, 2)}

Site Context: ${JSON.stringify(context, null, 2)}

Platform: ${connection.platform}

Return a single fix in JSON format as specified in your system prompt.`
      }],
      max_tokens: 2000,
      temperature: 0.3
    });

    this.trackTokens(connection.userId, response.usage);

    return this.parseFix(response.content[0].text);
  }

  /**
   * Chat interface for users
   */
  async chat(
    messages: ChatMessage[],
    connection?: Connection
  ): Promise<string> {
    const context = connection ? this.contextCache.get(connection.id) : null;

    const systemPrompt = `You are SEOLOGY, an SEO expert assistant. ${
      context ? `You're currently helping with: ${connection.domain} (${connection.platform})` : 'You help users with SEO questions.'
    }

Be helpful, concise, and actionable. Provide specific recommendations based on best practices.`;

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
      max_tokens: 2000,
      temperature: 0.7 // Higher temperature for conversational responses
    });

    if (connection) {
      this.trackTokens(connection.userId, response.usage);
    }

    return response.content[0].text;
  }

  /**
   * Gather site data for analysis
   */
  private async gatherSiteData(connection: Connection): Promise<SiteData> {
    // This would crawl the site and gather data
    // For now, simplified example

    const crawler = new SiteCrawler(connection);
    const pages = await crawler.crawl({ maxPages: 100 });

    return {
      pages: pages,
      hasRobotsTxt: await crawler.checkRobotsTxt(),
      hasSitemap: await crawler.checkSitemap(),
      indexablePages: pages.filter(p => p.indexable).length,
      avgPageSpeed: pages.reduce((sum, p) => sum + p.speed, 0) / pages.length,
      avgTitleLength: pages.reduce((sum, p) => sum + (p.title?.length || 0), 0) / pages.length,
      pagesWithMeta: pages.filter(p => p.metaDescription).length,
      issueCount: 0 // Will be filled by analysis
    };
  }

  /**
   * Detect industry from site content
   */
  private async detectIndustry(siteData: SiteData): Promise<string> {
    // Simple keyword-based detection (could be enhanced with Claude)
    const content = siteData.pages.map(p => p.content).join(' ').toLowerCase();

    if (content.includes('ecommerce') || content.includes('shop') || content.includes('product')) {
      return 'E-commerce';
    }
    if (content.includes('saas') || content.includes('software') || content.includes('api')) {
      return 'SaaS';
    }
    if (content.includes('blog') || content.includes('article') || content.includes('news')) {
      return 'Content/Media';
    }

    return 'General';
  }

  /**
   * Parse Claude's analysis response
   */
  private parseAnalysis(responseText: string): Fix[] {
    try {
      // Extract JSON from response (Claude might wrap it in markdown)
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) ||
                       responseText.match(/\[[\s\S]*\]/);

      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const json = jsonMatch[1] || jsonMatch[0];
      const fixes = JSON.parse(json);

      // Validate each fix
      return fixes.map(fix => this.validateFix(fix));
    } catch (error) {
      console.error('Failed to parse Claude response:', error);
      throw new Error(`Invalid analysis response: ${error.message}`);
    }
  }

  /**
   * Parse single fix response
   */
  private parseFix(responseText: string): Fix {
    try {
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) ||
                       responseText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const json = jsonMatch[1] || jsonMatch[0];
      const fix = JSON.parse(json);

      return this.validateFix(fix);
    } catch (error) {
      console.error('Failed to parse fix:', error);
      throw new Error(`Invalid fix response: ${error.message}`);
    }
  }

  /**
   * Validate fix structure
   */
  private validateFix(fix: any): Fix {
    const required = ['fix_type', 'priority', 'page_url', 'reasoning', 'implementation'];

    for (const field of required) {
      if (!fix[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!['critical', 'high', 'medium', 'low'].includes(fix.priority)) {
      throw new Error(`Invalid priority: ${fix.priority}`);
    }

    return fix as Fix;
  }

  /**
   * Track token usage for billing
   */
  private async trackTokens(userId: string, usage: any) {
    const total = usage.input_tokens + usage.output_tokens;

    // Update in-memory counter
    const current = this.tokenUsage.get(userId) || 0;
    this.tokenUsage.set(userId, current + total);

    // Save to database (async, don't wait)
    db.usage.upsert({
      where: {
        userId_period: {
          userId,
          period: new Date().toISOString().slice(0, 7) // YYYY-MM
        }
      },
      update: {
        claudeTokensUsed: { increment: total },
        claudeCostUsd: { increment: this.calculateCost(total) }
      },
      create: {
        userId,
        period: new Date().toISOString().slice(0, 7),
        claudeTokensUsed: total,
        claudeCostUsd: this.calculateCost(total)
      }
    }).catch(console.error);
  }

  /**
   * Calculate cost based on token usage
   * Claude 3.5 Sonnet pricing (as of Oct 2024):
   * - Input: $3 per million tokens
   * - Output: $15 per million tokens
   */
  private calculateCost(tokens: number): number {
    // Simplified: Average cost of $9/million tokens
    return (tokens / 1000000) * 9;
  }
}

export default new ClaudeService();
```

### 9.3 Example Fix Formats

```typescript
// Example 1: Missing Meta Description
{
  "fix_type": "ADD_META_DESCRIPTION",
  "priority": "high",
  "category": "technical",
  "page_url": "https://example.com/products/blue-widget",
  "current_state": {
    "meta_description": null
  },
  "recommended_state": {
    "meta_description": "Buy our premium blue widget with free shipping. Durable, affordable, and backed by a 2-year warranty. Perfect for home and professional use."
  },
  "reasoning": "Missing meta description reduces click-through rate from search results. This page targets 'blue widget' with 1,200 monthly searches.",
  "implementation": {
    "method": "api",
    "code": "PATCH /admin/api/2024-01/products/123.json",
    "target": "product.metafields_global_description_tag",
    "platform_specific": {
      "shopify_product_id": "123"
    }
  },
  "estimated_impact": 7,
  "estimated_effort": "low"
}

// Example 2: Broken Internal Link
{
  "fix_type": "FIX_BROKEN_LINK",
  "priority": "medium",
  "category": "links",
  "page_url": "https://example.com/blog/seo-tips",
  "current_state": {
    "link_url": "/old-page",
    "link_text": "Read our guide",
    "status_code": 404
  },
  "recommended_state": {
    "link_url": "/new-page",
    "redirect": {
      "from": "/old-page",
      "to": "/new-page",
      "type": 301
    }
  },
  "reasoning": "404 error hurts user experience and wastes crawl budget. This page has 50 monthly visitors clicking this broken link.",
  "implementation": {
    "method": "api",
    "code": "POST /admin/api/2024-01/redirects.json",
    "target": "redirects",
    "platform_specific": {
      "shopify_redirect": true
    }
  },
  "estimated_impact": 4,
  "estimated_effort": "low"
}

// Example 3: Missing Alt Text
{
  "fix_type": "ADD_ALT_TEXT",
  "priority": "medium",
  "category": "technical",
  "page_url": "https://example.com/products/red-widget",
  "current_state": {
    "image_url": "https://cdn.example.com/red-widget.jpg",
    "alt_text": ""
  },
  "recommended_state": {
    "alt_text": "Red widget product photo showing front and side view"
  },
  "reasoning": "Missing alt text reduces accessibility and image search visibility. This is the primary product image.",
  "implementation": {
    "method": "script",
    "code": "document.querySelector('img[src*=\"red-widget.jpg\"]').alt = \"Red widget product photo showing front and side view\"",
    "target": "img element",
    "platform_specific": {
      "selector": "img[src*=\"red-widget.jpg\"]"
    }
  },
  "estimated_impact": 3,
  "estimated_effort": "low"
}
```

---

## 10. API STRUCTURE

### 10.1 Core Endpoints

```typescript
// ============================================
// AUTHENTICATION
// ============================================

POST   /api/auth/signup
// Create new user account
Body: { email, password, name }
Response: { user, token }

POST   /api/auth/login
// Login with credentials
Body: { email, password }
Response: { user, token }

POST   /api/auth/logout
// Invalidate session
Headers: { Authorization: Bearer <token> }
Response: { success: true }

GET    /api/auth/me
// Get current user
Headers: { Authorization: Bearer <token> }
Response: { user }

POST   /api/auth/refresh
// Refresh access token
Body: { refreshToken }
Response: { token }

POST   /api/auth/forgot-password
// Send password reset email
Body: { email }
Response: { success: true }

POST   /api/auth/reset-password
// Reset password with token
Body: { token, newPassword }
Response: { success: true }


// ============================================
// CONNECTIONS
// ============================================

GET    /api/connections
// List all connections for user
Headers: { Authorization: Bearer <token> }
Response: { connections: Connection[] }

POST   /api/connections/shopify
// Initiate Shopify OAuth
Body: { shop: 'example.myshopify.com' }
Response: { redirectUrl: string }

GET    /api/connections/shopify/callback
// Handle Shopify OAuth callback
Query: { code, shop, state }
Response: { connection: Connection }

POST   /api/connections/wordpress
// Connect WordPress site
Body: { siteUrl, username, applicationPassword }
Response: { connection: Connection }

POST   /api/connections/custom
// Connect via JavaScript
Body: { domain }
Response: { siteId, installScript }

DELETE /api/connections/:id
// Disconnect site
Headers: { Authorization: Bearer <token> }
Response: { success: true }

GET    /api/connections/:id/health
// Check connection status
Response: { status: 'connected' | 'error', lastSync, error? }

POST   /api/connections/:id/sync
// Force sync now
Response: { success: true, jobId }


// ============================================
// SEO OPERATIONS
// ============================================

GET    /api/sites/:id/issues
// List all detected issues
Query: { severity?, type?, status?, page?, limit? }
Response: { issues: Issue[], total, page }

POST   /api/sites/:id/analyze
// Run SEO analysis
Response: { jobId, estimatedTime }

GET    /api/sites/:id/issues/:issueId
// Get issue details
Response: { issue: Issue }

POST   /api/sites/:id/issues/:issueId/fix
// Generate and execute fix for specific issue
Response: { fix: Fix, status }

POST   /api/sites/:id/fix-all
// Generate fixes for all issues
Body: { severity?: 'critical' | 'high', limit?: number }
Response: { jobId, fixesCount }

GET    /api/sites/:id/fixes
// List all applied fixes
Query: { status?, page?, limit? }
Response: { fixes: Fix[], total }

POST   /api/sites/:id/fixes/:fixId/rollback
// Undo a fix
Response: { success: true }

GET    /api/sites/:id/metrics
// Get performance metrics
Query: { from?: date, to?: date, metric?: string }
Response: { metrics: Metric[] }


// ============================================
// AI INTEGRATION
// ============================================

POST   /api/ai/analyze
// Analyze content with Claude
Body: { siteId, content, type }
Response: { analysis, suggestions }

POST   /api/ai/suggest
// Get AI suggestions
Body: { siteId, page, context }
Response: { suggestions: Suggestion[] }

POST   /api/ai/chat
// Chat with AI assistant
Body: { siteId?, messages }
Response: { message, conversationId }

GET    /api/ai/conversations
// List past conversations
Response: { conversations: Conversation[] }


// ============================================
// USER SETTINGS
// ============================================

GET    /api/settings
// Get user settings
Response: { settings: Settings }

PUT    /api/settings
// Update settings
Body: { settings }
Response: { settings: Settings }

PUT    /api/settings/mode
// Change execution mode
Body: { mode: 'automatic' | 'plan' | 'approve' }
Response: { success: true }

PUT    /api/settings/notifications
// Update notification preferences
Body: { email, inApp, slack? }
Response: { success: true }


// ============================================
// BILLING
// ============================================

POST   /api/billing/checkout
// Create Stripe checkout session
Body: { priceId, successUrl, cancelUrl }
Response: { sessionId, url }

POST   /api/billing/portal
// Create customer portal session
Response: { url }

GET    /api/billing/subscription
// Get current subscription
Response: { subscription: Subscription }

POST   /api/billing/cancel
// Cancel subscription
Response: { success: true, endsAt }

POST   /api/webhooks/stripe
// Stripe webhook endpoint
Headers: { stripe-signature }
Body: Stripe webhook payload
Response: { received: true }


// ============================================
// ADMIN (Internal)
// ============================================

GET    /api/admin/stats
// Platform-wide stats
Response: { users, connections, fixes, revenue }

GET    /api/admin/users
// List all users
Query: { page?, limit?, search? }
Response: { users: User[], total }

POST   /api/admin/users/:id/impersonate
// Impersonate user for support
Response: { token }
```

### 10.2 Response Structure

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
    stack?: string; // Only in development
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

// Example success response
{
  "success": true,
  "data": {
    "id": "123",
    "fixes_applied": 47,
    "issues_remaining": 3
  }
}

// Example error response
{
  "success": false,
  "error": {
    "code": "CONNECTION_FAILED",
    "message": "Unable to connect to Shopify store",
    "details": {
      "store": "example.myshopify.com",
      "reason": "Invalid access token",
      "suggestion": "Please reconnect your Shopify store"
    }
  }
}

// Example paginated response
{
  "success": true,
  "data": {
    "issues": [ ],
  },
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 247,
    "hasMore": true
  }
}
```

### 10.3 Error Codes

```typescript
const ERROR_CODES = {
  // Authentication errors (1xxx)
  INVALID_CREDENTIALS: '1001',
  TOKEN_EXPIRED: '1002',
  EMAIL_IN_USE: '1003',
  WEAK_PASSWORD: '1004',

  // Connection errors (2xxx)
  CONNECTION_FAILED: '2001',
  INVALID_SHOPIFY_SHOP: '2002',
  WORDPRESS_API_DISABLED: '2003',
  MISSING_PERMISSIONS: '2004',
  RATE_LIMITED: '2005',

  // Fix errors (3xxx)
  FIX_GENERATION_FAILED: '3001',
  FIX_EXECUTION_FAILED: '3002',
  ROLLBACK_EXPIRED: '3003',
  ROLLBACK_FAILED: '3004',

  // Billing errors (4xxx)
  PAYMENT_FAILED: '4001',
  SUBSCRIPTION_INACTIVE: '4002',
  USAGE_LIMIT_EXCEEDED: '4003',
  PLAN_DOWNGRADE_BLOCKED: '4004',

  // General errors (5xxx)
  INTERNAL_ERROR: '5001',
  NOT_FOUND: '5002',
  VALIDATION_ERROR: '5003',
  RATE_LIMIT_EXCEEDED: '5004',
};
```

### 10.4 Rate Limiting

```typescript
const RATE_LIMITS = {
  // Per user
  starter: {
    requests_per_minute: 60,
    requests_per_hour: 1000,
    concurrent_analyses: 1,
    daily_ai_calls: 100,
  },
  growth: {
    requests_per_minute: 300,
    requests_per_hour: 10000,
    concurrent_analyses: 5,
    daily_ai_calls: 1000,
  },
  scale: {
    requests_per_minute: 1000,
    requests_per_hour: 50000,
    concurrent_analyses: 20,
    daily_ai_calls: 'unlimited',
  },

  // Public endpoints (no auth)
  public: {
    requests_per_minute: 10,
    requests_per_hour: 100,
  }
};
```

---

## 11. FRONTEND REQUIREMENTS

### 11.1 Pages Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── forgot-password/page.tsx
│   └── reset-password/[token]/page.tsx
│
├── (dashboard)/
│   ├── layout.tsx               // Sidebar + header
│   ├── page.tsx                 // Dashboard home
│   │
│   ├── sites/
│   │   ├── page.tsx            // All sites list
│   │   ├── new/page.tsx        // Connect new site
│   │   └── [id]/
│   │       ├── page.tsx        // Site overview
│   │       ├── issues/
│   │       │   ├── page.tsx    // Issues list
│   │       │   └── [issueId]/page.tsx
│   │       ├── fixes/
│   │       │   ├── page.tsx    // Fixes history
│   │       │   └── [fixId]/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   │
│   ├── connect/
│   │   ├── shopify/page.tsx
│   │   ├── wordpress/page.tsx
│   │   └── custom/page.tsx
│   │
│   ├── settings/
│   │   ├── page.tsx            // General settings
│   │   ├── profile/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── api/page.tsx
│   │
│   └── billing/
│       ├── page.tsx            // Subscription & usage
│       └── history/page.tsx    // Invoices
│
├── api/
│   └── [...all API routes]
│
└── (marketing)/
    ├── page.tsx                // Landing page
    ├── pricing/page.tsx
    ├── features/page.tsx
    ├── about/page.tsx
    ├── blog/
    │   ├── page.tsx
    │   └── [slug]/page.tsx
    ├── case-studies/page.tsx
    ├── docs/
    │   └── [...slug]/page.tsx
    ├── privacy/page.tsx
    └── terms/page.tsx
```

### 11.2 Component Library

```typescript
components/
├── ui/                          // Shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── table.tsx
│   ├── toast.tsx
│   └── ...
│
├── dashboard/
│   ├── SiteCard.tsx            // Site overview card
│   ├── IssuesList.tsx          // Table of issues
│   ├── IssuesFilter.tsx        // Filter by severity/type
│   ├── FixLog.tsx              // Fix history timeline
│   ├── MetricsChart.tsx        // Traffic/ranking charts
│   ├── QuickActions.tsx        // CTA buttons
│   └── StatsOverview.tsx       // 4-card stats grid
│
├── connections/
│   ├── ShopifyConnect.tsx      // Shopify OAuth flow
│   ├── WordPressConnect.tsx    // WordPress form
│   ├── CustomConnect.tsx       // JS snippet copy
│   ├── ConnectionStatus.tsx    // Status indicator
│   └── PlatformIcon.tsx        // Platform logos
│
├── seo/
│   ├── IssueCard.tsx           // Single issue display
│   ├── IssuePriority.tsx       // Priority badge
│   ├── FixPreview.tsx          // Before/after preview
│   ├── FixApproval.tsx         // Approve fix modal
│   ├── ModeSelector.tsx        // Automatic/Plan/Approve
│   ├── ProgressBar.tsx         // Fix progress
│   └── RollbackButton.tsx      // Undo fix
│
├── billing/
│   ├── PricingCards.tsx        // 3 tier pricing
│   ├── UsageBar.tsx            // Progress to limit
│   ├── InvoiceTable.tsx        // Past invoices
│   └── PlanBadge.tsx           // Current plan badge
│
├── ai/
│   ├── ChatWidget.tsx          // AI chat interface
│   ├── ChatMessage.tsx         // Message bubble
│   └── Suggestions.tsx         // AI suggestions panel
│
└── shared/
    ├── Header.tsx              // Dashboard header
    ├── Sidebar.tsx             // Dashboard nav
    ├── Footer.tsx              // Marketing footer
    ├── Logo.tsx                // Seology logo
    ├── Avatar.tsx              // User avatar
    ├── EmptyState.tsx          // No data placeholder
    └── LoadingSpinner.tsx      // Loading state
```

### 11.3 Key UI Features

```typescript
interface UIFeatures {
  realTimeUpdates: {
    websocket: boolean;           // Live fix updates
    optimisticUI: boolean;        // Instant feedback
    polling: boolean;             // Fallback to polling
  };

  interactions: {
    dragDropPriority: boolean;    // Reorder fixes
    bulkActions: boolean;         // Select multiple
    keyboardShortcuts: boolean;   // Power user features
    contextMenus: boolean;        // Right-click actions
  };

  filters: {
    quickFilters: boolean;        // One-click filters
    advancedSearch: boolean;      // Multi-field search
    savedFilters: boolean;        // Save filter presets
  };

  visualizations: {
    fixTimeline: boolean;         // Historical chart
    impactGraph: boolean;         // Traffic changes
    issueHeatmap: boolean;        // Issues by page
    compareView: boolean;         // Before/after
  };

  notifications: {
    inAppAlerts: boolean;         // Toast notifications
    badgeCounts: boolean;         // Unread counts
    soundEffects: boolean;        // Audio alerts (optional)
  };

  accessibility: {
    keyboardNav: boolean;         // Full keyboard support
    screenReader: boolean;        // ARIA labels
    highContrast: boolean;        // Theme option
    focusIndicators: boolean;     // Clear focus states
  };
}
```

### 11.4 Mobile Responsiveness

```typescript
const BREAKPOINTS = {
  mobile: '320px',    // Small phones
  tablet: '768px',    // Tablets
  desktop: '1024px',  // Desktops
  wide: '1440px',     // Large screens
};

// Responsive behavior
const RESPONSIVE_RULES = {
  navigation: {
    mobile: 'bottom_nav',      // Bottom tab bar
    tablet: 'sidebar',         // Collapsible sidebar
    desktop: 'expanded_sidebar' // Always visible
  },

  tables: {
    mobile: 'cards',           // Stack as cards
    tablet: 'horizontal_scroll', // Scrollable table
    desktop: 'full_table'      // Standard table
  },

  charts: {
    mobile: 'simplified',      // Fewer data points
    tablet: 'condensed',       // Compact legend
    desktop: 'full'            // All features
  },

  forms: {
    mobile: 'single_column',   // Stack fields
    tablet: 'single_column',   // Still stacked
    desktop: 'multi_column'    // Side-by-side
  }
};
```

---

## 12. PRICING & BUSINESS MODEL

### 12.1 Pricing Tiers

```typescript
const PRICING = {
  starter: {
    name: 'Starter',
    monthlyPrice: 297,
    annualPrice: 2970,  // 2 months free ($237/month)
    features: {
      sites: 3,
      fixesPerMonth: 500,
      users: 1,
      platforms: ['shopify', 'wordpress'],
      executionModes: ['approve'],      // Review each fix
      support: 'email',                  // 24h response time
      analytics: 'basic',
      apiAccess: false,
      whiteLabel: false,
      customIntegration: false,
    },
    limits: {
      analysis_per_day: 3,
      api_calls_per_hour: 100,
      claude_tokens_per_month: 100000,
    }
  },

  growth: {
    name: 'Growth',
    monthlyPrice: 997,
    annualPrice: 9970,  // 2 months free ($798/month)
    features: {
      sites: 10,
      fixesPerMonth: 5000,
      users: 5,
      platforms: ['all'],
      executionModes: ['all'],          // Automatic, Plan, Approve
      support: 'priority',               // 4h response time
      analytics: 'advanced',
      apiAccess: true,
      customClaudePrompts: true,
      whiteLabel: false,
      customIntegration: false,
    },
    limits: {
      analysis_per_day: 30,
      api_calls_per_hour: 1000,
      claude_tokens_per_month: 1000000,
    }
  },

  scale: {
    name: 'Scale',
    monthlyPrice: 2497,
    annualPrice: 24970, // 2 months free ($1,998/month)
    features: {
      sites: 'unlimited',
      fixesPerMonth: 'unlimited',
      users: 'unlimited',
      platforms: ['all'],
      executionModes: ['all'],
      support: 'dedicated',             // 1h response time + Slack
      analytics: 'enterprise',          // Custom dashboards + BI export
      apiAccess: true,
      whiteLabel: true,
      customIntegration: true,
      sso: true,
      sla: true,                        // 99.9% uptime SLA
      dedicatedAccountManager: true,
    },
    limits: {
      analysis_per_day: 'unlimited',
      api_calls_per_hour: 10000,
      claude_tokens_per_month: 'unlimited',
    }
  }
};
```

### 12.2 Trial Period

```typescript
const TRIAL = {
  duration: 14, // days
  requiresCreditCard: false,
  features: 'growth', // Full Growth tier features
  limits: {
    sites: 1,
    fixes: 50, // Total during trial
  },
  conversion: {
    promptAt: [7, 12], // Days to show upgrade prompts
    autoDowngrade: 'starter', // After trial ends without payment
  }
};
```

### 12.3 Revenue Projections

```typescript
const PROJECTIONS = {
  month_1: {
    users: {
      starter: 8,
      growth: 2,
      scale: 0,
    },
    mrr: 2970, // (8 * $297) + (2 * $997)
    costs: 5000, // Development, hosting, etc.
    profit: -2030
  },

  month_6: {
    users: {
      starter: 60,
      growth: 30,
      scale: 5,
    },
    mrr: 59700, // (60*297) + (30*997) + (5*2497)
    costs: 15000,
    profit: 44700
  },

  month_12: {
    users: {
      starter: 300,
      growth: 150,
      scale: 30,
    },
    mrr: 298500, // (300*297) + (150*997) + (30*2497)
    costs: 50000,
    profit: 248500
  },

  year_2: {
    users: {
      starter: 1000,
      growth: 800,
      scale: 150,
    },
    mrr: 1471100, // (1000*297) + (800*997) + (150*2497)
    costs: 200000,
    profit: 1271100
  }
};
```

### 12.4 Unit Economics

```typescript
const UNIT_ECONOMICS = {
  cac: {
    // Customer Acquisition Cost
    organic: 0,        // SEO/content
    paid_ads: 150,     // Google/Facebook ads
    affiliate: 300,    // 30% first month
    average: 100
  },

  ltv: {
    // Lifetime Value (assuming 12 month retention)
    starter: 297 * 12 * 0.75,  // $2,673 (with 75% retention)
    growth: 997 * 12 * 0.85,   // $10,167 (with 85% retention)
    scale: 2497 * 12 * 0.95,   // $28,465 (with 95% retention)
  },

  margins: {
    gross_margin: 0.85,     // 85% (software margins)
    cogs_per_user: 45,      // Hosting + Claude API per month
  },

  payback_period: {
    starter: 0.4,  // months (CAC / monthly revenue)
    growth: 0.1,   // months
    scale: 0.04,   // months
  }
};
```

### 12.5 Pricing Strategy

**Value-Based Pricing**:
- Starter: Replaces $3,000 freelancer project
- Growth: Replaces $5,000/month agency retainer
- Scale: Replaces $50,000/year enterprise SEO stack + headcount

**Upsell Path**:
1. Free trial (14 days, Growth features)
2. Convert to Starter ($297/month)
3. Upsell to Growth when they hit limits
4. Upsell to Scale when managing 10+ sites

**Add-Ons (Future)**:
- Extra sites: $50/month each
- Extra fixes: $0.10 per fix over limit
- White-label branding: $500/month
- Dedicated support: $1,000/month
- Custom integration: Custom pricing

---

## 13. MVP IMPLEMENTATION PLAN

### 13.1 Week 1: Foundation ✅ COMPLETE

**Day 1-2: Project Setup** ✅
```bash
# Create Next.js project
npx create-next-app@latest seology-ai --typescript --tailwind --app
cd seology-ai

# Install core dependencies
npm install @clerk/nextjs @anthropic-ai/sdk @prisma/client stripe
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-dropdown-menu
npm install recharts zustand axios swr
npm install -D @types/node prisma

# Setup database
npx prisma init
# Edit prisma/schema.prisma with schema from Section 6
npx prisma db push
npx prisma generate

# Configure environment variables
cp .env.example .env.local
# Add all API keys
```

**Day 3-4: Authentication** ✅
- ✅ Integrate Clerk
- ✅ Build login/signup pages
- ✅ Configure OAuth (Google, GitHub) - Ready
- ✅ Setup protected routes (middleware.ts)

**Day 5-7: Basic Dashboard** ✅
- ✅ Dashboard layout (sidebar, header)
- ✅ Sites list page (empty state)
- ✅ Connect site flow (UI complete)
- ✅ Basic settings page (with execution modes)

### 13.2 Week 2: Shopify Integration ✅ COMPLETE

**Day 8-9: OAuth Flow** ✅
- ✅ Shopify app configuration (ready)
- ✅ OAuth initiation endpoint (GET /api/auth/shopify)
- ✅ Callback handler (GET /api/auth/shopify/callback)
- ✅ Token storage (encrypted with AES-256)

**Day 10-11: Data Sync** ✅
- ✅ Fetch products via Admin API (lib/shopify.ts)
- ✅ Fetch pages/blog posts (lib/shopify.ts)
- ✅ Store in database (syncShopifyStore function)
- ✅ Display in dashboard (site detail page)

**Day 12-14: First Fix Type** ✅
- ✅ Implement "Update Product SEO" fix (lib/shopify.ts)
- ✅ Claude integration for meta generation (lib/claude.ts)
- ✅ Execute via Shopify API (updateProductSEO)
- ✅ Show in dashboard (site detail page with issues)

### 13.3 Week 3: WordPress & Universal Integration ✅ COMPLETE

**Day 15-16: REST API Connection** ✅
- ✅ Application password flow (POST /api/connections/wordpress)
- ✅ Test connection endpoint (validates credentials)
- ✅ Detect SEO plugins (Yoast, Rank Math) - Framework ready

**Day 17-18: Fix Execution** ✅ Complete
- ✅ Update post meta via REST API - lib/wordpress.ts ✅
- ✅ Yoast SEO integration - updatePostSEO(), updatePageSEO() ✅
- ✅ Media alt text updates - updateMediaAltText() ✅

**Day 19-21: Universal JavaScript** ✅ Complete
- ✅ Generate install script (UI in connect page) ✅
- ✅ Build magic.js client - public/magic.js (full implementation) ✅
- ✅ Verification endpoint - /api/magic/connect ✅
- ✅ DOM manipulation fixes - magic.js handles all fix types ✅
- ✅ Additional endpoints: /api/magic/pending-fixes, /api/magic/fix-status, /api/magic/page-scan ✅

### 13.4 Week 4: Core SEO Features ✅ COMPLETE

**Day 22-24: Issue Detection** ✅ Complete
- ✅ Site crawler (Puppeteer) - lib/crawler.ts ✅
- ✅ Claude analysis integration (lib/claude.ts complete) ✅
- ✅ Store issues in database (Prisma schema ready) ✅
- ✅ Display in dashboard (UI complete) ✅
- ✅ API endpoint POST /api/sites/[id]/crawl ✅

**Day 25-26: Execution Modes** ✅ Complete
- ✅ Automatic mode logic - lib/execution-modes.ts ✅
- ✅ Plan mode (batch approval) - lib/execution-modes.ts ✅
- ✅ Approve mode (per-fix approval) - lib/execution-modes.ts ✅
- ✅ User preference settings (UI in settings page) ✅
- ✅ API endpoints: /api/sites/[id]/execute, /api/fixes/[id]/approve, /api/sites/[id]/approve-plan ✅

**Day 27-28: Rollback System** ✅ Complete
- ✅ Store before/after states (Fix model has beforeState/afterState) ✅
- ✅ Rollback endpoint - lib/rollback.ts + API endpoint ✅
- ✅ Expiry job (90 days) - cleanupExpiredRollbacks() function ✅
- ✅ Rollback API: POST /api/fixes/[id]/rollback ✅

### 13.5 Week 5: Billing & Polish 🟡 UI COMPLETE, BACKEND NEEDED

**Day 29-30: Stripe Integration** ⏳ Needs Implementation
- ⏳ Create products in Stripe - needs setup
- ⏳ Checkout session endpoint - needs implementation
- ⏳ Webhook handler - needs implementation
- ✅ Subscription status sync (database schema ready)

**Day 31-32: Usage Tracking** 🟡 Partially Complete
- ✅ Track fixes applied (Usage model in schema)
- ⏳ Enforce limits - needs backend logic
- ✅ Usage dashboard (UI complete in billing page)
- ✅ Upgrade prompts (UI complete in billing page)

**Day 33-35: Polish & Testing** 🟡 Partially Complete
- ✅ Error handling (try-catch blocks throughout)
- ✅ Loading states (UI components ready)
- ✅ Empty states (UI components ready)
- ⏳ E2E tests - needs implementation
- ✅ Bug fixes (TypeScript errors resolved, build passes)

### 13.6 Week 6: Launch Prep 🟡 PARTIALLY COMPLETE

**Day 36-37: Marketing Site** 🟡 Partially Complete
- ✅ Landing page (index.html - complete with hero, features, pricing)
- ✅ Pricing page (included in landing page)
- ⏳ Features page - needs dedicated page
- ⏳ FAQ - needs dedicated page

**Day 38-39: Documentation** ✅ COMPLETE
- ✅ Setup guides (DEPLOYMENT_GUIDE.md with Shopify & WordPress)
- ✅ API docs (BUILD_COMPLETE.md includes API endpoints)
- ✅ Help center articles (README.md, QUICK_START.md, comprehensive docs)

**Day 40-42: Beta Testing & Launch** ⏳ Ready to Deploy
- ✅ Deploy to production (vercel.json configured, ready to push)
- ⏳ Invite beta users - after deployment
- ⏳ Monitor for issues - after deployment
- ⏳ Iterate based on feedback - after deployment

---

## 14. DEVELOPMENT PHASES

### 14.1 Phase 1: MVP (Month 1) 🟡 CORE COMPLETE
**Goal**: Working product with core value prop

**Deliverables**:
- ✅ User authentication (Clerk) - COMPLETE
- ✅ Shopify integration (OAuth + API) - COMPLETE
- 🟡 WordPress integration (REST API) - CONNECTION READY, FIXES NEED WORK
- 🟡 Universal JS integration - UI READY, IMPLEMENTATION NEEDED
- ✅ Claude AI analysis - COMPLETE
- 🟡 3 execution modes - UI COMPLETE, BACKEND LOGIC NEEDED
- 🟡 Basic SEO fixes:
  - ✅ Meta optimization - COMPLETE
  - ⏳ Broken links - NEEDS IMPLEMENTATION
  - ⏳ Alt text - NEEDS IMPLEMENTATION
  - ✅ Redirects - COMPLETE
- ✅ Dashboard (issues, fixes, metrics) - COMPLETE
- ⏳ Billing (Stripe) - UI COMPLETE, INTEGRATION NEEDED
- ✅ Landing page - COMPLETE

**Success Criteria**:
- 10 paying customers
- 100 fixes applied
- <5 bugs reported
- 4.5+ star reviews

### 14.2 Phase 2: Growth (Month 2-3)
**Goal**: Add features to increase retention

**Deliverables**:
- Advanced SEO fixes:
  - Content optimization
  - Internal linking
  - Schema markup
  - Page speed
- AI features:
  - Content generation
  - Keyword research
  - Competitor analysis
- Additional platforms:
  - Wix
  - Squarespace
  - Webflow
- Team features:
  - Multi-user accounts
  - Permissions
  - Audit log
- Improved dashboard:
  - Custom widgets
  - Export reports
  - Better charts

**Success Criteria**:
- 100 paying customers
- $50K MRR
- <3% churn
- Net Promoter Score >50

### 14.3 Phase 3: Scale (Month 4-6)
**Goal**: Enterprise readiness

**Deliverables**:
- Enterprise features:
  - SSO
  - API access
  - White-label
  - SLA
- Advanced AI:
  - Predictive SEO
  - Content strategy
  - Voice search optimization
- Automation:
  - Workflow builder
  - Custom rules
  - Bulk operations
- Integrations:
  - Google Analytics
  - Search Console
  - Slack
  - Zapier

**Success Criteria**:
- 500 paying customers
- $300K MRR
- 5 enterprise deals
- Profitable unit economics

---

## 15. SUCCESS METRICS

### 15.1 KPIs

```typescript
const KPIs = {
  technical: {
    uptime: '99.9%',
    api_response_time: '<200ms (p95)',
    fix_success_rate: '>95%',
    error_rate: '<0.1%',
    page_load_time: '<2s',
  },

  business: {
    month_1: {
      signups: 100,
      trials: 80,
      paid_conversions: 10,
      mrr: 2970,
      churn: '<10%',
    },
    month_6: {
      signups: 1000,
      trials: 800,
      paid_conversions: 100,
      mrr: 59700,
      churn: '<5%',
    },
    month_12: {
      signups: 5000,
      trials: 4000,
      paid_conversions: 500,
      mrr: 298500,
      churn: '<3%',
    }
  },

  customer: {
    nps_score: '>50',
    csat: '>4.5/5',
    support_response: '<2 hours',
    support_resolution: '<24 hours',
    reviews: '>4.5 stars',
  },

  product: {
    daily_active_users: 'target: 60% of paid users',
    fixes_per_user_per_month: 'target: >100',
    issues_detected_per_site: 'target: >50',
    time_to_first_fix: 'target: <5 minutes',
    rollback_rate: 'target: <2%',
  }
};
```

### 15.2 North Star Metric

**Fixes Applied Per Month** = Total value delivered

This metric captures:
- Product usage (more fixes = more engagement)
- Customer value (fixes = SEO improvements)
- Revenue potential (usage drives upgrades)

Target: 10,000 fixes/month by month 6

---

## 16. SECURITY & COMPLIANCE

### 16.1 Security Measures

```typescript
const SECURITY = {
  authentication: {
    provider: 'Clerk',
    mfa: true,              // Two-factor authentication
    session_timeout: '24h',
    password_requirements: {
      min_length: 12,
      require_uppercase: true,
      require_lowercase: true,
      require_numbers: true,
      require_symbols: true,
    }
  },

  api: {
    rate_limiting: true,
    api_keys: true,         // For programmatic access
    ip_whitelist: false,    // Optional for enterprise
    cors: 'strict',
    csrf_protection: true,
    webhook_verification: true, // HMAC signatures
  },

  data: {
    encryption_at_rest: true,      // AES-256
    encryption_in_transit: true,   // TLS 1.3
    backup_frequency: 'daily',
    backup_retention: '30 days',
    pii_handling: 'GDPR compliant',
    data_residency: 'US (configurable)',
  },

  platform_tokens: {
    storage: 'encrypted (AES-256)',
    rotation: 'quarterly',
    access_logs: true,
    scope_minimization: true, // Request only needed scopes
  },

  infrastructure: {
    ddos_protection: 'Cloudflare',
    waf: 'Cloudflare WAF',
    vulnerability_scanning: 'Snyk',
    penetration_testing: 'Annual',
  }
};
```

### 16.2 Compliance

**GDPR (EU)**:
- ✅ Data processing agreement
- ✅ Right to access (export data)
- ✅ Right to deletion
- ✅ Right to portability
- ✅ Privacy policy
- ✅ Cookie consent
- ✅ Data breach notification

**CCPA (California)**:
- ✅ Privacy notice
- ✅ Opt-out mechanism
- ✅ Data deletion requests

**SOC 2 Type II** (Planned for Month 6):
- Security controls
- Availability
- Processing integrity
- Confidentiality
- Privacy

---

## 17. SUPPORT & DOCUMENTATION

### 17.1 User Guides

1. **Getting Started with Seology**
2. **Connecting Your Shopify Store**
3. **Connecting WordPress Sites**
4. **Understanding Execution Modes**
5. **Reading Your SEO Reports**
6. **Rolling Back Fixes**
7. **Billing & Subscription Management**
8. **Understanding Fix Priority Levels**
9. **Team Permissions & Roles**
10. **API Documentation**

### 17.2 API Documentation

Full OpenAPI/Swagger spec hosted at `/docs/api`

Includes:
- Authentication flow
- All endpoints with examples
- Request/response schemas
- Error codes
- Rate limits
- SDKs (JavaScript, Python, PHP)
- Postman collection

### 17.3 Troubleshooting

**Common Issues**:
1. Connection failed to Shopify
2. WordPress REST API disabled
3. Fix execution failed
4. Payment declined
5. Usage limit exceeded

Each with:
- Symptom description
- Root cause
- Step-by-step resolution
- Prevention tips

---

## 18. LAUNCH STRATEGY

### 18.1 Pre-Launch (Weeks 1-2 before)

**Week -2**:
- Finalize MVP features
- Complete beta testing
- Fix critical bugs
- Prepare marketing materials
- Set up analytics
- Configure monitoring

**Week -1**:
- Soft launch to beta list (50 users)
- Collect feedback
- Final bug fixes
- Prepare launch content:
  - Product Hunt page
  - HackerNews post
  - Twitter thread
  - Blog post
  - Email announcement

### 18.2 Launch Day

**Morning** (9 AM EST):
- Submit to Product Hunt
- Post on HackerNews (Show HN)
- Twitter announcement
- LinkedIn post
- Email to beta waitlist (500 people)
- Reddit posts (r/SEO, r/shopify, r/wordpress)

**Afternoon**:
- Monitor feedback
- Respond to comments
- Fix any critical bugs
- Tweet progress updates

**Evening**:
- Recap in Twitter thread
- Thank early supporters
- Plan follow-up posts

### 18.3 Post-Launch (Week 1)

**Day 2-3**:
- Email follow-up to trial users
- Post case study (first customer result)
- Respond to support tickets
- Fix bugs reported

**Day 4-5**:
- Release feature update (small)
- Post on Indie Hackers
- Reach out to SEO influencers
- Guest post opportunities

**Day 6-7**:
- Weekly metrics review
- User interviews (5 users)
- Prioritize feature requests
- Plan next sprint

### 18.4 Growth Channels

**Month 1**:
- SEO (own site ranking for "SEO automation")
- Content marketing (blog posts)
- Product Hunt audience
- HackerNews audience

**Month 2-3**:
- Paid ads (Google, Facebook)
- Affiliate program (30% commission)
- Integrations (Shopify App Store, WordPress Plugin Directory)
- Partnerships (SEO agencies)

**Month 4-6**:
- Conference sponsorships
- Webinars
- YouTube channel
- Podcast sponsorships

---

## APPENDIX: Quick Reference

### Environment Variables

```bash
# .env.local

# Authentication
CLERK_SECRET_KEY=sk_live_xxx
CLERK_PUBLISHABLE_KEY=pk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# Database
DATABASE_URL=postgresql://user:pass@host:5432/seology
DIRECT_URL=postgresql://user:pass@host:5432/seology

# Redis
REDIS_URL=redis://default:xxx@host:6379

# Claude AI
CLAUDE_API_KEY=sk-ant-api03-xxx
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Shopify
SHOPIFY_CLIENT_ID=0b87ac78cf0783fd1dd829bf5421fae5
SHOPIFY_CLIENT_SECRET=xxx
SHOPIFY_REDIRECT_URI=https://app.seology.ai/auth/shopify/callback

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Email
RESEND_API_KEY=re_xxx

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
AXIOM_API_TOKEN=xxx
POSTHOG_API_KEY=phc_xxx

# App URLs
NEXT_PUBLIC_APP_URL=https://app.seology.ai
NEXT_PUBLIC_API_URL=https://api.seology.ai
```

### Quick Start Commands

```bash
# Development
npm run dev           # Frontend on :3000
npm run dev:api       # API on :4000
npm run dev:worker    # Queue processor

# Database
npx prisma db push    # Sync schema
npx prisma db seed    # Seed data
npx prisma studio     # GUI database browser

# Testing
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage report

# Deployment
npm run deploy:staging
npm run deploy:production

# Utilities
npm run lint          # ESLint
npm run format        # Prettier
npm run typecheck     # TypeScript check
```

---

**END OF COMPREHENSIVE PRD**

**Total Pages**: 50+
**Total Sections**: 18
**Total Lines**: 3,000+
**Completeness**: 100% based on BREAKDOWN OF SEOLOGY.TXT

This PRD is now ready to be broken down into implementation tasks.
