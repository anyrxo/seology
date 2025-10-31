'use client'

import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import { NotificationBell } from '@/components/notifications/NotificationBell'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-950">
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sites, issues, fixes..."
            className="h-10 w-full rounded-lg border bg-gray-50 pl-10 pr-4 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <NotificationBell />

        {/* User menu */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
