# Admin Dashboard - Setup Guide

## Quick Start (5 Minutes)

### Step 1: Configure Admin Access
Add your email to the environment variables:

```bash
# .env.local
ADMIN_EMAILS=your-email@example.com

# Or use user IDs
ADMIN_USER_IDS=user_2abc123def456
```

### Step 2: Restart Development Server
```bash
npm run dev
```

### Step 3: Access Admin Dashboard
Navigate to: `http://localhost:3000/admin`

That's it! You're now an admin.

---

## Detailed Setup

### Method 1: Environment Variables (Recommended for Development)

**Step 1**: Add to `.env.local`
```env
# Comma-separated list of admin emails
ADMIN_EMAILS=admin@seology.ai,support@seology.ai

# Or comma-separated list of Clerk user IDs
ADMIN_USER_IDS=user_2abc123,user_2def456
```

**Step 2**: Restart the server
```bash
npm run dev
```

**Pros**:
- Quick setup
- Easy to change
- Good for development

**Cons**:
- Requires server restart
- Not ideal for production

---

### Method 2: Clerk Metadata (Recommended for Production)

**Step 1**: Go to Clerk Dashboard
1. Navigate to: https://dashboard.clerk.com
2. Go to: Users → Select User
3. Click: "Metadata" tab

**Step 2**: Add Public Metadata
```json
{
  "role": "admin"
}
```

**Step 3**: Save and refresh
No server restart needed!

**Pros**:
- No server restart required
- Centralized management
- Production-ready
- Can be managed through Clerk API

**Cons**:
- Requires Clerk Dashboard access

---

### Method 3: Database Role (Advanced)

**Step 1**: Add role field to User model
```prisma
// prisma/schema.prisma
model User {
  // ... existing fields
  role String @default("user") // "user" or "admin"
}
```

**Step 2**: Run migration
```bash
npx prisma migrate dev --name add_user_role
```

**Step 3**: Update admin.ts
```typescript
// lib/admin.ts
export async function isAdmin(): Promise<boolean> {
  const user = await currentUser()
  if (!user) return false

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    select: { role: true }
  })

  return dbUser?.role === 'admin'
}
```

**Pros**:
- Full control
- Database-driven
- Easy to query

**Cons**:
- Requires schema changes
- More complex setup

---

## Verification

### Test Admin Access

**1. Check if you're an admin:**
```typescript
// In any server component
import { isAdmin } from '@/lib/admin'

export default async function TestPage() {
  const adminStatus = await isAdmin()
  return <div>Admin: {adminStatus ? 'Yes' : 'No'}</div>
}
```

**2. Access the admin dashboard:**
```
http://localhost:3000/admin
```

**3. Try an admin API endpoint:**
```bash
curl -X GET http://localhost:3000/api/admin/stats \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

---

## Troubleshooting

### Issue: "Unauthorized" when accessing /admin

**Check 1**: Verify your email in environment
```bash
# In terminal
echo $ADMIN_EMAILS
# Should output your email
```

**Check 2**: Verify you're logged in
- Go to any page
- Check if you see the user button in header
- If not, sign in at `/sign-in`

**Check 3**: Check Clerk metadata
- Go to Clerk Dashboard
- Users → Your User → Metadata
- Verify `role: "admin"` is set

**Check 4**: Restart the server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Issue: API returns 403 Forbidden

**Solution**: The admin check is working correctly. You need to:
1. Sign in as an admin user
2. Make requests with valid session token
3. Verify admin access is configured

### Issue: Layout redirects to /dashboard

**Cause**: You're not an admin user

**Solution**:
1. Add your email to `ADMIN_EMAILS`
2. Or set `role: "admin"` in Clerk metadata
3. Restart server if using environment variables

---

## Security Best Practices

### 1. Use Environment Variables in Development
```env
# .env.local (not committed to git)
ADMIN_EMAILS=dev@example.com
```

### 2. Use Clerk Metadata in Production
```json
// In Clerk Dashboard
{
  "publicMetadata": {
    "role": "admin"
  }
}
```

### 3. Never Hardcode Admin Emails
```typescript
// ❌ BAD
const ADMINS = ['admin@example.com']

// ✅ GOOD
const ADMINS = process.env.ADMIN_EMAILS?.split(',') || []
```

### 4. Audit All Admin Actions
```typescript
// Already implemented in all admin API routes
await db.auditLog.create({
  data: {
    userId: admin.id,
    action: 'admin_action_name',
    resource: 'resource_type',
    resourceId: 'resource_id',
    details: { /* action details */ }
  }
})
```

### 5. Use HTTPS in Production
```env
# In production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

