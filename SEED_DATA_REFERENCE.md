# Seed Data Quick Reference

Visual reference of all demo data created by the database seed script.

---

## Quick Stats

```
📊 Database Seed Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 Users:              6 (1 admin, 5 regular)
💳 Subscriptions:      6 (4 active, 1 trialing, 1 canceled)
🔌 Connections:        10 (8 active, 1 error, 1 pending)
🔍 Issues:             40-60 (varies per site)
🔧 Fixes:              20-30 (applied/pending/failed)
🕷️  Crawls:             10-15 (completed records)
📊 Metrics:            310+ (31 days × 10 sites)
🔔 Notifications:      20-25 (various types)
📝 Audit Logs:         50-60 (all user actions)
🤖 AI Conversations:   3 (sample chats)
🎣 Webhooks:           2 (power users)
👥 Teams:              1 (agency setup)

Run time: ~5-15 seconds
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## User Accounts

### Admin Account

```yaml
id: [auto-generated UUID]
clerkId: user_admin_demo_001
email: admin@seology.ai
name: Admin User
role: ADMIN
plan: SCALE
executionMode: PLAN
stripeCustomerId: cus_admin_demo_001
stripeSubscriptionId: sub_admin_demo_001
onboardingCompleted: false
onboardingStep: 0
```

**Access Level:** Full system access, user management, system settings

---

### Regular Users

#### User 1: Sarah Johnson (Starter - Evaluating)

```yaml
id: [auto-generated UUID]
clerkId: user_starter_demo_001
email: sarah@example.com
name: Sarah Johnson
role: USER
plan: STARTER
executionMode: APPROVE
connections: 1
  - Sarah's Fashion Boutique (Shopify)
status: TRIALING
use_case: Small boutique owner, new to platform, testing features
behavior: Cautious (APPROVE mode), wants to review each fix
```

#### User 2: Michael Chen (Growth - Active)

```yaml
id: [auto-generated UUID]
clerkId: user_growth_demo_001
email: michael@techstartup.io
name: Michael Chen
role: USER
plan: GROWTH
executionMode: PLAN
connections: 2
  - Tech Startup Blog (WordPress)
  - Tech Startup Main Site (Custom)
status: ACTIVE
use_case: Tech startup with blog + main site
behavior: Efficient (PLAN mode), reviews batch fixes
```

#### User 3: Jennifer Williams (Scale - Enterprise)

```yaml
id: [auto-generated UUID]
clerkId: user_scale_demo_001
email: jennifer@enterprise.com
name: Jennifer Williams
role: USER
plan: SCALE
executionMode: AUTOMATIC
connections: 3
  - Enterprise E-commerce (Shopify)
  - Enterprise Knowledge Base (WordPress)
  - Enterprise Corporate Site (Custom)
status: ACTIVE
use_case: Large enterprise, multiple properties
behavior: Hands-off (AUTOMATIC mode), trusts AI fixes
```

#### User 4: Alex Martinez (Starter - Shop Owner)

```yaml
id: [auto-generated UUID]
clerkId: user_starter_demo_002
email: alex@shopowner.com
name: Alex Martinez
role: USER
plan: STARTER
executionMode: AUTOMATIC
connections: 1
  - Alex Electronics Shop (Shopify)
status: ACTIVE
use_case: Electronics e-commerce store
behavior: Automation-focused, limited time
```

#### User 5: David Thompson (Growth - Agency)

```yaml
id: [auto-generated UUID]
clerkId: user_growth_demo_002
email: david@digitalagency.com
name: David Thompson
role: USER
plan: GROWTH
executionMode: PLAN
connections: 3
  - Agency Client - Fitness Studio (WordPress)
  - Agency Client - Organic Foods (Shopify)
  - Agency Client - Law Firm (WordPress, ERROR)
