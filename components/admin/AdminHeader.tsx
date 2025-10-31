'use client'

import { UserButton } from '@clerk/nextjs'
import { Bell, Search, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-950">
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <Badge variant="destructive" className="gap-1">
          <Shield className="h-3 w-3" />
          Admin Mode
        </Badge>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users, sites, issues..."
            className="h-10 w-full rounded-lg border bg-gray-50 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* User menu */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
