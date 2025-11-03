'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScrollSnapCarouselProps {
  children: ReactNode[]
  showControls?: boolean
  autoScroll?: boolean
  interval?: number
}

export function ScrollSnapCarousel({
  children,
  showControls = false,
  autoScroll = false,
  interval = 5000,
}: ScrollSnapCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Track scroll position to update current index
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const itemWidth = container.offsetWidth
      const index = Math.round(scrollLeft / itemWidth)
      setCurrentIndex(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto scroll functionality
  useEffect(() => {
    if (!autoScroll) return

    const timer = setInterval(() => {
      const container = scrollRef.current
      if (!container) return

      const nextIndex = (currentIndex + 1) % children.length
      scrollToIndex(nextIndex)
    }, interval)

    return () => clearInterval(timer)
  }, [autoScroll, currentIndex, children.length, interval])

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container) return

    const itemWidth = container.offsetWidth
    container.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    })
  }

  const scrollPrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1
    scrollToIndex(prevIndex)
  }

  const scrollNext = () => {
    const nextIndex = (currentIndex + 1) % children.length
    scrollToIndex(nextIndex)
  }

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div
        ref={scrollRef}
        className="
          flex overflow-x-auto
          snap-x snap-mandatory
          scrollbar-hide no-scrollbar
          -mx-4 px-4
          gap-4
        "
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="
              snap-center
              flex-shrink-0
              w-[85vw] sm:w-[400px]
            "
          >
            {child}
          </div>
        ))}
      </div>

      {/* Desktop controls */}
      {showControls && (
        <>
          <button
            onClick={scrollPrev}
            className="
              hidden md:flex
              absolute left-4 top-1/2 -translate-y-1/2
              bg-gray-900/90 backdrop-blur-sm
              border border-gray-700
              rounded-full
              p-2
              text-white
              hover:bg-gray-800
              transition-colors
              z-10
            "
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollNext}
            className="
              hidden md:flex
              absolute right-4 top-1/2 -translate-y-1/2
              bg-gray-900/90 backdrop-blur-sm
              border border-gray-700
              rounded-full
              p-2
              text-white
              hover:bg-gray-800
              transition-colors
              z-10
            "
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`
              h-2 rounded-full transition-all duration-200
              ${index === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-gray-700'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
