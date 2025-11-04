import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

/**
 * Shopify App Install Entry Point
 *
 * This route is called when a user clicks "Add App" in the Shopify App Store.
 * It initiates the OAuth flow by redirecting to Shopify's authorization page.
 *
 * Flow:
 * 1. User clicks "Add App" in Shopify App Store
 * 2. Shopify redirects to this route with ?shop=store.myshopify.com
 * 3. We generate secure state and redirect to Shopify OAuth
 * 4. User authorizes (grants permissions)
 * 5. Shopify redirects to /api/auth/shopify/callback
 *
 * Note: We use a temporary state token here since the user account doesn't exist yet.
 * The callback route will handle account creation and proper state validation.
 */
export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop')

  if (!shop) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing shop parameter',
        message: 'Please install SEOLOGY from the Shopify App Store'
      },
      { status: 400 }
    )
  }

  // Validate shop domain format
  if (!shop.endsWith('.myshopify.com')) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid shop domain',
        message: 'Shop domain must be a valid myshopify.com domain'
      },
      { status: 400 }
    )
  }

  try {
    // Generate secure state token for CSRF protection
    // Using crypto.randomBytes since we don't have a user yet (account created in callback)
    const state = crypto.randomBytes(32).toString('base64url')

    // Shopify OAuth configuration
    const clientId = process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5'
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://seology.ai'}/api/auth/shopify/callback`

    // Required scopes for SEOLOGY to function
    const scopes = [
      // Product SEO optimization
      'read_products',
      'write_products',

      // Page and blog content SEO
      'read_content',
      'write_content',

      // Theme injection (for Magic.js script)
      'read_themes',
      'write_themes',

      // Analytics and performance tracking
      'read_analytics',

      // Online store pages access
      'read_online_store_pages',
      'write_online_store_pages',

      // Store information
      'read_shop_data',
    ].join(',')

    // Build Shopify OAuth URL
    const authUrl = new URL(`https://${shop}/admin/oauth/authorize`)
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('grant_options[]', 'per_user')

    console.log('Initiating Shopify OAuth for shop:', shop)
    console.log('Redirect URI:', redirectUri)
    console.log('Scopes:', scopes)

    // Redirect to Shopify authorization page
    return NextResponse.redirect(authUrl.toString())

  } catch (error) {
    console.error('Error initiating Shopify OAuth:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'OAuth initialization failed',
        message: 'Failed to initiate Shopify connection. Please try again.'
      },
      { status: 500 }
    )
  }
}
