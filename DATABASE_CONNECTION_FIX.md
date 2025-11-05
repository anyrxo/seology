# Database Connection Pool Fix Guide

## Problem
You're getting this error:
```
Timed out fetching a new connection from the connection pool
(Current connection pool timeout: 10, connection limit: 1)
```

The issue is that your Supabase DATABASE_URL is configured with `connection_limit=1`, which only allows ONE concurrent database connection. This causes timeouts when multiple queries try to run simultaneously (like layouts + pages).

## Solution

### Step 1: Update Your DATABASE_URL in Vercel

Your current DATABASE_URL likely looks like this:
```
postgresql://postgres:[password]@[host]:5432/postgres?connection_limit=1
```

You need to change it to use **Transaction Mode** with a higher connection limit:

```
postgresql://postgres:[password]@[host]:6543/postgres?pgbouncer=true&connection_limit=10
```

**Key Changes:**
1. Port: `5432` → `6543` (Supabase's pooler port)
2. Add: `?pgbouncer=true` (enables connection pooling)
3. Change: `connection_limit=1` → `connection_limit=10` (allows 10 concurrent connections)

### Step 2: Update in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/
2. Click on your `seology` project
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. Click **Edit**
6. Update the value with the new URL (port 6543 + pgbouncer=true + connection_limit=10)
7. Click **Save**
8. **Redeploy** your application

### Step 3: Also Update DIRECT_URL (for writes)

Your DIRECT_URL should use the direct connection (port 5432) for write operations:

```
postgresql://postgres:[password]@[host]:5432/postgres
```

This URL should NOT have `pgbouncer=true` and should NOT have a connection limit.

## Why This Happens

### Supabase Connection Modes

Supabase provides two connection endpoints:

1. **Direct Connection (Port 5432)**
   - Best for: Migrations, admin tasks
   - Limit: 5-15 connections total
   - Problem: Vercel serverless functions create many instances

2. **Pooled Connection (Port 6543) - PgBouncer**
   - Best for: Serverless, high concurrency
   - Limit: Up to 1000+ connections
   - Solution: Use this for DATABASE_URL

### Why connection_limit=1 Was Set

This is Supabase's default for the Free tier or when using direct connections. It prevents exhausting your connection pool, but causes timeouts with Next.js layouts that make multiple sequential queries.

## Alternative Solution (If You Can't Change URL)

If you can't modify the DATABASE_URL for some reason, you can implement **React Server Context** to pass user data from layout to pages without additional queries:

```typescript
// app/(admin)/AdminContext.tsx
import { createContext } from 'react'

export const AdminContext = createContext<{ userEmail: string } | null>(null)

// app/(admin)/layout.tsx
import { AdminContext } from './AdminContext'

export default async function AdminLayout({ children }) {
  const user = await db.user.findUnique(...)

  return (
    <AdminContext.Provider value={{ userEmail: user.email }}>
      {/* layout */}
      {children}
    </AdminContext.Provider>
  )
}

// app/(admin)/admin/users/page.tsx
import { use } from 'react'
import { AdminContext } from '../../AdminContext'

export default function UsersPage() {
  const adminData = use(AdminContext)
  // No need to query user again!
}
```

But this is more complex - **updating the DATABASE_URL is the proper fix**.

## Verification

After updating and redeploying, check the Vercel logs. You should see:
- No more "connection pool timeout" errors
- Admin pages load quickly
- Multiple admin pages can be accessed simultaneously

## Additional Resources

- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma Connection Pool](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Vercel + Supabase Setup](https://vercel.com/guides/using-databases-with-vercel)

## Need Help?

If you're still seeing issues after updating the DATABASE_URL:
1. Check the Vercel logs for the exact error
2. Verify the port is 6543 (not 5432)
3. Ensure `pgbouncer=true` is in the URL
4. Try setting `connection_limit=20` for even more headroom
