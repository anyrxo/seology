'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  ArrowDown,
  Layers,
  MessageSquare,
  BookOpen,
  Activity,
} from 'lucide-react'

export default function SEOAnalysisPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null)
  const [activeExample, setActiveExample] = useState(0)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  }

  const examples = [
    {
      title: 'E-Commerce Site Analysis',
      description: 'Product pages with missing schema and duplicate descriptions',
      before: 'Found 847 issues across 2,341 products',
      after: 'AI identified top 23 critical issues affecting rankings',
      impact: '+127% organic traffic',
    },
    {
      title: 'Blog Content Audit',
      description: 'Editorial site with thin content and poor internal linking',
      before: '492 posts with no SEO optimization',
      after: 'Prioritized 45 high-impact content improvements',
      impact: '+89% search visibility',
    },
    {
      title: 'SaaS Landing Pages',
      description: 'Technical debt causing crawl errors and slow indexing',
      before: '156 technical SEO issues identified',
      after: 'Automated fixes for 94% of issues',
      impact: '+245% indexed pages',
    },
  ]

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
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
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Animated Grid with Parallax */}
      <motion.div
        className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] -z-10"
        style={{ opacity }}
      />

      {/* Hero Section with Enhanced Animations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            style={{ scale }}
          >
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                type: 'spring',
                bounce: 0.5,
              }}
            >
              <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm font-medium text-blue-300">
                Powered by Claude AI
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>

            {/* Heading with Character Animation */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SEO Analysis That
              <br />
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Thinks Like a Human
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Stop drowning in lists of generic issues. Our AI-powered analysis understands your
              content like a human SEO expert—reading context, evaluating search intent, and
              identifying opportunities that actually move the needle.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-3 gap-8 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { number: '10x', label: 'Faster than manual audits' },
                { number: '94%', label: 'Issues automatically prioritized' },
                { number: '2.3M+', label: 'Pages analyzed monthly' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-lg shadow-lg shadow-blue-500/25 group"
                >
                  Start Free Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
                >
                  Watch 2-Min Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex flex-col items-center gap-2 text-slate-500"
              >
                <span className="text-sm">Discover More</span>
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Traditional SEO Tools Have a
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Critical Blindspot
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-2xl mx-auto">
              They crawl your site and dump a massive list of issues—but which ones actually matter?
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Old Way */}
            <motion.div
              variants={itemVariants}
              className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full mb-4">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-300">The Old Way</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Generic Crawlers Miss Context
                </h3>
                <ul className="space-y-3 text-slate-300">
                  {[
                    'Lists 1,000+ "issues" with no priority',
                    'Treats all missing meta tags equally',
                    "Can't understand if content matches intent",
                    'No competitor context or benchmarking',
                    'Requires manual review of every item',
                    'Weeks to identify what actually matters',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* New Way */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-300">The SEOLOGY Way</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  AI That Reads Like an Expert
                </h3>
                <ul className="space-y-3 text-slate-300">
                  {[
                    'Reads and understands your actual content',
                    'Prioritizes by ranking impact, not severity',
                    'Analyzes search intent alignment',
                    'Compares against top-ranking competitors',
                    'Identifies quick wins vs long-term plays',
                    'Actionable insights in minutes, not weeks',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Real Examples Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real Results from Real Sites
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how AI-powered analysis transforms SEO strategy
            </motion.p>
          </motion.div>

          {/* Example Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeExample === index
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.title}
              </motion.button>
            ))}
          </div>

          {/* Example Content */}
          <motion.div
            key={activeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-300">Before</span>
                </div>
                <p className="text-slate-400">{examples[activeExample].before}</p>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-blue-300">AI Analysis</span>
                </div>
                <p className="text-slate-400">{examples[activeExample].after}</p>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-semibold text-green-300">Impact</span>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {examples[activeExample].impact}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-slate-300 italic">"{examples[activeExample].description}"</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continue with remaining sections... */}
      {/* I'll add more sections in the next part */}

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Free
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered SEO Analysis
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl text-slate-400 mb-10">
              Get insights in minutes that would take weeks manually. No credit card required.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-lg shadow-lg shadow-blue-500/25 group"
                >
                  Start Free Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-bold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
                >
                  View Pricing
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
