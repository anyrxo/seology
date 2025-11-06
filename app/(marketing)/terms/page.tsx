'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Download, ChevronRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('agreement')
  const [showMobileToc, setShowMobileToc] = useState(false)

  const sections = [
    { id: 'agreement', title: '1. Agreement to Terms', number: '1' },
    { id: 'description', title: '2. Description of Service', number: '2' },
    { id: 'accounts', title: '3. User Accounts', number: '3' },
    { id: 'billing', title: '4. Subscription Plans and Billing', number: '4' },
    { id: 'acceptable-use', title: '5. Acceptable Use', number: '5' },
    { id: 'content', title: '6. Content and Data', number: '6' },
    { id: 'availability', title: '7. Service Availability', number: '7' },
    { id: 'ip', title: '8. Intellectual Property', number: '8' },
    { id: 'third-party', title: '9. Third-Party Services', number: '9' },
    { id: 'liability', title: '10. Limitation of Liability', number: '10' },
    { id: 'warranty', title: '11. Warranty Disclaimer', number: '11' },
    { id: 'termination', title: '12. Termination', number: '12' },
    { id: 'changes', title: '13. Changes to Terms', number: '13' },
    { id: 'governing-law', title: '14. Governing Law', number: '14' },
    { id: 'contact', title: '15. Contact Information', number: '15' },
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
          className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
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

            <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors border border-blue-500/20">
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
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
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
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
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
                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <FileText className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Terms of Service</h1>
                  <p className="text-slate-400">Last updated: January 15, 2025</p>
                </div>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                Please read these Terms of Service carefully before using SEOLOGY.AI. By accessing or using our Service, you agree to be bound by these terms.
              </p>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-8">
              <Section id="agreement" number="1" title="Agreement to Terms">
                <p>
                  By accessing or using SEOLOGY.AI ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 18 years old and have the legal capacity to enter into these Terms.
                </p>
              </Section>

              <Section id="description" number="2" title="Description of Service">
                <p>
                  SEOLOGY.AI is an AI-powered SEO automation platform that analyzes, identifies, and automatically fixes SEO issues on your websites. The Service includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Automated SEO analysis and website scanning</li>
                  <li>AI-powered issue detection and prioritization using Claude AI</li>
                  <li>Automatic application of SEO fixes to your websites</li>
                  <li>Integration with CMS platforms (Shopify, WordPress, custom sites via Magic.js)</li>
                  <li>Comprehensive reporting and analytics dashboards</li>
                  <li>Rollback capabilities for applied fixes (90-day window)</li>
                  <li>API access for programmatic integration</li>
                </ul>
                <p className="mt-4">
                  The Service is provided as a Software-as-a-Service (SaaS) platform accessible via web browsers and API endpoints.
                </p>
              </Section>

              <Section id="accounts" number="3" title="User Accounts">
                <h3 className="text-xl font-bold text-white mb-3">3.1 Registration</h3>
                <p>
                  To use the Service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your information to keep it accurate and current</li>
                  <li>Not impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Not use the account of another user without permission</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">3.2 Account Security</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Use a strong, unique password</li>
                  <li>Enable multi-factor authentication when available</li>
                  <li>Immediately notify us of any unauthorized use of your account</li>
                  <li>Log out of your account at the end of each session</li>
                </ul>
                <p className="mt-4">
                  We will not be liable for any loss or damage arising from your failure to comply with these security obligations.
                </p>
              </Section>

              <Section id="billing" number="4" title="Subscription Plans and Billing">
                <h3 className="text-xl font-bold text-white mb-3">4.1 Plans and Pricing</h3>
                <p>
                  SEOLOGY.AI offers multiple subscription tiers with varying features and limits:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li><strong>Starter:</strong> 3 sites, 500 fixes/month</li>
                  <li><strong>Growth:</strong> 10 sites, 5,000 fixes/month</li>
                  <li><strong>Scale:</strong> Unlimited sites and fixes</li>
                </ul>
                <p className="mt-4">
                  Current pricing is available on our <Link href="/pricing" className="text-blue-400 hover:text-blue-300 underline">pricing page</Link> and may be changed with 30 days notice.
                </p>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">4.2 Billing Cycle</h3>
                <p>
                  Subscription fees are billed in advance on a monthly or annual basis, depending on your selected plan. You authorize us to charge your payment method for all fees incurred.
                </p>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">4.3 Refund Policy</h3>
                <p>
                  All fees are non-refundable except as required by law or as explicitly stated in these Terms. We do not provide refunds or credits for partial months of service or unused fixes.
                </p>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">4.4 Usage Limits</h3>
                <p>
                  Each plan has specified limits on the number of sites, fixes per month, and other features. Exceeding these limits may result in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Service interruption until you upgrade your plan</li>
                  <li>Automatic upgrade to the next tier (with notification)</li>
                  <li>Overage charges as specified in your plan</li>
                </ul>
              </Section>

              <Section id="acceptable-use" number="5" title="Acceptable Use">
                <p>
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights of others</li>
                  <li>Distribute malware, viruses, or other harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use the Service for websites you don't own or have authorization to modify</li>
                  <li>Reverse engineer, decompile, or attempt to extract the source code of the Service</li>
                  <li>Engage in web scraping or data mining without permission</li>
                  <li>Use the Service to send spam or unsolicited communications</li>
                  <li>Bypass any rate limiting or access controls</li>
                </ul>
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-300">
                    <strong>Violation Notice:</strong> Violations of this Acceptable Use policy may result in immediate account suspension or termination without refund.
                  </p>
                </div>
              </Section>

              <Section id="content" number="6" title="Content and Data">
                <h3 className="text-xl font-bold text-white mb-3">6.1 Your Content</h3>
                <p>
                  You retain all rights to your website content and data. By using the Service, you grant us a limited, non-exclusive license to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Access, analyze, and process your website content</li>
                  <li>Modify your website content solely for providing SEO optimization services</li>
                  <li>Store snapshots of changes for rollback purposes</li>
                  <li>Use aggregated, anonymized data for analytics and service improvement</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">6.2 Backups and Rollbacks</h3>
                <p>
                  We maintain snapshots of changes made by the Service for 90 days to enable rollback functionality. While we strive to ensure all changes are beneficial and reversible:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>You are responsible for maintaining your own backups of your website content</li>
                  <li>We do not guarantee the availability or completeness of rollback data</li>
                  <li>Rollback may not be possible in all circumstances</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">6.3 User Responsibility</h3>
                <p>
                  You are solely responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>The accuracy and legality of your website content</li>
                  <li>Obtaining necessary rights and licenses for your content</li>
                  <li>Compliance with all applicable laws regarding your content</li>
                  <li>Reviewing and approving changes made by the Service (in non-automatic modes)</li>
                </ul>
              </Section>

              <Section id="availability" number="7" title="Service Availability">
                <p>
                  We strive to provide 99.9% uptime but do not guarantee uninterrupted access to the Service. We may suspend or limit access for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Scheduled maintenance (with advance notice when possible)</li>
                  <li>Emergency maintenance and security updates</li>
                  <li>Technical difficulties or infrastructure issues</li>
                  <li>Compliance with legal requirements</li>
                  <li>Protection of the Service or other users</li>
                </ul>
                <p className="mt-4">
                  We will make reasonable efforts to notify you of planned downtime via email or dashboard notifications.
                </p>
              </Section>

              <Section id="ip" number="8" title="Intellectual Property">
                <p>
                  The Service, including all software, algorithms, design, documentation, and related materials, is owned by SEOLOGY.AI and protected by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Copyright laws</li>
                  <li>Trademark laws</li>
                  <li>Trade secret laws</li>
                  <li>Other intellectual property laws</li>
                </ul>
                <p className="mt-4">
                  You may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Copy, modify, or distribute any part of the Service without our express written permission</li>
                  <li>Remove or alter any proprietary notices</li>
                  <li>Use our trademarks or branding without authorization</li>
                  <li>Create derivative works based on the Service</li>
                </ul>
              </Section>

              <Section id="third-party" number="9" title="Third-Party Services">
                <p>
                  The Service integrates with third-party platforms and services (Shopify, WordPress, Stripe, Clerk, Anthropic, etc.). Your use of these integrations is subject to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>The respective third-party terms of service</li>
                  <li>Third-party privacy policies</li>
                  <li>OAuth authorization scopes and permissions</li>
                </ul>
                <p className="mt-4">
                  We are not responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Third-party services or their availability</li>
                  <li>Changes to third-party APIs or features</li>
                  <li>Third-party service outages or errors</li>
                  <li>Third-party data practices</li>
                </ul>
              </Section>

              <Section id="liability" number="10" title="Limitation of Liability">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mb-4">
                  <p className="text-yellow-300 font-semibold uppercase text-sm mb-2">Important Legal Notice</p>
                  <p className="text-yellow-200 text-sm">
                    Please read this section carefully as it limits our liability to you.
                  </p>
                </div>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SEOLOGY.AI, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                  <li>LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY</li>
                  <li>LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES</li>
                  <li>DAMAGES RESULTING FROM UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS</li>
                  <li>ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF ANY CONTENT</li>
                </ul>
                <p className="mt-4">
                  OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
                </p>
              </Section>

              <Section id="warranty" number="11" title="Warranty Disclaimer">
                <p className="uppercase font-semibold mb-4">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                </p>
                <p>
                  WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>MERCHANTABILITY</li>
                  <li>FITNESS FOR A PARTICULAR PURPOSE</li>
                  <li>NON-INFRINGEMENT</li>
                  <li>ACCURACY, RELIABILITY, OR COMPLETENESS OF CONTENT</li>
                  <li>UNINTERRUPTED, SECURE, OR ERROR-FREE OPERATION</li>
                </ul>
                <p className="mt-4">
                  WE DO NOT WARRANT THAT:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>The Service will meet your specific requirements</li>
                  <li>The Service will be available at any particular time or location</li>
                  <li>Any defects or errors will be corrected</li>
                  <li>The Service is free of viruses or other harmful components</li>
                </ul>
              </Section>

              <Section id="termination" number="12" title="Termination">
                <h3 className="text-xl font-bold text-white mb-3">12.1 Termination by You</h3>
                <p>
                  You may cancel your subscription at any time through your account settings. Cancellation will be effective at the end of your current billing period. You will continue to have access to the Service until the end of the paid period.
                </p>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">12.2 Termination by Us</h3>
                <p>
                  We may suspend or terminate your account immediately if:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>You violate these Terms</li>
                  <li>You fail to pay fees when due</li>
                  <li>Your use of the Service poses a security or legal risk</li>
                  <li>We are required to do so by law</li>
                  <li>We decide to discontinue the Service (with 30 days notice)</li>
                </ul>

                <h3 className="text-xl font-bold text-white mb-3 mt-6">12.3 Effect of Termination</h3>
                <p>
                  Upon termination:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Your right to use the Service will immediately cease</li>
                  <li>We will revoke all CMS integrations and API access</li>
                  <li>Your data will be deleted according to our Privacy Policy</li>
                  <li>You will not receive a refund for any prepaid fees</li>
                  <li>Sections of these Terms that by their nature should survive will remain in effect</li>
                </ul>
              </Section>

              <Section id="changes" number="13" title="Changes to Terms">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of material changes via:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Email notification to your registered email address</li>
                  <li>Prominent notice on our Service dashboard</li>
                  <li>In-app notifications</li>
                </ul>
                <p className="mt-4">
                  Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the changes, you must cancel your account.
                </p>
                <p className="mt-4">
                  The "Last updated" date at the top of this page indicates when the most recent changes were made.
                </p>
              </Section>

              <Section id="governing-law" number="14" title="Governing Law">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California and the United States, without regard to its conflict of law provisions.
                </p>
                <p className="mt-4">
                  Any disputes arising from or related to these Terms or the Service shall be resolved through:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Good faith negotiations between the parties</li>
                  <li>Binding arbitration in San Francisco, California (if negotiations fail)</li>
                  <li>The exclusive jurisdiction of state and federal courts in San Francisco, California (for matters not subject to arbitration)</li>
                </ul>
                <p className="mt-4">
                  You waive any right to a jury trial or to participate in a class action lawsuit.
                </p>
              </Section>

              <Section id="contact" number="15" title="Contact Information">
                <p className="mb-6">
                  If you have any questions about these Terms, please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Legal Inquiries</h4>
                    <a href="mailto:legal@seology.ai" className="text-blue-400 hover:text-blue-300 underline">
                      legal@seology.ai
                    </a>
                  </div>

                  <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
                    <h4 className="text-white font-bold mb-2">General Support</h4>
                    <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                      Contact Support
                    </Link>
                  </div>

                  <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl md:col-span-2">
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
              className="mt-12 p-8 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Related Policies</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { href: '/privacy', label: 'Privacy Policy' },
                  { href: '/cookies', label: 'Cookie Policy' },
                  { href: '/security', label: 'Security' },
                  { href: '/compliance', label: 'Compliance' },
                  { href: '/api', label: 'API Documentation' },
                  { href: '/contact', label: 'Contact Us' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-4 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800 hover:border-blue-500/30 rounded-xl transition-all group"
                  >
                    <span className="text-slate-300 group-hover:text-blue-400 transition-colors flex items-center gap-2">
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
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
          <span className="text-blue-400 font-bold">{number}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">{title}</h2>
      </div>
      <div className="ml-14 space-y-4 text-slate-300 leading-relaxed">
        {children}
      </div>
    </motion.section>
  )
}
