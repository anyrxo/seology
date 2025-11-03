'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  navLinks: Array<{
    label: string
    href: string
  }>
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-gray-900 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <span className="text-xl font-bold text-white">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 space-y-3">
          <Link href="/sign-in" className="block" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up" className="block" onClick={() => setIsOpen(false)}>
            <Button variant="primary" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
