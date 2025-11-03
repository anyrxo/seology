'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Shield,
  BarChart3,
  RotateCcw,
  Sparkles,
  Target,
  Cpu,
  Globe,
  Code,
  Lock,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  FileText,
  Settings,
  Users,
  Webhook,
  Database,
  GitBranch,
  Play,
  ShoppingCart,
  BookOpen,
  Palette,
} from 'lucide-react'
import FeatureCard from '@/components/marketing/FeatureCard'
import CTASection from '@/components/marketing/CTASection'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<
    'on-page' | 'technical' | 'content' | 'performance'
  >('on-page')

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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Everything You Need to
            <br />
            <span className="text-blue-500">Dominate Search Rankings</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            SEOLOGY.AI combines AI analysis with automated fixes to give you the ultimate SEO advantage. Stop wasting time on manual tasks—let AI do the work.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
            <p className="text-xl text-gray-400">
              The foundation of intelligent SEO automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Cpu}
              title="Claude AI Analysis"
              description="Powered by Anthropic's Claude 3.5 Sonnet, the most advanced AI model for understanding context and making intelligent SEO decisions."
              delay={0}
            />
            <FeatureCard
              icon={Zap}
              title="Automatic Fix Execution"
              description="Our AI doesn't just identify issues—it logs into your CMS and makes permanent changes automatically."
              delay={0.1}
            />
            <FeatureCard
              icon={Target}
              title="Three Execution Modes"
              description="Choose between Automatic (full autopilot), Plan (review before execution), or Approve (manual per-fix approval)."
              delay={0.2}
            />
            <FeatureCard
              icon={RotateCcw}
              title="90-Day Rollback"
              description="Every change stores before/after state. Roll back any fix within 90 days if metrics drop or issues arise."
              delay={0.3}
            />
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="Bank-level encryption for credentials. OAuth for Shopify. Secure token storage. SOC 2 Type II compliant."
              delay={0.4}
            />
            <FeatureCard
              icon={BarChart3}
              title="Real-Time Analytics"
              description="Track traffic, rankings, and performance metrics. See the impact of every fix with detailed before/after comparisons."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
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
              Platform Integrations
            </h2>
            <p className="text-xl text-gray-400">
              Connect any CMS or website in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Shopify Integration',
                description:
                  'Full OAuth integration with your Shopify store. Modify products, collections, pages, and themes automatically.',
                features: [
                  'Product meta tags',
                  'Collection descriptions',
                  'Alt text for images',
                  'URL redirects',
                  'Theme modifications',
                  'Structured data',
                ],
              },
              {
                icon: FileText,
                title: 'WordPress Integration',
                description:
                  'REST API and plugin support for WordPress sites. Works with Yoast SEO, Rank Math, and custom setups.',
                features: [
                  'Post/page optimization',
                  'Custom post types',
                  'Meta descriptions',
                  'Internal linking',
                  'Schema markup',
                  'Sitemap updates',
                ],
              },
              {
                icon: Code,
                title: 'Universal JavaScript',
                description:
                  'Magic.js snippet works with ANY website—static, SPA, custom CMS, or headless architecture.',
                features: [
                  'Custom sites',
                  'Static generators',
                  'React/Vue/Angular',
                  'Headless CMS',
                  'No backend needed',
                  'Client-side fixes',
                ],
              },
            ].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8"
              >
                <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                  <platform.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {platform.title}
                </h3>
                <p className="text-gray-400 mb-6">{platform.description}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Fix Types - Interactive Tabs */}
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
              What We Fix Automatically
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive SEO optimization across all aspects of your site
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'on-page', label: 'On-Page SEO', icon: FileText },
              { id: 'technical', label: 'Technical SEO', icon: Code },
              { id: 'content', label: 'Content', icon: BookOpen },
              { id: 'performance', label: 'Performance', icon: Zap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as 'on-page' | 'technical' | 'content' | 'performance'
                  )
                }
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {activeTab === 'on-page' && (
                <>
                  {[
                    'Missing or duplicate title tags',
                    'Meta descriptions (length, keywords, uniqueness)',
                    'H1/H2/H3 hierarchy and optimization',
                    'Image alt text generation',
                    'Internal linking suggestions',
                    'Keyword density optimization',
                    'URL structure optimization',
                    'Open Graph and Twitter Cards',
                  ].map((fix, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{fix}</span>
                    </motion.div>
                  ))}
                </>
              )}

              {activeTab === 'technical' && (
                <>
                  {[
                    'Broken links and 404 errors',
                    'Redirect chains and loops',
                    'Sitemap generation and updates',
                    'Robots.txt optimization',
                    'Canonical tags implementation',
                    'Schema/structured data markup',
                    'HTTPS enforcement',
                    'Mobile-friendliness fixes',
                  ].map((fix, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{fix}</span>
                    </motion.div>
                  ))}
                </>
              )}

              {activeTab === 'content' && (
                <>
                  {[
                    'Content freshness updates',
                    'Readability improvements',
                    'LSI keyword integration',
                    'Featured snippet optimization',
                    'Content length recommendations',
                    'Duplicate content detection',
                    'Thin content identification',
                    'Content gap analysis',
                  ].map((fix, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{fix}</span>
                    </motion.div>
                  ))}
                </>
              )}

              {activeTab === 'performance' && (
                <>
                  {[
                    'Image compression and lazy loading',
                    'Critical CSS optimization',
                    'JavaScript defer/async',
                    'Preload critical resources',
                    'Font optimization',
                    'Core Web Vitals improvements',
                    'Browser caching headers',
                    'Minification of assets',
                  ].map((fix, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{fix}</span>
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Demo Section */}
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
              See SEOLOGY.AI in Action
            </h2>
            <p className="text-xl text-gray-400">
              Watch how AI fixes your SEO automatically
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Auto-Fix Shopify Products',
                description:
                  'Watch as SEOLOGY.AI analyzes and fixes meta tags, alt text, and descriptions across your entire product catalog.',
                thumbnail: '/images/demo-shopify.jpg',
              },
              {
                title: 'WordPress Content Optimization',
                description:
                  'See how Claude AI optimizes blog posts, updates internal links, and improves readability scores automatically.',
                thumbnail: '/images/demo-wordpress.jpg',
              },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-20 h-20 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-400">Video Demo Coming Soon</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
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
              Built for Every Business
            </h2>
            <p className="text-xl text-gray-400">
              Real-world use cases across industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: 'E-Commerce Stores',
                problem: 'Managing SEO for thousands of products is impossible',
                solution:
                  'SEOLOGY.AI automatically optimizes every product page, collection, and category with perfect meta tags and descriptions.',
                metrics: '3.2x increase in organic traffic',
              },
              {
                icon: BookOpen,
                title: 'Content Publishers',
                problem: 'New content needs optimization before publishing',
                solution:
                  'Set it to auto-mode and every new blog post gets optimized immediately—headings, internal links, schema markup.',
                metrics: '95% reduction in SEO tasks',
              },
              {
                icon: Palette,
                title: 'Marketing Agencies',
                problem: 'Managing SEO for 50+ client sites takes forever',
                solution:
                  'White-label SEOLOGY.AI and automate SEO across all client sites. Deliver better results with less manual work.',
                metrics: '10 hours saved per week',
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8"
              >
                <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {useCase.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-red-400 font-semibold mb-1">
                      The Problem
                    </p>
                    <p className="text-gray-400">{useCase.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-400 font-semibold mb-1">
                      The Solution
                    </p>
                    <p className="text-gray-400">{useCase.solution}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-blue-500 font-semibold">
                      {useCase.metrics}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
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
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-400">
              Enterprise-grade features for serious SEO teams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Users}
              title="Team Collaboration"
              description="Invite team members, set permissions, and collaborate on SEO strategies with role-based access control."
              delay={0}
            />
            <FeatureCard
              icon={Webhook}
              title="API Access"
              description="Full REST API for custom integrations. Trigger fixes, fetch analytics, and automate workflows programmatically."
              delay={0.1}
            />
            <FeatureCard
              icon={Database}
              title="Audit Logging"
              description="Complete audit trail of all changes. Track who did what, when, and why with detailed logs."
              delay={0.2}
            />
            <FeatureCard
              icon={Clock}
              title="Scheduled Fixes"
              description="Run SEO audits and apply fixes on a schedule. Set it and forget it with cron-based automation."
              delay={0.3}
            />
            <FeatureCard
              icon={GitBranch}
              title="A/B Testing"
              description="Test different SEO strategies with built-in A/B testing. Measure impact before full rollout."
              delay={0.4}
            />
            <FeatureCard
              icon={Settings}
              title="Custom Rules"
              description="Create custom fix rules and workflows. Tailor automation to your specific SEO strategy and requirements."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Lock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Your data and credentials are protected by industry-leading
              security measures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Encrypted Storage',
                description:
                  'All credentials encrypted at rest with AES-256. Encryption keys stored separately in secure vaults.',
              },
              {
                title: 'OAuth Authentication',
                description:
                  'Industry-standard OAuth 2.0 for Shopify. Never store passwords—only secure tokens.',
              },
              {
                title: 'SOC 2 Type II',
                description:
                  'Independently audited and certified for security, availability, and confidentiality.',
              },
              {
                title: 'GDPR Compliant',
                description:
                  'Full compliance with EU data protection regulations. Data residency options available.',
              },
              {
                title: 'Regular Audits',
                description:
                  'Quarterly security audits and penetration testing by third-party security firms.',
              },
              {
                title: 'Zero-Knowledge Architecture',
                description:
                  'Credentials encrypted before reaching our servers. Only you can decrypt your data.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics & Reporting */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Analytics & Reporting
            </h2>
            <p className="text-xl text-gray-400">
              Measure the impact of every fix with comprehensive analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Traffic Impact',
                metrics: [
                  'Organic traffic trends',
                  'Page-level visits',
                  'Conversion tracking',
                  'Bounce rate analysis',
                ],
              },
              {
                title: 'Ranking Improvements',
                metrics: [
                  'Keyword position tracking',
                  'SERP feature wins',
                  'Visibility score',
                  'Competitor comparison',
                ],
              },
              {
                title: 'Technical Metrics',
                metrics: [
                  'Page speed scores',
                  'Core Web Vitals',
                  'Mobile usability',
                  'Indexability status',
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.metrics.map((metric, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <BarChart3 className="w-4 h-4 text-blue-500 mr-2" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Experience the Future of SEO?"
        description="Start automating your SEO today with a free trial. No credit card required."
        primaryCTA={{ text: 'Start Free Trial →', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Pricing', href: '/pricing' }}
      />
    </>
  )
}
