const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const originalTemplate = 'C:\\Users\\manna\\Downloads\\Website inspo\\anyros-fantabulous-site.webflow\\index.html';

console.log('Adding missing Webflow animation IDs to restore original animations...\n');

const original = fs.readFileSync(originalTemplate, 'utf8');
const files = ['index.html', 'pricing.html', 'about.html', 'contact.html', 'projects.html'];

let totalAdded = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${file} (doesn't exist)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let addedCount = 0;

  // 1. Add missing nav link animations
  const navLinkPattern = /<a[^>]*href="[^"]*"[^>]*class="[^"]*nav-link[^"]*"[^>]*>/g;
  let navLinks = content.match(navLinkPattern) || [];

  navLinks.forEach((link, index) => {
    if (!link.includes('data-w-id')) {
      // Navigation link IDs from original template
      const navIds = [
        '32a340cc-db54-e7ac-40fb-6a617fcec3f7', // Home
        '32a340cc-db54-e7ac-40fb-6a617fcec3fe', // About
        '32a340cc-db54-e7ac-40fb-6a617fcec414', // Projects
        '32a340cc-db54-e7ac-40fb-6a617fcec41b'  // Contact
      ];

      if (index < navIds.length) {
        const idToAdd = navIds[index];
        const newLink = link.replace(/<a /, `<a data-w-id="${idToAdd}" `);
        content = content.replace(link, newLink);
        addedCount++;
      }
    }
  });

  // 2. Add animation to service/feature cards
  const cardPattern = /<div[^>]*class="[^"]*service[^"]*"[^>]*>/g;
  let cards = content.match(cardPattern) || [];

  cards.forEach((card, index) => {
    if (!card.includes('data-w-id')) {
      const cardIds = [
        'c6f0c9e9-544f-88dc-e8b3-4a8c0a764fba',
        '66df0832-d1a3-b60d-95f9-9db30cf268c1',
        '2b34b5ed-d271-0fd8-fca9-4d5710c19d11',
        '2b34b5ed-d271-0fd8-fca9-4d5710c19d1c'
      ];

      if (index < cardIds.length) {
        const idToAdd = cardIds[index];
        const newCard = card.replace(/<div /, `<div data-w-id="${idToAdd}" `);
        content = content.replace(card, newCard);
        addedCount++;
      }
    }
  });

  // 3. Add animation to social links
  const socialPattern = /<a[^>]*class="[^"]*social-link[^"]*"[^>]*>/g;
  let socialLinks = content.match(socialPattern) || [];

  socialLinks.forEach((link, index) => {
    if (!link.includes('data-w-id')) {
      const socialIds = [
        'd02f4b07-c966-2f0b-1c24-7d46a6be998c',
        'd02f4b07-c966-2f0b-1c24-7d46a6be9990',
        'd02f4b07-c966-2f0b-1c24-7d46a6be9994',
        'd02f4b07-c966-2f0b-1c24-7d46a6be9998'
      ];

      if (index < socialIds.length) {
        const idToAdd = socialIds[index];
        const newLink = link.replace(/<a /, `<a data-w-id="${idToAdd}" `);
        content = content.replace(link, newLink);
        addedCount++;
      }
    }
  });

  // 4. Add animation to partner logos
  const partnerPattern = /<div[^>]*class="[^"]*partner[^"]*"[^>]*>/g;
  let partners = content.match(partnerPattern) || [];

  partners.forEach((partner, index) => {
    if (!partner.includes('data-w-id') && partner.includes('partner-container')) {
      const partnerId = 'c8cd16af-733e-b24e-92f5-25ec476d0657';
      const newPartner = partner.replace(/<div /, `<div data-w-id="${partnerId}" `);
      content = content.replace(partner, newPartner);
      addedCount++;
    }
  });

  // 5. Add animation to overflow-wrap elements (text reveal animations)
  const overflowPattern = /<div[^>]*class="[^"]*overflow-wrap[^"]*"[^>]*>/g;
  let overflows = content.match(overflowPattern) || [];

  overflows.forEach((overflow, index) => {
    if (!overflow.includes('data-w-id')) {
      const overflowIds = [
        '48853f59-7f05-5ac0-b107-45e8179f87b3',
        '5e381122-b0e8-f025-902f-e7adcf321434',
        'bc2d527b-9054-fabc-9ffb-a9249d46253e',
        '40288436-aa08-d945-3163-0f428ac41ee5',
        '9a115856-9c4f-e78e-e2eb-e468a0c2de9a'
      ];

      if (index < overflowIds.length) {
        const idToAdd = overflowIds[index];
        const newOverflow = overflow.replace(/<div /, `<div data-w-id="${idToAdd}" `);
        content = content.replace(overflow, newOverflow);
        addedCount++;
      }
    }
  });

  // 6. Add animation to CTA sections
  const ctaPattern = /<section[^>]*class="[^"]*section-cta[^"]*"[^>]*>/g;
  let ctas = content.match(ctaPattern) || [];

  ctas.forEach((cta, index) => {
    if (!cta.includes('data-w-id')) {
      const ctaIds = [
        '5db47c9a-b574-23de-7915-600dabe1f39b',
        '5db47c9a-b574-23de-7915-600dabe1f3a1'
      ];

      if (index < ctaIds.length) {
        const idToAdd = ctaIds[index];
        const newCta = cta.replace(/<section /, `<section data-w-id="${idToAdd}" `);
        content = content.replace(cta, newCta);
        addedCount++;
      }
    }
  });

  if (addedCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${file}: Added ${addedCount} animation IDs`);
    totalAdded += addedCount;
  } else {
    console.log(`✓  ${file}: No changes needed`);
  }
});

console.log(`\n📊 Total animation IDs added: ${totalAdded}`);
console.log('\n🎬 Animations restored:');
console.log('  • Navigation link hover/slide effects');
console.log('  • Service card entrance animations');
console.log('  • Social icon hover animations');
console.log('  • Partner logo scroll reveals');
console.log('  • Text overflow reveal animations');
console.log('  • CTA section entrance effects');
console.log('\n✨ All animations now controlled by webflow.js IX2 system');
