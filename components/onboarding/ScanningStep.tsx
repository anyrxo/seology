'use client'

/**
 * Onboarding Step 3: Scanning Site
 */

import { useEffect, useState } from 'react'

interface ScanningStepProps {
  siteId?: string
  siteName?: string
  onNext: (data: { issuesFound?: number; firstIssueId?: string }) => void
  onBack: () => void
}

export function ScanningStep({ siteId, siteName, onNext, onBack }: ScanningStepProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Connecting to your site...')

  useEffect(() => {
    if (!siteId) return

    // Simulate scanning progress
    const stages = [
      { progress: 20, status: 'Crawling pages...', duration: 2000 },
      { progress: 40, status: 'Analyzing content...', duration: 2000 },
      { progress: 60, status: 'Running AI analysis...', duration: 3000 },
      { progress: 80, status: 'Identifying SEO issues...', duration: 2000 },
      { progress: 100, status: 'Scan complete!', duration: 1000 },
    ]

    let currentStage = 0
    const runNextStage = () => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage]
        setProgress(stage.progress)
        setStatus(stage.status)
        currentStage++
        setTimeout(runNextStage, stage.duration)
      } else {
        // Scanning complete, move to next step
        setTimeout(() => {
          onNext({ issuesFound: 12 }) // Mock data
        }, 1000)
      }
    }

    setTimeout(runNextStage, 500)
  }, [siteId, onNext])

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="text-5xl mb-6 animate-pulse">🔍</div>
      <h2 className="text-3xl font-bold text-white mb-2">
        Scanning {siteName || 'Your Site'}
      </h2>
      <p className="text-gray-400 mb-8">
        Our AI is analyzing your site for SEO issues
      </p>

      <div className="mb-8">
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400">{status}</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 text-left">
        <h3 className="text-lg font-semibold text-white mb-3">What we're checking:</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Meta titles and descriptions
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Image alt tags
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Heading structure (H1, H2, etc.)
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Broken links
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Mobile responsiveness
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Page speed insights
          </li>
        </ul>
      </div>
    </div>
  )
}
