import Stripe from 'stripe'
import { db } from './db'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

/**
 * Create or retrieve a Stripe customer for a user
 */
export async function createOrGetStripeCustomer(
  userId: string,
  email: string,
  name?: string
): Promise<string> {
  // Check if user already has a Stripe customer ID
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  })

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      userId,
    },
  })

  // Save customer ID to database
  await db.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  })

  return customer.id
}

/**
 * Create a Stripe checkout session for a subscription
 */
export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  userId,
}: {
  customerId: string
  priceId: string
  successUrl: string
  cancelUrl: string
  userId: string
}): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    metadata: {
      userId,
    },
    subscription_data: {
      trial_period_days: 14, // 14-day free trial
      metadata: {
        userId,
      },
    },
  })

  return session
}

/**
 * Create a billing portal session for managing subscriptions
 */
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}

/**
 * Get or create a subscription
 */
export async function createSubscription({
  customerId,
  priceId,
  userId,
}: {
  customerId: string
  priceId: string
  userId: string
}): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    trial_period_days: 14,
    payment_behavior: 'default_incomplete',
    payment_settings: {
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      userId,
    },
  })

  return subscription
}

/**
 * Cancel a subscription at period end
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })

  return subscription
}

/**
 * Resume a cancelled subscription
 */
export async function resumeSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  })

  return subscription
}

/**
 * Change subscription plan
 */
export async function changeSubscriptionPlan({
  subscriptionId,
  newPriceId,
}: {
  subscriptionId: string
  newPriceId: string
}): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'always_invoice',
  })

  return updatedSubscription
}

/**
 * Get subscription details
 */
export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method', 'latest_invoice'],
  })
}

/**
 * List customer invoices
 */
export async function listInvoices(
  customerId: string,
  limit: number = 10
): Promise<Stripe.Invoice[]> {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  })

  return invoices.data
}

/**
 * Get upcoming invoice
 */
export async function getUpcomingInvoice(
  customerId: string
): Promise<Stripe.UpcomingInvoice | null> {
  try {
    return await stripe.invoices.retrieveUpcoming({
      customer: customerId,
    })
  } catch (error) {
    // No upcoming invoice found
    return null
  }
}

/**
 * Sync subscription data from Stripe to database
 */
export async function syncSubscriptionToDatabase(
  subscription: Stripe.Subscription
): Promise<void> {
  const userId = subscription.metadata.userId

  if (!userId) {
    console.error('No userId found in subscription metadata')
    return
  }

  // Determine subscription status
  let status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID' | 'TRIALING'

  switch (subscription.status) {
    case 'active':
      status = 'ACTIVE'
      break
    case 'canceled':
      status = 'CANCELED'
      break
    case 'past_due':
      status = 'PAST_DUE'
      break
    case 'unpaid':
      status = 'UNPAID'
      break
    case 'trialing':
      status = 'TRIALING'
      break
    default:
      status = 'ACTIVE'
  }

  // Determine plan based on price ID
  const priceId = subscription.items.data[0].price.id
  let plan: 'STARTER' | 'GROWTH' | 'SCALE' = 'STARTER'

  if (priceId === process.env.STRIPE_PRICE_GROWTH) {
    plan = 'GROWTH'
  } else if (priceId === process.env.STRIPE_PRICE_SCALE) {
    plan = 'SCALE'
  }

  // Upsert subscription in database
  await db.subscription.upsert({
    where: {
      userId,
    },
    update: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    create: {
      userId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  })

  // Update user's plan
  await db.user.update({
    where: { id: userId },
    data: { plan },
  })
}

/**
 * Delete subscription from database
 */
export async function deleteSubscriptionFromDatabase(
  subscriptionId: string
): Promise<void> {
  await db.subscription.delete({
    where: { stripeSubscriptionId: subscriptionId },
  })
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, secret)
}
