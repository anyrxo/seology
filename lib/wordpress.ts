import { Connection, Fix } from '@prisma/client'
import { db } from './db'

export interface WordPressPost {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  link: string
  meta: Record<string, any>
}

export interface WordPressPage {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  link: string
  meta: Record<string, any>
}

export class WordPressService {
  constructor(
    private siteUrl: string,
    private basicAuth: string
  ) {}

  /**
   * Test WordPress connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/users/me`, {
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
        },
      })

      if (!response.ok) {
        return { success: false, error: 'Invalid credentials or REST API disabled' }
      }

      const user = await response.json()

      // Check if user has required capabilities
      if (!user.capabilities || (!user.capabilities.edit_posts && !user.capabilities.manage_options)) {
        return { success: false, error: 'User lacks required permissions' }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      }
    }
  }

  /**
   * Fetch all posts
   */
  async fetchPosts(page: number = 1, perPage: number = 100): Promise<WordPressPost[]> {
    const response = await fetch(
      `${this.siteUrl}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Fetch all pages
   */
  async fetchPages(page: number = 1, perPage: number = 100): Promise<WordPressPage[]> {
    const response = await fetch(
      `${this.siteUrl}/wp-json/wp/v2/pages?page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Update post SEO
   */
  async updatePostSEO(
    postId: number,
    data: {
      title?: string
      seoTitle?: string
      metaDescription?: string
    }
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = {}

      if (data.title) {
        updateData.title = data.title
      }

      // Update Yoast SEO meta fields
      if (data.seoTitle || data.metaDescription) {
        updateData.meta = {}
        if (data.seoTitle) {
          updateData.meta._yoast_wpseo_title = data.seoTitle
        }
        if (data.metaDescription) {
          updateData.meta._yoast_wpseo_metadesc = data.metaDescription
        }
      }

      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `WordPress API error: ${response.statusText}`)
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update post SEO',
      }
    }
  }

  /**
   * Update page SEO
   */
  async updatePageSEO(
    pageId: number,
    data: {
      title?: string
      seoTitle?: string
      metaDescription?: string
    }
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = {}

      if (data.title) {
        updateData.title = data.title
      }

      // Update Yoast SEO meta fields
      if (data.seoTitle || data.metaDescription) {
        updateData.meta = {}
        if (data.seoTitle) {
          updateData.meta._yoast_wpseo_title = data.seoTitle
        }
        if (data.metaDescription) {
          updateData.meta._yoast_wpseo_metadesc = data.metaDescription
        }
      }

      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/pages/${pageId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `WordPress API error: ${response.statusText}`)
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update page SEO',
      }
    }
  }

  /**
   * Update media alt text
   */
  async updateMediaAltText(mediaId: number, altText: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/media/${mediaId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alt_text: altText,
        }),
      })

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.statusText}`)
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update media alt text',
      }
    }
  }

  /**
   * Detect installed SEO plugins
   */
  async detectSEOPlugins(): Promise<string[]> {
    const plugins: string[] = []

    // Check for Yoast SEO
    try {
      const yoastResponse = await fetch(`${this.siteUrl}/wp-json/yoast/v1/get_head?url=${this.siteUrl}`, {
        headers: { 'Authorization': `Basic ${this.basicAuth}` },
      })
      if (yoastResponse.ok) {
        plugins.push('yoast')
      }
    } catch (e) {
      // Yoast not installed
    }

    // Check for Rank Math
    try {
      const rankMathResponse = await fetch(`${this.siteUrl}/wp-json/rankmath/v1/getHead`, {
        headers: { 'Authorization': `Basic ${this.basicAuth}` },
      })
      if (rankMathResponse.ok) {
        plugins.push('rankmath')
      }
    } catch (e) {
      // Rank Math not installed
    }

    return plugins
  }
}

/**
 * Apply a fix to WordPress site
 */
export async function applyWordPressFix(
  connection: Connection,
  fix: Fix
): Promise<{ success: boolean; error?: string }> {
  const credentials = connection.credentials as any
  const basicAuth = credentials.auth

  const service = new WordPressService(connection.domain, basicAuth)

  const afterState = fix.afterState as any

  try {
    switch (fix.type) {
      case 'UPDATE_META_TITLE':
      case 'UPDATE_META_DESCRIPTION':
      case 'UPDATE_POST_SEO':
        return await service.updatePostSEO(afterState.postId, {
          title: afterState.title,
          seoTitle: afterState.seoTitle,
          metaDescription: afterState.metaDescription,
        })

      case 'UPDATE_PAGE_SEO':
        return await service.updatePageSEO(afterState.pageId, {
          title: afterState.title,
          seoTitle: afterState.seoTitle,
          metaDescription: afterState.metaDescription,
        })

      case 'ADD_IMAGE_ALT_TEXT':
        // Update multiple images
        const results = await Promise.all(
          afterState.images.map((img: { id: number; altText: string }) =>
            service.updateMediaAltText(img.id, img.altText)
          )
        )
        const allSuccess = results.every(r => r.success)
        return {
          success: allSuccess,
          error: allSuccess ? undefined : 'Some images failed to update',
        }

      default:
        return { success: false, error: `Fix type ${fix.type} not supported for WordPress` }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to apply WordPress fix',
    }
  }
}

/**
 * Sync WordPress site data
 */
export async function syncWordPressSite(connectionId: string): Promise<void> {
  const connection = await db.connection.findUnique({
    where: { id: connectionId },
    include: { sites: true },
  })

  if (!connection || connection.sites.length === 0) {
    throw new Error('Connection or site not found')
  }

  const credentials = connection.credentials as any
  const basicAuth = credentials.auth

  const service = new WordPressService(connection.domain, basicAuth)

  // Fetch posts
  const posts = await service.fetchPosts()
  console.log(`Fetched ${posts.length} posts from WordPress`)

  // Fetch pages
  const pages = await service.fetchPages()
  console.log(`Fetched ${pages.length} pages from WordPress`)

  // Detect SEO plugins
  const seoPlugins = await service.detectSEOPlugins()
  console.log(`Detected SEO plugins: ${seoPlugins.join(', ')}`)

  // Update connection metadata
  await db.connection.update({
    where: { id: connectionId },
    data: {
      credentials: {
        ...credentials,
        seoPlugins,
        lastSync: new Date().toISOString(),
        postCount: posts.length,
        pageCount: pages.length,
      },
    },
  })

  // Store basic metrics
  const site = connection.sites[0]
  await db.metric.create({
    data: {
      connectionId: connection.id,
      siteId: site.id,
      date: new Date(),
      topKeywords: {
        content_count: posts.length + pages.length,
      },
    },
  })
}
