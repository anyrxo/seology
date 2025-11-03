'use client'

/**
 * Billing Client Component
 * Uses Dashflow X components for billing management
 */

import { useState } from 'react'
import { CreditCard, Receipt, AlertCircle, DollarSign, TrendingUp, Calendar } from 'lucide-react'
import { PlanComparison } from './PlanComparison'

interface UsageSummary {
  plan: {
    name: string
    price: number
  }
  sites: {
    used: number
    limit: number
    remaining: number
    percentUsed: number
  }
  fixes: {
    used: number
    limit: number
    remaining: number
    percentUsed: number
  }
  warnings: {
    sitesAtLimit: boolean
    sitesNearLimit: boolean
    fixesAtLimit: boolean
    fixesNearLimit: boolean
  }
}

interface BillingClientProps {
  usage: UsageSummary
  stripeStatus: 'active' | 'past_due' | 'canceled' | 'trialing' | null
  nextBillingDate: Date | null
  stripeCustomerId: string | null
  currentPlan: 'STARTER' | 'GROWTH' | 'SCALE'
}

export function BillingClient({
  usage,
  stripeStatus,
  nextBillingDate,
  stripeCustomerId,
  currentPlan,
}: BillingClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'plans'>('overview')
  const [couponCode, setCouponCode] = useState('')

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      })
      const data = await response.json()
      if (data.success && data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error opening billing portal:', error)
    }
  }

  return (
    <div className="bg-neutral-200 min-h-screen">
      <div className="container-default w-container">
        <div className="gap-row-24px">
          {/* Header */}
          <div className="rt-component-section gap-row-24px">
            <div className="flex-horizontal align-center gap-column-16px">
              <div className="card-icon-square _40px flex-horizontal">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h1 className="display-2 color-neutral-800">
                  Billing & Subscription
                </h1>
                <p className="text-200 medium color-neutral-600">
                  Manage your subscription, monitor usage, and view billing history
                </p>
              </div>
            </div>
          </div>

          {/* Payment Failed Alert */}
          {stripeStatus === 'past_due' && (
            <div className="card pd-32px---44px" style={{ marginTop: '24px', backgroundColor: 'var(--system--red-100)', border: '1px solid var(--system--red-200)' }}>
              <div className="flex-horizontal align-center gap-column-16px">
                <div className="avatar-circle _32px" style={{ backgroundColor: 'var(--system--red-200)' }}>
                  <AlertCircle className="h-4 w-4" style={{ color: 'var(--system--red-400)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="text-200 bold mg-bottom-4px" style={{ color: 'var(--system--red-400)' }}>Payment Failed</h3>
                  <p className="text-100 medium color-neutral-700">
                    Your most recent payment failed. Please update your payment method to avoid service interruption.
                  </p>
                </div>
                <button
                  onClick={handleManageSubscription}
                  className="btn-primary medium"
                  style={{ backgroundColor: 'var(--system--red-400)', borderColor: 'var(--system--red-400)' }}
                >
                  Update Payment
                </button>
              </div>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="tabs-menu links-single">
            <button
              onClick={() => setActiveTab('overview')}
              className={`tab-menu-underline-link ${activeTab === 'overview' ? 'w--current' : ''}`}
            >
              <DollarSign className="h-4 w-4" style={{ marginRight: '8px' }} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`tab-menu-underline-link ${activeTab === 'history' ? 'w--current' : ''}`}
            >
              <Receipt className="h-4 w-4" style={{ marginRight: '8px' }} />
              Billing History
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`tab-menu-underline-link ${activeTab === 'plans' ? 'w--current' : ''}`}
            >
              <TrendingUp className="h-4 w-4" style={{ marginRight: '8px' }} />
              Plans
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Current Plan Card */}
              <div className="card pd-32px---44px" style={{ marginTop: '24px', background: 'linear-gradient(135deg, var(--accent--primary-1) 0%, var(--secondary--color-5) 100%)' }}>
                <div className="flex-horizontal space-between align-center children-wrap gap-16px---8px">
                  <div>
                    <div className="flex-horizontal align-center gap-column-12px mg-bottom-8px">
                      <h2 className="text-400 bold color-neutral-100">{usage.plan.name} Plan</h2>
                      {stripeStatus && (
                        <span className={`badge ${
                          stripeStatus === 'active' ? 'success' :
                          stripeStatus === 'trialing' ? 'info' :
                          stripeStatus === 'past_due' ? 'danger' : ''
                        }`}>
                          {stripeStatus.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-200 medium color-neutral-200">
                      ${usage.plan.price}/month
                      {nextBillingDate && ` • Renews ${new Date(nextBillingDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  {stripeCustomerId && (
                    <button
                      onClick={handleManageSubscription}
                      className="btn-secondary large"
                    >
                      Manage Subscription
                    </button>
                  )}
                </div>
              </div>

              {/* Usage Stats Card */}
              <div className="card pd-32px---44px" style={{ marginTop: '24px' }}>
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-32px">
                  <div className="avatar-circle _40px">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-300 bold color-neutral-800">Usage This Month</h2>
                    <p className="text-100 medium color-neutral-600">Track your monthly usage across all limits</p>
                  </div>
                </div>

                <div className="grid-2-columns gap-row-24px gap-column-24px">
                  {/* Sites Usage */}
                  <div className="card pd-24px">
                    <div className="flex-horizontal space-between align-center mg-bottom-16px">
                      <p className="text-200 medium color-neutral-800">Sites Connected</p>
                      <div className="tooltip bottom">
                        <span style={{ cursor: 'help' }}>ℹ️</span>
                        <div className="tooltip-content">Number of connected sites vs your plan limit</div>
                      </div>
                    </div>
                    <div className="flex-horizontal align-end gap-column-8px mg-bottom-12px">
                      <span className="text-500 bold color-neutral-800">{usage.sites.used}</span>
                      <span className="text-200 medium color-neutral-600 mg-bottom-4px">
                        / {usage.sites.limit === 999999 ? '∞' : usage.sites.limit}
                      </span>
                    </div>
                    <div className="progress-bar-wrapper">
                      <div
                        className={`progress-bar ${
                          usage.sites.percentUsed >= 90 ? 'red' :
                          usage.sites.percentUsed >= 70 ? 'yellow' : 'green'
                        }`}
                        style={{ width: `${Math.min(usage.sites.percentUsed, 100)}%` }}
                      ></div>
                    </div>
                    {usage.warnings.sitesAtLimit && (
                      <p className="text-100 medium mg-top-8px" style={{ color: 'var(--system--red-400)' }}>
                        Site limit reached. Upgrade to connect more sites.
                      </p>
                    )}
                  </div>

                  {/* Fixes Usage */}
                  <div className="card pd-24px">
                    <div className="flex-horizontal space-between align-center mg-bottom-16px">
                      <p className="text-200 medium color-neutral-800">Monthly Fixes</p>
                      <div className="tooltip bottom">
                        <span style={{ cursor: 'help' }}>ℹ️</span>
                        <div className="tooltip-content">Number of fixes applied this month</div>
                      </div>
                    </div>
                    <div className="flex-horizontal align-end gap-column-8px mg-bottom-12px">
                      <span className="text-500 bold color-neutral-800">{usage.fixes.used}</span>
                      <span className="text-200 medium color-neutral-600 mg-bottom-4px">
                        / {usage.fixes.limit === 999999 ? '∞' : usage.fixes.limit}
                      </span>
                    </div>
                    <div className="progress-bar-wrapper">
                      <div
                        className={`progress-bar ${
                          usage.fixes.percentUsed >= 90 ? 'red' :
                          usage.fixes.percentUsed >= 70 ? 'yellow' : 'green'
                        }`}
                        style={{ width: `${Math.min(usage.fixes.percentUsed, 100)}%` }}
                      ></div>
                    </div>
                    {usage.warnings.fixesAtLimit && (
                      <p className="text-100 medium mg-top-8px" style={{ color: 'var(--system--red-400)' }}>
                        Monthly fix limit reached. Upgrade for more fixes.
                      </p>
                    )}
                    {usage.warnings.fixesNearLimit && !usage.warnings.fixesAtLimit && (
                      <p className="text-100 medium mg-top-8px" style={{ color: 'var(--system--yellow-400)' }}>
                        Approaching monthly limit. Consider upgrading.
                      </p>
                    )}
                  </div>
                </div>

                <div className="divider card-small-divider mg-top-24px"></div>
                <div className="flex-horizontal align-center gap-column-12px">
                  <div className="avatar-circle _24px" style={{ backgroundColor: 'var(--system--blue-100)' }}>
                    <Calendar className="h-3 w-3" style={{ color: 'var(--system--blue-400)' }} />
                  </div>
                  <p className="text-100 medium color-neutral-600">
                    Usage resets on the 1st of each month
                  </p>
                </div>
              </div>

              {/* Payment Method Card */}
              {stripeCustomerId && (
                <div className="card pd-32px---44px" style={{ marginTop: '24px' }}>
                  <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                    <div className="avatar-circle _32px">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <h2 className="text-300 bold color-neutral-800">Payment Method</h2>
                  </div>
                  <div className="flex-horizontal space-between align-center">
                    <p className="text-100 medium color-neutral-600">
                      Manage your payment methods through Stripe
                    </p>
                    <button
                      onClick={handleManageSubscription}
                      className="btn-secondary medium"
                    >
                      Manage Payment Methods
                    </button>
                  </div>
                </div>
              )}

              {/* Coupon Code Card */}
              <div className="card pd-32px---44px" style={{ marginTop: '24px' }}>
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="avatar-circle _32px">
                    <span style={{ fontSize: '16px' }}>🎫</span>
                  </div>
                  <h2 className="text-300 bold color-neutral-800">Apply Coupon Code</h2>
                </div>
                <div className="flex-horizontal gap-column-12px">
                  <div style={{ flex: 1, position: 'relative' }}>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="input"
                    />
                  </div>
                  <button className="btn-primary medium">
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Billing History Tab */}
          {activeTab === 'history' && stripeCustomerId && (
            <div className="card pd-32px---44px" style={{ marginTop: '24px' }}>
              <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                <div className="avatar-circle _40px">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-300 bold color-neutral-800">Billing History</h2>
                  <p className="text-100 medium color-neutral-600">View and download your invoices</p>
                </div>
              </div>
              <div className="text-center" style={{ padding: '48px 24px' }}>
                <p className="text-200 medium color-neutral-600 mg-bottom-24px">
                  Access your complete billing history through the Stripe customer portal
                </p>
                <button
                  onClick={handleManageSubscription}
                  className="btn-primary large"
                >
                  View Billing History
                </button>
              </div>
            </div>
          )}

          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <div style={{ marginTop: '24px' }}>
              <PlanComparison currentPlan={currentPlan} showCurrentBadge={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
