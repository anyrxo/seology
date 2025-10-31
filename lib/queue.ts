import { db } from './db'
import { JobType, JobStatus } from '@prisma/client'

export interface JobPayload {
  [key: string]: any
}

export interface CrawlJobPayload extends JobPayload {
  siteId: string
  userId: string
  maxPages?: number
}

export interface AnalysisJobPayload extends JobPayload {
  siteId: string
  userId: string
}

export interface CleanupJobPayload extends JobPayload {
  daysOld?: number
}

export interface UsageResetJobPayload extends JobPayload {
  month: string // YYYY-MM format
}

/**
 * Queue Service for Background Jobs
 *
 * This service manages background jobs using a database-backed queue.
 * Jobs are processed asynchronously via Next.js API routes.
 */
export class QueueService {
  /**
   * Enqueue a site crawl job
   * @param siteId - Site ID to crawl
   * @param userId - User ID who initiated the crawl
   * @param maxPages - Maximum number of pages to crawl (default: 10)
   * @param priority - Job priority (default: 5)
   */
  async enqueueCrawl(
    siteId: string,
    userId: string,
    maxPages: number = 10,
    priority: number = 5
  ): Promise<string> {
    const job = await db.job.create({
      data: {
        type: JobType.CRAWL_SITE,
        status: JobStatus.PENDING,
        priority,
        payload: {
          siteId,
          userId,
          maxPages,
        } as CrawlJobPayload,
      },
    })

    return job.id
  }

  /**
   * Enqueue an AI analysis job
   * @param siteId - Site ID to analyze
   * @param userId - User ID who initiated the analysis
   * @param priority - Job priority (default: 5)
   */
  async enqueueAnalysis(
    siteId: string,
    userId: string,
    priority: number = 5
  ): Promise<string> {
    const job = await db.job.create({
      data: {
        type: JobType.ANALYZE_SITE,
        status: JobStatus.PENDING,
        priority,
        payload: {
          siteId,
          userId,
        } as AnalysisJobPayload,
      },
    })

    return job.id
  }

  /**
   * Enqueue a rollback cleanup job
   * @param daysOld - Clean rollbacks older than X days (default: 90)
   * @param priority - Job priority (default: 1)
   */
  async enqueueRollbackCleanup(
    daysOld: number = 90,
    priority: number = 1
  ): Promise<string> {
    const job = await db.job.create({
      data: {
        type: JobType.CLEANUP_ROLLBACKS,
        status: JobStatus.PENDING,
        priority,
        payload: {
          daysOld,
        } as CleanupJobPayload,
      },
    })

    return job.id
  }

  /**
   * Enqueue a monthly usage reset job
   * @param month - Month to reset (YYYY-MM format)
   * @param priority - Job priority (default: 10, high priority)
   */
  async enqueueUsageReset(
    month: string,
    priority: number = 10
  ): Promise<string> {
    const job = await db.job.create({
      data: {
        type: JobType.RESET_USAGE,
        status: JobStatus.PENDING,
        priority,
        payload: {
          month,
        } as UsageResetJobPayload,
      },
    })

    return job.id
  }

  /**
   * Get job status by ID
   */
  async getJobStatus(jobId: string) {
    const job = await db.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        type: true,
        status: true,
        priority: true,
        result: true,
        error: true,
        attempts: true,
        maxAttempts: true,
        scheduledFor: true,
        startedAt: true,
        completedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!job) {
      return null
    }

    // Calculate progress percentage
    let progress = 0
    if (job.status === JobStatus.COMPLETED) {
      progress = 100
    } else if (job.status === JobStatus.PROCESSING) {
      progress = 50
    } else if (job.status === JobStatus.PENDING) {
      progress = 0
    } else if (job.status === JobStatus.FAILED) {
      progress = 0
    }

    return {
      ...job,
      progress,
    }
  }

  /**
   * Get next pending job to process
   * Returns jobs in order of priority (higher first), then by scheduled time
   */
  async getNextJob(): Promise<any | null> {
    // Find the next pending job
    const job = await db.job.findFirst({
      where: {
        status: JobStatus.PENDING,
        scheduledFor: {
          lte: new Date(),
        },
      },
      orderBy: [
        { priority: 'desc' }, // Higher priority first
        { scheduledFor: 'asc' }, // Older jobs first
      ],
    })

    if (!job) {
      return null
    }

    // Mark job as processing
    const updatedJob = await db.job.update({
      where: { id: job.id },
      data: {
        status: JobStatus.PROCESSING,
        startedAt: new Date(),
        attempts: {
          increment: 1,
        },
      },
    })

    return updatedJob
  }

  /**
   * Mark job as completed
   */
  async completeJob(jobId: string, result: any) {
    await db.job.update({
      where: { id: jobId },
      data: {
        status: JobStatus.COMPLETED,
        result,
        completedAt: new Date(),
      },
    })
  }

  /**
   * Mark job as failed
   */
  async failJob(jobId: string, error: string) {
    const job = await db.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      throw new Error(`Job ${jobId} not found`)
    }

    // If max attempts reached, mark as failed
    // Otherwise, reset to pending for retry
    const shouldRetry = job.attempts < job.maxAttempts

    await db.job.update({
      where: { id: jobId },
      data: {
        status: shouldRetry ? JobStatus.PENDING : JobStatus.FAILED,
        error,
        scheduledFor: shouldRetry
          ? new Date(Date.now() + 60000 * job.attempts) // Exponential backoff
          : job.scheduledFor,
      },
    })
  }

  /**
   * Cancel a pending job
   */
  async cancelJob(jobId: string) {
    await db.job.update({
      where: { id: jobId },
      data: {
        status: JobStatus.CANCELLED,
      },
    })
  }

  /**
   * Get jobs by type and status
   */
  async getJobs(
    type?: JobType,
    status?: JobStatus,
    limit: number = 50
  ) {
    return await db.job.findMany({
      where: {
        ...(type && { type }),
        ...(status && { status }),
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    })
  }

  /**
   * Clean up old completed/failed jobs
   * @param daysOld - Remove jobs older than X days (default: 30)
   */
  async cleanupOldJobs(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    const result = await db.job.deleteMany({
      where: {
        status: {
          in: [JobStatus.COMPLETED, JobStatus.FAILED, JobStatus.CANCELLED],
        },
        completedAt: {
          lt: cutoffDate,
        },
      },
    })

    return result.count
  }

  /**
   * Get job statistics
   */
  async getJobStats() {
    const [pending, processing, completed, failed] = await Promise.all([
      db.job.count({ where: { status: JobStatus.PENDING } }),
      db.job.count({ where: { status: JobStatus.PROCESSING } }),
      db.job.count({ where: { status: JobStatus.COMPLETED } }),
      db.job.count({ where: { status: JobStatus.FAILED } }),
    ])

    return {
      pending,
      processing,
      completed,
      failed,
      total: pending + processing + completed + failed,
    }
  }
}

// Export singleton instance
export const queue = new QueueService()
