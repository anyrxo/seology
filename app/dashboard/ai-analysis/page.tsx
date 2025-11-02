'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      '🔍 Fetching webpage content...',
      '🧠 Analyzing HTML structure with Claude AI...',
      '📊 Evaluating meta tags and descriptions...',
      '🔗 Checking internal and external links...',
      '🖼️ Scanning images for alt text...',
      '📱 Testing mobile responsiveness...',
      '⚡ Measuring page speed indicators...',
      '🎯 Generating SEO recommendations...',
      '✨ Creating automated fixes...',
    ]

    for (let i = 0; i < thinkingSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAiThinking((prev) => [...prev, thinkingSteps[i]])
    }

    // Simulate API call (in production, this calls your actual API)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock result (replace with actual API call)
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          ✨ Powered by Claude AI
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          AI-Powered SEO Analysis
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Get instant, intelligent SEO recommendations from Claude AI. Analyze any webpage
          and receive actionable fixes in seconds.
        </p>
      </div>

      {/* Analysis Input */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
        <div className="max-w-2xl mx-auto">
          <label className="block text-white font-semibold mb-3">
            Enter URL to Analyze
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-lg"
              disabled={analyzing}
            />
            <button
              onClick={handleAnalyze}
              disabled={!url || analyzing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-all disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {analyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Thinking Process */}
      {analyzing && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                Claude AI is thinking...
                <span className="ml-2 text-sm text-blue-400">
                  (This usually takes 3-5 seconds)
                </span>
              </h3>
              <div className="space-y-2">
                {aiThinking.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-gray-300 animate-fade-in"
                  >
                    <svg
                      className="w-4 h-4 text-green-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {step}
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
          {/* SEO Score */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">SEO Score</h2>
              <div className="relative inline-block">
                <svg className="w-48 h-48" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="20"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    strokeDasharray={`${(result.score / 100) * 502} 502`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">{result.score}</div>
                    <div className="text-gray-400 text-sm">out of 100</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {result.summary.criticalIssues}
                  </div>
                  <div className="text-gray-400 text-sm">Critical</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {result.summary.highIssues}
                  </div>
                  <div className="text-gray-400 text-sm">High</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {result.summary.mediumIssues}
                  </div>
                  <div className="text-gray-400 text-sm">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {result.summary.lowIssues}
                  </div>
                  <div className="text-gray-400 text-sm">Low</div>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Found */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Issues Found</h2>
            <div className="space-y-4">
              {result.issues.map((issue, idx) => (
                <AIIssueCard key={idx} issue={issue} />
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-3">
                  Claude AI Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start text-blue-200">
                      <svg
                        className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => {
                setUrl('')
                setResult(null)
              }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Analyze Another URL
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Apply All Fixes Automatically
            </button>
          </div>
        </>
      )}

      {/* How It Works */}
      {!result && !analyzing && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            How Claude AI Analyzes Your SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Deep Analysis</h3>
              <p className="text-gray-400 text-sm">
                Claude AI scans your entire page structure, content, meta tags, and technical
                SEO elements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-gray-400 text-sm">
                AI understands context and provides intelligent, actionable recommendations
                tailored to your site
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Automatic Fixes</h3>
              <p className="text-gray-400 text-sm">
                Get ready-to-use code snippets and automatic fixes that can be applied with
                one click
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

  const severityColors = {
    CRITICAL: 'bg-red-900 text-red-200 border-red-700',
    HIGH: 'bg-orange-900 text-orange-200 border-orange-700',
    MEDIUM: 'bg-yellow-900 text-yellow-200 border-yellow-700',
    LOW: 'bg-blue-900 text-blue-200 border-blue-700',
  }

  const color = severityColors[issue.severity as keyof typeof severityColors]

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
              {issue.severity}
            </span>
            <h3 className="text-white font-semibold text-lg">{issue.title}</h3>
          </div>
          <p className="text-gray-400 mb-3">{issue.description}</p>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-200 mb-1">AI Recommendation:</p>
            <p className="text-sm text-blue-300">{issue.recommendation}</p>
          </div>
        </div>
      </div>

      {issue.fixCode && (
        <div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center mb-2"
          >
            {showCode ? '▼' : '▶'} View Generated Fix Code
          </button>
          {showCode && (
            <pre className="bg-gray-950 border border-gray-700 rounded p-4 text-sm text-green-400 overflow-x-auto">
              {issue.fixCode}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
