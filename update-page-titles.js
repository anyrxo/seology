const fs = require('fs');
const path = require('path');

const pages = {
  'ecommerce.html': {
    title: 'E-commerce SEO – SEOLOGY.AI',
    description: 'Automate SEO for your online store. Fix product pages, meta descriptions, and technical issues automatically.'
  },
  'saas.html': {
    title: 'SaaS SEO – SEOLOGY.AI',
    description: 'Optimize your SaaS product pages and documentation with AI-powered SEO automation.'
  },
  'agencies.html': {
    title: 'SEO for Agencies – SEOLOGY.AI',
    description: 'Manage SEO for all your clients in one platform. White-label reports and bulk automation.'
  },
  'local-business.html': {
    title: 'Local SEO – SEOLOGY.AI',
    description: 'Boost local search rankings automatically. Perfect for restaurants, services, and retail stores.'
  },
  'enterprise-guides.html': {
    title: 'Enterprise Guides – SEOLOGY.AI',
    description: 'Learn how to implement SEOLOGY.AI across your organization with our enterprise guides.'
  },
  'security.html': {
    title: 'Security – SEOLOGY.AI',
    description: 'Enterprise-grade security. SOC 2 Type II certified, GDPR compliant, and fully encrypted.'
  },
  'demo.html': {
    title: 'Book a Demo – SEOLOGY.AI',
    description: 'See SEOLOGY.AI in action. Schedule a personalized demo with our team.'
  },
  'help.html': {
    title: 'Help Center – SEOLOGY.AI',
    description: 'Get help with SEOLOGY.AI. Browse documentation, tutorials, and FAQs.'
  },
  'docs.html': {
    title: 'Documentation – SEOLOGY.AI',
    description: 'Complete documentation for SEOLOGY.AI. API reference, guides, and tutorials.'
  },
  'api.html': {
    title: 'API Reference – SEOLOGY.AI',
    description: 'SEOLOGY.AI API documentation. Integrate SEO automation into your applications.'
  },
  'privacy.html': {
    title: 'Privacy Policy – SEOLOGY.AI',
    description: 'How we collect, use, and protect your data at SEOLOGY.AI.'
  },
  'terms.html': {
    title: 'Terms of Service – SEOLOGY.AI',
    description: 'Terms and conditions for using SEOLOGY.AI services.'
  },
  'dpa.html': {
    title: 'Data Processing Agreement – SEOLOGY.AI',
    description: 'Data Processing Agreement for SEOLOGY.AI enterprise customers.'
  },
  'subprocessors.html': {
    title: 'Subprocessors – SEOLOGY.AI',
    description: 'List of third-party subprocessors used by SEOLOGY.AI.'
  }
};

Object.keys(pages).forEach(filename => {
  const filepath = path.join(__dirname, 'public', filename);

  if (!fs.existsSync(filepath)) {
    console.log(`✗ ${filename} not found`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');

  // Update title
  content = content.replace(
    /<title>About – SEOLOGY\.AI<\/title>/g,
    `<title>${pages[filename].title}</title>`
  );

  // Update meta descriptions
  content = content.replace(
    /SEOLOGY\.AI automatically fixes your SEO issues instantly\./g,
    pages[filename].description
  );

  // Update hero heading - find the h2 with "automatically fixes your SEO issues instantly"
  content = content.replace(
    /<h2 class="intro-text">automatically <span class="text-color-secondary">fixes<\/span><\/h2>/g,
    `<h2 class="intro-text">${pages[filename].description.split('.')[0]}</h2>`
  );

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ Updated ${filename}`);
});

console.log('All pages updated!');
