const fs = require('fs');
const path = require('path');

// Define content for each remaining page
const pageContent = {
  'local-business': {
    intro1: 'Local businesses lose customers every day to competitors with better local SEO. Missing NAP citations, inconsistent business information, and poor Google Business Profile optimization cost you rankings. SEOLOGY.AI fixes all local SEO issues automatically—from citations to schema markup.',
    intro2: 'Multi-location businesses, franchises, service area businesses—manage local SEO at scale. Auto-optimize every location page, fix NAP consistency across 100+ directories, and dominate local map pack results. Your customers are searching nearby. Make sure they find you first.',
    sectionTitle: 'Local SEO <span class="text-color-secondary">Features</span>',
    sectionSubtitle: 'Dominate local search results in every market you serve',
    features: [
      {
        title: 'NAP Consistency Automation',
        description: 'Automatically sync Name, Address, Phone across 150+ local directories. Fix inconsistencies that hurt local rankings. Monitor citations in real-time and deploy corrections instantly.',
        checks: ['Auto-sync across 150+ directories', 'Fix NAP inconsistencies automatically', 'Real-time citation monitoring', 'Duplicate listing removal']
      },
      {
        title: 'Google Business Profile Optimization',
        description: 'Auto-optimize your GBP with AI-generated descriptions, category selection, and attribute optimization. Schedule posts, respond to reviews, and track local pack rankings—all automated.',
        checks: ['AI-generated GBP descriptions', 'Smart category & attribute selection', 'Automated posting schedule', 'Review response automation']
      },
      {
        title: 'Local Schema Markup',
        description: 'Automatically add LocalBusiness, Service, and Review schema to every location page. Help Google understand your business type, service areas, and operating hours for better local visibility.',
        checks: ['LocalBusiness schema automation', 'Service area markup', 'Operating hours & holidays', 'Customer review schema']
      },
      {
        title: 'Multi-Location Management',
        description: 'Manage hundreds of locations from one dashboard. Bulk deploy local SEO fixes across all locations. Track individual location performance and optimize underperforming markets.',
        checks: ['Unlimited location management', 'Bulk local SEO deployment', 'Per-location performance tracking', 'Competitive local analysis']
      }
    ],
    useCases: [
      {
        icon: 'M19,4H5A3,3 0 0,0 2,7V17A3,3 0 0,0 5,20H19A3,3 0 0,0 22,17V7A3,3 0 0,0 19,4M5,18A1,1 0 0,1 4,17V7A1,1 0 0,1 5,6H19A1,1 0 0,1 20,7V17A1,1 0 0,1 19,18H5M7,9H17V11H7V9M7,13H17V15H7V13Z',
        title: 'Multi-Location Franchises',
        description: 'Manage local SEO for 100+ franchise locations. Consistent NAP, localized content, and franchise-specific schema markup.',
        points: ['Franchise location management', 'Brand consistency enforcement', 'Territory-based optimization']
      },
      {
        icon: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
        title: 'Service Area Businesses',
        description: 'Plumbers, electricians, HVAC—optimize for service area keywords. Location pages for every city you serve with automated local content.',
        points: ['Service area page generation', 'City-specific keyword targeting', 'Service radius optimization']
      },
      {
        icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.79 4.21,10.21L9,15V16A2,2 0 0,0 11,18M18.92,17.09C18.72,16.45 18.16,16 17.5,16H17V13A1,1 0 0,0 16,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.78 20,8.65 20,12A7.95,7.95 0 0,1 18.92,17.09Z',
        title: 'Professional Services',
        description: 'Lawyers, dentists, doctors, accountants. Local SEO for professional services with review optimization and local link building.',
        points: ['Professional directory citations', 'Review generation & management', 'Local authority building']
      }
    ]
  },
  'enterprise-guides': {
    intro1: 'Enterprise SEO requires documentation, training, and best practices. Our comprehensive guides help your team implement SEOLOGY.AI at scale across thousands of pages and multiple domains. From technical setup to ongoing optimization strategies.',
    intro2: 'Step-by-step implementation guides, video tutorials, and best practice playbooks for enterprise teams. Get your entire organization onboarded quickly with role-based training materials for developers, marketers, and executives.',
    sectionTitle: 'Enterprise <span class="text-color-secondary">Resources</span>',
    sectionSubtitle: 'Complete guides for enterprise-scale SEO automation',
    features: [
      {
        title: 'Implementation Guide',
        description: '90-day enterprise rollout plan with milestones, team responsibilities, and success metrics. Includes technical architecture, security review checklist, and change management strategy.',
        checks: ['90-day rollout timeline', 'Technical architecture docs', 'Security & compliance checklist', 'Change management plan']
      },
      {
        title: 'Developer Documentation',
        description: 'Complete API reference, webhook integration guides, and CI/CD pipeline setup. Code examples in Python, Node.js, and Ruby for custom automation workflows.',
        checks: ['Full API documentation', 'Webhook integration guides', 'CI/CD pipeline examples', 'Custom automation scripts']
      },
      {
        title: 'Marketer Training',
        description: 'Video courses and certification program for marketing teams. Learn how to interpret AI recommendations, customize fix priorities, and measure SEO impact across the organization.',
        checks: ['Video training library', 'Certification program', 'Best practice playbooks', 'ROI measurement framework']
      },
      {
        title: 'Executive Dashboards',
        description: 'Pre-built Looker/Tableau/PowerBI dashboard templates showing SEO performance across business units. C-suite reporting with traffic attribution to revenue.',
        checks: ['Executive dashboard templates', 'Business unit comparisons', 'Revenue attribution modeling', 'Competitive benchmarking']
      }
    ],
    useCases: [
      {
        icon: 'M19,4H5A3,3 0 0,0 2,7V17A3,3 0 0,0 5,20H19A3,3 0 0,0 22,17V7A3,3 0 0,0 19,4M19,18H5V7H19V18Z',
        title: 'Technical Setup Guide',
        description: 'Infrastructure requirements, API authentication, webhook configuration, and integration with existing tech stacks.',
        points: ['Infrastructure planning', 'API authentication setup', 'Integration architecture']
      },
      {
        icon: 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
        title: 'Optimization Workflows',
        description: 'Best practices for managing large-scale SEO operations, approval workflows, and automated scheduling strategies.',
        points: ['Workflow automation', 'Approval processes', 'Schedule optimization']
      },
      {
        icon: 'M3,3V21H21V3H3M18,18H6V17H18V18M18,16H6V15H18V16M18,12H6V6H18V12Z',
        title: 'Reporting & Analytics',
        description: 'Custom report building, data export formats, and integration with existing analytics platforms for unified reporting.',
        points: ['Custom report templates', 'Data warehouse integration', 'Unified analytics dashboards']
      }
    ]
  }
};

