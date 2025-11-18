import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle2, Database, FileCode, FolderTree, Image, Search, Settings, Target, Video } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'XML Sitemap Optimization: Get Every Page Indexed Fast',
  description: 'A poorly optimized sitemap wastes your crawl budget. This guide ensures Google finds and indexes every important page.',
}
export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['crawl-budget-optimization-guide', 'robots-txt-configuration-guide', 'technical-seo-audit-checklist-2025', 'site-architecture-seo-best-practices'].includes(post.slug)
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
            <span>XML Sitemap Optimization</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            XML Sitemap Optimization: Get Every Page Indexed Fast
          </h1>
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>October 25, 2024</span>
            <span>•</span>
            <span>15 min read</span>
          </div>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            A poorly optimized sitemap wastes your crawl budget and leaves pages unindexed. This guide shows how to <strong className="text-white">build perfect XML sitemaps</strong> that get every important page crawled and indexed fast.
          </p>
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Automate Sitemap Optimization
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
                XML sitemaps tell Google which pages to crawl and how often. A properly optimized sitemap can <strong>reduce crawl time by 40-60%</strong> and get new content indexed within hours instead of days. This guide covers sitemap structure, priority settings, image/video sitemaps, sitemap index files, and common mistakes that waste crawl budget.
              </p>
              <p className="text-slate-700 mb-0">
                <strong>Bottom line:</strong> Sites with optimized sitemaps get crawled 3x more efficiently than sites with default sitemaps--more pages indexed, faster ranking improvements.
              </p>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <FileCode className="w-8 h-8 text-blue-600" />
                  What Is an XML Sitemap? (And Why It Matters)
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  An XML sitemap is a file that lists all the URLs on your site that you want search engines to crawl and index. Think of it as a roadmap for Google\'s crawlers.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Why XML Sitemaps Matter for SEO</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Faster indexing:</strong> New pages get discovered and indexed in hours instead of waiting for natural crawl</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Crawl budget optimization:</strong> Tell Google which pages are most important</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Deep page discovery:</strong> Help crawlers find pages buried deep in site architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Update frequency signals:</strong> Tell Google how often to re-crawl content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>International targeting:</strong> Use hreflang attributes for multi-language sites</span>
                  </li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                  <p className="text-slate-700 mb-0">
                    <strong>Critical stat:</strong> Google says XML sitemaps are especially important for sites with <strong>new content, large sites (1000+ pages), orphaned pages, or rich media content</strong>. Without a sitemap, these pages may never get indexed.
                  </p>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Database className="w-8 h-8 text-blue-600" />
                  XML Sitemap Structure & Required Elements
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  A proper XML sitemap follows a specific structure with required and optional elements:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Basic XML Sitemap Structure</h3>
                <div className="bg-slate-900 text-slate-100 p-6 rounded-xl my-6 overflow-x-auto">
                  <pre className="text-sm">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-10-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2024-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/blog/post-title</loc>
    <lastmod>2024-10-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`}
                  </pre>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Required Elements</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;urlset&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Root element that wraps all URL entries
                    </p>
                    <p className="text-slate-700">
                      <strong>Required attribute:</strong> xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;url&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Container for each URL entry
                    </p>
                    <p className="text-slate-700">
                      <strong>Note:</strong> You can have up to 50,000 URLs per sitemap file
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;loc&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> The full URL of the page (REQUIRED for every URL entry)
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Format:</strong> Must be absolute URL (https://example.com/page), not relative (/page)
                    </p>
                    <p className="text-slate-700">
                      <strong>Encoding:</strong> Must escape special characters (&amp; becomes &amp;amp;)
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Optional (But Recommended) Elements</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;lastmod&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Date of last modification (helps Google prioritize recent updates)
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Format:</strong> YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS+00:00 (ISO 8601)
                    </p>
                    <p className="text-slate-700">
                      <strong>Best practice:</strong> Only include if you accurately track last modified dates--false dates hurt more than help
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;changefreq&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> How frequently the page changes (hint to crawlers, not directive)
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Values:</strong> always, hourly, daily, weekly, monthly, yearly, never
                    </p>
                    <p className="text-slate-700">
                      <strong>Reality check:</strong> Google mostly ignores this now--focus on lastmod instead
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;priority&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Relative importance of pages on YOUR site (0.0 to 1.0)
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Default:</strong> 0.5 if not specified
                    </p>
                    <p className="text-slate-700">
                      <strong>Important:</strong> This is RELATIVE to your own site, not compared to other sites
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  Priority & Changefreq Optimization Strategy
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  While Google says they mostly ignore priority and changefreq, strategic use still helps with crawl efficiency:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Priority Value Strategy</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ul className="space-y-3 text-slate-700">
                    <li><strong>1.0:</strong> Homepage only</li>
                    <li><strong>0.9:</strong> Main category/pillar pages (5-10 pages max)</li>
                    <li><strong>0.8:</strong> Important landing pages, key service pages</li>
                    <li><strong>0.7:</strong> Secondary category pages, popular content</li>
                    <li><strong>0.6:</strong> Regular blog posts, product pages</li>
                    <li><strong>0.5:</strong> Standard pages (default)</li>
                    <li><strong>0.3-0.4:</strong> Archive pages, tag pages, old content</li>
                    <li><strong>0.1-0.2:</strong> Legal pages (privacy policy, terms), low-value pages</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                  <p className="text-slate-700 mb-0">
                    <strong>⚠️ Common mistake:</strong> Setting everything to 1.0 defeats the purpose. Use priority to create a hierarchy--it\'s about RELATIVE importance within your site.
                  </p>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Changefreq Best Practices</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Always:</strong> Never use this--it\'s spam signal to Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Hourly:</strong> Only for live data pages (stock prices, sports scores)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Daily:</strong> Homepage, news pages, active blogs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Weekly:</strong> Regular blog content, category pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Monthly:</strong> Static pages, about page, contact page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Yearly:</strong> Legal pages, archived content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Never:</strong> Truly static content (rarely crawled)</span>
                  </li>
                </ul>
                <h3 className="text-2xl font-bold mt-8 mb-4">Lastmod: The Most Important Signal</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  While priority and changefreq are hints, lastmod is an actual signal Google uses:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Accuracy matters:</strong> Only include lastmod if it reflects real content changes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Don\'t game it:</strong> Changing lastmod without actual content updates will get ignored</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Precision:</strong> Include time (YYYY-MM-DDTHH:MM:SS) for pages that update multiple times per day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Skip if uncertain:</strong> Better to omit lastmod than have inaccurate dates</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Image className="w-8 h-8 text-blue-600" />
                  Image Sitemaps: Get Your Images Indexed
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Image sitemaps help Google discover and index images--critical for image search rankings and visual content:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Image Sitemap Structure</h3>
                <div className="bg-slate-900 text-slate-100 p-6 rounded-xl my-6 overflow-x-auto">
                  <pre className="text-sm">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/product/widget</loc>
    <image:image>
      <image:loc>https://example.com/images/widget-1.jpg</image:loc>
      <image:caption>High-quality widget in blue</image:caption>
      <image:geo_location>New York, USA</image:geo_location>
      <image:title>Premium Widget - Model X</image:title>
      <image:license>https://example.com/image-license</image:license>
    </image:image>
    <image:image>
      <image:loc>https://example.com/images/widget-2.jpg</image:loc>
      <image:caption>Widget in use demonstration</image:caption>
      <image:title>Widget Demo Photo</image:title>
    </image:image>
  </url>
</urlset>`}
                  </pre>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Image Sitemap Elements</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;image:loc&gt; (REQUIRED)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Full URL to the image file
                    </p>
                    <p className="text-slate-700">
                      <strong>Limit:</strong> Up to 1,000 images per page URL
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;image:caption&gt; (Optional)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Caption/description of the image
                    </p>
                    <p className="text-slate-700">
                      <strong>SEO impact:</strong> Used for image search relevance--include target keywords naturally
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;image:title&gt; (Optional)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Title of the image
                    </p>
                    <p className="text-slate-700">
                      <strong>Best practice:</strong> Descriptive, keyword-rich titles (not just "IMG_1234.jpg")
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;image:geo_location&gt; (Optional)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Geographic location of the image
                    </p>
                    <p className="text-slate-700">
                      <strong>Use case:</strong> Local businesses, travel sites, real estate
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;image:license&gt; (Optional)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> URL to the license for the image
                    </p>
                    <p className="text-slate-700">
                      <strong>Benefit:</strong> Can appear in image licensing filter in Google Images
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Image Sitemap Best Practices</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Include all images:</strong> Product images, infographics, charts--anything you want indexed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Descriptive captions:</strong> Write unique captions for each image with relevant keywords</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>High-quality images only:</strong> Don\'t include decorative icons or low-res images</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Same domain:</strong> Images must be hosted on the same domain as the sitemap (or verified in GSC)</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Video className="w-8 h-8 text-blue-600" />
                  Video Sitemaps: YouTube Isn\'t Enough
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  If you host video content on your site (not just YouTube embeds), video sitemaps help Google understand and index them:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Video Sitemap Structure</h3>
                <div className="bg-slate-900 text-slate-100 p-6 rounded-xl my-6 overflow-x-auto">
                  <pre className="text-sm">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.com/videos/how-to-guide</loc>
    <video:video>
      <video:thumbnail_loc>https://example.com/thumbs/guide.jpg</video:thumbnail_loc>
      <video:title>Complete How-To Guide for Product Setup</video:title>
      <video:description>Step-by-step guide showing how to set up and configure our product in under 5 minutes.</video:description>
      <video:content_loc>https://example.com/videos/guide.mp4</video:content_loc>
      <video:player_loc>https://example.com/videoplayer?video=123</video:player_loc>
      <video:duration>300</video:duration>
      <video:publication_date>2024-10-20T08:00:00+00:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:view_count>45000</video:view_count>
      <video:uploader info="https://example.com/about">Example Company</video:uploader>
    </video:video>
  </url>
