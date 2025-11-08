/**
 * Shopify Support Page
 * Help resources and contact form
 */

'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from '@/lib/toast'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

export default function ShopifySupportPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/shopify/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, name, email, subject, message })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Support request submitted successfully!')
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        setSubmitted(true)
      } else {
        toast.error(data.error?.message || 'Failed to submit support request')
      }
    } catch (error) {
      console.error('Error submitting support request:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ShopifyNav shop={shop} />

      <main className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8" role="banner">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Support
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Get help with SEOLOGY.AI
              </p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Back to Dashboard"
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Documentation
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Learn how to use SEOLOGY.AI effectively
          </p>
          <a
            href="https://seology.ai/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View Docs →
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Live Chat
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Chat with our AI assistant
          </p>
          <button
            onClick={() => router.push(`/shopify/chat?shop=${shop}`)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Start Chat →
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Email Support
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Get help from our team
          </p>
          <a
            href="mailto:support@seology.ai"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            support@seology.ai →
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Contact Support
        </h2>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  emailError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="you@example.com"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                minLength={10}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe your issue or question..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!emailError}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>

      {/* SEO Features Guide */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300">
              Advanced SEO Features
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              Real-time AI-powered optimization with auto-plan & approve methods
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Real-time Analysis */}
          <details className="bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all">
            <summary className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Real-Time SEO Analysis with Claude AI
            </summary>
            <div className="mt-3 pl-7 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>
                SEOLOGY.AI uses Claude 3.5 Sonnet to analyze your products in real-time, identifying SEO issues and generating intelligent recommendations.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Analyzes meta titles, descriptions, and content quality</li>
                <li>Detects missing alt text on product images</li>
                <li>Identifies keyword optimization opportunities</li>
                <li>Provides context-aware recommendations</li>
                <li>Estimates traffic impact for each issue</li>
              </ul>
            </div>
          </details>

          {/* Execution Modes */}
          <details className="bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all">
            <summary className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Execution Modes: Auto-Plan & Approve Methods
            </summary>
            <div className="mt-3 pl-7 text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <div>
                <span className="font-semibold text-green-600 dark:text-green-400">AUTOMATIC Mode:</span>
                <p className="mt-1">Applies all SEO fixes immediately without manual approval. Best for experienced users who trust the AI completely.</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Instant optimization</li>
                  <li>No manual intervention required</li>
                  <li>90-day rollback window</li>
                  <li>Real-time notifications</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">PLAN Mode (Auto-Plan):</span>
                <p className="mt-1">Creates a comprehensive fix plan that requires single approval to execute all fixes at once. Perfect balance of automation and control.</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Review all fixes before applying</li>
                  <li>One-click batch approval</li>
                  <li>Preview estimated impact</li>
                  <li>Reject specific fixes from plan</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">APPROVE Mode (Individual Approval):</span>
                <p className="mt-1">Each fix requires manual approval before being applied. Maximum control for careful optimization.</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>Approve fixes one-by-one</li>
                  <li>Full control over changes</li>
                  <li>Detailed fix preview</li>
                  <li>Queue management</li>
                </ul>
              </div>
            </div>
          </details>

          {/* SEO Score System */}
          <details className="bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all">
            <summary className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Understanding SEO Scores
            </summary>
            <div className="mt-3 pl-7 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>Each product receives an SEO score from 0-100 based on multiple factors:</p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <span className="font-semibold text-green-700 dark:text-green-400">80-100: Excellent</span>
                  <p className="text-xs mt-1">Fully optimized, ready for search engines</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <span className="font-semibold text-yellow-700 dark:text-yellow-400">60-79: Good</span>
                  <p className="text-xs mt-1">Minor improvements recommended</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                  <span className="font-semibold text-orange-700 dark:text-orange-400">40-59: Needs Work</span>
                  <p className="text-xs mt-1">Multiple issues need attention</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <span className="font-semibold text-red-700 dark:text-red-400">0-39: Critical</span>
                  <p className="text-xs mt-1">Immediate optimization required</p>
                </div>
              </div>
            </div>
          </details>

          {/* Batch Operations */}
          <details className="bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all">
            <summary className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              Bulk Optimization & Batch Operations
            </summary>
            <div className="mt-3 pl-7 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>Optimize multiple products simultaneously with our batch operations:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Bulk Analyze:</strong> Scan all products for SEO issues at once</li>
                <li><strong>Batch Apply:</strong> Apply fixes to multiple products</li>
                <li><strong>Smart Filtering:</strong> Target products by score range, collection, or tags</li>
                <li><strong>Progress Tracking:</strong> Monitor batch operations in real-time</li>
                <li><strong>Rollback Protection:</strong> Revert batch changes if needed</li>
              </ul>
            </div>
          </details>

          {/* Rollback & Safety */}
          <details className="bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all">
            <summary className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Rollback & Data Safety
            </summary>
            <div className="mt-3 pl-7 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>Your data is always protected with comprehensive safety features:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>90-Day Rollback Window:</strong> All changes can be reverted within 90 days</li>
                <li><strong>Before/After Snapshots:</strong> View original content before rolling back</li>
                <li><strong>Secure Backups:</strong> Original data encrypted and safely stored</li>
                <li><strong>One-Click Restore:</strong> Rollback any fix instantly</li>
                <li><strong>Audit Logs:</strong> Complete history of all changes</li>
              </ul>
            </div>
          </details>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
          Common Questions
        </h3>
        <div className="space-y-3">
          <details className="cursor-pointer">
            <summary className="font-medium text-blue-800 dark:text-blue-400">
              How often does the app scan products?
            </summary>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-500 pl-4">
              The app automatically scans all products every 6 hours in the background. You can also manually trigger scans anytime.
            </p>
          </details>
          <details className="cursor-pointer">
            <summary className="font-medium text-blue-800 dark:text-blue-400">
              What's the difference between PLAN and APPROVE modes?
            </summary>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-500 pl-4">
              PLAN mode (auto-plan) creates a batch of fixes that you approve all at once with a single click. APPROVE mode requires you to review and approve each fix individually. PLAN is faster, APPROVE gives maximum control.
            </p>
          </details>
          <details className="cursor-pointer">
            <summary className="font-medium text-blue-800 dark:text-blue-400">
              Can I change my execution mode later?
            </summary>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-500 pl-4">
              Yes! You can change your execution mode at any time in Settings. Your choice applies to all future fixes.
            </p>
          </details>
          <details className="cursor-pointer">
            <summary className="font-medium text-blue-800 dark:text-blue-400">
              What happens to my SEO if I uninstall the app?
            </summary>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-500 pl-4">
              All optimizations remain in place on your products. Your store keeps all the SEO improvements even after uninstalling. We don't remove or revert any changes automatically.
            </p>
          </details>
        </div>
      </div>
      </main>
    </>
  )
}
