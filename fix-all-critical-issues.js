const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing ALL critical issues...\n');

const publicDir = path.join(__dirname, 'public');
let totalFixes = 0;

// ============================================================================
// 1. FIX HOMEPAGE: Remove overlapping hero images
// ============================================================================
console.log('1️⃣ Fixing overlapping hero images on homepage...');
let indexHtml = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
let indexChanges = 0;

// Remove the entire header-image-block section with 6 overlapping images
const imageBlockStart = indexHtml.indexOf('<div class="header-image-block">');
if (imageBlockStart !== -1) {
  const imageBlockEnd = indexHtml.indexOf('</div>', imageBlockStart + 500) + '</div>'.length;
  const beforeBlock = indexHtml.slice(0, imageBlockStart);
  const afterBlock = indexHtml.slice(imageBlockEnd);

  // Replace with a single, clean hero image
  const newImageBlock = `<div class="header-image-block">
              <div class="frame-image _01" style="position: relative; opacity: 1; transform: none;">
                <img sizes="100vw"
                     srcset="images/Frame-10-p-500.jpg 500w, images/Frame-10-p-800.jpg 800w, images/Frame-10-p-1080.jpg 1080w, images/Frame-10.jpg 1280w"
                     alt="SEOLOGY.AI - AI-Powered SEO Automation Platform"
                     src="images/Frame-10.jpg"
                     loading="eager"
                     class="header-image _01"
                     style="width: 100%; height: auto; display: block; border-radius: 16px;">
              </div>
            `;

  indexHtml = beforeBlock + newImageBlock + afterBlock;
  indexChanges++;
  console.log('   ✅ Replaced 6 overlapping images with 1 clean hero image');
}

fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);
console.log(`   ✅ Homepage: ${indexChanges} fixes applied\n`);
totalFixes += indexChanges;

// ============================================================================
// 2. REMOVE FOUNDED SECTION (not needed)
// ============================================================================
console.log('2️⃣ Removing Founded section...');
let foundedChanges = 0;

['index.html', 'about.html', 'pricing.html'].forEach(file => {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove "Founded 2025" or "Founded" sections
  const foundedPatterns = [
    /<div[^>]*>[\s\S]*?Founded[\s\S]*?2025[\s\S]*?<\/div>/gi,
    /<p[^>]*>[\s\S]*?Founded[\s\S]*?2025[\s\S]*?<\/p>/gi,
    /<section[^>]*>[\s\S]*?Founded[\s\S]*?<\/section>/gi
  ];

  foundedPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        content = content.replace(match, '');
        foundedChanges++;
      });
    }
  });

  fs.writeFileSync(filePath, content);
});

console.log(`   ✅ Removed Founded sections: ${foundedChanges} instances\n`);
totalFixes += foundedChanges;

// ============================================================================
// 3. REMOVE EXIT-INTENT POPUP (not needed)
// ============================================================================
console.log('3️⃣ Removing exit-intent popup...');
let popupChanges = 0;

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove exit-intent popup HTML
  const popupPattern = /<div[^>]*id="exit-intent-popup"[\s\S]*?<\/div>\s*<\/div>/gi;
  const matches = content.match(popupPattern);
  if (matches) {
    matches.forEach(match => {
      content = content.replace(match, '');
      popupChanges++;
    });
  }

  // Remove exit-intent popup JavaScript
  const jsPattern = /\/\/ Exit Intent Popup[\s\S]*?\}\)\(\);/gi;
  const jsMatches = content.match(jsPattern);
  if (jsMatches) {
    jsMatches.forEach(match => {
      content = content.replace(match, '');
      popupChanges++;
    });
  }

  // Remove the IIFE wrapper for exit popup
  content = content.replace(/\(function\(\) \{[\s\S]*?const popup = document\.getElementById\('exit-intent-popup'\);[\s\S]*?\}\)\(\);/gi, '');

  fs.writeFileSync(filePath, content);
});

console.log(`   ✅ Removed exit-intent popup: ${popupChanges} instances\n`);
totalFixes += popupChanges;

// ============================================================================
// 4. REMOVE ROI CALCULATOR FROM PRICING PAGE
// ============================================================================
console.log('4️⃣ Removing ROI calculator from pricing page...');
let pricingHtml = fs.readFileSync(path.join(publicDir, 'pricing.html'), 'utf8');
let pricingChanges = 0;

// Remove ROI calculator section
const roiSectionPattern = /<section[^>]*>[\s\S]*?ROI Calculator[\s\S]*?<\/section>/gi;
const roiMatches = pricingHtml.match(roiSectionPattern);
if (roiMatches) {
  roiMatches.forEach(match => {
    pricingHtml = pricingHtml.replace(match, '');
    pricingChanges++;
  });
}

// Remove any embedded calculator divs
const calcPattern = /<div[^>]*id="roi-calculator"[\s\S]*?<\/div>/gi;
const calcMatches = pricingHtml.match(calcPattern);
if (calcMatches) {
  calcMatches.forEach(match => {
    pricingHtml = pricingHtml.replace(match, '');
    pricingChanges++;
  });
}

fs.writeFileSync(path.join(publicDir, 'pricing.html'), pricingHtml);
console.log(`   ✅ Removed ROI calculator from pricing: ${pricingChanges} sections\n`);
totalFixes += pricingChanges;

// ============================================================================
// 5. FIX \n IN PRICING FAQ
// ============================================================================
console.log('5️⃣ Fixing \\n display issues in pricing FAQ...');
pricingHtml = fs.readFileSync(path.join(publicDir, 'pricing.html'), 'utf8');
let faqChanges = 0;

// Replace literal \n with <br> or remove them
const literalNewlinePattern = /\\n/g;
const matches = pricingHtml.match(literalNewlinePattern);
if (matches) {
  faqChanges = matches.length;
  pricingHtml = pricingHtml.replace(literalNewlinePattern, '<br>');
}

// Also fix any escaped newlines showing as text
pricingHtml = pricingHtml.replace(/&bsol;n/g, '<br>');
pricingHtml = pricingHtml.replace(/&#92;n/g, '<br>');

fs.writeFileSync(path.join(publicDir, 'pricing.html'), pricingHtml);
console.log(`   ✅ Fixed \\n issues: ${faqChanges} instances\n`);
totalFixes += faqChanges;

// ============================================================================
// SUMMARY
// ============================================================================
console.log('═══════════════════════════════════════');
console.log(`✨ TOTAL FIXES APPLIED: ${totalFixes}`);
console.log('═══════════════════════════════════════');
console.log('\n✅ Fixed:');
console.log('  1. Overlapping hero images → Single clean image');
console.log('  2. Founded sections removed');
console.log('  3. Exit-intent popup removed (all pages)');
console.log('  4. ROI calculator removed from pricing page');
console.log('  5. \\n display issues fixed in FAQ');
console.log('\n🎯 Next: Fix animations (requires separate investigation)');
