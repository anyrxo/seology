import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get('shop')

  if (!shop) {
    return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 })
  }

  // Shopify OAuth configuration
  const clientId = process.env.SHOPIFY_CLIENT_ID || '0b87ac78cf0783fd1dd829bf5421fae5'
  const scopes = 'read_products,write_products,read_content,write_content,read_themes,write_themes'
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/shopify/callback`

  // Generate state for security
  const state = Buffer.from(
    JSON.stringify({
      userId: session.userId,
      timestamp: Date.now(),
    })
  ).toString('base64')

  // Build Shopify OAuth URL
  const shopifyDomain = shop.includes('.myshopify.com') ? shop : `${shop}.myshopify.com`
  const authUrl = `https://${shopifyDomain}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}`

  return NextResponse.redirect(authUrl)
}
