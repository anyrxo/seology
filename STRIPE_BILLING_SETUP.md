# Stripe Billing Integration - Setup & Testing Guide

## Overview

Complete Stripe billing integration for Seology.ai SaaS platform with subscription management, webhook handling, and usage tracking.

## Files Created

### Core Services
- `lib/stripe.ts` - Stripe service with all billing operations
- `lib/plans.ts` - Subscription plan configurations and utilities

### API Endpoints
- `app/api/billing/create-checkout/route.ts` - Create Stripe checkout sessions
- `app/api/billing/portal/route.ts` - Redirect to Stripe customer portal
- `app/api/billing/webhook/route.ts` - Handle Stripe webhook events
- `app/api/billing/subscription/route.ts` - Get subscription status and details

### UI Components
- `app/(dashboard)/billing/page.tsx` - Updated billing page with full Stripe integration
- `hooks/use-billing.ts` - Custom React hooks for billing operations

### Types
- `types/billing.ts` - TypeScript types for billing and subscriptions

## Subscription Plans

### Starter Plan
- **Price**: $29/month
- **Features**:
  - 3 connected sites
  - 50 fixes per month
  - 100 AI analyses
  - Approve mode only
  - Email support
  - 90-day rollback

### Professional Plan (Growth)
- **Price**: $99/month
- **Features**:
  - 10 connected sites
  - 200 fixes per month
  - 500 AI analyses
  - All execution modes
  - Priority support
  - API access
  - Custom integrations
  - 90-day rollback

### Enterprise Plan (Scale)
- **Price**: $299/month
- **Features**:
  - Unlimited sites
  - 1000 fixes per month
  - Unlimited AI analyses
  - All execution modes
  - Dedicated support
  - White-label option
  - SSO integration
  - Custom integrations
  - Priority AI processing
  - Custom SLA

## Setup Instructions

### 1. Install Dependencies

The required `stripe` package is already in package.json. If needed:

```bash
npm install stripe
```

### 2. Configure Stripe

#### A. Create Stripe Account
1. Go to https://stripe.com and create an account
2. Get your API keys from Dashboard → Developers → API keys

#### B. Create Products and Prices
1. Go to Stripe Dashboard → Products
2. Create three products:
   - **Seology Starter** - $29/month recurring
   - **Seology Professional** - $99/month recurring
   - **Seology Enterprise** - $299/month recurring
3. Copy the Price IDs (they start with `price_`)

#### C. Configure Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/billing/webhook`
3. Select events to listen to:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.trial_will_end`
4. Copy the webhook signing secret (starts with `whsec_`)

### 3. Environment Variables

Add to `.env.local`:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

# Price IDs from Stripe Dashboard
STRIPE_PRICE_STARTER=price_starter_id
STRIPE_PRICE_GROWTH=price_growth_id
STRIPE_PRICE_SCALE=price_scale_id

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Update Database

The Prisma schema already includes the necessary models. Run:

```bash
npm run db:push
```

This will sync:
- `User.stripeCustomerId`
- `Subscription` table
- `Usage` table

### 5. Configure Stripe Customer Portal

1. Go to Stripe Dashboard → Settings → Billing → Customer portal
2. Enable the portal
3. Configure allowed actions:
   - Update payment method
   - View invoice history
   - Cancel subscription
4. Set branding (logo, colors)

## API Endpoints

### POST /api/billing/create-checkout

Create a Stripe checkout session for subscription.

**Request:**
```json
{
  "priceId": "price_1234567890",
  "planName": "STARTER"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

**Usage:**
```typescript
const response = await fetch('/api/billing/create-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: plan.priceId,
    planName: 'STARTER'
  })
})
const { url } = await response.json()
window.location.href = url
```

### POST /api/billing/portal

Create a Stripe billing portal session.

**Response:**
```json
{
  "url": "https://billing.stripe.com/..."
}
```

**Usage:**
```typescript
const response = await fetch('/api/billing/portal', { method: 'POST' })
const { url } = await response.json()
window.location.href = url
```

### GET /api/billing/subscription

Get current subscription status and usage.

**Response:**
```json
{
  "subscription": {
    "id": "sub_...",
    "status": "ACTIVE",
    "currentPeriodStart": "2025-01-01T00:00:00Z",
    "currentPeriodEnd": "2025-02-01T00:00:00Z",
    "cancelAtPeriodEnd": false,
    "paymentMethod": {
      "type": "card",
      "brand": "visa",
      "last4": "4242",
      "expMonth": 12,
      "expYear": 2025
    }
  },
  "plan": {
    "name": "Starter",
    "price": 29,
    "features": [...],
    "limits": {
      "sites": 3,
      "fixesPerMonth": 50,
      "aiAnalyses": 100,
      "executionModes": ["APPROVE"]
    }
  },
  "usage": {
    "fixesApplied": 12,
    "aiCallsMade": 45,
    "sitesConnected": 2
  },
  "invoices": [...]
}
```

### POST /api/billing/webhook

Stripe webhook endpoint (called by Stripe, not your app).

**Handled Events:**
- `customer.subscription.created` - New subscription created
- `customer.subscription.updated` - Subscription changed (upgrade/downgrade)
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Payment successful
- `invoice.payment_failed` - Payment failed
- `customer.subscription.trial_will_end` - Trial ending soon (3 days before)

## Testing the Integration

### 1. Local Testing with Stripe CLI

Install Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

Login and forward webhooks:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/billing/webhook
```

The CLI will provide a webhook secret. Update `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Test Checkout Flow

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/billing`

3. Click "Upgrade to Starter" (or any plan)

4. Use Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

5. Complete checkout

6. Check:
   - Database: Subscription record created
   - Billing page: Shows active subscription
   - Stripe Dashboard: Subscription appears

### 3. Test Stripe Portal

1. After subscribing, click "Manage Subscription"
2. You should be redirected to Stripe Customer Portal
3. Test:
   - Update payment method
   - View invoices
   - Cancel subscription

### 4. Test Webhooks

With Stripe CLI listening:

```bash
# Test subscription created
stripe trigger customer.subscription.created

# Test payment succeeded
stripe trigger invoice.payment_succeeded

# Test payment failed
stripe trigger invoice.payment_failed
```

Check:
- Console logs in terminal
- Database updates
- Audit logs created

### 5. Test Usage Limits

The `lib/plans.ts` file includes helper functions to check limits:

```typescript
import { hasReachedLimit, getUsagePercentage } from '@/lib/plans'

// Check if user reached limit
const limitReached = hasReachedLimit('STARTER', 'fixesPerMonth', 45)

// Get usage percentage
const percentage = getUsagePercentage('STARTER', 'fixesPerMonth', 45)
// Returns 90 (45/50 * 100)
```

## Usage in Components

### Using Custom Hooks

```typescript
import { useBilling, useSubscription } from '@/hooks/use-billing'

function MyComponent() {
  const { data, loading, error, refetch } = useBilling()
  const { createCheckout, openPortal, processing } = useSubscription()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <p>Plan: {data.plan.name}</p>
      <p>Usage: {data.usage.fixesApplied} / {data.plan.limits.fixesPerMonth}</p>

      <button onClick={() => createCheckout(priceId, 'GROWTH')}>
        Upgrade
      </button>

      <button onClick={openPortal}>
        Manage Subscription
      </button>
    </div>
  )
}
```

### Direct API Calls

```typescript
// Create checkout
const response = await fetch('/api/billing/create-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ priceId, planName })
})
const { url } = await response.json()
window.location.href = url

