const fs = require('fs');
const path = require('path');

console.log('🔧 Adding detailed subprocessor information...\n');

const publicDir = path.join(__dirname, 'public');
const subprocessorsPath = path.join(publicDir, 'subprocessors.html');

let html = fs.readFileSync(subprocessorsPath, 'utf8');

// Find where to insert content (before </main>)
const mainClosing = '    </main>';
const insertPoint = html.indexOf(mainClosing);

if (insertPoint === -1) {
  console.error('❌ Could not find </main> tag');
  process.exit(1);
}

const subprocessorContent = `
      <!-- Detailed Subprocessor Table -->
      <section style="background: rgba(0,0,0,0.4);">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div style="max-width: 1200px; margin: 0 auto;">

                <!-- Intro Text -->
                <div style="text-align: center; margin-bottom: 48px;">
                  <p class="text-size-large" style="opacity: 0.8; max-width: 800px; margin: 0 auto;">
                    SEOLOGY.AI engages the following sub-processors to assist in providing our services. We maintain strict data processing agreements with all partners and notify customers 30 days prior to engaging new sub-processors.
                  </p>
                </div>

                <!-- Subprocessor Table -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden;">

                  <!-- Table Header -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <div class="text-size-regular" style="font-weight: 600;">Entity Name</div>
                    <div class="text-size-regular" style="font-weight: 600;">Location</div>
                    <div class="text-size-regular" style="font-weight: 600;">Service Description</div>
                    <div class="text-size-regular" style="font-weight: 600;">Data Processed</div>
                  </div>

                  <!-- Anthropic (Claude AI) -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">Anthropic, PBC</div>
                      <a href="https://anthropic.com" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">anthropic.com</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Claude AI language model for SEO analysis and fix generation</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Website content, meta tags, URLs</div>
                  </div>

                  <!-- Vercel -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">Vercel Inc.</div>
                      <a href="https://vercel.com" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">vercel.com</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Cloud hosting and serverless infrastructure</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Application data, user accounts</div>
                  </div>

                  <!-- Stripe -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">Stripe, Inc.</div>
                      <a href="https://stripe.com" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">stripe.com</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Payment processing and billing management</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Payment information, billing details</div>
                  </div>

                  <!-- SendGrid/Twilio -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">SendGrid (Twilio)</div>
                      <a href="https://sendgrid.com" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">sendgrid.com</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Transactional email delivery and notifications</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Email addresses, notification content</div>
                  </div>

                  <!-- Clerk -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">Clerk, Inc.</div>
                      <a href="https://clerk.com" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">clerk.com</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">User authentication and identity management</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Email, name, authentication tokens</div>
                  </div>

                  <!-- Supabase/PostgreSQL -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">Supabase, Inc.</div>
                      <a href="https://supabase.com" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">supabase.com</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Database hosting and management (PostgreSQL)</div>
                    <div class="text-size-regular" style="opacity: 0.8;">All customer data, site configs</div>
                  </div>

                  <!-- Datadog -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">Datadog, Inc.</div>
                      <a href="https://datadoghq.com" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">datadoghq.com</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Application monitoring, logging, and observability</div>
                    <div class="text-size-regular" style="opacity: 0.8;">System logs, performance metrics</div>
                  </div>

                  <!-- Sentry -->
                  <div style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr; gap: 24px; padding: 24px 32px;">
                    <div>
                      <div class="text-size-regular" style="font-weight: 600; margin-bottom: 4px;">Sentry</div>
                      <a href="https://sentry.io" target="_blank" rel="noopener" class="text-size-regular" style="opacity: 0.6; font-size: 14px; color: var(--text-color-secondary, #ffffff); text-decoration: none;">sentry.io</a>
                    </div>
                    <div class="text-size-regular" style="opacity: 0.8;">United States</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Error tracking and application debugging</div>
                    <div class="text-size-regular" style="opacity: 0.8;">Error logs, stack traces</div>
                  </div>

                </div>

                <!-- Notice Section -->
                <div style="margin-top: 48px; padding: 32px; background: rgba(0, 204, 106, 0.05); border: 1px solid rgba(0, 204, 106, 0.2); border-radius: 16px;">
                  <h3 class="heading-style-h4" style="margin-bottom: 16px; color: var(--text-color-secondary, #ffffff);">Change Notification</h3>
                  <p class="text-size-regular" style="opacity: 0.8; line-height: 1.6; margin-bottom: 12px;">
                    SEOLOGY.AI will provide at least 30 days' notice before engaging any new sub-processors or making material changes to existing sub-processor arrangements. Customers may object to new sub-processors by contacting <a href="mailto:dpo@seology.ai" style="color: var(--text-color-secondary, #ffffff); text-decoration: underline;">dpo@seology.ai</a> within 10 days of receiving notice.
                  </p>
                  <p class="text-size-regular" style="opacity: 0.8; line-height: 1.6;">
                    <strong>Last Updated:</strong> November 2, 2025
                  </p>
                </div>

                <!-- Data Protection -->
                <div style="margin-top: 32px; text-align: center;">
                  <p class="text-size-regular" style="opacity: 0.6; margin-bottom: 16px;">
                    All sub-processors are bound by data processing agreements that meet GDPR requirements.
                  </p>
                  <a href="dpa.html" class="main-button is-secondary w-inline-block" style="display: inline-flex;">
                    <div class="button-text-wrap">
                      <div class="button-text is-transition">View Data Processing Agreement</div>
                    </div>
                    <div class="button-transition-wrap">
                      <div class="button-transition">
                        <div class="button-text">View Data Processing Agreement</div>
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
`;

// Insert the content before </main>
html = html.substring(0, insertPoint) + subprocessorContent + '\n' + html.substring(insertPoint);

fs.writeFileSync(subprocessorsPath, html);

console.log('✅ Subprocessors page updated with detailed information!');
console.log('✅ Added 8 detailed subprocessor entries');
console.log('✅ Includes: Anthropic, Vercel, Stripe, SendGrid, Clerk, Supabase, Datadog, Sentry');
console.log('✅ Added change notification notice and DPA link button');
console.log('✅ Full table with entity name, location, service description, and data processed');
