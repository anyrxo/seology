'use client'

/**
 * Connect Site Form with Multi-Step Progress
 * Shows step-by-step feedback during site connection
 */

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Platform = 'SHOPIFY' | 'WORDPRESS' | 'MAGICJS'

interface ConnectionStep {
  id: string
  label: string
  status: 'pending' | 'active' | 'completed' | 'error'
}

interface FormData {
  url: string
  platform: Platform
  credentials?: {
    apiKey?: string
    username?: string
    password?: string
  }
}

export function ConnectSiteForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    url: '',
    platform: 'SHOPIFY',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<number>(-1)
  const [steps, setSteps] = useState<ConnectionStep[]>([
    { id: 'validate', label: 'Validating connection', status: 'pending' },
    { id: 'create', label: 'Creating site', status: 'pending' },
    { id: 'crawl', label: 'Starting initial scan', status: 'pending' },
  ])

  function updateStepStatus(
    stepIndex: number,
    status: ConnectionStep['status']
  ) {
    setSteps((prev) =>
      prev.map((step, i) => (i === stepIndex ? { ...step, status } : step))
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setCurrentStep(0)

    try {
      // Step 1: Validate connection (33%)
      updateStepStatus(0, 'active')
      setProgress(10)

      const validateResponse = await fetch('/api/sites/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formData.url,
          platform: formData.platform,
          credentials: formData.credentials,
        }),
      })

      if (!validateResponse.ok) {
        throw new Error('Connection validation failed')
      }

      await new Promise((resolve) => setTimeout(resolve, 800))
      updateStepStatus(0, 'completed')
      setProgress(33)
      setCurrentStep(1)

      // Step 2: Create site (66%)
      updateStepStatus(1, 'active')
      setProgress(40)

      const createResponse = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!createResponse.ok) {
        throw new Error('Failed to create site')
      }

      const { siteId } = await createResponse.json()

      await new Promise((resolve) => setTimeout(resolve, 600))
      updateStepStatus(1, 'completed')
      setProgress(66)
      setCurrentStep(2)

      // Step 3: Start initial crawl (100%)
      updateStepStatus(2, 'active')
      setProgress(75)

      const crawlResponse = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'CRAWL_SITE',
          siteId,
        }),
      })

      if (!crawlResponse.ok) {
        throw new Error('Failed to start initial scan')
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
      updateStepStatus(2, 'completed')
      setProgress(100)

      // Success!
      toast.success('Site connected successfully!', {
        description: 'Your site is being scanned for SEO issues.',
      })

      // Redirect after a brief delay
      setTimeout(() => {
        router.push(`/dashboard/sites/${siteId}`)
      }, 1500)
    } catch (error) {
      // Mark current step as error
      if (currentStep >= 0) {
        updateStepStatus(currentStep, 'error')
      }

      toast.error('Failed to connect site', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <div>
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={formData.platform}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, platform: value as Platform }))
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHOPIFY">Shopify</SelectItem>
                <SelectItem value="WORDPRESS">WordPress</SelectItem>
                <SelectItem value="MAGICJS">Custom Site (Magic.js)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Platform-specific credentials */}
          {formData.platform === 'WORDPRESS' && (
            <>
              <div>
                <Label htmlFor="username">WordPress Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  disabled={isSubmitting}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      credentials: {
                        ...prev.credentials,
                        username: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Application Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="xxxx xxxx xxxx xxxx"
                  disabled={isSubmitting}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      credentials: {
                        ...prev.credentials,
                        password: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>
            </>
          )}
        </div>

        {/* Progress Section */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
            >
              {/* Overall Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Connecting site...</span>
                  <span className="text-white font-medium">{progress}%</span>
                </div>
                <Progress value={progress} variant="gradient" animated showGlow />
              </div>

              {/* Step List */}
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${
                        step.status === 'active'
                          ? 'bg-blue-500/10 border border-blue-500/20'
                          : step.status === 'completed'
                            ? 'bg-green-500/10 border border-green-500/20'
                            : step.status === 'error'
                              ? 'bg-red-500/10 border border-red-500/20'
                              : 'bg-white/5 border border-white/10'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {step.status === 'completed' ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </motion.div>
                      ) : step.status === 'active' ? (
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                      ) : step.status === 'error' ? (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`
                      text-sm
                      ${
                        step.status === 'completed'
                          ? 'text-green-400'
                          : step.status === 'active'
                            ? 'text-blue-400'
                            : step.status === 'error'
                              ? 'text-red-400'
                              : 'text-white/40'
                      }
                    `}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
          disabled={isSubmitting || !formData.url}
        >
          {isSubmitting ? 'Connecting...' : 'Connect Site'}
        </Button>
      </form>
    </div>
  )
}
