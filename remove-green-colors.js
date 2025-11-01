const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log(`\n🎨 Removing green colors and replacing with white/gray...\n`);

let totalChanges = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;

  // Replace all instances of the green color #00ff88 with white
  const greenHex = /#00ff88/gi;
  const beforeCount = (content.match(greenHex) || []).length;

  if (beforeCount > 0) {
    // Replace with white for fills, borders, etc.
    content = content.replace(greenHex, '#ffffff');
    changes += beforeCount;
    totalChanges += beforeCount;
  }

  // Replace rgba green colors with gray
  const greenRgba = /rgba\(0,\s*255,\s*136,\s*([0-9.]+)\)/gi;
  const rgbaMatches = content.match(greenRgba);
  if (rgbaMatches) {
    rgbaMatches.forEach(match => {
      // Extract the alpha value
      const alphaMatch = match.match(/rgba\(0,\s*255,\s*136,\s*([0-9.]+)\)/i);
      if (alphaMatch) {
        const alpha = alphaMatch[1];
        // Replace with white rgba
        content = content.replace(match, `rgba(255, 255, 255, ${alpha})`);
        changes++;
        totalChanges++;
      }
    });
  }

  if (changes > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ ${file}: ${changes} color changes`);
  }
});

console.log(`\n✅ Total color changes: ${totalChanges}\n`);
console.log('All green colors (#00ff88) replaced with white (#ffffff)');
console.log('All green rgba() colors replaced with white rgba()\n');
