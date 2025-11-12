import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'E-A-T Signals: Build Expertise, Authority & Trust for Rankings',
  description: 'E-A-T determines rankings for YMYL sites. This guide shows how to build E-A-T signals Google actually recognizes.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ["link-building-strategies-2025","digital-pr-seo-strategy","content-optimization-ai-vs-manual"].includes(post.slug)
  ).slice(0, 4)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>E-A-T Signals</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            E-A-T Signals: Build Expertise, Authority & Trust for Rankings
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>July 25, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            E-A-T determines rankings for YMYL sites. This guide shows how to build E-A-T signals Google actually recognizes.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Optimizing with SEOLOGY
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
              <p className="text-slate-700 mb-0">
                E-A-T determines rankings for YMYL sites. This guide shows how to build E-A-T signals Google actually recognizes. SEOLOGY automates this entire optimization process—delivering proven results without manual work.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why This Matters for Your SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  E-A-T Signals is critical for modern SEO success. Here's why this optimization drives real rankings and revenue:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Direct Ranking Impact:</strong> Google's algorithm actively measures and rewards this optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>User Experience:</strong> Better UX signals translate directly to higher search visibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Competitive Advantage:</strong> Most sites ignore this—giving you an easy win</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Long-Term Value:</strong> This optimization compounds over time for sustained growth</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The Complete Implementation Strategy</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Follow this proven framework to implement e-a-t signals correctly:
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-900 mb-2">Step 1: Audit</div>
                    <div className="text-slate-700">Identify current gaps and opportunities across your entire site</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-900 mb-2">Step 2: Prioritize</div>
                    <div className="text-slate-700">Focus on high-impact pages first for maximum ROI</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-2xl font-bold text-pink-900 mb-2">Step 3: Implement</div>
                    <div className="text-slate-700">Apply optimizations using proven best practices</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-900 mb-2">Step 4: Monitor</div>
                    <div className="text-slate-700">Track results and iterate for continuous improvement</div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Ignoring Mobile:</strong>
                      <p className="text-slate-700 mt-1">60% of traffic is mobile—always test on mobile devices first</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Over-Optimization:</strong>
                      <p className="text-slate-700 mt-1">Going too far triggers penalties—balance is key</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Neglecting Testing:</strong>
                      <p className="text-slate-700 mt-1">Always validate changes before deploying site-wide</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates This Optimization</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Manual optimization is time-consuming and error-prone. SEOLOGY handles everything automatically:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Automated Audits:</strong> Continuously scans your entire site for optimization opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Intelligent Implementation:</strong> AI applies best practices across all pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Real-Time Monitoring:</strong> Tracks performance and adjusts automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Zero Manual Work:</strong> No coding or technical skills required</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Automate Your E-A-T Signals Optimization</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY implements e-a-t signals automatically—boosting rankings without manual work.
                  </p>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Related Posts:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/link-building-strategies-2025" className="text-blue-600 hover:text-blue-800">Link Building Strategies 2025</Link></li>
                  <li><Link href="/blog/digital-pr-seo-strategy" className="text-blue-600 hover:text-blue-800">Digital Pr Seo Strategy</Link></li>
                  <li><Link href="/blog/content-optimization-ai-vs-manual" className="text-blue-600 hover:text-blue-800">Content Optimization Ai Vs Manual</Link></li>
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #SEO #eat #SEOLOGY #SEOAutomation
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

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
