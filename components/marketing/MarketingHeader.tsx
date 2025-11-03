'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth, UserButton } from '@clerk/nextjs'
import { Menu, X, ChevronDown } from 'lucide-react'

export function MarketingHeader() {
  const pathname = usePathname()
  const { isSignedIn } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <header className="header-wrapper">
      <div className="w-layout-blockcontainer container w-container">
        <div className="header-content-wrapper">
          {/* Logo */}
          <Link href="/" className="header-logo-link flex-horizontal">
            <div className="text-300 bold color-neutral-800">SEOLOGY.AI</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav-menu-wrapper hidden lg:flex">
            <div className="header-nav-menu-list">
              <Link
                href="/features"
                className={`header-nav-link ${isActive('/features') ? 'w--current' : ''}`}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className={`header-nav-link ${isActive('/pricing') ? 'w--current' : ''}`}
              >
                Pricing
              </Link>

              {/* Resources Dropdown */}
              <div
                className="header-nav-list-item"
                onMouseEnter={() => setResourcesDropdownOpen(true)}
                onMouseLeave={() => setResourcesDropdownOpen(false)}
              >
                <button className="header-nav-link dropdown-header-link">
                  Resources
                  <ChevronDown className="h-4 w-4 mg-left-8px" />
                </button>

                {resourcesDropdownOpen && (
                  <div className="card header-dropdown-card" style={{ position: 'absolute', top: '100%', marginTop: '8px', minWidth: '400px', zIndex: 1000 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                      <div>
                        <div className="text-100 dropdown-column-title">Learn</div>
                        <div className="grid-1-column gap-row-12px">
                          <Link href="/docs" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            Documentation
                          </Link>
                          <Link href="/guides" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            Guides & Tutorials
                          </Link>
                          <Link href="/blog" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            Blog
                          </Link>
                          <Link href="/api" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            API Reference
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="text-100 dropdown-column-title">Support</div>
                        <div className="grid-1-column gap-row-12px">
                          <Link href="/help" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            Help Center
                          </Link>
                          <Link href="/contact" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            Contact Us
                          </Link>
                          <Link href="/changelog" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            Changelog
                          </Link>
                          <Link href="/status" className="text-100 medium color-neutral-600 hover:color-accent-1" style={{ textDecoration: 'none' }}>
                            System Status
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`header-nav-link ${isActive('/about') ? 'w--current' : ''}`}
              >
                About
              </Link>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="header-right-side-container">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="btn-secondary medium hidden sm:inline-flex">
                  Dashboard
                </Link>
                <div className="avatar-circle _40px">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="header-nav-link hidden sm:inline-flex">
                  Sign In
                </Link>
                <Link href="/sign-up" className="btn-primary medium">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex-horizontal card-icon-square _40px neutral-icon"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--neutral--300)' }}>
            <div className="grid-1-column gap-row-12px">
              <Link
                href="/features"
                onClick={() => setMobileMenuOpen(false)}
                className={`header-nav-link ${isActive('/features') ? 'w--current' : ''}`}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={`header-nav-link ${isActive('/pricing') ? 'w--current' : ''}`}
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="header-nav-link"
              >
                Documentation
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="header-nav-link"
              >
                Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`header-nav-link ${isActive('/about') ? 'w--current' : ''}`}
              >
                About
              </Link>

              {!isSignedIn && (
                <>
                  <div className="divider" style={{ margin: '12px 0' }}></div>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary medium"
                  >
                    Get Started
                  </Link>
                </>
              )}

              {isSignedIn && (
                <>
                  <div className="divider" style={{ margin: '12px 0' }}></div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary medium"
                  >
                    Go to Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
