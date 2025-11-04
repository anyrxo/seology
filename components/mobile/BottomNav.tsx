'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Globe, AlertCircle, Settings, LucideIcon } from 'lucide-react'

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Globe, label: 'Sites', href: '/dashboard/sites' },
  { icon: AlertCircle, label: 'Issues', href: '/dashboard/issues' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="
      md:hidden
      fixed bottom-0 left-0 right-0 z-40
      bg-gray-900/98 backdrop-blur-2xl
      border-t border-gray-800/50
      safe-bottom
      shadow-2xl shadow-black/20
    ">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative
                flex flex-col items-center justify-center gap-1
                px-4 py-2
                rounded-xl
                transition-all duration-200
                ${isActive ? 'text-white' : 'text-gray-400'}
                active:scale-95
              `}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-500/20 rounded-xl border border-blue-500/30"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon */}
              <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />

              {/* Label */}
              <span className={`
                text-xs font-medium relative z-10
                ${isActive ? 'font-bold' : 'font-normal'}
              `}>
                {item.label}
              </span>

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
