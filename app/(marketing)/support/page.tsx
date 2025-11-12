import { Metadata } from 'next'
import { HelpCircle, MessageCircle, Mail, Book, Video, FileText, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support Center - SEOLOGY.AI',
  description: 'Get help with SEOLOGY.AI. Access documentation, tutorials, FAQs, and contact our support team.',
}

export default function SupportPage() {
  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time for immediate assistance.',
      availability: 'Mon-Fri, 9AM-6PM EST',
      action: 'Start Chat',
      href: '#chat',
      highlight: true,
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message and we\'ll respond within 24 hours.',
      availability: 'Response within 24 hours',
      action: 'Email Us',
      href: 'mailto:support@seology.ai',
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'Browse our comprehensive guides and API documentation.',
      availability: 'Always available',
      action: 'View Docs',
      href: '/docs',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides for common tasks.',
      availability: '20+ video tutorials',
      action: 'Watch Videos',
      href: '/docs#videos',
    },
  ]

  const commonIssues = [
    {
      icon: AlertCircle,
      title: 'Connection Issues',
      description: 'Unable to connect your Shopify or WordPress store?',
      solutions: [
        'Verify your store URL is correct',
        'Check that you\'ve granted all required permissions',
        'Try disconnecting and reconnecting',
        'Ensure your CMS is accessible and not in maintenance mode',
      ],
    },
    {
      icon: CheckCircle,
      title: 'SEO Fixes Not Applying',
      description: 'Fixes showing as complete but changes not visible?',
      solutions: [
        'Clear your browser cache and refresh',
        'Check your CMS theme hasn\'t been overridden',
        'Verify fix was approved if you\'re in Approve mode',
        'Check rollback history for any reverted changes',
      ],
    },
    {
      icon: Clock,
      title: 'Slow Analysis',
      description: 'Site analysis taking longer than expected?',
      solutions: [
        'Large sites (500+ pages) can take 10-15 minutes',
        'Check your site is accessible and not blocking our crawler',
        'Verify no rate limiting on your server',
        'Contact support if analysis exceeds 30 minutes',
      ],
    },
    {
      icon: Search,
      title: 'Missing Pages in Analysis',
      description: 'Some pages not being detected?',
      solutions: [
        'Check pages are in your sitemap.xml',
        'Verify pages aren\'t blocked by robots.txt',
        'Ensure pages are publicly accessible (not password protected)',
        'Check pages aren\'t marked as noindex',
      ],
    },
  ]

  const faqs = [
    {
      question: 'How long does it take to see SEO results?',
      answer: 'Most technical SEO fixes (meta tags, schema markup, etc.) are visible to search engines within 24-48 hours. However, ranking improvements typically take 2-4 weeks as search engines recrawl and reindex your site. Content-based improvements may take longer to show full impact.',
    },
    {
      question: 'Can I undo a fix if something goes wrong?',
      answer: 'Yes! Every fix includes a 90-day rollback window. You can instantly revert any change from your dashboard. We keep before/after snapshots of all modifications.',
    },
    {
      question: 'How many sites can I connect?',
      answer: 'It depends on your plan: Starter (3 sites), Growth (10 sites), Scale (unlimited). You can upgrade anytime as your needs grow.',
    },
    {
      question: 'Do you support custom/headless CMSs?',
      answer: 'For custom websites, use our Magic.js integration - a simple JavaScript snippet that enables SEO fixes on any site. For headless CMS, we offer API access on Growth and Scale plans.',
    },
    {
      question: 'What happens if I cancel my subscription?',
      answer: 'All fixes remain in place permanently. You\'ll lose access to new analysis and fixes, but your existing improvements stay active. You can export all fix history before canceling.',
    },
    {
      question: 'Is my CMS login data secure?',
      answer: 'Yes. We use 256-bit AES encryption and zero-knowledge architecture. Even our engineers cannot decrypt your credentials. For Shopify, we use OAuth (no password required).',
    },
    {
      question: 'Can SEOLOGY.AI damage my site?',
      answer: 'No. We only modify SEO-related content (meta tags, schema, alt text, etc.). We never touch your theme code, product prices, or business-critical functionality. Plus, all changes are reversible.',
    },
    {
      question: 'How does the AI analysis work?',
      answer: 'We use Claude AI (Anthropic) to analyze your site against 150+ SEO best practices. The AI understands context, industry-specific requirements, and provides intelligent recommendations tailored to your business.',
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Support Center
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            How Can We Help You?
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Get answers to your questions, solve common issues, or contact our support team for personalized help.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Support Channels */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <Link
                key={index}
                href={channel.href}
                className={`bg-white/5 backdrop-blur-sm border ${
                  channel.highlight ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-white/10'
                } rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative group`}
              >
                {channel.highlight && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                      Fastest
                    </span>
                  </div>
                )}
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <channel.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{channel.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{channel.description}</p>
                <div className="text-xs text-slate-500 mb-4">{channel.availability}</div>
                <div className="text-blue-400 font-medium text-sm group-hover:gap-2 transition-all flex items-center gap-1">
                  {channel.action}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Common Issues & Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {commonIssues.map((issue, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <issue.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{issue.title}</h3>
                    <p className="text-slate-400 text-sm">{issue.description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-slate-300">Try these solutions:</div>
                  {issue.solutions.map((solution, solutionIndex) => (
                    <div key={solutionIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-400">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-slate-400 leading-relaxed ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Helpful Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/docs"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Documentation</h3>
              <p className="text-slate-400 text-sm mb-4">
                Complete guides for setup, integrations, and advanced features.
              </p>
              <span className="text-purple-400 text-sm font-medium group-hover:gap-2 transition-all flex items-center gap-1">
                Browse Docs
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <Link
              href="/blog"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">SEO Blog</h3>
              <p className="text-slate-400 text-sm mb-4">
                Tips, strategies, and insights to improve your store's SEO.
              </p>
              <span className="text-pink-400 text-sm font-medium group-hover:gap-2 transition-all flex items-center gap-1">
                Read Blog
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <a
              href="https://status.seology.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">System Status</h3>
              <p className="text-slate-400 text-sm mb-4">
                Check current uptime and any ongoing incidents.
              </p>
              <span className="text-green-400 text-sm font-medium group-hover:gap-2 transition-all flex items-center gap-1">
                View Status
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-lg mb-8 opacity-90">
              Our support team is here to help. Get in touch and we\'ll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@seology.ai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Email Support
              </a>
              <a
                href="#chat"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                Start Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
