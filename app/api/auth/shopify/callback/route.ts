import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { encrypt } from '@/lib/encryption'
import { validateOAuthState } from '@/lib/csrf'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  const shop = searchParams.get('shop')
  const state = searchParams.get('state')
  const hmac = searchParams.get('hmac')

  if (!code || !shop || !state) {
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=missing_params', req.url)
    )
  }

  // Validate CSRF-protected state parameter
  const stateValidation = await validateOAuthState(state, 'SHOPIFY')

  if (!stateValidation.valid || !stateValidation.userId) {
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=invalid_state', req.url)
    )
  }

  const userId = stateValidation.userId

  // Exchange code for access token
  const clientId = process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5'
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET || ''

  if (!clientSecret) {
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=config_error', req.url)
    )
  }

  try {
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.redirect(
        new URL('/dashboard/sites?error=user_not_found', req.url)
      )
    }

    // Encrypt access token before storing
    const encryptedToken = encrypt(accessToken)

    // Create connection in database
    const connection = await db.connection.create({
      data: {
        userId: user.id,
        platform: 'SHOPIFY',
        domain: shop,
        displayName: shop.replace('.myshopify.com', ''),
        accessToken: encryptedToken, // Encrypted using AES-256-GCM
        status: 'CONNECTED',
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        connectionId: connection.id,
        action: 'SHOPIFY_CONNECTED',
        details: JSON.stringify({ shop }),
      },
    })

    // Create notification
    await db.notification.create({
      data: {
        userId: user.id,
        type: 'connection_success',
        title: 'Shopify Store Connected',
        message: `Successfully connected ${shop}`,
      },
    })

    // Redirect to site details page
    return NextResponse.redirect(
      new URL(`/dashboard/sites/${connection.id}?success=shopify_connected`, req.url)
    )
  } catch (error) {
    console.error('Shopify OAuth error:', error)
    return NextResponse.redirect(
      new URL('/dashboard/sites?error=oauth_failed', req.url)
    )
  }
}
