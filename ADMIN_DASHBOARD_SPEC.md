# Complete Admin Dashboard Specification

## Your Vision ✅

**One powerful admin panel where you can:**
- See all customers and their data
- View all connected stores
- See all connections, issues, fixes
- Manage pending invites
- Add stores for customers
- Full control over the entire SaaS

---

## Admin Dashboard Pages

### 1. Admin Overview (`/admin`)
**KPIs & Metrics**
```
┌─────────────────────────────────────────────────────┐
│  SEOLOGY Admin Dashboard                            │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Total Customers: 127      Active Plans: $12,450/mo │
│  Total Stores: 189         Issues Found: 3,421      │
│  Fixes Applied: 8,934      Success Rate: 94%        │
│                                                      │
├─────────────────────────────────────────────────────┤
│  Recent Activity                                     │
│  ● New signup: john@example.com (STARTER)           │
│  ● Store connected: mystore.com                     │
│  ● Fix applied: Meta tags updated                   │
│  ● Issue detected: Broken links on acme.com         │
└─────────────────────────────────────────────────────┘
```

### 2. Customers Page (`/admin/customers`)
**All customers with full details**
```
┌─────────────────────────────────────────────────────┐
│  Search: [________]  Filter: [All Plans ▼]  Export  │
├─────────────────────────────────────────────────────┤
│  Customer         Plan      Stores  Issues  Status  │
├─────────────────────────────────────────────────────┤
│  john@example.com GROWTH    3       45      Active  │
│  jane@store.com   STARTER   1       12      Trial   │
│  acme@corp.com    SCALE     10      234     Active  │
│                                                      │
│  [View Details] [Edit] [Impersonate] [Delete]      │
└─────────────────────────────────────────────────────┘
```

**Customer Details Modal:**
- Account info (name, email, phone)
- Plan details & billing
- Connected stores list
- Usage stats (fixes used, sites connected)
- Activity log
- Quick actions (upgrade, suspend, delete)

### 3. Stores/Connections Page (`/admin/connections`)
**All connected stores across all customers**
```
┌─────────────────────────────────────────────────────┐
│  Search: [________]  Platform: [All ▼]  Status: ▼   │
├─────────────────────────────────────────────────────┤
│  Store              Customer         Platform  Status│
├─────────────────────────────────────────────────────┤
│  mystore.com        john@example.com Shopify  ✅    │
│  blog.wordpress.com jane@store.com   WordPress ✅    │
│  acme-shop.com      acme@corp.com    Shopify  ⚠️    │
│                                                      │
│  [View Details] [Reconnect] [Scan Now] [Delete]    │
└─────────────────────────────────────────────────────┘
```

**Connection Details:**
- Shop metadata (products, collections, etc.)
- Last crawl date
- Issues found
- Fixes applied
- Access token status
- Crawl logs

### 4. Add Connection Page (`/admin/connections/add`) ✅ ALREADY BUILT
**Manually add stores for customers**

### 5. Pending Invites Page (`/admin/invites`)
**Manage customer invitations**
```
┌─────────────────────────────────────────────────────┐
│  [+ Create Invite]                                   │
├─────────────────────────────────────────────────────┤
│  Email             Shop Domain       Status  Actions │
├─────────────────────────────────────────────────────┤
│  client@mail.com   clientstore.com   Pending [Resend]│
│  user@example.com  userstore.com     Accepted ✅     │
│  test@test.com     testshop.com      Expired [Delete]│
└─────────────────────────────────────────────────────┘
```

**Create Invite Modal:**
```
Email: [___________________]
Shop Domain: [_____________].myshopify.com
Plan: [STARTER ▼]
Personal Message: [Optional note...]

[Generate Invite Link] [Send Email]
```

### 6. Issues Page (`/admin/issues`)
**All SEO issues across all stores**
```
┌─────────────────────────────────────────────────────┐
│  Severity: [All ▼]  Type: [All ▼]  Status: [Open ▼] │
├─────────────────────────────────────────────────────┤
│  Issue              Store          Severity  Status  │
├─────────────────────────────────────────────────────┤
│  Missing meta desc  mystore.com    HIGH     Open    │
│  Broken link        shop.com       MEDIUM   Fixed   │
│  Slow page speed    acme.com       LOW      Open    │
│                                                      │
│  [View Details] [Apply Fix] [Ignore]                │
└─────────────────────────────────────────────────────┘
```

### 7. Fixes Page (`/admin/fixes`)
**All applied fixes across all stores**
```
┌─────────────────────────────────────────────────────┐
│  Status: [All ▼]  Date: [Last 30 days ▼]           │
├─────────────────────────────────────────────────────┤
│  Fix                Store       Status   Date        │
├─────────────────────────────────────────────────────┤
│  Updated meta tags  store.com   Success  2h ago     │
│  Fixed broken link  shop.com    Success  5h ago     │
│  Added alt text     acme.com    Failed   1d ago     │
│                                                      │
│  [View Details] [Rollback] [Retry]                  │
└─────────────────────────────────────────────────────┘
```

