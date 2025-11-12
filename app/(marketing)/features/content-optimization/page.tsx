'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Edit3,
  Brain,
  Target,
  Lightbulb,
  Search,
  Users,
  TrendingUp,
  Zap,
  Eye,
  Award,
  MessageSquare,
} from 'lucide-react'

export default function ContentOptimizationPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null)
  const [activeExample, setActiveExample] = useState(0)
  const [readabilityScore, setReadabilityScore] = useState(42)
  const [wordCount, setWordCount] = useState(487)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Live readability score animation
  useEffect(() => {
    const interval = setInterval(() => {
      setReadabilityScore((prev) => {
        const change = Math.floor(Math.random() * 5) + 1
        const newScore = prev + change
        return newScore > 85 ? 42 : newScore
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Live word count
  useEffect(() => {
    const interval = setInterval(() => {
      setWordCount((prev) => prev + Math.floor(Math.random() * 10) + 5)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  const contentExamples = [
    {
      type: 'Blog Post',
      before: '45% readable',
      after: '89% readable',
      improvement: '+127% engagement',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'Product Page',
      before: 'Generic description',
      after: 'SEO-optimized copy',
      improvement: '+203% conversions',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      type: 'Landing Page',
      before: 'Keyword stuffing',
      after: 'Natural placement',
      improvement: '+156% rankings',
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
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-500/20 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-pink-500/20 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <FileText className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm font-medium text-purple-300">
                Readability:{' '}
                <motion.span
                  key={readabilityScore}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={readabilityScore > 70 ? 'text-green-400' : 'text-yellow-400'}
                >
                  {readabilityScore}%
                </motion.span>
              </span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Content That
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Ranks and Converts
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Let AI analyze your content and optimize it for search engines AND humans.
              From readability to keyword density to featured snippets—we handle it all.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-lg shadow-lg shadow-purple-500/25"
              >
                Optimize Content Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
              >
                See Examples
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
              { label: 'Words Optimized', value: '12M+', gradient: 'from-purple-400 to-pink-400' },
              { label: 'Avg Readability Gain', value: '+43%', gradient: 'from-blue-400 to-cyan-400' },
              { label: 'Content Pieces Enhanced', value: '847K+', gradient: 'from-green-400 to-emerald-400' },
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

      {/* Live Content Analysis Preview */}
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
              Watch AI{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Optimize in Real-Time
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See live improvements as AI analyzes and enhances your content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Live Readability Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-slate-400">Flesch Reading Ease</span>
                </div>
                <motion.div
                  key={readabilityScore}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className={`text-6xl font-bold bg-gradient-to-r ${
                    readabilityScore > 70 ? 'from-green-400 to-emerald-400' : 'from-yellow-400 to-orange-400'
                  } bg-clip-text text-transparent mb-2`}
                >
                  {readabilityScore}%
                </motion.div>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Improving...</span>
                </div>
              </div>
            </motion.div>

            {/* Live Word Count Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">Optimized Word Count</span>
                </div>
                <motion.div
                  key={wordCount}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                >
                  {wordCount.toLocaleString()}
                </motion.div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Brain className="w-4 h-4" />
                  <span className="text-sm font-medium">AI writing...</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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
              Content Optimization{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Evolved
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Stop struggling with manual content optimization
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
                  <span className="text-2xl">✏️</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Manual Optimization</h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Spend hours researching keywords manually',
                  'Guess at ideal content length and structure',
                  'Trial and error with readability improvements',
                  'No competitor analysis or benchmarking',
                  'Manual schema markup creation',
                  'Hope your content ranks (usually doesn\'t)',
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
              className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
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
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">SEOLOGY AI Content</h3>
              </div>

              <ul className="space-y-4 relative z-10">
                {[
                  'AI analyzes top-ranking content in seconds',
                  'Optimal length, structure, and keywords suggested',
                  'Automatic readability optimization to target score',
                  'Comprehensive competitor gap analysis',
                  'Auto-generated schema markup',
                  'Proven to rank: +217% traffic on average',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-slate-200"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Content Examples */}
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
              Real Content Transformations
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how AI optimization delivers measurable improvements
            </p>
          </motion.div>

          {/* Content Type Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {contentExamples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeExample === index
                    ? `bg-gradient-to-r ${example.gradient} text-white shadow-lg`
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.type}
              </motion.button>
            ))}
          </div>

          {/* Active Example Stats */}
          <motion.div
            key={activeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Before Optimization</div>
                <div className="text-2xl font-bold text-red-400 mb-2">
                  {contentExamples[activeExample].before}
                </div>
                <div className="text-xs text-slate-500">Needs improvement</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">After SEOLOGY AI</div>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {contentExamples[activeExample].after}
                </div>
                <div className="text-xs text-slate-500">Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Business Impact</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${contentExamples[activeExample].gradient} bg-clip-text text-transparent`}
                >
                  {contentExamples[activeExample].improvement}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
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
              AI-Powered Content Excellence
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Every aspect of your content optimized for maximum visibility
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Semantic Analysis',
                description: 'AI understands your content context and ensures it aligns with search intent and topical relevance.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Search,
                title: 'Keyword Optimization',
                description: 'Intelligent keyword placement, density optimization, and LSI keyword suggestions for natural ranking.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Eye,
                title: 'Readability Enhancement',
                description: 'Improve Flesch-Kincaid scores, sentence structure, and content flow for better engagement.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Target,
                title: 'Featured Snippet Optimization',
                description: 'Format content to target featured snippets, knowledge panels, and People Also Ask boxes.',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: TrendingUp,
                title: 'Content Gap Analysis',
                description: 'Identify missing topics and questions your competitors cover but you don\'t.',
                gradient: 'from-red-500 to-rose-500',
              },
              {
                icon: Award,
                title: 'E-A-T Optimization',
                description: 'Enhance Expertise, Authority, and Trust signals to rank for Your Money Your Life topics.',
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

      {/* Content Types */}
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
              Optimize Any Content Type
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From blog posts to product pages, we optimize it all
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Blog Posts & Articles',
                description: 'Optimize editorial content for engagement, sharing, and search visibility.',
                items: [
                  'Topic research and clustering',
                  'Header hierarchy optimization',
                  'Internal linking suggestions',
                  'Meta description generation',
                  'Featured snippet formatting',
                  'Readability improvements',
                ],
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Users,
                title: 'Product Pages',
                description: 'Convert browsers into buyers with optimized product content.',
                items: [
                  'Product title optimization',
                  'Compelling descriptions',
                  'Feature bullet points',
                  'Schema markup for products',
                  'FAQ sections',
                  'User-generated content SEO',
                ],
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Lightbulb,
                title: 'Landing Pages',
                description: 'High-converting landing pages that rank and persuade.',
                items: [
                  'Compelling headlines',
                  'Value proposition clarity',
                  'Trust signal placement',
                  'CTA optimization',
                  'Social proof integration',
                  'Mobile optimization',
                ],
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: MessageSquare,
                title: 'Category & Collection Pages',
                description: 'Turn navigation pages into ranking powerhouses.',
                items: [
                  'Unique category descriptions',
                  'Faceted navigation SEO',
                  'Breadcrumb optimization',
                  'Pagination handling',
                  'Filter optimization',
                  'Cross-linking strategy',
                ],
                gradient: 'from-yellow-500 to-orange-500',
              },
            ].map((type, index) => (
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
                  className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0`}
                  animate={{ opacity: hoveredCapability === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-lg flex items-center justify-center mb-6`}
                    animate={{
                      rotate: hoveredCapability === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <type.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {type.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {type.description}
                  </p>

                  <ul className="space-y-3">
                    {type.items.map((item, i) => (
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
              Content Optimization Process
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From analysis to implementation in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Content Analysis',
                description: 'AI reads and understands your content, identifying opportunities for improvement.',
                icon: Brain,
              },
              {
                step: '02',
                title: 'Competitor Research',
                description: 'Analyze top-ranking content to understand what works and what gaps exist.',
                icon: Search,
              },
              {
                step: '03',
                title: 'Optimization Plan',
                description: 'Generate specific recommendations for headers, keywords, structure, and more.',
                icon: Edit3,
              },
              {
                step: '04',
                title: 'Auto-Apply Changes',
                description: 'One-click to apply all optimizations or review each suggestion individually.',
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
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                    {step.step}
                  </div>
                  <step.icon className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-rose-600/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Content
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Into a Ranking Machine
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-10">
              Let AI optimize every word, every header, every element for maximum visibility
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-lg shadow-lg shadow-purple-500/25"
                >
                  Optimize Content Now
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
