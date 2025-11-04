'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, AlertCircle } from 'lucide-react'

interface WordPressConnectionClientProps {
  domain?: string
  requestId?: string
}

export default function WordPressConnectionClient({
  domain,
  requestId,
}: WordPressConnectionClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    siteUrl: domain || '',
    username: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/connections/wordpress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          requestId,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to connect WordPress site')
      }

      alert('✅ WordPress site connected successfully!')
      router.push('/dashboard/sites')
    } catch (error) {
      alert('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="rt-component-section">
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px">
              <div className="text-300">📝</div>
            </div>
            <div className="flex-vertical">
              <h1 className="rt-component-heading-two text-500 bold text-white">
                Connect WordPress Site
              </h1>
              <p className="rt-text-block text-200 text-gray-400">
                Connect your WordPress site using REST API with Application Passwords
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="card pd-24px bg-blue-500/10 border border-blue-500/30">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-200 bold text-blue-300 mb-2">How WordPress Connection Works</h3>
              <p className="text-100 text-blue-200 mb-2">
                SEOLOGY connects to your WordPress site using the built-in REST API with Application Passwords.
                This is secure and doesn't require installing any plugins.
              </p>
              <ul className="text-100 text-blue-200 space-y-1 list-disc list-inside">
                <li>Uses your WordPress's native REST API (enabled by default)</li>
                <li>Application Passwords are more secure than regular passwords</li>
                <li>You can revoke access anytime from your WordPress profile</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="card pd-32px">
          <h2 className="text-400 bold text-white mb-6">Setup Instructions</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-200 bold text-white mb-2">Verify REST API is Enabled</h3>
                <p className="text-100 text-gray-400 mb-2">
                  WordPress REST API is enabled by default. Test it by visiting:
                </p>
                <div className="bg-gray-900 p-3 rounded-lg font-mono text-sm text-blue-400 break-all">
                  {domain || 'your-site.com'}/wp-json/
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  You should see a JSON response with site information
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-200 bold text-white mb-2">Create Application Password</h3>
                <p className="text-100 text-gray-400 mb-2">In your WordPress admin dashboard:</p>
                <ol className="list-decimal ml-4 space-y-1 text-100 text-gray-400 mb-3">
                  <li>Go to <code className="bg-gray-900 px-2 py-0.5 rounded text-blue-400">Users → Profile</code></li>
                  <li>Scroll down to "Application Passwords" section</li>
                  <li>Enter name: <code className="bg-gray-900 px-2 py-0.5 rounded text-blue-400">SEOLOGY</code></li>
                  <li>Click "Add New Application Password"</li>
                  <li>Copy the generated password (you'll use it below)</li>
                </ol>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-3">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    ⚠️ <strong>Important:</strong> Save this password now - WordPress won't show it again!
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-200 bold text-white mb-2">Enter Credentials Below</h3>
                <p className="text-100 text-gray-400">
                  Fill in the form with your WordPress username and the application password you just created
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Form */}
        <div className="card pd-32px">
          <h2 className="text-400 bold text-white mb-6">WordPress Credentials</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Site URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.siteUrl}
                onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                placeholder="https://your-site.com"
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Full URL of your WordPress site</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                WordPress Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="admin"
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Your WordPress admin username</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Application Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">
                The application password you generated (not your regular WordPress password)
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-300">
                🔒 <strong>Security:</strong> Your credentials are encrypted using AES-256-GCM and stored securely.
                We'll only use them to make authorized API calls to your WordPress site.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary large rt-button-font"
              >
                {loading ? 'Connecting...' : 'Connect WordPress Site'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/dashboard/sites')}
                className="btn-secondary large rt-button-font"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="card pd-24px bg-gradient-to-br from-white/[0.05] to-white/[0.01]">
          <h3 className="text-300 bold text-white mb-3">Need Help?</h3>
          <p className="text-100 text-gray-400 mb-4">
            Having trouble connecting your WordPress site? We're here to help!
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wordpress.org/support/article/application-passwords/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary rt-button-font"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              WordPress Docs
            </a>
            <a href="mailto:support@seology.ai" className="btn-secondary rt-button-font">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
