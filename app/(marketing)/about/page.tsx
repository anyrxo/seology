'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
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
  Brain,
  Code,
  Clock,
  Award,
  Rocket,
  Cpu,
} from 'lucide-react'

export default function AboutPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null)
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

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden min-h-screen">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">About SEOLOGY.AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8"
          >
            <span className="block mb-2">We Don't Just</span>
            <span className="block mb-2 text-slate-400">Report Problems.</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 }}
              className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              We Fix Them.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            The first AI that actually logs into your CMS and fixes SEO issues automatically.
            No more endless reports. Just results.
          </motion.p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Target, value: '50K+', label: 'Fixes Applied' },
              { icon: Users, value: '500+', label: 'Happy Customers' },
              { icon: Globe, value: '95%', label: 'Success Rate' },
              { icon: TrendingUp, value: '3.2x', label: 'Avg Traffic Increase' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-6 backdrop-blur-xl"
          >
            OUR MISSION
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Democratize SEO through{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Automation
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Making professional SEO optimization accessible to every website owner,
            from solo entrepreneurs to enterprise teams.
          </p>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              CORE VALUES
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              What Drives{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Automation First',
                description:
                  'Leverage AI to eliminate repetitive tasks. Focus on strategy, let us handle execution.',
                gradient: 'from-yellow-400 to-orange-500',
              },
              {
                icon: Shield,
                title: 'Trust & Security',
                description:
                  'Enterprise-grade encryption, SOC 2 compliance. Your data is sacred, your credentials are safe.',
                gradient: 'from-green-400 to-emerald-500',
              },
              {
                icon: Heart,
                title: 'Customer Success',
                description:
                  'Your SEO wins are our wins. We measure success by your traffic gains and ranking improvements.',
                gradient: 'from-pink-400 to-rose-500',
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description:
                  'Push boundaries with AI-powered automation. SEO tools haven\'t evolved in years—we\'re changing that.',
                gradient: 'from-purple-400 to-indigo-500',
              },
              {
                icon: Users,
                title: 'Transparency',
                description:
                  'No black boxes. Every fix is logged, explained, and reversible. You\'re always in control.',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: TrendingUp,
                title: 'Results-Driven',
                description:
                  'Measure impact with before/after analytics. Every change tracked, every improvement proven.',
                gradient: 'from-emerald-400 to-teal-500',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredValue(index)}
                onHoverEnd={() => setHoveredValue(null)}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full">
                  <motion.div
                    animate={{
                      rotate: hoveredValue === index ? [0, -10, 10, -10, 0] : 0,
                      scale: hoveredValue === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-4`}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{value.description}</p>

                  {hoveredValue === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4"
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

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              THE TEAM
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              Building the Future of{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                SEO Automation
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              World-class engineers, designers, and SEO experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'CEO & Co-Founder',
                bio: 'Former Head of Growth at YC-backed startup. Scaled traffic from 0 to 10M visitors.',
                avatar: 'AC',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                name: 'Sarah Martinez',
                role: 'CTO & Co-Founder',
                bio: 'Ex-Google AI engineer with 10+ years building intelligent systems at scale.',
                avatar: 'SM',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                name: 'David Kim',
                role: 'Head of Product',
                bio: 'Former Shopify PM. Obsessed with tools that developers and marketers both love.',
                avatar: 'DK',
                gradient: 'from-emerald-500 to-teal-500',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredTeam(index)}
                onHoverEnd={() => setHoveredTeam(null)}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center h-full">
                  <motion.div
                    animate={{
                      scale: hoveredTeam === index ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-32 h-32 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto`}
                  >
                    {member.avatar}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-4 font-semibold">{member.role}</p>
                  <p className="text-slate-400 leading-relaxed">{member.bio}</p>

                  {hoveredTeam === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4"
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

      {/* Technology Stack */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold mb-6 backdrop-blur-xl"
            >
              TECHNOLOGY
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              Cutting-Edge{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
            <p className="text-xl text-slate-400">
              Built with the best tools for performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                name: 'Advanced AI Engine',
                description:
                  'State-of-the-art AI technology for intelligent SEO analysis and fix generation.',
                tag: 'AI Engine',
                gradient: 'from-indigo-500 to-purple-500',
              },
              {
                icon: Code,
                name: 'Next.js 14',
                description:
                  'Modern React framework for blazing-fast performance and seamless UX.',
                tag: 'Frontend',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Shield,
                name: 'PostgreSQL',
                description:
                  'Enterprise-grade database for reliable data storage and complex queries.',
                tag: 'Database',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Rocket,
                name: 'Vercel Edge',
                description:
                  'Global CDN deployment for sub-100ms response times worldwide.',
                tag: 'Infrastructure',
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <tech.icon className={`w-12 h-12 bg-gradient-to-r ${tech.gradient} bg-clip-text text-transparent`} />
                    </motion.div>
                    <span
                      className={`px-4 py-1.5 bg-gradient-to-r ${tech.gradient} bg-clip-text text-transparent bg-white/10 text-xs rounded-full uppercase tracking-wider font-semibold border border-white/10`}
                    >
                      {tech.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{tech.name}</h3>
                  <p className="text-slate-400 leading-relaxed">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="py-32 px-4 relative overflow-hidden"
      >
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

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 text-sm font-bold mb-8 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>JOIN OUR MISSION</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Ready to Automate
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your SEO?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of businesses using SEOLOGY.AI to fix their SEO automatically.
            <br />
            Get started in under <span className="text-white font-bold">60 seconds</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
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
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-6 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 compliant' },
              { icon: Clock, title: '90-Day Rollback', desc: 'Risk-free guarantee' },
              { icon: Award, title: 'World-Class Support', desc: '24/7 assistance' },
            ].map((trust, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
