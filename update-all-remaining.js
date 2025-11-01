const fs = require('fs');
const path = require('path');

const allContent = {
  'security': {
    intro1: 'Security isn\'t optional when you\'re deploying automated fixes to customer websites. SEOLOGY.AI is SOC 2 Type II certified, GDPR compliant, and built with enterprise-grade security from day one. Every fix is audited, every action logged, and every integration encrypted.',
    intro2: 'We handle SEO automation for Fortune 500 companies and government agencies. Our infrastructure is penetration-tested quarterly, our team is security-trained annually, and our code is reviewed by third-party security auditors. Your data and your customers\' sites are safe with us.',
    title: 'Security & Compliance',
    features: ['SOC 2 Type II Certification', 'GDPR & CCPA Compliance', 'Enterprise SSO & SAML', 'Penetration Testing', 'Encrypted Data Storage', 'Audit Logs & Monitoring']
  },
  'demo': {
    intro1: 'See SEOLOGY.AI in action with a personalized demo. Watch our AI analyze a real website, identify critical SEO issues, and generate automated fix plans—all in under 5 minutes. We\'ll show you exactly how much time and money you\'ll save.',
    intro2: 'Every demo is tailored to your industry and tech stack. Bring your own website or use one of our examples. See live fixes being deployed, review AI-generated recommendations, and get answers to all your technical questions from our team.',
    title: 'Request a Demo',
    features: ['Live Website Analysis', 'AI Fix Generation', 'ROI Calculator', 'Technical Q&A', 'Custom Industry Examples', 'Integration Walkthrough']
  },
  'help': {
    intro1: 'Get help 24/7 with our comprehensive help center. Search hundreds of articles, video tutorials, and step-by-step guides covering every feature of SEOLOGY.AI. From basic setup to advanced automation workflows—we\'ve documented everything.',
    intro2: 'Can\'t find what you need? Our support team responds in under 2 hours on average. Submit a ticket, join our Discord community, or schedule a call with a technical specialist. Enterprise customers get dedicated Slack channels and priority support.',
    title: 'Help Center',
    features: ['Search 500+ Articles', 'Video Tutorials', 'Live Chat Support', 'Community Discord', 'API Documentation', 'Troubleshooting Guides']
  },
  'docs': {
    intro1: 'Complete technical documentation for developers, marketers, and administrators. API references, webhook guides, integration tutorials, and best practices for implementing SEOLOGY.AI at any scale. All docs are searchable and include code examples.',
    intro2: 'Documentation organized by role and skill level. Developers get API specs and code samples in 8+ languages. Marketers get workflow guides and reporting templates. Admins get security configurations and user management docs. Everyone stays up to date.',
    title: 'Documentation',
    features: ['API Reference', 'Integration Guides', 'Code Examples', 'Webhook Specs', 'Best Practices', 'Changelog']
  },
  'api': {
    intro1: 'Build custom integrations and automation workflows with our REST API. Full programmatic access to all SEOLOGY.AI features—scan sites, deploy fixes, generate reports, and manage users. Rate limits scale with your plan, from 1,000 to 1,000,000 requests per day.',
    intro2: 'Comprehensive API with SDKs in Python, Node.js, Ruby, PHP, and Go. WebSocket support for real-time updates. GraphQL endpoint for complex queries. OAuth 2.0 authentication with API keys and JWT tokens. Sandbox environment for testing without affecting production sites.',
    title: 'API Reference',
    features: ['REST API', 'GraphQL Endpoint', 'WebSocket Streams', 'OAuth 2.0', 'SDKs in 5+ Languages', 'Sandbox Environment']
  },
  'privacy': {
    intro1: 'Your privacy matters. This policy explains what data we collect, why we collect it, how we use it, and your rights under GDPR, CCPA, and other privacy laws. We never sell your data. We never train AI models on your content without explicit permission.',
    intro2: 'We collect only what\'s necessary to provide our service: website URLs you connect, SEO issues we detect, and fixes we deploy. All data is encrypted at rest and in transit. You can export or delete your data anytime. Enterprise customers can request on-premise deployment for complete data sovereignty.',
    title: 'Privacy Policy',
    features: ['GDPR Compliant', 'CCPA Compliant', 'No Data Selling', 'Right to Deletion', 'Data Export', 'Encryption']
  },
  'terms': {
    intro1: 'These Terms of Service govern your use of SEOLOGY.AI. By using our platform, you agree to these terms. We\'ve written them in plain English—no confusing legalese. If you have questions, contact our legal team at legal@seology.ai.',
    intro2: 'Key terms: You own your content and data. We own our technology and AI models. You\'re responsible for how you use our automation (don\'t break laws or violate others\' rights). We\'re responsible for keeping the platform running securely and reliably. Either party can terminate with 30 days notice.',
    title: 'Terms of Service',
    features: ['Account Terms', 'Acceptable Use', 'Payment Terms', 'Intellectual Property', 'Warranty & Liability', 'Termination']
  },
  'dpa': {
    intro1: 'This Data Processing Agreement (DPA) covers how SEOLOGY.AI processes customer data on your behalf. Required for GDPR compliance when you use our service with EU customer data. We act as your data processor, you remain the data controller.',
    intro2: 'DPA includes Standard Contractual Clauses (SCCs) for international data transfers, security measures we implement, sub-processor disclosure, data breach notification procedures, and your audit rights. Automatically incorporated into all Enterprise agreements. Available for Business plans upon request.',
    title: 'Data Processing Agreement',
    features: ['GDPR Compliance', 'Standard Contractual Clauses', 'Security Measures', 'Sub-processor List', 'Breach Notification', 'Audit Rights']
  },
  'subprocessors': {
    intro1: 'We use carefully vetted sub-processors to deliver our service. This page lists all third-party vendors who may process customer data on our behalf. We notify customers 30 days before adding new sub-processors. You can object to new sub-processors under our DPA.',
    intro2: 'All sub-processors are contractually required to meet the same security and privacy standards as SEOLOGY.AI. They\'re audited annually for compliance with GDPR, SOC 2, and other security frameworks. Data is encrypted in transit and at rest with all sub-processors.',
    title: 'Sub-processors',
    features: ['AWS (Hosting)', 'Anthropic (AI Processing)', 'Stripe (Payments)', 'SendGrid (Email)', 'Datadog (Monitoring)', 'Auth0 (Authentication)']
  }
};