### 8. Jobs Queue Page (`/admin/jobs`)
**Background job monitoring**
```
┌─────────────────────────────────────────────────────┐
│  Type: [All ▼]  Status: [All ▼]  [Refresh]         │
├─────────────────────────────────────────────────────┤
│  Job Type      Store       Status      Started      │
├─────────────────────────────────────────────────────┤
│  CRAWL_SITE    store.com   Processing  2m ago       │
│  ANALYZE_SITE  shop.com    Pending     -            │
│  APPLY_FIX     acme.com    Completed   10m ago      │
│                                                      │
│  [View Logs] [Cancel] [Retry]                       │
└─────────────────────────────────────────────────────┘
```

### 9. Analytics Page (`/admin/analytics`)
**Business metrics & insights**
```
┌─────────────────────────────────────────────────────┐
│  Revenue                                             │
│  $12,450 MRR    ↑ 23% from last month               │
│  [Revenue Chart]                                     │
│                                                      │
│  Customer Growth                                     │
│  127 customers  ↑ 15 new this month                 │
│  [Growth Chart]                                      │
│                                                      │
│  Usage Stats                                         │
│  8,934 fixes applied                                │
│  3,421 issues detected                              │
│  94% success rate                                    │
└─────────────────────────────────────────────────────┘
```

### 10. System Health (`/admin/system`)
**Monitor system status**
```
┌─────────────────────────────────────────────────────┐
│  Database: ✅ Healthy    API: ✅ Up                 │
│  Jobs Queue: ✅ Running  Storage: ✅ 45% used       │
│                                                      │
│  Recent Errors:                                      │
│  ⚠️ Shopify API timeout - store.com - 2h ago        │
│  ⚠️ Crawl failed - shop.com - 5h ago                │
│                                                      │
│  [View Full Logs] [Run Diagnostics]                 │
└─────────────────────────────────────────────────────┘
```

---

## Database Schema for Admin Features

Already have most tables, need to add:

```prisma
// Add to existing User model
model User {
  // ... existing fields

  // Admin features
  role Role @default(USER) // Already exists ✅
  lastLoginAt DateTime?
  loginCount Int @default(0)

  // Invites sent by this user (if admin)
  sentInvitations Invitation[] @relation("InvitedBy")
}

// New: Invitation system
model Invitation {
  id String @id @default(uuid())

  // Who to invite
  email String
  shopDomain String?

  // Invite details
  token String @unique // Secure token for invite link
  plan Plan @default(STARTER)
  message String? // Personal message from admin

  // Status
  status InvitationStatus @default(PENDING)
  acceptedAt DateTime?
  expiresAt DateTime

  // Who sent it
  invitedBy String
  inviter User @relation("InvitedBy", fields: [invitedBy], references: [id])

  // Who accepted it
  acceptedByUserId String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([token])
  @@index([status])
}

enum InvitationStatus {
  PENDING
  ACCEPTED
  EXPIRED
  CANCELLED
}

// New: Admin activity log
model AdminAction {
  id String @id @default(uuid())

  adminId String
  admin User @relation(fields: [adminId], references: [id])

  action String // "CREATED_USER", "DELETED_CONNECTION", etc.
  targetType String // "USER", "CONNECTION", "INVITATION"
  targetId String?

  details Json? // Additional context
  ipAddress String?
  userAgent String?

  createdAt DateTime @default(now())

  @@index([adminId])
  @@index([action])
  @@index([createdAt])
}
```

---

## Admin Authentication

### Making Your Account Admin

**Option 1: Direct Database Update**
```sql
-- In Supabase SQL Editor
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'your-email@example.com';
```

**Option 2: Via API Script**
```typescript
// scripts/make-admin.ts
import { db } from '@/lib/db'

const email = 'your-email@example.com'

const user = await db.user.update({
  where: { email },
  data: { role: 'ADMIN' }
})

console.log('✅ User is now admin:', user.email)
```

### Admin Route Protection

Already have `lib/middleware/admin-guard.ts` ✅

All `/admin/*` routes check:
```typescript
if (user.role !== 'ADMIN') {
  redirect('/dashboard') // Not authorized
}
```

---

## Admin Navigation Layout

```typescript
// app/(admin)/layout.tsx

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">SEOLOGY Admin</h1>
        </div>

        <nav className="mt-6">
          <NavLink href="/admin" icon="📊">Dashboard</NavLink>
          <NavLink href="/admin/customers" icon="👥">Customers</NavLink>
          <NavLink href="/admin/connections" icon="🔗">Connections</NavLink>
          <NavLink href="/admin/invites" icon="✉️">Invites</NavLink>
          <NavLink href="/admin/issues" icon="⚠️">Issues</NavLink>
          <NavLink href="/admin/fixes" icon="✅">Fixes</NavLink>
          <NavLink href="/admin/jobs" icon="⚙️">Jobs Queue</NavLink>
          <NavLink href="/admin/analytics" icon="📈">Analytics</NavLink>
          <NavLink href="/admin/system" icon="🖥️">System</NavLink>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <NavLink href="/dashboard" icon="👤">User View</NavLink>
            <button className="text-red-400">Logout</button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}
```

