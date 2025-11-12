import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Link Building Strategies: 19 White-Hat Tactics for 2025',
  description: 'Outdated link building gets you penalized. These 19 white-hat strategies build authority without risk.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['guest-posting-seo-guide-2025', 'broken-link-building-tactics', 'digital-pr-seo-strategy', 'link-reclamation-guide-2025'].includes(post.slug)
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
            <span>Link Building Strategies</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Link Building Strategies: 19 White-Hat Tactics for 2025
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Marcus Chen</span>
            <span>•</span>
            <span>December 8, 2024</span>
          </div>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Outdated link building gets you penalized. These <strong className="text-white">19 white-hat strategies</strong> build authority without risk.
          </p>

          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Building Authority
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
              <ul className="space-y-2 mb-0">
                <li>Backlinks remain one of Google's top 3 ranking factors</li>
                <li>Quality beats quantity—one DR70+ link beats 100 DR20 links</li>
                <li>White-hat link building is the only safe long-term strategy</li>
                <li>Focus on earning links, not buying them</li>
                <li>These 19 tactics have built 10,000+ high-authority backlinks</li>
              </ul>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Link Building Still Matters in 2025</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Despite AI and algorithm updates, backlinks remain critical. Google confirmed backlinks are still a top 3 ranking factor.
                </p>
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">91%</div>
                    <div className="text-slate-700">Of pages get zero traffic due to no backlinks</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">3.8x</div>
                    <div className="text-slate-700">Higher rankings with quality backlinks</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">$77B</div>
                    <div className="text-slate-700">Link building industry size (2025)</div>
                  </div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The key is building links the right way—white-hat tactics that Google rewards, not penalizes.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">19 White-Hat Link Building Strategies</h2>

                <h3 className="text-2xl font-bold mb-4 mt-8">Content-Based Link Building</h3>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Skyscraper Technique</strong>
                      <p className="text-slate-700 mt-1">Find top-performing content, create something 10x better, outreach to linkers of original content.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Original Research & Data</strong>
                      <p className="text-slate-700 mt-1">Publish unique studies, surveys, or statistics. Media and bloggers link to original data.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Ultimate Guides</strong>
                      <p className="text-slate-700 mt-1">Comprehensive 5,000+ word guides become link magnets. Example: "The Complete Guide to [Topic]"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Infographics</strong>
                      <p className="text-slate-700 mt-1">Visual content earns 3x more backlinks. Provide embed code to make sharing easy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Free Tools & Calculators</strong>
                      <p className="text-slate-700 mt-1">Interactive tools naturally attract links. Example: ROI calculators, generators, converters.</p>
                    </div>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Outreach-Based Link Building</h3>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">6</div>
                    <div>
                      <strong className="text-xl">Guest Posting</strong>
                      <p className="text-slate-700 mt-1">Write high-quality guest posts for authoritative sites in your niche.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">7</div>
                    <div>
                      <strong className="text-xl">Broken Link Building</strong>
                      <p className="text-slate-700 mt-1">Find broken links on relevant sites, create replacement content, suggest your link.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">8</div>
                    <div>
                      <strong className="text-xl">Resource Page Link Building</strong>
                      <p className="text-slate-700 mt-1">Find resource pages in your niche, suggest adding your content.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">9</div>
                    <div>
                      <strong className="text-xl">HARO (Help A Reporter Out)</strong>
                      <p className="text-slate-700 mt-1">Answer journalist queries to earn high-authority media links.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">10</div>
                    <div>
                      <strong className="text-xl">Link Reclamation</strong>
                      <p className="text-slate-700 mt-1">Find unlinked brand mentions and ask sites to add a link.</p>
                    </div>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Relationship-Based Link Building</h3>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">11</div>
                    <div>
                      <strong className="text-xl">Digital PR</strong>
                      <p className="text-slate-700 mt-1">Create newsworthy stories that earn media coverage and links.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">12</div>
                    <div>
                      <strong className="text-xl">Podcast Appearances</strong>
                      <p className="text-slate-700 mt-1">Appear on industry podcasts. Most show notes include backlinks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">13</div>
                    <div>
                      <strong className="text-xl">Expert Roundups</strong>
                      <p className="text-slate-700 mt-1">Create roundup posts featuring industry experts. They'll share and link to it.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">14</div>
                    <div>
                      <strong className="text-xl">Testimonials & Reviews</strong>
                      <p className="text-slate-700 mt-1">Leave testimonials for tools/services you use. Many add backlinks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">15</div>
                    <div>
                      <strong className="text-xl">Partnerships & Collaborations</strong>
                      <p className="text-slate-700 mt-1">Partner with complementary businesses for cross-promotion and links.</p>
                    </div>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Community-Based Link Building</h3>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">16</div>
                    <div>
                      <strong className="text-xl">Forum & Community Participation</strong>
                      <p className="text-slate-700 mt-1">Be genuinely helpful in Reddit, Quora, industry forums. Add links when relevant.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">17</div>
                    <div>
                      <strong className="text-xl">Scholarship Programs</strong>
                      <p className="text-slate-700 mt-1">Create scholarships to earn .edu backlinks from universities.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">18</div>
                    <div>
                      <strong className="text-xl">Industry Directories</strong>
                      <p className="text-slate-700 mt-1">Submit to high-quality, niche-specific directories (not spammy ones).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">19</div>
                    <div>
                      <strong className="text-xl">Local Business Listings</strong>
                      <p className="text-slate-700 mt-1">Claim Google Business Profile, Yelp, industry associations for local links.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Link Quality Factors That Matter</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Not all backlinks are equal. Focus on these quality signals:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Domain Authority:</strong> Links from DR50+ sites carry more weight</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Relevance:</strong> Links from topically-related sites are stronger</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Anchor Text:</strong> Natural, varied anchor text (avoid exact-match spam)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Link Placement:</strong> Links in main content > sidebar > footer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Dofollow vs Nofollow:</strong> Dofollow links pass SEO value</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Link Velocity:</strong> Natural growth over time (not sudden spikes)</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Link Building Mistakes to Avoid</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Buying Links</strong>
                      <p className="text-slate-700 mt-1">Google penalizes paid links. Focus on earning them.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Link Farms & PBNs</strong>
                      <p className="text-slate-700 mt-1">Private blog networks are easy to detect and will get you penalized.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Exact Match Anchor Text</strong>
                      <p className="text-slate-700 mt-1">Over-optimized anchor text looks unnatural. Mix branded, generic, and URL anchors.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Low-Quality Directories</strong>
                      <p className="text-slate-700 mt-1">Spammy directories harm more than help.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Reciprocal Link Schemes</strong>
                      <p className="text-slate-700 mt-1">"You link to me, I link to you" at scale gets flagged.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Link Building Outreach Template</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Use this proven email template for outreach:
                </p>
                <div className="bg-slate-100 p-6 rounded-lg my-6">
                  <p className="text-slate-700 mb-4"><strong>Subject:</strong> Quick question about [their article]</p>
                  <p className="text-slate-700 mb-4">Hi [Name],</p>
                  <p className="text-slate-700 mb-4">I was reading your article "[Article Title]" and loved [specific detail].</p>
                  <p className="text-slate-700 mb-4">I noticed you mentioned [topic] but didn't link to any resources. I actually just published a comprehensive guide on [topic] that covers [unique value].</p>
                  <p className="text-slate-700 mb-4">Would you consider adding it as a resource? Here's the link: [URL]</p>
                  <p className="text-slate-700 mb-4">Either way, keep up the great content!</p>
                  <p className="text-slate-700 mb-0">[Your Name]</p>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Success rate:</strong> 8-15% response rate when personalized.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Final Verdict: Quality Over Quantity</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Link building takes time, but it's the only proven way to build long-term domain authority.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Focus on white-hat tactics that earn real, editorial links. One DR70 link is worth 100 DR20 links.
                </p>

                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to Build Authority?</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY helps identify link-building opportunities and tracks your backlink profile automatically.
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
                  {relatedPosts.map(post => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #LinkBuilding #Backlinks #OffPageSEO #WhiteHatSEO #DigitalPR
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
            {relatedPosts.slice(0, 4).map((post) => (
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
