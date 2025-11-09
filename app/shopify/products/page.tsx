/**
 * Shopify Products Page
 * List all products with SEO analysis and fix options
 * Atlas dark theme (#191A1B, #262A2B)
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { sanitizeURL, escapeHTML } from '@/lib/sanitize'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'
import { SEOScoreBadge } from '@/components/seo/SEOScoreCard'
import { SEOIssueCard, type SEOIssue, type SEOIssueSeverity, type SEOIssueType } from '@/components/seo/SEOIssueCard'
import { authenticatedFetch } from '@/lib/shopify-app-bridge'

// Notification component
interface NotificationProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-4 right-4 z-50 min-w-[300px] rounded-lg shadow-lg p-4 ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Confirmation modal component
interface ConfirmModalProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#262A2B] rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Apply Fixes
          </button>
        </div>
      </div>
    </div>
  )
}

interface Product {
  id: string
  title: string
  description: string
  handle: string
  seo: {
    title: string | null
    description: string | null
  }
  featuredImage: {
    url: string
    altText: string | null
  } | null
  issues: string[]
  seoScore: number
}

export default function ShopifyProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzingProductId, setAnalyzingProductId] = useState<string | null>(null)
  const [fixingProductId, setFixingProductId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'issues' | 'good'>('all')
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingFixProductId, setPendingFixProductId] = useState<string | null>(null)

  // Helper functions for notifications
  const showSuccessToast = (message: string) => setNotification({ message, type: 'success' })
  const showErrorToast = (message: string) => setNotification({ message, type: 'error' })

  const fetchProducts = useCallback(async () => {
    try {
      const data = await authenticatedFetch<{ success: boolean; data?: Product[]; error?: { message: string } }>(`/api/shopify/products?shop=${shop}`)

      if (data.success) {
        setProducts(data.data || [])
        setError(null)
      } else {
        setError(data.error?.message || 'Failed to load products')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [shop])

  useEffect(() => {
    if (!shop) {
      setLoading(false)
      return
    }

    fetchProducts()
  }, [shop, fetchProducts])

  const analyzeProduct = async (productId: string) => {
    setAnalyzingProductId(productId)
    setAnalyzing(true)
    try {
      const data = await authenticatedFetch<{ success: boolean; error?: { message: string } }>('/api/shopify/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, productId }),
      })

      if (data.success) {
        // Refresh products list
        await fetchProducts()
        showSuccessToast('Analysis complete! Issues have been identified.')
      } else {
        showErrorToast('Analysis failed: ' + (data.error?.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error analyzing product:', error)
      showErrorToast('Failed to analyze product')
    } finally {
      setAnalyzingProductId(null)
      setAnalyzing(false)
    }
  }

  const applyFixes = async (productId: string) => {
    // Show confirmation modal
    setPendingFixProductId(productId)
    setShowConfirmModal(true)
  }

  const handleConfirmFixes = async () => {
    setShowConfirmModal(false)
    if (!pendingFixProductId) return

    const productId = pendingFixProductId
    setPendingFixProductId(null)
    setFixingProductId(productId)
    try {
      const data = await authenticatedFetch<{ success: boolean; error?: { message: string } }>('/api/shopify/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, productId }),
      })

      if (data.success) {
        // Refresh products list
        await fetchProducts()
        showSuccessToast('Fixes applied successfully!')
      } else {
        showErrorToast('Failed to apply fixes: ' + (data.error?.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error applying fixes:', error)
      showErrorToast('Failed to apply fixes')
    } finally {
      setFixingProductId(null)
    }
  }

  const filteredProducts = products.filter((p) => {
    if (filter === 'issues') return p.seoScore < 80
    if (filter === 'good') return p.seoScore >= 80
    return true
  })

  // Convert product issues to SEOIssue format for the SEOIssueCard component
  const convertProductIssuesToSEOIssues = (product: Product): SEOIssue[] => {
    return product.issues.map((issue, idx) => {
      // Determine issue type and severity based on the issue text
      let type: SEOIssueType = 'missing_meta_title'
      let severity: SEOIssueSeverity = 'medium'
      let impact = 50
      let canAutoFix = true
      let estimatedTraffic = 0

      // Parse issue text to determine type and severity
      if (issue.toLowerCase().includes('meta title') || issue.toLowerCase().includes('seo title')) {
        type = 'missing_meta_title'
        severity = 'critical'
        impact = 85
        estimatedTraffic = 150
      } else if (issue.toLowerCase().includes('meta description') || issue.toLowerCase().includes('seo description')) {
        type = 'missing_meta_description'
        severity = 'high'
        impact = 75
        estimatedTraffic = 100
      } else if (issue.toLowerCase().includes('alt text') || issue.toLowerCase().includes('image')) {
        type = 'missing_alt_text'
        severity = 'medium'
        impact = 60
        estimatedTraffic = 50
      } else if (issue.toLowerCase().includes('title') && issue.toLowerCase().includes('short')) {
        type = 'poor_title'
        severity = 'high'
        impact = 70
        estimatedTraffic = 80
      } else if (issue.toLowerCase().includes('description') && issue.toLowerCase().includes('short')) {
        type = 'short_description'
        severity = 'medium'
        impact = 65
        estimatedTraffic = 60
      } else if (issue.toLowerCase().includes('url') || issue.toLowerCase().includes('handle')) {
        type = 'long_url'
        severity = 'low'
        impact = 40
        estimatedTraffic = 20
      }

      return {
        id: `${product.id}-issue-${idx}`,
        type,
        title: issue,
        description: issue,
        severity,
        impact,
        affectedPages: 1,
        estimatedTraffic,
        canAutoFix,
        recommendation: `Fix this issue to improve your product's SEO score and visibility in search results.`,
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191A1B] flex">
        <ShopifyAppNav />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="h-8 bg-[#262A2B] rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-[#262A2B] rounded w-96 animate-pulse"></div>
          </div>

          <div className="flex gap-2 mb-8">
            <div className="h-10 bg-[#262A2B] rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-[#262A2B] rounded-lg w-40 animate-pulse"></div>
            <div className="h-10 bg-[#262A2B] rounded-lg w-32 animate-pulse"></div>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#262A2B] rounded-lg shadow-lg p-6 animate-pulse border border-white/5">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-[#191A1B] rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-[#191A1B] rounded w-1/3"></div>
                    <div className="h-4 bg-[#191A1B] rounded w-1/4"></div>
                    <div className="h-4 bg-[#191A1B] rounded w-2/3"></div>
                    <div className="flex gap-3">
                      <div className="h-10 bg-[#191A1B] rounded w-32"></div>
                      <div className="h-10 bg-[#191A1B] rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#191A1B] flex">
      <ShopifyAppNav />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmModal
          title="Apply SEO Fixes"
          message="Apply all SEO fixes to this product?"
          onConfirm={handleConfirmFixes}
          onCancel={() => {
            setShowConfirmModal(false)
            setPendingFixProductId(null)
          }}
        />
      )}

      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8" role="banner">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Products
              </h1>
              <p className="text-gray-400">
                Analyze and optimize your product SEO
              </p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-300 mb-1">
                    Failed to Load Products
                  </h3>
                  <p className="text-red-400 mb-3">
                    {error}
                  </p>
                  <button
                    onClick={() => {
                      setError(null)
                      setLoading(true)
                      fetchProducts()
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          {!error && <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setFilter('issues')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'issues'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
            }`}
          >
            Needs Attention ({products.filter((p) => p.seoScore < 80).length})
          </button>
          <button
            onClick={() => setFilter('good')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'good'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
            }`}
          >
            Optimized ({products.filter((p) => p.seoScore >= 80).length})
          </button>
        </div>}
        </header>

      {/* Products Grid */}
      {!error && filteredProducts.length === 0 ? (
        <div className="bg-[#262A2B] rounded-lg shadow-lg p-8 text-center border border-white/5">
          <p className="text-gray-400">
            {products.length === 0
              ? 'No products found. Add products to your Shopify store to get started.'
              : 'No products match the selected filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6" data-testid="products-list">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#262A2B] rounded-lg shadow-lg hover:shadow-xl transition-all border border-white/5 hover:border-white/10"
              data-testid="product-card"
            >
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  {product.featuredImage && (
                    <div className="flex-shrink-0">
                      <img
                        src={sanitizeURL(product.featuredImage.url)}
                        alt={escapeHTML(product.featuredImage.altText || product.title)}
                        className="w-24 h-24 object-cover rounded-lg"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.png'
                          e.currentTarget.onerror = null
                        }}
                      />
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          /{product.handle}
                        </p>
                      </div>

                      {/* SEO Score Badge */}
                      <SEOScoreBadge
                        score={product.seoScore}
                        maxScore={100}
                        size="lg"
                        showLabel={true}
                      />
                    </div>

                    {/* SEO Details */}
                    <div className="mb-4 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-300">
                          SEO Title:{' '}
                        </span>
                        <span className="text-sm text-gray-400">
                          {product.seo.title || '(Not set)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-300">
                          SEO Description:{' '}
                        </span>
                        <span className="text-sm text-gray-400">
                          {product.seo.description || '(Not set)'}
                        </span>
                      </div>
                    </div>

                    {/* Issues */}
                    {product.issues.length > 0 && (
                      <div className="mb-4 space-y-3">
                        <h4 className="text-sm font-medium text-gray-300">
                          Issues Found ({product.issues.length}):
                        </h4>
                        <div className="space-y-2">
                          {convertProductIssuesToSEOIssues(product).map((issue) => (
                            <SEOIssueCard
                              key={issue.id}
                              issue={issue}
                              onFix={() => applyFixes(product.id)}
                              isFixing={fixingProductId === product.id}
                              className="shadow-sm"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => analyzeProduct(product.id)}
                        disabled={analyzingProductId === product.id || fixingProductId === product.id}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center gap-2"
                        data-testid="analyze-button"
                      >
                        {analyzingProductId === product.id ? (
                          <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Analyze SEO
                          </>
                        )}
                      </button>

                      {product.issues.length > 0 && (
                        <button
                          onClick={() => applyFixes(product.id)}
                          disabled={analyzingProductId === product.id || fixingProductId === product.id}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center gap-2"
                          data-testid="fix-button"
                        >
                          {fixingProductId === product.id ? (
                            <>
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Applying...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Apply Fixes
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </main>
    </div>
  )
}
