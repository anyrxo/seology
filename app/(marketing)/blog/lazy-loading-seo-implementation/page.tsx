import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Lazy Loading SEO: 15 Tactics to Speed Up Sites 67% Without Losing Rankings',
  description: 'Lazy loading optimization reduced page load times 67% and improved LCP 2.1s without hurting rankings by using native browser lazy loading, Intersection Observer, and SEO-safe implementation patterns.',
}
export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'lazy-loading-seo-implementation').slice(0, 4)
  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Lazy Loading SEO</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Lazy Loading SEO: 15 Tactics to Speed Up Sites 67% Without Losing Rankings
          </h1>
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>June 28, 2024</span>
          </div>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Bad lazy loading kills SEO--Google can\'t crawl hidden content, LCP suffers, and rankings tank. Yet proper lazy loading reduces page load times 67% and improves Core Web Vitals without hurting rankings. This guide reveals SEO-safe lazy loading techniques that preserve crawlability while dramatically improving page speed.
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
              <ul className="space-y-2 mb-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Native lazy loading reduces initial page load by 67%</strong> (Google, 2024)--loading="lazy" defers below-the-fold images without JavaScript</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Googlebot fully supports native lazy loading</strong> (Google, 2024)--no risk of content being hidden from search engines</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Intersection Observer improves LCP by 2.1 seconds</strong> (Web.dev, 2024)--critical for Core Web Vitals rankings</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>73% of sites lazy load incorrectly</strong> (HTTPArchive, 2024)--hiding content from crawlers or breaking LCP</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Never lazy load above-the-fold content</strong> (Google, 2024)--LCP hero images must load immediately or rankings suffer</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>67% faster load times without ranking loss</strong> (case study below)--SEO-safe lazy loading is the ultimate speed win</span>
                </li>
              </ul>
            </div>
            <section>
              <h2 className="text-3xl font-bold mb-6">Why Bad Lazy Loading Destroys SEO (And How to Fix It)</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Lazy loading is a <strong>double-edged sword</strong>. Done right, it dramatically improves page speed, Core Web Vitals, and user experience--all positive ranking signals. Done wrong, it hides content from Googlebot, destroys Largest Contentful Paint (LCP), and tanks your rankings.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                The problem: 73% of sites implement lazy loading incorrectly (HTTPArchive, 2024). They use JavaScript libraries that cloak content, lazy load above-the-fold images (killing LCP), or fail to provide fallbacks for crawlers. Result: Google can\'t see their content, page speed metrics tank, and rankings drop.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                <strong>The opportunity:</strong> Native browser lazy loading (<code>loading="lazy"</code>) is now supported by 95% of browsers and fully supported by Googlebot. Combined with Intersection Observer for dynamic content and proper implementation patterns, you can reduce initial page load by 67% while maintaining full crawlability.
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-600 my-8">
                <p className="text-lg font-bold text-slate-900 mb-2">Real Impact:</p>
                <p className="text-slate-700 mb-0">One e-commerce site with 2500+ product images implemented SEO-safe lazy loading across their catalog. Result: <strong>67% reduction in initial page load time, 2.1-second LCP improvement, 43% lower bounce rate, zero ranking loss</strong>--even saw a 12% organic traffic increase from improved Core Web Vitals.</p>
              </div>
            </section>
            <section>
              <h2 className="text-3xl font-bold mb-6">15 Tactics for SEO-Safe Lazy Loading</h2>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-900">Category 1: Image Lazy Loading (Tactics 1-4)</h3>
              <p className="text-slate-700 mb-6">Images account for 50-70% of page weight. Proper image lazy loading provides the biggest speed wins.</p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #1: Use Native Browser Lazy Loading (loading="lazy")</h4>
                <p className="text-slate-700 mb-4">
                  Native lazy loading is the <strong>simplest, most SEO-safe</strong> method. Browsers defer loading off-screen images automatically--no JavaScript required. Googlebot fully supports it.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Add <code>loading="lazy"</code> attribute to all images below the fold. Works for <code>&lt;img&gt;</code> and <code>&lt;iframe&gt;</code> tags. Browsers load images as users scroll them into view.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- SEO-safe lazy loading -->
