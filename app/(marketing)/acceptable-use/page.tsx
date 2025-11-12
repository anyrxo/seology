import { Metadata } from 'next'
import { Shield, AlertTriangle, CheckCircle, XCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy - SEOLOGY.AI',
  description: 'Learn about acceptable use of SEOLOGY.AI services and prohibited activities.',
}

export default function AcceptableUsePage() {
  const prohibitedUses = [
    {
      title: 'Illegal Activities',
      description: 'Using SEOLOGY.AI for any illegal purpose or to facilitate illegal activities.',
      examples: [
        'Distributing malware or viruses',
        'Fraudulent or deceptive practices',
        'Violation of intellectual property rights',
        'Activities prohibited by local, state, or federal law',
      ],
    },
    {
      title: 'Abusive Content',
      description: 'Creating or promoting harmful, offensive, or discriminatory content.',
      examples: [
        'Hate speech or discriminatory content',
        'Harassment, threats, or intimidation',
        'Adult or explicit content',
        'Content promoting violence or self-harm',
      ],
    },
    {
      title: 'Platform Abuse',
      description: 'Actions that interfere with or disrupt SEOLOGY.AI services or other users.',
      examples: [
        'Attempting to bypass security measures',
        'Reverse engineering or decompiling software',
        'Excessive API calls or resource consumption',
        'Automated scraping without authorization',
      ],
    },
    {
      title: 'Spam & Manipulation',
      description: 'Using SEOLOGY.AI to engage in spam, manipulation, or deceptive practices.',
      examples: [
        'Creating doorway or spam pages',
        'Keyword stuffing or cloaking',
        'Link schemes or paid links without disclosure',
        'Deceptive redirects or hidden content',
      ],
    },
  ]

  const acceptableUses = [
    {
      title: 'Legitimate SEO',
      description: 'Using SEOLOGY.AI to improve your website\'s search visibility through ethical, white-hat SEO practices.',
    },
    {
      title: 'Content Optimization',
      description: 'Optimizing content, meta tags, and structured data to help search engines understand your site better.',
    },
    {
      title: 'Technical Improvements',
      description: 'Fixing technical SEO issues like broken links, slow pages, and mobile usability problems.',
    },
    {
      title: 'Educational Use',
      description: 'Learning SEO best practices and testing optimization strategies on your own properties.',
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Acceptable Use Policy
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Acceptable Use Policy
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Guidelines for using SEOLOGY.AI services responsibly and ethically. Last updated: January 15, 2025.
          </p>
        </div>

        {/* Overview */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Policy Overview</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              This Acceptable Use Policy ("Policy") governs your use of SEOLOGY.AI services. By using our platform,
              you agree to comply with this Policy. We reserve the right to investigate and take appropriate action
              against anyone who violates this Policy, including suspending or terminating accounts without notice.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Our goal is to maintain a safe, secure, and ethical platform for all users while promoting white-hat
              SEO practices that benefit the broader internet ecosystem.
            </p>
          </div>
        </div>

        {/* Acceptable Uses */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What You Can Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {acceptableUses.map((use, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{use.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{use.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prohibited Uses */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Prohibited Activities</h2>
          <div className="space-y-8">
            {prohibitedUses.map((prohibition, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <XCircle className="w-7 h-7 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{prohibition.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{prohibition.description}</p>
                  </div>
                </div>
                <div className="ml-16">
                  <div className="text-sm font-semibold text-slate-400 mb-3">Examples of prohibited activities:</div>
                  <div className="space-y-2">
                    {prohibition.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-slate-400">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Guidelines */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Compliance with Search Engine Guidelines</h2>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8">
            <p className="text-slate-300 leading-relaxed mb-4">
              SEOLOGY.AI is designed to help you comply with search engine webmaster guidelines, including:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Google Search Essentials',
                  description: 'We follow Google\'s technical, content, and quality guidelines.',
                },
                {
                  title: 'Bing Webmaster Guidelines',
                  description: 'Our practices align with Bing\'s quality standards.',
                },
                {
                  title: 'White-Hat SEO Only',
                  description: 'We never implement black-hat or manipulative SEO tactics.',
                },
                {
                  title: 'User-First Content',
                  description: 'All optimizations prioritize user experience and value.',
                },
              ].map((guideline, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">{guideline.title}</h3>
                    <p className="text-sm text-slate-400">{guideline.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enforcement */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Policy Enforcement</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                  Violations & Consequences
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Violations of this Acceptable Use Policy may result in:
                </p>
                <ul className="space-y-2 ml-6">
                  {[
                    'Warning and requirement to cease prohibited activity',
                    'Temporary suspension of account access',
                    'Permanent account termination',
                    'Referral to law enforcement for illegal activities',
                    'Legal action to recover damages',
                  ].map((consequence, index) => (
                    <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{consequence}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold mb-3">Reporting Violations</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you become aware of any violation of this Policy, please report it to our Trust & Safety team:
                </p>
                <a
                  href="mailto:abuse@seology.ai"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  abuse@seology.ai
                </a>
                <p className="text-sm text-slate-400 mt-3">
                  We investigate all reports and take appropriate action within 48 hours.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold mb-3">Appeals</h3>
                <p className="text-slate-300 leading-relaxed">
                  If your account is suspended or terminated, you may appeal the decision by contacting{' '}
                  <a href="mailto:appeals@seology.ai" className="text-blue-400 hover:underline">
                    appeals@seology.ai
                  </a>
                  . We will review your appeal and respond within 5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">Policy Updates</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              We may update this Acceptable Use Policy from time to time to reflect changes in our services, legal
              requirements, or best practices. We will notify you of material changes via:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              {[
                'Email notification to your registered address',
                'In-app notification when you log in',
                'Prominent notice on our website',
              ].map((method, index) => (
                <li key={index} className="text-slate-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {method}
                </li>
              ))}
            </ul>
            <p className="text-slate-400 text-sm">
              Continued use of SEOLOGY.AI after policy updates constitutes acceptance of the revised terms.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Questions About This Policy?</h3>
            <p className="text-lg mb-8 opacity-90">
              If you have questions about our Acceptable Use Policy or need clarification on what's permitted,
              our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@seology.ai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Contact Legal Team
              </a>
              <a
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Visit Support Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
