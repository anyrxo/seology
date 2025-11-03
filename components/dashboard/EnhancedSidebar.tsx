'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserButton } from '@clerk/nextjs'
import { Menu, X, Bell } from 'lucide-react'
import NotificationCenter from '@/components/notifications/NotificationCenter'
import { sidebarItemSlide, iconBounce, backdropBlur } from '@/lib/animation-enhancements'

interface SidebarLink {
  href: string
  label: string
  icon: string
  badge?: number
}

const sidebarLinks: SidebarLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/ai-analysis', label: 'AI Analysis', icon: '🤖' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/sites', label: 'Sites', icon: '🌐' },
  { href: '/dashboard/issues', label: 'Issues', icon: '⚠️', badge: 5 },
  { href: '/dashboard/fixes', label: 'Fixes', icon: '✓' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
]

export default function EnhancedSidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-800 rounded-lg text-white hover:bg-gray-800 transition-colors min-h-touch min-w-touch"
        aria-label="Toggle menu"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {mobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={backdropBlur}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: mobileMenuOpen ? 0 : '-100%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className={`
          flex flex-col w-64 bg-gray-900 border-r border-gray-800 h-screen sticky top-0 z-40
          lg:translate-x-0
          fixed lg:static
        `}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                className="text-lg sm:text-2xl font-bold text-white truncate"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                SEOLOGY.AI
              </motion.div>
            </Link>
            <div className="hidden lg:block">
              <NotificationCenter />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto no-scrollbar">
          {sidebarLinks.map((link, index) => {
            const isActive = pathname === link.href
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block relative"
                >
                  <motion.div
                    variants={sidebarItemSlide}
                    initial="inactive"
                    animate={isActive ? 'active' : 'inactive'}
                    whileHover={!isActive ? 'hover' : undefined}
                    className={`
                      flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-lg
                      min-h-touch relative overflow-hidden
                      ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }
                    `}
                  >
                    {/* Background slide effect */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 bg-blue-600 rounded-lg"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Content */}
                    <span className="text-xl flex-shrink-0 relative z-10">
                      {link.icon}
                    </span>
                    <span className="font-medium text-sm sm:text-base relative z-10 flex-1">
                      {link.label}
                    </span>

                    {/* Badge */}
                    {link.badge && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full"
                      >
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {link.badge}
                        </motion.span>
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* User Profile */}
        <motion.div
          className="p-3 sm:p-4 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Your Account</p>
              <p className="text-xs text-gray-400 truncate">Manage profile</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
