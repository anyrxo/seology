# Seology.ai Onboarding Flow Diagram

## Visual Flow Chart

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER SIGNS UP                                │
│                       (via Clerk Auth)                               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Middleware    │
                    │  Checks User   │
                    └────────┬───────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
     onboardingCompleted?            onboardingCompleted?
        = false                           = true
              │                             │
              ▼                             ▼
    Redirect to /onboarding      Redirect to /dashboard


═══════════════════════════════════════════════════════════════════════
                        ONBOARDING STEPS
═══════════════════════════════════════════════════════════════════════


┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1: WELCOME                                                     │
│  ────────────────────────────────────────────────────────────────   │
│  Component: WelcomeStep.tsx                                         │
│                                                                      │
│  Display:                                                            │
│  • Hero message with Sparkles icon                                  │
│  • 3 value prop cards (Detection, Automation, Results)              │
│  • "What to Expect" with 4 numbered items                           │
│  • "Get Started" button                                             │
│                                                                      │
│  User Action: Click "Get Started"                                   │
│                                                                      │
│  API Call: None                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼


┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2: CONNECT SITE                                               │
│  ────────────────────────────────────────────────────────────────   │
│  Component: ConnectSiteStep.tsx                                     │
│                                                                      │
│  Display:                                                            │
│  • Platform selection cards:                                        │
│    - Shopify (Popular)                                              │
│    - WordPress (Popular)                                            │
│    - Custom Site                                                    │
│  • Domain input field                                               │
│  • Platform-specific instructions                                   │
│                                                                      │
│  User Action: Select platform → Enter domain → Click "Connect"     │
│                                                                      │
│  API Call: POST /api/onboarding/connect                             │
│  ├─ Input: { platform, domain }                                     │
│  ├─ Creates: Connection record                                      │
│  └─ Returns: { connectionId }                                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼


┌─────────────────────────────────────────────────────────────────────┐
│  STEP 3: SCANNING                                                    │
│  ────────────────────────────────────────────────────────────────   │
│  Component: ScanningStep.tsx                                        │
│                                                                      │
│  Display:                                                            │
│  • Animated progress bar (0% → 100%)                                │
│  • Current page being scanned                                       │
│  • Live stats cards:                                                │
│    - Pages Scanned (incrementing)                                   │
│    - Issues Found (incrementing, pulsing)                           │
│    - Links Checked (incrementing)                                   │
│  • Issue breakdown by severity                                      │
│  • "What We're Checking" info box                                   │
│                                                                      │
│  Simulation:                                                         │
│  ├─ 10 pages scanned over ~8 seconds                                │
│  ├─ Random issues generated per page                                │
│  └─ Auto-advances on completion                                     │
│                                                                      │
│  User Action: (Automatic - watches animation)                       │
│                                                                      │
│  API Call: POST /api/onboarding/scan                                │
│  ├─ Input: { connectionId, stats }                                  │
│  ├─ Creates: Multiple Issue records                                 │
│  └─ Updates: Connection.lastSync                                    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼


┌─────────────────────────────────────────────────────────────────────┐
│  STEP 4: REVIEW ISSUES                                              │
│  ────────────────────────────────────────────────────────────────   │
│  Component: ReviewIssuesStep.tsx                                    │
│                                                                      │
│  Display:                                                            │
│  • Summary stats (Critical, High, Medium, Low)                      │
│  • Top 5 critical issues:                                           │
│    - Issue type with severity badge                                │
│    - Description                                                    │
│    - Affected page                                                  │
│    - Impact explanation                                             │
│  • "Good News" message about automated fixes                        │
│                                                                      │
│  User Action: Click "Continue to Setup"                             │
│                                                                      │
│  API Call: None                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼


