'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  X,
  ArrowRight,
  Shield,
  CreditCard,
  Clock,
  HelpCircle,
  Users,
  Lock,
  Sparkles,
} from 'lucide-react'
import CTASection from '@/components/marketing/CTASection'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly'
  )

  const plans = [
    {
      name: 'STARTER',
      description: 'Perfect for Small Businesses',
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        { name: 'Up to 3 sites', included: true },
        { name: '500 SEO fixes per month', included: true },
        { name: 'Shopify & WordPress integration', included: true },
        { name: 'Claude AI analysis', included: true },
        { name: 'Email support', included: true },
        { name: '90-day rollback', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Priority support', included: false },
        { name: 'API access', included: false },
        { name: 'Custom integrations', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'GROWTH',
      description: 'For Growing Companies',
      monthlyPrice: 99,
      annualPrice: 82,
      features: [
        { name: 'Up to 10 sites', included: true },
        { name: '5,000 SEO fixes per month', included: true },
        { name: 'All Starter features', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Custom fix rules', included: true },
        { name: 'Full API access', included: true },
        { name: 'Team collaboration (5 users)', included: true },
        { name: 'A/B testing', included: true },
        { name: 'Scheduled fixes', included: true },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'SCALE',
      description: 'For Enterprise Teams',
      monthlyPrice: 299,
      annualPrice: 249,
      features: [
        { name: 'Unlimited sites', included: true },
        { name: 'Unlimited SEO fixes', included: true },
        { name: 'All Growth features', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'White-label options', included: true },
        { name: '99.9% SLA guarantee', included: true },
        { name: 'Custom CMS integrations', included: true },
        { name: 'Phone & Slack support', included: true },
        { name: 'Unlimited team members', included: true },
        { name: 'Custom contract terms', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
  }

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12
    const annualCost = plan.annualPrice * 12
    const savings = monthlyCost - annualCost
    return savings
  }

  return (
    <div className="bg-neutral-200 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-default" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="text-center">
            <div className="inline-flex items-center primary-badge light mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-100 medium">
                14-day free trial • No credit card required
              </span>
            </div>

            <h1 className="text-600 bold mb-4" style={{ color: 'var(--neutral--800)' }}>
              Simple, Transparent Pricing.
              <br />
              <span style={{ color: 'var(--neutral--600)' }}>No Hidden Fees.</span>
            </h1>

            <p className="text-300 mb-8" style={{ color: 'var(--neutral--600)', maxWidth: '700px', margin: '0 auto 2rem' }}>
              Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime. All plans include AI-powered SEO fixes, secure integrations, and 90-day rollback protection.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1 gap-2" style={{ borderRadius: '12px', border: '1px solid var(--neutral--400)', backgroundColor: 'var(--neutral--100)' }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 text-100 medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'btn-primary'
                    : 'bg-transparent'
                }`}
                style={billingCycle === 'monthly' ? {} : { color: 'var(--neutral--600)' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 text-100 medium transition-all relative ${
                  billingCycle === 'annual'
                    ? 'btn-primary'
                    : 'bg-transparent'
                }`}
                style={billingCycle === 'annual' ? {} : { color: 'var(--neutral--600)' }}
              >
                Annual
                <span className="primary-badge" style={{ position: 'absolute', top: '-12px', right: '-12px', fontSize: '10px' }}>
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-default" style={{ margin: '0 auto' }}>
          <div className="grid-3-columns gap-row-24px">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="card pd-32px---24px"
                style={{
                  position: 'relative',
                  ...(plan.popular && {
                    border: '2px solid var(--accent--primary-1)',
                    boxShadow: '0 4px 20px rgba(61, 115, 255, 0.2)',
                  }),
                }}
              >
                {plan.popular && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                    <span className="primary-badge">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-100 bold mb-2" style={{ color: 'var(--neutral--600)', letterSpacing: '0.1em' }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-600 bold" style={{ color: 'var(--neutral--800)' }}>
                      ${getPrice(plan)}
                    </span>
                    <span className="text-200 ml-2" style={{ color: 'var(--neutral--600)' }}>/month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-100 medium" style={{ color: 'var(--system--green-300)' }}>
                      Save ${getSavings(plan)}/year
                    </p>
                  )}
                  <p className="text-200 mt-2" style={{ color: 'var(--neutral--600)' }}>{plan.description}</p>
                </div>

                <div className="mb-6">
                  <Link
                    href="/sign-up"
                    className="btn-primary large w-full block text-center"
                  >
                    {plan.cta}
                  </Link>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start"
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" style={{ color: 'var(--system--green-300)' }} />
                      ) : (
                        <X className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" style={{ color: 'var(--neutral--400)' }} />
                      )}
                      <span
                        className="text-200"
                        style={{ color: feature.included ? 'var(--neutral--700)' : 'var(--neutral--500)' }}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--neutral--400)' }}>
        <div className="container-default" style={{ margin: '0 auto' }}>
          <div className="text-center mb-12">
            <h2 className="text-500 bold mb-3" style={{ color: 'var(--neutral--800)' }}>
              Compare All Features
            </h2>
            <p className="text-300" style={{ color: 'var(--neutral--600)' }}>
              See exactly what is included in each plan
            </p>
          </div>

          <div className="card pd-24px" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--neutral--400)' }}>
                  <th className="text-100 bold py-4 px-4 text-left" style={{ color: 'var(--neutral--600)' }}>
                    FEATURE
                  </th>
                  <th className="text-100 bold py-4 px-4 text-center" style={{ color: 'var(--neutral--800)' }}>
                    STARTER
                  </th>
                  <th className="text-100 bold py-4 px-4 text-center" style={{ color: 'var(--neutral--800)' }}>
                    GROWTH
                  </th>
                  <th className="text-100 bold py-4 px-4 text-center" style={{ color: 'var(--neutral--800)' }}>
                    SCALE
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Sites', values: ['3', '10', 'Unlimited'] },
                  {
                    feature: 'SEO Fixes/Month',
                    values: ['500', '5,000', 'Unlimited'],
                  },
                  {
                    feature: 'Claude AI Analysis',
                    values: [true, true, true],
                  },
                  {
                    feature: 'Platform Integrations',
                    values: [true, true, true],
                  },
                  { feature: '90-Day Rollback', values: [true, true, true] },
                  {
                    feature: 'Support',
                    values: ['Email', 'Email & Chat', 'Phone & Slack'],
                  },
                  {
                    feature: 'Analytics',
                    values: ['Basic', 'Advanced', 'Advanced'],
                  },
                  { feature: 'API Access', values: [false, true, true] },
                  {
                    feature: 'Team Members',
                    values: ['1', '5', 'Unlimited'],
                  },
                  {
                    feature: 'Custom Integrations',
                    values: [false, false, true],
                  },
                  {
                    feature: 'White-Label',
                    values: [false, false, true],
                  },
                  { feature: 'SLA Guarantee', values: [false, false, true] },
                ].map((row, index) => (
                  <tr
                    key={index}
                    style={{ borderBottom: '1px solid var(--neutral--300)' }}
                  >
                    <td className="text-200 py-4 px-4" style={{ color: 'var(--neutral--700)' }}>{row.feature}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className="py-4 px-4 text-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="w-5 h-5 mx-auto" style={{ color: 'var(--system--green-300)' }} />
                          ) : (
                            <X className="w-5 h-5 mx-auto" style={{ color: 'var(--neutral--400)' }} />
                          )
                        ) : (
                          <span className="text-200 medium" style={{ color: 'var(--neutral--700)' }}>{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-default" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="grid-3-columns gap-row-24px" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              {
                icon: Shield,
                title: 'Secure Payments',
                description: 'Powered by Stripe',
              },
              {
                icon: Lock,
                title: 'Bank-Level Security',
                description: 'AES-256 encryption',
              },
              {
                icon: Clock,
                title: '14-Day Free Trial',
                description: 'No credit card needed',
              },
              {
                icon: CreditCard,
                title: 'Cancel Anytime',
                description: 'No long-term contracts',
              },
            ].map((badge, index) => (
              <div
                key={index}
                className="card pd-24px text-center"
              >
                <badge.icon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--accent--primary-1)' }} />
                <h3 className="text-200 bold mb-2" style={{ color: 'var(--neutral--800)' }}>
                  {badge.title}
                </h3>
                <p className="text-100" style={{ color: 'var(--neutral--600)' }}>{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--neutral--400)' }}>
        <div className="container-default" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="card pd-32px---44px text-center" style={{ background: 'linear-gradient(135deg, var(--secondary--color-3) 0%, var(--neutral--100) 100%)' }}>
            <Users className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--accent--primary-1)' }} />

            <h2 className="text-500 bold mb-4" style={{ color: 'var(--neutral--800)' }}>
              Need a Custom Enterprise Plan?
            </h2>
            <p className="text-300 mb-8" style={{ color: 'var(--neutral--700)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Get custom pricing, dedicated support, and tailored features for
              your agency or large organization. We will work with you to build
              the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center btn-primary large"
              >
                Contact Sales Team
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center btn-primary white large"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-default" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--accent--primary-1)' }} />
            <h2 className="text-500 bold mb-3" style={{ color: 'var(--neutral--800)' }}>
              Pricing Questions?
            </h2>
            <p className="text-300" style={{ color: 'var(--neutral--600)' }}>
              Common questions about billing and plans
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What counts as an SEO fix?',
                answer:
                  'A fix is any change applied to your website, such as adding meta descriptions, fixing alt text, correcting broken links, optimizing headings, or updating structured data. Each individual change counts as one fix.',
              },
              {
                question: 'Can I upgrade or downgrade my plan?',
                answer:
                  'Yes! You can upgrade or downgrade at any time from your dashboard. Changes take effect immediately, and we will prorate the difference. Upgrades give you instant access to higher limits.',
              },
              {
                question: 'What happens if I exceed my monthly fix limit?',
                answer:
                  'We will notify you when you are approaching your limit (at 80% and 90%). Once you hit your limit, automatic fixes pause until next month or you can upgrade immediately to continue.',
              },
              {
                question: 'Do you offer refunds?',
                answer:
                  'We offer a 14-day free trial, so you can test everything before paying. For paid plans, we offer a 30-day money-back guarantee if you are not satisfied.',
              },
              {
                question: 'How does the annual billing discount work?',
                answer:
                  'Annual plans save you 17% compared to monthly billing. You are billed once per year and get 2 months free. All annual plans come with the same features and limits as monthly plans.',
              },
              {
                question: 'Can I add more team members?',
                answer:
                  'Starter plans include 1 user. Growth plans include 5 users. Scale plans have unlimited users. You can add extra user seats to Growth plans for $15/user/month.',
              },
              {
                question: 'What payment methods do you accept?',
                answer:
                  'We accept all major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. Enterprise customers can pay via ACH transfer or invoice.',
              },
              {
                question: 'Is there a setup fee or long-term contract?',
                answer:
                  'No setup fees. No long-term contracts. You can cancel anytime and you will not be charged again. Your data remains accessible for 30 days after cancellation.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="card pd-24px"
              >
                <h3 className="text-300 bold mb-3" style={{ color: 'var(--neutral--800)' }}>
                  {faq.question}
                </h3>
                <p className="text-200" style={{ color: 'var(--neutral--700)' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Fix Your SEO Automatically?"
        description="Start your 14-day free trial today. No credit card required."
        primaryCTA={{ text: 'Start Free Trial', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Features', href: '/features' }}
      />
    </div>
  )
}
