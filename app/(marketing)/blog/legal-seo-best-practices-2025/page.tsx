import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Scale, Gavel, MapPin, Users, TrendingUp, Award, Star, Search, FileText, Target, DollarSign } from 'lucide-react'
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
            <span>18 min read</span>
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
                <strong>Key insight:</strong> Legal SEO isn\'t about ranking for generic terms—it\'s about dominating local, high-intent searches where prospects are ready to hire NOW.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Scale className="w-8 h-8 text-blue-600" />
                  Why Legal SEO Is Different (And Harder)
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Legal SEO operates in the most competitive vertical on the internet. Here\'s why:
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
                  The good news? Solo practitioners and small firms can compete using smart legal SEO tactics—you don\'t need a massive budget.
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
                    <strong>⚠️ Legal compliance warning:</strong> Never incentivize reviews or violate bar association rules. Always follow your state\'s ethics guidelines on client testimonials.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  Strategy #2: Content Marketing for Law Firms
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Content marketing establishes your expertise and captures searchers in the research phase—before they contact competitors.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">The Legal Content Framework</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Practice Area Pillar Pages</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Create comprehensive 3,000+ word guides for each practice area (DUI defense, personal injury, family law, etc.)
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Include:</strong> Process overview, common questions, case examples, fee structures, local laws, success rates
                    </p>
                    <p className="text-slate-700">
                      <strong>Example:</strong> "Complete Guide to DUI Defense in [City]: Process, Costs & Success Rates"
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Local Legal Guides</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Target hyperlocal keywords like "how long does a divorce take in [county]"
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Topics:</strong> Local court procedures, county-specific laws, local judge information, courthouse guides
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> These low-competition keywords convert extremely well because they capture high-intent local searchers
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Case Study Content</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Format:</strong> "How We Won a $2.3M Settlement for [Injury Type] Victim"
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Structure:</strong> Initial situation, legal challenges, strategy used, outcome achieved, lessons learned
                    </p>
                    <p className="text-slate-700">
                      <strong>SEO benefit:</strong> Ranks for long-tail keywords + demonstrates expertise for E-A-T
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">FAQ Content Strategy</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Tactic:</strong> Create dedicated pages answering specific legal questions (target featured snippets)
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Keywords:</strong> "What happens if you refuse a breathalyzer in [state]?" "How much does a DUI lawyer cost?"
                    </p>
                    <p className="text-slate-700">
                      <strong>Implementation:</strong> Use FAQ schema markup to appear in position zero
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Content Publishing Schedule</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Consistent publishing signals active expertise to Google:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Minimum frequency:</strong> 2 blog posts per week (8 per month)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Content mix:</strong> 50% informational guides, 30% local content, 20% case studies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Update strategy:</strong> Refresh top 10 posts every 3 months with new data</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  Strategy #3: Legal Directory Optimization
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Legal directories provide high-authority backlinks AND drive direct leads. But most lawyers waste them.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Top-Tier Legal Directories (Must Be On)</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <span><strong>Avvo:</strong> DA 89 - Complete profile, get client reviews, answer Q&A questions for visibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <span><strong>Justia:</strong> DA 91 - Free listing, add practice areas, publish blog content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <span><strong>FindLaw:</strong> DA 88 - Premium directory, strong for personal injury and criminal defense</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <span><strong>Martindale-Hubbell:</strong> DA 84 - Oldest legal directory, emphasize peer reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <span><strong>Lawyers.com:</strong> DA 87 - Part of Martindale, complete Q&A section for visibility</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Directory Profile Optimization</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <p className="text-slate-700 mb-4">
                    <strong>Complete every field:</strong> Most lawyers leave 60% of fields blank—this is free SEO equity!
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Practice areas (be specific—not just "Criminal Law" but "DUI Defense," "Drug Charges," etc.)</li>
                    <li>• Bar admissions (include year admitted, state bar number)</li>
                    <li>• Education (law school, undergrad, graduation years)</li>
                    <li>• Professional associations (ABA, state bar, specialty organizations)</li>
                    <li>• Languages spoken (multilingual = more cases)</li>
                    <li>• Publications and speaking engagements (builds authority)</li>
                    <li>• Case results (where ethically allowed)</li>
                    <li>• Awards and recognition</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">State & Local Bar Directories</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Don\'t ignore official bar association directories:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>State bar websites:</strong> High DA backlinks from .org domains</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>County bar associations:</strong> Local SEO boost for county-specific searches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Specialty bar groups:</strong> Trial lawyers, family law specialists, etc.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  Strategy #4: Competitive Analysis & Keyword Gaps
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Your competitors are ranking for hundreds of keywords you\'re missing. Here\'s how to steal their rankings:
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Competitive Keyword Gap Analysis</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <p className="text-slate-700 mb-4">
                    <strong>Step-by-step process:</strong>
                  </p>
                  <ol className="space-y-3 text-slate-700">
                    <li><strong>1. Identify top 3 competitors:</strong> Google "[practice area] lawyer [city]" and note who ranks #1-3</li>
                    <li><strong>2. Run competitor analysis:</strong> Use Ahrefs or SEMrush to see all keywords they rank for</li>
                    <li><strong>3. Filter keyword gaps:</strong> Find keywords they rank for that you don\'t (especially positions 1-10)</li>
                    <li><strong>4. Prioritize by search volume:</strong> Focus on keywords with 100+ monthly searches</li>
                    <li><strong>5. Create better content:</strong> Analyze their ranking page, identify weaknesses, create superior content</li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Backlink Gap Analysis</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Find who links to competitors but not to you:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Tool:</strong> Ahrefs "Link Intersect" tool (shows sites linking to 2+ competitors but not you)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Outreach strategy:</strong> Contact these sites with better content or expertise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Low-hanging fruit:</strong> Prioritize DA 30+ sites with existing legal content</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">SERP Feature Opportunities</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Identify SERP features competitors own that you can steal:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Featured snippets:</strong> Competitors ranking in position zero for question keywords</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>People Also Ask:</strong> Expand PAA boxes to find content opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Local Pack:</strong> If competitors rank in map pack, analyze their GBP optimization</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                  Strategy #5: Integrating SEO with Google Ads
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Most law firms treat SEO and PPC as separate channels. Smart firms use PPC data to dominate organic search.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Using PPC Data for SEO Strategy</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Test Keywords with Paid Search First</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Run Google Ads campaigns for 30 days before investing in SEO content
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Why:</strong> PPC shows which keywords actually convert into consultations, not just traffic
                    </p>
                    <p className="text-slate-700">
                      <strong>Action:</strong> Only create SEO content for keywords with 5%+ conversion rate in PPC
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Steal Competitor PPC Keywords</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Tool:</strong> SEMrush Advertising Research shows competitors\' paid keywords
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Insight:</strong> If competitors are paying $500/click, those keywords have high case value
                    </p>
                    <p className="text-slate-700">
                      <strong>SEO play:</strong> Target these expensive PPC keywords organically to capture free traffic
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Dominate Both Paid & Organic</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Tactic:</strong> For your highest-value keywords, rank both organically AND run PPC ads
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Benefit:</strong> Studies show owning both positions increases total clicks by 89%
                    </p>
                    <p className="text-slate-700">
                      <strong>Execution:</strong> Once you rank #1-3 organically, still run PPC to dominate the entire first page
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Landing Page Optimization Insights</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  PPC landing page tests inform organic page optimization:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Test CTAs:</strong> Which call-to-action converts best? ("Free Consultation" vs "Call Now")</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Test content length:</strong> Do longer or shorter pages convert better for different practice areas?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Test trust signals:</strong> Attorney photos, client reviews, case results, credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Apply winning elements:</strong> Implement PPC winners on organic landing pages</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  Strategy #6: Building Legal Authority & E-A-T
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Google heavily weighs expertise for legal content (YMYL - Your Money Your Life). Build demonstrable authority:
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Attorney Author Profiles</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Dedicated author pages:</strong> Create /attorney/[name] pages with full bios, credentials, publications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Link all content to authors:</strong> Every blog post shows "Written by [Attorney Name, JD]"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Schema markup:</strong> Implement Person schema with credentials, education, affiliations</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Media Mentions & PR</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Get featured in news outlets to build third-party authority:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>HARO (Help a Reporter Out):</strong> Respond to journalist requests for legal expertise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Local news commentary:</strong> Offer expert opinions on local legal news stories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Legal publications:</strong> Write for Law360, ABA Journal, state bar publications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Display mentions:</strong> Create "As Seen In" section with logos of media outlets</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Speaking & Teaching</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Speaking engagements signal authority to Google and humans:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>CLE presentations:</strong> Teach continuing legal education courses (peer recognition)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Legal conferences:</strong> Speak at state bar conferences or specialty conferences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Community education:</strong> Host free legal clinics or workshops (generates local press)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Document everything:</strong> Add speaking engagements to your website with event details</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Legal SEO Mistakes to Avoid</h2>
                <div className="space-y-6 my-8">
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 1: Thin Practice Area Pages</h4>
                    <p className="text-slate-700">
                      <strong>Problem:</strong> Most law firm practice area pages are 200-300 words of generic content that doesn\'t rank. <strong>Solution:</strong> Create comprehensive 2,000+ word guides with local information, case examples, FAQs, and process overviews.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 2: Ignoring Negative Reviews</h4>
                    <p className="text-slate-700">
                      <strong>Problem:</strong> Unanswered negative reviews hurt both conversion rates and local rankings. <strong>Solution:</strong> Respond professionally to ALL reviews within 24 hours, especially negative ones. Addressing concerns publicly shows professionalism.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 3: No Local Schema Markup</h4>
                    <p className="text-slate-700">
                      <strong>Problem:</strong> Missing LocalBusiness and Attorney schema means Google can\'t understand your practice areas and service areas. <strong>Solution:</strong> Implement comprehensive schema including LegalService, Attorney, LocalBusiness, and FAQPage markup.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 4: Duplicate Content Across Locations</h4>
                    <p className="text-slate-700">
                      <strong>Problem:</strong> Multi-location firms often copy the same content across location pages, triggering duplicate content penalties. <strong>Solution:</strong> Create unique content for each location with specific local information, directions, parking, local court info.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 5: Slow Website Speed</h4>
                    <p className="text-slate-700">
                      <strong>Problem:</strong> Law firm sites often have massive image sliders and videos that kill page speed. <strong>Solution:</strong> Optimize all images, lazy load videos, use a CDN, target sub-2 second load times on mobile.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Legal SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY handles all technical legal SEO optimizations automatically:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Automatically optimizes practice area pages with local schema markup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Monitors and alerts for Google Business Profile changes and review responses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Generates local content suggestions based on competitor analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Optimizes title tags and meta descriptions for high-intent legal keywords</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Implements Attorney and LegalService schema automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Tracks local pack rankings and competitor movements daily</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Dominate Legal Search in Your Market</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join 41+ law firms using SEOLOGY to rank #1 for their highest-value keywords and generate consistent case flow.
                  </p>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    Try SEOLOGY Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
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
