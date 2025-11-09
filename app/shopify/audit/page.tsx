/**
 * Advanced SEO Audit Page - Powered by SEOLOGY AI
 * World-class AI-powered SEO analysis with ROI prioritization
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'
import { authenticatedFetch } from '@/lib/shopify-app-bridge'

interface SEORecommendation {
  category: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  currentState: string
  recommendedState: string
  implementation: 'automatic' | 'guided' | 'manual'
  expectedImpact: {
    trafficIncrease: number
    conversionIncrease: number
    ranking: string
    timeframe: string
  }
  reasoning: string
}

interface PrioritizedFix {
  category: string
  title: string
  description: string
  effort: 'low' | 'medium' | 'high'
  estimatedImpact: {
    trafficIncrease: number
    conversionIncrease: number
    revenueIncrease: number
  }
  roi: number
  priority: number
}

interface ProductAnalysis {
  productId: string
  title: string
  currentScore: number
  potentialScore: number
  recommendations: SEORecommendation[]
  prioritizedFixes: PrioritizedFix[]
}

interface AuditSummary {
  totalProducts: number
  productsAnalyzed: number
  criticalIssues: number
  highPriorityIssues: number
  estimatedTrafficIncrease: number
  estimatedRevenueIncrease: number
  topOpportunities: Array<{
    product: string
    opportunity: string
    estimatedImpact: number
  }>
}

interface OverallHealth {
  score: number
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  technicalSEO: number
  onPageSEO: number
  contentQuality: number
  userExperience: number
}

export default function AdvancedSEOAuditPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [overallHealth, setOverallHealth] = useState<OverallHealth | null>(null)
  const [products, setProducts] = useState<ProductAnalysis[]>([])
  const [summary, setSummary] = useState<AuditSummary | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductAnalysis | null>(null)
  const [includeKeywords, setIncludeKeywords] = useState(false)
  const [includeSchema, setIncludeSchema] = useState(true)

  const runAdvancedAudit = async () => {
    if (!shop) return

    setLoading(true)
    setError(null)

    try {
      const data = await authenticatedFetch<{ success: boolean; data?: { overallHealth: OverallHealth; products: ProductAnalysis[]; summary: AuditSummary }; error?: { message: string } }>('/api/shopify/audit/advanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop,
          includeKeywordResearch: includeKeywords,
          includeSchemaSuggestions: includeSchema,
        }),
      })

      if (data.success && data.data) {
        setOverallHealth(data.data.overallHealth)
        setProducts(data.data.products)
        setSummary(data.data.summary)
      } else {
        setError(data.error?.message || 'Failed to run audit')
      }
    } catch (err) {
      console.error('Audit error:', err)
      setError('Failed to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-400'
      case 'B':
        return 'text-blue-400'
      case 'C':
        return 'text-yellow-400'
      case 'D':
        return 'text-orange-400'
      case 'F':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-[#191A1B] flex">
      <ShopifyAppNav />

      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Advanced SEO Audit
              </h1>
              <p className="text-gray-400">
                World-class AI-powered SEO analysis with ROI prioritization
              </p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Audit Controls */}
          <div className="bg-[#262A2B] rounded-lg p-6 border border-white/5 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Audit Configuration</h3>

            <div className="flex flex-wrap gap-4 mb-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={includeKeywords}
                  onChange={(e) => setIncludeKeywords(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#191A1B] border-white/10 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>Include Keyword Research</span>
              </label>

              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={includeSchema}
                  onChange={(e) => setIncludeSchema(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#191A1B] border-white/10 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>Generate Schema Markup</span>
              </label>
            </div>

            <button
              onClick={runAdvancedAudit}
              disabled={loading || !shop}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Running Advanced Audit...
                </span>
              ) : (
                'Run Advanced SEO Audit'
              )}
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-300 mb-1">Audit Failed</h3>
                  <p className="text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Overall Health Score */}
        {overallHealth && (
          <div className="bg-[#262A2B] rounded-lg p-6 border border-white/5 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Overall SEO Health</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Overall Score */}
              <div className="bg-[#191A1B] rounded-lg p-4 border border-white/5">
                <div className="text-sm text-gray-400 mb-2">Overall Score</div>
                <div className={`text-4xl font-bold mb-1 ${getGradeColor(overallHealth.grade)}`}>
                  {overallHealth.grade}
                </div>
                <div className="text-2xl text-gray-300">{overallHealth.score}/100</div>
              </div>

              {/* Technical SEO */}
              <div className="bg-[#191A1B] rounded-lg p-4 border border-white/5">
                <div className="text-sm text-gray-400 mb-2">Technical SEO</div>
                <div className="text-3xl font-bold text-white">{overallHealth.technicalSEO}</div>
                <div className="text-xs text-gray-500 mt-1">Schema, Speed, Mobile</div>
              </div>

              {/* On-Page SEO */}
              <div className="bg-[#191A1B] rounded-lg p-4 border border-white/5">
                <div className="text-sm text-gray-400 mb-2">On-Page SEO</div>
                <div className="text-3xl font-bold text-white">{overallHealth.onPageSEO}</div>
                <div className="text-xs text-gray-500 mt-1">Titles, Meta, Headings</div>
              </div>

              {/* Content Quality */}
              <div className="bg-[#191A1B] rounded-lg p-4 border border-white/5">
                <div className="text-sm text-gray-400 mb-2">Content Quality</div>
                <div className="text-3xl font-bold text-white">{overallHealth.contentQuality}</div>
                <div className="text-xs text-gray-500 mt-1">Depth, Keywords, Value</div>
              </div>

              {/* User Experience */}
              <div className="bg-[#191A1B] rounded-lg p-4 border border-white/5">
                <div className="text-sm text-gray-400 mb-2">User Experience</div>
                <div className="text-3xl font-bold text-white">{overallHealth.userExperience}</div>
                <div className="text-xs text-gray-500 mt-1">Images, Layout, CTA</div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#262A2B] rounded-lg p-4 border border-white/5">
              <div className="text-sm text-gray-400 mb-1">Products Analyzed</div>
              <div className="text-3xl font-bold text-white">{summary.productsAnalyzed}</div>
              <div className="text-xs text-gray-500 mt-1">of {summary.totalProducts} total</div>
            </div>

            <div className="bg-[#262A2B] rounded-lg p-4 border border-red-500/20">
              <div className="text-sm text-red-400 mb-1">Critical Issues</div>
              <div className="text-3xl font-bold text-red-400">{summary.criticalIssues}</div>
              <div className="text-xs text-gray-500 mt-1">{summary.highPriorityIssues} high priority</div>
            </div>

            <div className="bg-[#262A2B] rounded-lg p-4 border border-blue-500/20">
              <div className="text-sm text-blue-400 mb-1">Traffic Increase</div>
              <div className="text-3xl font-bold text-blue-400">+{summary.estimatedTrafficIncrease}%</div>
              <div className="text-xs text-gray-500 mt-1">estimated potential</div>
            </div>

            <div className="bg-[#262A2B] rounded-lg p-4 border border-green-500/20">
              <div className="text-sm text-green-400 mb-1">Revenue Increase</div>
              <div className="text-3xl font-bold text-green-400">${summary.estimatedRevenueIncrease.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">estimated monthly</div>
            </div>
          </div>
        )}

        {/* Top Opportunities */}
        {summary && summary.topOpportunities.length > 0 && (
          <div className="bg-[#262A2B] rounded-lg p-6 border border-white/5 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Top ROI Opportunities</h2>
            <div className="space-y-3">
              {summary.topOpportunities.map((opp, idx) => (
                <div key={idx} className="bg-[#191A1B] rounded-lg p-4 border border-white/5 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">{opp.product}</div>
                    <div className="text-white font-medium">{opp.opportunity}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Est. Impact</div>
                    <div className="text-lg font-bold text-green-400">
                      ${opp.estimatedImpact.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Analysis List */}
        {products.length > 0 && (
          <div className="bg-[#262A2B] rounded-lg p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Product Analysis</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.productId}
                  className="bg-[#191A1B] rounded-lg p-4 border border-white/5 cursor-pointer hover:border-blue-500/30 transition-colors"
                  onClick={() => setSelectedProduct(selectedProduct?.productId === product.productId ? null : product)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">Current</div>
                        <div className="text-lg font-bold text-orange-400">{product.currentScore}</div>
                      </div>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">Potential</div>
                        <div className="text-lg font-bold text-green-400">{product.potentialScore}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{product.recommendations.length} recommendations</span>
                    <span>•</span>
                    <span>{product.prioritizedFixes.length} fixes</span>
                  </div>

                  {/* Expanded Details */}
                  {selectedProduct?.productId === product.productId && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <h4 className="text-md font-semibold text-white mb-3">Prioritized Fixes (by ROI)</h4>
                      <div className="space-y-2">
                        {product.prioritizedFixes.slice(0, 5).map((fix, idx) => (
                          <div key={idx} className="bg-[#262A2B] rounded-lg p-3 border border-white/5">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(fix.category)}`}>
                                    {fix.category}
                                  </span>
                                  <span className="text-xs text-gray-500">ROI: {fix.roi.toFixed(1)}x</span>
                                </div>
                                <div className="text-white font-medium">{fix.title}</div>
                                <div className="text-sm text-gray-400 mt-1">{fix.description}</div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-xs text-gray-400 mb-1">Revenue Impact</div>
                                <div className="text-lg font-bold text-green-400">
                                  +${fix.estimatedImpact.revenueIncrease.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !overallHealth && (
          <div className="bg-[#262A2B] rounded-lg p-12 text-center border border-white/5">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Ready for Advanced Analysis</h3>
            <p className="text-gray-400 mb-4">
              Run an AI-powered SEO audit to get world-class recommendations with ROI prioritization
            </p>
            <p className="text-sm text-gray-500">
              Powered by Claude Sonnet 4 - The world's most advanced AI for SEO analysis
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
