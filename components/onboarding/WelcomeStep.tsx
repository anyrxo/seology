'use client'

/**
 * Onboarding Step 1: Welcome
 * Enhanced with better animations, icons, and user engagement
 */

import { motion } from 'framer-motion'
import { Target, Sparkles, Zap, Clock, type LucideIcon } from 'lucide-react'

interface WelcomeStepProps {
  userName?: string | null | undefined
  onNext: () => void
}

interface Benefit {
  icon: LucideIcon
  iconColor: string
  bgColor: string
  title: string
  description: string
}

interface SetupStep {
  text: string
  detail: string
}

const benefits: Benefit[] = [
  {
    icon: Target,
    iconColor: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-blue-600/10',
    title: 'Automated Fixes',
    description: 'We don\'t just report - we actually fix SEO issues automatically'
  },
  {
    icon: Sparkles,
    iconColor: 'text-purple-400',
    bgColor: 'from-purple-500/20 to-purple-600/10',
    title: 'Advanced AI Technology',
    description: 'State-of-the-art AI analyzes and optimizes your content'
  },
  {
    icon: Zap,
    iconColor: 'text-yellow-400',
    bgColor: 'from-yellow-500/20 to-yellow-600/10',
    title: 'Real-Time Results',
    description: 'See improvements in your SEO performance within minutes'
  }
]

const setupSteps: SetupStep[] = [
  {
    text: 'Connect your first website',
    detail: 'Shopify, WordPress, or any site via Magic.js'
  },
  {
    text: 'Let our AI scan and analyze',
    detail: 'Advanced AI detects SEO issues'
  },
  {
    text: 'Choose your execution mode',
    detail: 'Automatic, plan-based, or manual approval'
  },
  {
    text: 'Watch your first fix in action',
    detail: 'See SEO improvements applied instantly'
  }
]

export function WelcomeStep({ userName, onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      {/* Animated Rocket Icon with Avatar Circle */}
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="flex-horizontal justify-center mg-bottom-32px"
      >
        <div className="avatar-circle" style={{ width: '120px', height: '120px', fontSize: '64px' }}>
          🚀
        </div>
      </motion.div>

      {/* Welcome Heading */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="display-1 color-neutral-100 mg-bottom-16px"
      >
        Welcome to SEOLOGY.AI{userName ? `, ${userName}` : ''}!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-300 medium color-neutral-400 mg-bottom-48px"
      >
        The world's first AI-powered SEO automation platform that actually{' '}
        <span className="text-300 bold color-accent-1">fixes</span> issues for you—not just reports them.
      </motion.p>

      {/* Key Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
      >
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`bg-gradient-to-br ${benefit.bgColor} rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-all hover:scale-105 cursor-default`}
            >
              <div className={`${benefit.iconColor} mb-3 flex justify-center`}>
                <IconComponent size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm">{benefit.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{benefit.description}</p>
            </motion.div>
          )
        })}
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
              <div className="flex-1">
                <span className="text-sm md:text-base block font-medium text-white">{step.text}</span>
                <span className="text-xs text-gray-500">{step.detail}</span>
              </div>
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
        <Clock className="w-4 h-4" />
        Takes about 5 minutes
      </motion.p>
    </motion.div>
  )
}
