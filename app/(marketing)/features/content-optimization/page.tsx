'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
              <FileText className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                AI Content Intelligence
              </span>
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
