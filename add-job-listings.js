const fs = require('fs');
const path = require('path');

console.log('🔧 Adding 4 new job listings to careers page...\n');

const careersPath = path.join(__dirname, 'public', 'careers.html');
let html = fs.readFileSync(careersPath, 'utf8');

// New job listings HTML
const newJobListings = `
                <div class="spacer-large"></div>

                <!-- Job 2: DevOps Engineer -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px;">
                  <div style="border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; padding-bottom: 24px;">
                    <h3 style="font-size: 28px; font-weight: 600; margin-bottom: 12px;">DevOps Engineer</h3>
                    <div style="opacity: 0.7; font-size: 16px;">Remote • $130k-$200k USD</div>
                  </div>
                  <div style="line-height: 1.8; opacity: 0.9; margin-bottom: 32px;">
                    <p>Build and scale our infrastructure. Kubernetes, Docker, GitHub Actions, AWS/GCP, infrastructure-as-code. 4+ years experience. Own deployment pipeline, monitoring, and reliability.</p>
                  </div>
                  <a href="mailto:careers@seology.ai?subject=DevOps Engineer Application" class="main-button w-inline-block" style="display: inline-flex; align-items: center; padding: 16px 32px; background: #ffffff; color: #000; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    <div class="button-text" style="color: #000; font-weight: 600;">Apply Now</div>
                  </a>
                </div>

                <div class="spacer-large"></div>

                <!-- Job 3: Product Designer -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px;">
                  <div style="border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; padding-bottom: 24px;">
                    <h3 style="font-size: 28px; font-weight: 600; margin-bottom: 12px;">Product Designer</h3>
                    <div style="opacity: 0.7; font-size: 16px;">Remote • $110k-$160k USD</div>
                  </div>
                  <div style="line-height: 1.8; opacity: 0.9; margin-bottom: 32px;">
                    <p>Design the user experience for SEO automation. Figma, user research, interaction design, prototyping. 3+ years experience. Make complex automation feel simple and delightful.</p>
                  </div>
                  <a href="mailto:careers@seology.ai?subject=Product Designer Application" class="main-button w-inline-block" style="display: inline-flex; align-items: center; padding: 16px 32px; background: #ffffff; color: #000; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    <div class="button-text" style="color: #000; font-weight: 600;">Apply Now</div>
                  </a>
                </div>

                <div class="spacer-large"></div>

                <!-- Job 4: Growth Marketing Manager -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px;">
                  <div style="border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; padding-bottom: 24px;">
                    <h3 style="font-size: 28px; font-weight: 600; margin-bottom: 12px;">Growth Marketing Manager</h3>
                    <div style="opacity: 0.7; font-size: 16px;">Remote • $100k-$150k USD + equity</div>
                  </div>
                  <div style="line-height: 1.8; opacity: 0.9; margin-bottom: 32px;">
                    <p>Drive user acquisition and revenue growth. SEO/SEM, content marketing, conversion optimization, analytics. 4+ years B2B SaaS experience. Own the funnel from awareness to activation.</p>
                  </div>
                  <a href="mailto:careers@seology.ai?subject=Growth Marketing Manager Application" class="main-button w-inline-block" style="display: inline-flex; align-items: center; padding: 16px 32px; background: #ffffff; color: #000; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    <div class="button-text" style="color: #000; font-weight: 600;">Apply Now</div>
                  </a>
                </div>

                <div class="spacer-large"></div>

                <!-- Job 5: Customer Success Manager -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px;">
                  <div style="border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; padding-bottom: 24px;">
                    <h3 style="font-size: 28px; font-weight: 600; margin-bottom: 12px;">Customer Success Manager</h3>
                    <div style="opacity: 0.7; font-size: 16px;">Remote • $90k-$130k USD + equity</div>
                  </div>
                  <div style="line-height: 1.8; opacity: 0.9; margin-bottom: 32px;">
                    <p>Help customers succeed with SEO automation. Onboarding, training, technical support, expansion. 3+ years SaaS customer success. Deep understanding of SEO and e-commerce platforms.</p>
                  </div>
                  <a href="mailto:careers@seology.ai?subject=Customer Success Manager Application" class="main-button w-inline-block" style="display: inline-flex; align-items: center; padding: 16px 32px; background: #ffffff; color: #000; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    <div class="button-text" style="color: #000; font-weight: 600;">Apply Now</div>
                  </a>
                </div>`;

