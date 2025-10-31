# Billing Integration - Code Examples

## Table of Contents
1. [Protecting API Routes](#protecting-api-routes)
2. [Client-Side Usage](#client-side-usage)
3. [Checking User Limits](#checking-user-limits)
4. [Webhook Handling](#webhook-handling)
5. [Testing Examples](#testing-examples)

---

## Protecting API Routes

### Example: Connect Website API

```typescript
// app/api/connections/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, checkCanAddSite, trackUsage } from '@/lib/api-helpers'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  // 1. Authenticate user
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Check if user can add more sites
  const limitCheck = await checkCanAddSite(user.id)
  if (limitCheck) return limitCheck // Returns 403 if limit reached

  // 3. Create connection
  const body = await req.json()
  const connection = await db.connection.create({
    data: {
      userId: user.id,
      platform: body.platform,
      domain: body.domain,
      status: 'PENDING',
    },
  })

  // 4. Track usage
  await trackUsage(user.id, 'site')

  return NextResponse.json({ connection })
}
```

### Example: Apply Fix API

```typescript
// app/api/fixes/apply/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, checkCanApplyFix, trackUsage } from '@/lib/api-helpers'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  // Authenticate
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check limit
  const limitCheck = await checkCanApplyFix(user.id)
  if (limitCheck) return limitCheck

  // Apply fix
  const body = await req.json()
  const fix = await db.fix.create({
    data: {
      connectionId: body.connectionId,
      issueId: body.issueId,
      type: body.type,
      targetUrl: body.targetUrl,
      beforeState: body.beforeState,
      afterState: body.afterState,
      method: 'API',
      status: 'APPLIED',
      appliedAt: new Date(),
    },
  })

  // Track usage
  await trackUsage(user.id, 'fix')

  return NextResponse.json({ fix })
}
```

### Example: AI Analysis API

```typescript
// app/api/ai/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, checkCanMakeAIAnalysis, trackUsage } from '@/lib/api-helpers'
import { analyzeWithClaude } from '@/lib/claude'

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check AI analysis limit
  const limitCheck = await checkCanMakeAIAnalysis(user.id)
  if (limitCheck) return limitCheck

  const body = await req.json()

  // Perform AI analysis
  const analysis = await analyzeWithClaude(body.content)

  // Track usage
  await trackUsage(user.id, 'ai')

  return NextResponse.json({ analysis })
}
```

---

## Client-Side Usage

### Using Custom Hooks

```typescript
'use client'

import { useBilling, useSubscription } from '@/hooks/use-billing'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'

export function UpgradePrompt() {
  const { data, loading } = useBilling()
  const { createCheckout, processing } = useSubscription()

  if (loading) return <div>Loading...</div>

  const isLimited = data?.plan.name === 'STARTER'

  return (
    <div>
      {isLimited && (
        <Alert>
          Upgrade to Professional for unlimited sites!
        </Alert>
      )}

      <Button
        onClick={() => createCheckout('price_growth', 'GROWTH')}
        disabled={processing}
      >
        {processing ? 'Processing...' : 'Upgrade Now'}
      </Button>
    </div>
  )
}
```

### Displaying Usage Limits

```typescript
'use client'

import { useBilling } from '@/hooks/use-billing'
import { Progress } from '@/components/ui/progress'

export function UsageWidget() {
  const { data, loading } = useBilling()

  if (loading || !data) return null

  const { usage, plan } = data
  const fixPercentage = (usage.fixesApplied / plan.limits.fixesPerMonth) * 100

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span>Fixes This Month</span>
          <span>{usage.fixesApplied} / {plan.limits.fixesPerMonth}</span>
        </div>
        <Progress value={fixPercentage} />
      </div>

      {fixPercentage > 80 && (
        <Alert variant="warning">
          You're approaching your monthly limit!
        </Alert>
      )}
    </div>
  )
}
```

### Conditional Feature Access

```typescript
'use client'

import { useBilling } from '@/hooks/use-billing'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

export function AutomaticModeToggle() {
  const { data } = useBilling()

  const canUseAutomatic = data?.plan.limits.executionModes.includes('AUTOMATIC')

  return (
    <div className="flex items-center gap-2">
      <Button disabled={!canUseAutomatic}>
        {canUseAutomatic ? (
          'Enable Automatic Mode'
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Automatic Mode (Pro Feature)
          </>
        )}
      </Button>

      {!canUseAutomatic && (
        <p className="text-sm text-gray-500">
          Upgrade to Professional to unlock automatic mode
        </p>
      )}
    </div>
  )
}
```

---

## Checking User Limits

### Server-Side Checks

```typescript
import {
  canAddSite,
  canApplyFix,
  canMakeAIAnalysis,
  canUseMode,
  getCurrentUsage,
  isApproachingLimits,
} from '@/lib/subscription-guard'

// Check if user can add a site
const siteCheck = await canAddSite(userId)
if (!siteCheck.allowed) {
  console.log(siteCheck.reason)
  // "You've reached your plan limit of 3 sites..."
}

// Check if user can apply a fix
const fixCheck = await canApplyFix(userId)
if (!fixCheck.allowed) {
  console.log(fixCheck.reason)
}

// Check execution mode availability
const modeCheck = await canUseMode(userId, 'AUTOMATIC')
if (!modeCheck.allowed) {
  console.log(modeCheck.reason)
  // "The AUTOMATIC execution mode is not available..."
}

// Get current usage
const usage = await getCurrentUsage(userId)
console.log(usage)
// { fixesApplied: 12, aiCallsMade: 45, sitesConnected: 2 }

// Check if approaching limits
const limits = await isApproachingLimits(userId)
if (limits.approaching) {
  console.log(limits.warnings)
  // ["You've used 45 of 50 fixes (90%)"]
}
```

### Plan Utilities

```typescript
import {
  getPlan,
  getAllPlans,
  hasReachedLimit,
  getUsagePercentage,
  shouldUpgrade,
  getRecommendedPlan,
} from '@/lib/plans'

// Get plan details
const plan = getPlan('STARTER')
console.log(plan.limits.sites) // 3
console.log(plan.price) // 29

// Check if limit reached
const limitReached = hasReachedLimit('STARTER', 'fixesPerMonth', 48)
console.log(limitReached) // false

// Get usage percentage
const percentage = getUsagePercentage('STARTER', 'fixesPerMonth', 45)
console.log(percentage) // 90

// Check if should upgrade
const upgrade = shouldUpgrade('STARTER', {
  sites: 3,
  fixesPerMonth: 48,
  aiAnalyses: 95,
})
console.log(upgrade) // true (multiple limits at >90%)

// Get recommended plan
const recommended = getRecommendedPlan({
  sites: 5,
  fixesPerMonth: 100,
  aiAnalyses: 200,
})
console.log(recommended) // "GROWTH"
```

---

## Webhook Handling

The webhook route (`app/api/billing/webhook/route.ts`) automatically handles these events:

### Subscription Lifecycle

```typescript
// customer.subscription.created
// → Creates subscription in database
// → Updates user's plan
// → Creates audit log

// customer.subscription.updated
// → Updates subscription status
// → Updates user's plan if changed
// → Creates audit log

// customer.subscription.deleted
// → Deletes subscription from database
// → Downgrades user to STARTER
// → Creates audit log
```

### Payment Events

```typescript
// invoice.payment_succeeded
// → Creates audit log
// → (Optional) Send receipt email

// invoice.payment_failed
// → Updates subscription to PAST_DUE
// → Creates audit log
// → (Optional) Send payment failed email

// customer.subscription.trial_will_end
// → Creates audit log
// → (Optional) Send trial ending email
```

### Custom Webhook Handling

To add custom logic for webhook events, edit the handler functions in `app/api/billing/webhook/route.ts`:

```typescript
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // Existing logic...
  await syncSubscriptionToDatabase(subscription)

  // Add your custom logic
  const user = await db.user.findUnique({
    where: { id: subscription.metadata.userId },
  })

  if (user) {
    // Send welcome email
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Seology Pro!',
      template: 'welcome',
      data: { name: user.name },
    })

    // Track in analytics
    await trackEvent('subscription_created', {
      userId: user.id,
      plan: subscription.items.data[0].price.id,
    })
  }
}
```

---

## Testing Examples

### Testing with Stripe Test Cards

```typescript
// Success
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits

// Decline
Card: 4000 0000 0000 0002

// Requires authentication
Card: 4000 0025 0000 3155

// Insufficient funds
Card: 4000 0000 0000 9995
```

### Testing Webhooks Locally

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward webhooks
stripe listen --forward-to localhost:3000/api/billing/webhook

# Terminal 3: Trigger events
stripe trigger customer.subscription.created
stripe trigger invoice.payment_succeeded
stripe trigger invoice.payment_failed
```

### Testing API Routes

```typescript
// Test creating checkout
const response = await fetch('/api/billing/create-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_starter',
    planName: 'STARTER',
  }),
})
const data = await response.json()
console.log(data.url) // Stripe checkout URL

// Test getting subscription
const response = await fetch('/api/billing/subscription')
const data = await response.json()
console.log(data.plan.name) // "STARTER"
console.log(data.usage.fixesApplied) // 12

// Test opening portal
const response = await fetch('/api/billing/portal', { method: 'POST' })
const data = await response.json()
console.log(data.url) // Stripe portal URL
```

### Testing Limit Enforcement

```typescript
// Test site limit
const user = await db.user.findUnique({ where: { email: 'test@example.com' } })

// Create 3 sites (Starter limit)
for (let i = 0; i < 3; i++) {
  await db.connection.create({
    data: {
      userId: user.id,
      platform: 'WORDPRESS',
      domain: `site${i}.com`,
      status: 'CONNECTED',
    },
  })
}

// Try to add 4th site - should fail
const check = await canAddSite(user.id)
console.log(check.allowed) // false
console.log(check.reason) // "You've reached your plan limit..."
```

---

## Error Handling

### Client-Side

```typescript
'use client'

import { useSubscription } from '@/hooks/use-billing'
import { Alert } from '@/components/ui/alert'

export function UpgradeButton() {
  const { createCheckout, error } = useSubscription()

  return (
    <div>
      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      <Button onClick={() => createCheckout(priceId, planName)}>
        Upgrade
      </Button>
    </div>
  )
}
```

### Server-Side

```typescript
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const limitCheck = await checkCanApplyFix(user.id)
    if (limitCheck) return limitCheck

    // Your logic...

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## Best Practices

1. **Always check limits before operations**
   ```typescript
   const check = await canApplyFix(userId)
   if (!check.allowed) return error(check.reason)
   ```

2. **Track usage after successful operations**
   ```typescript
   await applyFix()
   await trackUsage(userId, 'fix')
   ```

3. **Handle errors gracefully**
   ```typescript
   try {
     await trackUsage(userId, 'fix')
   } catch (error) {
     // Don't fail request if tracking fails
     console.error('Usage tracking failed:', error)
   }
   ```

4. **Show upgrade prompts when limits approached**
   ```typescript
   const percentage = getUsagePercentage(plan, 'fixesPerMonth', usage)
   if (percentage > 80) {
     showUpgradePrompt()
   }
   ```

5. **Verify webhook signatures**
   ```typescript
   const event = verifyWebhookSignature(body, signature, secret)
   ```