┌─────────────────────────────────────────────────────────────────────┐
│  STEP 5: EXECUTION MODE                                             │
│  ────────────────────────────────────────────────────────────────   │
│  Component: ExecutionModeStep.tsx                                   │
│                                                                      │
│  Display:                                                            │
│  • 3 detailed mode cards:                                           │
│                                                                      │
│    ┌─────────────────────────────────────┐                         │
│    │ AUTOMATIC (Recommended)              │                         │
│    │ • Hands-free 24/7 fixes             │                         │
│    │ • No approval needed                │                         │
│    │ • Maximum time savings              │                         │
│    └─────────────────────────────────────┘                         │
│                                                                      │
│    ┌─────────────────────────────────────┐                         │
│    │ PLAN & REVIEW                        │                         │
│    │ • AI generates plans                │                         │
│    │ • Approve batches                   │                         │
│    │ • Balance control & efficiency      │                         │
│    └─────────────────────────────────────┘                         │
│                                                                      │
│    ┌─────────────────────────────────────┐                         │
│    │ APPROVE EACH FIX                     │                         │
│    │ • Full control                      │                         │
│    │ • See exact before/after            │                         │
│    │ • Perfect for learning              │                         │
│    └─────────────────────────────────────┘                         │
│                                                                      │
│  User Action: Select mode → Click "Continue"                        │
│                                                                      │
│  API Call: PATCH /api/onboarding/execution-mode                     │
│  ├─ Input: { executionMode }                                        │
│  └─ Updates: User.executionMode                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼


┌─────────────────────────────────────────────────────────────────────┐
│  STEP 6: FIRST FIX                                                   │
│  ────────────────────────────────────────────────────────────────   │
│  Component: FirstFixStep.tsx                                        │
│                                                                      │
│  Display (Multi-stage animation):                                   │
│                                                                      │
│  Stage 1 (2s): Analyzing Issue                                      │
│  ├─ Blue spinning loader                                            │
│  └─ "Claude is examining the missing meta description..."           │
│                                                                      │
│  Stage 2 (2s): Generating Fix                                       │
│  ├─ Purple pulsing sparkles                                         │
│  └─ "Creating SEO-optimized meta description..."                    │
│                                                                      │
│  Stage 3 (2s): Applying Fix                                         │
│  ├─ Green spinning loader                                           │
│  └─ "Updating your website..."                                      │
│                                                                      │
│  Stage 4 (2s): Verifying                                            │
│  ├─ Orange spinning loader                                          │
│  └─ "Confirming the fix was applied successfully..."                │
│                                                                      │
│  Stage 5: Complete                                                  │
│  ├─ Green checkmark                                                 │
│  ├─ "Show Before/After" button                                      │
│  ├─ Side-by-side code comparison                                    │
│  ├─ Claude's reasoning box                                          │
│  └─ "Complete Onboarding" button                                    │
│                                                                      │
│  User Action: (Watch animation) → Click "Complete Onboarding"      │
│                                                                      │
│  API Call: POST /api/onboarding/apply-fix                           │
│  ├─ Input: { connectionId }                                         │
│  ├─ Creates: Fix record                                             │
│  ├─ Updates: Issue.status = FIXED                                   │
│  └─ Creates: AuditLog entry                                         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼


┌─────────────────────────────────────────────────────────────────────┐
│  STEP 7: COMPLETE                                                    │
│  ────────────────────────────────────────────────────────────────   │
│  Component: CompleteStep.tsx                                        │
│                                                                      │
│  Display:                                                            │
│  • Pulsing success checkmark animation                              │
│  • Summary stats cards (1 Site, X Issues, 1 Fix)                    │
│  • "What Happens Next":                                             │
│    - Continuous monitoring                                          │
│    - Automatic fixes                                                │
│    - Progress tracking                                              │
│    - Rollback protection                                            │
│  • Quick tips list                                                  │
│  • "Go to Dashboard" CTA                                            │
│                                                                      │
│  User Action: Click "Go to Dashboard"                               │
│                                                                      │
│  API Call: PATCH /api/onboarding/complete                           │
│  ├─ Updates: User.onboardingCompleted = true                        │
│  └─ Creates: AuditLog entry                                         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   Middleware   │
                    │  Redirects to  │
                    │   /dashboard   │
                    └────────┬───────┘
                             │
                             ▼
              ┌──────────────────────────┐
              │   DASHBOARD (Home Page)   │
              │                           │
              │  • Welcome back message   │
              │  • Site stats             │
              │  • Recent activity        │
              │  • Quick actions          │
              └───────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        STATE MANAGEMENT
