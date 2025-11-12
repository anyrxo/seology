import { Metadata } from 'next'
import { HandshakeIcon, Code, Building2, DollarSign, Users, Rocket, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Partners - SEOLOGY.AI',
  description: 'Join the SEOLOGY.AI partner ecosystem. Agency partnerships, integration partners, and affiliate programs available.',
}

export default function PartnersPage() {
  const partnerTypes = [
    {
      icon: Building2,
      title: 'Agency Partners',
      description: 'Offer SEOLOGY.AI to your clients and earn recurring revenue. White-label options available.',
      benefits: [
        'Up to 30% recurring commission',
        'Dedicated partner manager',
        'Co-marketing opportunities',
        'Priority support for your clients',
      ],
    },
    {
      icon: Code,
      title: 'Integration Partners',
      description: 'Build integrations with SEOLOGY.AI or become a featured platform integration.',
      benefits: [
        'Full API access',
        'Technical documentation',
        'Joint go-to-market strategy',
        'Featured in marketplace',
      ],
    },
    {
      icon: DollarSign,
      title: 'Affiliate Partners',
      description: 'Earn commissions by referring customers to SEOLOGY.AI through your content.',
      benefits: [
        '25% commission on first year',
        '90-day cookie window',
        'Marketing materials provided',
        'Real-time tracking dashboard',
      ],
    },
    {
      icon: Users,
      title: 'Reseller Partners',
      description: 'Resell SEOLOGY.AI under your brand with white-label options and volume discounts.',
      benefits: [
        'Volume-based discounts',
        'White-label branding',
        'Dedicated infrastructure',
        'Custom feature development',
      ],
    },
  ]

  const whyPartner = [
    {
      icon: Rocket,
      title: 'Growing Market',
      stat: '$80B',
      description: 'Global SEO market size by 2028. Get in on the AI-powered SEO revolution.',
    },
    {
      icon: Users,
      title: 'Proven Product',
      stat: '1,000+',
      description: 'Active stores already using SEOLOGY.AI with 98% satisfaction rate.',
    },
    {
      icon: DollarSign,
      title: 'Recurring Revenue',
      stat: '$50K+',
      description: 'Top partners earning over $50K/month in recurring commissions.',
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <HandshakeIcon className="w-4 h-4" />
            Partner Program
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Grow Your Business with SEOLOGY.AI
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Join our partner ecosystem and help businesses automate their SEO while earning recurring revenue.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Become a Partner
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Why Partner */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner with SEOLOGY.AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyPartner.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Types */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Partnership</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((partner, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <partner.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{partner.title}</h3>
                    <p className="text-slate-400">{partner.description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {partner.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Success Stories */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Partner Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8">
              <div className="text-4xl font-bold mb-2">$127K</div>
              <div className="text-lg font-semibold mb-4">Monthly Recurring Revenue</div>
              <p className="text-slate-300 text-sm leading-relaxed">
                "We integrated SEOLOGY.AI into our agency offering and it's now our #1 revenue driver. Clients love the automated SEO fixes."
              </p>
              <div className="mt-6 text-sm text-slate-400">
                — Digital Marketing Agency, Austin TX
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg font-semibold mb-4">Referred Customers</div>
              <p className="text-slate-300 text-sm leading-relaxed">
                "As an SEO content creator, SEOLOGY.AI's affiliate program has become a significant income stream. The product sells itself."
              </p>
              <div className="mt-6 text-sm text-slate-400">
                — SEO Influencer, 250K YouTube Subscribers
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-blue-500/20 border border-pink-500/30 rounded-2xl p-8">
              <div className="text-4xl font-bold mb-2">12x</div>
              <div className="text-lg font-semibold mb-4">Return on Partnership</div>
              <p className="text-slate-300 text-sm leading-relaxed">
                "Building the SEOLOGY.AI integration for our CMS was the best investment we made. Our users love the native SEO automation."
              </p>
              <div className="mt-6 text-sm text-slate-400">
                — CMS Platform, 50K+ Active Sites
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How to Become a Partner</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Apply', description: 'Submit partnership application' },
              { step: '2', title: 'Review', description: 'We review within 48 hours' },
              { step: '3', title: 'Onboard', description: 'Get access to partner portal' },
              { step: '4', title: 'Launch', description: 'Start earning revenue' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h3>
            <p className="text-lg mb-8 opacity-90">
              Join 200+ partners already growing their business with SEOLOGY.AI. Apply today and start earning within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                Apply for Partnership
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:partners@seology.ai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Email Partners Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
