const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
// Remove from all pages EXCEPT homepage
const files = ['agencies.html', 'ecommerce.html', 'local-business.html', 'saas.html'];

console.log(`\n🧹 Removing "Founded 2025, Global, AI-Powered" header badges...\n`);

let totalRemoved = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  ${file} not found, skipping`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Find and remove the entire header-inner-grid div with the badges
  const pattern = /<div class="w-layout-grid header-inner-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

  // More specific pattern - remove from opening div to closing divs
  const startMarker = '<div class="w-layout-grid header-inner-grid">';
  const startIdx = content.indexOf(startMarker);

  if (startIdx === -1) {
    console.log(`  ${file}: Header badges not found`);
    return;
  }

  // Find the matching closing tags
  // We need to close: header-inner-grid div, container-large div, padding-global div
  // Count divs to find the right closing point
  let depth = 0;
  let pos = startIdx + startMarker.length;
  let endIdx = -1;

  while (pos < content.length) {
    const nextOpen = content.indexOf('<div', pos);
    const nextClose = content.indexOf('</div>', pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      if (depth === 0) {
        // Need to close 3 more divs (for header-inner-grid, container-large, padding-global)
        let tempPos = nextClose + 6;
        let closesFound = 1;

        while (closesFound < 3 && tempPos < content.length) {
          const nextDiv = content.indexOf('</div>', tempPos);
          if (nextDiv === -1) break;
          closesFound++;
          tempPos = nextDiv + 6;
          if (closesFound === 3) {
            endIdx = tempPos;
            break;
          }
        }
        break;
      }
      depth--;
      pos = nextClose + 6;
    }
  }

  if (endIdx === -1) {
    console.log(`  ⚠️  ${file}: Could not find closing tags`);
    return;
  }

  // Remove the entire section
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);
  content = before + after;

  fs.writeFileSync(filePath, content);
  console.log(`✓ ${file}: Removed header badges`);
  totalRemoved++;
});

console.log(`\n✅ Removed header badges from ${totalRemoved} files\n`);
