# Dashboard Testing Guide

## Quick Start

### Option 1: Test with Seed Data (Recommended)

Run the seed script to populate realistic test data:

```bash
npm run seed
```

This creates:
- **3 demo users** (Starter, Growth, and Scale plans)
- **Multiple sites** (Shopify and WordPress connections)
- **20+ SEO issues** with varying severities
- **15+ fixes** (applied, pending, and failed)
- **Metrics and notifications**

### Option 2: Test with Fresh Database

1. Clear your database:
```bash
npx prisma migrate reset
```

2. Start the development server:
```bash
npm run dev
```

3. Sign in with Clerk - your user will be auto-created!

## Demo User Accounts

After running `npm run seed`, you can test with these demo accounts:

### Admin User
- **Email**: `admin@seology.ai`
- **Plan**: Scale (unlimited)
- **Execution Mode**: Plan
- **Sites**: 2 connections with multiple issues

### Regular User #1 (Starter Plan)
- **Email**: `sarah@example.com`
- **Plan**: Starter (3 sites, 500 fixes/month)
- **Execution Mode**: Approve
- **Sites**: 1 Shopify store

### Regular User #2 (Growth Plan)
- **Email**: `michael@techstartup.io`
- **Plan**: Growth (10 sites, 5000 fixes/month)
- **Execution Mode**: Plan
- **Sites**: 1 WordPress site

### Regular User #3 (Scale Plan)
- **Email**: `lisa@enterprise.com`
- **Plan**: Scale (unlimited)
- **Execution Mode**: Automatic
- **Sites**: 2 connections

## Testing Each Dashboard Page

### 1. Main Dashboard (`/dashboard`)

**What to Test:**
- User welcome message appears
- Stats show correct counts (sites, issues, fixes)
- Usage percentage calculated correctly
- Recent activity list shows user's sites
- Chart displays weekly trends
- Quick actions link to correct pages
- Getting started checklist (for new users)

**Expected Data:**
- Sites count from database
- Active issues count
- Fixes applied this month
- Usage percentage based on plan

### 2. Sites Page (`/dashboard/sites`)

**What to Test:**
- All connected sites display
- Platform icons show correctly (🛍️ Shopify, 📝 WordPress)
- Connection status badges (Connected, Pending, Error)
- Active issues count per site
- Total fixes count per site
- Last sync date displays
- Click site card to navigate to detail page
- Empty state when no sites (new users)

**Expected Data:**
- List of user's connections
- Real issue/fix counts per connection
- Connection status from database

### 3. Issues Page (`/dashboard/issues`)

**What to Test:**
- Issue stats show correct totals
- Issue table populates with real data
- Severity badges color-coded correctly
- Issue types formatted (snake_case → Title Case)
- Page URLs clickable and open in new tab
- Site domain displays
- Detection date formatted
- "Fixed" status shows when fix applied
- Issue type breakdown chart
- Empty state when no issues

**Expected Data:**
- Total, Critical, High, and Medium issue counts
- Full list of open issues
- Issue type aggregation

### 4. Fixes Page (`/dashboard/fixes`)

**What to Test:**
- Stats show correct counts (total, pending, applied, rollbacks)
- Execution mode displays user's setting
- Execution mode description matches setting
- Fixes table shows all fixes
- Status badges color-coded
- Applied date displays
- Rollback deadline calculated correctly
- Days left for rollback shown
- Action buttons (Approve/Rollback) visible when appropriate
- Empty state when no fixes

**Expected Data:**
- Fix counts by status
- Execution mode from user record
- Rollback deadlines (90 days from applied date)
- Fix status and details

### 5. Settings Page (`/dashboard/settings`)

**What to Test:**
- Profile information displays from Clerk
- Current plan shows correctly
- Execution mode radio buttons
- Correct mode selected based on database
- All three modes listed
- Plan badge displays

**Expected Data:**
- User's first/last name
- User's email
- Current plan (Starter/Growth/Scale)
- Current execution mode (Automatic/Plan/Approve)

### 6. Analytics Page (`/dashboard/analytics`)

**What to Test:**
- Mock data displays correctly
- Charts render properly
- Metrics cards show demo numbers
- Recent AI actions list displays
- SEO score trend chart visible

**Note:** This page intentionally uses mock data for visualization. Real data integration pending metrics collection.

## Common Testing Scenarios

