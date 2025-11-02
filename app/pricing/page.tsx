import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PricingPage() {
  const session = await auth()

  // If user is logged in, redirect to billing page
  if (session.userId) {
    redirect('/dashboard/billing')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              SEOLOGY.AI
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
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

      {/* Pricing Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Choose the plan that fits your needs. All plans include Claude AI-powered SEO fixes.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <PricingCard
            name="Starter"
            price={29}
            description="Perfect for small businesses and personal projects"
            features={[
              'Up to 3 sites',
              '500 SEO fixes per month',
              'Shopify & WordPress integration',
              'Claude AI analysis',
              'Email support',
              '90-day rollback',
              'Basic analytics',
            ]}
            cta="Start Free Trial"
            ctaHref="/sign-up"
            popular={false}
          />

          {/* Growth Plan */}
          <PricingCard
            name="Growth"
            price={99}
            description="For growing businesses with multiple websites"
            features={[
              'Up to 10 sites',
              '5,000 SEO fixes per month',
              'All Starter features',
              'Priority support',
              'Advanced analytics',
              'Custom fix rules',
              'API access',
              'Team collaboration',
            ]}
            cta="Start Free Trial"
            ctaHref="/sign-up"
            popular={true}
          />

          {/* Scale Plan */}
          <PricingCard
            name="Scale"
            price={299}
            description="Enterprise-grade SEO automation"
            features={[
              'Unlimited sites',
              'Unlimited SEO fixes',
              'All Growth features',
              'Dedicated account manager',
              'White-label options',
              'SLA guarantee',
              'Custom integrations',
              'Phone support',
            ]}
            cta="Contact Sales"
            ctaHref="/sign-up"
            popular={false}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FAQItem
              question="What counts as a 'fix'?"
              answer="A fix is any SEO change applied to your website, such as adding meta descriptions, fixing alt text, correcting broken links, or optimizing headings. Each change counts as one fix."
            />
            <FAQItem
              question="Can I upgrade or downgrade my plan?"
              answer="Yes! You can upgrade or downgrade at any time. Changes take effect immediately and we'll prorate the difference."
            />
            <FAQItem
              question="What happens if I exceed my monthly fix limit?"
              answer="We'll notify you when you're approaching your limit. Additional fixes beyond your plan limit won't be applied automatically until the next month or until you upgrade."
            />
            <FAQItem
              question="Is there a free trial?"
              answer="Yes! All new accounts start with a free trial that includes 500 fixes. No credit card required."
            />
            <FAQItem
              question="Can I roll back changes?"
              answer="Absolutely. Every fix can be rolled back for 90 days. We store the before and after state of every change for complete peace of mind."
            />
            <FAQItem
              question="Which platforms do you support?"
              answer="Currently we support Shopify (via OAuth), WordPress (via REST API), and custom websites (via Magic.js snippet). More platforms coming soon!"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your SEO?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <Link
            href="/sign-up"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block"
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

function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  ctaHref,
  popular,
}: {
  name: string
  price: number
  description: string
  features: string[]
  cta: string
  ctaHref: string
  popular: boolean
}) {
  return (
    <div
      className={`relative bg-gray-900 border-2 rounded-lg p-8 ${
        popular ? 'border-blue-500' : 'border-gray-800'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-400 mb-6">{description}</p>

      <div className="mb-6">
        <span className="text-5xl font-bold text-white">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>

      <Link
        href={ctaHref}
        className={`block text-center py-3 rounded-lg font-semibold transition-colors mb-6 ${
          popular
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
        }`}
      >
        {cta}
      </Link>

      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start text-gray-300">
            <span className="text-blue-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  )
}
