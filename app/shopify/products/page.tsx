/**
 * Shopify Products Page
 * List all products with SEO analysis and fix options
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { sanitizeURL, escapeHTML } from '@/lib/sanitize'
import { toast, confirmDialog } from '@/lib/toast'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

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
  const [filter, setFilter] = useState<'all' | 'issues' | 'good'>('all')

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`/api/shopify/products?shop=${shop}`)
      const data = await response.json()

      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
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
    setAnalyzing(true)
    try {
      const response = await fetch('/api/shopify/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, productId }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh products list
        await fetchProducts()
        toast.success('Analysis complete! Issues have been identified.')
      } else {
        toast.error('Analysis failed: ' + (data.error?.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error analyzing product:', error)
      toast.error('Failed to analyze product')
    } finally {
      setAnalyzing(false)
    }
  }

  const applyFixes = async (productId: string) => {
    const confirmed = await confirmDialog('Apply all SEO fixes to this product?')
    if (!confirmed) return

    try {
      const response = await fetch('/api/shopify/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, productId }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh products list
        await fetchProducts()
        toast.success('Fixes applied successfully!')
      } else {
        toast.error('Failed to apply fixes: ' + (data.error?.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error applying fixes:', error)
      toast.error('Failed to apply fixes')
    }
  }

  const filteredProducts = products.filter((p) => {
    if (filter === 'issues') return p.seoScore < 80
    if (filter === 'good') return p.seoScore >= 80
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      <ShopifyNav shop={shop} />
      <main className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8" role="banner">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Products
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Analyze and optimize your product SEO
              </p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setFilter('issues')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'issues'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Needs Attention ({products.filter((p) => p.seoScore < 80).length})
          </button>
          <button
            onClick={() => setFilter('good')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'good'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Optimized ({products.filter((p) => p.seoScore >= 80).length})
          </button>
          </div>
        </header>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {products.length === 0
              ? 'No products found. Add products to your Shopify store to get started.'
              : 'No products match the selected filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
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
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          /{product.handle}
                        </p>
                      </div>

                      {/* SEO Score Badge */}
                      <div
                        className={`px-4 py-2 rounded-lg font-bold text-lg ${
                          product.seoScore >= 80
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                            : product.seoScore >= 60
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {product.seoScore}
                      </div>
                    </div>

                    {/* SEO Details */}
                    <div className="mb-4 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          SEO Title:{' '}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.seo.title || '(Not set)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          SEO Description:{' '}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.seo.description || '(Not set)'}
                        </span>
                      </div>
                    </div>

                    {/* Issues */}
                    {product.issues.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Issues Found:
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {product.issues.map((issue, idx) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => analyzeProduct(product.id)}
                        disabled={analyzing}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                      >
                        {analyzing ? 'Analyzing...' : 'Analyze SEO'}
                      </button>

                      {product.issues.length > 0 && (
                        <button
                          onClick={() => applyFixes(product.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Apply Fixes
                        </button>
                      )}

                      <a
                        href={`https://${shop}/admin/products/${product.id.split('/').pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-sm font-medium"
                      >
                        View in Shopify
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </main>
    </>
  )
}
