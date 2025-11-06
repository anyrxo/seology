'use client'

/**
 * Shopify Connection UI Component
 *
 * Displays connection status and provides OAuth flow initiation
 */

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Store, TrendingUp, Package, Layers } from 'lucide-react'

interface ShopifyConnectionProps {
  userId: string
  onConnectionComplete?: () => void
}

interface ConnectionData {
  id: string
  platform: string
  domain: string
  displayName: string
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR'
  lastSync: string
  credentials: {
    name: string
    email: string
    productCount: number
    collectionCount: number
    currency: string
    planName: string
  }
}

export function ShopifyConnection({ userId, onConnectionComplete }: ShopifyConnectionProps) {
  const [shopDomain, setShopDomain] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connection, setConnection] = useState<ConnectionData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch existing connection on mount
  useEffect(() => {
    fetchConnection()
  }, [userId])

  const fetchConnection = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/connections/shopify')

      if (response.ok) {
        const data = await response.json()
        if (data.connection) {
          setConnection(data.connection)
        }
      }
    } catch (err) {
      console.error('Error fetching connection:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async () => {
    if (!shopDomain) {
      setError('Please enter your Shopify store domain')
      return
    }

    // Validate domain format
    let domain = shopDomain.trim()
    if (!domain.includes('.')) {
      domain = `${domain}.myshopify.com`
    }
    if (!domain.endsWith('.myshopify.com')) {
      setError('Please enter a valid Shopify domain (e.g., mystore.myshopify.com)')
      return
    }

    setError(null)
    setIsConnecting(true)

    try {
      // Initiate OAuth flow
      window.location.href = `/api/auth/shopify?shop=${encodeURIComponent(domain)}`
    } catch (err) {
      setError('Failed to connect to Shopify')
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    if (!connection) return

    if (!confirm('Are you sure you want to disconnect your Shopify store? This will stop all SEO optimizations.')) {
      return
    }

    try {
      const response = await fetch(`/api/connections/${connection.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setConnection(null)
        setShopDomain('')
      } else {
        setError('Failed to disconnect store')
      }
    } catch (err) {
      setError('Failed to disconnect store')
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Connected state
  if (connection && connection.status === 'CONNECTED') {
    const creds = connection.credentials
    const lastSyncDate = new Date(connection.lastSync).toLocaleDateString()

    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Store className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">{creds.name}</CardTitle>
                <CardDescription className="text-green-700">
                  {connection.domain}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Store Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Package className="h-4 w-4" />
                  Products
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {creds.productCount.toLocaleString()}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Layers className="h-4 w-4" />
                  Collections
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {creds.collectionCount.toLocaleString()}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  Plan
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {creds.planName}
                </div>
              </div>
            </div>

            {/* Store Details */}
            <div className="bg-white p-4 rounded-lg border border-green-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{creds.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Currency:</span>
                <span className="font-medium text-gray-900">{creds.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Synced:</span>
                <span className="font-medium text-gray-900">{lastSyncDate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={fetchConnection}
                variant="outline"
                className="flex-1"
              >
                Refresh Data
              </Button>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Disconnect Store
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Not connected state
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Store className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle>Connect Your Shopify Store</CardTitle>
            <CardDescription>
              Start optimizing your store's SEO with AI-powered fixes
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Connection Form */}
          <div className="space-y-3">
            <div>
              <label htmlFor="shop-domain" className="block text-sm font-medium text-gray-700 mb-2">
                Shopify Store Domain
              </label>
              <Input
                id="shop-domain"
                type="text"
                placeholder="mystore.myshopify.com"
                value={shopDomain}
                onChange={(e) => setShopDomain(e.target.value)}
                disabled={isConnecting}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleConnect()
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your store's myshopify.com domain (e.g., mystore.myshopify.com)
              </p>
            </div>

            <Button
              onClick={handleConnect}
              disabled={isConnecting || !shopDomain}
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                'Connect Shopify Store'
              )}
            </Button>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <p className="font-medium text-sm text-blue-900">What you'll get:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                AI-powered SEO analysis of all products & collections
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                Automatic SEO fixes prioritized by revenue impact
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                Conversational AI chat for custom optimizations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                Real-time progress tracking and analytics
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
