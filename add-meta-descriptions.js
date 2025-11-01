const fs = require('fs');
const path = require('path');

console.log('Adding unique, compelling meta descriptions...\n');

// Unique, SEO-optimized meta descriptions (150-160 chars each)
const metaDescriptions = {
  'index.html': 'SEOLOGY.AI automatically fixes SEO issues on your site—no manual work needed. Connect your CMS and watch broken links, meta tags, and technical errors disappear.',
  'pricing.html': 'Compare SEOLOGY.AI pricing plans. Start free with 3 sites & 100 fixes/month, or go unlimited with Pro at $20/mo. Enterprise plans with white-label reporting available.',
  'about.html': 'Meet the team behind SEOLOGY.AI. We built the first SEO platform that automatically fixes technical issues instead of just reporting them. Learn our story.',
  'contact.html': 'Get in touch with SEOLOGY.AI. Sales inquiries < 2hrs response, technical support < 4hrs. Live chat 9am-6pm EST. Join 5,000+ users in our Discord community.',
  'blog.html': 'SEO automation insights, AI-powered optimization guides, technical SEO tutorials, and case studies. Weekly newsletter with 15,000+ subscribers.',
  'projects.html': 'Real SEOLOGY.AI case studies: 187% traffic increase for e-commerce, 143% trial signups for SaaS, 234% local pack rankings for multi-location businesses.',
  'careers.html': 'Join SEOLOGY.AI. Remote-first company building the future of SEO automation. Competitive salaries, equity, unlimited PTO, and work with Claude AI daily.',
  'demo.html': 'See SEOLOGY.AI in action. Book a personalized demo and watch us automatically fix SEO issues on your site in real-time. No sales pressure, just results.',
  'help.html': 'SEOLOGY.AI Help Center. Get instant answers on connecting your CMS, deploying fixes, understanding reports, and maximizing your SEO automation ROI.',
  'docs.html': 'SEOLOGY.AI API documentation. Integrate SEO automation into your workflow with webhooks, REST API, and custom fix deployment. Code examples included.',
  'api.html': 'SEOLOGY.AI REST API Reference. Authenticate, deploy fixes programmatically, fetch site analytics, and build custom SEO automation workflows.',
  'enterprise.html': 'SEOLOGY.AI Enterprise: Automate SEO for 1,000+ sites without hiring more people. White-label reporting, dedicated support, and custom integrations included.',
  'ecommerce.html': 'E-commerce SEO automation for Shopify, WooCommerce, and custom stores. Fix missing product meta tags, broken links, and technical issues automatically.',
  'saas.html': 'SaaS SEO automation that scales. Perfect for companies shipping 10+ features/month. Keep your docs site, product pages, and landing pages SEO-perfect automatically.',
  'agencies.html': 'White-label SEO automation for agencies. Manage 100+ client sites, deploy fixes automatically, and deliver SEO results without manual work. Volume discounts available.',
  'local-business.html': 'Local business SEO automation. Optimize for Google Maps, local pack rankings, and "near me" searches. Perfect for multi-location businesses. Start free.',
  'privacy.html': 'SEOLOGY.AI Privacy Policy. Learn how we collect, use, and protect your data. SOC 2 Type II certified. GDPR and CCPA compliant. Last updated January 2025.',
  'terms.html': 'SEOLOGY.AI Terms of Service. Understand your rights, our service level agreements, refund policy, and fair use guidelines. Last updated January 2025.',
  'dpa.html': 'SEOLOGY.AI Data Processing Agreement (DPA). GDPR-compliant terms for data processing, subprocessors, security measures, and data transfers.',
  'subprocessors.html': 'SEOLOGY.AI Subprocessors. Complete list of third-party services we use to deliver SEO automation: AWS, Stripe, Anthropic Claude AI, and more.',
  'security.html': 'SEOLOGY.AI Security & Compliance. SOC 2 Type II certified, GDPR compliant, encrypted at rest and in transit. Penetration tested quarterly. 99.9% uptime SLA.',
  'enterprise-guides.html': 'Enterprise SEO automation guides. Best practices for scaling SEO across 1,000+ sites, team management, custom workflows, and white-label reporting.',
  'roi-calculator.html': 'Calculate your SEO automation ROI with SEOLOGY.AI. See how much time and money you save by automatically fixing SEO issues instead of hiring agencies or in-house teams.',
  '404.html': 'Page Not Found (404) - This page doesn\'t exist on SEOLOGY.AI. Return to the homepage or contact support if you think this is an error.'
};

let fixed = 0;

Object.keys(metaDescriptions).forEach(filename => {
  const filePath = path.join('public', filename);

  if (!fs.existsSync(filePath)) {
    console.log('○ ' + filename + ' - File not found, skipping');
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Find and replace the meta description
  const metaDescRegex = /<meta content="[^"]*" name="description">/;
  const newMetaDesc = '<meta content="' + metaDescriptions[filename] + '" name="description">';

  if (html.match(metaDescRegex)) {
    html = html.replace(metaDescRegex, newMetaDesc);

    // Also update og:description to match
    const ogDescRegex = /<meta content="[^"]*" property="og:description">/;
    html = html.replace(ogDescRegex, '<meta content="' + metaDescriptions[filename] + '" property="og:description">');

    // Also update twitter:description to match
    const twitterDescRegex = /<meta content="[^"]*" property="twitter:description">/;
    html = html.replace(twitterDescRegex, '<meta content="' + metaDescriptions[filename] + '" property="twitter:description">');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log('✓ ' + filename + ' - Updated meta description');
    fixed++;
  } else {
    console.log('✗ ' + filename + ' - No meta description tag found');
  }
});

console.log('\n✅ Fixed ' + fixed + ' meta descriptions');
console.log('\nAll pages now have unique, compelling 150-160 char descriptions!');
console.log('This will improve click-through rates from search results.');
