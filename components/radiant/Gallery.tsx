'use client'

import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Image from 'next/image'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
}

export interface GalleryProps {
  images: GalleryImage[]
  variant?: 'grid' | 'masonry' | 'carousel' | 'justified' | 'minimal' | 'modern'
  columns?: 2 | 3 | 4 | 5
  gap?: 'sm' | 'md' | 'lg'
  lightbox?: boolean
  showTitles?: boolean
  filterByCategory?: boolean
  className?: string
}

export function Gallery({
  images,
  variant = 'grid',
  columns = 3,
  gap = 'md',
  lightbox = true,
  showTitles = false,
  filterByCategory = false,
  className = '',
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = filterByCategory
    ? (['all', ...Array.from(new Set(images.map((img) => img.category).filter((cat): cat is string => cat !== undefined)))] as string[])
    : []

  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    if (lightbox) {
      setSelectedImage(index)
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
  }

  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1)
  }

  const getGapClasses = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2'
      case 'lg':
        return 'gap-8'
      default:
        return 'gap-4'
    }
  }

  const getGridClasses = () => {
    const colsMap = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    }

    switch (variant) {
      case 'masonry':
        return `columns-1 md:columns-${columns}`
      case 'carousel':
        return 'flex overflow-x-auto'
      case 'justified':
        return 'flex flex-wrap justify-center'
      default:
        return `grid ${colsMap[columns]}`
    }
  }

  const gapClasses = getGapClasses()
  const gridClasses = getGridClasses()

  return (
    <>
      <div className={`rt-gallery ${className}`}>
        {/* Category Filter */}
        {filterByCategory && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2 rounded-full font-medium transition-all
                  ${
                    selectedCategory === category
                      ? 'bg-[#3898ec] text-white shadow-md'
                      : 'bg-gray-100 text-[#6d6d6d] hover:bg-gray-200'
                  }
                `}
              >
                {category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className={`${gridClasses} ${gapClasses}`}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`
                rt-gallery-item group relative overflow-hidden cursor-pointer
                ${variant === 'masonry' ? 'mb-4 break-inside-avoid' : ''}
                ${variant === 'carousel' ? 'flex-shrink-0 w-80' : ''}
                ${variant === 'modern' ? 'rounded-xl' : 'rounded-lg'}
              `}
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`
                    object-cover transition-transform duration-300
                    ${variant !== 'minimal' ? 'group-hover:scale-110' : ''}
                  `}
                />

                {/* Hover Overlay */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
                    transition-opacity duration-300
                    ${showTitles || lightbox ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}
                    flex flex-col justify-end p-4
                  `}
                >
                  {lightbox && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <ZoomIn className="w-12 h-12 text-white" />
                    </div>
                  )}

                  {showTitles && image.title && (
                    <div className="text-white">
                      <h4 className="font-semibold text-lg mb-1">{image.title}</h4>
                      {image.description && (
                        <p className="text-sm text-white/80">{image.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Arrows */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-7xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ maxHeight: '85vh' }}>
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="w-full h-full object-contain rounded-lg"
                style={{ maxHeight: '85vh' }}
              />
            </div>

            {/* Image Info */}
            {(filteredImages[selectedImage].title || filteredImages[selectedImage].description) && (
              <div className="mt-4 text-center text-white">
                {filteredImages[selectedImage].title && (
                  <h3 className="text-2xl font-semibold mb-2">
                    {filteredImages[selectedImage].title}
                  </h3>
                )}
                {filteredImages[selectedImage].description && (
                  <p className="text-white/80">{filteredImages[selectedImage].description}</p>
                )}
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium">
                {selectedImage + 1} / {filteredImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .rt-gallery-item {
          transition: transform 0.3s ease;
        }

        .rt-gallery-item:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </>
  )
}

// Portfolio Gallery - Specialized gallery for portfolio work
export interface PortfolioItem {
  id: string
  image: string
  title: string
  category: string
  description: string
  link?: string
}

export interface PortfolioGalleryProps {
  items: PortfolioItem[]
  columns?: GalleryProps['columns']
  className?: string
}

export function PortfolioGallery({ items, columns = 3, className = '' }: PortfolioGalleryProps) {
  const images: GalleryImage[] = items.map((item) => ({
    id: item.id,
    src: item.image,
    alt: item.title,
    title: item.title,
    description: item.description,
    category: item.category,
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="text-center mb-12">
          <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">Our Work</h2>
          <p className="text-[#6d6d6d] text-lg">
            Explore our latest projects and creative solutions
          </p>
        </div>

        <Gallery
          images={images}
          variant="modern"
          columns={columns}
          lightbox
          showTitles
          filterByCategory
        />
      </div>
    </section>
  )
}

// Image Grid - Simple image grid without lightbox
export interface ImageGridProps {
  images: Array<{ id: string; src: string; alt: string }>
  columns?: GalleryProps['columns']
  gap?: GalleryProps['gap']
  rounded?: boolean
  className?: string
}

export function ImageGrid({
  images,
  columns = 4,
  gap = 'md',
  rounded = true,
  className = '',
}: ImageGridProps) {
  return (
    <div className={className}>
      <Gallery
        images={images.map((img) => ({ ...img, title: '', description: '' }))}
        variant={rounded ? 'modern' : 'grid'}
        columns={columns}
        gap={gap}
        lightbox={false}
        showTitles={false}
      />
    </div>
  )
}
