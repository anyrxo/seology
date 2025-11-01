const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🎨 Removing cheap emojis, adding professional icons + animations...\\n');

// Professional SVG icons (Material Design Icons)
const icons = {
  lightning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2L11.5,5.5L9,6L11.5,6.5L12,9L12.5,6.5L15,6L12.5,5.5L12,2M12,22L12.5,18.5L15,18L12.5,17.5L12,14L11.5,17.5L9,18L11.5,18.5L12,22M17,10L16.75,11.25L15.5,11.5L16.75,11.75L17,13L17.25,11.75L18.5,11.5L17.25,11.25L17,10M7,10L6.75,11.25L5.5,11.5L6.75,11.75L7,13L7.25,11.75L8.5,11.5L7.25,11.25L7,10M19.5,6L19.25,7.25L18,7.5L19.25,7.75L19.5,9L19.75,7.75L21,7.5L19.75,7.25L19.5,6M4.5,6L4.25,7.25L3,7.5L4.25,7.75L4.5,9L4.75,7.75L6,7.5L4.75,7.25L4.5,6Z"/></svg>',
  rocket: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M19.22 4C19.5 4 19.75 4 19.96 4.05C20.13 5.44 19.94 8.3 16.66 11.58C14.96 13.29 12.93 14.6 10.65 15.47L8.5 13.37C9.42 11.06 10.73 9.03 12.42 7.34C15.18 4.58 17.64 4 19.22 4M19.22 2C17.24 2 14.24 2.69 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39S20.7 2 19.22 2M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53M6.24 22L9.88 18.36C9.54 18.27 9.21 18.12 8.91 17.91L4.83 22H6.24M2 22H3.41L8.18 17.24L6.76 15.83L2 20.59V22M2 19.17L6.09 15.09C5.88 14.79 5.73 14.47 5.64 14.12L2 17.76V19.17Z"/></svg>',
  target: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z"/></svg>',
  chart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"/></svg>',
  brain: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.33,12.91C21.42,14.46 20.71,15.95 19.44,16.86L20.21,18.35C20.44,18.8 20.47,19.33 20.27,19.8C20.08,20.27 19.69,20.64 19.21,20.8L18.42,21.05C18.25,21.11 18.06,21.14 17.88,21.14C17.37,21.14 16.89,20.91 16.56,20.5L14.44,18C13.55,17.85 12.71,17.47 12,16.9C11.5,17.05 11,17.13 10.5,17.13C9.62,17.13 8.74,16.86 8,16.34C7.47,16.5 6.93,16.57 6.38,16.56C5.59,16.57 4.81,16.41 4.08,16.11C2.65,15.47 1.7,14.07 1.65,12.5C1.57,11.78 1.69,11.05 2,10.39C2.2,9.97 2.56,9.37 2.77,9.05C2.68,8.56 2.66,8.05 2.7,7.55C2.77,6.43 3.28,5.38 4.12,4.64C5.28,3.63 6.87,3.36 8.29,3.95C8.87,4.15 9.4,4.47 9.86,4.88C10.45,4.31 11.58,3.32 13.11,3.1C14.7,2.82 16.36,3.39 17.31,4.61C18.28,5.91 18.44,7.59 17.74,9L17.77,9C18.65,9.12 19.47,9.5 20.09,10.09C20.73,10.68 21.16,11.47 21.3,12.32L21.33,12.91M16.13,4.41C16.1,4.16 15.96,3.93 15.73,3.82C15.47,3.68 15.17,3.68 14.91,3.82C13.85,4.39 12.59,4.31 11.6,3.61C11.38,3.44 11.07,3.44 10.85,3.61C10.14,4.16 9.44,4.31 8.5,4.31C8.39,4.31 8.39,4.31 8.39,4.31C8.39,4.31 8.39,4.31 8.39,4.31C7.74,4.31 7.12,4.63 6.75,5.16C6.5,5.53 6.41,6 6.5,6.43L6.61,7L6.16,7.41C5.78,7.71 5.5,8.11 5.37,8.57C5.25,9 5.29,9.44 5.46,9.85L5.75,10.62L5.07,11.17C4.84,11.34 4.66,11.59 4.5,11.87C4.23,12.35 4.13,12.91 4.19,13.47C4.25,14.03 4.46,14.55 4.81,14.97C5.38,15.66 6.28,16.03 7.19,15.95C7.84,15.89 8.46,15.65 9,15.25C9.27,15.07 9.62,15.07 9.89,15.25C10.43,15.63 11.07,15.84 11.75,15.84C12.14,15.84 12.53,15.76 12.89,15.61C13.3,15.41 13.8,15.5 14.12,15.82L16.24,18.32L17.03,18.07C17.04,18.06 17.05,18.05 17.06,18.03L16.15,16.2C16,15.9 16.03,15.53 16.23,15.25C17.23,13.96 17.32,12.15 16.47,10.75C16.29,10.5 16.26,10.17 16.4,9.89C17.18,8.3 17,6.36 15.75,4.91L16.13,4.41Z"/></svg>',
  scale: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,3L2,9L5,10.8V17.2L12,21L19,17.2V10.8L22,9M12,10.11L16.71,7.89L12,5.67L7.29,7.89M6.25,11.16L11,13.79V18.7L6.25,16.06M17.75,11.16V16.06L13,18.7V13.79"/></svg>'
};

