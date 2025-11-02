import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware is intentionally minimal to avoid Edge Runtime compatibility issues
// Auth protection is handled at the page/component level using Clerk's useAuth() hook
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
