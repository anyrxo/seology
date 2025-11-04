'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ConnectStoreButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function ConnectStoreButton({ className, children }: ConnectStoreButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    platform: 'SHOPIFY',
    storeUrl: '',
    storeName: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/connection-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to submit request')
      }

      // Success!
      setIsOpen(false)
      setFormData({ platform: 'SHOPIFY', storeUrl: '', storeName: '', message: '' })

      // Show success message
      alert('✅ Connection request submitted! Our team will review it shortly and send you a connection link.')

      // Optionally refresh to show pending request
      router.refresh()
    } catch (error) {
      alert('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Connect Store Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={className || 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors'}
      >
        {children || '+ Connect Store'}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Connect Your Store</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Request to connect your store. The connection process varies by platform:
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                <li><strong>Shopify:</strong> One-click OAuth authorization</li>
                <li><strong>WordPress:</strong> REST API with Application Passwords</li>
                <li><strong>Custom Sites:</strong> Add our Magic.js tracking snippet</li>
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="SHOPIFY">Shopify</option>
                  <option value="WORDPRESS">WordPress</option>
                  <option value="WEBFLOW">Webflow</option>
                  <option value="WOOCOMMERCE">WooCommerce</option>
                  <option value="CUSTOM">Custom/Other</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Which platform is your store on?
                </p>
              </div>

              {/* Store URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.storeUrl}
                  onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                  placeholder={
                    formData.platform === 'SHOPIFY'
                      ? 'mystore.myshopify.com'
                      : formData.platform === 'WORDPRESS'
                      ? 'mysite.com'
                      : 'yourstore.com'
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.platform === 'SHOPIFY'
                    ? 'Enter your .myshopify.com URL'
                    : 'Enter your store or website URL'}
                </p>
              </div>

              {/* Store Name (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  placeholder="My Awesome Store"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  A friendly name for your store
                </p>
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to Team (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any additional information or questions..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Let us know if you have any special requirements
                </p>
              </div>

              {/* Platform-Specific Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    {formData.platform === 'SHOPIFY' && (
                      <ol className="list-decimal ml-4 space-y-1">
                        <li>Our team reviews your request (usually within 24 hours)</li>
                        <li>You'll receive a notification with an authorization link</li>
                        <li>Click the link to authorize SEOLOGY in your Shopify admin</li>
                        <li>We automatically start analyzing your store's SEO</li>
                      </ol>
                    )}
                    {formData.platform === 'WORDPRESS' && (
                      <ol className="list-decimal ml-4 space-y-1">
                        <li>Our team reviews your request (usually within 24 hours)</li>
                        <li>You'll receive setup instructions via notification</li>
                        <li>Create an Application Password in your WordPress profile</li>
                        <li>Enter your credentials to complete the REST API connection</li>
                        <li>We start analyzing your site's SEO automatically</li>
                      </ol>
                    )}
                    {formData.platform === 'CUSTOM' && (
                      <ol className="list-decimal ml-4 space-y-1">
                        <li>Our team reviews your request (usually within 24 hours)</li>
                        <li>You'll receive a Magic.js tracking snippet</li>
                        <li>Add the snippet to your website's &lt;head&gt; section</li>
                        <li>We detect the snippet and start analyzing your site</li>
                        <li>Fixes are applied automatically via the snippet</li>
                      </ol>
                    )}
                    {(formData.platform === 'WIX' || formData.platform === 'WEBFLOW') && (
                      <ol className="list-decimal ml-4 space-y-1">
                        <li>Our team reviews your request (usually within 24 hours)</li>
                        <li>You'll receive a Magic.js tracking snippet</li>
                        <li>Add the snippet to your {formData.platform.toLowerCase()} site settings</li>
                        <li>We start analyzing your site's SEO automatically</li>
                      </ol>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {loading ? 'Submitting Request...' : 'Submit Request'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
