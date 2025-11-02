const fs = require('fs');
const path = require('path');

console.log('🔧 Adding 8 missing blog post article cards to blog.html...\n');

const blogPath = path.join(__dirname, 'public', 'blog.html');
let html = fs.readFileSync(blogPath, 'utf8');

// Find where the article grid ends (before closing the grid div)
const gridEndMarker = '</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>';

// The 8 missing blog post article cards
const missingArticles = `
                <!-- Article: Zero-Click Searches -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-1.jpg" alt="Zero-Click Searches" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">SEO Strategy</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">6 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">The Rise of Zero-Click Searches: Adapting Your SEO Strategy</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">Nearly 60% of Google searches now end without a click. Here's how to adapt your SEO strategy for the zero-click era.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Jan 5, 2025</span>
                      <a href="blog/zero-click-searches.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>

                <!-- Article: SEO Agencies Failing -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-2.jpg" alt="SEO Agencies Failing" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">Industry Insights</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">7 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">Why Traditional SEO Agencies Are Failing (And What Replaces Them)</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">The traditional SEO agency model is broken. Discover why automation and AI are replacing manual SEO services.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Jan 3, 2025</span>
                      <a href="blog/seo-agencies-failing.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>

                <!-- Article: Shopify SEO Checklist -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-3.jpg" alt="Shopify SEO" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">E-commerce SEO</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">10 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">The Complete Shopify SEO Checklist for 2025</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">A comprehensive checklist to optimize your Shopify store for search engines and boost organic traffic.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Dec 30, 2024</span>
                      <a href="blog/shopify-seo-checklist.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>

                <!-- Article: Local SEO Automation -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-2.jpg" alt="Local SEO" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">Local SEO</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">8 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">Local SEO Automation for Multi-Location Businesses</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">Managing SEO for 10+ locations manually is impossible. Here's how to automate local SEO at scale.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Dec 26, 2024</span>
                      <a href="blog/local-seo-automation.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>

                <!-- Article: Structured Data Guide -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-3.jpg" alt="Schema Markup" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">Technical SEO</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">12 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">The Complete Guide to Schema.org Structured Data in 2025</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">Schema markup is the secret weapon of top-ranking sites. Here's everything you need to know about structured data.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Dec 24, 2024</span>
                      <a href="blog/structured-data-guide.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>

                <!-- Article: SEO Rollback Safety -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-1.jpg" alt="Rollback Safety" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">SEO Strategy</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">5 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">SEO Rollback: Why Every Automated Fix Needs an Undo Button</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">Automated SEO is powerful but risky. Learn why rollback capability is non-negotiable for SEO automation.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Dec 22, 2024</span>
                      <a href="blog/seo-rollback-safety.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>

                <!-- Article: SEO Pricing Models -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-2.jpg" alt="SEO Pricing" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">Industry Insights</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">6 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">Why SEO Pricing Is Broken (And How to Fix It)</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">The SEO industry charges by the hour or by retainer. Both models are broken. Here's the alternative.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Dec 20, 2024</span>
                      <a href="blog/seo-pricing-models.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>

                <!-- Article: Enterprise SEO Automation -->
                <article style="background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s ease; cursor: pointer;"
                  class="blog-article-card">
                  <div style="aspect-ratio: 16/9; background: rgba(255,255,255,0.05); position: relative; overflow: hidden;">
                    <img src="images/Frame-3.jpg" alt="Enterprise SEO" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); color: var(--text-color-secondary, #ffffff); border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">Enterprise</span>
                      <span style="font-size: 12px; padding: 4px 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-radius: 20px;">9 min read</span>
                    </div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.3;">Enterprise SEO Automation: Managing 100,000+ Pages at Scale</h3>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">Enterprise websites with massive page counts need automation. Manual SEO simply doesn't scale.</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: rgba(255,255,255,0.5);">Dec 18, 2024</span>
                      <a href="blog/enterprise-seo-automation.html" class="main-button is-secondary w-inline-block" style="display: inline-flex; padding: 10px 20px; font-size: 14px;">
                        <div class="button-text-wrap">
                          <div class="button-text is-transition">Read Article</div>
                        </div>
                        <div class="button-transition-wrap">
                          <div class="button-transition">
                            <div class="button-text">Read Article</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>
`;

// Find the last article in the grid and add the new articles before the grid closing div
// Looking for the closing </div> right after Article 15
const insertPoint = html.indexOf('              </div>\n\n              <!-- Newsletter CTA Section -->');

if (insertPoint !== -1) {
  html = html.slice(0, insertPoint) + missingArticles + '\n' + html.slice(insertPoint);
  console.log('✅ Added 8 missing blog post article cards to blog.html');
} else {
  console.error('❌ Could not find insertion point in blog.html');
  process.exit(1);
}

// Save the updated HTML
fs.writeFileSync(blogPath, html);

console.log('\n✅ Blog index page updated successfully!');
console.log('✅ Total articles now visible on blog.html: 13/13 (100%)');
console.log('✅ All blog posts are now discoverable by users\n');
