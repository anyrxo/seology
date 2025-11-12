import { Metadata } from 'next'
import { TrendingUp, Users, DollarSign, Target, ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies - SEOLOGY.AI',
  description: 'Real-world success stories from SEOLOGY.AI customers. See how businesses increased organic traffic, rankings, and revenue with AI-powered SEO automation.',
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      company: 'Luxe Furniture',
      industry: 'E-commerce - Home Goods',
      logo: '🛋️',
      gradient: 'from-blue-500 to-purple-500',
      challenge: 'Struggling with low organic traffic despite having 2,000+ products. Manual SEO efforts were too slow and inconsistent.',
      solution: 'Implemented SEOLOGY.AI in Automatic mode to fix 847 SEO issues across product pages, collections, and blog posts.',
      results: [
        { metric: 'Organic Traffic', value: '+347%', period: '6 months' },
        { metric: 'Keyword Rankings', value: '1,200+', period: 'Top 10 positions' },
        { metric: 'Revenue from SEO', value: '+$280K', period: 'Annual increase' },
        { metric: 'Time Saved', value: '120 hours', period: 'Per month' },
      ],
      testimonial: "SEOLOGY.AI transformed our organic traffic overnight. What would have taken our team 6 months was done automatically in 3 days. The ROI is incredible.",
      author: 'Sarah Chen, Head of Marketing',
    },
    {
      company: 'Peak Performance Apparel',
      industry: 'E-commerce - Fashion',
      logo: '👕',
      gradient: 'from-purple-500 to-pink-500',
      challenge: 'Launching new seasonal collections weekly but SEO wasn\'t keeping pace. Missing out on time-sensitive search traffic.',
      solution: 'Used SEOLOGY.AI to automatically optimize new products within hours of launch, ensuring immediate search visibility.',
      results: [
        { metric: 'Launch Day Traffic', value: '+520%', period: 'First 24 hours' },
        { metric: 'Product Discovery', value: '+89%', period: 'Via organic search' },
        { metric: 'Conversion Rate', value: '+42%', period: 'Organic visitors' },
        { metric: 'SEO Workload', value: '-95%', period: 'Automation savings' },
      ],
      testimonial: "We launch 20+ new products weekly. SEOLOGY.AI ensures each one is SEO-optimized from day one. It's like having a full SEO team working 24/7.",
      author: 'Marcus Rodriguez, E-commerce Director',
    },
    {
      company: 'GreenLeaf Organics',
      industry: 'E-commerce - Health & Wellness',
      logo: '🌿',
      gradient: 'from-green-500 to-teal-500',
      challenge: 'Competing in a crowded organic products market. Needed to differentiate and capture long-tail keywords.',
      solution: 'SEOLOGY.AI\'s Claude AI analysis identified 300+ niche keyword opportunities and automatically implemented structured data and content optimizations.',
      results: [
        { metric: 'Long-tail Rankings', value: '+890', period: 'New keywords' },
        { metric: 'Organic Sessions', value: '+423%', period: '9 months' },
        { metric: 'Customer Acquisition Cost', value: '-67%', period: 'SEO vs. Paid' },
        { metric: 'Market Share', value: 'Top 3', period: 'Organic search' },
      ],
      testimonial: "The AI found keyword opportunities we never would have discovered manually. Our organic reach has exploded and customer acquisition costs have plummeted.",
      author: 'Jennifer Wu, Founder & CEO',
    },
  ]

  const industries = [
    { name: 'E-commerce', icon: '🛒', count: '500+' },
    { name: 'SaaS', icon: '💻', count: '200+' },
    { name: 'B2B Services', icon: '🏢', count: '150+' },
    { name: 'Healthcare', icon: '⚕️', count: '80+' },
    { name: 'Education', icon: '🎓', count: '70+' },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Customer Success Stories
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Real Results from Real Businesses
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            See how SEOLOGY.AI customers are achieving massive organic growth with AI-powered SEO automation.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, stat: '347%', label: 'Avg. Traffic Increase' },
              { icon: Users, stat: '1,000+', label: 'Success Stories' },
              { icon: DollarSign, stat: '$50M+', label: 'Revenue Impact' },
              { icon: Target, stat: '98%', label: 'Customer Satisfaction' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold mb-2">{item.stat}</div>
                <div className="text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="max-w-7xl mx-auto mb-20 space-y-20">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${study.gradient} p-8`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl">{study.logo}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{study.company}</h2>
                    <div className="text-white/90 font-medium">{study.industry}</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-red-400">The Challenge</h3>
                    <p className="text-slate-300 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-green-400">The Solution</h3>
                    <p className="text-slate-300 leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-6">The Results</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {study.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                      >
                        <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                          {result.value}
                        </div>
                        <div className="text-sm font-medium mb-1">{result.metric}</div>
                        <div className="text-xs text-slate-500">{result.period}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <Quote className="w-8 h-8 text-blue-400 mb-4" />
                  <p className="text-slate-300 leading-relaxed mb-4 italic">"{study.testimonial}"</p>
                  <div className="text-sm text-slate-400">— {study.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industries Served */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-bold mb-2">{industry.name}</h3>
                <div className="text-sm text-slate-400">{industry.count} customers</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">2.3M+</div>
                <div className="text-slate-400">SEO Fixes Applied</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">$500M+</div>
                <div className="text-slate-400">GMV Under Management</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">45+</div>
                <div className="text-slate-400">Countries Worldwide</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-lg mb-8 opacity-90">
              Join 1,000+ businesses already growing their organic traffic with SEOLOGY.AI. Start your 14-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Watch Demo
              </Link>
            </div>
            <p className="text-sm text-white/70 mt-6">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