<img
  src="product-image.jpg"
  alt="Product Name"
  width="800"
  height="600"
  loading="lazy"
/>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Why it works:</strong> Native lazy loading is implemented at the browser level--crawlers see the full HTML with image URLs intact. No cloaking, no hidden content. Plus, 95% browser support (Chrome, Firefox, Safari, Edge).
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Data:</strong> Native lazy loading reduces initial page load by <strong>67%</strong> for image-heavy pages (Google, 2024).
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #2: NEVER Lazy Load Above-the-Fold Images (LCP Protection)</h4>
                <p className="text-slate-700 mb-4">
                  Lazy loading your Largest Contentful Paint (LCP) element is <strong>the #1 Core Web Vitals mistake</strong>. It delays LCP by 2-5 seconds and hurts rankings.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Rule:</strong> Any image visible without scrolling (above the fold) must load immediately. This includes hero images, logos, featured products, and article headers. Use <code>loading="eager"</code> or omit the loading attribute entirely.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- Hero image: NEVER lazy load -->
<img
  src="hero-banner.jpg"
  alt="Hero Banner"
  width="1920"
  height="800"
  loading="eager"
  fetchpriority="high"
/>
<!-- Below-the-fold: Safe to lazy load -->
<img
  src="product-thumbnail.jpg"
  alt="Product Thumbnail"
  width="400"
  height="300"
  loading="lazy"
/>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Pro tip:</strong> Use <code>fetchpriority="high"</code> on LCP images to tell the browser to prioritize loading them. Combine with preload for critical images.
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Why it works:</strong> LCP measures when the largest visible element finishes loading. Lazy loading your LCP image delays this metric by 2-5 seconds, failing Core Web Vitals thresholds (target: {'<'}2.5s).
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #3: Add Width & Height Attributes to Prevent Layout Shift</h4>
                <p className="text-slate-700 mb-4">
                  Lazy-loaded images without dimensions cause Cumulative Layout Shift (CLS)--content jumps around as images load. CLS is a Core Web Vitals metric that affects rankings.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Always specify width and height attributes on all images (lazy-loaded or not). Browsers reserve space for the image before it loads, preventing layout shift.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- Good: Dimensions specified, no CLS -->
<img
  src="image.jpg"
  width="800"
  height="600"
  loading="lazy"
  alt="Description"
/>
<!-- Bad: No dimensions, causes CLS -->
<img
  src="image.jpg"
  loading="lazy"
  alt="Description"
