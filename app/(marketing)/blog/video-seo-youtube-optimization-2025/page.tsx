import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Video SEO: YouTube Optimization Guide for Maximum Rankings',
  description: 'Video drives 82% of web traffic. This guide shows how to rank videos on YouTube and Google with proven optimization tactics.',
}
export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['faq-schema-implementation-guide', 'google-analytics-4-seo-tracking', 'content-optimization-ai-vs-manual'].includes(post.slug)
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
            <span>Video SEO</span>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Video SEO: YouTube Optimization Guide for Maximum Rankings
          </h1>
          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Marcus Chen</span>
            <span>•</span>
            <span>September 10, 2024</span>
          </div>
          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Video drives <strong className="text-white">82% of web traffic</strong>. This guide shows how to rank videos on YouTube and Google with proven optimization tactics.
          </p>
          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try SEOLOGY Free
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
                Video content is dominating search results. By 2025, video will account for <strong>82% of all web traffic</strong>. This comprehensive guide shows you how to optimize videos for both YouTube and Google search, rank in video carousels, and drive massive traffic through video SEO. Plus, SEOLOGY automates video optimization for your site.
              </p>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Video SEO Is No Longer Optional</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  If you\'re not optimizing for video, you\'re losing traffic. Here\'s why:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Video results dominate SERPs:</strong> Google shows video carousels for 70% of queries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>YouTube is the #2 search engine:</strong> 3 billion searches per month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Video increases dwell time:</strong> Users stay 88% longer on pages with video</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Conversion rates skyrocket:</strong> Video on landing pages boosts conversions by 86%</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The brands winning in search are winning with video. Here\'s how to join them.
                </p>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">YouTube Optimization: The Complete Checklist</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  YouTube SEO follows different rules than traditional SEO. Here\'s the proven optimization framework:
                </p>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Video Titles:</strong>
                      <p className="text-slate-700 mt-1">Front-load keywords, include year (2025), keep under 60 characters, add numbers and power words. Example: "SEO Tutorial 2025: 17 Tactics That Actually Work"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Video Descriptions:</strong>
                      <p className="text-slate-700 mt-1">First 150 characters are critical--include primary keyword and CTA. Write 300+ word descriptions with timestamps, links, keyword variations, and related terms.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Tags Strategy:</strong>
                      <p className="text-slate-700 mt-1">Use 5-8 highly relevant tags. Mix broad and specific terms. Include misspellings and variations. Tag competitor channels for suggested video placement.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Custom Thumbnails:</strong>
                      <p className="text-slate-700 mt-1">Use 1280x720 resolution, bold text overlay (70+ font size), high contrast colors, faces with emotion, and consistent branding. CTR improves by 154% with optimized thumbnails.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Video Transcripts:</strong>
                      <p className="text-slate-700 mt-1">Upload full transcripts--YouTube indexes every word. Include keywords naturally. Improves accessibility and rankings simultaneously.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">6</div>
                    <div>
                      <strong className="text-xl">Engagement Signals:</strong>
                      <p className="text-slate-700 mt-1">First 48 hours are critical. Ask for likes, comments, shares, and subscriptions. Engagement rate is YouTube\'s #1 ranking factor. Pin top comment with question to encourage responses.</p>
                    </div>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Google Video SEO: Rank in Video Carousels</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Getting your videos to show up in Google search (not just YouTube) requires additional optimization:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Video Schema Markup:</strong> Add VideoObject schema to your web pages with videos. Include name, description, thumbnailUrl, uploadDate, duration, and contentUrl. This tells Google exactly what your video is about.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Embed on High-Authority Pages:</strong> Videos embedded on domain pages rank better than standalone YouTube links. Create blog posts around each video.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Video Sitemaps:</strong> Create dedicated video sitemaps listing all videos with metadata. Submit via Search Console for faster indexing.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Optimize Surrounding Content:</strong> Write 500+ words of optimized text around embedded videos. Google uses context to understand video relevance.</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Video Content Strategy That Ranks</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Creating videos that rank requires strategic content planning:
                </p>
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">8-15</div>
                    <div className="text-slate-700">Ideal video length (minutes) for ranking</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">70%</div>
                    <div className="text-slate-700">Audience retention needed for rankings</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">48hrs</div>
                    <div className="text-slate-700">Critical ranking window after upload</div>
                  </div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Video Types That Rank:</strong> Tutorials and how-tos (highest search volume), product reviews, comparison videos, list-style content ("Top 10..."), expert interviews, and case studies with data.
                </p>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Technical Video SEO Checklist</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Don\'t overlook these technical factors that impact video rankings:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Video File Naming:</strong> Name video files with target keywords before uploading (e.g., "seo-tutorial-2025.mp4")</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Closed Captions:</strong> Upload SRT files with properly formatted captions. Improves accessibility and rankings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Video Loading Speed:</strong> Use lazy loading for embedded videos to maintain page speed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Mobile Optimization:</strong> Test video playback on mobile devices--65% of video views come from mobile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Playlist Strategy:</strong> Organize videos into playlists with keyword-rich titles to boost channel authority</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Video Promotion for SEO Boost</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Great videos need promotion to rank. Here\'s the 48-hour launch strategy:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Email list blast:</strong> Send to subscribers immediately for instant views</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Social media push:</strong> Share on all platforms with native uploads (not just links)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Embed on website:</strong> Add to relevant blog posts and landing pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Community engagement:</strong> Share in relevant forums, Reddit, and communities (with value, not spam)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Collaborate with creators:</strong> Cross-promote with channels in your niche</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Measuring Video SEO Success</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Track these metrics to understand your video SEO performance:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Click-Through Rate (CTR):</strong> Aim for 4%+ (average is 2-3%)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Average View Duration:</strong> Should be 50%+ of total video length</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Engagement Rate:</strong> Likes + comments + shares per view</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Search Rankings:</strong> Track keyword positions in both YouTube and Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Traffic from Video:</strong> Website traffic driven by video embeds and descriptions</span>
                  </li>
                </ul>
                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Automate Video SEO with SEOLOGY</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY automatically implements video schema markup, optimizes video embeds for speed, and tracks video performance. Stop doing video SEO manually.
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
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #VideoSEO #YouTubeSEO #ContentMarketing
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