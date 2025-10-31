'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Download, CreditCard, AlertCircle, Loader2 } from 'lucide-react'
import { getAllPlans, getPlan } from '@/lib/plans'
import type { BillingData, PlanName } from '@/types/billing'
import { UsageBar as SharedUsageBar } from '@/components/usage/UsageBar'

export default function BillingPage() {
  const [billingData, setBillingData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState<PlanName | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBillingData()
  }, [])

  async function fetchBillingData() {
    try {
      const response = await fetch('/api/billing/subscription')
      if (!response.ok) {
        throw new Error('Failed to fetch billing data')
      }
      const data = await response.json()
      setBillingData(data)
    } catch (error) {
      console.error('Error fetching billing data:', error)
      setError('Failed to load billing information')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpgrade(planName: PlanName) {
    setProcessingPlan(planName)
    setError(null)

    try {
      const plan = getPlan(planName)

      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          planName: plan.name,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      // Redirect to Stripe checkout
      if (url) {
        window.location.href = url
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error)
      setError(error.message || 'Failed to start checkout')
      setProcessingPlan(null)
    }
  }

  async function handleManageSubscription() {
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const { url } = await response.json()

      // Redirect to Stripe customer portal
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating portal session:', error)
      setError('Failed to open billing portal')
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  const currentPlanName = billingData?.plan?.name || 'STARTER'
  const subscription = billingData?.subscription
  const usage = billingData?.usage || {
    sitesConnected: 0,
    fixesApplied: 0,
    aiCallsMade: 0,
  }
  const invoices = billingData?.invoices || []

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your subscription and view usage
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/10">
          <CardContent className="flex items-center gap-2 pt-6">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                {subscription
                  ? `You are on the ${billingData.plan.name} plan`
                  : 'You are on the free trial'}
              </CardDescription>
            </div>
            <Badge
              variant={
                subscription?.status === 'ACTIVE' || subscription?.status === 'TRIALING'
                  ? 'success'
                  : subscription?.status === 'PAST_DUE'
                  ? 'destructive'
                  : 'default'
              }
            >
              {subscription?.status || 'FREE'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Plan
              </div>
              <div className="mt-1 text-2xl font-bold">{billingData?.plan.name}</div>
              <div className="mt-1 text-sm text-gray-600">
                ${billingData?.plan.price}/month
              </div>
            </div>
            {subscription && (
              <>
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Next Billing Date
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {getDaysUntil(subscription.currentPeriodEnd)} days
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Payment Method
                  </div>
                  {subscription.paymentMethod ? (
                    <>
                      <div className="mt-1 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium capitalize">
                          {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={handleManageSubscription}
                      >
                        Update
                      </Button>
                    </>
                  ) : (
                    <div className="mt-1 text-sm text-gray-600">No payment method</div>
                  )}
                </div>
              </>
            )}
          </div>
          {subscription && (
            <div className="mt-6">
              <Button onClick={handleManageSubscription} variant="outline">
                Manage Subscription
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>Track your monthly usage limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SharedUsageBar
            label="Sites Connected"
            current={usage.sitesConnected}
            limit={billingData?.plan.limits?.sites || 3}
            unit="sites"
          />
          <SharedUsageBar
            label="Fixes Applied"
            current={usage.fixesApplied}
            limit={billingData?.plan.limits?.fixesPerMonth || 50}
            unit="fixes"
          />
          <SharedUsageBar
            label="AI Analyses"
            current={usage.aiCallsMade}
            limit={billingData?.plan.limits?.aiAnalyses || 100}
            unit="analyses"
          />
        </CardContent>
      </Card>

      {/* Upgrade Plans */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {getAllPlans().map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.displayName}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              current={currentPlanName === plan.name}
              recommended={plan.highlighted}
              onUpgrade={() => handleUpgrade(plan.name as PlanName)}
              loading={processingPlan === plan.name}
            />
          ))}
        </div>
      </div>

      {/* Invoice History */}
      {invoices.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Download your past invoices</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cancel Subscription */}
      {subscription && subscription.status === 'ACTIVE' && !subscription.cancelAtPeriodEnd && (
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600">Cancel Subscription</CardTitle>
            <CardDescription>
              Your subscription will remain active until the end of the billing period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={handleManageSubscription}
            >
              Manage Subscription
            </Button>
          </CardContent>
        </Card>
      )}

      {subscription?.cancelAtPeriodEnd && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/10">
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                Your subscription will be cancelled on{' '}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">
                You can reactivate your subscription at any time before then
              </p>
            </div>
            <Button onClick={handleManageSubscription}>Reactivate</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function UsageBar({
  label,
  current,
  limit,
  unit,
}: {
  label: string
  current: number
  limit: number
  unit: string
}) {
  const isUnlimited = limit === -1
  const percentage = isUnlimited ? 0 : (current / limit) * 100
  const isNearLimit = percentage >= 80

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current} {isUnlimited ? unit : `/ ${limit} ${unit}`}
        </span>
      </div>
      {!isUnlimited && (
        <>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className={`h-full transition-all ${
                isNearLimit ? 'bg-yellow-500' : 'bg-green-600'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          {isNearLimit && (
            <p className="mt-1 text-xs text-yellow-600">
              You're approaching your limit. Consider upgrading.
            </p>
          )}
        </>
      )}
    </div>
  )
}

function PlanCard({
  name,
  price,
  description,
  features,
  current = false,
  recommended = false,
  onUpgrade,
  loading = false,
}: {
  name: string
  price: number
  description: string
  features: string[]
  current?: boolean
  recommended?: boolean
  onUpgrade: () => void
  loading?: boolean
}) {
  return (
    <div
      className={`relative rounded-lg border-2 p-6 ${
        recommended
          ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
          : 'border-gray-200 dark:border-gray-800'
      }`}
    >
      {recommended && (
        <Badge variant="success" className="absolute -top-3 right-4">
          Recommended
        </Badge>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-600 dark:text-gray-400">/month</span>
      </div>
      <ul className="mb-6 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${
          current
            ? 'bg-gray-300 text-gray-600 hover:bg-gray-300'
            : 'bg-green-600 hover:bg-green-700'
        }`}
        disabled={current || loading}
        onClick={onUpgrade}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : current ? (
          'Current Plan'
        ) : (
          'Upgrade to ' + name
        )}
      </Button>
    </div>
  )
}

function InvoiceRow({ invoice }: { invoice: any }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <div className="font-medium">
          {new Date(invoice.created).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Invoice {invoice.id}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="font-semibold">
          ${(invoice.amount / 100).toFixed(2)}
        </div>
        <Badge variant={invoice.status === 'paid' ? 'success' : 'default'}>
          {invoice.status}
        </Badge>
        {invoice.invoicePdf && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(invoice.invoicePdf, '_blank')}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
      </div>
    </div>
  )
}

function getDaysUntil(date: Date): number {
  const now = new Date()
  const end = new Date(date)
  const diffTime = end.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
