'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Download, ChevronRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>('introduction')
  const [showMobileToc, setShowMobileToc] = useState(false)

  const sections = [
    { id: 'introduction', title: '1. Introduction', number: '1' },
    { id: 'information-collected', title: '2. Information We Collect', number: '2' },
    { id: 'how-we-use', title: '3. How We Use Your Information', number: '3' },
    { id: 'data-storage', title: '4. Data Storage and Security', number: '4' },
    { id: 'data-sharing', title: '5. Data Sharing and Disclosure', number: '5' },
    { id: 'your-rights', title: '6. Your Rights and Choices', number: '6' },
    { id: 'international', title: '7. International Data Transfers', number: '7' },
    { id: 'children', title: '8. Children\'s Privacy', number: '8' },
    { id: 'ccpa', title: '9. California Privacy Rights (CCPA)', number: '9' },
    { id: 'gdpr', title: '10. GDPR Compliance (EU Users)', number: '10' },
    { id: 'changes', title: '11. Changes to This Policy', number: '11' },
    { id: 'contact', title: '12. Contact Us', number: '12' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setShowMobileToc(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Sticky Header */}
      <motion.div
        className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <button
              onClick={() => setShowMobileToc(!showMobileToc)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {showMobileToc ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors border border-emerald-500/20">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile TOC Overlay */}
      <AnimatePresence>
        {showMobileToc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-6 pt-20">
              <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop TOC Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <motion.div
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Table of Contents</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 group ${
                        activeSection === section.id
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        activeSection === section.id ? 'translate-x-1' : ''
                      }`} />
                      <span className="flex-1">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="relative">
            {/* Hero Section */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <Shield className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Privacy Policy</h1>
                  <p className="text-slate-400">Last updated: January 15, 2025</p>
                </div>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                At SEOLOGY.AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-8">
              <Section id="introduction" number="1" title="Introduction">
                <p>
                  SEOLOGY.AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered SEO automation platform ("Service").
                </p>
                <p>
                  By accessing or using our Service, you agree to the terms outlined in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
                </p>
              </Section>

              <Section id="information-collected" number="2" title="Information We Collect">
                <h3 className="text-xl font-bold text-white mb-3">2.1 Account Information</h3>
                <p>When you register for an account, we collect:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Name and email address</li>
                  <li>Company name and business information</li>
                  <li>Billing and payment information (processed securely via Stripe)</li>
                  <li>Account preferences and settings</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">2.2 Website Data</h3>
                <p>When you connect your website(s) to our Service, we collect:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Website URLs and domain information</li>
                  <li>HTML content, meta tags, and page structure</li>
                  <li>Images and media files for optimization analysis</li>
                  <li>CMS credentials (encrypted and stored securely)</li>
                  <li>Analytics and performance metrics</li>
                  <li>SEO-related data (titles, descriptions, headings, etc.)</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">2.3 Usage Information</h3>
                <p>We automatically collect information about how you use the Service:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Log data (IP addresses, browser type, operating system)</li>
                  <li>Pages visited and actions taken within the Service</li>
                  <li>Time and date of access</li>
                  <li>API usage and integration activity</li>
                  <li>Feature usage patterns</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">2.4 Cookies and Tracking Technologies</h3>
                <p>We use cookies and similar tracking technologies to:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Maintain your session and preferences</li>
                  <li>Analyze Service usage and performance</li>
                  <li>Provide personalized experiences</li>
                  <li>Detect and prevent fraud</li>
                </ul>
                <p className="mt-4">
                  For more information, please see our <Link href="/cookies" className="text-emerald-400 hover:text-emerald-300 underline">Cookie Policy</Link>.
                </p>
              </Section>

              <Section id="how-we-use" number="3" title="How We Use Your Information">
                <p>We use the collected information to:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Provide and maintain the Service</li>
                  <li>Analyze and optimize your website's SEO performance</li>
                  <li>Apply automated fixes to your websites</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send service updates, notifications, and important announcements</li>
                  <li>Respond to support requests and customer inquiries</li>
                  <li>Improve and develop new features</li>
                  <li>Conduct analytics and research</li>
                  <li>Detect, prevent, and address fraud or security issues</li>
                  <li>Comply with legal obligations and regulations</li>
                </ul>
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <p className="text-blue-300">
                    <strong>AI Processing:</strong> We use Claude AI (Anthropic) to analyze your website content and generate SEO recommendations. This processing is done securely and in accordance with our data protection standards.
                  </p>
                </div>
              </Section>

              <Section id="data-storage" number="4" title="Data Storage and Security">
                <h3 className="text-xl font-bold text-white mb-3">4.1 Security Measures</h3>
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Encryption of data in transit using TLS/SSL (HTTPS)</li>
                  <li>Encryption of sensitive data at rest (AES-256)</li>
                  <li>Secure credential storage with encryption</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Multi-factor authentication support</li>
                  <li>Access controls and role-based permissions</li>
                  <li>Regular backups and disaster recovery procedures</li>
                  <li>Security monitoring and incident response</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">4.2 Data Retention</h3>
                <p>We retain your data for as long as your account is active or as needed to provide services. Specific retention periods:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Account data:</strong> Retained until account deletion + 30 days</li>
                  <li><strong>Website snapshots:</strong> 90 days for rollback capability</li>
                  <li><strong>Analytics data:</strong> 2 years</li>
                  <li><strong>Audit logs:</strong> 1 year</li>
                  <li><strong>Billing records:</strong> 7 years (legal requirement)</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">4.3 Data Location</h3>
                <p>
                  Your data is primarily stored in secure data centers located in the United States. We use trusted cloud infrastructure providers including Vercel and PostgreSQL-compatible databases with enterprise-grade security.
                </p>
              </Section>

              <Section id="data-sharing" number="5" title="Data Sharing and Disclosure">
                <h3 className="text-xl font-bold text-white mb-3">5.1 Third-Party Services</h3>
                <p>We may share data with trusted third-party service providers who assist in operating our Service:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Cloud hosting:</strong> Vercel, AWS</li>
                  <li><strong>Database services:</strong> PostgreSQL-compatible databases</li>
                  <li><strong>Payment processing:</strong> Stripe</li>
                  <li><strong>Email services:</strong> Resend</li>
                  <li><strong>Analytics:</strong> Vercel Analytics</li>
                  <li><strong>Authentication:</strong> Clerk</li>
                  <li><strong>AI services:</strong> Anthropic (Claude AI)</li>
                </ul>
                <p className="mt-4">
                  These providers are contractually obligated to protect your data and use it only for providing services to us.
                </p>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">5.2 CMS Platform Integrations</h3>
                <p>
                  When you connect your CMS (Shopify, WordPress), we access your platform using OAuth or API credentials. We only request the minimum permissions necessary to provide SEO optimization services. We do not sell or share your CMS data with third parties.
                </p>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">5.3 Legal Requirements</h3>
                <p>We may disclose your information if required by law or in response to valid legal requests:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Compliance with legal obligations and regulations</li>
                  <li>Protection of our rights, property, and safety</li>
                  <li>Prevention of fraud or illegal activity</li>
                  <li>Response to court orders, subpoenas, or government requests</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">5.4 Business Transfers</h3>
                <p>
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you via email and/or prominent notice on our Service of any such change in ownership.
                </p>
              </Section>

              <Section id="your-rights" number="6" title="Your Rights and Choices">
                <h3 className="text-xl font-bold text-white mb-3">6.1 Access and Update</h3>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Access your personal information</li>
                  <li>Update or correct inaccurate data</li>
                  <li>Export your data in a portable format</li>
                  <li>Request data deletion (subject to legal retention requirements)</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">6.2 Communication Preferences</h3>
                <p>You can opt out of:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Marketing emails (via unsubscribe link in emails)</li>
                  <li>Daily automation reports</li>
                  <li>Dashboard notifications</li>
                  <li>Non-essential communications</li>
                </ul>
                <p className="mt-4">
                  Note: You cannot opt out of essential service communications (e.g., security alerts, billing notifications).
                </p>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">6.3 Account Deletion</h3>
                <p>You may delete your account at any time through your account settings. Upon deletion, we will:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Remove your personal information within 30 days</li>
                  <li>Delete your website data and snapshots</li>
                  <li>Revoke all CMS integrations and access</li>
                  <li>Retain billing records for legal compliance (7 years)</li>
                  <li>Anonymize usage data for analytics</li>
                </ul>
              </Section>

              <Section id="international" number="7" title="International Data Transfers">
                <p>
                  Your data may be transferred to and processed in countries outside your country of residence, including the United States. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable data protection laws.
                </p>
                <p className="mt-4">
                  For EU users, we comply with GDPR requirements for international data transfers, including the use of Standard Contractual Clauses (SCCs) where applicable.
                </p>
              </Section>

              <Section id="children" number="8" title="Children's Privacy">
                <p>
                  Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe we have collected data from a child, please contact us immediately at <a href="mailto:privacy@seology.ai" className="text-emerald-400 hover:text-emerald-300 underline">privacy@seology.ai</a>, and we will take steps to delete such information.
                </p>
              </Section>

              <Section id="ccpa" number="9" title="California Privacy Rights (CCPA)">
                <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Right to know:</strong> What personal information is collected, used, shared, or sold</li>
                  <li><strong>Right to delete:</strong> Request deletion of personal information</li>
                  <li><strong>Right to opt-out:</strong> Opt-out of the sale of personal information</li>
                  <li><strong>Right to non-discrimination:</strong> Not be discriminated against for exercising your rights</li>
                </ul>
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-emerald-300">
                    <strong>Important:</strong> We do not sell your personal information to third parties.
                  </p>
                </div>
                <p className="mt-4">
                  To exercise your CCPA rights, contact us at <a href="mailto:privacy@seology.ai" className="text-emerald-400 hover:text-emerald-300 underline">privacy@seology.ai</a>.
                </p>
              </Section>

              <Section id="gdpr" number="10" title="GDPR Compliance (EU Users)">
                <p>If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Right of access:</strong> Obtain confirmation and access to your personal data</li>
                  <li><strong>Right to rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to erasure:</strong> "Right to be forgotten" under certain circumstances</li>
                  <li><strong>Right to restrict processing:</strong> Limit how we process your data</li>
                  <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Right to object:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="mt-4">
                  <strong>Legal Basis for Processing:</strong> We process your data based on:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4 mt-2">
                  <li>Contractual necessity (to provide our Service)</li>
                  <li>Legitimate interests (to improve and secure our Service)</li>
                  <li>Legal obligations (compliance with laws)</li>
                  <li>Your consent (where applicable)</li>
                </ul>
                <p className="mt-4">
                  To exercise your GDPR rights, contact our Data Protection Officer at <a href="mailto:dpo@seology.ai" className="text-emerald-400 hover:text-emerald-300 underline">dpo@seology.ai</a>.
                </p>
              </Section>

              <Section id="changes" number="11" title="Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes via:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Email notification to your registered email address</li>
                  <li>Prominent notice on our Service dashboard</li>
                  <li>In-app notifications</li>
                </ul>
                <p className="mt-4">
                  Your continued use of the Service after changes become effective constitutes acceptance of the updated Privacy Policy. The "Last updated" date at the top of this page indicates when the most recent changes were made.
                </p>
              </Section>

              <Section id="contact" number="12" title="Contact Us">
                <p className="mb-6">
                  If you have questions about this Privacy Policy, wish to exercise your data rights, or have privacy concerns, please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
                    <h4 className="text-white font-bold mb-2">General Privacy Inquiries</h4>
                    <a href="mailto:privacy@seology.ai" className="text-emerald-400 hover:text-emerald-300 underline">
                      privacy@seology.ai
                    </a>
                  </div>

                  <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Data Protection Officer</h4>
                    <a href="mailto:dpo@seology.ai" className="text-emerald-400 hover:text-emerald-300 underline">
                      dpo@seology.ai
                    </a>
                  </div>

                  <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Support Center</h4>
                    <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">
                      Contact Support
                    </Link>
                  </div>

                  <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Mailing Address</h4>
                    <p className="text-slate-300 text-sm">
                      SEOLOGY.AI<br />
                      123 SEO Street<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>
              </Section>
            </div>

            {/* Related Links */}
            <motion.div
              className="mt-12 p-8 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Related Policies</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { href: '/terms', label: 'Terms of Service' },
                  { href: '/cookies', label: 'Cookie Policy' },
                  { href: '/security', label: 'Security' },
                  { href: '/compliance', label: 'Compliance' },
                  { href: '/api', label: 'API Documentation' },
                  { href: '/contact', label: 'Contact Us' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-4 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800 hover:border-emerald-500/30 rounded-xl transition-all group"
                  >
                    <span className="text-slate-300 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      {link.label}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

function Section({
  id,
  number,
  title,
  children
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24 p-8 bg-slate-900/30 backdrop-blur-xl border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
          <span className="text-emerald-400 font-bold">{number}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">{title}</h2>
      </div>
      <div className="ml-14 space-y-4 text-slate-300 leading-relaxed">
        {children}
      </div>
    </motion.section>
  )
}
