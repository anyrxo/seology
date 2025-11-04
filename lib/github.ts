/**
 * GitHub Integration Library
 * Handles OAuth, repository fetching, and GitHub Pages detection
 */

import { encrypt, decrypt } from './encryption'

const GITHUB_API_BASE = 'https://api.github.com'

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
  html_url: string
  homepage: string | null
  has_pages: boolean
  default_branch: string
  owner: {
    login: string
    avatar_url: string
  }
}

export interface GitHubPagesInfo {
  url: string | null
  status: string | null
  cname: string | null
  custom_domain: string | null
  https_enforced: boolean
  source?: {
    branch: string
    path: string
  }
}

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  name: string | null
  email: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

/**
 * Exchange OAuth code for access token
 */
export async function exchangeGitHubCode(code: string): Promise<{
  access_token: string
  token_type: string
  scope: string
}> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange GitHub code for token')
  }

  const data = await response.json()

  if (data.error) {
    throw new Error(data.error_description || 'GitHub OAuth error')
  }

  return data
}

/**
 * Get authenticated GitHub user
 */
export async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user')
  }

  return response.json()
}

/**
 * Get user's repositories
 */
export async function getGitHubRepositories(
  accessToken: string,
  options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name'
    direction?: 'asc' | 'desc'
    per_page?: number
    page?: number
    type?: 'all' | 'owner' | 'member'
  } = {}
): Promise<GitHubRepository[]> {
  const {
    sort = 'updated',
    direction = 'desc',
    per_page = 100,
    page = 1,
    type = 'owner',
  } = options

  const params = new URLSearchParams({
    sort,
    direction,
    per_page: per_page.toString(),
    page: page.toString(),
    type,
  })

  const response = await fetch(`${GITHUB_API_BASE}/user/repos?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories')
  }

  return response.json()
}

/**
 * Get repositories with GitHub Pages enabled
 */
export async function getRepositoriesWithPages(
  accessToken: string
): Promise<GitHubRepository[]> {
  const repos = await getGitHubRepositories(accessToken, {
    per_page: 100,
  })

  // Filter repos that have GitHub Pages enabled
  return repos.filter((repo) => repo.has_pages)
}

/**
 * Get GitHub Pages information for a repository
 */
export async function getGitHubPagesInfo(
  accessToken: string,
  owner: string,
  repo: string
): Promise<GitHubPagesInfo> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  if (!response.ok) {
    if (response.status === 404) {
      return {
        url: null,
        status: null,
        cname: null,
        custom_domain: null,
        https_enforced: false,
      }
    }
    throw new Error('Failed to fetch GitHub Pages info')
  }

  return response.json()
}

/**
 * Get repository content (for analyzing HTML files)
 */
export async function getRepositoryContent(
  accessToken: string,
  owner: string,
  repo: string,
  path: string = ''
): Promise<any[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch repository content')
  }

  return response.json()
}

/**
 * Detect website URL from repository
 * Checks: homepage, GitHub Pages, and custom domain
 */
export async function detectWebsiteUrl(
  accessToken: string,
  repo: GitHubRepository
): Promise<string | null> {
  // 1. Check if homepage is set
  if (repo.homepage && isValidUrl(repo.homepage)) {
    return repo.homepage
  }

  // 2. Check GitHub Pages
  if (repo.has_pages) {
    const [owner, repoName] = repo.full_name.split('/')
    const pagesInfo = await getGitHubPagesInfo(accessToken, owner, repoName)

    if (pagesInfo.url) {
      return pagesInfo.url
    }

    // Default GitHub Pages URL
    if (repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
      return `https://${owner.toLowerCase()}.github.io`
    }

    return `https://${owner.toLowerCase()}.github.io/${repoName}`
  }

  return null
}

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Store GitHub connection in database
 */
export async function storeGitHubConnection(data: {
  userId: string
  repository: GitHubRepository
  accessToken: string
  websiteUrl: string
  githubUser: GitHubUser
}) {
  const { db } = await import('./db')

  const encryptedAccessToken = encrypt(data.accessToken)

  const credentials = JSON.stringify({
    repository_id: data.repository.id,
    repository_name: data.repository.full_name,
    github_user_login: data.githubUser.login,
    github_user_id: data.githubUser.id,
    has_pages: data.repository.has_pages,
    default_branch: data.repository.default_branch,
  })

  return db.connection.create({
    data: {
      userId: data.userId,
      platform: 'GITHUB',
      domain: data.websiteUrl,
      displayName: data.repository.name,
      accessToken: encryptedAccessToken,
      credentials,
      status: 'CONNECTED',
    },
  })
}

/**
 * Sync repository status (check if still accessible)
 */
export async function syncGitHubConnection(connectionId: string) {
  const { db } = await import('./db')

  const connection = await db.connection.findUnique({
    where: { id: connectionId },
  })

  if (!connection || connection.platform !== 'GITHUB') {
    throw new Error('Invalid GitHub connection')
  }

  const accessToken = decrypt(connection.accessToken!)
  const credentials = JSON.parse(connection.credentials || '{}')

  try {
    // Test access by fetching user info
    await getGitHubUser(accessToken)

    // Update last synced
    await db.connection.update({
      where: { id: connectionId },
      data: {
        status: 'CONNECTED',
        updatedAt: new Date(),
      },
    })

    return { success: true, status: 'CONNECTED' }
  } catch (error) {
    // Token may be revoked or expired
    await db.connection.update({
      where: { id: connectionId },
      data: {
        status: 'ERROR',
      },
    })

    return { success: false, status: 'ERROR', error: 'Access token invalid' }
  }
}

/**
 * Get GitHub OAuth authorization URL
 */
export function getGitHubAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
    scope: 'read:user repo', // user:email if we need email
    state,
  })

  return `https://github.com/login/oauth/authorize?${params}`
}
