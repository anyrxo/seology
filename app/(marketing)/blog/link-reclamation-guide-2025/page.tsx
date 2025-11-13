import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Link2, Link2Off, Search, Mail, AlertTriangle, TrendingUp } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Link Reclamation: Recover Lost Backlinks & Boost Authority',
  description: 'You\'re losing valuable backlinks every month. This guide shows how to reclaim broken, lost, and stolen links.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['broken-link-building-tactics', 'link-building-strategies-2025', 'toxic-backlink-removal-guide', 'anchor-text-optimization-strategy'].includes(post.slug)
  )

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Link Reclamation Guide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Link Reclamation: Recover Lost Backlinks & Boost Authority
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Marcus Chen</span>
            <span>•</span>
            <span>October 5, 2024</span>
            <span>•</span>
            <span>14 min read</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            You're losing valuable backlinks every month. This proven guide shows how to <strong className="text-white">reclaim broken, lost, and stolen links</strong>—and recover the authority you've already earned.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Automate Link Monitoring
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <p className="text-slate-700 mb-4">
                Most websites lose <strong>15-30% of their backlinks every year</strong> to broken links, removed content, site migrations, and content theft. Link reclamation is the process of finding and recovering these lost links—one of the highest-ROI link building tactics available.
              </p>
              <p className="text-slate-700 mb-0">
                <strong>Why it works:</strong> You've already earned these links once. Getting them back is 10x easier than building new links from scratch.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Link2Off className="w-8 h-8 text-blue-600" />
                  What Is Link Reclamation? (And Why It Matters)
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Link reclamation is the process of <strong>finding and recovering backlinks you've lost</strong>. Unlike traditional link building (which targets new links), link reclamation focuses on links you already earned but no longer benefit from.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Why You're Losing Backlinks</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Broken links (404 errors):</strong> Pages get deleted, URLs change, sites shut down</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Content updates:</strong> Someone updates an article and removes your link</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Site migrations:</strong> HTTP to HTTPS, domain changes, CMS migrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Nofollow conversions:</strong> Links change from dofollow to nofollow (losing SEO value)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Unlinked brand mentions:</strong> Someone mentions your brand but doesn't link</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Image theft:</strong> Sites use your images without attribution</span>
                  </li>
                </ul>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                  <p className="text-slate-700 mb-0">
                    <strong>The shocking truth:</strong> A study of 10,000 websites found that sites lose an average of <strong>9.1% of their backlinks every 6 months</strong>. That's nearly 20% per year—and most site owners never notice.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Search className="w-8 h-8 text-blue-600" />
                  Step 1: Find Your Lost & Broken Backlinks
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  You can't reclaim what you can't find. Here's how to uncover every lost backlink opportunity:
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Method 1: Google Search Console</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Google Search Console shows links pointing to broken pages on your site:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li><strong>1.</strong> Go to Google Search Console → Links → Top linking pages</li>
                    <li><strong>2.</strong> Look for pages with incoming links that now return 404 errors</li>
                    <li><strong>3.</strong> Export the list of referring domains</li>
                    <li><strong>4.</strong> Check which pages these links point to</li>
                  </ol>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Pro tip:</strong> Sort by "Linking sites" to prioritize high-authority domains.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Method 2: Backlink Analysis Tools</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Use tools like Ahrefs, SEMrush, or Moz to find lost links:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Ahrefs:</strong> Site Explorer → Backlinks → Lost backlinks (shows links that disappeared)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>SEMrush:</strong> Backlink Analytics → Lost backlinks report</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Moz:</strong> Link Explorer → Link Analysis → Lost domains</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Export these lists and prioritize by Domain Authority (DA) or Domain Rating (DR).
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Method 3: Crawl Your Own Site for Broken Pages</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Use Screaming Frog or Sitebulb to find pages returning 404/410 errors that have backlinks:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li><strong>1.</strong> Crawl your site with Screaming Frog</li>
                    <li><strong>2.</strong> Filter by Response Code → 404 errors</li>
                    <li><strong>3.</strong> Export the list of broken URLs</li>
                    <li><strong>4.</strong> Cross-reference with GSC or Ahrefs to see which have inbound links</li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Method 4: Monitor Competitor Lost Links</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Your competitors are losing links too. Steal them:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Run "Lost backlinks" report for competitors in Ahrefs/SEMrush</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Find links they lost that could also link to your content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Reach out with better, updated content</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Related Link Building Guides:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/broken-link-building-tactics" className="text-blue-600 hover:text-blue-800">Broken Link Building: Find & Replace Dead Links</Link></li>
                  <li><Link href="/blog/link-building-strategies-2025" className="text-blue-600 hover:text-blue-800">Link Building Strategies: 19 White-Hat Tactics</Link></li>
                  <li><Link href="/blog/toxic-backlink-removal-guide" className="text-blue-600 hover:text-blue-800">Toxic Backlink Removal Guide</Link></li>
                  <li><Link href="/blog/anchor-text-optimization-strategy" className="text-blue-600 hover:text-blue-800">Anchor Text Optimization Strategy</Link></li>
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #LinkReclamation #LinkBuilding #Backlinks #SEO #BrokenLinks #UnlinkedMentions #LinkMonitoring
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More Link Building Guides</h2>
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
