import puppeteer, { Browser, Page } from 'puppeteer'
import { load } from 'cheerio'

export interface CrawlResult {
  url: string
  title: string
  metaDescription: string | null
  h1Tags: string[]
  h2Tags: string[]
  imagesMissingAlt: number
  brokenLinks: string[]
  internalLinks: string[]
  externalLinks: string[]
  wordCount: number
  loadTime: number
  hasStructuredData: boolean
  hasSitemap: boolean
  hasRobotsTxt: boolean
  mobileResponsive: boolean
  pageSize: number
  httpStatusCode: number
  canonicalUrl: string | null
  openGraphTags: Record<string, string>
  twitterCardTags: Record<string, string>
  structuredData: any[]
}

export interface PageIssue {
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  description: string
  page: string
  recommendation: string
  impact: number
}

export class SiteCrawler {
  private browser: Browser | null = null

  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
        ],
      })
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }

  async crawlPage(url: string): Promise<CrawlResult> {
    await this.initialize()

    const page = await this.browser!.newPage()
    const startTime = Date.now()

    try {
      // Set viewport for mobile responsiveness check
      await page.setViewport({ width: 1920, height: 1080 })

      // Navigate to page
      const response = await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      const loadTime = Date.now() - startTime
      const httpStatusCode = response?.status() || 0

      // Get page content
      const content = await page.content()
      const $ = load(content)

      // Extract meta tags
      const title = await page.title()
      const metaDescription = $('meta[name="description"]').attr('content') || null
      const canonicalUrl = $('link[rel="canonical"]').attr('href') || null

      // Extract headings
      const h1Tags: string[] = []
      $('h1').each((_, el) => {
        h1Tags.push($(el).text().trim())
      })

      const h2Tags: string[] = []
      $('h2').each((_, el) => {
        h2Tags.push($(el).text().trim())
      })

      // Check images for alt text
      let imagesMissingAlt = 0
      $('img').each((_, el) => {
        if (!$(el).attr('alt')) {
          imagesMissingAlt++
        }
      })

      // Extract links
      const internalLinks: string[] = []
      const externalLinks: string[] = []
      const brokenLinks: string[] = []

      $('a[href]').each((_, el) => {
        const href = $(el).attr('href')
        if (href) {
          try {
            const linkUrl = new URL(href, url)
            if (linkUrl.hostname === new URL(url).hostname) {
              internalLinks.push(linkUrl.href)
            } else {
              externalLinks.push(linkUrl.href)
            }
          } catch (e) {
            // Invalid URL
            brokenLinks.push(href)
          }
        }
      })

      // Check for structured data
      const structuredData: any[] = []
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const data = JSON.parse($(el).html() || '{}')
          structuredData.push(data)
        } catch (e) {
          // Invalid JSON
        }
      })

      // Extract Open Graph tags
      const openGraphTags: Record<string, string> = {}
      $('meta[property^="og:"]').each((_, el) => {
        const property = $(el).attr('property')
        const content = $(el).attr('content')
        if (property && content) {
          openGraphTags[property] = content
        }
      })

      // Extract Twitter Card tags
      const twitterCardTags: Record<string, string> = {}
      $('meta[name^="twitter:"]').each((_, el) => {
        const name = $(el).attr('name')
        const content = $(el).attr('content')
        if (name && content) {
          twitterCardTags[name] = content
        }
      })

      // Count words in body
      const bodyText = $('body').text()
      const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length

      // Get page size
      const pageSize = Buffer.byteLength(content, 'utf8')

      // Check mobile responsiveness
      await page.setViewport({ width: 375, height: 667 })
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mobileViewport = await page.viewport()
      const mobileResponsive = mobileViewport?.width === 375

      // Check for sitemap and robots.txt
      const baseUrl = new URL(url).origin
      const hasSitemap = await this.checkUrlExists(page, `${baseUrl}/sitemap.xml`)
      const hasRobotsTxt = await this.checkUrlExists(page, `${baseUrl}/robots.txt`)

      await page.close()

      return {
        url,
        title,
        metaDescription,
        h1Tags,
        h2Tags,
        imagesMissingAlt,
        brokenLinks,
        internalLinks: [...new Set(internalLinks)], // Remove duplicates
        externalLinks: [...new Set(externalLinks)],
        wordCount,
        loadTime,
        hasStructuredData: structuredData.length > 0,
        hasSitemap,
        hasRobotsTxt,
        mobileResponsive,
        pageSize,
        httpStatusCode,
        canonicalUrl,
        openGraphTags,
        twitterCardTags,
        structuredData,
      }
    } catch (error) {
      await page.close()
      throw error
    }
  }

  private async checkUrlExists(page: Page, url: string): Promise<boolean> {
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 5000 })
      return response?.status() === 200
    } catch (e) {
      return false
    }
  }

  async analyzeCrawlResults(result: CrawlResult): Promise<PageIssue[]> {
    const issues: PageIssue[] = []

    // Title issues
    if (!result.title || result.title.trim().length === 0) {
      issues.push({
        type: 'MISSING_TITLE',
        severity: 'critical',
        category: 'meta',
        description: 'Page is missing a title tag',
        page: result.url,
        recommendation: 'Add a descriptive title tag (50-60 characters) that includes your target keyword',
        impact: 95,
      })
    } else if (result.title.length < 30) {
      issues.push({
        type: 'TITLE_TOO_SHORT',
        severity: 'high',
        category: 'meta',
        description: `Title tag is too short (${result.title.length} characters)`,
        page: result.url,
        recommendation: 'Expand title to 50-60 characters for better SEO',
        impact: 70,
      })
    } else if (result.title.length > 60) {
      issues.push({
        type: 'TITLE_TOO_LONG',
        severity: 'medium',
        category: 'meta',
        description: `Title tag is too long (${result.title.length} characters) and may be truncated in search results`,
        page: result.url,
        recommendation: 'Shorten title to 50-60 characters',
        impact: 50,
      })
    }

    // Meta description issues
    if (!result.metaDescription) {
      issues.push({
        type: 'MISSING_META_DESCRIPTION',
        severity: 'high',
        category: 'meta',
        description: 'Page is missing a meta description',
        page: result.url,
        recommendation: 'Add a compelling meta description (150-160 characters) that encourages clicks',
        impact: 80,
      })
    } else if (result.metaDescription.length < 120) {
      issues.push({
        type: 'META_DESCRIPTION_TOO_SHORT',
        severity: 'medium',
        category: 'meta',
        description: `Meta description is too short (${result.metaDescription.length} characters)`,
        page: result.url,
        recommendation: 'Expand meta description to 150-160 characters',
        impact: 60,
      })
    } else if (result.metaDescription.length > 160) {
      issues.push({
        type: 'META_DESCRIPTION_TOO_LONG',
        severity: 'low',
        category: 'meta',
        description: `Meta description is too long (${result.metaDescription.length} characters) and may be truncated`,
        page: result.url,
        recommendation: 'Shorten meta description to 150-160 characters',
        impact: 40,
      })
    }

    // H1 tag issues
    if (result.h1Tags.length === 0) {
      issues.push({
        type: 'MISSING_H1',
        severity: 'critical',
        category: 'content',
        description: 'Page is missing an H1 tag',
        page: result.url,
        recommendation: 'Add one H1 tag that clearly describes the page content',
        impact: 90,
      })
    } else if (result.h1Tags.length > 1) {
      issues.push({
        type: 'MULTIPLE_H1',
        severity: 'medium',
        category: 'content',
        description: `Page has ${result.h1Tags.length} H1 tags`,
        page: result.url,
        recommendation: 'Use only one H1 tag per page',
        impact: 55,
      })
    }

    // Image alt text issues
    if (result.imagesMissingAlt > 0) {
      issues.push({
        type: 'IMAGES_MISSING_ALT',
        severity: 'high',
        category: 'accessibility',
        description: `${result.imagesMissingAlt} image${result.imagesMissingAlt > 1 ? 's are' : ' is'} missing alt text`,
        page: result.url,
        recommendation: 'Add descriptive alt text to all images for accessibility and SEO',
        impact: 75,
      })
    }

    // Broken links
    if (result.brokenLinks.length > 0) {
      issues.push({
        type: 'BROKEN_LINKS',
        severity: 'high',
        category: 'technical',
        description: `Found ${result.brokenLinks.length} broken or invalid link${result.brokenLinks.length > 1 ? 's' : ''}`,
        page: result.url,
        recommendation: 'Fix or remove broken links',
        impact: 70,
      })
    }

    // Content length issues
    if (result.wordCount < 300) {
      issues.push({
        type: 'THIN_CONTENT',
        severity: 'high',
        category: 'content',
        description: `Page has only ${result.wordCount} words`,
        page: result.url,
        recommendation: 'Add more comprehensive content (aim for 500+ words)',
        impact: 75,
      })
    }

    // Structured data
    if (!result.hasStructuredData) {
      issues.push({
        type: 'MISSING_STRUCTURED_DATA',
        severity: 'medium',
        category: 'technical',
        description: 'Page is missing structured data (schema.org)',
        page: result.url,
        recommendation: 'Add relevant schema markup for rich snippets',
        impact: 60,
      })
    }

    // Open Graph tags
    if (Object.keys(result.openGraphTags).length === 0) {
      issues.push({
        type: 'MISSING_OPEN_GRAPH',
        severity: 'medium',
        category: 'social',
        description: 'Page is missing Open Graph tags for social sharing',
        page: result.url,
        recommendation: 'Add og:title, og:description, og:image, and og:url tags',
        impact: 55,
      })
    }

    // Page load time
    if (result.loadTime > 3000) {
      issues.push({
        type: 'SLOW_LOAD_TIME',
        severity: result.loadTime > 5000 ? 'high' : 'medium',
        category: 'performance',
        description: `Page load time is ${(result.loadTime / 1000).toFixed(1)}s`,
        page: result.url,
        recommendation: 'Optimize images, enable caching, and minimize JavaScript',
        impact: result.loadTime > 5000 ? 80 : 65,
      })
    }

    // Page size
    if (result.pageSize > 2000000) { // 2MB
      issues.push({
        type: 'LARGE_PAGE_SIZE',
        severity: 'medium',
        category: 'performance',
        description: `Page size is ${(result.pageSize / 1024 / 1024).toFixed(1)}MB`,
        page: result.url,
        recommendation: 'Reduce page size by optimizing images and removing unused code',
        impact: 60,
      })
    }

    // Mobile responsiveness
    if (!result.mobileResponsive) {
      issues.push({
        type: 'NOT_MOBILE_RESPONSIVE',
        severity: 'critical',
        category: 'mobile',
        description: 'Page may not be mobile-friendly',
        page: result.url,
        recommendation: 'Implement responsive design for mobile devices',
        impact: 95,
      })
    }

    // Canonical URL
    if (!result.canonicalUrl) {
      issues.push({
        type: 'MISSING_CANONICAL',
        severity: 'medium',
        category: 'technical',
        description: 'Page is missing a canonical URL',
        page: result.url,
        recommendation: 'Add a canonical link tag to prevent duplicate content issues',
        impact: 60,
      })
    }

    // Sitemap
    if (!result.hasSitemap) {
      issues.push({
        type: 'MISSING_SITEMAP',
        severity: 'high',
        category: 'technical',
        description: 'Site is missing an XML sitemap',
        page: result.url,
        recommendation: 'Create and submit an XML sitemap to search engines',
        impact: 75,
      })
    }

    // Robots.txt
    if (!result.hasRobotsTxt) {
      issues.push({
        type: 'MISSING_ROBOTS_TXT',
        severity: 'medium',
        category: 'technical',
        description: 'Site is missing a robots.txt file',
        page: result.url,
        recommendation: 'Create a robots.txt file to guide search engine crawlers',
        impact: 50,
      })
    }

    return issues
  }

  async crawlSite(baseUrl: string, maxPages: number = 10): Promise<{
    results: CrawlResult[]
    issues: PageIssue[]
  }> {
    const results: CrawlResult[] = []
    const issues: PageIssue[] = []
    const visited = new Set<string>()
    const queue: string[] = [baseUrl]

    while (queue.length > 0 && results.length < maxPages) {
      const url = queue.shift()!

      if (visited.has(url)) continue
      visited.add(url)

      try {
        const result = await this.crawlPage(url)
        results.push(result)

        const pageIssues = await this.analyzeCrawlResults(result)
        issues.push(...pageIssues)

        // Add internal links to queue
        const baseHostname = new URL(baseUrl).hostname
        for (const link of result.internalLinks) {
          try {
            const linkUrl = new URL(link)
            if (linkUrl.hostname === baseHostname && !visited.has(link) && queue.length < maxPages) {
              queue.push(link)
            }
          } catch (e) {
            // Invalid URL
          }
        }
      } catch (error) {
        console.error(`Error crawling ${url}:`, error)
      }
    }

    return { results, issues }
  }
}

// Export singleton instance
export const crawler = new SiteCrawler()
