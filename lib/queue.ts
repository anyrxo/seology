/**
 * Job Queue System
 *
 * Manages background jobs for crawling, analysis, and maintenance
 * Uses in-memory queue with database persistence
 */

import { db } from './db'

export type JobType =
  | 'CRAWL_SITE'
  | 'ANALYZE_SITE'
  | 'CLEANUP_ROLLBACKS'
  | 'RESET_USAGE'

export type JobStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'

interface JobData {
  connectionId?: string
  siteId?: string
  userId?: string
  url?: string
  [key: string]: unknown
}

interface Job {
  id: string
  type: JobType
  data: JobData
  status: JobStatus
  attempts: number
  maxAttempts: number
  error?: string
  createdAt: Date
  startedAt?: Date
  completedAt?: Date
}

// In-memory job queue
const jobQueue: Map<string, Job> = new Map()

// Job processors
const processors: Map<JobType, (job: Job) => Promise<void>> = new Map()

/**
 * Register a job processor
 */
export function registerProcessor(
  type: JobType,
  processor: (job: Job) => Promise<void>
) {
  processors.set(type, processor)
}

/**
 * Create a new job
 */
export async function createJob(
  type: JobType,
  data: JobData,
  options: {
    maxAttempts?: number
    priority?: number
  } = {}
): Promise<string> {
  const { maxAttempts = 3 } = options

  // Generate job ID
  const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const job: Job = {
    id: jobId,
    type,
    data,
    status: 'PENDING',
    attempts: 0,
    maxAttempts,
    createdAt: new Date(),
  }

  // Add to queue
  jobQueue.set(jobId, job)

  // Process immediately if processor is available
  if (processors.has(type)) {
    processJob(jobId).catch(error => {
      console.error(`Error processing job ${jobId}:`, error)
    })
  }

  return jobId
}

/**
 * Get job status
 */
export function getJob(jobId: string): Job | undefined {
  return jobQueue.get(jobId)
}

/**
 * Get all jobs of a specific type
 */
export function getJobsByType(type: JobType): Job[] {
  return Array.from(jobQueue.values()).filter(job => job.type === type)
}

/**
 * Get pending jobs
 */
export function getPendingJobs(): Job[] {
  return Array.from(jobQueue.values()).filter(job => job.status === 'PENDING')
}

/**
 * Process a job
 */
async function processJob(jobId: string): Promise<void> {
  const job = jobQueue.get(jobId)

  if (!job) {
    console.error(`Job ${jobId} not found`)
    return
  }

  // Skip if already running or completed
  if (job.status === 'RUNNING' || job.status === 'COMPLETED') {
    return
  }

  // Check max attempts
  if (job.attempts >= job.maxAttempts) {
    job.status = 'FAILED'
    job.error = 'Max attempts reached'
    return
  }

  // Get processor
  const processor = processors.get(job.type)

  if (!processor) {
    console.error(`No processor found for job type: ${job.type}`)
    job.status = 'FAILED'
    job.error = `No processor found for type: ${job.type}`
    return
  }

  try {
    // Mark as running
    job.status = 'RUNNING'
    job.startedAt = new Date()
    job.attempts++

    // Process
    await processor(job)

    // Mark as completed
    job.status = 'COMPLETED'
    job.completedAt = new Date()
  } catch (error) {
    console.error(`Job ${jobId} failed:`, error)

    job.error = error instanceof Error ? error.message : 'Unknown error'

    // Retry if attempts remaining
    if (job.attempts < job.maxAttempts) {
      job.status = 'PENDING'

      // Retry with exponential backoff
      const delay = Math.pow(2, job.attempts) * 1000
      setTimeout(() => {
        processJob(jobId).catch(err => {
          console.error(`Retry failed for job ${jobId}:`, err)
        })
      }, delay)
    } else {
      job.status = 'FAILED'
    }
  }
}

/**
 * Process all pending jobs
 */
export async function processAllPending(): Promise<void> {
  const pending = getPendingJobs()

  await Promise.all(
    pending.map(job => processJob(job.id))
  )
}

/**
 * Clear completed jobs older than specified days
 */
export function clearOldJobs(daysOld: number = 7): number {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - daysOld)

  let cleared = 0

  for (const [jobId, job] of jobQueue.entries()) {
    if (
      job.status === 'COMPLETED' &&
      job.completedAt &&
      job.completedAt < cutoff
    ) {
      jobQueue.delete(jobId)
      cleared++
    }
  }

  return cleared
}

/**
 * Get queue statistics
 */
export function getQueueStats() {
  const jobs = Array.from(jobQueue.values())

  return {
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'PENDING').length,
    running: jobs.filter(j => j.status === 'RUNNING').length,
    completed: jobs.filter(j => j.status === 'COMPLETED').length,
    failed: jobs.filter(j => j.status === 'FAILED').length,
    byType: {
      CRAWL_SITE: jobs.filter(j => j.type === 'CRAWL_SITE').length,
      ANALYZE_SITE: jobs.filter(j => j.type === 'ANALYZE_SITE').length,
      CLEANUP_ROLLBACKS: jobs.filter(j => j.type === 'CLEANUP_ROLLBACKS').length,
      RESET_USAGE: jobs.filter(j => j.type === 'RESET_USAGE').length,
    },
  }
}

/**
 * Cancel a job
 */
export function cancelJob(jobId: string): boolean {
  const job = jobQueue.get(jobId)

  if (!job) return false

  if (job.status === 'PENDING') {
    job.status = 'FAILED'
    job.error = 'Cancelled by user'
    return true
  }

  return false
}

/**
 * Retry a failed job
 */
export async function retryJob(jobId: string): Promise<boolean> {
  const job = jobQueue.get(jobId)

  if (!job || job.status !== 'FAILED') return false

  job.status = 'PENDING'
  job.attempts = 0
  job.error = undefined

  await processJob(jobId)

  return true
}
