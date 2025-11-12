'use client';

import { motion } from "framer-motion";
import Header from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Last updated: November 12, 2024
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2>Introduction</h2>
              <p>
                Seology.ai ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our SEO automation platform and services.
              </p>

              <h2>Information We Collect</h2>
              
              <h3>Information You Provide</h3>
              <p>We collect information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Register for an account</li>
                <li>Connect your Shopify store</li>
                <li>Contact our support team</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name and email address</li>
                <li>Store URL and business information</li>
                <li>Payment and billing information</li>
                <li>Communications with our team</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>When you use Seology.ai, we automatically collect certain information, including:</p>
              <ul>
                <li>Store data (products, pages, content)</li>
                <li>SEO metrics and analytics</li>
                <li>Usage data and feature interactions</li>
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li><strong>Provide our services:</strong> Analyze and optimize your store's SEO, generate reports, and implement improvements</li>
                <li><strong>Improve our platform:</strong> Enhance features, develop new functionality, and train our AI models</li>
                <li><strong>Communicate with you:</strong> Send service updates, respond to inquiries, and provide customer support</li>
                <li><strong>Process payments:</strong> Handle billing and subscription management</li>
                <li><strong>Ensure security:</strong> Detect fraud, prevent abuse, and protect user data</li>
                <li><strong>Comply with legal obligations:</strong> Meet regulatory requirements and respond to legal requests</li>
              </ul>

              <h2>How We Share Your Information</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              
              <h3>Service Providers</h3>
              <p>We work with third-party companies that help us operate our platform:</p>
              <ul>
                <li>Cloud hosting providers (AWS, Google Cloud)</li>
                <li>Payment processors (Stripe)</li>
                <li>Analytics services (Google Analytics)</li>
                <li>Customer support tools</li>
                <li>Email service providers</li>
              </ul>

              <h3>Business Transfers</h3>
              <p>If Seology.ai is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>

              <h3>Legal Requirements</h3>
              <p>We may disclose your information if required by law or in response to valid legal requests from authorities.</p>

              <h2>Data Security</h2>
              <p>We implement industry-standard security measures to protect your information:</p>
              <ul>
                <li>Encryption in transit (TLS/SSL) and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication</li>
                <li>Secure data centers with physical security</li>
                <li>Employee training on data protection</li>
              </ul>
              <p>However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>

              <h2>Your Privacy Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
              </ul>
              <p>To exercise these rights, contact us at privacy@seology.ai.</p>

              <h2>Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our platform</li>
                <li>Provide personalized experiences</li>
                <li>Improve our services</li>
              </ul>
              <p>You can control cookies through your browser settings. However, disabling cookies may limit certain features of our platform.</p>

              <h2>Data Retention</h2>
              <p>We retain your information for as long as necessary to:</p>
              <ul>
                <li>Provide our services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
              <p>When you cancel your account, we delete or anonymize your personal information within 90 days, except where we're required to retain it by law.</p>

              <h2>Children's Privacy</h2>
              <p>Seology.ai is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe we've collected information from a child, please contact us immediately.</p>

              <h2>International Data Transfers</h2>
              <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.</p>

              <h2>Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We'll notify you of significant changes by:</p>
              <ul>
                <li>Posting the new policy on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Sending an email notification (for material changes)</li>
              </ul>
              <p>Your continued use of Seology.ai after changes constitutes acceptance of the updated policy.</p>

              <h2>Contact Us</h2>
              <p>If you have questions about this Privacy Policy or our data practices, contact us at:</p>
              <ul>
                <li><strong>Email:</strong> privacy@seology.ai</li>
                <li><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567</li>
              </ul>

              <h2>GDPR Compliance (EU Users)</h2>
              <p>If you're in the European Economic Area (EEA), you have additional rights under GDPR:</p>
              <ul>
                <li>Right to object to processing</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
                <li>Right to withdraw consent at any time</li>
              </ul>
              <p>Our legal basis for processing your data includes:</p>
              <ul>
                <li>Performance of a contract (providing our services)</li>
                <li>Legitimate interests (improving our platform)</li>
                <li>Consent (marketing communications)</li>
                <li>Legal obligations (compliance with laws)</li>
              </ul>

              <h2>CCPA Compliance (California Users)</h2>
              <p>If you're a California resident, you have rights under the California Consumer Privacy Act (CCPA):</p>
              <ul>
                <li>Right to know what personal information we collect</li>
                <li>Right to delete your personal information</li>
                <li>Right to opt-out of the sale of personal information (we don't sell data)</li>
                <li>Right to non-discrimination for exercising your rights</li>
              </ul>
              <p>To exercise these rights, contact us at privacy@seology.ai or call +1 (555) 123-4567.</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
