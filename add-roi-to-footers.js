const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔗 Adding ROI Calculator link to all page footers...\n');

// Get all HTML files
const htmlFiles = glob.sync('public/*.html');

let updatedCount = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');

  // Check if ROI Calculator link already exists
  if (html.includes('roi-calculator') || html.includes('ROI Calculator')) {
    console.log(`⏭  Skipped ${path.basename(filePath)} (already has ROI Calculator link)`);
    return;
  }

  // Find the Resources section and add ROI Calculator link
  const resourcesPattern = /<div class="footer-content-block">\s*<div class="footer-text" style="font-weight: 600; margin-bottom: 16px;">Resources<\/div>\s*<div class="footer-block"><a href="\/blog"/;

  if (html.match(resourcesPattern)) {
    // Add ROI Calculator link right after Resources heading, before Blog
    html = html.replace(
      /<div class="footer-text" style="font-weight: 600; margin-bottom: 16px;">Resources<\/div>/,
      `<div class="footer-text" style="font-weight: 600; margin-bottom: 16px;">Resources</div>\n                <div class="footer-block"><a href="/roi-calculator" class="text-size-regular" style="opacity: 0.8;">ROI Calculator</a></div>`
    );

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated ${path.basename(filePath)}`);
    updatedCount++;
  } else {
    console.log(`⚠ Could not find Resources section in ${path.basename(filePath)}`);
  }
});

console.log(`\n✅ Added ROI Calculator link to ${updatedCount} page(s)`);
