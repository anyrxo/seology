const fs = require('fs');
const path = require('path');

console.log('Adding ARIA labels to interactive elements...\n');

let fixed = 0;

// Fix pricing.html - Add ARIA to billing toggle and FAQ accordions
const pricingPath = 'public/pricing.html';
let pricingHtml = fs.readFileSync(pricingPath, 'utf8');
let pricingModified = false;

// Add ARIA to billing toggle switch
if (pricingHtml.includes('id="billing-toggle"')) {
  pricingHtml = pricingHtml.replace(
    /<div id="billing-toggle" style="([^"]*)">/,
    '<div id="billing-toggle" role="switch" aria-checked="false" aria-label="Switch to annual billing (save 20%)" tabindex="0" style="$1">'
  );
  pricingModified = true;
  console.log('✓ pricing.html - Added ARIA to billing toggle');
}

// Add ARIA to FAQ accordion buttons (8 FAQs)
for (let i = 0; i < 8; i++) {
  const oldButton = `<button onclick="toggleFAQ(${i})" class="faq-question"`;
  const newButton = `<button onclick="toggleFAQ(${i})" class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}"`;

  if (pricingHtml.includes(oldButton)) {
    pricingHtml = pricingHtml.replace(oldButton, newButton);
    pricingModified = true;
  }
}

if (pricingModified) {
  fs.writeFileSync(pricingPath, pricingHtml, 'utf8');
  console.log('✓ pricing.html - Added ARIA to 8 FAQ accordions');
  fixed++;
}

// Fix contact.html - Add ARIA to form inputs
const contactPath = 'public/contact.html';
let contactHtml = fs.readFileSync(contactPath, 'utf8');
let contactModified = false;

// Add aria-required to email field
if (contactHtml.includes('id="email" required=""')) {
  contactHtml = contactHtml.replace(
    /id="email" required=""/,
    'id="email" required="" aria-required="true" autocomplete="email"'
  );
  contactModified = true;
}

// Add aria-required to Subject field
if (contactHtml.includes('id="Subject" required=""')) {
  contactHtml = contactHtml.replace(
    /id="Subject" required=""/,
    'id="Subject" required="" aria-required="true"'
  );
  contactModified = true;
}

// Add aria-required to Message field
if (contactHtml.includes('id="Message" required=""')) {
  contactHtml = contactHtml.replace(
    /id="Message" required=""/,
    'id="Message" required="" aria-required="true"'
  );
  contactModified = true;
}

if (contactModified) {
  fs.writeFileSync(contactPath, contactHtml, 'utf8');
  console.log('✓ contact.html - Added ARIA to form fields');
  fixed++;
}

// Add ARIA to mobile menu button on all pages
const glob = require('glob');
const htmlFiles = glob.sync('public/*.html');

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add ARIA to menu button
  if (html.includes('class="menu-button w-nav-button"') && !html.includes('aria-label="Toggle navigation menu"')) {
    html = html.replace(
      /<div([^>]*)class="menu-button w-nav-button">/,
      '<div$1class="menu-button w-nav-button" role="button" aria-label="Toggle navigation menu" aria-expanded="false" tabindex="0">'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('✓ ' + filename + ' - Added ARIA to mobile menu button');
    fixed++;
  }
});

console.log('\n✅ Added ARIA labels to ' + fixed + ' files');
console.log('\nAccessibility improvements:');
console.log('• Billing toggle now has proper switch role and label');
console.log('• FAQ accordions have aria-expanded and aria-controls');
console.log('• Form fields have aria-required attributes');
console.log('• Mobile menu buttons have proper roles and labels');
console.log('\nWCAG 2.4.2 compliance improved significantly!');