team: Digital Agency Team (owner)
status: ACTIVE
use_case: Digital agency managing client sites
behavior: Batch reviews (PLAN mode), manages multiple clients
```

---

## Platform Connections

### Connection Matrix

| # | Domain | Platform | Owner | Status | Issues | Last Sync |
|---|--------|----------|-------|--------|--------|-----------|
| 1 | sarahs-boutique.myshopify.com | SHOPIFY | Sarah | CONNECTED | 3-8 | 2h ago |
| 2 | techstartup.io | WORDPRESS | Michael | CONNECTED | 3-8 | 5h ago |
| 3 | techstartup.com | CUSTOM | Michael | CONNECTED | 3-8 | 8h ago |
| 4 | enterprise-store.myshopify.com | SHOPIFY | Jennifer | CONNECTED | 3-8 | 1h ago |
| 5 | enterprise-blog.com | WORDPRESS | Jennifer | CONNECTED | 3-8 | 3h ago |
| 6 | enterprise.com | CUSTOM | Jennifer | CONNECTED | 3-8 | 4h ago |
| 7 | alex-shop.myshopify.com | SHOPIFY | Alex | CONNECTED | 3-8 | 6h ago |
| 8 | client1.com | WORDPRESS | David | CONNECTED | 3-8 | 12h ago |
| 9 | client2-store.myshopify.com | SHOPIFY | David | CONNECTED | 3-8 | 10h ago |
| 10 | client3.com | WORDPRESS | David | ERROR | - | 3d ago |

**Total:** 10 connections (8 active, 1 error, 1 pending)

---

## SEO Issues

### Issue Type Distribution

```
Issue Types (8 categories):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 CRITICAL (2-5 issues per site)
   └─ Missing Meta Title
      "Page has no <title> tag"

🔴 HIGH (5-15 issues per site)
   ├─ Missing Meta Description
   │  "No meta description found"
   ├─ Broken Links
   │  "404 error on internal link"
   └─ Missing H1
      "Page missing primary heading"

🟡 MEDIUM (10-20 issues per site)
   ├─ Missing Alt Text
   │  "Images without alt attributes"
   ├─ Duplicate Content
   │  "Similar content on multiple pages"
   └─ Thin Content
      "Page has less than 300 words"

🟢 LOW (5-10 issues per site)
   └─ Slow Page Speed
      "Page loads in over 3 seconds"
```

### Sample Issue Statuses

```
Status Distribution:
━━━━━━━━━━━━━━━━━━━
DETECTED      25%  (Newly found)
OPEN          35%  (Confirmed, pending fix)
IN_PROGRESS   15%  (Being fixed)
FIXED         25%  (Resolved)
```

### Example Issue Records

```json
{
  "id": "uuid-1",
  "type": "missing_meta_description",
  "title": "Missing Meta Description",
  "severity": "HIGH",
  "pageUrl": "https://sarahs-boutique.myshopify.com/products/summer-dress",
  "status": "OPEN",
  "recommendation": "Add a compelling meta description between 150-160 characters",
  "impactScore": 75,
  "estimatedTraffic": 250,
  "detectedAt": "2024-01-05T10:30:00Z"
}

{
  "id": "uuid-2",
  "type": "broken_link",
  "title": "Broken Internal Link",
  "severity": "HIGH",
  "pageUrl": "https://techstartup.io/blog/seo-guide-2024",
  "status": "FIXED",
  "recommendation": "Update or remove links returning 404 errors",
  "impactScore": 60,
  "estimatedTraffic": 150,
  "detectedAt": "2024-01-03T14:20:00Z",
  "fixedAt": "2024-01-10T09:15:00Z"
}
```

---

## Fixes Applied

### Fix Status Distribution

```
Fix Statuses:
━━━━━━━━━━━━━━━━━━━
APPLIED   60%  (Successfully applied)
PENDING   25%  (Awaiting approval)
FAILED    15%  (Encountered errors)
```

### Example Fix Records

#### Applied Fix

```json
{
  "id": "uuid-fix-1",
  "issueId": "uuid-1",
  "connectionId": "uuid-conn-1",
  "description": "Fix: Missing Meta Description on /products/summer-dress",
  "type": "seo_fix",
  "method": "AUTOMATIC",
  "status": "APPLIED",
  "targetUrl": "https://sarahs-boutique.myshopify.com/products/summer-dress",
  "changes": {
    "action": "update_meta",
    "field": "meta_description",
    "oldValue": null,
    "newValue": "Shop our Summer Dress Collection. Free shipping over $50. Latest fashion trends."
  },
  "beforeState": {
    "hasMetaDescription": false,
    "content": ""
  },
  "afterState": {
    "hasMetaDescription": true,
    "content": "Shop our Summer Dress Collection..."
  },
  "appliedAt": "2024-01-12T15:30:00Z",
  "rollbackDeadline": "2024-04-12T15:30:00Z"
}
```

#### Pending Fix (APPROVE mode)

```json
{
  "id": "uuid-fix-2",
  "issueId": "uuid-2",
  "connectionId": "uuid-conn-2",
  "description": "Fix: Missing Alt Text on product images",
  "type": "seo_fix",
  "method": "PENDING",
  "status": "PENDING",
  "targetUrl": "https://alex-shop.myshopify.com/products/headphones",
  "changes": {
    "action": "add_alt_text",
    "field": "image_alt",
    "oldValue": "",
    "newValue": "Wireless Bluetooth Headphones - Black"
  },
  "createdAt": "2024-01-14T10:00:00Z"
}
```

---

## Performance Metrics

### Time Series Data (30 Days)

Each connected site gets 31 days of daily metrics:

```
Metric Structure (per day per site):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Organic Traffic:   200-1200 visits/day
📈 Keyword Rankings:
   - "seo tools": Position 1-20
   - "website optimization": Position 1-30
   - "search ranking": Position 1-40
