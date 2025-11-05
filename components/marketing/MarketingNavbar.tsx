'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Zap, Shield, BarChart3, RotateCcw, ShoppingCart, Code, Globe, Users, FileText, Book, HeadphonesIcon, Newspaper } from 'lucide-react'
import { useAnnouncement } from './AnnouncementContext'

interface DropdownItem {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

interface MegaMenuColumn {
  title: string
  items: DropdownItem[]
}

export default function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)
  const { height: announcementHeight } = useAnnouncement()

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

  const navbarTop = announcementHeight
  const mobileMenuTop = announcementHeight + 64 // navbar height (h-16 = 64px)

  // Features mega menu data
  const featuresMegaMenu: MegaMenuColumn[] = [
    {
      title: 'Core Features',
      items: [
        {
          title: 'Automatic Fixes',
          description: 'AI-powered SEO fixes applied automatically',
          href: '/features#automatic-fixes',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Secure Integration',
          description: 'Enterprise-grade security for your CMS',
          href: '/features#security',
          icon: <Shield className="w-5 h-5" />
        },
        {
          title: 'Real-time Analytics',
          description: 'Track your SEO improvements live',
          href: '/features#analytics',
          icon: <BarChart3 className="w-5 h-5" />
        },
        {
          title: '90-Day Rollback',
          description: 'Undo any changes with one click',
          href: '/features#rollback',
          icon: <RotateCcw className="w-5 h-5" />
        }
      ]
    },
    {
      title: 'Integrations',
      items: [
        {
          title: 'Shopify',
          description: 'Seamless Shopify store integration',
          href: '/integrations/shopify',
          icon: <ShoppingCart className="w-5 h-5" />
        },
        {
          title: 'WordPress',
          description: 'Connect your WordPress site',
          href: '/integrations/wordpress',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Magic.js',
          description: 'Universal JavaScript connector',
          href: '/integrations/magic',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Custom CMS',
          description: 'API integration for any platform',
          href: '/integrations/custom',
          icon: <Globe className="w-5 h-5" />
        }
      ]
    },
    {
      title: 'Use Cases',
      items: [
        {
          title: 'E-commerce',
          description: 'Optimize product pages & categories',
          href: '/use-cases/ecommerce',
          icon: <ShoppingCart className="w-5 h-5" />
        },
        {
          title: 'Blogs',
          description: 'Improve content discoverability',
          href: '/use-cases/blogs',
          icon: <FileText className="w-5 h-5" />
        },
        {
          title: 'SaaS',
          description: 'Boost your SaaS visibility',
          href: '/use-cases/saas',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'Agencies',
          description: 'Manage multiple client sites',
          href: '/use-cases/agencies',
          icon: <Users className="w-5 h-5" />
        }
      ]
    },
    {
      title: 'Resources',
      items: [
        {
          title: 'Documentation',
          description: 'Complete setup & usage guides',
          href: '/docs',
          icon: <Book className="w-5 h-5" />
        },
        {
          title: 'API Reference',
          description: 'Developer API documentation',
          href: '/docs/api',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Support',
          description: 'Get help from our team',
          href: '/support',
          icon: <HeadphonesIcon className="w-5 h-5" />
        },
        {
          title: 'Blog',
          description: 'SEO tips & product updates',
          href: '/blog',
          icon: <Newspaper className="w-5 h-5" />
        }
      ]
    }
  ]

  // About dropdown data
  const aboutDropdown: DropdownItem[] = [
    {
      title: 'Team',
      description: 'Meet the people behind SEOLOGY.AI',
      href: '/about/team',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Careers',
      description: 'Join our growing team',
      href: '/careers',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Contact',
      description: 'Get in touch with us',
      href: '/about/contact',
      icon: <HeadphonesIcon className="w-5 h-5" />
    }
  ]

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <>
      {/* Desktop Radiant UI Navigation */}
      <nav
        style={{ top: `${navbarTop}px` }}
        className={`hidden lg:block fixed left-0 right-0 z-40 transition-all duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } rt-nav-one ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg'
            : 'bg-white shadow-md'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="rt-nav-one-container w-layout-blockcontainer">
          <div className="rt-nav-one-wrap w-layout-hflex">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-[#150438]">SEOLOGY.AI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center">
              {/* Features Mega Menu Dropdown */}
              <div
                className="rt-nav-one-dropdown w-dropdown"
                onMouseEnter={() => handleMouseEnter('features')}
              >
                <div className="rt-nav-one-dropdown-toggle w-dropdown-toggle cursor-pointer">
                  <div className="rt-text-icon-wrap w-layout-hflex">
                    <div className="rt-nav-text">Features</div>
                    <ChevronDown className="rt-nav-one-arrow w-4 h-4" />
                  </div>
                </div>
                <nav
                  className={`rt-nav-one-dropdown-list w-dropdown-list ${activeDropdown === 'features' ? 'w--open' : ''}`}
                >
                  <div className="rt-nav-one-dropdown-list-wrap rt-utility-pages w-layout-vflex">
                    <div className="rt-nav-one-dropdown-upper-wrap">
                      {featuresMegaMenu.map((column, idx) => (
                        <div
                          key={column.title}
                          className={`rt-nav-top-wrap-contain w-layout-vflex ${idx === featuresMegaMenu.length - 1 ? 'rt-border-off' : ''}`}
                        >
                          <div className="rt-component-heading-two mb-4 text-lg font-semibold">
                            {column.title}
                          </div>
                          {column.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="rt-nav-top-link-wrap w-inline-block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="rt-text-icon-wrap rt-icon-gap w-layout-hflex">
                                <div className="rt-icon-box">
                                  <div className="rt-black-icon text-[#150438]">{item.icon}</div>
                                  <div className="rt-blue-icon" style={{ color: '#3898ec' }}>
                                    {item.icon}
                                  </div>
                                </div>
                                <div>
                                  <div className="rt-nav-text font-semibold">{item.title}</div>
                                  <div className="text-sm text-[#6d6d6d]">{item.description}</div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>

              {/* Pricing Link */}
              <Link
                href="/pricing"
                className="rt-nav-one-dropdown-toggle"
              >
                <div className="rt-nav-text">Pricing</div>
              </Link>

              {/* About Dropdown */}
              <div
                className="rt-nav-one-dropdown w-dropdown"
                onMouseEnter={() => handleMouseEnter('about')}
              >
                <div className="rt-nav-one-dropdown-toggle w-dropdown-toggle cursor-pointer">
                  <div className="rt-text-icon-wrap w-layout-hflex">
                    <div className="rt-nav-text">About</div>
                    <ChevronDown className="rt-nav-one-arrow w-4 h-4" />
                  </div>
                </div>
                <nav
                  className={`rt-nav-one-dropdown-list w-dropdown-list ${activeDropdown === 'about' ? 'w--open' : ''}`}
                >
                  <div className="rt-nav-one-dropdown-list-wrap w-layout-vflex" style={{ maxWidth: '360px' }}>
                    <div className="rt-nav-top-wrap-contain w-layout-vflex rt-border-off">
                      {aboutDropdown.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="rt-nav-top-link-wrap w-inline-block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="rt-text-icon-wrap rt-icon-gap w-layout-hflex">
                            <div className="rt-icon-box">
                              <div className="rt-black-icon text-[#150438]">{item.icon}</div>
                              <div className="rt-blue-icon" style={{ color: '#3898ec' }}>
                                {item.icon}
                              </div>
                            </div>
                            <div>
                              <div className="rt-nav-text font-semibold">{item.title}</div>
                              <div className="text-sm text-[#6d6d6d]">{item.description}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>

              {/* Docs Link */}
              <Link
                href="/docs"
                className="rt-nav-one-dropdown-toggle"
              >
                <div className="rt-nav-text">Docs</div>
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4 ml-auto">
              <Link
                href="/sign-in"
                className="rt-button-font text-[#150438] hover:text-[#3898ec] transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center h-10 bg-[#3898ec] text-white px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-[#2d7ac7] hover:scale-105 hover:shadow-lg"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>

        {/* Add dropdown visibility styles */}
        <style jsx>{`
          .w-dropdown-list {
            display: none;
          }
          .w-dropdown-list.w--open {
            display: flex;
          }
          .rt-icon-box:hover .rt-black-icon {
            opacity: 0;
          }
          .rt-icon-box:hover .rt-blue-icon {
            opacity: 1;
          }
          .rt-blue-icon {
            position: absolute;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .rt-black-icon {
            transition: opacity 0.3s ease;
          }
        `}</style>
      </nav>

      {/* Mobile Navigation - Original style maintained */}
      <nav
        style={{ top: `${navbarTop}px` }}
        className={`lg:hidden fixed left-0 right-0 z-40 transition-all duration-300 ${
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

            {/* Mobile menu button */}
            <button
              className="text-white transition-transform duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          style={{ top: `${mobileMenuTop}px`, height: `calc(100vh - ${mobileMenuTop}px)` }}
          className={`md:hidden fixed right-0 w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-300 ease-out z-50 ${
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
                className="flex items-center justify-center h-12 bg-white text-black px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-white/90 hover:scale-105"
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
            style={{ top: `${mobileMenuTop}px` }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-30"
            onClick={() => setMobileMenuOpen(false)}
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
              transform: translateX(0);
            }
          }
        `}</style>
      </nav>
    </>
  )
}
