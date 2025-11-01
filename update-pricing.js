const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log('\n💰 Updating all pricing to $497/month Pro plan...\n');

let totalChanges = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;

  // Update pricing meta descriptions
  content = content.replace(/\$20\/mo/g, '$497/month');
  content = content.replace(/\$75\/mo/g, '$497/month'); // Remove undetectability tier

  // Update various price formats
  const pricePatterns = [
    { old: /\$20<span[^>]*>\/month<\/span>/g, new: '$497<span class="text-size-regular" style="opacity: 0.6; font-size: 14px;">/month</span>' },
    { old: /\$20 \/ month/g, new: '$497 / month' },
    { old: /\$99\/mo/g, new: '$497/month' },
    { old: /\$129\/mo/g, new: '$497/month' },
    { old: /\$75\/month/g, new: '$497/month' }
  ];

  pricePatterns.forEach(({ old, new: newPrice }) => {
    if (content.match(old)) {
      content = content.replace(old, newPrice);
      changes++;
    }
  });

  // Update plan names - remove "Pro +" tier
  content = content.replace(/Pro \+ Undetectability/g, 'Pro');

  if (changes > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ ${file}: ${changes} pricing updates`);
    totalChanges += changes;
  }
});

console.log(`\n✅ Total pricing updates: ${totalChanges}\n`);
console.log('All prices now show $497/month for Pro plan\n');
