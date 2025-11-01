const fs = require('fs');
const path = require('path');

console.log('Updating blog posts with real SEO-focused content...\n');

const filePath = path.join(__dirname, 'public', 'blog.html');
let content = fs.readFileSync(filePath, 'utf8');

// Define 6 real blog posts
const posts = [
  {
    image: 'Frame-1.jpg',
    category: 'AI & SEO',
    readTime: '7 min read',
    title: 'The Rise of AI in SEO: How ChatGPT Changed Everything',
    description: 'Large language models like ChatGPT, Claude, and GPT-4 are fundamentally changing how we approach SEO. Learn how AI-powered search and answer engines are disrupting traditional Google rankings.',
    date: 'Jan 15, 2025'
  },
  {
    image: 'Frame-3.jpg',
    category: 'Search Trends',
    readTime: '8 min read',
    title: 'Getting Indexed on ChatGPT vs Google: What Actually Works',
    description: 'ChatGPT now crawls and indexes websites differently than Google. Discover how to optimize your content for AI answer engines, not just traditional search results.',
    date: 'Jan 12, 2025'
  },
  {
    image: 'Frame-5.jpg',
    category: 'Perplexity AI',
    readTime: '6 min read',
    title: 'Ranking on Perplexity: The SEO Strategy Google Won\'t Tell You',
    description: 'Perplexity AI is becoming the go-to search engine for researchers and professionals. Learn how to optimize for citation-based ranking instead of backlinks.',
    date: 'Jan 10, 2025'
  },
  {
    image: 'Frame-6.jpg',
    category: 'Technical SEO',
    readTime: '9 min read',
    title: 'Core Web Vitals in 2025: What Actually Matters for Rankings',
    description: 'Google\'s Core Web Vitals continue to evolve. LCP, INP, and CLS are now weighted differently. Here\'s what changed and how to fix your scores automatically.',
    date: 'Jan 8, 2025'
  },
  {
    image: 'Frame-7.jpg',
    category: 'AI Search',
    readTime: '10 min read',
    title: 'Zero-Click Searches: How AI is Killing Traditional SEO',
    description: 'ChatGPT, Perplexity, and Google\'s AI Overviews mean users never visit your website. Adapt your SEO strategy for the zero-click future or get left behind.',
    date: 'Jan 5, 2025'
  },
  {
    image: 'Frame-8.jpg',
    category: 'Automation',
    readTime: '5 min read',
    title: 'Why SEO Agencies Are Failing Small Businesses (And What to Do Instead)',
    description: '$5,000/month retainers, monthly reports with no action, and zero ROI. Small businesses are ditching agencies for AI-powered SEO automation that actually fixes issues.',
    date: 'Jan 3, 2025'
  }
];

// Replace articles 1-6
for (let i = 0; i < 6; i++) {
  const post = posts[i];
  const articleNum = i + 1;

  // Find the article section
  const articleStart = content.indexOf(`<!-- Article ${articleNum} -->`);
  if (articleStart === -1) continue;

  const articleEnd = content.indexOf('</article>', articleStart) + '</article>'.length;

  const newArticle = `<!-- Article ${articleNum} -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  onmouseenter="this.style.transform='translateY(-4px)'; this.style.borderColor='rgba(255, 255, 255, 0.3)'; this.style.boxShadow='0 8px 24px rgba(255, 255, 255, 0.15)';"
                  onmouseleave="this.style.transform=''; this.style.borderColor='rgba(255,255,255,0.08)'; this.style.boxShadow='';">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">${post.category}</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">${post.readTime}</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">${post.title}</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">${post.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">${post.date}</span>
                      <a href="#" style="color: var(--text-color-secondary, #ffffff); font-size: 14px; text-decoration: none;">Read more →</a>
                    </div>
                  </div>
                </article>`;

  content = content.slice(0, articleStart) + newArticle + content.slice(articleEnd);
  console.log(`✓ Updated Article ${articleNum}: ${post.title}`);
}

fs.writeFileSync(filePath, content);

console.log('\n✅ Blog posts updated successfully!');
console.log('\nNew blog topics:');
console.log('  1. The Rise of AI in SEO: ChatGPT impact');
console.log('  2. Getting Indexed on ChatGPT vs Google');
console.log('  3. Ranking on Perplexity AI');
console.log('  4. Core Web Vitals in 2025');
console.log('  5. Zero-Click Searches killing traditional SEO');
console.log('  6. Why SEO Agencies Are Failing Small Businesses');
console.log('\nAll posts are SEO-focused and highly relevant to current trends.');
