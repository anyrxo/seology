const fs = require('fs');
const path = require('path');

console.log('Replacing Craflow text with SEOLOGY.AI text...\n');

let html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');

// Simple replacements
html = html.replace(/Craflow/g, 'SEOLOGY.AI');
html = html.replace(/Studio/g, '');
html = html.replace(/Since 2010/g, 'Founded 2025');
html = html.replace(/Los Angeles/g, 'San Francisco');
html = html.replace(/Global Creative Partners:/g, 'Platform Integrations:');
html = html.replace(/Years of experience/g, 'Sites Automated');
html = html.replace(/Successful projects/g, 'SEO Fixes Applied');
html = html.replace(/Global brands partnered/g, 'Average Traffic Increase');
html = html.replace(/Client satisfaction rate/g, 'Customer Satisfaction');
html = html.replace(/Selected Works/g, 'How It Works');
html = html.replace(/Our Services/g, 'Why SEOLOGY.AI');
html = html.replace(/Branding/g, 'Connect CMS');
html = html.replace(/Strategy/g, 'AI Analysis');
html = html.replace(/Webflow/g, 'Automatic Fixes');
html = html.replace(/Design/g, 'Track Results');
html = html.replace(/Motion/g, 'Execution Modes');
html = html.replace(/Client Reviews/g, 'Customer Success Stories');
html = html.replace(/Remarkable Creative Vision/g, 'SEO Traffic Increased 187%');
html = html.replace(/Inspiring Digital Expertise/g, 'Scaled from 20 to 85 Clients');
html = html.replace(/Brilliant Design Approach/g, 'Trial Signups Up 143%');
html = html.replace(/Olivia Parker/g, 'Sarah Johnson');
html = html.replace(/David Miller/g, 'Emily Zhang');
html = html.replace(/Daniel Roberts/g, 'Marcus Rodriguez');
html = html.replace(/Brand Manager/g, 'Head of Growth, TechStyle Fashion');
html = html.replace(/Marketing Director/g, 'Founder, GrowthLab Agency');
html = html.replace(/Get in touch/g, 'Get Started Free');
html = html.replace(/Start a project/g, 'Get Started Free');
html = html.replace(/Contact Us/g, 'Get Started');

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);
console.log('✅ Replacements complete!');
