# SEOLOGY.AI - Database Schema Diagram

## Core Entity Relationships

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            SEOLOGY.AI Database                           │
│                         49 Models, 41 Relations                          │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│     USER     │  (Central entity - authenticated via Clerk)
├──────────────┤
│ id           │
│ clerkId      │──┐
│ email        │  │
│ plan         │  │  Has Many ↓
│ role         │  │
└──────────────┘  │
                  │
    ┌─────────────┴─────────────────────────────────────────────┐
    │                                                             │
    ↓                                                             ↓
┌──────────────┐                                          ┌──────────────┐
│ CONNECTION   │  (Shopify, WordPress, etc.)              │SUBSCRIPTION  │
├──────────────┤                                          ├──────────────┤
│ id           │──┐                                       │ id           │
│ userId       │  │ Has Many ↓                            │ userId       │
│ platform     │  │                                       │ plan         │
│ domain       │  │                                       │ status       │
│ accessToken  │  │  (Encrypted)                          └──────────────┘
└──────────────┘  │
                  │
    ┌─────────────┴───────────────────────────────┐
    │                                               │
    ↓                                               ↓
┌──────────────┐                            ┌──────────────┐
│    ISSUE     │                            │  SHOPIFY     │
├──────────────┤                            │  PRODUCT     │
│ id           │──┐                         ├──────────────┤
│ connectionId │  │ Has Many ↓              │ id           │
│ type         │  │                         │ connectionId │
│ severity     │  │                         │ title        │
│ status       │  │                         │ seoScore     │
└──────────────┘  │                         │ revenue30Days│
                  │                         └──────────────┘
    ┌─────────────┘
    │
    ↓
┌──────────────┐
│     FIX      │  (Applied SEO fixes with 90-day rollback)
├──────────────┤
│ id           │
│ connectionId │
│ issueId      │  (Optional - can exist without issue)
│ status       │
│ beforeState  │  (JSON for rollback)
│ afterState   │  (JSON for rollback)
│ appliedAt    │
└──────────────┘
```

---

## Advanced Features

### 1. Custom AI Agents (Opcode-inspired)

```
┌──────────────┐
│  SEO AGENT   │  (Custom specialized AI agents)
├──────────────┤
│ id           │──┐
│ userId       │  │
│ name         │  │ Has Many ↓
│ specialty    │  │
│ systemPrompt │  │
│ model        │  │
└──────────────┘  │
                  │
    ┌─────────────┘
    │
    ↓
┌──────────────┐
│   AGENT      │  (Execution history with metrics)
│  EXECUTION   │
├──────────────┤
│ id           │
│ agentId      │
│ status       │
│ tokensUsed   │
│ costUSD      │
│ userRating   │
└──────────────┘
```

### 2. Timeline & Checkpoints (Version Control for SEO)

```
┌──────────────┐
│  TIMELINE    │  (Save states for time-travel)
│ CHECKPOINT   │
├──────────────┤
│ id           │
│ connectionId │
│ completeState│  (Full JSON snapshot)
│ type         │  (Manual, Auto, Pre-Agent, etc.)
│ canRollback  │
│ createdAt    │
└──────────────┘
```

### 3. Usage Analytics (Cost Tracking)

```
┌──────────────┐
│ USAGE EVENT  │  (Fine-grained API tracking)
├──────────────┤
│ id           │
│ userId       │
│ eventType    │
│ tokensInput  │
│ tokensOutput │
│ costUSD      │
│ timestamp    │
└──────────────┘

┌──────────────┐
│ USAGE BUDGET │  (Spending limits & alerts)
├──────────────┤
│ userId       │
│ monthlyLimit │
│ currentSpend │
│ alert50Sent  │
│ alert75Sent  │
│ alert90Sent  │
└──────────────┘
```

---

## Schema.org & Meta Management

```
CONNECTION ──┐
             │
    ┌────────┴─────────┐
    │                  │
    ↓                  ↓
┌──────────────┐  ┌──────────────┐
│ STRUCTURED   │  │   META TAG   │
│    DATA      │  │              │
├──────────────┤  ├──────────────┤
│ schemaType   │  │ title        │
│ schemaJson   │  │ description  │
│ resourceType │  │ ogTitle      │
│ status       │  │ ogImage      │
│ impressions  │  │ aiGenerated  │
│ clicks       │  │ ctrBefore    │
└──────────────┘  │ ctrAfter     │
                  └──────────────┘
```

---

## Image SEO Optimization

```
CONNECTION ──┐
             │
    ┌────────┘
    │
    ↓
┌──────────────┐
│ IMAGE ASSET  │  (AI-powered alt text & optimization)
├──────────────┤
│ id           │
│ connectionId │
│ url          │
│ altText      │  (Current)
│ suggested    │  (AI-generated)
│ aiDescription│  (Claude Vision)
│ isOptimized  │
│ impactScore  │
│ priority     │
└──────────────┘
```

---

## Daily Automation System

```
USER ──┐
       │
       ↓
┌──────────────┐        ┌──────────────┐
│ DAILY REPORT │───────→│ AUTOMATION   │
│              │        │  SNAPSHOT    │
├──────────────┤        ├──────────────┤
│ userId       │        │ reportId     │
│ sitesScanned │        │ completeState│  (Full rollback data)
│ issuesFixed  │        │ siteSnapshots│
│ fixesApplied │        │ canRollback  │
│ emailSent    │        │ rollbackExpiry│
└──────────────┘        └──────────────┘
```

---

## Page-Level SEO Tracking

```
CONNECTION ──┐
             │
    ┌────────┴────────────────────┐
    │                             │
    ↓                             ↓
