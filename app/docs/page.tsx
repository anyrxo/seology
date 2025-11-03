'use client'

/**
 * API Documentation Page
 * Interactive Swagger UI for API exploration
 */

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

interface OpenAPISpec {
  openapi: string
  info: {
    title: string
    version: string
    description: string
    contact?: {
      name?: string
      email?: string
      url?: string
    }
    license?: {
      name: string
      url?: string
    }
  }
  servers: Array<{
    url: string
    description: string
  }>
  paths: Record<string, unknown>
  components?: {
    schemas?: Record<string, unknown>
    securitySchemes?: Record<string, unknown>
  }
  security?: Array<Record<string, string[]>>
  tags?: Array<{
    name: string
    description: string
  }>
}

export default function APIDocsPage() {
  const [spec, setSpec] = useState<OpenAPISpec | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/docs')
      .then((res) => res.json())
      .then((data) => {
        setSpec(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load API spec:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API documentation...</p>
        </div>
      </div>
    )
  }

  if (!spec) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">Failed to load API documentation</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">SEOLOGY.AI API Documentation</h1>
          <p className="text-blue-100 text-lg">
            Interactive API documentation for developers
          </p>
        </div>
      </div>

      {/* Swagger UI */}
      <div className="max-w-7xl mx-auto">
        <SwaggerUI spec={spec} />
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p className="mb-2">
            <strong>Need help?</strong> Contact us at{' '}
            <a href="mailto:support@seology.ai" className="text-blue-600 hover:underline">
              support@seology.ai
            </a>
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} SEOLOGY.AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
