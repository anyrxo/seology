'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Paperclip,
  Sparkles,
  Code,
  Copy,
  Check,
  Loader2,
  Globe,
  AlertCircle,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/ui/glass-card'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface SuggestedPrompt {
  icon: React.ReactNode
  text: string
  action: string
}

const suggestedPrompts: SuggestedPrompt[] = [
  {
    icon: <Sparkles className="h-4 w-4" />,
    text: 'Audit my site',
    action: 'Run a comprehensive SEO audit on my website and identify all issues',
  },
  {
    icon: <Code className="h-4 w-4" />,
    text: 'Fix meta tags',
    action: 'Analyze and fix all missing or incorrect meta tags on my site',
  },
  {
    icon: <Globe className="h-4 w-4" />,
    text: 'Improve page speed',
    action: 'Suggest optimizations to improve my website loading speed',
  },
]

type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'

interface CreditBalance {
  monthlyCredits: number
  monthlyUsed: number
  monthlyRemaining: number
  purchasedCredits: number
  totalAvailable: number
  isUnlimited: boolean
}

interface SavedMessage {
  id: string
  role: string
  content: string
  timestamp: string
}

export function SeologyChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [thinkingText, setThinkingText] = useState('Thinking')
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('AUTOMATIC')
  const [isLoadingMode, setIsLoadingMode] = useState(true)
  const [credits, setCredits] = useState<CreditBalance | null>(null)
  const [isLoadingCredits, setIsLoadingCredits] = useState(true)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)

  // Load chat history on mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await fetch('/api/chat-history')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setConversationId(data.data.conversationId)

            // If there are saved messages, load them; otherwise show welcome message
            if (data.data.messages && data.data.messages.length > 0) {
              setMessages(data.data.messages.map((msg: SavedMessage) => ({
                id: msg.id,
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
                timestamp: new Date(msg.timestamp),
              })))
            } else {
              // Show welcome message for new conversations
              setMessages([{
                id: 'welcome',
                role: 'assistant',
                content: "Hi! I'm SEOLOGY's AI assistant. I can help you analyze your site's SEO issues, suggest fixes, and guide you through optimizing your content. Unlike other tools that just report problems, SEOLOGY actually fixes them automatically. What would you like to work on today?",
                timestamp: new Date(),
              }])
            }
          }
        }
      } catch (error) {
        console.error('Failed to load chat history:', error)
        // Show welcome message on error
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: "Hi! I'm SEOLOGY's AI assistant. I can help you analyze your site's SEO issues, suggest fixes, and guide you through optimizing your content. Unlike other tools that just report problems, SEOLOGY actually fixes them automatically. What would you like to work on today?",
          timestamp: new Date(),
        }])
      } finally {
        setIsLoadingHistory(false)
      }
    }
    loadChatHistory()
  }, [])

  // Load user's execution mode and credits on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load execution mode
        const modeResponse = await fetch('/api/user/execution-mode')
        if (modeResponse.ok) {
          const modeData = await modeResponse.json()
          if (modeData.success && modeData.data.executionMode) {
            setExecutionMode(modeData.data.executionMode)
          }
        }

        // Load AI credits
        const creditsResponse = await fetch('/api/user/ai-credits')
        if (creditsResponse.ok) {
          const creditsData = await creditsResponse.json()
          if (creditsData.success && creditsData.data) {
            setCredits(creditsData.data)
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error)
      } finally {
        setIsLoadingMode(false)
        setIsLoadingCredits(false)
      }
    }
    loadUserData()

    // Poll for credit updates every 30 seconds
    const creditPollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/user/ai-credits')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setCredits(data.data)
          }
        }
      } catch (error) {
        // Silent fail - don't disrupt user experience
        console.debug('Credit poll failed:', error)
      }
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(creditPollInterval)
  }, [])

  // Save a message to the database
  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!conversationId) {
      console.warn('No conversation ID available, skipping message save')
      return
    }

    try {
      await fetch('/api/chat-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          role,
          content,
        }),
      })
    } catch (error) {
      console.error('Failed to save message:', error)
      // Don't throw - saving to DB is non-critical for UX
    }
  }

  // Refresh credits after sending a message
  const refreshCredits = async () => {
    try {
      const response = await fetch('/api/user/ai-credits')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setCredits(data.data)
        }
      }
    } catch (error) {
      console.error('Failed to refresh credits:', error)
    }
  }

  // Smart auto-scroll - only scroll if user is near bottom or just sent a message
  useEffect(() => {
    if (!messagesContainerRef.current || !messagesEndRef.current) return

    const container = messagesContainerRef.current
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100

    // Auto-scroll if user is near bottom OR if shouldAutoScroll flag is set (user just sent a message)
    if (isNearBottom || shouldAutoScrollRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      shouldAutoScrollRef.current = false
    }
  }, [messages])

  // Track user scroll to detect manual scrolling
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      // If user manually scrolls, check if they're at bottom
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50
      shouldAutoScrollRef.current = isAtBottom
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  // Cool thinking animation - Claude style
  useEffect(() => {
    if (!isLoading) return

    const thinkingStates = [
      'Thinking',
      'Analyzing',
      'Processing',
      'Contemplating',
      'Discombobulating',
      'Cogitating',
      'Ruminating',
      'Pondering',
      'Deliberating',
    ]

    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % thinkingStates.length
      setThinkingText(thinkingStates[currentIndex])
    }, 800)

    return () => clearInterval(interval)
  }, [isLoading])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)
    shouldAutoScrollRef.current = true // Always scroll when user sends a message

    // Save user message to database (non-blocking)
    saveMessage('user', input)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-10), // Send last 10 messages for context
        }),
      })

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = 'Failed to get response from AI'
        try {
          const errorData = await response.json()
          if (errorData.error?.message) {
            errorMessage = errorData.error.message
          }
        } catch (e) {
          // Use default error message
        }
        throw new Error(errorMessage)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        let done = false
        while (!done) {
          const { value, done: readerDone } = await reader.read()
          done = readerDone
          if (value) {
            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue

                try {
                  const parsed = JSON.parse(data)
                  if (parsed.content) {
                    setMessages((prev) => {
                      const updated = [...prev]
                      const lastMessage = updated[updated.length - 1]
                      if (lastMessage.role === 'assistant') {
                        lastMessage.content += parsed.content
                      }
                      return updated
                    })
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        }
      }

      // Mark streaming as complete and save assistant message
      let assistantContent = ''
      setMessages((prev) => {
        const updated = [...prev]
        const lastMessage = updated[updated.length - 1]
        if (lastMessage.role === 'assistant') {
          lastMessage.isStreaming = false
          assistantContent = lastMessage.content
        }
        return updated
      })

      // Save assistant message to database (non-blocking)
      if (assistantContent) {
        saveMessage('assistant', assistantContent)
      }

      // Refresh credits after successful message
      await refreshCredits()
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.'
      setError(errorMessage)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: errorMessage,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePromptClick = (prompt: SuggestedPrompt) => {
    setInput(prompt.action)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Handle file upload for screenshot analysis
      console.log('File uploaded:', file.name)
    }
  }

  const handleExecutionModeChange = async (newMode: ExecutionMode) => {
    const previousMode = executionMode
    setExecutionMode(newMode) // Optimistic update

    try {
      const response = await fetch('/api/user/execution-mode', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executionMode: newMode }),
      })

      if (!response.ok) {
        throw new Error('Failed to update execution mode')
      }
    } catch (error) {
      console.error('Failed to update execution mode:', error)
      setExecutionMode(previousMode) // Revert on error
      setError('Failed to update execution mode. Please try again.')
    }
  }

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-12rem)]">
      {/* Chat Header - Mobile Optimized */}
      <div className="flex items-start md:items-center justify-between mb-3 md:mb-6 flex-shrink-0 relative z-10 gap-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-blue-400 flex-shrink-0" />
            <span className="truncate">SEOLOGY AI</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1 hidden sm:block">
            AI-powered SEO analysis and automated fixes
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* AI Credits Display - Compact on mobile */}
          {!isLoadingCredits && credits && (
            <div className="flex items-center gap-1.5 md:gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-2 md:px-4 py-1.5 md:py-2">
              <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-400 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-medium text-white whitespace-nowrap">
                  {credits.isUnlimited ? (
                    <span className="hidden sm:inline">Unlimited</span>
                  ) : (
                    <>
                      {credits.totalAvailable}
                      {credits.purchasedCredits > 0 && <span className="text-green-400 text-[9px] md:text-[10px]"> (+{credits.purchasedCredits})</span>}
                    </>
                  )}
                </span>
                <span className="text-[8px] md:text-[10px] text-gray-400 hidden md:block">
                  {credits.isUnlimited ? 'Enterprise' : 'AI Credits'}
                </span>
              </div>
            </div>
          )}

          {/* Execution Mode Toggle - Hidden on smallest screens */}
          {!isLoadingMode && (
            <div className="hidden sm:flex items-center gap-1 md:gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-0.5 md:p-1">
              {(['AUTOMATIC', 'PLAN', 'APPROVE'] as ExecutionMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleExecutionModeChange(mode)}
                  className={cn(
                    'px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium transition-all duration-300 whitespace-nowrap',
                    executionMode === mode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 active:scale-95'
                  )}
                >
                  {mode === 'AUTOMATIC' && 'Auto'}
                  {mode === 'PLAN' && 'Plan'}
                  {mode === 'APPROVE' && 'Approve'}
                </button>
              ))}
            </div>
          )}
          <Badge variant="success" dot pulse className="hidden md:flex">
            Online
          </Badge>
        </div>
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-400 mb-1">Error</h3>
                <p className="text-sm text-red-300">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Container - Mobile Optimized */}
      <GlassCard
        variant="medium"
        blur="xl"
        padding="none"
        hover="none"
        className="flex-1 flex flex-col mb-3 md:mb-4 min-h-0 overflow-hidden"
      >
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 md:space-y-4 scroll-smooth overscroll-contain [&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-white/30">
          {isLoadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                <p className="text-sm text-gray-400">Loading chat history...</p>
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onCopy={copyToClipboard}
                    isCopied={copiedId === message.id}
                    isLast={index === messages.length - 1}
                    thinkingText={thinkingText}
                  />
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Suggested Prompts - Mobile Optimized */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 sm:px-4 md:px-6 pb-3 md:pb-4"
          >
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handlePromptClick(prompt)}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white/5 active:bg-white/10 md:hover:bg-white/10 border border-white/10 active:border-blue-500/50 md:hover:border-blue-500/50 rounded-xl text-xs md:text-sm text-gray-300 active:text-white md:hover:text-white transition-all duration-300 group active:scale-95"
                >
                  <span className="text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    {prompt.icon}
                  </span>
                  <span className="truncate">{prompt.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </GlassCard>

      {/* Input Area - Mobile Optimized */}
      <div className="relative flex-shrink-0">
        <GlassCard
          variant="medium"
          blur="xl"
          padding="none"
          hover="glow"
          className="overflow-hidden"
        >
          <div className="p-2.5 md:p-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5">
            <div className="flex items-end gap-2 md:gap-3">
              {/* File Attachment - Hidden on smallest screens */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="hidden sm:flex p-2.5 rounded-xl bg-white/5 active:bg-white/10 md:hover:bg-white/10 text-gray-400 active:text-white md:hover:text-white transition-all duration-300 md:hover:scale-105 active:scale-95 touch-manipulation"
                aria-label="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              {/* Text Input - Touch Optimized */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about SEO..."
                  rows={1}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none max-h-32 transition-all duration-300 touch-manipulation"
                  style={{ minHeight: '44px' }}
                  disabled={isLoading}
                />
              </div>

              {/* Send Button - Touch Optimized */}
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="h-11 md:h-11 w-11 md:w-auto md:px-6 flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 active:from-blue-500 active:to-purple-500 md:hover:from-blue-500 md:hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white shadow-lg shadow-blue-500/20 active:shadow-blue-500/40 md:hover:shadow-blue-500/40 transition-all duration-300 md:hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 touch-manipulation"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Keyboard Shortcut Hint - Desktop only */}
        <div className="hidden md:block absolute -top-8 right-0 text-xs text-gray-500">
          Press <kbd className="px-2 py-0.5 bg-white/5 rounded border border-white/10">Enter</kbd> to send
        </div>
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  onCopy: (content: string, id: string) => void
  isCopied: boolean
  isLast: boolean
  thinkingText?: string
}

function MessageBubble({ message, onCopy, isCopied, isLast, thinkingText }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 group relative',
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
            : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-100'
        )}
      >
        {/* Streaming indicator with thinking text */}
        {message.isStreaming && isLast && !message.content && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-gray-400 italic">{thinkingText}...</span>
          </div>
        )}

        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

        {/* Timestamp & Actions */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
          <span className="text-xs opacity-60">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          {!isUser && !message.isStreaming && (
            <button
              onClick={() => onCopy(message.content, message.id)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-all"
              aria-label="Copy message"
            >
              {isCopied ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
          <span className="text-sm font-medium text-white">U</span>
        </div>
      )}
    </motion.div>
  )
}
