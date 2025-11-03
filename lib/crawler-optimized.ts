/**
 * Optimized Website Crawler
 *
 * Performance improvements:
 * - Parallel page crawling (5 concurrent pages)
 * - Batch database inserts
 * - Resource blocking (images, fonts, etc.)
 * - Connection pooling
 * - Early termination on errors
 */

import puppeteer, { type Page, type Browser } from 'puppeteer'
import * as cheerio from 'cheerio'
import { createIssuesBatch } from './db-optimized'

interface CrawlOptions {
  maxPages?: number
  maxDepth?: number
  connectionId?: string
  concurrency?: number
}

interface CrawlResult {
  pagesFound: number
  issuesFound: number
  pages: Array<{
    url: string
    title: string
    issues: string[]
  }>
}

interface PageIssue {
  type: string
  title: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  pageUrl: string
  details: string
  recommendation: string
}

/**
 * Crawl a website with parallel processing
 */
export async function crawlWebsiteOptimized(
  url: string,
  options: CrawlOptions = {}
): Promise<CrawlResult> {
  const {
    maxPages = 50,
    maxDepth = 3,
    connectionId,
    concurrency = 5,
  } = options

  console.log(
    `[Crawler] Starting crawl of ${url} (max ${maxPages} pages, ${concurrency} concurrent)`
  )

  const visitedUrls = new Set<string>()
  const urlQueue: Array<{ url: string; depth: number }> = [{ url, depth: 0 }]
  const allPages: Array<{ url: string; title: string; issues: string[] }> = []
  const allIssues: PageIssue[] = []
  const baseUrl = new URL(url)

  // Launch browser with optimized settings
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080',
    ],
  })

  try {
    // Process pages in batches
    while (urlQueue.length > 0 && visitedUrls.size < maxPages) {
      const batch = urlQueue.splice(0, concurrency).filter(
        (item) =>
          !visitedUrls.has(item.url) &&
          item.depth <= maxDepth &&
          visitedUrls.size < maxPages
      )

      if (batch.length === 0) continue

      // Process batch concurrently
      const results = await Promise.allSettled(
        batch.map((item) =>
          crawlSinglePage(browser, item.url, item.depth, baseUrl, maxDepth)
        )
      )

      // Collect results
      for (let i = 0; i < results.length; i++) {
        const result = results[i]
        const item = batch[i]

        if (result.status === 'fulfilled' && result.value) {
          visitedUrls.add(item.url)

          const { title, issues, links } = result.value

          allPages.push({
            url: item.url,
            title,
            issues: issues.map((i) => i.type),
          })

          allIssues.push(...issues)

          // Add new links to queue
          if (item.depth < maxDepth) {
            for (const link of links) {
              if (!visitedUrls.has(link) && visitedUrls.size < maxPages) {
                urlQueue.push({ url: link, depth: item.depth + 1 })
              }
            }
          }
        } else {
          visitedUrls.add(item.url)
          console.error(`[Crawler] Failed to crawl ${item.url}`)
        }
      }

      console.log(`[Crawler] Progress: ${visitedUrls.size}/${maxPages} pages`)
    }

    // Batch insert issues into database
    if (connectionId && allIssues.length > 0) {
      console.log(`[Crawler] Inserting ${allIssues.length} issues into database`)
      await createIssuesBatch(connectionId, allIssues)
    }

    const totalIssues = allPages.reduce((sum, p) => sum + p.issues.length, 0)

    console.log(
      `[Crawler] Completed: ${allPages.length} pages, ${totalIssues} issues`
    )

    return {
      pagesFound: allPages.length,
      issuesFound: totalIssues,
      pages: allPages,
    }
  } finally {
    await browser.close()
  }
}

/**
 * Crawl a single page with optimizations
 */
async function crawlSinglePage(
  browser: Browser,
  url: string,
  depth: number,
  baseUrl: URL,
  maxDepth: number
): Promise<{
  title: string
  issues: PageIssue[]
  links: string[]
} | null> {
  const page = await browser.newPage()

  try {
    // Block unnecessary resources for faster loading
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      const resourceType = request.resourceType()
      if (
        ['image', 'font', 'media', 'stylesheet'].includes(resourceType) ||
        request.url().includes('analytics') ||
        request.url().includes('tracking')
      ) {
        request.abort()
      } else {
        request.continue()
      }
    })

    // Set realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )

    // Navigate with timeout
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    })

    // Get page content and title
    const [content, title] = await Promise.all([
      page.content(),
      page.title(),
    ])

    // Analyze page for issues
    const issues = await analyzePageContentOptimized(url, content, page)

    // Extract links
    const links: string[] = []
    if (depth < maxDepth) {
      const $ = cheerio.load(content)
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href')
        if (href) {
          try {
            const absoluteUrl = new URL(href, url).href
            const linkUrl = new URL(absoluteUrl)

            // Only same domain
            if (linkUrl.hostname === baseUrl.hostname) {
              links.push(absoluteUrl)
            }
          } catch {
            // Invalid URL, skip
          }
        }
      })
    }

    await page.close()

    return { title, issues, links }
  } catch (error) {
    await page.close()
    throw error
  }
}

