'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Globe, AlertCircle, MessageSquare, User, LucideIcon } from 'lucide-react'

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
  isPrimary?: boolean
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Globe, label: 'Sites', href: '/dashboard/sites' },
  { icon: MessageSquare, label: 'Chat', href: '/dashboard/chat', isPrimary: true },
  { icon: AlertCircle, label: 'Issues', href: '/dashboard/issues' },
  { icon: User, label: 'Account', href: '/dashboard/settings' },
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
      <div className="flex items-end justify-around h-20 px-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === '/dashboard/chat' && pathname.startsWith('/dashboard/chat'))
          const isPrimary = item.isPrimary

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative
                flex flex-col items-center justify-center gap-1
                transition-all duration-300
                active:scale-95
                ${isPrimary ? 'mb-2' : 'mb-0'}
                ${isPrimary ? 'px-6 py-3' : 'px-3 py-2'}
                ${isActive ? 'text-white' : 'text-gray-400'}
              `}
            >
              {/* Primary button background (Chat) */}
              {isPrimary && (
                <motion.div
                  className={`
                    absolute inset-0 rounded-2xl
                    ${isActive
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-md shadow-gray-900/50'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Regular active background */}
              {!isPrimary && isActive && (
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
              <Icon className={`
                relative z-10
                ${isPrimary ? 'w-7 h-7' : 'w-6 h-6'}
                ${isActive ? 'stroke-2' : 'stroke-1.5'}
                ${isPrimary && isActive ? 'drop-shadow-lg' : ''}
              `} />

              {/* Label */}
              <span className={`
                text-[10px] font-medium relative z-10 whitespace-nowrap
                ${isActive ? 'font-bold' : 'font-normal'}
                ${isPrimary ? 'text-xs' : 'text-[10px]'}
                ${isPrimary && isActive ? 'drop-shadow-md' : ''}
              `}>
                {item.label}
              </span>

              {/* Active indicator dot for primary */}
              {isPrimary && isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 right-1/2 translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg shadow-white/50"
                />
              )}

              {/* Active indicator line for regular items */}
              {!isPrimary && isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
