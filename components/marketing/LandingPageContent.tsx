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
  Users,
  TrendingUp,
  Clock,
  Award,
  FileText,
  Code,
  Briefcase,
  Star,
  ChevronDown,
  HelpCircle,
} from 'lucide-react'

export default function LandingPageContent() {
  return (
    <div className="bg-neutral-200">
      {/* Hero Section - Enhanced with Radiant UI */}
      <section className="rt-component-section">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="grid-1-column gap-row-64px mg-bottom-80px mg-top-80px">
            {/* Hero Content */}
            <div className="inner-container _720px center">
              <div className="text-center">
                {/* Badge */}
                <div className="mg-bottom-24px">
                  <div className="badge green">
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
                <div className="flex-horizontal gap-column-16px children-wrap mg-bottom-32px">
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
                <div className="flex-horizontal gap-column-24px children-wrap mg-bottom-48px">
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-600">14-day free trial</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-600">No credit card required</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-600">Cancel anytime</span>
                  </div>
                </div>

                {/* Social Proof Stats */}
                <div className="grid-3-columns gap-row-24px">
                  <div className="card pd-24px">
                    <div className="text-400 bold color-accent-1 mg-bottom-8px">10,000+</div>
                    <div className="text-100 medium color-neutral-600">Fixes Applied</div>
                  </div>
                  <div className="card pd-24px">
                    <div className="text-400 bold color-accent-1 mg-bottom-8px">500+</div>
                    <div className="text-100 medium color-neutral-600">Active Sites</div>
                  </div>
                  <div className="card pd-24px">
                    <div className="text-400 bold color-accent-1 mg-bottom-8px">99.9%</div>
                    <div className="text-100 medium color-neutral-600">Uptime</div>
                  </div>
                </div>
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

      {/* How It Works - Enhanced */}
      <section id="how-it-works" className="rt-component-section bg-neutral-200">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <div className="badge green mg-bottom-16px" style={{ display: 'inline-block' }}>
                HOW IT WORKS
              </div>
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                SEO Automation in Three Simple Steps
              </h2>
              <p className="text-200 color-neutral-600">
                From connection to fix in minutes, not weeks
              </p>
            </div>

            {/* Steps Grid with Navigation */}
            <div className="rt-nav-top-wrap-contain">
              <div className="grid-3-columns gap-row-32px">
                {/* Step 1 */}
                <div className="card pd-32px---24px">
                  <div className="flex-horizontal gap-column-16px mg-bottom-16px align-center">
                    <div className="card-icon-square _48px">
                      <div className="text-300 bold color-accent-1">01</div>
                    </div>
                    <div className="divider-vertical" style={{ height: '2px', width: '100%', background: 'var(--neutral--400)' }}></div>
                  </div>
                  <div className="card-icon-square _40px mg-bottom-16px">
                    <Globe className="w-6 h-6 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                    Connect Your Site in 60 Seconds
                  </h3>
                  <p className="text-100 color-neutral-600 mg-bottom-16px">
                    Link your Shopify store, WordPress site, or any website in under a minute with secure OAuth or API credentials.
                  </p>
                  <div className="flex-vertical gap-row-8px">
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">One-click OAuth for Shopify</span>
                    </div>
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">REST API for WordPress</span>
                    </div>
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Magic.js for any site</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="card pd-32px---24px">
                  <div className="flex-horizontal gap-column-16px mg-bottom-16px align-center">
                    <div className="card-icon-square _48px">
                      <div className="text-300 bold color-accent-1">02</div>
                    </div>
                    <div className="divider-vertical" style={{ height: '2px', width: '100%', background: 'var(--neutral--400)' }}></div>
                  </div>
                  <div className="card-icon-square _40px mg-bottom-16px">
                    <Cpu className="w-6 h-6 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                    AI Analyzes & Creates Fix Plan
                  </h3>
                  <p className="text-100 color-neutral-600 mg-bottom-16px">
                    Claude AI scans your entire site for 50+ SEO issues, identifies problems, and generates intelligent fixes.
                  </p>
                  <div className="flex-vertical gap-row-8px">
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Full site crawl</span>
                    </div>
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">50+ issue types detected</span>
                    </div>
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Smart fix generation</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="card pd-32px---24px">
                  <div className="flex-horizontal gap-column-16px mg-bottom-16px align-center">
                    <div className="card-icon-square _48px">
                      <div className="text-300 bold color-accent-1">03</div>
                    </div>
                  </div>
                  <div className="card-icon-square _40px mg-bottom-16px">
                    <Zap className="w-6 h-6 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                    Approve Once, Fix Everything
                  </h3>
                  <p className="text-100 color-neutral-600 mg-bottom-16px">
                    Review the plan and approve. SEOLOGY.AI logs into your CMS and applies all fixes automatically.
                  </p>
                  <div className="flex-vertical gap-row-8px">
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Single approval process</span>
                    </div>
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Automatic deployment</span>
                    </div>
                    <div className="rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Real-time progress tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/sign-up" className="btn-primary large">
                <div className="flex-horizontal gap-column-4px">
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Section - NEW */}
      <section className="rt-component-section bg-neutral-100">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="mg-bottom-80px mg-top-80px">
            <div className="card pd-64px" style={{ background: 'linear-gradient(135deg, var(--accent--primary-1) 0%, var(--accent--primary-2) 100%)' }}>
              <div className="inner-container _600px center">
                <div className="text-center">
                  <div className="badge white mg-bottom-24px" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    LIMITED TIME OFFER
                  </div>
                  <h2 className="text-500 bold color-neutral-100 mg-bottom-16px">
                    Save Hours Every Week on SEO Tasks
                  </h2>
                  <p className="text-200 color-neutral-100 mg-bottom-32px">
                    Join hundreds of businesses automating their SEO with Claude AI. Start your free 14-day trial today.
                  </p>
                  <div className="flex-horizontal gap-column-16px children-wrap">
                    <Link href="/sign-up" className="btn-primary large white">
                      <div className="flex-horizontal gap-column-4px">
                        <span>Start Free Trial</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                    <Link href="#how-it-works" className="btn-secondary large" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                      Watch Demo
                    </Link>
                  </div>

                  {/* Stats Row */}
                  <div className="grid-3-columns gap-row-32px mg-top-48px">
                    <div>
                      <div className="text-400 bold color-neutral-100 mg-bottom-8px">92%</div>
                      <div className="text-100 color-neutral-100">Time Saved</div>
                    </div>
                    <div>
                      <div className="text-400 bold color-neutral-100 mg-bottom-8px">50+</div>
                      <div className="text-100 color-neutral-100">Issue Types</div>
                    </div>
                    <div>
                      <div className="text-400 bold color-neutral-100 mg-bottom-8px">4.9/5</div>
                      <div className="text-100 color-neutral-100">Customer Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section className="rt-component-section bg-neutral-100">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <div className="badge purple mg-bottom-16px" style={{ display: 'inline-block' }}>
                FEATURES
              </div>
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
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <Zap className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Automatic SEO Fixes
                </h3>
                <p className="text-100 color-neutral-600 mg-bottom-16px">
                  Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically.
                </p>
                <div className="flex-vertical gap-row-8px">
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">Meta tags optimization</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">Alt text generation</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">Schema markup</span>
                  </div>
                </div>
              </div>

              {/* Secure Integration */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <Shield className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Secure CMS Integration
                </h3>
                <p className="text-100 color-neutral-600 mg-bottom-16px">
                  Enterprise-grade security with encrypted credentials and OAuth flows.
                </p>
                <div className="flex-vertical gap-row-8px">
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">OAuth 2.0 support</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">Encrypted storage</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">SOC 2 compliant</span>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <BarChart3 className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Real-Time Analytics
                </h3>
                <p className="text-100 color-neutral-600 mg-bottom-16px">
                  Track your SEO improvements with detailed analytics and performance metrics.
                </p>
                <div className="flex-vertical gap-row-8px">
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">Traffic insights</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">Ranking tracking</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-50 color-neutral-600">Performance reports</span>
                  </div>
                </div>
              </div>

              {/* Rollback */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <RotateCcw className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  90-Day Rollback
                </h3>
                <p className="text-100 color-neutral-600">
                  Every fix can be rolled back for 90 days. Complete peace of mind.
                </p>
              </div>

              {/* Execution Modes */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <Target className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Three Execution Modes
                </h3>
                <p className="text-100 color-neutral-600">
                  Choose automatic, plan review, or manual approval—whatever fits your workflow.
                </p>
              </div>

              {/* Claude AI */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <Sparkles className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Claude AI Powered
                </h3>
                <p className="text-100 color-neutral-600">
                  Leveraging Anthropic's most advanced AI model for intelligent SEO decisions.
                </p>
              </div>

              {/* Integration Support */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <Code className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Universal Integration
                </h3>
                <p className="text-100 color-neutral-600">
                  Works with Shopify, WordPress, and any custom website via JavaScript.
                </p>
              </div>

              {/* Team Collaboration */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <Users className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  Team Collaboration
                </h3>
                <p className="text-100 color-neutral-600">
                  Share sites, track changes, and collaborate with your team in real-time.
                </p>
              </div>

              {/* 24/7 Monitoring */}
              <div className="card pd-32px---24px">
                <div className="card-icon-square _40px mg-bottom-16px">
                  <Clock className="w-6 h-6 color-accent-1" />
                </div>
                <h3 className="text-200 bold color-neutral-800 mg-bottom-12px">
                  24/7 Monitoring
                </h3>
                <p className="text-100 color-neutral-600">
                  Continuous site monitoring with instant alerts when new issues are detected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="rt-component-section bg-neutral-200">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <div className="badge orange mg-bottom-16px" style={{ display: 'inline-block' }}>
                TESTIMONIALS
              </div>
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                Loved by SEO Professionals
              </h2>
              <p className="text-200 color-neutral-600">
                See what our customers have to say about SEOLOGY.AI
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid-3-columns gap-row-24px">
              {/* Testimonial 1 */}
              <div className="card pd-32px---24px">
                <div className="flex-horizontal gap-column-8px mg-bottom-16px">
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                </div>
                <p className="text-100 color-neutral-800 mg-bottom-24px">
                  "SEOLOGY.AI has completely transformed how we handle SEO. What used to take our team days now happens automatically in minutes. The ROI is incredible."
                </p>
                <div className="flex-horizontal gap-column-12px align-center">
                  <div className="card-icon-square _40px">
                    <Briefcase className="w-5 h-5 color-accent-1" />
                  </div>
                  <div>
                    <div className="text-100 medium color-neutral-800">Sarah Johnson</div>
                    <div className="text-50 color-neutral-600">Marketing Director, TechCorp</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="card pd-32px---24px">
                <div className="flex-horizontal gap-column-8px mg-bottom-16px">
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                </div>
                <p className="text-100 color-neutral-800 mg-bottom-24px">
                  "As an agency managing 50+ client sites, SEOLOGY.AI is a game-changer. The automatic fixes and detailed reporting save us countless hours every week."
                </p>
                <div className="flex-horizontal gap-column-12px align-center">
                  <div className="card-icon-square _40px">
                    <Award className="w-5 h-5 color-accent-1" />
                  </div>
                  <div>
                    <div className="text-100 medium color-neutral-800">Michael Chen</div>
                    <div className="text-50 color-neutral-600">CEO, Digital Growth Agency</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="card pd-32px---24px">
                <div className="flex-horizontal gap-column-8px mg-bottom-16px">
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                </div>
                <p className="text-100 color-neutral-800 mg-bottom-24px">
                  "The Claude AI integration is brilliant. It understands context and makes intelligent decisions that actually improve our rankings. Best SEO tool we've used."
                </p>
                <div className="flex-horizontal gap-column-12px align-center">
                  <div className="card-icon-square _40px">
                    <TrendingUp className="w-5 h-5 color-accent-1" />
                  </div>
                  <div>
                    <div className="text-100 medium color-neutral-800">Emma Rodriguez</div>
                    <div className="text-50 color-neutral-600">E-commerce Manager, FashionHub</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview - Enhanced */}
      <section className="rt-component-section bg-neutral-100">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <div className="badge blue mg-bottom-16px" style={{ display: 'inline-block' }}>
                PRICING
              </div>
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                Simple, Transparent Pricing
              </h2>
              <p className="text-200 color-neutral-600">
                Start free, scale as you grow. No hidden fees or surprises.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid-3-columns gap-row-24px">
              {/* Starter */}
              <div className="card pd-32px---44px">
                <div className="text-50 medium color-neutral-600 mg-bottom-16px" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  STARTER
                </div>
                <div className="flex-horizontal gap-column-6px align-end mg-bottom-8px">
                  <span className="text-600 bold color-neutral-800">$29</span>
                  <span className="text-200 color-neutral-600">/mo</span>
                </div>
                <p className="text-100 color-neutral-600 mg-bottom-24px">
                  Perfect for small businesses and startups
                </p>
                <div className="mg-bottom-24px">
                  <Link href="/pricing" className="btn-primary large width-100">
                    <div className="flex-horizontal gap-column-4px">
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
                <div className="divider card-small-divider"></div>
                <div className="flex-vertical gap-row-12px">
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">3 sites included</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">500 fixes per month</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Email support</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Basic analytics</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">90-day rollback</span>
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div className="card pd-32px---44px" style={{ borderColor: 'var(--accent--primary-1)', borderWidth: '2px' }}>
                <div className="badge green mg-bottom-16px">MOST POPULAR</div>
                <div className="text-50 medium color-neutral-600 mg-bottom-16px" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  GROWTH
                </div>
                <div className="flex-horizontal gap-column-6px align-end mg-bottom-8px">
                  <span className="text-600 bold color-neutral-800">$99</span>
                  <span className="text-200 color-neutral-600">/mo</span>
                </div>
                <p className="text-100 color-neutral-600 mg-bottom-24px">
                  For growing teams and agencies
                </p>
                <div className="mg-bottom-24px">
                  <Link href="/pricing" className="btn-primary large width-100">
                    <div className="flex-horizontal gap-column-4px">
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
                <div className="divider card-small-divider"></div>
                <div className="flex-vertical gap-row-12px">
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">10 sites included</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">5,000 fixes per month</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Priority support</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Advanced analytics</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Team collaboration</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Custom reports</span>
                  </div>
                </div>
              </div>

              {/* Scale */}
              <div className="card pd-32px---44px">
                <div className="text-50 medium color-neutral-600 mg-bottom-16px" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  SCALE
                </div>
                <div className="flex-horizontal gap-column-6px align-end mg-bottom-8px">
                  <span className="text-600 bold color-neutral-800">$299</span>
                  <span className="text-200 color-neutral-600">/mo</span>
                </div>
                <p className="text-100 color-neutral-600 mg-bottom-24px">
                  Enterprise-grade solution
                </p>
                <div className="mg-bottom-24px">
                  <Link href="/pricing" className="btn-secondary large width-100">
                    Contact Sales
                  </Link>
                </div>
                <div className="divider card-small-divider"></div>
                <div className="flex-vertical gap-row-12px">
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Unlimited sites</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Unlimited fixes</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Dedicated account manager</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">24/7 phone support</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">SLA guarantee</span>
                  </div>
                  <div className="rt-text-icon-wrap">
                    <Check className="w-4 h-4 color-accent-1" />
                    <span className="text-100 color-neutral-800">Custom integrations</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mg-top-32px">
              <Link
                href="/pricing"
                className="text-100 medium color-accent-1 hover-neutral-800"
              >
                View detailed pricing comparison →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="rt-component-section bg-neutral-200">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="grid-1-column gap-row-48px mg-bottom-80px mg-top-80px">
            {/* Section Title */}
            <div className="text-center">
              <div className="badge yellow mg-bottom-16px" style={{ display: 'inline-block' }}>
                FAQ
              </div>
              <h2 className="text-500 bold color-neutral-800 mg-bottom-16px">
                Frequently Asked Questions
              </h2>
              <p className="text-200 color-neutral-600">
                Everything you need to know about SEOLOGY.AI
              </p>
            </div>

            {/* FAQ Grid */}
            <div className="grid-2-columns gap-row-24px">
              {/* FAQ 1 */}
              <div className="card pd-24px---18px">
                <div className="flex-horizontal gap-column-12px mg-bottom-12px">
                  <div className="card-icon-square _32px">
                    <HelpCircle className="w-5 h-5 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800">
                    How does SEOLOGY.AI actually fix SEO issues?
                  </h3>
                </div>
                <p className="text-100 color-neutral-600">
                  SEOLOGY.AI connects to your CMS using secure OAuth or API credentials. When issues are detected, Claude AI generates intelligent fixes and applies them directly to your site through the CMS API—just like a developer would, but automatically.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="card pd-24px---18px">
                <div className="flex-horizontal gap-column-12px mg-bottom-12px">
                  <div className="card-icon-square _32px">
                    <HelpCircle className="w-5 h-5 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800">
                    Is it safe? Can I rollback changes?
                  </h3>
                </div>
                <p className="text-100 color-neutral-600">
                  Absolutely. Every fix is stored with before/after snapshots and can be rolled back with one click for 90 days. We also offer three execution modes: automatic, plan review, or manual approval for maximum control.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="card pd-24px---18px">
                <div className="flex-horizontal gap-column-12px mg-bottom-12px">
                  <div className="card-icon-square _32px">
                    <HelpCircle className="w-5 h-5 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800">
                    What platforms do you support?
                  </h3>
                </div>
                <p className="text-100 color-neutral-600">
                  We support Shopify (OAuth), WordPress (REST API), and any custom website via our Magic.js connector. More platforms are being added regularly based on customer demand.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="card pd-24px---18px">
                <div className="flex-horizontal gap-column-12px mg-bottom-12px">
                  <div className="card-icon-square _32px">
                    <HelpCircle className="w-5 h-5 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800">
                    What types of SEO issues can you fix?
                  </h3>
                </div>
                <p className="text-100 color-neutral-600">
                  We detect and fix 50+ SEO issues including missing meta tags, duplicate content, broken links, poor image optimization, missing schema markup, heading structure problems, and much more.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="card pd-24px---18px">
                <div className="flex-horizontal gap-column-12px mg-bottom-12px">
                  <div className="card-icon-square _32px">
                    <HelpCircle className="w-5 h-5 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800">
                    Do I need technical knowledge to use this?
                  </h3>
                </div>
                <p className="text-100 color-neutral-600">
                  Not at all! SEOLOGY.AI is designed for marketers, business owners, and anyone who wants better SEO without touching code. The AI handles all the technical complexity for you.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="card pd-24px---18px">
                <div className="flex-horizontal gap-column-12px mg-bottom-12px">
                  <div className="card-icon-square _32px">
                    <HelpCircle className="w-5 h-5 color-accent-1" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800">
                    Can I try it before committing?
                  </h3>
                </div>
                <p className="text-100 color-neutral-600">
                  Yes! All plans include a 14-day free trial with no credit card required. You get full access to all features during your trial period. Cancel anytime with no questions asked.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mg-top-32px">
              <p className="text-100 color-neutral-600 mg-bottom-16px">
                Still have questions?
              </p>
              <Link href="/pricing" className="btn-secondary large">
                Contact Support
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

      {/* Final CTA - Enhanced */}
      <section className="rt-component-section bg-neutral-100">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="mg-bottom-80px mg-top-80px">
            <div className="card pd-80px" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', position: 'relative', overflow: 'hidden' }}>
              <div className="inner-container _720px center">
                <div className="text-center">
                  {/* Badge */}
                  <div className="badge green mg-bottom-24px" style={{ display: 'inline-block' }}>
                    <div className="flex-horizontal gap-column-6px align-center">
                      <Sparkles className="w-4 h-4" />
                      <span>START TODAY</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h2 className="text-500 bold color-neutral-100 mg-bottom-16px">
                    Ready to Automate Your SEO?
                  </h2>
                  <p className="text-200 color-neutral-100 mg-bottom-32px">
                    Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically. Get started in under 60 seconds.
                  </p>

                  {/* CTAs */}
                  <div className="flex-horizontal gap-column-16px children-wrap mg-bottom-48px">
                    <Link href="/sign-up" className="btn-primary large white">
                      <div className="flex-horizontal gap-column-4px">
                        <span>Start Free Trial</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                    <Link href="/pricing" className="btn-secondary large" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                      View Pricing Plans
                    </Link>
                  </div>

                  {/* Trust Row */}
                  <div className="grid-3-columns gap-row-32px">
                    <div className="card pd-24px" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="rt-text-icon-wrap mg-bottom-8px">
                        <Check className="w-5 h-5 color-accent-1" />
                        <div className="text-100 medium color-neutral-100">14-Day Free Trial</div>
                      </div>
                      <div className="text-50 color-neutral-400">No credit card required</div>
                    </div>
                    <div className="card pd-24px" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="rt-text-icon-wrap mg-bottom-8px">
                        <Shield className="w-5 h-5 color-accent-1" />
                        <div className="text-100 medium color-neutral-100">Enterprise Security</div>
                      </div>
                      <div className="text-50 color-neutral-400">SOC 2 compliant</div>
                    </div>
                    <div className="card pd-24px" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="rt-text-icon-wrap mg-bottom-8px">
                        <RotateCcw className="w-5 h-5 color-accent-1" />
                        <div className="text-100 medium color-neutral-100">90-Day Rollback</div>
                      </div>
                      <div className="text-50 color-neutral-400">Risk-free guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
