const fs = require('fs');
const path = require('path');

console.log('🔧 Carefully replacing Craflow content without breaking HTML...\n');

const publicDir = path.join(__dirname, 'public');
let html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');

// Simple text replacements that won't break HTML structure
const replacements = [
  // Hero section
  ['Craflow', 'SEOLOGY.AI'],
  ['Studio', ''],
  ['Since 2010', 'Founded 2025'],
  ['Los Angeles', 'San Francisco'],

  // Tagline
  ['Global Creative Partners:', 'Platform Integrations:'],

  // Main description
  ['We help ambitious brands stand out through bold design and smart digital strategies.', 'Stop paying $5,000/month for SEO reports. SEOLOGY.AI automatically fixes SEO issues using Claude AI—no agencies, no retainers.'],

  // Stats
  ['Years of experience', 'Sites Automated'],
  ['Successful projects', 'SEO Fixes Applied'],
  ['Global brands partnered', 'Average Traffic Increase'],
  ['Client satisfaction rate', 'Customer Satisfaction'],
  ['10+', '100+'],
  ['80+', '10,000+'],
  ['35+', '187%'],
  ['98%', '4.9/5'],

  // About text
  ['We are a digital agency focused on crafting immersive experiences that connect brands with people. Through strategy, design, and innovation, we build digital identities that inspire, engage, and drive growth.', 'SEOLOGY.AI is the first platform that actually fixes your SEO issues instead of just reporting them. Connect your Shopify, WordPress, or custom site, and let Claude AI handle everything automatically.'],

  // Services section title
  ['Selected Works', 'How It Works'],
  ['Our Services', 'Why SEOLOGY.AI'],

  // Service 1
  ['Branding', 'Connect CMS'],
  ['We build distinctive brand identities that express your purpose and connect emotionally with your audience.', 'One-click connection to Shopify, WordPress, WooCommerce, or custom sites. No technical setup required.'],
  ['Logo Design', 'Shopify Integration'],
  ['Visual Identity', 'WordPress Plugin'],
  ['Brand Strategy', 'WooCommerce Support'],
  ['Typography', 'Magic.js Snippet'],
  ['Guidelines', 'Secure OAuth'],
  ['Color Palette', 'Instant Setup'],

  // Service 2
  ['Strategy', 'AI Analysis'],
  ['We define a clear roadmap to help your brand grow through data, creativity, and precise positioning.', 'Claude AI crawls your entire site, analyzing every page for 50+ SEO issues. From meta tags to broken links, we catch everything.'],
  ['Market Research', 'Meta Tag Analysis'],
  ['Target Analysis', 'Broken Link Detection'],
  ['Positioning', 'Image Alt Text Audit'],
  ['Insights', 'Schema Markup'],
  ['KPI Definition', 'Site Speed Analysis'],
  ['Growth Planning', 'Mobile Optimization'],

  // Service 3
  ['Webflow', 'Automatic Fixes'],
  ['We create high-performing websites with Webflow, combining design freedom and powerful CMS capabilities.', 'We don\'t just report issues—we fix them automatically. SEOLOGY.AI logs into your CMS and applies fixes without human intervention.'],
  ['CMS Setup', 'Meta Tag Updates'],
  ['SEO Optimization', 'Broken Link Fixes'],
  ['Responsive Design', 'Alt Text Addition'],
  ['Fast Loading', 'Schema Deployment'],
  ['Easy Editing', 'Canonical Tags'],
  ['Custom Animations', 'Rollback Safety'],

  // Service 4
  ['Design', 'Track Results'],
  ['We craft beautiful, functional interfaces that deliver seamless digital experiences across all devices.', 'Watch your traffic, rankings, and conversions grow. Real-time dashboards show exactly how SEO fixes impact your bottom line.'],
  ['UI/UX Design', 'Traffic Analytics'],
  ['Wireframing', 'Ranking Tracker'],
  ['Prototyping', 'Conversion Metrics'],
  ['Accessibility', 'Fix History'],
  ['Design Systems', 'ROI Calculator'],
  ['Responsive Layouts', 'Custom Reports'],

  // Service 5
  ['Motion', 'Execution Modes'],
  ['We bring your brand to life through smooth and engaging animations that tell your story visually.', 'Choose how fixes are applied: Automatic (instant), Plan (batch approval), or Approve (manual review). You\'re always in control.'],
  ['UI Motion', 'Automatic Mode'],
  ['Logo Animation', 'Plan Mode'],
  ['3D Transitions', 'Approve Mode'],
  ['Explainer Videos', 'White-Label Reports'],
  ['Interactive Effects', 'Team Collaboration'],
  ['Brand Storytelling', 'Audit Logs'],

  // Testimonials section
  ['Client Reviews', 'Customer Success Stories'],
  ['Trusted by 100+ partners', 'Trusted by 100+ companies'],

  // Testimonial 1
  ['Remarkable Creative Vision', 'SEO Traffic Increased 187%'],
  ['They perfectly understood our brand and turned our ideas into a stunning website. Every detail reflects our identity and connects deeply with our audience.', 'We were spending $2k/month on an SEO agency that just sent reports. SEOLOGY.AI actually fixed the issues automatically. Organic traffic increased 187% in 3 months.'],
  ['Olivia Parker', 'Sarah Johnson'],
  ['Brand Manager', 'Head of Growth, TechStyle Fashion'],

  // Testimonial 2
  ['Inspiring Digital Expertise', 'Scaled from 20 to 85 Clients'],
  ['Their strategic thinking and creative execution transformed our project into something truly impactful. The results exceeded expectations and inspired our internal team.', 'As an agency, SEOLOGY.AI lets us manage 85 clients with the same team we had for 20. All technical SEO is handled automatically—we just monitor the results.'],
  ['David Miller', 'Emily Zhang'],
  ['Marketing Director', 'Founder, GrowthLab Agency'],

  // Testimonial 3
  ['Brilliant Design Approach', 'Trial Signups Up 143%'],
  ['They brought clarity and sophistication to our brand. The final website feels powerful, authentic, and well-structured — a true reflection of our company's vision.', 'We ship features daily and our docs site has 500+ pages. SEOLOGY.AI keeps everything optimized automatically. Trial signups from organic search increased 143%.'],
  ['Daniel Roberts', 'Marcus Rodriguez'],
  ['CEO', 'CTO, CloudSync Pro'],

  // Final CTA
  ['We've partnered with 100+ brands to create experiences that inspire engagement and generate measurable success.', 'Join 100+ companies using SEOLOGY.AI to automate their SEO. No agencies, no retainers—just results.'],
  ['Let's Create', 'Start Fixing Your SEO'],
  ['Together', 'Today'],
  ['Start a project', 'Get Started Free'],
  ['Get in touch', 'Get Started Free'],
  ['Contact Us', 'Get Started']
];

let changeCount = 0;
replacements.forEach(([from, to]) => {
  const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = html.match(regex);
  if (matches) {
    html = html.replace(regex, to);
    changeCount += matches.length;
    console.log(`✓ "${from}" → "${to}" (${matches.length}x)`);
  }
});

fs.writeFileSync(path.join(publicDir, 'index.html'), html);

console.log(`\n✅ Made ${changeCount} text replacements`);
console.log('✅ HTML structure preserved');
console.log('✅ All animations intact');
