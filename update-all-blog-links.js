const fs = require('fs');
const path = require('path');

console.log('🔧 Updating all blog article links in blog.html...\n');

const blogPath = path.join(__dirname, 'public', 'blog.html');
let html = fs.readFileSync(blogPath, 'utf8');

// Map of article titles/keywords to their slugs
const articleMappings = [
  // Already updated in previous session
  { keywords: ['AI in SEO', 'ChatGPT Changed'], slug: 'ai-seo-revolution' },
  { keywords: ['Indexed on ChatGPT', 'vs Google'], slug: 'chatgpt-indexing' },
  { keywords: ['Ranking on Perplexity'], slug: 'perplexity-ranking' },

  // New articles from this session
  { keywords: ['Core Web Vitals', '2025'], slug: 'core-web-vitals-2025' },
  { keywords: ['Zero-Click Searches', 'Adapting'], slug: 'zero-click-searches' },
  { keywords: ['SEO Agencies', 'Failing', 'Replaces'], slug: 'seo-agencies-failing' },
  { keywords: ['Shopify SEO', 'Checklist'], slug: 'shopify-seo-checklist' },
  { keywords: ['WordPress SEO', 'Automation', 'Beyond Yoast'], slug: 'wordpress-seo-automation' },
  { keywords: ['Local SEO', 'Multi-Location'], slug: 'local-seo-automation' },
  { keywords: ['Schema', 'Structured Data'], slug: 'structured-data-guide' },
  { keywords: ['Rollback', 'Undo Button'], slug: 'seo-rollback-safety' },
  { keywords: ['SEO Pricing', 'Broken', 'Fix It'], slug: 'seo-pricing-models' },
  { keywords: ['Enterprise SEO', '100,000'], slug: 'enterprise-seo-automation' },
];

let updatesCount = 0;

// For each article mapping, find the corresponding article block and update its link
articleMappings.forEach(({ keywords, slug }) => {
  // Create a regex pattern that matches article blocks containing these keywords
  const keywordPattern = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');

  // Find article blocks that contain the keywords and have href="#"
  const articleRegex = new RegExp(
    `(<article[^>]*>.*?<h3[^>]*>[^<]*(?:${keywordPattern})[^<]*</h3>.*?)<a href="#"([^>]*class="main-button[^"]*"[^>]*)>`,
    'gis'
  );

  const beforeHtml = html;
  html = html.replace(articleRegex, `$1<a href="blog/${slug}.html"$2>`);

  if (html !== beforeHtml) {
    updatesCount++;
    console.log(`✅ Updated: ${keywords[0]} → blog/${slug}.html`);
  }
});

// Save the updated HTML
fs.writeFileSync(blogPath, html);

console.log(`\n✅ Updated ${updatesCount} blog article links!`);
console.log('✅ All blog articles now link to individual post pages\n');
