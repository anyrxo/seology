'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  ChevronRight,
  Layers,
} from 'lucide-react'
import FeatureCard from '@/components/marketing/FeatureCard'
import CTASection from '@/components/marketing/CTASection'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<
    'on-page' | 'technical' | 'content' | 'performance'
  >('on-page')
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0, 0.5, 0],
      scale: [0.8, 1.2, 0.8],
    },
  }

  const glowTransition = {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />

          {/* Floating gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
            variants={glowVariants}
            initial="initial"
            animate="animate"
            transition={glowTransition}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
            variants={glowVariants}
            initial="initial"
            animate="animate"
            transition={{ ...glowTransition, delay: 1.5 }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="text-white/60 text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Powered by Claude AI
                </span>
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              Everything You Need to
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">Dominate Search</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
              SEOLOGY.AI combines AI analysis with automated fixes to give you the ultimate SEO advantage.
              Stop wasting time on manual tasks—let AI do the work.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                href="/sign-up"
                className="group inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Core Features */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5"
            >
              <Layers className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-sm font-medium">Core Capabilities</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The Foundation of
              <br />
              Intelligent SEO Automation
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Everything you need to automate and optimize your search presence
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Platform Integrations - Interactive */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Connect Any Platform
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Seamless integration with your existing tools and workflows
            </p>
          </motion.div>

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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPlatform(index)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className="relative group"
              >
                <div className="relative bg-black border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-white/30">
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)',
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/10 bg-white/5"
                    animate={{
                      scale: hoveredPlatform === index ? 1.1 : 1,
                      rotate: hoveredPlatform === index ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <platform.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-white mb-4">
                    {platform.title}
                  </h3>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    {platform.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {platform.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-center text-white/70 group/item"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white/40 mr-3 flex-shrink-0 group-hover/item:text-white/60 transition-colors" />
                        <span className="group-hover/item:text-white/90 transition-colors">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: '0 0 50px rgba(255,255,255,0.1), inset 0 0 50px rgba(255,255,255,0.03)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Fix Types - Interactive Tabs */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Comprehensive SEO Fixes
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Automated optimization across every aspect of your site
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { id: 'on-page', label: 'On-Page SEO', icon: FileText },
              { id: 'technical', label: 'Technical SEO', icon: Code },
              { id: 'content', label: 'Content', icon: BookOpen },
              { id: 'performance', label: 'Performance', icon: Zap },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as 'on-page' | 'technical' | 'content' | 'performance'
                  )
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-2xl shadow-white/20'
                    : 'bg-black border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className="w-5 h-5 mr-3 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
                      className="group relative flex items-start bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white/40 mr-4 mt-0.5 flex-shrink-0 group-hover:text-white/60 transition-colors" />
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">
                        {fix}
                      </span>

                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 0 30px rgba(255,255,255,0.03)',
                        }}
                      />
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
                      className="group relative flex items-start bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white/40 mr-4 mt-0.5 flex-shrink-0 group-hover:text-white/60 transition-colors" />
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">
                        {fix}
                      </span>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 0 30px rgba(255,255,255,0.03)',
                        }}
                      />
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
                      className="group relative flex items-start bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white/40 mr-4 mt-0.5 flex-shrink-0 group-hover:text-white/60 transition-colors" />
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">
                        {fix}
                      </span>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 0 30px rgba(255,255,255,0.03)',
                        }}
                      />
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
                      className="group relative flex items-start bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white/40 mr-4 mt-0.5 flex-shrink-0 group-hover:text-white/60 transition-colors" />
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">
                        {fix}
                      </span>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 0 30px rgba(255,255,255,0.03)',
                        }}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Use Cases - Story-driven */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Built for Every Business
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Real results from real businesses across industries
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-black border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-white/30 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/10 bg-white/5">
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-6">
                    {useCase.title}
                  </h3>

                  {/* Problem/Solution */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <p className="text-sm text-white/40 font-bold uppercase tracking-wider">
                          The Problem
                        </p>
                      </div>
                      <p className="text-white/60 leading-relaxed">
                        {useCase.problem}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <p className="text-sm text-white/40 font-bold uppercase tracking-wider">
                          The Solution
                        </p>
                      </div>
                      <p className="text-white/60 leading-relaxed">
                        {useCase.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        {useCase.metric}
                      </span>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                    <p className="text-white/40 mt-1">
                      {useCase.metricLabel}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 70%)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Enterprise-Grade Power
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Advanced capabilities for serious SEO teams
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Security Showcase */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="inline-flex w-24 h-24 rounded-2xl border border-white/10 bg-white/5 items-center justify-center mb-8"
            >
              <Lock className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Your data and credentials are protected by industry-leading security measures
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
                  {item.description}
                </p>

                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.03)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="inline-flex w-24 h-24 rounded-2xl border border-white/10 bg-white/5 items-center justify-center mb-8"
            >
              <TrendingUp className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Track Every Metric
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Comprehensive analytics to measure the impact of every fix
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-black border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.metrics.map((metric, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center text-white/70 group-hover:text-white/90 transition-colors"
                    >
                      <BarChart3 className="w-4 h-4 text-white/40 mr-3 flex-shrink-0" />
                      {metric}
                    </motion.li>
                  ))}
                </ul>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 70%)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
              Ready to Experience
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">The Future of SEO?</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </span>
            </h2>

            <p className="text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
              Start automating your SEO today with a free trial. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-white/20"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border border-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/5 transition-all"
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
