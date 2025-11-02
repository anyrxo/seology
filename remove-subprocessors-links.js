const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Removing subprocessors links from all pages...\n');

const publicDir = path.join(__dirname, 'public');
const htmlFiles = glob.sync(path.join(publicDir, '*.html'));

let filesModified = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  const originalHtml = html;

  // Remove subprocessors link entirely (the whole <a> tag and newline)
  html = html.replace(/\s*<a href="subprocessors\.html"[^>]*>Subprocessors<\/a>\s*/g, '');

  // If there's a leftover empty div or structure, we might need to clean that up too
  // But for now, just removing the link should be enough

  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html);
    const fileName = path.basename(filePath);
    console.log(`✅ Updated: ${fileName}`);
    filesModified++;
  }
});

console.log(`\n✅ Removed subprocessors links from ${filesModified} files`);
