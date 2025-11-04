'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Lightbulb, CheckCircle, AlertCircle, TrendingUp, Code2 } from 'lucide-react'

interface AnalysisResult {
  score: number
  issues: Array<{
    type: string
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    title: string
    description: string
    recommendation: string
    fixCode?: string
  }>
  summary: {
    totalIssues: number
    criticalIssues: number
    highIssues: number
    mediumIssues: number
    lowIssues: number
  }
  recommendations: string[]
}

export default function AIAnalysisPage() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [aiThinking, setAiThinking] = useState<string[]>([])

  const handleAnalyze = async () => {
    if (!url) return

    setAnalyzing(true)
    setAiThinking([])
    setResult(null)

    // Simulate AI thinking process
    const thinkingSteps = [
      'Fetching webpage content...',
      'Analyzing HTML structure with AI...',
      'Evaluating meta tags and descriptions...',
      'Checking internal and external links...',
      'Scanning images for alt text...',
      'Testing mobile responsiveness...',
      'Measuring page speed indicators...',
      'Generating SEO recommendations...',
      'Creating automated fixes...',
    ]

    for (let i = 0; i < thinkingSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAiThinking((prev) => [...prev, thinkingSteps[i]])
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock result
    const mockResult: AnalysisResult = {
      score: 72,
      issues: [
        {
          type: 'missing_meta_description',
          severity: 'HIGH',
          title: 'Missing Meta Description',
          description: 'The page is missing a meta description tag, which is crucial for search engine results.',
          recommendation: 'Add a compelling 150-160 character meta description that includes your target keywords.',
          fixCode: '<meta name="description" content="Your optimized description here">',
        },
        {
          type: 'poor_heading_structure',
          severity: 'MEDIUM',
          title: 'Poor Heading Structure',
          description: 'Multiple H1 tags found. Pages should have exactly one H1 tag.',
          recommendation: 'Use only one H1 tag for the main page title, and structure other headings hierarchically (H2, H3, etc.).',
        },
        {
          type: 'missing_alt_text',
          severity: 'CRITICAL',
          title: 'Images Missing Alt Text',
          description: '8 images are missing alt attributes, which hurts accessibility and SEO.',
          recommendation: 'Add descriptive alt text to all images, including relevant keywords where appropriate.',
          fixCode: '<img src="image.jpg" alt="Descriptive text here">',
        },
        {
          type: 'slow_page_speed',
          severity: 'HIGH',
          title: 'Page Speed Issues',
          description: 'Page load time is 4.2 seconds, which is above the recommended 3 seconds.',
          recommendation: 'Optimize images, minify CSS/JS, enable compression, and leverage browser caching.',
        },
      ],
      summary: {
        totalIssues: 4,
        criticalIssues: 1,
        highIssues: 2,
        mediumIssues: 1,
        lowIssues: 0,
      },
      recommendations: [
        'Implement schema markup for better rich snippets',
        'Improve internal linking structure',
        'Add Open Graph tags for social media sharing',
        'Create an XML sitemap and submit to search engines',
      ],
    }

    setResult(mockResult)
    setAnalyzing(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/20">
          <Lightbulb className="w-7 h-7 text-blue-400" />
        </div>
        <div>
          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block mb-2">
            Powered by Advanced AI
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            AI-Powered SEO Analysis
          </h1>
          <p className="text-gray-400">
            Get instant, intelligent SEO recommendations from our AI. Analyze any webpage and receive actionable fixes in seconds.
          </p>
        </div>
      </div>

      {/* Analysis Input Card */}
      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10">
            <Search className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Enter URL to Analyze</h2>
        </div>
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={analyzing}
            className="flex-1 px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            onClick={handleAnalyze}
            disabled={!url || analyzing}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* AI Thinking Process */}
      {analyzing && (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-lg shadow-blue-500/10 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/20 flex-shrink-0">
              <Lightbulb className="w-7 h-7 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                AI is analyzing your page...
              </h3>
              <p className="text-sm text-gray-400 mb-5">
                This usually takes 3-5 seconds
              </p>
              <div className="space-y-3">
                {aiThinking.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 animate-fade-in"
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {result && !analyzing && (
        <>
          {/* SEO Score Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl shadow-blue-500/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-8">SEO Score</h2>
              <div className="relative inline-block">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="20"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="white"
                    strokeWidth="20"
                    strokeDasharray={`${(result.score / 100) * 502} 502`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-6xl font-bold text-white">{result.score}</div>
                  <div className="text-sm text-white/80">out of 100</div>
                </div>
              </div>
              <div className="flex justify-center gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold text-red-300 mb-1">
                    {result.summary.criticalIssues}
                  </div>
                  <div className="text-sm text-white/80">Critical</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-1">
                    {result.summary.highIssues}
                  </div>
                  <div className="text-sm text-white/80">High</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-300 mb-1">
                    {result.summary.mediumIssues}
                  </div>
                  <div className="text-sm text-white/80">Medium</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300 mb-1">
                    {result.summary.lowIssues}
                  </div>
                  <div className="text-sm text-white/80">Low</div>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Found */}
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Issues Found</h2>
            </div>
            <div className="space-y-4">
              {result.issues.map((issue, idx) => (
                <AIIssueCard key={idx} issue={issue} />
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-lg shadow-blue-500/10">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/20 flex-shrink-0">
                <Lightbulb className="w-7 h-7 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-4">
                  AI Recommendations
                </h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex-shrink-0 mt-0.5">
                        <TrendingUp className="w-3 h-3 text-blue-400" />
                      </div>
                      <p className="text-sm text-gray-300">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setUrl('')
                setResult(null)
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
            >
              Analyze Another URL
            </button>
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20">
              Apply All Fixes Automatically
            </button>
          </div>
        </>
      )}

      {/* How It Works */}
      {!result && !analyzing && (
        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How Our AI Analyzes Your SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/20">
                <Search className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Deep Analysis</h3>
              <p className="text-sm text-gray-400">
                Our AI scans your entire page structure, content, meta tags, and technical SEO elements
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/20">
                <Lightbulb className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Recommendations</h3>
              <p className="text-sm text-gray-400">
                AI understands context and provides intelligent, actionable recommendations tailored to your site
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/20">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automatic Fixes</h3>
              <p className="text-sm text-gray-400">
                Get ready-to-use code snippets and automatic fixes that can be applied with one click
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AIIssueCard({
  issue,
}: {
  issue: {
    severity: string
    title: string
    description: string
    recommendation: string
    fixCode?: string
  }
}) {
  const [showCode, setShowCode] = useState(false)

  const severityConfig = {
    CRITICAL: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    HIGH: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    MEDIUM: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
    LOW: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  }[issue.severity] || { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' }

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityConfig.bg} ${severityConfig.text} ${severityConfig.border}`}>
              {issue.severity}
            </span>
            <h3 className="text-base font-bold text-white">{issue.title}</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">{issue.description}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/30 flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-white mb-1">AI Recommendation:</p>
            <p className="text-sm text-gray-300">{issue.recommendation}</p>
          </div>
        </div>
      </div>

      {issue.fixCode && (
        <div className="mt-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
          >
            <Code2 className="w-4 h-4" />
            {showCode ? 'Hide' : 'View'} Generated Fix Code
          </button>
          {showCode && (
            <pre className="mt-3 bg-black/30 border border-white/10 rounded-xl p-4 overflow-auto">
              <code className="text-sm text-green-400">{issue.fixCode}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
