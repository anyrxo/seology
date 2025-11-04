'use client'

import { useState, useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton } from './Skeleton'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: string
  showSkeleton?: boolean
  skeletonClassName?: string
  lazy?: boolean
  blur?: boolean
}

export function OptimizedImage({
  src,
  alt,
  fallback = '/images/placeholder.png',
  showSkeleton = true,
  skeletonClassName = '',
  lazy = true,
  blur = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(!lazy)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [lazy])

  const handleLoad = () => {
    setIsLoading(false)
    setError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading && showSkeleton && !error && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 ${skeletonClassName}`}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </motion.div>
        )}
      </AnimatePresence>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: error ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={error ? fallback : src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            loading={lazy ? 'lazy' : 'eager'}
            placeholder={blur ? 'blur' : 'empty'}
            blurDataURL={
              blur
                ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
                : undefined
            }
            className={className}
            {...props}
          />
        </motion.div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
          <div className="text-center">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-gray-500">Image not available</p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Mobile-optimized avatar with automatic fallback
 */
export function MobileAvatar({
  src,
  alt,
  size = 40,
  fallbackInitial,
}: {
  src?: string
  alt: string
  size?: number
  fallbackInitial?: string
}) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className="flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"
        style={{ width: size, height: size }}
      >
        <span className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
          {fallbackInitial || alt.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div className="relative rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  )
}

/**
 * Responsive image that serves different sizes based on viewport
 */
export function ResponsiveImage({
  src,
  alt,
  mobileSrc,
  desktopSrc,
  className = '',
  ...props
}: OptimizedImageProps & {
  mobileSrc?: string
  desktopSrc?: string
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const imageSrc = isMobile && mobileSrc ? mobileSrc : desktopSrc || src

  return <OptimizedImage src={imageSrc} alt={alt} className={className} {...props} />
}

/**
 * Image with progressive blur effect
 */
export function ProgressiveImage({
  src,
  alt,
  lowQualitySrc,
  className = '',
  ...props
}: OptimizedImageProps & {
  lowQualitySrc?: string
}) {
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Low quality placeholder */}
      {lowQualitySrc && !isHighQualityLoaded && (
        <div className="absolute inset-0">
          <Image
            src={lowQualitySrc}
            alt={alt}
            fill
            className="object-cover blur-sm scale-105"
            {...props}
          />
        </div>
      )}

      {/* High quality image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHighQualityLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onLoad={() => setIsHighQualityLoaded(true)}
          {...props}
        />
      </motion.div>
    </div>
  )
}
