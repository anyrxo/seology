import { NextRequest, NextResponse } from 'next/server'
import { exchangeGitHubCode, getGitHubUser } from '@/lib/github'

// Mark this route as dynamic (uses searchParams)
export const dynamic = 'force-dynamic'

/**
 * GitHub OAuth - Callback
 * Handles the OAuth callback from GitHub
 * Stores access token temporarily and redirects to repository selector
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Handle OAuth error
    if (error) {
      console.error('GitHub OAuth error:', error)
      return NextResponse.redirect(
        new URL(
          `/dashboard/sites/connect?error=${encodeURIComponent(error)}`,
          request.url
        )
      )
    }

    // Validate required parameters
    if (!code || !state) {
      return NextResponse.redirect(
        new URL(
          '/dashboard/sites/connect?error=missing_parameters',
          request.url
        )
      )
    }

    // Verify state parameter
    let stateData
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'))
    } catch {
      return NextResponse.redirect(
        new URL('/dashboard/sites/connect?error=invalid_state', request.url)
      )
    }

    // Check state timestamp (should be within 10 minutes)
    const now = Date.now()
    if (now - stateData.timestamp > 10 * 60 * 1000) {
      return NextResponse.redirect(
        new URL('/dashboard/sites/connect?error=expired_state', request.url)
      )
    }

    // Exchange code for access token
    const tokenData = await exchangeGitHubCode(code)

    // Get GitHub user info
    const githubUser = await getGitHubUser(tokenData.access_token)

    // Store access token and user data in session/cookie temporarily
    // We'll use this on the repository selector page
    const redirectUrl = new URL('/dashboard/sites/connect/github/select', request.url)

    // Add temporary session data as query params (or use cookies for production)
    // For security, we should encrypt this data
    const sessionData = Buffer.from(
      JSON.stringify({
        accessToken: tokenData.access_token,
        githubUser: {
          login: githubUser.login,
          id: githubUser.id,
          avatar_url: githubUser.avatar_url,
          name: githubUser.name,
        },
        userId: stateData.userId,
        timestamp: Date.now(),
      })
    ).toString('base64')

    redirectUrl.searchParams.set('session', sessionData)

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('GitHub OAuth callback error:', error)
    return NextResponse.redirect(
      new URL(
        '/dashboard/sites/connect?error=oauth_failed',
        request.url
      )
    )
  }
}
