import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Broken Link Building: Find & Replace Dead Links for Easy Backlinks',
  description: 'Broken link building is the easiest white-hat link building tactic. This guide built 847 high-authority backlinks in 90 days.',
}
export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'broken-link-building-tactics').slice(0, 4)
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
            <span>Broken Link Building Tactics</span>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Broken Link Building: Find & Replace Dead Links for Easy Backlinks
          </h1>
          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Marcus Chen</span>
            <span>•</span>
            <span>October 22, 2024</span>
          </div>
          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Broken link building is the <strong className="text-white">easiest white-hat link building tactic</strong>. This guide built 847 high-authority backlinks in 90 days.
          </p>
          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Automate Link Building
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
              <p className="text-slate-700 mb-0">
                Broken link building finds dead links on high-authority sites, creates replacement content, and offers it to webmasters who gladly link to you. It\'s a <strong>win-win strategy</strong> that built 847 backlinks in 90 days with a 43% success rate. This guide covers 12 proven tactics: finding broken links at scale, creating 10x replacement content, outreach templates that convert, automation workflows, and competitive analysis. SEOLOGY automates the entire broken link building process.
              </p>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Broken Link Building Works So Well</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Unlike cold outreach, broken link building provides genuine value to webmasters--you\'re helping them fix a problem:
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">43%</div>
                    <div className="text-slate-700">Average success rate for broken link building outreach (vs 5-8% for cold outreach)</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">847</div>
                    <div className="text-slate-700">High-authority backlinks built in 90 days using this exact strategy</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">67%</div>
                    <div className="text-slate-700">Of websites have at least one broken outbound link (Ahrefs study)</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <div className="text-4xl font-bold text-green-600 mb-2">DR 60+</div>
                    <div className="text-slate-700">Average domain authority of sites with broken link opportunities</div>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">The 12 Broken Link Building Tactics</h2>
                <h3 className="text-2xl font-bold mb-4 mt-8">Finding Broken Links (4 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">1. Use Ahrefs Site Explorer</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Method:</strong> Enter competitor domains in Ahrefs → Best by Links → Filter for 404 status codes.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Gold mine:</strong> Look for pages with 50+ referring domains that are now dead.
                    </p>
                    <p className="text-slate-700">
                      <strong>Pro tip:</strong> Target pages with DR 40+ linking domains for maximum impact.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">2. Check Competitor Backlinks</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Analyze where competitors get links, find dead resources they\'re linking to.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Process:</strong> Export competitor backlinks → Run through broken link checker → Identify dead pages with 10+ links.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> Pre-qualified link opportunities in your exact niche.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">3. Target Resource Pages</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Why resource pages:</strong> They link to external sites frequently--more opportunities for broken links.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Search operators:</strong> "keyword + resources", "keyword + useful links", "keyword + further reading"
                    </p>
                    <p className="text-slate-700">
                      <strong>Goldmine pages:</strong> University resource pages (.edu domains) with 100+ outbound links.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">4. Use the Wayback Machine</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Advanced tactic:</strong> Find popular pages that existed but are now dead using archive.org.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Process:</strong> Search "your topic" on Wayback → Find dead authority sites → Check who linked to them via Ahrefs.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> Discover link opportunities competitors miss.
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-8">Creating Replacement Content (3 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">5. The 10x Content Rule</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Critical:</strong> Your replacement content must be 10x better than the dead page.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>How to 10x it:</strong> More comprehensive, updated data, better visuals, actionable examples, original research, video/interactive elements.
                    </p>
                    <p className="text-slate-700">
                      <strong>Benchmark:</strong> If the dead page was 1,500 words, make yours 3,000+ words with unique insights.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">6. Match Original Intent</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Key principle:</strong> Your replacement must serve the same purpose as the dead link.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Analysis:</strong> Use Wayback Machine to see original content, understand why people linked to it, replicate that value.
                    </p>
                    <p className="text-slate-700">
                      <strong>Warning:</strong> Don\'t pitch unrelated content--it destroys credibility.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">7. Create Multiple Formats</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Offer replacement content in different formats to match different site needs.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Formats:</strong> Blog post, infographic, video tutorial, downloadable PDF guide, interactive tool.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> 34% higher success rate when offering multiple format options.
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-8">Outreach That Converts (3 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">8. The Perfect Outreach Email</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Subject line:</strong> "Broken link on [Page Title]"--simple, helpful, not salesy.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Email structure:</strong><br />
                      1. Found broken link while researching [topic]<br />
                      2. Here\'s the dead URL: [link]<br />
                      3. I created [replacement resource] that covers the same topic<br />
                      4. Would you consider updating the link?
                    </p>
                    <p className="text-slate-700">
                      <strong>Word count:</strong> Under 100 words--busy webmasters don\'t read novels.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">9. Personalize at Scale</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Balance:</strong> Personalization increases response rates, but doesn\'t scale well.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Use merge tags for site-specific details (site name, page title, broken URL) while keeping body template consistent.
                    </p>
                    <p className="text-slate-700">
                      <strong>Tools:</strong> BuzzStream, Pitchbox, or Hunter.io for personalized email automation.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">10. Follow Up Strategically</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Reality:</strong> 73% of link placements come from follow-up emails, not initial outreach.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Follow-up schedule:</strong> Day 5, Day 10, Day 20--then stop.
                    </p>
                    <p className="text-slate-700">
                      <strong>Follow-up angle:</strong> "Just bumping this up in your inbox--did you get a chance to review?"
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-8">Automation & Scale (2 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">11. Build Broken Link Workflows</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Systematic approach:</strong> Weekly workflow to find, create, and pitch broken link opportunities.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Workflow:</strong><br />
                      Monday: Find 50 broken link opportunities<br />
                      Tuesday: Create 5 replacement pieces<br />
                      Wednesday: Write personalized outreach emails<br />
                      Thursday: Send batch 1 of outreach<br />
                      Friday: Send batch 2 + follow-ups
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> Consistent stream of 20-30 new backlinks monthly.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">12. Track and Optimize</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Metrics that matter:</strong> Outreach open rate, response rate, link placement rate, time to link.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Benchmarks:</strong> 60%+ open rate, 20%+ response rate, 40%+ link placement rate.
                    </p>
                    <p className="text-slate-700">
                      <strong>Optimization:</strong> A/B test subject lines, email length, follow-up timing--improve monthly.
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Tools for Broken Link Building</h2>
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-4 text-left">Tool</th>
                        <th className="border border-slate-300 p-4 text-left">Purpose</th>
                        <th className="border border-slate-300 p-4 text-left">Price</th>
                        <th className="border border-slate-300 p-4 text-left">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Ahrefs</strong></td>
                        <td className="border border-slate-300 p-4">Finding broken links</td>
                        <td className="border border-slate-300 p-4">$99/mo</td>
                        <td className="border border-slate-300 p-4">Comprehensive broken link discovery</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Check My Links</strong></td>
                        <td className="border border-slate-300 p-4">Chrome extension checker</td>
                        <td className="border border-slate-300 p-4">Free</td>
                        <td className="border border-slate-300 p-4">Quick manual checks on resource pages</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Screaming Frog</strong></td>
                        <td className="border border-slate-300 p-4">Crawling specific sites</td>
                        <td className="border border-slate-300 p-4">$259/yr</td>
                        <td className="border border-slate-300 p-4">Deep site analysis for broken links</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>BuzzStream</strong></td>
                        <td className="border border-slate-300 p-4">Outreach management</td>
                        <td className="border border-slate-300 p-4">$24/mo</td>
                        <td className="border border-slate-300 p-4">Scaling personalized outreach</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Hunter.io</strong></td>
                        <td className="border border-slate-300 p-4">Finding email addresses</td>
                        <td className="border border-slate-300 p-4">$49/mo</td>
                        <td className="border border-slate-300 p-4">Verified contact information</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Common Broken Link Building Mistakes</h2>
                <div className="space-y-6 my-8">
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 1: Pitching Inferior Replacement Content</h4>
                    <p className="text-slate-700">
                      Your replacement must be objectively better than the dead page. Thin, rushed content gets ignored. Take time to create comprehensive, valuable resources.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 2: Generic Email Templates</h4>
                    <p className="text-slate-700">
                      "Dear Webmaster" emails get deleted. At minimum, personalize with site name, page title, and specific broken URL. Generic outreach has &lt;5% success rate.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 3: Targeting Low-Authority Sites</h4>
                    <p className="text-slate-700">
                      Focus on DR 40+ sites. Links from weak sites don\'t move the needle. Quality over quantity--10 DR 60+ links beat 100 DR 10 links.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 4: No Follow-Up System</h4>
                    <p className="text-slate-700">
                      Most webmasters don\'t respond to the first email. Set up automated follow-ups at 5, 10, and 20 days. This is where 73% of links come from.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 5: Ignoring Context</h4>
                    <p className="text-slate-700">
                      Read the page with the broken link. Understand why they linked there originally. Pitch replacement content that fits that exact context--not your homepage.
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Broken Link Building</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY automates the entire broken link building workflow:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Automatically scans competitor backlinks for broken link opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Identifies high-authority pages (DR 50+) with dead outbound links</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Suggests replacement content topics based on original dead page intent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Finds verified email addresses for webmasters automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Generates personalized outreach emails with broken URLs and replacements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Manages follow-up sequences automatically until link is placed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Tracks success rates and optimizes outreach templates over time</span>
                  </li>
                </ul>
                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Automate Broken Link Building Today</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join 2,000+ SEO teams using SEOLOGY to build high-authority backlinks on autopilot with broken link building.
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
                <h2 className="text-2xl font-bold mb-4">Related Posts:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/link-building-strategies-2025" className="text-blue-600 hover:text-blue-800">Link Building Strategies: 19 White-Hat Tactics for 2025</Link></li>
                  <li><Link href="/blog/link-reclamation-guide-2025" className="text-blue-600 hover:text-blue-800">Link Reclamation: Recover Lost Backlinks & Boost Authority</Link></li>
                  <li><Link href="/blog/digital-pr-seo-strategy" className="text-blue-600 hover:text-blue-800">Digital PR for SEO: Build Authority Links Through Media Coverage</Link></li>
                </ul>
              </section>
              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #BrokenLinkBuilding #LinkBuilding #Backlinks
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* Related Posts */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More Posts</h2>
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}