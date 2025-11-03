'use client'

/**
 * Onboarding Wizard
 * Multi-step flow for new users to get started with SEOLOGY.AI
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { ConnectSiteStep } from '@/components/onboarding/ConnectSiteStep'
import { ScanningStep } from '@/components/onboarding/ScanningStep'
import { ReviewIssuesStep } from '@/components/onboarding/ReviewIssuesStep'
import { ExecutionModeStep } from '@/components/onboarding/ExecutionModeStep'
import { FirstFixStep } from '@/components/onboarding/FirstFixStep'
import { CompleteStep } from '@/components/onboarding/CompleteStep'
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator'
import { motion } from 'framer-motion'

type OnboardingStep =
  | 'welcome'
  | 'connect'
  | 'scanning'
  | 'review'
  | 'execution-mode'
  | 'first-fix'
  | 'complete'

interface OnboardingData {
  siteId?: string
  siteName?: string
  platform?: string
  executionMode?: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  issuesFound?: number
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [data, setData] = useState<OnboardingData>({})

  const handleNext = (stepData?: Partial<OnboardingData>) => {
    if (stepData) {
      setData((prev) => ({ ...prev, ...stepData }))
    }

    // Determine next step
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('connect')
        break
      case 'connect':
        setCurrentStep('scanning')
        break
      case 'scanning':
        setCurrentStep('review')
        break
      case 'review':
        setCurrentStep('execution-mode')
        break
      case 'execution-mode':
        setCurrentStep('first-fix')
        break
      case 'first-fix':
        setCurrentStep('complete')
        break
      case 'complete':
        router.push('/dashboard')
        break
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case 'connect':
        setCurrentStep('welcome')
        break
      case 'scanning':
        setCurrentStep('connect')
        break
      case 'review':
        setCurrentStep('scanning')
        break
      case 'execution-mode':
        setCurrentStep('review')
        break
      case 'first-fix':
        setCurrentStep('execution-mode')
        break
      case 'complete':
        setCurrentStep('first-fix')
        break
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const progressSteps = [
    { id: 'welcome', title: 'Welcome', icon: '🚀' },
    { id: 'connect', title: 'Connect', icon: '🔌' },
    { id: 'scanning', title: 'Scan', icon: '🔍' },
    { id: 'review', title: 'Review', icon: '📊' },
    { id: 'execution-mode', title: 'Mode', icon: '⚙️' },
    { id: 'first-fix', title: 'Fix', icon: '🔧' },
    { id: 'complete', title: 'Done', icon: '🎉' },
  ]

  const currentStepIndex = progressSteps.findIndex(s => s.id === currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-5xl w-full">
        {/* Progress Indicator */}
        {currentStep !== 'welcome' && currentStep !== 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white hidden md:block">
                Getting Started
              </h2>
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Skip to Dashboard →
              </button>
            </div>
            <ProgressIndicator
              steps={progressSteps}
              currentStep={currentStepIndex}
            />
          </motion.div>
        )}

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 md:p-10 shadow-2xl"
        >
          {currentStep === 'welcome' && (
            <WelcomeStep
              userName={user?.firstName || 'there'}
              onNext={handleNext}
            />
          )}

          {currentStep === 'connect' && (
            <ConnectSiteStep onNext={handleNext} onBack={handleBack} />
          )}

          {currentStep === 'scanning' && (
            <ScanningStep
              siteId={data.siteId}
              siteName={data.siteName}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 'review' && (
            <ReviewIssuesStep
              siteId={data.siteId}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 'execution-mode' && (
            <ExecutionModeStep onNext={handleNext} onBack={handleBack} />
          )}

          {currentStep === 'first-fix' && (
            <FirstFixStep
              siteId={data.siteId}
              executionMode={data.executionMode}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 'complete' && (
            <CompleteStep onFinish={handleNext} />
          )}
        </motion.div>
      </div>
    </div>
  )
}
