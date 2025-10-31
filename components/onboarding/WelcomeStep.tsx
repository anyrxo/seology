'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react'

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 p-4 dark:bg-green-900/20">
          <Sparkles className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Welcome to Seology.ai
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          The first SEO automation platform that actually fixes your website.
          Let's get your first site connected and watch Claude AI work its magic.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-green-100 p-6 dark:border-green-900/20">
          <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-green-100 p-3 dark:bg-green-900/20">
            <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 font-semibold">Instant Detection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Our AI crawls your entire site in minutes, finding every SEO issue automatically.
          </p>
        </Card>

        <Card className="border-green-100 p-6 dark:border-green-900/20">
          <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-green-100 p-3 dark:bg-green-900/20">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 font-semibold">Safe Automation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Every fix is reversible for 90 days. You're always in control.
          </p>
        </Card>

        <Card className="border-green-100 p-6 dark:border-green-900/20">
          <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-green-100 p-3 dark:bg-green-900/20">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 font-semibold">Real Results</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Watch your rankings improve as issues get fixed automatically.
          </p>
        </Card>
      </div>

      {/* What to Expect */}
      <Card className="bg-white p-8 dark:bg-gray-950">
        <h2 className="mb-6 text-xl font-semibold">What to Expect</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
              1
            </div>
            <div>
              <h3 className="font-medium">Connect your first site</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your platform (Shopify, WordPress, or any custom site)
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
              2
            </div>
            <div>
              <h3 className="font-medium">Initial site scan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Watch as we discover SEO issues in real-time
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
              3
            </div>
            <div>
              <h3 className="font-medium">Choose your automation level</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Decide how much control you want over the fixes
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
              4
            </div>
            <div>
              <h3 className="font-medium">Apply your first fix</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See Claude AI fix a real issue on your site
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Button size="lg" onClick={onNext} className="bg-green-600 px-8 py-6 text-lg hover:bg-green-700">
          Get Started
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Takes about 5 minutes to complete
        </p>
      </div>
    </div>
  )
}
