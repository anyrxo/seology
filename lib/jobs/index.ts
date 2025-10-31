/**
 * Job Processor Index
 * Central dispatcher for all background job types
 */

import { JobType } from '@prisma/client'
import { processCrawlJob, CrawlJobResult } from './crawl-job'
import { processAnalysisJob, AnalysisJobResult } from './analysis-job'
import { processCleanupJob, CleanupJobResult } from './cleanup-job'
import { processUsageResetJob, UsageResetJobResult } from './usage-reset-job'
import { JobPayload } from '../queue'

export type JobResult =
  | CrawlJobResult
  | AnalysisJobResult
  | CleanupJobResult
  | UsageResetJobResult

/**
 * Process a job based on its type
 * @param type - Job type
 * @param payload - Job payload
 * @returns Job result
 */
export async function processJob(
  type: JobType,
  payload: JobPayload
): Promise<JobResult> {
  switch (type) {
    case JobType.CRAWL_SITE:
      return await processCrawlJob(payload as any)

    case JobType.ANALYZE_SITE:
      return await processAnalysisJob(payload as any)

    case JobType.CLEANUP_ROLLBACKS:
      return await processCleanupJob(payload as any)

    case JobType.RESET_USAGE:
      return await processUsageResetJob(payload as any)

    default:
      throw new Error(`Unknown job type: ${type}`)
  }
}

export * from './crawl-job'
export * from './analysis-job'
export * from './cleanup-job'
export * from './usage-reset-job'
