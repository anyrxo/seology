const fs = require('fs');
const path = require('path');

console.log('🎯 Making ROI Calculator SUPER Interactive - select what you currently use...\\n');

const roiPath = path.join(__dirname, 'public', 'roi-calculator.html');
let html = fs.readFileSync(roiPath, 'utf8');

// Find where to add the new JavaScript - right before the closing script tag
const scriptEnd = html.lastIndexOf('</script>');

// Enhanced industry-specific solutions with checkboxes
const enhancedJavaScript = `

// Enhanced solutions with costs - users can SELECT what they use
const detailedSolutions = {
  ecommerce: [
    { id: 'ecom-agency', name: 'SEO Agency', cost: 36000, description: '$3,000/mo retainer' },
    { id: 'ecom-freelancer', name: 'SEO Freelancer', cost: 18000, description: '$1,500/mo contract' },
    { id: 'ecom-yoast', name: 'Yoast Premium', cost: 99, description: '$99/year plugin' },
    { id: 'ecom-rankmath', name: 'RankMath Pro', cost: 599, description: '$599/year subscription' },
    { id: 'ecom-ahrefs', name: 'Ahrefs', cost: 2388, description: '$199/mo SEO tool' },
    { id: 'ecom-semrush', name: 'Semrush', cost: 2868, description: '$239/mo SEO tool' },
    { id: 'ecom-inhouse', name: 'In-house SEO Team', cost: 72000, description: '$6,000/mo employee cost' },
    { id: 'ecom-nothing', name: "We don't do SEO", cost: 0, description: 'Missing out on traffic' }
  ],
  saas: [
    { id: 'saas-agency', name: 'SEO Agency', cost: 60000, description: '$5,000/mo retainer' },
    { id: 'saas-consultant', name: 'SEO Consultant', cost: 30000, description: '$2,500/mo contract' },
    { id: 'saas-ahrefs', name: 'Ahrefs', cost: 5988, description: '$499/mo enterprise' },
    { id: 'saas-semrush', name: 'Semrush', cost: 5988, description: '$499/mo enterprise' },
    { id: 'saas-inhouse', name: 'In-house SEO Team', cost: 120000, description: '$10,000/mo loaded cost' },
    { id: 'saas-engineer', name: 'Engineering Time', cost: 48000, description: '$4,000/mo (10% of dev time)' },
    { id: 'saas-contentwriter', name: 'Content Writers', cost: 36000, description: '$3,000/mo for SEO content' },
    { id: 'saas-nothing', name: "We don't do SEO", cost: 0, description: 'Relying only on word-of-mouth' }
  ],
  agency: [
    { id: 'agency-whitelabel', name: 'White-label SEO Provider', cost: 24000, description: '$2,000/mo per client (avg 12 clients = $24k/mo total)' },
    { id: 'agency-ahrefs', name: 'Ahrefs Agency', cost: 9588, description: '$799/mo for all clients' },
    { id: 'agency-semrush', name: 'Semrush Agency', cost: 5988, description: '$499/mo for all clients' },
    { id: 'agency-contractor', name: 'SEO Contractors', cost: 48000, description: '$4,000/mo outsourced help' },
    { id: 'agency-inhouse', name: 'In-house SEO Specialists', cost: 96000, description: '$8,000/mo (2 specialists)' },
    { id: 'agency-manual', name: 'Manual Work (Our Team Time)', cost: 120000, description: '$10,000/mo team hours on SEO' },
    { id: 'agency-nothing', name: "We don't offer SEO", cost: 0, description: 'Not providing this service' }
  ],
  local: [
    { id: 'local-agency', name: 'Local SEO Agency', cost: 24000, description: '$2,000/mo retainer' },
    { id: 'local-freelancer', name: 'SEO Freelancer', cost: 12000, description: '$1,000/mo contract' },
    { id: 'local-yext', name: 'Yext Listings', cost: 4800, description: '$400/mo for 50 locations' },
    { id: 'local-moz', name: 'Moz Local', cost: 3588, description: '$299/mo for management' },
    { id: 'local-ahrefs', name: 'Ahrefs', cost: 2388, description: '$199/mo SEO tool' },
    { id: 'local-inhouse', name: 'Marketing Manager Time', cost: 24000, description: '$2,000/mo (20% of time on SEO)' },
    { id: 'local-nothing', name: "We don't do SEO", cost: 0, description: 'Relying on foot traffic only' }
  ]
};

// Update showComparison to use checkboxes
function showComparison(industry) {
  const solutions = detailedSolutions[industry];
  const container = document.getElementById('current-solutions-grid');

  container.innerHTML = \`
    <div style="margin-bottom: 24px;">
      <p class="text-size-regular" style="opacity: 0.8; text-align: center;">Select everything you currently use for SEO:</p>
    </div>
    \${solutions.map(sol => \`
      <label style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px 24px; cursor: pointer; display: flex; align-items: start; gap: 16px; transition: all 0.3s ease;" onmouseover="this.style.borderColor='rgba(0,255,136,0.3)'; this.style.background='rgba(255,255,255,0.08)';" onmouseout="if(!this.querySelector('input').checked) { this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.05)'; }">
        <input type="checkbox" id="\${sol.id}" value="\${sol.cost}" onchange="calculateTotal()" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer; accent-color: var(--text-color-secondary, #00ff88);">
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
            <h4 class="heading-style-h5" style="font-size: 16px; font-weight: 600;">\${sol.name}</h4>
            <span class="text-size-regular" style="color: var(--text-color-secondary, #00ff88); font-weight: 600; white-space: nowrap;">\${sol.cost > 0 ? '$' + sol.cost.toLocaleString() + '/yr' : 'Free'}</span>
          </div>
          <p class="text-size-regular" style="opacity: 0.7; font-size: 14px;">\${sol.description}</p>
        </div>
      </label>
    \`).join('')}
  \`;

  // Show calculator section
  document.getElementById('calculator-section').style.display = 'block';
  document.getElementById('questions-section').style.display = 'block';

  // Show objections
  showObjections(industry);

  // Smooth scroll to calculator
  setTimeout(() => {
    document.getElementById('calculator-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// Calculate total based on selected items
function calculateTotal() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let totalCost = 0;

  checkboxes.forEach(cb => {
    totalCost += parseInt(cb.value);
  });

  const seologyCost = 588; // $49/mo
  const savings = totalCost - seologyCost;
  const savingsPercent = totalCost > 0 ? Math.round((savings / totalCost) * 100) : 0;

  // Update displays
  document.getElementById('total-current-cost').textContent = '$' + totalCost.toLocaleString();
  document.getElementById('monthly-current-cost').textContent = '$' + Math.round(totalCost / 12).toLocaleString();
  document.getElementById('total-savings').textContent = totalCost > 0 ? '$' + savings.toLocaleString() : '$0';
  document.getElementById('savings-percentage').textContent = savingsPercent + '%';

  // Update comparison cards
  const comparisonContainer = document.getElementById('quick-comparison');
  if (totalCost > 0) {
    comparisonContainer.style.display = 'grid';
    comparisonContainer.innerHTML = \`
      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; text-align: center;">
        <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px; font-size: 14px;">Your current cost</p>
        <h3 class="heading-style-h4" style="font-size: 24px; color: rgba(255,255,255,0.6);">$\${Math.round(totalCost/12).toLocaleString()}/mo</h3>
      </div>
      <div style="background: linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05)); border: 1px solid var(--text-color-secondary, #00ff88); border-radius: 12px; padding: 20px; text-align: center;">
        <p class="text-size-regular" style="opacity: 0.9; margin-bottom: 8px; font-size: 14px;">With SEOLOGY.AI</p>
        <h3 class="heading-style-h4" style="font-size: 24px; color: var(--text-color-secondary, #00ff88);">$49/mo</h3>
      </div>
      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; text-align: center;">
        <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px; font-size: 14px;">You save</p>
        <h3 class="heading-style-h4" style="font-size: 24px; color: var(--text-color-secondary, #00ff88);">$\${Math.round(savings/12).toLocaleString()}/mo</h3>
      </div>
    \`;
  } else {
    comparisonContainer.style.display = 'none';
  }

  // Highlight selected checkboxes' parent labels
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    const label = cb.closest('label');
    if (cb.checked) {
      label.style.borderColor = 'var(--text-color-secondary, #00ff88)';
      label.style.background = 'rgba(0,255,136,0.1)';
    } else {
      if (!label.matches(':hover')) {
        label.style.borderColor = 'rgba(255,255,255,0.1)';
        label.style.background = 'rgba(255,255,255,0.05)';
      }
    }
  });
}
`;

