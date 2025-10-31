'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react'
import { ScanStats } from './ScanningStep'
import { cn } from '@/lib/utils'

interface ReviewIssuesStepProps {
  stats: ScanStats
  domain: string
  onNext: () => void
  onBack: () => void
}

interface Issue {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: string
  page: string
  description: string
  impact: string
}

const SAMPLE_ISSUES: Issue[] = [
  {
    id: '1',
    severity: 'critical',
    type: 'Missing Meta Description',
    page: '/products/item-1',
    description: '15 product pages are missing meta descriptions',
    impact: 'Severely impacts click-through rates from search results',
  },
  {
    id: '2',
    severity: 'critical',
    type: 'Broken Images',
    page: '/about',
    description: '3 images have missing or broken alt tags',
    impact: 'Hurts accessibility and image search rankings',
  },
  {
    id: '3',
    severity: 'high',
    type: 'H1 Tag Missing',
    page: '/services',
    description: '8 pages are missing H1 heading tags',
    impact: 'Makes it harder for search engines to understand page content',
  },
  {
    id: '4',
    severity: 'high',
    type: 'Duplicate Title Tags',
    page: '/blog',
    description: '12 pages have duplicate title tags',
    impact: 'Confuses search engines about page uniqueness',
  },
  {
    id: '5',
    severity: 'medium',
    type: 'Slow Page Load',
    page: '/products',
    description: '4 pages load slower than 3 seconds',
    impact: 'Affects user experience and search rankings',
  },
]

export function ReviewIssuesStep({ stats, domain, onNext, onBack }: ReviewIssuesStepProps) {
  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      color: 'red',
      badge: 'error' as const,
    },
    high: {
      icon: AlertCircle,
      color: 'orange',
      badge: 'warning' as const,
    },
    medium: {
      icon: Info,
      color: 'yellow',
      badge: 'warning' as const,
    },
    low: {
      icon: Info,
      color: 'blue',
      badge: 'default' as const,
    },
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Issues Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          We found <span className="font-bold text-red-600">{stats.issuesFound} SEO issues</span> on{' '}
          <span className="font-semibold">{domain}</span>
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-red-200 bg-red-50 p-4 dark:border-red-900/20 dark:bg-red-900/10">
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {stats.criticalIssues}
          </div>
          <div className="text-sm font-medium text-red-800 dark:text-red-300">
            Critical
          </div>
        </Card>
        <Card className="border-orange-200 bg-orange-50 p-4 dark:border-orange-900/20 dark:bg-orange-900/10">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {stats.highIssues}
          </div>
          <div className="text-sm font-medium text-orange-800 dark:text-orange-300">
            High
          </div>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/20 dark:bg-yellow-900/10">
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.mediumIssues}
          </div>
          <div className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Medium
          </div>
        </Card>
        <Card className="border-blue-200 bg-blue-50 p-4 dark:border-blue-900/20 dark:bg-blue-900/10">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.lowIssues}
          </div>
          <div className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Low
          </div>
        </Card>
      </div>

      {/* Top Issues */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Top Critical Issues</h2>
        <div className="space-y-3">
          {SAMPLE_ISSUES.map((issue) => {
            const config = severityConfig[issue.severity]
            const Icon = config.icon

            return (
              <Card
                key={issue.id}
                className="p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'mt-1 rounded-lg p-2',
                      issue.severity === 'critical' && 'bg-red-100 dark:bg-red-900/20',
                      issue.severity === 'high' && 'bg-orange-100 dark:bg-orange-900/20',
                      issue.severity === 'medium' && 'bg-yellow-100 dark:bg-yellow-900/20',
                      issue.severity === 'low' && 'bg-blue-100 dark:bg-blue-900/20'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5',
                        issue.severity === 'critical' && 'text-red-600 dark:text-red-400',
                        issue.severity === 'high' && 'text-orange-600 dark:text-orange-400',
                        issue.severity === 'medium' && 'text-yellow-600 dark:text-yellow-400',
                        issue.severity === 'low' && 'text-blue-600 dark:text-blue-400'
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="font-semibold">{issue.type}</h3>
                      <Badge variant={config.badge} className="shrink-0">
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                      {issue.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Page: <span className="font-mono">{issue.page}</span>
                    </p>
                    <div className="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                      <p className="text-sm">
                        <span className="font-medium">Impact:</span> {issue.impact}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="mt-1 h-5 w-5 text-gray-400" />
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Good News */}
      <Card className="border-green-200 bg-green-50 p-6 dark:border-green-900/20 dark:bg-green-900/10">
        <h3 className="mb-3 font-semibold text-green-900 dark:text-green-300">
          Good News!
        </h3>
        <p className="text-sm text-green-800 dark:text-green-400">
          All of these issues can be automatically fixed by Seology.ai. In the next step,
          you'll choose how much control you want over the fixes. Then we'll apply your first
          fix so you can see the magic happen.
        </p>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="bg-green-600 hover:bg-green-700">
          Continue to Setup
        </Button>
      </div>
    </div>
  )
}
