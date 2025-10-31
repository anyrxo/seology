import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { getSubscription, listInvoices } from '@/lib/stripe'
import { getPlanByPriceId } from '@/lib/plans'

/**
 * GET /api/billing/subscription
 * Get current subscription status and details
 */
export async function GET(req: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
      include: {
        subscription: true,
      },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // If no subscription, return free plan info
    if (!dbUser.subscription) {
      return NextResponse.json({
        subscription: null,
        plan: {
          name: dbUser.plan,
          status: 'FREE',
        },
        usage: await getUserUsage(dbUser.id),
        invoices: [],
      })
    }

    // Get Stripe subscription details
    let stripeSubscription = null
    try {
      stripeSubscription = await getSubscription(
        dbUser.subscription.stripeSubscriptionId
      )
    } catch (error) {
      console.error('Error fetching Stripe subscription:', error)
    }

    // Get invoices
    let invoices: any[] = []
    if (dbUser.stripeCustomerId) {
      try {
        const stripeInvoices = await listInvoices(dbUser.stripeCustomerId, 10)
        invoices = stripeInvoices.map((invoice) => ({
          id: invoice.id,
          amount: invoice.amount_paid,
          currency: invoice.currency,
          status: invoice.status,
          created: new Date(invoice.created * 1000),
          invoicePdf: invoice.invoice_pdf,
          hostedInvoiceUrl: invoice.hosted_invoice_url,
        }))
      } catch (error) {
        console.error('Error fetching invoices:', error)
      }
    }

    // Get plan details
    const plan = getPlanByPriceId(dbUser.subscription.stripePriceId)

    // Get usage data
    const usage = await getUserUsage(dbUser.id)

    return NextResponse.json({
      subscription: {
        id: dbUser.subscription.id,
        status: dbUser.subscription.status,
        currentPeriodStart: dbUser.subscription.currentPeriodStart,
        currentPeriodEnd: dbUser.subscription.currentPeriodEnd,
        cancelAtPeriodEnd: dbUser.subscription.cancelAtPeriodEnd,
        paymentMethod: stripeSubscription?.default_payment_method
          ? formatPaymentMethod(stripeSubscription.default_payment_method)
          : null,
      },
      plan: {
        name: plan?.displayName || dbUser.plan,
        price: plan?.price || 0,
        features: plan?.features || [],
        limits: plan?.limits,
      },
      usage,
      invoices,
    })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

/**
 * Get user usage for current month
 */
async function getUserUsage(userId: string) {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // Get or create usage record for current month
  const usage = await db.usage.findUnique({
    where: {
      userId_month: {
        userId,
        month: firstDayOfMonth,
      },
    },
  })

  if (!usage) {
    return {
      fixesApplied: 0,
      aiCallsMade: 0,
      sitesConnected: 0,
    }
  }

  return {
    fixesApplied: usage.fixesApplied,
    aiCallsMade: usage.aiCallsMade,
    sitesConnected: usage.sitesConnected,
  }
}

/**
 * Format payment method for display
 */
function formatPaymentMethod(paymentMethod: any) {
  if (typeof paymentMethod === 'string') {
    return null
  }

  if (paymentMethod.type === 'card') {
    return {
      type: 'card',
      brand: paymentMethod.card.brand,
      last4: paymentMethod.card.last4,
      expMonth: paymentMethod.card.exp_month,
      expYear: paymentMethod.card.exp_year,
    }
  }

  return null
}
