'use client'

/**
 * Shopify Store Overview Component
 *
 * Displays store analytics, SEO score, and prioritized products
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, AlertTriangle, CheckCircle, Package, DollarSign, BarChart3 } from 'lucide-react'

interface ShopifyOverviewProps {
  connectionId: string
}

interface StoreStats {
  name: string
  domain: string
  productsAnalyzed: number
  averageSeoScore: number
  criticalIssuesCount: number
  currency: string
}

interface TopProduct {
  id: string
  title: string
  handle: string
  revenue30Days: number
  seoScore: number
  priority: number
  issues: string[]
}

export function ShopifyOverview({ connectionId }: ShopifyOverviewProps) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StoreStats | null>(null)
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOverview()
  }, [connectionId])

  const fetchOverview = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/shopify/overview?connectionId=${connectionId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch store overview')
      }

      const data = await response.json()
      setStats(data.store)
      setTopProducts(data.topProducts || [])
    } catch (err) {
      console.error('Error fetching overview:', err)
      setError('Failed to load store overview')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <p>{error || 'Failed to load store overview'}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate SEO health status
  const getSeoHealthStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-600', textColor: 'text-green-600' }
    if (score >= 60) return { label: 'Good', color: 'bg-blue-600', textColor: 'text-blue-600' }
    if (score >= 40) return { label: 'Fair', color: 'bg-yellow-600', textColor: 'text-yellow-600' }
    return { label: 'Needs Work', color: 'bg-red-600', textColor: 'text-red-600' }
  }

  const healthStatus = getSeoHealthStatus(stats.averageSeoScore)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SEO Health Score */}
        <Card>
          <CardHeader>
            <CardDescription>Average SEO Score</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <div className={`text-4xl font-bold ${healthStatus.textColor}`}>
                {stats.averageSeoScore}
              </div>
              <Badge className={healthStatus.color}>
                {healthStatus.label}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart3 className="h-4 w-4" />
              Based on {stats.productsAnalyzed} products
            </div>
          </CardContent>
        </Card>

        {/* Products Analyzed */}
        <Card>
          <CardHeader>
            <CardDescription>Products Analyzed</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="text-4xl font-bold text-gray-900">
                {stats.productsAnalyzed}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-600" />
              SEO data collected
            </div>
          </CardContent>
        </Card>

        {/* Critical Issues */}
        <Card>
          <CardHeader>
            <CardDescription>Products Needing Attention</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="text-4xl font-bold text-gray-900">
                {stats.criticalIssuesCount}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              SEO score below 60
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Priority Products */}
      {topProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Priority Products</CardTitle>
            <CardDescription>
              Products prioritized by revenue impact and SEO issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.handle}</p>
                    {product.issues && product.issues.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {product.issues.slice(0, 3).map((issue, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                        <DollarSign className="h-4 w-4" />
                        {product.revenue30Days.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </div>
                      <p className="text-xs text-gray-500">Est. revenue</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${getSeoHealthStatus(product.seoScore).textColor}`}>
                        {product.seoScore}
                      </div>
                      <p className="text-xs text-gray-500">SEO score</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-purple-600">
                        {product.priority}
                      </div>
                      <p className="text-xs text-gray-500">Priority</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
