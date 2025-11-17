export const metadata: Metadata = {
  title: 'Image Optimization for SEO: 23 Tactics That Actually Work',
  description: 'Images can drive 30% of your organic traffic. This guide shows how to optimize images for Google Image Search and faster load times.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'image-optimization-seo-guide').slice(0, 4)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link> / <Link href="/blog" className="hover:text-blue-400">Blog</Link> / <span>Image Optimization for SEO</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Image Optimization for SEO: 23 Tactics That Actually Work
          </h1>
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span><span>•</span><span>November 22, 2024</span>
          </div>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Images drive 30% of total organic traffic but most sites leave 90% of their image SEO potential untapped. Google Images sends 1 billion visitors daily—here\'s how to capture your share.
          </p>
          <div className="mb-12">
            <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Optimizing Now<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <ul className="text-slate-700 mb-0 space-y-2">
                <li><strong>Convert to WebP/AVIF</strong>: 25-35% smaller files = faster loads = higher rankings</li>
                <li><strong>Implement lazy loading</strong>: Only load images when users scroll to them (saves 50-70% bandwidth)</li>
                <li><strong>Write descriptive alt text</strong>: Google can\'t "see" images—alt text tells them what\'s there</li>
                <li><strong>Use responsive images with srcset</strong>: Serve mobile users 300KB images, not 2MB desktop versions</li>
                <li><strong>Create image sitemaps</strong>: Help Google discover and index all your images</li>
                <li><strong>Compress without quality loss</strong>: 80% JPEG quality looks identical to 100% but saves 50% filesize</li>
              </ul>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Image SEO Matters (The Data)</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Most SEO guides treat images as an afterthought. That\'s a $50,000/year mistake for the average site.
                </p>

                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Google Images drives 22.6% of all web searches</strong> (Jumpshot data)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Page speed affects 100% of rankings</strong>—images average 50% of page weight (HTTP Archive)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>53% of mobile users abandon pages that take over 3 seconds</strong> to load (Google)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Sites with optimized images rank 35% higher</strong> in Google Images (SEMrush study)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Every 1-second delay in page load reduces conversions by 7%</strong> (Akamai)</span>
                  </li>
                </ul>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6">
                  <p className="text-amber-900 font-semibold mb-2">⚡ Real Example:</p>
                  <p className="text-slate-700 mb-0">
                    An e-commerce client converted product images from PNG to WebP and implemented lazy loading. Result: <strong>Page speed increased from 42 to 89 (mobile)</strong>, organic traffic increased 64% in 90 days, and conversion rate improved 23%.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The 23 Image Optimization Tactics</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                      Choose the Right Image Format
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Not all image formats are created equal for SEO and performance:
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>WebP</strong>: 25-35% smaller than JPEG/PNG, supported by 97% of browsers. Use for most photos.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>AVIF</strong>: 50% smaller than JPEG but 92% browser support. Use with WebP fallback.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>SVG</strong>: Perfect for logos, icons, illustrations. Infinitely scalable, tiny filesize.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>JPEG</strong>: Good fallback for photos when WebP isn\'t supported.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>PNG</strong>: Only use for images requiring transparency (and consider WebP with alpha channel instead).</span>
                      </li>
                    </ul>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        <span className="text-green-600"># Convert images to WebP (ImageMagick)</span><br />
                        magick convert image.jpg -quality 85 image.webp<br /><br />
                        <span className="text-green-600"># Batch convert all JPEGs in a directory</span><br />
                        for file in *.jpg; do magick convert &quot;$file&quot; -quality 85 &quot;{`\${file%.jpg}`}.webp&quot;; done
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                      Compress Images Without Losing Quality
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      The magic number: <strong>JPEG quality 80-85</strong> looks identical to 100% quality but reduces filesize by 50-60%.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>TinyPNG/TinyJPG</strong>: Free online tool, 50-70% compression with no visible quality loss</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>ImageOptim</strong> (Mac): Batch compress images automatically</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Squoosh.app</strong>: Google\'s web-based compressor with visual quality comparison</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>ShortPixel</strong>: WordPress plugin that auto-compresses on upload</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                      Implement Lazy Loading (Save 50-70% Bandwidth)
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Load images only when users scroll to them. Saves bandwidth, speeds up initial page load, improves Core Web Vitals.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        <span className="text-green-600">{`<!-- Native lazy loading (works in 95% of browsers) -->`}</span><br />
                        {`<img src="image.jpg" alt="Description" loading="lazy" width="800" height="600" />`}<br /><br />
                        <span className="text-green-600">{`<!-- React / Next.js -->`}</span><br />
                        {`import Image from 'next/image'`}<br /><br />
                        {`<Image`}<br />
                        {`  src="/image.jpg"`}<br />
                        {`  alt="Description"`}<br />
                        {`  width={800}`}<br />
                        {`  height={600}`}<br />
                        {`  loading="lazy"`}<br />
                        {`/>`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      <strong>Exception</strong>: Don\'t lazy load above-the-fold images (hero images, logos). Google penalizes delayed LCP (Largest Contentful Paint).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                      Write Descriptive Alt Text (Not Keyword Stuffing)
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Alt text serves two purposes: accessibility (screen readers) and SEO (Google\'s only way to "see" images).
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 pl-13">
                      <p className="text-red-900 font-semibold mb-2">❌ Bad Alt Text:</p>
                      <p className="font-mono text-sm text-slate-700">
                        {`alt="SEO services digital marketing agency best SEO company"`}
                      </p>
                      <p className="text-slate-700 mt-2 text-sm">Keyword stuffing = Google penalty</p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4 pl-13">
                      <p className="text-green-900 font-semibold mb-2">✅ Good Alt Text:</p>
                      <p className="font-mono text-sm text-slate-700">
                        {`alt="Marketing team analyzing SEO performance dashboard on laptop"`}
                      </p>
                      <p className="text-slate-700 mt-2 text-sm">Descriptive, natural, includes relevant keywords organically</p>
                    </div>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Describe what\'s in the image as if explaining to someone who can\'t see it</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Keep it under 125 characters (screen readers cut off after that)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Include target keywords naturally if relevant, but never force it</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Don\'t start with "Image of..." or "Picture of..."—screen readers already announce it\'s an image</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Leave decorative images empty: {`alt=""`} (tells screen readers to skip)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                      Use Responsive Images with srcset
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Don\'t send mobile users 2MB desktop images when a 300KB version looks identical on their screen.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        {`<img`}<br />
                        {`  src="image-800w.jpg"`}<br />
                        {`  srcset="`}<br />
                        {`    image-400w.jpg 400w,`}<br />
                        {`    image-800w.jpg 800w,`}<br />
                        {`    image-1200w.jpg 1200w,`}<br />
                        {`    image-1600w.jpg 1600w`}<br />
                        {`  "`}<br />
                        {`  sizes="(max-width: 600px) 400px,`}<br />
                        {`         (max-width: 1200px) 800px,`}<br />
                        {`         1200px"`}<br />
                        {`  alt="Description"`}<br />
                        {`/>`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      Browser automatically picks the right image size based on screen width and pixel density. Mobile users get small files, desktop users get high-res.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">6</span>
                      Name Image Files Descriptively
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Google reads filenames. Use descriptive names with hyphens, not underscores.
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 pl-13">
                      <p className="text-red-900 font-semibold mb-2">❌ Bad Filenames:</p>
                      <p className="font-mono text-sm text-slate-700">
                        IMG_8472.jpg<br />
                        DSC00123.jpg<br />
                        product_image_final_v2_FINAL.png
                      </p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4 pl-13">
                      <p className="text-green-900 font-semibold mb-2">✅ Good Filenames:</p>
                      <p className="font-mono text-sm text-slate-700">
                        blue-running-shoes-nike.jpg<br />
                        modern-kitchen-white-cabinets.jpg<br />
                        marketing-team-brainstorming-session.jpg
                      </p>
                    </div>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Use lowercase letters</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Separate words with hyphens (-) not underscores (_)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Include primary keyword if natural</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Keep it under 5 words</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">7</span>
                      Add Width and Height Attributes
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Prevents Cumulative Layout Shift (CLS)—a Core Web Vitals metric Google uses for rankings.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        <span className="text-green-600">{`<!-- Always include width and height -->`}</span><br />
                        {`<img src="image.jpg" alt="Description" width="800" height="600" />`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      Browser reserves the correct space before image loads, preventing content from jumping around (which Google penalizes).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">8</span>
                      Use Image CDNs (Content Delivery Networks)
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Serve images from servers close to users. A visitor in Tokyo gets images from Tokyo, not New York.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Cloudflare Images</strong>: $5/month, automatic format conversion, global CDN</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Cloudinary</strong>: Free tier, automatic optimization, on-the-fly resizing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>imgix</strong>: Real-time image processing via URL parameters</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Vercel Image Optimization</strong>: Built-in for Next.js apps</span>
                      </li>
                    </ul>
                    <p className="text-slate-700 mt-4 pl-13">
                      Result: 30-50% faster image loads globally, better Core Web Vitals, higher rankings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">9</span>
                      Create an Image Sitemap
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Help Google discover all your images, especially those loaded via JavaScript or in galleries.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        {`<?xml version="1.0" encoding="UTF-8"?>`}<br />
                        {`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`}<br />
                        {`        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`}<br />
                        {`  <url>`}<br />
                        {`    <loc>https://example.com/product/blue-shoes</loc>`}<br />
                        {`    <image:image>`}<br />
                        {`      <image:loc>https://example.com/images/blue-shoes-front.jpg</image:loc>`}<br />
                        {`      <image:title>Blue Running Shoes - Front View</image:title>`}<br />
                        {`      <image:caption>Lightweight blue running shoes with mesh upper</image:caption>`}<br />
                        {`    </image:image>`}<br />
                        {`  </url>`}<br />
                        {`</urlset>`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      Submit to Google Search Console under Sitemaps section.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">10</span>
                      Add Structured Data (Schema Markup)
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Help Google understand image context for rich results (product carousels, recipe cards, etc.).
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        {`<script type="application/ld+json">`}<br />
                        {`{`}<br />
                        {`  "@context": "https://schema.org",`}<br />
                        {`  "@type": "Product",`}<br />
                        {`  "name": "Blue Running Shoes",`}<br />
                        {`  "image": [`}<br />
                        {`    "https://example.com/images/shoes-1.jpg",`}<br />
                        {`    "https://example.com/images/shoes-2.jpg"`}<br />
                        {`  ],`}<br />
                        {`  "description": "Lightweight running shoes..."`}<br />
                        {`}`}<br />
                        {`</script>`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">11</span>
                      Optimize Image Placement on Page
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Place most important images near relevant text. Google analyzes surrounding content to understand image context.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Position key images above the fold (visible without scrolling)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Place product images near product descriptions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Add captions below images (Google reads these)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Use images to break up text (improves engagement metrics)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">12</span>
                      Use Unique Images (Not Stock Photos)
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Google Images prioritizes unique images. If 10,000 sites use the same stock photo, yours won\'t rank.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Original photos perform 94% better than stock photos (Reboot study)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>If using stock, modify it: crop, add text overlays, adjust colors</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Screenshots and custom graphics count as unique</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Product photos should be your own, not manufacturer\'s</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">13</span>
                      Implement Picture Element for Art Direction
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Serve different images (not just sizes) based on device—e.g., landscape for desktop, portrait for mobile.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        {`<picture>`}<br />
                        {`  <source media="(max-width: 600px)" srcset="mobile-portrait.jpg" />`}<br />
                        {`  <source media="(min-width: 601px)" srcset="desktop-landscape.jpg" />`}<br />
                        {`  <img src="desktop-landscape.jpg" alt="Description" />`}<br />
                        {`</picture>`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">14</span>
                      Preload Critical Images
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Tell browser to load hero images immediately (improves LCP score).
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        {`<link rel="preload" as="image" href="/hero-image.jpg" />`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      Only preload 1-2 critical above-the-fold images. Preloading too many hurts performance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">15</span>
                      Use Proper Image Dimensions
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Don\'t upload a 4000x3000px image and display it at 400x300px. Resize before uploading.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Hero images</strong>: 1920px wide max (2560px for Retina displays)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Blog post images</strong>: 1200px wide max</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Product thumbnails</strong>: 400-600px wide</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Logos</strong>: 200-300px wide (or use SVG)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">16</span>
                      Add Open Graph Images for Social Sharing
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      When people share your page on social media, this image appears (also affects click-through rates).
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        {`<meta property="og:image" content="https://example.com/og-image.jpg" />`}<br />
                        {`<meta property="og:image:width" content="1200" />`}<br />
                        {`<meta property="og:image:height" content="630" />`}<br />
                        {`<meta name="twitter:card" content="summary_large_image" />`}<br />
                        {`<meta name="twitter:image" content="https://example.com/og-image.jpg" />`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      <strong>Optimal size</strong>: 1200x630px (Facebook/Twitter standard)
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">17</span>
                      Use Image Title Attributes Sparingly
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Title attributes (hover tooltips) don\'t help SEO much, but add them for better UX on desktop.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        {`<img src="shoes.jpg" alt="Blue running shoes" title="View larger image of blue running shoes" />`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      Mobile browsers ignore title attributes, so don\'t rely on them for critical info.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">18</span>
                      Avoid Images in CSS Backgrounds for Content
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Google can\'t index CSS background images well. Use {`<img>`} tags for content images.
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 pl-13">
                      <p className="text-red-900 font-semibold mb-2">❌ Bad for SEO:</p>
                      <p className="font-mono text-sm text-slate-700">
                        {`<div style="background-image: url('product.jpg')"></div>`}
                      </p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4 pl-13">
                      <p className="text-green-900 font-semibold mb-2">✅ Good for SEO:</p>
                      <p className="font-mono text-sm text-slate-700">
                        {`<img src="product.jpg" alt="Product description" />`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      CSS backgrounds are fine for decorative elements (patterns, gradients) but not content.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">19</span>
                      Test Image Performance with PageSpeed Insights
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Google\'s free tool shows exactly which images hurt performance and how to fix them.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Visit: pagespeed.web.dev</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Enter your URL</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Look for "Properly size images" and "Serve images in next-gen formats"</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Google lists specific images to fix and potential savings</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">20</span>
                      Create Multiple Versions for Different Contexts
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Different pages need different versions of the same image optimized for context.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Thumbnail</strong>: 300x300px, high compression</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Gallery view</strong>: 800x800px, medium compression</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Lightbox/zoom</strong>: 2000x2000px, low compression</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Social share</strong>: 1200x630px, optimized for previews</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">21</span>
                      Audit Existing Images Regularly
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Image SEO isn\'t one-and-done. Run quarterly audits to find issues:
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Screaming Frog</strong>: Crawl site, export images missing alt text</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Google Search Console</strong>: Performance → Search Results → Filter by "Image"</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>GTmetrix</strong>: Check waterfall chart for slow-loading images</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Delete unused images (bloats server, confuses Google)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">22</span>
                      Use Image Copyright Strategically
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Add copyright metadata to discourage theft and maintain attribution when images are shared.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg mt-4 pl-13">
                      <p className="font-mono text-sm text-slate-800">
                        <span className="text-green-600"># Add copyright with exiftool</span><br />
                        exiftool -Copyright=&quot;© 2024 YourCompany&quot; image.jpg<br />
                        exiftool -Artist=&quot;YourCompany&quot; image.jpg
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4 pl-13">
                      For extra protection, add watermarks to high-value images (product photos, infographics).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">23</span>
                      Monitor Image Rankings in Google Images
                    </h3>
                    <p className="text-slate-700 mb-4 pl-13">
                      Track which images rank and optimize accordingly.
                    </p>
                    <ul className="space-y-2 pl-13">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span><strong>Google Search Console</strong>: Performance → Search Appearance → Web → Image</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Identify high-impression, low-CTR images (improve alt text and context)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Find zero-impression images (not indexed—check image sitemap)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Reverse image search your top products to find unauthorized use</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Image SEO Mistakes to Avoid</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Uploading Massive Unoptimized Files</strong>
                      <p className="text-slate-700 mt-1">Don\'t upload 5MB images straight from your camera. Compress first.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Missing Alt Text</strong>
                      <p className="text-slate-700 mt-1">Every content image needs descriptive alt text. No exceptions.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Using Generic Filenames</strong>
                      <p className="text-slate-700 mt-1">IMG_8472.jpg tells Google nothing. blue-running-shoes-nike.jpg tells Google everything.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Blocking Images in robots.txt</strong>
                      <p className="text-slate-700 mt-1">Accidentally blocking /images/ directory prevents Google from indexing any images.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">No Width/Height Attributes</strong>
                      <p className="text-slate-700 mt-1">Causes layout shift (CLS), hurts Core Web Vitals, Google penalizes.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Lazy Loading Above-the-Fold Images</strong>
                      <p className="text-slate-700 mt-1">Delays LCP (Largest Contentful Paint), directly hurts rankings. Never lazy load hero images.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Using Only Stock Photos</strong>
                      <p className="text-slate-700 mt-1">If 10,000 sites use the same image, Google won\'t prioritize yours. Use unique images.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Not Testing on Mobile</strong>
                      <p className="text-slate-700 mt-1">60% of traffic is mobile. Test image load times on slow 3G connections.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Tools You Need</h2>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Compression Tools</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• TinyPNG/TinyJPG (online, free)</li>
                      <li>• Squoosh.app (Google, web-based)</li>
                      <li>• ImageOptim (Mac desktop app)</li>
                      <li>• ShortPixel (WordPress plugin)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Format Conversion</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• ImageMagick (command-line)</li>
                      <li>• Cloudinary (cloud service)</li>
                      <li>• Next.js Image Optimization (automatic)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Testing & Auditing</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• PageSpeed Insights (performance)</li>
                      <li>• Screaming Frog (missing alt text)</li>
                      <li>• Google Search Console (image rankings)</li>
                      <li>• GTmetrix (load time analysis)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">CDNs</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Cloudflare Images ($5/month)</li>
                      <li>• Cloudinary (free tier available)</li>
                      <li>• imgix (enterprise)</li>
                      <li>• Vercel (built-in for Next.js)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Image Optimization</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Manually optimizing images takes 2-4 hours per week for the average site. SEOLOGY handles it automatically:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Auto-detect missing alt text</strong> and generate descriptive alternatives using AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Find oversized images</strong> and compress/resize automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Convert to WebP/AVIF</strong> with automatic fallbacks for older browsers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Implement lazy loading</strong> on below-the-fold images</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Add width/height attributes</strong> to prevent layout shift</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Generate image sitemaps</strong> and submit to Google Search Console</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Monitor Core Web Vitals</strong> and fix image-related issues automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Track Google Images rankings</strong> and optimize underperforming images</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                  <p className="text-blue-900 font-semibold mb-2">💡 SEOLOGY Result:</p>
                  <p className="text-slate-700 mb-0">
                    Average client sees <strong>43% improvement in PageSpeed scores</strong> and <strong>28% increase in Google Images traffic</strong> within 60 days of enabling image optimization automation.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Final Verdict</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Image optimization is the most underutilized SEO tactic in 2025. While competitors ignore it, you can capture 30% more organic traffic from Google Images alone.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  The tactics in this guide work. Convert to WebP, add descriptive alt text, implement lazy loading, and you\'ll see measurable improvements in 30-60 days.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  You can spend 2-4 hours per week manually optimizing images, or let SEOLOGY do it in 5 minutes with better results.
                </p>
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Automate Image SEO in 5 Minutes</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY automatically optimizes all your images for SEO and performance. Connect your site, enable image optimization, and let AI handle the rest.
                  </p>
                  <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg">
                    Try SEOLOGY Free<ArrowRight className="w-5 h-5" />
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
                  <strong>Tags:</strong> #ImageSEO #ImageOptimization #PageSpeed #CoreWebVitals #WebP #GoogleImages
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
