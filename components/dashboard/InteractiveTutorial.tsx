'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

interface TutorialStep {
  id: number
  title: string
  description: string
  target: string // CSS selector or position identifier
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Welcome to Seology AI Assistant',
    description: 'Your AI-powered SEO automation companion. Let me show you around!',
    target: 'chat',
    position: 'center',
  },
  {
    id: 2,
    title: 'Chat with Your AI Assistant',
    description: 'Ask questions, get SEO recommendations, and fix issues through natural conversation.',
    target: 'chat-input',
    position: 'top',
  },
  {
    id: 3,
    title: 'View Your SEO Data',
    description: 'Access your sites, issues, fixes, and analytics from the sidebar.',
    target: 'sidebar',
    position: 'right',
  },
  {
    id: 4,
    title: 'Run Your First Audit',
    description: 'Click here to start analyzing your website for SEO improvements.',
    target: 'audit-button',
    position: 'right',
  },
]

export function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    // Check if tutorial has been completed or dismissed
    const tutorialCompleted = localStorage.getItem('seology-tutorial-completed')
    if (!tutorialCompleted) {
      setIsVisible(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('seology-tutorial-completed', 'true')
    }
    setIsVisible(false)
  }

  const handleComplete = () => {
    localStorage.setItem('seology-tutorial-completed', 'true')
    setIsVisible(false)
  }

  const step = tutorialSteps[currentStep]

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop with spotlight effect */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleSkip} />

        {/* Tutorial Card */}
        <motion.div
          key={currentStep}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <GlassCard
            variant="medium"
            blur="xl"
            padding="lg"
            hover="none"
            borderGradient
            className="border-blue-500/30"
          >
            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close tutorial"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600'
                      : index < currentStep
                      ? 'w-2 bg-green-500'
                      : 'w-2 bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress */}
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <span className="font-medium text-blue-400">{currentStep + 1}</span>
                <span>/</span>
                <span>{tutorialSteps.length}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    Don't show again
                  </span>
                </label>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-white"
                  >
                    Skip
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20"
                  >
                    {currentStep === tutorialSteps.length - 1 ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Got it!
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
