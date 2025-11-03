/**
 * Create Stripe Checkout Session
 * Redirects user to Stripe to complete payment
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { Plan } from '@prisma/client'

export const dynamic = 'force-dynamic'

const PLAN_PRICE_IDS = {
  STARTER: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter',
  GROWTH: process.env.STRIPE_GROWTH_PRICE_ID || 'price_growth',
  SCALE: process.env.STRIPE_SCALE_PRICE_ID || 'price_scale',
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { plan } = body as { plan: Plan }

    if (!plan || !['STARTER', 'GROWTH', 'SCALE'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
      include: { subscriptions: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // If user has an active subscription, redirect to portal instead
    const activeSubscription = user.subscriptions[0]
    if (user.stripeCustomerId && activeSubscription) {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
      })

      return NextResponse.json({
        success: true,
        url: portalSession.url,
      })
    }

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: PLAN_PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: {
        userId: user.id,
        clerkId: session.userId,
        plan,
      },
    })

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
