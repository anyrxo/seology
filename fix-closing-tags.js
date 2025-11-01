const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log(`\n🔧 Fixing closing tags for ${files.length} files...\n`);

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let needsFix = false;

  // Check if missing </body> and </html>
  if (!content.includes('</body>') || !content.includes('</html>')) {
    needsFix = true;

    // Add closing tags if missing
    if (!content.includes('</body>')) {
      content += '\n  </body>';
    }
    if (!content.includes('</html>')) {
      content += '\n</html>';
    }

    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed ${file}`);
    fixed++;
  } else {
    console.log(`  ${file} - already has closing tags`);
  }
});

console.log(`\n✅ Fixed ${fixed} files\n`);
