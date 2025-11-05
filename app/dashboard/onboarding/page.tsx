'use client'

/**
 * WORLD-CLASS ONBOARDING FLOW
 * A delightful, multi-step wizard experience that guides users through their first SEOLOGY.AI setup
 *
 * Features:
 * - Beautiful progress indicators with smooth animations
 * - Step-by-step wizard with back/next navigation
 * - Responsive design with personality
 * - Celebration animations on completion
 * - Skip options where appropriate
 * - Loading states with fun messages
 * - Interactive tooltips and helpful hints
 */

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// Step Components
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { ConnectSiteStep } from '@/components/onboarding/ConnectSiteStep'
import { ScanningStep } from '@/components/onboarding/ScanningStep'
import { ReviewIssuesStep } from '@/components/onboarding/ReviewIssuesStep'
import { ExecutionModeStep } from '@/components/onboarding/ExecutionModeStep'
import { FirstFixStep } from '@/components/onboarding/FirstFixStep'
import { CompleteStep } from '@/components/onboarding/CompleteStep'

type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface StepConfig {
  number: OnboardingStep
  title: string
  description: string
  icon: string
  canGoBack: boolean
  canSkip: boolean
}

interface OnboardingData {
  // Step 2: Site connection
  connectionId?: string
  siteName?: string
  platform?: string

  // Step 3: Scanning
  jobId?: string
  crawlComplete?: boolean

  // Step 4: Issues
  issuesFound?: number
  firstIssueId?: string

  // Step 5: Execution mode
  executionMode?: 'AUTOMATIC' | 'PLAN' | 'APPROVE'

  // Step 6: First fix
  firstFixId?: string
  fixApplied?: boolean
}

