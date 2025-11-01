const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'careers.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('\n🔧 Fixing careers page - keeping only Full Stack TypeScript Developer job...\n');

// Find the grid start and replace all 6 jobs with just 1 clean job listing
const gridStart = '<div class="w-layout-grid team-members-grid">';
const gridEnd = '</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>';

const startIdx = content.indexOf(gridStart);
if (startIdx === -1) {
  console.log('❌ Could not find jobs grid');
  process.exit(1);
}

// Find where the grid ends (before the closing divs of the section)
// Look for the pattern of closing divs that ends the jobs section
const searchPattern = '</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>';
const endIdx = content.indexOf(searchPattern, startIdx);

if (endIdx === -1) {
  console.log('❌ Could not find grid end');
  process.exit(1);
}

// Create the single clean job listing without images
const newJobsSection = `<div style="max-width: 700px; margin: 0 auto;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px;">
                  <div style="border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; padding-bottom: 24px;">
                    <h3 style="font-size: 28px; font-weight: 600; margin-bottom: 12px;">Full Stack TypeScript Developer</h3>
                    <div style="opacity: 0.7; font-size: 16px;">Remote • $120k AUD</div>
                  </div>
                  <div style="line-height: 1.8; opacity: 0.9; margin-bottom: 32px;">
                    <p>Build the core automation engine. Next.js, TypeScript, PostgreSQL, advanced AI integration. 5+ years experience. Own features end-to-end from design to deployment.</p>
                  </div>
                  <a href="mailto:careers@seology.ai" class="main-button w-inline-block" style="display: inline-flex; align-items: center; padding: 16px 32px; background: #ffffff; color: #000; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    <div class="button-text">Apply Now</div>
                  </a>
                </div>
              </div>`;

// Replace everything between grid start and section end
const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

content = before + newJobsSection + after;

fs.writeFileSync(filePath, content);
console.log('✅ Careers page fixed - now shows only Full Stack TypeScript Developer job with no images\n');