═══════════════════════════════════════════════════════════════════════


OnboardingPage Component State:
┌─────────────────────────────────────────────────────────────────────┐
│ {                                                                    │
│   platform: '',              // 'shopify' | 'wordpress' | 'custom'  │
│   domain: '',                // 'example.com'                       │
│   scanStats: null,           // ScanStats object                    │
│   executionMode: '',         // 'AUTOMATIC' | 'PLAN' | 'APPROVE'    │
│   connectionId: '',          // UUID from API                       │
│ }                                                                    │
└─────────────────────────────────────────────────────────────────────┘


User Database Record:
┌─────────────────────────────────────────────────────────────────────┐
│ User {                                                               │
│   id: uuid                                                           │
│   clerkUserId: string                                                │
│   email: string                                                      │
│   executionMode: APPROVE → (Selected mode)                           │
│   onboardingCompleted: false → true                                  │
│   onboardingStep: null                                               │
│   onboardingData: null                                               │
│   connections: [Connection]                                          │
│ }                                                                    │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        API ENDPOINTS SUMMARY
═══════════════════════════════════════════════════════════════════════


1. POST /api/onboarding/connect
   ├─ Input: { platform, domain }
   ├─ Creates: Connection
   └─ Output: { connectionId }

2. POST /api/onboarding/scan
   ├─ Input: { connectionId, stats }
   ├─ Creates: Issues (bulk)
   └─ Output: { issuesCreated }

3. PATCH /api/onboarding/execution-mode
   ├─ Input: { executionMode }
   ├─ Updates: User.executionMode
   └─ Output: { success }

4. POST /api/onboarding/apply-fix
   ├─ Input: { connectionId }
   ├─ Creates: Fix, Updates Issue
   └─ Output: { fix }

5. PATCH /api/onboarding/complete
   ├─ Updates: User.onboardingCompleted = true
   ├─ Creates: AuditLog
   └─ Output: { success }


═══════════════════════════════════════════════════════════════════════
                   MIDDLEWARE REDIRECT LOGIC
═══════════════════════════════════════════════════════════════════════


Request to any route
        │
        ▼
  Is authenticated?
        │
    ┌───┴───┐
   No      Yes
    │       │
    │       ▼
    │   Check User.onboardingCompleted
    │       │
    │   ┌───┴───┐
    │  false   true
    │   │       │
    │   ▼       ▼
    │ Trying to access    Trying to access
    │  /onboarding?      /onboarding?
    │   │       │           │       │
    │  Yes     No          Yes     No
    │   │       │           │       │
    │  Allow  Redirect     Redirect Allow
    │         to /onboarding  to /dashboard
    │
    ▼
Redirect to /sign-in


═══════════════════════════════════════════════════════════════════════
                        DATA FLOW DIAGRAM
═══════════════════════════════════════════════════════════════════════


┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  Client  │      │   API    │      │   DB     │      │  Clerk   │
└────┬─────┘      └────┬─────┘      └────┬─────┘      └────┬─────┘
     │                 │                 │                 │
     │  Sign Up        │                 │                 │
     ├────────────────────────────────────────────────────>│
     │                 │                 │                 │
     │  User Created   │                 │                 │
     │<────────────────────────────────────────────────────┤
     │                 │                 │                 │
     │  Request /onboarding              │                 │
     ├─────────────────>│                 │                 │
     │                 │  Check User     │                 │
     │                 ├────────────────>│                 │
     │                 │  onboardingCompleted=false        │
     │                 │<────────────────┤                 │
     │  Load Page      │                 │                 │
     │<─────────────────┤                 │                 │
     │                 │                 │                 │
     │  POST /api/onboarding/connect     │                 │
     ├─────────────────>│                 │                 │
     │                 │  Create Connection                │
     │                 ├────────────────>│                 │
     │                 │  connectionId   │                 │
     │                 │<────────────────┤                 │
     │  { connectionId }                 │                 │
     │<─────────────────┤                 │                 │
     │                 │                 │                 │
     │  POST /api/onboarding/scan        │                 │
     ├─────────────────>│                 │                 │
     │                 │  Create Issues  │                 │
     │                 ├────────────────>│                 │
     │                 │<────────────────┤                 │
     │  { success }    │                 │                 │
     │<─────────────────┤                 │                 │
     │                 │                 │                 │
     │  PATCH /api/onboarding/execution-mode              │
     ├─────────────────>│                 │                 │
     │                 │  Update User    │                 │
     │                 ├────────────────>│                 │
     │                 │<────────────────┤                 │
     │  { success }    │                 │                 │
     │<─────────────────┤                 │                 │
     │                 │                 │                 │
     │  POST /api/onboarding/apply-fix   │                 │
     ├─────────────────>│                 │                 │
     │                 │  Create Fix     │                 │
     │                 ├────────────────>│                 │
     │                 │  Update Issue   │                 │
     │                 ├────────────────>│                 │
     │                 │<────────────────┤                 │
     │  { fix }        │                 │                 │
     │<─────────────────┤                 │                 │
     │                 │                 │                 │
     │  PATCH /api/onboarding/complete   │                 │
     ├─────────────────>│                 │                 │
     │                 │  Update User    │                 │
     │                 │  (onboardingCompleted=true)       │
     │                 ├────────────────>│                 │
     │                 │<────────────────┤                 │
     │  { success }    │                 │                 │
     │<─────────────────┤                 │                 │
     │                 │                 │                 │
     │  Redirect to /dashboard           │                 │
     ├─────────────────>│                 │                 │
     │                 │  Check User     │                 │
     │                 ├────────────────>│                 │
     │                 │  onboardingCompleted=true         │
     │                 │<────────────────┤                 │
     │  Dashboard Page │                 │                 │
     │<─────────────────┤                 │                 │
     │                 │                 │                 │


═══════════════════════════════════════════════════════════════════════
                     DATABASE RECORDS CREATED
═══════════════════════════════════════════════════════════════════════

During onboarding, these records are created:

1. User (if new)
   ├─ Created by Clerk webhook or first API call
   └─ Updated: executionMode, onboardingCompleted

2. Connection (1 record)
   ├─ platform: Selected platform
   ├─ domain: Entered domain
   └─ status: CONNECTED

3. Issues (multiple records)
   ├─ Based on simulated scan
   ├─ Various severities: CRITICAL, HIGH, MEDIUM, LOW
   └─ status: DETECTED → FIXED (first one)

4. Fix (1 record)
   ├─ type: missing_meta_description
   ├─ beforeState & afterState: HTML snippets
   ├─ status: APPLIED
   └─ claudeReasoning: Explanation

5. AuditLog (multiple records)
   ├─ connection_created
   ├─ fix_applied
   └─ onboarding_completed
```

## Timeline

```
0:00 - Step 1: Welcome Screen (user reads ~30-60s)
0:30 - Step 2: Connect Site (select platform, enter domain ~30s)
1:00 - Step 3: Scanning (animation ~8-10s)
1:10 - Step 4: Review Issues (read issues ~30-45s)
1:45 - Step 5: Choose Mode (read options, select ~45-60s)
2:45 - Step 6: First Fix (watch animation, review ~15-30s)
3:15 - Step 7: Complete (read next steps ~15-20s)
─────────────────────────────────────────────────────────
Total: ~3-5 minutes
```

## Key Metrics to Track

- **Conversion Rate:** % of users who complete onboarding
- **Drop-off Points:** Which step users abandon
- **Time per Step:** Average time spent on each step
- **Platform Distribution:** Which platforms users connect
- **Execution Mode:** Which automation level users choose
- **Completion Time:** Average total time to complete

## Success Criteria

✅ User understands product value (Step 1)
✅ User successfully connects first site (Step 2)
✅ User sees real issues on their site (Steps 3-4)
✅ User chooses automation preference (Step 5)
✅ User witnesses AI fix in action (Step 6)
✅ User is excited to explore dashboard (Step 7)
