const fs = require('fs');
const path = require('path');

console.log('🔧 Creating individual blog post pages...\n');

const publicDir = path.join(__dirname, 'public');
const blogDir = path.join(publicDir, 'blog');

// Create blog directory if it doesn't exist
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Read the main blog page as a template
const blogTemplatePath = path.join(publicDir, 'blog.html');
const templateHtml = fs.readFileSync(blogTemplatePath, 'utf8');

// Extract head and header sections
const headMatch = templateHtml.match(/<head>([\s\S]*?)<\/head>/);
const headerMatch = templateHtml.match(/<header[^>]*>([\s\S]*?)<\/header>/);
const footerMatch = templateHtml.match(/<footer[^>]*>([\s\S]*?)<\/footer>/);
const head = headMatch ? headMatch[1] : '';
const header = headerMatch ? headerMatch[0] : '';
const footer = footerMatch ? footerMatch[0] : '';

// Blog articles data
const articles = [
  {
    slug: 'ai-seo-revolution',
    title: 'The Rise of AI in SEO: How ChatGPT Changed Everything',
    description: 'Large language models like ChatGPT, Claude, and GPT-4 are fundamentally changing how we approach SEO.',
    category: 'AI & SEO',
    readTime: '7 min read',
    date: 'Jan 15, 2025',
    image: 'Frame-1.jpg',
    content: `
      <p class="text-size-large" style="opacity: 0.8; margin-bottom: 32px;">
        The SEO landscape has undergone a seismic shift with the emergence of large language models (LLMs) like ChatGPT, Claude, and GPT-4. Traditional search engine optimization strategies that worked for decades are being rapidly displaced by AI-powered answer engines.
      </p>

      <h2 class="heading-style-h3" style="margin-bottom: 16px;">The Death of the 10 Blue Links</h2>
      <p class="text-size-regular" style="opacity: 0.8; line-height: 1.8; margin-bottom: 24px;">
        Google's classic "10 blue links" search results page is becoming obsolete. ChatGPT, Perplexity, and other AI answer engines provide direct answers instead of making users click through multiple links. This fundamental change means traditional SEO tactics focused on ranking #1 are losing relevance.
      </p>

      <h2 class="heading-style-h3" style="margin-bottom: 16px;">What This Means for Your Business</h2>
      <p class="text-size-regular" style="opacity: 0.8; line-height: 1.8; margin-bottom: 24px;">
        Businesses that rely on organic search traffic need to adapt quickly. The new SEO is about being the source AI models cite, not just ranking on Google. This requires:
      </p>

      <ul style="margin: 16px 0 24px 24px; opacity: 0.8;">
        <li class="text-size-regular" style="margin-bottom: 12px;">Structured data markup that AI can easily parse</li>
        <li class="text-size-regular" style="margin-bottom: 12px;">Authoritative, cited content that LLMs trust</li>
        <li class="text-size-regular" style="margin-bottom: 12px;">Technical SEO that both search engines AND AI crawlers can index</li>
        <li class="text-size-regular" style="margin-bottom: 12px;">Brand presence across AI training datasets</li>
      </ul>

      <h2 class="heading-style-h3" style="margin-bottom: 16px;">How SEOLOGY.AI Adapts to This</h2>
      <p class="text-size-regular" style="opacity: 0.8; line-height: 1.8; margin-bottom: 24px;">
        SEOLOGY.AI uses Claude AI to analyze your site not just for Google, but for how AI answer engines will interpret your content. Our automated fixes ensure you're optimized for both traditional search and the new AI-powered discovery landscape.
      </p>
    `
  },
  {
    slug: 'chatgpt-indexing',
    title: 'Getting Indexed on ChatGPT vs Google: What\'s Different?',
    description: 'A comprehensive guide to optimizing your content for AI answer engines versus traditional search engines.',
    category: 'Technical SEO',
    readTime: '5 min read',
    date: 'Jan 12, 2025',
    image: 'Frame-2.jpg',
    content: `
      <p class="text-size-large" style="opacity: 0.8; margin-bottom: 32px;">
        Getting your content indexed by ChatGPT and other AI models requires a fundamentally different approach than traditional Google SEO. Here's what you need to know.
      </p>

      <h2 class="heading-style-h3" style="margin-bottom: 16px;">ChatGPT's Web Browsing Feature</h2>
      <p class="text-size-regular" style="opacity: 0.8; line-height: 1.8; margin-bottom: 24px;">
        Unlike Google's constant crawling, ChatGPT's web browsing is on-demand and selective. When users ask questions, ChatGPT may browse the web for current information. Your goal is to be the authoritative source it chooses to cite.
      </p>

      <h2 class="heading-style-h3" style="margin-bottom: 16px;">Key Differences</h2>
      <ul style="margin: 16px 0 24px 24px; opacity: 0.8;">
        <li class="text-size-regular" style="margin-bottom: 12px;"><strong>Robots.txt matters more</strong> - AI crawlers respect robots.txt strictly</li>
        <li class="text-size-regular" style="margin-bottom: 12px;"><strong>Structured data is critical</strong> - Schema.org markup helps AI understand context</li>
        <li class="text-size-regular" style="margin-bottom: 12px;"><strong>Authority signals</strong> - Citations, references, and E-E-A-T principles</li>
        <li class="text-size-regular" style="margin-bottom: 12px;"><strong>Content format</strong> - Clear, factual, well-structured content performs best</li>
      </ul>
    `
  },
  {
    slug: 'perplexity-ranking',
    title: 'Ranking on Perplexity: The New SEO Frontier',
    description: 'How to optimize your website to appear as a source in Perplexity AI\'s citations and answers.',
    category: 'AI & SEO',
    readTime: '6 min read',
    date: 'Jan 10, 2025',
    image: 'Frame-3.jpg',
    content: `
      <p class="text-size-large" style="opacity: 0.8; margin-bottom: 32px;">
        Perplexity AI is rapidly becoming a preferred search alternative, especially for researchers and professionals. Unlike traditional search, Perplexity provides direct answers with cited sources. Getting your site cited is the new "ranking #1."
      </p>

      <h2 class="heading-style-h3" style="margin-bottom: 16px;">Why Perplexity Citations Matter</h2>
      <p class="text-size-regular" style="opacity: 0.8; line-height: 1.8; margin-bottom: 24px;">
        When Perplexity cites your site as a source, users see you as an authority. This drives:
      </p>

      <ul style="margin: 16px 0 24px 24px; opacity: 0.8;">
        <li class="text-size-regular" style="margin-bottom: 12px;">Highly qualified traffic (users actively researching)</li>
        <li class="text-size-regular" style="margin-bottom: 12px;">Brand authority and trust signals</li>
        <li class="text-size-regular" style="margin-bottom: 12px;">Backlinks from users who reference Perplexity answers</li>
        <li class="text-size-regular" style="margin-bottom: 12px;">Compound visibility as AI models learn from successful citations</li>
      </ul>

      <h2 class="heading-style-h3" style="margin-bottom: 16px;">Optimization Strategies</h2>
      <p class="text-size-regular" style="opacity: 0.8; line-height: 1.8; margin-bottom: 24px;">
        SEOLOGY.AI automatically optimizes your site for Perplexity by ensuring proper schema markup, clean content structure, and authoritative signals that AI models trust.
      </p>
    `
  }
];