// Open portal
const response = await fetch('/api/billing/portal', { method: 'POST' })
const { url } = await response.json()
window.location.href = url

// Get subscription
const response = await fetch('/api/billing/subscription')
const data = await response.json()
```

## Webhook Event Flow

### Subscription Created
1. Stripe sends `customer.subscription.created` webhook
2. `handleSubscriptionCreated()` called
3. Subscription synced to database via `syncSubscriptionToDatabase()`
4. User's plan updated
5. Audit log created

### Payment Succeeded
1. Stripe sends `invoice.payment_succeeded` webhook
2. `handleInvoicePaymentSucceeded()` called
3. Audit log created with payment details
4. (Optional) Send receipt email

### Payment Failed
1. Stripe sends `invoice.payment_failed` webhook
2. `handleInvoicePaymentFailed()` called
3. Subscription status updated to `PAST_DUE`
4. Audit log created
5. (Optional) Send payment failed email

### Subscription Cancelled
1. Stripe sends `customer.subscription.deleted` webhook
2. `handleSubscriptionDeleted()` called
3. Subscription deleted from database
4. User downgraded to free plan (STARTER)
5. Audit log created

## Monitoring & Debugging

### Check Webhook Deliveries
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click on your endpoint
3. View recent deliveries and responses
4. Retry failed deliveries

### Check Audit Logs
Query the database:
```sql
SELECT * FROM audit_logs
WHERE resource = 'subscription'
ORDER BY created_at DESC
LIMIT 10;
```

### Common Issues

**Webhook signature verification fails:**
- Ensure `STRIPE_WEBHOOK_SECRET` is correct
- Check that you're using the raw body (not parsed JSON)

**Subscription not syncing:**
- Check webhook events are configured
- Verify `userId` in subscription metadata
- Check server logs for errors

**Customer not found:**
- Ensure user has `stripeCustomerId` in database
- Create customer before creating subscription

## Production Deployment

### 1. Update Environment Variables
Replace test keys with live keys:
```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 2. Update Webhook URL
1. Create new webhook endpoint with production URL
2. Update `STRIPE_WEBHOOK_SECRET`

### 3. Test in Production
Use real payment method (will be charged!)

### 4. Enable Stripe Radar
1. Go to Stripe Dashboard → Radar
2. Enable fraud detection
3. Configure rules

## Security Considerations

1. **Webhook Verification**: Always verify webhook signatures
2. **API Keys**: Never expose secret keys in client-side code
3. **Customer Portal**: Only authenticated users can access
4. **Subscription Validation**: Check subscription status before allowing premium features
5. **Usage Limits**: Enforce limits on API level, not just UI

## Next Steps

1. **Email Notifications**: Implement email sending for payment events
2. **Analytics**: Track subscription metrics (MRR, churn, etc.)
3. **Proration**: Handle mid-cycle upgrades/downgrades
4. **Coupons**: Implement promotional codes
5. **Team Plans**: Add multi-seat subscriptions
6. **Annual Billing**: Add yearly plans with discounts

## Support

For issues with Stripe integration:
- Check Stripe Dashboard logs
- Review webhook delivery logs
- Check application server logs
- Contact Stripe support

For code issues:
- Check TypeScript errors
- Verify environment variables
- Review API endpoint responses