const STEP_CONFIGS: Record<OnboardingStep, StepConfig> = {
  1: {
    number: 1,
    title: 'Welcome',
    description: 'Introduction to SEOLOGY.AI',
    icon: '🚀',
    canGoBack: false,
    canSkip: false,
  },
  2: {
    number: 2,
    title: 'Connect Site',
    description: 'Link your first website',
    icon: '🔗',
    canGoBack: true,
    canSkip: true,
  },
  3: {
    number: 3,
    title: 'Analyzing',
    description: 'AI scanning your site',
    icon: '🔍',
    canGoBack: false,
    canSkip: false,
  },
  4: {
    number: 4,
    title: 'Review Issues',
    description: 'See what we found',
    icon: '📋',
    canGoBack: true,
    canSkip: false,
  },
  5: {
    number: 5,
    title: 'Execution Mode',
    description: 'Choose how to apply fixes',
    icon: '⚙️',
    canGoBack: true,
    canSkip: false,
  },
  6: {
    number: 6,
    title: 'First Fix',
    description: 'Watch AI in action',
    icon: '✨',
    canGoBack: true,
    canSkip: false,
  },
  7: {
    number: 7,
    title: 'Complete',
    description: 'You\'re all set!',
    icon: '🎉',
    canGoBack: false,
    canSkip: false,
  },
}

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [data, setData] = useState<OnboardingData>({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Check if returning from site connection
  useEffect(() => {
    const connected = searchParams.get('connected')
    const connectionId = searchParams.get('connectionId')
    const siteName = searchParams.get('siteName')
    const platform = searchParams.get('platform')

    if (connected === 'true' && connectionId) {
      setData(prev => ({
        ...prev,
        connectionId,
        siteName: siteName || undefined,
        platform: platform || undefined,
      }))
      setCurrentStep(3) // Jump to scanning step
    }
  }, [searchParams])

  const handleNext = async (stepData?: Partial<OnboardingData>) => {
    setIsTransitioning(true)

    if (stepData) {
      setData(prev => ({ ...prev, ...stepData }))
    }

    // Special handling for step 7 (completion)
    if (currentStep === 7) {
      await triggerCelebration()
      await markOnboardingComplete()
      setTimeout(() => router.push('/dashboard'), 2000)
    } else {
      setTimeout(() => {
        setCurrentStep((currentStep + 1) as OnboardingStep)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleBack = () => {
    const config = STEP_CONFIGS[currentStep]
    if (config.canGoBack && currentStep > 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep((currentStep - 1) as OnboardingStep)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleSkip = async () => {
    await markOnboardingComplete()
    router.push('/dashboard')
  }

  const triggerCelebration = async () => {
    // Multiple confetti bursts for extra delight
    const duration = 3000
    const end = Date.now() + duration

    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

  const markOnboardingComplete = async () => {
    try {
      await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboardingCompleted: true }),
      })
    } catch (error) {
      console.error('Failed to mark onboarding complete:', error)
    }
  }

  const progress = (currentStep / 7) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [-100, 100, -100],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-5xl w-full relative z-10">
        {/* Progress Bar - Only show on steps 2-6 */}
        {currentStep >= 2 && currentStep <= 6 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-4 max-w-3xl mx-auto">
              {[2, 3, 4, 5, 6].map((step) => {
                const config = STEP_CONFIGS[step as OnboardingStep]
                const isActive = currentStep === step
                const isCompleted = currentStep > step
                const isFuture = currentStep < step

                return (
                  <div key={step} className="flex items-center flex-1">
                    {/* Step Circle */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{
                        scale: isActive ? 1 : 0.9,
                      }}
                      className="flex flex-col items-center relative"
                    >
                      <motion.div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                          border-2 transition-all duration-300 relative z-10
                          ${
                            isCompleted
                              ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/50'
                              : isActive
                              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/50'
                              : 'bg-slate-800 border-slate-600 text-slate-500'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isCompleted ? '✓' : config.icon}
                      </motion.div>

                      {/* Active Pulse Ring */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 w-12 h-12 rounded-full bg-blue-500"
                          initial={{ opacity: 0.8, scale: 1 }}
                          animate={{
                            opacity: 0,
                            scale: 1.8,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      )}

                      {/* Step Label */}
                      <motion.div
                        className={`
                          absolute -bottom-8 text-xs font-medium whitespace-nowrap text-center
                          ${isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-slate-500'}
                        `}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {config.title}
                      </motion.div>
                    </motion.div>

                    {/* Connecting Line */}
                    {step < 6 && (
                      <div className="flex-1 h-1 mx-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            currentStep > step ? 'bg-green-500' : 'bg-slate-700'
                          }`}
                          initial={{ width: '0%' }}
                          animate={{
                            width: currentStep > step ? '100%' : '0%',
                          }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Progress Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                <span>Step {currentStep - 1} of 5</span>
                <span>{Math.round(((currentStep - 1) / 5) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        {STEP_CONFIGS[currentStep].canGoBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            disabled={isTransitioning}
            className="
              mb-6 px-4 py-2 rounded-lg
              bg-white/5 hover:bg-white/10
              border border-white/10 hover:border-white/20
              text-white/80 hover:text-white
              flex items-center gap-2
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              backdrop-blur-sm
            "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </motion.button>
        )}

        {/* Step Content with Smooth Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Step-specific Components */}
            {currentStep === 1 && (
              <WelcomeStep onNext={handleNext} userName={user?.firstName} />
            )}

            {currentStep === 2 && (
              <ConnectSiteStep
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
              />
            )}

            {currentStep === 3 && data.connectionId && (
              <ScanningStep
                siteId={data.connectionId}
                siteName={data.siteName}
                onNext={(stepData) => handleNext(stepData)}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && data.connectionId && (
              <ReviewIssuesStep
                connectionId={data.connectionId}
                onNext={(stepData) => handleNext(stepData)}
                onBack={handleBack}
              />
            )}

            {currentStep === 5 && (
              <ExecutionModeStep onNext={handleNext} onBack={handleBack} />
            )}

            {currentStep === 6 && data.connectionId && data.firstIssueId && (
              <FirstFixStep
                connectionId={data.connectionId}
                issueId={data.firstIssueId}
                executionMode={data.executionMode}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 7 && <CompleteStep onFinish={handleNext} />}
          </motion.div>
        </AnimatePresence>

        {/* Floating Help Tooltip */}
        {currentStep !== 1 && currentStep !== 7 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-14 h-14 rounded-full
                bg-gradient-to-br from-blue-600 to-purple-600
                text-white shadow-lg shadow-blue-500/30
                flex items-center justify-center
                hover:shadow-xl hover:shadow-blue-500/50
                transition-all duration-200
                border border-white/20
              "
              title="Need help?"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}

        {/* Skip Button - Only on eligible steps */}
        {STEP_CONFIGS[currentStep].canSkip && currentStep !== 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <button
              onClick={handleSkip}
              className="
                text-sm text-slate-400 hover:text-white
                underline underline-offset-4
                transition-colors duration-200
              "
            >
              Skip onboarding for now
            </button>
          </motion.div>
        )}
      </div>

      {/* Keyboard Navigation Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-500 hidden md:block"
      >
        Tip: Use arrow keys to navigate
      </motion.div>
    </div>
  )
}
