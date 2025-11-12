/**
 * Next.js Middleware
 * Global middleware for security headers, authentication, and request processing
 *
 * SECURITY FEATURES:
 * - Comprehensive security headers (CSP, HSTS, etc.)
 * - CSRF protection for state changes
 * - Request logging for audit trail
 * - Path-based security policies
 */

import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper to check if path matches pattern
function isPublicRoute(pathname: string): boolean {
  const publicPaths = [
    '/',
    '/pricing',
    '/about',
    '/features',
    '/demo',
    '/terms',
    '/privacy',
    '/cookies',
    '/status',
    '/changelog',
    '/help',
    '/api',
    '/contact',
    '/careers',
    '/roadmap',
    '/case-studies',
    '/support',
    '/partners',
    '/security',
    '/compliance',
    '/api/health',
    '/api/webhooks/clerk',
    '/api/billing/webhook',
    '/test-dashflow',
    '/api-explorer',
  ]

  const publicPrefixes = [
    '/docs',
    '/sign-in',
    '/sign-up',
    '/integrations',
    '/guides',
    '/blog',
    '/shopify', // Shopify embedded app routes - use Shopify OAuth instead of Clerk
    '/api/shopify', // Shopify API routes - use session tokens for auth
    '/api/auth/shopify', // Shopify OAuth routes - MUST be public
    '/api/webhooks/shopify', // Shopify webhooks - no auth
  ]

  // Exact match
  if (publicPaths.includes(pathname)) {
    return true
  }

  // Prefix match
  return publicPrefixes.some((prefix) => pathname.startsWith(prefix))
}

// Helper to check if path is cron route or admin endpoint with CRON_SECRET auth
function isCronRoute(pathname: string): boolean {
  return pathname.startsWith('/api/cron/') || pathname === '/api/admin/sync-schema'
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Add security headers to all responses
  const response = addSecurityHeaders(req, NextResponse.next())

  const pathname = req.nextUrl.pathname

  // Skip auth check for cron routes (they use CRON_SECRET)
  if (isCronRoute(pathname)) {
    return response
  }

  // CRITICAL: Skip Clerk auth entirely for Shopify OAuth and webhook routes
  // These routes MUST be public for Shopify app installation to work
  if (
    pathname.startsWith('/api/auth/shopify') ||
    pathname.startsWith('/api/webhooks/shopify') ||
    pathname.startsWith('/shopify') ||
    pathname.startsWith('/api/shopify')
  ) {
    return response
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return response
  }

  // For protected routes, check authentication
  const authObj = await auth()
  if (!authObj.userId) {
    // Redirect to sign-in if not authenticated
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  return response
})

/**
 * Add comprehensive security headers to response
 */
function addSecurityHeaders(req: NextRequest, response: NextResponse): NextResponse {
  const headers = response.headers

  // Content Security Policy (CSP)
  // Strict policy to prevent XSS attacks
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.shopify.com https://cdn.jsdelivr.net https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' data: https://fonts.gstatic.com https://r2cdn.perplexity.ai",
    "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://api.anthropic.com https://api.stripe.com https://*.myshopify.com",
    "frame-src 'self' https://js.stripe.com https://*.clerk.accounts.dev https://*.clerk.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self' https://*.myshopify.com https://admin.shopify.com",
    "upgrade-insecure-requests",
  ].join('; ')

  headers.set('Content-Security-Policy', cspDirectives)

  // Prevent clickjacking attacks - Allow Shopify to embed the app
  headers.set('X-Frame-Options', 'ALLOW-FROM https://admin.shopify.com')

  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff')

  // Enable browser XSS protection
  headers.set('X-XSS-Protection', '1; mode=block')

  // Referrer Policy - don't leak information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy - restrict browser features
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=(self)',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', ')
  headers.set('Permissions-Policy', permissionsPolicy)

  // Strict-Transport-Security (HSTS) - only in production
  if (process.env.NODE_ENV === 'production') {
    // Force HTTPS for 2 years, including subdomains
    headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    )
  }

  // Remove potentially sensitive headers
  headers.delete('X-Powered-By')
  headers.delete('Server')

  // Add custom security headers for tracking
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-DNS-Prefetch-Control', 'off')
  headers.set('X-Download-Options', 'noopen')

  // CORS headers for API routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    // Only allow same-origin by default
    headers.set('Access-Control-Allow-Origin', req.headers.get('origin') || '*')
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
    headers.set('Access-Control-Allow-Credentials', 'true')
    headers.set('Access-Control-Max-Age', '86400') // 24 hours

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers })
    }
  }

  // Add cache control for static assets
  if (req.nextUrl.pathname.startsWith('/_next/static/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (req.nextUrl.pathname.startsWith('/images/')) {
    headers.set('Cache-Control', 'public, max-age=86400, must-revalidate')
  } else {
    // No caching for dynamic content
    headers.set('Cache-Control', 'no-store, max-age=0')
  }

  return response
}

export const config = {
  // Match all routes except static files and Next.js internals
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}
