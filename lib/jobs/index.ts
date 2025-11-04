/**
 * Job Dispatcher
 *
 * Registers all job processors and initializes the job queue system
 */

import { registerProcessor } from '../queue'
import { crawlSiteJob } from './crawl-job'
import { analyzeSiteJob } from './analysis-job'
import { cleanupRollbacksJob } from './cleanup-job'
import { resetUsageJob } from './usage-reset-job'
import { executeScanImagesJob, executeOptimizeImagesJob } from './image-job'
import { executeDailyAutomationJob } from './daily-automation-job'

/**
 * Initialize all job processors
 */
export function initializeJobs() {
  // Register all job processors
  registerProcessor('CRAWL_SITE', crawlSiteJob)
  registerProcessor('ANALYZE_SITE', analyzeSiteJob)
  registerProcessor('CLEANUP_ROLLBACKS', cleanupRollbacksJob)
  registerProcessor('RESET_USAGE', resetUsageJob)
  registerProcessor('SCAN_IMAGES', executeScanImagesJob)
  registerProcessor('OPTIMIZE_IMAGES', executeOptimizeImagesJob)
  registerProcessor('DAILY_AUTOMATION', executeDailyAutomationJob)

  console.log('✓ Job processors initialized')
}

// Export job functions for direct use
export { crawlSiteJob } from './crawl-job'
export { analyzeSiteJob } from './analysis-job'
export { cleanupRollbacksJob } from './cleanup-job'
export { resetUsageJob } from './usage-reset-job'
