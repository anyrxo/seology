#!/usr/bin/env node

/**
 * COMPLETE CRAFLOW ANIMATION RESTORATION SCRIPT V2
 * Enhanced version with improved Lottie extraction and IX2 analysis
 */

const fs = require('fs');
const path = require('path');

// Paths
const SOURCE_TEMPLATE = 'C:\\Users\\manna\\Downloads\\Website inspo\\anyros-fantabulous-site.webflow';
const TARGET_DIR = 'c:\\Users\\manna\\Downloads\\iimagined.webflow (1)\\public';

console.log('='.repeat(80));
console.log('COMPLETE CRAFLOW ANIMATION RESTORATION V2');
console.log('='.repeat(80));
console.log('');

// Extract Lottie animations with improved regex
function extractLottieAnimations() {
  console.log('Extracting Lottie animations...');

  const htmlPath = path.join(SOURCE_TEMPLATE, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const lottieAnimations = [];

  // Match entire div elements with lottie data
  const lottieRegex = /<div[^>]*data-animation-type="lottie"[^>]*>/g;
  let match;
  let count = 0;

  while ((match = lottieRegex.exec(htmlContent)) !== null) {
    const divTag = match[0];
    count++;

    // Extract specific attributes
    const classMatch = divTag.match(/class="([^"]*)"/);
    const dataWIdMatch = divTag.match(/data-w-id="([^"]*)"/);
    const dataSrcMatch = divTag.match(/data-src="([^"]*)"/);
    const dataLoopMatch = divTag.match(/data-loop="([^"]*)"/);
    const dataDurationMatch = divTag.match(/data-duration="([^"]*)"/);

    lottieAnimations.push({
      count: count,
      class: classMatch ? classMatch[1] : null,
      id: dataWIdMatch ? dataWIdMatch[1] : null,
      src: dataSrcMatch ? dataSrcMatch[1] : null,
      loop: dataLoopMatch ? dataLoopMatch[1] : null,
      duration: dataDurationMatch ? dataDurationMatch[1] : null,
      fullTag: divTag
    });
  }

  console.log(`  Found ${lottieAnimations.length} Lottie animations`);
  lottieAnimations.forEach((lottie, i) => {
    console.log(`    ${i + 1}. ${lottie.class}`);
    console.log(`       ID: ${lottie.id}`);
    console.log(`       Source: ${lottie.src}`);
    console.log(`       Duration: ${lottie.duration}s`);
  });
  console.log('');

  return lottieAnimations;
}

