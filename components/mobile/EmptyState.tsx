'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  illustration?: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info'
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  illustration,
  variant = 'default'
}: EmptyStateProps) {
  const variantStyles = {
    default: {
      iconBg: 'bg-gray-800/50',
      iconColor: 'text-gray-400',
      gradient: 'from-gray-600/20 to-gray-800/20',
    },
    success: {
      iconBg: 'bg-green-900/30',
      iconColor: 'text-green-400',
      gradient: 'from-green-600/10 to-green-800/20',
    },
    warning: {
      iconBg: 'bg-yellow-900/30',
      iconColor: 'text-yellow-400',
      gradient: 'from-yellow-600/10 to-yellow-800/20',
    },
    info: {
      iconBg: 'bg-blue-900/30',
      iconColor: 'text-blue-400',
      gradient: 'from-blue-600/10 to-blue-800/20',
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className="flex items-center justify-center min-h-[400px] md:min-h-[500px] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Illustration or Icon */}
        {illustration ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            {illustration}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6"
          >
            {/* Gradient background circle */}
            <div className="relative inline-block">
              <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} rounded-full blur-xl`}></div>
              <div className={`relative ${styles.iconBg} backdrop-blur-sm border border-white/5 rounded-full p-6 md:p-8`}>
                <Icon className={`w-12 h-12 md:w-16 md:h-16 ${styles.iconColor}`} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-bold text-white mb-3"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-gray-400 mb-6 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Action Button */}
        {action && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={action.onClick}
            className="
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-500 hover:to-blue-400
              text-white font-semibold text-sm md:text-base
              shadow-lg shadow-blue-600/30
              transition-all duration-200
              active:scale-95
              border border-blue-400/20
            "
          >
            {action.label}
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

// Preset empty states for common scenarios
export function NoSitesEmpty({ onAddSite }: { onAddSite: () => void }) {
  return (
    <EmptyState
      icon={require('lucide-react').Globe}
      title="No sites connected yet"
      description="Connect your first website to start analyzing and fixing SEO issues automatically."
      action={{
        label: 'Connect Your First Site',
        onClick: onAddSite,
      }}
      variant="info"
    />
  )
}

export function NoIssuesEmpty() {
  return (
    <EmptyState
      icon={require('lucide-react').CheckCircle}
      title="All clear!"
      description="Your website has no SEO issues detected. Keep up the great work!"
      variant="success"
    />
  )
}

export function NoFixesEmpty() {
  return (
    <EmptyState
      icon={require('lucide-react').Wrench}
      title="No fixes applied yet"
      description="Once you start fixing SEO issues, they'll appear here with full details and rollback options."
      variant="default"
    />
  )
}

export function NoNotificationsEmpty() {
  return (
    <EmptyState
      icon={require('lucide-react').Bell}
      title="You're all caught up"
      description="No new notifications. We'll notify you when there's important updates about your sites."
      variant="success"
    />
  )
}

export function SearchEmpty({ query }: { query: string }) {
  return (
    <EmptyState
      icon={require('lucide-react').Search}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search terms.`}
      variant="default"
    />
  )
}

export function LoadingErrorEmpty({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      icon={require('lucide-react').AlertCircle}
      title="Failed to load data"
      description="Something went wrong while loading. Please try again."
      action={{
        label: 'Try Again',
        onClick: onRetry,
      }}
      variant="warning"
    />
  )
}
