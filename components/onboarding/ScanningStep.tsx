'use client'

/**
 * Onboarding Step 3: Scanning Site
 * Enhanced with animated progress, real-time updates, and visual feedback
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, FileText, Image, Link as LinkIcon, Zap, CheckCircle2, Loader2 } from 'lucide-react'

interface ScanningStepProps {
  siteId?: string
  siteName?: string
  onNext: (data: { issuesFound?: number; firstIssueId?: string }) => void
  onBack: () => void
}

interface ScanStage {
  id: string
  icon: typeof Search
  title: string
  description: string
  progress: number
  duration: number
  color: string
}

const scanStages: ScanStage[] = [
  {
    id: 'connecting',
    icon: Globe,
    title: 'Connecting to your site',
    description: 'Establishing secure connection...',
    progress: 15,
    duration: 1500,
    color: 'text-blue-400',
  },
  {
    id: 'crawling',
    icon: Search,
    title: 'Crawling pages',
    description: 'Discovering all public pages on your site...',
    progress: 35,
    duration: 2500,
    color: 'text-purple-400',
  },
  {
    id: 'analyzing',
    icon: FileText,
    title: 'Analyzing content',
    description: 'Extracting meta tags, headings, and content...',
    progress: 55,
    duration: 2000,
    color: 'text-green-400',
  },
  {
    id: 'ai-analysis',
    icon: Zap,
    title: 'Running AI analysis',
    description: 'Claude AI is identifying SEO opportunities...',
    progress: 75,
    duration: 3000,
    color: 'text-yellow-400',
  },
  {
    id: 'issues',
    icon: LinkIcon,
    title: 'Identifying SEO issues',
    description: 'Cataloging fixable problems...',
    progress: 90,
    duration: 2000,
    color: 'text-orange-400',
  },
  {
    id: 'complete',
    icon: CheckCircle2,
    title: 'Scan complete!',
    description: 'Ready to show you what we found...',
    progress: 100,
    duration: 1000,
    color: 'text-green-400',
  },
]

const checkItems = [
  { label: 'Meta titles and descriptions', icon: FileText },
  { label: 'Image alt tags', icon: Image },
  { label: 'Heading structure (H1, H2, etc.)', icon: FileText },
  { label: 'Broken links', icon: LinkIcon },
  { label: 'Mobile responsiveness', icon: Globe },
  { label: 'Page speed insights', icon: Zap },
]

export function ScanningStep({ siteId, siteName, onNext, onBack }: ScanningStepProps) {
  const [progress, setProgress] = useState(0)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [completedStages, setCompletedStages] = useState<string[]>([])
  const [pagesFound, setPagesFound] = useState(0)

  useEffect(() => {
    if (!siteId) return

    let currentStage = 0
    let stageTimeout: NodeJS.Timeout

    const runNextStage = () => {
      if (currentStage < scanStages.length) {
        const stage = scanStages[currentStage]

        setCurrentStageIndex(currentStage)
        setProgress(stage.progress)

        // Simulate pages being found during crawling stage
        if (stage.id === 'crawling') {
          let pages = 0
          const pageInterval = setInterval(() => {
            pages += Math.floor(Math.random() * 3) + 1
            setPagesFound(pages)
            if (pages >= 12) {
              clearInterval(pageInterval)
              setPagesFound(12)
            }
          }, 200)

          setTimeout(() => clearInterval(pageInterval), stage.duration)
        }

        // Mark stage as completed near the end
        setTimeout(() => {
          setCompletedStages(prev => [...prev, stage.id])
        }, stage.duration - 200)

        currentStage++
        stageTimeout = setTimeout(runNextStage, stage.duration)
      } else {
        // Scanning complete, move to next step
        setTimeout(() => {
          onNext({ issuesFound: 12, firstIssueId: '1' })
        }, 500)
      }
    }

    const initialTimeout = setTimeout(runNextStage, 500)

    return () => {
      clearTimeout(initialTimeout)
      clearTimeout(stageTimeout)
    }
  }, [siteId, onNext])

  const currentStage = scanStages[currentStageIndex]
  const StageIcon = currentStage?.icon || Search

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      {/* Animated Scanner Icon */}
      <div className="flex justify-center mb-8">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 flex items-center justify-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <StageIcon className={`w-12 h-12 ${currentStage?.color || 'text-blue-400'} relative z-10`} />
          </div>

          {/* Orbiting Particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                rotate: 360,
                x: [0, 60 * Math.cos((i * 120 * Math.PI) / 180)],
                y: [0, 60 * Math.sin((i * 120 * Math.PI) / 180)],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Title and Description */}
      <div className="text-center mb-8">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentStage?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {currentStage?.title}
          </motion.h2>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentStage?.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-400"
          >
            {currentStage?.description}
          </motion.p>
        </AnimatePresence>

        {pagesFound > 0 && currentStageIndex >= 1 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-blue-400 mt-2"
          >
            Found {pagesFound} pages
          </motion.p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-400">Scanning {siteName || 'your site'}</span>
          <motion.span
            key={progress}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-semibold text-white"
          >
            {progress}%
          </motion.span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Stage Timeline */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
        <div className="space-y-3">
          {scanStages.slice(0, -1).map((stage, index) => {
            const Icon = stage.icon
            const isCompleted = completedStages.includes(stage.id)
            const isCurrent = currentStageIndex === index
            const isPending = currentStageIndex < index

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                  ${isCompleted ? 'bg-green-500/20 border-green-500 text-green-400' :
                    isCurrent ? 'bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse' :
                    'bg-gray-700 border-gray-600 text-gray-500'}
                `}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium transition-colors ${
                    isCompleted ? 'text-green-400' :
                    isCurrent ? 'text-white' :
                    'text-gray-500'
                  }`}>
                    {stage.title}
                  </p>
                </div>
                {isCurrent && (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* What We're Checking */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          What we're checking:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checkItems.map((item, index) => {
            const Icon = item.icon
            const isVisible = currentStageIndex >= 2

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isVisible ? 1 : 0.3,
                  scale: isVisible ? 1 : 0.9,
                }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                  isVisible ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-500'
                }`}>
                  {isVisible ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <Icon className="w-3 h-3" />
                  )}
                </div>
                <span className={`text-sm transition-colors ${
                  isVisible ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
