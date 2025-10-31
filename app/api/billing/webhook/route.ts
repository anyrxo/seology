import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import {
  verifyWebhookSignature,
  syncSubscriptionToDatabase,
  deleteSubscriptionFromDatabase,
} from '@/lib/stripe'
import { db } from '@/lib/db'

// Disable body parsing for webhook
export const runtime = 'nodejs'

/**
 * POST /api/billing/webhook
 * Handle Stripe webhook events
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET is not set')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = verifyWebhookSignature(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle webhook events
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
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

      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle subscription created event
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id)
  await syncSubscriptionToDatabase(subscription)

  // Send welcome email or trigger onboarding flow
  const userId = subscription.metadata.userId
  if (userId) {
    await db.auditLog.create({
      data: {
        userId,
        action: 'subscription_created',
        resource: 'subscription',
        resourceId: subscription.id,
        details: {
          plan: subscription.items.data[0].price.id,
          status: subscription.status,
        },
      },
    })
  }
}

/**
 * Handle subscription updated event
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id)
  await syncSubscriptionToDatabase(subscription)

  const userId = subscription.metadata.userId
  if (userId) {
    await db.auditLog.create({
      data: {
        userId,
        action: 'subscription_updated',
        resource: 'subscription',
        resourceId: subscription.id,
        details: {
          plan: subscription.items.data[0].price.id,
          status: subscription.status,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      },
    })
  }
}

/**
 * Handle subscription deleted event
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id)

  const userId = subscription.metadata.userId

  // Delete subscription from database
  await deleteSubscriptionFromDatabase(subscription.id)

  // Downgrade user to free plan
  if (userId) {
    await db.user.update({
      where: { id: userId },
      data: { plan: 'STARTER' },
    })

    await db.auditLog.create({
      data: {
        userId,
        action: 'subscription_deleted',
        resource: 'subscription',
        resourceId: subscription.id,
        details: {
          reason: subscription.cancellation_details?.reason || 'unknown',
        },
      },
    })
  }
}

/**
 * Handle successful payment
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id)

  if (!invoice.subscription) return

  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription as string },
    include: { user: true },
  })

  if (subscription) {
    await db.auditLog.create({
      data: {
        userId: subscription.userId,
        action: 'payment_succeeded',
        resource: 'invoice',
        resourceId: invoice.id,
        details: {
          amount: invoice.amount_paid,
          currency: invoice.currency,
          subscriptionId: typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription.id,
        },
      },
    })

    // Send payment receipt email
    // await sendPaymentReceiptEmail(subscription.user.email, invoice)
  }
}

/**
 * Handle failed payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id)

  if (!invoice.subscription) return

  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription as string },
    include: { user: true },
  })

  if (subscription) {
    // Update subscription status to PAST_DUE
    await db.subscription.update({
      where: { id: subscription.id },
      data: { status: 'PAST_DUE' },
    })

    await db.auditLog.create({
      data: {
        userId: subscription.userId,
        action: 'payment_failed',
        resource: 'invoice',
        resourceId: invoice.id,
        details: {
          amount: invoice.amount_due,
          currency: invoice.currency,
          subscriptionId: typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription.id,
          attemptCount: invoice.attempt_count,
        },
      },
    })

    // Send payment failed email
    // await sendPaymentFailedEmail(subscription.user.email, invoice)
  }
}

/**
 * Handle trial ending soon
 */
async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  console.log('Trial will end:', subscription.id)

  const userId = subscription.metadata.userId
  if (!userId) return

  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (user) {
    await db.auditLog.create({
      data: {
        userId,
        action: 'trial_will_end',
        resource: 'subscription',
        resourceId: subscription.id,
        details: {
          trialEnd: new Date(subscription.trial_end! * 1000),
        },
      },
    })

    // Send trial ending email
    // await sendTrialEndingEmail(user.email, subscription)
  }
}
