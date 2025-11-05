'use client'

/**
 * FUNCTIONAL Onboarding Flow
 * - Actually connects sites via API
 * - Creates real crawl jobs
 * - Fetches real issues from database
 * - Saves execution mode to user profile
 * - Applies real fixes
 * - Marks onboarding complete
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { ConnectSiteStep } from '@/components/onboarding/ConnectSiteStep'
import { ScanningStep } from '@/components/onboarding/ScanningStep'
import { ReviewIssuesStep } from '@/components/onboarding/ReviewIssuesStep'
import { ExecutionModeStep } from '@/components/onboarding/ExecutionModeStep'
import { FirstFixStep } from '@/components/onboarding/FirstFixStep'
import { CompleteStep } from '@/components/onboarding/CompleteStep'
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator'

type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7

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

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [data, setData] = useState<OnboardingData>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = async (stepData?: Partial<OnboardingData>) => {
    if (stepData) {
      setData(prev => ({ ...prev, ...stepData }))
    }

    if (currentStep === 7) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      // Mark onboarding complete
      try {
        await fetch('/api/user/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ onboardingCompleted: true })
        })
      } catch (error) {
        console.error('Failed to mark onboarding complete:', error)
      }

      setTimeout(() => router.push('/dashboard'), 1500)
    } else {
      setCurrentStep((currentStep + 1) as OnboardingStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as OnboardingStep)
    }
  }

  const handleSkip = async () => {
    // Mark onboarding as complete when skipping
    try {
      await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboardingCompleted: true })
      })
    } catch (error) {
      console.error('Failed to mark onboarding complete:', error)
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Progress Dots */}
        {currentStep !== 1 && currentStep !== 7 && (
          <ProgressIndicator currentStep={currentStep} totalSteps={7} />
        )}

        {/* Back Button */}
        {currentStep > 1 && currentStep !== 7 && currentStep !== 3 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBack}
            className="absolute top-0 left-0 text-white/80 hover:text-white flex items-center gap-2 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </motion.button>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
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
              <ExecutionModeStep
                onNext={handleNext}
                onBack={handleBack}
              />
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

            {currentStep === 7 && (
              <CompleteStep onFinish={handleNext} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
