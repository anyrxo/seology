# Database Seeding Guide

Complete guide to seeding and managing the SEOLOGY.AI database with realistic demo data.

---

## Quick Start

```bash
# 1. Set up database schema
npx prisma db push
npx prisma generate

# 2. Seed demo data
npm run db:seed

# 3. View data in Prisma Studio
npm run db:studio
```

That's it! Your database now has realistic demo data ready for development.

---

## What Gets Created

### Summary Statistics

The seed script creates:
- **6 users** (1 admin, 5 regular users)
- **10+ platform connections** (Shopify, WordPress, Custom)
- **40-60 SEO issues** (various types and severities)
- **20-30 fixes** (applied, pending, failed)
- **300+ metrics** (30 days × 10 sites)
- **20+ notifications** (mix of read/unread)
- **50+ audit logs** (various user actions)
- **3 AI conversations** (sample chat history)
- **2 webhooks** (integration examples)
- **1 team** (agency setup)

---

## Demo Users

### Admin User
```
Email:          admin@seology.ai
Clerk ID:       user_admin_demo_001
Plan:           SCALE
Execution Mode: PLAN
Role:           ADMIN
Stripe ID:      cus_admin_demo_001
```

### Regular Users

#### 1. Sarah Johnson (Starter User - New to Platform)
```
Email:          sarah@example.com
Clerk ID:       user_starter_demo_001
Plan:           STARTER
Execution Mode: APPROVE
Connections:    1 (Shopify - Sarah's Fashion Boutique)
Status:         TRIALING
Use Case:       Small business owner testing the platform
```

#### 2. Michael Chen (Growth User - Active)
```
Email:          michael@techstartup.io
Clerk ID:       user_growth_demo_001
Plan:           GROWTH
Execution Mode: PLAN
Connections:    2 (WordPress blog, Custom site)
Status:         ACTIVE
Use Case:       Tech startup with multiple properties
```

#### 3. Jennifer Williams (Enterprise User)
```
Email:          jennifer@enterprise.com
Clerk ID:       user_scale_demo_001
Plan:           SCALE
Execution Mode: AUTOMATIC
Connections:    3 (Shopify, WordPress, Custom)
Status:         ACTIVE
Use Case:       Large enterprise with full automation
```

#### 4. Alex Martinez (Shop Owner)
```
Email:          alex@shopowner.com
Clerk ID:       user_starter_demo_002
Plan:           STARTER
Execution Mode: AUTOMATIC
Connections:    1 (Shopify - Alex Electronics Shop)
Status:         ACTIVE
Use Case:       Electronics shop with auto-fix enabled
```

#### 5. David Thompson (Agency Owner)
```
Email:          david@digitalagency.com
Clerk ID:       user_growth_demo_002
Plan:           GROWTH
Execution Mode: PLAN
Connections:    3 (Multiple client sites)
Status:         ACTIVE
Team:           Digital Agency Team
Use Case:       Agency managing multiple client websites
```

---

## Platform Connections

### Shopify Stores
1. **Sarah's Fashion Boutique** (`sarahs-boutique.myshopify.com`)
   - Owner: Sarah Johnson
   - Status: CONNECTED
   - Issues: 3-8 SEO issues

2. **Enterprise E-commerce** (`enterprise-store.myshopify.com`)
   - Owner: Jennifer Williams
   - Status: CONNECTED
   - Issues: High volume, multiple issues

3. **Alex Electronics Shop** (`alex-shop.myshopify.com`)
   - Owner: Alex Martinez
   - Status: CONNECTED
   - Issues: Product-related SEO

4. **Agency Client - Organic Foods** (`client2-store.myshopify.com`)
   - Owner: David Thompson (Agency)
   - Status: CONNECTED
   - Issues: E-commerce optimization

### WordPress Sites
1. **Tech Startup Blog** (`techstartup.io`)
   - Owner: Michael Chen
   - Status: CONNECTED
   - Issues: Content and meta tags

2. **Enterprise Knowledge Base** (`enterprise-blog.com`)
   - Owner: Jennifer Williams
   - Status: CONNECTED
   - Issues: Documentation SEO

