'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  ShoppingCart,
  BookOpen,
  Palette,
  ChevronRight,
  Layers,
  Brain,
} from 'lucide-react'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<
    'on-page' | 'technical' | 'content' | 'performance'
  >('on-page')

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Powered by Advanced AI
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <br />
              <span className="text-blue-600">Dominate Search</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              SEOLOGY.AI combines AI analysis with automated fixes to give you the ultimate SEO advantage.
              Stop wasting time on manual tasks—let AI do the work.
            </p>

            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
              <Layers className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Core Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Foundation of
              <br />
              Intelligent SEO Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to automate and optimize your search presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'Advanced AI Analysis',
                description: 'Powered by state-of-the-art AI technology, the most advanced system for understanding context and making intelligent SEO decisions.',
              },
              {
                icon: Zap,
                title: 'Automatic Fix Execution',
                description: 'Our AI doesn\'t just identify issues—it logs into your CMS and makes permanent changes automatically.',
              },
              {
                icon: Target,
                title: 'Three Execution Modes',
                description: 'Choose between Automatic (full autopilot), Plan (review before execution), or Approve (manual per-fix approval).',
              },
              {
                icon: RotateCcw,
                title: '90-Day Rollback',
                description: 'Every change stores before/after state. Roll back any fix within 90 days if metrics drop or issues arise.',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level encryption for credentials. OAuth for Shopify. Secure token storage. SOC 2 Type II compliant.',
              },
              {
                icon: BarChart3,
                title: 'Real-Time Analytics',
                description: 'Track traffic, rankings, and performance metrics. See the impact of every fix with detailed before/after comparisons.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Connect Any Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seamless integration with your existing tools and workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Shopify',
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
                title: 'WordPress',
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
                title: 'Universal JS',
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
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <platform.icon className="w-8 h-8 text-blue-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {platform.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {platform.description}
                </p>

                <ul className="space-y-3">
                  {platform.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Fix Types - Interactive Tabs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive SEO Fixes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Automated optimization across every aspect of your site
            </p>
          </div>

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
                className={`flex items-center px-6 py-3 rounded-lg font-semibold text-base transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div
                    key={index}
                    className="flex items-start bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{fix}</span>
                  </div>
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
                  <div
                    key={index}
                    className="flex items-start bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{fix}</span>
                  </div>
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
                  <div
                    key={index}
                    className="flex items-start bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{fix}</span>
                  </div>
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
                  <div
                    key={index}
                    className="flex items-start bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{fix}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Every Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real results from real businesses across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: 'E-Commerce Stores',
                problem: 'Managing SEO for thousands of products is impossible',
                solution:
                  'SEOLOGY.AI automatically optimizes every product page, collection, and category with perfect meta tags and descriptions.',
                metric: '3.2x',
                metricLabel: 'increase in organic traffic',
              },
              {
                icon: BookOpen,
                title: 'Content Publishers',
                problem: 'New content needs optimization before publishing',
                solution:
                  'Set it to auto-mode and every new blog post gets optimized immediately—headings, internal links, schema markup.',
                metric: '95%',
                metricLabel: 'reduction in SEO tasks',
              },
              {
                icon: Palette,
                title: 'Marketing Agencies',
                problem: 'Managing SEO for 50+ client sites takes forever',
                solution:
                  'White-label SEOLOGY.AI and automate SEO across all client sites. Deliver better results with less manual work.',
                metric: '10 hrs',
                metricLabel: 'saved per week',
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="w-8 h-8 text-blue-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {useCase.title}
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        The Problem
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {useCase.problem}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        The Solution
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {useCase.solution}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-600">
                      {useCase.metric}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mt-1">
                    {useCase.metricLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Power
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced capabilities for serious SEO teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Invite team members, set permissions, and collaborate on SEO strategies with role-based access control.',
              },
              {
                icon: Webhook,
                title: 'API Access',
                description: 'Full REST API for custom integrations. Trigger fixes, fetch analytics, and automate workflows programmatically.',
              },
              {
                icon: Database,
                title: 'Audit Logging',
                description: 'Complete audit trail of all changes. Track who did what, when, and why with detailed logs.',
              },
              {
                icon: Clock,
                title: 'Scheduled Fixes',
                description: 'Run SEO audits and apply fixes on a schedule. Set it and forget it with cron-based automation.',
              },
              {
                icon: GitBranch,
                title: 'A/B Testing',
                description: 'Test different SEO strategies with built-in A/B testing. Measure impact before full rollout.',
              },
              {
                icon: Settings,
                title: 'Custom Rules',
                description: 'Create custom fix rules and workflows. Tailor automation to your specific SEO strategy and requirements.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your data and credentials are protected by industry-leading security measures
            </p>
          </div>

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
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Every Metric
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive analytics to measure the impact of every fix
            </p>
          </div>

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
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.metrics.map((metric, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <BarChart3 className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience
            <br />
            The Future of SEO?
          </h2>

          <p className="text-xl text-blue-100 mb-10">
            Start automating your SEO today with a free trial. No credit card required.
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
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors duration-300 text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
