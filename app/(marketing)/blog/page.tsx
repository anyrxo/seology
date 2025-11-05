'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, ArrowLeft, Calendar, User, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BlogPage() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  const blogPosts = [
    {
      gradient: "from-blue-500 to-purple-600",
      category: "Product Update",
      categoryColor: "blue",
      title: "Intelligent Rollback System Launched",
      description: "Roll back any changes with a single click. Our new snapshot system keeps your data safe for 90 days.",
      date: "Nov 4, 2025",
      author: "Product Team",
      href: "/features"
    },
    {
      gradient: "from-green-500 to-teal-600",
      category: "SEO Tips",
      categoryColor: "green",
      title: "10 Common SEO Mistakes We Fix Automatically",
      description: "Discover the most common SEO issues that hurt your rankings—and how AI fixes them in seconds.",
      date: "Nov 1, 2025",
      author: "SEO Team",
      href: "/features"
    },
    {
      gradient: "from-orange-500 to-red-600",
      category: "Case Study",
      categoryColor: "orange",
      title: "How E-commerce Store Boosted Traffic by 150%",
      description: "See how one Shopify store used SEOLOGY.AI to fix 500+ issues and triple their organic traffic.",
      date: "Oct 28, 2025",
      author: "Success Team",
      href: "/features"
    },
    {
      gradient: "from-purple-500 to-pink-600",
      category: "Tutorial",
      categoryColor: "purple",
      title: "Connecting Your WordPress Site in 60 Seconds",
      description: "Step-by-step guide to connect your WordPress site and start fixing SEO issues instantly.",
      date: "Oct 25, 2025",
      author: "Dev Team",
      href: "/dashboard/sites/connect"
    },
    {
      gradient: "from-cyan-500 to-blue-600",
      category: "Product Update",
      categoryColor: "cyan",
      title: "New Pricing Plans for Growing Teams",
      description: "Introducing flexible pricing that scales with your business. Plus, unlimited sites on Scale plan!",
      date: "Oct 20, 2025",
      author: "Product Team",
      href: "/pricing"
    },
    {
      gradient: "from-yellow-500 to-orange-600",
      category: "SEO Tips",
      categoryColor: "yellow",
      title: "The Future of SEO is Automated",
      description: "Why manual SEO is dead and how AI is revolutionizing search optimization in 2025.",
      date: "Oct 15, 2025",
      author: "Research Team",
      href: "/features"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -90, 0],
            y: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -110, 0],
            y: [0, -70, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 24,
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
              className="p-3 bg-purple-100 rounded-xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Newspaper className="w-8 h-8 text-purple-600" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
              <p className="text-gray-600 mt-1">Latest updates and insights from SEOLOGY.AI</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Featured Post */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="max-w-3xl relative z-10">
            <motion.div
              className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              Featured
            </motion.div>
            <motion.h2
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Introducing Daily Automation: Set It and Forget It
            </motion.h2>
            <motion.p
              className="text-xl opacity-90 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Never worry about SEO again. Our new daily automation runs scans, detects issues, and applies fixes automatically—every single day.
            </motion.p>
            <motion.div
              className="flex items-center gap-6 text-sm mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>November 4, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>SEOLOGY Team</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/features">
                <motion.div
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Blog Categories */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {["All Posts", "Product Updates", "SEO Tips", "Case Studies"].map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              onHoverStart={() => setHoveredCategory(index)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1, type: "spring", stiffness: 100 }}
              onHoverStart={() => setHoveredPost(index)}
              onHoverEnd={() => setHoveredPost(null)}
            >
              <Link href={post.href} className="group">
                <motion.div
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 relative"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                    {hoveredPost === index && (
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className={`inline-block px-3 py-1 bg-${post.categoryColor}-100 text-${post.categoryColor}-600 text-xs font-semibold rounded-full mb-3`}>
                      {post.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                      {post.title}
                      {hoveredPost === index && (
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
