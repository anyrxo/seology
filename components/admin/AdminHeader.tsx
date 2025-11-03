'use client'

import * as React from 'react'
import Link from 'next/link'
import { Shield, BarChart3, Users, Clock } from 'lucide-react'
import { SystemStatus } from './SystemStatus'
import { NotificationDropdown } from '@/components/dashboard/NotificationDropdown'
import { UserMenu } from '@/components/dashboard/UserMenu'

interface QuickStat {
  label: string
  value: string
  icon: React.ElementType
  href: string
}

export function AdminHeader() {
  const quickStats: QuickStat[] = [
    { label: 'Total Users', value: '1,234', icon: Users, href: '/admin/users' },
    { label: 'Active Sites', value: '3,456', icon: BarChart3, href: '/admin/sites' },
    { label: 'Queue Jobs', value: '23', icon: Clock, href: '/admin/jobs' },
  ]

  return (
    <div className="border-b border-gray-800 bg-gray-950">
      {/* Admin Warning Banner */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Admin Mode</span>
            <span className="text-gray-400">- You have elevated privileges</span>
          </div>
          <Link
            href="/dashboard"
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Switch to User View →
          </Link>
        </div>
      </div>

      {/* Header with Quick Stats */}
      <div className="flex h-16 items-center justify-between px-8">
        {/* Left: Quick Stats */}
        <div className="flex items-center gap-6">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="group flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-900"
              >
                <Icon className="h-4 w-4 text-gray-400 group-hover:text-white" />
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="font-semibold text-white">{stat.value}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Right: System Status, Notifications, User Menu */}
        <div className="flex items-center gap-4">
          <SystemStatus />
          <NotificationDropdown />
          <UserMenu />
        </div>
      </div>
    </div>
  )
}
