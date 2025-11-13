/**
 * Shopify Images Page - Image SEO Optimization Dashboard
 * Shows all product images with alt text analysis and AI-powered optimization
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'
import { authenticatedFetch } from '@/lib/shopify-app-bridge'

interface ImageAsset {
  id: string
  url: string
  altText: string | null
  suggestedAltText: string | null
  hasAltText: boolean
  isOptimized: boolean
  status: string
  priority: number
  width: number | null
  height: number | null
  sizeBytes: number | null
  context: string | null
  pageUrl: string | null
  aiConfidence: number | null
}

interface ImageStats {
  totalImages: number
  missingAlt: number
  needsOptimization: number
  optimized: number
  percentOptimized: number
}

interface ImageListResponse {
  images: ImageAsset[]
  stats: ImageStats
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export default function ShopifyImagesPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  const [images, setImages] = useState<ImageAsset[]>([])
  const [stats, setStats] = useState<ImageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [applying, setApplying] = useState(false)
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const loadImages = useCallback(async () => {
    try {
      setLoading(true)
      const statusParam = filterStatus !== 'all' ? `&status=${filterStatus}` : ''
      const data = await authenticatedFetch<{ success: boolean; data: ImageListResponse }>(`/api/shopify/images?shop=${shop}${statusParam}`)

      if (data.success) {
        setImages(data.data.images)
        setStats(data.data.stats)
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    } finally {
      setLoading(false)
    }
  }, [shop, filterStatus])

  useEffect(() => {
    if (shop) {
      loadImages()
    }
  }, [shop, loadImages])

  const handleScanImages = async () => {
    if (!shop) return

    try {
      setScanning(true)
      const data = await authenticatedFetch<{ success: boolean }>(`/api/shopify/images?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      if (data.success) {
        await loadImages()
      }
    } catch (error) {
      console.error('Failed to scan images:', error)
    } finally {
      setScanning(false)
    }
  }

  const handleGenerateAltText = async () => {
    if (!shop || selectedImages.size === 0) return

    try {
      setGenerating(true)
      const data = await authenticatedFetch<{ success: boolean }>(`/api/shopify/images/generate-alt?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageIds: Array.from(selectedImages),
        }),
      })

      if (data.success) {
        await loadImages()
        setSelectedImages(new Set())
      }
    } catch (error) {
      console.error('Failed to generate alt text:', error)
    } finally {
      setGenerating(false)
    }
  }

  const handleApplyFixes = async () => {
    if (!shop || selectedImages.size === 0) return

    try {
      setApplying(true)
      const data = await authenticatedFetch<{ success: boolean }>(`/api/shopify/images/apply-fixes?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageIds: Array.from(selectedImages),
        }),
      })

      if (data.success) {
        await loadImages()
        setSelectedImages(new Set())
      }
    } catch (error) {
      console.error('Failed to apply fixes:', error)
    } finally {
      setApplying(false)
    }
  }

  const toggleImageSelection = (imageId: string) => {
    const newSelection = new Set(selectedImages)
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId)
    } else {
      newSelection.add(imageId)
    }
    setSelectedImages(newSelection)
  }

  const selectAllVisible = () => {
    const newSelection = new Set(images.map((img) => img.id))
    setSelectedImages(newSelection)
  }

  const clearSelection = () => {
    setSelectedImages(new Set())
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMIZED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'NEEDS_ALT_TEXT':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'NEEDS_OPTIMIZATION':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'ANALYZING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  if (loading && images.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Image SEO Optimization
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            AI-powered alt text generation and image optimization for better search rankings
          </p>
        </header>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Images</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalImages}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Missing Alt Text</p>
            <p className="text-2xl font-bold text-red-600">{stats.missingAlt}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Need Optimization</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.needsOptimization}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Optimized</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.optimized} ({stats.percentOptimized.toFixed(0)}%)
            </p>
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={handleScanImages}
              disabled={scanning}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {scanning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Scan Images
                </>
              )}
            </button>

            {selectedImages.size > 0 && (
              <>
                <button
                  onClick={handleGenerateAltText}
                  disabled={generating}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {generating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      Generate Alt Text ({selectedImages.size})
                    </>
                  )}
                </button>

                <button
                  onClick={handleApplyFixes}
                  disabled={applying}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {applying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Applying...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Apply Fixes ({selectedImages.size})
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          <div className="flex gap-4 items-center">
            {selectedImages.size > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={selectAllVisible}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Select All
                </button>
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400"
                >
                  Clear
                </button>
              </div>
            )}

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Images</option>
              <option value="NEEDS_ALT_TEXT">Missing Alt Text</option>
              <option value="NEEDS_OPTIMIZATION">Needs Optimization</option>
              <option value="ANALYZING">Being Analyzed</option>
              <option value="OPTIMIZED">Optimized</option>
            </select>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No images found
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Click &quot;Scan Images&quot; to discover images from your products
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedImages.size === images.length && images.length > 0}
                      onChange={(e) => (e.target.checked ? selectAllVisible() : clearSelection())}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Alt Text
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    AI Suggestion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {images.map((image) => (
                  <tr key={image.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedImages.has(image.id)}
                        onChange={() => toggleImageSelection(image.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={image.url}
                        alt={image.altText || 'Product image'}
                        className="w-20 h-20 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {image.altText ? (
                        <span className="text-sm text-gray-900 dark:text-white">
                          {image.altText}
                        </span>
                      ) : (
                        <span className="text-sm text-red-600 dark:text-red-400 italic">
                          Missing
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {image.suggestedAltText ? (
                        <div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {image.suggestedAltText}
                          </span>
                          {image.aiConfidence && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({image.aiConfidence}% confidence)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                          Not generated
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          image.status
                        )}`}
                      >
                        {image.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {image.width && image.height && (
                          <div>
                            {image.width}×{image.height}
                          </div>
                        )}
                        <div>{formatFileSize(image.sizeBytes)}</div>
                        {image.context && (
                          <div className="text-blue-600 dark:text-blue-400 capitalize">
                            {image.context}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </main>
    </>
  )
}
