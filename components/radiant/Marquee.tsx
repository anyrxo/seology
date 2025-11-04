'use client'

import React from 'react'
import Image from 'next/image'

export interface MarqueeItem {
  id: string
  content: React.ReactNode
}

export interface MarqueeProps {
  items: MarqueeItem[]
  variant?: 'default' | 'gradient' | 'card' | 'minimal'
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
  pauseOnHover?: boolean
  gap?: number
  className?: string
}

export function Marquee({
  items,
  variant = 'default',
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  gap = 40,
  className = '',
}: MarqueeProps) {
  const getSpeedDuration = () => {
    switch (speed) {
      case 'slow':
        return '60s'
      case 'fast':
        return '20s'
      default:
        return '40s'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-[#3898ec]/10 to-[#2563eb]/10 py-8'
      case 'card':
        return 'bg-white py-8 shadow-md'
      case 'minimal':
        return 'py-6'
      default:
        return 'bg-gray-50 py-8'
    }
  }

  const variantClasses = getVariantClasses()
  const duration = getSpeedDuration()
  const animationDirection = direction === 'left' ? 'scroll-left' : 'scroll-right'

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items]

  return (
    <div className={`rt-marquee overflow-hidden ${variantClasses} ${className}`}>
      <div
        className={`rt-marquee-content flex items-center ${pauseOnHover ? 'hover:pause' : ''}`}
        style={{
          gap: `${gap}px`,
          animation: `${animationDirection} ${duration} linear infinite`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="rt-marquee-item flex-shrink-0">
            {item.content}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .rt-marquee-content.hover\\:pause:hover {
          animation-play-state: paused;
        }

        .rt-marquee-item {
          transition: transform 0.3s ease;
        }

        .rt-marquee-content:hover .rt-marquee-item {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}

// Logo Marquee - For showcasing client logos
export interface LogoItem {
  id: string
  src: string
  alt: string
  width?: number
  height?: number
}

export interface LogoMarqueeProps {
  logos: LogoItem[]
  title?: string
  description?: string
  direction?: MarqueeProps['direction']
  speed?: MarqueeProps['speed']
  className?: string
}

export function LogoMarquee({
  logos,
  title,
  description,
  direction = 'left',
  speed = 'normal',
  className = '',
}: LogoMarqueeProps) {
  const items: MarqueeItem[] = logos.map((logo) => ({
    id: logo.id,
    content: (
      <div className="flex items-center justify-center px-8 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width || 120}
          height={logo.height || 60}
          className="object-contain grayscale hover:grayscale-0 transition-all"
        />
      </div>
    ),
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">{title}</h2>
            )}
            {description && <p className="text-[#6d6d6d] text-lg">{description}</p>}
          </div>
        )}

        <Marquee items={items} variant="minimal" direction={direction} speed={speed} gap={60} />
      </div>
    </section>
  )
}

// Testimonial Marquee - Scrolling testimonials
export interface TestimonialMarqueeItem {
  id: string
  quote: string
  author: string
  role: string
  avatar?: string
}

export interface TestimonialMarqueeProps {
  testimonials: TestimonialMarqueeItem[]
  direction?: MarqueeProps['direction']
  speed?: MarqueeProps['speed']
  className?: string
}

export function TestimonialMarquee({
  testimonials,
  direction = 'left',
  speed = 'slow',
  className = '',
}: TestimonialMarqueeProps) {
  const items: MarqueeItem[] = testimonials.map((testimonial) => ({
    id: testimonial.id,
    content: (
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
        <div className="text-[#3898ec] text-4xl mb-3">&ldquo;</div>
        <p className="text-[#6d6d6d] mb-4 leading-relaxed line-clamp-4">{testimonial.quote}</p>
        <div className="flex items-center gap-3">
          {testimonial.avatar && (
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image src={testimonial.avatar} alt={testimonial.author} fill className="object-cover" />
            </div>
          )}
          <div>
            <div className="font-semibold text-[#150438]">{testimonial.author}</div>
            <div className="text-sm text-[#6d6d6d]">{testimonial.role}</div>
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="text-center mb-12">
        <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">
          What Our Clients Say
        </h2>
        <p className="text-[#6d6d6d] text-lg">
          Don&apos;t just take our word for it - hear from our satisfied customers
        </p>
      </div>

      <Marquee items={items} variant="gradient" direction={direction} speed={speed} gap={40} />
    </section>
  )
}

// Feature Marquee - Scrolling feature highlights
export interface Feature {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

export interface FeatureMarqueeProps {
  features: Feature[]
  direction?: MarqueeProps['direction']
  speed?: MarqueeProps['speed']
  className?: string
}

export function FeatureMarquee({
  features,
  direction = 'right',
  speed = 'normal',
  className = '',
}: FeatureMarqueeProps) {
  const items: MarqueeItem[] = features.map((feature) => ({
    id: feature.id,
    content: (
      <div className="bg-white p-6 rounded-xl border-2 border-[#3898ec]/20 hover:border-[#3898ec] transition-colors shadow-sm hover:shadow-lg min-w-[300px]">
        <div className="text-[#3898ec] mb-4">{feature.icon}</div>
        <h4 className="text-[#150438] font-semibold text-lg mb-2">{feature.title}</h4>
        <p className="text-[#6d6d6d] text-sm leading-relaxed">{feature.description}</p>
      </div>
    ),
  }))

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="text-center mb-12">
        <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">
          Powerful Features
        </h2>
        <p className="text-[#6d6d6d] text-lg">Everything you need to succeed</p>
      </div>

      <Marquee items={items} variant="minimal" direction={direction} speed={speed} gap={30} />
    </section>
  )
}

// Stats Marquee - Scrolling statistics/achievements
export interface StatItem {
  id: string
  value: string
  label: string
  icon?: React.ReactNode
}

export interface StatsMarqueeProps {
  stats: StatItem[]
  direction?: MarqueeProps['direction']
  speed?: MarqueeProps['speed']
  className?: string
}

export function StatsMarquee({
  stats,
  direction = 'left',
  speed = 'slow',
  className = '',
}: StatsMarqueeProps) {
  const items: MarqueeItem[] = stats.map((stat) => ({
    id: stat.id,
    content: (
      <div className="bg-gradient-to-br from-[#3898ec] to-[#2563eb] p-8 rounded-xl text-white text-center min-w-[200px] shadow-xl">
        {stat.icon && <div className="mb-3 flex justify-center">{stat.icon}</div>}
        <div className="text-4xl font-bold mb-2">{stat.value}</div>
        <div className="text-white/90 text-sm font-medium">{stat.label}</div>
      </div>
    ),
  }))

  return (
    <section className={`rt-component-section bg-gray-50 ${className}`}>
      <Marquee items={items} variant="minimal" direction={direction} speed={speed} gap={40} />
    </section>
  )
}
