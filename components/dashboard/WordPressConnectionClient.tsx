'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  AlertCircle,
  FileText,
  Shield,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Lock,
  X,
  Loader2,
} from 'lucide-react'

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
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    siteUrl: domain || '',
    username: '',
    password: '',
  })
  const [testingConnection, setTestingConnection] = useState(false)
  const [connectionTested, setConnectionTested] = useState(false)

  const testConnection = async () => {
    if (!formData.siteUrl) {
      setError('Please enter your WordPress site URL')
      return
    }

    setTestingConnection(true)
    setError(null)

    try {
      const response = await fetch(`${formData.siteUrl}/wp-json/`)
      if (response.ok) {
        setConnectionTested(true)
        setTimeout(() => setConnectionTested(false), 3000)
      } else {
        setError('Could not connect to WordPress REST API. Please check your site URL.')
      }
    } catch (err) {
      setError('Could not connect to WordPress REST API. Please check your site URL.')
    } finally {
      setTestingConnection(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.siteUrl || !formData.username || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)

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

      router.push('/dashboard/sites')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push('/dashboard/sites/connect')}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Platform Selection
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Connect WordPress Site
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Connect via REST API with Application Passwords
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 bg-blue-900/20 border border-blue-500/30 rounded-xl p-5"
        >
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                How WordPress Connection Works
              </h3>
              <p className="text-sm text-blue-200 mb-3">
                SEOLOGY connects to your WordPress site using the built-in REST API with Application Passwords.
                This is secure and doesn't require installing any plugins.
              </p>
              <ul className="text-sm text-blue-200 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  Uses WordPress's native REST API (enabled by default)
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  Application Passwords are more secure than regular passwords
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  You can revoke access anytime from your WordPress profile
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Setup Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Setup Instructions</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Verify REST API is Enabled</h3>
                <p className="text-sm text-gray-400 mb-3">
                  WordPress REST API is enabled by default. Test it by visiting:
                </p>
                <div className="bg-gray-900/50 p-3 rounded-lg font-mono text-sm text-blue-400 break-all border border-gray-700">
                  {domain || 'your-site.com'}/wp-json/
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You should see a JSON response with site information
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Create Application Password</h3>
                <p className="text-sm text-gray-400 mb-3">In your WordPress admin dashboard:</p>
                <ol className="space-y-2 text-sm text-gray-400 mb-3">
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2 flex-shrink-0">a.</span>
                    <span>Go to <code className="bg-gray-900/50 px-2 py-0.5 rounded text-blue-400 border border-gray-700">Users → Profile</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2 flex-shrink-0">b.</span>
                    <span>Scroll down to "Application Passwords" section</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2 flex-shrink-0">c.</span>
                    <span>Enter name: <code className="bg-gray-900/50 px-2 py-0.5 rounded text-blue-400 border border-gray-700">SEOLOGY</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2 flex-shrink-0">d.</span>
                    <span>Click "Add New Application Password"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2 flex-shrink-0">e.</span>
                    <span>Copy the generated password (you'll use it below)</span>
                  </li>
                </ol>
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-xs text-yellow-300 flex items-start">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                    <strong>Important:</strong> Save this password now - WordPress won't show it again!
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Enter Credentials Below</h3>
                <p className="text-sm text-gray-400">
                  Fill in the form with your WordPress username and the application password you just created
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connection Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">WordPress Credentials</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-400 mb-1">Connection Error</h3>
                <p className="text-sm text-red-300">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Site URL <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={formData.siteUrl}
                  onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                  placeholder="https://your-wordpress-site.com"
                  className="flex-1 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={testConnection}
                  disabled={testingConnection || !formData.siteUrl}
                  className="px-4 py-3.5 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium"
                >
                  {testingConnection ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : connectionTested ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    'Test'
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Full URL of your WordPress site</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                WordPress Username <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="admin"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">Your WordPress admin username</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Application Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
              <p className="text-xs text-gray-500 mt-2">
                The application password you generated (not your regular WordPress password)
              </p>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-5">
              <p className="text-sm text-green-300 flex items-start">
                <Lock className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-green-400" />
                <span>
                  <strong>Security:</strong> Your credentials are encrypted using AES-256-GCM and stored securely.
                  We'll only use them to make authorized API calls to your WordPress site.
                </span>
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  'Connect WordPress Site'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/dashboard/sites')}
                className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-br from-gray-800/30 to-gray-800/10 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Having trouble connecting your WordPress site? We're here to help!
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wordpress.org/support/article/application-passwords/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              WordPress Docs
            </a>
            <a
              href="mailto:support@seology.ai"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
