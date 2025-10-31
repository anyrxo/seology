'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Loader2, Search, AlertCircle, CheckCircle2, Link as LinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScanningStepProps {
  domain: string
  onComplete: (stats: ScanStats) => void
}

export interface ScanStats {
  pagesScanned: number
  issuesFound: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
}

export function ScanningStep({ domain, onComplete }: ScanningStepProps) {
  const [progress, setProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState('')
  const [stats, setStats] = useState<ScanStats>({
    pagesScanned: 0,
    issuesFound: 0,
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0,
    lowIssues: 0,
  })

  useEffect(() => {
    // Simulate scanning progress
    const pages = [
      '/',
      '/about',
      '/products',
      '/blog',
      '/contact',
      '/products/item-1',
      '/products/item-2',
      '/blog/post-1',
      '/blog/post-2',
      '/services',
    ]

    let currentPageIndex = 0
    const interval = setInterval(() => {
      if (currentPageIndex < pages.length) {
        setCurrentPage(pages[currentPageIndex])
        setProgress(((currentPageIndex + 1) / pages.length) * 100)

        // Simulate finding issues
        setStats((prev) => ({
          pagesScanned: prev.pagesScanned + 1,
          issuesFound: prev.issuesFound + Math.floor(Math.random() * 3) + 1,
          criticalIssues: prev.criticalIssues + (Math.random() > 0.7 ? 1 : 0),
          highIssues: prev.highIssues + (Math.random() > 0.5 ? 1 : 0),
          mediumIssues: prev.mediumIssues + (Math.random() > 0.4 ? 1 : 0),
          lowIssues: prev.lowIssues + (Math.random() > 0.3 ? 1 : 0),
        }))

        currentPageIndex++
      } else {
        clearInterval(interval)
        // Wait a moment before completing
        setTimeout(() => {
          onComplete(stats)
        }, 1000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [domain, onComplete])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-green-100 p-4 dark:bg-green-900/20">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 dark:text-green-400" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Scanning Your Site</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Our AI is crawling <span className="font-semibold text-green-600">{domain}</span> to detect SEO issues
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-medium">Scan Progress</span>
          <span className="text-green-600 dark:text-green-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-green-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {currentPage && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Search className="h-4 w-4" />
            <span className="truncate">Currently scanning: {currentPage}</span>
          </div>
        )}
      </Card>

      {/* Live Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          icon={Search}
          label="Pages Scanned"
          value={stats.pagesScanned}
          color="blue"
        />
        <StatsCard
          icon={AlertCircle}
          label="Issues Found"
          value={stats.issuesFound}
          color="yellow"
          pulse
        />
        <StatsCard
          icon={LinkIcon}
          label="Links Checked"
          value={stats.pagesScanned * 12}
          color="purple"
        />
      </div>

      {/* Issue Breakdown */}
      {stats.issuesFound > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Issues by Severity</h3>
          <div className="space-y-3">
            <IssueRow
              label="Critical"
              count={stats.criticalIssues}
              color="red"
              total={stats.issuesFound}
            />
            <IssueRow
              label="High"
              count={stats.highIssues}
              color="orange"
              total={stats.issuesFound}
            />
            <IssueRow
              label="Medium"
              count={stats.mediumIssues}
              color="yellow"
              total={stats.issuesFound}
            />
            <IssueRow
              label="Low"
              count={stats.lowIssues}
              color="blue"
              total={stats.issuesFound}
            />
          </div>
        </Card>
      )}

      {/* What's Happening */}
      <Card className="bg-blue-50 p-6 dark:bg-blue-900/10">
        <div className="flex gap-4">
          <div className="shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
              What We're Checking
            </h3>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Meta tags and descriptions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Heading structure and keywords
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Image alt tags and optimization
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Internal and external links
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Mobile responsiveness
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

function StatsCard({
  icon: Icon,
  label,
  value,
  color,
  pulse = false,
}: {
  icon: any
  label: string
  value: number
  color: 'blue' | 'yellow' | 'purple' | 'red'
  pulse?: boolean
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  }

  return (
    <Card className={cn('p-6', pulse && 'animate-pulse')}>
      <div className="flex items-center gap-4">
        <div className={cn('rounded-lg p-3', colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </div>
      </div>
    </Card>
  )
}

function IssueRow({
  label,
  count,
  color,
  total,
}: {
  label: string
  count: number
  color: 'red' | 'orange' | 'yellow' | 'blue'
  total: number
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0

  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600 dark:text-gray-400">{count}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={cn('h-full transition-all duration-500', colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