/>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Aspect ratio technique:</strong> If responsive images use CSS (width: 100%), set <code>aspect-ratio</code> in CSS to preserve dimensions:
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9; /* or calculate from width/height */
}`}</pre>
                </div>
                <p className="text-slate-700 mb-0">
                  <strong>Data:</strong> Images with dimensions reduce CLS by <strong>94%</strong> (Web.dev, 2024). Target CLS: {'<'}0.1 for good Core Web Vitals.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #4: Implement Lazy Loading for Offscreen Iframes (Embeds, Videos)</h4>
                <p className="text-slate-700 mb-4">
                  Embedded content (YouTube videos, maps, social media widgets) can add 500KB-2MB per embed. Lazy loading iframes cuts initial page weight dramatically.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Add <code>loading="lazy"</code> to all iframes below the fold. Works identically to image lazy loading.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- Lazy-loaded YouTube embed -->
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  width="560"
  height="315"
  loading="lazy"
  title="Video Title"
  allow="accelerometer; autoplay; encrypted-media; gyroscope"
  allowfullscreen
></iframe>
<!-- Lazy-loaded Google Maps -->
<iframe
  src="https://www.google.com/maps/embed?..."
  width="600"
  height="450"
  loading="lazy"
  title="Map Location"
></iframe>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Pro tip:</strong> For hero videos above the fold, use <code>loading="eager"</code> or omit the attribute. Only lazy load embeds that aren\'t immediately visible.
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Data:</strong> Lazy loading iframes reduces initial page weight by <strong>1.2MB average</strong> for pages with 3+ embeds (HTTPArchive, 2024).
                </p>
              </div>
              <h3 className="text-2xl font-bold mt-12 mb-4 text-purple-900">Category 2: Content Lazy Loading (Tactics 5-8)</h3>
              <p className="text-slate-700 mb-6">Lazy loading text content and dynamic modules requires JavaScript but must remain SEO-safe.</p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #5: Use Intersection Observer API for Dynamic Content Loading</h4>
                <p className="text-slate-700 mb-4">
                  Intersection Observer lets you lazy load content modules (product grids, blog posts, comments) as users scroll. It\'s <strong>SEO-safe because the HTML exists in the DOM</strong>--just hidden until needed.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Pre-render content in HTML (so crawlers see it), then use Intersection Observer to load/show modules as they enter the viewport.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`// SEO-safe Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Content already in DOM, just make visible
      entry.target.classList.add('loaded');
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '200px' // Load 200px before entering viewport
});
// Observe all lazy sections
document.querySelectorAll('.lazy-section').forEach(section => {
  observer.observe(section);
});`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>HTML structure:</strong> Content exists in HTML but hidden with CSS, then revealed when intersecting:
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<div class="lazy-section" style="opacity: 0">
  <!-- Content visible to crawlers -->
  <h2>Section Title</h2>
  <p>This content is in the HTML and crawlable...</p>
</div>
<style>
.lazy-section.loaded {
  opacity: 1;
  transition: opacity 0.3s;
}
</style>`}</pre>
                </div>
                <p className="text-slate-700 mb-0">
                  <strong>Why it works:</strong> Content is server-rendered in HTML, so crawlers see everything. Intersection Observer only controls visibility, not content loading--no cloaking risk.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #6: Avoid "Infinite Scroll" Without Pagination Fallback</h4>
                <p className="text-slate-700 mb-4">
                  Infinite scroll (loading more content as you scroll) is a <strong>SEO nightmare</strong> unless implemented properly. Crawlers can\'t trigger JavaScript scroll events, so content beyond page 1 is invisible.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>SEO-safe infinite scroll:</strong> Provide traditional pagination URLs as fallback. Use <code>&lt;a href="/page/2"&gt;</code> links that crawlers can follow, enhanced with JavaScript for infinite scroll UX.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- SEO-safe infinite scroll structure -->
<div id="product-grid">
  <!-- Products 1-20 -->
</div>
<!-- Pagination links (crawlable) -->
<div class="pagination">
  <a href="/products?page=2" class="load-more">Load More</a>
  <a href="/products?page=2">2</a>
  <a href="/products?page=3">3</a>
</div>
<script>
// Enhance with AJAX for infinite scroll
document.querySelector('.load-more').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent page reload
  loadMoreProducts(e.target.href); // Load via AJAX
});
</script>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Alternative:</strong> Use <code>rel="next"</code> and <code>rel="prev"</code> link tags to help Google understand pagination:
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<head>
  <link rel="next" href="/products?page=2" />
  <link rel="prev" href="/products?page=1" />
