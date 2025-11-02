const fs = require('fs');
const path = require('path');

console.log('Replacing content properly (longer phrases first)...\n');

let html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');

// Replace LONG phrases first (before single words)
html = html.replace(/We help ambitious brands stand out through bold design and smart digital strategies\./g, 'Stop paying $5,000/month for SEO reports. SEOLOGY.AI automatically fixes issues using Claude AI—no agencies, no retainers.');

html = html.replace(/We are a digital agency focused on crafting immersive experiences that connect brands with people\. Through strategy, design, and innovation, we build digital identities that inspire, engage, and drive growth\./g, 'SEOLOGY.AI is the first platform that actually fixes your SEO issues instead of just reporting them. Connect your Shopify, WordPress, or custom site, and let Claude AI handle everything automatically.');

html = html.replace(/We build distinctive brand identities that express your purpose and connect emotionally with your audience\./g, 'One-click connection to Shopify, WordPress, WooCommerce, or custom sites. No technical setup required.');

html = html.replace(/We define a clear roadmap to help your brand grow through data, creativity, and precise positioning\./g, 'Claude AI crawls your entire site, analyzing every page for 50+ SEO issues. From meta tags to broken links, we catch everything.');

html = html.replace(/We create high-performing websites with [^,]+, combining design freedom and powerful CMS capabilities\./g, 'We don\'t just report issues—we fix them automatically. SEOLOGY.AI logs into your CMS and applies fixes without human intervention.');

html = html.replace(/We craft beautiful, functional interfaces that deliver seamless digital experiences across all devices\./g, 'Watch your traffic, rankings, and conversions grow. Real-time dashboards show exactly how SEO fixes impact your bottom line.');

html = html.replace(/We bring your brand to life through smooth and engaging animations that tell your story visually\./g, 'Choose how fixes are applied: Automatic (instant), Plan (batch approval), or Approve (manual review). You\'re always in control.');

html = html.replace(/They perfectly understood our brand and turned our ideas into a stunning website\. Every detail reflects our identity and connects deeply with our audience\./g, 'We were spending $2k/month on an SEO agency that just sent reports. SEOLOGY.AI actually fixed the issues automatically. Organic traffic increased 187% in 3 months.');

html = html.replace(/Their strategic thinking and creative execution transformed our project into something truly impactful\. The results exceeded expectations and inspired our internal team\./g, 'As an agency, SEOLOGY.AI lets us manage 85 clients with the same team we had for 20. All technical SEO is handled automatically—we just monitor the results.');

html = html.replace(/They brought clarity and sophistication to our brand\. The final website feels powerful, authentic, and well-structured — a true reflection of our company's vision\./g, 'We ship features daily and our docs site has 500+ pages. SEOLOGY.AI keeps everything optimized automatically. Trial signups from organic search increased 143%.');

html = html.replace(/We've partnered with 100\+ brands to create experiences that inspire engagement and generate measurable success\./g, 'Join 100+ companies using SEOLOGY.AI to automate their SEO. No agencies, no retainers—just results.');

// Replace feature bullets
html = html.replace(/Logo Design/g, 'Shopify Integration');
html = html.replace(/Visual Identity/g, 'WordPress Plugin');
html = html.replace(/Brand Strategy/g, 'WooCommerce Support');
html = html.replace(/Typography/g, 'Magic.js Snippet');
html = html.replace(/Guidelines/g, 'Secure OAuth');
html = html.replace(/Color Palette/g, 'Instant Setup');

html = html.replace(/Market Research/g, 'Meta Tag Analysis');
html = html.replace(/Target Analysis/g, 'Broken Link Detection');
html = html.replace(/Positioning/g, 'Image Alt Text Audit');
html = html.replace(/Insights/g, 'Schema Markup');
html = html.replace(/KPI Definition/g, 'Site Speed Analysis');
html = html.replace(/Growth Planning/g, 'Mobile Optimization');

html = html.replace(/CMS Setup/g, 'Meta Tag Updates');
html = html.replace(/SEO Optimization/g, 'Broken Link Fixes');
html = html.replace(/Responsive Design/g, 'Alt Text Addition');
html = html.replace(/Fast Loading/g, 'Schema Deployment');
html = html.replace(/Easy Editing/g, 'Canonical Tags');
html = html.replace(/Custom Animations/g, 'Rollback Safety');

html = html.replace(/UI\/UX Design/g, 'Traffic Analytics');
html = html.replace(/Wireframing/g, 'Ranking Tracker');
html = html.replace(/Prototyping/g, 'Conversion Metrics');
html = html.replace(/Accessibility/g, 'Fix History');
html = html.replace(/Design Systems/g, 'ROI Calculator');
html = html.replace(/Responsive Layouts/g, 'Custom Reports');

html = html.replace(/UI Motion/g, 'Automatic Mode');
html = html.replace(/Logo Animation/g, 'Plan Mode');
html = html.replace(/3D Transitions/g, 'Approve Mode');
html = html.replace(/Explainer Videos/g, 'White-Label Reports');
html = html.replace(/Interactive Effects/g, 'Team Collaboration');
html = html.replace(/Brand Storytelling/g, 'Audit Logs');

// Now safe to replace section titles
html = html.replace(/Selected Works/g, 'How It Works');
html = html.replace(/Our Services/g, 'Why SEOLOGY.AI');
html = html.replace(/Client Reviews/g, 'Customer Success Stories');

// Replace "Brilliant Design Approach" (has Design in it)
html = html.replace(/Brilliant Track Results Approach/g, 'Trial Signups Up 143%');

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);
console.log('✅ Content replaced properly!');
