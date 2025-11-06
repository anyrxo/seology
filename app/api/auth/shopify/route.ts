import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

/**
 * Legacy Shopify OAuth route - redirects to /install for consistency
 *
 * This route exists for backward compatibility but now redirects to
 * the unified install route which handles both new and existing users.
 *
 * @deprecated Use /api/auth/shopify/install directly
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get('shop')

  if (!shop) {
    return NextResponse.json({
      error: 'Missing shop parameter',
      message: 'Please provide your Shopify store URL'
    }, { status: 400 })
  }

  // Normalize shop domain
  const shopifyDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`

  // Redirect to the unified install route
  // This handles OAuth for both new and existing users
  const installUrl = new URL('/api/auth/shopify/install', req.url)
  installUrl.searchParams.set('shop', shopifyDomain)

  return NextResponse.redirect(installUrl)
}
