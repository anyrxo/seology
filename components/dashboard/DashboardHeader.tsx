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
      {/* Dashflow X Header - Exact template structure */}
      <header className="header-wrapper">
        <div className="container-default w-container">
          <div className="header-content-wrapper">
            {/* Left: Breadcrumbs / Page Title */}
            <div className="flex-1 min-w-0">
              {/* Desktop: Show breadcrumbs */}
              <div className="hidden md:block">
                <Breadcrumbs items={breadcrumbItems} />
              </div>

              {/* Mobile: Show current page title */}
              <div className="md:hidden">
                <h1 className="text-200 medium color-neutral-800 truncate">
                  {breadcrumbItems[breadcrumbItems.length - 1]?.label || 'Dashboard'}
                </h1>
              </div>
            </div>

            {/* Right: Header Actions - Dashflow X Style */}
            <div className="header-right-side-container flex items-center gap-12px">
              {/* Command Palette Trigger - Desktop only */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden lg:flex btn-secondary small items-center gap-8px"
                title="Quick actions (⌘K)"
              >
                <Command className="h-4 w-4" />
                <span className="hidden xl:inline text-100 medium">Quick actions</span>
                <kbd className="card pd-6px text-50 medium color-neutral-600 rounded ml-8px">
                  ⌘K
                </kbd>
              </button>

              {/* Desktop Search Bar - Hidden on tablet/mobile */}
              <div className="hidden lg:block">
                <GlobalSearch />
              </div>

              {/* Search Icon - Tablet and mobile */}
              <button
                className="lg:hidden card-icon-square _40px neutral-icon flex items-center justify-center"
                aria-label="Search"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Settings Icon */}
              <button
                className="card-icon-square _40px neutral-icon hidden xl:flex items-center justify-center"
                aria-label="Settings"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>

              {/* Theme Toggle */}
              <div className="card-icon-square _40px neutral-icon flex items-center justify-center">
                <ThemeToggle />
              </div>

              {/* Notifications */}
              <div className="position-relative">
                <div className="card-icon-square _40px neutral-icon flex items-center justify-center">
                  <NotificationDropdown />
                </div>
              </div>

              {/* User Menu with Avatar */}
              <UserMenu />
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
