'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Target,
  Users,
  Lightbulb,
  Heart,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Code,
  Brain,
} from 'lucide-react'
import CTASection from '@/components/marketing/CTASection'

// Animated Counter Component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''))
    const duration = 2000
    const steps = 60
    const increment = numValue / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setCount(numValue)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  const displayValue = value.includes('.')
    ? count.toFixed(1)
    : value.includes('K')
    ? Math.floor(count) + 'K'
    : value.includes('%')
    ? Math.floor(count) + '%'
    : value.includes('x')
    ? count.toFixed(1) + 'x'
    : Math.floor(count)

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? displayValue : '0' + suffix}
    </span>
  )
}

// Typewriter Effect Component
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, delay + currentIndex * 30)

    return () => clearTimeout(timeout)
  }, [currentIndex, isInView, text, delay])

  return (
    <span ref={ref}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-white ml-1"
        />
      )}
    </span>
  )
}

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div className="bg-black">
      {/* Dramatic Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <motion.div
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 inline-block"
            >
              <Sparkles className="w-16 h-16 text-white mx-auto" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We Don't Just
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              >
                Report Problems.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-white mt-4"
              >
                We Fix Them.
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
            >
              The first AI that actually logs into your CMS and fixes SEO issues automatically.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/50 text-sm flex flex-col items-center gap-2"
          >
            <span>Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Story Timeline Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              From frustration to innovation
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/40 to-white/20" />

            <div className="space-y-24">
              {[
                {
                  year: '2023',
                  quarter: 'Q1',
                  title: 'The Problem',
                  description:
                    'As e-commerce operators, we were frustrated by SEO tools that only generated reports. We spent weeks manually fixing issues across hundreds of product pages.',
                  side: 'left',
                },
                {
                  year: '2023',
                  quarter: 'Q2',
                  title: 'The Insight',
                  description:
                    'Claude AI reached sophistication levels where it could understand context and generate actual code fixes. We realized we could automate the entire SEO fixing process.',
                  side: 'right',
                },
                {
                  year: '2023',
                  quarter: 'Q3',
                  title: 'First Prototype',
                  description:
                    'Built the first working prototype that connected to Shopify and automatically fixed meta tags. Results were immediate—3x traffic increase in 30 days.',
                  side: 'left',
                },
                {
                  year: '2023',
                  quarter: 'Q4',
                  title: 'Beta Launch',
                  description:
                    'Launched private beta with 50 e-commerce stores. Added WordPress support and refined the AI models based on real-world feedback.',
                  side: 'right',
                },
                {
                  year: '2024',
                  quarter: 'Q1',
                  title: 'Public Launch',
                  description:
                    'Officially launched SEOLOGY.AI to the public. Introduced three execution modes and the 90-day rollback feature for maximum control.',
                  side: 'left',
                },
                {
                  year: '2024',
                  quarter: 'Q4',
                  title: 'Today',
                  description:
                    'Helping 500+ businesses automate their SEO. Processing 50,000+ fixes per month with a 95% success rate. Expanding to new platforms.',
                  side: 'right',
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: milestone.side === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                    milestone.side === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-white border-4 border-black -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div
                    className={`${
                      milestone.side === 'left'
                        ? 'md:col-start-1 md:text-right md:pr-12'
                        : 'md:col-start-2 md:pl-12'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-white tracking-wider">
                          {milestone.year} {milestone.quarter}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                icon: Target,
                value: '50K',
                label: 'Fixes Applied',
              },
              {
                icon: Users,
                value: '500',
                label: 'Happy Customers',
              },
              {
                icon: Globe,
                value: '95%',
                label: 'Success Rate',
              },
              {
                icon: TrendingUp,
                value: '3.2x',
                label: 'Avg. Traffic Increase',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-white mx-auto mb-6" />
                <div className="text-6xl font-bold text-white mb-3">
                  <AnimatedCounter value={stat.value} />
                  {stat.value.includes('+') && '+'}
                </div>
                <div className="text-lg text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement with Typewriter */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight">
              <TypewriterText text="Our mission is to democratize SEO by making professional optimization accessible to every website owner through AI automation." />
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 2 }}
              className="h-1 w-32 bg-white mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section with Stagger Animation */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-2xl text-gray-400">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Automation First',
                description:
                  'We believe in leveraging AI and automation to eliminate repetitive tasks, so you can focus on strategy and growth.',
              },
              {
                icon: Shield,
                title: 'Trust & Security',
                description:
                  'Your data and credentials are sacred. We use enterprise-grade security and never compromise on protection.',
              },
              {
                icon: Heart,
                title: 'Customer Success',
                description:
                  'Your SEO success is our success. We measure ourselves by the traffic and rankings we help you achieve.',
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description:
                  "SEO tools haven't evolved in years. We're pushing boundaries with AI-powered automation that actually works.",
              },
              {
                icon: Users,
                title: 'Transparency',
                description:
                  "No black boxes. Every fix is logged, explained, and reversible. You're always in control.",
              },
              {
                icon: TrendingUp,
                title: 'Results-Driven',
                description:
                  'We do not just fix issues - we measure impact. Every change tracked with before/after analytics.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Hover Effects */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Meet the Team</h2>
            <p className="text-2xl text-gray-400">
              The people building the future of SEO automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'CEO & Co-Founder',
                bio: 'Former Head of Growth at a YC-backed startup. Built SEO systems that scaled traffic from 0 to 10M visitors.',
                avatar: 'AC',
              },
              {
                name: 'Sarah Martinez',
                role: 'CTO & Co-Founder',
                bio: 'Ex-Google engineer with 10+ years building AI systems. Led the team that launched Claude integration.',
                avatar: 'SM',
              },
              {
                name: 'David Kim',
                role: 'Head of Product',
                bio: 'Former Shopify Product Manager. Obsessed with creating tools that developers and marketers both love.',
                avatar: 'DK',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur-sm text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-32 h-32 bg-gradient-to-br from-white to-gray-400 rounded-full flex items-center justify-center text-black text-3xl font-bold mb-6 mx-auto"
                >
                  {member.avatar}
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-400 mb-4 font-semibold">{member.role}</p>
                <p className="text-gray-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Built on Cutting-Edge Technology
            </h2>
            <p className="text-2xl text-gray-400">
              We leverage the best tools and platforms to deliver results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Claude 3.5 Sonnet',
                description:
                  "Anthropic's most advanced AI model powers our intelligent SEO analysis and fix generation.",
                tag: 'AI Engine',
                icon: Brain,
              },
              {
                name: 'Next.js 14',
                description:
                  'Modern React framework for blazing-fast performance and seamless user experience.',
                tag: 'Frontend',
                icon: Code,
              },
              {
                name: 'PostgreSQL',
                description:
                  'Enterprise-grade database for reliable data storage and complex queries.',
                tag: 'Database',
                icon: Shield,
              },
              {
                name: 'Vercel',
                description:
                  'Edge network deployment for global availability and sub-100ms response times.',
                tag: 'Infrastructure',
                icon: Globe,
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-6">
                  <tech.icon className="w-12 h-12 text-white" />
                  <span className="px-4 py-1.5 bg-white/10 text-white text-xs rounded-full uppercase tracking-wider">
                    {tech.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {tech.name}
                </h3>
                <p className="text-gray-400 leading-relaxed">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-2xl text-gray-400 mb-16">
              Have questions? Want to learn more? We'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: 'General Inquiries',
                  email: 'hello@seology.ai',
                },
                {
                  title: 'Support',
                  email: 'support@seology.ai',
                },
                {
                  title: 'Partnerships',
                  email: 'partners@seology.ai',
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {contact.title}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-400 hover:text-white transition-colors text-lg"
                  >
                    {contact.email}
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-white text-black px-12 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
              >
                Start Your Free Trial
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Automate Your SEO?"
        description="Join hundreds of businesses using SEOLOGY.AI to fix their SEO automatically"
        primaryCTA={{ text: 'Start Free Trial →', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Pricing', href: '/pricing' }}
      />
    </div>
  )
}
