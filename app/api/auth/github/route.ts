import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getGitHubAuthUrl } from '@/lib/github'

/**
 * GitHub OAuth - Initiate
 * Redirects user to GitHub authorization page
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Generate state parameter for CSRF protection
    const state = Buffer.from(
      JSON.stringify({
        userId: session.userId,
        timestamp: Date.now(),
      })
    ).toString('base64')

    // Get GitHub authorization URL
    const authUrl = getGitHubAuthUrl(state)

    // Redirect to GitHub
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('GitHub OAuth initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate GitHub OAuth' },
      { status: 500 }
    )
  }
}
