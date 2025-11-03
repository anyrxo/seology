/**
 * Stripe Billing Integration
 *
 * Handle subscriptions, checkout, and billing management
 */

import Stripe from 'stripe'
import { db } from './db'
import { PLANS, type PlanTier } from './plans'

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover',
  typescript: true,
})

/**
 * Create a Stripe checkout session for a plan
 */
export async function createCheckoutSession(
  userId: string,
  planTier: PlanTier,
  billingCycle: 'monthly' | 'yearly' = 'monthly'
) {
  // Get user
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const plan = PLANS[planTier]

  // Create or get Stripe customer
  let customerId = user.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
        clerkId: user.clerkId,
      },
    })

    customerId = customer.id

    // Save customer ID
    await db.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customerId },
    })
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.stripePriceId[billingCycle],
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      userId,
      planTier,
      billingCycle,
    },
  })

  return session
}

/**
 * Create a Stripe billing portal session
 */
export async function createBillingPortalSession(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user || !user.stripeCustomerId) {
    throw new Error('User has no Stripe customer')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })

  return session
}

/**
 * Handle Stripe webhook events
 */
export async function handleStripeWebhook(
  event: Stripe.Event
): Promise<{ received: boolean }> {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
      break

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionChange(event.data.object as Stripe.Subscription)
      break

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
      break

    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
      break

    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return { received: true }
}

/**
 * Handle checkout session completed
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId

  if (!userId) {
    console.error('No userId in checkout session metadata')
    return
  }

  const subscriptionId = session.subscription as string

  // Update user with subscription ID
  await db.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscriptionId,
      plan: session.metadata?.planTier as PlanTier,
    },
  })

  // Retrieve subscription to get period dates
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  // Extract period dates from subscription object
  const subData = subscription as unknown as {
    current_period_start?: number
    current_period_end?: number
    status?: string
  }

  const periodStart = subData.current_period_start || Math.floor(Date.now() / 1000)
  const periodEnd = subData.current_period_end || Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

  // Create subscription record
  await db.subscription.create({
    data: {
      userId,
      stripeSubscriptionId: subscriptionId,
      plan: session.metadata?.planTier as PlanTier,
      status: subData.status === 'active' ? 'ACTIVE' : subData.status === 'trialing' ? 'TRIALING' : 'PAST_DUE',
      currentPeriodStart: new Date(periodStart * 1000),
      currentPeriodEnd: new Date(periodEnd * 1000),
    },
  })
}

/**
 * Handle subscription changes
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  // Find user by customer ID
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (!user) {
    console.error(`No user found for customer ${customerId}`)
    return
  }

  // Extract period dates from subscription object
  const subData = subscription as unknown as {
    current_period_start?: number
    current_period_end?: number
    status?: string
  }

  const periodStart = subData.current_period_start || Math.floor(Date.now() / 1000)
  const periodEnd = subData.current_period_end || Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

  // Update subscription in database
  await db.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      status: subData.status === 'active' ? 'ACTIVE' : subData.status === 'trialing' ? 'TRIALING' : subData.status === 'canceled' ? 'CANCELLED' : 'PAST_DUE',
      currentPeriodStart: new Date(periodStart * 1000),
      currentPeriodEnd: new Date(periodEnd * 1000),
    },
    create: {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
      plan: user.plan,
      status: subData.status === 'active' ? 'ACTIVE' : subData.status === 'trialing' ? 'TRIALING' : 'PAST_DUE',
      currentPeriodStart: new Date(periodStart * 1000),
      currentPeriodEnd: new Date(periodEnd * 1000),
    },
  })
}

/**
 * Handle subscription deleted
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (!user) return

  // Update subscription status
  await db.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: 'CANCELLED' },
  })

  // Downgrade user to STARTER plan
  await db.user.update({
    where: { id: user.id },
    data: { plan: 'STARTER' },
  })
}

/**
 * Handle invoice payment succeeded
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as unknown as { subscription?: string }).subscription

  if (!subscriptionId) return

  // Mark subscription as active
  await db.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: { status: 'ACTIVE' },
  })
}

/**
 * Handle invoice payment failed
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as unknown as { subscription?: string }).subscription

  if (!subscriptionId) return

  // Mark subscription as past due
  await db.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: { status: 'PAST_DUE' },
  })
}

/**
 * Get subscription details for a user
 */
export async function getSubscription(userId: string) {
  const subscription = await db.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  if (!subscription) return null

  // Get Stripe subscription details
  const stripeSubscription = await stripe.subscriptions.retrieve(
    subscription.stripeSubscriptionId
  )

  return {
    ...subscription,
    stripeSubscription,
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user || !user.stripeSubscriptionId) {
    throw new Error('No active subscription')
  }

  // Cancel at period end
  await stripe.subscriptions.update(user.stripeSubscriptionId, {
    cancel_at_period_end: true,
  })

  return { success: true }
}

/**
 * Reactivate a canceled subscription
 */
export async function reactivateSubscription(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user || !user.stripeSubscriptionId) {
    throw new Error('No subscription to reactivate')
  }

  // Remove cancel_at_period_end
  await stripe.subscriptions.update(user.stripeSubscriptionId, {
    cancel_at_period_end: false,
  })

  return { success: true }
}
