const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log(`\n🔧 Fixing all issues across ${files.length} files...\n`);

let totalChanges = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;

  // 1. Remove urgency messages
  const urgencyPatterns = [
    /⚡ Q4 2025 Enterprise Slots: Only 12 remaining/gi,
    /Only 12 remaining/gi,
    /only 47 spots left/gi,
    /47 spots remaining/gi
  ];

  urgencyPatterns.forEach(pattern => {
    if (content.match(pattern)) {
      content = content.replace(pattern, '');
      changes++;
    }
  });

  // 2. Remove compliance badges (keep in meta descriptions but remove from content)
  const complianceBadges = [
    /<div[^>]*>SOC 2 Type II<\/div>/gi,
    /<div[^>]*>GDPR & CCPA<\/div>/gi,
    /<h3[^>]*>SOC 2 Type II Certification<\/h3>/gi,
    /<h3[^>]*>GDPR & CCPA Compliance<\/h3>/gi,
    /<h3[^>]*>GDPR Compliant<\/h3>/gi,
    /<h3[^>]*>CCPA Compliant<\/h3>/gi
  ];

  complianceBadges.forEach(pattern => {
    if (content.match(pattern)) {
      content = content.replace(pattern, '');
      changes++;
    }
  });

  // 3. Remove social media links from footer (Twitter, Discord, Instagram, GitHub)
  const socialLinks = [
    /<a[^>]*href="https:\/\/twitter\.com\/seologyai"[^>]*>Twitter<\/a>/gi,
    /<a[^>]*href="https:\/\/discord\.gg\/seologyai"[^>]*>Discord<\/a>/gi,
    /<a[^>]*href="https:\/\/instagram\.com\/seologyai"[^>]*>Instagram<\/a>/gi,
    /<a[^>]*href="https:\/\/github\.com\/seologyai"[^>]*>GitHub<\/a>/gi
  ];

  socialLinks.forEach(pattern => {
    if (content.match(pattern)) {
      content = content.replace(pattern, '');
      changes++;
    }
  });

  // 4. Remove GitHub from JSON-LD schema
  content = content.replace(/"https:\/\/github\.com\/seologyai",?\s*/g, '');
  content = content.replace(/"https:\/\/twitter\.com\/seologyai",?\s*/g, '');

  if (changes > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ ${file}: ${changes} fixes applied`);
    totalChanges += changes;
  }
});

console.log(`\n✅ Total fixes applied: ${totalChanges}\n`);
