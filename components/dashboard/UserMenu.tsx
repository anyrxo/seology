'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Globe,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  LayoutDashboard,
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'

export function UserMenu() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="relative">
      {/* Avatar Button - Touch Optimized */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-2 active:bg-gray-800 md:hover:bg-gray-800 transition-colors touch-manipulation"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <Avatar className="h-8 w-8 flex-shrink-0">
          <img
            src={user?.imageUrl || '/default-avatar.png'}
            alt={user?.fullName || 'User'}
          />
        </Avatar>
      </button>

      {/* Dropdown Menu - Mobile Optimized */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 md:bg-transparent" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-72 md:w-64 max-h-[80vh] overflow-y-auto rounded-xl border border-gray-800 bg-gray-900/98 backdrop-blur-xl shadow-2xl">
            {/* User Info */}
            <div className="border-b border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img
                    src={user?.imageUrl || '/default-avatar.png'}
                    alt={user?.fullName || 'User'}
                  />
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-semibold text-white">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="truncate text-sm text-gray-400">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items - Touch Friendly */}
            <div className="p-2">
              {/* Navigation Section */}
              <div className="mb-2">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/sites"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <Globe className="h-4 w-4 flex-shrink-0" />
                  Sites
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <BarChart3 className="h-4 w-4 flex-shrink-0" />
                  Analytics
                </Link>
                <Link
                  href="/dashboard/issues"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  Issues
                </Link>
                <Link
                  href="/dashboard/fixes"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  Fixes
                </Link>
              </div>

              {/* Account Section */}
              <div className="border-t border-gray-800 pt-2">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</p>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <Settings className="h-4 w-4 flex-shrink-0" />
                  Settings
                </Link>
                <Link
                  href="/dashboard/billing"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <CreditCard className="h-4 w-4 flex-shrink-0" />
                  Billing
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-gray-300 active:bg-gray-800 md:hover:bg-gray-800 active:text-white md:hover:text-white transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  style={{ minHeight: '44px' }}
                >
                  <HelpCircle className="h-4 w-4 flex-shrink-0" />
                  Help & Docs
                </Link>
              </div>
            </div>

            {/* Sign Out - Touch Friendly */}
            <div className="border-t border-gray-800 p-2">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-red-400 active:bg-gray-800 md:hover:bg-gray-800 transition-colors touch-manipulation"
                style={{ minHeight: '44px' }}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
