'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Zap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Settings,
  RotateCcw,
  Shield,
  Clock,
  Target,
  Code,
  FileEdit,
  Activity,
  TrendingUp,
  Lock,
  GitBranch,
  Play,
} from 'lucide-react'

export default function AutomaticFixesPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredMode, setHoveredMode] = useState<number | null>(null)
  const [fixCount, setFixCount] = useState(0)
  const [activeMode, setActiveMode] = useState<'automatic' | 'plan' | 'approve'>('automatic')
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Live fix counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFixCount((prev) => {
        const newCount = prev + Math.floor(Math.random() * 5) + 1
        return newCount > 847 ? 0 : newCount
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-yellow-500/20 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-orange-500/20 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-sm font-medium text-yellow-300">
                <motion.span
                  key={fixCount}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {fixCount.toLocaleString()}
                </motion.span>{' '}
                fixes applied today
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SEO Fixes That
              <br />
              <motion.span
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Apply Themselves
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The first SEO platform that doesn't just identify issues—it logs into your CMS
              and makes permanent fixes automatically. No more manual work, no more tickets.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 text-lg shadow-lg shadow-yellow-500/25"
              >
                Start Automating Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
              >
                Watch Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Different */}
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
              The Game-Changing Difference
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Most tools report issues. We actually fix them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-red-400 font-bold mb-4 text-lg">Traditional SEO Tools</div>
              <ul className="space-y-3">
                {[
                  'Generate reports and to-do lists',
                  'You manually fix each issue',
                  'Hours of repetitive work',
                  'Fixes applied inconsistently',
                  'Always behind on SEO tasks',
                  'Need developers for technical fixes',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <span className="text-red-400 mr-3">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-green-500/10 border border-green-500/20 rounded-xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-green-400 font-bold mb-4 text-lg">SEOLOGY.AI</div>
              <ul className="space-y-3">
                {[
                  'Detects AND fixes issues automatically',
                  'Logs into your CMS and applies changes',
                  'Fixes applied in seconds',
                  'Consistent, AI-optimized implementation',
                  'Always up-to-date SEO',
                  'No developer or manual work needed',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Execution Modes */}
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
              You Control the Automation
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three execution modes to match your workflow and comfort level
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Play,
                title: 'Automatic Mode',
                subtitle: 'Full Autopilot',
                description: 'AI detects and fixes issues immediately without approval. Perfect for ongoing maintenance.',
                features: [
                  'Zero manual work',
                  'Instant fixes applied',
                  'Continuous optimization',
                  'Best for maintenance',
                ],
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: GitBranch,
                title: 'Plan Mode',
                subtitle: 'Review Before Execution',
                description: 'AI creates a batch of fixes. Review the plan once, approve, and all fixes execute together.',
                features: [
                  'Batch review and approval',
                  'See all changes upfront',
                  'Execute with one click',
                  'Best for major updates',
                ],
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Target,
                title: 'Approve Mode',
                subtitle: 'Manual Per-Fix Control',
                description: 'AI suggests fixes individually. You review and approve each one before it\'s applied.',
                features: [
                  'Complete control',
                  'Per-fix approval',
                  'Learn as you go',
                  'Best for new users',
                ],
                gradient: 'from-blue-500 to-cyan-500',
              },
            ].map((mode, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredMode(index)}
                onHoverEnd={() => setHoveredMode(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0`}
                  animate={{ opacity: hoveredMode === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${mode.gradient} rounded-lg flex items-center justify-center mb-6`}
                    animate={{
                      rotate: hoveredMode === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <mode.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {mode.title}
                  </h3>
                  <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${mode.gradient} bg-clip-text text-transparent`}>
                    {mode.subtitle}
                  </p>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {mode.description}
                  </p>

                  <ul className="space-y-3">
                    {mode.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {hoveredMode === index && (
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

      {/* What Gets Fixed */}
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
              Comprehensive Fix Library
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Every type of SEO issue, automatically fixed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileEdit,
                title: 'Meta Tag Optimization',
                description: 'Generate and apply perfect title tags, meta descriptions, and Open Graph tags for every page.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Code,
                title: 'Technical Fixes',
                description: 'Fix broken links, implement redirects, generate sitemaps, add canonical tags, and more.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Activity,
                title: 'Content Optimization',
                description: 'Improve readability, add LSI keywords, optimize headers, and enhance content structure.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: TrendingUp,
                title: 'Performance Improvements',
                description: 'Compress images, lazy load assets, optimize Core Web Vitals, and boost page speed.',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Settings,
                title: 'Schema Markup',
                description: 'Automatically add and update structured data for products, articles, FAQs, and more.',
                gradient: 'from-red-500 to-rose-500',
              },
              {
                icon: Lock,
                title: 'Security SEO',
                description: 'Implement HTTPS redirects, fix mixed content warnings, and secure external links.',
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

      {/* Safety Features */}
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
              Safe, Reversible, Auditable
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Automation with complete peace of mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: RotateCcw,
                title: '90-Day Rollback',
                description: 'Every fix stores before/after state. Instantly undo any change within 90 days if needed.',
              },
              {
                icon: Shield,
                title: 'Safety Checks',
                description: 'AI validates every fix before applying. Prevents destructive changes and maintains site integrity.',
              },
              {
                icon: Clock,
                title: 'Complete Audit Trail',
                description: 'Full history of who changed what, when, and why. Export logs for compliance and reporting.',
              },
            ].map((safety, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <safety.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {safety.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {safety.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-red-600/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stop Reporting Issues.
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Start Fixing Them.
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-10">
              Join the first SEO platform that actually does the work for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 text-lg shadow-lg shadow-yellow-500/25"
                >
                  Start Automating Now
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
