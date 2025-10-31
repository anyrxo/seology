# Seology.ai User Onboarding Experience

## Overview

Complete 7-step onboarding wizard that guides new users through connecting their first site, scanning for issues, choosing automation settings, and witnessing their first automated SEO fix.

## File Structure

```
app-saas/
├── app/
│   ├── (dashboard)/
│   │   └── onboarding/
│   │       └── page.tsx                    # Main onboarding orchestrator
│   └── api/
│       └── onboarding/
│           ├── connect/
│           │   └── route.ts                # POST: Connect first site
│           ├── scan/
│           │   └── route.ts                # POST: Save scan results
│           ├── execution-mode/
│           │   └── route.ts                # PATCH: Update execution mode
│           ├── apply-fix/
│           │   └── route.ts                # POST: Apply first fix
│           └── complete/
│               └── route.ts                # PATCH: Mark onboarding complete
├── components/
│   └── onboarding/
│       ├── WizardLayout.tsx                # Progress bar & step navigation
│       ├── WelcomeStep.tsx                 # Step 1: Welcome & value props
│       ├── ConnectSiteStep.tsx             # Step 2: Platform selection
│       ├── ScanningStep.tsx                # Step 3: Live scanning animation
│       ├── ReviewIssuesStep.tsx            # Step 4: Issues breakdown
│       ├── ExecutionModeStep.tsx           # Step 5: Choose automation level
│       ├── FirstFixStep.tsx                # Step 6: Watch first fix apply
│       ├── CompleteStep.tsx                # Step 7: Success & next steps
│       └── index.ts                        # Component exports
├── prisma/
│   └── schema.prisma                       # Updated User model
└── middleware.ts                           # Onboarding redirect logic
```

## User Journey

### Step 1: Welcome Screen
**Component:** `WelcomeStep.tsx`

- Hero message introducing Seology.ai
- 3 value proposition cards (Detection, Automation, Results)
- "What to Expect" section with 4 numbered steps
- Large "Get Started" CTA
- Estimated completion time (5 minutes)

**User Action:** Click "Get Started"

---

### Step 2: Connect First Site
**Component:** `ConnectSiteStep.tsx`

- Platform selection cards:
  - Shopify (Popular badge)
  - WordPress (Popular badge)
  - Custom Site
- Dynamic domain input based on platform
- Platform-specific instruction boxes
- Visual feedback for selected platform

**User Action:** Select platform → Enter domain → Click "Connect Site"

**API Call:** `POST /api/onboarding/connect`
- Creates Connection record
- Returns connectionId for subsequent steps

---

### Step 3: Initial Site Scan
**Component:** `ScanningStep.tsx`

- Animated scanning progress bar
- Live page-by-page crawl display
- Real-time stats cards:
  - Pages Scanned (incrementing)
  - Issues Found (incrementing with pulse)
  - Links Checked (incrementing)
- Issue severity breakdown with progress bars
- "What We're Checking" info box

**Simulation:** 10 pages scanned over ~8 seconds
- Generates random issue counts by severity
- Auto-advances to next step on completion

**API Call:** `POST /api/onboarding/scan`
- Creates Issue records in database
- Updates Connection.lastSync

---

### Step 4: Review Issues Found
**Component:** `ReviewIssuesStep.tsx`

- Summary stats grid (Critical, High, Medium, Low)
- Top 5 critical issues displayed:
  - Issue type with severity badge
  - Description and affected page
  - Impact explanation
- "Good News" message about automated fixes

**User Action:** Click "Continue to Setup"

---

### Step 5: Choose Execution Mode
**Component:** `ExecutionModeStep.tsx`

Three modes presented as detailed cards:

1. **Automatic** (Recommended)
   - Hands-free 24/7 fixes
   - No manual approval needed
   - Maximum time savings
   - Best for: Teams focused on strategy

2. **Plan & Review**
   - AI generates fix plans
   - Approve batches
   - Balance control & efficiency
   - Best for: Teams wanting oversight

3. **Approve Each Fix**
   - Full control over every change
   - See exact before/after
   - Perfect for learning
   - Best for: New users or strict approval processes

**User Action:** Select mode → Click "Continue"

**API Call:** `PATCH /api/onboarding/execution-mode`
- Updates User.executionMode

