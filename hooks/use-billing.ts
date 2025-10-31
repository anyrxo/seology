'use client'

import { useState, useEffect } from 'react'
import type { BillingData } from '@/types/billing'

/**
 * Custom hook for accessing billing data and subscription information
 */
export function useBilling() {
  const [data, setData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBillingData()
  }, [])

  async function fetchBillingData() {
    try {
      setLoading(true)
      const response = await fetch('/api/billing/subscription')

      if (!response.ok) {
        throw new Error('Failed to fetch billing data')
      }

      const billingData = await response.json()
      setData(billingData)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching billing data:', err)
      setError(err.message || 'Failed to load billing information')
    } finally {
      setLoading(false)
    }
  }

  async function refetch() {
    await fetchBillingData()
  }

  return {
    data,
    loading,
    error,
    refetch,
  }
}

/**
 * Custom hook for subscription actions
 */
export function useSubscription() {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function createCheckout(priceId: string, planName: string) {
    setProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, planName }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (err: any) {
      console.error('Error creating checkout:', err)
      setError(err.message || 'Failed to start checkout')
      setProcessing(false)
    }
  }

  async function openPortal() {
    setProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (err: any) {
      console.error('Error opening portal:', err)
      setError(err.message || 'Failed to open billing portal')
      setProcessing(false)
    }
  }

  return {
    createCheckout,
    openPortal,
    processing,
    error,
  }
}
