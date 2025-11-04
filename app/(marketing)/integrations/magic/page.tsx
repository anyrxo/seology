'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Code, Sparkles, Wand2, Copy, CheckCircle, Globe, Zap, Shield } from 'lucide-react'

export default function MagicIntegrationPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [hoveredCTA, setHoveredCTA] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('<script src="https://seology.ai/magic.js" data-site-id="your-site-id"></script>')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Gradient - Magic purple/pink theme */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 150, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -120, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
          animate={{
            x: [-100, 100, -100],
            y: [-100, 100, -100],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Sticky Glass Header */}
      <motion.div
        className="sticky top-0 z-50 bg-gradient-to-r from-purple-600/95 to-pink-600/95 backdrop-blur-xl border-b border-white/20 shadow-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6 group"
            >
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              Back to Home
            </Link>
          </motion.div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Wand2 className="w-16 h-16 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Magic.js Universal Connector
              </motion.h1>
              <motion.p
                className="text-xl text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Add SEO automation to any website with a simple JavaScript snippet
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Code Snippet Section */}
        <motion.div
          className="bg-white rounded-2xl border-2 border-purple-200 p-8 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(168, 85, 247, 0.2)" }}
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Code className="w-6 h-6 text-purple-600" />
            How It Works
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Add one line of code to your website and our Magic.js connector will automatically
            detect and apply SEO optimizations. Works with any platform - static sites, custom CMS, or no CMS at all.
          </motion.p>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto relative">
              {`<script src="https://seology.ai/magic.js" data-site-id="your-site-id"></script>`}
            </div>
            <motion.button
              className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={handleCopy}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Globe,
              color: 'purple',
              title: 'Universal Compatibility',
              description: 'Works with any website platform - WordPress, Shopify, static sites, or custom builds.',
              features: [
                'No platform restrictions',
                'Works with any framework',
                'Static or dynamic sites',
                'Custom CMS support'
              ]
            },
            {
              icon: Zap,
              color: 'pink',
              title: 'Instant Setup',
              description: 'Add one script tag and you are done. No configuration, no complex installation process.',
              features: [
                'One-line installation',
                'Auto-configuration',
                'Zero maintenance',
                'Instant activation'
              ]
            },
            {
              icon: Shield,
              color: 'indigo',
              title: 'Safe & Non-Invasive',
              description: 'Magic.js runs client-side and never modifies your server code or database.',
              features: [
                'Client-side only',
                'No server access needed',
                'Reversible changes',
                'Privacy-focused'
              ]
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1 + index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Overlay on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br from-${card.color}-500/5 to-transparent`}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 10 }}
              >
                <card.icon className={`w-12 h-12 text-${card.color}-600 mb-4 relative z-10`} />
              </motion.div>

              {hoveredCard === index && (
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">{card.title}</h3>
              <p className="text-gray-600 mb-4 relative z-10 text-sm">{card.description}</p>
              <ul className="space-y-2 text-gray-600 relative z-10 text-sm">
                {card.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 + featureIndex * 0.05 }}
                  >
                    <CheckCircle className={`w-4 h-4 text-${card.color}-600 mt-0.5 flex-shrink-0`} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* How It Works Steps */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-12 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            Three Simple Steps
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                color: 'purple',
                title: 'Sign Up & Get Code',
                description: 'Create your account and get your custom Magic.js snippet with your unique site ID'
              },
              {
                number: 2,
                color: 'pink',
                title: 'Add to Your Site',
                description: 'Paste the script tag before the closing </head> tag on every page you want optimized'
              },
              {
                number: 3,
                color: 'indigo',
                title: 'Watch the Magic',
                description: 'Our AI automatically analyzes and optimizes your SEO in real-time as visitors browse'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <motion.div
                  className={`w-16 h-16 rounded-full bg-${step.color}-100 text-${step.color}-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative`}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.6, type: "spring", stiffness: 200, damping: 10 }
                  }}
                >
                  {step.number}
                  {hoveredStep === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-yellow-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-16 border border-purple-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          whileHover={{ scale: 1.01, boxShadow: "0 20px 60px rgba(168, 85, 247, 0.15)" }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            Perfect For
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Static HTML websites',
              'Custom-built platforms',
              'Landing pages',
              'Marketing sites',
              'Portfolio websites',
              'Documentation sites',
              'Jamstack applications',
              'Any website without a CMS'
            ].map((useCase, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-gray-900 font-medium">{useCase}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          onMouseEnter={() => setHoveredCTA(true)}
          onMouseLeave={() => setHoveredCTA(false)}
        >
          {/* Particle Dots */}
          {hoveredCTA && Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, -100]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}

          <motion.h2
            className="text-3xl font-bold mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.6 }}
          >
            Get Your Magic.js Snippet
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            Sign up and get your custom JavaScript snippet instantly
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg group"
              >
                Get Started Free
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/dashboard/sites/connect"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Documentation
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
