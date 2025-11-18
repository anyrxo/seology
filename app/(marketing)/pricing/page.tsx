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
    <div className="bg-white dark:bg-black min-h-screen relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full mb-8 shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-black dark:text-white" />
              <span className="text-sm font-semibold text-black dark:text-white">
                14-day free trial • No credit card required
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.header
              className="mx-auto flex flex-col gap-y-3 text-center mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2">
                PRICING
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black dark:text-white mb-6 leading-tight">
                Simple, Transparent Pricing
              </h1>
            </motion.header>

            <motion.p
              className="text-xl sm:text-2xl text-black/60 dark:text-white/60 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              No hidden fees. No surprises.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-black/60 dark:text-white/60 mb-12 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
              All plans include AI-powered SEO fixes and 90-day rollback protection.
            </motion.p>

            {/* Billing Cycle Toggle */}
            <motion.div
              className="inline-flex items-center gap-3 p-1.5 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl shadow-inner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-black text-black dark:text-white shadow-md'
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-white dark:bg-black text-black dark:text-white shadow-md'
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                }`}
              >
                Annual
                <motion.span
                  className="absolute -top-3 -right-3 px-2.5 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full font-bold shadow-lg"
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
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#0a0f1f_30%,transparent)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {plans.map((plan, index) => {
              const PlanIcon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  className={`relative flex flex-col bg-white/95 dark:bg-black/95 backdrop-blur-sm border rounded-[18px] p-8 transition-all duration-500 ${
                    plan.popular
                      ? `border-black dark:border-white shadow-2xl lg:scale-105 z-10`
                      : `border-black/10 dark:border-white/10 shadow-lg hover:shadow-xl`
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
                  {/* Animated colored border ring for popular plan - BEHIND content */}
                  {plan.popular && (
                    <div className="absolute -inset-[2px] rounded-[18px] opacity-100 overflow-hidden z-0">
                      <motion.div
                        className="absolute inset-0 rounded-[18px]"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #06b6d4 100%, transparent 100%)',
                          backgroundSize: '200% 100%',
                          padding: '2px',
                        }}
                        animate={{
                          backgroundPosition: ['200% 0', '-200% 0'],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <div className="w-full h-full rounded-[18px] bg-white dark:bg-black"></div>
                      </motion.div>
                    </div>
                  )}

                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-full shadow-lg flex items-center gap-2 z-20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      MOST POPULAR
                    </motion.div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-8 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${
                        plan.popular
                          ? 'bg-black dark:bg-white'
                          : 'bg-black dark:bg-white'
                      }`}>
                        <PlanIcon className="w-6 h-6 text-white dark:text-black" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-black/60 dark:text-white/60 tracking-widest uppercase">
                          {plan.name}
                        </div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          {plan.tagline}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-black dark:text-white">
                          ${getPrice(plan)}
                        </span>
                        <span className="text-xl text-black/60 dark:text-white/60 font-medium">/month</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <motion.div
                          className="flex items-center gap-2 mt-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <Zap className="w-4 h-4 text-black dark:text-white" />
                          <span className="text-sm text-black dark:text-white font-bold">
                            Save ${getAnnualSavings(plan)}/year
                          </span>
                        </motion.div>
                      )}
                      {billingCycle === 'monthly' && (
                        <div className="text-sm text-black/60 dark:text-white/60 mt-2">
                          Billed monthly
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-black/60 dark:text-white/60">
                      {plan.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/sign-up"
                    className={`group w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 mb-8 flex items-center justify-center gap-2 relative z-10 ${
                      plan.popular
                        ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 shadow-lg hover:shadow-xl'
                        : 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Features List */}
                  <div className="space-y-4 flex-1 relative z-10">
                    <div className="text-xs font-bold text-black/60 dark:text-white/60 uppercase tracking-wider mb-4">
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
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black dark:bg-white flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white dark:text-black font-bold" />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center mt-0.5">
                            <X className="w-3 h-3 text-black/40 dark:text-white/40" />
                          </div>
                        )}
                        <span
                          className={`text-sm font-medium ${
                            feature.included
                              ? 'text-black dark:text-white'
                              : 'text-black/40 dark:text-white/40 line-through'
                          }`}
                        >
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: '100% Secure',
                description: 'Bank-level encryption',
              },
              {
                icon: Clock,
                title: '14-Day Trial',
                description: 'No credit card needed',
              },
              {
                icon: CreditCard,
                title: 'Cancel Anytime',
                description: 'No long-term contracts',
              },
              {
                icon: Lock,
                title: 'Money Back',
                description: '30-day guarantee',
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center text-center p-6 bg-white/80 dark:bg-black/80 rounded-2xl border-2 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="p-4 bg-black/5 dark:bg-white/5 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <badge.icon className="w-7 h-7 text-black dark:text-white" />
                </div>
                <div className="text-base font-bold text-black dark:text-white mb-1">
                  {badge.title}
                </div>
                <div className="text-sm text-black/60 dark:text-white/60">
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
            <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-lg sm:text-xl text-black/60 dark:text-white/60">
              See exactly what is included in each plan
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 dark:bg-black/80 rounded-3xl shadow-2xl border-2 border-black/10 dark:border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/5 dark:bg-white/5 border-b-2 border-black/10 dark:border-white/10">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-black dark:text-white uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-black dark:text-white uppercase tracking-wider">
                      Starter
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-black dark:text-white uppercase tracking-wider bg-black/5 dark:bg-white/5">
                      Growth
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-black dark:text-white uppercase tracking-wider">
                      Scale
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, catIndex) => (
                    <React.Fragment key={catIndex}>
                      <tr className="bg-black/5 dark:bg-white/5">
                        <td colSpan={4} className="px-6 py-3">
                          <div className="text-xs font-bold text-black/60 dark:text-white/60 uppercase tracking-widest">
                            {category.category}
                          </div>
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <motion.tr
                          key={featureIndex}
                          className="border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.03 }}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                            {feature.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <Check className="w-5 h-5 text-black dark:text-white mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-black/20 dark:text-white/20 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-semibold text-black dark:text-white">
                                {feature.starter}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center bg-black/5 dark:bg-white/5">
                            {typeof feature.growth === 'boolean' ? (
                              feature.growth ? (
                                <Check className="w-5 h-5 text-black dark:text-white mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-black/20 dark:text-white/20 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-semibold text-black dark:text-white">
                                {feature.growth}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.scale === 'boolean' ? (
                              feature.scale ? (
                                <Check className="w-5 h-5 text-black dark:text-white mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-black/20 dark:text-white/20 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-semibold text-black dark:text-white">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-black dark:text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-black/60 dark:text-white/60">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-black/80 rounded-2xl border-2 border-black/10 dark:border-white/10 overflow-hidden hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-base font-semibold text-black dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-black/60 dark:text-white/60 flex-shrink-0" />
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
                      <div className="px-6 pb-5 text-black/60 dark:text-white/60 leading-relaxed border-t border-black/10 dark:border-white/10 pt-4">
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
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black dark:bg-white">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white dark:text-black mb-6 leading-tight">
              Ready to Automate Your SEO?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 dark:text-black/60 mb-10 leading-relaxed">
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
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white dark:bg-black text-black dark:text-white font-black rounded-xl hover:bg-white/90 dark:hover:bg-black/90 transition-all duration-300 text-lg shadow-2xl border border-black/10 dark:border-white/10"
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
                  className="inline-flex items-center justify-center px-10 py-5 bg-white/10 dark:bg-black/10 backdrop-blur-sm text-white dark:text-black font-bold rounded-xl hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 text-lg border-2 border-white/30 dark:border-black/30"
                >
                  Talk to Sales
                </Link>
              </motion.div>
            </div>
            <p className="text-white/70 dark:text-black/60 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
