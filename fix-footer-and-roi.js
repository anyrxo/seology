const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing Footer Links and Redesigning Footer...\n');

// Get all HTML files
const htmlFiles = glob.sync('public/*.html');

// Link mapping: old path -> new path
const linkFixes = {
  'href="/blog"': 'href="blog.html"',
  'href="/careers"': 'href="careers.html"',
  'href="/contact"': 'href="contact.html"',
  'href="/roi-calculator"': 'href="roi-calculator.html"',
  'href="/ecommerce"': 'href="ecommerce.html"',
  'href="/saas"': 'href="saas.html"',
  'href="/agencies"': 'href="agencies.html"',
  'href="/local-business"': 'href="local-business.html"',
  'href="/enterprise"': 'href="enterprise.html"',
  'href="/enterprise-guides"': 'href="enterprise-guides.html"',
  'href="/security"': 'href="security.html"',
  'href="/demo"': 'href="demo.html"',
  'href="/help"': 'href="help.html"',
  'href="/docs"': 'href="docs.html"',
  'href="/api"': 'href="api.html"',
  'href="/privacy"': 'href="privacy.html"',
  'href="/terms"': 'href="terms.html"',
  'href="/dpa"': 'href="dpa.html"',
  'href="/subprocessors"': 'href="subprocessors.html"',
  'href="/pricing"': 'href="pricing.html"',
  'href="/projects"': 'href="projects.html"',
  'href="/about"': 'href="about.html"'
};

let fixedCount = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix all broken links
  Object.keys(linkFixes).forEach(oldLink => {
    if (html.includes(oldLink)) {
      html = html.replace(new RegExp(oldLink, 'g'), linkFixes[oldLink]);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Fixed links in ${path.basename(filePath)}`);
    fixedCount++;
  }
});

console.log(`\n✅ Fixed footer links in ${fixedCount} files`);
console.log('\n📝 Note: Footer redesign and ROI calculator rebuild will be done separately');
