const fs = require('fs');
const path = require('path');

console.log('Fixing duplicate and wrong title tags...\n');

// Define unique, SEO-optimized title tags for each page
const titleTags = {
  'index.html': 'SEOLOGY.AI - AI-Powered SEO Automation That Actually Fixes Issues',
  'pricing.html': 'Pricing & Plans - SEOLOGY.AI | SEO Automation Platform',
  'about.html': 'About Us - SEOLOGY.AI | The Team Behind Automated SEO',
  'contact.html': 'Contact Us - SEOLOGY.AI | Sales, Support & Partnerships',
  'blog.html': 'SEO Blog - SEOLOGY.AI | AI-Powered Optimization Insights',
  'projects.html': 'Case Studies & Success Stories - SEOLOGY.AI | Real SEO Results',
  'careers.html': 'Careers - SEOLOGY.AI | Join Our Remote Team',
  'demo.html': 'Book a Demo - SEOLOGY.AI | See SEO Automation in Action',
  'help.html': 'Help Center - SEOLOGY.AI | SEO Automation Documentation',
  'docs.html': 'API Documentation - SEOLOGY.AI | Developer Resources',
  'api.html': 'API Reference - SEOLOGY.AI | Integration & Webhooks',
  'enterprise.html': 'Enterprise - SEOLOGY.AI | SEO Automation at Scale',
  'ecommerce.html': 'E-commerce SEO - SEOLOGY.AI | Automated Shopify & WooCommerce Optimization',
  'saas.html': 'SaaS SEO - SEOLOGY.AI | Automated SEO for Software Companies',
  'agencies.html': 'For Agencies - SEOLOGY.AI | White-Label SEO Automation',
  'local-business.html': 'Local Business SEO - SEOLOGY.AI | Automated Local Optimization',
  'privacy.html': 'Privacy Policy - SEOLOGY.AI',
  'terms.html': 'Terms of Service - SEOLOGY.AI',
  'dpa.html': 'Data Processing Agreement - SEOLOGY.AI',
  'subprocessors.html': 'Subprocessors - SEOLOGY.AI',
  'security.html': 'Security - SEOLOGY.AI | SOC 2 Compliance & Data Protection',
  'enterprise-guides.html': 'Enterprise Guides - SEOLOGY.AI | Advanced SEO Automation',
  'roi-calculator.html': 'ROI Calculator - SEOLOGY.AI | Calculate Your SEO Automation Savings',
  '404.html': 'Page Not Found (404) - SEOLOGY.AI | Return to Homepage'
};

let fixed = 0;

Object.keys(titleTags).forEach(filename => {
  const filePath = path.join('public', filename);

  if (!fs.existsSync(filePath)) {
    console.log('○ ' + filename + ' - File not found, skipping');
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Find and replace the title tag
  const titleRegex = /<title>.*?<\/title>/;
  const newTitle = '<title>' + titleTags[filename] + '</title>';

  if (html.match(titleRegex)) {
    const oldTitle = html.match(titleRegex)[0];
    html = html.replace(titleRegex, newTitle);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('✓ ' + filename + ' - Updated title tag');
    fixed++;
  } else {
    console.log('✗ ' + filename + ' - No title tag found');
  }
});

console.log('\n✅ Fixed ' + fixed + ' title tags');
console.log('\nAll pages now have unique, SEO-optimized titles!');
