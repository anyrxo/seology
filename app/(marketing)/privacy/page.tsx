'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 110, 0],
            y: [0, 55, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -85, 0],
            y: [0, 85, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -105, 0],
            y: [0, -65, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Sticky Glass Header */}
      <motion.div
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="p-3 bg-green-100 rounded-xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Shield className="w-8 h-8 text-green-600" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-1">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 prose prose-blue max-w-none relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          {/* Floating Particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-green-500/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <h2>1. Introduction</h2>
            <p>
              SEOLOGY.AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Account Information</h3>
            <p>
              When you register for an account, we collect:
            </p>
            <ul>
              <li>Name and email address</li>
              <li>Company name and business information</li>
              <li>Billing and payment information</li>
              <li>Account preferences and settings</li>
            </ul>

            <h3>2.2 Website Data</h3>
            <p>
              When you connect your website(s) to our Service, we collect:
            </p>
            <ul>
              <li>Website URLs and domain information</li>
              <li>HTML content, meta tags, and page structure</li>
              <li>Images and media files for optimization</li>
              <li>CMS credentials (encrypted and stored securely)</li>
              <li>Analytics and performance metrics</li>
            </ul>

            <h3>2.3 Usage Information</h3>
            <p>
              We automatically collect information about how you use the Service:
            </p>
            <ul>
              <li>Log data (IP addresses, browser type, operating system)</li>
              <li>Pages visited and actions taken within the Service</li>
              <li>Time and date of access</li>
              <li>API usage and integration activity</li>
            </ul>

            <h3>2.4 Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to:
            </p>
            <ul>
              <li>Maintain your session and preferences</li>
              <li>Analyze Service usage and performance</li>
              <li>Provide personalized experiences</li>
              <li>Detect and prevent fraud</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul>
              <li>Provide and maintain the Service</li>
              <li>Analyze and optimize your website's SEO</li>
              <li>Apply automated fixes to your websites</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service updates and notifications</li>
              <li>Respond to support requests</li>
              <li>Improve and develop new features</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Data Storage and Security</h2>
            <h3>4.1 Security Measures</h3>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul>
              <li>Encryption of data in transit (TLS/SSL)</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Secure credential storage with encryption</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication</li>
              <li>Regular backups and disaster recovery</li>
            </ul>

            <h3>4.2 Data Retention</h3>
            <p>
              We retain your data for as long as your account is active or as needed to provide services. Specific
              retention periods:
            </p>
            <ul>
              <li>Account data: Retained until account deletion</li>
              <li>Website snapshots: 90 days for rollback capability</li>
              <li>Analytics data: 2 years</li>
              <li>Audit logs: 1 year</li>
              <li>Billing records: 7 years (legal requirement)</li>
            </ul>

            <h2>5. Data Sharing and Disclosure</h2>
            <h3>5.1 Third-Party Services</h3>
            <p>
              We may share data with trusted third-party service providers who assist in operating our Service:
            </p>
            <ul>
              <li>Cloud hosting providers (Vercel, AWS)</li>
              <li>Database services (Supabase, PostgreSQL)</li>
              <li>Payment processors (Stripe)</li>
              <li>Email services (Resend)</li>
              <li>Analytics providers (Vercel Analytics)</li>
              <li>Authentication services (Clerk)</li>
            </ul>
            <p>
              These providers are contractually obligated to protect your data and use it only for providing services
              to us.
            </p>

            <h3>5.2 CMS Platform Integrations</h3>
            <p>
              When you connect your CMS (Shopify, WordPress), we access your platform using OAuth or API credentials.
              We only request the minimum permissions necessary to provide SEO optimization services.
            </p>

            <h3>5.3 Legal Requirements</h3>
            <p>
              We may disclose your information if required by law or in response to valid legal requests:
            </p>
            <ul>
              <li>Compliance with legal obligations</li>
              <li>Protection of our rights and property</li>
              <li>Prevention of fraud or illegal activity</li>
              <li>Response to court orders or subpoenas</li>
            </ul>

            <h2>6. Your Rights and Choices</h2>
            <h3>6.1 Access and Update</h3>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Update or correct inaccurate data</li>
              <li>Export your data</li>
              <li>Request data deletion</li>
            </ul>

            <h3>6.2 Opt-Out Options</h3>
            <p>
              You can opt out of:
            </p>
            <ul>
              <li>Marketing emails (unsubscribe link in emails)</li>
              <li>Daily automation reports</li>
              <li>Dashboard notifications</li>
              <li>Analytics tracking (through browser settings)</li>
            </ul>

            <h3>6.3 Account Deletion</h3>
            <p>
              You may delete your account at any time through your account settings. Upon deletion, we will:
            </p>
            <ul>
              <li>Remove your personal information within 30 days</li>
              <li>Retain billing records for legal compliance</li>
              <li>Anonymize usage data for analytics</li>
            </ul>

            <h2>7. International Data Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries outside your country of residence. We ensure
              that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal
              information from children. If you believe we have collected data from a child, please contact us
              immediately.
            </p>

            <h2>9. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act:
            </p>
            <ul>
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or shared</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to deletion of personal information</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>
            <p>
              Note: We do not sell your personal information.
            </p>

            <h2>10. GDPR Compliance (EU Users)</h2>
            <p>
              If you are in the European Economic Area, you have rights under the General Data Protection Regulation:
            </p>
            <ul>
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes via
              email or through the Service. Your continued use of the Service after changes constitutes acceptance
              of the updated policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:
            </p>
            <p>
              Email: <a href="mailto:privacy@seology.ai" className="text-blue-600 hover:text-blue-700">privacy@seology.ai</a><br />
              Support: <Link href="/about" className="text-blue-600 hover:text-blue-700">Contact Support</Link><br />
              Data Protection Officer: <a href="mailto:dpo@seology.ai" className="text-blue-600 hover:text-blue-700">dpo@seology.ai</a>
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <motion.h2
            className="text-3xl font-bold mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Your Privacy Matters
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            We're committed to protecting your data with industry-leading security
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Contact Privacy Team
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Terms of Service
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
