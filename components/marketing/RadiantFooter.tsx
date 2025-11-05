'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Github, Twitter, Linkedin, Mail, Facebook, Instagram } from 'lucide-react'

/**
 * RadiantFooter Component
 * Based on Radiant UI Component Library footer with newsletter
 * Features:
 * - Newsletter signup section at top
 * - Multi-column link layout
 * - Social media icons
 * - Copyright and legal links
 * - Responsive grid layout
 */

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Roadmap', href: '/roadmap' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/docs/api' },
    { name: 'Guides', href: '/guides' },
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Support', href: '/support' },
    { name: 'Partners', href: '/partners' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/seologyai' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/seologyai' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/seologyai' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/seologyai' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/seologyai' },
]

export function RadiantFooter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Newsletter signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitMessage('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      setSubmitMessage('Oops! Something went wrong.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer>
      {/* Newsletter Section - Radiant UI Style */}
      <section className="rt-component-section rt-newsletter-blue-section">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            <div className="rt-footer-four-title-main text-center">
              <Mail className="w-8 h-8 text-[#3898ec] mx-auto mb-4" />
              <div className="rt-component-heading-two">
                Get the latest <span className="text-[#3898ec]">stories</span>
              </div>
              <div className="rt-component-heading-two">into your inbox</div>
            </div>

            {/* Newsletter Form */}
            <div className="rt-footer-newsletter">
              <div className="rt-form-block w-form">
                <form
                  id="newsletter-form"
                  onSubmit={handleNewsletterSubmit}
                  className="newsletter-form"
                >
                  <div className="rt-footer-newsletter-main">
                    <input
                      className="rt-footer-newsletter-input w-input"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="rt-footer-newsletter-line rt-mobile-display-off"></div>
                    <button
                      type="submit"
                      className="rt-footer-newsletter-button"
                      disabled={isSubmitting}
                    >
                      <div className="rt-footer-newsletter-button-text">
                        <div>
                          <svg width="11" height="10" viewBox="0 0 11 10" fill="currentColor">
                            <path d="M1 5L10 1L6 5L10 9L1 5Z" />
                          </svg>
                        </div>
                        <div className="rt-button-font">
                          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </div>
                      </div>
                    </button>
                  </div>
                </form>

                {submitMessage && (
                  <div className={`mt-4 text-center rt-button-font ${submitMessage.includes('Thank') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-[#150438] text-white">
        <div className="w-layout-blockcontainer rt-component-container w-container py-16">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-bold text-xl mb-4">SEOLOGY.AI</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                AI-powered SEO automation that actually fixes your issues, not just reports them.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#3898ec] transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-lg">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-lg">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-lg">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-lg">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} SEOLOGY.AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
                >
                  Terms
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