3. **Agency Client - Fitness Studio** (`client1.com`)
   - Owner: David Thompson (Agency)
   - Status: CONNECTED
   - Issues: Local SEO

4. **Agency Client - Law Firm** (`client3.com`)
   - Owner: David Thompson (Agency)
   - Status: ERROR (Auth issue for testing)
   - Issues: Connection authentication failed

### Custom Sites (Magic.js)
1. **Tech Startup Main Site** (`techstartup.com`)
   - Owner: Michael Chen
   - Status: CONNECTED
   - Issues: Custom integration testing

2. **Enterprise Corporate Site** (`enterprise.com`)
   - Owner: Jennifer Williams
   - Status: CONNECTED
   - Issues: Corporate website optimization

---

## SEO Issues Created

### Issue Types (8 categories)

1. **Missing Meta Description** (Severity: HIGH)
   - 150-160 character meta descriptions missing
   - Impact: Reduced click-through rates from search

2. **Missing Meta Title** (Severity: CRITICAL)
   - Page titles under 60 characters missing
   - Impact: Major SEO ranking penalty

3. **Missing Alt Text** (Severity: MEDIUM)
   - Images without descriptive alt attributes
   - Impact: Accessibility and image SEO

4. **Broken Links** (Severity: HIGH)
   - Internal links returning 404 errors
   - Impact: Poor user experience and crawl issues

5. **Duplicate Content** (Severity: MEDIUM)
   - Pages with identical or very similar content
   - Impact: SEO penalties and confusion

6. **Slow Page Speed** (Severity: HIGH)
   - Pages loading over 3 seconds
   - Impact: High bounce rates

7. **Missing H1** (Severity: HIGH)
   - Pages without primary heading
   - Impact: Poor content structure

8. **Thin Content** (Severity: MEDIUM)
   - Pages with less than 300 words
   - Impact: Low content quality signals

### Issue Distribution
- Each connected site gets 3-8 random issues
- Realistic page URLs (products, blog posts, pages)
- Various statuses: DETECTED, OPEN, FIXED, IN_PROGRESS
- Detection dates spread over last 30 days

---

## Fixes Created

### Fix Types

**Applied Fixes (Status: APPLIED)**
- Successfully applied to CMS
- Before/after state captured
- Applied timestamps (last 15 days)
- Rollback deadline set (90 days)

**Pending Fixes (Status: PENDING)**
- Awaiting user approval (APPROVE mode)
- Generated but not applied
- Ready for immediate application

**Failed Fixes (Status: FAILED)**
- Attempted but encountered errors
- Error messages captured
- Useful for error handling testing

### Fix Method Distribution
- **AUTOMATIC**: Applied immediately without approval
- **MANUAL**: User-initiated fixes
- **PENDING**: Awaiting approval decision

---

## Performance Metrics

### What's Tracked
- **Organic Traffic**: 200-1200 visits per day (varies by site)
- **Keyword Rankings**: Top 3 keywords with positions 1-40
- **Page Speed**: Load times between 2-4 seconds
- **Issues Count**: Active issues per day
- **Fixes Count**: Applied fixes per day

### Time Range
- **30 days of data** for each connected site
- Daily data points for trend analysis
- Realistic growth/decline patterns

---

## Notifications

### Types Created

**SUCCESS Notifications**
- "SEO Fixes Applied Successfully"
- Confirms automatic fixes
- Links to dashboard

**INFO Notifications**
- "Site Crawl Completed"
- Reports issues found
- Links to issues page

**WARNING Notifications**
- "High Priority Issues Detected"
- Alerts to critical problems
- Links to specific issues

### Distribution
- Mix of read/unread statuses
- Created over last 72 hours
- 2-3 notifications per user
- Admin gets system notifications

---

## Audit Logs

### Actions Logged

1. **CONNECTION_CREATED**
   - Platform and domain recorded
   - OAuth/credential setup tracked

2. **FIX_APPLIED**
   - Fix type and description
   - Before/after states
   - Application timestamp

3. **SETTINGS_UPDATED**
   - Execution mode changes
   - User preference updates

### Metadata
- IP addresses (sample: 192.168.1.1)
- User agents (Chrome/Windows)
- Timestamps across last 20 days

