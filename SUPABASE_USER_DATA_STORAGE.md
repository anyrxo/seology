# Supabase User Data Storage

## Yes! All User Data is Stored in Supabase PostgreSQL

Your Supabase database stores **everything** about users, their accounts, connected sites, and onboarding information.

---

## 1. User Account Data (`User` table)

### Authentication & Identity
```typescript
{
  id: "uuid",                 // Unique user ID
  clerkId: "clerk_user_123",  // Clerk authentication ID
  email: "user@example.com",  // User email
  name: "John Doe",           // User's name
  role: "USER" | "ADMIN",     // User role
  plan: "STARTER" | "GROWTH" | "SCALE"  // Subscription plan
}
```

### Onboarding Information (Stored in User table)
```typescript
{
  // Onboarding Progress
  onboardingCompleted: false,    // Has user finished onboarding?
  onboardingStep: 0,             // Current step (0-6)

  // Business Information (collected during onboarding)
  businessName: "My Store",      // Business name
  businessType: "E-commerce",    // E-commerce, SaaS, Local Business, etc.
  businessStage: "Growing",      // Just Starting, Growing, Established
  platform: "Shopify"            // Initial platform choice
}
```

### Subscription & Billing
```typescript
{
  stripeCustomerId: "cus_123",
  stripeSubscriptionId: "sub_456",
  executionMode: "AUTOMATIC" | "PLAN" | "APPROVE"
}
```

### Timestamps
```typescript
{
  createdAt: "2024-01-15T10:30:00Z",  // Account creation date
  updatedAt: "2024-01-20T15:45:00Z"   // Last update
}
```

---

## 2. Connected Sites Data (`Connection` table)

When users connect a Shopify store or WordPress site, all connection data is stored:

```typescript
{
  id: "uuid",
  userId: "user_uuid",               // Links to User table

  // Platform Details
  platform: "SHOPIFY" | "WORDPRESS" | "WEBFLOW" | "CUSTOM",
  domain: "mystore.myshopify.com",
  displayName: "My Store",

  // Connection Status
  status: "CONNECTED" | "PENDING" | "ERROR",
  lastSync: "2024-01-20T10:00:00Z",

  // Encrypted Credentials (AES-256-GCM encryption)
  accessToken: "encrypted_token_here",
  refreshToken: "encrypted_refresh_token",
  credentials: "{JSON with platform-specific data}",

  // Site Health
  healthStatus: "healthy" | "warning" | "error",
  pageCount: 150,
  issueCount: 23,
  lastCrawlAt: "2024-01-20T09:00:00Z",

  createdAt: "2024-01-15T10:30:00Z"
}
```

### Example: Shopify Connection Credentials (stored in `credentials` JSON field)
```json
{
  "shopId": 12345678,
  "name": "My Awesome Store",
  "email": "owner@mystore.com",
  "domain": "mystore.com",
  "myshopifyDomain": "mystore.myshopify.com",
  "primaryDomain": "mystore.com",
  "currency": "USD",
  "timezone": "America/New_York",
  "shopOwner": "John Doe",
  "phone": "+1-555-0123",
  "address": {
    "address1": "123 Main St",
    "city": "New York",
    "country": "United States",
    "zip": "10001"
  },
  "planName": "shopify_plus",
  "productCount": 450,
  "collectionCount": 25,
  "customerCount": 1250,
  "connectedAt": "2024-01-15T10:30:00Z"
}
```

---

## 3. Onboarding Flow Data Storage

During the onboarding wizard, data is saved progressively:

### Step 1: Welcome
- Just displays introduction, no data saved

### Step 2: Business Information (saved to `User` table)
```typescript
await db.user.update({
  where: { clerkId: userId },
  data: {
    businessName: "My Store",
    businessType: "E-commerce",
    businessStage: "Growing",
    platform: "Shopify",
    onboardingStep: 2
  }
})
```

### Step 3: Connect First Site (creates `Connection` record)
```typescript
await db.connection.create({
  data: {
    userId: user.id,
    platform: "SHOPIFY",
    domain: "mystore.myshopify.com",
    displayName: "My Store",
    accessToken: encryptedToken,
    credentials: JSON.stringify(shopMetadata),
    status: "CONNECTED"
  }
})
```

### Step 4-6: Scanning, Issues, Execution Mode
- Updates `Connection` with scan results
- Creates `Issue` records for detected problems
- Updates `User.executionMode`

### Step 7: Complete
```typescript
await db.user.update({
  where: { clerkId: userId },
  data: {
    onboardingCompleted: true,
    onboardingStep: 7
  }
})
```

---

## 4. Additional User Data Stored

### Issues Detected on Sites
```typescript
{
  id: "uuid",
  connectionId: "connection_uuid",
  type: "MISSING_META_DESCRIPTION",
  title: "Homepage missing meta description",
  severity: "HIGH",
  pageUrl: "https://mystore.com/",
  status: "OPEN",
  createdAt: "2024-01-20T10:00:00Z"
}
```

### Fixes Applied
```typescript
{
  id: "uuid",
  connectionId: "connection_uuid",
  issueId: "issue_uuid",
  description: "Added meta description to homepage",
  status: "SUCCESS",
  appliedAt: "2024-01-20T10:05:00Z",
  beforeState: "{...}",
  afterState: "{...}",
  canRollback: true
}
```