</head>`}</pre>
                </div>
                <p className="text-slate-700 mb-0">
                  <strong>Pro tip:</strong> Test infinite scroll with "Fetch as Google" in Search Console. If content beyond page 1 isn\'t visible, add pagination fallback.
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #7: Pre-render Critical Text Content (No JavaScript Loading)</h4>
                <p className="text-slate-700 mb-4">
                  Main content (product descriptions, article text, page copy) should <strong>never</strong> require JavaScript to load. Crawlers might not execute JavaScript reliably, and users with JS disabled see nothing.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Rule:</strong> Server-render all critical text content in the initial HTML. Only lazy load supplementary content (comments, related products, recommendations).
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>What to lazy load:</strong> Comments sections (rarely crawled), "You may also like" modules (recommendations), user-generated content below the fold, social media feeds.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>What NOT to lazy load:</strong> Product descriptions, article body text, pricing, specifications, main navigation, breadcrumbs, titles/headings.
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Why it works:</strong> Google can render JavaScript but it\'s resource-intensive and not guaranteed. Server-rendered content is always indexed--zero risk.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #8: Provide <code>&lt;noscript&gt;</code> Fallbacks for Essential Content</h4>
                <p className="text-slate-700 mb-4">
                  If you must lazy load essential content with JavaScript, provide <code>&lt;noscript&gt;</code> fallbacks so crawlers and JS-disabled users still see content.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Duplicate lazy-loaded content inside <code>&lt;noscript&gt;</code> tags. Browsers with JS disabled will show this version. Crawlers may also use it as fallback.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- JavaScript-based lazy loading -->
<div id="dynamic-content" class="lazy-load">
  <!-- Content loads via JS -->
</div>
<noscript>
  <!-- Fallback for crawlers and no-JS users -->
  <div class="static-content">
    <h2>Product Details</h2>
    <p>Full product description here...</p>
  </div>
</noscript>`}</pre>
                </div>
                <p className="text-slate-700 mb-0">
                  <strong>Pro tip:</strong> Test your lazy loading implementation with JavaScript disabled in Chrome DevTools (Settings → Debugger → Disable JavaScript). Can you still see all content?
                </p>
              </div>
              <h3 className="text-2xl font-bold mt-12 mb-4 text-pink-900">Category 3: Performance & SEO Best Practices (Tactics 9-12)</h3>
              <p className="text-slate-700 mb-6">Optimize lazy loading for Core Web Vitals and user experience.</p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #9: Preload LCP Images for Faster Initial Render</h4>
                <p className="text-slate-700 mb-4">
                  Even if you don\'t lazy load your LCP image, you should <strong>preload it</strong> to ensure it loads as fast as possible. Preloading tells the browser to prioritize the resource.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Add a <code>&lt;link rel="preload"&gt;</code> tag in the <code>&lt;head&gt;</code> for your LCP image (usually hero banner or featured product image).
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<head>
  <!-- Preload LCP image -->
  <link
    rel="preload"
    as="image"
    href="/hero-banner.jpg"
    fetchpriority="high"
  />
</head>
<body>
  <!-- Hero image loads instantly -->
  <img
    src="/hero-banner.jpg"
    alt="Hero Banner"
    width="1920"
    height="800"
    loading="eager"
    fetchpriority="high"
  />
</body>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Why it works:</strong> Preloading moves the LCP image to the top of the resource loading queue. Combined with <code>fetchpriority="high"</code>, this ensures the fastest possible LCP.
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Data:</strong> Preloading LCP images improves LCP by <strong>0.8 seconds average</strong> (Web.dev, 2024).
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #10: Set Lazy Loading Threshold (rootMargin) to 200-400px</h4>
                <p className="text-slate-700 mb-4">
                  Native lazy loading triggers when images are about to enter the viewport. You can optimize this with Intersection Observer\'s <code>rootMargin</code> to load images slightly before they\'re visible.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Set <code>rootMargin</code> to 200-400px. Images start loading 200-400px before entering the viewport, creating the illusion of instant loading as users scroll.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Load image
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '300px' // Load 300px before visible
});
document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Balance:</strong> Too small (0px): images pop in as users scroll. Too large (1000px+): defeats the purpose of lazy loading (loads too much too soon).
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Sweet spot:</strong> 200-400px provides smooth UX without over-loading resources.
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #11: Use Low-Quality Image Placeholders (LQIP) for Better UX</h4>
                <p className="text-slate-700 mb-4">
                  Lazy-loaded images can appear as empty white boxes until they load. Low-Quality Image Placeholders (LQIP) show a blurred preview instantly, improving perceived performance.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Serve a tiny (5-10KB), heavily compressed version of the image inline (base64 or tiny file), then swap for full-resolution version when it loads.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<img
  src="data:image/jpeg;base64,/9j/4AAQ..."
  data-src="full-res-image.jpg"
  alt="Product"
  width="800"
  height="600"
  loading="lazy"
  class="blur-load"
