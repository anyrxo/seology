'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  ChevronRight,
  Play,
  Layers,
  Database,
  Lock,
  Gauge,
} from 'lucide-react'

export default function LandingPageContent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState<number | null>(null)
  const [hoveredTestimonialIndex, setHoveredTestimonialIndex] = useState<number | null>(null)
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: Zap,
      title: 'Automatic SEO Fixes',
      desc: 'Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically.',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure CMS Integration',
      desc: 'Enterprise-grade security with encrypted credentials and OAuth flows.',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      desc: 'Track your SEO improvements with detailed analytics and performance metrics.',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: RotateCcw,
      title: '90-Day Rollback',
      desc: 'Every fix can be rolled back for 90 days. Complete peace of mind.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Target,
      title: 'Three Execution Modes',
      desc: 'Choose automatic, plan review, or manual approval—whatever fits your workflow.',
      gradient: 'from-red-400 to-rose-500',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Intelligence',
      desc: 'Leveraging advanced AI for the most intelligent SEO decisions possible.',
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      icon: Code,
      title: 'Universal Integration',
      desc: 'Works with Shopify, WordPress, and any custom website via JavaScript.',
      gradient: 'from-teal-400 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      desc: 'Share sites, track changes, and collaborate with your team in real-time.',
      gradient: 'from-pink-400 to-fuchsia-500',
    },
    {
      icon: Clock,
      title: '24/7 Monitoring',
      desc: 'Continuous site monitoring with instant alerts when new issues are detected.',
      gradient: 'from-amber-400 to-yellow-500',
    },
  ]

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            x: -mousePosition.x * 0.02,
            y: -mousePosition.y * 0.02,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[140px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            x: mousePosition.x * 0.01 - 300,
            y: mousePosition.y * 0.01 - 300,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto text-center pt-20 pb-32">
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powered by Advanced AI - The World's Most Intelligent SEO Platform
            </span>
          </motion.div>

          {/* Main headline with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8"
          >
            <span className="block mb-2">Stop Reporting</span>
            <span className="block mb-2">SEO Issues.</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 }}
              className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Start Fixing Them.
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            The world's first AI-powered platform that{' '}
            <span className="text-white font-semibold">doesn't just find</span> SEO problems—
            <span className="text-white font-semibold">it logs into your CMS and fixes them</span>.
            Automatically.
          </motion.p>

          {/* CTA Buttons with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="group relative inline-flex items-center gap-2 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 text-lg overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="relative z-10">Start Fixing Issues Free</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 text-lg group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Watch How It Works</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust indicators with icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-20"
          >
            {[
              { icon: Check, text: 'Free forever plan' },
              { icon: Shield, text: 'No credit card required' },
              { icon: RotateCcw, text: 'Cancel anytime' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <item.icon className="w-4 h-4 text-green-400" />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Glassmorphic stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { value: '10,000+', label: 'Fixes Applied', icon: Zap },
              { value: '500+', label: 'Active Sites', icon: Globe },
              { value: '99.9%', label: 'Uptime', icon: Gauge },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* The Problem Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              Every SEO Tool{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Tells You
              </span>{' '}
              What's Wrong
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-slate-400"
            >
              Nobody actually <span className="text-white font-bold">fixes it</span>.
            </motion.p>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Traditional SEO Tools',
                items: ['Generate endless reports', 'Identify issues you already know', 'Send annoying alerts', 'You fix everything manually'],
                highlight: false,
                iconColor: 'text-gray-400',
              },
              {
                icon: Target,
                title: 'Manual Fixing',
                items: ['Hours of tedious work', 'Human errors everywhere', 'Inconsistent execution', 'Expensive developers'],
                highlight: false,
                iconColor: 'text-gray-400',
              },
              {
                icon: Zap,
                title: 'SEOLOGY.AI',
                items: [
                  'Automatically logs into your CMS',
                  'Makes permanent fixes in minutes',
                  'AI-powered intelligence',
                  'Zero manual work required',
                ],
                highlight: true,
                iconColor: 'text-blue-400',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative group"
              >
                {card.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                )}
                <div
                  className={`relative ${
                    card.highlight
                      ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30'
                      : 'bg-white/5 border-white/10'
                  } backdrop-blur-xl border rounded-3xl p-8 transition-all duration-300`}
                >
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 ${
                        card.highlight ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-white/5'
                      } rounded-2xl flex items-center justify-center mb-4`}
                    >
                      <card.icon className={`w-10 h-10 ${card.iconColor}`} />
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold ${card.highlight ? 'text-white' : 'text-slate-300'} mb-6`}>
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
                        className="flex items-start gap-3"
                      >
                        {card.highlight ? (
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={card.highlight ? 'text-slate-200' : 'text-slate-400'}>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              HOW IT WORKS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-4"
            >
              SEO Automation in{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Three Simple Steps
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-400"
            >
              From connection to fix in minutes, not weeks
            </motion.p>
          </div>

          {/* Steps with flowing connector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 origin-left"
              />
            </div>

            {[
              {
                num: '01',
                icon: Globe,
                title: 'Connect Your Site',
                desc: 'Link your Shopify store, WordPress site, or any website in under 60 seconds with secure OAuth or API credentials.',
                items: ['One-click OAuth for Shopify', 'REST API for WordPress', 'Magic.js for any custom site'],
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                num: '02',
                icon: Cpu,
                title: 'AI Analyzes & Plans',
                desc: 'Our AI scans your entire site for 50+ SEO issues, identifies problems, and generates intelligent fix plans.',
                items: ['Full site crawl & analysis', '50+ issue types detected', 'Smart fix generation with AI'],
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                num: '03',
                icon: Zap,
                title: 'Approve & Auto-Fix',
                desc: 'Review the plan and approve once. SEOLOGY.AI logs into your CMS and applies all fixes automatically.',
                items: ['Single approval process', 'Automatic CMS deployment', 'Real-time progress tracking'],
                gradient: 'from-green-500 to-emerald-500',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.2, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -12, scale: 1.02 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-all duration-500`}
                />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full">
                  {/* Number badge */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === i ? 1.1 : 1,
                    }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} font-black text-2xl text-white mb-6 shadow-lg`}
                  >
                    {step.num}
                  </motion.div>

                  {/* Icon with animation */}
                  <motion.div
                    animate={{
                      rotate: hoveredIndex === i ? [0, -10, 10, -10, 0] : 0,
                      scale: hoveredIndex === i ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <step.icon className={`w-12 h-12 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">{step.desc}</p>

                  {/* Feature list */}
                  <ul className="space-y-3">
                    {step.items.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.2 + j * 0.1 }}
                        className="flex items-center gap-3 text-sm text-slate-300"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Sparkle effect on hover */}
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-6 right-6"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all text-lg"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              FEATURES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-4"
            >
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SEOLOGY.AI
              </span>
              ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-400"
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
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredFeatureIndex(i)}
                onHoverEnd={() => setHoveredFeatureIndex(null)}
                className="relative group"
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500`}
                />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotate: hoveredFeatureIndex === i ? [0, -10, 10, -10, 0] : 0,
                      scale: hoveredFeatureIndex === i ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>

                  {/* Sparkle effect on hover */}
                  {hoveredFeatureIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Social Proof / Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4 relative overflow-hidden"
      >
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
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
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold mb-6 backdrop-blur-xl"
          >
            TRUSTED BY HUNDREDS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Save{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Hours Every Week
            </span>{' '}
            on SEO
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 mb-12"
          >
            Join businesses automating their SEO with SEOLOGY.AI
          </motion.p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              { value: '92%', label: 'Time Saved', icon: Clock },
              { value: '50+', label: 'Issue Types Fixed', icon: Target },
              { value: '4.9/5', label: 'Customer Rating', icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-orange-400" />
                  <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-5 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl font-bold hover:shadow-2xl hover:shadow-orange-500/50 transition-all text-lg"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-8 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-semibold hover:bg-white/10 transition-all text-lg"
              >
                View All Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              TESTIMONIALS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-4"
            >
              Loved by{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                SEO Professionals
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-400"
            >
              See what our customers have to say
            </motion.p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'SEOLOGY.AI has completely transformed how we handle SEO. What used to take our team days now happens automatically in minutes. The ROI is incredible.',
                name: 'Sarah Johnson',
                role: 'Marketing Director, TechCorp',
                icon: Briefcase,
              },
              {
                quote:
                  "As an agency managing 50+ client sites, SEOLOGY.AI is a game-changer. The automatic fixes and detailed reporting save us countless hours every week.",
                name: 'Michael Chen',
                role: 'CEO, Digital Growth Agency',
                icon: Award,
              },
              {
                quote:
                  "The AI integration is brilliant. It understands context and makes intelligent decisions that actually improve our rankings. Best SEO tool we've used.",
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
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredTestimonialIndex(i)}
                onHoverEnd={() => setHoveredTestimonialIndex(null)}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-500" />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
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

                  <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.quote}</p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <testimonial.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Sparkle effect on hover */}
                  {hoveredTestimonialIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-6 right-6"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              PRICING
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-4"
            >
              Simple,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Transparent
              </span>{' '}
              Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-400"
            >
              Start free, scale as you grow. No hidden fees.
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'STARTER',
                price: 'FREE',
                period: 'forever',
                desc: 'Perfect for small businesses and startups',
                cta: 'Get Started Free',
                highlight: false,
                features: ['1 site included', '100 fixes per month', 'Email support', 'Basic analytics', '90-day rollback'],
                gradient: 'from-slate-500 to-gray-500',
              },
              {
                name: 'GROWTH',
                price: '$99',
                period: '/month',
                desc: 'For growing teams and agencies',
                cta: 'Get Started',
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
                gradient: 'from-blue-500 to-purple-500',
              },
              {
                name: 'SCALE',
                price: '$299',
                period: '/month',
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
                gradient: 'from-emerald-500 to-teal-500',
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -12, scale: plan.highlight ? 1.05 : 1.02 }}
                className={`relative group ${plan.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
                      className="px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg"
                    >
                      {plan.badge}
                    </motion.div>
                  </div>
                )}

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} ${
                    plan.highlight ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
                  } rounded-3xl blur-2xl transition-all duration-500`}
                />

                {/* Card */}
                <div
                  className={`relative ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30'
                      : 'bg-white/5 border-white/10'
                  } backdrop-blur-xl border rounded-3xl p-8 h-full`}
                >
                  <div className="text-sm font-bold text-slate-400 mb-4">{plan.name}</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-black text-white">{plan.price}</span>
                    <span className="text-xl text-slate-400">{plan.period}</span>
                  </div>
                  <p className="text-slate-400 mb-8">{plan.desc}</p>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-8">
                    <Link
                      href={plan.name === 'SCALE' ? '/pricing' : '/sign-up'}
                      className={`block w-full text-center px-6 py-4 rounded-2xl font-bold transition-all ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/50'
                          : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </motion.div>

                  <div className="border-t border-white/10 pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                          className="flex items-center gap-3 text-sm text-slate-300"
                        >
                          <Check className={`w-4 h-4 ${plan.highlight ? 'text-blue-400' : 'text-green-400'} flex-shrink-0`} />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
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
            <Link
              href="/pricing"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-2"
            >
              View detailed pricing comparison
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4"
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              FAQ
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-white mb-4"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-400"
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
                a: "Not at all! SEOLOGY.AI is designed for marketers, business owners, and anyone who wants better SEO without touching code. The AI handles all the technical complexity for you.",
              },
              {
                q: 'Can I try it before committing?',
                a: 'Yes! We offer a completely free STARTER plan with no credit card required. You get 1 site and 100 fixes per month forever. Upgrade anytime to unlock more sites and fixes.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ y: -6 }}
                onHoverStart={() => setHoveredFaqIndex(i)}
                onHoverEnd={() => setHoveredFaqIndex(null)}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-500" />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <motion.div
                      animate={{
                        rotate: hoveredFaqIndex === i ? [0, -15, 15, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <HelpCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <h3 className="font-bold text-white">{faq.q}</h3>
                  </div>
                  <p className="text-sm text-slate-400 ml-8 leading-relaxed">{faq.a}</p>

                  {/* Sparkle effect on hover */}
                  {hoveredFaqIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  )}
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
            <p className="text-slate-400 mb-4">Still have questions?</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-semibold hover:bg-white/10 transition-all"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4 relative overflow-hidden"
      >
        {/* Massive animated gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, #06b6d4 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(40)].map((_, i) => (
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
                y: [0, -50, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 text-sm font-bold mb-8 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>START TODAY - FREE FOREVER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Ready to Automate
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your SEO?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically.
            <br />
            Get started in under <span className="text-white font-bold">60 seconds</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="group relative inline-flex items-center gap-2 px-10 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ opacity: 0.3 }}
                />
                <span className="relative z-10">Get Started Free</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-10 py-6 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Pricing Plans
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Check, title: 'Free Forever Plan', desc: 'No credit card required' },
              { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 compliant' },
              { icon: RotateCcw, title: '90-Day Rollback', desc: 'Risk-free guarantee' },
            ].map((trust, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex flex-col items-center text-center">
                    <trust.icon className="w-8 h-8 text-green-400 mb-3" />
                    <div className="font-bold text-white mb-1">{trust.title}</div>
                    <div className="text-sm text-slate-400">{trust.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
