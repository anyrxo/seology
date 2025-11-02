/**
 * Website Crawler
 *
 * Crawls websites to discover pages and detect SEO issues using Puppeteer
 */

import puppeteer, { type Page } from 'puppeteer'
import * as cheerio from 'cheerio'
import { db } from './db'

interface CrawlOptions {
  maxPages?: number
  maxDepth?: number
  connectionId?: string
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
 * Crawl a website and detect SEO issues
 */
export async function crawlWebsite(
  url: string,
  options: CrawlOptions = {}
): Promise<CrawlResult> {
  const { maxPages = 50, maxDepth = 3, connectionId } = options

  console.log(`Crawling ${url} (max ${maxPages} pages, depth ${maxDepth})`)

  const visitedUrls = new Set<string>()
  const urlQueue: Array<{ url: string; depth: number }> = [{ url, depth: 0 }]
  const allPages: Array<{ url: string; title: string; issues: string[] }> = []
  const baseUrl = new URL(url)

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    while (urlQueue.length > 0 && visitedUrls.size < maxPages) {
      const item = urlQueue.shift()
      if (!item) break

      const { url: currentUrl, depth } = item

      // Skip if already visited or exceeds depth
      if (visitedUrls.has(currentUrl) || depth > maxDepth) {
        continue
      }

      visitedUrls.add(currentUrl)

      try {
        const page = await browser.newPage()

        // Set realistic user agent
        await page.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )

        // Navigate to page
        await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 30000 })

        // Get page content
        const content = await page.content()
        const title = await page.title()

        // Analyze page for issues
        const issues = await analyzePageContent(currentUrl, content, page)

        allPages.push({
          url: currentUrl,
          title,
          issues: issues.map(i => i.type),
        })

        // Store issues in database if connectionId provided
        if (connectionId) {
          for (const issue of issues) {
            await db.issue.create({
              data: {
                connectionId,
                type: issue.type,
                title: issue.title,
                severity: issue.severity,
                pageUrl: issue.pageUrl,
                details: issue.details,
                recommendation: issue.recommendation,
                status: 'OPEN',
              },
            })
          }
        }

        // Extract links for further crawling
        if (depth < maxDepth) {
          const $ = cheerio.load(content)
          const links = $('a[href]')
            .map((_, el) => $(el).attr('href'))
            .get()

          for (const link of links) {
            try {
              const absoluteUrl = new URL(link, currentUrl).href
              const linkUrl = new URL(absoluteUrl)

              // Only crawl same domain
              if (
                linkUrl.hostname === baseUrl.hostname &&
                !visitedUrls.has(absoluteUrl)
              ) {
                urlQueue.push({ url: absoluteUrl, depth: depth + 1 })
              }
            } catch {
              // Invalid URL, skip
            }
          }
        }

        await page.close()
      } catch (error) {
        console.error(`Error crawling ${currentUrl}:`, error)
      }
    }

    const totalIssues = allPages.reduce((sum, p) => sum + p.issues.length, 0)

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
 * Analyze a single page for SEO issues
 */
async function analyzePageContent(
  url: string,
  html: string,
  page: Page
): Promise<PageIssue[]> {
  const issues: PageIssue[] = []
  const $ = cheerio.load(html)

  // Check meta title
  const title = $('title').text().trim()
  if (!title) {
    issues.push({
      type: 'missing_meta_title',
      title: 'Missing Page Title',
      severity: 'HIGH',
      pageUrl: url,
      details: JSON.stringify({ currentTitle: title }),
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
      details: JSON.stringify({ currentDescription: metaDesc }),
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

  // Check for broken links
  const links = $('a[href]')
  let brokenLinks = 0
  links.each((_, el) => {
    const href = $(el).attr('href')
    if (href && (href.startsWith('#') || href === '')) {
      brokenLinks++
    }
  })
  if (brokenLinks > 0) {
    issues.push({
      type: 'broken_links',
      title: `${brokenLinks} Potential Broken Links`,
      severity: 'LOW',
      pageUrl: url,
      details: JSON.stringify({ count: brokenLinks }),
      recommendation: 'Review and fix broken or empty href attributes',
    })
  }

  // Check page speed (using performance metrics)
  try {
    const metrics = await page.metrics()
    const layoutDuration = metrics.LayoutDuration || 0
    if (layoutDuration > 2000) {
      issues.push({
        type: 'slow_page_speed',
        title: 'Slow Page Load Detected',
        severity: 'MEDIUM',
        pageUrl: url,
        details: JSON.stringify({ layoutDuration }),
        recommendation: 'Optimize page load speed by reducing resource size and improving caching',
      })
    }
  } catch {
    // Metrics not available, skip
  }

  // Check word count (thin content)
  const bodyText = $('body').text().trim()
  const wordCount = bodyText.split(/\s+/).length
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

  return issues
}

/**
 * Analyze a single page for SEO issues (public API)
 */
export async function analyzePage(url: string): Promise<string[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    const content = await page.content()
    const issues = await analyzePageContent(url, content, page)
    return issues.map(i => i.type)
  } finally {
    await browser.close()
  }
}