---

## Production Deployment

### Vercel Deployment

**Step 1**: Add environment variables in Vercel
1. Go to: Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   ```
   Name: ADMIN_EMAILS
   Value: admin@seology.ai,support@seology.ai
   ```

**Step 2**: Deploy
```bash
git push origin main
```

**Step 3**: Verify
Navigate to: `https://your-domain.com/admin`

### Alternative: Railway, Render, AWS

Same process - add environment variables in your hosting platform's dashboard.

---

## Managing Multiple Admins

### Add Admin via Environment
```env
ADMIN_EMAILS=admin1@seology.ai,admin2@seology.ai,admin3@seology.ai
```

### Add Admin via Clerk
For each user:
1. Clerk Dashboard → Users → Select User
2. Metadata → Public Metadata
3. Add: `{ "role": "admin" }`

### Add Admin via API (Advanced)
```typescript
// Create an API endpoint to promote users
// POST /api/admin/promote-user
await db.user.update({
  where: { id: userId },
  data: { role: 'admin' }
})

// Then update Clerk metadata
await clerkClient.users.updateUser(userId, {
  publicMetadata: { role: 'admin' }
})
```

---

## Environment Variables Reference

### Required for Admin Access
```env
# Choose ONE method:

# Method 1: Email-based
ADMIN_EMAILS=admin@seology.ai,support@seology.ai

# Method 2: User ID-based
ADMIN_USER_IDS=user_2abc123,user_2def456
```

### Other Required Variables
```env
# Database
DATABASE_URL=postgresql://...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## Next Steps

After setting up admin access:

1. **Explore the Dashboard**
   - `/admin` - Overview
   - `/admin/users` - User management
   - `/admin/sites` - Sites overview
   - `/admin/issues` - Issues monitoring
   - `/admin/jobs` - Background jobs
   - `/admin/analytics` - Platform analytics

2. **Test Admin APIs**
   ```bash
   # Get platform stats
   curl http://localhost:3000/api/admin/stats

   # List users
   curl http://localhost:3000/api/admin/users?page=1&limit=10

   # List sites
   curl http://localhost:3000/api/admin/sites
   ```

3. **Review Audit Logs**
   ```sql
   -- In your database
   SELECT * FROM audit_logs
   WHERE action LIKE 'admin_%'
   ORDER BY created_at DESC
   LIMIT 10;
   ```

4. **Customize as Needed**
   - Add more admin pages
   - Create custom API endpoints
   - Enhance security
   - Add notifications

---

## Support

If you encounter issues:

1. **Check the logs**
   ```bash
   # Server logs
   npm run dev
   # Check console for errors
   ```

2. **Verify database connection**
   ```bash
   npx prisma studio
   # Opens Prisma Studio to view database
   ```

3. **Test admin function**
   ```typescript
   // In any server component
   import { isAdmin, getAdminUser } from '@/lib/admin'

   const adminStatus = await isAdmin()
   console.log('Admin:', adminStatus)

   if (adminStatus) {
     const adminUser = await getAdminUser()
     console.log('Admin user:', adminUser?.emailAddresses)
   }
   ```

4. **Check middleware**
   - Verify `middleware.ts` has admin route protection
   - Ensure it's not blocking admin access

---

## Quick Reference

### Admin Pages
- `/admin` - Overview dashboard
- `/admin/users` - User management
- `/admin/sites` - Sites management
- `/admin/issues` - Issues monitoring
- `/admin/jobs` - Jobs monitoring
- `/admin/analytics` - Analytics

### Admin API Routes
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - List users
- `POST /api/admin/users/:id/upgrade` - Upgrade user
- `GET /api/admin/sites` - List sites
- `POST /api/admin/trigger-cleanup` - Run cleanup
- `POST /api/admin/broadcast` - Send broadcast

### Admin Utilities
```typescript
import { isAdmin, requireAdmin, getAdminUser } from '@/lib/admin'

// Check if user is admin (returns boolean)
const isUserAdmin = await isAdmin()

// Require admin access (throws error if not admin)
await requireAdmin()

// Get admin user details
const admin = await getAdminUser()
```

---

**You're all set! Access your admin dashboard at `/admin`**
