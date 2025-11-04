'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Code2, Zap, Shield, TrendingUp } from 'lucide-react'

export default function WordPressIntegrationPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [hoveredCTA, setHoveredCTA] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Gradient - WordPress blue theme */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(33, 117, 155, 0.15) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(35, 40, 45, 0.1) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(126, 84, 195, 0.12) 0%, transparent 70%)',
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
        className="sticky top-0 z-50 bg-gradient-to-r from-[#21759B]/95 to-[#7E54C3]/95 backdrop-blur-xl border-b border-white/20 shadow-2xl"
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
              <Code2 className="w-16 h-16 relative z-10" />
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
                WordPress Integration
              </motion.h1>
              <motion.p
                className="text-xl text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Automate SEO for your WordPress site with our powerful plugin
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Zap,
              color: 'blue',
              title: 'Lightning Fast Setup',
              description: 'Install our WordPress plugin or connect via REST API in minutes. No technical knowledge required.',
              features: [
                'One-click plugin installation',
                'REST API integration option',
                'Automatic configuration',
                'WooCommerce compatible'
              ]
            },
            {
              icon: Shield,
              color: 'green',
              title: 'Safe & Secure',
              description: 'All changes are reversible and logged. Your WordPress site stays safe with our secure connection.',
              features: [
                'Encrypted API connections',
                'Change rollback capability',
                'Activity logging',
                'Backup before changes'
              ]
            },
            {
              icon: TrendingUp,
              color: 'purple',
              title: 'SEO Optimization',
              description: 'Automatic optimization of posts, pages, products, and custom post types for better rankings.',
              features: [
                'Meta tag optimization',
                'Schema markup generation',
                'Image optimization',
                'Internal linking'
              ]
            },
            {
              icon: CheckCircle,
              color: 'orange',
              title: 'Full Control',
              description: 'Choose which changes to apply automatically and which need your approval.',
              features: [
                'Manual or automatic mode',
                'Granular permissions',
                'Review before publish',
                'Custom rules'
              ]
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + index * 0.1,
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
                    transition={{ delay: 0.8 + index * 0.1 + featureIndex * 0.05 }}
                  >
                    <CheckCircle className={`w-5 h-5 text-${card.color}-600 mt-0.5 flex-shrink-0`} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-12 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                color: 'blue',
                title: 'Install Plugin',
                description: 'Download our WordPress plugin or connect via REST API with your credentials'
              },
              {
                number: 2,
                color: 'purple',
                title: 'Automatic Analysis',
                description: 'Our AI scans your WordPress site and identifies SEO improvement opportunities'
              },
              {
                number: 3,
                color: 'green',
                title: 'Optimizations Applied',
                description: 'Review and approve changes, or let our AI apply them automatically'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
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

        {/* Plugin Installation Guide */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-16 border border-blue-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          whileHover={{ scale: 1.01, boxShadow: "0 20px 60px rgba(33, 117, 155, 0.15)" }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            Two Ways to Connect
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-blue-600" />
                WordPress Plugin
              </h3>
              <p className="text-gray-600 mb-4">
                Install our official WordPress plugin from your admin dashboard for the easiest setup.
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                wp plugin install seology-ai --activate
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-600" />
                REST API Connection
              </h3>
              <p className="text-gray-600 mb-4">
                Connect via WordPress REST API using Application Passwords for advanced users.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  Enable Application Passwords
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  Connect in SEOLOGY.AI dashboard
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-[#21759B] to-[#7E54C3] rounded-2xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
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
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            Connect Your WordPress Site
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            Install our WordPress plugin or connect via API for automated SEO optimization
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#21759B] rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg group"
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
                Connect WordPress Now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
