const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log(`\n🔧 Adding viewport meta tags to files...\n`);

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has viewport meta tag
  if (!content.includes('name="viewport"')) {
    // Find the charset meta tag and add viewport after it
    const charsetTag = '<meta charset="utf-8">';
    const viewportTag = '\n  <meta content="width=device-width, initial-scale=1" name="viewport">';

    if (content.includes(charsetTag)) {
      content = content.replace(charsetTag, charsetTag + viewportTag);
      fs.writeFileSync(filePath, content);
      console.log(`✓ Added viewport tag to ${file}`);
      fixed++;
    } else {
      console.log(`  ⚠️  ${file} - Could not find charset tag`);
    }
  } else {
    console.log(`  ${file} - already has viewport tag`);
  }
});

console.log(`\n✅ Added viewport tags to ${fixed} files\n`);
