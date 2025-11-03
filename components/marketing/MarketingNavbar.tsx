'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Update background opacity based on scroll
      setScrolled(currentScrollY > 10)

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
          >
            <span className="text-2xl font-bold text-white">SEOLOGY.AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Pricing', 'About', 'Docs'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative text-white/70 hover:text-white transition-colors duration-300 group py-2"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="relative text-white/70 hover:text-white transition-colors duration-300 group py-2"
            >
              Sign In
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/sign-up"
              className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white transition-transform duration-300 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-sm bg-black border-l border-white/10 transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-8 space-y-6 h-full overflow-y-auto">
          {/* Navigation Links */}
          <div className="space-y-4">
            {['Features', 'Pricing', 'About', 'Docs'].map((item, index) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-white/70 hover:text-white transition-all duration-300 py-3 text-lg hover:translate-x-2"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  animation: mobileMenuOpen
                    ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                    : 'none',
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Auth Links */}
          <div className="space-y-4">
            <Link
              href="/sign-in"
              className="block text-white/70 hover:text-white transition-all duration-300 py-3 text-lg hover:translate-x-2"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                animation: mobileMenuOpen ? 'slideIn 0.3s ease-out 0.4s both' : 'none',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="block bg-white text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/90 text-center hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                animation: mobileMenuOpen ? 'slideIn 0.3s ease-out 0.5s both' : 'none',
              }}
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  )
}
