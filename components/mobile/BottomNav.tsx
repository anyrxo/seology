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
      bg-gray-900/95 backdrop-blur-xl
      border-t border-gray-800
      safe-bottom
    ">
      <div className="flex items-center justify-around h-16 px-2">
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
                min-w-touch min-h-touch
                px-3 py-2
                rounded-lg
                transition-all duration-200
                ${isActive ? 'text-white' : 'text-gray-400'}
                active:scale-95
              `}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-blue-600/20 rounded-lg"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon */}
              <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />

              {/* Label */}
              <span className={`
                text-xs font-medium relative z-10
                ${isActive ? 'font-semibold' : 'font-normal'}
              `}>
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 w-1 h-1 bg-blue-500 rounded-full"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
