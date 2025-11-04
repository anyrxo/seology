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
        { name: 'Advanced AI analysis', included: true },
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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                14-day free trial • No credit card required
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing.
              <br />
              <span className="text-gray-600">No Hidden Fees.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl">
              Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime. All plans include AI-powered SEO fixes, secure integrations, and 90-day rollback protection.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-2 border-blue-600 shadow-xl'
                    : 'border border-gray-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <div className="text-sm font-semibold text-gray-500 tracking-wider mb-3">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-lg text-gray-500 ml-2">/month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div className="text-sm text-green-600 font-medium mb-2">
                      Save ${getSavings(plan)}/year
                    </div>
                  )}
                  <div className="text-base text-gray-600">
                    {plan.description}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/sign-up"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 mb-8 ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-gray-700'
                            : 'text-gray-400'
                        }`}
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-lg text-gray-600">
              See exactly what is included in each plan
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      FEATURE
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      STARTER
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      GROWTH
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      SCALE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: 'Sites', values: ['3', '10', 'Unlimited'] },
                    { feature: 'SEO Fixes/Month', values: ['500', '5,000', 'Unlimited'] },
                    { feature: 'Advanced AI Analysis', values: [true, true, true] },
                    { feature: 'Platform Integrations', values: [true, true, true] },
                    { feature: '90-Day Rollback', values: [true, true, true] },
                    { feature: 'Support', values: ['Email', 'Email & Chat', 'Phone & Slack'] },
                    { feature: 'Analytics', values: ['Basic', 'Advanced', 'Advanced'] },
                    { feature: 'API Access', values: [false, true, true] },
                    { feature: 'Team Members', values: ['1', '5', 'Unlimited'] },
                    { feature: 'Custom Integrations', values: [false, false, true] },
                    { feature: 'White-Label', values: [false, false, true] },
                    { feature: 'SLA Guarantee', values: [false, false, true] },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      {row.values.map((value, i) => (
                        <td key={i} className="px-6 py-4 text-center">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              {value}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Secure Payments', description: 'Powered by Stripe' },
              { icon: Lock, title: 'Bank-Level Security', description: 'AES-256 encryption' },
              { icon: Clock, title: '14-Day Free Trial', description: 'No credit card needed' },
              { icon: CreditCard, title: 'Cancel Anytime', description: 'No long-term contracts' },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <badge.icon className="w-12 h-12 text-blue-600 mb-4" />
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {badge.title}
                </div>
                <div className="text-sm text-gray-600">
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Need a Custom Enterprise Plan?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get custom pricing, dedicated support, and tailored features for your agency or large organization. We will work with you to build the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Contact Sales Team
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pricing Questions?
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about billing and plans
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What counts as an SEO fix?',
                answer: 'A fix is any change applied to your website, such as adding meta descriptions, fixing alt text, correcting broken links, optimizing headings, or updating structured data. Each individual change counts as one fix.',
              },
              {
                question: 'Can I upgrade or downgrade my plan?',
                answer: 'Yes! You can upgrade or downgrade at any time from your dashboard. Changes take effect immediately, and we will prorate the difference. Upgrades give you instant access to higher limits.',
              },
              {
                question: 'What happens if I exceed my monthly fix limit?',
                answer: 'We will notify you when you are approaching your limit (at 80% and 90%). Once you hit your limit, automatic fixes pause until next month or you can upgrade immediately to continue.',
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 14-day free trial, so you can test everything before paying. For paid plans, we offer a 30-day money-back guarantee if you are not satisfied.',
              },
              {
                question: 'How does the annual billing discount work?',
                answer: 'Annual plans save you 17% compared to monthly billing. You are billed once per year and get 2 months free. All annual plans come with the same features and limits as monthly plans.',
              },
              {
                question: 'Can I add more team members?',
                answer: 'Starter plans include 1 user. Growth plans include 5 users. Scale plans have unlimited users. You can add extra user seats to Growth plans for $15/user/month.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. Enterprise customers can pay via ACH transfer or invoice.',
              },
              {
                question: 'Is there a setup fee or long-term contract?',
                answer: 'No setup fees. No long-term contracts. You can cancel anytime and you will not be charged again. Your data remains accessible for 30 days after cancellation.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Fix Your SEO Automatically?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors duration-300 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors duration-300 text-lg"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