---

## API Routes for Admin

### Get All Customers
```typescript
// GET /api/admin/customers
{
  customers: [
    {
      id: "user_123",
      email: "john@example.com",
      name: "John Doe",
      plan: "GROWTH",
      status: "active",
      createdAt: "2024-01-15T10:00:00Z",
      connections: 3,
      issues: 45,
      fixes: 123,
      mrr: 99
    }
  ],
  total: 127,
  page: 1
}
```

### Get Customer Details
```typescript
// GET /api/admin/customers/[id]
{
  user: { /* full user object */ },
  connections: [ /* all connections */ ],
  recentIssues: [ /* last 10 issues */ ],
  recentFixes: [ /* last 10 fixes */ ],
  usageStats: {
    fixesUsed: 45,
    fixesLimit: 500,
    sitesConnected: 3,
    sitesLimit: 10
  },
  subscription: { /* Stripe data */ }
}
```

### Create Invitation
```typescript
// POST /api/admin/invites
{
  email: "client@example.com",
  shopDomain: "clientstore.myshopify.com",
  plan: "STARTER",
  message: "Welcome to SEOLOGY!"
}

// Response:
{
  inviteUrl: "https://seology.ai/invite/abc123token",
  expiresAt: "2024-02-15T10:00:00Z"
}
```

### Impersonate User
```typescript
// POST /api/admin/impersonate
{
  userId: "user_123"
}

// Response:
{
  impersonationToken: "temp_token_456",
  redirectUrl: "/dashboard"
}

// Allows admin to view dashboard as that user
```

---

## Key Features

### 1. Customer Management
- View all customers
- Filter by plan, status, signup date
- Search by email/name
- Edit customer details
- Upgrade/downgrade plans
- Suspend/delete accounts
- Impersonate users (see their dashboard)
- Export customer list (CSV)

### 2. Connection Management
- View all connections across all customers
- Filter by platform (Shopify, WordPress)
- Search by domain
- See connection health
- Manually add connections for customers ✅ Already built
- Reconnect failed connections
- Trigger manual scans
- View crawl logs

### 3. Invitation System
- Create invite links for prospects
- Pre-configure plan and shop domain
- Track invitation status (pending, accepted, expired)
- Resend invitations
- Bulk invite creation
- Custom onboarding messages

### 4. Issue Tracking
- See all issues across all stores
- Filter by severity, type, status
- Assign issues to team members
- Bulk fix application
- Issue analytics (most common issues)

### 5. Fix Monitoring
- Track all fixes applied
- View success/failure rates
- Rollback failed fixes
- Retry failed operations
- Fix history per store

### 6. Job Queue
- Monitor background jobs
- See processing status
- View error logs
- Retry failed jobs
- Cancel stuck jobs
- Job performance metrics

### 7. Analytics
- Revenue tracking (MRR, ARR)
- Customer growth charts
- Churn analysis
- Usage statistics
- Popular features
- System performance

### 8. System Health
- Database status
- API health checks
- Job queue status
- Storage usage
- Error monitoring
- Performance metrics

---

## Quick Actions

Throughout admin dashboard, provide quick actions:

```typescript
// Customer quick actions
- 🚀 Upgrade to GROWTH
- 📧 Send email
- 🔄 Reset password
- ⏸️ Suspend account
- 👁️ Impersonate
- 🗑️ Delete account

// Connection quick actions
- 🔍 Scan now
- 🔄 Reconnect
- 📊 View analytics
- ⚙️ Edit settings
- 🗑️ Disconnect

// Issue quick actions
- ✅ Apply fix
- 🔇 Ignore
- 📋 Assign to team
- 📅 Schedule fix
```

---

## Implementation Priority

### Week 1: Core Admin Pages
- [ ] Admin layout with navigation
- [ ] Dashboard overview page
- [ ] Customers list page
- [ ] Customer details page
- [ ] Connections list page ✅ (already have add page)

### Week 2: Management Features
- [ ] Invitation system (create, send, track)
- [ ] Issues list page
- [ ] Fixes list page
- [ ] Jobs queue monitoring

### Week 3: Advanced Features
- [ ] Analytics page
- [ ] System health monitoring
- [ ] Impersonation feature
- [ ] Bulk operations

### Week 4: Polish & Optimization
- [ ] Export functionality
- [ ] Search & filters
- [ ] Real-time updates
- [ ] Mobile responsive design

---

Ready to build this admin dashboard? Want me to start with the main dashboard page and customers list?
