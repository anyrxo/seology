'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Book, ArrowLeft, Search, FileText, Code, Zap, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DocsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredQuickStart, setHoveredQuickStart] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Sticky Glass Header */}
      <motion.div
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="p-3 bg-blue-100 rounded-xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Book className="w-8 h-8 text-blue-600" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
              <p className="text-gray-600 mt-1">Everything you need to know about SEOLOGY.AI</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
            />
          </div>
        </motion.div>

        {/* Quick Start Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              href: "/dashboard/onboarding",
              icon: Zap,
              title: "Quick Start",
              description: "Get started with SEOLOGY.AI in 5 minutes",
              color: "green",
              borderColor: "border-green-500",
            },
            {
              href: "/api-explorer",
              icon: Code,
              title: "API Reference",
              description: "Explore our comprehensive API documentation",
              color: "purple",
              borderColor: "border-purple-500",
            },
            {
              href: "/features",
              icon: FileText,
              title: "Guides",
              description: "Step-by-step guides for common tasks",
              color: "orange",
              borderColor: "border-orange-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 100 }}
              onHoverStart={() => setHoveredQuickStart(index)}
              onHoverEnd={() => setHoveredQuickStart(null)}
            >
              <Link href={item.href}>
                <motion.div
                  className={`p-6 bg-white rounded-xl border border-gray-200 hover:${item.borderColor} hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {hoveredQuickStart === index && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/10`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div
                    className={`p-3 bg-${item.color}-100 rounded-lg w-fit mb-4 group-hover:bg-${item.color}-200 transition-colors relative z-10`}
                    whileHover={{ rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10 flex items-center gap-2">
                    {item.title}
                    {hoveredQuickStart === index && (
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm relative z-10">
                    {item.description}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Getting Started",
              links: [
                { text: "Create Your Account", href: "/sign-up" },
                { text: "Connect Your First Site", href: "/dashboard/sites/connect" },
                { text: "Complete Onboarding", href: "/dashboard/onboarding" },
                { text: "Configure Settings", href: "/dashboard/settings" },
              ]
            },
            {
              title: "Core Concepts",
              links: [
                { text: "Execution Modes", href: "/features" },
                { text: "SEO Analysis", href: "/features" },
                { text: "Automated Fixes", href: "/features" },
                { text: "Rollback System", href: "/features" },
              ]
            },
            {
              title: "Integrations",
              links: [
                { text: "Shopify Integration", href: "/dashboard/sites/connect" },
                { text: "WordPress Integration", href: "/dashboard/sites/connect" },
                { text: "Custom Sites (Magic.js)", href: "/dashboard/sites/connect" },
                { text: "API Integration", href: "/api-explorer" },
              ]
            },
            {
              title: "Advanced",
              links: [
                { text: "AI Analysis", href: "/dashboard/ai-analysis" },
                { text: "Analytics & Reporting", href: "/dashboard/analytics" },
                { text: "Daily Automation", href: "/dashboard/settings" },
                { text: "Webhooks & Events", href: "/api-explorer" },
              ]
            },
          ].map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + sectionIndex * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <div className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.div
                    key={linkIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-blue-600 hover:text-blue-700 font-medium transition-all duration-300 hover:translate-x-2"
                    >
                      → {link.text}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
        >
          {/* Floating Particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <motion.h2
            className="text-3xl font-bold mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Need More Help?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            Our support team is here to help you succeed
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Get Started Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