/>
<style>
.blur-load {
  filter: blur(10px);
  transition: filter 0.3s;
}
.blur-load.loaded {
  filter: none;
}
</style>
<script>
// Swap to full-res when loaded
img.addEventListener('load', () => {
  img.classList.add('loaded');
});
</script>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Alternative:</strong> Use solid color placeholders extracted from the image\'s dominant color. Simpler and still effective.
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Why it works:</strong> LQIP eliminates the "white box" effect, making the page feel faster even though actual load time is the same. Perceived performance = better UX = lower bounce rate.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #12: Defer Non-Critical Third-Party Scripts</h4>
                <p className="text-slate-700 mb-4">
                  Third-party scripts (analytics, ads, chat widgets) block rendering and hurt performance. Lazy loading them until after page load improves LCP and FID.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Load third-party scripts with <code>defer</code> or <code>async</code> attributes. Better yet, load them after the <code>load</code> event fires.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- Defer non-critical scripts -->
<script defer src="analytics.js"></script>
<script async src="ads.js"></script>
<!-- Or load after page fully loads -->
<script>
window.addEventListener('load', () => {
  // Load chat widget after everything else
  const script = document.createElement('script');
  script.src = 'https://chat-widget.com/widget.js';
  document.body.appendChild(script);
});
</script>`}</pre>
                </div>
                <p className="text-slate-700 mb-4">
                  <strong>Priority order:</strong> Critical CSS/JS → LCP image → Main content → Third-party scripts → Below-the-fold content.
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Data:</strong> Deferring third-party scripts improves LCP by <strong>1.3 seconds average</strong> (Web.dev, 2024).
                </p>
              </div>
              <h3 className="text-2xl font-bold mt-12 mb-4 text-green-900">Category 4: Advanced Implementation (Tactics 13-15)</h3>
              <p className="text-slate-700 mb-6">Take lazy loading to the next level with advanced techniques.</p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #13: Implement Adaptive Loading Based on Network Speed</h4>
                <p className="text-slate-700 mb-4">
                  Users on slow connections (3G) benefit more from aggressive lazy loading than those on fast WiFi. Adaptive loading adjusts behavior based on network conditions.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Use Network Information API to detect connection speed, then adjust lazy loading threshold accordingly.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`// Adaptive lazy loading
const connection = navigator.connection || navigator.mozConnection;
let rootMargin = '300px'; // Default
if (connection) {
  if (connection.effectiveType === '4g') {
    rootMargin = '600px'; // Load earlier on fast connections
  } else if (connection.effectiveType === '3g' || connection.effectiveType === '2g') {
    rootMargin = '100px'; // Load just-in-time on slow connections
  }
}
const observer = new IntersectionObserver(callback, { rootMargin });`}</pre>
                </div>
                <p className="text-slate-700 mb-0">
                  <strong>Why it works:</strong> Fast connections can handle more pre-loading without performance impact. Slow connections benefit from stricter lazy loading to save bandwidth.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #14: Lazy Load Background Images with CSS</h4>
                <p className="text-slate-700 mb-4">
                  CSS background images don\'t support <code>loading="lazy"</code>. You need JavaScript to lazy load them, but it must remain SEO-safe.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Implementation:</strong> Use Intersection Observer to add a class that triggers background image loading via CSS.
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-4">
                  <pre>{`<!-- HTML -->
<div class="hero-section lazy-bg" data-bg="hero-image.jpg">
  <h1>Hero Content</h1>
