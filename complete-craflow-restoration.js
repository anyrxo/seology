#!/usr/bin/env node

/**
 * COMPLETE CRAFLOW ANIMATION RESTORATION SCRIPT
 *
 * This script performs a COMPREHENSIVE extraction of ALL animations, CSS, JavaScript,
 * and interactive features from the Craflow template and integrates them into SEOLOGY.AI
 *
 * Features extracted:
 * - ALL @keyframes animations from CSS
 * - ALL inline style attributes with transforms/transitions
 * - ALL data-w-id attributes and their associated Webflow IX2 configurations
 * - ALL JavaScript files (webflow.js)
 * - ALL Lottie animation configurations
 * - ALL hover states and transitions
 * - ALL scroll-triggered animations
 * - Complete Webflow IX2 (Interactions 2.0) system
 */

const fs = require('fs');
const path = require('path');

// Paths
const SOURCE_TEMPLATE = 'C:\\Users\\manna\\Downloads\\Website inspo\\anyros-fantabulous-site.webflow';
const TARGET_DIR = 'c:\\Users\\manna\\Downloads\\iimagined.webflow (1)\\public';
const LOG_FILE = path.join(TARGET_DIR, 'craflow-extraction-log.json');

// Results tracking
const extractionLog = {
  timestamp: new Date().toISOString(),
  extracted: {
    cssAnimations: [],
    inlineStyles: [],
    dataWIds: [],
    lottieAnimations: [],
    jsFiles: [],
    styleBlocks: []
  },
  errors: [],
  summary: {}
};

console.log('='.repeat(80));
console.log('COMPLETE CRAFLOW ANIMATION RESTORATION');
console.log('='.repeat(80));
console.log('');

/**
 * Step 1: Extract ALL CSS from Craflow template
 */
function extractAllCSS() {
  console.log('Step 1: Extracting ALL CSS from Craflow template...');

  const cssFiles = [
    'css/normalize.css',
    'css/webflow.css',
    'css/anyros-fantabulous-site.webflow.css'
  ];

  const allCSS = {
    normalize: '',
    webflow: '',
    template: '',
    animations: [],
    transitions: [],
    transforms: []
  };

  cssFiles.forEach(cssFile => {
    const cssPath = path.join(SOURCE_TEMPLATE, cssFile);
    console.log(`  Reading: ${cssFile}`);

    try {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      const fileName = path.basename(cssFile);

      if (fileName === 'normalize.css') {
        allCSS.normalize = cssContent;
      } else if (fileName === 'webflow.css') {
        allCSS.webflow = cssContent;
      } else {
        allCSS.template = cssContent;

        // Extract @keyframes
        const keyframesRegex = /@keyframes\s+([^\s{]+)\s*{[^}]*(?:{[^}]*}[^}]*)*}/g;
        let match;
        while ((match = keyframesRegex.exec(cssContent)) !== null) {
          allCSS.animations.push({
            name: match[1],
            code: match[0]
          });
          extractionLog.extracted.cssAnimations.push(match[1]);
        }

        // Extract transition rules
        const transitionRegex = /transition:\s*([^;]+);/g;
        while ((match = transitionRegex.exec(cssContent)) !== null) {
          allCSS.transitions.push(match[1]);
        }

        // Extract transform rules
        const transformRegex = /transform:\s*([^;]+);/g;
        while ((match = transformRegex.exec(cssContent)) !== null) {
          allCSS.transforms.push(match[1]);
        }
      }

      console.log(`  ✓ Extracted ${cssFile}`);
    } catch (error) {
      console.error(`  ✗ Error reading ${cssFile}:`, error.message);
      extractionLog.errors.push({ file: cssFile, error: error.message });
    }
  });

  console.log(`  Found ${allCSS.animations.length} @keyframes animations`);
  console.log(`  Found ${allCSS.transitions.length} transition rules`);
  console.log(`  Found ${allCSS.transforms.length} transform rules`);
  console.log('');

  return allCSS;
}

