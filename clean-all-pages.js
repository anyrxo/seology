const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🧹 Cleaning up all pages - removing homepage copy-paste sections...\\n');

const htmlFiles = glob.sync('public/*.html');

// Pages that should remain simple (not homepage or vertical pages)
const pagesToClean = [
  'about.html',
  'blog.html',
  'careers.html',
  'contact.html',
  'demo.html',
  'docs.html',
  'dpa.html',
  'help.html',
  'privacy.html',
  'security.html',
  'subprocessors.html',
  'terms.html',
  'api.html',
  'enterprise-guides.html'
];

let cleaned = 0;

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);

  // Skip if not in pages to clean
  if (!pagesToClean.includes(filename)) {
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let sizeBefore = html.length;

  // Remove "Founded 2025 Global" section
  const foundedStart = html.indexOf('<div class="w-layout-grid header-inner-grid">');
  const foundedEnd = html.indexOf('</div>', html.indexOf('AI-Powered Automation', foundedStart)) + 6;
  if (foundedStart !== -1 && foundedEnd > foundedStart) {
    html = html.substring(0, foundedStart) + html.substring(foundedEnd);
    modified = true;
  }

  // Remove "Work Process" section (Scan/Analyze/Fix)
  const processStart = html.indexOf('<section class="section-about-process">');
  const processEnd = html.indexOf('</section>', processStart) + 10;
  if (processStart !== -1 && processEnd > processStart) {
    html = html.substring(0, processStart) + html.substring(processEnd);
    modified = true;
  }

  // Remove team member images sections
  const teamStart = html.indexOf('<div class="hero-images-wrapper">');
  const teamEnd = html.indexOf('</div>', html.indexOf('</div>', html.indexOf('</div>', teamStart) + 6) + 6) + 6;
  if (teamStart !== -1 && teamEnd > teamStart && filename !== 'about.html') { // Keep on about page
    html = html.substring(0, teamStart) + html.substring(teamEnd);
    modified = true;
  }

  // Remove random image sections with "We Are SEOLOGY" text
  let weAreIndex = html.indexOf('<div class="service-name">We</div>');
  while (weAreIndex !== -1) {
    // Find parent container
    const containerStart = html.lastIndexOf('<div', weAreIndex - 500);
    const containerEnd = html.indexOf('</div>', html.indexOf('<div class="service-name">SEOLOGY.AI</div>', weAreIndex)) + 6;
    if (containerStart !== -1 && containerEnd > containerStart) {
      html = html.substring(0, containerStart) + html.substring(containerEnd);
      modified = true;
    }
    weAreIndex = html.indexOf('<div class="service-name">We</div>');
  }

  // Remove duplicate CTA sections at bottom
  let ctaCount = 0;
  let ctaIndex = html.indexOf('class="section-home-cta"');
  while (ctaIndex !== -1) {
    ctaCount++;
    ctaIndex = html.indexOf('class="section-home-cta"', ctaIndex + 1);
  }

  // If there are multiple CTAs, remove all but the last one
  if (ctaCount > 1) {
    for (let i = 0; i < ctaCount - 1; i++) {
      const firstCTA = html.indexOf('<section class="section-home-cta">');
      const endCTA = html.indexOf('</section>', firstCTA) + 10;
      if (firstCTA !== -1 && endCTA > firstCTA) {
        html = html.substring(0, firstCTA) + html.substring(endCTA);
        modified = true;
      }
    }
  }

  // Remove social media sections (not in footer)
  const socialStart = html.indexOf('<div class="social-media-wrapper">');
  const socialEnd = html.indexOf('</div>', html.indexOf('</a>', html.indexOf('youtube.com', socialStart)) + 4) + 6;
  if (socialStart !== -1 && socialEnd > socialStart && socialStart < html.indexOf('<footer')) {
    html = html.substring(0, socialStart) + html.substring(socialEnd);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    const sizeAfter = html.length;
    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
    console.log(`✓ ${filename} - removed ${(sizeBefore - sizeAfter)} chars (${reduction}% reduction)`);
    cleaned++;
  }
});

console.log(`\\n✅ Cleaned ${cleaned} pages`);
console.log('\\nRemoved sections:');
console.log('  • "Founded 2025 Global" headers');
console.log('  • "Work Process" (Scan/Analyze/Fix) sections');
console.log('  • Team member image galleries');
console.log('  • "We Are SEOLOGY" image sections');
console.log('  • Duplicate CTAs');
console.log('  • Random social media sections');
console.log('\\nPages are now clean and page-specific!');
