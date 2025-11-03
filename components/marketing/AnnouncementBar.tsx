'use client'

import * as React from 'react'
import Link from 'next/link'
import { X, Sparkles } from 'lucide-react'
import { useAnnouncement } from './AnnouncementContext'

export function AnnouncementBar() {
  const { isVisible, setIsVisible } = useAnnouncement()

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 h-12">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-center h-full">
        <Sparkles className="h-5 w-5 text-white flex-shrink-0" />
        <p className="text-sm font-medium text-white sm:text-base">
          <strong>New:</strong> Automatic SEO fixes for Shopify stores now live!{' '}
          <Link href="/features" className="underline hover:no-underline">
            Learn more →
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/10 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  )
}