// Create Lottie implementation guide
function createLottieImplementationHTML(lottieAnimations) {
  console.log('Creating Lottie implementation guide...');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craflow Lottie Animations - Implementation Guide</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #0a0a0a;
            color: #e0e0e0;
        }
        h1 {
            color: #ffffff;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        .animation-card {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .animation-card h3 {
            color: #4a9eff;
            margin-top: 0;
        }
        code {
            background: #0a0a0a;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 13px;
        }
        pre {
            background: #0a0a0a;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border: 1px solid #333;
        }
        pre code {
            background: transparent;
            padding: 0;
        }
        .attribute {
            margin: 10px 0;
        }
        .attribute-name {
            color: #4a9eff;
            font-weight: bold;
        }
        .attribute-value {
            color: #7dd3fc;
        }
        .note {
            background: #1e3a5f;
            border-left: 4px solid #4a9eff;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>Craflow Lottie Animations - Complete Implementation Guide</h1>

    <div class="note">
        <h3>What are these animations?</h3>
        <p>Lottie animations are lightweight, scalable animations exported from After Effects. The Craflow template uses ${lottieAnimations.length} Lottie animations:</p>
        <ul>
            ${lottieAnimations.map(l => `<li><strong>${l.class}</strong></li>`).join('\n            ')}
        </ul>
    </div>

    <h2>All Lottie Animations</h2>

${lottieAnimations.map((lottie, i) => `
    <div class="animation-card">
        <h3>${i + 1}. ${lottie.class}</h3>

        <div class="attribute">
            <span class="attribute-name">Webflow ID:</span>
            <code class="attribute-value">${lottie.id}</code>
        </div>

        <div class="attribute">
            <span class="attribute-name">Animation Source:</span><br>
            <code class="attribute-value">${lottie.src}</code>
        </div>

        <div class="attribute">
            <span class="attribute-name">Duration:</span>
            <code class="attribute-value">${lottie.duration} seconds</code>
        </div>

        <div class="attribute">
            <span class="attribute-name">Loop:</span>
            <code class="attribute-value">${lottie.loop === '0' ? 'No (plays once)' : 'Yes'}</code>
        </div>

        <h4>HTML Implementation:</h4>
        <pre><code>${lottie.fullTag.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>

        <h4>How to Use:</h4>
        <ol>
            <li>Copy the HTML code above into your page</li>
            <li>Ensure webflow.js is loaded (handles Lottie player)</li>
            <li>The animation file will be loaded from: <code>${lottie.src}</code></li>
            <li>Animation is controlled by Webflow IX2 system via data-w-id</li>
        </ol>
    </div>
`).join('\n')}

    <h2>Setup Requirements</h2>

    <div class="note">
        <h3>Required Scripts:</h3>
        <ol>
            <li><strong>Webflow.js</strong> - Already included in public/js/webflow.js</li>
            <li><strong>Lottie Web</strong> - Included in webflow.js</li>
        </ol>

        <h3>How to Add to Your HTML:</h3>
        <pre><code>&lt;!-- In &lt;head&gt; --&gt;
&lt;link href="css/normalize.css" rel="stylesheet" type="text/css"&gt;
&lt;link href="css/webflow.css" rel="stylesheet" type="text/css"&gt;
&lt;link href="css/craflow.css" rel="stylesheet" type="text/css"&gt;

&lt;!-- Before &lt;/body&gt; --&gt;
&lt;script src="js/webflow.js" type="text/javascript"&gt;&lt;/script&gt;</code></pre>
    </div>

    <h2>Animation Trigger System</h2>

    <div class="note">
        <p>These animations are controlled by Webflow's IX2 (Interactions 2.0) system:</p>
        <ul>
            <li><strong>data-w-id</strong> - Unique identifier linking element to animation timeline</li>
            <li><strong>data-is-ix2-target="1"</strong> - Marks element as animation target</li>
            <li><strong>data-animation-type="lottie"</strong> - Specifies Lottie player</li>
            <li><strong>data-autoplay</strong> - 0 = controlled by interactions, 1 = autoplay</li>
        </ul>

        <p>The IX2 configuration is embedded in the &lt;style&gt; block with data-w-id initial states.</p>
    </div>

    <h2>Local Testing</h2>

    <div class="note">
        <h3>Option 1: Use CDN URLs (easiest)</h3>
        <p>The animations load from Webflow's CDN. Just make sure you have internet connection.</p>

        <h3>Option 2: Download Lottie JSON files</h3>
        <ol>
            <li>Download each .json file from the URLs above</li>
            <li>Save to <code>public/animations/</code></li>
            <li>Update data-src attributes to local paths</li>
        </ol>

        <pre><code>data-src="/animations/globe.json"</code></pre>
    </div>

    <footer style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #666;">
        <p>Generated on ${new Date().toISOString()}</p>
        <p>Craflow Template by Anyros - Animation Extraction v2</p>
    </footer>
</body>
</html>`;

  const outputPath = path.join(TARGET_DIR, 'LOTTIE_ANIMATIONS_GUIDE.html');
  fs.writeFileSync(outputPath, html);
  console.log(`  ✓ Created LOTTIE_ANIMATIONS_GUIDE.html`);
  console.log('');

  return html;
}

// Create IX2 animation reference
function createIX2Reference() {
  console.log('Creating IX2 animation reference...');

  const htmlPath = path.join(SOURCE_TEMPLATE, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Extract the IX2 style block
  const styleBlockMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
  const ix2Styles = styleBlockMatch ? styleBlockMatch[1] : '';

  // Parse data-w-id configurations
  const dataWIdConfigs = [];
  const dataWIdRegex = /\[data-w-id="([^"]+)"\]\s*{([^}]+)}/g;
  let match;

  while ((match = dataWIdRegex.exec(ix2Styles)) !== null) {
    dataWIdConfigs.push({
      id: match[1],
      styles: match[2].trim()
    });
  }

  console.log(`  Found ${dataWIdConfigs.length} IX2 animation configurations`);
  console.log('');

  const markdown = `# Webflow IX2 (Interactions 2.0) Animation Reference

## Overview

Craflow uses Webflow's IX2 system for animations. This system works by:

1. **Initial States** - Defined in <style> block with data-w-id selectors
2. **Animation Timeline** - Stored in webflow.js
3. **Triggers** - Scroll, click, hover, or page load

## Total IX2 Configurations: ${dataWIdConfigs.length}

## data-w-id Configurations

${dataWIdConfigs.slice(0, 30).map((config, i) => `
### ${i + 1}. ${config.id}

**Initial CSS State:**
\`\`\`css
[data-w-id="${config.id}"] {
${config.styles}
}
\`\`\`
`).join('\n')}

${dataWIdConfigs.length > 30 ? `\n*...and ${dataWIdConfigs.length - 30} more configurations*\n` : ''}

## How IX2 Works

### 1. Initial State (CSS)
Elements start with transforms/opacity defined in the <style> block.

Example:
\`\`\`css
[data-w-id="abc123"] {
  -webkit-transform: translate3d(0, 110%, 0);
  transform: translate3d(0, 110%, 0);
  opacity: 0;
}
\`\`\`

### 2. Animation Timeline (JavaScript)
webflow.js contains the animation timelines that animate from initial state to final state.

### 3. Trigger (HTML attribute)
The data-w-id attribute links the element to its animation timeline.

Example:
\`\`\`html
<div data-w-id="abc123" class="text-item">
  <h2>Animated Text</h2>
</div>
\`\`\`

## Common Animation Patterns

### Text Reveal Animation
\`\`\`css
/* Initial: Hidden below, rotated */
transform: translate3d(0, 110%, 0) rotateX(45deg);

/* Final: Visible, normal rotation */
transform: translate3d(0, 0%, 0) rotateX(0deg);
\`\`\`

### 3D Frame Animation
\`\`\`css
/* Initial: Far back in 3D space */
transform: translate3d(0, -200vw, -500vw);
opacity: 0;

/* Final: Normal position */
transform: translate3d(0, 0, 0);
opacity: 1;
\`\`\`

### Slide-in Animation
\`\`\`css
/* Initial: Off-screen left */
transform: translate3d(-100%, 0, 0);

/* Final: On-screen */
transform: translate3d(0%, 0, 0);
\`\`\`

### Button Hover Effect
\`\`\`css
/* Default state */
.button-text { transform: translate3d(0, 0%, 0); }

/* Hover state */
.button-text { transform: translate3d(0, -100%, 0); }
\`\`\`

## Implementation Checklist

- [x] Include normalize.css, webflow.css, craflow.css
- [x] Include webflow.js (contains IX2 engine)
- [x] Add initial state <style> block to <head>
- [x] Preserve all data-w-id attributes on animated elements
- [x] Preserve transform-style: preserve-3d for 3D animations
- [ ] Test on actual page (animations should trigger automatically)

## Debugging IX2 Animations

If animations don't work:

1. **Check console for errors**
   \`\`\`
   Open DevTools → Console tab
   \`\`\`

2. **Verify webflow.js loaded**
   \`\`\`javascript
   console.log(typeof Webflow); // Should not be "undefined"
   \`\`\`

3. **Check data-w-id exists**
   \`\`\`javascript
   document.querySelectorAll('[data-w-id]').length
   \`\`\`

4. **Verify CSS loaded**
   Check Network tab - all CSS files should load with 200 status

5. **Check initial states**
   Elements should have transform styles applied on page load

## Complete IX2 Style Block

\`\`\`html
<style>
${ix2Styles}
</style>
\`\`\`

---

Generated: ${new Date().toISOString()}
`;

  const outputPath = path.join(TARGET_DIR, 'IX2_ANIMATION_REFERENCE.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`  ✓ Created IX2_ANIMATION_REFERENCE.md`);
  console.log('');
}

// Main execution
function main() {
  const lottieAnimations = extractLottieAnimations();
  createLottieImplementationHTML(lottieAnimations);
  createIX2Reference();

  console.log('='.repeat(80));
  console.log('EXTRACTION COMPLETE - V2 ENHANCED');
  console.log('='.repeat(80));
  console.log('');
  console.log('New files created:');
  console.log('  - public/LOTTIE_ANIMATIONS_GUIDE.html (open in browser!)');
  console.log('  - public/IX2_ANIMATION_REFERENCE.md');
  console.log('');
  console.log('Previously created:');
  console.log('  - public/css/normalize.css');
  console.log('  - public/css/webflow.css');
  console.log('  - public/css/craflow.css');
  console.log('  - public/js/webflow.js');
  console.log('  - public/CRAFLOW_ANIMATIONS_GUIDE.md');
  console.log('');
  console.log('Summary:');
  console.log(`  - Lottie Animations: ${lottieAnimations.length}`);
  console.log(`  - IX2 data-w-id configs: Check IX2_ANIMATION_REFERENCE.md`);
  console.log(`  - Transform animations: Driven by webflow.js + IX2`);
  console.log('');
  console.log('Next: Open LOTTIE_ANIMATIONS_GUIDE.html in your browser!');
  console.log('='.repeat(80));
}

main();
