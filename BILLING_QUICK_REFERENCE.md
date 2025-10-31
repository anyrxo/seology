# Stripe Billing - Quick Reference Card

## Setup in 5 Steps

### 1. Create Products
```bash
npx ts-node scripts/setup-stripe-products.ts
```
Copy the price IDs from output.

### 2. Environment Variables
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_GROWTH=price_...
STRIPE_PRICE_SCALE=price_...
```

### 3. Database
```bash
npm run db:push
```

### 4. Local Webhooks
```bash
stripe listen --forward-to localhost:3000/api/billing/webhook
```

### 5. Test
Go to `/billing` and click "Upgrade"
Test card: `4242 4242 4242 4242`

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/billing/create-checkout` | POST | Start checkout |
| `/api/billing/portal` | POST | Open portal |
| `/api/billing/webhook` | POST | Handle webhooks |
| `/api/billing/subscription` | GET | Get subscription |

---

## Plans

| Plan | Price | Sites | Fixes | AI Calls |
|------|-------|-------|-------|----------|
| Starter | $29 | 3 | 50 | 100 |
| Professional | $99 | 10 | 200 | 500 |
| Enterprise | $299 | ∞ | 1000 | ∞ |

---

## Protect API Routes

```typescript
import { getAuthenticatedUser, checkCanApplyFix, trackUsage } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const check = await checkCanApplyFix(user.id)
  if (check) return check

  // Your code...

  await trackUsage(user.id, 'fix')
  return NextResponse.json({ success: true })
}
```

---

## Use in Components

```typescript
import { useBilling } from '@/hooks/use-billing'

export function MyComponent() {
  const { data, loading } = useBilling()
  return <div>Plan: {data?.plan.name}</div>
}
```

---

## Check Limits

```typescript
import { canApplyFix, canAddSite, canMakeAIAnalysis } from '@/lib/subscription-guard'

const fixCheck = await canApplyFix(userId)
if (!fixCheck.allowed) {
  console.log(fixCheck.reason)
}
```

---

## Webhook Events Handled

- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`
- ✅ `customer.subscription.trial_will_end`

---

## Files Created

### Services (4)
- `lib/stripe.ts`
- `lib/plans.ts`
- `lib/subscription-guard.ts`
- `lib/api-helpers.ts`

### API Routes (4)
- `app/api/billing/create-checkout/route.ts`
- `app/api/billing/portal/route.ts`
- `app/api/billing/webhook/route.ts`
- `app/api/billing/subscription/route.ts`

### UI (3)
- `app/(dashboard)/billing/page.tsx`
- `hooks/use-billing.ts`
- `types/billing.ts`

### Docs (3)
- `STRIPE_BILLING_SETUP.md` - Full setup
- `BILLING_INTEGRATION_EXAMPLES.md` - Code examples
- `BILLING_IMPLEMENTATION_REPORT.md` - Details

---

## Test Cards

| Purpose | Card Number |
|---------|-------------|
| Success | 4242 4242 4242 4242 |
| Decline | 4000 0000 0000 0002 |
| Auth Required | 4000 0025 0000 3155 |

---

## Troubleshooting

**Webhook fails?**
→ Check `STRIPE_WEBHOOK_SECRET` matches CLI output

**Price not found?**
→ Run setup script, verify env vars

**Can't checkout?**
→ Use test card, check console

---

## Full Documentation

- `STRIPE_BILLING_SETUP.md` - Complete setup guide
- `BILLING_INTEGRATION_EXAMPLES.md` - All code examples
- `BILLING_IMPLEMENTATION_REPORT.md` - Full implementation details