┌──────────────┐           ┌──────────────┐
│     PAGE     │──────────→│   KEYWORD    │
├──────────────┤           ├──────────────┤
│ url          │           │ keyword      │
│ seoScore     │           │ searchVolume │
│ wordCount    │           │ difficulty   │
│ lcp, fid, cls│  ←────┐   │ intent       │
│ h1Count      │       │   └──────────────┘
│ totalImages  │       │
└──────────────┘       │   ┌──────────────┐
                       └──→│ PAGE KEYWORD │  (Many-to-Many)
                           ├──────────────┤
                           │ pageId       │
                           │ keywordId    │
                           │ relevance    │
                           └──────────────┘
```

---

## Team Collaboration

```
USER ──┐
       │
       ↓
┌──────────────┐        ┌──────────────┐
│     TEAM     │───────→│ TEAM MEMBER  │
├──────────────┤        ├──────────────┤
│ id           │        │ teamId       │
│ ownerId      │        │ userId       │
│ plan         │        │ role         │
└──────────────┘        └──────────────┘
       │
       ↓
┌──────────────┐
│    TEAM      │
│ INVITATION   │
├──────────────┤
│ teamId       │
│ email        │
│ token        │
│ status       │
└──────────────┘
```

---

## Job Queue System

```
┌──────────────┐
│     JOB      │  (Background processing)
├──────────────┤
│ id           │
│ type         │  (CRAWL_SITE, ANALYZE_SITE, APPLY_FIX, etc.)
│ status       │
│ priority     │  (1-10)
│ payload      │  (JSON)
│ result       │  (JSON)
│ attempts     │
│ progress     │  (0-100%)
└──────────────┘

Job Types:
- CRAWL_SITE
- ANALYZE_SITE
- APPLY_FIX
- ROLLBACK_FIX
- CLEANUP_ROLLBACKS
- RESET_USAGE
- SYNC_METRICS
- GENERATE_REPORT
- SCAN_IMAGES
- OPTIMIZE_IMAGES
- DAILY_AUTOMATION
```

---

## Admin Features

```
┌──────────────┐
│  BROADCAST   │  (Admin → Users messaging)
├──────────────┤
│ type         │
│ title        │
│ message      │
│ targetPlans  │  (STARTER, GROWTH, SCALE)
│ targetRoles  │  (USER, ADMIN)
│ sentAt       │
│ openedCount  │
└──────────────┘

┌──────────────┐
│ CONNECTION   │  (White-glove onboarding)
│   REQUEST    │
├──────────────┤
│ userId       │
│ platform     │
│ storeUrl     │
│ status       │  (PENDING, APPROVED, CONNECTED)
│ oauthUrl     │  (Generated by admin)
└──────────────┘
```

---

## Key Indexes

### Compound Indexes (Performance-Critical)

1. **Connection:** `[domain, platform, status]`
2. **Issue:** `[connectionId, status, detectedAt]`
3. **Fix:** `[issueId, status]`
4. **Job:** `[status, scheduledFor, priority]`
5. **APIUsageLog:** `[userId, timestamp]`
6. **APIUsageLog:** `[shop, timestamp]`
7. **AgentExecution:** `[agentId, status, completedAt]`
8. **TimelineCheckpoint:** `[connectionId, createdAt]`
9. **UsageEvent:** `[userId, timestamp]`
10. **UsageEvent:** `[connectionId, timestamp]`

---

## Data Flow Example: Daily Automation

```
1. CRON Trigger (9:00 AM user's timezone)
   ↓
2. Create JOB (type: DAILY_AUTOMATION)
   ↓
3. For each CONNECTION:
   ├─→ CRAWL pages
   ├─→ DETECT issues
   ├─→ CREATE snapshot (AutomationSnapshot)
   ├─→ APPLY fixes (based on executionMode)
   └─→ TRACK usage (APIUsageLog, UsageEvent)
   ↓
4. Generate DAILY REPORT
   ↓
5. Send email + dashboard notification
```

---

## Rollback System

```
Fix Applied
   ↓
┌──────────────┐
│     FIX      │
├──────────────┤
│ beforeState  │  ─┐
│ afterState   │   │ Stored for 90 days
│ appliedAt    │   │
│ rollback     │   │
│  Deadline    │  ─┘
└──────────────┘
   ↓
User triggers rollback
   ↓
1. Read beforeState JSON
2. Apply to CMS via API
3. Mark as ROLLED_BACK
4. Create audit log
```

---

## Security Model

### Encrypted Fields
- `Connection.accessToken` (AES-256)
- `Connection.refreshToken` (AES-256)
- `Connection.credentials` (AES-256)
- `Webhook.secret` (AES-256)

### Cascade Delete Protection
- User deletion → cascades to all owned data
- Connection deletion → cascades to issues, fixes, etc.
- Team deletion → cascades to members, invitations

### CSRF Protection
```
┌──────────────┐
│ CSRF TOKEN   │  (OAuth flow security)
├──────────────┤
│ userId       │
│ token        │  (Random, single-use)
│ provider     │  (SHOPIFY, GOOGLE, etc.)
│ expiresAt    │  (15 minutes)
└──────────────┘
```

---

## Totals

- **Models:** 49
- **Relations:** 41
- **Indexes:** 180
- **Unique Constraints:** 15
- **Cascade Deletes:** 38
- **Enums:** 28

**Database:** PostgreSQL with Prisma ORM
**Client Version:** Prisma Client 6.18.0
**Schema Version:** 2024-11-07 (Complete)
