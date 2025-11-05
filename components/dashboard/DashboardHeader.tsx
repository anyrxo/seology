'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { NotificationDropdown } from './NotificationDropdown'
import { UserMenu } from './UserMenu'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'

interface CreditBalance {
  monthlyCredits: number
  monthlyUsed: number
  monthlyRemaining: number
  purchasedCredits: number
  totalAvailable: number
  isUnlimited: boolean
}

/**
 * DashboardHeader Component
 * Simplified header with breadcrumbs, notifications, and user menu
 * Features:
 * - Sticky header with backdrop blur
 * - Dynamic breadcrumbs
 * - Notifications dropdown
 * - User menu with full navigation
 * - Responsive mobile layout
 * - AI Credits display
 * - Execution mode selector
 */
export function DashboardHeader() {
  const pathname = usePathname()
  const [credits, setCredits] = React.useState<CreditBalance | null>(null)
  const [executionMode, setExecutionMode] = React.useState<ExecutionMode>('AUTOMATIC')
  const [isLoadingCredits, setIsLoadingCredits] = React.useState(true)
  const [isLoadingMode, setIsLoadingMode] = React.useState(true)

  // Load user data on mount
  React.useEffect(() => {
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
  }, [])

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
    }
  }

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
      {/* Header - Mobile Optimized */}
      <header className="header-wrapper bg-gray-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/10">
        <div className="container-default w-container px-3 md:px-6">
          <div className="header-content-wrapper flex items-center justify-between h-14 md:h-16">
            {/* Left: Page Title */}
            <div className="flex-1 min-w-0 mr-auto">
              {/* Desktop: Show breadcrumbs */}
              <div className="hidden md:block">
                <Breadcrumbs items={breadcrumbItems} />
              </div>

              {/* Mobile: Show current page title - Compact */}
              <div className="md:hidden">
                <h1 className="text-sm font-semibold text-white truncate">
                  {breadcrumbItems[breadcrumbItems.length - 1]?.label || 'Dashboard'}
                </h1>
              </div>
            </div>

            {/* Right: Header Actions - Touch Optimized */}
            <div className="flex items-center gap-2 md:gap-3 ml-auto">
              {/* AI Credits - On Chat page only */}
              {pathname === '/dashboard/chat' && !isLoadingCredits && credits && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-medium text-white">
                    {credits.isUnlimited ? 'Unlimited' : credits.totalAvailable}
                  </span>
                </div>
              )}

              {/* Execution Mode - On Chat page only */}
              {pathname === '/dashboard/chat' && !isLoadingMode && (
                <div className="hidden md:flex items-center gap-1 px-1 py-1 rounded-lg bg-white/5 border border-white/5">
                  {(['AUTOMATIC', 'PLAN', 'APPROVE'] as ExecutionMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleExecutionModeChange(mode)}
                      className={cn(
                        'px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                        executionMode === mode
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {mode === 'AUTOMATIC' && 'Auto'}
                      {mode === 'PLAN' && 'Plan'}
                      {mode === 'APPROVE' && 'Approve'}
                    </button>
                  ))}
                </div>
              )}

              {/* Notifications - Touch Friendly */}
              <div className="relative">
                <button
                  className="p-2 md:hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors touch-manipulation"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <NotificationDropdown />
                </button>
              </div>

              {/* User Menu with all navigation - Touch Friendly */}
              <UserMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