// Generate each blog post page
articles.forEach(article => {
  const blogPostHtml = `<!DOCTYPE html>
<html data-wf-domain="seology.ai" data-wf-page="${article.slug}" data-wf-site="craflow-template" lang="en">
<head>
  <meta charset="utf-8" />
  <title>${article.title} – SEOLOGY.AI</title>
  <meta content="${article.description}" name="description" />
  <meta content="${article.title} – SEOLOGY.AI" property="og:title" />
  <meta content="${article.description}" property="og:description" />
  <meta content="${article.title} – SEOLOGY.AI" property="twitter:title" />
  <meta content="${article.description}" property="twitter:description" />
  <meta property="og:type" content="article" />
  <meta content="summary_large_image" name="twitter:card" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <link href="../css/normalize.css" rel="stylesheet" type="text/css" />
  <link href="../css/webflow.css" rel="stylesheet" type="text/css" />
  <link href="../css/craflow-template.webflow.css" rel="stylesheet" type="text/css" />
  <link href="../css/animations.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
  <link href="../images/favicon.png" rel="shortcut icon" type="image/x-icon" />
  <link href="../images/webclip.png" rel="apple-touch-icon" />
</head>
<body>
  <div class="page-wrapper">
    ${header}

    <!-- Blog Article Content -->
    <section style="background: rgba(0,0,0,0.4); padding-top: 120px;">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large">
            <article style="max-width: 800px; margin: 0 auto;">

              <!-- Article Header -->
              <div style="margin-bottom: 48px;">
                <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                  <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">${article.category}</span>
                  <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">${article.readTime}</span>
                </div>

                <h1 class="heading-style-h1" style="margin-bottom: 16px;">${article.title}</h1>

                <div style="display: flex; gap: 16px; align-items: center; opacity: 0.6; margin-bottom: 32px;">
                  <span class="text-size-regular">${article.date}</span>
                  <span>•</span>
                  <span class="text-size-regular">By SEOLOGY.AI Team</span>
                </div>

                <div style="aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; margin-bottom: 32px;">
                  <img src="../images/${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
              </div>

              <!-- Article Content -->
              <div class="blog-content">
                ${article.content}
              </div>

              <!-- Article Footer CTA -->
              <div style="margin-top: 64px; padding: 48px; background: rgba(0,204,106,0.05); border: 2px solid rgba(0,204,106,0.2); border-radius: 20px; text-align: center;">
                <h3 class="heading-style-h3" style="margin-bottom: 16px;">Ready to automate your SEO?</h3>
                <p class="text-size-regular" style="opacity: 0.8; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">
                  SEOLOGY.AI uses Claude AI to automatically fix SEO issues on your site. No manual work required.
                </p>
                <a href="../pricing.html" class="main-button w-inline-block">
                  <div class="button-text-wrap">
                    <div class="button-text is-transition">Get Started Free</div>
                  </div>
                  <div class="button-transition-wrap">
                    <div class="button-transition">
                      <div class="button-text">Get Started Free</div>
                    </div>
                  </div>
                </a>
              </div>

              <!-- Back to Blog -->
              <div style="margin-top: 48px; text-align: center;">
                <a href="../blog.html" style="color: var(--text-color-secondary, #ffffff); text-decoration: none; opacity: 0.7; font-size: 14px;">← Back to Blog</a>
              </div>

            </article>
          </div>
        </div>
      </div>
    </section>

    ${footer}
  </div>

  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=craflow-template" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="../js/webflow.js" type="text/javascript"></script>
</body>
</html>`;

  const filePath = path.join(blogDir, `${article.slug}.html`);
  fs.writeFileSync(filePath, blogPostHtml);
  console.log(`✅ Created: blog/${article.slug}.html`);
});

console.log(`\n✅ Generated ${articles.length} blog post pages!`);
console.log('✅ All blog posts include proper header, footer, and CTA');
console.log('✅ Ready to update blog.html links\n');
