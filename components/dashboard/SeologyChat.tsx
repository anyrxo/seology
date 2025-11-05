'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Paperclip,
  Loader2,
  Sparkles,
  X,
  AlertCircle,
  ImageIcon,
  FileText,
  Copy,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'

// Types
type ExecutionMode = 'AUTO' | 'PLAN' | 'APPROVE'

interface APIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  attachments?: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
  attachments?: Array<{
    name: string
    url: string
    size: number
    type: string
  }>
}

interface AttachedFile {
  name: string
  size: number
  type: string
  file: File
}

interface SeologyChatProps {
  conversationId?: string
  siteId?: string
}

export default function SeologyChat({ conversationId, siteId }: SeologyChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [isUploadingFiles, setIsUploadingFiles] = useState(false)
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('AUTO')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }, [input])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Load conversation history
  useEffect(() => {
    if (conversationId) {
      loadConversationHistory()
    }
  }, [conversationId])

  // Load execution mode
  useEffect(() => {
    loadExecutionMode()
  }, [])

  const loadConversationHistory = async () => {
    setIsLoadingHistory(true)
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`)
      if (!response.ok) throw new Error('Failed to load conversation')

      const data = await response.json()
      if (data.success && data.data) {
        setMessages(
          data.data.map((msg: APIMessage) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.createdAt),
            attachments: msg.attachments ? JSON.parse(msg.attachments) : undefined,
          }))
        )
      }
    } catch (error) {
      console.error('Error loading conversation:', error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const loadExecutionMode = async () => {
    try {
      const response = await fetch('/api/user/execution-mode')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data?.executionMode) {
          setExecutionMode(data.data.executionMode)
        }
      }
    } catch (error) {
      console.error('Error loading execution mode:', error)
    }
  }

  const handleSendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      attachments:
        attachedFiles.length > 0
          ? attachedFiles.map((f) => ({
              name: f.name,
              url: URL.createObjectURL(f.file),
              size: f.size,
              type: f.type,
            }))
          : undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      // Upload files if any
      let uploadedFileUrls: string[] = []
      if (attachedFiles.length > 0) {
        uploadedFileUrls = await uploadFiles(attachedFiles)
      }

      // Prepare attachments for API
      const attachmentsForApi =
        attachedFiles.length > 0
          ? attachedFiles.map((file, index) => ({
              name: file.name,
              url: uploadedFileUrls[index],
              size: file.size,
              type: file.type,
            }))
          : undefined

      // Send message to API with streaming
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId,
          siteId,
          executionMode,
          attachments: attachmentsForApi,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to send message')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  fullContent += parsed.content
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessage.id
                        ? { ...msg, content: fullContent, isStreaming: true }
                        : msg
                    )
                  )
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }

      // Mark as complete
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id ? { ...msg, isStreaming: false } : msg
        )
      )
      setAttachedFiles([])
    } catch (error) {
      console.error('Error sending message:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message')
      setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessage.id))
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newFiles: AttachedFile[] = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }))

    setAttachedFiles((prev) => [...prev, ...newFiles])
    e.target.value = ''
  }

  const removeAttachedFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async (files: AttachedFile[]): Promise<string[]> => {
    setIsUploadingFiles(true)

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file.file)

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

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto px-4 sm:px-6">
      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 flex-1 leading-relaxed">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto -mx-4 px-4 sm:-mx-6 sm:px-6" ref={messagesContainerRef}>
        {isLoadingHistory ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
              </div>
              <p className="text-sm text-gray-400 font-medium">Loading conversation...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              AI-Powered SEO Assistant
            </h3>
            <p className="text-gray-400 max-w-md leading-relaxed text-base">
              Get instant SEO analysis, content optimization suggestions, and automated fixes for your website.
            </p>
            <div className="flex flex-wrap gap-2 mt-8 justify-center">
              <button
                onClick={() => setInput('Analyze my site for SEO issues')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 transition-all"
              >
                Analyze my site
              </button>
              <button
                onClick={() => setInput('How can I improve my page speed?')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 transition-all"
              >
                Improve page speed
              </button>
              <button
                onClick={() => setInput('Generate meta descriptions for my products')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 transition-all"
              >
                Generate meta tags
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 py-6">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-white/5 pt-6 pb-4">
        {/* Attached Files Preview */}
        {attachedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-2.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                {file.type.startsWith('image/') ? (
                  <ImageIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                ) : (
                  <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-300 max-w-[200px] truncate font-medium">{file.name}</span>
                <button
                  onClick={() => removeAttachedFile(index)}
                  className="ml-1 text-gray-500 hover:text-red-400 transition-colors p-1 hover:bg-red-500/10 rounded-lg"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Input Box */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl focus-within:border-blue-500/50 focus-within:bg-white/[0.07] transition-all shadow-xl shadow-black/5">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about SEO, content optimization, or technical fixes..."
            rows={1}
            disabled={isLoading || isUploadingFiles}
            className="w-full bg-transparent px-5 py-4 pr-28 text-white placeholder-gray-500 focus:outline-none resize-none max-h-[200px] text-[15px] leading-relaxed"
          />

          {/* Action Buttons */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
            {/* File Attachment */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isUploadingFiles}
              className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Attach files"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={(!input.trim() && attachedFiles.length === 0) || isLoading || isUploadingFiles}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-blue-600/20 disabled:shadow-none"
              title="Send message"
            >
              {isLoading || isUploadingFiles ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center mt-3 font-medium">
          Press <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}

// Message Bubble Component
function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className={cn('flex gap-4 items-start', isUser && 'flex-row-reverse')}>
        {/* Avatar */}
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg',
            isUser
              ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/20'
              : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/20'
          )}
        >
          {isUser ? (
            <span className="text-xs font-bold text-white">You</span>
          ) : (
            <Sparkles className="h-5 w-5 text-white" />
          )}
        </div>

        {/* Content */}
        <div className={cn('flex-1 space-y-3 max-w-[85%]', isUser && 'flex flex-col items-end')}>
          {/* Streaming indicator */}
          {message.isStreaming && !message.content && (
            <div className="flex items-center gap-2.5 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex gap-1.5">
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms', animationDuration: '1s' }}
                />
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: '200ms', animationDuration: '1s' }}
                />
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: '400ms', animationDuration: '1s' }}
                />
              </div>
              <span className="text-sm text-gray-400 font-medium">Thinking...</span>
            </div>
          )}

          {/* Message Text */}
          {message.content && (
            <div
              className={cn(
                'prose prose-invert max-w-none transition-all',
                isUser
                  ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white px-5 py-3.5 rounded-2xl rounded-tr-md shadow-lg shadow-blue-600/20'
                  : 'text-gray-200'
              )}
            >
              {isUser ? (
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed m-0">
                  {message.content}
                </p>
              ) : (
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      const isInline = !(props as { inline?: boolean }).inline
                      return isInline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-xl my-4 !bg-black/40 border border-white/10 shadow-xl"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-white/10 px-2 py-1 rounded-lg text-sm text-blue-300 font-mono border border-white/10"
                        >
                          {children}
                        </code>
                      )
                    },
                    p: ({ children }: { children?: React.ReactNode }) => (
                      <p className="text-[15px] leading-relaxed mb-4 last:mb-0 text-gray-200">{children}</p>
                    ),
                    ul: ({ children }: { children?: React.ReactNode }) => (
                      <ul className="list-disc list-outside ml-5 space-y-2 mb-4 text-gray-300">{children}</ul>
                    ),
                    ol: ({ children }: { children?: React.ReactNode }) => (
                      <ol className="list-decimal list-outside ml-5 space-y-2 mb-4 text-gray-300">{children}</ol>
                    ),
                    li: ({ children }: { children?: React.ReactNode }) => <li className="text-gray-300 leading-relaxed">{children}</li>,
                    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                      >
                        {children}
                      </a>
                    ),
                    h1: ({ children }: { children?: React.ReactNode }) => (
                      <h1 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h1>
                    ),
                    h2: ({ children }: { children?: React.ReactNode }) => (
                      <h2 className="text-xl font-bold text-white mb-3 mt-5">{children}</h2>
                    ),
                    h3: ({ children }: { children?: React.ReactNode }) => (
                      <h3 className="text-lg font-semibold text-white mb-2 mt-4">{children}</h3>
                    ),
                    blockquote: ({ children }: { children?: React.ReactNode }) => (
                      <blockquote className="border-l-4 border-blue-500/50 pl-4 italic text-gray-400 my-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          )}

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {message.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all shadow-lg"
                >
                  {attachment.type.startsWith('image/') ? (
                    <ImageIcon className="h-4 w-4 text-blue-400" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-400" />
                  )}
                  <span className="text-sm text-gray-300 font-medium">{attachment.name}</span>
                </a>
              ))}
            </div>
          )}

          {/* Copy Button (AI messages only) */}
          {!isUser && message.content && !message.isStreaming && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  <span className="font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="font-medium">Copy response</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
