import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Seology.ai - SEO Automation Platform',
  description: 'The first SEO automation platform that actually fixes your website. Claude AI automatically applies permanent SEO fixes to any CMS.',
}

const isClerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('REPLACE')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={isClerkConfigured ? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY : undefined}
      dynamic
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
