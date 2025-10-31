import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { encrypt } from '@/lib/encryption'
import { checkSiteLimit, getUserDbId } from '@/lib/middleware/usage-enforcement'
import { trackSiteConnected } from '@/lib/usage'

/**
 * Connect WordPress site via Application Password
 * POST /api/connections/wordpress
 * Body: { siteUrl, username, applicationPassword }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check site connection limit before connecting
    const limitCheck = await checkSiteLimit(userId)
    if (limitCheck) {
      return limitCheck
    }

    const body = await request.json()
    const { siteUrl, username, applicationPassword } = body

    if (!siteUrl || !username || !applicationPassword) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate site URL
    let cleanUrl = siteUrl.trim()
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = `https://${cleanUrl}`
    }

    // Test connection by fetching current user
    const basicAuth = Buffer.from(`${username}:${applicationPassword}`).toString('base64')

    const testResponse = await fetch(`${cleanUrl}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
    })

    if (!testResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials or REST API disabled',
          details: 'Could not authenticate with WordPress site',
        },
        { status: 400 }
      )
    }

    const wpUser = await testResponse.json()

    // Check if user has required capabilities
    if (!wpUser.capabilities?.edit_posts) {
      return NextResponse.json(
        {
          success: false,
          error: 'Insufficient permissions',
          details: 'User must have edit_posts capability',
        },
        { status: 403 }
      )
    }

    // Encrypt credentials
    const encryptedAuth = await encrypt(basicAuth)

    // Find or create user in database
    let user = await db.user.findUnique({
      where: { clerkUserId: userId },
    })

    if (!user) {
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: '', // Will be populated by Clerk webhook
          plan: 'STARTER',
          executionMode: 'APPROVE',
        },
      })
    }

    // Create connection
    const connection = await db.connection.create({
      data: {
        userId: user.id,
        platform: 'WORDPRESS',
        domain: cleanUrl,
        displayName: wpUser.name || cleanUrl,
        credentials: {
          method: 'REST',
          auth: encryptedAuth,
          capabilities: wpUser.capabilities,
          username: username,
        },
        status: 'CONNECTED',
      },
    })

    // TODO: Queue initial site analysis
    // await queue.add('analyze-site', {
    //   connectionId: connection.id,
    //   userId: user.id
    // })

    // Track site connection usage
    const userDbId = await getUserDbId(userId)
    if (userDbId) {
      await trackSiteConnected(userDbId, connection.id)
    }

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        platform: connection.platform,
        domain: connection.domain,
        displayName: connection.displayName,
        status: connection.status,
      },
    })
  } catch (error) {
    console.error('WordPress connection error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to connect WordPress site' },
      { status: 500 }
    )
  }
}

/**
 * Get all WordPress connections for current user
 * GET /api/connections/wordpress
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        connections: {
          where: { platform: 'WORDPRESS' },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: true, connections: [] }
      )
    }

    // Remove sensitive data before sending
    const connections = user.connections.map(conn => ({
      id: conn.id,
      platform: conn.platform,
      domain: conn.domain,
      displayName: conn.displayName,
      status: conn.status,
      lastSync: conn.lastSync,
      createdAt: conn.createdAt,
    }))

    return NextResponse.json({
      success: true,
      connections,
    })
  } catch (error) {
    console.error('Get connections error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get connections' },
      { status: 500 }
    )
  }
}
