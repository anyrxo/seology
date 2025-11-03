'use client'

import * as React from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ProgressiveImageProps extends Omit<ImageProps, 'onLoad'> {
  placeholderSrc?: string
  showSkeleton?: boolean
  onLoad?: () => void
}

export function ProgressiveImage({
  src,
  alt,
  placeholderSrc,
  showSkeleton = true,
  className,
  onLoad,
  ...props
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading skeleton */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 bg-white/5 shimmer rounded-inherit" />
      )}

      {/* Placeholder blur */}
      {placeholderSrc && isLoading && (
        <Image
          src={placeholderSrc}
          alt={alt}
          {...props}
          className={cn(
            'absolute inset-0 blur-xl scale-110 transition-opacity duration-500',
            isLoading ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Actual image */}
      {!error ? (
        <Image
          src={src}
          alt={alt}
          {...props}
          className={cn(
            'transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={() => {
            setIsLoading(false)
            onLoad?.()
          }}
          onError={() => {
            setIsLoading(false)
            setError(true)
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-white/5 text-white/40 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  )
}

export function ProgressiveBackgroundImage({
  src,
  alt,
  placeholderSrc,
  children,
  className,
}: {
  src: string
  alt: string
  placeholderSrc?: string
  children?: React.ReactNode
  className?: string
}) {
  const [isLoading, setIsLoading] = React.useState(true)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/5 shimmer" />
      )}

      {/* Placeholder */}
      {placeholderSrc && (
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center blur-xl scale-110 transition-opacity duration-500',
            isLoading ? 'opacity-100' : 'opacity-0'
          )}
          style={{ backgroundImage: `url(${placeholderSrc})` }}
        />
      )}

      {/* Actual background */}
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        style={{ backgroundImage: `url(${src})` }}
      />

      {/* Hidden image to trigger load */}
      <img
        src={src}
        alt={alt}
        className="hidden"
        onLoad={() => setIsLoading(false)}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
