import { Metadata } from 'next'
import { Newspaper, Download, TrendingUp, Users, DollarSign, Globe, Mail, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press Kit - SEOLOGY.AI',
  description: 'Media resources, press releases, and brand assets for SEOLOGY.AI. Download logos, get company facts, and contact our press team.',
}

export default function PressPage() {
  const pressReleases = [
    {
      date: 'January 15, 2025',
      title: 'SEOLOGY.AI Raises $12M Series A to Revolutionize AI-Powered SEO Automation',
      description: 'Led by Sequoia Capital, funding will accelerate platform expansion and AI capabilities.',
      link: '#',
    },
    {
      date: 'December 1, 2024',
      title: 'SEOLOGY.AI Surpasses 1,000 Active E-Commerce Stores',
      description: 'Platform now manages SEO for stores generating $500M+ in annual GMV.',
      link: '#',
    },
    {
      date: 'November 10, 2024',
      title: 'SEOLOGY.AI Launches AI-Powered Content Optimization',
      description: 'New Claude AI integration automatically optimizes product descriptions and meta content.',
      link: '#',
    },
    {
      date: 'October 5, 2024',
      title: 'SEOLOGY.AI Named "Best AI SEO Tool 2024" by TechCrunch',
      description: 'Recognition for innovation in automated SEO fix execution.',
      link: '#',
    },
  ]

  const companyFacts = [
    {
      icon: Users,
      stat: '1,000+',
      label: 'Active Stores',
      description: 'E-commerce businesses using SEOLOGY.AI',
    },
    {
      icon: TrendingUp,
      stat: '2.3M+',
      label: 'SEO Fixes Applied',
      description: 'Automated SEO improvements made',
    },
    {
      icon: DollarSign,
      stat: '$500M+',
      label: 'GMV Powered',
      description: 'Gross merchandise value managed',
    },
    {
      icon: Globe,
      stat: '45+',
      label: 'Countries',
      description: 'Global footprint and reach',
    },
  ]

  const brandAssets = [
    {
      title: 'Logo Pack',
      description: 'Full color, monochrome, and transparent background versions',
      format: 'PNG, SVG',
      size: '2.4 MB',
    },
    {
      title: 'Brand Guidelines',
      description: 'Color palette, typography, and usage guidelines',
      format: 'PDF',
      size: '8.1 MB',
    },
    {
      title: 'Product Screenshots',
      description: 'High-resolution dashboard and feature screenshots',
      format: 'PNG',
      size: '15.3 MB',
    },
    {
      title: 'Executive Photos',
      description: 'Professional headshots of founders and leadership',
      format: 'JPG',
      size: '4.2 MB',
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            Press & Media
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SEOLOGY.AI Press Kit
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Media resources, brand assets, and company information for journalists and content creators.
          </p>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">About SEOLOGY.AI</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                SEOLOGY.AI is the first AI-powered SEO platform that doesn't just identify issues—it automatically fixes them.
                Founded in 2024, we're revolutionizing how e-commerce businesses manage their SEO by using Claude AI to analyze,
                plan, and execute SEO improvements directly in content management systems.
              </p>
              <p>
                Unlike traditional SEO tools that only report problems, SEOLOGY.AI integrates with Shopify, WordPress, and
                custom websites to make permanent SEO changes automatically. Our platform has already applied over 2.3 million
                SEO fixes for stores generating $500M+ in annual revenue.
              </p>
              <p>
                The company is backed by Sequoia Capital, Y Combinator, and leading angels in the MarTech space. We're based
                in San Francisco with a distributed team across North America and Europe.
              </p>
            </div>
          </div>
        </div>

        {/* Company Facts */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Company Facts & Figures</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {companyFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <fact.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold mb-2">{fact.stat}</div>
                <div className="text-lg font-semibold mb-2">{fact.label}</div>
                <p className="text-sm text-slate-400">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-blue-400 mb-2">{release.date}</div>
                    <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                    <p className="text-slate-400 mb-4">{release.description}</p>
                    <a
                      href={release.link}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      Read Full Release
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Assets */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Brand Assets & Downloads</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {brandAssets.map((asset, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{asset.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{asset.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Format: {asset.format}</span>
                      <span>•</span>
                      <span>Size: {asset.size}</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Usage Guidelines:</strong> Our brand assets are available for editorial use by media,
              press, and content creators. Commercial use requires prior written approval. Please maintain proper spacing and don't
              modify colors or proportions. For questions, contact{' '}
              <a href="mailto:press@seology.ai" className="text-blue-400 hover:underline">
                press@seology.ai
              </a>
            </p>
          </div>
        </div>

        {/* Media Contact */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Media Inquiries</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  For interview requests, product demos, or additional information, please contact our press team.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white/80" />
                    <a href="mailto:press@seology.ai" className="text-white hover:underline font-medium">
                      press@seology.ai
                    </a>
                  </div>
                  <div className="text-sm text-white/70">
                    Response time: Within 24 hours
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Follow Our News</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Stay updated with our latest announcements, product launches, and company news.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://twitter.com/seologyai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 text-center border border-white/20"
                  >
                    Follow on Twitter
                  </a>
                  <a
                    href="https://linkedin.com/company/seologyai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 text-center border border-white/20"
                  >
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
