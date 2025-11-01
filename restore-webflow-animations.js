const fs = require('fs');
const path = require('path');

// Path to original Craflow template
const originalTemplatePath = 'C:\\Users\\manna\\Downloads\\Website inspo\\anyros-fantabulous-site.webflow\\index.html';
const publicDir = path.join(__dirname, 'public');

console.log('Restoring Webflow animations from original Craflow template...\n');

// Read original template
const originalContent = fs.readFileSync(originalTemplatePath, 'utf8');

// Extract all animation-related attributes from original
const animationPatterns = {
  dataWId: originalContent.match(/data-w-id="[^"]+"/g) || [],
  dataAnimation: originalContent.match(/data-animation="[^"]+"/g) || [],
  lottieAnimations: originalContent.match(/data-animation-type="lottie"[^>]+>/g) || [],
  transformStyles: originalContent.match(/style="[^"]*transform[^"]*"/g) || []
};

console.log('📊 Found in original Craflow template:');
console.log(`  • data-w-id attributes: ${animationPatterns.dataWId.length}`);
console.log(`  • data-animation attributes: ${animationPatterns.dataAnimation.length}`);
console.log(`  • Lottie animations: ${animationPatterns.lottieAnimations.length}`);
console.log(`  • Transform styles: ${animationPatterns.transformStyles.length}`);
console.log('');

// Extract unique data-w-id values
const originalIds = new Set();
animationPatterns.dataWId.forEach(attr => {
  const match = attr.match(/data-w-id="([^"]+)"/);
  if (match) originalIds.add(match[1]);
});

// Check current pages
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Count current animations
  const currentIds = new Set();
  const matches = content.match(/data-w-id="[^"]+"/g) || [];
  matches.forEach(attr => {
    const match = attr.match(/data-w-id="([^"]+)"/);
    if (match) currentIds.add(match[1]);
  });

  if (file === 'index.html') {
    console.log(`\n📄 ${file}:`);
    console.log(`  Current animations: ${currentIds.size}`);
    console.log(`  Original template: ${originalIds.size}`);
    console.log(`  Missing: ${originalIds.size - currentIds.size}`);

    // Show some missing IDs
    const missing = [...originalIds].filter(id => !currentIds.has(id));
    if (missing.length > 0) {
      console.log(`\n  Missing animation IDs (first 10):`);
      missing.slice(0, 10).forEach(id => {
        console.log(`    - ${id}`);
      });
    }
  }
});

console.log('\n\n🔍 Extracting key animation patterns from original template...\n');

// Extract header animations
const headerSection = originalContent.match(/<section[^>]*class="[^"]*header[^"]*"[^>]*>[\s\S]*?<\/section>/i);
if (headerSection) {
  const headerAnimations = headerSection[0].match(/data-w-id="[^"]+"/g) || [];
  console.log(`📌 Header section animations: ${headerAnimations.length} found`);
  headerAnimations.slice(0, 5).forEach(anim => console.log(`   ${anim}`));
}

// Extract CTA animations
const ctaSections = originalContent.match(/<section[^>]*class="[^"]*cta[^"]*"[^>]*>[\s\S]*?<\/section>/gi) || [];
console.log(`\n📌 CTA section animations: ${ctaSections.length} sections found`);

// Extract frame animations
const frameAnimations = originalContent.match(/class="frame-image[^"]*"[^>]*data-w-id="[^"]+"/g) || [];
console.log(`\n📌 Frame image animations: ${frameAnimations.length} found`);
frameAnimations.forEach(anim => console.log(`   ${anim}`));

// Extract partner/logo animations
const partnerAnimations = originalContent.match(/class="[^"]*partner[^"]*"[^>]*data-w-id="[^"]+"/g) || [];
console.log(`\n📌 Partner/logo animations: ${partnerAnimations.length} found`);

// Extract nav menu animations
const navAnimations = originalContent.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (navAnimations) {
  const navIds = navAnimations[0].match(/data-w-id="[^"]+"/g) || [];
  console.log(`\n📌 Navigation animations: ${navIds.length} found`);
  navIds.slice(0, 5).forEach(anim => console.log(`   ${anim}`));
}

// Extract scroll-triggered animations
const scrollTriggers = originalContent.match(/data-[^=]*scroll[^=]*="[^"]+"/gi) || [];
console.log(`\n📌 Scroll-triggered animations: ${scrollTriggers.length} found`);

console.log('\n\n💡 RECOMMENDATIONS:\n');
console.log('1. The original Craflow template has extensive IX2 (Webflow Interactions 2.0) animations');
console.log('2. These animations are controlled by webflow.js and require exact data-w-id matches');
console.log('3. Missing animations include:');
console.log('   - Header 3D frame animations (rotating/floating images)');
console.log('   - Partner logo scroll animations');
console.log('   - Navigation menu slide-in effects');
console.log('   - CTA section entrance animations');
console.log('   - Service card hover states');
console.log('   - Scroll-triggered parallax effects');
console.log('\n4. To fully restore, we need to copy the exact HTML structure with data-w-id attributes');
console.log('   from the original template, as these IDs are referenced in webflow.js');
console.log('\n5. The webflow.js file contains the animation timeline and configuration');
console.log('   for each data-w-id, so IDs must match exactly.');
