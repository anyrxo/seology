'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  RotateCcw,
  Target,
  Sparkles,
  Cpu,
  Globe,
  Users,
  TrendingUp,
  Clock,
  Award,
  Code,
  Briefcase,
  X,
  Star,
  HelpCircle,
} from 'lucide-react'

export default function LandingPageContent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState<number | null>(null)
  const [hoveredTestimonialIndex, setHoveredTestimonialIndex] = useState<number | null>(null)
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null)

  const features = [
    { icon: Zap, title: 'Automatic SEO Fixes', desc: 'Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically.' },
    { icon: Shield, title: 'Secure CMS Integration', desc: 'Enterprise-grade security with encrypted credentials and OAuth flows.' },
    { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Track your SEO improvements with detailed analytics and performance metrics.' },
    { icon: RotateCcw, title: '90-Day Rollback', desc: 'Every fix can be rolled back for 90 days. Complete peace of mind.' },
    { icon: Target, title: 'Three Execution Modes', desc: 'Choose automatic, plan review, or manual approval—whatever fits your workflow.' },
    { icon: Sparkles, title: 'AI-Powered', desc: 'Leveraging the most advanced AI technology for intelligent SEO decisions.' },
    { icon: Code, title: 'Universal Integration', desc: 'Works with Shopify, WordPress, and any custom website via JavaScript.' },
    { icon: Users, title: 'Team Collaboration', desc: 'Share sites, track changes, and collaborate with your team in real-time.' },
    { icon: Clock, title: '24/7 Monitoring', desc: 'Continuous site monitoring with instant alerts when new issues are detected.' },
  ]

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [90, 0, 90],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            x: [-50, 0, -50],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Hero Section - Centered & Professional */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-white relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powered by Advanced AI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
          >
            Stop Reporting SEO Issues.
            <br />
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-blue-600"
            >
              Start Fixing
            </motion.span>{' '}
            Them Automatically.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            The world's first AI-powered platform that doesn't just find SEO
            problems—it logs into your CMS and fixes them. Automatically.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <span>Start Fixing Issues Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-lg"
              >
                Watch How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 mb-16"
          >
            {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-medium">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: '10,000+', label: 'Fixes Applied' },
              { value: '500+', label: 'Active Sites' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl font-bold text-blue-600 mb-3">{stat.value}</div>
                <div className="text-base font-semibold text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section - Centered & Professional */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Every SEO Tool Tells You What's Wrong
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Nobody actually fixes it.
            </motion.p>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Traditional SEO Tools',
                items: ['Generate reports', 'Identify issues', 'Send alerts', 'You fix everything manually'],
                highlight: false,
              },
              {
                icon: Target,
                title: 'Manual Fixing',
                items: ['Hours of work', 'Human errors', 'Inconsistent execution', 'Expensive developers'],
                highlight: false,
              },
              {
                icon: Zap,
                title: 'SEOLOGY.AI',
                items: ['Automatically logs in', 'Makes permanent fixes', 'Advanced AI intelligence', 'Complete in minutes'],
                highlight: true,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`${
                  card.highlight
                    ? 'bg-blue-600 border-2 border-blue-600 shadow-xl'
                    : 'bg-white border-2 border-gray-200'
                } rounded-2xl p-8 transition-all duration-300`}
              >
                <div className="mb-6">
                  <div
                    className={`w-16 h-16 ${
                      card.highlight ? 'bg-white/20' : 'bg-gray-100'
                    } rounded-xl flex items-center justify-center`}
                  >
                    <card.icon className={`w-10 h-10 ${card.highlight ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                </div>
                <h3
                  className={`text-2xl font-bold ${card.highlight ? 'text-white' : 'text-gray-900'} mb-6`}
                >
                  {card.title}
                </h3>
                <ul className="space-y-4">
                  {card.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                      className={`flex items-start gap-3 ${
                        card.highlight ? 'text-blue-50' : j === 3 ? 'text-gray-700 font-semibold' : 'text-gray-600'
                      }`}
                    >
                      {card.highlight ? (
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works - Professional & Centered */}
      <motion.section
        id="how-it-works"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-semibold mb-6"
            >
              HOW IT WORKS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
            >
              SEO Automation in Three Simple Steps
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-neutral-600"
            >
              From connection to fix in minutes, not weeks
            </motion.p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                icon: Globe,
                title: 'Connect Your Site in 60 Seconds',
                desc: 'Link your Shopify store, WordPress site, or any website in under a minute with secure OAuth or API credentials.',
                items: ['One-click OAuth for Shopify', 'REST API for WordPress', 'Magic.js for any site'],
              },
              {
                num: '02',
                icon: Cpu,
                title: 'AI Analyzes & Creates Fix Plan',
                desc: 'Our AI scans your entire site for 50+ SEO issues, identifies problems, and generates intelligent fixes.',
                items: ['Full site crawl', '50+ issue types detected', 'Smart fix generation'],
              },
              {
                num: '03',
                icon: Zap,
                title: 'Approve Once, Fix Everything',
                desc: 'Review the plan and approve. SEOLOGY.AI logs into your CMS and applies all fixes automatically.',
                items: ['Single approval process', 'Automatic deployment', 'Real-time progress tracking'],
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="bg-white border border-neutral-200 rounded-xl p-8 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === i ? 0.05 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"
                />

                {/* Sparkle effect */}
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 font-bold text-xl mb-6">
                    {step.num}
                  </div>
                  <motion.div
                    animate={{
                      rotate: hoveredIndex === i ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <step.icon className="w-10 h-10 text-blue-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-neutral-600 mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <Check className="w-4 h-4 text-blue-600" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mid-Page CTA Section - Centered */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-blue-600 relative overflow-hidden"
      >
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6"
          >
            LIMITED TIME OFFER
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Save Hours Every Week on SEO Tasks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100 mb-10"
          >
            Join hundreds of businesses automating their SEO with SEOLOGY.AI. Start your free 14-day trial today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-neutral-50 transition-colors shadow-lg"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition-colors"
              >
                Watch Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { value: '92%', label: 'Time Saved' },
              { value: '50+', label: 'Issue Types' },
              { value: '4.9/5', label: 'Customer Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Grid - Centered */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-neutral-50"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-6"
            >
              FEATURES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
            >
              Why Choose SEOLOGY.AI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-neutral-600"
            >
              The most advanced SEO automation platform ever built
            </motion.p>
          </div>

          {/* Features Grid - 3x3 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredFeatureIndex(i)}
                onHoverEnd={() => setHoveredFeatureIndex(null)}
                className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredFeatureIndex === i ? 0.05 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"
                />

                {/* Sparkle effect */}
                {hoveredFeatureIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                )}

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: hoveredFeatureIndex === i ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section - Centered */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-6"
            >
              TESTIMONIALS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
            >
              Loved by SEO Professionals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-neutral-600"
            >
              See what our customers have to say about SEOLOGY.AI
            </motion.p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "SEOLOGY.AI has completely transformed how we handle SEO. What used to take our team days now happens automatically in minutes. The ROI is incredible.",
                name: 'Sarah Johnson',
                role: 'Marketing Director, TechCorp',
                icon: Briefcase,
              },
              {
                quote: "As an agency managing 50+ client sites, SEOLOGY.AI is a game-changer. The automatic fixes and detailed reporting save us countless hours every week.",
                name: 'Michael Chen',
                role: 'CEO, Digital Growth Agency',
                icon: Award,
              },
              {
                quote: "The AI integration is brilliant. It understands context and makes intelligent decisions that actually improve our rankings. Best SEO tool we've used.",
                name: 'Emma Rodriguez',
                role: 'E-commerce Manager, FashionHub',
                icon: TrendingUp,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredTestimonialIndex(i)}
                onHoverEnd={() => setHoveredTestimonialIndex(null)}
                className="bg-white border border-neutral-200 rounded-xl p-8 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredTestimonialIndex === i ? 0.05 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400"
                />

                {/* Sparkle effect */}
                {hoveredTestimonialIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}

                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-6">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <testimonial.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                      <div className="text-sm text-neutral-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section - Centered */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-neutral-50"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6"
            >
              PRICING
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-neutral-600"
            >
              Start free, scale as you grow. No hidden fees or surprises.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'STARTER',
                price: '$29',
                desc: 'Perfect for small businesses and startups',
                cta: 'Start Free Trial →',
                highlight: false,
                features: ['3 sites included', '500 fixes per month', 'Email support', 'Basic analytics', '90-day rollback'],
              },
              {
                name: 'GROWTH',
                price: '$99',
                desc: 'For growing teams and agencies',
                cta: 'Start Free Trial →',
                highlight: true,
                badge: 'MOST POPULAR',
                features: [
                  '10 sites included',
                  '5,000 fixes per month',
                  'Priority support',
                  'Advanced analytics',
                  'Team collaboration',
                  'Custom reports',
                ],
              },
              {
                name: 'SCALE',
                price: '$299',
                desc: 'Enterprise-grade solution',
                cta: 'Contact Sales',
                highlight: false,
                features: [
                  'Unlimited sites',
                  'Unlimited fixes',
                  'Dedicated account manager',
                  '24/7 phone support',
                  'SLA guarantee',
                  'Custom integrations',
                ],
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`${
                  plan.highlight
                    ? 'bg-blue-600 border-2 border-blue-600 shadow-xl relative'
                    : 'bg-white border border-neutral-200'
                } rounded-xl p-8`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
                      className="px-4 py-1 rounded-full bg-green-500 text-white text-xs font-semibold"
                    >
                      {plan.badge}
                    </motion.div>
                  </div>
                )}
                <div className={`text-sm font-semibold ${plan.highlight ? 'text-blue-100' : 'text-neutral-600'} mb-4`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-5xl font-bold ${plan.highlight ? 'text-white' : 'text-neutral-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xl ${plan.highlight ? 'text-blue-100' : 'text-neutral-600'}`}>/mo</span>
                </div>
                <p className={`${plan.highlight ? 'text-blue-100' : 'text-neutral-600'} mb-6`}>{plan.desc}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/pricing"
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors mb-6 ${
                      plan.highlight
                        ? 'bg-white text-blue-600 hover:bg-neutral-50'
                        : plan.name === 'SCALE'
                        ? 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-neutral-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
                <div className={`border-t ${plan.highlight ? 'border-blue-500' : 'border-neutral-200'} pt-6`}>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check
                          className={`w-4 h-4 ${plan.highlight ? 'text-white' : 'text-blue-600'} flex-shrink-0`}
                        />
                        <span className={plan.highlight ? 'text-blue-50' : 'text-neutral-700'}>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link href="/pricing" className="text-blue-600 hover:text-blue-700 font-medium">
              View detailed pricing comparison →
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section - Centered */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-yellow-50 text-yellow-600 text-sm font-semibold mb-6"
            >
              FAQ
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-neutral-600"
            >
              Everything you need to know about SEOLOGY.AI
            </motion.p>
          </div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How does SEOLOGY.AI actually fix SEO issues?',
                a: 'SEOLOGY.AI connects to your CMS using secure OAuth or API credentials. When issues are detected, our AI generates intelligent fixes and applies them directly to your site through the CMS API—just like a developer would, but automatically.',
              },
              {
                q: 'Is it safe? Can I rollback changes?',
                a: 'Absolutely. Every fix is stored with before/after snapshots and can be rolled back with one click for 90 days. We also offer three execution modes: automatic, plan review, or manual approval for maximum control.',
              },
              {
                q: 'What platforms do you support?',
                a: 'We support Shopify (OAuth), WordPress (REST API), and any custom website via our Magic.js connector. More platforms are being added regularly based on customer demand.',
              },
              {
                q: 'What types of SEO issues can you fix?',
                a: 'We detect and fix 50+ SEO issues including missing meta tags, duplicate content, broken links, poor image optimization, missing schema markup, heading structure problems, and much more.',
              },
              {
                q: 'Do I need technical knowledge to use this?',
                a: 'Not at all! SEOLOGY.AI is designed for marketers, business owners, and anyone who wants better SEO without touching code. The AI handles all the technical complexity for you.',
              },
              {
                q: 'Can I try it before committing?',
                a: 'Yes! All plans include a 14-day free trial with no credit card required. You get full access to all features during your trial period. Cancel anytime with no questions asked.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredFaqIndex(i)}
                onHoverEnd={() => setHoveredFaqIndex(null)}
                className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 relative overflow-hidden group"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredFaqIndex === i ? 0.05 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"
                />

                {/* Sparkle effect */}
                {hoveredFaqIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                )}

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3">
                    <motion.div
                      animate={{
                        rotate: hoveredFaqIndex === i ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <h3 className="font-bold text-neutral-900">{faq.q}</h3>
                  </div>
                  <p className="text-sm text-neutral-600 ml-8">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-neutral-600 mb-4">Still have questions?</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-700 rounded-lg font-semibold border-2 border-neutral-200 hover:border-neutral-300 transition-colors"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section - Centered */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-neutral-50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
          >
            Stay Updated with <span className="text-blue-600">SEO Insights</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-neutral-600 mb-8"
          >
            Get weekly tips on SEO automation, AI updates, and success stories from our users
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* Final CTA - Centered */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-neutral-900 relative overflow-hidden"
      >
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>START TODAY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Automate Your SEO?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-neutral-300 mb-10"
          >
            Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically. Get started in under 60 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors shadow-lg"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition-colors"
              >
                View Pricing Plans
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Check, title: '14-Day Free Trial', desc: 'No credit card required' },
              { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 compliant' },
              { icon: RotateCcw, title: '90-Day Rollback', desc: 'Risk-free guarantee' },
            ].map((trust, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-neutral-800 border border-neutral-700 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <trust.icon className="w-5 h-5 text-green-400" />
                  <div className="font-semibold text-white">{trust.title}</div>
                </div>
                <div className="text-sm text-neutral-400">{trust.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
