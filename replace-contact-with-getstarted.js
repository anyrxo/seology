const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Replacing random Contact Us buttons with Get Started...\\n');

const htmlFiles = glob.sync('public/*.html');

// Pages that should keep "Contact Us" in their main content (not counting footer)
const contactPagesExceptions = ['contact.html'];

let updated = 0;

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);

  // Skip contact page itself
  if (contactPagesExceptions.includes(filename)) {
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace Contact Us buttons (the big CTA buttons, not footer links)
  // These are the button-text divs inside button components
  const contactButtonPattern = /<div class="button-text[^"]*">Contact Us<\/div>/g;
  if (html.match(contactButtonPattern)) {
    html = html.replace(contactButtonPattern, '<div class="button-text">Get Started</div>');
    modified = true;
    console.log('✓ ' + filename + ' - Replaced Contact Us button with Get Started');
  }

  // Also replace the href="#" with href="pricing.html#pricing-plans" for these buttons
  // Find button links that still have href="#"
  const oldButtonPattern = /<a[^>]*href="#"[^>]*class="[^"]*button[^"]*w-inline-block">/g;
  if (html.match(oldButtonPattern)) {
    html = html.replace(
      oldButtonPattern,
      function(match) {
        // Replace href="#" with href="pricing.html#pricing-plans"
        return match.replace('href="#"', 'href="pricing.html#pricing-plans"');
      }
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    updated++;
  }
});

console.log('\\n✅ Updated ' + updated + ' files');
console.log('\\nChanges:');
console.log('  • Replaced Contact Us buttons with Get Started');
console.log('  • Updated button links to go to pricing.html#pricing-plans');
console.log('  • Kept Contact Us only in footer (as link)');
console.log('\\nNow all CTAs are consistent and conversion-focused!');
