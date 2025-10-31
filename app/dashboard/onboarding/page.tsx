'use client'

import { useState } from 'react'
import { WizardLayout } from '@/components/onboarding/WizardLayout'
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { ConnectSiteStep } from '@/components/onboarding/ConnectSiteStep'
import { ScanningStep, ScanStats } from '@/components/onboarding/ScanningStep'
import { ReviewIssuesStep } from '@/components/onboarding/ReviewIssuesStep'
import { ExecutionModeStep } from '@/components/onboarding/ExecutionModeStep'
import { FirstFixStep } from '@/components/onboarding/FirstFixStep'
import { CompleteStep } from '@/components/onboarding/CompleteStep'
import { useRouter } from 'next/navigation'

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [onboardingData, setOnboardingData] = useState({
    platform: '',
    domain: '',
    scanStats: null as ScanStats | null,
    executionMode: '' as 'AUTOMATIC' | 'PLAN' | 'APPROVE' | '',
    connectionId: '',
  })

  const handleWelcomeNext = () => {
    setCurrentStep(2)
  }

  const handleConnectNext = async (platform: string, domain: string) => {
    // Save connection data
    setOnboardingData((prev) => ({ ...prev, platform, domain }))

    // Call API to create connection
    try {
      const response = await fetch('/api/onboarding/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, domain }),
      })

      if (!response.ok) throw new Error('Failed to connect site')

      const data = await response.json()
      setOnboardingData((prev) => ({ ...prev, connectionId: data.connectionId }))

      // Move to scanning step
      setCurrentStep(3)
    } catch (error) {
      console.error('Connection error:', error)
      alert('Failed to connect site. Please try again.')
    }
  }

  const handleScanComplete = async (stats: ScanStats) => {
    // Save scan stats
    setOnboardingData((prev) => ({ ...prev, scanStats: stats }))

    // Call API to save scan results
    try {
      await fetch('/api/onboarding/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectionId: onboardingData.connectionId,
          stats,
        }),
      })
    } catch (error) {
      console.error('Scan save error:', error)
    }

    // Move to review step
    setCurrentStep(4)
  }

  const handleReviewNext = () => {
    setCurrentStep(5)
  }

  const handleExecutionModeNext = async (mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE') => {
    // Save execution mode
    setOnboardingData((prev) => ({ ...prev, executionMode: mode }))

    // Call API to update user execution mode
    try {
      await fetch('/api/onboarding/execution-mode', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executionMode: mode }),
      })
    } catch (error) {
      console.error('Execution mode update error:', error)
    }

    // Move to first fix step
    setCurrentStep(6)
  }

  const handleFirstFixComplete = async () => {
    // Call API to apply first fix
    try {
      await fetch('/api/onboarding/apply-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connectionId: onboardingData.connectionId,
        }),
      })
    } catch (error) {
      console.error('First fix error:', error)
    }

    // Move to complete step
    setCurrentStep(7)

    // Mark onboarding as complete
    try {
      await fetch('/api/onboarding/complete', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Onboarding completion error:', error)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  return (
    <WizardLayout currentStep={currentStep}>
      {currentStep === 1 && <WelcomeStep onNext={handleWelcomeNext} />}

      {currentStep === 2 && (
        <ConnectSiteStep onNext={handleConnectNext} onBack={handleBack} />
      )}

      {currentStep === 3 && (
        <ScanningStep
          domain={onboardingData.domain}
          onComplete={handleScanComplete}
        />
      )}

      {currentStep === 4 && onboardingData.scanStats && (
        <ReviewIssuesStep
          stats={onboardingData.scanStats}
          domain={onboardingData.domain}
          onNext={handleReviewNext}
          onBack={handleBack}
        />
      )}

      {currentStep === 5 && (
        <ExecutionModeStep onNext={handleExecutionModeNext} onBack={handleBack} />
      )}

      {currentStep === 6 && <FirstFixStep onComplete={handleFirstFixComplete} />}

      {currentStep === 7 && onboardingData.scanStats && (
        <CompleteStep
          domain={onboardingData.domain}
          issuesFound={onboardingData.scanStats.issuesFound}
        />
      )}
    </WizardLayout>
  )
}