/**
 * Optimized page analysis
 */
async function analyzePageContentOptimized(
  url: string,
  html: string,
  page: Page
): Promise<PageIssue[]> {
  const issues: PageIssue[] = []
  const $ = cheerio.load(html)

  // Run all checks in parallel
  const [metrics] = await Promise.allSettled([page.metrics()])

  // Check meta title
  const title = $('title').text().trim()
  if (!title) {
    issues.push({
      type: 'missing_meta_title',
      title: 'Missing Page Title',
      severity: 'HIGH',
      pageUrl: url,
      details: JSON.stringify({ currentTitle: '' }),
      recommendation: 'Add a descriptive, keyword-rich title tag (50-60 characters)',
    })
  } else if (title.length < 30 || title.length > 60) {
    issues.push({
      type: 'suboptimal_title_length',
      title: 'Title Length Not Optimal',
      severity: 'MEDIUM',
      pageUrl: url,
      details: JSON.stringify({ currentLength: title.length, title }),
      recommendation: 'Optimize title length to 50-60 characters for best SEO',
    })
  }

  // Check meta description
  const metaDesc = $('meta[name="description"]').attr('content')?.trim()
  if (!metaDesc) {
    issues.push({
      type: 'missing_meta_description',
      title: 'Missing Meta Description',
      severity: 'HIGH',
      pageUrl: url,
      details: JSON.stringify({ currentDescription: '' }),
      recommendation: 'Add a compelling meta description (150-160 characters)',
    })
  } else if (metaDesc.length < 120 || metaDesc.length > 160) {
    issues.push({
      type: 'suboptimal_description_length',
      title: 'Meta Description Length Not Optimal',
      severity: 'MEDIUM',
      pageUrl: url,
      details: JSON.stringify({ currentLength: metaDesc.length, description: metaDesc }),
      recommendation: 'Optimize meta description to 150-160 characters',
    })
  }

  // Check H1 tags
  const h1Tags = $('h1')
  if (h1Tags.length === 0) {
    issues.push({
      type: 'missing_h1',
      title: 'Missing H1 Heading',
      severity: 'HIGH',
      pageUrl: url,
      details: JSON.stringify({ h1Count: 0 }),
      recommendation: 'Add a single H1 heading that describes the main page content',
    })
  } else if (h1Tags.length > 1) {
    issues.push({
      type: 'multiple_h1',
      title: 'Multiple H1 Headings Detected',
      severity: 'MEDIUM',
      pageUrl: url,
      details: JSON.stringify({ h1Count: h1Tags.length }),
      recommendation: 'Use only one H1 heading per page for better SEO structure',
    })
  }

  // Check images without alt text
  const imagesWithoutAlt = $('img:not([alt])')
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      type: 'missing_alt_text',
      title: `${imagesWithoutAlt.length} Images Missing Alt Text`,
      severity: 'MEDIUM',
      pageUrl: url,
      details: JSON.stringify({ count: imagesWithoutAlt.length }),
      recommendation: 'Add descriptive alt text to all images for accessibility and SEO',
    })
  }

  // Check word count (thin content)
  const bodyText = $('body').text().trim()
  const wordCount = bodyText.split(/\s+/).filter((w) => w.length > 0).length
  if (wordCount < 300) {
    issues.push({
      type: 'thin_content',
      title: 'Thin Content Detected',
      severity: 'LOW',
      pageUrl: url,
      details: JSON.stringify({ wordCount }),
      recommendation: 'Expand content to at least 300 words for better SEO value',
    })
  }

  // Check page speed (using performance metrics)
  if (metrics.status === 'fulfilled' && metrics.value) {
    const layoutDuration = metrics.value.LayoutDuration || 0
    if (layoutDuration > 2000) {
      issues.push({
        type: 'slow_page_speed',
        title: 'Slow Page Load Detected',
        severity: 'MEDIUM',
        pageUrl: url,
        details: JSON.stringify({ layoutDuration }),
        recommendation:
          'Optimize page load speed by reducing resource size and improving caching',
      })
    }
  }

  return issues
}

/**
 * Quick single page analysis (for API endpoints)
 */
export async function analyzePageQuick(url: string): Promise<string[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()

    // Block resources
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      const resourceType = request.resourceType()
      if (['image', 'font', 'media', 'stylesheet'].includes(resourceType)) {
        request.abort()
      } else {
        request.continue()
      }
    })

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
    const content = await page.content()
    const issues = await analyzePageContentOptimized(url, content, page)

    return issues.map((i) => i.type)
  } finally {
    await browser.close()
  }
}