---

### Step 6: Apply First Fix
**Component:** `FirstFixStep.tsx`

Multi-stage animation showing fix application:

1. **Analyzing Issue** (2s)
   - "Claude is examining the missing meta description..."

2. **Generating Fix** (2s)
   - "Creating SEO-optimized meta description..."

3. **Applying Fix** (2s)
   - "Updating your website..."

4. **Verifying** (2s)
   - "Confirming the fix was applied successfully..."

5. **Complete**
   - Success message
   - "Show Before/After" button reveals:
     - Side-by-side code comparison
     - Before: Missing meta tag
     - After: SEO-optimized meta description
   - Claude's reasoning explanation
   - "Complete Onboarding" CTA

**API Call:** `POST /api/onboarding/apply-fix`
- Creates Fix record
- Updates Issue.status to FIXED
- Creates AuditLog entry

---

### Step 7: Complete!
**Component:** `CompleteStep.tsx`

- Success animation with pulsing checkmark
- Summary stats (1 Site, X Issues, 1 Fix)
- "What Happens Next" section:
  - Continuous monitoring
  - Automatic fixes
  - Progress tracking
  - Rollback protection
- Quick tips for getting started
- "Go to Dashboard" CTA

**User Action:** Click "Go to Dashboard"

**API Call:** `PATCH /api/onboarding/complete`
- Sets User.onboardingCompleted = true
- Creates AuditLog entry
- Redirects to /dashboard

---

## Progress Tracking

### WizardLayout Component

Visual progress indicator at top of every step:

- 7 numbered circles connected by lines
- States:
  - **Completed:** Green circle with checkmark
  - **Active:** Green border with number, shadow
  - **Pending:** Gray circle with number
- Step titles and descriptions shown below circles
- Responsive: Hides text on mobile, shows only circles

---

## Database Schema Updates

### User Model
```prisma
model User {
  // ... existing fields
  onboardingCompleted Boolean @default(false)
  onboardingStep      Int?    // Current step if in progress
  onboardingData      Json?   // Store progress data
}
```

### API Endpoints Created

1. **POST /api/onboarding/connect**
   - Input: `{ platform, domain }`
   - Output: `{ connectionId }`
   - Creates Connection record

2. **POST /api/onboarding/scan**
   - Input: `{ connectionId, stats }`
   - Output: `{ issuesCreated }`
   - Creates Issue records

3. **PATCH /api/onboarding/execution-mode**
   - Input: `{ executionMode }`
   - Updates User.executionMode

4. **POST /api/onboarding/apply-fix**
   - Input: `{ connectionId }`
   - Creates first Fix record
   - Updates Issue status

5. **PATCH /api/onboarding/complete**
   - Sets onboardingCompleted = true
   - Creates audit log

---

## Redirect Logic (middleware.ts)

### After Signup
- New users (onboardingCompleted = false) redirected to `/onboarding`
- Blocks access to:
  - `/dashboard`
  - `/sites`
  - `/settings`
  - `/billing`
  - `/analytics`

### After Onboarding Complete
- Users who completed onboarding redirected from `/onboarding` to `/dashboard`

### API Routes
- Not affected by onboarding redirects
- Always accessible

---

## Design System

### Colors
- **Primary Green:** `#10b981` (green-600)
- **Accent Colors:**
  - Critical: Red-600
  - High: Orange-600
  - Medium: Yellow-600
  - Low: Blue-600

### Components Used
- Button (from `@/components/ui/button`)
- Card (from `@/components/ui/card`)
- Badge (from `@/components/ui/badge`)

### Icons (lucide-react)
- Sparkles, Zap, Shield, TrendingUp
- CheckCircle2, AlertCircle, AlertTriangle
- Loader2, Search, Eye, Code
- ShoppingBag, FileText, Globe

### Animations
- Progress bars: Smooth transitions
- Scanning: Pulse on issues found
- Success: Pulsing checkmark
- Loading: Spinning icons

---

## Mobile Responsiveness

- Progress bar: Shows circles only on mobile
- Cards: Stack vertically on mobile
- Grid layouts: Collapse to single column
- Text: Responsive font sizes
- Buttons: Full-width on mobile

---

## State Management

