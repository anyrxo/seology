'use client'

/**
 * SEO Issue Card Component
 * Displays SEO issues with priority, impact, and fix suggestions
 */

import { useState } from 'react'
import { AdvancedTooltip } from '@/components/ui/advanced-tooltip'

export type SEOIssueSeverity = 'critical' | 'high' | 'medium' | 'low'
export type SEOIssueType =
  | 'missing_meta_title'
  | 'missing_meta_description'
  | 'missing_alt_text'
  | 'poor_title'
  | 'poor_description'
  | 'short_description'
  | 'long_url'
  | 'duplicate_content'
  | 'broken_link'
  | 'missing_schema'
  | 'slow_load'
  | 'mobile_issues'

export interface SEOIssue {
  id: string
  type: SEOIssueType
  title: string
  description: string
  severity: SEOIssueSeverity
  impact: number // 0-100
  affectedPages?: number
  recommendation?: string
  estimatedTraffic?: number
  canAutoFix?: boolean
}

interface SEOIssueCardProps {
  issue: SEOIssue
  onFix?: (issueId: string) => void
  onDismiss?: (issueId: string) => void
  isFixing?: boolean
  className?: string
}

const severityConfig = {
  critical: {
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
    icon: '🔴',
    label: 'Critical',
    badgeColor: 'bg-red-500',
  },
  high: {
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700',
    icon: '🟠',
    label: 'High',
    badgeColor: 'bg-orange-500',
  },
  medium: {
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
    icon: '🟡',
    label: 'Medium',
    badgeColor: 'bg-yellow-500',
  },
  low: {
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    icon: '🔵',
    label: 'Low',
    badgeColor: 'bg-blue-500',
  },
}

const issueTypeIcons: Record<SEOIssueType, string> = {
  missing_meta_title: '📝',
  missing_meta_description: '📄',
  missing_alt_text: '🖼️',
  poor_title: '✏️',
  poor_description: '📋',
  short_description: '📏',
  long_url: '🔗',
  duplicate_content: '📑',
  broken_link: '🔗',
  missing_schema: '🏷️',
  slow_load: '⏱️',
  mobile_issues: '📱',
}

export function SEOIssueCard({
  issue,
  onFix,
  onDismiss,
  isFixing = false,
  className = '',
}: SEOIssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const config = severityConfig[issue.severity]

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border-2 ${config.color} shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up ${className}`}>
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Issue Icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
            {issueTypeIcons[issue.type]}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {issue.title}
              </h3>

              {/* Severity Badge */}
              <AdvancedTooltip content={`${config.label} priority issue`}>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.color}`}>
                  <span>{config.icon}</span>
                  {config.label}
                </span>
              </AdvancedTooltip>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {issue.description}
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {/* Impact Score */}
              <AdvancedTooltip content="Estimated impact on SEO performance">
                <div className="inline-flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Impact: {issue.impact}/100
                  </span>
                </div>
              </AdvancedTooltip>

              {/* Affected Pages */}
              {issue.affectedPages !== undefined && (
                <AdvancedTooltip content="Number of pages affected by this issue">
                  <div className="inline-flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      {issue.affectedPages} {issue.affectedPages === 1 ? 'page' : 'pages'}
                    </span>
                  </div>
                </AdvancedTooltip>
              )}

              {/* Estimated Traffic */}
              {issue.estimatedTraffic !== undefined && issue.estimatedTraffic > 0 && (
                <AdvancedTooltip content="Potential monthly visitors you could gain by fixing this">
                  <div className="inline-flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      +{issue.estimatedTraffic.toLocaleString()} visitors/mo
                    </span>
                  </div>
                </AdvancedTooltip>
              )}

              {/* Auto-fix Badge */}
              {issue.canAutoFix && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Auto-fixable
                </span>
              )}
            </div>

            {/* Recommendation (collapsible) */}
            {issue.recommendation && (
              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 mb-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Recommendation:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {issue.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {issue.recommendation && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {isExpanded ? 'Hide' : 'Show'} recommendation
                  <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              <div className="flex-1"></div>

              {onDismiss && (
                <button
                  onClick={() => onDismiss(issue.id)}
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  disabled={isFixing}
                >
                  Dismiss
                </button>
              )}

              {onFix && (
                <button
                  onClick={() => onFix(issue.id)}
                  disabled={isFixing}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md disabled:transform-none"
                >
                  {isFixing ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Fixing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {issue.canAutoFix ? 'Auto-Fix' : 'Fix Now'}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * SEO Issue List Component
 */
interface SEOIssueListProps {
  issues: SEOIssue[]
  onFix?: (issueId: string) => void
  onDismiss?: (issueId: string) => void
  fixingIssueId?: string
  groupBySeverity?: boolean
  className?: string
}

export function SEOIssueList({
  issues,
  onFix,
  onDismiss,
  fixingIssueId,
  groupBySeverity = true,
  className = '',
}: SEOIssueListProps) {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No SEO Issues Found!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your site is optimized. Keep up the great work!
        </p>
      </div>
    )
  }

  if (!groupBySeverity) {
    return (
      <div className={`space-y-4 ${className}`}>
        {issues.map((issue) => (
          <SEOIssueCard
            key={issue.id}
            issue={issue}
            onFix={onFix}
            onDismiss={onDismiss}
            isFixing={fixingIssueId === issue.id}
          />
        ))}
      </div>
    )
  }

  // Group by severity
  const grouped = issues.reduce((acc, issue) => {
    if (!acc[issue.severity]) {
      acc[issue.severity] = []
    }
    acc[issue.severity].push(issue)
    return acc
  }, {} as Record<SEOIssueSeverity, SEOIssue[]>)

  const severityOrder: SEOIssueSeverity[] = ['critical', 'high', 'medium', 'low']

  return (
    <div className={`space-y-6 ${className}`}>
      {severityOrder.map((severity) => {
        const severityIssues = grouped[severity]
        if (!severityIssues || severityIssues.length === 0) return null

        const config = severityConfig[severity]

        return (
          <div key={severity} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${config.badgeColor}`}></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {config.label} Priority
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({severityIssues.length} {severityIssues.length === 1 ? 'issue' : 'issues'})
              </span>
            </div>
            <div className="space-y-3">
              {severityIssues.map((issue) => (
                <SEOIssueCard
                  key={issue.id}
                  issue={issue}
                  onFix={onFix}
                  onDismiss={onDismiss}
                  isFixing={fixingIssueId === issue.id}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
