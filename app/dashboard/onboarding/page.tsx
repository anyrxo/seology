'use client'

/**
 * Lovable-Style Onboarding Flow
 * Beautiful gradient backgrounds with glass-morphism cards
 * Minimal typing, tap-to-select interactions
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface OnboardingData {
  businessType?: string
  platform?: string
  businessName?: string
  businessStage?: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [data, setData] = useState<OnboardingData>({})
  const [isLoading, setIsLoading] = useState(false)

  const saveProgress = async (stepData: Partial<OnboardingData>, step: number) => {
    try {
      await fetch('/api/onboarding/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...stepData, step })
      })
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  const handleNext = async (stepData?: Partial<OnboardingData>) => {
    if (stepData) {
      const newData = { ...data, ...stepData }
      setData(newData)
      await saveProgress(newData, currentStep + 1)
    }

    if (currentStep === 7) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
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
    await saveProgress(data, 7)
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

      <div className="max-w-2xl w-full relative z-10">
        {/* Progress Dots */}
        {currentStep !== 1 && currentStep !== 7 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2 mb-8"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === currentStep
                    ? 'w-8 bg-white'
                    : step < currentStep
                    ? 'w-2 bg-white/60'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </motion.div>
        )}

        {/* Back Button */}
        {currentStep > 1 && currentStep !== 7 && (
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
            {currentStep === 1 && <WelcomeStep onNext={handleNext} userName={user?.firstName} />}
            {currentStep === 2 && <BusinessTypeStep onNext={handleNext} />}
            {currentStep === 3 && <PlatformStep onNext={handleNext} onSkip={handleSkip} businessType={data.businessType} />}
            {currentStep === 4 && <BusinessNameStep onNext={handleNext} />}
            {currentStep === 5 && <BusinessStageStep onNext={handleNext} />}
            {currentStep === 6 && <ConnectPlatformStep onNext={handleNext} onSkip={handleSkip} platform={data.platform} />}
            {currentStep === 7 && <CongratsStep onNext={handleNext} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Step 1: Welcome
function WelcomeStep({ onNext, userName }: { onNext: () => void; userName?: string | null }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-8xl mb-8"
      >
        ✨
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-6xl font-bold text-white mb-4"
      >
        Welcome to Seology
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-white/90 mb-12 max-w-lg mx-auto"
      >
        AI-powered SEO that fixes itself
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-white text-purple-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/20 transition-all"
      >
        Get Started
      </motion.button>
    </div>
  )
}

// Step 2: Business Type
function BusinessTypeStep({ onNext }: { onNext: (data: Partial<OnboardingData>) => void }) {
  const options = [
    { id: 'ecommerce', emoji: '🛍️', title: 'E-commerce', subtitle: 'Shopify, WooCommerce, etc.' },
    { id: 'saas', emoji: '💼', title: 'SaaS / Software', subtitle: 'Web applications & tools' },
    { id: 'local', emoji: '🏪', title: 'Local Business', subtitle: 'Restaurant, Retail, Services' }
  ]

  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-white mb-12"
      >
        What type of business do you run?
      </motion.h2>

      <div className="grid gap-4 max-w-xl mx-auto">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext({ businessType: option.id })}
            className="bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 rounded-2xl p-6 text-left transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">{option.emoji}</div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-1">{option.title}</div>
                <div className="text-white/70 text-sm">{option.subtitle}</div>
              </div>
              <div className="text-white/40 group-hover:text-white/60 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Step 3: Platform
function PlatformStep({ onNext, onSkip, businessType }: { onNext: (data: Partial<OnboardingData>) => void; onSkip: () => void; businessType?: string }) {
  const platforms = businessType === 'ecommerce'
    ? [
        { id: 'shopify', name: 'Shopify', icon: '🛒' },
        { id: 'woocommerce', name: 'WooCommerce', icon: '🔌' },
        { id: 'wordpress', name: 'WordPress', icon: '📝' },
        { id: 'custom', name: 'Custom / Other', icon: '⚙️' }
      ]
    : [
        { id: 'wordpress', name: 'WordPress', icon: '📝' },
        { id: 'webflow', name: 'Webflow', icon: '🌊' },
        { id: 'wix', name: 'Wix', icon: '✨' },
        { id: 'custom', name: 'Custom / Other', icon: '⚙️' }
      ]

  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-white mb-12"
      >
        What platform powers your site?
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
        {platforms.map((platform, index) => (
          <motion.button
            key={platform.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNext({ platform: platform.id })}
            className="bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 rounded-2xl p-8 transition-all"
          >
            <div className="text-5xl mb-3">{platform.icon}</div>
            <div className="text-white font-semibold text-lg">{platform.name}</div>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onSkip}
        className="text-white/70 hover:text-white transition-colors text-sm"
      >
        Skip for now
      </motion.button>
    </div>
  )
}

// Step 4: Business Name
function BusinessNameStep({ onNext }: { onNext: (data: Partial<OnboardingData>) => void }) {
  const [name, setName] = useState('')

  return (
    <div className="text-center max-w-lg mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-white mb-12"
      >
        What's your business name?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Acme Corp"
          className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 focus:border-white/40 rounded-2xl px-6 py-5 text-white text-xl placeholder-white/40 outline-none transition-all mb-6"
          autoFocus
        />

        <button
          onClick={() => name.trim() && onNext({ businessName: name.trim() })}
          disabled={!name.trim()}
          className="w-full bg-white text-purple-600 px-8 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </motion.div>
    </div>
  )
}

// Step 5: Business Stage
function BusinessStageStep({ onNext }: { onNext: (data: Partial<OnboardingData>) => void }) {
  const stages = [
    { id: 'starting', emoji: '🚀', title: 'Just Starting', subtitle: '0-6 months' },
    { id: 'growing', emoji: '📈', title: 'Growing', subtitle: '6 months - 2 years' },
    { id: 'established', emoji: '⭐', title: 'Established', subtitle: '2+ years' }
  ]

  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-white mb-12"
      >
        How established is your business?
      </motion.h2>

      <div className="grid gap-4 max-w-xl mx-auto">
        {stages.map((stage, index) => (
          <motion.button
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext({ businessStage: stage.id })}
            className="bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 rounded-2xl p-6 text-left transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">{stage.emoji}</div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl mb-1">{stage.title}</div>
                <div className="text-white/70 text-sm">{stage.subtitle}</div>
              </div>
              <div className="text-white/40 group-hover:text-white/60 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Step 6: Connect Platform
function ConnectPlatformStep({ onNext, onSkip, platform }: { onNext: () => void; onSkip: () => void; platform?: string }) {
  const platformName = platform === 'shopify' ? 'Shopify'
    : platform === 'wordpress' ? 'WordPress'
    : platform === 'woocommerce' ? 'WooCommerce'
    : platform === 'webflow' ? 'Webflow'
    : platform === 'wix' ? 'Wix'
    : 'your platform'

  return (
    <div className="text-center max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-7xl mb-8"
      >
        🔌
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        Connect your site
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-white/70 mb-12"
      >
        You can connect later in settings
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <button
          onClick={onNext}
          className="w-full bg-white text-purple-600 px-8 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-white/20 transition-all"
        >
          Connect {platformName}
        </button>

        <button
          onClick={onSkip}
          className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 text-white px-8 py-5 rounded-2xl font-semibold text-lg transition-all"
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  )
}

// Step 7: Congrats
function CongratsStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-8xl mb-8"
      >
        🎉
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        You're all set!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-white/90 mb-12 max-w-lg mx-auto"
      >
        Seology is ready to optimize your SEO
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-white text-purple-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/20 transition-all"
      >
        Let's start
      </motion.button>
    </div>
  )
}
