'use client'

import Link from 'next/link'
import {
  Target,
  Users,
  Lightbulb,
  Heart,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Brain,
  Code,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-6" />

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              We Don't Just
              <br />
              <span className="text-gray-600">Report Problems.</span>
              <br />
              <span className="text-blue-600">We Fix Them.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              The first AI that actually logs into your CMS and fixes SEO issues automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Story Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From frustration to innovation
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                year: '2023',
                quarter: 'Q1',
                title: 'The Problem',
                description:
                  'As e-commerce operators, we were frustrated by SEO tools that only generated reports. We spent weeks manually fixing issues across hundreds of product pages.',
              },
              {
                year: '2023',
                quarter: 'Q2',
                title: 'The Insight',
                description:
                  'AI technology reached sophistication levels where it could understand context and generate actual code fixes. We realized we could automate the entire SEO fixing process.',
              },
              {
                year: '2023',
                quarter: 'Q3',
                title: 'First Prototype',
                description:
                  'Built the first working prototype that connected to Shopify and automatically fixed meta tags. Results were immediate—3x traffic increase in 30 days.',
              },
              {
                year: '2023',
                quarter: 'Q4',
                title: 'Beta Launch',
                description:
                  'Launched private beta with 50 e-commerce stores. Added WordPress support and refined the AI models based on real-world feedback.',
              },
              {
                year: '2024',
                quarter: 'Q1',
                title: 'Public Launch',
                description:
                  'Officially launched SEOLOGY.AI to the public. Introduced three execution modes and the 90-day rollback feature for maximum control.',
              },
              {
                year: '2024',
                quarter: 'Q4',
                title: 'Today',
                description:
                  'Helping 500+ businesses automate their SEO. Processing 50,000+ fixes per month with a 95% success rate. Expanding to new platforms.',
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold text-blue-600 tracking-wider">
                    {milestone.year} {milestone.quarter}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {milestone.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                value: '50K+',
                label: 'Fixes Applied',
              },
              {
                icon: Users,
                value: '500+',
                label: 'Happy Customers',
              },
              {
                icon: Globe,
                value: '95%',
                label: 'Success Rate',
              },
              {
                icon: TrendingUp,
                value: '3.2x',
                label: 'Avg. Traffic Increase',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <div className="text-5xl font-bold text-gray-900 mb-3">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Our mission is to democratize SEO by making professional optimization accessible to every website owner through AI automation.
          </h2>
          <div className="h-1 w-32 bg-blue-600 mx-auto" />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Automation First',
                description:
                  'We believe in leveraging AI and automation to eliminate repetitive tasks, so you can focus on strategy and growth.',
              },
              {
                icon: Shield,
                title: 'Trust & Security',
                description:
                  'Your data and credentials are sacred. We use enterprise-grade security and never compromise on protection.',
              },
              {
                icon: Heart,
                title: 'Customer Success',
                description:
                  'Your SEO success is our success. We measure ourselves by the traffic and rankings we help you achieve.',
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description:
                  "SEO tools haven't evolved in years. We're pushing boundaries with AI-powered automation that actually works.",
              },
              {
                icon: Users,
                title: 'Transparency',
                description:
                  "No black boxes. Every fix is logged, explained, and reversible. You're always in control.",
              },
              {
                icon: TrendingUp,
                title: 'Results-Driven',
                description:
                  'We do not just fix issues - we measure impact. Every change tracked with before/after analytics.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600">
              The people building the future of SEO automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'CEO & Co-Founder',
                bio: 'Former Head of Growth at a YC-backed startup. Built SEO systems that scaled traffic from 0 to 10M visitors.',
                avatar: 'AC',
              },
              {
                name: 'Sarah Martinez',
                role: 'CTO & Co-Founder',
                bio: 'Ex-Google engineer with 10+ years building AI systems. Led the team that launched our AI integration.',
                avatar: 'SM',
              },
              {
                name: 'David Kim',
                role: 'Head of Product',
                bio: 'Former Shopify Product Manager. Obsessed with creating tools that developers and marketers both love.',
                avatar: 'DK',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto">
                  {member.avatar}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4 font-semibold">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built on Cutting-Edge Technology
            </h2>
            <p className="text-xl text-gray-600">
              We leverage the best tools and platforms to deliver results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Advanced AI',
                description:
                  "State-of-the-art AI technology powers our intelligent SEO analysis and fix generation.",
                tag: 'AI Engine',
                icon: Brain,
              },
              {
                name: 'Next.js 14',
                description:
                  'Modern React framework for blazing-fast performance and seamless user experience.',
                tag: 'Frontend',
                icon: Code,
              },
              {
                name: 'PostgreSQL',
                description:
                  'Enterprise-grade database for reliable data storage and complex queries.',
                tag: 'Database',
                icon: Shield,
              },
              {
                name: 'Vercel',
                description:
                  'Edge network deployment for global availability and sub-100ms response times.',
                tag: 'Infrastructure',
                icon: Globe,
              },
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <tech.icon className="w-12 h-12 text-blue-600" />
                  <span className="px-4 py-1.5 bg-blue-100 text-blue-600 text-xs rounded-full uppercase tracking-wider font-semibold">
                    {tech.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {tech.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            Have questions? Want to learn more? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'General Inquiries',
                email: 'hello@seology.ai',
              },
              {
                title: 'Support',
                email: 'support@seology.ai',
              },
              {
                title: 'Partnerships',
                email: 'partners@seology.ai',
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {contact.title}
                </h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:text-blue-700 transition-colors text-lg"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>

          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg"
          >
            Start Your Free Trial
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your SEO?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of businesses using SEOLOGY.AI to fix their SEO automatically
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors duration-300 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors duration-300 text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
