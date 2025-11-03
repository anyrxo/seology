/**
 * Optimized Image Component
 *
 * Features:
 * - Automatic WebP/AVIF conversion
 * - Lazy loading with blur placeholder
 * - Responsive sizes
 * - Priority loading for above-the-fold images
 */

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes,
  quality = 85,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Generate blur data URL for placeholder
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#1a1a1a" offset="20%" />
          <stop stop-color="#2a2a2a" offset="50%" />
          <stop stop-color="#1a1a1a" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#1a1a1a" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  const imageProps = fill
    ? {
        fill: true,
        sizes: sizes || '100vw',
      }
    : {
        width,
        height,
        sizes,
      }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        quality={quality}
        priority={priority}
        placeholder={priority ? 'empty' : 'blur'}
        blurDataURL={
          priority
            ? undefined
            : `data:image/svg+xml;base64,${toBase64(
                shimmer(width || 700, height || 475)
              )}`
        }
        onLoad={() => setIsLoading(false)}
        style={{
          objectFit,
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoading ? 0.8 : 1,
        }}
      />
    </div>
  )
}

/**
 * Responsive image with automatic srcset
 */
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  className = '',
}: {
  src: string
  alt: string
  aspectRatio?: string
  priority?: boolean
  className?: string
}) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  )
}

/**
 * Avatar image with optimized loading
 */
export function AvatarImage({
  src,
  alt,
  size = 40,
  className = '',
}: {
  src: string
  alt: string
  size?: number
  className?: string
}) {
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={size}
        height={size}
        quality={90}
        objectFit="cover"
      />
    </div>
  )
}
