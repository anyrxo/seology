'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlassNavProps {
  children: React.ReactNode
  className?: string
  variant?: 'fixed' | 'sticky' | 'static'
  blurOnScroll?: boolean
}

export function GlassNav({
  children,
  className = '',
  variant = 'fixed',
  blurOnScroll = true,
}: GlassNavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!blurOnScroll) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [blurOnScroll])

  const positions = {
    fixed: 'fixed top-0 left-0 right-0',
    sticky: 'sticky top-0',
    static: 'relative',
  }

  return (
    <nav
      className={cn(
        positions[variant],
        'z-40',
        'transition-all duration-300',
        scrolled
          ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-glow'
          : 'bg-transparent',
        className
      )}
    >
      {/* Glass reflection effect */}
      {scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </nav>
  )
}

interface NavContainerProps {
  children: React.ReactNode
  className?: string
}

export function NavContainer({ children, className = '' }: NavContainerProps) {
  return (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      <div className="h-16 flex items-center justify-between">{children}</div>
    </div>
  )
}

interface NavLogoProps {
  children: React.ReactNode
  href?: string
  className?: string
}

export function NavLogo({ children, href = '/', className = '' }: NavLogoProps) {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-2',
        'text-white font-bold text-xl',
        'hover:opacity-80 transition-opacity',
        className
      )}
    >
      {children}
    </a>
  )
}

interface NavLinksProps {
  children: React.ReactNode
  className?: string
}

export function NavLinks({ children, className = '' }: NavLinksProps) {
  return (
    <div className={cn('hidden md:flex items-center gap-8', className)}>
      {children}
    </div>
  )
}

interface NavLinkProps {
  children: React.ReactNode
  href: string
  active?: boolean
  className?: string
}

export function NavLink({
  children,
  href,
  active = false,
  className = '',
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'text-sm font-medium',
        'transition-colors duration-200',
        active
          ? 'text-white'
          : 'text-white/70 hover:text-white',
        className
      )}
    >
      {children}
    </a>
  )
}

interface NavActionsProps {
  children: React.ReactNode
  className?: string
}

export function NavActions({ children, className = '' }: NavActionsProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>{children}</div>
  )
}

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function MobileMenuButton({
  isOpen,
  onClick,
  className = '',
}: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'md:hidden',
        'p-2',
        'text-white/70 hover:text-white',
        'transition-colors',
        className
      )}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  children: React.ReactNode
  className?: string
}

export function MobileMenu({
  isOpen,
  children,
  className = '',
}: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        'md:hidden',
        'absolute top-full left-0 right-0',
        'bg-black/90 backdrop-blur-2xl',
        'border-b border-white/10',
        'shadow-2xl',
        className
      )}
    >
      <div className="px-4 py-6 space-y-4">{children}</div>
    </div>
  )
}

interface MobileMenuLinkProps {
  children: React.ReactNode
  href: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function MobileMenuLink({
  children,
  href,
  active = false,
  onClick,
  className = '',
}: MobileMenuLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'block px-4 py-3',
        'text-base font-medium',
        'rounded-lg',
        'transition-all duration-200',
        active
          ? 'bg-white/10 text-white'
          : 'text-white/70 hover:text-white hover:bg-white/5',
        className
      )}
    >
      {children}
    </a>
  )
}
