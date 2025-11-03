'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Zap,
  Shield,
  BarChart3,
  RotateCcw,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Globe,
  ChevronDown,
} from 'lucide-react'
import FeatureCard from '@/components/marketing/FeatureCard'
import TestimonialCard from '@/components/marketing/TestimonialCard'
import StatsSection from '@/components/marketing/StatsSection'
import CTASection from '@/components/marketing/CTASection'
import {
  heroEntrance,
  staggerHero,
  fadeInUp,
  magneticHover,
  magneticTap,
  scrollIndicatorPulse,
  gridAnimation,
  defaultViewport,
} from '@/lib/animations'
import { typography, typographyPatterns, typo } from '@/lib/typography'

// Magnetic button component with cursor follow
const MagneticButton = ({
  children,
  href,
  variant = 'primary',
}: {
  children: React.ReactNode
  href: string
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={magneticHover}
      whileTap={magneticTap}
      className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all ${
        variant === 'primary'
          ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]'
          : 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60'
      }`}
    >
      {children}
    </motion.a>
  )
}

export default function LandingPageContent() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-112px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          animate={gridAnimation}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          variants={staggerHero}
          initial="hidden"
          animate="visible"
          className="relative max-w-7xl mx-auto text-center z-10"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span className={typo(typography.caption, typography.color.secondary, 'font-medium', typography.tracking.wide)}>
              Powered by Claude 3.5 Sonnet AI
            </span>
          </motion.div>

          {/* Headline with animated gradient text */}
          <motion.h1
            variants={fadeInUp}
            className={typo(typography.h1, typography.color.primary, 'mb-8', typography.width.heading, 'mx-auto')}
          >
            Stop Reporting SEO Issues.
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent animate-pulse">
                Start Fixing
              </span>
            </span>{' '}
            Them Automatically.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className={typo(typographyPatterns.heroBody, 'mb-12 mx-auto')}
          >
            The world's first AI-powered platform that doesn't just find SEO
            problems—it logs into your CMS and fixes them. Automatically.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <MagneticButton href="/sign-up" variant="primary">
              Start Fixing Issues Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </MagneticButton>
            <MagneticButton href="#how-it-works" variant="secondary">
              Watch How It Works
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            className={typo('flex flex-col sm:flex-row items-center justify-center gap-6', typographyPatterns.smallBody)}
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white/60" />
              14-day free trial
            </span>
            <span className={typo('hidden sm:inline', typography.color.disabled)}>•</span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white/60" />
              No credit card required
            </span>
            <span className={typo('hidden sm:inline', typography.color.disabled)}>•</span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white/60" />
              Cancel anytime
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={scrollIndicatorPulse}
        >
          <ChevronDown className="w-8 h-8 text-white/40" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* The Problem Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className={typo(typographyPatterns.sectionTitle, 'mb-6 mx-auto')}>
              Every SEO Tool Tells You What's Wrong
            </h2>
            <p className={typo(typography['body-xl'], typography.color.muted)}>Nobody actually fixes it.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Traditional SEO Tools',
                icon: BarChart3,
                items: [
                  'Generate reports',
                  'Identify issues',
                  'Send alerts',
                  'You fix everything manually',
                ],
                color: 'text-white/40',
                borderColor: 'border-white/10',
              },
              {
                title: 'Manual Fixing',
                icon: Target,
                items: [
                  'Hours of work',
                  'Human errors',
                  'Inconsistent execution',
                  'Expensive developers',
                ],
                color: 'text-white/40',
                borderColor: 'border-white/10',
              },
              {
                title: 'SEOLOGY.AI',
                icon: Zap,
                items: [
                  'Automatically logs in',
                  'Makes permanent fixes',
                  'Claude AI intelligence',
                  'Complete in minutes',
                ],
                color: 'text-white',
                borderColor: 'border-white/30',
                highlight: true,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  boxShadow: item.highlight
                    ? '0 0 40px rgba(255, 255, 255, 0.15)'
                    : '0 0 20px rgba(255, 255, 255, 0.1)',
                }}
                className={`bg-white/5 backdrop-blur-sm border ${item.borderColor} rounded-2xl p-8 transition-all ${
                  item.highlight ? 'ring-2 ring-white/20' : ''
                }`}
              >
                <item.icon className={`w-14 h-14 ${item.color} mb-6`} />
                <h3 className={typo(typographyPatterns.cardTitle, 'mb-6')}>
                  {item.title}
                </h3>
                <ul className="space-y-3">
                  {item.items.map((point, i) => (
                    <li key={i} className={typo('flex items-start', typography.body, typography.color.tertiary)}>
                      <span
                        className={`${item.color} mr-3 mt-1 font-bold text-lg`}
                      >
                        {item.highlight ? '✓' : '•'}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={typo(typographyPatterns.sectionTitle, 'mb-4')}>
              How It Works
            </h2>
            <p className={typo(typographyPatterns.heroBody)}>
              Three simple steps to automated SEO success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Globe,
                title: 'Connect Your Site in 60 Seconds',
                description:
                  'Link your Shopify store, WordPress site, or any website in under a minute with secure OAuth or API credentials. No technical setup required.',
              },
              {
                step: '02',
                icon: Cpu,
                title: 'AI Analyzes & Creates Fix Plan',
                description:
                  'Claude AI scans your entire site for 50+ SEO issues, identifies problems, and generates intelligent fixes with before/after previews.',
              },
              {
                step: '03',
                icon: Zap,
                title: 'Approve Once, Fix Everything',
                description:
                  'Review the plan and approve. SEOLOGY.AI logs into your CMS and applies all fixes automatically. Every change is reversible for 90 days.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-7xl font-bold text-gray-800 mb-4">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className={typo(typographyPatterns.cardTitle, 'mb-3')}>
                  {item.title}
                </h3>
                <p className={typo(typographyPatterns.body)}>{item.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8">
                    <ArrowRight className="w-8 h-8 text-blue-500/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={typo(typographyPatterns.sectionTitle, 'mb-4')}>
              Why Choose SEOLOGY.AI?
            </h2>
            <p className={typo(typographyPatterns.heroBody)}>
              The most advanced SEO automation platform ever built
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Automatic SEO Fixes"
              description="Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically with intelligent, context-aware solutions."
              delay={0}
            />
            <FeatureCard
              icon={Shield}
              title="Secure CMS Integration"
              description="OAuth authentication for Shopify. Encrypted credentials for WordPress. Your data stays safe with enterprise-grade security."
              delay={0.1}
            />
            <FeatureCard
              icon={BarChart3}
              title="Real-Time Analytics"
              description="Track your SEO improvements with detailed analytics and performance metrics. See the impact of every fix."
              delay={0.2}
            />
            <FeatureCard
              icon={RotateCcw}
              title="90-Day Rollback"
              description="Every fix can be rolled back for 90 days. Complete peace of mind with before/after state storage."
              delay={0.3}
            />
            <FeatureCard
              icon={Target}
              title="Three Execution Modes"
              description="Choose automatic, plan review, or manual approval—whatever fits your workflow and comfort level."
              delay={0.4}
            />
            <FeatureCard
              icon={Sparkles}
              title="Claude AI Powered"
              description="Leveraging Anthropic's most advanced AI model for intelligent, human-quality SEO decisions."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={typo(typographyPatterns.sectionTitle, 'mb-4')}>
              Loved by SEO Teams Everywhere
            </h2>
            <p className={typo(typographyPatterns.heroBody)}>
              See what our customers are saying
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="SEOLOGY.AI saved us 20+ hours per week on SEO maintenance. The automatic fixes are incredibly accurate and the rollback feature gives us complete confidence."
              author="Sarah Chen"
              role="Head of Growth"
              company="TechStartup"
              delay={0}
            />
            <TestimonialCard
              quote="We manage 50+ client sites and SEOLOGY.AI has been a game-changer. The Claude AI makes smarter decisions than our junior developers."
              author="Mike Rodriguez"
              role="Agency Owner"
              company="Digital Growth Co"
              delay={0.1}
            />
            <TestimonialCard
              quote="Finally, an SEO tool that actually does the work instead of just telling us what needs to be done. ROI was immediate."
              author="Emily Thompson"
              role="E-commerce Director"
              company="Fashion Retailer"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={typo(typographyPatterns.sectionTitle, 'mb-4')}>
              Works With Your Platform
            </h2>
            <p className={typo(typographyPatterns.heroBody, 'mb-12')}>
              Seamless integration with the tools you already use
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: 'Shopify',
                  description: 'Full OAuth integration with read/write access',
                  features: ['Products', 'Collections', 'Pages', 'Themes'],
                },
                {
                  name: 'WordPress',
                  description: 'REST API and plugin support',
                  features: ['Posts', 'Pages', 'Custom Post Types', 'Yoast SEO'],
                },
                {
                  name: 'Custom Sites',
                  description: 'Universal JavaScript connector',
                  features: ['Any CMS', 'Static Sites', 'Custom Builds', 'SPAs'],
                },
              ].map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
                >
                  <h3 className={typo(typographyPatterns.cardTitle, 'mb-2')}>
                    {platform.name}
                  </h3>
                  <p className={typo(typographyPatterns.body, 'mb-4')}>{platform.description}</p>
                  <ul className="space-y-2">
                    {platform.features.map((feature, i) => (
                      <li
                        key={i}
                        className={typo('flex items-center', typographyPatterns.smallBody)}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className={typo(typographyPatterns.caption, 'uppercase mb-8')}>
              Trusted by 10,000+ websites worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
              {['Shopify', 'WordPress', 'WooCommerce', 'Magento'].map(
                (company, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-2xl font-bold text-gray-600"
                  >
                    {company}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={typo(typographyPatterns.sectionTitle, 'mb-4')}>
              Simple, Transparent Pricing
            </h2>
            <p className={typo(typographyPatterns.heroBody)}>
              Start free, scale as you grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'STARTER',
                price: '$29',
                description: 'Perfect for small businesses',
                features: ['3 sites', '500 fixes/month', 'Email support'],
                cta: 'Start Free',
              },
              {
                name: 'GROWTH',
                price: '$99',
                description: 'For growing teams',
                features: [
                  '10 sites',
                  '5,000 fixes/month',
                  'Priority support',
                  'API access',
                ],
                cta: 'Start Free',
                popular: true,
              },
              {
                name: 'SCALE',
                price: '$299',
                description: 'Enterprise solution',
                features: [
                  'Unlimited sites',
                  'Unlimited fixes',
                  'Dedicated manager',
                  'SLA guarantee',
                ],
                cta: 'Contact Sales',
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-gray-900 border-2 rounded-lg p-8 ${
                  plan.popular ? 'border-blue-500' : 'border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className={typo(typographyPatterns.caption, 'font-semibold mb-2 uppercase')}>
                  {plan.name}
                </div>
                <div className={typo(typographyPatterns.stat, 'mb-2')}>
                  {plan.price}
                  <span className={typo(typography.h5, typography.color.muted)}>/mo</span>
                </div>
                <p className={typo(typographyPatterns.body, 'mb-6')}>{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={typo('flex items-center', typographyPatterns.smallBody)}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link
              href="/pricing"
              className="text-blue-500 hover:text-blue-400 font-semibold inline-flex items-center"
            >
              View detailed pricing
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={typo(typographyPatterns.sectionTitle, 'mb-4')}>
              Frequently Asked Questions
            </h2>
            <p className={typo(typographyPatterns.heroBody)}>
              Everything you need to know about SEOLOGY.AI
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'How does SEOLOGY.AI actually fix my SEO?',
                answer:
                  'SEOLOGY.AI uses Claude AI to analyze your site, then logs into your CMS (Shopify, WordPress, etc.) using secure credentials and makes permanent changes. Unlike other tools that just report issues, we actually implement the fixes.',
              },
              {
                question: 'Is my website data secure?',
                answer:
                  'Absolutely. We use bank-level encryption for all credentials, OAuth authentication for Shopify, and never store passwords. All changes are logged and can be rolled back for 90 days.',
              },
              {
                question: 'What if I do not like a fix?',
                answer:
                  'Every fix can be rolled back within 90 days with a single click. You can also choose Plan or Approve mode to review fixes before they are applied.',
              },
              {
                question: 'Which platforms do you support?',
                answer:
                  'Currently we support Shopify (via OAuth), WordPress (via REST API), and any custom website (via Magic.js snippet). More platforms coming soon!',
              },
              {
                question: 'How quickly will I see results?',
                answer:
                  'Most users see SEO improvements within 2-4 weeks. Some critical fixes (like broken links) show immediate impact, while others (like content optimization) take time for search engines to re-crawl.',
              },
              {
                question: 'Can I cancel anytime?',
                answer:
                  'Yes! No long-term contracts. Cancel anytime from your dashboard and you will not be charged again. Your data stays accessible for 30 days after cancellation.',
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
                <h3 className={typo(typography.h5, typography.color.primary, 'mb-3')}>
                  {faq.question}
                </h3>
                <p className={typo(typographyPatterns.body)}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Automate Your SEO?"
        description="Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically"
        primaryCTA={{ text: 'Start Free Trial →', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Pricing', href: '/pricing' }}
      />
    </div>
  )
}
