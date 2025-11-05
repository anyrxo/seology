'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export default function IntegrationsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const integrations = [
    {
      name: 'Shopify',
      description: 'One-click OAuth integration for Shopify stores',
      icon: '/images/integrations/shopify-icon.svg',
      link: '/integrations/shopify',
      gradient: 'from-green-500 to-emerald-500',
      features: ['OAuth authentication', 'Full product catalog access', 'Automatic SEO fixes'],
    },
    {
      name: 'WordPress',
      description: 'REST API integration for WordPress sites',
      icon: '/images/integrations/wordpress-icon.svg',
      link: '/integrations/wordpress',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['REST API access', 'Plugin support', 'Complete site control'],
    },
    {
      name: 'Magic.js',
      description: 'Universal JavaScript connector for any website',
      icon: '/images/integrations/magic-icon.svg',
      link: '/integrations/magic',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Works with any site', 'Simple JavaScript snippet', 'No backend required'],
    },
    {
      name: 'Custom Integration',
      description: 'Build your own integration with our API',
      icon: '/images/integrations/custom-icon.svg',
      link: '/integrations/custom',
      gradient: 'from-orange-500 to-red-500',
      features: ['Full API access', 'Custom workflows', 'Enterprise support'],
    },
  ]

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
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                Integrations
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-1"
              >
                Connect SEOLOGY.AI to your platform
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect Your Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SEOLOGY.AI integrates seamlessly with your existing tools and platforms. Choose your platform below to get started.
          </p>
        </motion.div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link href={integration.link} className="block h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-white rounded-2xl border border-gray-200 p-8 h-full overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 0.05 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-br ${integration.gradient}`}
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
                    <motion.div
                      animate={{
                        rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center mb-6`}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {integration.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{integration.description}</p>

                    <ul className="space-y-2 mb-6">
                      {integration.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <motion.span
                            animate={{
                              scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${integration.gradient}`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.div
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white overflow-hidden"
        >
          {/* Animated background pattern */}
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

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Need Help Getting Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Our team is here to help you integrate SEOLOGY.AI with your platform
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
