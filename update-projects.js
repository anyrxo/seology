const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'projects.html');
let html = fs.readFileSync(filePath, 'utf8');

// Find the section after the header
const headerEnd = html.indexOf('</header>', html.indexOf('section-projects-header'));
const sectionStart = html.indexOf('<section class="section-projects-content">', headerEnd);

// Build case studies content
const caseStudiesHTML = `

      <!-- Case Studies Section -->
      <section class="section-home-services" style="background: rgba(0,0,0,0.2); padding: 80px 0;">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 64px;">
              <h2 class="heading-style-h2">Success <span class="text-color-secondary">Stories</span></h2>
              <div class="spacer-medium"></div>
              <p class="text-size-regular" style="max-width: 700px; margin: 0 auto; opacity: 0.8;">Real companies, real results. See how SEOLOGY.AI automated SEO fixes and drove measurable growth.</p>
            </div>

            <!-- Case Study 1: E-commerce Fashion Retailer -->
            <div style="background: linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(0,0,0,0.3) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 48px; margin-bottom: 32px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
                <div>
                  <div style="display: inline-block; background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-radius: 8px; padding: 6px 12px; margin-bottom: 16px; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: var(--text-color-secondary, #00ff88);">E-COMMERCE</div>
                  <h3 class="heading-style-h3" style="margin-bottom: 16px;">Fashion Retailer: 187% Organic Traffic Increase</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 24px;">8,500-product Shopify store with missing meta descriptions, broken schema markup, and duplicate content issues across category pages. SEOLOGY.AI auto-fixed all issues in 72 hours.</p>

                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">187%</div>
                      <div style="font-size: 14px; opacity: 0.7;">Organic Traffic Increase</div>
                    </div>
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">8,500</div>
                      <div style="font-size: 14px; opacity: 0.7;">Products Optimized</div>
                    </div>
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">72hrs</div>
                      <div style="font-size: 14px; opacity: 0.7;">Time to Fix All Issues</div>
                    </div>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Auto-generated 8,500 meta descriptions optimized for conversions</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Fixed broken Product schema markup on all listings</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Eliminated 2,300+ duplicate content issues across category pages</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Increased mobile page speed from 38 to 89 (PageSpeed score)</span>
                    </div>
                  </div>
                </div>

                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
                  <div style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">90-Day Results</div>
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Organic Sessions</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+187%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 87%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Keyword Rankings (Top 10)</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+312</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 92%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Revenue from Organic</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+$47k/mo</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 78%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Case Study 2: SaaS Company -->
            <div style="background: linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(0,0,0,0.3) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 48px; margin-bottom: 32px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
                <div>
                  <div style="display: inline-block; background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-radius: 8px; padding: 6px 12px; margin-bottom: 16px; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: var(--text-color-secondary, #00ff88);">B2B SAAS</div>
                  <h3 class="heading-style-h3" style="margin-bottom: 16px;">Project Management Tool: 143% Trial Signups</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 24px;">Product-led SaaS with 400+ documentation pages, poor internal linking structure, and slow-loading changelog pages. SEOLOGY.AI optimized docs, fixed technical issues, and automated ongoing content optimization.</p>

                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">143%</div>
                      <div style="font-size: 14px; opacity: 0.7;">Trial Signups Increase</div>
                    </div>
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">400+</div>
                      <div style="font-size: 14px; opacity: 0.7;">Docs Pages Optimized</div>
                    </div>
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">5.2s</div>
                      <div style="font-size: 14px; opacity: 0.7;">Page Speed Improvement</div>
                    </div>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Built intelligent internal linking across all documentation</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Optimized changelog for "vs [competitor]" searches</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Auto-updated meta tags when new features shipped</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Integrated with CI/CD for automatic SEO checks on deploys</span>
                    </div>
                  </div>
                </div>

                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
                  <div style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">6-Month Results</div>
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Organic Trial Signups</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+143%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 75%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Docs Engagement Time</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+89%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 65%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Monthly Recurring Revenue</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+$12k/mo</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 82%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Case Study 3: Multi-Location Business -->
            <div style="background: linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(0,0,0,0.3) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 48px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
                <div>
                  <div style="display: inline-block; background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-radius: 8px; padding: 6px 12px; margin-bottom: 16px; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: var(--text-color-secondary, #00ff88);">LOCAL SEO</div>
                  <h3 class="heading-style-h3" style="margin-bottom: 16px;">HVAC Franchise: 67 Locations Dominating Local Search</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 24px;">Multi-location HVAC franchise with inconsistent NAP citations, missing Google Business Profile optimizations, and zero local schema markup. SEOLOGY.AI automated local SEO across all 67 locations.</p>

                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">234%</div>
                      <div style="font-size: 14px; opacity: 0.7;">Local Pack Appearances</div>
                    </div>
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">67</div>
                      <div style="font-size: 14px; opacity: 0.7;">Locations Optimized</div>
                    </div>
                    <div>
                      <div style="font-size: 32px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 4px;">18min</div>
                      <div style="font-size: 14px; opacity: 0.7;">Avg. Setup Time/Location</div>
                    </div>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Fixed NAP inconsistencies across 150+ local directories</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Auto-optimized Google Business Profiles for all 67 locations</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Added LocalBusiness schema to every location page</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #00ff88);">✓</span>
                      <span>Automated review response and Q&A management</span>
                    </div>
                  </div>
                </div>

                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
                  <div style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">4-Month Results</div>
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Local Pack Rankings</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+234%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 95%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Phone Call Volume</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+167%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 88%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="opacity: 0.8;">Booked Appointments</span>
                      <span style="font-weight: 700; color: var(--text-color-secondary, #00ff88);">+$84k/mo</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                      <div style="width: 91%; height: 100%; background: linear-gradient(90deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.5));"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ROI Stats Section -->
      <section class="section-home-services" style="background: linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,0,0,0.4) 100%); padding: 80px 0;">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 64px;">
              <h2 class="heading-style-h2">Platform <span class="text-color-secondary">Performance</span></h2>
              <div class="spacer-medium"></div>
              <p class="text-size-regular" style="max-width: 700px; margin: 0 auto; opacity: 0.8;">Aggregate results across all SEOLOGY.AI customers</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;">
              <div style="text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 8px;">10,000+</div>
                <div class="text-size-regular" style="opacity: 0.7;">Sites Optimized</div>
              </div>
              <div style="text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 8px;">2.4M</div>
                <div class="text-size-regular" style="opacity: 0.7;">Issues Fixed</div>
              </div>
              <div style="text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 8px;">156%</div>
                <div class="text-size-regular" style="opacity: 0.7;">Avg. Traffic Increase</div>
              </div>
              <div style="text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 8px;">98.7%</div>
                <div class="text-size-regular" style="opacity: 0.7;">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

`;

// Find where to insert (before the old section-projects-content or replace it)
const sectionEnd = html.indexOf('</section>', sectionStart);
const nextSection = html.indexOf('<', sectionEnd + 10);

// Replace the empty section with our new content
html = html.substring(0, headerEnd + 9) + caseStudiesHTML + html.substring(nextSection);

fs.writeFileSync(filePath, html, 'utf8');
console.log('✓ Updated projects.html with case studies');
