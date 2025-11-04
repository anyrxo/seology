'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsPage() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)

  const sections = [
    { title: "1. Agreement to Terms", id: "section-1" },
    { title: "2. Description of Service", id: "section-2" },
    { title: "3. User Accounts", id: "section-3" },
    { title: "4. Subscription Plans and Billing", id: "section-4" },
    { title: "5. Acceptable Use", id: "section-5" },
    { title: "6. Content and Data", id: "section-6" },
    { title: "7. Service Availability", id: "section-7" },
    { title: "8. Intellectual Property", id: "section-8" },
    { title: "9. Third-Party Services", id: "section-9" },
    { title: "10. Limitation of Liability", id: "section-10" },
    { title: "11. Warranty Disclaimer", id: "section-11" },
    { title: "12. Termination", id: "section-12" },
    { title: "13. Changes to Terms", id: "section-13" },
    { title: "14. Governing Law", id: "section-14" },
    { title: "15. Contact Information", id: "section-15" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
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
              className="p-3 bg-blue-100 rounded-xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FileText className="w-8 h-8 text-blue-600" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
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
              className="absolute w-1.5 h-1.5 bg-blue-500/10 rounded-full"
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
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using SEOLOGY.AI ("Service"), you agree to be bound by these Terms of Service ("Terms").
              If you disagree with any part of the terms, you may not access the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              SEOLOGY.AI is an AI-powered SEO automation platform that analyzes, identifies, and automatically fixes
              SEO issues on your websites. The Service includes:
            </p>
            <ul>
              <li>Automated SEO analysis and scanning</li>
              <li>AI-powered issue detection and prioritization</li>
              <li>Automatic application of SEO fixes</li>
              <li>Integration with CMS platforms (Shopify, WordPress, custom sites)</li>
              <li>Reporting and analytics</li>
              <li>Rollback capabilities for applied fixes</li>
            </ul>

            <h2>3. User Accounts</h2>
            <h3>3.1 Registration</h3>
            <p>
              To use the Service, you must register for an account. You agree to provide accurate, current, and complete
              information during registration and to update such information to keep it accurate, current, and complete.
            </p>

            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You agree to immediately notify us of any unauthorized use of your account.
            </p>

            <h2>4. Subscription Plans and Billing</h2>
            <h3>4.1 Plans</h3>
            <p>
              SEOLOGY.AI offers multiple subscription tiers (Starter, Growth, Scale) with varying features and limits.
              Current pricing is available on our pricing page.
            </p>

            <h3>4.2 Billing</h3>
            <p>
              Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except
              as required by law. You authorize us to charge your payment method for all fees incurred.
            </p>

            <h3>4.3 Usage Limits</h3>
            <p>
              Each plan has specified limits on the number of sites, fixes per month, and other features. Exceeding
              these limits may result in service interruption until you upgrade your plan.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use the Service for websites you don't own or have authorization to modify</li>
              <li>Reverse engineer or attempt to extract the source code of the Service</li>
            </ul>

            <h2>6. Content and Data</h2>
            <h3>6.1 Your Content</h3>
            <p>
              You retain all rights to your website content. By using the Service, you grant us permission to access,
              analyze, and modify your website content solely for the purpose of providing SEO optimization services.
            </p>

            <h3>6.2 Backups and Rollbacks</h3>
            <p>
              We maintain snapshots of changes made by the Service for 90 days. While we strive to ensure all changes
              are beneficial, you are responsible for maintaining your own backups of your website content.
            </p>

            <h2>7. Service Availability</h2>
            <p>
              We strive to provide 99.9% uptime but do not guarantee uninterrupted access to the Service. We may
              suspend or terminate the Service for maintenance, updates, or other technical reasons.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The Service, including all software, algorithms, and documentation, is owned by SEOLOGY.AI and protected
              by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute
              any part of the Service without our express written permission.
            </p>

            <h2>9. Third-Party Services</h2>
            <p>
              The Service integrates with third-party platforms (Shopify, WordPress, etc.). Your use of these
              integrations is subject to the respective third-party terms of service. We are not responsible for
              third-party services or their availability.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SEOLOGY.AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>

            <h2>11. Warranty Disclaimer</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
              BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h2>12. Termination</h2>
            <h3>12.1 By You</h3>
            <p>
              You may cancel your subscription at any time through your account settings. Cancellation will be
              effective at the end of your current billing period.
            </p>

            <h3>12.2 By Us</h3>
            <p>
              We may suspend or terminate your account if you violate these Terms, fail to pay fees, or for any
              other reason at our sole discretion. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes via
              email or through the Service. Your continued use of the Service after changes constitutes acceptance
              of the modified Terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States,
              without regard to its conflict of law provisions.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:legal@seology.ai" className="text-blue-600 hover:text-blue-700">legal@seology.ai</a><br />
              Support: <Link href="/about" className="text-blue-600 hover:text-blue-700">Contact Support</Link>
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white relative overflow-hidden"
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
            Have Questions?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Our legal team is here to help clarify any concerns
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Contact Legal Team
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Privacy Policy
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
