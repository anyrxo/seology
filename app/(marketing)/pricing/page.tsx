'use client'

export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Check,
  X,
  ArrowRight,
  Shield,
  CreditCard,
  Clock,
  HelpCircle,
  Lock,
  Sparkles,
  Zap,
  Globe,
  Users,
  TrendingUp,
  ChevronDown,
  Star,
  Award,
} from 'lucide-react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const plans = [
    {
      name: 'STARTER',
      tagline: 'For small businesses',
      description: 'Perfect for testing and small projects',
      monthlyPrice: 29,
      annualPrice: 24,
      icon: Globe,
      features: [
        { name: '3 connected sites', included: true },
        { name: '500 SEO fixes per month', included: true },
        { name: 'All platform integrations', included: true },
        { name: 'Advanced AI analysis', included: true },
        { name: 'Email support', included: true },
        { name: '90-day rollback protection', included: true },
        { name: 'Basic analytics dashboard', included: true },
        { name: 'Priority support', included: false },
        { name: 'API access', included: false },
        { name: 'Team collaboration', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
      gradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      buttonStyle: 'bg-gray-900 hover:bg-gray-800 text-white',
    },
    {
      name: 'GROWTH',
      tagline: 'For growing companies',
      description: 'Most popular plan for scaling businesses',
      monthlyPrice: 99,
      annualPrice: 82,
      icon: TrendingUp,
      features: [
        { name: '10 connected sites', included: true },
        { name: '5,000 SEO fixes per month', included: true },
        { name: 'All Starter features', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Custom SEO fix rules', included: true },
        { name: 'Full API access', included: true },
        { name: 'Team collaboration (5 users)', included: true },
        { name: 'A/B testing capabilities', included: true },
        { name: 'Scheduled automated fixes', included: true },
      ],
      cta: 'Start Free Trial',
      popular: true,
      gradient: 'from-blue-50 via-indigo-50 to-purple-50',
      borderColor: 'border-blue-500',
      buttonStyle: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50',
    },
    {
      name: 'SCALE',
      tagline: 'For enterprises',
      description: 'Unlimited power for large organizations',
      monthlyPrice: 299,
      annualPrice: 249,
      icon: Award,
      features: [
        { name: 'Unlimited connected sites', included: true },
        { name: 'Unlimited SEO fixes', included: true },
        { name: 'All Growth features', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'White-label capabilities', included: true },
        { name: '99.9% uptime SLA guarantee', included: true },
        { name: 'Custom CMS integrations', included: true },
        { name: 'Phone & Slack support', included: true },
        { name: 'Unlimited team members', included: true },
        { name: 'SSO / SAML authentication', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-300',
      buttonStyle: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white',
    },
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
  }

  const getAnnualSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12
    const annualCost = plan.annualPrice * 12
    return monthlyCost - annualCost
  }

  const faqs = [
    {
      question: 'What counts as an SEO fix?',
      answer: 'A fix is any automated change we make to your website to improve SEO. This includes adding or optimizing meta descriptions, fixing alt text on images, correcting broken links, improving heading structure, adding structured data, optimizing page speed elements, and more. Each individual change counts as one fix.',
    },
    {
      question: 'Can I upgrade or downgrade my plan at any time?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time from your dashboard settings. Upgrades take effect immediately and you get instant access to higher limits. Downgrades take effect at the end of your current billing period. We prorate all changes fairly.',
    },
    {
      question: 'What happens if I exceed my monthly fix limit?',
      answer: 'We send you notifications when you reach 80% and 90% of your limit. Once you hit 100%, automatic fixes will pause until the next billing cycle. You can upgrade to a higher plan at any time to continue getting fixes immediately. No fixes are ever lost - they queue until you have capacity.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes! We offer a 14-day free trial for all paid plans (no credit card required). If you subscribe and are not satisfied, we offer a 30-day money-back guarantee. Just contact our support team and we will process your refund promptly.',
    },
    {
      question: 'How does the annual billing discount work?',
      answer: 'Annual plans save you approximately 17% compared to monthly billing. You are billed once per year and essentially get 2 months free. You get the exact same features and limits as monthly plans. Annual subscribers also get priority support queue access.',
    },
    {
      question: 'Can I add more team members to my plan?',
      answer: 'The Starter plan includes 1 user. Growth plans include 5 users. Scale plans have unlimited users. For Growth plans, you can add additional users for $15/user/month. Team members can collaborate on sites, approve fixes, and access analytics based on their role permissions.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) processed securely through Stripe. Enterprise customers on Scale plans can also pay via ACH bank transfer or receive invoices for wire transfer.',
    },
    {
      question: 'Is there a setup fee or long-term contract?',
      answer: 'No setup fees ever. No long-term contracts. You can cancel your subscription at any time and you will not be charged again. Your account and data remain accessible for 30 days after cancellation, giving you time to export or review your information.',
    },
    {
      question: 'What platforms and CMSs do you support?',
      answer: 'We support Shopify, WordPress, Wix, Squarespace, Webflow, and any custom website via our Magic.js connector. We are constantly adding new integrations. If you need a specific platform, contact us and we can prioritize it.',
    },
    {
      question: 'How does the 90-day rollback protection work?',
      answer: 'Every fix we make is stored with before/after snapshots. If you ever want to undo a fix, you can roll it back with one click within 90 days. After 90 days, rollback data is archived for compliance but not instantly reversible. This protects you from any unintended changes.',
    },
  ]

  const comparisonFeatures = [
    { category: 'Core Features', features: [
      { name: 'Connected Sites', starter: '3 sites', growth: '10 sites', scale: 'Unlimited' },
      { name: 'SEO Fixes per Month', starter: '500', growth: '5,000', scale: 'Unlimited' },
      { name: 'AI-Powered Analysis', starter: true, growth: true, scale: true },
      { name: 'Platform Integrations', starter: true, growth: true, scale: true },
      { name: '90-Day Rollback', starter: true, growth: true, scale: true },
    ]},
    { category: 'Support & Success', features: [
      { name: 'Support Channel', starter: 'Email', growth: 'Email & Chat', scale: 'Phone & Slack' },
      { name: 'Response Time', starter: '24 hours', growth: '4 hours', scale: '1 hour' },
      { name: 'Dedicated Success Manager', starter: false, growth: false, scale: true },
      { name: 'Onboarding Call', starter: false, growth: true, scale: true },
      { name: 'Quarterly Business Reviews', starter: false, growth: false, scale: true },
    ]},
    { category: 'Analytics & Reporting', features: [
      { name: 'Analytics Dashboard', starter: 'Basic', growth: 'Advanced', scale: 'Enterprise' },
      { name: 'Custom Reports', starter: false, growth: true, scale: true },
      { name: 'Data Export', starter: 'CSV', growth: 'CSV & API', scale: 'All formats' },
      { name: 'Real-time Monitoring', starter: false, growth: true, scale: true },
    ]},
    { category: 'Advanced Features', features: [
      { name: 'API Access', starter: false, growth: true, scale: true },
      { name: 'Custom Fix Rules', starter: false, growth: true, scale: true },
      { name: 'A/B Testing', starter: false, growth: true, scale: true },
      { name: 'Scheduled Fixes', starter: false, growth: true, scale: true },
      { name: 'White-Label', starter: false, growth: false, scale: true },
      { name: 'Custom Integrations', starter: false, growth: false, scale: true },
      { name: 'SSO / SAML', starter: false, growth: false, scale: true },
      { name: 'SLA Guarantee', starter: false, growth: false, scale: '99.9%' },
    ]},
    { category: 'Team & Collaboration', features: [
      { name: 'Team Members', starter: '1', growth: '5', scale: 'Unlimited' },
      { name: 'Role-Based Access', starter: false, growth: true, scale: true },
      { name: 'Activity Logs', starter: 'Basic', growth: 'Advanced', scale: 'Full Audit' },
      { name: 'Approval Workflows', starter: false, growth: true, scale: true },
    ]},
  ]

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/15 via-pink-500/15 to-blue-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-full mb-8 shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">
                14-day free trial • No credit card required
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Simple, Transparent Pricing
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-600 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              No hidden fees. No surprises.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-500 mb-12 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
              All plans include AI-powered SEO fixes and 90-day rollback protection.
            </motion.p>

            {/* Billing Cycle Toggle */}
            <motion.div
              className="inline-flex items-center gap-3 p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-xl shadow-inner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual
                <motion.span
                  className="absolute -top-3 -right-3 px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-bold shadow-lg"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Save 17%
                </motion.span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {plans.map((plan, index) => {
              const PlanIcon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  className={`relative flex flex-col bg-gradient-to-br ${plan.gradient} rounded-3xl p-8 transition-all duration-500 ${
                    plan.popular
                      ? `border-4 ${plan.borderColor} shadow-2xl shadow-blue-500/20 lg:scale-105 z-10`
                      : `border-2 ${plan.borderColor} shadow-xl hover:shadow-2xl`
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{
                    y: plan.popular ? -4 : -8,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      MOST POPULAR
                    </motion.div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${
                        plan.popular
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                          : 'bg-gray-900'
                      }`}>
                        <PlanIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-500 tracking-widest uppercase">
                          {plan.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {plan.tagline}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-gray-900">
                          ${getPrice(plan)}
                        </span>
                        <span className="text-xl text-gray-500 font-medium">/month</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <motion.div
                          className="flex items-center gap-2 mt-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <Zap className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-bold">
                            Save ${getAnnualSavings(plan)}/year
                          </span>
                        </motion.div>
                      )}
                      {billingCycle === 'monthly' && (
                        <div className="text-sm text-gray-500 mt-2">
                          Billed monthly
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={plan.name === 'SCALE' ? '/contact' : '/sign-up'}
                    className={`group w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 mb-8 flex items-center justify-center gap-2 ${plan.buttonStyle}`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Features List */}
                  <div className="space-y-4 flex-1">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                      What's included:
                    </div>
                    {plan.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {feature.included ? (
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white font-bold" />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mt-0.5">
                            <X className="w-3 h-3 text-gray-400" />
                          </div>
                        )}
                        <span
                          className={`text-sm font-medium ${
                            feature.included
                              ? 'text-gray-900'
                              : 'text-gray-400 line-through'
                          }`}
                        >
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Glow Effect on Hover */}
                  {plan.popular && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ filter: 'blur(20px)' }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: '100% Secure',
                description: 'Bank-level encryption',
                color: 'text-blue-600',
                bg: 'bg-blue-50'
              },
              {
                icon: Clock,
                title: '14-Day Trial',
                description: 'No credit card needed',
                color: 'text-green-600',
                bg: 'bg-green-50'
              },
              {
                icon: CreditCard,
                title: 'Cancel Anytime',
                description: 'No long-term contracts',
                color: 'text-purple-600',
                bg: 'bg-purple-50'
              },
              {
                icon: Lock,
                title: 'Money Back',
                description: '30-day guarantee',
                color: 'text-amber-600',
                bg: 'bg-amber-50'
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center text-center p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className={`p-4 ${badge.bg} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <badge.icon className={`w-7 h-7 ${badge.color}`} />
                </div>
                <div className="text-base font-bold text-gray-900 mb-1">
                  {badge.title}
                </div>
                <div className="text-sm text-gray-600">
                  {badge.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Feature Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              See exactly what is included in each plan
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Starter
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-blue-700 uppercase tracking-wider bg-blue-50">
                      Growth
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Scale
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, catIndex) => (
                    <React.Fragment key={catIndex}>
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="px-6 py-3">
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            {category.category}
                          </div>
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <motion.tr
                          key={featureIndex}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.03 }}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {feature.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-semibold text-gray-900">
                                {feature.starter}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center bg-blue-50/50">
                            {typeof feature.growth === 'boolean' ? (
                              feature.growth ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-semibold text-gray-900">
                                {feature.growth}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.scale === 'boolean' ? (
                              feature.scale ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-semibold text-gray-900">
                                {feature.scale}
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Automate Your SEO?
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of businesses using AI to fix their SEO automatically.
              <br className="hidden sm:block" />
              Start your free trial today - no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-black rounded-xl hover:bg-blue-50 transition-all duration-300 text-lg shadow-2xl shadow-blue-900/30"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 text-lg border-2 border-white/30"
                >
                  Talk to Sales
                </Link>
              </motion.div>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
