import { Metadata } from 'next'
import { Shield, CheckCircle, FileCheck, Globe, Lock, Eye, Server, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compliance - SEOLOGY.AI',
  description: 'SEOLOGY.AI compliance with GDPR, CCPA, SOC 2, and international data protection regulations.',
}

export default function CompliancePage() {
  const complianceFrameworks = [
    {
      icon: Shield,
      name: 'SOC 2 Type II',
      status: 'Certified',
      description: 'Annual third-party audits verify our security controls, availability, and confidentiality practices.',
      details: [
        'Security controls audited annually',
        'Availability and reliability monitoring',
        'Data confidentiality protection',
        'Annual penetration testing',
      ],
    },
    {
      icon: Globe,
      name: 'GDPR',
      status: 'Compliant',
      description: 'Full compliance with EU General Data Protection Regulation for European customers.',
      details: [
        'Data processing agreements available',
        'Right to access and deletion',
        'Data portability supported',
        'EU data residency options',
      ],
    },
    {
      icon: Scale,
      name: 'CCPA',
      status: 'Compliant',
      description: 'California Consumer Privacy Act compliance for all US customers.',
      details: [
        'Consumer rights honored',
        'Opt-out of data sales',
        'Data disclosure upon request',
        'Non-discrimination guaranteed',
      ],
    },
    {
      icon: FileCheck,
      name: 'ISO 27001',
      status: 'In Progress',
      description: 'International standard for information security management systems.',
      details: [
        'Risk assessment framework',
        'Information security policies',
        'Incident response procedures',
        'Certification expected Q2 2025',
      ],
    },
  ]

  const dataProtection = [
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'All data encrypted at rest with 256-bit AES encryption and in transit with TLS 1.3.',
    },
    {
      icon: Eye,
      title: 'Access Controls',
      description: 'Role-based access control (RBAC) with multi-factor authentication required for all accounts.',
    },
    {
      icon: Server,
      title: 'Data Residency',
      description: 'Choose where your data is stored with options for US, EU, and APAC regions.',
    },
    {
      icon: FileCheck,
      title: 'Audit Logs',
      description: 'Comprehensive audit trails of all data access and modifications for compliance reporting.',
    },
  ]

  const yourRights = [
    {
      right: 'Right to Access',
      description: 'Request a copy of all personal data we hold about you.',
    },
    {
      right: 'Right to Deletion',
      description: 'Request deletion of your personal data (subject to legal obligations).',
    },
    {
      right: 'Right to Portability',
      description: 'Export your data in machine-readable format.',
    },
    {
      right: 'Right to Rectification',
      description: 'Correct inaccurate or incomplete personal data.',
    },
    {
      right: 'Right to Object',
      description: 'Object to processing of your personal data for certain purposes.',
    },
    {
      right: 'Right to Restrict',
      description: 'Request restriction of processing under certain conditions.',
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Compliance Center
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Regulatory Compliance & Data Protection
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            SEOLOGY.AI meets the highest standards for data protection, privacy, and security compliance.
          </p>
        </div>

        {/* Compliance Frameworks */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Compliance Frameworks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {complianceFrameworks.map((framework, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <framework.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{framework.name}</h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {framework.status}
                      </span>
                    </div>
                    <p className="text-slate-400 mb-4">{framework.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {framework.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Protection */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Data Protection Measures</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataProtection.map((measure, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <measure.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{measure.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{measure.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rights */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Your Data Rights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {yourRights.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {item.right}
                </h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
            <p className="text-slate-300 mb-4">
              To exercise any of these rights, please contact our Data Protection Officer:
            </p>
            <a
              href="mailto:privacy@seology.ai"
              className="text-blue-400 hover:underline font-medium text-lg"
            >
              privacy@seology.ai
            </a>
            <p className="text-sm text-slate-400 mt-2">Response time: Within 30 days</p>
          </div>
        </div>

        {/* International Compliance */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">International Compliance</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">🇪🇺</div>
                <h3 className="text-lg font-bold mb-2">European Union</h3>
                <p className="text-sm text-slate-400">
                  GDPR compliant with EU data residency options
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">🇺🇸</div>
                <h3 className="text-lg font-bold mb-2">United States</h3>
                <p className="text-sm text-slate-400">
                  CCPA compliant for California residents
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">🌏</div>
                <h3 className="text-lg font-bold mb-2">Asia-Pacific</h3>
                <p className="text-sm text-slate-400">
                  APAC data residency with regional compliance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Management */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Third-Party Vendor Management</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-slate-300 mb-6 leading-relaxed">
              We carefully vet all third-party vendors and service providers to ensure they meet our security and
              compliance standards. All vendors must:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Sign Data Processing Agreements (DPAs)',
                'Maintain SOC 2 Type II certification or equivalent',
                'Undergo annual security assessments',
                'Comply with GDPR and CCPA requirements',
                'Provide incident response procedures',
                'Maintain adequate cyber insurance',
              ].map((requirement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{requirement}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-slate-400">
                For a complete list of our sub-processors and data processing locations, contact{' '}
                <a href="mailto:privacy@seology.ai" className="text-blue-400 hover:underline">
                  privacy@seology.ai
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Incident Response */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Data Breach Response</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-slate-300 mb-6 leading-relaxed">
              In the unlikely event of a data breach affecting personal data, SEOLOGY.AI will:
            </p>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Immediate Containment',
                  description: 'Contain and mitigate the breach within 4 hours of detection',
                },
                {
                  step: '2',
                  title: 'Authority Notification',
                  description: 'Notify relevant authorities within 72 hours as required by GDPR',
                },
                {
                  step: '3',
                  title: 'Customer Communication',
                  description: 'Inform affected customers within 72 hours with full transparency',
                },
                {
                  step: '4',
                  title: 'Remediation',
                  description: 'Implement corrective measures and provide ongoing updates',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Questions About Compliance?</h3>
            <p className="text-lg mb-8 opacity-90">
              Our compliance and privacy team is here to help. We can provide DPAs, security questionnaires, and detailed
              compliance documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@seology.ai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                Contact Privacy Team
              </a>
              <a
                href="mailto:security@seology.ai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
