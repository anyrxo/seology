'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  number: number
  title: string
  description: string
}

const STEPS: Step[] = [
  { number: 1, title: 'Welcome', description: 'Get started' },
  { number: 2, title: 'Connect', description: 'Add your site' },
  { number: 3, title: 'Scan', description: 'Find issues' },
  { number: 4, title: 'Review', description: 'See problems' },
  { number: 5, title: 'Mode', description: 'Choose automation' },
  { number: 6, title: 'Fix', description: 'Apply solution' },
  { number: 7, title: 'Complete', description: 'All done!' },
]

interface WizardLayoutProps {
  currentStep: number
  children: React.ReactNode
}

export function WizardLayout({ currentStep, children }: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mx-auto mb-12 max-w-5xl">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex flex-1 items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300',
                      currentStep > step.number
                        ? 'border-green-500 bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'border-green-500 bg-white text-green-500 shadow-lg'
                        : 'border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800'
                    )}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <span className="text-sm font-bold">{step.number}</span>
                    )}
                  </div>
                  <div className="mt-2 hidden sm:block">
                    <div
                      className={cn(
                        'text-xs font-medium',
                        currentStep >= step.number
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400 dark:text-gray-600'
                      )}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1 transition-all duration-300',
                      currentStep > step.number
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
    </div>
  )
}
