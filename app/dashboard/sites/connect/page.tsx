'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Platform = 'SHOPIFY' | 'WORDPRESS' | 'CUSTOM' | null

export default function ConnectSitePage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/sites"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center mb-4"
        >
          ← Back to Sites
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Connect a New Site</h1>
        <p className="text-gray-400">
          Choose your platform to start automating SEO with Claude AI
        </p>
      </div>

      {/* Platform Selection */}
      {!selectedPlatform && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PlatformCard
            title="Shopify Store"
            description="Connect your Shopify store via OAuth for seamless integration"
            icon="🛍️"
            features={[
              'One-click OAuth connection',
              'Auto-fix product SEO',
              'Meta tags optimization',
              'Image alt text updates',
            ]}
            onClick={() => setSelectedPlatform('SHOPIFY')}
            recommended
          />
          <PlatformCard
            title="WordPress Site"
            description="Connect via REST API or WordPress plugin"
            icon="📝"
            features={[
              'REST API connection',
              'Plugin support (optional)',
              'Content SEO optimization',
              'Schema markup fixes',
            ]}
            onClick={() => setSelectedPlatform('WORDPRESS')}
          />
          <PlatformCard
            title="Any Website"
            description="Universal JavaScript snippet for custom sites"
            icon="⚡"
            features={[
              'Simple script integration',
              'Works on any platform',
              'Client-side fixes',
              'No backend required',
            ]}
            onClick={() => setSelectedPlatform('CUSTOM')}
          />
        </div>
      )}

      {/* Shopify Connection Flow */}
      {selectedPlatform === 'SHOPIFY' && (
        <ShopifyConnectForm
          onBack={() => setSelectedPlatform(null)}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {/* WordPress Connection Flow */}
      {selectedPlatform === 'WORDPRESS' && (
        <WordPressConnectForm
          onBack={() => setSelectedPlatform(null)}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {/* Custom Site Connection Flow */}
      {selectedPlatform === 'CUSTOM' && (
        <CustomSiteConnectForm
          onBack={() => setSelectedPlatform(null)}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  )
}

function PlatformCard({
  title,
  description,
  icon,
  features,
  onClick,
  recommended = false,
}: {
  title: string
  description: string
  icon: string
  features: string[]
  onClick: () => void
  recommended?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-900 border border-gray-800 hover:border-blue-500 rounded-lg p-6 text-left transition-all group hover:scale-105 relative"
    >
      {recommended && (
        <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Recommended
        </div>
      )}
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-300">
            <svg
              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 font-medium">
        Connect Now
        <svg
          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  )
}

function ShopifyConnectForm({
  onBack,
  loading,
  setLoading,
}: {
  onBack: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
}) {
  const [shopDomain, setShopDomain] = useState('')

  const handleConnect = async () => {
    if (!shopDomain) return

    setLoading(true)
    // Redirect to Shopify OAuth
    window.location.href = `/api/auth/shopify?shop=${shopDomain}`
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm"
      >
        ← Change Platform
      </button>

      <div className="flex items-start space-x-4 mb-6">
        <div className="text-5xl">🛍️</div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect Shopify Store</h2>
          <p className="text-gray-400">
            We'll redirect you to Shopify to authorize SEOLOGY.AI
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Shopify Store Domain
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={shopDomain}
              onChange={(e) => setShopDomain(e.target.value.replace(/[^a-z0-9-]/gi, ''))}
              placeholder="your-store"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <div className="bg-gray-700 border border-gray-700 rounded-r-lg px-4 py-3 text-gray-400">
              .myshopify.com
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Example: my-awesome-store (without .myshopify.com)
          </p>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            What we'll access
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Product titles and descriptions (to optimize SEO)</li>
            <li>• Meta tags and page titles</li>
            <li>• Image alt text attributes</li>
            <li>• Theme files (for meta tag updates)</li>
          </ul>
        </div>

        <button
          onClick={handleConnect}
          disabled={!shopDomain || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? 'Connecting...' : 'Connect to Shopify'}
        </button>
      </div>
    </div>
  )
}

function WordPressConnectForm({
  onBack,
  loading,
  setLoading,
}: {
  onBack: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
}) {
  const router = useRouter()
  const [siteUrl, setSiteUrl] = useState('')
  const [username, setUsername] = useState('')
  const [appPassword, setAppPassword] = useState('')

  const handleConnect = async () => {
    if (!siteUrl || !username || !appPassword) return

    setLoading(true)

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'WORDPRESS',
          domain: siteUrl.replace(/^https?:\/\//, ''),
          displayName: siteUrl,
          credentials: {
            username,
            appPassword,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/dashboard/sites')
      } else {
        alert('Failed to connect: ' + data.error)
        setLoading(false)
      }
    } catch (error) {
      alert('Connection failed')
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm"
      >
        ← Change Platform
      </button>

      <div className="flex items-start space-x-4 mb-6">
        <div className="text-5xl">📝</div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect WordPress Site</h2>
          <p className="text-gray-400">
            Connect via REST API with Application Password
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            WordPress Site URL
          </label>
          <input
            type="url"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://your-wordpress-site.com"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            WordPress Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Application Password
          </label>
          <input
            type="password"
            value={appPassword}
            onChange={(e) => setAppPassword(e.target.value)}
            placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-2">
            Generate this in WordPress: Users → Profile → Application Passwords
          </p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            How to create Application Password
          </h4>
          <ol className="text-sm text-gray-300 space-y-1 ml-7">
            <li>1. Log in to WordPress admin panel</li>
            <li>2. Go to Users → Profile</li>
            <li>3. Scroll to "Application Passwords"</li>
            <li>4. Enter "SEOLOGY.AI" as name and click "Add New"</li>
            <li>5. Copy the generated password here</li>
          </ol>
        </div>

        <button
          onClick={handleConnect}
          disabled={!siteUrl || !username || !appPassword || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? 'Connecting...' : 'Connect WordPress Site'}
        </button>
      </div>
    </div>
  )
}

function CustomSiteConnectForm({
  onBack,
  loading,
  setLoading,
}: {
  onBack: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
}) {
  const router = useRouter()
  const [siteUrl, setSiteUrl] = useState('')
  const [siteName, setSiteName] = useState('')

  const handleConnect = async () => {
    if (!siteUrl || !siteName) return

    setLoading(true)

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'CUSTOM',
          domain: siteUrl.replace(/^https?:\/\//, ''),
          displayName: siteName,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/dashboard/sites/${data.data.id}`)
      } else {
        alert('Failed to connect: ' + data.error)
        setLoading(false)
      }
    } catch (error) {
      alert('Connection failed')
      setLoading(false)
    }
  }

  const snippetCode = `<!-- SEOLOGY.AI Magic Script -->
<script src="https://cdn.seology.ai/magic.js" data-site-id="YOUR_SITE_ID"></script>
<!-- End SEOLOGY.AI -->`

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
      <button
        onClick={onBack}
        className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm"
      >
        ← Change Platform
      </button>

      <div className="flex items-start space-x-4 mb-6">
        <div className="text-5xl">⚡</div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect Any Website</h2>
          <p className="text-gray-400">
            Universal JavaScript connector for custom sites
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="My Awesome Website"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Website URL
          </label>
          <input
            type="url"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">Installation Instructions</h4>
          <p className="text-sm text-gray-400 mb-4">
            After connecting, you'll receive a unique script to add to your website's{' '}
            <code className="bg-gray-700 px-2 py-1 rounded text-blue-400">&lt;head&gt;</code>{' '}
            tag:
          </p>
          <pre className="bg-gray-950 border border-gray-700 rounded p-4 text-sm text-gray-300 overflow-x-auto">
            {snippetCode}
          </pre>
        </div>

        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            How it works
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Our AI analyzes your site and detects SEO issues</li>
            <li>• Fixes are generated and served via JavaScript</li>
            <li>• Changes apply instantly on the client-side</li>
            <li>• Works with any website platform</li>
          </ul>
        </div>

        <button
          onClick={handleConnect}
          disabled={!siteUrl || !siteName || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? 'Creating...' : 'Create Site & Get Script'}
        </button>
      </div>
    </div>
  )
}
