import { Metadata } from 'next'
import { CheckCircle, Clock, Rocket, Zap, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Product Roadmap - SEOLOGY.AI',
  description: 'See what we\'re building next. Our transparent roadmap shows completed features and what\'s coming to SEOLOGY.AI.',
}

export default function RoadmapPage() {
  const roadmapItems = [
    {
      status: 'shipped',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      items: [
        {
          title: 'Shopify Integration',
          description: 'Full OAuth integration with Shopify stores. Automatic SEO fixes applied directly to your store.',
          quarter: 'Q4 2024',
        },
        {
          title: 'WordPress Integration',
          description: 'Connect WordPress sites via REST API. Supports custom themes and popular page builders.',
          quarter: 'Q4 2024',
        },
        {
          title: 'AI-Powered SEO Analysis',
          description: 'Claude AI analyzes your entire site and identifies 150+ SEO issues in under 60 seconds.',
          quarter: 'Q4 2024',
        },
        {
          title: 'Automatic Fix Execution',
          description: 'Three execution modes: Automatic, Plan, and Approve. Choose how you want fixes applied.',
          quarter: 'Q4 2024',
        },
        {
          title: 'Real-Time Performance Monitoring',
          description: 'Track rankings, traffic, and SEO health 24/7 with automatic alerts.',
          quarter: 'Q4 2024',
        },
      ],
    },
    {
      status: 'in-progress',
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      items: [
        {
          title: 'Advanced Content Optimization',
          description: 'AI-powered content suggestions, readability improvements, and keyword optimization.',
          quarter: 'Q1 2025',
        },
        {
          title: 'Multi-Language Support',
          description: 'SEO optimization for international stores in 20+ languages.',
          quarter: 'Q1 2025',
        },
        {
          title: 'Competitor Analysis',
          description: 'Track competitor rankings, content strategies, and backlink profiles.',
          quarter: 'Q1 2025',
        },
      ],
    },
    {
      status: 'planned',
      icon: Rocket,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      items: [
        {
          title: 'WooCommerce Integration',
          description: 'Native WooCommerce support for WordPress e-commerce stores.',
          quarter: 'Q2 2025',
        },
        {
          title: 'BigCommerce Integration',
          description: 'Full integration with BigCommerce stores.',
          quarter: 'Q2 2025',
        },
        {
          title: 'AI Content Generation',
          description: 'Automatically generate SEO-optimized product descriptions, blog posts, and meta tags.',
          quarter: 'Q2 2025',
        },
        {
          title: 'Link Building Automation',
          description: 'AI-powered outreach and link building campaigns.',
          quarter: 'Q3 2025',
        },
        {
          title: 'Local SEO Automation',
          description: 'Optimize for local search with automatic citation management and Google Business Profile optimization.',
          quarter: 'Q3 2025',
        },
      ],
    },
    {
      status: 'future',
      icon: Target,
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/20',
      borderColor: 'border-slate-500/30',
      items: [
        {
          title: 'Mobile App',
          description: 'iOS and Android apps for managing SEO on the go.',
          quarter: 'Q4 2025',
        },
        {
          title: 'White Label Solution',
          description: 'Rebrand SEOLOGY for your agency or SaaS platform.',
          quarter: 'Q4 2025',
        },
        {
          title: 'API Access',
          description: 'Full API access for custom integrations and workflows.',
          quarter: 'Q4 2025',
        },
      ],
    },
  ]

  const statusLabels = {
    shipped: 'Shipped',
    'in-progress': 'In Progress',
    planned: 'Planned',
    future: 'Future',
  }

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Product Roadmap
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            See What We're Building
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Our transparent roadmap shows what we've shipped, what we're working on, and what's coming next to SEOLOGY.AI.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="max-w-5xl mx-auto space-y-12">
          {roadmapItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="relative">
              {/* Status Header */}
              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${section.borderColor}`}>
                <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <h2 className="text-2xl font-bold">{statusLabels[section.status as keyof typeof statusLabels]}</h2>
              </div>

              {/* Items Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`bg-white/5 backdrop-blur-sm border ${section.borderColor} rounded-xl p-6 hover:bg-white/10 transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <span className={`text-xs font-medium px-3 py-1 ${section.bgColor} ${section.color} rounded-full`}>
                        {item.quarter}
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to Influence Our Roadmap?</h3>
            <p className="text-lg mb-6 opacity-90">
              We build based on customer feedback. Join our community and vote on features you want to see next.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Request a Feature
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