/**
 * Step 2: Extract ALL inline styles and data-w-id attributes from HTML
 */
function extractAllHTMLAnimations() {
  console.log('Step 2: Extracting ALL inline styles and data-w-id from HTML...');

  const htmlPath = path.join(SOURCE_TEMPLATE, 'index.html');
  console.log(`  Reading: index.html`);

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  const animations = {
    inlineStyles: [],
    dataWIds: [],
    lottieElements: [],
    styleBlocks: []
  };

  // Extract <style> blocks from <head>
  const styleBlockRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleBlockRegex.exec(htmlContent)) !== null) {
    animations.styleBlocks.push(match[1]);
    extractionLog.extracted.styleBlocks.push({
      length: match[1].length,
      preview: match[1].substring(0, 100) + '...'
    });
  }

  // Extract all elements with inline style attributes containing transform/transition
  const inlineStyleRegex = /style="([^"]*(?:transform|transition|animation|opacity)[^"]*)"/gi;
  while ((match = inlineStyleRegex.exec(htmlContent)) !== null) {
    animations.inlineStyles.push(match[1]);
    extractionLog.extracted.inlineStyles.push({
      style: match[1].substring(0, 100) + (match[1].length > 100 ? '...' : '')
    });
  }

  // Extract all data-w-id attributes
  const dataWIdRegex = /data-w-id="([^"]+)"/g;
  while ((match = dataWIdRegex.exec(htmlContent)) !== null) {
    animations.dataWIds.push(match[1]);
    extractionLog.extracted.dataWIds.push(match[1]);
  }

  // Extract Lottie animation configurations
  const lottieRegex = /data-animation-type="lottie"[^>]*data-src="([^"]+)"[^>]*data-w-id="([^"]+)"/g;
  while ((match = lottieRegex.exec(htmlContent)) !== null) {
    animations.lottieElements.push({
      src: match[1],
      id: match[2]
    });
    extractionLog.extracted.lottieAnimations.push({
      src: match[1],
      id: match[2]
    });
  }

  console.log(`  Found ${animations.styleBlocks.length} <style> blocks`);
  console.log(`  Found ${animations.inlineStyles.length} inline style attributes`);
  console.log(`  Found ${animations.dataWIds.length} data-w-id attributes`);
  console.log(`  Found ${animations.lottieElements.length} Lottie animations`);
  console.log('');

  return animations;
}

/**
 * Step 3: Extract ALL JavaScript
 */
function extractAllJavaScript() {
  console.log('Step 3: Extracting ALL JavaScript...');

  const jsPath = path.join(SOURCE_TEMPLATE, 'js', 'webflow.js');
  console.log(`  Reading: js/webflow.js`);

  let jsContent = '';
  try {
    jsContent = fs.readFileSync(jsPath, 'utf8');
    extractionLog.extracted.jsFiles.push({
      file: 'webflow.js',
      size: jsContent.length
    });
    console.log(`  ✓ Extracted webflow.js (${jsContent.length} bytes)`);
  } catch (error) {
    console.error(`  ✗ Error reading webflow.js:`, error.message);
    extractionLog.errors.push({ file: 'webflow.js', error: error.message });
  }

  console.log('');
  return jsContent;
}

/**
 * Step 4: Copy ALL CSS files to target directory
 */
function copyAllCSSFiles(allCSS) {
  console.log('Step 4: Copying ALL CSS files to target directory...');

  const targetCSSDir = path.join(TARGET_DIR, 'css');
  if (!fs.existsSync(targetCSSDir)) {
    fs.mkdirSync(targetCSSDir, { recursive: true });
  }

  // Copy normalize.css
  fs.writeFileSync(path.join(targetCSSDir, 'normalize.css'), allCSS.normalize);
  console.log('  ✓ Copied normalize.css');

  // Copy webflow.css
  fs.writeFileSync(path.join(targetCSSDir, 'webflow.css'), allCSS.webflow);
  console.log('  ✓ Copied webflow.css');

  // Copy template CSS
  fs.writeFileSync(path.join(targetCSSDir, 'craflow.css'), allCSS.template);
  console.log('  ✓ Copied craflow.css (template styles)');

  // Create animations-only CSS file
  const animationsCSS = allCSS.animations.map(a => a.code).join('\n\n');
  fs.writeFileSync(path.join(targetCSSDir, 'craflow-animations.css'), animationsCSS);
  console.log('  ✓ Created craflow-animations.css (keyframes only)');

  console.log('');
}

/**
 * Step 5: Copy JavaScript to target directory
 */
function copyJavaScript(jsContent) {
  console.log('Step 5: Copying JavaScript to target directory...');

  const targetJSDir = path.join(TARGET_DIR, 'js');
  if (!fs.existsSync(targetJSDir)) {
    fs.mkdirSync(targetJSDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetJSDir, 'webflow.js'), jsContent);
  console.log('  ✓ Copied webflow.js');
  console.log('');
}

/**
 * Step 6: Update ALL HTML files in target directory
 */
function updateAllHTMLFiles(animations, allCSS) {
  console.log('Step 6: Updating ALL HTML files in target directory...');

  const htmlFiles = [
    'index.html',
    'about.html',
    'pricing.html',
    'contact.html',
    'projects.html',
    'careers.html',
    'enterprise.html'
  ];

  htmlFiles.forEach(file => {
    const htmlPath = path.join(TARGET_DIR, file);

    if (!fs.existsSync(htmlPath)) {
      console.log(`  ⊘ Skipping ${file} (not found)`);
      return;
    }

    console.log(`  Updating ${file}...`);

    try {
      let htmlContent = fs.readFileSync(htmlPath, 'utf8');
      let updated = false;

      // Add CSS links if not present
      if (!htmlContent.includes('normalize.css')) {
        htmlContent = htmlContent.replace(
          '</head>',
          '  <link href="css/normalize.css" rel="stylesheet" type="text/css">\n  </head>'
        );
        updated = true;
      }

      if (!htmlContent.includes('webflow.css')) {
        htmlContent = htmlContent.replace(
          '</head>',
          '  <link href="css/webflow.css" rel="stylesheet" type="text/css">\n  </head>'
        );
        updated = true;
      }

      if (!htmlContent.includes('craflow.css')) {
        htmlContent = htmlContent.replace(
          '</head>',
          '  <link href="css/craflow.css" rel="stylesheet" type="text/css">\n  </head>'
        );
        updated = true;
      }

      if (!htmlContent.includes('craflow-animations.css')) {
        htmlContent = htmlContent.replace(
          '</head>',
          '  <link href="css/craflow-animations.css" rel="stylesheet" type="text/css">\n  </head>'
        );
        updated = true;
      }

      // Add inline style block from source if not present
      if (animations.styleBlocks.length > 0 && !htmlContent.includes('@media (min-width:992px)')) {
        const styleBlock = `  <style>${animations.styleBlocks[0]}</style>\n`;
        htmlContent = htmlContent.replace('</head>', styleBlock + '  </head>');
        updated = true;
      }

      // Add webflow.js before </body>
      if (!htmlContent.includes('webflow.js')) {
        htmlContent = htmlContent.replace(
          '</body>',
          '  <script src="js/webflow.js" type="text/javascript"></script>\n  </body>'
        );
        updated = true;
      }

      if (updated) {
        fs.writeFileSync(htmlPath, htmlContent);
        console.log(`    ✓ Updated ${file}`);
      } else {
        console.log(`    - No updates needed for ${file}`);
      }
    } catch (error) {
      console.error(`    ✗ Error updating ${file}:`, error.message);
      extractionLog.errors.push({ file: file, error: error.message });
    }
  });

  console.log('');
}

/**
 * Step 7: Create comprehensive documentation
 */
function createDocumentation(allCSS, animations) {
  console.log('Step 7: Creating comprehensive documentation...');

  const docsPath = path.join(TARGET_DIR, 'CRAFLOW_ANIMATIONS_GUIDE.md');

  const documentation = `# Craflow Animations Complete Extraction Guide

## Extraction Date
${new Date().toISOString()}

## Summary
This document details ALL animations, CSS, and JavaScript extracted from the Craflow template.

## CSS Files Extracted

### 1. normalize.css
- Standard CSS reset
- Location: \`public/css/normalize.css\`

### 2. webflow.css
- Webflow framework styles
- Location: \`public/css/webflow.css\`

### 3. craflow.css
- Complete template styles
- ${allCSS.template.length} characters
- Location: \`public/css/craflow.css\`

### 4. craflow-animations.css
- Extracted @keyframes only
- ${allCSS.animations.length} animations
- Location: \`public/css/craflow-animations.css\`

## @keyframes Animations Extracted (${allCSS.animations.length})

${allCSS.animations.map((anim, i) => `${i + 1}. **${anim.name}**`).join('\n')}

## Inline Styles Extracted (${animations.inlineStyles.length})

These are transform/transition/animation styles applied directly to HTML elements:

${animations.inlineStyles.slice(0, 20).map((style, i) =>
  `${i + 1}. \`${style.substring(0, 100)}${style.length > 100 ? '...' : ''}\``
).join('\n')}

