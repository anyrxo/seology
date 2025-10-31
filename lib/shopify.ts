import { decrypt } from './encryption'
import { db } from './db'
import { analyzeSite } from './claude'

/**
 * Shopify service for data sync and fix execution
 */
export class ShopifyService {
  private shop: string
  private accessToken: string

  constructor(shop: string, accessToken: string) {
    this.shop = shop
    this.accessToken = accessToken
  }

  /**
   * Fetch all products from Shopify store
   */
  async fetchProducts() {
    try {
      const response = await fetch(
        `https://${this.shop}/admin/api/2024-01/products.json?limit=250`,
        {
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.products || []
    } catch (error) {
      console.error('Fetch products error:', error)
      throw error
    }
  }

  /**
   * Fetch pages and blog posts
   */
  async fetchPages() {
    try {
      const response = await fetch(
        `https://${this.shop}/admin/api/2024-01/pages.json?limit=250`,
        {
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.pages || []
    } catch (error) {
      console.error('Fetch pages error:', error)
      throw error
    }
  }

  /**
   * Update product SEO (title, meta description, handle)
   */
  async updateProductSEO(productId: string, updates: {
    title?: string
    metafieldsGlobalTitleTag?: string
    metafieldsGlobalDescriptionTag?: string
    handle?: string
  }) {
    try {
      const response = await fetch(
        `https://${this.shop}/admin/api/2024-01/products/${productId}.json`,
        {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: {
              id: productId,
              ...updates,
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Update product SEO error:', error)
      throw error
    }
  }

  /**
   * Create redirect
   */
  async createRedirect(from: string, to: string) {
    try {
      const response = await fetch(
        `https://${this.shop}/admin/api/2024-01/redirects.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            redirect: {
              path: from,
              target: to,
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to create redirect: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Create redirect error:', error)
      throw error
    }
  }
}

/**
 * Sync Shopify store data and analyze with Claude AI
 */
export async function syncShopifyStore(connectionId: string) {
  try {
    // Get connection from database
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
      include: { user: true },
    })

    if (!connection || connection.platform !== 'SHOPIFY') {
      throw new Error('Invalid Shopify connection')
    }

    // Decrypt access token
    const accessToken = await decrypt(connection.accessToken!)
    const service = new ShopifyService(connection.domain, accessToken)

    // Fetch products and pages
    const [products, pages] = await Promise.all([
      service.fetchProducts(),
      service.fetchPages(),
    ])

    // Prepare data for Claude analysis
    const siteData = {
      url: `https://${connection.domain}`,
      platform: 'Shopify',
      pages: [
        ...products.map((p: any) => ({
          url: `https://${connection.domain}/products/${p.handle}`,
          title: p.title,
          meta_description: p.metafields_global_description_tag || p.body_html?.substring(0, 160),
          type: 'product',
          id: p.id,
        })),
        ...pages.map((p: any) => ({
          url: `https://${connection.domain}/pages/${p.handle}`,
          title: p.title,
          meta_description: p.metafield?.description,
          type: 'page',
          id: p.id,
        })),
      ],
    }

    // Analyze with Claude AI
    const analysis = await analyzeSite(siteData)

    // Store issues in database
    const issuesCreated = await Promise.all(
      analysis.issues.map((issue) =>
        db.issue.create({
          data: {
            connectionId: connection.id,
            type: issue.type,
            category: categorizeIssue(issue.type),
            severity: issue.severity.toUpperCase() as any,
            pageUrl: issue.page_url,
            details: issue.details,
            estimatedImpact: issue.estimated_impact,
            status: 'DETECTED',
          },
        })
      )
    )

    // Update connection last sync
    await db.connection.update({
      where: { id: connectionId },
      data: { lastSync: new Date() },
    })

    return {
      success: true,
      productsFound: products.length,
      pagesFound: pages.length,
      issuesDetected: issuesCreated.length,
      analysis: analysis.summary,
    }
  } catch (error) {
    console.error('Shopify sync error:', error)
    throw error
  }
}

/**
 * Categorize issue type into category
 */
function categorizeIssue(type: string): 'TECHNICAL' | 'CONTENT' | 'LINKS' | 'PERFORMANCE' | 'MOBILE' {
  if (type.includes('meta') || type.includes('title') || type.includes('canonical')) {
    return 'TECHNICAL'
  }
  if (type.includes('link') || type.includes('redirect')) {
    return 'LINKS'
  }
  if (type.includes('speed') || type.includes('performance')) {
    return 'PERFORMANCE'
  }
  if (type.includes('content') || type.includes('h1') || type.includes('alt')) {
    return 'CONTENT'
  }
  return 'TECHNICAL'
}

/**
 * Apply SEO fix for a Shopify issue
 */
export async function applyShopifyFix(fixId: string) {
  try {
    // Get fix and connection
    const fix = await db.fix.findUnique({
      where: { id: fixId },
      include: {
        connection: true,
        issue: true,
      },
    })

    if (!fix || !fix.connection || fix.connection.platform !== 'SHOPIFY') {
      throw new Error('Invalid Shopify fix')
    }

    // Decrypt access token
    const accessToken = await decrypt(fix.connection.accessToken!)
    const service = new ShopifyService(fix.connection.domain, accessToken)

    // Apply fix based on type
    let result
    const afterState = fix.afterState as any // Type assertion for JSON field

    switch (fix.type) {
      case 'UPDATE_PRODUCT_SEO':
        result = await service.updateProductSEO(
          afterState.productId,
          {
            title: afterState.title,
            metafieldsGlobalTitleTag: afterState.seoTitle,
            metafieldsGlobalDescriptionTag: afterState.metaDescription,
            handle: afterState.handle,
          }
        )
        break

      case 'CREATE_REDIRECT':
        result = await service.createRedirect(
          afterState.from,
          afterState.to
        )
        break

      default:
        throw new Error(`Unknown fix type: ${fix.type}`)
    }

    // Update fix status
    await db.fix.update({
      where: { id: fixId },
      data: {
        status: 'APPLIED',
        appliedAt: new Date(),
        rollbackExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      },
    })

    // Update issue status
    if (fix.issueId) {
      await db.issue.update({
        where: { id: fix.issueId },
        data: {
          status: 'FIXED',
          fixedAt: new Date(),
        },
      })
    }

    return {
      success: true,
      result,
    }
  } catch (error) {
    console.error('Apply Shopify fix error:', error)

    // Update fix status to failed
    await db.fix.update({
      where: { id: fixId },
      data: { status: 'FAILED' },
    })

    throw error
  }
}
