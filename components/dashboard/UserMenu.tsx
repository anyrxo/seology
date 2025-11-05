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
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-800"
      >
        <Avatar className="h-8 w-8">
          <img
            src={user?.imageUrl || '/default-avatar.png'}
            alt={user?.fullName || 'User'}
          />
        </Avatar>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-gray-800 bg-gray-900 shadow-lg">
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

            {/* Menu Items */}
            <div className="p-2">
              {/* Navigation Section */}
              <div className="mb-2">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/sites"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <Globe className="h-4 w-4" />
                  Sites
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  href="/dashboard/issues"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Issues
                </Link>
                <Link
                  href="/dashboard/fixes"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Fixes
                </Link>
              </div>

              {/* Account Section */}
              <div className="border-t border-gray-800 pt-2">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</p>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <Link
                  href="/dashboard/billing"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <CreditCard className="h-4 w-4" />
                  Billing
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <HelpCircle className="h-4 w-4" />
                  Help & Docs
                </Link>
              </div>
            </div>

            {/* Sign Out */}
            <div className="border-t border-gray-800 p-2">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
