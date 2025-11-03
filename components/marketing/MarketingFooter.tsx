'use client'

import Link from 'next/link'
import { NewsletterSignup } from './NewsletterSignup'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Documentation', href: '/docs' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: 'mailto:support@seology.ai' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/seologyai' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/seologyai' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/seologyai' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@seology.ai' },
]

export default function MarketingFooter() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Signup */}
        <div className="mb-16">
          <NewsletterSignup />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all duration-300"
                  aria-label={social.name}
                >
                  <div className="relative z-10 text-gray-400 transition-all duration-300 group-hover:text-white group-hover:scale-110">
                    <social.icon size={20} />
                  </div>
                  <div className="absolute inset-0 bg-white/10 rounded-full scale-0 transition-transform duration-300 group-hover:scale-150 opacity-0 group-hover:opacity-100 blur-md" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative inline-block text-gray-400 hover:text-white text-sm transition-all duration-300"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative inline-block text-gray-400 hover:text-white text-sm transition-all duration-300"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative inline-block text-gray-400 hover:text-white text-sm transition-all duration-300"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
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
              &copy; 2025 SEOLOGY.AI. All rights reserved. Powered by Claude AI.
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
    </footer>
  )
}
