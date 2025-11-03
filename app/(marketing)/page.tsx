'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
} from 'lucide-react'
import FeatureCard from '@/components/marketing/FeatureCard'
import TestimonialCard from '@/components/marketing/TestimonialCard'
import StatsSection from '@/components/marketing/StatsSection'
import CTASection from '@/components/marketing/CTASection'

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm text-blue-400">
              Powered by Claude 3.5 Sonnet AI
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Stop Reporting SEO Issues.
            <br />
            Start <span className="text-blue-500">Fixing</span> Them Automatically.
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            SEOLOGY.AI is the world's first AI-powered platform that doesn't just find SEO problems—it logs into your CMS and fixes them. Automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg shadow-blue-500/20"
            >
              Start Fixing Issues Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Watch How It Works
            </Link>
          </div>

          <p className="text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              14-day free trial
            </span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No credit card required
            </span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Cancel anytime
            </span>
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* The Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Every SEO Tool Tells You What's Wrong
            </h2>
            <p className="text-xl text-gray-400">Nobody actually fixes it.</p>
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
                color: 'text-red-500',
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
                color: 'text-orange-500',
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
                color: 'text-green-500',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-400"
                    >
                      <span className={`${item.color} mr-2 mt-1`}>
                        {index === 2 ? '✓' : '•'}
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
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
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
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>

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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose SEOLOGY.AI?
            </h2>
            <p className="text-xl text-gray-400">
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
              Loved by SEO Teams Everywhere
            </h2>
            <p className="text-xl text-gray-400">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Works With Your Platform
            </h2>
            <p className="text-xl text-gray-400 mb-12">
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
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {platform.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{platform.description}</p>
                  <ul className="space-y-2">
                    {platform.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-300 text-sm"
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-8">
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
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">
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
                <div className="text-sm text-gray-500 font-semibold mb-2">
                  {plan.name}
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {plan.price}
                  <span className="text-lg text-gray-400">/mo</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-300 text-sm"
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
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
        title="Ready to Automate Your SEO?"
        description="Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically"
        primaryCTA={{ text: 'Start Free Trial →', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Pricing', href: '/pricing' }}
      />
    </>
  )
}
