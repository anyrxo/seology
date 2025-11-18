'use client';

import { motion } from "framer-motion";

export default function TermsPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Last updated: November 12, 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-slate dark:prose-invert max-w-none"
          >
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using Seology.ai ("Service," "Platform," "we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>

            <h2>Description of Service</h2>
            <p>
              Seology.ai provides AI-powered SEO automation services for Shopify stores, including but not limited to:
            </p>
            <ul>
              <li>Automated SEO analysis and optimization</li>
              <li>Technical SEO fixes and improvements</li>
              <li>Content optimization and recommendations</li>
              <li>Keyword research and tracking</li>
              <li>Competitor analysis</li>
              <li>Performance reporting and analytics</li>
            </ul>

            <h2>Account Registration</h2>
            
            <h3>Eligibility</h3>
            <p>You must be at least 18 years old and have the legal capacity to enter into contracts to use our Service. By registering, you represent that you meet these requirements.</p>

            <h3>Account Security</h3>
            <p>You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information is accurate and current</li>
            </ul>

            <h3>Account Termination</h3>
            <p>We reserve the right to suspend or terminate your account if you:</p>
            <ul>
              <li>Violate these Terms</li>
              <li>Provide false or misleading information</li>
              <li>Engage in fraudulent or illegal activities</li>
              <li>Abuse or misuse our Service</li>
            </ul>

            <h2>Subscription and Billing</h2>

            <h3>Free Trial</h3>
            <p>We offer a 14-day free trial for new users. No credit card is required to start your trial. You can cancel anytime during the trial period without being charged.</p>

            <h3>Paid Subscriptions</h3>
            <p>After your free trial, you'll be charged based on your selected plan:</p>
            <ul>
              <li><strong>Starter Plan:</strong> $49/month or $39/month (annual)</li>
              <li><strong>Professional Plan:</strong> $99/month or $79/month (annual)</li>
              <li><strong>Enterprise Plan:</strong> $299/month or $239/month (annual)</li>
            </ul>

            <h3>Billing</h3>
            <p>By providing payment information, you authorize us to charge your payment method:</p>
            <ul>
              <li>Monthly subscriptions are billed on the same day each month</li>
              <li>Annual subscriptions are billed once per year</li>
              <li>All fees are in USD and non-refundable except as required by law</li>
              <li>We may change pricing with 30 days' notice</li>
            </ul>

            <h3>Cancellation and Refunds</h3>
            <p>You may cancel your subscription at any time through your account settings. Upon cancellation:</p>
            <ul>
              <li>You'll retain access until the end of your current billing period</li>
              <li>No refunds will be provided for partial months</li>
              <li>We offer a 30-day money-back guarantee for first-time subscribers</li>
            </ul>

            <h2>Acceptable Use</h2>

            <h3>Permitted Use</h3>
            <p>You may use our Service only for lawful purposes and in accordance with these Terms. You agree to:</p>
            <ul>
              <li>Use the Service only for your own Shopify stores</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect intellectual property rights</li>
              <li>Provide accurate information</li>
            </ul>

            <h3>Prohibited Use</h3>
            <p>You may NOT:</p>
            <ul>
              <li>Resell, redistribute, or sublicense the Service</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Use the Service to spam or manipulate search engines</li>
              <li>Violate any search engine's terms of service</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use automated tools to access the Service (except as provided)</li>
              <li>Share your account with others</li>
              <li>Engage in any illegal or fraudulent activities</li>
            </ul>

            <h2>Intellectual Property</h2>

            <h3>Our Rights</h3>
            <p>The Service, including all content, features, and functionality, is owned by Seology.ai and protected by copyright, trademark, and other intellectual property laws.</p>

            <h3>Your Rights</h3>
            <p>You retain all rights to your store content and data. By using our Service, you grant us a limited license to:</p>
            <ul>
              <li>Access and analyze your store data</li>
              <li>Make SEO optimizations on your behalf</li>
              <li>Use aggregated, anonymized data to improve our Service</li>
            </ul>

            <h3>Feedback</h3>
            <p>If you provide feedback or suggestions, we may use them without any obligation to you.</p>

            <h2>Data and Privacy</h2>
            <p>Your use of the Service is also governed by our Privacy Policy. By using the Service, you consent to our collection and use of data as described in the Privacy Policy.</p>

            <h3>Data Ownership</h3>
            <p>You own your data. We act as a data processor on your behalf. Upon account termination, we'll delete your data within 90 days unless required by law to retain it.</p>

            <h3>Data Security</h3>
            <p>We implement industry-standard security measures, but we cannot guarantee absolute security. You're responsible for backing up your important data.</p>

            <h2>Service Availability</h2>
            <p>We strive for 99.9% uptime but cannot guarantee uninterrupted access. We may:</p>
            <ul>
              <li>Perform scheduled maintenance (with notice)</li>
              <li>Make emergency repairs</li>
              <li>Update or modify features</li>
              <li>Temporarily suspend the Service</li>
            </ul>
            <p>We're not liable for any downtime or service interruptions.</p>

            <h2>Disclaimers and Limitations</h2>

            <h3>No Guarantees</h3>
            <p>While we work hard to improve your SEO, we cannot guarantee specific results such as:</p>
            <ul>
              <li>Specific search engine rankings</li>
              <li>Traffic increases</li>
              <li>Revenue improvements</li>
              <li>Timeline for results</li>
            </ul>
            <p>SEO results depend on many factors outside our control, including search engine algorithms, competition, and your store's content.</p>

            <h3>Service "As Is"</h3>
            <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

            <h3>Limitation of Liability</h3>
            <p>To the maximum extent permitted by law, Seology.ai shall not be liable for:</p>
            <ul>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, revenue, or data</li>
              <li>Business interruption</li>
              <li>Damages exceeding the amount you paid us in the past 12 months</li>
            </ul>

            <h2>Indemnification</h2>
            <p>You agree to indemnify and hold harmless Seology.ai from any claims, damages, or expenses arising from:</p>
            <ul>
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your store content or activities</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>Our Service integrates with third-party platforms (e.g., Shopify, Google). Your use of these platforms is subject to their own terms and policies. We're not responsible for third-party services or their changes.</p>

            <h2>Modifications to Terms</h2>
            <p>We may modify these Terms at any time. We'll notify you of material changes by:</p>
            <ul>
              <li>Posting updated Terms on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending email notification (for significant changes)</li>
            </ul>
            <p>Your continued use after changes constitutes acceptance of the new Terms.</p>

            <h2>Modifications to Service</h2>
            <p>We reserve the right to:</p>
            <ul>
              <li>Modify or discontinue any feature</li>
              <li>Change pricing with 30 days' notice</li>
              <li>Add or remove integrations</li>
              <li>Update our AI models and algorithms</li>
            </ul>

            <h2>Governing Law</h2>
            <p>These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.</p>

            <h2>Dispute Resolution</h2>

            <h3>Informal Resolution</h3>
            <p>Before filing a claim, you agree to contact us at legal@seology.ai to attempt to resolve the dispute informally.</p>

            <h3>Arbitration</h3>
            <p>Any disputes not resolved informally shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules, except as follows:</p>
            <ul>
              <li>You may bring claims in small claims court</li>
              <li>You may seek injunctive relief in court</li>
            </ul>

            <h3>Class Action Waiver</h3>
            <p>You agree to resolve disputes on an individual basis and waive any right to participate in class actions.</p>

            <h2>Severability</h2>
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.</p>

            <h2>Entire Agreement</h2>
            <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Seology.ai regarding the Service.</p>

            <h2>Contact Information</h2>
            <p>For questions about these Terms, contact us at:</p>
            <ul>
              <li><strong>Email:</strong> legal@seology.ai</li>
              <li><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</li>
              <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}

