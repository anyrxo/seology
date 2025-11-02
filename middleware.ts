import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/pricing.html',
  '/about.html',
  '/blog.html',
  '/blog/(.*)',
  '/careers.html',
  '/contact.html',
  '/demo.html',
  '/help.html',
  '/docs.html',
  '/api.html',
  '/privacy.html',
  '/terms.html',
  '/security.html',
  '/dpa.html',
  '/ecommerce.html',
  '/saas.html',
  '/agencies.html',
  '/local-business.html',
  '/enterprise.html',
  '/api/webhooks/(.*)',
  '/api/magic/(.*)',
])

// Admin routes require admin role
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const session = await auth()

  // Restrict admin routes to users with admin role
  if (isAdminRoute(req)) {
    const metadata = session.sessionClaims?.metadata as { role?: string } | undefined
    if (!session.userId || !metadata?.role || metadata.role !== 'admin') {
      return Response.redirect(new URL('/dashboard', req.url))
    }
  }

  // Protect all dashboard routes - redirect to sign-in if not authenticated
  if (!isPublicRoute(req) && !session.userId) {
    return Response.redirect(new URL('/sign-in', req.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
