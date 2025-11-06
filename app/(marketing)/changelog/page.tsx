'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Sparkles, Zap, Bug, Shield, Star, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const changes = [
  {
    version: 'v2.1.0',
    date: 'January 15, 2025',
    items: [
      {
        type: 'feature',
        icon: Sparkles,
        title: 'Daily Automation Reports',
        description: 'New dashboard inbox for viewing automated SEO fix reports with email delivery',
      },
      {
        type: 'feature',
        icon: Zap,
        title: 'Automation Settings',
        description: 'Configure daily automation schedule, timezone, and notification preferences',
      },
      {
        type: 'improvement',
        icon: CheckCircle,
        title: 'Report Detail Viewer',
        description: 'Comprehensive report viewer with metrics, fixes applied, and pending approvals',
      },
    ],
  },
  {
    version: 'v2.0.0',
    date: 'January 1, 2025',
    items: [
      {
        type: 'feature',
        icon: Sparkles,
        title: 'Daily Automation System',
        description: 'Automatically scan sites, analyze issues, and apply fixes on a daily schedule',
      },
      {
        type: 'feature',
        icon: Shield,
        title: 'Execution Modes',
        description: 'Choose between AUTOMATIC, PLAN, or APPROVE execution modes for full control',
      },
      {
        type: 'improvement',
        icon: Zap,
        title: 'Enhanced AI Analysis',
        description: 'Upgraded AI engine for more accurate SEO recommendations',
      },
    ],
  },
  {
    version: 'v1.5.0',
    date: 'December 15, 2024',
    items: [
      {
        type: 'feature',
        icon: Sparkles,
        title: 'Shopify Integration',
        description: 'One-click Shopify app installation with automated product page optimization',
      },
      {
        type: 'feature',
        icon: Sparkles,
        title: 'WordPress Plugin',
        description: 'Native WordPress plugin for seamless CMS integration',
      },
      {
        type: 'improvement',
        icon: CheckCircle,
        title: 'Rollback System',
        description: 'Easily revert any SEO fix within 90 days with one-click rollback',
      },
    ],
  },
  {
    version: 'v1.2.0',
    date: 'November 30, 2024',
    items: [
      {
        type: 'feature',
        icon: Sparkles,
        title: 'Magic.js Universal Connector',
        description: 'Universal JavaScript snippet for connecting any website platform',
      },
      {
        type: 'improvement',
        icon: Zap,
        title: 'Faster Crawling',
        description: 'Improved site crawling speed by 3x with optimized Puppeteer configuration',
      },
      {
        type: 'fix',
        icon: Bug,
        title: 'Fixed Image Optimization',
        description: 'Resolved issues with alt text generation for product images',
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: 'November 1, 2024',
    items: [
      {
        type: 'feature',
        icon: Sparkles,
        title: 'Initial Launch',
        description: 'SEOLOGY.AI officially launches with automated SEO fix application',
      },
      {
        type: 'feature',
        icon: Shield,
        title: 'Multi-Site Management',
        description: 'Manage unlimited sites from a single dashboard',
      },
      {
        type: 'feature',
        icon: CheckCircle,
        title: 'Real-Time Analytics',
        description: 'Track traffic impact and SEO score improvements in real-time',
      },
    ],
  },
]

const typeConfig = {
  feature: {
    label: 'New',
    color: 'bg-green-100 text-green-700 border-green-200',
    gradient: 'from-green-500 to-emerald-500',
  },
  improvement: {
    label: 'Improved',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    gradient: 'from-blue-500 to-cyan-500',
  },
  fix: {
    label: 'Fixed',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    gradient: 'from-orange-500 to-red-500',
  },
}

export default function ChangelogPage() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                Changelog
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mt-2"
              >
                Track our latest features and improvements
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {changes.map((release, releaseIndex) => (
            <motion.div
              key={release.version}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + releaseIndex * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + releaseIndex * 0.1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    {release.version}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + releaseIndex * 0.1 }}
                    className="text-gray-600 mt-1"
                  >
                    {release.date}
                  </motion.p>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.8 + releaseIndex * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
                >
                  {release.items.length} {release.items.length === 1 ? 'Update' : 'Updates'}
                </motion.div>
              </div>

              <div className="space-y-4">
                {release.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  const config = typeConfig[item.type as keyof typeof typeConfig]
                  const itemKey = `${release.version}-${itemIndex}`

                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + releaseIndex * 0.1 + itemIndex * 0.05 }}
                      onHoverStart={() => setHoveredIndex(itemKey)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all overflow-hidden"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredIndex === itemKey ? 0.05 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute inset-0 bg-gradient-to-r ${config.gradient}`}
                        />

                        <div className="flex-shrink-0 relative z-10">
                          <motion.div
                            animate={{
                              rotate: hoveredIndex === itemKey ? [0, -10, 10, 0] : 0,
                            }}
                            transition={{ duration: 0.5 }}
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>
                        </div>
                        <div className="flex-1 relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}
                            >
                              {config.label}
                            </motion.span>
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </div>

                        {hoveredIndex === itemKey && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute top-4 right-4 z-10"
                          >
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white overflow-hidden"
        >
          {/* Animated background pattern */}
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

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Star className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to get notified about new features and improvements
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
