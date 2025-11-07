/**
 * ProductPicker Component
 *
 * Reusable component for selecting products using Shopify's resource picker
 * Uses App Bridge API to open native Shopify product selection UI
 *
 * @example
 * <ProductPicker
 *   onSelect={(products) => console.log(products)}
 *   multiple={true}
 *   buttonLabel="Select Products"
 * />
 */

'use client'

import { useState } from 'react'
import { openResourcePicker } from '@/lib/shopify-app-bridge'

export interface PickedProduct {
  id: string
  title: string
  handle: string
  images?: Array<{
    originalSrc: string
    altText?: string
  }>
  variants?: Array<{
    id: string
    title: string
    price: string
  }>
}

interface ProductPickerProps {
  onSelect: (products: PickedProduct[]) => void
  multiple?: boolean
  buttonLabel?: string
  disabled?: boolean
  className?: string
}

export function ProductPicker({
  onSelect,
  multiple = false,
  buttonLabel = 'Select Products',
  disabled = false,
  className = '',
}: ProductPickerProps) {
  const [loading, setLoading] = useState(false)

  const handlePick = async () => {
    setLoading(true)
    try {
      const products = await openResourcePicker({
        type: 'product',
        multiple,
      })

      if (products && products.length > 0) {
        onSelect(products as PickedProduct[])
      }
    } catch (error) {
      console.error('Product picker error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePick}
      disabled={disabled || loading}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium ${className}`}
    >
      {loading ? 'Opening...' : buttonLabel}
    </button>
  )
}

/**
 * CollectionPicker Component
 *
 * Similar to ProductPicker but for collections
 */
export interface PickedCollection {
  id: string
  title: string
  handle: string
  image?: {
    originalSrc: string
    altText?: string
  }
}

interface CollectionPickerProps {
  onSelect: (collections: PickedCollection[]) => void
  multiple?: boolean
  buttonLabel?: string
  disabled?: boolean
  className?: string
}

export function CollectionPicker({
  onSelect,
  multiple = false,
  buttonLabel = 'Select Collections',
  disabled = false,
  className = '',
}: CollectionPickerProps) {
  const [loading, setLoading] = useState(false)

  const handlePick = async () => {
    setLoading(true)
    try {
      const collections = await openResourcePicker({
        type: 'collection',
        multiple,
      })

      if (collections && collections.length > 0) {
        onSelect(collections as PickedCollection[])
      }
    } catch (error) {
      console.error('Collection picker error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePick}
      disabled={disabled || loading}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium ${className}`}
    >
      {loading ? 'Opening...' : buttonLabel}
    </button>
  )
}
