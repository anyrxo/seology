'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Command, Bell } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { GlobalSearch } from './GlobalSearch'
import { NotificationDropdown } from './NotificationDropdown'
import { UserMenu } from './UserMenu'
import { CommandPalette } from './CommandPalette'
import NotificationCenter from '@/components/notifications/NotificationCenter'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

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
      {/* Dashflow X + Radiant UI Header */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
        <div className="w-layout-blockcontainer rt-nav-one-container w-container">
          <div className="w-layout-hflex rt-nav-one-wrap align-center" style={{ minHeight: '64px' }}>
            {/* Left: Breadcrumbs - Hidden on mobile, show page title instead */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 ml-14 lg:ml-0">
              <div className="hidden sm:block">
                <Breadcrumbs items={breadcrumbItems} />
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-semibold text-white truncate">
                  {breadcrumbItems[breadcrumbItems.length - 1]?.label || 'Dashboard'}
                </h1>
              </div>
            </div>

            {/* Right: Actions with Radiant UI styling */}
            <div className="w-layout-hflex align-center" style={{ gap: '16px' }}>
              {/* Command Palette Trigger - Desktop only */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden xl:flex btn-secondary items-center"
                style={{ gap: '8px' }}
              >
                <div className="rt-icon-box">
                  <Command className="h-4 w-4" />
                </div>
                <span className="hidden 2xl:inline rt-button-font">Quick actions</span>
                <kbd className="rounded bg-gray-800 px-2 py-0.5 text-xs rt-button-font">
                  ⌘K
                </kbd>
              </button>

              {/* Search - Hidden on small mobile */}
              <div className="hidden sm:block">
                <GlobalSearch />
              </div>

              {/* Theme Toggle with Radiant UI styling */}
              <div className="rt-icon-box">
                <ThemeToggle />
              </div>

              {/* Notifications - Show on mobile (lg shows in sidebar) */}
              <div className="lg:hidden">
                <div className="rt-icon-box">
                  <NotificationCenter />
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="rt-icon-box">
                  <NotificationDropdown />
                </div>
              </div>

              {/* User Menu */}
              <UserMenu />
            </div>
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