### Scenario 1: New User First Login
1. Sign in with a new Clerk account
2. User auto-created in database
3. Redirected to onboarding (if not completed)
4. Dashboard shows empty states
5. CTAs guide to connect first site

### Scenario 2: User with Sites but No Issues
1. User has connections in database
2. Sites page shows connections
3. Issues page shows empty state
4. Fixes page shows empty state
5. Dashboard shows 0 active issues

### Scenario 3: User with Issues and Fixes
1. User has connections with issues
2. Dashboard stats populated
3. Issues page shows full table
4. Fixes page shows applied/pending fixes
5. Usage tracking shows monthly consumption

### Scenario 4: User Approaching Limits
1. User has used 450/500 fixes (90% usage)
2. Dashboard shows warning (red indicator)
3. Usage bar fills to 90%
4. Warning message suggests upgrade

## Database Seed Data Details

### Sites Created
- **Shopify stores**: 2-3 with product pages
- **WordPress blogs**: 2-3 with blog posts
- **Issue density**: 3-10 issues per site
- **Fix history**: Mix of applied, pending, and failed

### Issue Types
- Missing meta descriptions
- Missing alt text on images
- Broken internal links
- Duplicate content
- Poor heading structure
- Slow page speed
- Missing canonical tags

### Fix Statuses
- **PENDING**: Awaiting approval (Approve mode)
- **APPLIED**: Successfully applied with rollback available
- **ROLLED_BACK**: Previously applied but reverted
- **FAILED**: Attempted but failed to apply

### Metrics Generated
- Daily metrics for last 30 days
- Traffic trends
- Issue counts over time
- Fix success rates

## Resetting Test Data

### Full Reset
```bash
npx prisma migrate reset
npm run seed
```

### Partial Reset (keep users, clear activity)
```bash
npx prisma db execute --file prisma/reset.ts
npm run seed
```

## Verification Checklist

- [ ] Main dashboard loads without errors
- [ ] Stats display real numbers (not 0 or "demo")
- [ ] Sites page shows connections
- [ ] Issues page shows real issues or empty state
- [ ] Fixes page shows real fixes or empty state
- [ ] Settings page shows user's plan and mode
- [ ] No "Something went wrong" errors
- [ ] No console errors in browser
- [ ] Navigation works between all pages
- [ ] Empty states show helpful CTAs
- [ ] Data updates when navigating back

## API Testing

### Test Dashboard Stats Endpoint
```bash
# While logged in, check the API response
curl http://localhost:3000/api/dashboard/stats \
  -H "Cookie: YOUR_CLERK_SESSION_COOKIE"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "sitesCount": 2,
    "activeIssuesCount": 15,
    "fixesThisMonth": 8,
    "fixLimit": 500,
    "usagePercent": 2,
    "recentActivity": [...]
  }
}
```

## Troubleshooting

### Issue: "User not found" error
**Solution:** User auto-creation should happen. Check:
1. Database connection working
2. Clerk authentication successful
3. Check console logs for errors

### Issue: Dashboard shows 0 for everything
**Solution:** Run seed script:
```bash
npm run seed
```

### Issue: "clerkId already exists" error
**Solution:** You're trying to create a user that exists. Either:
1. Use a different Clerk account
2. Reset the database: `npx prisma migrate reset`

### Issue: Empty states everywhere
**Solution:** This is normal for new users! Either:
1. Connect a site manually
2. Use seed data for testing: `npm run seed`

### Issue: TypeScript errors
**Solution:** Regenerate Prisma client:
```bash
npx prisma generate
```

## Performance Notes

- All pages use server-side rendering
- Data fetched on page load (no client-side loading)
- Dashboard stats use SWR (refreshes every 30s)
- Queries optimized with proper filtering
- No N+1 query problems

## Next Features to Test (When Implemented)

- [ ] Approve fix action
- [ ] Rollback fix action
- [ ] Filter issues by severity/type
- [ ] Filter fixes by status
- [ ] Search functionality
- [ ] Execution mode switching
- [ ] Site connection flow
- [ ] Real-time notifications
- [ ] Analytics with real metrics
- [ ] Pagination on large datasets

## Support

If you encounter issues:
1. Check console logs in browser (F12)
2. Check server logs in terminal
3. Verify database connection
4. Confirm Clerk setup
5. Review DASHBOARD_FIXES_SUMMARY.md for implementation details
