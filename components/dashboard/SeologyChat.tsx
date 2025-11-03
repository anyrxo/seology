'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  Sparkles,
  Code,
  Copy,
  Check,
  Loader2,
  Globe,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

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

export function SeologyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your Seology AI Assistant. I can help you audit your website, fix SEO issues, and optimize your content. What would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-10), // Send last 10 messages for context
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

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

      // Mark streaming as complete
      setMessages((prev) => {
        const updated = [...prev]
        const lastMessage = updated[updated.length - 1]
        if (lastMessage.role === 'assistant') {
          lastMessage.isStreaming = false
        }
        return updated
      })
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
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

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    // TODO: Implement voice recording
  }

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-400" />
            Seology AI Assistant
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Your intelligent SEO automation companion
          </p>
        </div>
        <Badge variant="success" dot pulse>
          Online
        </Badge>
      </div>

      {/* Messages Container */}
      <GlassCard
        variant="medium"
        blur="xl"
        padding="none"
        hover="none"
        className="flex-1 flex flex-col overflow-hidden mb-4"
      >
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={copyToClipboard}
                isCopied={copiedId === message.id}
                isLast={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts (show when no messages from user) */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 sm:px-6 pb-4"
          >
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handlePromptClick(prompt)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  <span className="text-blue-400 group-hover:scale-110 transition-transform">
                    {prompt.icon}
                  </span>
                  {prompt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </GlassCard>

      {/* Input Area - Lovable Style */}
      <div className="relative">
        <GlassCard
          variant="medium"
          blur="xl"
          padding="none"
          hover="glow"
          className="overflow-hidden"
        >
          <div className="p-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5">
            <div className="flex items-end gap-3">
              {/* File Attachment */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about SEO..."
                  rows={1}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none max-h-32 transition-all duration-300"
                  disabled={isLoading}
                />
              </div>

              {/* Voice Input */}
              <button
                onClick={handleVoiceInput}
                className={cn(
                  'p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95',
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                )}
                aria-label="Voice input"
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              {/* Send Button - Gradient Style */}
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="h-11 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50"
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

        {/* Keyboard Shortcut Hint */}
        <div className="absolute -top-8 right-0 text-xs text-gray-500">
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
}

function MessageBubble({ message, onCopy, isCopied, isLast }: MessageBubbleProps) {
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
        {/* Streaming indicator */}
        {message.isStreaming && isLast && (
          <div className="flex items-center gap-1 mb-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
