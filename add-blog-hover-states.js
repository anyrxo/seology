const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'public', 'blog.html');
let html = fs.readFileSync(filepath, 'utf8');

// Pattern to find article tags without hover states
const articlePattern = /<article style="background: rgba\(255,255,255,0\.03\); border-radius: 16px; overflow: hidden; border: 1px solid rgba\(255,255,255,0\.08\); transition: all 0\.3s ease;">/g;

// Count matches
const matches = html.match(articlePattern);
const initialCount = matches ? matches.length : 0;

// Replace with hover-enabled version
html = html.replace(
  articlePattern,
  '<article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"\n                  onmouseenter="this.style.transform=\'translateY(-4px)\'; this.style.borderColor=\'rgba(0,255,136,0.3)\'; this.style.boxShadow=\'0 8px 24px rgba(0,255,136,0.15)\';"\n                  onmouseleave="this.style.transform=\'\'; this.style.borderColor=\'rgba(255,255,255,0.08)\'; this.style.boxShadow=\'\';">'
);

fs.writeFileSync(filepath, html, 'utf8');

console.log('Updated ' + initialCount + ' article cards with hover states');
