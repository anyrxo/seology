'use client'

export const dynamic = 'force-dynamic'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
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

// Magnetic button component
const MagneticButton = ({ children, href, variant = 'primary' }: {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary'
}) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        block text-center py-3 px-6 rounded-lg font-semibold transition-all
        ${variant === 'primary'
          ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]'
          : 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60'
        }
      `}
    >
      {children}
    </motion.a>
  )
}

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
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/20 rounded-full mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span className="text-sm text-white/90 font-medium">
              14-day free trial • No credit card required
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Simple, Transparent Pricing.
            <br />
            <span className="text-white/60">No Hidden Fees.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime. All plans include AI-powered SEO fixes, secure integrations, and 90-day rollback protection.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center bg-white/5 border border-white/20 rounded-2xl p-1.5 backdrop-blur-sm relative"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl bg-white/10"
              initial={false}
              animate={{
                x: billingCycle === 'monthly' ? '2%' : '98%',
                width: '48%',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all relative z-10 ${
                billingCycle === 'monthly'
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all relative z-10 ${
                billingCycle === 'annual'
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Annual
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-3 -right-2 bg-white text-black text-xs px-3 py-1 rounded-full font-bold"
              >
                Save 17%
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6 + index * 0.15,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 group ${
                plan.popular
                  ? 'border-2 border-white shadow-[0_0_50px_rgba(255,255,255,0.2)]'
                  : 'border border-white/20 hover:border-white/40'
              } transition-all duration-500`}
            >
              {plan.popular && (
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  <span className="bg-white text-black text-xs px-6 py-2 rounded-full font-bold tracking-wide shadow-lg">
                    MOST POPULAR
                  </span>
                </motion.div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-bold text-white/60 mb-3 tracking-widest">
                  {plan.name}
                </h3>
                <motion.div
                  key={billingCycle + plan.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-baseline mb-2"
                >
                  <span className="text-6xl font-bold text-white">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-white/40 ml-3 text-lg">/month</span>
                </motion.div>
                {billingCycle === 'annual' && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm text-white/80 font-medium"
                  >
                    Save ${getSavings(plan)}/year
                  </motion.p>
                )}
                <p className="text-white/60 mt-3 text-base">{plan.description}</p>
              </div>

              <div className="mb-8">
                <MagneticButton
                  href="/sign-up"
                  variant={plan.popular ? 'primary' : 'secondary'}
                >
                  {plan.cta}
                </MagneticButton>
              </div>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.15 + i * 0.05,
                    }}
                    className="flex items-start"
                  >
                    {feature.included ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.8 + index * 0.15 + i * 0.05,
                          type: 'spring',
                        }}
                      >
                        <Check className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                      </motion.div>
                    ) : (
                      <X className="w-5 h-5 text-white/20 mr-3 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included ? 'text-white/80' : 'text-white/30'
                      }
                    >
                      {feature.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-white/60">
              See exactly what is included in each plan
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border border-white/20 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl">
              <thead>
                <tr className="border-b border-white/20 bg-white/5">
                  <th className="text-left py-5 px-6 text-white/60 font-bold text-sm tracking-wide">
                    FEATURE
                  </th>
                  <th className="text-center py-5 px-6 text-white font-bold tracking-wide">
                    STARTER
                  </th>
                  <th className="text-center py-5 px-6 text-white font-bold tracking-wide">
                    GROWTH
                  </th>
                  <th className="text-center py-5 px-6 text-white font-bold tracking-wide">
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-5 px-6 text-white/80 font-medium">{row.feature}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className="py-5 px-6 text-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                            >
                              <Check className="w-5 h-5 text-white mx-auto" />
                            </motion.div>
                          ) : (
                            <X className="w-5 h-5 text-white/20 mx-auto" />
                          )
                        ) : (
                          <span className="text-white/80 font-medium">{value}</span>
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
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center hover:border-white/40 transition-colors group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <badge.icon className="w-12 h-12 text-white mx-auto mb-4 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-white/60">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-16 text-center relative overflow-hidden"
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Users className="w-20 h-20 text-white mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Need a Custom Enterprise Plan?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Get custom pricing, dedicated support, and tailored features for
              your agency or large organization. We will work with you to build
              the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-xl font-bold transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                >
                  Contact Sales Team
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold transition-all hover:bg-white/10 hover:border-white/60"
                >
                  Learn More About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <HelpCircle className="w-20 h-20 text-white mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </motion.div>
            <h2 className="text-5xl font-bold text-white mb-4">
              Pricing Questions?
            </h2>
            <p className="text-xl text-white/60">
              Common questions about billing and plans
            </p>
          </motion.div>

          <div className="space-y-6">
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
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{
                  x: 10,
                  transition: { duration: 0.3 },
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all group"
              >
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
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
    </div>
  )
}