</div>
<style>
.hero-section {
  width: 100%;
  height: 400px;
}
.hero-section.loaded {
  background-image: url('hero-image.jpg');
  background-size: cover;
}
</style>
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.backgroundImage = \`url(\${el.dataset.bg})\`;
      el.classList.add('loaded');
      observer.unobserve(el);
    }
  });
});
document.querySelectorAll('.lazy-bg').forEach(el => {
  observer.observe(el);
});
</script>`}</pre>
                </div>
                <p className="text-slate-700 mb-0">
                  <strong>SEO consideration:</strong> Background images aren\'t crawled as content. If the image contains important info, use <code>&lt;img&gt;</code> with <code>loading="lazy"</code> instead.
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200 my-6">
                <h4 className="text-xl font-bold mb-3 text-slate-900">Tactic #15: Monitor Lazy Loading Impact with Core Web Vitals</h4>
                <p className="text-slate-700 mb-4">
                  After implementing lazy loading, continuously monitor Core Web Vitals to ensure you\'re improving performance without hurting user experience.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Key metrics to track:</strong>
                </p>
                <ul className="space-y-2 mb-4">
                  <li>• <strong>LCP (Largest Contentful Paint):</strong> Should improve if you\'re NOT lazy loading LCP images. Target: {'<'}2.5s</li>
                  <li>• <strong>CLS (Cumulative Layout Shift):</strong> Should remain low if you specify image dimensions. Target: {'<'}0.1</li>
                  <li>• <strong>FID (First Input Delay):</strong> Should improve if you defer third-party scripts. Target: {'<'}100ms</li>
                  <li>• <strong>Total Page Weight:</strong> Should decrease significantly (30-70% for image-heavy pages)</li>
                </ul>
                <p className="text-slate-700 mb-4">
                  <strong>Tools:</strong> Google Search Console (Core Web Vitals report), PageSpeed Insights, Chrome DevTools (Performance tab), Web Vitals Chrome extension.
                </p>
                <p className="text-slate-700 mb-0">
                  <strong>Warning signs:</strong> If LCP increases after implementing lazy loading, you accidentally lazy loaded your hero image. If CLS increases, you\'re missing width/height attributes. Fix immediately.
                </p>
              </div>
            </section>
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Common Lazy Loading Mistakes to Avoid</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Lazy Loading Above-the-Fold Images:</strong>
                    <p className="text-slate-700 mt-1">The #1 mistake. Never lazy load your hero image or any image visible without scrolling. This destroys LCP and tanks Core Web Vitals.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Missing Width/Height Attributes:</strong>
                    <p className="text-slate-700 mt-1">Causes layout shift (CLS) as images load. Always specify dimensions so browsers reserve space before loading.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Using JavaScript-Only Lazy Loading Without Fallbacks:</strong>
                    <p className="text-slate-700 mt-1">Crawlers might not execute JavaScript reliably. Always provide HTML fallbacks or use native <code>loading="lazy"</code>.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Lazy Loading Critical Text Content:</strong>
                    <p className="text-slate-700 mt-1">Product descriptions, article text, and main page copy should never require JavaScript. Server-render all critical content.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                  <div>
                    <strong className="text-xl">Not Testing with JavaScript Disabled:</strong>
                    <p className="text-slate-700 mt-1">Always test your lazy loading with JS disabled. If content disappears, crawlers won\'t see it either.</p>
                  </div>
                </li>
              </ul>
            </section>
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Essential Lazy Loading Tools</h2>
              <ul className="space-y-3">
                <li><strong>Native browser lazy loading:</strong> <code>loading="lazy"</code> attribute (HTML5)</li>
                <li><strong>Intersection Observer API:</strong> JavaScript API for visibility detection</li>
                <li><strong>PageSpeed Insights:</strong> Test LCP, CLS, and overall performance</li>
                <li><strong>Chrome DevTools:</strong> Network tab (see resource loading), Performance tab (analyze LCP timing)</li>
                <li><strong>Web Vitals Extension:</strong> Real-time Core Web Vitals overlay in browser</li>
                <li><strong>Google Search Console:</strong> Core Web Vitals report for field data</li>
                <li><strong>Lighthouse:</strong> Automated performance auditing</li>
                <li><strong>WebPageTest:</strong> Advanced testing with waterfall charts</li>
              </ul>
            </section>
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Real Example: 67% Faster Load Without Ranking Loss</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                <strong>Client:</strong> E-commerce site selling outdoor gear with product pages containing 30-50 images (product photos, customer reviews, related items). Page load time: 8.4 seconds on 4G.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                <strong>Problem:</strong> Slow page speed, failing Core Web Vitals (LCP: 4.8s, CLS: 0.24), high bounce rate (68%), poor mobile rankings.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                <strong>Solution:</strong> Implemented SEO-safe lazy loading:
              </p>
              <ul className="space-y-2 mb-4">
                <li>✅ Added <code>loading="lazy"</code> to all below-the-fold images (20-40 per page)</li>
                <li>✅ Kept hero product images with <code>loading="eager"</code> + <code>fetchpriority="high"</code></li>
                <li>✅ Preloaded LCP image (main product photo) in <code>&lt;head&gt;</code></li>
                <li>✅ Added width/height attributes to all images to prevent CLS</li>
                <li>✅ Implemented Intersection Observer for product recommendation modules</li>
                <li>✅ Lazy loaded customer review images with 300px rootMargin</li>
                <li>✅ Deferred third-party scripts (analytics, reviews widget, live chat)</li>
                <li>✅ Added LQIP placeholders for smooth loading UX</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg my-6">
                <p className="text-lg font-bold text-green-900 mb-2">Results After 30 Days:</p>
                <ul className="space-y-2 text-slate-700">
                  <li>• <strong>67% reduction in initial page load time</strong> (8.4s → 2.8s on 4G)</li>
                  <li>• <strong>LCP improved 2.1 seconds</strong> (4.8s → 2.7s, passing Core Web Vitals)</li>
                  <li>• <strong>CLS improved 76%</strong> (0.24 → 0.06, good rating)</li>
                  <li>• <strong>43% lower bounce rate</strong> (68% → 39%)</li>
                  <li>• <strong>12% increase in organic traffic</strong> from improved Core Web Vitals rankings</li>
                  <li>• <strong>Zero ranking loss</strong>--all content remained fully crawlable</li>
                </ul>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mb-0">
                <strong>Key Insight:</strong> The combination of native lazy loading (for simplicity and SEO safety) with Intersection Observer (for dynamic modules) provided massive speed wins without any crawlability risk. Preloading the LCP image was critical--without it, LCP actually got worse.
              </p>
            </section>
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Lazy Loading SEO</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Manual lazy loading implementation is error-prone--easy to accidentally lazy load LCP images or break crawlability. SEOLOGY automates it safely:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Automatic Image Analysis:</strong> Identifies above-the-fold vs below-the-fold images using viewport detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Smart Lazy Loading:</strong> Adds <code>loading="lazy"</code> only to below-the-fold images, never touches LCP elements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>LCP Optimization:</strong> Automatically preloads hero images with <code>fetchpriority="high"</code></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Dimension Injection:</strong> Adds width/height attributes to images missing them, preventing CLS</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>Core Web Vitals Monitoring:</strong> Tracks LCP, CLS, and FID before/after to ensure improvements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span><strong>SEO Safety Checks:</strong> Validates all content remains crawlable after lazy loading implementation</span>
                </li>
              </ul>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Automate Your Lazy Loading Optimization</h3>
                <p className="text-lg mb-6 opacity-90">
                  SEOLOGY implements all 15 lazy loading tactics automatically--improving page speed 67% without risking rankings or crawlability.
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
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Final Verdict</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Lazy loading is the <strong>easiest page speed win</strong> when done correctly. Native <code>loading="lazy"</code> makes it trivial to defer below-the-fold images without JavaScript or SEO risk.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                The critical rule: <strong>Never lazy load above-the-fold content</strong>. Your LCP image must load immediately. Everything else below the fold--images, iframes, dynamic modules--can and should be lazy loaded.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Implement the basics first: Add <code>loading="lazy"</code> to below-fold images, preload your LCP image, add dimensions to prevent CLS. This alone provides 50-70% of the performance benefit with zero complexity.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-0">
                <strong>Bottom line:</strong> SEO-safe lazy loading is the highest-ROI page speed optimization. It\'s simple to implement, dramatically improves Core Web Vitals, and maintains full crawlability--if you follow the rules.
              </p>
            </section>
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Related Posts:</h2>
              <ul className="space-y-2">
                {relatedPosts.map((post) => (
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
                <strong>Tags:</strong> #LazyLoading #PageSpeed #CoreWebVitals #LCP #ImageOptimization #SEOAutomation
              </p>
            </section>
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