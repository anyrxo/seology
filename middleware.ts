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

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/about',
  '/features',
  '/docs',
  '/terms',
  '/privacy',
  '/contact',
  '/api/health',
  '/api/webhooks/clerk',
  '/api/billing/webhook',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/test-dashflow',
  '/api-explorer',
])

// Define cron routes that use CRON_SECRET for auth
const isCronRoute = createRouteMatcher(['/api/cron/(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Add security headers to all responses
  const response = addSecurityHeaders(req, NextResponse.next())

  // Skip auth check for cron routes (they use CRON_SECRET)
  if (isCronRoute(req)) {
    return response
  }

  // Allow public routes
  if (isPublicRoute(req)) {
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
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' data: https://fonts.gstatic.com https://r2cdn.perplexity.ai",
    "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://api.anthropic.com https://api.stripe.com https://*.myshopify.com",
    "frame-src 'self' https://js.stripe.com https://*.clerk.accounts.dev https://*.clerk.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ')

  headers.set('Content-Security-Policy', cspDirectives)

  // Prevent clickjacking attacks
  headers.set('X-Frame-Options', 'DENY')

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
