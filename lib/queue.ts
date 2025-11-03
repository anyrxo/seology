/**
 * Job Queue System
 *
 * Manages background jobs for crawling, analysis, and maintenance
 * Uses database for persistence
 */

import { db } from './db'
import type { JobType, JobStatus, Job } from '@prisma/client'

export type { JobType, JobStatus, Job }

interface JobData {
  connectionId?: string
  siteId?: string
  userId?: string
  url?: string
  [key: string]: unknown
}

// Job processors
type JobProcessor = (job: Job) => Promise<void>
const processors: Map<JobType, JobProcessor> = new Map()

/**
 * Register a job processor
 */
export function registerProcessor(
  type: JobType,
  processor: JobProcessor
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
  const { maxAttempts = 3, priority = 5 } = options

  const job = await db.job.create({
    data: {
      type,
      status: 'PENDING',
      priority,
      payload: JSON.stringify(data),
      attempts: 0,
      maxAttempts,
      connectionId: data.connectionId,
      userId: data.userId,
    },
  })

  // Process immediately if processor is available
  if (processors.has(type)) {
    processJob(job.id).catch(error => {
      console.error(`Error processing job ${job.id}:`, error)
    })
  }

  return job.id
}

/**
 * Get job by ID
 */
export async function getJob(jobId: string): Promise<Job | null> {
  return await db.job.findUnique({
    where: { id: jobId },
  })
}

/**
 * Get pending jobs
 */
export async function getPendingJobs(limit: number = 10): Promise<Job[]> {
  return await db.job.findMany({
    where: {
      status: {
        in: ['PENDING', 'RETRYING'],
      },
      scheduledFor: {
        lte: new Date(),
      },
    },
    orderBy: [
      { priority: 'asc' },
      { createdAt: 'asc' },
    ],
    take: limit,
  })
}

/**
 * Get all jobs of a specific type
 */
export async function getJobsByType(type: JobType, limit: number = 50): Promise<Job[]> {
  return await db.job.findMany({
    where: { type },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

/**
 * Process a job
 */
async function processJob(jobId: string): Promise<void> {
  const job = await db.job.findUnique({
    where: { id: jobId },
  })

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
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'FAILED',
        error: 'Max attempts reached',
        failedAt: new Date(),
      },
    })
    return
  }

  // Get processor
  const processor = processors.get(job.type)

  if (!processor) {
    console.error(`No processor found for job type: ${job.type}`)
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'FAILED',
        error: `No processor found for type: ${job.type}`,
        failedAt: new Date(),
      },
    })
    return
  }

  try {
    // Mark as running
    const updatedJob = await db.job.update({
      where: { id: jobId },
      data: {
        status: 'RUNNING',
        startedAt: new Date(),
        attempts: { increment: 1 },
      },
    })

    // Process
    await processor(updatedJob)

    // Mark as completed
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        progress: 100,
      },
    })
  } catch (error) {
    console.error(`Job ${jobId} failed:`, error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Retry if attempts remaining
    if (job.attempts + 1 < job.maxAttempts) {
      await db.job.update({
        where: { id: jobId },
        data: {
          status: 'RETRYING',
          error: errorMessage,
        },
      })

      // Retry with exponential backoff
      const delay = Math.pow(2, job.attempts + 1) * 1000
      setTimeout(() => {
        processJob(jobId).catch(err => {
          console.error(`Retry failed for job ${jobId}:`, err)
        })
      }, delay)
    } else {
      await db.job.update({
        where: { id: jobId },
        data: {
          status: 'FAILED',
          error: errorMessage,
          failedAt: new Date(),
        },
      })
    }
  }
}

/**
 * Process all pending jobs
 */
export async function processAllPending(): Promise<void> {
  const pending = await getPendingJobs()

  await Promise.all(
    pending.map(job => processJob(job.id))
  )
}

/**
 * Clear completed jobs older than specified days
 */
export async function clearOldJobs(daysOld: number = 7): Promise<number> {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - daysOld)

  const result = await db.job.deleteMany({
    where: {
      status: 'COMPLETED',
      completedAt: {
        lt: cutoff,
      },
    },
  })

  return result.count
}

/**
 * Get queue statistics
 */
export async function getQueueStats() {
  const [total, pending, running, completed, failed, byType] = await Promise.all([
    db.job.count(),
    db.job.count({ where: { status: 'PENDING' } }),
    db.job.count({ where: { status: 'RUNNING' } }),
    db.job.count({ where: { status: 'COMPLETED' } }),
    db.job.count({ where: { status: 'FAILED' } }),
    db.job.groupBy({
      by: ['type'],
      _count: true,
    }),
  ])

  return {
    total,
    pending,
    running,
    completed,
    failed,
    byType: byType.reduce((acc, item) => {
      acc[item.type] = item._count
      return acc
    }, {} as Record<string, number>),
  }
}

/**
 * Cancel a job
 */
export async function cancelJob(jobId: string): Promise<boolean> {
  const job = await db.job.findUnique({
    where: { id: jobId },
  })

  if (!job) return false

  if (job.status === 'PENDING' || job.status === 'RETRYING') {
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'CANCELLED',
        error: 'Cancelled by user',
        failedAt: new Date(),
      },
    })
    return true
  }

  return false
}

/**
 * Retry a failed job
 */
export async function retryJob(jobId: string): Promise<boolean> {
  const job = await db.job.findUnique({
    where: { id: jobId },
  })

  if (!job || job.status !== 'FAILED') return false

  await db.job.update({
    where: { id: jobId },
    data: {
      status: 'PENDING',
      attempts: 0,
      error: null,
      failedAt: null,
    },
  })

  await processJob(jobId)

  return true
}
