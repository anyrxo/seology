'use client'

/**
 * Onboarding Progress Indicator
 * Visual progress tracker for the onboarding wizard
 */

import { motion } from 'framer-motion'

interface Step {
  id: string
  title: string
  icon: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressIndicator({
  steps,
  currentStep,
  className = '',
}: ProgressIndicatorProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop: Horizontal Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            const isFuture = index > currentStep

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className={`avatar-circle _40px ${
                      isCompleted
                        ? 'success'
                        : isActive
                        ? 'primary'
                        : ''
                    }`}
                    style={{
                      backgroundColor: isCompleted
                        ? 'var(--system--green-400)'
                        : isActive
                        ? 'var(--accent--primary-1)'
                        : 'var(--neutral--700)',
                      boxShadow: isActive ? '0 0 0 4px rgba(59, 130, 246, 0.3)' : undefined
                    }}
                  >
                    <span className="text-100 bold color-neutral-100">
                      {isCompleted ? '✓' : step.icon}
                    </span>
                  </div>

                  {/* Step Title */}
                  <span
                    className={`
                      absolute top-12 text-xs whitespace-nowrap
                      ${isActive ? 'text-white font-semibold' : 'text-gray-500'}
                    `}
                  >
                    {step.title}
                  </span>

                  {/* Active Pulse */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-600"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{
                        opacity: 0,
                        scale: 1.5,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  )}
                </motion.div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-800 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-blue-600"
                      initial={{ width: '0%' }}
                      animate={{
                        width: index < currentStep ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: Vertical Progress Steps */}
      <div className="block md:hidden">
        <div className="flex flex-col space-y-3">
          {steps.map((step, index) => {
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            const isFuture = index > currentStep

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0
                    transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-500 border border-gray-700'
                    }
                  `}
                >
                  {isCompleted ? '✓' : step.icon}
                </div>

                {/* Step Info */}
                <div className="ml-3 flex-1">
                  <p
                    className={`
                      text-sm font-medium
                      ${isActive ? 'text-white' : isCompleted ? 'text-gray-400' : 'text-gray-600'}
                    `}
                  >
                    {step.title}
                  </p>
                  {isActive && (
                    <p className="text-xs text-blue-400">In progress...</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
            initial={{ width: '0%' }}
            animate={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}
