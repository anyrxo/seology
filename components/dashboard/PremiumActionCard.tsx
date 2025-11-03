'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PremiumActionCardProps {
  title: string
  description: string
  href: string
  icon: string
  gradient?: 'blue' | 'purple' | 'pink' | 'green' | 'orange'
  external?: boolean
}

const gradientClasses = {
  blue: 'from-blue-500/20 via-cyan-500/20 to-blue-500/20',
  purple: 'from-purple-500/20 via-pink-500/20 to-purple-500/20',
  pink: 'from-pink-500/20 via-rose-500/20 to-pink-500/20',
  green: 'from-emerald-500/20 via-green-500/20 to-emerald-500/20',
  orange: 'from-orange-500/20 via-amber-500/20 to-orange-500/20',
}

const glowClasses = {
  blue: 'group-hover:shadow-blue-500/20',
  purple: 'group-hover:shadow-purple-500/20',
  pink: 'group-hover:shadow-pink-500/20',
  green: 'group-hover:shadow-green-500/20',
  orange: 'group-hover:shadow-orange-500/20',
}

export function PremiumActionCard({
  title,
  description,
  href,
  icon,
  gradient = 'blue',
  external = false,
}: PremiumActionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="h-full"
    >
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group relative block h-full overflow-hidden rounded-2xl transition-all duration-500 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl p-6"
      >
        {/* Animated gradient background */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700',
            gradientClasses[gradient]
          )}
        />

        {/* Shine effect that sweeps across on hover */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Border glow effect */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            'shadow-2xl',
            glowClasses[gradient]
          )}
        />

        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-2xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with rotation animation */}
          <motion.div
            className="text-3xl mb-4 inline-block"
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              scale: 1.1,
              transition: { duration: 0.5 }
            }}
          >
            {icon}
          </motion.div>

          {/* Title with gradient on hover */}
          <h3 className="text-base font-semibold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 flex items-center gap-2">
            {title}
            <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
          </p>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  )
}

// Grid container for action cards
interface PremiumActionGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  className?: string
}

export function PremiumActionGrid({
  children,
  cols = 3,
  className
}: PremiumActionGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <motion.div
      className={cn('grid gap-4 sm:gap-6', gridCols[cols], className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}
