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
  Code,
  Briefcase,
  Star,
  HelpCircle,
} from 'lucide-react'

export default function LandingPageContent() {
  return (
    <div className="bg-neutral-200">
      {/* Hero Section - Radiant UI Structure */}
      <section className="rt-component-section">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            <div className="rt-footer-four-title-main">
              {/* Badge */}
              <div className="badge green mg-bottom-24px">
                <div className="w-layout-hflex rt-text-icon-wrap">
                  <Sparkles className="w-4 h-4" />
                  <span>Powered by Claude 3.5 Sonnet AI</span>
                </div>
              </div>

              {/* Headline */}
              <div className="rt-component-heading-two">
                Stop Reporting SEO Issues.
              </div>
              <div className="rt-component-heading-two">
                <span className="color-accent-1">Start Fixing</span> Them Automatically.
              </div>

              {/* Subtitle */}
              <p className="text-200 color-neutral-600 mg-top-24px mg-bottom-32px">
                The world's first AI-powered platform that doesn't just find SEO
                problems—it logs into your CMS and fixes them. Automatically.
              </p>

              {/* CTA Buttons */}
              <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-32px">
                <Link href="/sign-up" className="btn-primary large">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div>Start Fixing Issues Free</div>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
                <Link href="#how-it-works" className="btn-secondary large">
                  Watch How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-48px">
                <div className="w-layout-hflex rt-text-icon-wrap">
                  <Check className="w-4 h-4 color-accent-1" />
                  <span className="text-100 color-neutral-600">14-day free trial</span>
                </div>
                <div className="w-layout-hflex rt-text-icon-wrap">
                  <Check className="w-4 h-4 color-accent-1" />
                  <span className="text-100 color-neutral-600">No credit card required</span>
                </div>
                <div className="w-layout-hflex rt-text-icon-wrap">
                  <Check className="w-4 h-4 color-accent-1" />
                  <span className="text-100 color-neutral-600">Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Social Proof Stats */}
            <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
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
      </section>

      {/* The Problem Section - Radiant UI Cards */}
      <section className="rt-component-section bg-neutral-100">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            {/* Section Title */}
            <div className="rt-footer-four-title-main">
              <div className="rt-component-heading-two">
                Every SEO Tool Tells You What's Wrong
              </div>
              <p className="text-200 color-neutral-600 mg-top-16px">
                Nobody actually fixes it.
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
              {/* Traditional SEO Tools */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain">
                <div className="card pd-32px---24px">
                  <div className="rt-icon-box mg-bottom-24px">
                    <BarChart3 className="w-14 h-14 color-neutral-600" />
                  </div>
                  <div className="rt-component-heading-two mg-bottom-16px">
                    Traditional SEO Tools
                  </div>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">Generate reports</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">Identify issues</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">Send alerts</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">You fix everything manually</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Fixing */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---24px">
                  <div className="rt-icon-box mg-bottom-24px">
                    <Target className="w-14 h-14 color-neutral-600" />
                  </div>
                  <div className="rt-component-heading-two mg-bottom-16px">
                    Manual Fixing
                  </div>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">Hours of work</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">Human errors</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">Inconsistent execution</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <span className="text-100 color-neutral-600">•</span>
                      <span className="text-100 color-neutral-600">Expensive developers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEOLOGY.AI */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---24px card-highlighted">
                  <div className="rt-icon-box mg-bottom-24px">
                    <Zap className="w-14 h-14 color-accent-1" />
                  </div>
                  <div className="rt-component-heading-two mg-bottom-16px">
                    SEOLOGY.AI
                  </div>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Automatically logs in</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Makes permanent fixes</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Claude AI intelligence</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Complete in minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Radiant UI IconBox Structure */}
      <section id="how-it-works" className="rt-component-section bg-neutral-200">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            {/* Section Title */}
            <div className="rt-footer-four-title-main">
              <div className="badge green mg-bottom-16px">
                HOW IT WORKS
              </div>
              <div className="rt-component-heading-two">
                SEO Automation in Three Simple Steps
              </div>
              <p className="text-200 color-neutral-600 mg-top-16px">
                From connection to fix in minutes, not weeks
              </p>
            </div>

            {/* Steps Grid */}
            <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
              {/* Step 1 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain">
                <div className="card pd-32px---24px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-16px">
                    <div className="card-icon-square _48px">
                      <div className="text-300 bold color-accent-1">01</div>
                    </div>
                  </div>
                  <div className="rt-icon-box mg-bottom-16px">
                    <Globe className="w-8 h-8 color-accent-1" />
                  </div>
                  <div className="rt-nav-text mg-bottom-12px">
                    Connect Your Site in 60 Seconds
                  </div>
                  <p className="text-100 color-neutral-600 mg-bottom-16px">
                    Link your Shopify store, WordPress site, or any website in under a minute with secure OAuth or API credentials.
                  </p>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">One-click OAuth for Shopify</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">REST API for WordPress</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Magic.js for any site</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---24px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-16px">
                    <div className="card-icon-square _48px">
                      <div className="text-300 bold color-accent-1">02</div>
                    </div>
                  </div>
                  <div className="rt-icon-box mg-bottom-16px">
                    <Cpu className="w-8 h-8 color-accent-1" />
                  </div>
                  <div className="rt-nav-text mg-bottom-12px">
                    AI Analyzes & Creates Fix Plan
                  </div>
                  <p className="text-100 color-neutral-600 mg-bottom-16px">
                    Claude AI scans your entire site for 50+ SEO issues, identifies problems, and generates intelligent fixes.
                  </p>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Full site crawl</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">50+ issue types detected</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Smart fix generation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---24px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-16px">
                    <div className="card-icon-square _48px">
                      <div className="text-300 bold color-accent-1">03</div>
                    </div>
                  </div>
                  <div className="rt-icon-box mg-bottom-16px">
                    <Zap className="w-8 h-8 color-accent-1" />
                  </div>
                  <div className="rt-nav-text mg-bottom-12px">
                    Approve Once, Fix Everything
                  </div>
                  <p className="text-100 color-neutral-600 mg-bottom-16px">
                    Review the plan and approve. SEOLOGY.AI logs into your CMS and applies all fixes automatically.
                  </p>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Single approval process</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Automatic deployment</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-50 color-neutral-600">Real-time progress tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rt-footer-four-title-main mg-top-48px">
              <Link href="/sign-up" className="btn-primary large">
                <div className="w-layout-hflex rt-text-icon-wrap">
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Section - Radiant UI CTA */}
      <section className="rt-component-section bg-accent-1">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            <div className="rt-footer-four-title-main">
              <div className="badge white mg-bottom-24px">
                LIMITED TIME OFFER
              </div>
              <div className="rt-component-heading-two color-neutral-100">
                Save Hours Every Week on SEO Tasks
              </div>
              <p className="text-200 color-neutral-100 mg-top-16px mg-bottom-32px">
                Join hundreds of businesses automating their SEO with Claude AI. Start your free 14-day trial today.
              </p>
              <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-48px">
                <Link href="/sign-up" className="btn-primary large white">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
                <Link href="#how-it-works" className="btn-secondary large white-outline">
                  Watch Demo
                </Link>
              </div>

              {/* Stats Row */}
              <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
                <div className="rt-nav-top-wrap-contain">
                  <div className="text-400 bold color-neutral-100 mg-bottom-8px">92%</div>
                  <div className="text-100 color-neutral-100">Time Saved</div>
                </div>
                <div className="rt-nav-top-wrap-contain">
                  <div className="text-400 bold color-neutral-100 mg-bottom-8px">50+</div>
                  <div className="text-100 color-neutral-100">Issue Types</div>
                </div>
                <div className="rt-nav-top-wrap-contain">
                  <div className="text-400 bold color-neutral-100 mg-bottom-8px">4.9/5</div>
                  <div className="text-100 color-neutral-100">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Radiant UI IconBox Components */}
      <section className="rt-component-section bg-neutral-100">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            {/* Section Title */}
            <div className="rt-footer-four-title-main">
              <div className="badge purple mg-bottom-16px">
                FEATURES
              </div>
              <div className="rt-component-heading-two">
                Why Choose SEOLOGY.AI?
              </div>
              <p className="text-200 color-neutral-600 mg-top-16px">
                The most advanced SEO automation platform ever built
              </p>
            </div>

            {/* Features Grid - 3x3 Layout */}
            <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
              {/* Column 1 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain">
                {/* Automatic Fixes */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Zap className="w-6 h-6 rt-black-icon" />
                      <Zap className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">Automatic SEO Fixes</div>
                      <p className="text-100 color-neutral-600">
                        Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Secure Integration */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Shield className="w-6 h-6 rt-black-icon" />
                      <Shield className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">Secure CMS Integration</div>
                      <p className="text-100 color-neutral-600">
                        Enterprise-grade security with encrypted credentials and OAuth flows.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Analytics */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <BarChart3 className="w-6 h-6 rt-black-icon" />
                      <BarChart3 className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">Real-Time Analytics</div>
                      <p className="text-100 color-neutral-600">
                        Track your SEO improvements with detailed analytics and performance metrics.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Column 2 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                {/* Rollback */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <RotateCcw className="w-6 h-6 rt-black-icon" />
                      <RotateCcw className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">90-Day Rollback</div>
                      <p className="text-100 color-neutral-600">
                        Every fix can be rolled back for 90 days. Complete peace of mind.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Execution Modes */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Target className="w-6 h-6 rt-black-icon" />
                      <Target className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">Three Execution Modes</div>
                      <p className="text-100 color-neutral-600">
                        Choose automatic, plan review, or manual approval—whatever fits your workflow.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Claude AI */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Sparkles className="w-6 h-6 rt-black-icon" />
                      <Sparkles className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">Claude AI Powered</div>
                      <p className="text-100 color-neutral-600">
                        Leveraging Anthropic's most advanced AI model for intelligent SEO decisions.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Column 3 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                {/* Integration Support */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Code className="w-6 h-6 rt-black-icon" />
                      <Code className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">Universal Integration</div>
                      <p className="text-100 color-neutral-600">
                        Works with Shopify, WordPress, and any custom website via JavaScript.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Team Collaboration */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Users className="w-6 h-6 rt-black-icon" />
                      <Users className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">Team Collaboration</div>
                      <p className="text-100 color-neutral-600">
                        Share sites, track changes, and collaborate with your team in real-time.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* 24/7 Monitoring */}
                <Link href="#features" className="rt-nav-top-link-wrap w-inline-block">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Clock className="w-6 h-6 rt-black-icon" />
                      <Clock className="w-6 h-6 rt-blue-icon" />
                    </div>
                    <div className="rt-text-block">
                      <div className="rt-nav-text">24/7 Monitoring</div>
                      <p className="text-100 color-neutral-600">
                        Continuous site monitoring with instant alerts when new issues are detected.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Icon hover effect styles */}
        <style jsx>{`
          .rt-icon-box {
            position: relative;
            width: 24px;
            height: 24px;
          }
          .rt-blue-icon {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
            color: #3898ec;
          }
          .rt-black-icon {
            transition: opacity 0.3s ease;
            color: #150438;
          }
          .rt-nav-top-link-wrap:hover .rt-black-icon {
            opacity: 0;
          }
          .rt-nav-top-link-wrap:hover .rt-blue-icon {
            opacity: 1;
          }
        `}</style>
      </section>

      {/* Testimonials Section - Radiant UI Testimonial Cards */}
      <section className="rt-component-section bg-neutral-200">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            {/* Section Title */}
            <div className="rt-footer-four-title-main">
              <div className="badge orange mg-bottom-16px">
                TESTIMONIALS
              </div>
              <div className="rt-component-heading-two">
                Loved by SEO Professionals
              </div>
              <p className="text-200 color-neutral-600 mg-top-16px">
                See what our customers have to say about SEOLOGY.AI
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
              {/* Testimonial 1 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain">
                <div className="card pd-32px---24px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-16px">
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  </div>
                  <p className="text-100 color-neutral-800 mg-bottom-24px">
                    "SEOLOGY.AI has completely transformed how we handle SEO. What used to take our team days now happens automatically in minutes. The ROI is incredible."
                  </p>
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Briefcase className="w-5 h-5 color-accent-1" />
                    </div>
                    <div>
                      <div className="text-100 medium color-neutral-800">Sarah Johnson</div>
                      <div className="text-50 color-neutral-600">Marketing Director, TechCorp</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---24px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-16px">
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  </div>
                  <p className="text-100 color-neutral-800 mg-bottom-24px">
                    "As an agency managing 50+ client sites, SEOLOGY.AI is a game-changer. The automatic fixes and detailed reporting save us countless hours every week."
                  </p>
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
                      <Award className="w-5 h-5 color-accent-1" />
                    </div>
                    <div>
                      <div className="text-100 medium color-neutral-800">Michael Chen</div>
                      <div className="text-50 color-neutral-600">CEO, Digital Growth Agency</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---24px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-16px">
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                    <Star className="w-5 h-5 color-accent-1" fill="currentColor" />
                  </div>
                  <p className="text-100 color-neutral-800 mg-bottom-24px">
                    "The Claude AI integration is brilliant. It understands context and makes intelligent decisions that actually improve our rankings. Best SEO tool we've used."
                  </p>
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <div className="rt-icon-box">
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
        </div>
      </section>

      {/* Pricing Section - Radiant UI Pricing Cards */}
      <section className="rt-component-section bg-neutral-100">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            {/* Section Title */}
            <div className="rt-footer-four-title-main">
              <div className="badge blue mg-bottom-16px">
                PRICING
              </div>
              <div className="rt-component-heading-two">
                Simple, Transparent Pricing
              </div>
              <p className="text-200 color-neutral-600 mg-top-16px">
                Start free, scale as you grow. No hidden fees or surprises.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
              {/* Starter */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain">
                <div className="card pd-32px---44px">
                  <div className="text-50 medium color-neutral-600 mg-bottom-16px rt-button-font">
                    STARTER
                  </div>
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-8px">
                    <span className="text-600 bold color-neutral-800">$29</span>
                    <span className="text-200 color-neutral-600">/mo</span>
                  </div>
                  <p className="text-100 color-neutral-600 mg-bottom-24px">
                    Perfect for small businesses and startups
                  </p>
                  <div className="mg-bottom-24px">
                    <Link href="/pricing" className="btn-primary large width-100">
                      <div className="w-layout-hflex rt-text-icon-wrap">
                        <span>Start Free Trial</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                  <div className="divider card-small-divider"></div>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">3 sites included</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">500 fixes per month</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Email support</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Basic analytics</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">90-day rollback</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---44px card-highlighted">
                  <div className="badge green mg-bottom-16px">MOST POPULAR</div>
                  <div className="text-50 medium color-neutral-600 mg-bottom-16px rt-button-font">
                    GROWTH
                  </div>
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-8px">
                    <span className="text-600 bold color-neutral-800">$99</span>
                    <span className="text-200 color-neutral-600">/mo</span>
                  </div>
                  <p className="text-100 color-neutral-600 mg-bottom-24px">
                    For growing teams and agencies
                  </p>
                  <div className="mg-bottom-24px">
                    <Link href="/pricing" className="btn-primary large width-100">
                      <div className="w-layout-hflex rt-text-icon-wrap">
                        <span>Start Free Trial</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                  <div className="divider card-small-divider"></div>
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">10 sites included</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">5,000 fixes per month</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Priority support</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Advanced analytics</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Team collaboration</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Custom reports</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scale */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                <div className="card pd-32px---44px">
                  <div className="text-50 medium color-neutral-600 mg-bottom-16px rt-button-font">
                    SCALE
                  </div>
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-8px">
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
                  <div className="w-layout-vflex">
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Unlimited sites</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Unlimited fixes</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Dedicated account manager</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">24/7 phone support</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">SLA guarantee</span>
                    </div>
                    <div className="w-layout-hflex rt-text-icon-wrap">
                      <Check className="w-4 h-4 color-accent-1" />
                      <span className="text-100 color-neutral-800">Custom integrations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rt-footer-four-title-main mg-top-32px">
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

      {/* FAQ Section - Radiant UI Accordion-Style Cards */}
      <section className="rt-component-section bg-neutral-200">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            {/* Section Title */}
            <div className="rt-footer-four-title-main">
              <div className="badge yellow mg-bottom-16px">
                FAQ
              </div>
              <div className="rt-component-heading-two">
                Frequently Asked Questions
              </div>
              <p className="text-200 color-neutral-600 mg-top-16px">
                Everything you need to know about SEOLOGY.AI
              </p>
            </div>

            {/* FAQ Grid - 2 columns */}
            <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
              {/* Column 1 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain">
                {/* FAQ 1 */}
                <div className="card pd-24px---18px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-12px">
                    <div className="rt-icon-box">
                      <HelpCircle className="w-5 h-5 color-accent-1" />
                    </div>
                    <div className="rt-nav-text">
                      How does SEOLOGY.AI actually fix SEO issues?
                    </div>
                  </div>
                  <p className="text-100 color-neutral-600">
                    SEOLOGY.AI connects to your CMS using secure OAuth or API credentials. When issues are detected, Claude AI generates intelligent fixes and applies them directly to your site through the CMS API—just like a developer would, but automatically.
                  </p>
                </div>

                {/* FAQ 2 */}
                <div className="card pd-24px---18px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-12px">
                    <div className="rt-icon-box">
                      <HelpCircle className="w-5 h-5 color-accent-1" />
                    </div>
                    <div className="rt-nav-text">
                      Is it safe? Can I rollback changes?
                    </div>
                  </div>
                  <p className="text-100 color-neutral-600">
                    Absolutely. Every fix is stored with before/after snapshots and can be rolled back with one click for 90 days. We also offer three execution modes: automatic, plan review, or manual approval for maximum control.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div className="card pd-24px---18px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-12px">
                    <div className="rt-icon-box">
                      <HelpCircle className="w-5 h-5 color-accent-1" />
                    </div>
                    <div className="rt-nav-text">
                      What platforms do you support?
                    </div>
                  </div>
                  <p className="text-100 color-neutral-600">
                    We support Shopify (OAuth), WordPress (REST API), and any custom website via our Magic.js connector. More platforms are being added regularly based on customer demand.
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="w-layout-vflex rt-nav-top-wrap-contain rt-right-gap">
                {/* FAQ 4 */}
                <div className="card pd-24px---18px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-12px">
                    <div className="rt-icon-box">
                      <HelpCircle className="w-5 h-5 color-accent-1" />
                    </div>
                    <div className="rt-nav-text">
                      What types of SEO issues can you fix?
                    </div>
                  </div>
                  <p className="text-100 color-neutral-600">
                    We detect and fix 50+ SEO issues including missing meta tags, duplicate content, broken links, poor image optimization, missing schema markup, heading structure problems, and much more.
                  </p>
                </div>

                {/* FAQ 5 */}
                <div className="card pd-24px---18px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-12px">
                    <div className="rt-icon-box">
                      <HelpCircle className="w-5 h-5 color-accent-1" />
                    </div>
                    <div className="rt-nav-text">
                      Do I need technical knowledge to use this?
                    </div>
                  </div>
                  <p className="text-100 color-neutral-600">
                    Not at all! SEOLOGY.AI is designed for marketers, business owners, and anyone who wants better SEO without touching code. The AI handles all the technical complexity for you.
                  </p>
                </div>

                {/* FAQ 6 */}
                <div className="card pd-24px---18px">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-12px">
                    <div className="rt-icon-box">
                      <HelpCircle className="w-5 h-5 color-accent-1" />
                    </div>
                    <div className="rt-nav-text">
                      Can I try it before committing?
                    </div>
                  </div>
                  <p className="text-100 color-neutral-600">
                    Yes! All plans include a 14-day free trial with no credit card required. You get full access to all features during your trial period. Cancel anytime with no questions asked.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rt-footer-four-title-main mg-top-32px">
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

      {/* Newsletter Section - Already Using Radiant UI */}
      <section className="rt-component-section rt-newsletter-blue-section">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            <div className="rt-footer-four-title-main">
              <div className="rt-component-heading-two">
                Stay Updated with <span className="color-accent-1">SEO Insights</span>
              </div>
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

      {/* Final CTA - Radiant UI CTA Structure */}
      <section className="rt-component-section bg-neutral-800">
        <div className="w-layout-blockcontainer rt-component-container w-container">
          <div className="rt-newsletter-wrap">
            <div className="rt-footer-four-title-main">
              {/* Badge */}
              <div className="badge green mg-bottom-24px">
                <div className="w-layout-hflex rt-text-icon-wrap">
                  <Sparkles className="w-4 h-4" />
                  <span>START TODAY</span>
                </div>
              </div>

              {/* Headline */}
              <div className="rt-component-heading-two color-neutral-100">
                Ready to Automate Your SEO?
              </div>
              <p className="text-200 color-neutral-100 mg-top-16px mg-bottom-32px">
                Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically. Get started in under 60 seconds.
              </p>

              {/* CTAs */}
              <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-48px">
                <Link href="/sign-up" className="btn-primary large white">
                  <div className="w-layout-hflex rt-text-icon-wrap">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
                <Link href="/pricing" className="btn-secondary large white-outline">
                  View Pricing Plans
                </Link>
              </div>

              {/* Trust Row */}
              <div className="w-layout-hflex rt-nav-one-dropdown-upper-wrap">
                <div className="card pd-24px card-dark">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-8px">
                    <Check className="w-5 h-5 color-accent-1" />
                    <div className="text-100 medium color-neutral-100">14-Day Free Trial</div>
                  </div>
                  <div className="text-50 color-neutral-400">No credit card required</div>
                </div>
                <div className="card pd-24px card-dark">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-8px">
                    <Shield className="w-5 h-5 color-accent-1" />
                    <div className="text-100 medium color-neutral-100">Enterprise Security</div>
                  </div>
                  <div className="text-50 color-neutral-400">SOC 2 compliant</div>
                </div>
                <div className="card pd-24px card-dark">
                  <div className="w-layout-hflex rt-text-icon-wrap mg-bottom-8px">
                    <RotateCcw className="w-5 h-5 color-accent-1" />
                    <div className="text-100 medium color-neutral-100">90-Day Rollback</div>
                  </div>
                  <div className="text-50 color-neutral-400">Risk-free guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
