const fs = require('fs');

console.log('Adding Organization schema to homepage and about page...\n');

const organizationSchema = `
  <!-- Organization Schema Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SEOLOGY.AI",
    "url": "https://seology.ai",
    "logo": "https://seology.ai/images/logo.png",
    "description": "AI-powered SEO automation platform that automatically fixes technical SEO issues instead of just reporting them.",
    "foundingDate": "2025",
    "sameAs": [
      "https://twitter.com/seologyai",
      "https://linkedin.com/company/seologyai",
      "https://github.com/seologyai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-SEOLOGY",
      "contactType": "Customer Service",
      "email": "support@seology.ai",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    }
  }
  </script>
`;

// Add to index.html
const indexPath = 'public/index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

if (!indexHtml.includes('"@type": "Organization"')) {
  indexHtml = indexHtml.replace('</head>', organizationSchema + '</head>');
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('✓ index.html - Added Organization schema');
} else {
  console.log('○ index.html - Organization schema already exists');
}

// Add to about.html
const aboutPath = 'public/about.html';
let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

if (!aboutHtml.includes('"@type": "Organization"')) {
  aboutHtml = aboutHtml.replace('</head>', organizationSchema + '</head>');
  fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
  console.log('✓ about.html - Added Organization schema');
} else {
  console.log('○ about.html - Organization schema already exists');
}

console.log('\n✅ Organization schema added successfully');
console.log('\nGoogle will now show:');
console.log('• Company logo in search results');
console.log('• Social media links');
console.log('• Contact information');
console.log('• Rich knowledge panel');
