import { Metadata } from 'next'
import { Shield, CheckCircle, FileText, Users, Lock, Globe, Mail, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GDPR Compliance - SEOLOGY.AI',
  description: 'SEOLOGY.AI is fully compliant with the EU General Data Protection Regulation (GDPR). Learn about our data processing practices.',
}

export default function GDPRPage() {
  const gdprPrinciples = [
    {
      title: 'Lawfulness, Fairness, and Transparency',
      description: 'We process data lawfully, fairly, and transparently. You always know what data we collect and why.',
    },
    {
      title: 'Purpose Limitation',
      description: 'We only collect data for specified, explicit, and legitimate purposes.',
    },
    {
      title: 'Data Minimization',
      description: 'We only collect data that is necessary for the purposes we\'ve specified.',
    },
    {
      title: 'Accuracy',
      description: 'We keep personal data accurate and up to date, with mechanisms for correction.',
    },
    {
      title: 'Storage Limitation',
      description: 'We keep personal data only as long as necessary for the purposes specified.',
    },
    {
      title: 'Integrity and Confidentiality',
      description: 'We implement appropriate security measures to protect personal data.',
    },
  ]

  const yourRights = [
    {
      icon: FileText,
      title: 'Right of Access',
      description: 'You have the right to obtain confirmation that we process your data and request a copy of it.',
      howToExercise: 'Email privacy@seology.ai with "Access Request" in the subject line.',
    },
    {
      icon: CheckCircle,
      title: 'Right to Rectification',
      description: 'You can request correction of inaccurate or incomplete personal data.',
      howToExercise: 'Update your data in your account settings or contact privacy@seology.ai.',
    },
    {
      icon: Users,
      title: 'Right to Erasure',
      description: 'You can request deletion of your personal data (subject to legal obligations).',
      howToExercise: 'Email privacy@seology.ai with "Deletion Request" in the subject line.',
    },
    {
      icon: Lock,
      title: 'Right to Restrict Processing',
      description: 'You can request temporary restriction of data processing under certain conditions.',
      howToExercise: 'Email privacy@seology.ai specifying which processing you want restricted.',
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      description: 'You can receive your data in a structured, machine-readable format.',
      howToExercise: 'Export your data from your account settings or request it via email.',
    },
    {
      icon: Shield,
      title: 'Right to Object',
      description: 'You can object to processing based on legitimate interests or for direct marketing.',
      howToExercise: 'Email privacy@seology.ai with your objection and reasoning.',
    },
  ]

  const dataProcessing = [
    {
      category: 'Account Information',
      data: 'Name, email, company name',
      purpose: 'User authentication and account management',
      legalBasis: 'Contract performance',
      retention: 'Duration of account + 2 years',
    },
    {
      category: 'Payment Information',
      data: 'Billing address, payment method (via Stripe)',
      purpose: 'Payment processing and invoicing',
      legalBasis: 'Contract performance',
      retention: '7 years (legal requirement)',
    },
    {
      category: 'Site Data',
      data: 'Website URLs, content, SEO issues',
      purpose: 'SEO analysis and fix execution',
      legalBasis: 'Contract performance',
      retention: 'Duration of service + 90 days',
    },
    {
      category: 'Usage Data',
      data: 'Feature usage, API calls, fix history',
      purpose: 'Service improvement and support',
      legalBasis: 'Legitimate interest',
      retention: '2 years',
    },
    {
      category: 'Support Data',
      data: 'Support tickets, communications',
      purpose: 'Customer support and service improvement',
      legalBasis: 'Legitimate interest',
      retention: '3 years',
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            GDPR Compliance
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EU Data Protection Compliance
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            SEOLOGY.AI is fully compliant with the General Data Protection Regulation (GDPR). We respect your privacy rights
            and process data transparently.
          </p>
        </div>

        {/* GDPR Principles */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commitment to GDPR Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gdprPrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold">{principle.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rights */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Your GDPR Rights</h2>
          <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto">
            Under GDPR, you have comprehensive rights over your personal data. Here\'s how to exercise them:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {yourRights.map((right, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <right.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{right.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{right.description}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs text-slate-500 mb-1">How to Exercise:</div>
                  <div className="text-sm text-slate-300">{right.howToExercise}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Processing Table */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">What Data We Process</h2>
          <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto">
            Complete transparency about the personal data we collect, why we collect it, and how long we keep it:
          </p>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-500/10 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-sm font-bold">Category</th>
                    <th className="text-left p-4 text-sm font-bold">Data Collected</th>
                    <th className="text-left p-4 text-sm font-bold">Purpose</th>
                    <th className="text-left p-4 text-sm font-bold">Legal Basis</th>
                    <th className="text-left p-4 text-sm font-bold">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProcessing.map((item, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium">{item.category}</td>
                      <td className="p-4 text-slate-400 text-sm">{item.data}</td>
                      <td className="p-4 text-slate-400 text-sm">{item.purpose}</td>
                      <td className="p-4 text-slate-400 text-sm">{item.legalBasis}</td>
                      <td className="p-4 text-slate-400 text-sm">{item.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Data Transfers */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">International Data Transfers</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-400" />
                  EU Data Residency
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  For EU customers, we offer data residency within the European Union. Your data is stored on servers
                  located in EU data centers and is not transferred outside the EU unless explicitly authorized by you.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold mb-3">Standard Contractual Clauses</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  When data transfers outside the EU are necessary (e.g., for certain cloud services), we use Standard
                  Contractual Clauses (SCCs) approved by the European Commission to ensure adequate protection.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold mb-3">Third-Party Processors</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We carefully vet all third-party processors to ensure GDPR compliance. A complete list of sub-processors
                  and their locations is available upon request.
                </p>
                <a
                  href="mailto:privacy@seology.ai"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Request Sub-Processor List
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection Officer */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Data Protection Officer</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3">Contact Our DPO</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Our Data Protection Officer is responsible for ensuring GDPR compliance and handling data protection
                  inquiries. You can contact the DPO for:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Questions about data processing',
                    'Exercising your GDPR rights',
                    'Data protection concerns',
                    'Privacy policy questions',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-400 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:privacy@seology.ai"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    privacy@seology.ai
                  </a>
                  <span className="inline-flex items-center justify-center text-slate-400 text-sm">
                    Response time: Within 30 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supervisory Authority */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Right to Lodge a Complaint</h2>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-8">
            <p className="text-slate-300 leading-relaxed mb-4">
              If you believe we have not handled your personal data in accordance with GDPR, you have the right to lodge
              a complaint with your local supervisory authority:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-2">EU Supervisory Authorities</h3>
                <p className="text-slate-400 text-sm mb-3">
                  Find your local data protection authority:
                </p>
                <a
                  href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  View EU DPA Directory
                  <Globe className="w-4 h-4" />
                </a>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Our Lead Authority</h3>
                <p className="text-slate-400 text-sm">
                  For cross-border processing, our lead supervisory authority is the Irish Data Protection Commission (DPC).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Need Help with GDPR?</h3>
            <p className="text-lg mb-8 opacity-90">
              Our Data Protection Officer and privacy team are here to answer your questions and help you exercise your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@seology.ai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Contact Privacy Team
              </a>
              <a
                href="/compliance"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                View Full Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
