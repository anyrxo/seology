# Deployment Fix Summary

## Issues Identified

### 1. Database Schema Out of Sync
**Error:** `PrismaClientKnownRequestError: The column User.dailyAutomationEnabled does not exist in the current database.`

**Root Cause:** The production database schema was not updated to match the Prisma schema file. The local schema includes new fields that were never pushed to production:

- `User.dailyAutomationEnabled` (Boolean, default: false)
- `User.dailyAutomationTime` (String, default: "09:00")
- `User.dailyAutomationTimezone` (String, default: "UTC")
- `User.dailyReportEmail` (Boolean, default: true)
- `User.dailyReportDashboard` (Boolean, default: true)
- `User.lastAutomationRun` (DateTime)

Plus many other new models and fields added since last deployment.

### 2. Dynamic Server Usage Errors
**Error:** Routes causing "DYNAMIC_SERVER_USAGE" errors during build

**Root Cause:** Some API routes were missing the `export const dynamic = 'force-dynamic'` configuration, causing Next.js to try to statically optimize routes that use dynamic features (auth, headers, etc.).

## Fixes Applied

### 1. Updated package.json Build Scripts

**File:** `package.json`

**Changes:**
```json
{
  "scripts": {
    "build": "prisma generate && prisma db push --skip-generate && next build",
    "vercel-build": "prisma generate && prisma db push --skip-generate && next build"
  }
}
```

**What This Does:**
- `prisma generate` - Generates the Prisma Client based on schema.prisma
- `prisma db push --skip-generate` - Pushes schema changes to the database WITHOUT regenerating the client (already done in previous step)
- `next build` - Builds the Next.js application

**Why It Works:**
- Ensures database schema is ALWAYS in sync before building
- Uses `db push` instead of `migrate` for simpler deployment (no migration files needed)
- The `--skip-generate` flag prevents redundant client generation
- Both `build` and `vercel-build` scripts updated for consistency

### 2. Added Dynamic Export to Chat Route

**File:** `app/api/chat/route.ts`

**Change:**
```typescript
// Force dynamic rendering for this API route to prevent static optimization issues
export const dynamic = 'force-dynamic'
```

**Why It Works:**
- Tells Next.js to never try to statically optimize this route
- Required because route uses `auth()` from Clerk which accesses request headers
- Prevents build-time errors related to dynamic server usage

## Database Schema Status

### Current Schema Overview

The Prisma schema (`prisma/schema.prisma`) includes these major models:

1. **User** - 28 fields including authentication, plans, execution modes, onboarding state, daily automation settings
2. **Connection** - Website connections (Shopify, WordPress, etc.)
3. **Issue** - Detected SEO issues
4. **Fix** - Applied fixes with rollback capability
5. **AIConversation** & **ChatMessage** - AI chat system
6. **Job** - Background job queue
7. **Subscription** - Stripe billing
8. **Notification** - In-app notifications
9. **Webhook** - Webhook management
10. **Team**, **TeamMember**, **TeamInvitation** - Team collaboration
11. **UsageRecord** - Monthly usage tracking
12. **AICreditPurchase** - AI credit purchases
13. **PendingPlan** - Fix plans (PLAN execution mode)
14. **Broadcast** - Admin broadcast messages
15. **Page** - Page-level SEO tracking
16. **Keyword** - Keyword tracking
17. **KeywordRanking** - Ranking history
18. **AIInsight** - AI-powered insights
19. **ContentSuggestion** - Content optimization suggestions
20. **ImageAsset** - Image SEO tracking
21. **DailyReport** - Daily automation reports
22. **AutomationSnapshot** - Intelligent rollback system

### Fields That Were Missing in Production

The following fields in the `User` model were causing the deployment failure:

```prisma
// Daily Automation Settings
dailyAutomationEnabled Boolean  @default(false)
dailyAutomationTime    String?  @default("09:00") // HH:MM format in user's timezone
dailyAutomationTimezone String? @default("UTC")
dailyReportEmail       Boolean  @default(true) // Send email report
dailyReportDashboard   Boolean  @default(true) // Send to dashboard inbox
lastAutomationRun      DateTime?
```

