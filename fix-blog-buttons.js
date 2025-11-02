const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing blog page buttons and adding proper Craflow structure...\n');

const publicDir = path.join(__dirname, 'public');
const blogPath = path.join(publicDir, 'blog.html');

let html = fs.readFileSync(blogPath, 'utf8');

// Replace all "Read more →" links with proper Craflow button structure
const oldButtonPattern = /<a href="#" style="color: var\(--text-color-secondary, #ffffff\); font-size: 14px; text-decoration: none;">Read more →<\/a>/g;

const newButton = `<a href="#" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>`;

const matches = html.match(oldButtonPattern);
if (matches) {
  console.log(`Found ${matches.length} "Read more →" links to replace`);
  html = html.replace(oldButtonPattern, newButton);
}

// Also add proper hover effects to article cards by using class instead of inline events
html = html.replace(
  /onmouseenter="this\.style\.transform='translateY\(-4px\)'; this\.style\.borderColor='rgba\(255, 255, 255, 0\.3\)'; this\.style\.boxShadow='0 8px 24px rgba\(255, 255, 255, 0\.15\)';"/g,
  'class="blog-article-card"'
);

html = html.replace(
  /onmouseleave="this\.style\.transform=''; this\.style\.borderColor='rgba\(255,255,255,0\.08\)'; this\.style\.boxShadow='';"/g,
  ''
);

// Add CSS for blog article card hovers in the head
const blogCardCSS = `
  <style>
  /* Blog article card hover effects */
  .blog-article-card {
    transition: all 0.3s ease;
  }

  .blog-article-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
  }

  /* Ensure buttons in articles have proper styling */
  article .main-button {
    font-size: 14px;
  }
  </style>
</head>`;

html = html.replace('</head>', blogCardCSS);

// Fix: Newsletter CTA section button (at the bottom)
const newsletterButtonPattern = /<button[^>]*style="[^"]*"[^>]*>Subscribe to Newsletter<\/button>/;
if (newsletterButtonPattern.test(html)) {
  const newsletterButton = `<a href="#" class="main-button w-inline-block">
                  <div class="button-text-wrap">
                    <div class="button-text is-transition">Subscribe to Newsletter</div>
                  </div>
                  <div class="button-transition-wrap">
                    <div class="button-transition">
                      <div class="button-text">Subscribe to Newsletter</div>
                    </div>
                  </div>
                </a>`;

  html = html.replace(newsletterButtonPattern, newsletterButton);
  console.log('✅ Fixed newsletter subscription button');
}

fs.writeFileSync(blogPath, html);

console.log('✅ Blog page buttons fixed!');
console.log('✅ Replaced all "Read more →" links with proper Craflow .main-button structure');
console.log('✅ Added hover effects via CSS classes instead of inline JavaScript');
console.log('✅ Fixed newsletter CTA button');
console.log('\n📋 All buttons now have:');
console.log('  • .main-button class');
console.log('  • .button-text-wrap with .button-text.is-transition');
console.log('  • .button-transition-wrap with .button-transition');
console.log('  • Smooth hover animations');
