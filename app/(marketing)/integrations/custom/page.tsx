'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Settings, Sparkles, CheckCircle, Code2, Database, Webhook, Lock, Zap, FileCode, Globe } from 'lucide-react'

export default function CustomIntegrationPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [hoveredCTA, setHoveredCTA] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Gradient - Orange/Red theme */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.12) 0%, transparent 70%)',
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
        className="sticky top-0 z-50 bg-gradient-to-r from-orange-600/95 to-red-600/95 backdrop-blur-xl border-b border-white/20 shadow-2xl"
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
              <Settings className="w-16 h-16 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Custom Integrations
              </motion.h1>
              <motion.p
                className="text-xl text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Build powerful custom integrations using our REST API
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* API Overview */}
        <motion.div
          className="bg-white rounded-2xl border-2 border-orange-200 p-8 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(249, 115, 22, 0.2)" }}
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"
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
            <Code2 className="w-6 h-6 text-orange-600" />
            API Access
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Build custom integrations with any platform using our comprehensive REST API.
            Perfect for enterprise customers and custom CMS platforms.
          </motion.p>
          <motion.ul
            className="space-y-3 text-gray-600 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              'Full REST API access',
              'Webhook support for real-time updates',
              'Comprehensive API documentation',
              'Enterprise-grade support'
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
              >
                <span className="text-green-600 text-xl">✓</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Database,
              color: 'orange',
              title: 'RESTful API',
              description: 'Modern REST API with JSON responses, OAuth 2.0 authentication, and rate limiting.',
              features: [
                'CRUD operations for sites',
                'Issue detection endpoints',
                'Fix execution API',
                'Analytics & reporting'
              ]
            },
            {
              icon: Webhook,
              color: 'red',
              title: 'Real-time Webhooks',
              description: 'Subscribe to events and get instant notifications when issues are detected or fixes are applied.',
              features: [
                'Issue detected webhooks',
                'Fix applied notifications',
                'Custom event triggers',
                'Retry mechanism'
              ]
            },
            {
              icon: Lock,
              color: 'amber',
              title: 'Secure & Reliable',
              description: 'Enterprise-grade security with OAuth 2.0, API keys, and encrypted data transmission.',
              features: [
                'OAuth 2.0 authentication',
                'API key management',
                'Rate limiting & throttling',
                '99.9% uptime SLA'
              ]
            },
            {
              icon: Zap,
              color: 'rose',
              title: 'Developer Tools',
              description: 'Complete SDKs, interactive documentation, and sandbox environment for testing.',
              features: [
                'JavaScript/Python SDKs',
                'Interactive API docs',
                'Sandbox environment',
                'Code examples'
              ]
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2 + index * 0.1,
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

              <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{card.title}</h3>
              <p className="text-gray-600 mb-4 relative z-10">{card.description}</p>
              <ul className="space-y-2 text-gray-600 relative z-10">
                {card.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 + featureIndex * 0.05 }}
                  >
                    <CheckCircle className={`w-5 h-5 text-${card.color}-600 mt-0.5 flex-shrink-0`} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Integration Steps */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-12 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            Integration Process
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                number: 1,
                color: 'orange',
                title: 'Request Access',
                description: 'Contact our team to get API credentials'
              },
              {
                number: 2,
                color: 'red',
                title: 'Authenticate',
                description: 'Use OAuth 2.0 or API keys for secure access'
              },
              {
                number: 3,
                color: 'amber',
                title: 'Build Integration',
                description: 'Develop using our SDK and documentation'
              },
              {
                number: 4,
                color: 'rose',
                title: 'Go Live',
                description: 'Deploy to production with our support'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <motion.div
                  className={`w-14 h-14 rounded-full bg-${step.color}-100 text-${step.color}-600 flex items-center justify-center text-xl font-bold mx-auto mb-4 relative`}
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Features */}
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-16 border border-orange-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          whileHover={{ scale: 1.01, boxShadow: "0 20px 60px rgba(249, 115, 22, 0.15)" }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            What You Can Build
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: FileCode,
                title: 'Custom CMS Plugin',
                description: 'Build native plugins for proprietary or custom CMS platforms'
              },
              {
                icon: Globe,
                title: 'Multi-site Dashboard',
                description: 'Create centralized dashboards managing multiple websites'
              },
              {
                icon: Zap,
                title: 'Automated Workflows',
                description: 'Integrate with your CI/CD pipeline for automated SEO checks'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 relative overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -4 }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 10 }}
                >
                  <feature.icon className="w-10 h-10 text-orange-600 mb-3" />
                </motion.div>
                {hoveredFeature === index && (
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
        >
          <motion.h3
            className="text-xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            Quick Start Example
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              {`// Initialize SEOLOGY.AI API
const seology = new SeologyAPI({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Detect issues on a site
const issues = await seology.detectIssues({
  siteUrl: 'https://example.com'
});

// Apply automatic fixes
await seology.applyFixes(issues);`}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.7, duration: 0.6 }}
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
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            Request API Access
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9, duration: 0.6 }}
          >
            Get started with our API and build custom integrations
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg group"
              >
                Get Started
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
                href="/docs"
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
