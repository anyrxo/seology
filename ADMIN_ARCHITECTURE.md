# Admin Dashboard - Technical Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                               │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                        Browser                                    │ │
│  │  User navigates to /admin                                        │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           MIDDLEWARE LAYER                              │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                    middleware.ts                                  │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │ 1. Check if route is /admin or /api/admin                   │ │ │
│  │  │ 2. Verify user is authenticated (Clerk)                     │ │ │
│  │  │ 3. Allow request to proceed to layout/route                 │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          LAYOUT LAYER                                   │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                app/(admin)/layout.tsx                             │ │
│  │  ┌─────────────────────────────────────────────────────────────┐ │ │
│  │  │ 1. Call isAdmin() from lib/admin.ts                         │ │ │
│  │  │ 2. If not admin, redirect to /dashboard                     │ │ │
│  │  │ 3. If admin, render AdminSidebar + AdminHeader + children   │ │ │
│  │  └─────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          PAGE LAYER                                     │
│  ┌────────────────┬────────────────┬────────────────┬────────────────┐ │
│  │    Overview    │     Users      │     Sites      │    Issues      │ │
│  │  /admin/       │ /admin/users   │ /admin/sites   │ /admin/issues  │ │
│  │  page.tsx      │ /page.tsx      │ /page.tsx      │ /page.tsx      │ │
│  └────────────────┴────────────────┴────────────────┴────────────────┘ │
│  ┌────────────────┬────────────────┬────────────────────────────────┐  │
│  │     Jobs       │   Analytics    │                                │  │
│  │ /admin/jobs    │ /admin/analytics                              │  │
│  │  /page.tsx     │ /page.tsx      │                                │  │
│  └────────────────┴────────────────┴────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                     │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                      Prisma ORM                                   │ │
│  │  db.user.findMany()                                              │ │
│  │  db.connection.findMany()                                        │ │
│  │  db.issue.findMany()                                             │ │
│  │  db.auditLog.create()                                            │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        DATABASE LAYER                                   │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │                      PostgreSQL                                   │ │
│  │  tables: users, connections, issues, fixes, audit_logs          │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Admin Authentication Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                      Admin Access Request                            │
└──────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Step 1: Clerk Authentication                                        │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ - Check if user has valid session                              │  │
│  │ - Get user ID from Clerk                                       │  │
│  │ - If not authenticated → redirect to /sign-in                  │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Step 2: Admin Authorization Check (lib/admin.ts)                   │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ isAdmin() function checks 3 sources:                           │  │
│  │                                                                │  │
│  │ 1. Environment Variables                                       │  │
│  │    ├─ ADMIN_USER_IDS: user_123,user_456                      │  │
│  │    └─ ADMIN_EMAILS: admin@seology.ai                         │  │
│  │                                                                │  │
│  │ 2. Clerk Metadata                                             │  │
│  │    └─ publicMetadata.role === 'admin'                        │  │
│  │                                                                │  │
│  │ 3. Custom Logic (optional)                                    │  │
│  │    └─ Database role check                                     │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌────────────────────┐  ┌────────────────────┐
        │   Is Admin = TRUE  │  │  Is Admin = FALSE  │
        └────────────────────┘  └────────────────────┘
                    │                       │
                    │                       ▼
                    │           ┌────────────────────┐
                    │           │ Redirect to        │
                    │           │ /dashboard         │
                    │           └────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Step 3: Render Admin Interface                                     │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ - AdminLayout with AdminSidebar + AdminHeader                 │  │
