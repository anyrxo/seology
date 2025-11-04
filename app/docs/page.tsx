'use client'

/**
 * Comprehensive Documentation Portal
 * Interactive guides, API reference, tutorials, and examples
 */

import { useState } from 'react'
import Link from 'next/link'
import {
  Book,
  Code,
  Zap,
  Search,
  FileText,
  Settings,
  Shield,
  Workflow,
  GitBranch,
  Terminal,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  Home,
  Sparkles,
  PlayCircle,
  BookOpen,
  HelpCircle,
  Layers,
} from 'lucide-react'

interface DocSection {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  items: Array<{
    title: string
    description: string
    href: string
  }>
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSection, setSelectedSection] = useState<string | null>('getting-started')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const sections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Quick start guides to get up and running',
      items: [
        {
          title: 'Introduction',
          description: 'Learn about SEOLOGY.AI and what makes it unique',
          href: '#intro',
        },
        {
          title: 'Connect Your First Site',
          description: 'Step-by-step guide to connect Shopify, WordPress, or custom sites',
          href: '#connect-site',
        },
        {
          title: 'Understanding Execution Modes',
          description: 'Choose between Automatic, Plan, and Approve modes',
          href: '#execution-modes',
        },
        {
          title: 'Your First Fix',
          description: 'Apply your first automated SEO fix',
          href: '#first-fix',
        },
      ],
    },
    {
      id: 'integration',
      title: 'Platform Integration',
      icon: <Layers className="w-5 h-5" />,
      description: 'Connect your CMS or website',
      items: [
        {
          title: 'Shopify Integration',
          description: 'OAuth connection for Shopify stores',
          href: '#shopify',
        },
        {
          title: 'WordPress Integration',
          description: 'REST API setup with Application Passwords',
          href: '#wordpress',
        },
        {
          title: 'Magic.js Connector',
          description: 'Universal JavaScript connector for any website',
          href: '#magic-js',
        },
        {
          title: 'Custom Integrations',
          description: 'Build custom connectors using our API',
          href: '#custom',
        },
      ],
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: <Code className="w-5 h-5" />,
      description: 'Complete API documentation',
      items: [
        {
          title: 'Authentication',
          description: 'Bearer token authentication with Clerk',
          href: '#auth',
        },
        {
          title: 'Sites & Connections',
          description: 'Manage site connections programmatically',
          href: '#sites-api',
        },
        {
          title: 'Issues & Fixes',
          description: 'Detect issues and execute fixes via API',
          href: '#fixes-api',
        },
        {
          title: 'Webhooks',
          description: 'Real-time notifications for events',
          href: '#webhooks',
        },
      ],
    },
    {
      id: 'guides',
      title: 'Guides & Tutorials',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'In-depth tutorials and best practices',
      items: [
        {
          title: 'SEO Best Practices',
          description: 'How to maximize SEO improvements',
          href: '#seo-best-practices',
        },
        {
          title: 'Team Collaboration',
          description: 'Manage teams and invite members',
          href: '#teams',
        },
        {
          title: 'Rollback & Recovery',
          description: 'Using the 90-day rollback feature',
          href: '#rollback',
        },
        {
          title: 'Advanced Workflows',
          description: 'Automate complex SEO workflows',
          href: '#workflows',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: <Shield className="w-5 h-5" />,
      description: 'Security features and compliance',
      items: [
        {
          title: 'Data Security',
          description: 'How we protect your credentials and data',
          href: '#security',
        },
        {
          title: 'OAuth Flow',
          description: 'Understanding secure OAuth connections',
          href: '#oauth',
        },
        {
          title: 'API Rate Limits',
          description: 'Rate limiting and usage quotas',
          href: '#rate-limits',
        },
        {
          title: 'Compliance',
          description: 'GDPR, SOC 2, and data handling',
          href: '#compliance',
        },
      ],
    },
  ]

  const codeExamples = {
    shopify: `// Connect Shopify store via OAuth
window.location.href = 'https://seology.ai/api/auth/shopify?shop=yourstore.myshopify.com'

// Callback will receive access token and connect automatically`,

    wordpress: `// WordPress REST API connection
fetch('https://seology.ai/api/connections', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_SESSION_TOKEN'
  },
  body: JSON.stringify({
    platform: 'WORDPRESS',
    domain: 'https://yoursite.com',
    credentials: {
      username: 'admin',
      applicationPassword: 'xxxx xxxx xxxx xxxx'
    }
  })
})`,

    magicJs: `<!-- Add Magic.js to any website -->
<script
  src="https://seology.ai/magic.js"
  data-site-id="YOUR_SITE_ID"
  data-api-key="YOUR_API_KEY"
></script>

<!-- Fixes will be fetched and applied automatically -->`,

    analyze: `// Trigger site analysis
const response = await fetch('https://seology.ai/api/sites/{siteId}/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SESSION_TOKEN'
  }
})

const { jobId, message } = await response.json()
console.log('Analysis started:', jobId)`,

    executeFixes: `// Execute fixes based on execution mode
const response = await fetch('https://seology.ai/api/fixes/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_SESSION_TOKEN'
  },
  body: JSON.stringify({
    siteId: 'site-uuid',
    issueIds: ['issue-1', 'issue-2'] // Optional: specific issues
  })
})

const result = await response.json()
console.log('Fixes executed:', result)`,

    webhook: `// Register a webhook
const response = await fetch('https://seology.ai/api/webhooks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_SESSION_TOKEN'
  },
  body: JSON.stringify({
    url: 'https://yourapp.com/webhooks/seology',
    events: ['fix.applied', 'issue.detected', 'analysis.completed'],
    secret: 'your-webhook-secret'
  })
})

// Webhook payload example
{
  "event": "fix.applied",
  "timestamp": "2025-11-04T10:30:00Z",
  "data": {
    "fixId": "fix-uuid",
    "issueId": "issue-uuid",
    "siteId": "site-uuid",
    "description": "Added missing meta description",
    "status": "APPLIED"
  }
}`,
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-blue-100 hover:text-white transition-colors">
              <Home className="w-5 h-5" />
            </Link>
            <ChevronRight className="w-4 h-4 text-blue-300" />
            <span className="text-blue-100">Documentation</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            SEOLOGY.AI Documentation
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Everything you need to integrate, automate, and optimize your SEO with SEOLOGY.AI
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="sticky top-8 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    selectedSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}

              <div className="pt-6 mt-6 border-t border-gray-200">
                <Link
                  href="/docs"
                  className="w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                >
                  <Terminal className="w-5 h-5" />
                  <span className="font-medium">API Explorer</span>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Quick Links Grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {sections.find(s => s.id === selectedSection)?.title}
              </h2>
              <p className="text-gray-600 mb-8">
                {sections.find(s => s.id === selectedSection)?.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections
                  .find(s => s.id === selectedSection)
                  ?.items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all group"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  ))}
              </div>
            </div>

            {/* Code Examples Section */}
            {selectedSection === 'api' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-blue-600" />
                    Code Examples
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready-to-use code snippets for common integration scenarios
                  </p>
                </div>

                {/* Shopify Example */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h4 className="font-semibold text-gray-900">Shopify OAuth Connection</h4>
                  </div>
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-800">{codeExamples.shopify}</code>
                    </pre>
                    <button
                      onClick={() => copyCode(codeExamples.shopify, 'shopify')}
                      className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'shopify' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* WordPress Example */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h4 className="font-semibold text-gray-900">WordPress REST API Connection</h4>
                  </div>
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-800">{codeExamples.wordpress}</code>
                    </pre>
                    <button
                      onClick={() => copyCode(codeExamples.wordpress, 'wordpress')}
                      className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'wordpress' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Magic.js Example */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h4 className="font-semibold text-gray-900">Magic.js Universal Connector</h4>
                  </div>
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-800">{codeExamples.magicJs}</code>
                    </pre>
                    <button
                      onClick={() => copyCode(codeExamples.magicJs, 'magicJs')}
                      className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'magicJs' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Analyze Site Example */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h4 className="font-semibold text-gray-900">Trigger Site Analysis</h4>
                  </div>
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-800">{codeExamples.analyze}</code>
                    </pre>
                    <button
                      onClick={() => copyCode(codeExamples.analyze, 'analyze')}
                      className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'analyze' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Execute Fixes Example */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h4 className="font-semibold text-gray-900">Execute SEO Fixes</h4>
                  </div>
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-800">{codeExamples.executeFixes}</code>
                    </pre>
                    <button
                      onClick={() => copyCode(codeExamples.executeFixes, 'executeFixes')}
                      className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'executeFixes' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Webhook Example */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h4 className="font-semibold text-gray-900">Register Webhook</h4>
                  </div>
                  <div className="relative">
                    <pre className="p-6 overflow-x-auto text-sm">
                      <code className="text-gray-800">{codeExamples.webhook}</code>
                    </pre>
                    <button
                      onClick={() => copyCode(codeExamples.webhook, 'webhook')}
                      className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'webhook' ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive API Explorer Link */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Terminal className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Try the Interactive API Explorer
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Test API endpoints directly in your browser with our Swagger UI interface.
                    View complete request/response schemas and try live requests.
                  </p>
                  <a
                    href="/api-explorer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Open API Explorer</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <HelpCircle className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our support team for assistance
                </p>
                <a
                  href="mailto:support@seology.ai"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  support@seology.ai
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <GitBranch className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Changelog</h3>
                <p className="text-sm text-gray-600 mb-4">
                  See what's new in the latest release
                </p>
                <Link
                  href="/changelog"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View changelog
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Shield className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Status Page</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Check system status and uptime
                </p>
                <a
                  href="https://status.seology.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  View status
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © {new Date().getFullYear()} SEOLOGY.AI. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