---

## AI Conversations

### Sample Conversations Created

**Conversation Structure:**
```json
{
  "role": "user",
  "content": "Can you analyze my homepage for SEO issues?"
}
```

**Response:**
- Analysis of SEO issues found
- Recommendations for fixes
- Confirmation of applied fixes

**Context Included:**
- Site URL and platform
- Analysis timestamp
- Issue detection metadata

---

## Additional Data

### Subscriptions
- Stripe subscription IDs (demo format)
- Current period dates (monthly billing)
- Trial status for new users
- Active/trialing statuses

### Webhooks
- Webhook URLs (webhook.site format)
- Event subscriptions: fix.applied, issue.detected, crawl.completed
- HMAC secrets for verification
- Last triggered timestamps

### Teams
- **Digital Agency Team**
  - Owner: David Thompson
  - Plan: GROWTH
  - Members: 1 (owner)
  - Connections: Client sites

### Crawls
- Recent completed crawls (last 1-2 days)
- Pages found: 10-50 per site
- Issues found count
- Start/completion timestamps
- Historical crawl data (15+ days old)

---

## Database Management Commands

### Seeding

```bash
# Seed database (keeps existing data)
npm run db:seed

# View what will be created (dry run)
# Currently not available - consider adding this feature
```

### Resetting

```bash
# DANGER: Delete all data and re-seed
npm run db:reset

# Delete all data without seeding
npm run db:reset-only
```

**Safety Features:**
- Production environment check
- 3-second countdown warning
- Proper foreign key deletion order
- Error handling with rollback

### Viewing Data

```bash
# Open Prisma Studio (GUI)
npm run db:studio

# Access at http://localhost:5555
# Browse all tables
# Edit records manually
# Execute raw SQL
```

---

## Authentication Setup

### Important: Clerk Integration

The seed creates users with demo Clerk IDs (`user_*_demo_*`). These won't work with real Clerk authentication.

### Option 1: Development Testing (Without Real Login)

Use Prisma Studio or API endpoints directly to test with seeded data:

```bash
# Open Prisma Studio
npm run db:studio

# Manually test API with user IDs from seeded data
# Example: Use user.id from database in API calls
```

### Option 2: Real Authentication Setup

1. **Create users in Clerk Dashboard:**
   ```
   admin@seology.ai
   sarah@example.com
   michael@techstartup.io
   jennifer@enterprise.com
   alex@shopowner.com
   david@digitalagency.com
   ```

2. **Get Clerk IDs:**
   - Log in as each user once
   - Copy Clerk user ID from Clerk Dashboard
   - Format: `user_2xyz...`

3. **Update seed.ts:**
   ```typescript
   // Before
   clerkId: 'user_admin_demo_001'

   // After
   clerkId: 'user_2xyz...' // Real Clerk ID
   ```

4. **Reset and re-seed:**
   ```bash
   npm run db:reset
   ```

### Option 3: Environment-Specific Seeds

Consider creating separate seed files:
- `seed-demo.ts` - Demo Clerk IDs (for testing)
- `seed-production.ts` - Real Clerk IDs (for staging/prod)

---

## Customizing Seed Data

### Modify User Count

In `prisma/seed.ts`:
```typescript
// Add more users
const moreUsers = await Promise.all([
  prisma.user.create({
    data: {
      clerkId: 'user_custom_001',
      email: 'custom@example.com',
      name: 'Custom User',
      plan: 'GROWTH',
      executionMode: 'AUTOMATIC',
    },
  }),
  // Add more...
])
```

### Modify Issue Distribution

```typescript
// Change issue count per site
const issueCount = Math.floor(Math.random() * 6) + 3 // 3-8 issues

// Change to fixed amount
const issueCount = 10 // Always 10 issues per site
```

### Modify Metrics Time Range

```typescript
// Change from 30 days to 90 days
for (let day = 90; day >= 0; day--) {
  const date = daysAgo(day)
  // Create metrics...
}
```

### Add Custom Issue Types

```typescript
const customIssueType = {
  type: 'custom_issue_type',
  title: 'Custom Issue Title',
  severity: 'HIGH' as const,
  recommendation: 'Custom fix recommendation',
}

issueTypes.push(customIssueType)
```

