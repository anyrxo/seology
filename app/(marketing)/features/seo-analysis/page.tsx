'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  Zap,
  Search,
  FileText,
  AlertCircle,
  TrendingUp,
  Eye,
  Shield,
  Clock,
  BarChart3,
  Code,
  Globe,
} from 'lucide-react'

export default function SEOAnalysisPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null)

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/20 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/20 rounded-full blur-3xl"
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

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] -z-10" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                AI-Powered Analysis
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SEO Analysis That
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Actually Understands Context
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Move beyond basic crawlers. Our AI-powered SEO analysis understands your content,
              competition, and search intent to deliver actionable insights that actually matter.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-lg shadow-lg shadow-blue-500/25"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
              >
                View Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Beyond Surface-Level Scanning
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Deep AI analysis that understands your content like a human SEO expert
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Intelligent Crawling',
                description: 'Our crawler understands JavaScript, SPAs, and dynamic content. See your site exactly as Google does.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Brain,
                title: 'AI Context Analysis',
                description: 'Claude AI reads your content and understands topical relevance, search intent, and competitive positioning.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Target,
                title: 'Competitor Intelligence',
                description: 'Analyze top-ranking competitors to understand what\'s working and identify content gaps.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: AlertCircle,
                title: 'Issue Prioritization',
                description: 'AI ranks issues by actual impact on rankings, not just severity. Fix what matters first.',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: TrendingUp,
                title: 'Ranking Predictions',
                description: 'ML models predict how fixes will impact your rankings before you make changes.',
                gradient: 'from-red-500 to-rose-500',
              },
              {
                icon: Eye,
                title: 'User Intent Matching',
                description: 'Analyze if your content matches what searchers actually want to find for target keywords.',
                gradient: 'from-indigo-500 to-purple-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0`}
                  animate={{ opacity: hoveredFeature === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}
                    animate={{
                      rotate: hoveredFeature === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {hoveredFeature === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comprehensive SEO Audit
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Every aspect of your site analyzed with AI precision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: 'On-Page Elements',
                items: [
                  'Title tags and meta descriptions',
                  'Header hierarchy (H1-H6)',
                  'Content quality and length',
                  'Keyword optimization',
                  'Internal linking structure',
                  'Image alt text and optimization',
                ],
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Code,
                title: 'Technical SEO',
                items: [
                  'Site speed and Core Web Vitals',
                  'Mobile-friendliness',
                  'Crawlability and indexability',
                  'Structured data markup',
                  'XML sitemaps',
                  'Robots.txt configuration',
                ],
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Globe,
                title: 'Off-Page Factors',
                items: [
                  'Backlink profile analysis',
                  'Domain authority metrics',
                  'Social signals',
                  'Brand mentions',
                  'Competitor backlinks',
                  'Link quality assessment',
                ],
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: BarChart3,
                title: 'Content Strategy',
                items: [
                  'Topic clustering opportunities',
                  'Content gap analysis',
                  'Search intent alignment',
                  'Featured snippet potential',
                  'E-A-T signals',
                  'Content freshness',
                ],
                gradient: 'from-yellow-500 to-orange-500',
              },
            ].map((capability, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredCapability(index)}
                onHoverEnd={() => setHoveredCapability(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0`}
                  animate={{ opacity: hoveredCapability === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${capability.gradient} rounded-lg flex items-center justify-center mb-6`}
                    animate={{
                      rotate: hoveredCapability === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <capability.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-6">
                    {capability.title}
                  </h3>

                  <ul className="space-y-3">
                    {capability.items.map((item, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {hoveredCapability === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              From Crawl to Insights in Minutes
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our AI-powered analysis process delivers actionable insights fast
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Deep Crawl',
                description: 'Advanced crawler maps your entire site, understanding JavaScript, dynamic content, and SPAs.',
                icon: Search,
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Claude AI reads every page, understanding context, intent, and competitive positioning.',
                icon: Brain,
              },
              {
                step: '03',
                title: 'Issue Detection',
                description: 'AI identifies and prioritizes issues by actual ranking impact, not just technical severity.',
                icon: AlertCircle,
              },
              {
                step: '04',
                title: 'Actionable Report',
                description: 'Get a clear roadmap with prioritized fixes, impact predictions, and one-click implementation.',
                icon: Zap,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 h-full">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
                    {step.step}
                  </div>
                  <step.icon className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Free
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SEO Analysis Today
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-10">
              Get AI-powered insights in minutes. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-lg shadow-lg shadow-blue-500/25"
                >
                  Start Free Analysis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-bold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
                >
                  View Pricing
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
