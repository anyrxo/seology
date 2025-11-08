'use client'

/**
 * Shopify Chat Component with SSE Streaming
 *
 * Next.js 14 App Router optimized version with:
 * - Server-Sent Events (SSE) for real-time AI streaming
 * - React 18 transitions for non-urgent updates
 * - Optimistic UI updates
 * - Performance monitoring
 * - Smart caching
 * - Enhanced accessibility
 */

import { useState, useRef, useEffect, useTransition, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, Loader2, Sparkles, X, AlertCircle, TrendingUp } from 'lucide-react'

// ==================== TYPES ====================

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  isStreaming?: boolean
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

interface PerformanceMetrics {
  firstTokenTime?: number
  totalTime?: number
  tokenCount?: number
}

// ==================== COMPONENT ====================

export function ShopifyChatStreaming() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  // State
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [credits, setCredits] = useState<CreditInfo | null>(null)
  const [storeContext, setStoreContext] = useState<StoreContext | null>(null)
  const [isChangingMode, setIsChangingMode] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({})

  // React 18 transitions for non-urgent updates
  const [isPending, startTransition] = useTransition()

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const streamStartTimeRef = useRef<number>(0)
  const firstTokenTimeRef = useRef<number>(0)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
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

  /**
   * Fetch store context with smart caching
   */
  const fetchStoreContext = useCallback(async () => {
    if (!shop) return

    try {
      const response = await fetch(`/api/shopify/context?shop=${shop}`, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          startTransition(() => {
            setStoreContext(data.data)
            setCredits(data.data.credits)
          })
        }
      }
    } catch (error) {
      console.error('Error fetching store context:', error)
    }
  }, [shop])

  /**
   * Change execution mode with optimistic update
   */
  const changeExecutionMode = useCallback(
    async (newMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE') => {
      if (!shop || isChangingMode) return

      // Optimistic update
      const previousContext = storeContext
      startTransition(() => {
        setStoreContext((prev) => (prev ? { ...prev, executionMode: newMode } : null))
      })

      setIsChangingMode(true)
      try {
        const response = await fetch('/api/shopify/execution-mode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shop, executionMode: newMode }),
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            // Add system message
            const systemMessage: Message = {
              role: 'assistant',
              content: `✅ Execution mode changed to **${newMode}**. ${getModeDescription(newMode)}`,
              timestamp: Date.now(),
            }
            startTransition(() => {
              setMessages((prev) => [...prev, systemMessage])
            })
          } else {
            // Rollback on failure
            startTransition(() => {
              setStoreContext(previousContext)
            })
            setError('Failed to change execution mode')
          }
        }
      } catch (error) {
        console.error('Error changing execution mode:', error)
        // Rollback on error
        startTransition(() => {
          setStoreContext(previousContext)
        })
        setError('Failed to change execution mode')
      } finally {
        setIsChangingMode(false)
      }
    },
    [shop, isChangingMode, storeContext]
  )

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

  /**
   * Handle streaming message with SSE
   */
  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || !shop) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    }

    // Optimistic UI update
    startTransition(() => {
      setMessages((prev) => [...prev, userMessage])
    })

    setInput('')
    setIsLoading(true)
    setError(null)

    // Create streaming placeholder message
    const streamingMessageId = Date.now()
    const streamingMessage: Message = {
      role: 'assistant',
      content: '',
      timestamp: streamingMessageId,
      isStreaming: true,
    }

    startTransition(() => {
      setMessages((prev) => [...prev, streamingMessage])
    })

    // Performance tracking
    streamStartTimeRef.current = Date.now()
    firstTokenTimeRef.current = 0

    // Create abort controller for stream cancellation
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/shopify/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop,
          messages: [...messages, userMessage],
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to send message')
      }

      // Check if streaming is supported
      if (!response.body) {
        throw new Error('Streaming not supported')
      }

      // Read the stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''
      let tokenCount = 0

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              if (data.type === 'chunk') {
                // Track first token time
                if (firstTokenTimeRef.current === 0) {
                  firstTokenTimeRef.current = Date.now() - streamStartTimeRef.current
                }

                fullContent += data.content
                tokenCount++

                // Update streaming message with low priority
                startTransition(() => {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.timestamp === streamingMessageId ? { ...msg, content: fullContent } : msg
                    )
                  )
                })
              } else if (data.type === 'complete') {
                // Stream complete
                const totalTime = Date.now() - streamStartTimeRef.current

                // Update performance metrics
                setPerformanceMetrics({
                  firstTokenTime: firstTokenTimeRef.current,
                  totalTime,
                  tokenCount,
                })

                // Finalize message
                startTransition(() => {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.timestamp === streamingMessageId
                        ? { ...msg, content: data.message, isStreaming: false }
                        : msg
                    )
                  )
                })

                // Update credits
                if (data.credits) {
                  startTransition(() => {
                    setCredits(data.credits)
                  })
                }
              } else if (data.type === 'error') {
                throw new Error(data.message || 'Stream error')
              }
            } catch (e) {
              // Ignore JSON parse errors for incomplete chunks
              if (!(e instanceof SyntaxError)) {
                throw e
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)

      if (error instanceof Error && error.name === 'AbortError') {
        setError('Message cancelled')
      } else {
        setError(error instanceof Error ? error.message : 'Failed to send message')
      }

      // Remove streaming message on error
      startTransition(() => {
        setMessages((prev) => prev.filter((msg) => msg.timestamp !== streamingMessageId))
      })
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [input, isLoading, shop, messages])

  /**
   * Cancel ongoing stream
   */
  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      } else if (e.key === 'Escape') {
        if (isLoading) {
          cancelStream()
        }
      }
    },
    [handleSendMessage, isLoading, cancelStream]
  )

  /**
   * Suggested prompts (memoized)
   */
  const suggestedPrompts = useMemo(
    () => [
      'How can I improve my product SEO?',
      'What are common SEO mistakes?',
      'Analyze my store for SEO issues',
      'Best practices for product descriptions',
    ],
    []
  )

  // Render collapsed button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-spring hover:scale-110 z-50 animate-bounce-in group shadow-interactive"
        title="Open SEO Assistant"
        aria-label="Open SEO Assistant Chat"
        type="button"
      >
        <Sparkles className="w-7 h-7 text-white animate-spin-slow group-hover:rotate-180 transition-transform duration-700" />
        <span
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"
          aria-hidden="true"
        ></span>
        <span
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          aria-hidden="true"
        ></span>
      </button>
    )
  }

  // Render expanded chat
  return (
    <div
      className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700 animate-scale-in glass-card"
      role="dialog"
      aria-label="SEO Assistant Chat"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white animate-pulse" aria-hidden="true" />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
              aria-hidden="true"
            ></span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              SEO Assistant
              <span className="px-2 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                AI
              </span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                aria-hidden="true"
              ></span>
              Online • SEOLOGY AI
              {credits && (
                <>
                  <span className="mx-1" aria-hidden="true">
                    •
                  </span>
                  <span
                    className={`font-medium ${
                      credits.remaining < 10
                        ? 'text-red-600 dark:text-red-400'
                        : credits.remaining < 30
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}
                    aria-label={`${credits.remaining} of ${credits.limit} credits remaining`}
                  >
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
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          className="p-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 animate-fade-in-up"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start gap-2">
            <AlertCircle
              className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-sm text-red-600 dark:text-red-400 flex-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              aria-label="Dismiss error"
              type="button"
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
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Execution Mode:
            </span>
            <span
              className="text-xs text-gray-500 dark:text-gray-500"
              aria-label={`${storeContext.productCount} products, ${storeContext.issueCount} issues`}
            >
              {storeContext.productCount} products • {storeContext.issueCount} issues
            </span>
          </div>
          <div className="flex gap-2" role="group" aria-label="Execution mode selection">
            <button
              onClick={() => changeExecutionMode('AUTOMATIC')}
              disabled={isChangingMode || storeContext.executionMode === 'AUTOMATIC'}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                storeContext.executionMode === 'AUTOMATIC'
                  ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-300 dark:ring-green-700'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-200 dark:border-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Apply all fixes instantly without approval"
              type="button"
              aria-pressed={storeContext.executionMode === 'AUTOMATIC'}
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
              type="button"
              aria-pressed={storeContext.executionMode === 'PLAN'}
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
              type="button"
              aria-pressed={storeContext.executionMode === 'APPROVE'}
            >
              ✓ Approve
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              SEO Assistant
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Ask me anything about SEO optimization for your products
            </p>
            <div className="flex flex-col gap-2 w-full">
              {suggestedPrompts.slice(0, 2).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-smooth hover:-translate-y-1 shadow-interactive animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  type="button"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={`${message.timestamp}-${index}`}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in-up`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 transition-smooth hover:scale-[1.02] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white shadow-interactive'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-interactive'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                    {message.isStreaming && (
                      <span
                        className="inline-block w-2 h-4 ml-1 bg-current animate-pulse"
                        aria-label="Streaming..."
                      />
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Performance Metrics (Development) */}
      {process.env.NODE_ENV === 'development' && performanceMetrics.firstTokenTime && (
        <div className="px-4 py-1 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <TrendingUp className="w-3 h-3" aria-hidden="true" />
          First token: {performanceMetrics.firstTokenTime}ms • Total: {performanceMetrics.totalTime}
          ms
        </div>
      )}

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
            aria-label="Message input"
          />
          <button
            onClick={isLoading ? cancelStream : handleSendMessage}
            disabled={!input.trim() && !isLoading}
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isLoading
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white'
            }`}
            aria-label={isLoading ? 'Cancel message' : 'Send message'}
            type="button"
          >
            {isLoading ? <X className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Press Enter to send • Shift+Enter for new line {isLoading && '• Esc to cancel'}
        </p>
      </div>
    </div>
  )
}
