import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { encrypt } from '@/lib/encryption'

const SHOPIFY_CONFIG = {
  client_id: process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5',
  client_secret: process.env.SHOPIFY_CLIENT_SECRET || '',
  redirect_uri: process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:3000/api/auth/shopify/callback',
}

/**
 * Handle Shopify OAuth callback
 * GET /api/auth/shopify/callback?code=xxx&shop=example.myshopify.com&state=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    const code = request.nextUrl.searchParams.get('code')
    const shop = request.nextUrl.searchParams.get('shop')
    const state = request.nextUrl.searchParams.get('state')

    if (!code || !shop || !state) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // TODO: Verify state from Redis
    // const storedUserId = await redis.get(`shopify:state:${state}`)
    // if (storedUserId !== userId) {
    //   return NextResponse.json({ success: false, error: 'Invalid state' }, { status: 400 })
    // }

    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: SHOPIFY_CONFIG.client_id,
        client_secret: SHOPIFY_CONFIG.client_secret,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error(`Shopify token exchange failed: ${tokenResponse.statusText}`)
    }

    const { access_token, scope } = await tokenResponse.json()

    // Encrypt token before storing
    const encryptedToken = await encrypt(access_token)

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
        platform: 'SHOPIFY',
        domain: shop,
        displayName: shop.replace('.myshopify.com', ''),
        accessToken: encryptedToken,
        credentials: {
          scope: scope,
          shop: shop,
        },
        status: 'CONNECTED',
      },
    })

    // TODO: Queue initial site analysis
    // await queue.add('analyze-site', {
    //   connectionId: connection.id,
    //   userId: user.id,
    //   priority: 'high'
    // })

    // Redirect to dashboard with success message
    return NextResponse.redirect(
      new URL(`/dashboard/sites/${connection.id}?connected=true`, request.url)
    )
  } catch (error) {
    console.error('Shopify OAuth callback error:', error)
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=connection_failed', request.url)
    )
  }
}