function updatePage(pageName) {
  const content = allContent[pageName];
  if (!content) return;

  const filePath = path.join(__dirname, 'public', `${pageName}.html`);

  try {
    let html = fs.readFileSync(filePath, 'utf8');

    // Update intro text if not already updated
    if (html.includes('We built SEOLOGY.AI with one mission')) {
      html = html.replace(
        /<p class="text-size-regular left">.*?<\/p>/,
        `<p class="text-size-regular left">${content.intro1}</p>`
      );
      html = html.replace(
        /<p class="text-size-regular right">.*?<\/p>/,
        `<p class="text-size-regular right">${content.intro2}</p>`
      );
    }

    // Find insertion point
    const workProcessEnd = html.indexOf('</section>', html.indexOf('Work <span class="text-color-secondary">Process</span>'));
    const teamSectionStart = html.indexOf('<section class="section-about-team">', workProcessEnd);

    if (workProcessEnd > 0 && teamSectionStart > 0) {
      let newSection = `

      <!-- ${content.title} Section -->
      <section class="section-home-services" style="background: rgba(0,0,0,0.2);">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div style="text-align: center; margin-bottom: 64px;">
                <h2 class="heading-style-h2">${content.title.split(' ')[0]} <span class="text-color-secondary">${content.title.split(' ').slice(1).join(' ')}</span></h2>
                <div class="spacer-medium"></div>
                <p class="text-size-regular" style="max-width: 700px; margin: 0 auto; opacity: 0.8;">Enterprise-grade security and compliance</p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
`;

      content.features.forEach(feature => {
        newSection += `                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; text-align: center;">
                  <div style="width: 56px; height: 56px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <svg style="width: 28px; height: 28px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>
                  </div>
                  <h3 class="heading-style-h4" style="font-size: 18px; margin-bottom: 12px;">${feature}</h3>
                </div>
`;
      });

      newSection += `              </div>
            </div>
          </div>
        </div>
      </section>

      `;

      html = html.substring(0, teamSectionStart) + newSection + html.substring(teamSectionStart);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated ${pageName}.html`);
  } catch (error) {
    console.error(`✗ Error updating ${pageName}.html:`, error.message);
  }
}

// Update all remaining pages
Object.keys(allContent).forEach(updatePage);

console.log('All remaining pages updated!');
