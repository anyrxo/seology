import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Seology.ai - SEO Automation Platform',
  description: 'The first SEO automation platform that actually fixes your website. Claude AI automatically applies permanent SEO fixes to any CMS.',
}

// Check if Clerk is configured
const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
                     process.env.CLERK_SECRET_KEY &&
                     !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('REPLACE')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // If Clerk isn't configured, render without it
  if (!hasClerkKeys) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Seology.ai - Configuration Required</h1>
            <p>Please configure Clerk authentication keys in your environment variables.</p>
            <p>See DEPLOYMENT_CHECKLIST.md for setup instructions.</p>
          </div>
        </body>
      </html>
    )
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
