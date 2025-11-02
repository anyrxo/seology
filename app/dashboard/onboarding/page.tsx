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

  const steps = [
    'welcome',
    'connect',
    'scanning',
    'review',
    'execution-mode',
    'first-fix',
    'complete',
  ]
  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        {currentStep !== 'welcome' && currentStep !== 'complete' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Skip to Dashboard →
              </button>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
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
        </div>
      </div>
    </div>
  )
}
