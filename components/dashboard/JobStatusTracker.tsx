'use client'

/**
 * Job Status Tracker with Real-time Polling
 * Shows live progress updates for background jobs
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Clock, Activity } from 'lucide-react'
import { useConditionalPolling } from '@/hooks/usePolling'

interface Job {
  id: string
  type: 'CRAWL_SITE' | 'ANALYZE_SITE' | 'CLEANUP_ROLLBACKS' | 'RESET_USAGE'
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'
  progress: number
  startedAt?: Date
  completedAt?: Date
  error?: string
  metadata?: {
    siteId?: string
    siteName?: string
    pagesProcessed?: number
    totalPages?: number
    currentStep?: string
  }
}

interface JobStatusTrackerProps {
  jobId: string
  onComplete?: (job: Job) => void
  onError?: (error: string) => void
  autoClose?: boolean
  closeDelay?: number
}

export function JobStatusTracker({
  jobId,
  onComplete,
  onError,
  autoClose = false,
  closeDelay = 3000,
}: JobStatusTrackerProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Fetch job status
  async function fetchJobStatus(): Promise<Job> {
    const response = await fetch(`/api/jobs/${jobId}`)
    if (!response.ok) throw new Error('Failed to fetch job status')
    return response.json()
  }

  // Poll until job is complete or failed
  const { data: job, isLoading } = useConditionalPolling<Job>(
    fetchJobStatus,
    (job) => job.status === 'COMPLETED' || job.status === 'FAILED',
    {
      interval: 2000,
      onSuccess: (result) => {
        const job = result as Job
        if (job.status === 'COMPLETED') {
          onComplete?.(job)
          if (autoClose) {
            setTimeout(() => setIsVisible(false), closeDelay)
          }
        } else if (job.status === 'FAILED') {
          onError?.(job.error || 'Job failed')
        }
      },
    }
  )

  if (!isVisible) return null
  if (!job && isLoading) {
    return <JobStatusSkeleton />
  }
  if (!job) return null

  const statusConfig = {
    PENDING: {
      icon: Clock,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      label: 'Queued',
    },
    RUNNING: {
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      label: 'Running',
    },
    COMPLETED: {
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      label: 'Completed',
    },
    FAILED: {
      icon: XCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      label: 'Failed',
    },
  }

  const jobTypeLabels = {
    CRAWL_SITE: 'Crawling Site',
    ANALYZE_SITE: 'Analyzing SEO',
    CLEANUP_ROLLBACKS: 'Cleaning Up',
    RESET_USAGE: 'Resetting Usage',
  }

  const config = statusConfig[job.status]
  const StatusIcon = config.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config.bgColor}`}>
                {job.status === 'RUNNING' ? (
                  <Spinner size="sm" variant="default" />
                ) : (
                  <StatusIcon className={`w-5 h-5 ${config.color}`} />
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  {jobTypeLabels[job.type]}
                </h3>
                {job.metadata?.siteName && (
                  <p className="text-white/60 text-sm">{job.metadata.siteName}</p>
                )}
              </div>
            </div>
            <Badge variant="outline" className={config.bgColor}>
              {config.label}
            </Badge>
          </div>

          {/* Progress */}
          {job.status === 'RUNNING' && (
            <div className="space-y-2">
              <Progress
                value={job.progress}
                variant="gradient"
                showLabel
                animated
                showGlow
              />
              {job.metadata?.currentStep && (
                <p className="text-white/60 text-sm">{job.metadata.currentStep}</p>
              )}
              {job.metadata?.pagesProcessed !== undefined &&
                job.metadata?.totalPages !== undefined && (
                  <p className="text-white/40 text-xs">
                    {job.metadata.pagesProcessed} / {job.metadata.totalPages} pages
                    processed
                  </p>
                )}
            </div>
          )}

          {/* Completed state */}
          {job.status === 'COMPLETED' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-green-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Job completed successfully</span>
            </motion.div>
          )}

          {/* Error state */}
          {job.status === 'FAILED' && job.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            >
              <p className="text-red-400 text-sm">{job.error}</p>
            </motion.div>
          )}

          {/* Timestamps */}
          <div className="flex items-center gap-4 text-xs text-white/40">
            {job.startedAt && (
              <span>Started {new Date(job.startedAt).toLocaleTimeString()}</span>
            )}
            {job.completedAt && (
              <span>
                Completed {new Date(job.completedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function JobStatusSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg shimmer" />
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-32 shimmer" />
            <div className="h-3 bg-white/10 rounded w-24 shimmer" />
          </div>
        </div>
        <div className="h-6 bg-white/10 rounded w-20 shimmer" />
      </div>
      <div className="h-2 bg-white/10 rounded shimmer" />
    </div>
  )
}

// Multi-job tracker for dashboard
export function MultiJobTracker({ jobIds }: { jobIds: string[] }) {
  return (
    <div className="space-y-4">
      {jobIds.map((jobId) => (
        <JobStatusTracker key={jobId} jobId={jobId} autoClose />
      ))}
    </div>
  )
}
