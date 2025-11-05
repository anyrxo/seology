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
  FileText,
  Image as ImageIcon,
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
  attachments?: {
    name: string
    type: string
    size: number
    url: string
  }[]
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
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isUploadingFiles, setIsUploadingFiles] = useState(false)
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
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return

    setIsLoading(true)
    setError(null)
    shouldAutoScrollRef.current = true

    try {
      // Upload files first if any
      let fileUrls: string[] = []
      let attachments: { name: string; type: string; size: number; url: string }[] = []

      if (attachedFiles.length > 0) {
        setIsUploadingFiles(true)
        try {
          fileUrls = await uploadFilesToServer(attachedFiles)
          attachments = attachedFiles.map((file, index) => ({
            name: file.name,
            type: file.type,
            size: file.size,
            url: fileUrls[index],
          }))
        } catch (error) {
          setError('Failed to upload files. Please try again.')
          setIsLoading(false)
          setIsUploadingFiles(false)
          return
        }
        setIsUploadingFiles(false)
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: input,
        timestamp: new Date(),
        attachments: attachments.length > 0 ? attachments : undefined,
      }

      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setAttachedFiles([])

      // Save user message to database (non-blocking)
      saveMessage('user', input)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-10),
          attachments: attachments.length > 0 ? attachments : undefined,
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles = Array.from(files)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]

    // Validate files
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxSize) {
        setError(`File "${file.name}" is too large. Maximum size is 10MB.`)
        return false
      }
      if (!allowedTypes.includes(file.type)) {
        setError(`File type "${file.type}" is not supported.`)
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...validFiles])
      setError(null)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeAttachedFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFilesToServer = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to upload ${file.name}`)
      }

      const data = await response.json()
      return data.data.url
    })

    return Promise.all(uploadPromises)
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
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-6 md:mx-12 mt-4"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 flex-1">{error}</p>
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

      {/* Messages Container - Takes remaining space */}
      <div className="flex-1">
        <div
          ref={messagesContainerRef}
          className="px-6 md:px-12 py-6 pb-8 space-y-8"
        >
          {isLoadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-600">Loading...</p>
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
      </div>

      {/* Input Area - Visible with Border */}
      <div className="border-t border-white/10 bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
        <div className="px-6 md:px-12 py-4">
          {/* Attached Files Preview */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg"
                >
                  {file.type.startsWith('image/') ? (
                    <ImageIcon className="h-4 w-4 text-blue-400" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-400" />
                  )}
                  <span className="text-xs text-gray-300 max-w-[150px] truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)}KB)</span>
                  <button
                    onClick={() => removeAttachedFile(index)}
                    className="ml-1 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 border border-white/10 rounded-xl px-4 py-2 bg-white/5">
            {/* Text Input - Visible with Dynamic Placeholder */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isUploadingFiles
                    ? 'Uploading files...'
                    : messages.length === 0
                    ? 'Ask me anything about SEO, site audits, or content optimization...'
                    : attachedFiles.length > 0
                    ? 'Add a message about these files...'
                    : 'Ask a follow-up or request a new analysis...'
                }
                rows={1}
                className="w-full bg-transparent border-0 px-0 py-2 text-[15px] text-white placeholder-gray-500 focus:outline-none resize-none max-h-32 leading-relaxed"
                disabled={isLoading || isUploadingFiles}
              />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1.5">
              {/* File Attachment */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
                multiple
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || isUploadingFiles}
                className="p-2 rounded-md hover:bg-white/5 text-gray-600 hover:text-gray-400 disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
                aria-label="Attach files"
                title="Attach images, PDFs, or documents"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={(!input.trim() && attachedFiles.length === 0) || isLoading || isUploadingFiles}
                className="p-2 rounded-md hover:bg-white/5 disabled:opacity-30 text-gray-600 hover:text-white disabled:hover:text-gray-600 transition-colors"
              >
                {isLoading || isUploadingFiles ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
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
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className={cn("group w-full", isUser && "flex justify-end")}
    >
      {/* Pure Text Layout - Wide, Spacious */}
      <div className={cn(
        "flex gap-5 items-start max-w-[900px]",
        isUser && "flex-row-reverse"
      )}>
        {/* Minimal Avatar */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          isUser
            ? "bg-gradient-to-br from-purple-500 to-pink-600"
            : "bg-gradient-to-br from-blue-500 to-purple-600"
        )}>
          {isUser ? (
            <span className="text-[11px] font-bold text-white">U</span>
          ) : (
            <Sparkles className="h-4 w-4 text-white" />
          )}
        </div>

        {/* Message Content - Maximum Width */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Streaming indicator - Subtle */}
          {message.isStreaming && isLast && !message.content && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-gray-600 italic">{thinkingText}...</span>
            </div>
          )}

          {/* Message Text - Larger, Readable */}
          {message.content && (
            <div className="text-base text-gray-200 leading-[1.75] whitespace-pre-wrap font-normal">
              {message.content}
            </div>
          )}

          {/* Attachments Display */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {attachment.type.startsWith('image/') ? (
                    <ImageIcon className="h-4 w-4 text-blue-400" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-400" />
                  )}
                  <span className="text-xs text-gray-300 max-w-[150px] truncate">{attachment.name}</span>
                  <span className="text-xs text-gray-500">({(attachment.size / 1024).toFixed(1)}KB)</span>
                </a>
              ))}
            </div>
          )}

          {/* Action Bar - Clean, Visible on Hover */}
          {!isUser && !message.isStreaming && message.content && (
            <div className="flex items-center gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              {/* Copy button */}
              <button
                onClick={() => onCopy(message.content, message.id)}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                aria-label="Copy"
              >
                {isCopied ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {/* Share button */}
              <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>

              {/* Feedback buttons */}
              <div className="flex items-center gap-1 ml-auto">
                <button className="p-1.5 hover:bg-white/5 rounded text-gray-600 hover:text-gray-400 transition-colors" aria-label="Good response">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-white/5 rounded text-gray-600 hover:text-gray-400 transition-colors" aria-label="Bad response">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Timestamp - Subtle, bottom right for user messages */}
          {isUser && (
            <div className="text-[10px] text-gray-700 text-right">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
