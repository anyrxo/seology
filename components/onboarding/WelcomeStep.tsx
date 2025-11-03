'use client'

/**
 * Onboarding Step 1: Welcome
 */

import { motion } from 'framer-motion'

interface WelcomeStepProps {
  userName: string
  onNext: () => void
}

const benefits = [
  {
    icon: '🎯',
    title: 'Automated Fixes',
    description: 'We don\'t just report - we actually fix SEO issues'
  },
  {
    icon: '🤖',
    title: 'Powered by Claude AI',
    description: 'State-of-the-art AI analyzes and optimizes your content'
  },
  {
    icon: '⚡',
    title: 'Real-Time Results',
    description: 'See improvements in your SEO within minutes'
  }
]

const setupSteps = [
  'Connect your first website (Shopify, WordPress, or any site)',
  'Let Claude AI scan and analyze your SEO',
  'Choose how you want fixes applied (automatic or manual approval)',
  'Watch your first SEO issue get fixed automatically'
]

export function WelcomeStep({ userName, onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      {/* Animated Rocket Icon */}
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="text-7xl mb-6"
      >
        🚀
      </motion.div>

      {/* Welcome Heading */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        Welcome to SEOLOGY.AI{userName ? `, ${userName}` : ''}!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-gray-400 mb-10"
      >
        The world's first AI-powered SEO automation platform that actually{' '}
        <span className="text-blue-400 font-semibold">fixes</span> issues for you—not just reports them.
      </motion.p>

      {/* Key Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <div className="text-4xl mb-3">{benefit.icon}</div>
            <h3 className="text-white font-semibold mb-2 text-sm">{benefit.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Setup Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8 text-left"
      >
        <h2 className="text-lg font-semibold text-white mb-4 text-center md:text-left">
          What you'll do in this quick setup:
        </h2>
        <ul className="space-y-3 text-gray-300">
          {setupSteps.map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-start"
            >
              <span className="text-blue-500 font-bold mr-3 flex-shrink-0 w-6">
                {index + 1}.
              </span>
              <span className="text-sm md:text-base">{step}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3 }}
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-blue-500/30"
        >
          Let's Get Started →
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Takes about 5 minutes
      </motion.p>
    </motion.div>
  )
}
