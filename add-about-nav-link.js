const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Adding About link to navigation on all pages...\n');

const htmlFiles = glob.sync('public/*.html');
let fixed = 0;

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if About link already exists in navigation
  if (html.includes('href="about.html"') || html.includes('About</a>')) {
    console.log('○ ' + filename + ' - About link already exists');
    return;
  }

  // Find the Enterprise nav link and add About link after it
  // The navigation structure has: Enterprise, Careers, Pricing
  // We want: Enterprise, About, Careers, Pricing

  const enterpriseNavPattern = /<a href="enterprise\.html" class="nav-link w-nav-link">Enterprise<\/a>/;

  if (html.match(enterpriseNavPattern)) {
    const aboutLink = '<a href="about.html" class="nav-link w-nav-link">About</a>';
    html = html.replace(
      enterpriseNavPattern,
      '<a href="enterprise.html" class="nav-link w-nav-link">Enterprise</a>' + aboutLink
    );
    modified = true;
    console.log('✓ ' + filename + ' - Added About link to navigation');
    fixed++;
  } else {
    console.log('✗ ' + filename + ' - Could not find Enterprise nav link pattern');
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
  }
});

console.log('\n✅ Added About link to ' + fixed + ' pages');
console.log('\nNavigation now includes: Home > Vertical Solutions > Enterprise > About > Careers > Pricing');
