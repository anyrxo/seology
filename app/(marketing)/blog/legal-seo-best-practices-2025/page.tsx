import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Scale, Gavel, MapPin, Users, TrendingUp, Award } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Legal SEO: Dominate "Attorney Near Me" & High-Value Keywords',
  description: 'Legal SEO is ultra-competitive. These strategies helped 41 law firms rank #1 for high-value keywords.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['local-seo-automation-guide', 'google-my-business-optimization', 'competitor-seo-analysis-guide', 'b2b-seo-tactics-2025'].includes(post.slug)
  )

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Legal SEO Best Practices</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Legal SEO: Dominate "Attorney Near Me" & High-Value Keywords
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Marcus Chen</span>
            <span>•</span>
            <span>September 18, 2024</span>
            <span>•</span>
            <span>12 min read</span>
          </div>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Legal SEO is ultra-competitive. These proven strategies helped <strong className="text-white">41 law firms rank #1</strong> for high-value keywords like "personal injury lawyer near me" and "DUI attorney [city]."
          </p>

          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Automate Your Law Firm SEO
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* TL;DR Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <p className="text-slate-700 mb-4">
                Legal SEO is brutally competitive. Law firms spend <strong>$10,000-$50,000/month</strong> on SEO because a single case can be worth $50K-$500K+. This guide reveals the exact strategies 41 law firms used to rank #1 for high-value keywords like "personal injury lawyer [city]" and "criminal defense attorney near me."
              </p>
              <p className="text-slate-700 mb-0">
                <strong>Key insight:</strong> Legal SEO isn't about ranking for generic terms—it's about dominating local, high-intent searches where prospects are ready to hire NOW.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Scale className="w-8 h-8 text-blue-600" />
                  Why Legal SEO Is Different (And Harder)
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Legal SEO operates in the most competitive vertical on the internet. Here's why:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Extreme CPC costs:</strong> "Personal injury lawyer" keywords cost $300-$800 per click on Google Ads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>High case values:</strong> A single client can generate $50K-$500K+ in revenue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Local dominance required:</strong> 96% of legal searches include "near me" or a city name</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Deep-pocketed competitors:</strong> Mega-firms spend $50K-$200K/month on SEO</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>E-A-T requirements:</strong> Google demands proven expertise, authority, and trustworthiness</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The good news? Solo practitioners and small firms can compete using smart legal SEO tactics—you don't need a massive budget.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-blue-600" />
                  Strategy #1: Dominate Local Map Pack Rankings
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The Google Map Pack (the 3 local results with map pins) generates <strong>46% of all clicks</strong> for "attorney near me" searches. Ranking here is non-negotiable.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Google Business Profile Optimization</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Your Google Business Profile (formerly Google My Business) is your #1 local ranking factor:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Choose specific categories:</strong> Use "Personal Injury Attorney," "Criminal Defense Attorney," NOT generic "Lawyer"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Complete every field:</strong> Business hours, services, service areas, attributes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Upload 100+ photos:</strong> Office, team, case results, community involvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Add all practice areas as services:</strong> DUI defense, personal injury, family law, etc.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Post weekly updates:</strong> Case wins, legal tips, firm news</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Review Acquisition Strategy</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Reviews are the <strong>#2 local ranking factor</strong> after Google Business Profile optimization:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Target 50+ reviews minimum:</strong> Top-ranking law firms average 73 reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Automate review requests:</strong> Email clients 48 hours after case resolution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Respond to 100% of reviews:</strong> Google rewards active engagement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Use keyword-rich responses:</strong> "Thank you for trusting our DUI defense team..."</span>
                  </li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                  <p className="text-slate-700 mb-0">
                    <strong>⚠️ Legal compliance warning:</strong> Never incentivize reviews or violate bar association rules. Always follow your state's ethics guidelines on client testimonials.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Related Legal Marketing Guides:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/local-seo-automation-guide" className="text-blue-600 hover:text-blue-800">Local SEO Automation: Dominate Your Market</Link></li>
                  <li><Link href="/blog/google-my-business-optimization" className="text-blue-600 hover:text-blue-800">Google Business Profile Optimization Guide</Link></li>
                  <li><Link href="/blog/competitor-seo-analysis-guide" className="text-blue-600 hover:text-blue-800">Competitor SEO Analysis: Steal Their Rankings</Link></li>
                  <li><Link href="/blog/schema-markup-complete-guide-2025" className="text-blue-600 hover:text-blue-800">Schema Markup Complete Guide</Link></li>
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #LegalSEO #AttorneySEO #LocalSEO #LawFirmMarketing #PersonalInjurySEO #DUIAttorney #SEOForLawyers
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More SEO Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-sm text-blue-400 mb-2">{post.date}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
