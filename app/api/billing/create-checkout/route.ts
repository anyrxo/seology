import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createOrGetStripeCustomer, createCheckoutSession } from '@/lib/stripe'
import { getPlan } from '@/lib/plans'
import { db } from '@/lib/db'

/**
 * POST /api/billing/create-checkout
 * Create a Stripe checkout session for subscription
 */
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { priceId, planName } = body

    if (!priceId || !planName) {
      return NextResponse.json(
        { error: 'Missing priceId or planName' },
        { status: 400 }
      )
    }

    // Verify plan exists
    const plan = getPlan(planName)
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get or create user in database
    let dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    })

    if (!dbUser) {
      // Create user if doesn't exist
      dbUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName || undefined,
        },
      })
    }

    // Create or get Stripe customer
    const customerId = await createOrGetStripeCustomer(
      dbUser.id,
      user.emailAddresses[0].emailAddress,
      user.fullName || undefined
    )

    // Check if user already has an active subscription
    const existingSubscription = await db.subscription.findUnique({
      where: { userId: dbUser.id },
    })

    if (existingSubscription && existingSubscription.status === 'ACTIVE') {
      return NextResponse.json(
        { error: 'User already has an active subscription' },
        { status: 400 }
      )
    }

    // Create checkout session
    const session = await createCheckoutSession({
      customerId,
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      userId: dbUser.id,
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
