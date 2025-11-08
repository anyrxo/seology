'use client'

/**
 * Shopify Chat Component
 * Claude AI chat assistant integrated into Shopify App
 */

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, Loader2, Sparkles, X, AlertCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
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

export function ShopifyChat() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [credits, setCredits] = useState<CreditInfo | null>(null)
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null)
  const [isChangingMode, setIsChangingMode] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px'
    }
  }, [input])

  // Fetch store context when chat opens
  useEffect(() => {
    if (isOpen && !storeContext && shop) {
      fetchStoreContext()
    }
  }, [isOpen, shop])

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

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setStoreContext((prev) => (prev ? { ...prev, executionMode: newMode } : null))

          // Add system message to chat
          const systemMessage: Message = {
            role: 'assistant',
            content: `✅ Execution mode changed to **${newMode}**. ${getModeDescription(newMode)}`,
          }
          setMessages((prev) => [...prev, systemMessage])
        }
      }
    } catch (error) {
      console.error('Error changing execution mode:', error)
      setError('Failed to change execution mode')
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

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/shopify/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop,
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to send message')
      }

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.data.message,
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
      console.error('Error sending message:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-spring hover:scale-110 z-50 animate-bounce-in group shadow-interactive"
        title="Open SEO Assistant"
        aria-label="Open SEO Assistant Chat"
      >
        <Sparkles className="w-7 h-7 text-white animate-spin-slow group-hover:rotate-180 transition-transform duration-700" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700 animate-scale-in glass-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              SEO Assistant
              <span className="px-2 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">AI</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online • Claude AI
              {credits && (
                <>
                  <span className="mx-1">•</span>
                  <span className={`font-medium ${credits.remaining < 10 ? 'text-red-600 dark:text-red-400' : credits.remaining < 30 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                    {credits.remaining}/{credits.limit} credits
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all hover:rotate-90"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 animate-fade-in-up">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 flex-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Execution Mode Switcher */}
      {storeContext && (
        <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Execution Mode:</span>
            <span className="text-xs text-gray-500 dark:text-gray-500">{storeContext.productCount} products • {storeContext.issueCount} issues</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => changeExecutionMode('AUTOMATIC')}
              disabled={isChangingMode || storeContext.executionMode === 'AUTOMATIC'}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                storeContext.executionMode === 'AUTOMATIC'
                  ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-300 dark:ring-green-700'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-200 dark:border-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Apply all fixes instantly without approval"
            >
              ⚡ Auto
            </button>
            <button
              onClick={() => changeExecutionMode('PLAN')}
              disabled={isChangingMode || storeContext.executionMode === 'PLAN'}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                storeContext.executionMode === 'PLAN'
                  ? 'bg-yellow-600 text-white shadow-lg ring-2 ring-yellow-300 dark:ring-yellow-700'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 border border-gray-200 dark:border-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Create fix plans for batch approval"
            >
              📋 Plan
            </button>
            <button
              onClick={() => changeExecutionMode('APPROVE')}
              disabled={isChangingMode || storeContext.executionMode === 'APPROVE'}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                storeContext.executionMode === 'APPROVE'
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 dark:ring-blue-700'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Approve each fix individually"
            >
              ✓ Approve
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              SEO Assistant
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Ask me anything about SEO optimization for your products
            </p>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => setInput('How can I improve my product SEO?')}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-smooth hover:-translate-y-1 shadow-interactive animate-fade-in-up stagger-delay-1"
              >
                Improve product SEO
              </button>
              <button
                onClick={() => setInput('What are common SEO mistakes?')}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-smooth hover:-translate-y-1 shadow-interactive animate-fade-in-up stagger-delay-2"
              >
                Common SEO mistakes
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 transition-smooth hover:scale-[1.02] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white shadow-interactive'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-interactive'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 animate-shimmer">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about SEO..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
