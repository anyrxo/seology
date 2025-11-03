'use client'

import * as React from 'react'
import { Mail, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSignup() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 inline-flex rounded-full bg-blue-500/10 p-3">
          <Mail className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">Stay Updated</h3>
        <p className="mb-6 text-sm text-gray-400">
          Get the latest SEO tips, product updates, and automation strategies delivered to your inbox.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 p-4 text-green-400">
            <Check className="h-5 w-5" />
            <span className="font-medium">Successfully subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" isLoading={status === 'loading'}>
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}
