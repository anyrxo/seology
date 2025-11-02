'use client'

/**
 * Onboarding Step 5: Choose Execution Mode
 */

import { useState } from 'react'

interface ExecutionModeStepProps {
  onNext: (data: { executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE' }) => void
  onBack: () => void
}

export function ExecutionModeStep({ onNext, onBack }: ExecutionModeStepProps) {
  const [selectedMode, setSelectedMode] = useState<'AUTOMATIC' | 'PLAN' | 'APPROVE'>('PLAN')

  const modes = [
    {
      id: 'AUTOMATIC' as const,
      name: 'Automatic',
      icon: '⚡',
      description: 'Apply all fixes immediately without approval',
      pros: ['Fastest', 'Zero manual work', 'Continuous optimization'],
      cons: ['Less control', 'All changes applied instantly'],
      recommended: false,
    },
    {
      id: 'PLAN' as const,
      name: 'Plan Mode',
      icon: '📋',
      description: 'Review a batch of fixes, approve all at once',
      pros: ['Balanced approach', 'Review before applying', 'One-click approval'],
      cons: ['Requires periodic review'],
      recommended: true,
    },
    {
      id: 'APPROVE' as const,
      name: 'Manual Approval',
      icon: '👆',
      description: 'Approve each fix individually',
      pros: ['Maximum control', 'Review every change', 'Learn as you go'],
      cons: ['Most time-consuming', 'Slower optimization'],
      recommended: false,
    },
  ]

  const handleContinue = () => {
    onNext({ executionMode: selectedMode })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">⚙️</div>
        <h2 className="text-3xl font-bold text-white mb-2">
          How Should We Apply Fixes?
        </h2>
        <p className="text-gray-400">
          Choose how you want SEOLOGY.AI to handle SEO fixes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`
              p-6 rounded-lg border-2 transition-all text-left relative
              ${
                selectedMode === mode.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }
            `}
          >
            {mode.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <div className="text-4xl mb-3">{mode.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {mode.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{mode.description}</p>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-green-400 font-medium mb-1">Pros:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  {mode.pros.map((pro, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-1">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs text-red-400 font-medium mb-1">Cons:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  {mode.cons.map((con, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-500 mr-1">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-400">
          💡 <strong className="text-white">Tip:</strong> You can change this setting anytime
          from your dashboard settings.
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
