'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Command } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { GlobalSearch } from './GlobalSearch'
import { NotificationDropdown } from './NotificationDropdown'
import { UserMenu } from './UserMenu'
import { CommandPalette } from './CommandPalette'

export function DashboardHeader() {
  const pathname = usePathname()
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)

  // Generate breadcrumbs from pathname
  const breadcrumbItems = React.useMemo(() => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, index + 1).join('/'),
    }))
  }, [pathname])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-8">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center gap-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Right: Search, Notifications, User Menu */}
          <div className="flex items-center gap-4">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-400 hover:border-gray-700 hover:text-gray-300 lg:flex"
            >
              <Command className="h-4 w-4" />
              <span>Quick actions</span>
              <kbd className="ml-2 rounded bg-gray-800 px-2 py-0.5 text-xs">
                ⌘K
              </kbd>
            </button>

            <GlobalSearch />
            <NotificationDropdown />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  )
}
