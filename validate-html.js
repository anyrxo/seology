const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log(`\n📋 Validating ${files.length} HTML files...\n`);

let errors = [];
let warnings = [];

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check 1: Basic HTML structure
  if (!content.includes('<!DOCTYPE html>')) {
    errors.push(`${file}: Missing DOCTYPE declaration`);
  }
  if (!content.includes('</html>')) {
    errors.push(`${file}: Missing closing </html> tag`);
  }
  if (!content.includes('</head>')) {
    errors.push(`${file}: Missing closing </head> tag`);
  }
  if (!content.includes('</body>')) {
    errors.push(`${file}: Missing closing </body> tag`);
  }

  // Check 2: Meta tags
  if (!content.includes('<meta charset=')) {
    warnings.push(`${file}: Missing charset meta tag`);
  }
  if (!content.includes('name="viewport"') && !content.includes("name='viewport'")) {
    warnings.push(`${file}: Missing viewport meta tag`);
  }

  // Check 3: Title tag
  if (!content.includes('<title>')) {
    errors.push(`${file}: Missing <title> tag`);
  }

  // Check 4: Check for duplicate sections that should have been removed
  const duplicateSections = [
    'section-about-intro',
    'section-about-team',
    'section.cta'
  ];

  duplicateSections.forEach(section => {
    // Special case: about.html is allowed to have team section
    if (section === 'section-about-team' && file === 'about.html') {
      return;
    }

    if (content.includes(`class="${section}"`)) {
      errors.push(`${file}: Still contains duplicate section: ${section}`);
    }
  });

  // Check 5: Broken image references
  const imageMatches = content.match(/src="images\/[^"]+"/g) || [];
  imageMatches.forEach(match => {
    const imagePath = match.match(/images\/([^"]+)/)[1];
    const fullPath = path.join(publicDir, 'images', imagePath);
    if (!fs.existsSync(fullPath)) {
      warnings.push(`${file}: Broken image reference: ${imagePath}`);
    }
  });

  // Check 6: Broken internal links
  const linkMatches = content.match(/href="[^"#:]+\.html[^"]*"/g) || [];
  linkMatches.forEach(match => {
    const linkMatch = match.match(/href="([^"#]+)"/);
    if (!linkMatch) return;

    const linkPath = linkMatch[1].split('#')[0];
    if (!linkPath.startsWith('http') && !linkPath.startsWith('//')) {
      const fullPath = path.join(publicDir, linkPath);
      if (!fs.existsSync(fullPath)) {
        warnings.push(`${file}: Broken internal link: ${linkPath}`);
      }
    }
  });

  // Check 7: Unclosed tags (basic check)
  const openSections = (content.match(/<section/g) || []).length;
  const closeSections = (content.match(/<\/section>/g) || []).length;
  if (openSections !== closeSections) {
    errors.push(`${file}: Mismatched section tags (${openSections} open, ${closeSections} close)`);
  }

  const openDivs = (content.match(/<div/g) || []).length;
  const closeDivs = (content.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) {
    warnings.push(`${file}: Mismatched div tags (${openDivs} open, ${closeDivs} close)`);
  }
});

// Report results
console.log('═══════════════════════════════════════════════════════');
console.log('                   VALIDATION REPORT                   ');
console.log('═══════════════════════════════════════════════════════\n');

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ ALL CHECKS PASSED!\n');
  console.log(`${files.length} files validated successfully with no issues.\n`);
} else {
  if (errors.length > 0) {
    console.log(`❌ ERRORS (${errors.length}):\n`);
    errors.forEach(err => console.log(`   ${err}`));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log(`⚠️  WARNINGS (${warnings.length}):\n`);
    warnings.forEach(warn => console.log(`   ${warn}`));
    console.log('');
  }
}

console.log('═══════════════════════════════════════════════════════');
console.log(`\n📊 Summary: ${files.length} files checked`);
console.log(`   ❌ Errors: ${errors.length}`);
console.log(`   ⚠️  Warnings: ${warnings.length}`);
console.log(`   ✅ Clean: ${files.length - new Set([...errors, ...warnings].map(x => x.split(':')[0])).size}\n`);

process.exit(errors.length > 0 ? 1 : 0);
