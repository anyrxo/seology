const fs = require('fs');
const path = require('path');

// Map of image filenames to descriptive alt text based on context
const imageAltTexts = {
  // Homepage
  'logo.png': 'SEOLOGY.AI Logo - AI-Powered SEO Automation Platform',
  'Frame-1.jpg': 'AI-powered dashboard showing automated SEO fixes and analytics',
  'Frame-2.jpg': 'Real-time SEO monitoring interface with issue detection',
  'Frame-3.jpg': 'Automated fix deployment system across multiple sites',
  'Frame-4.jpg': 'Integration dashboard showing Shopify and WordPress connections',
  'Frame-5.jpg': 'SEO performance metrics and ranking improvements over time',
  'Frame-6.jpg': 'Team collaboration features for SEO automation',
  'Frame-7.jpg': 'Enterprise-grade security and compliance dashboard',
  'Frame-8.jpg': 'API documentation and integration guides interface',
  
  // Team members (about.html, careers.html)
  'collaborator-01.jpg': 'Sarah Chen, Lead Engineer - Building AI-powered SEO automation',
  'collaborator-02.jpg': 'Marcus Rodriguez, Head of Product - Designing seamless user experiences',
  'collaborator-03.jpg': 'Emma Thompson, Customer Success - Helping clients achieve SEO results',
  'collaborator-04.jpg': 'David Kim, Senior Developer - Engineering scalable SEO solutions',
  'collaborator-05.jpg': 'Lisa Wang, Data Scientist - Training AI models for SEO optimization',
  'collaborator-06.jpg': 'James Miller, DevOps Lead - Maintaining infrastructure reliability',
  
  // Use case specific
  'ecommerce-dashboard.jpg': 'E-commerce SEO dashboard showing product page optimizations',
  'shopify-integration.jpg': 'Shopify store integration with automated meta tag generation',
  'wordpress-plugin.jpg': 'WordPress plugin interface for SEO automation',
  'analytics-graph.jpg': 'Traffic growth analytics showing 200% organic increase',
  'roi-calculator.jpg': 'ROI calculator showing time and cost savings from automation'
};

// Context-based alt text rules
const contextRules = {
  'about.html': {
    'Frame-7.jpg': 'Team collaboration and company culture at SEOLOGY.AI',
    'Frame-1.jpg': 'Mission-driven approach to solving SEO automation challenges'
  },
  'pricing.html': {
    'Frame-3.jpg': 'Pricing plan comparison showing Starter, Growth, and Scale tiers',
    'Frame-1.jpg': 'Feature breakdown across different pricing plans'
  },
  'ecommerce.html': {
    'Frame-5.jpg': 'Shopify product page SEO optimization with automated meta descriptions',
    'Frame-1.jpg': 'E-commerce category page with optimized schema markup',
    'Frame-6.jpg': 'Product feed optimization for Google Shopping'
  },
  'saas.html': {
    'Frame-1.jpg': 'SaaS documentation SEO optimization interface',
    'Frame-4.jpg': 'API reference pages with automated structured data'
  },
  'agencies.html': {
    'Frame-2.jpg': 'Agency dashboard managing SEO for multiple client websites',
    'Frame-7.jpg': 'White-label reporting system for agency clients'
  },
  'local-business.html': {
    'Frame-3.jpg': 'Local business Google Maps optimization dashboard',
    'Frame-5.jpg': 'NAP citation management across 150+ directories'
  },
  'enterprise.html': {
    'Frame-6.jpg': 'Enterprise security dashboard with SOC 2 compliance',
    'Frame-7.jpg': 'Multi-site management interface for 1000+ websites'
  },
  'blog.html': {
    'Frame-1.jpg': 'AI and machine learning visualization for SEO automation',
    'Frame-2.jpg': 'Technical SEO audit results and recommendations',
    'Frame-3.jpg': 'Content optimization workflow using AI',
    'Frame-4.jpg': 'Link building automation strategies',
    'Frame-5.jpg': 'Mobile SEO best practices and implementation',
    'Frame-6.jpg': 'Schema markup examples and rich snippet results'
  },
  'careers.html': {
    'Frame-1.jpg': 'Remote-first team working on innovative SEO solutions',
    'Frame-4.jpg': 'Collaborative engineering environment at SEOLOGY.AI'
  },
  'contact.html': {
    'Frame-2.jpg': 'Customer support team ready to help with SEO questions'
  }
};

const publicDir = path.join(__dirname, 'public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to process\n`);

let totalFixed = 0;

htmlFiles.forEach(filename => {
  const filepath = path.join(publicDir, filename);
  let html = fs.readFileSync(filepath, 'utf8');
  let fileFixed = 0;
  
  // Find all generic alt texts
  const genericAltPattern = /alt="Image - SEOLOGY\.AI SEO Platform"/g;
  
  // Replace with context-specific alt text
  html = html.replace(
    /<img([^>]*?)src="images\/([^"]+)"([^>]*?)alt="Image - SEOLOGY\.AI SEO Platform"([^>]*?)>/g,
    (match, before, imageName, middle, after) => {
      let newAlt = 'SEOLOGY.AI SEO Platform feature';
      
      // Check context-specific rules first
      if (contextRules[filename] && contextRules[filename][imageName]) {
        newAlt = contextRules[filename][imageName];
      }
      // Check general image mapping
      else if (imageAltTexts[imageName]) {
        newAlt = imageAltTexts[imageName];
      }
      // Generate descriptive alt based on filename
      else {
        const baseName = imageName.replace(/\.[^.]+$/, '').replace(/-/g, ' ');
        newAlt = `SEOLOGY.AI ${baseName} - SEO automation feature visualization`;
      }
      
      fileFixed++;
      totalFixed++;
      
      return `<img${before}src="images/${imageName}"${middle}alt="${newAlt}"${after}>`;
    }
  );
  
  if (fileFixed > 0) {
    fs.writeFileSync(filepath, html, 'utf8');
    console.log(`✓ ${filename}: Fixed ${fileFixed} alt texts`);
  }
});

console.log(`\n✓ Total fixed: ${totalFixed} image alt texts across all pages`);
