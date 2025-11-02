/**
 * WordPress Integration
 * REST API integration for applying SEO fixes to WordPress sites
 */

import { Connection } from '@prisma/client'
import { decrypt } from './encryption'

interface WordPressFixResult {
  success: boolean
  message: string
  data?: unknown
}

interface WordPressPost {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  slug: string
  meta: Record<string, string>
}

/**
 * WordPress REST API client
 */
class WordPressAPI {
  private siteUrl: string
  private auth: string

  constructor(siteUrl: string, username: string, appPassword: string) {
    this.siteUrl = siteUrl.replace(/\/$/, '')
    this.auth = Buffer.from(`${username}:${appPassword}`).toString('base64')
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.siteUrl}/wp-json/wp/v2${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`WordPress API error: ${response.statusText} - ${error}`)
    }

    return response.json()
  }

  async updatePost(postId: number, data: {
    title?: string
    content?: string
    meta?: Record<string, string>
  }) {
    return this.request(`/posts/${postId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updatePage(pageId: number, data: {
    title?: string
    content?: string
    meta?: Record<string, string>
  }) {
    return this.request(`/pages/${pageId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateYoastMeta(postId: number, postType: 'posts' | 'pages', meta: {
    title?: string
    description?: string
  }) {
    const metaData: Record<string, string> = {}
    if (meta.title) metaData['_yoast_wpseo_title'] = meta.title
    if (meta.description) metaData['_yoast_wpseo_metadesc'] = meta.description

    return this.request(`/${postType}/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ meta: metaData }),
    })
  }

  async createRedirect(source: string, target: string) {
    const endpoint = `${this.siteUrl}/wp-json/redirection/v1/redirect`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: source,
        action_data: { url: target },
        action_type: 'url',
        match_type: 'url',
        group_id: 1,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create redirect: ${response.statusText}`)
    }

    return response.json()
  }
}

/**
 * Apply an SEO fix to a WordPress site
 */
export async function applyWordPressFix(
  connection: Connection,
  issue: { id: string; type: string; pageUrl: string; details: string },
  fixCode: string
): Promise<WordPressFixResult> {
  try {
    if (!connection.credentials) {
      throw new Error('No credentials found')
    }

    const credentials = JSON.parse(decrypt(connection.credentials))
    const { username, appPassword } = credentials

    const wordpress = new WordPressAPI(connection.domain, username, appPassword)
    const fixData = JSON.parse(fixCode)

    switch (issue.type) {
      case 'missing_meta_title':
      case 'missing_meta_description': {
        const resourceId = extractIdFromUrl(issue.pageUrl)
        const resourceType = issue.pageUrl.includes('/page/') ? 'pages' : 'posts'

        await wordpress.updateYoastMeta(resourceId, resourceType, {
          title: fixData.title,
          description: fixData.description,
        })

        return { success: true, message: 'SEO meta updated' }
      }

      case 'broken_link':
      case '404_error': {
        await wordpress.createRedirect(fixData.from, fixData.to)
        return { success: true, message: 'Redirect created' }
      }

      default:
        throw new Error(`Unsupported fix type: ${issue.type}`)
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

function extractIdFromUrl(url: string): number {
  const match = url.match(/[?&]p=(\d+)/)
  return match ? parseInt(match[1]) : 0
}

export async function testWordPressConnection(
  siteUrl: string,
  username: string,
  appPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    const auth = Buffer.from(`${username}:${appPassword}`).toString('base64')
    const response = await fetch(`${siteUrl}/wp-json/wp/v2/users/me`, {
      headers: { 'Authorization': `Basic ${auth}` },
    })

    if (!response.ok) throw new Error('Invalid credentials')

    return { success: true, message: 'Connection successful' }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed'
    }
  }
}
