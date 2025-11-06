'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertCircle,
  X,
  ShoppingBag,
  FileText,
  Github,
  Zap,
  Lock,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react'

type Platform = 'SHOPIFY' | 'WORDPRESS' | 'GITHUB' | 'CUSTOM' | null

export default function ConnectSitePage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/dashboard/sites"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Sites
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Connect Your Website
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose your platform to start automating SEO fixes with AI-powered precision
            </p>
          </div>
        </motion.div>

        {/* Platform Selection */}
        {!selectedPlatform && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              <PlatformCard
                title="Shopify Store"
                description="One-click OAuth connection for Shopify stores"
                icon={ShoppingBag}
                iconColor="text-green-400"
                gradientFrom="from-green-600/20"
                gradientTo="to-green-800/10"
                features={[
                  'One-click OAuth connection',
                  'Auto-fix product SEO',
                  'Meta tags optimization',
                  'Image alt text updates',
                ]}
                onClick={() => setSelectedPlatform('SHOPIFY')}
                recommended
              />
              <PlatformCard
                title="WordPress Site"
                description="Secure REST API connection for WordPress"
                icon={FileText}
                iconColor="text-blue-400"
                gradientFrom="from-blue-600/20"
                gradientTo="to-blue-800/10"
                features={[
                  'REST API connection',
                  'No plugin required',
                  'Content SEO optimization',
                  'Schema markup fixes',
                ]}
                onClick={() => setSelectedPlatform('WORDPRESS')}
              />
              <PlatformCard
                title="GitHub Pages"
                description="Connect repositories and optimize static sites"
                icon={Github}
                iconColor="text-purple-400"
                gradientFrom="from-purple-600/20"
                gradientTo="to-purple-800/10"
                features={[
                  'OAuth integration',
                  'GitHub Pages support',
                  'Static site SEO',
                  'Automatic PR creation',
                ]}
                onClick={() => setSelectedPlatform('GITHUB')}
              />
              <PlatformCard
                title="Any Website"
                description="Universal JavaScript connector for any platform"
                icon={Zap}
                iconColor="text-yellow-400"
                gradientFrom="from-yellow-600/20"
                gradientTo="to-yellow-800/10"
                features={[
                  'Simple script integration',
                  'Works on any platform',
                  'Client-side fixes',
                  'No backend required',
                ]}
                onClick={() => setSelectedPlatform('CUSTOM')}
              />
            </motion.div>

            {/* How It Works Section */}
            <HowItWorksSection />

            {/* FAQ Section */}
            <FAQSection />
          </>
        )}

        {/* Shopify Connection Flow */}
        {selectedPlatform === 'SHOPIFY' && (
          <ShopifyConnectForm
            onBack={() => {
              setSelectedPlatform(null)
              setError(null)
            }}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
          />
        )}

        {/* WordPress Connection Flow */}
        {selectedPlatform === 'WORDPRESS' && (
          <WordPressConnectForm
            onBack={() => {
              setSelectedPlatform(null)
              setError(null)
            }}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
          />
        )}

        {/* GitHub Connection Flow */}
        {selectedPlatform === 'GITHUB' && (
          <GitHubConnectForm
            onBack={() => {
              setSelectedPlatform(null)
              setError(null)
            }}
          />
        )}

        {/* Custom Site Connection Flow */}
        {selectedPlatform === 'CUSTOM' && (
          <CustomSiteConnectForm
            onBack={() => {
              setSelectedPlatform(null)
              setError(null)
            }}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
          />
        )}
      </div>
    </div>
  )
}

interface PlatformCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  gradientFrom: string
  gradientTo: string
  features: string[]
  onClick: () => void
  recommended?: boolean
}

