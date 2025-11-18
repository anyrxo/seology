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
    <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section - 5 Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Column - Takes 3 columns */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Seology.ai"
                width={120}
                height={32}
                className="h-8 w-auto dark:invert"
              />
            </Link>
            <p className="text-black/60 dark:text-white/60 mb-6 text-sm leading-relaxed">
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
                  className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/60 transition-all hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors inline-flex items-center group"
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
            <h4 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors inline-flex items-center group"
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
            <h4 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors inline-flex items-center group"
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
            <h4 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors inline-flex items-center group"
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
        <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-black/60 dark:text-white/60 text-center lg:text-left">
              &copy; {new Date().getFullYear()} SEOLOGY.AI. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
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
