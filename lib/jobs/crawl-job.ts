import { db } from '../db'
import { crawler } from '../crawler'
import { CrawlJobPayload } from '../queue'

export interface CrawlJobResult {
  success: boolean
  pagesAnalyzed: number
  issuesFound: number
  error?: string
}

/**
 * Process a site crawl job
 * This runs in the background and crawls a site for SEO issues
 */
export async function processCrawlJob(
  payload: CrawlJobPayload
): Promise<CrawlJobResult> {
  try {
    const { siteId, userId, maxPages = 10 } = payload

    // Verify site exists and belongs to user
    const site = await db.connection.findFirst({
      where: {
        id: siteId,
        user: {
          clerkUserId: userId,
        },
      },
    })

    if (!site) {
      throw new Error('Site not found or unauthorized')
    }

    // Update last sync time
    await db.connection.update({
      where: { id: siteId },
      data: { lastSync: new Date() },
    })

    // Crawl the site
    const { results, issues } = await crawler.crawlSite(site.domain, maxPages)

    // Store issues in database
    const issuePromises = issues.map(issue =>
      db.issue.create({
        data: {
          connectionId: siteId,
          type: issue.type,
          severity: issue.severity.toUpperCase() as any,
          category: mapCategory(issue.category),
          pageUrl: issue.page,
          details: {
            description: issue.description,
            recommendation: issue.recommendation,
            impact: issue.impact,
          },
          estimatedImpact: Math.floor(issue.impact / 10), // Convert 0-100 to 0-10
          status: 'DETECTED',
          detectedAt: new Date(),
        },
      })
    )

    await Promise.all(issuePromises)

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: site.userId,
        action: 'SITE_CRAWLED',
        resource: 'connection',
        resourceId: siteId,
        details: {
          pagesAnalyzed: results.length,
          issuesFound: issues.length,
          maxPages,
        },
      },
    })

    return {
      success: true,
      pagesAnalyzed: results.length,
      issuesFound: issues.length,
    }
  } catch (error) {
    console.error('Crawl job error:', error)
    return {
      success: false,
      pagesAnalyzed: 0,
      issuesFound: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  } finally {
    // Always close the crawler to free resources
    await crawler.close()
  }
}

/**
 * Map crawler category to database IssueCategory enum
 */
function mapCategory(category: string): any {
  const categoryMap: Record<string, string> = {
    meta: 'CONTENT',
    content: 'CONTENT',
    technical: 'TECHNICAL',
    accessibility: 'TECHNICAL',
    performance: 'PERFORMANCE',
    social: 'CONTENT',
    mobile: 'MOBILE',
  }

  return categoryMap[category] || 'TECHNICAL'
}
