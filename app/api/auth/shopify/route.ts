/**
 * Shopify OAuth Installation Route
 *
 * Initiates OAuth flow when merchant clicks "Install App"
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import crypto from 'crypto'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    // Get shop parameter from query
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { error: 'Missing shop parameter' },
        { status: 400 }
      )
    }

    // Validate shop domain format
    if (!shop.endsWith('.myshopify.com')) {
      return NextResponse.json(
        { error: 'Invalid shop domain' },
        { status: 400 }
      )
    }

    const clientId = process.env.SHOPIFY_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/shopify/callback`
    // Add read_locales for offline access tokens that never expire
    const scopes = 'read_products,write_products,read_content,write_content,read_themes,write_themes,read_online_store_pages,write_online_store_pages,read_locales'

    if (!clientId) {
      return NextResponse.json(
        { error: 'Shopify client ID not configured' },
        { status: 500 }
      )
    }

    // Generate state token for CSRF protection
    const state = crypto.randomBytes(32).toString('hex')

    // Store state token in database with expiry
    await db.cSRFToken.create({
      data: {
        userId,
        token: state,
        provider: 'SHOPIFY',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    })

    // Build Shopify OAuth URL
    const authUrl = new URL(`https://${shop}/admin/oauth/authorize`)
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('grant_options[]', 'offline') // Request offline access token

    // Redirect to Shopify
    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error('Shopify OAuth initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate Shopify authorization' },
      { status: 500 }
    )
  }
}