</urlset>`}
                  </pre>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Required Video Elements</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;video:thumbnail_loc&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> URL to the video thumbnail image
                    </p>
                    <p className="text-slate-700">
                      <strong>Requirements:</strong> Min 160x90px, max 1920x1080px, JPG/PNG/GIF format
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;video:title&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Title of the video
                    </p>
                    <p className="text-slate-700">
                      <strong>Limit:</strong> Max 100 characters, include target keywords
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;video:description&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Description of video content
                    </p>
                    <p className="text-slate-700">
                      <strong>Limit:</strong> Max 2,048 characters, must match on-page description
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">&lt;video:content_loc&gt; OR &lt;video:player_loc&gt;</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>content_loc:</strong> Direct URL to video file (.mp4, .mov, etc.)
                    </p>
                    <p className="text-slate-700">
                      <strong>player_loc:</strong> URL to video player page (for embedded players)
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Recommended Video Elements</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>&lt;video:duration&gt;:</strong> Length in seconds (helps with user experience signals)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>&lt;video:publication_date&gt;:</strong> When video was published (affects freshness ranking)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>&lt;video:view_count&gt;:</strong> Total views (social proof signal)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>&lt;video:family_friendly&gt;:</strong> yes/no (filters explicit content)</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <FolderTree className="w-8 h-8 text-blue-600" />
                  Sitemap Index Files: Managing Large Sites
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Sites with 50,000+ URLs need multiple sitemap files. Sitemap index files organize them:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">When to Use Sitemap Index Files</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>More than 50,000 URLs:</strong> Hard limit per sitemap file</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Sitemap exceeds 50MB:</strong> Uncompressed size limit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Logical organization:</strong> Separate sitemaps for blog, products, pages, images, videos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Update frequency:</strong> Different sections update at different rates</span>
                  </li>
                </ul>
                <h3 className="text-2xl font-bold mt-8 mb-4">Sitemap Index Structure</h3>
                <div className="bg-slate-900 text-slate-100 p-6 rounded-xl my-6 overflow-x-auto">
                  <pre className="text-sm">
{`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>2024-10-25T10:30:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-blog.xml</loc>
    <lastmod>2024-10-25T14:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-products.xml</loc>
    <lastmod>2024-10-24T08:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-images.xml</loc>
    <lastmod>2024-10-23T12:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-videos.xml</loc>
    <lastmod>2024-10-22T16:00:00+00:00</lastmod>
  </sitemap>
