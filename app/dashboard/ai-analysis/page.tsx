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
    <div className="bg-neutral-200 min-h-screen">
      <div className="container-default w-container">
        <div className="gap-row-24px">
          {/* Header */}
          <div className="rt-component-section gap-row-24px">
            <div className="flex-horizontal align-center gap-column-16px">
              <div className="card-icon-square _48px flex-horizontal" style={{ background: 'linear-gradient(135deg, var(--accent--primary-1), var(--secondary--color-5))' }}>
                <Lightbulb className="h-6 w-6 color-neutral-100" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="badge primary mg-bottom-12px">
                  Powered by Advanced AI
                </div>
                <h1 className="display-2 color-neutral-800">
                  AI-Powered SEO Analysis
                </h1>
                <p className="text-200 medium color-neutral-600">
                  Get instant, intelligent SEO recommendations from our AI. Analyze any webpage and receive actionable fixes in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Input Card */}
          <div className="card pd-32px---44px">
            <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
              <div className="avatar-circle _32px">
                <Search className="h-4 w-4" />
              </div>
              <h2 className="text-300 bold color-neutral-800">Enter URL to Analyze</h2>
            </div>
            <div className="flex-horizontal gap-column-12px">
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="input large"
                  disabled={analyzing}
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!url || analyzing}
                className="btn-primary large"
              >
                {analyzing ? (
                  <>
                    <span className="btn-icon-left">
                      <div className="loading-spinner small" />
                    </span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" style={{ marginRight: '8px' }} />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Thinking Process */}
          {analyzing && (
            <div className="card pd-32px---44px" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', border: '1px solid var(--accent--primary-1)' }}>
              <div className="flex-horizontal align-start gap-column-16px">
                <div className="avatar-circle _48px animate-pulse" style={{ background: 'linear-gradient(135deg, var(--accent--primary-1), var(--secondary--color-5))' }}>
                  <Lightbulb className="h-6 w-6 color-neutral-100" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="text-300 bold color-neutral-800 mg-bottom-8px">
                    AI is analyzing your page...
                  </h3>
                  <p className="text-100 medium color-neutral-600 mg-bottom-20px">
                    This usually takes 3-5 seconds
                  </p>
                  <div className="gap-row-12px">
                    {aiThinking.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex-horizontal align-center gap-column-8px animate-fade-in"
                      >
                        <div className="avatar-circle _16px" style={{ backgroundColor: 'var(--system--green-200)' }}>
                          <CheckCircle className="h-3 w-3" style={{ color: 'var(--system--green-400)' }} />
                        </div>
                        <p className="text-100 medium color-neutral-700">{step}</p>
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
              <div className="card pd-32px---44px" style={{ background: 'linear-gradient(135deg, var(--accent--primary-1), var(--secondary--color-5))' }}>
                <div className="text-center">
                  <h2 className="text-400 bold color-neutral-100 mg-bottom-32px">SEO Score</h2>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
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
                        style={{ transition: 'all 1s ease' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <div className="text-700 bold color-neutral-100">{result.score}</div>
                      <div className="text-100 medium color-neutral-200">out of 100</div>
                    </div>
                  </div>
                  <div className="flex-horizontal justify-center gap-column-32px mg-top-32px">
                    <div>
                      <div className="text-400 bold mg-bottom-4px" style={{ color: 'var(--system--red-300)' }}>
                        {result.summary.criticalIssues}
                      </div>
                      <div className="text-100 medium color-neutral-200">Critical</div>
                    </div>
                    <div>
                      <div className="text-400 bold mg-bottom-4px" style={{ color: 'var(--system--yellow-300)' }}>
                        {result.summary.highIssues}
                      </div>
                      <div className="text-100 medium color-neutral-200">High</div>
                    </div>
                    <div>
                      <div className="text-400 bold mg-bottom-4px" style={{ color: 'var(--system--blue-300)' }}>
                        {result.summary.mediumIssues}
                      </div>
                      <div className="text-100 medium color-neutral-200">Medium</div>
                    </div>
                    <div>
                      <div className="text-400 bold mg-bottom-4px" style={{ color: 'var(--system--green-300)' }}>
                        {result.summary.lowIssues}
                      </div>
                      <div className="text-100 medium color-neutral-200">Low</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues Found */}
              <div className="card pd-32px---44px">
                <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
                  <div className="avatar-circle _32px">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <h2 className="text-300 bold color-neutral-800">Issues Found</h2>
                </div>
                <div className="gap-row-16px">
                  {result.issues.map((issue, idx) => (
                    <AIIssueCard key={idx} issue={issue} />
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="card pd-32px---44px" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', border: '1px solid var(--accent--primary-1)' }}>
                <div className="flex-horizontal align-start gap-column-16px">
                  <div className="avatar-circle _48px" style={{ background: 'linear-gradient(135deg, var(--accent--primary-1), var(--secondary--color-5))' }}>
                    <Lightbulb className="h-6 w-6 color-neutral-100" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 className="text-300 bold color-neutral-800 mg-bottom-16px">
                      AI Recommendations
                    </h3>
                    <div className="gap-row-12px">
                      {result.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex-horizontal align-start gap-column-8px">
                          <div className="avatar-circle _16px" style={{ backgroundColor: 'var(--accent--primary-1)', flexShrink: 0, marginTop: '2px' }}>
                            <TrendingUp className="h-3 w-3 color-neutral-100" />
                          </div>
                          <p className="text-200 medium color-neutral-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-horizontal justify-center gap-column-16px">
                <button
                  onClick={() => {
                    setUrl('')
                    setResult(null)
                  }}
                  className="btn-secondary large"
                >
                  Analyze Another URL
                </button>
                <button className="btn-primary large">
                  Apply All Fixes Automatically
                </button>
              </div>
            </>
          )}

          {/* How It Works */}
          {!result && !analyzing && (
            <div className="card pd-32px---44px">
              <h2 className="text-400 bold color-neutral-800 mg-bottom-32px text-center">
                How Our AI Analyzes Your SEO
              </h2>
              <div className="grid-3-columns gap-column-24px">
                <div className="text-center">
                  <div className="avatar-circle _64px" style={{ margin: '0 auto 16px', background: 'linear-gradient(135deg, var(--accent--primary-1), var(--secondary--color-5))' }}>
                    <Search className="h-8 w-8 color-neutral-100" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">Deep Analysis</h3>
                  <p className="text-100 medium color-neutral-600">
                    Our AI scans your entire page structure, content, meta tags, and technical SEO elements
                  </p>
                </div>
                <div className="text-center">
                  <div className="avatar-circle _64px" style={{ margin: '0 auto 16px', background: 'linear-gradient(135deg, var(--secondary--color-5), var(--accent--primary-2))' }}>
                    <Lightbulb className="h-8 w-8 color-neutral-100" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">Smart Recommendations</h3>
                  <p className="text-100 medium color-neutral-600">
                    AI understands context and provides intelligent, actionable recommendations tailored to your site
                  </p>
                </div>
                <div className="text-center">
                  <div className="avatar-circle _64px" style={{ margin: '0 auto 16px', background: 'linear-gradient(135deg, var(--accent--primary-1), var(--secondary--color-5))' }}>
                    <TrendingUp className="h-8 w-8 color-neutral-100" />
                  </div>
                  <h3 className="text-200 bold color-neutral-800 mg-bottom-8px">Automatic Fixes</h3>
                  <p className="text-100 medium color-neutral-600">
                    Get ready-to-use code snippets and automatic fixes that can be applied with one click
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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

  const getBadgeClass = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'danger'
      case 'HIGH':
        return 'warning'
      case 'MEDIUM':
        return 'info'
      case 'LOW':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <div className="card pd-24px">
      <div className="flex-horizontal align-start space-between mg-bottom-16px">
        <div style={{ flex: 1 }}>
          <div className="flex-horizontal align-center gap-column-12px mg-bottom-12px">
            <span className={`badge ${getBadgeClass(issue.severity)}`}>
              {issue.severity}
            </span>
            <h3 className="text-200 bold color-neutral-800">{issue.title}</h3>
          </div>
          <p className="text-100 medium color-neutral-700 mg-bottom-12px">{issue.description}</p>
        </div>
      </div>

      <div className="card pd-16px" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--accent--primary-1)' }}>
        <div className="flex-horizontal align-start gap-column-12px">
          <div className="avatar-circle _24px" style={{ backgroundColor: 'var(--accent--primary-1)', flexShrink: 0 }}>
            <Lightbulb className="h-4 w-4 color-neutral-100" />
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-100 bold color-neutral-800 mg-bottom-4px">AI Recommendation:</p>
            <p className="text-100 medium color-neutral-700">{issue.recommendation}</p>
          </div>
        </div>
      </div>

      {issue.fixCode && (
        <div className="mg-top-16px">
          <button
            onClick={() => setShowCode(!showCode)}
            className="btn-text small"
            style={{ color: 'var(--accent--primary-1)' }}
          >
            <Code2 className="h-4 w-4" style={{ marginRight: '8px' }} />
            {showCode ? 'Hide' : 'View'} Generated Fix Code
          </button>
          {showCode && (
            <pre className="card pd-16px mg-top-12px" style={{ backgroundColor: 'var(--neutral--100)', overflow: 'auto' }}>
              <code className="text-100 medium" style={{ color: 'var(--system--green-400)' }}>{issue.fixCode}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
