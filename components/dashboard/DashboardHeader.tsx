'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Command, Bell, Search, Settings } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { GlobalSearch } from './GlobalSearch'
import { NotificationDropdown } from './NotificationDropdown'
import { UserMenu } from './UserMenu'
import { CommandPalette } from './CommandPalette'
import NotificationCenter from '@/components/notifications/NotificationCenter'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

/**
 * DashboardHeader Component
 * Based on Dashflow X Webflow template header structure
 * Features:
 * - Sticky header with backdrop blur
 * - Dynamic breadcrumbs
 * - Global search
 * - Command palette (⌘K)
 * - Notifications dropdown
 * - User menu with avatar
 * - Theme toggle
 * - Responsive mobile layout
 */
export function DashboardHeader() {
  const pathname = usePathname()
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)

  // Generate breadcrumbs from pathname
  const breadcrumbItems = React.useMemo(() => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
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
      {/* Dashflow X Header - Mobile optimized */}
      <header className="header-wrapper bg-gray-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container-default w-container px-4 md:px-6">
          <div className="header-content-wrapper flex items-center justify-between h-14 md:h-16">
            {/* Left: Page Title */}
            <div className="flex-1 min-w-0">
              {/* Desktop: Show breadcrumbs */}
              <div className="hidden md:block">
                <Breadcrumbs items={breadcrumbItems} />
              </div>

              {/* Mobile: Show current page title - Simplified */}
              <div className="md:hidden">
                <h1 className="text-base font-semibold text-white truncate">
                  {breadcrumbItems[breadcrumbItems.length - 1]?.label || 'Dashboard'}
                </h1>
              </div>
            </div>

            {/* Right: Header Actions - Mobile simplified */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Command Palette Trigger - Desktop only */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden lg:flex btn-secondary small items-center gap-2"
                title="Quick actions (⌘K)"
              >
                <Command className="h-4 w-4" />
                <span className="hidden xl:inline text-sm font-medium">Quick actions</span>
                <kbd className="px-2 py-1 text-xs font-medium bg-white/5 rounded ml-2">
                  ⌘K
                </kbd>
              </button>

              {/* Desktop Search Bar */}
              <div className="hidden lg:block">
                <GlobalSearch />
              </div>

              {/* Mobile: Only show essential icons */}
              <div className="flex items-center gap-1 md:gap-2">
                {/* Notifications - Mobile optimized */}
                <div className="relative">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <NotificationDropdown />
                  </button>
                </div>

                {/* User Menu - Mobile optimized */}
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  )
}