</sitemapindex>`}
                  </pre>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Sitemap Organization Best Practices</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <p className="text-slate-700 mb-4">
                    <strong>Recommended structure for large sites:</strong>
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li>• <strong>sitemap-index.xml</strong> - Master index file (submit this to GSC)</li>
                    <li>• <strong>sitemap-pages.xml</strong> - Static pages (homepage, about, contact, etc.)</li>
                    <li>• <strong>sitemap-blog.xml</strong> - Blog posts (or split by year: sitemap-blog-2024.xml)</li>
                    <li>• <strong>sitemap-products.xml</strong> - Product pages (or split by category)</li>
                    <li>• <strong>sitemap-categories.xml</strong> - Category/collection pages</li>
                    <li>• <strong>sitemap-images.xml</strong> - All images across the site</li>
                    <li>• <strong>sitemap-videos.xml</strong> - All video content</li>
                    <li>• <strong>sitemap-news.xml</strong> - Google News sitemap (if applicable)</li>
                  </ul>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Benefits of Organized Sitemaps</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Faster updates:</strong> Only regenerate changed sitemaps (blog updates don\'t require product sitemap regeneration)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Better tracking:</strong> See which content types get crawled most in GSC</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Easier debugging:</strong> Identify issues by content type</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Crawl budget optimization:</strong> Separate frequently-updated content from static pages</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Search className="w-8 h-8 text-blue-600" />
                  Submitting Sitemaps to Google Search Console
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Creating a sitemap is only half the battle--you need to submit it properly:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Step-by-Step Submission Process</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li><strong>1. Upload sitemap to root directory:</strong> Place sitemap.xml at https://example.com/sitemap.xml</li>
                    <li><strong>2. Test accessibility:</strong> Visit the URL in browser to confirm it loads</li>
                    <li><strong>3. Open Google Search Console:</strong> Go to search.google.com/search-console</li>
                    <li><strong>4. Navigate to Sitemaps:</strong> Select property → Sitemaps (left sidebar)</li>
                    <li><strong>5. Enter sitemap URL:</strong> Type "sitemap.xml" (or full URL) and click Submit</li>
                    <li><strong>6. Wait for processing:</strong> Can take hours to days for first crawl</li>
                    <li><strong>7. Check status:</strong> "Success" status means sitemap was read successfully</li>
                  </ol>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Add Sitemap to robots.txt</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Reference your sitemap in robots.txt so all search engines can find it:
                </p>
                <div className="bg-slate-900 text-slate-100 p-6 rounded-xl my-6">
                  <pre className="text-sm">
{`User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-images.xml
Sitemap: https://example.com/sitemap-videos.xml`}
                  </pre>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Monitoring Sitemap Health</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Check weekly:</strong> Review sitemap status in GSC for errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Discovered vs Indexed:</strong> If most URLs aren\'t indexed, investigate issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Read errors:</strong> "Couldn\'t fetch" means GSC can\'t access the sitemap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Resubmit after major changes:</strong> Ping GSC when you add new sitemap files</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Settings className="w-8 h-8 text-blue-600" />
                  Dynamic Sitemap Generation
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Manual sitemap management doesn\'t scale. Generate sitemaps dynamically:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">WordPress Sitemap Plugins</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Yoast SEO:</strong> Built-in XML sitemap generation (free, most popular)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Rank Math:</strong> Advanced sitemap options with image/video support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>All in One SEO:</strong> Comprehensive sitemap features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>WP Core (5.5+):</strong> Basic sitemap built-in (limited features)</span>
                  </li>
                </ul>
                <h3 className="text-2xl font-bold mt-8 mb-4">Shopify Sitemap Handling</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Shopify auto-generates sitemaps at /sitemap.xml:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Automatic updates:</strong> Shopify updates sitemap when you add/remove products/pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>No configuration needed:</strong> Just submit /sitemap.xml to GSC</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Limitation:</strong> Can\'t customize priority or changefreq values</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Includes:</strong> Products, collections, blog posts, pages</span>
                  </li>
                </ul>
                <h3 className="text-2xl font-bold mt-8 mb-4">Custom Development Best Practices</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Cache sitemaps:</strong> Generate once, serve from cache to avoid server load</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Regenerate on publish:</strong> Update sitemap whenever content is published/updated</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Gzip compression:</strong> Serve sitemap.xml.gz (reduces bandwidth 80-90%)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Set proper headers:</strong> Content-Type: application/xml (or text/xml)</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-blue-600" />
                  Common XML Sitemap Mistakes (And How to Fix Them)
                </h2>
                <div className="space-y-6 my-8">
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 1: Including Blocked or Noindex Pages</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Sitemap includes URLs blocked by robots.txt or marked noindex.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Only include indexable URLs. Exclude admin pages, search results, duplicate pages, and any URL with noindex meta tag.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 2: 404 Errors in Sitemap</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Sitemap contains URLs that return 404 errors (wastes crawl budget).
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Regularly audit sitemap URLs. Remove deleted pages or set up 301 redirects.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 3: Redirect Chains in Sitemap</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> URLs in sitemap redirect to other URLs (inefficient crawling).
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Include only final destination URLs. If page redirects, list the target URL in sitemap.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 4: Not Updating Lastmod Dates</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Lastmod dates never change, even when content updates (Google learns to ignore them).
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Either update lastmod accurately or omit it entirely. Fake timestamps hurt more than help.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 5: Exceeding 50,000 URL Limit</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Single sitemap file contains more than 50,000 URLs (GSC won\'t process it).
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Split into multiple sitemaps and use a sitemap index file.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 6: Missing XML Declaration</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Sitemap doesn\'t start with &lt;?xml version="1.0" encoding="UTF-8"?&gt;
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Always include XML declaration as first line. Critical for proper parsing.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 7: Including Session IDs or Parameters</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> URLs have session IDs, tracking params, or query strings (creates duplicates).
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Use canonical URLs only. Strip unnecessary parameters (?utm_source, ?sessionid, etc.).
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Testing Your XML Sitemap</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Before submitting to GSC, validate your sitemap:
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Validation Tools</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>XML Sitemap Validator:</strong> xml-sitemaps.com/validate-xml-sitemap.html</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Google Search Console:</strong> Submit and check for errors in Sitemaps section</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Screaming Frog:</strong> Crawl sitemap and verify all URLs return 200 status</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Online XML Validators:</strong> Check for syntax errors</span>
                  </li>
                </ul>
                <h3 className="text-2xl font-bold mt-8 mb-4">Manual Testing Checklist</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ Sitemap accessible at yoursite.com/sitemap.xml</li>
                    <li>✓ Returns 200 HTTP status code</li>
                    <li>✓ Proper XML declaration at top</li>
                    <li>✓ All URLs return 200 status (no 404s)</li>
                    <li>✓ No URLs with redirect chains</li>
                    <li>✓ Under 50,000 URLs per file</li>
                    <li>✓ Under 50MB uncompressed size</li>
                    <li>✓ URLs are absolute (not relative)</li>
                    <li>✓ No duplicate URLs</li>
                    <li>✓ Only indexable pages included</li>
                  </ul>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Sitemap Optimization</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY handles all XML sitemap optimization automatically:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Generates optimized XML sitemaps with correct priority and lastmod values</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Creates separate sitemaps for pages, blog, products, images, and videos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Automatically excludes blocked, noindex, and 404 pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Updates sitemaps in real-time when content is published or modified</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Pings Google when sitemap changes (faster indexing)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Monitors GSC for sitemap errors and alerts you immediately</span>
                  </li>
                </ul>
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Get Perfect XML Sitemaps Automatically</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join thousands of sites using SEOLOGY to generate and maintain optimized XML sitemaps for faster indexing.
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
                <h2 className="text-2xl font-bold mb-4">Related Technical SEO Guides:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/crawl-budget-optimization-guide" className="text-blue-600 hover:text-blue-800">Crawl Budget Optimization Guide</Link></li>
                  <li><Link href="/blog/robots-txt-configuration-guide" className="text-blue-600 hover:text-blue-800">Robots.txt Configuration Guide</Link></li>
                  <li><Link href="/blog/technical-seo-audit-checklist-2025" className="text-blue-600 hover:text-blue-800">Technical SEO Audit Checklist</Link></li>
                  <li><Link href="/blog/site-architecture-seo-best-practices" className="text-blue-600 hover:text-blue-800">Site Architecture SEO Best Practices</Link></li>
                </ul>
              </section>
              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #XMLSitemap #TechnicalSEO #Indexing #CrawlBudget #GoogleSearchConsole #SitemapOptimization
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More Technical SEO Guides</h2>
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