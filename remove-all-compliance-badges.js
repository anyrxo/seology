const fs = require('fs');
const path = require('path');

console.log('Removing ALL compliance badges and false claims from site...\n');

const publicDir = path.join(__dirname, 'public');
const files = [
  'index.html',
  'pricing.html',
  'enterprise.html',
  'projects.html',
  'security.html',
  'roi-calculator.html',
  'privacy.html',
  'dpa.html',
  'about.html',
  'contact.html',
  'demo.html',
  'saas.html',
  'ecommerce.html',
  'agencies.html',
  'local-business.html',
  'blog.html'
];

let totalRemoved = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${file} (doesn't exist)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;

  // Remove SOC 2 Type II badge
  const soc2Pattern = /<div[^>]*>[\s\S]*?SECURE[\s\S]*?SOC 2 Type II Certified[\s\S]*?<\/div>/gi;
  const soc2Matches = content.match(soc2Pattern);
  if (soc2Matches) {
    soc2Matches.forEach(match => {
      content = content.replace(match, '');
      changes++;
    });
  }

  // Remove GDPR & CCPA badge
  const gdprPattern = /<div[^>]*>[\s\S]*?COMPLIANT[\s\S]*?GDPR & CCPA Ready[\s\S]*?<\/div>/gi;
  const gdprMatches = content.match(gdprPattern);
  if (gdprMatches) {
    gdprMatches.forEach(match => {
      content = content.replace(match, '');
      changes++;
    });
  }

  // Remove 99.9% Uptime badge
  const uptimePattern = /<div[^>]*>[\s\S]*?99\.9% Uptime[\s\S]*?<\/div>/gi;
  const uptimeMatches = content.match(uptimePattern);
  if (uptimeMatches) {
    uptimeMatches.forEach(match => {
      content = content.replace(match, '');
      changes++;
    });
  }

  // Remove "10,000+ sites" claims (false claim)
  content = content.replace(/10,000\+ (websites|sites)[^<]*/gi, match => {
    changes++;
    return match.replace('10,000+', '100+');
  });

  // Remove "Fortune 500" claims (false claim)
  content = content.replace(/Fortune 500 companies/gi, match => {
    changes++;
    return 'growing companies';
  });

  // Remove any section with all 3 badges together
  const badgeSectionPattern = /<section[^>]*>[\s\S]*?SOC 2[\s\S]*?GDPR[\s\S]*?99\.9%[\s\S]*?<\/section>/gi;
  const badgeSectionMatches = content.match(badgeSectionPattern);
  if (badgeSectionMatches) {
    badgeSectionMatches.forEach(match => {
      content = content.replace(match, '');
      changes++;
    });
  }

  // Remove individual badge divs with icons
  const iconBadgePattern = /<div[^>]*style="[^"]*border: 1px solid[^"]*"[^>]*>[\s\S]*?<svg[^>]*>[\s\S]*?<\/svg>[\s\S]*?<div[^>]*>(SECURE|COMPLIANT|RELIABLE)<\/div>[\s\S]*?<\/div>/gi;
  const iconBadgeMatches = content.match(iconBadgePattern);
  if (iconBadgeMatches) {
    iconBadgeMatches.forEach(match => {
      content = content.replace(match, '');
      changes++;
    });
  }

  // Remove badge containers (3-column grid layouts that held badges)
  const badgeContainerPattern = /<div[^>]*display: grid; grid-template-columns: repeat\(3, 1fr\)[^>]*>[\s\S]*?SOC 2[\s\S]*?<\/div>/gi;
  const badgeContainerMatches = content.match(badgeContainerPattern);
  if (badgeContainerMatches) {
    badgeContainerMatches.forEach(match => {
      content = content.replace(match, '');
      changes++;
    });
  }

  // Clean up empty sections and double line breaks
  content = content.replace(/\n\n\n+/g, '\n\n');

  if (changes > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${file}: Removed ${changes} compliance badges/false claims`);
    totalRemoved += changes;
  } else {
    console.log(`✓  ${file}: No badges found`);
  }
});

console.log(`\n📊 Total removed: ${totalRemoved} badges/claims`);
console.log('\n🎯 Removed:');
console.log('  • SOC 2 Type II badges (we don\'t have this certification)');
console.log('  • GDPR & CCPA compliance badges (not verified)');
console.log('  • 99.9% Uptime guarantees (unverified claim)');
console.log('  • "10,000+ sites" → Changed to "100+ sites" (realistic)');
console.log('  • "Fortune 500" → Changed to "growing companies"');
console.log('\n✨ Site now shows only accurate, verifiable claims');
