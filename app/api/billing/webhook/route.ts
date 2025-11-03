/**
 * Stripe Webhook Handler
 * Handles subscription events from Stripe
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { Plan, SubscriptionStatus } from '@prisma/client'
import { notifyPlanUpgraded } from '@/lib/notifications'

export const dynamic = 'force-dynamic'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

// Helper to convert Stripe status to Prisma enum
function mapStripeStatusToPrisma(stripeStatus: Stripe.Subscription.Status): SubscriptionStatus {
  switch (stripeStatus) {
    case 'active':
      return 'ACTIVE'
    case 'trialing':
      return 'TRIALING'
    case 'canceled':
      return 'CANCELLED'
    case 'past_due':
    case 'unpaid':
    case 'incomplete':
    case 'incomplete_expired':
    case 'paused':
      return 'PAST_DUE'
    default:
      return 'PAST_DUE'
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}

/**
 * Handle successful checkout
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customer = session.customer as string
  const subscriptionId = session.subscription as string
  const metadata = session.metadata

  if (!metadata?.userId || !metadata?.plan) {
    console.error('Missing metadata in checkout session')
    return
  }

  const userId = metadata.userId
  const plan = metadata.plan as Plan

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const status = mapStripeStatusToPrisma(subscription.status)

  // Extract period dates with proper type handling
  const subData = subscription as unknown as {
    current_period_start: number
    current_period_end: number
  }

  // Find existing subscription to check for old plan
  const existingUser = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  const oldPlan = existingUser?.plan

  // Create subscription record
  await db.subscription.create({
    data: {
      userId,
      stripeSubscriptionId: subscriptionId,
      plan,
      status,
      currentPeriodStart: new Date(subData.current_period_start * 1000),
      currentPeriodEnd: new Date(subData.current_period_end * 1000),
    },
  })

  // Update user plan and customer ID
  await db.user.update({
    where: { id: userId },
    data: {
      plan,
      stripeCustomerId: customer,
      stripeSubscriptionId: subscriptionId,
    },
  })

  // Send upgrade notification (with email)
  await notifyPlanUpgraded(userId, plan, oldPlan)

  console.log(`Subscription created for user ${userId}, plan: ${plan}`)
}

/**
 * Handle subscription update
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const subscriptionId = subscription.id
  const status = mapStripeStatusToPrisma(subscription.status)

  // Extract period dates with proper type handling
  const subData = subscription as unknown as {
    current_period_start: number
    current_period_end: number
  }

  // Find subscription by Stripe subscription ID
  const existingSubscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
    include: { user: true },
  })

  if (!existingSubscription) {
    console.error('Subscription not found:', subscriptionId)
    return
  }

  // Update subscription status and period
  await db.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status,
      currentPeriodStart: new Date(subData.current_period_start * 1000),
      currentPeriodEnd: new Date(subData.current_period_end * 1000),
    },
  })

  // If canceled or past_due, revert to free plan
  if (status === 'CANCELLED' || status === 'PAST_DUE') {
    await db.user.update({
      where: { id: existingSubscription.userId },
      data: { plan: 'STARTER' },
    })
  }

  console.log(`Subscription updated: ${subscriptionId}, status: ${status}`)
}

/**
 * Handle subscription deletion
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id

  // Find subscription
  const existingSubscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  })

  if (!existingSubscription) {
    console.error('Subscription not found:', subscriptionId)
    return
  }

  // Update subscription status
  await db.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: { status: 'CANCELLED' },
  })

  // Revert user to free plan
  await db.user.update({
    where: { id: existingSubscription.userId },
    data: { plan: 'STARTER' },
  })

  console.log(`Subscription deleted: ${subscriptionId}`)
}

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Extract subscription ID with proper type handling
  const invoiceData = invoice as unknown as { subscription?: string }
  const subscriptionId = invoiceData.subscription

  if (!subscriptionId) {
    return
  }

  // Find subscription
  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  })

  if (!subscription) {
    console.error('Subscription not found for invoice:', subscriptionId)
    return
  }

  // Update subscription status to active
  await db.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: { status: 'ACTIVE' },
  })

  console.log(`Payment succeeded for subscription: ${subscriptionId}`)
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Extract subscription ID with proper type handling
  const invoiceData = invoice as unknown as { subscription?: string }
  const subscriptionId = invoiceData.subscription

  if (!subscriptionId) {
    return
  }

  // Find subscription
  const dbSubscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
    include: { user: true },
  })

  if (!dbSubscription) {
    console.error('Subscription not found for invoice:', subscriptionId)
    return
  }

  // Update subscription status
  await db.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: { status: 'PAST_DUE' },
  })

  // Create notification
  await db.notification.create({
    data: {
      userId: dbSubscription.userId,
      type: 'ERROR',
      title: 'Payment Failed',
      message: 'Your subscription payment failed. Please update your payment method.',
      actionUrl: '/dashboard/billing',
    },
  })

  console.log(`Payment failed for subscription: ${subscriptionId}`)
}
