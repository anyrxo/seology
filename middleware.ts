import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/pricing',
  '/features',
  '/about',
  '/blog(.*)',
])

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)',
])

const isOnboardingRoute = createRouteMatcher(['/onboarding(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protect non-public routes
  if (!isPublicRoute(req)) {
    auth().protect()
  }

  // Additional admin route protection
  // Admin verification is done in the admin pages/routes themselves
  // This just ensures authentication is required
  if (isAdminRoute(req)) {
    auth().protect()
  }

  // Check onboarding status for authenticated users on dashboard routes
  const { userId } = await auth()

  if (userId && !isPublicRoute(req) && !isAdminRoute(req)) {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        select: { onboardingCompleted: true },
      })

      // If user exists and hasn't completed onboarding
      if (user && !user.onboardingCompleted) {
        // Allow access to onboarding routes
        if (isOnboardingRoute(req)) {
          return NextResponse.next()
        }

        // Redirect to onboarding from dashboard routes (but not API routes)
        if (
          !req.nextUrl.pathname.startsWith('/api') &&
          (req.nextUrl.pathname.startsWith('/dashboard') ||
           req.nextUrl.pathname === '/' ||
           req.nextUrl.pathname.startsWith('/sites') ||
           req.nextUrl.pathname.startsWith('/connect') ||
           req.nextUrl.pathname.startsWith('/settings') ||
           req.nextUrl.pathname.startsWith('/billing') ||
           req.nextUrl.pathname.startsWith('/analytics'))
        ) {
          return NextResponse.redirect(new URL('/onboarding', req.url))
        }
      }

      // If user has completed onboarding and tries to access onboarding
      if (user && user.onboardingCompleted && isOnboardingRoute(req)) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    } catch (error) {
      console.error('Middleware onboarding check error:', error)
      // Continue on error to avoid blocking access
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
