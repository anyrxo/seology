const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log('\n🔘 Fixing white text on white buttons...\n');

let totalChanges = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;

  // Fix button text by ensuring color: #000 on all main-button instances
  // Pattern 1: <div class="button-text"> without color style
  const pattern1 = /<div class="button-text"([^>]*)>(?!.*color:)/g;
  const matches1 = content.match(pattern1);
  if (matches1) {
    content = content.replace(
      /<div class="button-text"([^>]*)>/g,
      (match, attrs) => {
        if (!attrs.includes('color:')) {
          changes++;
          return `<div class="button-text" style="color: #000; font-weight: 600;">`;
        }
        return match;
      }
    );
  }

  // Pattern 2: <div class="button-text is-transition"> without color
  content = content.replace(
    /<div class="button-text is-transition"([^>]*)>/g,
    (match, attrs) => {
      if (!attrs.includes('color:')) {
        changes++;
        return `<div class="button-text is-transition" style="color: #000; font-weight: 600;">`;
      }
      return match;
    }
  );

  // Pattern 3: Fix main-button background to ensure it's white
  content = content.replace(
    /class="main-button w-inline-block"/g,
    'class="main-button w-inline-block" style="background: #ffffff; color: #000;"'
  );

  if (changes > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ ${file}: Fixed ${changes} button text colors`);
    totalChanges += changes;
  }
});

console.log(`\n✅ Total button fixes: ${totalChanges}\n`);
console.log('All buttons now have black text on white background\n');
