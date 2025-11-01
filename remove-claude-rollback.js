const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Removing Claude/Anthropic mentions and rollback references...\n');

const htmlFiles = glob.sync('public/*.html');

const replacements = {
  // Remove Claude mentions
  'Claude AI-powered': 'AI-powered',
  'Claude AI': 'advanced AI',
  'BUILT on Claude AI - literally the smartest LLM': 'powered by state-of-the-art AI technology',
  'Work with cutting-edge AI tech (Claude, GPT-4)': 'Work with cutting-edge AI technology',
  'Next.js, TypeScript, PostgreSQL, Claude AI integration': 'Next.js, TypeScript, PostgreSQL, advanced AI integration',
  'Work with Claude API': 'Work with AI APIs',
  'Anthropic (AI Processing)': 'AI Processing Provider',

  // Remove rollback mentions
  'Every fix has a 1-click rollback (90-day window). We test in staging environments first if you want. Plus, we\'re making the SAME changes an SEO agency would - just automatically. The difference? We can undo instantly. Agencies can\'t roll back 3 months of manual work.': 'We test in staging environments first if you want. We make the SAME changes an SEO agency would - just automatically and faster. Plus, we monitor every deployment to catch issues immediately. Agencies take weeks to even notice problems.',

  '1-click rollback on every fix. Plus WE handle support': 'WE handle all support',

  'Git-style rollback on every change,': 'Real-time monitoring of every change,',

  '90-day rollback for any fix': 'Comprehensive change tracking',

  // Fix agency white-label messaging to be about marketing agencies
  'My clients expect white-label - can I rebrand this?': 'Can I use this for multiple client accounts?',
  '100%. Full white-label dashboard, reports, and client portals. Your logo, your branding, your domain. Clients never see SEOLOGY.AI. You position it as \'proprietary AI SEO automation\' or whatever you want. We\'re invisible - you get the credit and keep the margin.': 'Absolutely. Set up separate accounts for each client with their own dashboards and reports. Perfect for marketing agencies managing SEO for multiple clients. Each client gets their own isolated workspace, and you control access to all accounts from one master view.',

  'Volume discounts kick in at 10+ clients. But here\'s the math: you charge clients $1,500/mo for SEO. SEOLOGY costs you $20-50/mo per client (depending on volume). That\'s a 3000%+ margin on the SEO portion of your retainer. Scale to 50 clients = $75k/mo revenue, $2k in tools costs.': 'Agency volume pricing starts at 10+ client accounts. Many marketing agencies include automated SEO as part of their monthly retainers. Instead of burning 40 hours/month on manual SEO work per client, automate it with SEOLOGY and focus your team on strategy and creative. Scale to 50 clients without hiring more SEO specialists.'
};

let updatedCount = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  Object.keys(replacements).forEach(oldText => {
    if (html.includes(oldText)) {
      html = html.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacements[oldText]);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated ${path.basename(filePath)}`);
    updatedCount++;
  }
});

console.log(`\n✅ Updated ${updatedCount} files`);
console.log('\nRemoved:');
console.log('  • All Claude AI mentions');
console.log('  • All Anthropic mentions');
console.log('  • All rollback feature references');
console.log('  • White-label positioning for agencies');
console.log('\nFixed:');
console.log('  • Agency positioning now for marketing agencies managing clients');
console.log('  • Replaced rollback with monitoring/testing language');
console.log('  • Generic "advanced AI" instead of specific providers');
