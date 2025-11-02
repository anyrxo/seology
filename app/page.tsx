import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function HomePage() {
  const session = await auth()

  // If user is logged in, redirect to dashboard
  if (session.userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">SEOLOGY.AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/sign-in"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            AI That <span className="text-blue-500">Fixes</span> Your SEO,
            <br />
            Not Just Reports It
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            The world's first automated SEO platform that actually logs into your CMS
            and makes permanent fixes. Powered by Claude AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
            >
              View Pricing
            </Link>
          </div>
          <p className="text-gray-500 mt-4">No credit card required • 500 fixes/month free</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔌</div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                1. Connect Your Site
              </h3>
              <p className="text-gray-400">
                Link your Shopify store, WordPress site, or any website in seconds
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                2. AI Analyzes Everything
              </h3>
              <p className="text-gray-400">
                Claude AI scans your site for SEO issues and generates fixes
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                3. Fixes Applied Automatically
              </h3>
              <p className="text-gray-400">
                Watch as SEO issues get fixed in your CMS—no manual work required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose SEOLOGY.AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon="🚀"
              title="Automatic SEO Fixes"
              description="Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically."
            />
            <FeatureCard
              icon="🔐"
              title="Secure CMS Integration"
              description="OAuth authentication for Shopify. Encrypted credentials for WordPress. Your data stays safe."
            />
            <FeatureCard
              icon="📊"
              title="Real-Time Analytics"
              description="Track your SEO improvements with detailed analytics and performance metrics."
            />
            <FeatureCard
              icon="🔄"
              title="90-Day Rollback"
              description="Every fix can be rolled back for 90 days. Complete peace of mind."
            />
            <FeatureCard
              icon="⚡"
              title="Three Execution Modes"
              description="Choose automatic, plan review, or manual approval—whatever fits your workflow."
            />
            <FeatureCard
              icon="🎯"
              title="Claude AI Powered"
              description="Leveraging Anthropic's most advanced AI model for intelligent SEO decisions."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your SEO?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically
          </p>
          <Link
            href="/sign-up"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
          >
            Start Free Trial →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2025 SEOLOGY.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