// Animation CSS to add
const animationCSS = `
<style>
/* Fade in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale animation */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse animation for icons */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Slide in from left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Slide in from right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Number counter animation */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Icon container hover effect */
.icon-container {
  transition: all 0.3s ease;
}

.icon-container:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 8px 16px rgba(0,255,136,0.3));
}

/* Card entrance animations */
.animate-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-card:nth-child(1) { animation-delay: 0.1s; }
.animate-card:nth-child(2) { animation-delay: 0.2s; }
.animate-card:nth-child(3) { animation-delay: 0.3s; }
.animate-card:nth-child(4) { animation-delay: 0.4s; }

/* Smooth hover transitions */
.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0,255,136,0.2);
}

/* Number animations */
.animate-number {
  animation: countUp 0.8s ease-out forwards;
}

/* Savings highlight animation */
@keyframes highlightSavings {
  0%, 100% {
    background: linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,255,136,0.05));
  }
  50% {
    background: linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,255,136,0.1));
  }
}

.savings-highlight {
  animation: highlightSavings 2s ease-in-out infinite;
}
</style>
`;

const htmlFiles = glob.sync('public/*.html');
let updated = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace emoji lightning bolts with SVG
  if (html.includes('⚡')) {
    html = html.replace(/<div style="font-size: 48px; margin-bottom: 16px;">⚡<\/div>/g,
      `<div style="width: 56px; height: 56px; background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;" class="icon-container">
        <div style="width: 28px; height: 28px; color: var(--text-color-secondary, #00ff88);">${icons.lightning}</div>
      </div>`);

    html = html.replace(/<div style="font-size: 20px;">⚡<\/div>/g,
      `<div style="width: 40px; height: 40px; background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center;" class="icon-container">
        <div style="width: 20px; height: 20px; color: var(--text-color-secondary, #00ff88);">${icons.lightning}</div>
      </div>`);

    modified = true;
  }

  // Replace emoji icons in JavaScript objections
  if (html.includes('icon: "⚡"')) {
    // Update JavaScript to use proper icon markers instead
    html = html.replace(/icon: "⚡"/g, 'icon: "lightning"');
    modified = true;
  }

  // Add animation CSS if not already present
  if (!html.includes('@keyframes fadeInUp') && html.includes('</head>')) {
    html = html.replace('</head>', animationCSS + '</head>');
    modified = true;
  }

  // Add animation classes to industry cards
  if (html.includes('class="industry-card"') && !html.includes('animate-card')) {
    html = html.replace(/class="industry-card"/g, 'class="industry-card animate-card hover-scale"');
    modified = true;
  }

  // Add hover-scale to solution cards
  if (html.includes('class="solution-card"')) {
    html = html.replace(/class="solution-card"/g, 'class="solution-card hover-scale"');
    modified = true;
  }

  // Add animation to savings section
  if (html.includes('total-savings') && !html.includes('animate-number')) {
    html = html.replace(/id="total-savings"/g, 'id="total-savings" class="animate-number"');
    html = html.replace(/id="total-current-cost"/g, 'id="total-current-cost" class="animate-number"');
    html = html.replace(/id="savings-percentage"/g, 'id="savings-percentage" class="animate-number"');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('✓ ' + path.basename(filePath));
    updated++;
  }
});

// Update objections rendering in JavaScript to use icon names
const roiPath = path.join(__dirname, 'public', 'roi-calculator.html');
let roiHtml = fs.readFileSync(roiPath, 'utf8');

