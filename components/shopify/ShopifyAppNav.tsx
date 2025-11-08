/**
 * Shopify App Navigation Component
 * Follows Shopify's design guidelines with Atlas dark theme
 *
 * Features:
 * - Sidebar navigation on desktop
 * - Mobile-responsive header navigation
 * - Active state indicators
 * - Icon-based menu items
 * - View More for 7+ items
 */

'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

export function ShopifyAppNav() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [showMore, setShowMore] = useState(false)
  const [aiChatEnabled, setAiChatEnabled] = useState(true) // Default to true

  // Fetch user preferences
  useEffect(() => {
    if (!shop) return

    fetch(`/api/shopify/preferences?shop=${shop}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAiChatEnabled(data.data.aiChatEnabled)
        }
      })
      .catch(err => console.error('Failed to fetch preferences:', err))
  }, [shop])

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: `/shopify/dashboard${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'chat',
      label: 'AI Assistant',
      href: `/shopify/chat${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      id: 'products',
      label: 'Products',
      href: `/shopify/products${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'issues',
      label: 'Issues',
      href: `/shopify/issues${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      id: 'fixes',
      label: 'Fixes',
      href: `/shopify/fixes${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      href: `/shopify/settings${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'audit',
      label: 'AI Audit',
      href: `/shopify/audit${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      href: `/shopify/analytics${shop ? `?shop=${shop}` : ''}`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  // Filter navItems based on user preferences
  const filteredNavItems = navItems.filter(item => {
    // Hide chat if user disabled it during onboarding
    if (item.id === 'chat' && !aiChatEnabled) {
      return false
    }
    return true
  })

  // Shopify guideline: Show first 6 items, truncate rest into "View More"
  const visibleItems = showMore ? filteredNavItems : filteredNavItems.slice(0, 6)
  const hasMoreItems = filteredNavItems.length > 6

  const isActive = (href: string) => {
    // Remove query params for comparison
    const currentPath = pathname
    const itemPath = href.split('?')[0]
    return currentPath === itemPath
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="w-64 bg-[#191A1B] border-r border-gray-700 flex flex-col h-screen">
      {/* App Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">SEOLOGY</h1>
            <p className="text-gray-400 text-xs">SEO Automation</p>
          </div>
        </div>
      </div>

      {/* Store Info */}
      {shop && (
        <div className="px-4 py-3 bg-[#262A2B] border-b border-gray-700">
          <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Connected Store</div>
          <div className="text-white text-sm font-medium truncate">{shop}</div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:bg-[#262A2B] hover:text-white'
              }`}
            >
              <span className={isActive(item.href) ? 'text-white' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}

          {/* View More Button */}
          {hasMoreItems && !showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#262A2B] hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium text-sm">View More</span>
            </button>
          )}

          {/* View Less Button */}
          {showMore && (
            <button
              onClick={() => setShowMore(false)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#262A2B] hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              <span className="font-medium text-sm">View Less</span>
            </button>
          )}
        </div>
      </nav>

      {/* Footer - User/Plan Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-[#262A2B] rounded-lg p-3">
          <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Current Plan</div>
          <div className="text-white font-medium text-sm">Growth</div>
          <button className="mt-2 w-full px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  )
}
