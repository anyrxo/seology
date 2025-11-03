'use client'

import { Bell, Search } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import NotificationCenter from '@/components/notifications/NotificationCenter'
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs'

interface HeaderProps {
  title?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
}

export function Header({ title, breadcrumbs, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Title or Breadcrumbs */}
        <div className="flex-1">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumbs items={breadcrumbs} />
          ) : title ? (
            <h1 className="text-xl font-semibold text-white">{title}</h1>
          ) : null}
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-4">
          {/* Custom Actions */}
          {actions}

          {/* Search (Optional - can be enabled later) */}
          {/* <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Search className="h-5 w-5" />
          </button> */}

          {/* Notifications */}
          <NotificationCenter />

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
