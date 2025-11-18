'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Shield,
  Lock,
  CheckCircle,
} from 'lucide-react'

export function Footer() {

  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Platform Integrations', href: '/features#integrations' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partners', href: '/partners' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Status Page', href: 'https://status.seology.ai' },
      { label: 'Security', href: '/security' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
      { label: 'Acceptable Use', href: '/acceptable-use' },
    ],
  }

  const socialLinks = [
    {
      icon: Twitter,
      href: 'https://twitter.com/seologyai',
      label: 'Twitter',
      hoverColor: 'hover:text-blue-400'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/seologyai',
      label: 'LinkedIn',
      hoverColor: 'hover:text-blue-500'
    },
    {
      icon: Github,
      href: 'https://github.com/seologyai',
      label: 'GitHub',
      hoverColor: 'hover:text-gray-300'
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@seologyai',
      label: 'YouTube',
      hoverColor: 'hover:text-red-500'
    },
  ]

  const trustBadges = [
    {
      icon: Shield,
      text: 'SOC 2 Compliant',
    },
    {
      icon: Lock,
      text: 'GDPR Compliant',
    },
    {
      icon: CheckCircle,
      text: '256-bit Encryption',
    },
  ]

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section - 5 Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Column - Takes 3 columns */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-bold text-white">
                SEOLOGY<span className="text-blue-500">.AI</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              AI-Powered SEO Automation That Actually Fixes Issues
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 transition-all ${social.hoverColor} hover:border-gray-700 hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links - Takes 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center lg:text-left">
              &copy; {new Date().getFullYear()} SEOLOGY.AI. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  <badge.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
