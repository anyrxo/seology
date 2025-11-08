'use client'

/**
 * SEO Recommendations Component
 * AI-powered recommendations for improving SEO performance
 */

import { useState } from 'react'
import { AdvancedTooltip } from '@/components/ui/advanced-tooltip'

export type RecommendationCategory =
  | 'content'
  | 'technical'
  | 'keywords'
  | 'links'
  | 'images'
  | 'performance'
  | 'mobile'
  | 'schema'

export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low'

interface Recommendation {
  id: string
  category: RecommendationCategory
  priority: RecommendationPriority
  title: string
  description: string
  impact: {
    traffic: number // Estimated monthly visitors increase
    ranking: number // Estimated position improvement
    conversions?: number // Estimated conversion increase percentage
  }
  effort: 'easy' | 'moderate' | 'complex'
  estimatedTime: string // e.g., "5 minutes", "1 hour", "1 day"
  steps?: string[]
  aiInsight?: string
  resources?: {
    title: string
    url: string
  }[]
}

interface SEORecommendationsProps {
  recommendations: Recommendation[]
  onImplement?: (id: string) => void
  onDismiss?: (id: string) => void
  isImplementing?: string
  className?: string
}

const categoryConfig = {
  content: {
    icon: '📝',
    label: 'Content',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  },
  technical: {
    icon: '⚙️',
    label: 'Technical',
    color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  },
  keywords: {
    icon: '🔑',
    label: 'Keywords',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  links: {
    icon: '🔗',
    label: 'Links',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
  images: {
    icon: '🖼️',
    label: 'Images',
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
  },
  performance: {
    icon: '⚡',
    label: 'Performance',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  },
  mobile: {
    icon: '📱',
    label: 'Mobile',
    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
  },
  schema: {
    icon: '🏷️',
    label: 'Schema',
    color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
  },
}

const effortConfig = {
  easy: {
    label: 'Easy',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    icon: '✅',
  },
  moderate: {
    label: 'Moderate',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    icon: '⚠️',
  },
  complex: {
    label: 'Complex',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    icon: '🔴',
  },
}

function RecommendationCard({
  recommendation,
  onImplement,
  onDismiss,
  isImplementing,
}: {
  recommendation: Recommendation
  onImplement?: (id: string) => void
  onDismiss?: (id: string) => void
  isImplementing: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const categoryInfo = categoryConfig[recommendation.category]
  const effortInfo = effortConfig[recommendation.effort]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Category Icon */}
        <div className={`flex-shrink-0 w-12 h-12 ${categoryInfo.color} rounded-lg flex items-center justify-center text-2xl`}>
          {categoryInfo.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {recommendation.title}
            </h3>
            <AdvancedTooltip content={`${categoryInfo.label} optimization`}>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${categoryInfo.color}`}>
                {categoryInfo.label}
              </span>
            </AdvancedTooltip>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {recommendation.description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {/* Traffic Impact */}
            <AdvancedTooltip content="Estimated monthly visitors increase">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                <div className="text-xs text-green-700 dark:text-green-300 mb-1">Traffic</div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                  +{recommendation.impact.traffic.toLocaleString()}
                </div>
              </div>
            </AdvancedTooltip>

            {/* Ranking Impact */}
            <AdvancedTooltip content="Estimated position improvement">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">Ranking</div>
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  +{recommendation.impact.ranking} pos
                </div>
              </div>
            </AdvancedTooltip>

            {/* Effort */}
            <AdvancedTooltip content={`Implementation difficulty: ${effortInfo.label}`}>
              <div className={`${effortInfo.color} rounded-lg p-2`}>
                <div className="text-xs mb-1">Effort</div>
                <div className="text-sm font-bold flex items-center gap-1">
                  {effortInfo.icon} {effortInfo.label}
                </div>
              </div>
            </AdvancedTooltip>

            {/* Time */}
            <AdvancedTooltip content="Estimated implementation time">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-1">Time</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {recommendation.estimatedTime}
                </div>
              </div>
            </AdvancedTooltip>
          </div>

          {/* AI Insight */}
          {recommendation.aiInsight && (
            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    AI Insight
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {recommendation.aiInsight}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Implementation Steps (collapsible) */}
          {recommendation.steps && recommendation.steps.length > 0 && (
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
              <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Implementation Steps:
                </p>
                <ol className="space-y-2">
                  {recommendation.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="flex-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Resources */}
          {recommendation.resources && recommendation.resources.length > 0 && isExpanded && (
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Helpful Resources:
              </p>
              <ul className="space-y-1">
                {recommendation.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            {recommendation.steps && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {isExpanded ? 'Hide' : 'Show'} details
                <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            <div className="flex-1"></div>

            {onDismiss && (
              <button
                onClick={() => onDismiss(recommendation.id)}
                disabled={isImplementing}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                Dismiss
              </button>
            )}

            {onImplement && (
              <button
                onClick={() => onImplement(recommendation.id)}
                disabled={isImplementing}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md disabled:transform-none"
              >
                {isImplementing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Implementing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Implement
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SEORecommendations({
  recommendations,
  onImplement,
  onDismiss,
  isImplementing,
  className = '',
}: SEORecommendationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<RecommendationCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'impact' | 'effort' | 'priority'>('impact')

  // Filter by category
  const filteredRecommendations = selectedCategory === 'all'
    ? recommendations
    : recommendations.filter(r => r.category === selectedCategory)

  // Sort recommendations
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    if (sortBy === 'impact') {
      return b.impact.traffic - a.impact.traffic
    }
    if (sortBy === 'effort') {
      const effortOrder = { easy: 0, moderate: 1, complex: 2 }
      return effortOrder[a.effort] - effortOrder[b.effort]
    }
    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Count by category
  const categoryCounts = recommendations.reduce((acc, rec) => {
    acc[rec.category] = (acc[rec.category] || 0) + 1
    return acc
  }, {} as Record<RecommendationCategory, number>)

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Recommendations Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze your site to get personalized SEO recommendations from SEOLOGY AI
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header & Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All ({recommendations.length})
            </button>
            {(Object.keys(categoryConfig) as RecommendationCategory[]).map((category) => {
              const count = categoryCounts[category] || 0
              if (count === 0) return null
              const config = categoryConfig[category]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : `${config.color} hover:opacity-80`
                  }`}
                >
                  <span>{config.icon}</span>
                  {config.label} ({count})
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'impact' | 'effort' | 'priority')}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="impact">Impact (Traffic)</option>
              <option value="effort">Effort (Easy first)</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {sortedRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onImplement={onImplement}
            onDismiss={onDismiss}
            isImplementing={isImplementing === recommendation.id}
          />
        ))}
      </div>
    </div>
  )
}
