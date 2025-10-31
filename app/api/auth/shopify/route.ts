import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import crypto from 'crypto'

const SHOPIFY_CONFIG = {
  client_id: process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5',
  client_secret: process.env.SHOPIFY_CLIENT_SECRET || '',
  scopes: 'read_products,write_products,read_content,write_content,read_themes,write_themes',
  redirect_uri: process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:3000/api/auth/shopify/callback',
}

/**
 * Initiate Shopify OAuth flow
 * GET /api/auth/shopify?shop=example.myshopify.com
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

    const shop = request.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { success: false, error: 'Missing shop parameter' },
        { status: 400 }
      )
    }

    // Validate shop domain
    if (!shop.endsWith('.myshopify.com')) {
      return NextResponse.json(
        { success: false, error: 'Invalid shop domain' },
        { status: 400 }
      )
    }

    // Generate random state for CSRF protection
    const state = crypto.randomBytes(16).toString('hex')

    // TODO: Store state in Redis with userId
    // await redis.set(`shopify:state:${state}`, userId, 'EX', 600)

    // Build OAuth URL
    const params = new URLSearchParams({
      client_id: SHOPIFY_CONFIG.client_id,
      scope: SHOPIFY_CONFIG.scopes,
      redirect_uri: SHOPIFY_CONFIG.redirect_uri,
      state: state,
    })

    const authUrl = `https://${shop}/admin/oauth/authorize?${params.toString()}`

    return NextResponse.json({
      success: true,
      authUrl,
    })
  } catch (error) {
    console.error('Shopify OAuth initiation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
