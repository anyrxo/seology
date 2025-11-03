'use client'

/**
 * Optimistic UI Example: Fix Card with optimistic approval
 * Shows immediate feedback when approving fixes
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2, XCircle, AlertCircle, Undo2 } from 'lucide-react'
import { toast } from 'sonner'

interface Fix {
  id: string
  issueId: string
  title: string
  description: string
  status: 'PENDING' | 'APPLYING' | 'COMPLETED' | 'FAILED'
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
  category: string
  createdAt: Date
}

interface OptimisticFixCardProps {
  fix: Fix
  onApprove: (fixId: string) => Promise<void>
  onReject: (fixId: string) => Promise<void>
}

export function OptimisticFixCard({ fix, onApprove, onReject }: OptimisticFixCardProps) {
  const [localStatus, setLocalStatus] = useState(fix.status)
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  async function handleApprove() {
    // Optimistic update
    const previousStatus = localStatus
    setLocalStatus('APPLYING')
    setIsApproving(true)

    try {
      await onApprove(fix.id)

      // Success
      setLocalStatus('COMPLETED')
      toast.success('Fix applied successfully!', {
        description: fix.title,
      })
    } catch (error) {
      // Rollback on error
      setLocalStatus(previousStatus)
      toast.error('Failed to apply fix', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsApproving(false)
    }
  }

  async function handleReject() {
    const previousStatus = localStatus
    setIsRejecting(true)

    try {
      await onReject(fix.id)
      toast.success('Fix rejected')
    } catch (error) {
      setLocalStatus(previousStatus)
      toast.error('Failed to reject fix')
    } finally {
      setIsRejecting(false)
    }
  }

  const statusConfig = {
    PENDING: {
      icon: AlertCircle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    APPLYING: {
      icon: Spinner,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    COMPLETED: {
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    FAILED: {
      icon: XCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
  }

  const config = statusConfig[localStatus]
  const StatusIcon = config.icon

  const impactColors = {
    HIGH: 'bg-red-500/20 text-red-400 border-red-500/30',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    LOW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: localStatus === 'APPLYING' ? 0.7 : 1,
        y: 0,
        scale: localStatus === 'APPLYING' ? 0.98 : 1,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white/5 border rounded-2xl p-6
        transition-all duration-300
        ${config.borderColor}
        ${localStatus === 'APPLYING' ? 'pointer-events-none' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              {localStatus === 'APPLYING' ? (
                <Spinner size="sm" className={config.color} />
              ) : (
                <StatusIcon className={`w-5 h-5 ${config.color}`} />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">{fix.title}</h3>
              <p className="text-white/60 text-sm mt-1">{fix.description}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={impactColors[fix.impact]}>
              {fix.impact} Impact
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/60">
              {fix.category}
            </Badge>
            <span className="text-white/40 text-xs">
              {new Date(fix.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <AnimatePresence mode="wait">
          {localStatus === 'PENDING' && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex gap-2"
            >
              <Button
                size="sm"
                variant="outline"
                onClick={handleReject}
                isLoading={isRejecting}
                disabled={isRejecting}
              >
                Reject
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={handleApprove}
                isLoading={isApproving}
                disabled={isApproving}
              >
                Approve
              </Button>
            </motion.div>
          )}

          {localStatus === 'APPLYING' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-400 text-sm font-medium"
            >
              Applying...
            </motion.div>
          )}

          {localStatus === 'COMPLETED' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-green-400 text-sm font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Applied
            </motion.div>
          )}

          {localStatus === 'FAILED' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-red-400 text-sm font-medium">Failed</span>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Undo2 className="w-4 h-4" />}
                onClick={handleApprove}
              >
                Retry
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator for applying state */}
      <AnimatePresence>
        {localStatus === 'APPLYING' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