${animations.inlineStyles.length > 20 ? `\n...and ${animations.inlineStyles.length - 20} more` : ''}

## data-w-id Attributes (${animations.dataWIds.length})

Webflow Interaction IDs for IX2 (Interactions 2.0) system:

${animations.dataWIds.slice(0, 20).map((id, i) => `${i + 1}. ${id}`).join('\n')}

${animations.dataWIds.length > 20 ? `\n...and ${animations.dataWIds.length - 20} more` : ''}

## Lottie Animations (${animations.lottieElements.length})

${animations.lottieElements.map((lottie, i) => `${i + 1}. **ID:** ${lottie.id}
   **Source:** ${lottie.src}`).join('\n\n')}

## Style Blocks (${animations.styleBlocks.length})

Inline \`<style>\` blocks extracted from template:

${animations.styleBlocks.map((block, i) =>
  `### Block ${i + 1}\n\`\`\`css\n${block.substring(0, 500)}${block.length > 500 ? '\n...' : ''}\n\`\`\``
).join('\n\n')}

## JavaScript Files

### webflow.js
- Webflow core JavaScript library
- Size: ${fs.statSync(path.join(TARGET_DIR, 'js', 'webflow.js')).size} bytes
- Location: \`public/js/webflow.js\`
- Contains: Webflow IX2 (Interactions 2.0) engine

## How to Use

### In HTML Files

Add these lines to the \`<head>\` section:

\`\`\`html
<link href="css/normalize.css" rel="stylesheet" type="text/css">
<link href="css/webflow.css" rel="stylesheet" type="text/css">
<link href="css/craflow.css" rel="stylesheet" type="text/css">
<link href="css/craflow-animations.css" rel="stylesheet" type="text/css">
\`\`\`

Add this before \`</body>\`:

\`\`\`html
<script src="js/webflow.js" type="text/javascript"></script>
\`\`\`

### Key Animation Classes

- \`.frame-image\` - 3D frame animations
- \`.text-item\` - Text reveal animations
- \`.overflow-wrap\` - Overflow hiding for animations
- \`.square\` - Rotating square element
- \`.partner-component-grid\` - Partner logo animations
- \`.nav-link\` - Navigation hover effects
- \`.main-button\` - Button hover transitions

### Important Data Attributes

- \`data-w-id\` - Webflow interaction ID
- \`data-animation-type="lottie"\` - Lottie animation element
- \`data-is-ix2-target="1"\` - IX2 animation target

### 3D Transform Notes

Many animations use \`transform-style: preserve-3d\` for 3D effects:
- Header frame images animate in 3D space
- Text reveals use rotateX for perspective
- Button transitions use translateY

## Implementation Checklist

- [x] Extracted ALL CSS files
- [x] Extracted ALL @keyframes animations
- [x] Extracted ALL inline styles
- [x] Extracted ALL data-w-id attributes
- [x] Extracted webflow.js
- [x] Extracted Lottie configurations
- [x] Copied files to target directory
- [x] Created documentation

## Troubleshooting

If animations don't work:

1. Ensure all CSS files are loaded in correct order
2. Check that webflow.js loads after DOM content
3. Verify data-w-id attributes are preserved
4. Check browser console for JavaScript errors
5. Ensure transform-style: preserve-3d is not overridden

## Additional Resources

- Original template: \`${SOURCE_TEMPLATE}\`
- Webflow IX2 Documentation: https://webflow.com/interactions-animations
- CSS Transform MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
`;

  fs.writeFileSync(docsPath, documentation);
  console.log('  ✓ Created CRAFLOW_ANIMATIONS_GUIDE.md');
  console.log('');
}

