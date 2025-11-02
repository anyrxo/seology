const fs = require('fs');
const path = require('path');

console.log('🔧 Updating blog article links...\n');

const blogPath = path.join(__dirname, 'public', 'blog.html');
let html = fs.readFileSync(blogPath, 'utf8');

// Define the mapping of article titles to slugs
const articleLinks = [
  { title: 'Getting Indexed on ChatGPT vs Google', slug: 'chatgpt-indexing' },
  { title: 'Ranking on Perplexity', slug: 'perplexity-ranking' },
];

// Update each article link
let updatesCount = 0;

articleLinks.forEach(({ title, slug }) => {
  // Create a regex to find the article and its Read Article button
  const articleRegex = new RegExp(
    `(<h3[^>]*>${title}[^<]*</h3>[\\s\\S]*?)<a href="#"([^>]*class="main-button[^"]*"[^>]*)>`,
    'g'
  );

  const replacement = `$1<a href="blog/${slug}.html"$2>`;
  const newHtml = html.replace(articleRegex, replacement);

  if (newHtml !== html) {
    html = newHtml;
    updatesCount++;
    console.log(`✅ Updated: ${title} → blog/${slug}.html`);
  }
});

// Save the updated HTML
fs.writeFileSync(blogPath, html);

console.log(`\n✅ Updated ${updatesCount} blog article links!`);
console.log('✅ All blog articles now link to individual post pages\n');