---

## Troubleshooting

### Seed Fails with Foreign Key Error

**Problem:** Deletion order incorrect

**Solution:** Update `reset.ts` deletion order:
```typescript
// Delete child records first
await prisma.fix.deleteMany()
await prisma.issue.deleteMany()
await prisma.connection.deleteMany()
// Delete parent records last
await prisma.user.deleteMany()
```

### Encryption Errors

**Problem:** `ENCRYPTION_KEY` not set

**Solution:** Generate and set encryption key:
```bash
# Generate key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env.local
ENCRYPTION_KEY=your_generated_key_here
```

### Duplicate Key Violations

**Problem:** Running seed multiple times creates duplicates

**Solution:** Reset before seeding:
```bash
npm run db:reset  # Resets and re-seeds
```

### Prisma Client Out of Sync

**Problem:** Schema changes not reflected

**Solution:** Regenerate Prisma client:
```bash
npx prisma generate
npm run db:seed
```

### Type Errors in seed.ts

**Problem:** Enum values don't match schema

**Solution:** Check `schema.prisma` for exact enum values:
```prisma
enum Platform {
  SHOPIFY
  WORDPRESS
  WIX
  CUSTOM
}
```

---

## Best Practices

### Development Workflow

1. **Start fresh each sprint:**
   ```bash
   npm run db:reset
   ```

2. **Test with realistic data:**
   - Use seeded data for UI testing
   - Verify edge cases (ERROR connections, FAILED fixes)

3. **Keep seed up-to-date:**
   - Add new models to seed script
   - Match production data patterns

### Production Deployment

**Never run seed in production!**

The seed script includes safety checks:
```typescript
if (process.env.NODE_ENV === 'production') {
  console.error('Cannot seed in production!')
  process.exit(1)
}
```

### Team Collaboration

**Share consistent data:**
1. Commit seed script changes
2. Document new demo accounts
3. Update this guide with changes

**Avoid conflicts:**
- Don't modify seed data in database directly
- Reset and re-seed to get latest changes
- Use version control for seed script

---

## Performance Considerations

### Seed Time

**Expected duration:** 5-15 seconds

Breakdown:
- User creation: ~1s
- Connections: ~2s
- Issues: ~3s (40-60 records)
- Fixes: ~2s
- Metrics: ~5s (300+ records)
- Other data: ~2s

### Optimization Tips

**Speed up seeding:**
```typescript
// Use createMany for bulk inserts
await prisma.metric.createMany({
  data: metricsArray  // All 300+ at once
})

// Instead of individual creates
for (const metric of metricsArray) {
  await prisma.metric.create({ data: metric })
}
```

**Reduce data volume:**
```typescript
// Reduce metrics to 7 days instead of 30
for (let day = 7; day >= 0; day--) {
  // Create metrics
}
```

---

## Future Enhancements

### Planned Features

1. **Seed Profiles:**
   - `--profile=minimal` (Quick testing)
   - `--profile=full` (Complete data)
   - `--profile=custom` (User-defined)

2. **Incremental Seeding:**
   - Add data without resetting
   - Update existing records
   - Merge with production snapshots

3. **Realistic Data Generation:**
   - Use faker.js for names/addresses
   - Realistic SEO content
   - Variable traffic patterns

4. **Export/Import:**
   - Export seed to JSON
   - Import custom seed data
   - Share between environments

---

## Related Documentation

- [Prisma Schema](prisma/schema.prisma) - Database models
- [CLAUDE.md](CLAUDE.md) - Development guide
- [README.md](README.md) - Project overview
- [API_REFERENCE.md](API_REFERENCE.md) - API endpoints

---

## Support

**Issues with seeding?**

1. Check error messages carefully
2. Verify environment variables set
3. Ensure database is accessible
4. Review this guide's troubleshooting section
5. Open GitHub issue with details

**Questions?**
- Email: dev@seology.ai
- Discord: #database channel
- GitHub Discussions: Database category

---

**Last Updated:** 2024-01-15
**Seed Script Version:** 1.0.0
**Compatible with:** Prisma Schema v1.0.0
