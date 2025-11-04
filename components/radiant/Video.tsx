'use client'

import React, { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react'

export interface VideoProps {
  src: string
  poster?: string
  title?: string
  description?: string
  variant?: 'default' | 'card' | 'hero' | 'minimal' | 'modern'
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9'
  lightbox?: boolean
  className?: string
}

export function Video({
  src,
  poster,
  title,
  description,
  variant = 'default',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  aspectRatio = '16/9',
  lightbox = false,
  className = '',
}: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [showLightbox, setShowLightbox] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const openLightbox = () => {
    if (lightbox) {
      setShowLightbox(true)
      if (videoRef.current) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const closeLightbox = () => {
    setShowLightbox(false)
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const getAspectRatio = () => {
    switch (aspectRatio) {
      case '4/3':
        return 'aspect-[4/3]'
      case '1/1':
        return 'aspect-square'
      case '21/9':
        return 'aspect-[21/9]'
      default:
        return 'aspect-video'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow'
      case 'hero':
        return 'rounded-2xl overflow-hidden shadow-2xl'
      case 'minimal':
        return 'rounded-lg overflow-hidden'
      case 'modern':
        return 'rounded-xl overflow-hidden border-4 border-[#3898ec] shadow-xl'
      default:
        return 'rounded-lg overflow-hidden'
    }
  }

  const variantClasses = getVariantClasses()
  const aspectClasses = getAspectRatio()

  return (
    <>
      <div className={`rt-video ${className}`}>
        {(title || description) && (
          <div className="mb-6 text-center">
            {title && <h3 className="text-[#150438] font-semibold text-2xl mb-2">{title}</h3>}
            {description && <p className="text-[#6d6d6d] leading-relaxed">{description}</p>}
          </div>
        )}

        <div
          className={`rt-video-container ${variantClasses} ${aspectClasses} relative group`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            className="w-full h-full object-cover"
            onClick={togglePlay}
          />

          {/* Overlay controls */}
          {controls && (
            <div
              className={`
                absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                transition-opacity duration-300
                ${isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {/* Center play/pause button */}
              <button
                onClick={togglePlay}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  bg-white/90 hover:bg-white w-16 h-16 rounded-full
                  flex items-center justify-center shadow-xl
                  transition-all hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-[#150438]" fill="#150438" />
                ) : (
                  <Play className="w-8 h-8 text-[#150438] ml-1" fill="#150438" />
                )}
              </button>

              {/* Bottom controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-[#150438]" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-[#150438]" />
                  )}
                </button>

                {lightbox && (
                  <button
                    onClick={openLightbox}
                    className="bg-white/90 hover:bg-white p-2 rounded-full transition-all ml-auto"
                  >
                    <Maximize className="w-5 h-5 text-[#150438]" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <video
              src={src}
              controls
              autoPlay
              className="w-full rounded-lg"
              style={{ maxHeight: '90vh' }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .rt-video-container video {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

// YouTube Embed component
export interface YouTubeVideoProps {
  videoId: string
  title?: string
  description?: string
  variant?: VideoProps['variant']
  aspectRatio?: VideoProps['aspectRatio']
  autoPlay?: boolean
  className?: string
}

export function YouTubeVideo({
  videoId,
  title,
  description,
  variant = 'default',
  aspectRatio = '16/9',
  autoPlay = false,
  className = '',
}: YouTubeVideoProps) {
  const [showVideo, setShowVideo] = useState(autoPlay)

  const getAspectRatio = () => {
    switch (aspectRatio) {
      case '4/3':
        return 'aspect-[4/3]'
      case '1/1':
        return 'aspect-square'
      case '21/9':
        return 'aspect-[21/9]'
      default:
        return 'aspect-video'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow'
      case 'hero':
        return 'rounded-2xl overflow-hidden shadow-2xl'
      case 'minimal':
        return 'rounded-lg overflow-hidden'
      case 'modern':
        return 'rounded-xl overflow-hidden border-4 border-[#3898ec] shadow-xl'
      default:
        return 'rounded-lg overflow-hidden'
    }
  }

  return (
    <div className={`rt-youtube-video ${className}`}>
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && <h3 className="text-[#150438] font-semibold text-2xl mb-2">{title}</h3>}
          {description && <p className="text-[#6d6d6d] leading-relaxed">{description}</p>}
        </div>
      )}

      <div className={`${getVariantClasses()} ${getAspectRatio()} relative group`}>
        {!showVideo ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title || 'Video thumbnail'}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowVideo(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                bg-red-600 hover:bg-red-700 w-20 h-20 rounded-full
                flex items-center justify-center shadow-2xl
                transition-all hover:scale-110"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </button>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  )
}

// Video Hero Section
export interface VideoHeroProps {
  src: string
  poster?: string
  title: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
  overlay?: boolean
  className?: string
}

export function VideoHero({
  src,
  poster,
  title,
  subtitle,
  ctaText,
  onCtaClick,
  overlay = true,
  className = '',
}: VideoHeroProps) {
  return (
    <section className={`rt-component-section relative p-0 ${className}`}>
      <div className="relative h-[600px] overflow-hidden">
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {overlay && <div className="absolute inset-0 bg-black/50" />}

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-6xl font-bold mb-6 leading-tight">{title}</h1>
            {subtitle && <p className="text-2xl mb-8 text-white/90">{subtitle}</p>}
            {ctaText && onCtaClick && (
              <button
                onClick={onCtaClick}
                className="bg-[#3898ec] hover:bg-[#2563eb] text-white font-semibold
                  px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 shadow-2xl"
              >
                {ctaText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
