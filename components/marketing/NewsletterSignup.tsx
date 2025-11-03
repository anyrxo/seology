'use client'

import * as React from 'react'
import { Mail, Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSignup() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isFocused, setIsFocused] = React.useState(false)

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
    <div className="relative rounded-lg border border-white/10 bg-black p-8 overflow-hidden group">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      <div className="mx-auto max-w-md text-center relative z-10">
        {/* Icon with animation */}
        <div className="mb-4 inline-flex relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
          <div className="relative rounded-full bg-white/10 p-3 backdrop-blur-sm">
            <Mail className="h-6 w-6 text-white" />
          </div>
        </div>

        <h3 className="mb-2 text-2xl font-bold text-white flex items-center justify-center gap-2">
          Stay Updated
          <Sparkles className="h-5 w-5 text-white/60" />
        </h3>
        <p className="mb-6 text-sm text-gray-400 leading-relaxed">
          Get the latest SEO tips, product updates, and automation strategies delivered to your inbox.
        </p>

        {status === 'success' ? (
          <div
            className="flex items-center justify-center gap-2 rounded-lg bg-white/10 p-4 text-white border border-white/20 backdrop-blur-sm"
            style={{ animation: 'slideUp 0.5s ease-out' }}
          >
            <Check className="h-5 w-5" />
            <span className="font-medium">Successfully subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
                className={`
                  h-12 w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500
                  focus:bg-white/10 focus:border-white/40
                  transition-all duration-300
                  ${isFocused ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}
                `}
              />
              {/* Animated glow on focus */}
              <div
                className={`
                  absolute -inset-1 bg-gradient-to-r from-white/30 via-white/20 to-white/30 rounded-lg blur-md -z-10
                  transition-opacity duration-300
                  ${isFocused ? 'opacity-100' : 'opacity-0'}
                `}
              />
            </div>
            <Button
              type="submit"
              isLoading={status === 'loading'}
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