function PlatformCard({
  title,
  description,
  icon: Icon,
  iconColor,
  gradientFrom,
  gradientTo,
  features,
  onClick,
  recommended = false,
}: PlatformCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 rounded-2xl p-6 text-left transition-all group"
    >
      {recommended && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg"
        >
          Recommended
        </motion.div>
      )}

      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} mb-4 border border-gray-700/50`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center text-blue-400 group-hover:text-blue-300 font-semibold text-sm">
        Connect Now
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      icon: Lock,
      iconColor: 'text-blue-400',
      title: 'Secure Connection',
      description: 'Connect your site using secure OAuth or API credentials. We use industry-standard encryption.',
    },
    {
      icon: Sparkles,
      iconColor: 'text-purple-400',
      title: 'AI Analysis',
      description: 'Our Claude AI scans your site and identifies SEO issues automatically.',
    },
    {
      icon: Zap,
      iconColor: 'text-yellow-400',
      title: 'Automatic Fixes',
      description: 'Choose your execution mode and let AI fix issues automatically or with approval.',
    },
    {
      icon: Clock,
      iconColor: 'text-green-400',
      title: 'Real-time Results',
      description: 'Monitor improvements and track your SEO performance in real-time.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-16"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Connect your site in minutes and let AI handle the rest
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800/50 mb-4`}>
                <Icon className={`w-6 h-6 ${step.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use AES-256-GCM encryption for all credentials and follow industry-best security practices. Your data is encrypted at rest and in transit.',
    },
    {
      question: 'Can I disconnect my site anytime?',
      answer: 'Yes, you can disconnect any site from your dashboard at any time. All changes made can be reviewed and rolled back within 90 days.',
    },
    {
      question: 'What permissions do you need?',
      answer: 'We only request the minimum permissions needed to read content and make SEO fixes. For Shopify, that\'s products, content, and themes. For WordPress, REST API access. For GitHub, repository read/write access.',
    },
    {
      question: 'Will this affect my live site?',
      answer: 'You have full control. Choose between automatic fixes, plan-based approval, or manual approval for each fix. You can review changes before they go live.',
    },
    {
      question: 'How long does setup take?',
      answer: 'Most connections take less than 2 minutes. The AI will then scan your site, which typically takes 5-10 minutes depending on site size.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-16"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about connecting your site
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-white font-semibold">{faq.question}</span>
              </div>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pl-14">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-3">Still have questions?</p>
        <a
          href="mailto:support@seology.ai"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          <Shield className="w-4 h-4" />
          Contact our support team
        </a>
      </div>
    </motion.div>
  )
}

function ShopifyConnectForm({
  onBack,
  loading,
  setLoading,
  error,
  setError,
}: {
  onBack: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}) {
  const [shopDomain, setShopDomain] = useState('')

  const handleConnect = async () => {
    if (!shopDomain) {
      setError('Please enter your Shopify store domain')
      return
    }

    setError(null)
    setLoading(true)

    try {
      window.location.href = `/api/auth/shopify?shop=${shopDomain}`
    } catch (err) {
      console.error('Shopify connection error:', err)
      setError('Failed to connect to Shopify. Please try again.')
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Change Platform
        </button>

        <div className="flex items-start gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-600/20 to-green-800/10 border border-gray-700/50">
            <ShoppingBag className="w-8 h-8 text-green-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">Connect Shopify Store</h2>
            <p className="text-gray-400">
              We'll redirect you to Shopify for secure OAuth authorization
            </p>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-400 mb-1">Connection Error</h3>
              <p className="text-sm text-red-300">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Your Shopify Store Domain
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={shopDomain}
                onChange={(e) => setShopDomain(e.target.value.replace(/[^a-z0-9-]/gi, ''))}
                placeholder="your-store"
                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-l-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="bg-gray-800 border border-gray-700 border-l-0 rounded-r-xl px-4 py-3.5 text-gray-400 font-mono text-sm">
                .myshopify.com
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Example: my-awesome-store (without .myshopify.com)
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-blue-400" />
              What we'll access
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                Product titles and descriptions (to optimize SEO)
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                Meta tags and page titles
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                Image alt text attributes
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                Theme files (for meta tag updates)
              </li>
            </ul>
          </div>

          <button
            onClick={handleConnect}
            disabled={!shopDomain || loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg disabled:shadow-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              'Connect to Shopify'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function WordPressConnectForm({
  onBack,
  loading,
  setLoading,
  error,
  setError,
}: {
  onBack: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}) {
  const router = useRouter()
  const [siteUrl, setSiteUrl] = useState('')
  const [username, setUsername] = useState('')
  const [appPassword, setAppPassword] = useState('')

  const handleConnect = async () => {
    if (!siteUrl || !username || !appPassword) {
      setError('Please fill in all required fields')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'WORDPRESS',
          domain: siteUrl.replace(/^https?:\/\//, ''),
          displayName: siteUrl,
          credentials: {
            username,
            appPassword,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/dashboard/sites')
      } else {
        console.error('WordPress connection failed:', data)
        const errorMessage = data.error?.message || data.error || 'Failed to connect to WordPress. Please check your credentials and try again.'
        setError(errorMessage)
        setLoading(false)
      }
    } catch (err) {
      console.error('WordPress connection error:', err)
      setError('Connection failed. Please check your site URL and credentials.')
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Change Platform
        </button>

        <div className="flex items-start gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-gray-700/50">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">Connect WordPress Site</h2>
            <p className="text-gray-400">
              Connect via REST API with Application Password (no plugin required)
            </p>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-400 mb-1">Connection Error</h3>
              <p className="text-sm text-red-300">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              WordPress Site URL
            </label>
            <input
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://your-wordpress-site.com"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              WordPress Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Application Password
            </label>
            <input
              type="password"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
              placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">
              Generate this in WordPress: Users → Profile → Application Passwords
            </p>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-yellow-400" />
              How to create Application Password
            </h4>
            <ol className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-2 flex-shrink-0">1.</span>
                <span>Log in to WordPress admin panel</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-2 flex-shrink-0">2.</span>
                <span>Go to Users → Profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-2 flex-shrink-0">3.</span>
                <span>Scroll to "Application Passwords" section</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-2 flex-shrink-0">4.</span>
                <span>Enter "SEOLOGY.AI" as name and click "Add New"</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-2 flex-shrink-0">5.</span>
                <span>Copy the generated password and paste it above</span>
              </li>
            </ol>
          </div>

          <button
            onClick={handleConnect}
            disabled={!siteUrl || !username || !appPassword || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg disabled:shadow-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              'Connect WordPress Site'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function CustomSiteConnectForm({
  onBack,
  loading,
  setLoading,
  error,
  setError,
}: {
  onBack: () => void
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}) {
  const router = useRouter()
  const [siteUrl, setSiteUrl] = useState('')
  const [siteName, setSiteName] = useState('')

  const handleConnect = async () => {
    if (!siteUrl || !siteName) {
      setError('Please fill in all required fields')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: 'CUSTOM',
          domain: siteUrl.replace(/^https?:\/\//, ''),
          displayName: siteName,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/dashboard/sites/${data.data.id}`)
      } else {
        console.error('Custom site connection failed:', data)
        const errorMessage = data.error?.message || data.error || 'Failed to create site. Please try again.'
        setError(errorMessage)
        setLoading(false)
      }
    } catch (err) {
      console.error('Custom site connection error:', err)
      setError('Connection failed. Please check your site URL and try again.')
      setLoading(false)
    }
  }

  const snippetCode = `<!-- SEOLOGY.AI Magic Script -->
<script src="https://cdn.seology.ai/magic.js" data-site-id="YOUR_SITE_ID"></script>
<!-- End SEOLOGY.AI -->`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Change Platform
        </button>

        <div className="flex items-start gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-600/20 to-yellow-800/10 border border-gray-700/50">
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">Connect Any Website</h2>
            <p className="text-gray-400">
              Universal JavaScript connector for custom sites
            </p>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-400 mb-1">Connection Error</h3>
              <p className="text-sm text-red-300">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Site Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="My Awesome Website"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Website URL
            </label>
            <input
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3">Installation Instructions</h4>
            <p className="text-sm text-gray-400 mb-4">
              After connecting, you'll receive a unique script to add to your website's{' '}
              <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">&lt;head&gt;</code>{' '}
              tag:
            </p>
            <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
              {snippetCode}
            </pre>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
              How it works
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Our AI analyzes your site and detects SEO issues
              </li>
              <li className="flex items-start">
                <Zap className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Fixes are generated and served via JavaScript
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Changes apply instantly on the client-side
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Works with any website platform
              </li>
            </ul>
          </div>

          <button
            onClick={handleConnect}
            disabled={!siteUrl || !siteName || loading}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg disabled:shadow-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Site & Get Script'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function GitHubConnectForm({ onBack }: { onBack: () => void }) {
  const handleConnect = () => {
    window.location.href = '/api/auth/github'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Change Platform
        </button>

        <div className="flex items-start gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-gray-700/50">
            <Github className="w-8 h-8 text-purple-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">Connect GitHub Repository</h2>
            <p className="text-gray-400">
              Connect your GitHub account to analyze and optimize your static sites hosted on GitHub Pages
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3">What we'll access:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                Your public and private repositories
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                Repository metadata and settings
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                GitHub Pages configuration
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                Read/write access to repository content
              </li>
            </ul>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3">Perfect for:</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                GitHub Pages sites (username.github.io)
              </li>
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                Static site generators (Jekyll, Hugo, Next.js)
              </li>
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                Documentation sites
              </li>
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                Portfolio and project websites
              </li>
            </ul>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
              After connecting:
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Select your repository with a published website
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                We'll automatically detect your site URL
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                AI will analyze your site for SEO issues
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Fixes can be committed directly to your repo
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleConnect}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg"
        >
          Connect with GitHub
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          We use OAuth 2.0 for secure authentication. Your credentials are never stored.
        </p>
      </div>
    </motion.div>
  )
}
