'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Home,
  Globe,
  Settings,
  CreditCard,
  Bell,
  FileText,
  BarChart3,
  Users,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Command {
  id: string
  label: string
  icon: React.ElementType
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const commands: Command[] = [
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      icon: Home,
      action: () => router.push('/dashboard'),
      keywords: ['home', 'overview'],
    },
    {
      id: 'sites',
      label: 'View Sites',
      icon: Globe,
      action: () => router.push('/dashboard/sites'),
      keywords: ['websites', 'domains'],
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: BarChart3,
      action: () => router.push('/dashboard/analytics'),
      keywords: ['stats', 'metrics', 'performance'],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => router.push('/dashboard/settings'),
      keywords: ['preferences', 'configuration'],
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      action: () => router.push('/dashboard/billing'),
      keywords: ['payment', 'subscription', 'plan'],
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      action: () => router.push('/dashboard/notifications'),
      keywords: ['alerts', 'updates'],
    },
    {
      id: 'docs',
      label: 'Documentation',
      icon: FileText,
      action: () => window.open('/docs', '_blank'),
      keywords: ['help', 'guide', 'manual'],
    },
  ]

  const filteredCommands = React.useMemo(() => {
    if (!query) return commands

    const lowerQuery = query.toLowerCase()
    return commands.filter((cmd) => {
      const labelMatch = cmd.label.toLowerCase().includes(lowerQuery)
      const keywordMatch = cmd.keywords?.some((k) => k.includes(lowerQuery))
      return labelMatch || keywordMatch
    })
  }, [query])

  const handleSelect = (command: Command) => {
    command.action()
    onClose()
    setQuery('')
  }

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="fixed left-1/2 top-20 z-50 w-full max-w-2xl -translate-x-1/2 px-4">
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-800 px-4">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none"
            />
            <kbd className="hidden rounded bg-gray-800 px-2 py-1 text-xs text-gray-400 sm:inline-block">
              ESC
            </kbd>
          </div>

          {/* Command List */}
          <div className="max-h-96 overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">
                No commands found
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCommands.map((command) => {
                  const Icon = command.icon
                  return (
                    <button
                      key={command.id}
                      onClick={() => handleSelect(command)}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{command.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 px-4 py-2 text-xs text-gray-500">
            <div className="flex items-center justify-between">
              <span>Use arrow keys to navigate</span>
              <div className="flex items-center gap-2">
                <kbd className="rounded bg-gray-800 px-2 py-1">⌘K</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