⚡ Page Speed:        2.0-4.0 seconds
🔍 Issues Count:      Current open issues
✅ Fixes Count:       Fixes applied today
```

### Example Metrics

```json
{
  "connectionId": "uuid-conn-1",
  "date": "2024-01-15",
  "organicTraffic": 850,
  "rankings": {
    "seo tools": 12,
    "website optimization": 8,
    "search ranking": 15
  },
  "pageSpeed": 2.3,
  "issuesCount": 5,
  "fixesCount": 3
}
```

### Traffic Trends

```
Example 7-Day Trend (Sarah's Boutique):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2024-01-09: ████████░░ 750 visits
2024-01-10: █████████░ 825 visits
2024-01-11: ██████████ 900 visits
2024-01-12: █████████░ 875 visits
2024-01-13: ██████████ 950 visits
2024-01-14: ███████░░░ 680 visits (weekend dip)
2024-01-15: ████████░░ 780 visits

Average: 823 visits/day
Trend: +15% week-over-week
```

---

## Notifications

### Notification Types

```
Notification Distribution:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUCCESS   40%  (Fixes applied successfully)
INFO      35%  (Crawls completed, updates)
WARNING   20%  (Critical issues detected)
ERROR     5%   (Connection failures)
```

### Example Notifications

#### Success Notification

```json
{
  "userId": "uuid-user-1",
  "type": "SUCCESS",
  "title": "SEO Fixes Applied Successfully",
  "message": "7 SEO issues have been automatically fixed on Sarah's Fashion Boutique.",
  "actionUrl": "/dashboard",
  "icon": "check-circle",
  "color": "green",
  "read": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Info Notification

```json
{
  "userId": "uuid-user-2",
  "type": "INFO",
  "title": "Site Crawl Completed",
  "message": "Found 12 new SEO opportunities on Tech Startup Blog.",
  "actionUrl": "/dashboard/issues",
  "icon": "info-circle",
  "color": "blue",
  "read": true,
  "createdAt": "2024-01-14T15:00:00Z"
}
```

#### Warning Notification

```json
{
  "userId": "uuid-user-3",
  "type": "WARNING",
  "title": "High Priority Issues Detected",
  "message": "3 critical SEO issues require your attention on Enterprise E-commerce.",
  "actionUrl": "/dashboard/issues?severity=critical",
  "icon": "alert-triangle",
  "color": "orange",
  "read": false,
  "createdAt": "2024-01-15T08:00:00Z"
}
```

---

## Audit Logs

### Action Types

```
Logged Actions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONNECTION_CREATED   Platform connection established
CONNECTION_UPDATED   Connection settings modified
CONNECTION_DELETED   Platform disconnected
FIX_APPLIED          SEO fix successfully applied
FIX_APPROVED         User approved pending fix
FIX_REJECTED         User rejected fix suggestion
PLAN_APPROVED        Batch fix plan approved
PLAN_REJECTED        Batch fix plan rejected
SETTINGS_UPDATED     User preferences changed
CRAWL_STARTED        Site crawl initiated
CRAWL_COMPLETED      Crawl finished successfully
ANALYSIS_COMPLETED   AI analysis finished
USER_LOGIN           User signed in
USER_LOGOUT          User signed out
```

### Example Audit Log

```json
{
  "userId": "uuid-user-1",
  "connectionId": "uuid-conn-1",
  "action": "FIX_APPLIED",
  "resource": "fix",
  "resourceId": "uuid-fix-1",
  "details": {
    "type": "missing_meta_description",
    "pageUrl": "/products/summer-dress",
    "method": "AUTOMATIC"
  },
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "createdAt": "2024-01-12T15:30:00Z"
}
```

---

## AI Conversations

### Sample Conversation 1

```
User: Sarah Johnson
Connection: Sarah's Fashion Boutique
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER:
"Can you analyze my homepage for SEO issues?"

🤖 ASSISTANT:
"I've analyzed your homepage and found several opportunities
for improvement:

1. Missing meta description - this helps search engines
   understand your page
2. H1 heading could be more descriptive
3. Several images lack alt text

Would you like me to fix these automatically?"

👤 USER:
"Yes, please fix them automatically."

🤖 ASSISTANT:
"Perfect! I've applied the following fixes:

✅ Added SEO-optimized meta description
✅ Updated H1 heading
✅ Added descriptive alt text to 8 images

Your homepage is now optimized for better search engine
visibility!"
```

### Sample Conversation 2

```
User: Michael Chen
Connection: Tech Startup Blog
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER:
"Why is my blog post not ranking well?"

🤖 ASSISTANT:
"I've analyzed your blog post '/blog/seo-guide-2024' and
identified these issues:

1. Thin content (only 180 words) - search engines prefer
   300+ words
2. No internal links to related content
3. Missing meta keywords
4. Images are large and slow to load

These factors are likely affecting your rankings. Should I
create a fix plan?"

👤 USER:
"Yes, create a plan."

🤖 ASSISTANT:
"I've created a comprehensive fix plan:

📋 Plan: Blog Post Optimization
   ├─ Expand content to 500 words
   ├─ Add 3 internal links
   ├─ Optimize and compress images
   └─ Add structured data

Ready to approve this plan?"
```

---

## Webhooks

### Webhook Configuration 1

```json
{
  "userId": "uuid-user-2",
  "url": "https://webhook.site/uuid-user-2/seology",
  "events": ["fix.applied", "issue.detected", "crawl.completed"],
  "secret": "whsec_a1b2c3d4e5f6g7h8",
  "enabled": true,
  "failureCount": 0,
  "lastTriggeredAt": "2024-01-14T18:30:00Z"
}
```

### Webhook Configuration 2

```json
{
  "userId": "uuid-user-3",
  "url": "https://webhook.site/uuid-user-3/seology",
  "events": ["fix.applied", "issue.detected", "crawl.completed"],
  "secret": "whsec_i9j0k1l2m3n4o5p6",
  "enabled": true,
  "failureCount": 0,
  "lastTriggeredAt": "2024-01-15T09:15:00Z"
}
```

---

## Teams & Collaboration

### Team: Digital Agency Team

```yaml
id: [auto-generated UUID]
name: Digital Agency Team
description: Managing multiple client websites
ownerId: [David Thompson's UUID]
plan: GROWTH

Members:
  - name: David Thompson
    role: OWNER
    joinedAt: 2024-01-01

Connections (3):
  - Agency Client - Fitness Studio (WordPress)
  - Agency Client - Organic Foods (Shopify)
  - Agency Client - Law Firm (WordPress, ERROR)

Capabilities:
  - Manage up to 10 sites (GROWTH plan)
  - Apply up to 5,000 fixes/month
  - Invite 5 team members
  - Priority support
```

---

## Subscriptions

### Subscription Overview

| User | Plan | Status | Period Start | Period End | Trial |
|------|------|--------|--------------|------------|-------|
| Admin | SCALE | ACTIVE | 15 days ago | In 15 days | No |
| Sarah | STARTER | TRIALING | 10 days ago | In 20 days | Yes |
| Michael | GROWTH | ACTIVE | 20 days ago | In 10 days | No |
| Jennifer | SCALE | ACTIVE | 25 days ago | In 5 days | No |
| Alex | STARTER | ACTIVE | 15 days ago | In 15 days | No |
| David | GROWTH | ACTIVE | 18 days ago | In 12 days | No |

**Total MRR (Monthly Recurring Revenue):**
- 2x STARTER @ $49 = $98
- 2x GROWTH @ $149 = $298
- 2x SCALE @ $499 = $998
- **Total: $1,394/month**

---

## Crawl History

### Recent Crawls

```
Completed Crawls (Last 24 hours):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Sarah's Fashion Boutique
   Pages: 28 | Issues: 5 | Duration: 45s
   Started: 2h ago | Completed: 2h ago

✅ Tech Startup Blog
   Pages: 42 | Issues: 8 | Duration: 62s
   Started: 5h ago | Completed: 5h ago

✅ Enterprise E-commerce
   Pages: 156 | Issues: 12 | Duration: 180s
   Started: 1h ago | Completed: 1h ago

✅ Alex Electronics Shop
   Pages: 34 | Issues: 6 | Duration: 48s
   Started: 6h ago | Completed: 6h ago
```

### Historical Crawls

Each connected site also has 1-2 older crawl records (15+ days old) showing crawl history and issue detection over time.

---

## Usage Records

### Current Period Usage

```
January 2024 Usage (Per User):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sarah Johnson (STARTER):
  Sites Used:     1 / 3
  Fixes Applied:  12 / 500
  Crawls:         3
  Usage: 2%

Michael Chen (GROWTH):
  Sites Used:     2 / 10
  Fixes Applied:  45 / 5000
  Crawls:         8
  Usage: 1%

Jennifer Williams (SCALE):
  Sites Used:     3 / ∞
  Fixes Applied:  128 / ∞
  Crawls:         15
  Usage: -

Alex Martinez (STARTER):
  Sites Used:     1 / 3
  Fixes Applied:  8 / 500
  Crawls:         2
  Usage: 2%

David Thompson (GROWTH):
  Sites Used:     3 / 10
  Fixes Applied:  67 / 5000
  Crawls:         12
  Usage: 1%
```

---

## Data Relationships

### Entity Relationship Overview

```
User
├── Subscriptions (1)
├── Connections (1-∞)
│   ├── Issues (0-∞)
│   │   └── Fixes (0-∞)
│   ├── Metrics (31 per site)
│   └── Crawls (1-∞)
├── Notifications (0-∞)
├── AuditLogs (0-∞)
├── AIConversations (0-∞)
├── Webhooks (0-∞)
├── UsageRecords (1 per month)
└── TeamMemberships (0-∞)
    └── Team
        ├── Connections (0-∞)
        └── Members (1-∞)
```

---

## Accessing Seed Data

### Via Prisma Studio

```bash
npm run db:studio
```

Then navigate to:
- **http://localhost:5555**
- Browse all tables
- View relationships
- Edit records
- Execute queries

### Via API (If authenticated)

```bash
# List all users
curl http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"

# List connections
curl http://localhost:3000/api/connections \
  -H "Authorization: Bearer YOUR_TOKEN"

# List issues
curl http://localhost:3000/api/issues \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Via Database Query

```sql
-- Count all seeded data
SELECT
  (SELECT COUNT(*) FROM "User") as users,
  (SELECT COUNT(*) FROM "Connection") as connections,
  (SELECT COUNT(*) FROM "Issue") as issues,
  (SELECT COUNT(*) FROM "Fix") as fixes,
  (SELECT COUNT(*) FROM "Metric") as metrics,
  (SELECT COUNT(*) FROM "Notification") as notifications,
  (SELECT COUNT(*) FROM "AuditLog") as audit_logs;
```

---

## Next Steps After Seeding

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Open Prisma Studio:**
   ```bash
   npm run db:studio
   ```

3. **Test Dashboard Pages:**
   - `/dashboard` - Overview with metrics
   - `/dashboard/sites` - All connections
   - `/dashboard/issues` - SEO issues list
   - `/dashboard/fixes` - Applied fixes history
   - `/dashboard/analytics` - Performance charts

4. **Test Admin Pages:**
   - `/admin` - Admin overview
   - `/admin/users` - User management
   - `/admin/sites` - All sites view

5. **Test API Endpoints:**
   - See [API_REFERENCE.md](API_REFERENCE.md)

---

**Remember:** This is demo data for development only. Never use in production!

**To reset and start fresh:** `npm run db:reset`
