'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Sparkles, TrendingUp, Shield, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CompleteStepProps {
  domain: string
  issuesFound: number
}

export function CompleteStep({ domain, issuesFound }: CompleteStepProps) {
  const router = useRouter()

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="space-y-8">
      {/* Success Animation */}
      <div className="text-center">
        <div className="relative mb-6 inline-block">
          <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20" />
          <div className="relative inline-flex items-center justify-center rounded-full bg-green-100 p-6 dark:bg-green-900/20">
            <CheckCircle2 className="h-20 w-20 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold">You're All Set!</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Seology.ai is now monitoring <span className="font-semibold text-green-600">{domain}</span>
          {' '}and will automatically fix SEO issues as they're detected.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-green-200 bg-green-50 p-6 text-center dark:border-green-900/20 dark:bg-green-900/10">
          <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-green-600 dark:text-green-400" />
          <div className="text-3xl font-bold text-green-900 dark:text-green-300">1</div>
          <div className="text-sm font-medium text-green-700 dark:text-green-400">
            Site Connected
          </div>
        </Card>

        <Card className="border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-900/20 dark:bg-blue-900/10">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-blue-600 dark:text-blue-400" />
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-300">
            {issuesFound}
          </div>
          <div className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Issues Found
          </div>
        </Card>

        <Card className="border-purple-200 bg-purple-50 p-6 text-center dark:border-purple-900/20 dark:bg-purple-900/10">
          <TrendingUp className="mx-auto mb-3 h-8 w-8 text-purple-600 dark:text-purple-400" />
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-300">1</div>
          <div className="text-sm font-medium text-purple-700 dark:text-purple-400">
            Fix Applied
          </div>
        </Card>
      </div>

      {/* What Happens Next */}
      <Card className="p-8">
        <h2 className="mb-6 text-2xl font-bold">What Happens Next?</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Continuous Monitoring</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We'll scan your site regularly to detect new issues and track existing ones.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Automatic Fixes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on your automation settings, Claude will fix issues automatically or
                create plans for your review.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Track Your Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor your SEO improvements, rankings, and traffic in your dashboard.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Rollback Protection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All fixes are reversible for 90 days. You can undo any change with one click.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900/20 dark:bg-blue-900/10">
        <h3 className="mb-4 font-semibold text-blue-900 dark:text-blue-300">
          Quick Tips to Get Started
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <li className="flex gap-2">
            <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Check your dashboard daily to see new issues and applied fixes</span>
          </li>
          <li className="flex gap-2">
            <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Connect more sites to maximize your SEO coverage</span>
          </li>
          <li className="flex gap-2">
            <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Review Claude's reasoning to learn SEO best practices</span>
          </li>
          <li className="flex gap-2">
            <ArrowRight className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Adjust your automation settings anytime in Settings</span>
          </li>
        </ul>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={handleGoToDashboard}
          className="bg-green-600 px-12 py-6 text-lg hover:bg-green-700"
        >
          Go to Dashboard
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Your SEO automation journey starts now
        </p>
      </div>
    </div>
  )
}
