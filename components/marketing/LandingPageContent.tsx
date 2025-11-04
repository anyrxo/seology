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
  X,
  Star,
  HelpCircle,
} from 'lucide-react'

export default function LandingPageContent() {
  return (
    <div className="bg-white">
      {/* Hero Section - Centered & Professional */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Advanced AI</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Stop Reporting SEO Issues.
            <br />
            <span className="text-blue-600">Start Fixing</span> Them Automatically.
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            The world's first AI-powered platform that doesn't just find SEO
            problems—it logs into your CMS and fixes them. Automatically.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg"
            >
              <span>Start Fixing Issues Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-lg"
            >
              Watch How It Works
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 mb-16">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium">Cancel anytime</span>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-blue-600 mb-3">10,000+</div>
              <div className="text-base font-semibold text-gray-600">Fixes Applied</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-blue-600 mb-3">500+</div>
              <div className="text-base font-semibold text-gray-600">Active Sites</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-blue-600 mb-3">99.9%</div>
              <div className="text-base font-semibold text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section - Centered & Professional */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Every SEO Tool Tells You What's Wrong
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Nobody actually fixes it.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Traditional SEO Tools */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Traditional SEO Tools
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Generate reports</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Identify issues</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Send alerts</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-semibold">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>You fix everything manually</span>
                </li>
              </ul>
            </div>

            {/* Manual Fixing */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Target className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Manual Fixing
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Hours of work</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Human errors</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Inconsistent execution</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Expensive developers</span>
                </li>
              </ul>
            </div>

            {/* SEOLOGY.AI */}
            <div className="bg-blue-600 border-2 border-blue-600 rounded-xl p-8 shadow-xl">
              <div className="mb-6">
                <Zap className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                SEOLOGY.AI
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-blue-50">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>Automatically logs in</span>
                </li>
                <li className="flex items-start gap-2 text-blue-50">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>Makes permanent fixes</span>
                </li>
                <li className="flex items-start gap-2 text-blue-50">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>Advanced AI intelligence</span>
                </li>
                <li className="flex items-start gap-2 text-blue-50">
                  <Check className="w-5 h-5 text-white mt-0.5" />
                  <span>Complete in minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Professional & Centered */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-semibold mb-6">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              SEO Automation in Three Simple Steps
            </h2>
            <p className="text-xl text-neutral-600">
              From connection to fix in minutes, not weeks
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 font-bold text-xl mb-6">
                01
              </div>
              <div className="mb-4">
                <Globe className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Connect Your Site in 60 Seconds
              </h3>
              <p className="text-neutral-600 mb-4">
                Link your Shopify store, WordPress site, or any website in under a minute with secure OAuth or API credentials.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>One-click OAuth for Shopify</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>REST API for WordPress</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Magic.js for any site</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 font-bold text-xl mb-6">
                02
              </div>
              <div className="mb-4">
                <Cpu className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                AI Analyzes & Creates Fix Plan
              </h3>
              <p className="text-neutral-600 mb-4">
                Our AI scans your entire site for 50+ SEO issues, identifies problems, and generates intelligent fixes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Full site crawl</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>50+ issue types detected</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Smart fix generation</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 font-bold text-xl mb-6">
                03
              </div>
              <div className="mb-4">
                <Zap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Approve Once, Fix Everything
              </h3>
              <p className="text-neutral-600 mb-4">
                Review the plan and approve. SEOLOGY.AI logs into your CMS and applies all fixes automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Single approval process</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Automatic deployment</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Real-time progress tracking</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Section - Centered */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
            LIMITED TIME OFFER
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Save Hours Every Week on SEO Tasks
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of businesses automating their SEO with SEOLOGY.AI. Start your free 14-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-neutral-50 transition-colors shadow-lg"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition-colors"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">92%</div>
              <div className="text-blue-100">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Issue Types</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-blue-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Centered */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-6">
              FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Why Choose SEOLOGY.AI?
            </h2>
            <p className="text-xl text-neutral-600">
              The most advanced SEO automation platform ever built
            </p>
          </div>

          {/* Features Grid - 3x3 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Automatic SEO Fixes
              </h3>
              <p className="text-neutral-600 text-sm">
                Stop wasting time on manual SEO tasks. Our AI fixes issues for you automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Secure CMS Integration
              </h3>
              <p className="text-neutral-600 text-sm">
                Enterprise-grade security with encrypted credentials and OAuth flows.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-neutral-600 text-sm">
                Track your SEO improvements with detailed analytics and performance metrics.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <RotateCcw className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                90-Day Rollback
              </h3>
              <p className="text-neutral-600 text-sm">
                Every fix can be rolled back for 90 days. Complete peace of mind.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Three Execution Modes
              </h3>
              <p className="text-neutral-600 text-sm">
                Choose automatic, plan review, or manual approval—whatever fits your workflow.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                AI-Powered
              </h3>
              <p className="text-neutral-600 text-sm">
                Leveraging the most advanced AI technology for intelligent SEO decisions.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Universal Integration
              </h3>
              <p className="text-neutral-600 text-sm">
                Works with Shopify, WordPress, and any custom website via JavaScript.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Team Collaboration
              </h3>
              <p className="text-neutral-600 text-sm">
                Share sites, track changes, and collaborate with your team in real-time.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                24/7 Monitoring
              </h3>
              <p className="text-neutral-600 text-sm">
                Continuous site monitoring with instant alerts when new issues are detected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Centered */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-6">
              TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Loved by SEO Professionals
            </h2>
            <p className="text-xl text-neutral-600">
              See what our customers have to say about SEOLOGY.AI
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-700 mb-6">
                "SEOLOGY.AI has completely transformed how we handle SEO. What used to take our team days now happens automatically in minutes. The ROI is incredible."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Sarah Johnson</div>
                  <div className="text-sm text-neutral-600">Marketing Director, TechCorp</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-700 mb-6">
                "As an agency managing 50+ client sites, SEOLOGY.AI is a game-changer. The automatic fixes and detailed reporting save us countless hours every week."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Michael Chen</div>
                  <div className="text-sm text-neutral-600">CEO, Digital Growth Agency</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-700 mb-6">
                "The AI integration is brilliant. It understands context and makes intelligent decisions that actually improve our rankings. Best SEO tool we've used."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Emma Rodriguez</div>
                  <div className="text-sm text-neutral-600">E-commerce Manager, FashionHub</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Centered */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
              PRICING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-600">
              Start free, scale as you grow. No hidden fees or surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="text-sm font-semibold text-neutral-600 mb-4">
                STARTER
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-neutral-900">$29</span>
                <span className="text-xl text-neutral-600">/mo</span>
              </div>
              <p className="text-neutral-600 mb-6">
                Perfect for small businesses and startups
              </p>
              <Link
                href="/pricing"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-6"
              >
                Start Free Trial →
              </Link>
              <div className="border-t border-neutral-200 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">3 sites included</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">500 fixes per month</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">Email support</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">90-day rollback</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Growth */}
            <div className="bg-blue-600 border-2 border-blue-600 rounded-xl p-8 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                  MOST POPULAR
                </div>
              </div>
              <div className="text-sm font-semibold text-blue-100 mb-4">
                GROWTH
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-white">$99</span>
                <span className="text-xl text-blue-100">/mo</span>
              </div>
              <p className="text-blue-100 mb-6">
                For growing teams and agencies
              </p>
              <Link
                href="/pricing"
                className="block w-full text-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-neutral-50 transition-colors mb-6"
              >
                Start Free Trial →
              </Link>
              <div className="border-t border-blue-500 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-blue-50">10 sites included</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-blue-50">5,000 fixes per month</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-blue-50">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-blue-50">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-blue-50">Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-blue-50">Custom reports</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Scale */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <div className="text-sm font-semibold text-neutral-600 mb-4">
                SCALE
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-neutral-900">$299</span>
                <span className="text-xl text-neutral-600">/mo</span>
              </div>
              <p className="text-neutral-600 mb-6">
                Enterprise-grade solution
              </p>
              <Link
                href="/pricing"
                className="block w-full text-center px-6 py-3 bg-white text-neutral-700 rounded-lg font-semibold border-2 border-neutral-200 hover:border-neutral-300 transition-colors mb-6"
              >
                Contact Sales
              </Link>
              <div className="border-t border-neutral-200 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">Unlimited sites</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">Unlimited fixes</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">24/7 phone support</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">SLA guarantee</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-neutral-700">Custom integrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/pricing"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View detailed pricing comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Centered */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-yellow-50 text-yellow-600 text-sm font-semibold mb-6">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600">
              Everything you need to know about SEOLOGY.AI
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FAQ 1 */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-neutral-900">
                  How does SEOLOGY.AI actually fix SEO issues?
                </h3>
              </div>
              <p className="text-sm text-neutral-600 ml-8">
                SEOLOGY.AI connects to your CMS using secure OAuth or API credentials. When issues are detected, our AI generates intelligent fixes and applies them directly to your site through the CMS API—just like a developer would, but automatically.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-neutral-900">
                  Is it safe? Can I rollback changes?
                </h3>
              </div>
              <p className="text-sm text-neutral-600 ml-8">
                Absolutely. Every fix is stored with before/after snapshots and can be rolled back with one click for 90 days. We also offer three execution modes: automatic, plan review, or manual approval for maximum control.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-neutral-900">
                  What platforms do you support?
                </h3>
              </div>
              <p className="text-sm text-neutral-600 ml-8">
                We support Shopify (OAuth), WordPress (REST API), and any custom website via our Magic.js connector. More platforms are being added regularly based on customer demand.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-neutral-900">
                  What types of SEO issues can you fix?
                </h3>
              </div>
              <p className="text-sm text-neutral-600 ml-8">
                We detect and fix 50+ SEO issues including missing meta tags, duplicate content, broken links, poor image optimization, missing schema markup, heading structure problems, and much more.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-neutral-900">
                  Do I need technical knowledge to use this?
                </h3>
              </div>
              <p className="text-sm text-neutral-600 ml-8">
                Not at all! SEOLOGY.AI is designed for marketers, business owners, and anyone who wants better SEO without touching code. The AI handles all the technical complexity for you.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-neutral-900">
                  Can I try it before committing?
                </h3>
              </div>
              <p className="text-sm text-neutral-600 ml-8">
                Yes! All plans include a 14-day free trial with no credit card required. You get full access to all features during your trial period. Cancel anytime with no questions asked.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-neutral-600 mb-4">
              Still have questions?
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-700 rounded-lg font-semibold border-2 border-neutral-200 hover:border-neutral-300 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Centered */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Stay Updated with <span className="text-blue-600">SEO Insights</span>
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Get weekly tips on SEO automation, AI updates, and success stories from our users
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Final CTA - Centered */}
      <section className="py-20 px-4 bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>START TODAY</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your SEO?
          </h2>
          <p className="text-xl text-neutral-300 mb-10">
            Join hundreds of businesses already using SEOLOGY.AI to fix their SEO automatically. Get started in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors shadow-lg"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>

          {/* Trust Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-green-400" />
                <div className="font-semibold text-white">14-Day Free Trial</div>
              </div>
              <div className="text-sm text-neutral-400">No credit card required</div>
            </div>
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <div className="font-semibold text-white">Enterprise Security</div>
              </div>
              <div className="text-sm text-neutral-400">SOC 2 compliant</div>
            </div>
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <RotateCcw className="w-5 h-5 text-green-400" />
                <div className="font-semibold text-white">90-Day Rollback</div>
              </div>
              <div className="text-sm text-neutral-400">Risk-free guarantee</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
