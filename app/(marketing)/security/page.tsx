import { Metadata } from 'next'
import { Shield, Lock, Eye, CheckCircle, Server, Key, FileCheck, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security - SEOLOGY.AI',
  description: 'Learn how SEOLOGY.AI protects your data with enterprise-grade security, encryption, and compliance.',
}

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: '256-bit AES Encryption',
      description: 'All data is encrypted at rest and in transit using industry-standard 256-bit AES encryption.',
    },
    {
      icon: Shield,
      title: 'SOC 2 Type II Compliant',
      description: 'We maintain SOC 2 Type II compliance with regular third-party audits.',
    },
    {
      icon: Eye,
      title: 'Zero-Knowledge Architecture',
      description: 'Your CMS credentials are encrypted end-to-end. We never see your passwords.',
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Hosted on AWS with automatic security patches and DDoS protection.',
    },
    {
      icon: Key,
      title: 'OAuth 2.0',
      description: 'Industry-standard OAuth authentication for Shopify and WordPress integrations.',
    },
    {
      icon: FileCheck,
      title: 'Regular Security Audits',
      description: 'Quarterly penetration testing and security audits by independent firms.',
    },
  ]

  const complianceStandards = [
    { name: 'SOC 2 Type II', status: 'Certified' },
    { name: 'GDPR', status: 'Compliant' },
    { name: 'CCPA', status: 'Compliant' },
    { name: 'ISO 27001', status: 'In Progress' },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Enterprise Security
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Data Security is Our Priority
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            SEOLOGY.AI uses enterprise-grade security to protect your data, credentials, and website at every step.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Compliance & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <span className="text-lg font-medium">{standard.name}</span>
                <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {standard.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How We Protect Your Data */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How We Protect Your Data</h2>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-400" />
                Encryption at Rest
              </h3>
              <p className="text-slate-400 leading-relaxed">
                All data stored in our databases is encrypted using 256-bit AES encryption. This includes your CMS credentials,
                site data, and SEO fix history.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Key className="w-6 h-6 text-purple-400" />
                Encryption in Transit
              </h3>
              <p className="text-slate-400 leading-relaxed">
                All communication between your browser and our servers uses TLS 1.3 encryption. Your CMS credentials are
                encrypted before leaving your device.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Eye className="w-6 h-6 text-pink-400" />
                Zero-Knowledge Architecture
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Your CMS passwords are encrypted using your account-specific encryption key. Even our engineers cannot
                decrypt your credentials.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Server className="w-6 h-6 text-green-400" />
                Secure Infrastructure
              </h3>
              <p className="text-slate-400 leading-relaxed">
                We use AWS infrastructure with automatic security patches, DDoS protection, and geo-redundant backups.
                All servers are hardened and monitored 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Vulnerability Disclosure */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3">Responsible Disclosure</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you discover a security vulnerability, please report it to{' '}
                  <a href="mailto:security@seology.ai" className="text-blue-400 hover:underline font-medium">
                    security@seology.ai
                  </a>
                  . We take all reports seriously and will respond within 24 hours.
                </p>
                <p className="text-sm text-slate-400">
                  We maintain a bug bounty program for verified security researchers. Contact us for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
