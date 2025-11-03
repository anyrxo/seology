/**
 * Billing Dashboard Page
 * Shows subscription, usage, and billing management
 */

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getUsageSummary } from '@/lib/usage'
import { BillingClient } from '@/components/billing/BillingClient'

export default async function BillingPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user with subscription
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      subscriptions: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Get usage stats
  const usage = await getUsageSummary(user.id)
  const subscription = user.subscriptions[0]

  // Get Stripe subscription status if exists
  let stripeStatus: 'active' | 'past_due' | 'canceled' | 'trialing' | null = null
  let nextBillingDate: Date | null = null

  if (subscription) {
    stripeStatus = subscription.status === 'ACTIVE' ? 'active'
      : subscription.status === 'PAST_DUE' ? 'past_due'
      : subscription.status === 'TRIALING' ? 'trialing'
      : 'canceled'
    nextBillingDate = subscription.currentPeriodEnd
  }

  return (
    <BillingClient
      usage={usage}
      stripeStatus={stripeStatus}
      nextBillingDate={nextBillingDate}
      stripeCustomerId={user.stripeCustomerId}
      currentPlan={user.plan}
    />
  )
}
