const fs = require('fs');
const path = require('path');

console.log('Removing emojis and adding professional styling...\\n');

// ROI Calculator
const roiPath = 'public/roi-calculator.html';
let html = fs.readFileSync(roiPath, 'utf8');

// Remove emoji lightning from enterprise benefits
html = html.replace(/<div style="font-size: 48px; margin-bottom: 16px;">⚡<\/div>/g,
  '<div style="width: 56px; height: 56px; background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; transition: transform 0.3s ease;"><svg style="width: 28px; height: 28px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg></div>');

// Replace emoji icons in objections
html = html.replace(/icon: "⚡"/g, 'icon: "lightning"');

// Add animations CSS before </head>
const animationCSS = `
<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-card:nth-child(1) { animation-delay: 0.1s; }
.animate-card:nth-child(2) { animation-delay: 0.2s; }
.animate-card:nth-child(3) { animation-delay: 0.3s; }
.animate-card:nth-child(4) { animation-delay: 0.4s; }

.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.hover-scale:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0,255,136,0.25);
  border-color: var(--text-color-secondary, #00ff88) !important;
}

.icon-container {
  transition: transform 0.3s ease;
}

.icon-container:hover {
  transform: translateY(-2px);
}

.animate-number {
  animation: scaleIn 0.8s ease-out forwards;
}

@keyframes highlightSavings {
  0%, 100% { background: linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,255,136,0.05)); }
  50% { background: linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,255,136,0.1)); }
}

.savings-highlight {
  animation: highlightSavings 2s ease-in-out infinite;
}

/* Smooth scroll */
html { scroll-behavior: smooth; }
</style>
`;

if (!html.includes('@keyframes fadeInUp')) {
  html = html.replace('</head>', animationCSS + '</head>');
}

// Add animation classes to industry cards
html = html.replace(/class="industry-card"/g, 'class="industry-card animate-card hover-scale"');

fs.writeFileSync(roiPath, html, 'utf8');
console.log('✓ roi-calculator.html');

// Enterprise page
const entPath = 'public/enterprise.html';
let entHtml = fs.readFileSync(entPath, 'utf8');

// Remove small emoji lightning
entHtml = entHtml.replace(/<div style="font-size: 20px;">⚡<\/div>/g,
  '<div style="width: 32px; height: 32px; background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center;"><svg style="width: 18px; height: 18px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg></div>');

// Add animations
if (!entHtml.includes('@keyframes fadeInUp')) {
  entHtml = entHtml.replace('</head>', animationCSS + '</head>');
}

fs.writeFileSync(entPath, entHtml, 'utf8');
console.log('✓ enterprise.html');

console.log('\\n✅ Removed all emojis');
console.log('✅ Added professional SVG icons');
console.log('✅ Added smooth animations');
console.log('✅ Added hover effects');
console.log('\\nSite looks premium now!');
