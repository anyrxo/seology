const fs = require('fs');
const path = require('path');

// Read index.html to get the new footer
const indexPath = path.join(__dirname, 'public', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extract new footer section
const footerStart = indexContent.indexOf('<div class="w-layout-grid footer-grid" style="grid-template-columns:');
const footerEnd = indexContent.indexOf('</footer>', footerStart) + '</footer>'.length;

if (footerStart === -1 || footerEnd === -1) {
  console.log('Could not find footer in index.html');
  process.exit(1);
}

const newFooter = indexContent.substring(footerStart, footerEnd);

// Update all pages
const pages = ['about.html', 'contact.html', 'projects.html', 'pricing.html', 'enterprise.html', 'careers.html', 'blog.html', '404.html'];

pages.forEach(page => {
  const pagePath = path.join(__dirname, 'public', page);

  if (!fs.existsSync(pagePath)) {
    console.log(`✗ ${page} not found`);
    return;
  }

  let pageContent = fs.readFileSync(pagePath, 'utf8');

  // Find old footer
  const oldFooterStart = pageContent.indexOf('<div class="w-layout-grid footer-grid');
  const oldFooterEnd = pageContent.indexOf('</footer>', oldFooterStart) + '</footer>'.length;

  if (oldFooterStart === -1 || oldFooterEnd === -1) {
    console.log(`✗ Could not find footer in ${page}`);
    return;
  }

  // Replace
  const newContent = pageContent.substring(0, oldFooterStart) + newFooter;

  fs.writeFileSync(pagePath, newContent, 'utf8');
  console.log(`✓ Updated ${page}`);
});

console.log('Footer update complete!');
