'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  ArrowRight,
  Shield,
  CreditCard,
  Clock,
  HelpCircle,
  Zap,
  Users,
  Globe,
  Sparkles,
  Lock,
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
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-green-600/10 border border-green-500/20 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm text-green-400">
              14-day free trial • No credit card required
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent Pricing.
            <br />
            <span className="text-blue-500">No Hidden Fees.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime. All plans include AI-powered SEO fixes, secure integrations, and 90-day rollback protection.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-900 border border-gray-800 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-semibold transition-colors relative ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gray-900 border-2 rounded-lg p-8 ${
                plan.popular
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-4 py-1 rounded-full font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-white">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-500">
                    Save ${getSavings(plan)}/year
                  </p>
                )}
                <p className="text-gray-400 mt-2">{plan.description}</p>
              </div>

              <Link
                href="/sign-up"
                className={`block text-center py-3 rounded-lg font-semibold transition-all mb-6 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included ? 'text-gray-300' : 'text-gray-600'
                      }
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-400">
              See exactly what is included in each plan
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 text-white font-semibold">
                    STARTER
                  </th>
                  <th className="text-center py-4 px-6 text-white font-semibold">
                    GROWTH
                  </th>
                  <th className="text-center py-4 px-6 text-white font-semibold">
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
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-b border-gray-800"
                  >
                    <td className="py-4 px-6 text-gray-300">{row.feature}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className="py-4 px-6 text-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300">{value}</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center"
              >
                <badge.icon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-400">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-12 text-center"
          >
            <Users className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a Custom Enterprise Plan?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get custom pricing, dedicated support, and tailored features for
              your agency or large organization. We will work with you to build
              the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Contact Sales Team
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <HelpCircle className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Pricing Questions?
            </h2>
            <p className="text-xl text-gray-400">
              Common questions about billing and plans
            </p>
          </motion.div>

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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Fix Your SEO Automatically?"
        description="Start your 14-day free trial today. No credit card required."
        primaryCTA={{ text: 'Start Free Trial →', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Features', href: '/features' }}
      />
    </>
  )
}
