'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
} from 'lucide-react'
import CTASection from '@/components/marketing/CTASection'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            We're Fixing SEO,
            <br />
            <span className="text-blue-500">One Site at a Time</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            SEOLOGY.AI was born from a simple frustration: SEO tools tell you
            what's wrong, but nobody actually fixes it. We decided to change
            that.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-400 mb-4">
                Our mission is to democratize SEO by making professional optimization accessible to every website owner through AI automation.
              </p>
              <p className="text-lg text-gray-400 mb-4">
                We believe SEO shouldn't be a never-ending cycle of audits and
                manual fixes. It should be automated, intelligent, and
                results-driven.
              </p>
              <p className="text-lg text-gray-400 mb-4">
                That's why we built SEOLOGY.AI—the first platform that doesn't
                just identify SEO issues, but actually logs into your CMS and
                fixes them automatically using advanced AI.
              </p>
              <p className="text-lg text-gray-400">
                Whether you're a small business with one site or an enterprise managing hundreds, SEOLOGY.AI scales with you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center"
                >
                  <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-400">
              The principles that guide everything we do
            </p>
          </motion.div>

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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">
              From frustration to innovation
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500/20" />

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
                    'Claude AI reached sophistication levels where it could understand context and generate actual code fixes. We realized we could automate the entire SEO fixing process.',
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-gray-950" />

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-blue-500">
                        {milestone.year} {milestone.quarter}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-400">
              The people building the future of SEO automation
            </p>
          </motion.div>

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
                bio: 'Ex-Google engineer with 10+ years building AI systems. Led the team that launched Claude integration.',
                avatar: 'SM',
              },
              {
                name: 'David Kim',
                role: 'Head of Product',
                bio: 'Former Shopify Product Manager. Obsessed with creating tools that developers and marketers both love.',
                avatar: 'DK',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-500 text-center mb-4">{member.role}</p>
                <p className="text-gray-400 text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Customer Success Stories
            </h2>
            <p className="text-xl text-gray-400">
              Real results from real businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                company: 'TechGear E-Commerce',
                industry: 'Consumer Electronics',
                challenge:
                  'Managing SEO for 5,000+ product pages was taking 40+ hours per week. Junior developers were making mistakes that hurt rankings.',
                solution:
                  'Switched to SEOLOGY.AI automatic mode. Every product page now gets optimized within minutes of being added to the catalog.',
                results: [
                  '320% increase in organic traffic',
                  '40 hours/week saved on SEO tasks',
                  '€50K/month additional revenue',
                ],
                quote:
                  'SEOLOGY.AI paid for itself in the first week. Our organic traffic tripled in 3 months.',
                author: 'Marcus Weber, Head of E-Commerce',
              },
              {
                company: 'ContentHub Media',
                industry: 'Digital Publishing',
                challenge:
                  'Publishing 50+ articles per week with no time for SEO optimization. Traffic was stagnant despite great content.',
                solution:
                  'Integrated SEOLOGY.AI with their WordPress workflow. Every new post gets automatically optimized before publication.',
                results: [
                  '250% increase in search visibility',
                  '95% of articles rank on page 1',
                  '2M additional pageviews/month',
                ],
                quote:
                  'We finally cracked SEO at scale. Our writers focus on content, SEOLOGY.AI handles the optimization.',
                author: 'Jennifer Park, Content Director',
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {story.company}
                  </h3>
                  <p className="text-blue-500">{story.industry}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-red-400 mb-2">
                      The Challenge
                    </p>
                    <p className="text-gray-400">{story.challenge}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-green-400 mb-2">
                      The Solution
                    </p>
                    <p className="text-gray-400">{story.solution}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-400 mb-3">
                      The Results
                    </p>
                    <ul className="space-y-2">
                      {story.results.map((result, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-300"
                        >
                          <TrendingUp className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-800">
                    <p className="text-gray-300 italic mb-2">"{story.quote}"</p>
                    <p className="text-sm text-gray-500">— {story.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Built on Cutting-Edge Technology
            </h2>
            <p className="text-xl text-gray-400">
              We leverage the best tools and platforms to deliver results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Claude 3.5 Sonnet',
                description:
                  "Anthropic's most advanced AI model powers our intelligent SEO analysis and fix generation.",
                tag: 'AI Engine',
              },
              {
                name: 'Next.js 14',
                description:
                  'Modern React framework for blazing-fast performance and seamless user experience.',
                tag: 'Frontend',
              },
              {
                name: 'PostgreSQL',
                description:
                  'Enterprise-grade database for reliable data storage and complex queries.',
                tag: 'Database',
              },
              {
                name: 'Vercel',
                description:
                  'Edge network deployment for global availability and sub-100ms response times.',
                tag: 'Infrastructure',
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {tech.name}
                  </h3>
                  <span className="px-3 py-1 bg-blue-600/10 text-blue-500 text-xs rounded-full">
                    {tech.tag}
                  </span>
                </div>
                <p className="text-gray-400">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-400 mb-8">
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {contact.title}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                </motion.div>
              ))}
            </div>

            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Automate Your SEO?"
        description="Join hundreds of businesses using SEOLOGY.AI to fix their SEO automatically"
        primaryCTA={{ text: 'Start Free Trial →', href: '/sign-up' }}
        secondaryCTA={{ text: 'View Pricing', href: '/pricing' }}
      />
    </>
  )
}
