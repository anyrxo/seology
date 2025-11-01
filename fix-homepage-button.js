const fs = require('fs');

console.log('Fixing homepage Get Started button issues...\\n');

// Fix homepage
const indexPath = 'public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Remove the "Contact Us" button that's blocking the Get Started button
// This is in the intro section around line 281
const contactButtonStart = html.indexOf('<a data-w-id="66df0832-d1a3-b60d-95f9-9db30cf268c1" href="#" class="button w-inline-block">');
if (contactButtonStart !== -1) {
  const contactButtonEnd = html.indexOf('</a>', contactButtonStart) + 4;
  html = html.substring(0, contactButtonStart) + html.substring(contactButtonEnd);
  console.log('✓ Removed blocking Contact Us button from homepage');
}

// 2. Change Get Started button to go directly to pricing page with anchor
// Find the Get Started button in the hero section (line ~113)
html = html.replace(
  /<a href="pricing\.html" class="button w-inline-block">/,
  '<a href="pricing.html#pricing-plans" class="button w-inline-block">'
);
console.log('✓ Updated Get Started button to scroll to pricing plans');

fs.writeFileSync(indexPath, html, 'utf8');

// Add scroll-to-section script to pricing page
const pricingPath = 'public/pricing.html';
let pricingHtml = fs.readFileSync(pricingPath, 'utf8');

// Find the pricing section and add an ID
pricingHtml = pricingHtml.replace(
  /<div style="display: grid; grid-template-columns: repeat\(3, 1fr\); gap: 32px; max-width: 1400px; margin: 0 auto;">/,
  '<div id="pricing-plans" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1400px; margin: 0 auto; scroll-margin-top: 100px;">'
);

// Add smooth scroll behavior script if not present
if (!pricingHtml.includes('scroll-behavior: smooth')) {
  const scrollScript = `
<style>
html {
  scroll-behavior: smooth;
}
</style>
<script>
// Smooth scroll to pricing plans if hash is present
if (window.location.hash === '#pricing-plans') {
  setTimeout(function() {
    const element = document.getElementById('pricing-plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}
</script>
`;
  pricingHtml = pricingHtml.replace('</body>', scrollScript + '</body>');
  console.log('✓ Added smooth scroll to pricing plans section');
}

fs.writeFileSync(pricingPath, pricingHtml, 'utf8');

console.log('\\n✅ Fixed homepage button issues:');
console.log('  • Removed blocking Contact Us button');
console.log('  • Get Started now goes to pricing.html#pricing-plans');
console.log('  • Pricing page scrolls to plan selection automatically');
console.log('\\nUsers now get taken straight to pricing selection!');
