'use client'

import Link from 'next/link'
import {
  Check,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  RotateCcw,
  Target,
  Sparkles,
  Cpu,
  Globe,
} from 'lucide-react'

export default function LandingPageContent() {
  return (
    <div className="bg-neutral-200">
      {/* Hero Section */}
      <section className="container-default w-container">
        <div className="grid-1-column gap-row-64px mg-bottom-80px mg-top-80px">
          {/* Hero Content */}
          <div className="inner-container _720px center">
            <div className="text-center">
              {/* Badge */}
              <div className="mg-bottom-24px">
                <div className="primary-badge light">
                  <div className="flex-horizontal gap-column-6px align-center">
                    <Sparkles className="w-4 h-4" />
                    <span>Powered by Claude 3.5 Sonnet AI</span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-600 bold color-neutral-800 mg-bottom-24px">
                Stop Reporting SEO Issues.
                <br />
                <span className="color-accent-1">Start Fixing</span> Them Automatically.
              </h1>

              {/* Subtitle */}
              <p className="text-300 color-neutral-600 mg-bottom-32px">
                The world's first AI-powered platform that doesn't just find SEO
                problems—it logs into your CMS and fixes them. Automatically.
              </p>

              {/* CTA Buttons */}
              <div className="flex-horizontal gap-column-16px children-wrap mg-bottom-24px">
                <Link href="/sign-up" className="btn-primary large">
                  <div className="flex-horizontal gap-column-4px">
                    <div>Start Fixing Issues Free</div>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
                <Link href="#how-it-works" className="btn-secondary large">
                  Watch How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex-horizontal gap-column-24px children-wrap">
                <span className="flex-horizontal gap-column-6px text-100 color-neutral-600">
                  <Check className="w-4 h-4" />
                  14-day free trial
                </span>
                <span className="flex-horizontal gap-column-6px text-100 color-neutral-600">
                  <Check className="w-4 h-4" />
                  No credit card required
                </span>
                <span className="flex-horizontal gap-column-6px text-100 color-neutral-600">
                  <Check className="w-4 h-4" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-neutral-100">
        <div className="container-default w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                Every SEO Tool Tells You What's Wrong
              </h2>
              <p className="text-200 color-neutral-600">Nobody actually fixes it.</p>
            </div>

            {/* Comparison Grid */}
            <div className="grid-3-columns gap-row-24px">
              {/* Traditional SEO Tools */}
              <div className="card pd-32px---24px">
                <div className="mg-bottom-24px">
                  <BarChart3 className="w-14 h-14 color-neutral-600 mg-bottom-16px" />
                  <h3 className="text-300 bold color-neutral-800 mg-bottom-16px">
                    Traditional SEO Tools
                  </h3>
                </div>
                <div className="grid-1-column gap-row-8px">
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">Generate reports</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">Identify issues</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">Send alerts</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">You fix everything manually</span>
                  </div>
                </div>
              </div>

              {/* Manual Fixing */}
              <div className="card pd-32px---24px">
                <div className="mg-bottom-24px">
                  <Target className="w-14 h-14 color-neutral-600 mg-bottom-16px" />
                  <h3 className="text-300 bold color-neutral-800 mg-bottom-16px">
                    Manual Fixing
                  </h3>
                </div>
                <div className="grid-1-column gap-row-8px">
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">Hours of work</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">Human errors</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">Inconsistent execution</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <span className="text-100 color-neutral-600">•</span>
                    <span className="text-100 color-neutral-600">Expensive developers</span>
                  </div>
                </div>
              </div>

              {/* SEOLOGY.AI */}
              <div className="card pd-32px---24px" style={{ borderColor: 'var(--accent--primary-1)', borderWidth: '2px' }}>
                <div className="mg-bottom-24px">
                  <Zap className="w-14 h-14 color-accent-1 mg-bottom-16px" />
                  <h3 className="text-300 bold color-neutral-800 mg-bottom-16px">
                    SEOLOGY.AI
                  </h3>
                </div>
                <div className="grid-1-column gap-row-8px">
                  <div className="flex-horizontal gap-column-8px align-start">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Automatically logs in</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Makes permanent fixes</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Claude AI intelligence</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px align-start">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Complete in minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-neutral-200">
        <div className="container-default w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                How It Works
              </h2>
              <p className="text-200 color-neutral-600">
                Three simple steps to automated SEO success
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid-3-columns gap-row-32px">
              {/* Step 1 */}
              <div className="card pd-32px---24px">
                <div className="text-600 bold color-neutral-800 mg-bottom-16px">01</div>
                <div className="card pd-16px mg-bottom-16px" style={{ width: '64px', height: '64px' }}>
                  <div className="flex-horizontal">
                    <Globe className="w-8 h-8 color-accent-1" />
                  </div>
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Connect Your Site in 60 Seconds
                </h3>
                <p className="text-100 color-neutral-600">
                  Link your Shopify store, WordPress site, or any website in under a minute with secure OAuth or API credentials.
                </p>
              </div>

              {/* Step 2 */}
              <div className="card pd-32px---24px">
                <div className="text-600 bold color-neutral-800 mg-bottom-16px">02</div>
                <div className="card pd-16px mg-bottom-16px" style={{ width: '64px', height: '64px' }}>
                  <div className="flex-horizontal">
                    <Cpu className="w-8 h-8 color-accent-1" />
                  </div>
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  AI Analyzes & Creates Fix Plan
                </h3>
                <p className="text-100 color-neutral-600">
                  Claude AI scans your entire site for 50+ SEO issues, identifies problems, and generates intelligent fixes.
                </p>
              </div>

              {/* Step 3 */}
              <div className="card pd-32px---24px">
                <div className="text-600 bold color-neutral-800 mg-bottom-16px">03</div>
                <div className="card pd-16px mg-bottom-16px" style={{ width: '64px', height: '64px' }}>
                  <div className="flex-horizontal">
                    <Zap className="w-8 h-8 color-accent-1" />
                  </div>
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Approve Once, Fix Everything
                </h3>
                <p className="text-100 color-neutral-600">
                  Review the plan and approve. SEOLOGY.AI logs into your CMS and applies all fixes automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-neutral-100">
        <div className="container-default w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                Why Choose SEOLOGY.AI?
              </h2>
              <p className="text-200 color-neutral-600">
                The most advanced SEO automation platform ever built
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid-3-columns gap-row-24px">
              {/* Automatic Fixes */}
              <div className="card pd-24px">
                <Zap className="w-12 h-12 color-accent-1 mg-bottom-16px" />
                <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">
                  Automatic SEO Fixes
                </h3>
                <p className="text-100 color-neutral-600">
                  Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically.
                </p>
              </div>

              {/* Secure Integration */}
              <div className="card pd-24px">
                <Shield className="w-12 h-12 color-accent-1 mg-bottom-16px" />
                <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">
                  Secure CMS Integration
                </h3>
                <p className="text-100 color-neutral-600">
                  OAuth authentication for Shopify. Encrypted credentials for WordPress.
                </p>
              </div>

              {/* Analytics */}
              <div className="card pd-24px">
                <BarChart3 className="w-12 h-12 color-accent-1 mg-bottom-16px" />
                <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">
                  Real-Time Analytics
                </h3>
                <p className="text-100 color-neutral-600">
                  Track your SEO improvements with detailed analytics and performance metrics.
                </p>
              </div>

              {/* Rollback */}
              <div className="card pd-24px">
                <RotateCcw className="w-12 h-12 color-accent-1 mg-bottom-16px" />
                <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">
                  90-Day Rollback
                </h3>
                <p className="text-100 color-neutral-600">
                  Every fix can be rolled back for 90 days. Complete peace of mind.
                </p>
              </div>

              {/* Execution Modes */}
              <div className="card pd-24px">
                <Target className="w-12 h-12 color-accent-1 mg-bottom-16px" />
                <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">
                  Three Execution Modes
                </h3>
                <p className="text-100 color-neutral-600">
                  Choose automatic, plan review, or manual approval—whatever fits your workflow.
                </p>
              </div>

              {/* Claude AI */}
              <div className="card pd-24px">
                <Sparkles className="w-12 h-12 color-accent-1 mg-bottom-16px" />
                <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">
                  Claude AI Powered
                </h3>
                <p className="text-100 color-neutral-600">
                  Leveraging Anthropic's most advanced AI model for intelligent SEO decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-neutral-200">
        <div className="container-default w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                Simple, Transparent Pricing
              </h2>
              <p className="text-200 color-neutral-600">
                Start free, scale as you grow
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid-3-columns gap-row-24px">
              {/* Starter */}
              <div className="card pd-32px---24px">
                <div className="text-50 medium color-neutral-600 mg-bottom-16px" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  STARTER
                </div>
                <div className="flex-horizontal gap-column-6px align-end mg-bottom-8px">
                  <span className="text-600 bold color-neutral-800">$29</span>
                  <span className="text-200 color-neutral-600">/mo</span>
                </div>
                <p className="text-100 color-neutral-600 mg-bottom-24px">
                  Perfect for small businesses
                </p>
                <div className="mg-bottom-24px">
                  <Link href="/pricing" className="btn-primary large width-100">
                    Start Free
                  </Link>
                </div>
                <div className="divider card-small-divider"></div>
                <div className="grid-1-column gap-row-8px">
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">3 sites</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">500 fixes/month</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Email support</span>
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div className="card pd-32px---24px" style={{ borderColor: 'var(--accent--primary-1)', borderWidth: '2px' }}>
                <div className="primary-badge mg-bottom-16px">MOST POPULAR</div>
                <div className="text-50 medium color-neutral-600 mg-bottom-16px" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  GROWTH
                </div>
                <div className="flex-horizontal gap-column-6px align-end mg-bottom-8px">
                  <span className="text-600 bold color-neutral-800">$99</span>
                  <span className="text-200 color-neutral-600">/mo</span>
                </div>
                <p className="text-100 color-neutral-600 mg-bottom-24px">
                  For growing teams
                </p>
                <div className="mg-bottom-24px">
                  <Link href="/pricing" className="btn-primary large width-100">
                    Start Free
                  </Link>
                </div>
                <div className="divider card-small-divider"></div>
                <div className="grid-1-column gap-row-8px">
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">10 sites</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">5,000 fixes/month</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Priority support</span>
                  </div>
                </div>
              </div>

              {/* Scale */}
              <div className="card pd-32px---24px">
                <div className="text-50 medium color-neutral-600 mg-bottom-16px" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  SCALE
                </div>
                <div className="flex-horizontal gap-column-6px align-end mg-bottom-8px">
                  <span className="text-600 bold color-neutral-800">$299</span>
                  <span className="text-200 color-neutral-600">/mo</span>
                </div>
                <p className="text-100 color-neutral-600 mg-bottom-24px">
                  Enterprise solution
                </p>
                <div className="mg-bottom-24px">
                  <Link href="/pricing" className="btn-secondary large width-100">
                    Contact Sales
                  </Link>
                </div>
                <div className="divider card-small-divider"></div>
                <div className="grid-1-column gap-row-8px">
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Unlimited sites</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Unlimited fixes</span>
                  </div>
                  <div className="flex-horizontal gap-column-8px">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Dedicated manager</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/pricing"
                className="text-100 medium color-accent-1 hover-neutral-800"
              >
                View detailed pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Radiant UI Newsletter Section */}
      <section className="rt-component-section rt-newsletter-blue-section">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            <div className="rt-footer-four-title-main">
              <div className="rt-component-heading-two">Stay Updated with <span className="color-accent-1">SEO Insights</span></div>
              <div className="rt-component-heading-two">Delivered to Your Inbox</div>
              <p className="text-200 color-neutral-600 mg-top-16px">
                Get weekly tips on SEO automation, Claude AI updates, and success stories from our users
              </p>
            </div>
            <div className="rt-footer-newsletter">
              <div className="rt-form-block w-form">
                <form method="get">
                  <div className="rt-footer-newsletter-main">
                    <input
                      className="rt-footer-newsletter-input w-input"
                      maxLength={256}
                      name="email"
                      placeholder="Enter your email address"
                      type="email"
                      required
                    />
                    <div className="rt-footer-newsletter-line rt-mobile-display-off"></div>
                    <div className="rt-footer-newsletter-button">
                      <div className="rt-footer-newsletter-button-text">
                        <div className="rt-button-font">SUBSCRIBE</div>
                      </div>
                      <button type="submit" className="btn-primary large">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-neutral-100">
        <div className="container-default w-container">
          <div className="mg-bottom-80px mg-top-80px">
            <div className="cta-card">
              <div className="inner-container _600px">
                <h2 className="text-500 bold color-neutral-100 mg-bottom-16px">
                  Ready to Automate Your SEO?
                </h2>
                <p className="text-200 color-neutral-100 mg-bottom-32px">
                  Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically
                </p>
                <div className="flex-horizontal gap-column-16px children-wrap">
                  <Link href="/sign-up" className="btn-primary large white">
                    Start Free Trial →
                  </Link>
                  <Link href="/pricing" className="btn-secondary large">
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