│  │ - Admin page content (overview, users, sites, etc.)           │  │
│  │ - Full access to admin features                               │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## API Request Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│              Admin API Request                                       │
│  POST /api/admin/users/:id/upgrade                                  │
└──────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Middleware (middleware.ts)                                          │
│  ├─ Check authentication                                            │
│  └─ Ensure /api/admin/* routes require auth                         │
└──────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│  API Route Handler (app/api/admin/users/[id]/upgrade/route.ts)     │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ 1. Call requireAdmin() - throws error if not admin            │  │
│  │ 2. Get admin user info with getAdminUser()                    │  │
│  │ 3. Validate request body                                      │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌────────────────────┐  ┌────────────────────┐
        │   Admin = TRUE     │  │  Admin = FALSE     │
        └────────────────────┘  └────────────────────┘
                    │                       │
                    │                       ▼
                    │           ┌────────────────────┐
                    │           │ Return 403         │
                    │           │ Unauthorized       │
                    │           └────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Database Operations                                                 │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ 1. Update user plan in database                               │  │
│  │    db.user.update({ where: { id }, data: { plan } })         │  │
│  │                                                                │  │
│  │ 2. Create audit log                                           │  │
│  │    db.auditLog.create({                                       │  │
│  │      userId: admin.id,                                        │  │
│  │      action: 'admin_plan_upgrade',                            │  │
│  │      resource: 'user',                                        │  │
│  │      resourceId: userId,                                      │  │
│  │      details: { newPlan, adminEmail }                         │  │
│  │    })                                                          │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Return Response                                                     │
│  {                                                                   │
│    "success": true,                                                  │
│    "data": { "id": "...", "plan": "GROWTH", ... }                  │
│  }                                                                   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
app/(admin)/layout.tsx
│
├─ AdminSidebar (components/admin/AdminSidebar.tsx)
│  ├─ Logo
│  ├─ Navigation
│  │  ├─ Overview (/admin)
│  │  ├─ Users (/admin/users)
│  │  ├─ Sites (/admin/sites)
│  │  ├─ Issues (/admin/issues)
│  │  ├─ Jobs (/admin/jobs)
│  │  └─ Analytics (/admin/analytics)
│  └─ Back to Dashboard link
│
├─ AdminHeader (components/admin/AdminHeader.tsx)
│  ├─ Admin Mode Badge
│  ├─ Search Bar
│  ├─ Notifications
│  └─ User Menu (Clerk UserButton)
│
└─ Main Content Area
   │
   ├─ app/(admin)/admin/page.tsx
   │  ├─ Stats Cards (Users, Subs, Sites, Issues)
   │  ├─ Sites by Platform Chart
   │  ├─ Issues by Severity Chart
   │  ├─ Recent Activity Feed
   │  └─ System Health Status
   │
   ├─ app/(admin)/admin/users/page.tsx
   │  ├─ User Stats Cards
   │  ├─ Search Bar
   │  ├─ User Table
   │  └─ Pagination
   │
   ├─ app/(admin)/admin/sites/page.tsx
   │  ├─ Site Stats Cards
   │  ├─ Search/Filter
   │  ├─ Sites Table
   │  └─ Pagination
   │
   ├─ app/(admin)/admin/issues/page.tsx
   │  ├─ Issue Stats Cards
   │  ├─ Category Breakdown
   │  ├─ Issues Table
   │  └─ Pagination
   │
   ├─ app/(admin)/admin/jobs/page.tsx
   │  ├─ Job Stats Cards
   │  ├─ Jobs Table
   │  └─ Recent Job Runs
   │
   └─ app/(admin)/admin/analytics/page.tsx
      ├─ Key Metrics Cards
      ├─ Plan Distribution Chart
      ├─ Platform Distribution Chart
      ├─ Recent Signups
      └─ Recent Connections
```

---

## Data Flow

### Page Load (Server-Side)

```
1. User navigates to /admin/users
                │
                ▼
2. Next.js Server Component
   - Runs on server
   - No JavaScript sent to client for data fetching
                │
                ▼
3. Fetch data with Prisma
   const users = await db.user.findMany({
     include: {
       subscription: true,
       connections: true,
       _count: { select: { connections: true } }
     }
   })
                │
                ▼
4. Render HTML with data
   - Server generates HTML
   - Sends to client
                │
                ▼
5. Client receives rendered page
   - Fast initial load
   - SEO-friendly
   - No loading spinners
```

### API Call (Client-Side)

```
1. User clicks "Upgrade Plan" button
                │
                ▼
2. Client-side JavaScript
   fetch('/api/admin/users/123/upgrade', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ plan: 'GROWTH' })
   })
                │
                ▼
3. Server API Route
   - Verify admin with requireAdmin()
   - Update database
   - Create audit log
                │
                ▼
4. Return JSON response
   { success: true, data: {...} }
                │
                ▼
5. Client updates UI
   - Show success message
   - Refresh data
   - Update UI state
```

---

## Security Layers

```
┌───────────────────────────────────────────────────────────────┐
│                    Layer 1: Middleware                        │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ - Ensures authentication on all /admin routes          │  │
│  │ - Blocks unauthenticated users                         │  │
│  │ - Clerk session validation                             │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                    Layer 2: Layout Check                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ - Calls isAdmin() to verify admin role                 │  │
│  │ - Redirects non-admins to /dashboard                   │  │
│  │ - Prevents UI access to admin features                 │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                  Layer 3: API Route Protection                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ - requireAdmin() throws error if not admin             │  │
│  │ - Protects against direct API access                   │  │
│  │ - Returns 403 for unauthorized requests                │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                    Layer 4: Audit Logging                     │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ - All admin actions logged to database                 │  │
│  │ - Includes user ID, action, timestamp, details         │  │
│  │ - Provides audit trail for compliance                  │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

---

## Database Schema (Relevant Tables)

```
┌─────────────────────────────────────────────────────────┐
│                     users                               │
├─────────────────────────────────────────────────────────┤
│ id              String    @id @default(uuid())          │
│ email           String    @unique                       │
│ clerkUserId     String    @unique                       │
│ plan            Plan      @default(STARTER)             │
│ executionMode   ExecutionMode                           │
│ createdAt       DateTime  @default(now())               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  connections                            │
├─────────────────────────────────────────────────────────┤
│ id              String    @id @default(uuid())          │
│ userId          String                                  │
│ platform        Platform                                │
│ domain          String                                  │
│ status          ConnectionStatus                        │
│ createdAt       DateTime  @default(now())               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                     issues                              │
├─────────────────────────────────────────────────────────┤
│ id              String    @id @default(uuid())          │
│ connectionId    String                                  │
│ type            String                                  │
│ severity        Severity                                │
│ status          IssueStatus                             │
│ detectedAt      DateTime  @default(now())               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  audit_logs                             │
├─────────────────────────────────────────────────────────┤
│ id              String    @id @default(uuid())          │
│ userId          String                                  │
│ action          String    (admin_plan_upgrade, etc.)    │
│ resource        String    (user, site, etc.)            │
│ resourceId      String                                  │
│ details         Json                                    │
│ createdAt       DateTime  @default(now())               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 subscriptions                           │
├─────────────────────────────────────────────────────────┤
│ id              String    @id @default(uuid())          │
│ userId          String    @unique                       │
│ status          SubscriptionStatus                      │
│ createdAt       DateTime  @default(now())               │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

```
┌──────────────────────────────────────────────────────────┐
│                     FRONTEND                             │
│  ┌────────────┬────────────┬────────────┬────────────┐  │
│  │  Next.js   │   React    │ TypeScript │  Tailwind  │  │
│  │    14      │    18      │    5.x     │    CSS     │  │
│  └────────────┴────────────┴────────────┴────────────┘  │
│  ┌────────────┬────────────┬────────────┬────────────┐  │
│  │ shadcn/ui  │   Lucide   │   Clerk    │            │  │
│  │ Components │   Icons    │  Auth UI   │            │  │
│  └────────────┴────────────┴────────────┴────────────┘  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                     BACKEND                              │
│  ┌────────────┬────────────┬────────────┬────────────┐  │
│  │  Next.js   │   Prisma   │ PostgreSQL │   Clerk    │  │
│  │ API Routes │    ORM     │  Database  │   Auth     │  │
│  └────────────┴────────────┴────────────┴────────────┘  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    DEPLOYMENT                            │
│  ┌────────────┬────────────┬────────────┬────────────┐  │
│  │   Vercel   │  Railway   │   Render   │    AWS     │  │
│  │ (Hosting)  │  (DB Host) │ (DB Host)  │ (Any VPS)  │  │
│  └────────────┴────────────┴────────────┴────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## Performance Optimizations

### 1. Server Components
- All admin pages are Server Components
- Data fetching happens on server
- Reduced client-side JavaScript

### 2. Database Queries
```typescript
// ✅ Good: Select only needed fields
const users = await db.user.findMany({
  select: {
    id: true,
    email: true,
    plan: true,
    createdAt: true
  }
})

// ❌ Bad: Fetch all fields
const users = await db.user.findMany()
```

### 3. Pagination
```typescript
// Limit results per page
const skip = (page - 1) * limit
const users = await db.user.findMany({
  skip,
  take: limit // Only fetch 50 users
})
```

### 4. Parallel Queries
```typescript
// ✅ Good: Fetch in parallel
const [users, sites, issues] = await Promise.all([
  db.user.findMany(),
  db.connection.findMany(),
  db.issue.findMany()
])

// ❌ Bad: Sequential
const users = await db.user.findMany()
const sites = await db.connection.findMany()
const issues = await db.issue.findMany()
```

---

## Monitoring Points

### 1. Application Metrics
- Page load times
- API response times
- Database query duration
- Error rates

### 2. Business Metrics
- Number of admin actions per day
- Most used admin features
- Admin user activity
- System health checks

### 3. Security Metrics
- Failed admin access attempts
- Unauthorized API calls
- Audit log entries
- Admin session duration

---

This architecture provides:
- ✅ Multiple layers of security
- ✅ Complete audit trail
- ✅ Scalable data fetching
- ✅ Type-safe with TypeScript
- ✅ Production-ready performance
- ✅ Easy to extend and maintain