### OnboardingPage State
```typescript
{
  platform: string
  domain: string
  scanStats: ScanStats | null
  executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE' | ''
  connectionId: string
}
```

### ScanStats Interface
```typescript
{
  pagesScanned: number
  issuesFound: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
}
```

---

## Error Handling

- API failures: Alert user, allow retry
- Connection errors: Show message, don't advance
- Network issues: Graceful degradation
- Database errors: Logged, user shown friendly message

---

## Analytics Tracking

All actions create AuditLog entries:
- `onboarding_started` (implicit from user creation)
- `connection_created`
- `issues_detected`
- `execution_mode_selected`
- `fix_applied`
- `onboarding_completed`

Useful for tracking:
- Drop-off rates per step
- Platform preferences
- Execution mode distribution
- Average completion time

---

## Testing Checklist

### User Flow
- [ ] New user signup redirects to /onboarding
- [ ] Step 1: Welcome screen displays correctly
- [ ] Step 2: Platform selection works
- [ ] Step 2: Domain input validates
- [ ] Step 3: Scanning animation runs
- [ ] Step 3: Stats increment properly
- [ ] Step 4: Issues display with correct severity
- [ ] Step 5: All 3 execution modes selectable
- [ ] Step 6: Fix application animation works
- [ ] Step 6: Before/After toggle works
- [ ] Step 7: Completion updates database
- [ ] After completion: Redirects to dashboard
- [ ] Returning user: Cannot access /onboarding

### API Endpoints
- [ ] POST /api/onboarding/connect creates Connection
- [ ] POST /api/onboarding/scan creates Issues
- [ ] PATCH /api/onboarding/execution-mode updates User
- [ ] POST /api/onboarding/apply-fix creates Fix
- [ ] PATCH /api/onboarding/complete sets flag

### Database
- [ ] User.onboardingCompleted defaults to false
- [ ] Connection records created correctly
- [ ] Issue records have correct severity
- [ ] Fix records include before/after states
- [ ] AuditLog tracks all actions

### Middleware
- [ ] Incomplete users redirected to /onboarding
- [ ] Completed users blocked from /onboarding
- [ ] API routes not affected
- [ ] Public routes accessible

---

## Future Enhancements

1. **Resume Progress**
   - Save current step in User.onboardingStep
   - Allow users to resume if they leave mid-flow

2. **Skip Option**
   - Allow advanced users to skip onboarding
   - Mark as completed without full flow

3. **Video Walkthrough**
   - Embed Loom video in WelcomeStep
   - Optional tutorial for visual learners

4. **A/B Testing**
   - Test different execution mode recommendations
   - Try different value propositions
   - Optimize conversion rates

5. **Email Follow-up**
   - Send completion confirmation
   - Weekly tips for first month
   - Remind if abandoned mid-flow

6. **Guided Tour**
   - After onboarding, show dashboard tour
   - Highlight key features
   - Use tool like Intro.js

---

## Deployment Notes

### Before Deploying

1. **Run Database Migration**
   ```bash
   npx prisma db push
   # or
   npx prisma migrate dev --name add_onboarding_fields
   ```

2. **Update Environment Variables**
   - Ensure DATABASE_URL is set
   - Verify CLERK_SECRET_KEY is configured

3. **Test Locally**
   - Create new user account
   - Complete full onboarding flow
   - Verify database updates

### After Deploying

1. **Monitor Logs**
   - Watch for middleware errors
   - Check API endpoint responses
   - Track onboarding completion rate

2. **User Feedback**
   - Collect feedback on flow clarity
   - Identify confusing steps
   - Measure time-to-completion

---

## Support & Troubleshooting

### Common Issues

**Issue: User stuck in onboarding loop**
- Solution: Manually set `onboardingCompleted = true` in database

**Issue: Middleware not redirecting**
- Check: User record exists with correct clerkUserId
- Check: Prisma client is properly initialized

**Issue: API endpoints failing**
- Check: Authentication headers present
- Check: Database connection active
- Check: Prisma schema matches database

**Issue: Scanning animation not advancing**
- Check: Console for JavaScript errors
- Check: `onComplete` callback firing
- Check: Stats state updating

---

## Contact

For questions about the onboarding implementation:
- Review this documentation
- Check component inline comments
- Inspect API route error handling
- Test user flow end-to-end
