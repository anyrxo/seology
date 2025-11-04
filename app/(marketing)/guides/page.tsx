'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ArrowRight, Clock, Star, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const guides = [
  {
    title: 'Getting Started with SEOLOGY.AI',
    description: 'Learn the basics and set up your first automated SEO workflow',
    category: 'Beginner',
    readTime: '10 min',
    link: '/docs',
    gradient: 'from-blue-500 to-cyan-500',
    icon: '🚀',
  },
  {
    title: 'Connecting Your Shopify Store',
    description: 'Step-by-step guide to integrate SEOLOGY.AI with Shopify',
    category: 'Integration',
    readTime: '5 min',
    link: '/integrations/shopify',
    gradient: 'from-green-500 to-emerald-500',
    icon: '🛍️',
  },
  {
    title: 'WordPress Integration Setup',
    description: 'Complete guide for WordPress site integration',
    category: 'Integration',
    readTime: '8 min',
    link: '/integrations/wordpress',
    gradient: 'from-purple-500 to-pink-500',
    icon: '📝',
  },
  {
    title: 'Understanding Execution Modes',
    description: 'Choose between Automatic, Plan, and Approve modes',
    category: 'Features',
    readTime: '7 min',
    link: '/docs',
    gradient: 'from-orange-500 to-red-500',
    icon: '⚙️',
  },
  {
    title: 'Daily Automation Setup',
    description: 'Configure automated daily SEO scans and fixes',
    category: 'Automation',
    readTime: '6 min',
    link: '/dashboard/settings/automation',
    gradient: 'from-violet-500 to-purple-500',
    icon: '🤖',
  },
  {
    title: 'Using the Rollback System',
    description: 'Learn how to safely rollback SEO changes',
    category: 'Features',
    readTime: '5 min',
    link: '/docs',
    gradient: 'from-pink-500 to-rose-500',
    icon: '↩️',
  },
]

const categoryColors: Record<string, string> = {
  Beginner: 'bg-blue-100 text-blue-700 border-blue-200',
  Integration: 'bg-green-100 text-green-700 border-green-200',
  Features: 'bg-purple-100 text-purple-700 border-purple-200',
  Automation: 'bg-orange-100 text-orange-700 border-orange-200',
}

export default function GuidesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
      </div>

      {/* Header */}
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
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
            >
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent"
              >
                Guides
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-1"
              >
                Step-by-step tutorials to master SEOLOGY.AI
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <div className="relative z-10 grid grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold mb-1">{guides.length}</div>
              <div className="text-white/80 text-sm">Expert Guides</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center border-x border-white/20"
            >
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-white/80 text-sm">Readers</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold mb-1">4.9★</div>
              <div className="text-white/80 text-sm">Avg Rating</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Guides Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link href={guide.link} className="block h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-white rounded-2xl border border-gray-200 p-6 h-full overflow-hidden group shadow-sm hover:shadow-2xl transition-shadow duration-500"
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 0.05 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-br ${guide.gradient}`}
                  />

                  {/* Sparkle effect */}
                  {hoveredIndex === index && (
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
                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl mb-4"
                    >
                      {guide.icon}
                    </motion.div>

                    {/* Category badge */}
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 border ${
                        categoryColors[guide.category]
                      }`}
                    >
                      {guide.category}
                    </motion.span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {guide.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {guide.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{guide.readTime}</span>
                      </div>
                      <motion.div
                        animate={{
                          x: hoveredIndex === index ? 5 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ArrowRight className="w-5 h-5 text-blue-600" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover border gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${guide.gradient} opacity-20 -z-10`}
                    style={{ padding: '2px' }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
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
            <h2 className="text-3xl font-bold mb-4">Can't Find What You Need?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Our support team is ready to help you succeed with personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Visit Help Center
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
