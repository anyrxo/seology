'use client'

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Lock, Zap, CheckCircle2 } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-black">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black text-black dark:text-white">
                Seology.ai
              </span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white mb-3">
              Start Fixing SEO Issues Automatically
            </h1>
            <p className="text-base sm:text-lg text-black/60 dark:text-white/60">
              Join thousands of businesses using AI-powered SEO automation
            </p>
          </motion.div>

          {/* Value Proposition Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-6 px-2"
          >
            <div className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full">
              <span className="text-xs sm:text-sm font-semibold text-black dark:text-white">Free 14-day trial</span>
            </div>
            <div className="px-3 sm:px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full">
              <span className="text-xs sm:text-sm font-semibold text-black dark:text-white">No credit card required</span>
            </div>
            <div className="px-3 sm:px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full">
              <span className="text-xs sm:text-sm font-semibold text-black dark:text-white">Cancel anytime</span>
            </div>
          </motion.div>

          {/* Sign Up Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-[18px] p-6 sm:p-8 shadow-xl border border-black/10 dark:border-white/10 mb-6"
          >
            <SignUp
              forceRedirectUrl="/dashboard/onboarding"
              signInUrl="/sign-in"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border-0 bg-transparent p-0',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  formButtonPrimary: 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-lg font-semibold py-3 px-4 transition-all duration-300 shadow-lg hover:shadow-xl',
                  formFieldLabel: 'text-sm font-medium text-black dark:text-white mb-2',
                  formFieldInput: 'w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all',
                  footerActionLink: 'text-black dark:text-white hover:text-black/60 dark:hover:text-white/60 text-sm font-medium transition-colors',
                  socialButtonsBlockButton: 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg font-medium py-3 px-4 transition-all duration-300 mb-3',
                  dividerLine: 'bg-black/10 dark:bg-white/10',
                  dividerText: 'text-sm text-black/60 dark:text-white/60',
                  formFieldLabelRow: 'mb-2',
                  footer: 'mt-6 text-center',
                },
              }}
            />
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-black/60 dark:text-white/60"
              >
                <Shield className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">SSL Encrypted</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-black/60 dark:text-white/60"
              >
                <Lock className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">GDPR Compliant</span>
              </motion.div>
            </div>

            {/* Legal */}
            <p className="text-xs text-black/60 dark:text-white/60">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-black dark:text-white hover:underline font-medium">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-black dark:text-white hover:underline font-medium">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Social Proof & Features (Desktop Only) */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-8 relative overflow-hidden bg-black dark:bg-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg text-white dark:text-black"
        >
          <div className="mb-12">
            <h2 className="text-5xl font-black mb-4">
              The Future of SEO is Automated
            </h2>
            <p className="text-xl text-white/90 dark:text-black/90">
              Stop spending hours on manual SEO fixes. Let AI do the heavy lifting while you focus on growing your business.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-6 mb-12">
            {[
              {
                number: '01',
                title: 'Connect Your Site',
                description: 'Works with Shopify, WordPress, or any custom site'
              },
              {
                number: '02',
                title: 'AI Analyzes Everything',
                description: 'Our AI scans your site for SEO opportunities'
              },
              {
                number: '03',
                title: 'Automatic Fixes Applied',
                description: 'Watch as fixes are deployed directly to your CMS'
              },
              {
                number: '04',
                title: 'Track Your Growth',
                description: 'Real-time metrics show your SEO improvements'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm flex items-center justify-center border border-white/20 dark:border-black/20">
                    <span className="text-lg font-black">{step.number}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-white/80 dark:text-black/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-8 border-t border-white/20 dark:border-black/20"
          >
            <div className="mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <CheckCircle2 key={star} className="w-5 h-5 fill-white dark:fill-black text-white dark:text-black" />
                ))}
              </div>
            </div>
            <p className="text-lg mb-4 italic">
              "We saw a 60% increase in organic traffic within 3 months. SEOLOGY.AI handles everything automatically - it's incredible."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 border-2 border-white/30 dark:border-black/30"></div>
              <div>
                <p className="text-sm font-bold">Alexandra Chen</p>
                <p className="text-sm text-white/80 dark:text-black/80">CEO, TechStart Inc.</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20 dark:border-black/20"
          >
            <div>
              <div className="text-4xl font-black mb-1">10K+</div>
              <div className="text-sm text-white/80 dark:text-black/80">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">2M+</div>
              <div className="text-sm text-white/80 dark:text-black/80">Fixes Applied</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">40%</div>
              <div className="text-sm text-white/80 dark:text-black/80">Avg. Traffic Increase</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
