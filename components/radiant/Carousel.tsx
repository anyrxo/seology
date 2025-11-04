'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export interface CarouselItem {
  id: string
  image?: string
  title?: string
  description?: string
  content?: React.ReactNode
}

export interface CarouselProps {
  items: CarouselItem[]
  variant?: 'default' | 'card' | 'fade' | 'stack' | 'minimal' | 'modern'
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

export function Carousel({
  items,
  variant = 'default',
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const goToPrevious = useCallback(() => {
    const index = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    goToSlide(index)
  }, [currentIndex, items.length, goToSlide])

  const goToNext = useCallback(() => {
    const index = currentIndex === items.length - 1 ? 0 : currentIndex + 1
    goToSlide(index)
  }, [currentIndex, items.length, goToSlide])

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, goToNext])

  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return {
          container: 'relative rounded-2xl overflow-hidden shadow-2xl',
          slide: 'absolute inset-0 transition-transform duration-500 ease-in-out',
          content: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white',
        }
      case 'fade':
        return {
          container: 'relative rounded-lg overflow-hidden',
          slide: 'absolute inset-0 transition-opacity duration-700 ease-in-out',
          content: 'absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6',
        }
      case 'stack':
        return {
          container: 'relative perspective-1000',
          slide: 'absolute inset-0 transition-all duration-500 ease-out',
          content: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#150438] to-transparent p-6 text-white',
        }
      case 'minimal':
        return {
          container: 'relative',
          slide: 'absolute inset-0 transition-transform duration-400 ease-in-out',
          content: 'mt-4 text-center',
        }
      case 'modern':
        return {
          container: 'relative rounded-xl overflow-hidden border-4 border-[#3898ec]',
          slide: 'absolute inset-0 transition-transform duration-600 cubic-bezier(0.4, 0, 0.2, 1)',
          content: 'absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 border-t-2 border-[#3898ec]',
        }
      default:
        return {
          container: 'relative rounded-lg overflow-hidden',
          slide: 'absolute inset-0 transition-transform duration-500 ease-in-out',
          content: 'absolute bottom-0 left-0 right-0 bg-white/90 p-6',
        }
    }
  }

  const variantClasses = getVariantClasses()

  return (
    <div className={`rt-carousel ${className}`}>
      <div className={`${variantClasses.container} aspect-video relative`}>
        {/* Slides */}
        <div className="relative w-full h-full">
          {items.map((item, index) => {
            const isActive = index === currentIndex
            const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === items.length - 1)
            const isNext = index === currentIndex + 1 || (currentIndex === items.length - 1 && index === 0)

            let transformClass = ''
            if (variant === 'fade') {
              transformClass = isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } else if (variant === 'stack') {
              transformClass = isActive
                ? 'z-30 scale-100 opacity-100'
                : isPrev || isNext
                ? 'z-20 scale-95 opacity-60'
                : 'z-10 scale-90 opacity-30'
            } else {
              transformClass = isActive
                ? 'translate-x-0 z-10'
                : index < currentIndex
                ? '-translate-x-full z-0'
                : 'translate-x-full z-0'
            }

            return (
              <div
                key={item.id}
                className={`${variantClasses.slide} ${transformClass}`}
              >
                {item.image && (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title || `Slide ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {item.content && <div className="w-full h-full">{item.content}</div>}

                {(item.title || item.description) && (
                  <div className={variantClasses.content}>
                    {item.title && (
                      <h3 className="text-2xl font-semibold mb-2 text-[#150438]">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-[#6d6d6d] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows */}
        {showArrows && (
          <>
            <button
              onClick={goToPrevious}
              className="rt-carousel-arrow rt-carousel-arrow-prev absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-[#150438]" />
            </button>
            <button
              onClick={goToNext}
              className="rt-carousel-arrow rt-carousel-arrow-next absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-[#150438]" />
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {showDots && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rt-carousel-dot w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#3898ec] w-8'
                    : 'bg-white/60 hover:bg-white/90'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .rt-carousel-arrow:hover {
          box-shadow: 0 4px 20px rgba(56, 152, 236, 0.3);
        }

        .rt-carousel-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }
      `}</style>
    </div>
  )
}

// Testimonial Carousel variant
export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  avatar?: string
  company?: string
}

export interface TestimonialCarouselProps {
  testimonials: TestimonialItem[]
  autoPlay?: boolean
  interval?: number
  className?: string
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 7000,
  className = '',
}: TestimonialCarouselProps) {
  const items: CarouselItem[] = testimonials.map((testimonial) => ({
    id: testimonial.id,
    content: (
      <div className="flex flex-col items-center justify-center h-full p-12 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-3xl text-center">
          <div className="text-6xl text-[#3898ec] mb-6">&ldquo;</div>
          <p className="text-2xl text-[#150438] font-light mb-8 leading-relaxed">
            {testimonial.quote}
          </p>
          <div className="flex items-center justify-center gap-4">
            {testimonial.avatar && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image src={testimonial.avatar} alt={testimonial.author} fill className="object-cover" />
              </div>
            )}
            <div className="text-left">
              <div className="text-lg font-semibold text-[#150438]">{testimonial.author}</div>
              <div className="text-sm text-[#6d6d6d]">
                {testimonial.role}
                {testimonial.company && ` at ${testimonial.company}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <Carousel
          items={items}
          variant="fade"
          autoPlay={autoPlay}
          interval={interval}
          showDots
          showArrows
        />
      </div>
    </section>
  )
}