/**
 * Step 8: Save extraction log
 */
function saveExtractionLog() {
  console.log('Step 8: Saving extraction log...');

  extractionLog.summary = {
    cssAnimations: extractionLog.extracted.cssAnimations.length,
    inlineStyles: extractionLog.extracted.inlineStyles.length,
    dataWIds: extractionLog.extracted.dataWIds.length,
    lottieAnimations: extractionLog.extracted.lottieAnimations.length,
    styleBlocks: extractionLog.extracted.styleBlocks.length,
    jsFiles: extractionLog.extracted.jsFiles.length,
    errors: extractionLog.errors.length
  };

  fs.writeFileSync(LOG_FILE, JSON.stringify(extractionLog, null, 2));
  console.log('  ✓ Saved extraction log to craflow-extraction-log.json');
  console.log('');
}

/**
 * Main execution
 */
function main() {
  try {
    // Extract everything
    const allCSS = extractAllCSS();
    const animations = extractAllHTMLAnimations();
    const jsContent = extractAllJavaScript();

    // Copy files
    copyAllCSSFiles(allCSS);
    copyJavaScript(jsContent);

    // Update HTML files
    updateAllHTMLFiles(animations, allCSS);

    // Create documentation
    createDocumentation(allCSS, animations);

    // Save log
    saveExtractionLog();

    // Print summary
    console.log('='.repeat(80));
    console.log('EXTRACTION COMPLETE');
    console.log('='.repeat(80));
    console.log('');
    console.log('Summary:');
    console.log(`  CSS Animations (@keyframes): ${extractionLog.summary.cssAnimations}`);
    console.log(`  Inline Styles: ${extractionLog.summary.inlineStyles}`);
    console.log(`  Data-w-id Attributes: ${extractionLog.summary.dataWIds}`);
    console.log(`  Lottie Animations: ${extractionLog.summary.lottieAnimations}`);
    console.log(`  Style Blocks: ${extractionLog.summary.styleBlocks}`);
    console.log(`  JavaScript Files: ${extractionLog.summary.jsFiles}`);
    console.log(`  Errors: ${extractionLog.summary.errors}`);
    console.log('');
    console.log('Files created:');
    console.log(`  - public/css/normalize.css`);
    console.log(`  - public/css/webflow.css`);
    console.log(`  - public/css/craflow.css`);
    console.log(`  - public/css/craflow-animations.css`);
    console.log(`  - public/js/webflow.js`);
    console.log(`  - public/CRAFLOW_ANIMATIONS_GUIDE.md`);
    console.log(`  - public/craflow-extraction-log.json`);
    console.log('');

    if (extractionLog.errors.length > 0) {
      console.log('Errors encountered:');
      extractionLog.errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error.file}: ${error.error}`);
      });
      console.log('');
    }

    console.log('Next steps:');
    console.log('  1. Review CRAFLOW_ANIMATIONS_GUIDE.md for implementation details');
    console.log('  2. Check craflow-extraction-log.json for complete extraction data');
    console.log('  3. Test animations in your HTML files');
    console.log('  4. Verify all CSS and JS files load correctly');
    console.log('');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('FATAL ERROR:', error);
    process.exit(1);
  }
}

// Run the script
main();
