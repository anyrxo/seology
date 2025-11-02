/**
 * Crawl Site Job
 *
 * Crawls a website to discover pages and SEO issues
 */

import { db } from '../db'
import { crawlWebsite } from '../crawler'

interface CrawlJobData {
  connectionId?: string
  url?: string
}

export async function crawlSiteJob(job: { data: CrawlJobData }) {
  const { connectionId, url } = job.data

  if (!connectionId || !url) {
    throw new Error('Missing required data for crawl')
  }

  console.log(`Starting crawl for ${url}`)

  // Create crawl record
  const crawl = await db.crawl.create({
    data: {
      connectionId,
      status: 'RUNNING',
      startedAt: new Date(),
    },
  })

  try {
    // Perform the crawl
    const result = await crawlWebsite(url, {
      maxPages: 100,
      maxDepth: 3,
    })

    // Update crawl record
    await db.crawl.update({
      where: { id: crawl.id },
      data: {
        status: 'COMPLETED',
        pagesFound: result.pagesFound,
        issuesFound: result.issuesFound,
        completedAt: new Date(),
      },
    })

    console.log(`✓ Crawl completed for ${url}: ${result.pagesFound} pages, ${result.issuesFound} issues`)
  } catch (error) {
    // Mark as failed
    await db.crawl.update({
      where: { id: crawl.id },
      data: {
        status: 'FAILED',
        completedAt: new Date(),
      },
    })

    throw error
  }
}
