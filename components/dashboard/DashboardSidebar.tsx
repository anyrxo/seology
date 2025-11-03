'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import {
  MessageSquare,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Settings,
  Globe,
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  Eye,
  Zap,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
  isMobile: boolean
}

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  badge?: string
  badgeVariant?: 'default' | 'danger' | 'success' | 'warning' | 'info'
}

const navItems: NavItem[] = [
  { icon: MessageSquare, label: 'Chat', href: '/dashboard', badge: 'AI' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: AlertTriangle, label: 'Issues', href: '/dashboard/issues', badge: '3', badgeVariant: 'danger' },
  { icon: CheckCircle, label: 'Fixes', href: '/dashboard/fixes' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function DashboardSidebar({ isOpen, onClose, isMobile }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [sitesExpanded, setSitesExpanded] = useState(true)

  // Mock data - replace with actual data from API
  const stats = {
    issues: 12,
    fixes: 48,
    score: 85,
  }

  const connectedSites = [
    { id: '1', name: 'example.com', platform: 'SHOPIFY', icon: '🛍️' },
    { id: '2', name: 'mysite.com', platform: 'WORDPRESS', icon: '📝' },
  ]

  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0 h-screen z-40
        w-80 flex flex-col
        bg-gray-900/80 backdrop-blur-xl border-r border-white/10
        transition-transform duration-300 ease-in-out
        ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 group"
          onClick={onClose}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              Seology AI
            </h1>
            <p className="text-xs text-gray-400">Assistant</p>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-white/10">
        <div className="grid grid-cols-3 gap-2">
          <GlassCard variant="light" blur="md" padding="sm" hover="none" className="text-center">
            <div className="text-xl font-bold text-red-400">{stats.issues}</div>
            <div className="text-xs text-gray-400 mt-1">Issues</div>
          </GlassCard>
          <GlassCard variant="light" blur="md" padding="sm" hover="none" className="text-center">
            <div className="text-xl font-bold text-green-400">{stats.fixes}</div>
            <div className="text-xs text-gray-400 mt-1">Fixes</div>
          </GlassCard>
          <GlassCard variant="light" blur="md" padding="sm" hover="none" className="text-center">
            <div className="text-xl font-bold text-blue-400">{stats.score}</div>
            <div className="text-xs text-gray-400 mt-1">Score</div>
          </GlassCard>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center justify-between px-4 py-3 rounded-xl
                  transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-400'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant || 'default'}
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>

        {/* Connected Sites Section */}
        <div className="pt-4">
          <button
            onClick={() => setSitesExpanded(!sitesExpanded)}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Connected Sites</span>
            </div>
            {sitesExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {sitesExpanded && (
            <div className="mt-2 space-y-1">
              {connectedSites.map((site) => (
                <Link
                  key={site.id}
                  href={`/dashboard/sites/${site.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                >
                  <span className="text-lg">{site.icon}</span>
                  <span className="text-sm truncate flex-1">{site.name}</span>
                </Link>
              ))}
              <Link
                href="/dashboard/sites/connect"
                onClick={onClose}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
              >
                <div className="w-5 h-5 rounded border-2 border-dashed border-blue-400 flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
                <span className="text-sm font-medium">Add Site</span>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 space-y-2">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Actions
          </h3>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]">
            <Play className="h-4 w-4" />
            <span className="text-sm font-medium">Run SEO Audit</span>
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Generate Report</span>
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">View Site</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Your Account</p>
            <p className="text-xs text-gray-400 truncate">Manage profile</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
