# Onboarding Quick Start Guide

## Setup (5 minutes)

### 1. Run Database Migration

```bash
cd app-saas

# Push schema changes to database
npx prisma db push

# Generate Prisma client with new fields
npx prisma generate
```

### 2. Verify Files Created

All onboarding files have been created. Verify they exist:

```bash
# Components
ls components/onboarding/
# Should show: WizardLayout.tsx, WelcomeStep.tsx, ConnectSiteStep.tsx,
#              ScanningStep.tsx, ReviewIssuesStep.tsx, ExecutionModeStep.tsx,
#              FirstFixStep.tsx, CompleteStep.tsx, index.ts

# Main page
ls app/(dashboard)/onboarding/
# Should show: page.tsx

# API routes
ls app/api/onboarding/
# Should show: connect/, scan/, execution-mode/, apply-fix/, complete/
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Test the Flow

1. **Sign Up:** Go to http://localhost:3000/sign-up
2. **Create Account:** Enter email/password
3. **Auto-Redirect:** Should redirect to `/onboarding`
4. **Complete Flow:** Go through all 7 steps
5. **Dashboard:** Should land on `/dashboard` after completion

---

## File Overview

### Components (8 files)

```
components/onboarding/
├── WizardLayout.tsx        # Progress bar (7 steps)
├── WelcomeStep.tsx         # Step 1: Hero & value props
├── ConnectSiteStep.tsx     # Step 2: Platform selection
├── ScanningStep.tsx        # Step 3: Animated scan
├── ReviewIssuesStep.tsx    # Step 4: Issues breakdown
├── ExecutionModeStep.tsx   # Step 5: Automation choice
├── FirstFixStep.tsx        # Step 6: Fix application
├── CompleteStep.tsx        # Step 7: Success screen
└── index.ts                # Exports
```

### Pages (1 file)

```
app/(dashboard)/onboarding/
└── page.tsx                # Main orchestrator
```

### API Routes (5 files)

```
app/api/onboarding/
├── connect/route.ts        # POST: Create connection
├── scan/route.ts           # POST: Save scan results
├── execution-mode/route.ts # PATCH: Update mode
├── apply-fix/route.ts      # POST: Apply first fix
└── complete/route.ts       # PATCH: Mark complete
```

### Database (1 file)

```
prisma/
└── schema.prisma           # Updated User model
```

### Middleware (1 file)

```
middleware.ts               # Redirect logic
```

---

## Testing Checklist

### Basic Flow
- [ ] Sign up creates new user
- [ ] New user redirects to `/onboarding`
- [ ] Step 1 displays correctly
- [ ] Can navigate to Step 2
- [ ] Platform selection works
- [ ] Domain input accepts text
- [ ] "Connect Site" button calls API
- [ ] API creates Connection record
- [ ] Step 3 scanning animation runs
- [ ] Stats increment during scan
- [ ] Auto-advances to Step 4
- [ ] Step 4 shows issues
- [ ] Can navigate to Step 5
- [ ] Execution mode selection works
- [ ] Step 6 fix animation plays
- [ ] Before/After toggle works
- [ ] Step 7 completion screen shows
- [ ] "Go to Dashboard" redirects
- [ ] Dashboard loads successfully

### Database
- [ ] User record exists
- [ ] `onboardingCompleted` = false initially
- [ ] Connection created with correct platform
- [ ] Issues created with severities
- [ ] Fix created with before/after states
- [ ] `onboardingCompleted` = true after completion
- [ ] AuditLog entries created

### Middleware
- [ ] New users can't access `/dashboard` before onboarding
- [ ] Completed users can't access `/onboarding`
- [ ] API routes always accessible
- [ ] Public routes (sign-in/up) accessible

---

## Common Customizations

### Change Step Count

To modify the number of steps, edit:

**File:** `components/onboarding/WizardLayout.tsx`
```typescript
const STEPS: Step[] = [
  { number: 1, title: 'Welcome', description: 'Get started' },
  // Add or remove steps here
]
```

### Modify Scanning Duration

**File:** `components/onboarding/ScanningStep.tsx`
```typescript
const interval = setInterval(() => {
  // ...
}, 800)  // Change delay (milliseconds)
```

### Add More Platforms

**File:** `components/onboarding/ConnectSiteStep.tsx`
```typescript
const platforms = [
  // Add new platform object:
  {
    id: 'wix' as Platform,
    name: 'Wix',
    description: 'Wix website builder',
    icon: Globe,
    popular: false,
  },
]
```

Don't forget to update:
- `prisma/schema.prisma`: Add to `Platform` enum
- Run `npx prisma db push`

### Change Primary Color

Currently green-600. To change:

**Search & Replace:** Find all instances of:
- `bg-green-600` → `bg-purple-600`
- `text-green-600` → `text-purple-600`
- `border-green-500` → `border-purple-500`

Files to update:
- All `/components/onboarding/*.tsx` files
- `/app/(dashboard)/onboarding/page.tsx`

### Skip Onboarding (For Testing)

To bypass onboarding for a user:

```sql
-- In database
UPDATE users
SET "onboardingCompleted" = true
WHERE email = 'test@example.com';
```

Or create API endpoint:
```typescript
// app/api/admin/skip-onboarding/route.ts
await prisma.user.update({
  where: { clerkUserId: userId },
  data: { onboardingCompleted: true }
})
```

---

## Troubleshooting

### Issue: "Module not found: Can't resolve '@/lib/db'"

**Solution:** Ensure `lib/db.ts` exists and exports `prisma`:

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Issue: "Middleware not redirecting"

**Solution:** Check:
1. User record exists in database
2. `clerkUserId` matches authenticated user
3. `onboardingCompleted` field exists (run migration)
4. No errors in console/logs

### Issue: "API endpoints return 401 Unauthorized"

**Solution:** Ensure:
1. Clerk middleware is protecting routes
2. User is authenticated
3. Session cookie is present
4. `CLERK_SECRET_KEY` env var is set

### Issue: "Prisma errors about missing fields"

**Solution:**
```bash
# Reset database (⚠️ loses data)
npx prisma db push --force-reset

# Or migrate
npx prisma migrate dev --name add_onboarding_fields

# Regenerate client
npx prisma generate
```

### Issue: "Scanning animation freezes"

**Solution:** Check browser console for errors. Common causes:
- `onComplete` callback not defined
- State update failed
- Component unmounted during animation

---

## Performance Tips

### 1. Optimize Middleware

Current implementation queries database on every request. For production, consider:

```typescript
// Cache user onboarding status in session
// Or use Redis for fast lookups
```

### 2. Lazy Load Components

```typescript
// app/(dashboard)/onboarding/page.tsx
import dynamic from 'next/dynamic'

const WelcomeStep = dynamic(() =>
  import('@/components/onboarding/WelcomeStep').then(m => ({ default: m.WelcomeStep }))
)
```

### 3. Prefetch Next Step Data

```typescript
// Prefetch connection data while user reads Step 1
useEffect(() => {
  // Warmup API routes
  fetch('/api/onboarding/connect', { method: 'HEAD' })
}, [])
```

---

## Analytics Integration

### Track Step Progress

```typescript
// In each step component
useEffect(() => {
  // Google Analytics
  gtag('event', 'onboarding_step', {
    step: 1,
    step_name: 'welcome'
  })

  // Mixpanel
  mixpanel.track('Onboarding Step', {
    step: 1,
    step_name: 'welcome'
  })
}, [])
```

### Track Completion

```typescript
// In CompleteStep.tsx
useEffect(() => {
  gtag('event', 'onboarding_complete', {
    completion_time: performance.now(),
    issues_found: issuesFound
  })
}, [])
```

### Track Drop-offs

```typescript
// In middleware or page component
if (user && !user.onboardingCompleted) {
  analytics.track('Onboarding Incomplete', {
    last_step: user.onboardingStep,
    days_since_signup: daysSince(user.createdAt)
  })
}
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Run database migration on production DB
- [ ] Test complete flow in staging environment
- [ ] Verify environment variables are set
- [ ] Check middleware works with production domain
- [ ] Test with real Shopify/WordPress sites
- [ ] Ensure API rate limits are configured
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure analytics tracking
- [ ] Test mobile responsiveness
- [ ] Review security (API authentication, etc.)

---

## Next Steps

After onboarding is working:

1. **Add Resume Capability**
   - Save `onboardingStep` in User model
   - Allow users to resume where they left off

2. **Email Notifications**
   - Send welcome email after signup
   - Remind users to complete onboarding after 24h

3. **Skip Option**
   - Add "Skip for now" button
   - Allow direct access to dashboard

4. **Video Tutorial**
   - Embed explainer video in WelcomeStep
   - Use Loom, Wistia, or YouTube

5. **A/B Testing**
   - Test different value propositions
   - Try different execution mode defaults
   - Measure impact on completion rate

6. **Help Chat**
   - Integrate Intercom or Crisp
   - Provide live support during onboarding

---

## Support

For issues or questions:

1. Check `ONBOARDING.md` for detailed documentation
2. Review `ONBOARDING-FLOW.md` for visual diagrams
3. Inspect browser console for errors
4. Check database records in Prisma Studio:
   ```bash
   npx prisma studio
   ```
5. Review API logs in terminal

---

## Quick Commands

```bash
# Start dev server
npm run dev

# View database
npx prisma studio

# Reset database (⚠️ loses data)
npx prisma db push --force-reset

# Check TypeScript errors
npm run lint

# Build for production
npm run build

# Test production build locally
npm run build && npm start
```

---

## Success!

Your onboarding flow is ready to use. Test it thoroughly and iterate based on user feedback. Good luck!
