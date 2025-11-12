'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Code,
  FileText,
  ShoppingCart,
  Zap,
  Shield,
  Key,
  Webhook,
  Database,
  Package,
  Settings,
  Lock,
} from 'lucide-react'

export default function PlatformIntegrationsPage() {
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [setupTime, setSetupTime] = useState(60)
  const [activePlatformExample, setActivePlatformExample] = useState(0)

  // Setup timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSetupTime((prev) => (prev > 0 ? prev - 1 : 60))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const platformExamples = [
    {
      platform: 'Shopify',
      setupTime: '45s',
      fixesApplied: '1,247',
      improvement: '+156%',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      platform: 'WordPress',
      setupTime: '52s',
      fixesApplied: '2,891',
      improvement: '+203%',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      platform: 'Custom Site',
      setupTime: '38s',
      fixesApplied: '743',
      improvement: '+127%',
      gradient: 'from-purple-500 to-pink-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-green-500/20 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-emerald-500/20 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <Globe className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-sm font-medium text-green-300">
                <motion.span
                  key={setupTime}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {setupTime}s
                </motion.span>{' '}
                setup time
              </span>
              <Sparkles className="w-4 h-4 text-green-400" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect to Any
              <br />
              <motion.span
                className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Platform in 60 Seconds
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              From Shopify to WordPress to custom sites, SEOLOGY.AI connects seamlessly
              to your tech stack with secure OAuth, REST APIs, and our universal JavaScript connector.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-lg shadow-lg shadow-green-500/25"
              >
                Connect Your Site
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
              >
                View Integrations
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="max-w-5xl mx-auto mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Platforms Supported', value: '50+', gradient: 'from-green-400 to-emerald-400' },
              { label: 'Average Setup Time', value: '<60s', gradient: 'from-blue-400 to-cyan-400' },
              { label: 'Connections Active', value: '12.5K+', gradient: 'from-purple-400 to-pink-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800"
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Problem/Solution Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Integration Made{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Simple
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              No more complex API configurations or custom development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Way */}
            <motion.div
              className="bg-red-500/5 border border-red-500/20 rounded-xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">😫</span>
                </div>
                <h3 className="text-2xl font-bold text-white">The Old Way</h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Hire developers to build custom integrations ($20K+)',
                  'Spend weeks reading API documentation',
                  'Deal with breaking changes and version updates',
                  'Manage API keys and authentication manually',
                  'No backup or rollback system',
                  'Different process for each platform',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* SEOLOGY Way */}
            <motion.div
              className="bg-green-500/5 border border-green-500/20 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">The SEOLOGY Way</h3>
              </div>

              <ul className="space-y-4 relative z-10">
                {[
                  'Click "Connect" and authenticate in 60 seconds',
                  'Zero code required - we handle all API complexity',
                  'Auto-updates when platforms change',
                  'Bank-level security with encrypted credentials',
                  'Automatic backups before every change',
                  'Unified interface for all platforms',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-slate-200"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Examples */}
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
              Real Platform Performance
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how SEOLOGY integrations perform across different platforms
            </p>
          </motion.div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {platformExamples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setActivePlatformExample(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activePlatformExample === index
                    ? `bg-gradient-to-r ${example.gradient} text-white shadow-lg`
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.platform}
              </motion.button>
            ))}
          </div>

          {/* Active Platform Stats */}
          <motion.div
            key={activePlatformExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Setup Time</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${platformExamples[activePlatformExample].gradient} bg-clip-text text-transparent`}
                >
                  {platformExamples[activePlatformExample].setupTime}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">SEO Fixes Applied</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${platformExamples[activePlatformExample].gradient} bg-clip-text text-transparent`}
                >
                  {platformExamples[activePlatformExample].fixesApplied}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Traffic Improvement</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${platformExamples[activePlatformExample].gradient} bg-clip-text text-transparent`}
                >
                  {platformExamples[activePlatformExample].improvement}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Cards */}
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
              Deep Native Integrations
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              First-class support for the platforms you already use
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingCart,
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
                gradient: 'from-green-500 to-emerald-500',
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
                gradient: 'from-blue-500 to-cyan-500',
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
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((platform, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredPlatform(index)}
                onHoverEnd={() => setHoveredPlatform(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0`}
                  animate={{ opacity: hoveredPlatform === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${platform.gradient} rounded-lg flex items-center justify-center mb-6`}
                    animate={{
                      rotate: hoveredPlatform === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <platform.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {platform.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {platform.description}
                  </p>

                  <ul className="space-y-3">
                    {platform.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {hoveredPlatform === index && (
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

      {/* Integration Features */}
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
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Your data and credentials are protected with bank-level security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: 'Encrypted Credentials',
                description: 'All API keys and passwords stored with AES-256 encryption. Zero-knowledge architecture.',
                gradient: 'from-red-500 to-rose-500',
              },
              {
                icon: Key,
                title: 'OAuth 2.0 Support',
                description: 'Secure OAuth flows for Shopify and other platforms. No password sharing required.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Shield,
                title: 'SOC 2 Type II Compliant',
                description: 'Independently audited security controls. Enterprise-ready data protection.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Webhook,
                title: 'Full API Access',
                description: 'REST API for custom integrations. Webhooks for real-time event notifications.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Database,
                title: 'Backup & Rollback',
                description: 'Every change backed up before execution. 90-day rollback window for all fixes.',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Settings,
                title: 'Custom Integrations',
                description: 'Need a specific platform? Our team builds custom connectors for enterprise clients.',
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

      {/* Setup Process */}
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
              Connect in Under 60 Seconds
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simple, guided setup gets you started fast
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Platform',
                description: 'Select Shopify, WordPress, or Universal JavaScript connector.',
                icon: Package,
              },
              {
                step: '02',
                title: 'Authorize Access',
                description: 'Connect via OAuth or enter API credentials securely.',
                icon: Key,
              },
              {
                step: '03',
                title: 'Site Scan',
                description: 'AI automatically crawls and analyzes your site.',
                icon: Zap,
              },
              {
                step: '04',
                title: 'Start Fixing',
                description: 'Choose execution mode and let AI optimize your SEO.',
                icon: CheckCircle2,
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
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-4">
                    {step.step}
                  </div>
                  <step.icon className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-cyan-600/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Connect Your Platform
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                In Under 60 Seconds
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-10">
              Works with any website. No technical expertise required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-lg shadow-lg shadow-green-500/25"
                >
                  Start Connecting
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
