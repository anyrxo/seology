import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

/**
 * Shopify App Install Entry Point
 *
 * This route handles Shopify OAuth initialization for custom distribution apps.
 * It works for both:
 * 1. New users installing from external links (no account yet)
 * 2. Existing users connecting from dashboard (already signed in)
 *
 * Flow:
 * 1. User clicks install link or enters store in dashboard
 * 2. This route receives ?shop=store.myshopify.com
 * 3. We generate secure state and redirect to Shopify OAuth
 * 4. User authorizes (grants permissions)
 * 5. Shopify redirects to /api/auth/shopify/callback
 * 6. Callback creates connection and redirects to dashboard
 *
 * Note: This route works for custom distribution (non-App Store) apps.
 * The OAuth flow is the same whether user has an account or not.
 */
export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop')

  if (!shop) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing shop parameter',
        message: 'Please provide your Shopify store URL'
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
    // For custom distribution, we use a simple state token
    // The callback will verify the user's Clerk session
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
