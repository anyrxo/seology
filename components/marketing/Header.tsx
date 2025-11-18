'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-4">
      <div className="w-full rounded-[18px] border border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/70 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
          {/* Left Side - Mobile: Theme Switcher, Desktop: Logo */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher - Mobile only, LEFT side */}
            <div className="md:hidden">
              <ThemeSwitcher />
            </div>

            {/* Logo - Desktop only */}
            <Link href="/" className="hidden md:flex items-center gap-2 group">
              <Image
                src="/images/logo.png"
                alt="Seology.ai"
                width={120}
                height={32}
                className="h-8 lg:h-10 w-auto dark:invert"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button className="flex items-center gap-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium">
                Features
                <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>

              {featuresOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-black rounded-lg shadow-lg border border-black/10 dark:border-white/10 py-2">
                  <Link href="/features/seo-analysis" className="block px-4 py-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                    SEO Analysis
                  </Link>
                  <Link href="/features/automatic-fixes" className="block px-4 py-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                    Automatic Fixes
                  </Link>
                  <Link href="/features/platform-integrations" className="block px-4 py-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                    Platform Integrations
                  </Link>
                  <Link href="/features/performance-monitoring" className="block px-4 py-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                    Performance Monitoring
                  </Link>
                  <Link href="/features/content-optimization" className="block px-4 py-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                    Content Optimization
                  </Link>
                </div>
              )}
            </div>

            <a href="/#faq" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium">
              FAQs
            </a>
            <a href="#testimonials" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium">
              Testimonials
            </a>
            <Link href="/blog" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium">
              Blog
            </Link>
            <Link href="/pricing" className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium">
              Pricing
            </Link>
          </nav>

          {/* Right Side - Mobile: Hamburger Menu, Desktop: Theme Switcher & CTA */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher - Desktop only */}
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            
            {/* Desktop CTA Button - Only one button */}
            <Link href="/sign-up" className="hidden md:block">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 py-2.5 rounded-lg">
                Try SEOLOGY Free
              </Button>
            </Link>

            {/* Hamburger Menu - Mobile only, RIGHT side */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-black/60 dark:text-white/60" />
              ) : (
                <Menu className="h-6 w-6 text-black/60 dark:text-white/60" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t border-black/10 dark:border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col gap-4 px-4">
              {/* Mobile Features Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium py-2"
                  onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                >
                  Features
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileFeaturesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 ml-4 flex flex-col gap-2 overflow-hidden"
                  >
                    <Link
                      href="/features/seo-analysis"
                      className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      SEO Analysis
                    </Link>
                    <Link
                      href="/features/automatic-fixes"
                      className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Automatic Fixes
                    </Link>
                    <Link
                      href="/features/platform-integrations"
                      className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Platform Integrations
                    </Link>
                    <Link
                      href="/features/performance-monitoring"
                      className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Performance Monitoring
                    </Link>
                    <Link
                      href="/features/content-optimization"
                      className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Content Optimization
                    </Link>
                  </motion.div>
                )}
              </div>

              <a
                href="/#faq"
                className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </a>
              <a
                href="#testimonials"
                className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <Link
                href="/blog"
                className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/pricing"
                className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-4 border-t border-black/10 dark:border-white/10">
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90">
                    Try SEOLOGY Free
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
        </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
