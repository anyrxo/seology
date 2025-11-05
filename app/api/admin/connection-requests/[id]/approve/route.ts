import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

// Mark this route as dynamic (uses auth/headers)
export const dynamic = 'force-dynamic'

// POST /api/admin/connection-requests/[id]/approve - Approve connection request
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const adminUser = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true },
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const requestId = params.id

    // Get the connection request
    const request = await db.connectionRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    if (request.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Request is not pending' },
        { status: 400 }
      )
    }

    // Generate OAuth URL based on platform
    let oauthUrl = ''

    if (request.platform === 'SHOPIFY') {
      const shopDomain = request.storeUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
      const clientId = process.env.SHOPIFY_CLIENT_ID
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/shopify/callback`
      const state = crypto.randomBytes(32).toString('base64url')

      // Store state in database for CSRF protection
      await db.cSRFToken.create({
        data: {
          userId: request.userId,
          token: state,
          provider: 'SHOPIFY',
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        },
      })

      const scopes = [
        'read_products',
        'write_products',
        'read_content',
        'write_content',
        'read_themes',
        'write_themes',
        'read_customers',
        'read_online_store_pages',
        'write_online_store_pages',
      ].join(',')

      oauthUrl = `https://${shopDomain}/admin/oauth/authorize?` +
        new URLSearchParams({
          client_id: clientId!,
          scope: scopes,
          redirect_uri: redirectUri,
          state,
        }).toString()
    } else if (request.platform === 'WORDPRESS') {
      // For WordPress, provide instructions instead of OAuth
      oauthUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/sites/connect?platform=wordpress&domain=${encodeURIComponent(request.storeUrl)}`
    } else {
      // For other platforms, provide generic connection page
      oauthUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/sites/connect?platform=${request.platform.toLowerCase()}`
    }

    // Update request status
    const updatedRequest = await db.connectionRequest.update({
      where: { id: requestId },
      data: {
        status: 'APPROVED',
        oauthUrl,
        reviewedBy: adminUser.id,
        reviewedAt: new Date(),
      },
    })

    // Create platform-specific notification for customer
    let notificationTitle = ''
    let notificationMessage = ''

    if (request.platform === 'SHOPIFY') {
      notificationTitle = '🎉 Your Shopify Store is Ready to Connect!'
      notificationMessage = 'Click below to authorize SEOLOGY in your Shopify admin. This will take just a few seconds.'
    } else if (request.platform === 'WORDPRESS') {
      notificationTitle = '📝 WordPress Connection Instructions Ready!'
      notificationMessage = 'Click below to view setup instructions. You can install our plugin or connect via REST API.'
    } else if (request.platform === 'CUSTOM') {
      notificationTitle = '⚡ Your Magic.js Snippet is Ready!'
      notificationMessage = 'Click below to get your tracking snippet. Just add it to your website\'s <head> section and you\'re done!'
    } else {
      notificationTitle = '🎉 Your Connection Setup is Ready!'
      notificationMessage = `Click below to view setup instructions for your ${request.platform} site.`
    }

    await db.notification.create({
      data: {
        userId: request.userId,
        type: 'SUCCESS',
        title: notificationTitle,
        message: notificationMessage,
        actionUrl: oauthUrl,
        icon: '🔗',
        color: 'green',
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: adminUser.id,
        action: 'CONNECTION_REQUEST_APPROVED',
        resource: 'connection_request',
        resourceId: requestId,
        details: JSON.stringify({
          customerUserId: request.userId,
          customerEmail: request.user.email,
          platform: request.platform,
          storeUrl: request.storeUrl,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedRequest,
    })
  } catch (error) {
    console.error('Error approving connection request:', error)
    return NextResponse.json(
      { error: 'Failed to approve connection request' },
      { status: 500 }
    )
  }
}
