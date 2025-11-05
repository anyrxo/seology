'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { NotificationDropdown } from './NotificationDropdown'
import { UserMenu } from './UserMenu'

/**
 * DashboardHeader Component
 * Simplified header with breadcrumbs, notifications, and user menu
 * Features:
 * - Sticky header with backdrop blur
 * - Dynamic breadcrumbs
 * - Notifications dropdown
 * - User menu with full navigation
 * - Responsive mobile layout
 */
export function DashboardHeader() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const breadcrumbItems = React.useMemo(() => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      href: '/' + paths.slice(0, index + 1).join('/'),
    }))
  }, [pathname])

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

            {/* Right: Header Actions - Simplified */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <NotificationDropdown />
                </button>
              </div>

              {/* User Menu with all navigation */}
              <UserMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
