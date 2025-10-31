import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/magic/connect
 * Connect a site via Magic.js universal JavaScript
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, url, userAgent, version } = body

    if (!apiKey || !url) {
      return NextResponse.json(
        { error: 'Missing required fields: apiKey, url' },
        { status: 400 }
      )
    }

    // Find connection by API key
    const connection = await db.connection.findFirst({
      where: {
        platform: 'CUSTOM',
        credentials: {
          path: ['apiKey'],
          equals: apiKey,
        },
      },
      include: { sites: true },
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Get or create site
    let site = connection.sites.find(s => s.url === url)

    if (!site) {
      site = await db.site.create({
        data: {
          userId: connection.userId,
          url: url,
          connectionId: connection.id,
        },
      })
    }

    // Update connection metadata
    await db.connection.update({
      where: { id: connection.id },
      data: {
        credentials: {
          ...(connection.credentials as any),
          lastConnected: new Date().toISOString(),
          userAgent: userAgent,
          magicJsVersion: version,
        },
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        siteId: site.id,
        userId: connection.userId,
        action: 'MAGIC_JS_CONNECTED',
        resource: 'site',
        resourceId: site.id,
        details: {
          url: url,
          version: version,
          userAgent: userAgent,
        },
      },
    })

    return NextResponse.json({
      success: true,
      siteId: site.id,
      message: 'Connected successfully',
    })
  } catch (error) {
    console.error('Error connecting magic.js:', error)
    return NextResponse.json(
      {
        error: 'Failed to connect',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