// Find the first job listing closing div and insert the new jobs after it
const insertPoint = html.indexOf('</div>\n              </div>\n            </div>');

if (insertPoint !== -1) {
  html = html.slice(0, insertPoint + '</div>\n              '.length) + newJobListings + html.slice(insertPoint + '</div>\n              '.length);
  console.log('✅ Added 4 new job listings');
} else {
  console.error('❌ Could not find insertion point in careers.html');
  process.exit(1);
}

// Now add JobPosting schema markup in the <head> section
const jobPostingSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "JobPosting",
        "title": "Full Stack TypeScript Developer",
        "description": "Build the core automation engine. Next.js, TypeScript, PostgreSQL, advanced AI integration. 5+ years experience. Own features end-to-end from design to deployment.",
        "datePosted": "2025-01-15",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "SEOLOGY.AI",
          "sameAs": "https://seology.ai",
          "logo": "https://seology.ai/images/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        },
        "employmentType": "FULL_TIME",
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": 120000,
            "maxValue": 180000,
            "unitText": "YEAR"
          }
        }
      },
      {
        "@type": "JobPosting",
        "title": "DevOps Engineer",
        "description": "Build and scale our infrastructure. Kubernetes, Docker, GitHub Actions, AWS/GCP, infrastructure-as-code. 4+ years experience. Own deployment pipeline, monitoring, and reliability.",
        "datePosted": "2025-01-15",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "SEOLOGY.AI",
          "sameAs": "https://seology.ai",
          "logo": "https://seology.ai/images/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        },
        "employmentType": "FULL_TIME",
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": 130000,
            "maxValue": 200000,
            "unitText": "YEAR"
          }
        }
      },
      {
        "@type": "JobPosting",
        "title": "Product Designer",
        "description": "Design the user experience for SEO automation. Figma, user research, interaction design, prototyping. 3+ years experience. Make complex automation feel simple and delightful.",
        "datePosted": "2025-01-15",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "SEOLOGY.AI",
          "sameAs": "https://seology.ai",
          "logo": "https://seology.ai/images/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        },
        "employmentType": "FULL_TIME",
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": 110000,
            "maxValue": 160000,
            "unitText": "YEAR"
          }
        }
      },
      {
        "@type": "JobPosting",
        "title": "Growth Marketing Manager",
        "description": "Drive user acquisition and revenue growth. SEO/SEM, content marketing, conversion optimization, analytics. 4+ years B2B SaaS experience. Own the funnel from awareness to activation.",
        "datePosted": "2025-01-15",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "SEOLOGY.AI",
          "sameAs": "https://seology.ai",
          "logo": "https://seology.ai/images/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        },
        "employmentType": "FULL_TIME",
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": 100000,
            "maxValue": 150000,
            "unitText": "YEAR"
          }
        }
      },
      {
        "@type": "JobPosting",
        "title": "Customer Success Manager",
        "description": "Help customers succeed with SEO automation. Onboarding, training, technical support, expansion. 3+ years SaaS customer success. Deep understanding of SEO and e-commerce platforms.",
        "datePosted": "2025-01-15",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "SEOLOGY.AI",
          "sameAs": "https://seology.ai",
          "logo": "https://seology.ai/images/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          }
        },
        "employmentType": "FULL_TIME",
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": 90000,
            "maxValue": 130000,
            "unitText": "YEAR"
          }
        }
      }
    ]
  }
  </script>`;

// Insert schema before closing </head>
html = html.replace('</head>', jobPostingSchema + '\n</head>');
console.log('✅ Added JobPosting schema markup for all 5 positions');

// Save the updated HTML
fs.writeFileSync(careersPath, html);

console.log('\n✅ Careers page updated successfully!');
console.log('✅ Total job listings: 5');
console.log('✅ All jobs have proper Schema.org JobPosting markup\n');
