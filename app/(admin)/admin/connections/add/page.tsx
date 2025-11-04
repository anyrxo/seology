'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddConnectionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; oauthUrl?: string } | null>(null)
  const [formData, setFormData] = useState({
    userEmail: '',
    shopDomain: '',
    accessToken: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/admin/connections/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add connection')
      }

      setResult({
        success: true,
        message: data.message,
        oauthUrl: data.oauthUrl,
      })

      // If connection was created (not OAuth), reset form
      if (!data.requiresOAuth) {
        setFormData({ userEmail: '', shopDomain: '', accessToken: '' })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Shopify Connection for User
          </h1>
          <p className="text-gray-600">
            Manually connect a Shopify store to a user's account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                placeholder="client@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                The SEOLOGY user who owns this store
              </p>
            </div>

            {/* Shop Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shopify Store Domain <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.shopDomain}
                onChange={(e) => setFormData({ ...formData, shopDomain: e.target.value })}
                placeholder="mystore.myshopify.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Must be a .myshopify.com domain
              </p>
            </div>

            {/* Access Token */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shopify Admin API Access Token (Optional)
              </label>
              <textarea
                value={formData.accessToken}
                onChange={(e) => setFormData({ ...formData, accessToken: e.target.value })}
                placeholder="shpat_..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                If empty, system will generate OAuth link for client to authorize
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {loading ? 'Processing...' : 'Add Connection'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/admin/connections')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Result Message */}
        {result && (
          <div
            className={`p-6 rounded-lg ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {result.success ? (
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                  {result.success ? 'Success!' : 'Error'}
                </h3>
                <div className={`mt-2 text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  <p>{result.message}</p>
                </div>
                {result.oauthUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-green-800 mb-2">
                      Send this OAuth link to the client:
                    </p>
                    <div className="bg-white p-4 rounded border border-green-300 break-all">
                      <code className="text-xs">{result.oauthUrl}</code>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(result.oauthUrl!)
                        alert('OAuth URL copied to clipboard!')
                      }}
                      className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                    >
                      Copy OAuth URL
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">How to Get Shopify Credentials</h2>

          <div className="space-y-6">
            {/* Option 1 */}
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Option 1: Custom App (Recommended)</h3>
              <ol className="list-decimal ml-5 space-y-2 text-sm text-blue-900">
                <li>Log into client's Shopify admin</li>
                <li>
                  Go to <span className="font-mono bg-blue-100 px-1 rounded">Settings → Apps and sales channels</span>
                </li>
                <li>
                  Click <span className="font-mono bg-blue-100 px-1 rounded">Develop apps</span> →{' '}
                  <span className="font-mono bg-blue-100 px-1 rounded">Create an app</span>
                </li>
                <li>
                  Name it <span className="font-semibold">SEOLOGY SEO Automation</span>
                </li>
                <li>Configure API scopes (see below)</li>
                <li>
                  Install app → Copy <span className="font-mono bg-blue-100 px-1 rounded">Admin API access token</span>
                </li>
                <li>Paste token in the form above</li>
              </ol>
            </div>

            {/* Option 2 */}
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Option 2: OAuth Flow (If no token)</h3>
              <ol className="list-decimal ml-5 space-y-2 text-sm text-blue-900">
                <li>
                  Leave <span className="font-mono bg-blue-100 px-1 rounded">Access Token</span> field empty
                </li>
                <li>System generates OAuth link</li>
                <li>Copy OAuth URL from success message</li>
                <li>Send link to client via email</li>
                <li>Client clicks → Authorizes</li>
                <li>Connection auto-created</li>
              </ol>
            </div>

            {/* Required Scopes */}
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Required API Scopes</h3>
              <pre className="bg-white p-4 rounded border border-blue-300 text-xs overflow-x-auto">
                read_products, write_products{'\n'}
                read_content, write_content{'\n'}
                read_themes, write_themes{'\n'}
                read_analytics{'\n'}
                read_online_store_pages, write_online_store_pages
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
