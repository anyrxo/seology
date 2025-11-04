import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import {
  getGitHubRepositories,
  getRepositoriesWithPages,
  detectWebsiteUrl,
  storeGitHubConnection,
  GitHubRepository,
} from '@/lib/github'

/**
 * GET /api/github/repositories
 * Fetch user's GitHub repositories
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const accessToken = searchParams.get('accessToken')
    const pagesOnly = searchParams.get('pagesOnly') === 'true'

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token required' },
        { status: 400 }
      )
    }

    // Fetch repositories
    let repositories: GitHubRepository[]

    if (pagesOnly) {
      repositories = await getRepositoriesWithPages(accessToken)
    } else {
      repositories = await getGitHubRepositories(accessToken, {
        sort: 'updated',
        per_page: 100,
      })
    }

    // Detect website URLs for each repository
    const repositoriesWithUrls = await Promise.all(
      repositories.map(async (repo) => {
        const websiteUrl = await detectWebsiteUrl(accessToken, repo)
        return {
          ...repo,
          detected_url: websiteUrl,
        }
      })
    )

    return NextResponse.json({
      success: true,
      repositories: repositoriesWithUrls,
      count: repositoriesWithUrls.length,
    })
  } catch (error) {
    console.error('GitHub repositories fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch repositories',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/github/repositories
 * Connect a GitHub repository to SEOLOGY.AI
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { repository, accessToken, githubUser } = body

    if (!repository || !accessToken || !githubUser) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Detect website URL
    const websiteUrl = await detectWebsiteUrl(accessToken, repository)

    if (!websiteUrl) {
      return NextResponse.json(
        {
          error: 'No website URL detected',
          message:
            'This repository does not have a published website. Please enable GitHub Pages or set a homepage URL.',
        },
        { status: 400 }
      )
    }

    // Store connection in database
    const connection = await storeGitHubConnection({
      userId: session.userId,
      repository,
      accessToken,
      websiteUrl,
      githubUser,
    })

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        platform: connection.platform,
        domain: connection.domain,
        displayName: connection.displayName,
        status: connection.status,
      },
      message: 'GitHub repository connected successfully',
    })
  } catch (error) {
    console.error('GitHub repository connection error:', error)
    return NextResponse.json(
      {
        error: 'Failed to connect repository',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
