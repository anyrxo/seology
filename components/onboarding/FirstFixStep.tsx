'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle2, Sparkles, Eye, Code } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FirstFixStepProps {
  onComplete: () => void
}

type FixStage = 'analyzing' | 'generating' | 'applying' | 'verifying' | 'complete'

export function FirstFixStep({ onComplete }: FirstFixStepProps) {
  const [stage, setStage] = useState<FixStage>('analyzing')
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)

  useEffect(() => {
    const stages: FixStage[] = ['analyzing', 'generating', 'applying', 'verifying', 'complete']
    let currentStageIndex = 0

    const interval = setInterval(() => {
      if (currentStageIndex < stages.length - 1) {
        currentStageIndex++
        setStage(stages[currentStageIndex])
      } else {
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const stageConfig = {
    analyzing: {
      title: 'Analyzing Issue',
      description: 'Claude is examining the missing meta description...',
      icon: Loader2,
      iconClass: 'animate-spin text-blue-600',
    },
    generating: {
      title: 'Generating Fix',
      description: 'Creating SEO-optimized meta description...',
      icon: Sparkles,
      iconClass: 'animate-pulse text-purple-600',
    },
    applying: {
      title: 'Applying Fix',
      description: 'Updating your website...',
      icon: Loader2,
      iconClass: 'animate-spin text-green-600',
    },
    verifying: {
      title: 'Verifying',
      description: 'Confirming the fix was applied successfully...',
      icon: Loader2,
      iconClass: 'animate-spin text-orange-600',
    },
    complete: {
      title: 'Fix Applied!',
      description: 'Your first SEO fix is live',
      icon: CheckCircle2,
      iconClass: 'text-green-600',
    },
  }

  const currentConfig = stageConfig[stage]
  const Icon = currentConfig.icon

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div
          className={cn(
            'mb-4 inline-flex items-center justify-center rounded-full p-4',
            stage === 'complete' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'
          )}
        >
          <Icon className={cn('h-12 w-12', currentConfig.iconClass)} />
        </div>
        <h1 className="mb-4 text-3xl font-bold">{currentConfig.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {currentConfig.description}
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="space-y-4">
          <ProgressStep
            number={1}
            title="Analyzing Issue"
            completed={stage !== 'analyzing'}
            active={stage === 'analyzing'}
          />
          <ProgressStep
            number={2}
            title="Generating Fix"
            completed={!['analyzing', 'generating'].includes(stage)}
            active={stage === 'generating'}
          />
          <ProgressStep
            number={3}
            title="Applying Fix"
            completed={!['analyzing', 'generating', 'applying'].includes(stage)}
            active={stage === 'applying'}
          />
          <ProgressStep
            number={4}
            title="Verifying"
            completed={stage === 'complete'}
            active={stage === 'verifying'}
          />
        </div>
      </Card>

      {/* Fix Details */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Fix Details</h3>
          <Badge variant="error">Critical</Badge>
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium">Issue:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Missing meta description on product page
            </p>
          </div>
          <div>
            <span className="text-sm font-medium">Page:</span>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
              /products/wireless-headphones
            </p>
          </div>
          <div>
            <span className="text-sm font-medium">Impact:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Without a meta description, search engines will generate one automatically,
              which may not accurately represent your product and can reduce click-through rates.
            </p>
          </div>
        </div>
      </Card>

      {/* Before/After (shown when complete) */}
      {stage === 'complete' && (
        <>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShowBeforeAfter(!showBeforeAfter)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {showBeforeAfter ? 'Hide' : 'Show'} Before/After
            </Button>
          </div>

          {showBeforeAfter && (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Before */}
              <Card className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Code className="h-4 w-4 text-red-600" />
                  <h4 className="font-semibold text-red-600">Before</h4>
                </div>
                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/10">
                  <code className="text-sm text-red-900 dark:text-red-300">
                    &lt;head&gt;<br />
                    &nbsp;&nbsp;&lt;title&gt;Wireless Headphones&lt;/title&gt;<br />
                    &nbsp;&nbsp;{/* No meta description */}<br />
                    &lt;/head&gt;
                  </code>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Missing meta description tag
                </p>
              </Card>

              {/* After */}
              <Card className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <h4 className="font-semibold text-green-600">After</h4>
                </div>
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/10">
                  <code className="text-sm text-green-900 dark:text-green-300">
                    &lt;head&gt;<br />
                    &nbsp;&nbsp;&lt;title&gt;Wireless Headphones&lt;/title&gt;<br />
                    &nbsp;&nbsp;&lt;meta name="description" content="Premium wireless headphones with
                    active noise cancellation, 30-hour battery life, and superior sound quality.
                    Free shipping available." /&gt;<br />
                    &lt;/head&gt;
                  </code>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  SEO-optimized meta description added
                </p>
              </Card>
            </div>
          )}

          {/* Claude's Reasoning */}
          <Card className="border-purple-200 bg-purple-50 p-6 dark:border-purple-900/20 dark:bg-purple-900/10">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-purple-900 dark:text-purple-300">
                Claude's Reasoning
              </h3>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-400">
              I analyzed your product page and created a compelling meta description that:
              (1) Highlights the key product features (noise cancellation, battery life),
              (2) Uses action-oriented language to encourage clicks,
              (3) Stays within the optimal 155-160 character limit,
              (4) Includes a call-to-action about free shipping to increase click-through rates.
            </p>
          </Card>

          {/* Success Message */}
          <Card className="border-green-200 bg-green-50 p-8 text-center dark:border-green-900/20 dark:bg-green-900/10">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600 dark:text-green-400" />
            <h2 className="mb-2 text-2xl font-bold text-green-900 dark:text-green-300">
              Your First Fix is Live!
            </h2>
            <p className="mb-6 text-green-800 dark:text-green-400">
              This is just the beginning. Seology.ai will continue monitoring and fixing
              SEO issues automatically. You can review all changes in your dashboard.
            </p>
            <Button
              size="lg"
              onClick={onComplete}
              className="bg-green-600 px-8 hover:bg-green-700"
            >
              Complete Onboarding
            </Button>
          </Card>
        </>
      )}
    </div>
  )
}

function ProgressStep({
  number,
  title,
  completed,
  active,
}: {
  number: number
  title: string
  completed: boolean
  active: boolean
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all',
          completed && 'border-green-500 bg-green-500 text-white',
          active && 'border-blue-500 bg-blue-500 text-white',
          !completed && !active && 'border-gray-300 text-gray-400 dark:border-gray-600'
        )}
      >
        {completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : active ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <span className="text-sm font-bold">{number}</span>
        )}
      </div>
      <span
        className={cn(
          'font-medium transition-colors',
          completed && 'text-green-600 dark:text-green-400',
          active && 'text-blue-600 dark:text-blue-400',
          !completed && !active && 'text-gray-500 dark:text-gray-500'
        )}
      >
        {title}
      </span>
    </div>
  )
}