### Notifications
```typescript
{
  id: "uuid",
  userId: "user_uuid",
  type: "connection_success",
  title: "Shopify Store Connected",
  message: "Successfully connected My Store with 450 products...",
  read: false,
  createdAt: "2024-01-20T10:00:00Z"
}
```

### Usage Tracking
```typescript
{
  id: "uuid",
  userId: "user_uuid",
  period: "2024-01",
  fixesUsed: 45,
  fixesLimit: 500,
  sitesConnected: 2,
  sitesLimit: 3
}
```

### Audit Logs (every action)
```typescript
{
  id: "uuid",
  userId: "user_uuid",
  connectionId: "connection_uuid",
  action: "SHOPIFY_CONNECTED",
  resource: "connection",
  details: "{...}",
  timestamp: "2024-01-20T10:00:00Z"
}
```

---

## 5. Database Location

**Your Supabase PostgreSQL Database:**
- Host: `db.prisma.io:5432`
- Database: `postgres`
- Connection: Via Prisma Accelerate (with direct connection fallback)

**Connection Strings (in `.env.local`):**
```bash
# Read-optimized (with Prisma Accelerate caching)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."

# Write-optimized (direct connection)
DIRECT_URL="postgres://username:password@db.prisma.io:5432/postgres?sslmode=require"
```

---

## 6. Data Security

### Encryption at Rest
- All data encrypted by Supabase (AES-256)
- Database backups encrypted
- SSL/TLS for all connections

### Application-Level Encryption
```typescript
// Sensitive tokens encrypted before storage
import { encrypt, decrypt } from '@/lib/encryption'

// Store encrypted
const encryptedToken = encrypt(shopifyAccessToken)
await db.connection.create({
  data: {
    accessToken: encryptedToken  // Stored encrypted
  }
})

// Decrypt when needed
const decryptedToken = decrypt(connection.accessToken)
```

### Row Level Security (RLS)
- Users can only access their own data
- See `supabase/rls-policies.sql` for complete policies
- Example policy:
```sql
CREATE POLICY "Users can read own connections"
ON "Connection"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User".id = "Connection"."userId"
    AND "User"."clerkId" = auth.uid()::text
  )
);
```

---

## 7. Querying User Data

### Get User with All Connected Sites
```typescript
const user = await db.user.findUnique({
  where: { clerkId: userId },
  include: {
    connections: {
      include: {
        issues: true,
        fixes: true
      }
    },
    notifications: {
      where: { read: false },
      orderBy: { createdAt: 'desc' }
    }
  }
})
```

### Get Onboarding Status
```typescript
const user = await db.user.findUnique({
  where: { clerkId: userId },
  select: {
    onboardingCompleted: true,
    onboardingStep: true,
    businessName: true,
    businessType: true,
    businessStage: true,
    platform: true
  }
})
```

### Get All Sites for User
```typescript
const sites = await db.connection.findMany({
  where: { userId: user.id },
  select: {
    id: true,
    platform: true,
    domain: true,
    displayName: true,
    status: true,
    pageCount: true,
    issueCount: true,
    lastCrawlAt: true
  }
})
```

---

## 8. Data Retention

### Active Data
- User accounts: Permanent (until user deletes account)
- Connected sites: Permanent (until user disconnects)
- Issues: Permanent (until resolved or archived)
- Fixes: Permanent (90-day rollback window)

### Automatic Cleanup
```typescript
// Fix rollback data deleted after 90 days
await db.fix.updateMany({
  where: {
    appliedAt: { lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
    canRollback: true
  },
  data: {
    beforeState: null,
    canRollback: false
  }
})
```

### Soft Deletes
```typescript
// Sites marked as deleted, not actually deleted
await db.connection.update({
  where: { id: connectionId },
  data: { status: 'DISCONNECTED' }
})
```

---

## 9. Accessing Your Supabase Database

### Via Prisma Studio (GUI)
```bash
npx prisma studio
```
Opens at `http://localhost:5555` - browse all tables visually

### Via Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to "Table Editor" - view/edit data
4. Go to "SQL Editor" - run custom queries

### Via SQL
```sql
-- View all users
SELECT id, email, name, plan, "onboardingCompleted", "businessName"
FROM "User"
ORDER BY "createdAt" DESC;

-- View user's connected sites
SELECT c.id, c.platform, c.domain, c."displayName", c.status
FROM "Connection" c
INNER JOIN "User" u ON u.id = c."userId"
WHERE u."clerkId" = 'clerk_user_123';
```

---

## Summary

✅ **User accounts** → Stored in Supabase `User` table
✅ **Login/authentication** → Managed by Clerk, user ID stored in Supabase
✅ **Onboarding info** (business name, type, stage) → Stored in Supabase `User` table
✅ **Connected sites** (Shopify, WordPress) → Stored in Supabase `Connection` table
✅ **Site credentials** → Encrypted and stored in Supabase
✅ **SEO issues** → Stored in Supabase `Issue` table
✅ **Applied fixes** → Stored in Supabase `Fix` table
✅ **Notifications** → Stored in Supabase `Notification` table
✅ **Usage tracking** → Stored in Supabase `UsageRecord` table
✅ **Audit logs** → Stored in Supabase `AuditLog` table

**Everything is in your Supabase PostgreSQL database!** 🎉

You can view it all at: https://supabase.com/dashboard or run `npx prisma studio`
