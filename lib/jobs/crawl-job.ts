/**
 * Crawl Site Job
 *
 * Crawls a website to discover pages and SEO issues using Puppeteer
 * Stores pages and detected issues in the database
 */

import { db } from '../db'
import { crawlWebsite } from '../crawler'
import type { Job } from '@prisma/client'

interface CrawlJobPayload {
  connectionId: string
  url: string
  maxPages?: number
  maxDepth?: number
}

/**
 * Execute crawl site job
 */
export async function crawlSiteJob(job: Job): Promise<void> {
  const payload: CrawlJobPayload = JSON.parse(job.payload)
  const { connectionId, url, maxPages = 100, maxDepth = 3 } = payload

  if (!connectionId || !url) {
    throw new Error('Missing required data: connectionId and url')
  }

  console.log(`Starting crawl job ${job.id} for ${url}`)

  // Create crawl record
  const crawl = await db.crawl.create({
    data: {
      connectionId,
      status: 'RUNNING',
      startedAt: new Date(),
    },
  })

  try {
    // Update connection status
    await db.connection.update({
      where: { id: connectionId },
      data: { lastCrawlAt: new Date() }
    })

    // Update job progress (using database)
    await db.job.update({
      where: { id: job.id },
      data: { progress: 10 }
    })

    // Perform the crawl
    console.log(`Crawling ${url} (max ${maxPages} pages, depth ${maxDepth})`)

    const result = await crawlWebsite(url, {
      maxPages,
      maxDepth,
      connectionId,
    })

    // Update job progress
    await db.job.update({
      where: { id: job.id },
      data: { progress: 90 }
    })

    // Update crawl record with results
    await db.crawl.update({
      where: { id: crawl.id },
      data: {
        status: 'COMPLETED',
        pagesFound: result.pagesFound,
        issuesFound: result.issuesFound,
        completedAt: new Date(),
      },
    })

    // Update connection with crawl results
    await db.connection.update({
      where: { id: connectionId },
      data: {
        pageCount: result.pagesFound,
        issueCount: result.issuesFound,
        healthStatus: result.issuesFound === 0 ? 'healthy' :
                     result.issuesFound < 10 ? 'warning' : 'error'
      }
    })

    console.log(
      `Crawl completed for ${url}: ${result.pagesFound} pages, ${result.issuesFound} issues`
    )
  } catch (error) {
    console.error(`Crawl failed for ${url}:`, error)

    // Mark crawl as failed
    await db.crawl.update({
      where: { id: crawl.id },
      data: {
        status: 'FAILED',
        completedAt: new Date(),
      },
    })

    // Update connection status
    await db.connection.update({
      where: { id: connectionId },
      data: { healthStatus: 'error' }
    })

    throw error
  }
}
