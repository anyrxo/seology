'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

export default function ConnectPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Connect Your Website</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Choose your platform to get started with SEO automation
        </p>
      </div>

      {/* Platform Selection */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PlatformCard
          name="Shopify"
          description="E-commerce stores on Shopify"
          icon="🛍️"
          features={['OAuth integration', 'Product SEO', 'Theme optimization']}
          recommended
          onSelect={() => setSelectedPlatform('shopify')}
          selected={selectedPlatform === 'shopify'}
        />
        <PlatformCard
          name="WordPress"
          description="Blogs and websites on WordPress"
          icon="📝"
          features={['REST API', 'Yoast SEO support', 'Post optimization']}
          onSelect={() => setSelectedPlatform('wordpress')}
          selected={selectedPlatform === 'wordpress'}
        />
        <PlatformCard
          name="Custom / Other"
          description="Any website with JavaScript"
          icon="🌐"
          features={['Universal snippet', 'Client-side fixes', 'Any platform']}
          onSelect={() => setSelectedPlatform('custom')}
          selected={selectedPlatform === 'custom'}
        />
      </div>

      {/* Connection Form */}
      {selectedPlatform && (
        <div className="mt-8 rounded-lg border bg-white p-6 dark:bg-gray-950">
          {selectedPlatform === 'shopify' && <ShopifyConnect />}
          {selectedPlatform === 'wordpress' && <WordPressConnect />}
          {selectedPlatform === 'custom' && <CustomConnect />}
        </div>
      )}
    </div>
  )
}

function PlatformCard({
  name,
  description,
  icon,
  features,
  recommended,
  onSelect,
  selected,
}: {
  name: string
  description: string
  icon: string
  features: string[]
  recommended?: boolean
  onSelect: () => void
  selected: boolean
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative rounded-lg border-2 p-6 text-left transition-all ${
        selected
          ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
          : 'border-gray-200 bg-white hover:border-green-300 dark:border-gray-800 dark:bg-gray-950'
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 right-4 rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
          Recommended
        </div>
      )}
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            {feature}
          </li>
        ))}
      </ul>
    </button>
  )
}

function ShopifyConnect() {
  const [shop, setShop] = useState('')
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/auth/shopify?shop=${shop}`)
      const data = await response.json()
      if (data.success && data.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error('Shopify connection error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Connect Shopify Store</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Enter your Shopify store URL to connect via OAuth
      </p>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Store URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              placeholder="example-store"
              className="h-10 flex-1 rounded-lg border px-4 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <span className="flex items-center text-sm text-gray-600">.myshopify.com</span>
          </div>
        </div>
        <Button
          onClick={handleConnect}
          disabled={!shop || loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Connecting...' : 'Connect Shopify Store'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function WordPressConnect() {
  const [siteUrl, setSiteUrl] = useState('')
  const [username, setUsername] = useState('')
  const [appPassword, setAppPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/connections/wordpress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl, username, applicationPassword: appPassword }),
      })
      const data = await response.json()
      if (data.success) {
        window.location.href = `/dashboard/sites/${data.connection.id}?connected=true`
      }
    } catch (error) {
      console.error('WordPress connection error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Connect WordPress Site</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Use Application Passwords to securely connect your WordPress site
      </p>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Site URL</label>
          <input
            type="url"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://myblog.com"
            className="h-10 w-full rounded-lg border px-4 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">WordPress Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="h-10 w-full rounded-lg border px-4 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Application Password</label>
          <input
            type="password"
            value={appPassword}
            onChange={(e) => setAppPassword(e.target.value)}
            placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
            className="h-10 w-full rounded-lg border px-4 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Generate in WordPress: Users → Profile → Application Passwords
          </p>
        </div>
        <Button
          onClick={handleConnect}
          disabled={!siteUrl || !username || !appPassword || loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Connecting...' : 'Connect WordPress Site'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function CustomConnect() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Connect Custom Website</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Add this JavaScript snippet to your website to enable SEO automation
      </p>
      <div className="rounded-lg bg-gray-900 p-4">
        <code className="text-sm text-green-400">
          {`<script src="https://cdn.seology.ai/magic.js"
  data-site-id="your-site-id"></script>`}
        </code>
      </div>
      <Button className="w-full bg-green-600 hover:bg-green-700">
        Generate Your Snippet
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