html = html.substring(0, scriptEnd) + enhancedJavaScript + html.substring(scriptEnd);

// Update the HTML for calculator section
const calcSectionStart = html.indexOf('<!-- Current Spend Section -->');
const calcSectionEnd = html.indexOf('</div>\\n            </div>\\n\\n            <!-- SEOLOGY.AI Savings -->', calcSectionStart);

const newCalcSection = `<!-- Current Spend Section -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; margin-bottom: 32px;">
              <h3 class="heading-style-h3" style="font-size: 24px; margin-bottom: 32px; text-align: center;">What are you currently using for SEO?</h3>

              <div id="current-solutions-grid" style="display: grid; gap: 16px; margin-bottom: 32px;">
                <p class="text-size-regular" style="text-align: center; opacity: 0.7;">Select your industry above to see options</p>
              </div>

              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px;">Total annual cost</p>
                    <h2 class="heading-style-h2" style="font-size: 36px;" id="total-current-cost">$0</h2>
                  </div>
                  <div style="text-align: right;">
                    <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px;">Per month</p>
                    <h3 class="heading-style-h3" style="font-size: 28px;" id="monthly-current-cost">$0</h3>
                  </div>
                </div>
              </div>
            </div>`;

html = html.substring(0, calcSectionStart) + newCalcSection + html.substring(calcSectionEnd);

fs.writeFileSync(roiPath, html, 'utf8');

console.log('✓ ROI Calculator is now SUPER interactive!');
console.log('\\n✅ New Features:');
console.log('  • Users SELECT exactly what they currently use');
console.log('  • Checkboxes for each solution with real costs');
console.log('  • Live calculation as they select/deselect');
console.log('  • Tailored to their actual spending');
console.log('  • Industry-specific options');
console.log('\\nIndustry options:');
console.log('  • E-commerce: 8 options (agency, freelancer, plugins, tools, etc.)');
console.log('  • SaaS: 8 options (agency, consultant, tools, in-house, etc.)');
console.log('  • Agency: 7 options (white-label, contractors, tools, etc.)');
console.log('  • Local: 7 options (agency, freelancer, Yext, Moz, etc.)');
