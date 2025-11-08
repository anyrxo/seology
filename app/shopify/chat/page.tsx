/**
 * Shopify Chat Interface
 * Real-time AI assistant for SEO help and recommendations
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

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
      content: "Hi! I'm your SEOLOGY.AI assistant. I can help you with:\n\n**🔍 Run Audits:**\n• \"Analyze my products\"\n• \"Audit my store\"\n• \"Check my content\"\n\n**🔧 Apply Fixes:**\n• \"Fix my products\"\n• \"Apply SEO fixes\"\n• \"Optimize my store\"\n\n**💬 Get Advice:**\n• SEO tips and recommendations\n• Keyword research\n• Technical SEO questions\n\nJust tell me what you need!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState<CreditInfo | null>(null)
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null)
  const [isChangingMode, setIsChangingMode] = useState(false)

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
  }, [shop])

  const fetchStoreContext = async () => {
    try {
      const response = await fetch(`/api/shopify/context?shop=${shop}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setStoreContext(data.data)
          setCredits(data.data.credits)
        }
      }
    } catch (error) {
      console.error('Error fetching store context:', error)
    }
  }

  const changeExecutionMode = async (newMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE') => {
    if (!shop || isChangingMode) return

    console.log(`[Chat Page] Changing execution mode from ${storeContext?.executionMode} to ${newMode}`)
    setIsChangingMode(true)
    try {
      const response = await fetch('/api/shopify/execution-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop,
          executionMode: newMode,
        }),
      })

      const data = await response.json()
      console.log('[Chat Page] Execution mode change response:', data)

      if (response.ok && data.success) {
        setStoreContext((prev) => (prev ? { ...prev, executionMode: newMode } : null))

        // Add system message to chat
        const systemMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: `✅ Execution mode changed to **${newMode}**. ${getModeDescription(newMode)}`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, systemMessage])

        console.log('[Chat Page] Mode changed successfully to:', newMode)
      } else {
        console.error('[Chat Page] Mode change failed:', data.error)
      }
    } catch (error) {
      console.error('[Chat Page] Error changing execution mode:', error)
    } finally {
      setIsChangingMode(false)
    }
  }

  const getModeDescription = (mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'): string => {
    switch (mode) {
      case 'AUTOMATIC':
        return 'All SEO fixes will be applied instantly without approval.'
      case 'PLAN':
        return 'Fixes will be grouped into plans for batch approval.'
      case 'APPROVE':
        return 'Each fix will require individual approval before being applied.'
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/shopify/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.data.message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])

        // Update credit information if provided
        if (data.data.credits) {
          setCredits(data.data.credits)
        }
      } else {
        throw new Error(data.error?.message || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
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
      handleSend()
    }
  }

  return (
    <>
      <ShopifyNav shop={shop} />

      <main className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4" role="banner">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  SEO Assistant
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Powered by Claude AI
                </p>
              </div>
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

        {/* Store Context & Execution Mode */}
        {storeContext && (
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Store Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Store Info
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Products</div>
                      <div className="font-medium text-gray-900 dark:text-white">{storeContext.productCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Issues</div>
                      <div className="font-medium text-red-600 dark:text-red-400">{storeContext.issueCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Plan</div>
                      <div className="font-medium text-blue-600 dark:text-blue-400">{storeContext.planName}</div>
                    </div>
                  </div>
                  {credits && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Credits</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {credits.remaining} / {credits.limit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(credits.remaining / credits.limit) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Execution Mode */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Execution Mode
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => changeExecutionMode('AUTOMATIC')}
                      disabled={isChangingMode || storeContext.executionMode === 'AUTOMATIC'}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        storeContext.executionMode === 'AUTOMATIC'
                          ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-300 dark:ring-green-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      title="Apply all fixes instantly without approval"
                    >
                      ⚡ Auto
                    </button>
                    <button
                      onClick={() => changeExecutionMode('PLAN')}
                      disabled={isChangingMode || storeContext.executionMode === 'PLAN'}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        storeContext.executionMode === 'PLAN'
                          ? 'bg-yellow-600 text-white shadow-lg ring-2 ring-yellow-300 dark:ring-yellow-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      title="Create fix plans for batch approval"
                    >
                      📋 Plan
                    </button>
                    <button
                      onClick={() => changeExecutionMode('APPROVE')}
                      disabled={isChangingMode || storeContext.executionMode === 'APPROVE'}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        storeContext.executionMode === 'APPROVE'
                          ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 dark:ring-blue-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      title="Approve each fix individually"
                    >
                      ✓ Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.role === 'system'
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 text-gray-800 dark:text-gray-200 border border-yellow-200 dark:border-yellow-800'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow'
                }`}
              >
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.role === 'user'
                      ? 'text-blue-100'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about SEO..."
              rows={1}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick Actions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Analyze my products',
              'Fix my store',
              'Audit my content',
              'SEO best practices',
            ].map((action) => (
              <button
                key={action}
                onClick={() => setInput(action)}
                className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
      </main>
    </>
  )
}