// Update the showObjections function to render proper icons
const iconRendering = \`
// Icon SVGs
const iconSVGs = {
  lightning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
  shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z"/></svg>',
  rocket: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M19.22 4C19.5 4 19.75 4 19.96 4.05C20.13 5.44 19.94 8.3 16.66 11.58C14.96 13.29 12.93 14.6 10.65 15.47L8.5 13.37C9.42 11.06 10.73 9.03 12.42 7.34C15.18 4.58 17.64 4 19.22 4M19.22 2C17.24 2 14.24 2.69 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39S20.7 2 19.22 2M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53M6.24 22L9.88 18.36C9.54 18.27 9.21 18.12 8.91 17.91L4.83 22H6.24M2 22H3.41L8.18 17.24L6.76 15.83L2 20.59V22M2 19.17L6.09 15.09C5.88 14.79 5.73 14.47 5.64 14.12L2 17.76V19.17Z"/></svg>',
  brain: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.33,12.91C21.42,14.46 20.71,15.95 19.44,16.86L20.21,18.35C20.44,18.8 20.47,19.33 20.27,19.8C20.08,20.27 19.69,20.64 19.21,20.8L18.42,21.05C18.25,21.11 18.06,21.14 17.88,21.14C17.37,21.14 16.89,20.91 16.56,20.5L14.44,18C13.55,17.85 12.71,17.47 12,16.9C11.5,17.05 11,17.13 10.5,17.13C9.62,17.13 8.74,16.86 8,16.34C7.47,16.5 6.93,16.57 6.38,16.56C5.59,16.57 4.81,16.41 4.08,16.11C2.65,15.47 1.7,14.07 1.65,12.5C1.57,11.78 1.69,11.05 2,10.39C2.2,9.97 2.56,9.37 2.77,9.05C2.68,8.56 2.66,8.05 2.7,7.55C2.77,6.43 3.28,5.38 4.12,4.64C5.28,3.63 6.87,3.36 8.29,3.95C8.87,4.15 9.4,4.47 9.86,4.88C10.45,4.31 11.58,3.32 13.11,3.1C14.7,2.82 16.36,3.39 17.31,4.61C18.28,5.91 18.44,7.59 17.74,9L17.77,9C18.65,9.12 19.47,9.5 20.09,10.09C20.73,10.68 21.16,11.47 21.3,12.32L21.33,12.91M16.13,4.41C16.1,4.16 15.96,3.93 15.73,3.82C15.47,3.68 15.17,3.68 14.91,3.82C13.85,4.39 12.59,4.31 11.6,3.61C11.38,3.44 11.07,3.44 10.85,3.61C10.14,4.16 9.44,4.31 8.5,4.31C8.39,4.31 8.39,4.31 8.39,4.31C8.39,4.31 8.39,4.31 8.39,4.31C7.74,4.31 7.12,4.63 6.75,5.16C6.5,5.53 6.41,6 6.5,6.43L6.61,7L6.16,7.41C5.78,7.71 5.5,8.11 5.37,8.57C5.25,9 5.29,9.44 5.46,9.85L5.75,10.62L5.07,11.17C4.84,11.34 4.66,11.59 4.5,11.87C4.23,12.35 4.13,12.91 4.19,13.47C4.25,14.03 4.46,14.55 4.81,14.97C5.38,15.66 6.28,16.03 7.19,15.95C7.84,15.89 8.46,15.65 9,15.25C9.27,15.07 9.62,15.07 9.89,15.25C10.43,15.63 11.07,15.84 11.75,15.84C12.14,15.84 12.53,15.76 12.89,15.61C13.3,15.41 13.8,15.5 14.12,15.82L16.24,18.32L17.03,18.07C17.04,18.06 17.05,18.05 17.06,18.03L16.15,16.2C16,15.9 16.03,15.53 16.23,15.25C17.23,13.96 17.32,12.15 16.47,10.75C16.29,10.5 16.26,10.17 16.4,9.89C17.18,8.3 17,6.36 15.75,4.91L16.13,4.41Z"/></svg>',
  chart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"/></svg>',
  scale: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,3L2,9L5,10.8V17.2L12,21L19,17.2V10.8L22,9M12,10.11L16.71,7.89L12,5.67L7.29,7.89M6.25,11.16L11,13.79V18.7L6.25,16.06M17.75,11.16V16.06L13,18.7V13.79"/></svg>',
  target: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/></svg>'
};
\`;

// Find where objections are rendered and update to use iconSVGs
if (roiHtml.includes('function showObjections')) {
  // Add icon SVGs before showObjections function
  roiHtml = roiHtml.replace('function showObjections', iconRendering + '\\nfunction showObjections');

  // Update the objection card rendering to use proper icons
  roiHtml = roiHtml.replace(
    /style="font-size: 32px; margin-right: 16px;">\$\{obj\.icon\}<\/div>/g,
    `style="width: 48px; height: 48px; min-width: 48px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 16px;" class="icon-container">
        <div style="width: 24px; height: 24px; color: var(--text-color-secondary, #00ff88);">\${iconSVGs[obj.icon] || iconSVGs.lightning}</div>
      </div>`
  );

  fs.writeFileSync(roiPath, roiHtml, 'utf8');
  console.log('✓ Updated objections to use SVG icons');
}

console.log('\\n✅ Updated ' + updated + ' files');
console.log('\\nChanges:');
console.log('  • Removed all emojis (looked cheap)');
console.log('  • Added professional SVG icons');
console.log('  • Added smooth animations (fadeInUp, scaleIn, pulse, etc.)');
console.log('  • Added hover effects with scale + glow');
console.log('  • Added number counter animations');
console.log('  • Added card entrance animations with stagger');
console.log('  • Added savings highlight pulse animation');
console.log('\\nSite now looks premium and professional!');
