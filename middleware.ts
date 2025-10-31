import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware without Clerk to avoid Edge runtime issues
// Authentication is handled by Clerk in individual pages and API routes
export function middleware(request: NextRequest) {
  // Just pass through - Clerk authentication happens at component level
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
