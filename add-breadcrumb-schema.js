const fs = require('fs');
const path = require('path');

const breadcrumbs = {
  'about.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'About Us', url: 'about.html' }
  ],
  'pricing.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'Pricing', url: 'pricing.html' }
  ],
  'ecommerce.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'E-commerce SEO', url: 'ecommerce.html' }
  ],
  'saas.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'SaaS SEO', url: 'saas.html' }
  ],
  'agencies.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'Agencies', url: 'agencies.html' }
  ],
  'local-business.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'Local Business SEO', url: 'local-business.html' }
  ],
  'enterprise.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'Enterprise', url: 'enterprise.html' }
  ],
  'help.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'Help Center', url: 'help.html' }
  ],
  'docs.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'Documentation', url: 'docs.html' }
  ],
  'api.html': [
    { name: 'Home', url: 'index.html' },
    { name: 'API', url: 'api.html' }
  ]
};

function generateBreadcrumbSchema(breadcrumbList) {
  const items = [];
  for (let i = 0; i < breadcrumbList.length; i++) {
    const item = breadcrumbList[i];
    const pos = i + 1;
    items.push(`    {
      "@type": "ListItem",
      "position": ${pos},
      "name": "${item.name}",
      "item": "https://seology.ai/${item.url}"
    }`);
  }

  return `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
${items.join(',\n')}
    ]
  }
  </script>`;
}

const publicDir = path.join(__dirname, 'public');
let processed = 0;

const filenames = Object.keys(breadcrumbs);
for (let i = 0; i < filenames.length; i++) {
  const filename = filenames[i];
  const filepath = path.join(publicDir, filename);

  if (!fs.existsSync(filepath)) {
    console.log('Skip: ' + filename);
    continue;
  }

  let html = fs.readFileSync(filepath, 'utf8');

  if (html.includes('"@type": "BreadcrumbList"')) {
    console.log('Already exists: ' + filename);
    continue;
  }

  const schema = generateBreadcrumbSchema(breadcrumbs[filename]);
  const headClosePos = html.indexOf('</head>');

  if (headClosePos !== -1) {
    html = html.substring(0, headClosePos) + schema + '\n  ' + html.substring(headClosePos);
    fs.writeFileSync(filepath, html, 'utf8');
    processed++;
    console.log('Added to ' + filename + ': ' + breadcrumbs[filename].length + ' items');
  }
}

console.log('\nTotal processed: ' + processed);
