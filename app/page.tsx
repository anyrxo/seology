import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            SEO Automation That
            <br />
            <span className="text-green-600">Actually Fixes</span>
            <br />
            Your Website
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            We don't tell you what's wrong with your SEO. We fix it.
            Claude AI + automation + universal CMS connectors.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">Sites Automated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">50K+</div>
              <div className="text-sm text-gray-600">Fixes Applied</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">AI Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold mb-16">
            How Seology Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Connect Your Site</h3>
              <p className="text-gray-600">
                Shopify, WordPress, or any platform. One-click OAuth or JavaScript snippet.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Analyzes</h3>
              <p className="text-gray-600">
                Claude AI scans your site for technical SEO issues, missing meta tags, broken links.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Fixes Applied</h3>
              <p className="text-gray-600">
                We log into your CMS and make permanent changes. Automatic, Plan, or Approve mode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Fix Your SEO?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your free trial. No credit card required.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
