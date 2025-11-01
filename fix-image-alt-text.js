const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Fixing image alt text across all pages...\n');

const htmlFiles = glob.sync('public/*.html');
let fixed = 0;

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix generic "CMS Connect Template" alt text
  if (html.includes('CMS Connect Template')) {
    html = html.replace(/CMS Connect Template/g, 'SEO Platform');
    modified = true;
  }

  // Fix "Image - SEOLOGY.AI CMS Connect Template" to be more descriptive
  html = html.replace(
    /alt="Image - SEOLOGY\.AI CMS Connect Template"/g,
    'alt="SEOLOGY.AI SEO automation dashboard interface"'
  );

  // Fix logo alt text
  html = html.replace(
    /alt="Logo - SEOLOGY\.AI CMS Connect Template"/g,
    'alt="SEOLOGY.AI Logo - AI-Powered SEO Automation"'
  );

  html = html.replace(
    /alt="Logo - SEOLOGY\.AI SEO Platform"/g,
    'alt="SEOLOGY.AI Logo - AI-Powered SEO Automation"'
  );

  // Check if any replacements were made
  if (html !== fs.readFileSync(filePath, 'utf8')) {
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('✓ ' + filename + ' - Fixed image alt text');
    fixed++;
  }
});

console.log('\n✅ Fixed image alt text on ' + fixed + ' pages');
console.log('\nSEO improvements:');
console.log('• Removed generic template references');
console.log('• Added descriptive, keyword-rich alt text');
console.log('• Better accessibility for screen readers');
console.log('• Improved image search rankings');
