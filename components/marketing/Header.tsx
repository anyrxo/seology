'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-4">
      <div className="w-full rounded-[18px] border border-slate-200/50 dark:border-slate-800/50 bg-background/95 dark:bg-background/95 p-1 backdrop-blur-sm supports-[backdrop-filter]:bg-background/70 dark:supports-[backdrop-filter]:bg-background/70 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Seology.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Features
                <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>

              {featuresOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2">
                  <Link href="/features/seo-analysis" className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    SEO Analysis
                  </Link>
                  <Link href="/features/automatic-fixes" className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Automatic Fixes
                  </Link>
                  <Link href="/features/platform-integrations" className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Platform Integrations
                  </Link>
                  <Link href="/features/performance-monitoring" className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Performance Monitoring
                  </Link>
                  <Link href="/features/content-optimization" className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Content Optimization
                  </Link>
                </div>
              )}
            </div>

            <a href="/#faq" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              FAQs
            </a>
            <a href="#testimonials" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              Testimonials
            </a>
            <Link href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              Blog
            </Link>
            <Link href="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              Pricing
            </Link>
          </nav>

          {/* Right Side - Theme Switcher & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
                Try SEOLOGY Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-600 dark:text-slate-300" />
            ) : (
              <Menu className="h-6 w-6 text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <nav className="flex flex-col gap-4">
              {/* Mobile Features Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                >
                  Features
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileFeaturesOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    <Link
                      href="/features/seo-analysis"
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      SEO Analysis
                    </Link>
                    <Link
                      href="/features/automatic-fixes"
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Automatic Fixes
                    </Link>
                    <Link
                      href="/features/platform-integrations"
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Platform Integrations
                    </Link>
                    <Link
                      href="/features/performance-monitoring"
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Performance Monitoring
                    </Link>
                    <Link
                      href="/features/content-optimization"
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Content Optimization
                    </Link>
                  </div>
                )}
              </div>

              <a
                href="/#faq"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <Link
                href="/blog"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/sign-up"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Theme</span>
                  <ThemeSwitcher />
                </div>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Try SEOLOGY Free
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