These fields support the daily automation feature that allows users to schedule automatic SEO scans and fixes.

## Verification Steps

After deployment, verify the following:

### 1. Database Schema Sync
```bash
# Connect to production database and verify tables exist
npx prisma db pull --preview-feature
# Compare with local schema
```

### 2. API Routes Working
Test these critical routes:
- `GET /api/chat` - AI chat endpoint
- `GET /api/user/profile` - User profile
- `GET /api/dashboard/stats` - Dashboard stats
- `GET /api/issues/[id]` - Issue details
- `GET /api/sites/[id]` - Site details

### 3. Build Succeeds
```bash
npm run build
# Should complete without errors
```

## Environment Variables Required

Ensure all these are set in Vercel:

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...  # Optional for connection pooling

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/onboarding

# Anthropic Claude AI
ANTHROPIC_API_KEY=sk-ant-...

# Stripe (Billing)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Shopify OAuth
SHOPIFY_CLIENT_ID=...
SHOPIFY_CLIENT_SECRET=...

# Encryption (32 characters)
ENCRYPTION_KEY=...

# Cron Secret
CRON_SECRET=...

# App URL
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Additional Routes with Dynamic Export

These routes already have proper dynamic configuration:

- `app/api/issues/[id]/route.ts` - ✓
- `app/api/sites/[id]/route.ts` - ✓
- `app/api/user/profile/route.ts` - ✓
- `app/api/dashboard/stats/route.ts` - ✓
- `app/api/chat/route.ts` - ✓ (just added)

## Deployment Checklist

- [x] Updated build script to push schema
- [x] Added dynamic export to chat route
- [x] Verified other critical routes have dynamic exports
- [ ] Deploy to Vercel
- [ ] Verify build succeeds
- [ ] Test API routes
- [ ] Verify database has all tables/columns
- [ ] Test user authentication flow
- [ ] Test AI chat functionality

## Potential Future Issues

### 1. Migration Strategy
Currently using `prisma db push` which is great for development but for production you may want to:
- Use `prisma migrate` for versioned migrations
- Add a separate migration step before build
- Keep migration history in git

### 2. Schema Changes
When adding new fields:
1. Update `prisma/schema.prisma`
2. Run `npx prisma db push` locally to test
3. Commit changes
4. Deploy (build script will auto-push schema)

### 3. Breaking Changes
For breaking schema changes (removing columns, changing types):
1. Create a manual migration script
2. Run migration before deployment
3. Then deploy new code

## Files Modified

1. `package.json` - Updated build and vercel-build scripts
2. `app/api/chat/route.ts` - Added dynamic export
3. `DEPLOYMENT_FIX_SUMMARY.md` - This file (documentation)

## Next Steps

1. **Commit these changes:**
   ```bash
   git add package.json app/api/chat/route.ts DEPLOYMENT_FIX_SUMMARY.md
   git commit -m "Fix: Update build script to sync database schema and add dynamic exports to API routes"
   git push
   ```

2. **Deploy to Vercel:**
   - Vercel will automatically detect the changes and deploy
   - The build script will now push schema changes before building

3. **Monitor deployment:**
   - Check Vercel build logs for any errors
   - Verify API routes are working
   - Test critical user flows

4. **If issues persist:**
   - Check Vercel environment variables are all set
   - Verify database URL is correct and accessible
   - Check database has necessary permissions for schema changes

## Additional Notes

### Why `db push` instead of `migrate`?

`prisma db push` is simpler for this use case:
- No migration files to manage
- Idempotent (safe to run multiple times)
- Perfect for development and prototype deployments
- Will create tables/columns if missing
- Won't drop existing data

For a mature production app, you'd want to use `prisma migrate` instead for:
- Version-controlled migrations
- Rollback capability
- Team collaboration on schema changes
- Audit trail of all database changes

### Database Permissions

Ensure your database user has these permissions:
- CREATE TABLE
- ALTER TABLE
- CREATE INDEX
- DROP (for rollback scenarios)

Most managed PostgreSQL services (Supabase, Railway, Neon) provide these by default.
