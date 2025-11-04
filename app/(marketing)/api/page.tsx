'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code2, ArrowRight, Terminal, BookOpen, Zap, Shield, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function APIPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
              className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg"
            >
              <Code2 className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                API Documentation
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mt-2"
              >
                Build powerful integrations with our REST API
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Getting Started Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative bg-white rounded-2xl border border-gray-200 p-8 mb-8 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg"
              >
                <Terminal className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Getting Started
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              The SEOLOGY.AI API provides programmatic access to all platform features.
              Authenticate using API keys and make requests to our REST endpoints.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto mb-6 relative"
            >
              <motion.div
                className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
              <code className="pl-3">
                {`curl -X GET "https://api.seology.ai/v1/sites" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </code>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Get API Access
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {[
            {
              title: 'Endpoints',
              icon: BookOpen,
              gradient: 'from-purple-500 to-blue-500',
              items: ['Sites Management', 'Issue Detection', 'Fix Application', 'Analytics & Reporting', 'Webhooks'],
            },
            {
              title: 'Features',
              icon: Zap,
              gradient: 'from-blue-500 to-cyan-500',
              items: ['RESTful Architecture', 'JSON Request/Response', 'Rate Limiting', 'Webhook Events', 'Comprehensive Docs'],
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative bg-white rounded-2xl border border-gray-200 p-6 h-full overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 0.05 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${section.gradient}`}
                />
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
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{
                        rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`p-3 bg-gradient-to-br ${section.gradient} rounded-xl`}
                    >
                      <section.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {section.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 + i * 0.05 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          animate={{
                            scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ delay: i * 0.1 }}
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.gradient}`}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white overflow-hidden"
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
              <Shield className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Sign up today and start building powerful SEO integrations with our API
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  View Documentation
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
