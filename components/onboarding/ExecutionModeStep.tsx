'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Zap, FileText, CheckSquare, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExecutionModeStepProps {
  onNext: (mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE') => void
  onBack: () => void
}

type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'

export function ExecutionModeStep({ onNext, onBack }: ExecutionModeStepProps) {
  const [selectedMode, setSelectedMode] = useState<ExecutionMode | null>(null)

  const modes = [
    {
      id: 'AUTOMATIC' as ExecutionMode,
      name: 'Automatic',
      icon: Zap,
      tagline: 'Hands-free SEO',
      description: 'Claude AI automatically fixes all issues as they\'re detected',
      features: [
        'Instant fixes applied 24/7',
        'No manual approval needed',
        'Maximum time savings',
        'All fixes reversible for 90 days',
      ],
      bestFor: 'Teams who want to focus on strategy, not maintenance',
      color: 'purple',
      recommended: true,
    },
    {
      id: 'PLAN' as ExecutionMode,
      name: 'Plan & Review',
      icon: FileText,
      tagline: 'Guided automation',
      description: 'Claude creates fix plans, you review and approve batches',
      features: [
        'AI generates detailed fix plans',
        'Approve multiple fixes at once',
        'Review before any changes',
        'Balance control and efficiency',
      ],
      bestFor: 'Teams who want oversight without micromanagement',
      color: 'blue',
      recommended: false,
    },
    {
      id: 'APPROVE' as ExecutionMode,
      name: 'Approve Each Fix',
      icon: CheckSquare,
      tagline: 'Maximum control',
      description: 'Review and approve every single fix individually',
      features: [
        'Full control over every change',
        'See exact before/after for each fix',
        'Perfect for learning',
        'Detailed explanations provided',
      ],
      bestFor: 'Teams new to SEO automation or with strict approval processes',
      color: 'green',
      recommended: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Choose Your Automation Level</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Decide how much control you want over SEO fixes. You can change this anytime.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="space-y-4">
        {modes.map((mode) => {
          const Icon = mode.icon
          const isSelected = selectedMode === mode.id

          return (
            <Card
              key={mode.id}
              className={cn(
                'relative cursor-pointer p-6 transition-all hover:shadow-lg',
                isSelected
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                  : 'hover:border-green-300'
              )}
              onClick={() => setSelectedMode(mode.id)}
            >
              {mode.recommended && (
                <div className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
                  Recommended
                </div>
              )}
              {isSelected && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}

              <div className="flex gap-6">
                {/* Icon */}
                <div
                  className={cn(
                    'shrink-0 rounded-xl p-4',
                    mode.color === 'purple' && 'bg-purple-100 dark:bg-purple-900/20',
                    mode.color === 'blue' && 'bg-blue-100 dark:bg-blue-900/20',
                    mode.color === 'green' && 'bg-green-100 dark:bg-green-900/20'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-8 w-8',
                      mode.color === 'purple' && 'text-purple-600 dark:text-purple-400',
                      mode.color === 'blue' && 'text-blue-600 dark:text-blue-400',
                      mode.color === 'green' && 'text-green-600 dark:text-green-400'
                    )}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold">{mode.name}</h3>
                    <p
                      className={cn(
                        'text-sm font-medium',
                        mode.color === 'purple' && 'text-purple-600 dark:text-purple-400',
                        mode.color === 'blue' && 'text-blue-600 dark:text-blue-400',
                        mode.color === 'green' && 'text-green-600 dark:text-green-400'
                      )}
                    >
                      {mode.tagline}
                    </p>
                  </div>

                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {mode.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4 grid gap-2 md:grid-cols-2">
                    {mode.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Best For */}
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <p className="text-sm">
                      <span className="font-medium">Best for:</span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {mode.bestFor}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 p-6 dark:bg-blue-900/10">
        <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
          Don't worry, you can change this later
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-400">
          Your execution mode can be changed at any time in Settings. You can also set
          different modes for different sites. All fixes are reversible for 90 days,
          regardless of your mode.
        </p>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={() => selectedMode && onNext(selectedMode)}
          disabled={!selectedMode}
          className="bg-green-600 hover:bg-green-700"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
