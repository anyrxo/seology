'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { defaultViewport } from '@/lib/animations'

interface CTASectionProps {
  title: string
  description: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

const MagneticCTAButton = ({
  children,
  href,
  variant = 'primary',
}: {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
}) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center h-12 px-8 rounded-lg font-bold text-base transition-all duration-300 ${
        variant === 'primary'
          ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]'
          : 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60'
      }`}
    >
      {children}
    </motion.a>
  )
}

export default function CTASection({
  title,
  description,
  primaryCTA = { text: 'Start Free Trial', href: '/sign-up' },
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-white/5 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto text-center z-10"
      >
        <motion.h2
          className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticCTAButton href={primaryCTA.href} variant="primary">
            {primaryCTA.text}
            <ArrowRight className="ml-2 w-5 h-5" />
          </MagneticCTAButton>
          {secondaryCTA && (
            <MagneticCTAButton href={secondaryCTA.href} variant="secondary">
              {secondaryCTA.text}
            </MagneticCTAButton>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