// Pages to update (excluding already completed ones)
const pagesToUpdate = [
  'local-business',
  'enterprise-guides'
];

function updatePage(pageName) {
  const content = pageContent[pageName];
  if (!content) {
    console.log(`✗ No content defined for ${pageName}`);
    return;
  }

  const filePath = path.join(__dirname, 'public', `${pageName}.html`);

  try {
    let html = fs.readFileSync(filePath, 'utf8');

    // Update intro paragraphs
    html = html.replace(
      /<p class="text-size-regular left">.*?<\/p>/,
      `<p class="text-size-regular left">${content.intro1}</p>`
    );

    html = html.replace(
      /<p class="text-size-regular right">.*?<\/p>/,
      `<p class="text-size-regular right">${content.intro2}</p>`
    );

    // Find the section after Work Process and before team section
    const workProcessEnd = html.indexOf('</section>', html.indexOf('Work <span class="text-color-secondary">Process</span>'));
    const teamSectionStart = html.indexOf('<section class="section-about-team">', workProcessEnd);

    if (workProcessEnd > 0 && teamSectionStart > 0) {
      // Build features section
      let featuresHTML = `

      <!-- ${content.sectionTitle.replace(/<[^>]+>/g, '')} Section -->
      <section class="section-home-services" style="background: rgba(0,0,0,0.2);">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div style="text-align: center; margin-bottom: 64px;">
                <h2 class="heading-style-h2">${content.sectionTitle}</h2>
                <div class="spacer-medium"></div>
                <p class="text-size-regular" style="max-width: 700px; margin: 0 auto; opacity: 0.8;">${content.sectionSubtitle}</p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-bottom: 64px;">
`;

      // Add feature cards
      content.features.forEach(feature => {
        featuresHTML += `                <!-- ${feature.title} -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                  <h3 class="heading-style-h4" style="font-size: 22px; margin-bottom: 16px;">${feature.title}</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 20px;">${feature.description}</p>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
`;

        feature.checks.forEach(check => {
          featuresHTML += `                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>${check}</span>
                    </div>
`;
        });

        featuresHTML += `                  </div>
                </div>

`;
      });

      featuresHTML += `              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Use Cases Section -->
      <section class="section-home-services" style="background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div style="text-align: center; margin-bottom: 64px;">
                <h2 class="heading-style-h2">Common <span class="text-color-secondary">Use Cases</span></h2>
                <div class="spacer-medium"></div>
                <p class="text-size-regular" style="max-width: 700px; margin: 0 auto; opacity: 0.8;">Real-world applications for your business</p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
`;

      // Add use case cards
      content.useCases.forEach(useCase => {
        featuresHTML += `                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                  <div style="width: 56px; height: 56px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <svg style="width: 28px; height: 28px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="${useCase.icon}"/></svg>
                  </div>
                  <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 12px;">${useCase.title}</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 16px;">${useCase.description}</p>
                  <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
`;

        useCase.points.forEach(point => {
          featuresHTML += `                    <div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--text-color-secondary, #00ff88);">✓</span><span>${point}</span></div>
`;
        });

        featuresHTML += `                  </div>
                </div>

`;
      });

      featuresHTML += `              </div>
            </div>
          </div>
        </div>
      </section>

      `;

      // Insert the new content
      html = html.substring(0, teamSectionStart) + featuresHTML + html.substring(teamSectionStart);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated ${pageName}.html`);
  } catch (error) {
    console.error(`✗ Error updating ${pageName}.html:`, error.message);
  }
}

// Update all pages
pagesToUpdate.forEach(updatePage);

console.log('Footer pages update complete!');
