/**
 * Shopify Chat Interface
 * Split-screen layout with store context on left, chat on right
 * Atlas dark theme (#191A1B, #262A2B)
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'
import { authenticatedFetch } from '@/lib/shopify-app-bridge'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface CreditInfo {
  used: number
  limit: number
  remaining: number
}

interface StoreContext {
  executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  productCount: number
  issueCount: number
  fixesApplied: number
  pendingFixes: number
  planName: string
}

export default function ShopifyChatPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your SEOLOGY.AI assistant.\n\n**🔍 Run Audits:**\n• \"Analyze my products\"\n• \"Audit my store\"\n\n**🔧 Apply Fixes:**\n• \"Fix my products\"\n• \"Optimize my store\"\n\n**💬 Get Advice:**\n• SEO tips and recommendations\n\nJust tell me what you need!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState<CreditInfo | null>(null)
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null)
  const [showModeModal, setShowModeModal] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch store context on mount
  useEffect(() => {
    if (shop && !storeContext) {
      fetchStoreContext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop])

  const fetchStoreContext = async () => {
    try {
      const data = await authenticatedFetch<{ success: boolean; data: StoreContext & { credits: CreditInfo } }>(`/api/shopify/context?shop=${shop}`)
      if (data.success) {
        setStoreContext(data.data)
        setCredits(data.data.credits)
      }
    } catch (error) {
      console.error('Error fetching store context:', error)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || !shop || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Debug logging
    console.log('[Chat] Sending message to:', `/api/shopify/chat?shop=${shop}`)
    console.log('[Chat] Shop parameter:', shop)

    try {
      const data = await authenticatedFetch<{ success: boolean; data?: { message: string; credits?: CreditInfo }; error?: { message: string; details?: string; action?: string; link?: string; errorId?: string } }>(`/api/shopify/chat?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (data.success && data.data) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.data.message,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])

        if (data.data.credits) {
          setCredits(data.data.credits)
        }
      } else {
        // Enhanced error message display
        let errorContent = `❌ **${data.error?.message || 'An error occurred'}**`

        if (data.error?.details) {
          errorContent += `\n\n${data.error.details}`
        }

        if (data.error?.action) {
          errorContent += `\n\n**What to do:**\n${data.error.action}`
        }

        if (data.error?.link) {
          errorContent += `\n\n[Take Action →](${data.error.link})`
        }

        if (data.error?.errorId) {
          errorContent += `\n\n*Error ID: ${data.error.errorId}*`
        }

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'system',
          content: errorContent,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)

      // Enhanced error diagnostics
      let errorContent = '❌ **Error**\n\n'

      if (error instanceof Error) {
        // Check for authentication errors
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          errorContent = '🔒 **Authentication Error**\n\n'
          errorContent += 'Could not verify your Shopify session.\n\n'
          errorContent += '**What to do:**\n'
          errorContent += '1. Refresh the page to re-authenticate\n'
          errorContent += '2. If that doesn\'t work, reinstall the app from your Shopify admin\n'
          errorContent += '3. Contact support if the issue persists\n\n'
          errorContent += `*Error: ${error.message}*\n`
        }
        // Check for server errors
        else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
          errorContent = '🔧 **Server Error**\n\n'
          errorContent += 'SEOLOGY servers are experiencing issues.\n\n'
          errorContent += '**What to do:**\n'
          errorContent += '1. Try again in a few minutes\n'
          errorContent += '2. Check our status page for updates\n'
          errorContent += '3. Contact support if this continues\n\n'
          errorContent += `*Error: ${error.message}*\n`
        }
        // Network/connection errors
        else if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed to fetch')) {
          errorContent = '📡 **Connection Error**\n\n'
          errorContent += 'Could not connect to SEOLOGY servers.\n\n'
          errorContent += '**What to do:**\n'
          errorContent += '1. Check your internet connection\n'
          errorContent += '2. Check if you can access other websites\n'
          errorContent += '3. Try disabling any VPN or proxy\n'
          errorContent += '4. Refresh the page and try again\n\n'
          errorContent += `*Error: ${error.message}*\n`
        }
        // Unknown errors - show details
        else {
          errorContent = '⚠️ **Unexpected Error**\n\n'
          errorContent += 'Something went wrong processing your request.\n\n'
          errorContent += `**Error Details:** ${error.message}\n\n`
          errorContent += '**What to do:**\n'
          errorContent += '1. Refresh the page and try again\n'
          errorContent += '2. Contact support with the error details above\n\n'
        }
      } else {
        // Non-Error object thrown
        errorContent = '⚠️ **Unknown Error**\n\n'
        errorContent += 'An unexpected error occurred.\n\n'
        errorContent += `**Details:** ${String(error)}\n\n`
        errorContent += '**What to do:**\n'
        errorContent += '1. Refresh the page and try again\n'
        errorContent += '2. Contact support if the issue persists\n\n'
      }

      errorContent += `*Error Time: ${new Date().toLocaleTimeString()}*`

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: errorContent,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const changeExecutionMode = async (mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE') => {
    try {
      const data = await authenticatedFetch<{ success: boolean }>(`/api/shopify/execution-mode?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executionMode: mode }),
      })

      if (data.success) {
          // Update local state immediately
          setStoreContext((prev) => prev ? { ...prev, executionMode: mode } : null)
          setShowModeModal(false)

          // Add system message with explanation
          const modeDescriptions = {
            AUTOMATIC: 'Fixes will now be applied automatically without approval.',
            PLAN: 'Fixes will now be grouped into plans that require batch approval.',
            APPROVE: 'Each fix will now require individual approval before being applied.',
          }

          const systemMessage: Message = {
            id: Date.now().toString(),
            role: 'system',
            content: `✅ Execution mode changed to **${mode}**\n\n${modeDescriptions[mode]}`,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, systemMessage])

          // Refresh store context to ensure consistency
          fetchStoreContext()
      } else {
        // API returned error
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: `❌ Failed to change execution mode. Please try again.`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error changing execution mode:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'system',
        content: `❌ Network error while changing execution mode. Please check your connection and try again.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  if (!shop) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#191A1B]">
        <p className="text-white">Missing shop parameter</p>
      </div>
    )
  }

  return (
    <div className="h-screen bg-[#191A1B] flex">
      {/* Navigation Sidebar */}
      <ShopifyAppNav />

      {/* LEFT PANEL - Store Context */}
      <div className="w-3/4 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="bg-[#262A2B] border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-xl font-semibold mb-1">Store Overview</h1>
              <p className="text-gray-400 text-sm">{shop}</p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Store Stats */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Execution Mode */}
          <div className="mb-6">
            <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Execution Mode</h3>
            <button
              onClick={() => setShowModeModal(true)}
              className="w-full bg-[#262A2B] border border-gray-700 hover:border-blue-500 rounded-lg p-4 text-left transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    storeContext?.executionMode === 'AUTOMATIC' ? 'bg-green-500' :
                    storeContext?.executionMode === 'PLAN' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-white font-medium">
                    {storeContext?.executionMode || 'PLAN'}
                  </span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">
                {storeContext?.executionMode === 'AUTOMATIC' && 'Fixes applied automatically'}
                {storeContext?.executionMode === 'PLAN' && 'Batch approval required'}
                {storeContext?.executionMode === 'APPROVE' && 'Individual approval required'}
                {!storeContext?.executionMode && 'Loading...'}
              </p>
            </button>
          </div>

          {/* Store Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Products</div>
              <div className="text-white text-2xl font-semibold">
                {storeContext?.productCount || 0}
              </div>
            </div>

            <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Active Issues</div>
              <div className="text-white text-2xl font-semibold">
                {storeContext?.issueCount || 0}
              </div>
            </div>

            <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Fixes Applied</div>
              <div className="text-white text-2xl font-semibold">
                {storeContext?.fixesApplied || 0}
              </div>
            </div>

            {storeContext?.pendingFixes ? (
              <div className="bg-[#262A2B] border border-yellow-700 rounded-lg p-4">
                <div className="text-yellow-400 text-xs uppercase tracking-wide mb-1">Pending Fixes</div>
                <div className="text-white text-2xl font-semibold">
                  {storeContext.pendingFixes}
                </div>
              </div>
            ) : (
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Pending Fixes</div>
                <div className="text-white text-2xl font-semibold">0</div>
              </div>
            )}
          </div>

          {/* Usage Stats */}
          {credits && (
            <div className="mb-6">
              <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">AI Credits</h3>
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Used this month</span>
                  <span className="text-white font-medium">{credits.used} / {credits.limit}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${(credits.used / credits.limit) * 100}%` }}
                  />
                </div>
                <div className="text-gray-400 text-xs mt-2">
                  {credits.remaining} credits remaining
                </div>
              </div>
            </div>
          )}

          {/* Plan Info */}
          <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-2">Current Plan</div>
            <div className="text-white font-medium">{storeContext?.planName || 'Loading...'}</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Chat */}
      <div className="w-1/4 flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#262A2B] border-b border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-semibold">AI Assistant</h2>
              <p className="text-gray-400 text-sm">Ask me anything about SEO</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : message.role === 'assistant'
                    ? 'bg-[#262A2B] border border-gray-700 text-gray-100'
                    : 'bg-red-900/20 border border-red-700 text-red-400'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-2 ${
                    message.role === 'user'
                      ? 'text-blue-200'
                      : message.role === 'assistant'
                      ? 'text-gray-500'
                      : 'text-red-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-[#262A2B] border-t border-gray-700 p-4">
          <div className="flex gap-3 mb-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me to analyze your products, fix issues, or get SEO advice..."
              className="flex-1 bg-[#191A1B] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 transition-colors"
              rows={2}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button
              onClick={() => setInput('Analyze my products')}
              className="w-full bg-[#191A1B] border border-gray-700 hover:border-blue-500 text-white text-xs rounded-lg p-2 text-left transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔍</span>
                <span>Analyze Products</span>
              </div>
            </button>

            <button
              onClick={() => setInput('Fix my store')}
              className="w-full bg-[#191A1B] border border-gray-700 hover:border-green-500 text-white text-xs rounded-lg p-2 text-left transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500">🔧</span>
                <span>Fix Store Issues</span>
              </div>
            </button>

            <button
              onClick={() => setInput('Audit my content')}
              className="w-full bg-[#191A1B] border border-gray-700 hover:border-purple-500 text-white text-xs rounded-lg p-2 text-left transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📄</span>
                <span>Audit Content</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Execution Mode Modal */}
      {showModeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6 w-[500px] max-w-[90%]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Change Execution Mode</h3>
              <button
                onClick={() => setShowModeModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => changeExecutionMode('AUTOMATIC')}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  storeContext?.executionMode === 'AUTOMATIC'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-700 hover:border-green-500/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-white font-medium">AUTOMATIC</span>
                </div>
                <p className="text-gray-400 text-sm">Fixes applied automatically without approval</p>
              </button>

              <button
                onClick={() => changeExecutionMode('PLAN')}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  storeContext?.executionMode === 'PLAN'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-blue-500/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-white font-medium">PLAN</span>
                </div>
                <p className="text-gray-400 text-sm">Batch approval required - review all fixes together</p>
              </button>

              <button
                onClick={() => changeExecutionMode('APPROVE')}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  storeContext?.executionMode === 'APPROVE'
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-gray-700 hover:border-yellow-500/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-white font-medium">APPROVE</span>
                </div>
                <p className="text-gray-400 text-sm">Individual approval required for each fix</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
