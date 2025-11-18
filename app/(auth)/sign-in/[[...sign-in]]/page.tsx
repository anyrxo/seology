'use client'

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Lock, Zap, TrendingUp } from 'lucide-react'

export default function SignInPage() {
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
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60">
              Sign in to continue optimizing your SEO automatically
            </p>
          </motion.div>

          {/* Sign In Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-black/10 dark:border-white/10 mb-6"
          >
            <SignIn
              forceRedirectUrl="/dashboard"
              signUpUrl="/sign-up"
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
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">Privacy Protected</span>
              </div>
            </div>

            {/* Legal */}
            <p className="text-xs text-black/60 dark:text-white/60">
              By signing in, you agree to our{' '}
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

      {/* Right Side - Branding & Benefits (Desktop Only) */}
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
          <h2 className="text-5xl font-black mb-6">
            AI-Powered SEO Automation
          </h2>
          <p className="text-xl mb-12 text-white/90 dark:text-black/90">
            The first platform that actually fixes your SEO issues automatically, not just reports them.
          </p>

          {/* Benefits List */}
          <div className="space-y-6 mb-12">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Automatic Fixes',
                description: 'AI applies SEO fixes directly to your CMS'
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Verified Results',
                description: 'Track improvements with real-time metrics'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Enterprise Security',
                description: 'Bank-level encryption for all connections'
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: 'Proven Growth',
                description: 'Average 40% increase in organic traffic'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm flex items-center justify-center border border-white/20 dark:border-black/20">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{benefit.title}</h3>
                  <p className="text-white/80 dark:text-black/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-8 border-t border-white/20 dark:border-black/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 border-2 border-white/30 dark:border-black/30"></div>
                ))}
              </div>
              <span className="text-sm font-medium">+10,000 users</span>
            </div>
            <p className="text-lg mb-2 italic">
              "SEOLOGY.AI increased our organic traffic by 60% in just 3 months"
            </p>
            <p className="text-sm font-semibold">
              - Sarah Johnson, Marketing Director
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
