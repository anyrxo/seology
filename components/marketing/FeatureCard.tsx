'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useRef, useState } from 'react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative bg-black border border-white/10 rounded-lg p-8 overflow-hidden group cursor-pointer"
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      {/* Glass morphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon container with animation */}
      <motion.div
        className="relative w-16 h-16 rounded-lg flex items-center justify-center mb-6 border border-white/10 bg-white/5"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.3 },
          rotate: { duration: 0.5 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(30px)',
        }}
      >
        <Icon className="w-8 h-8 text-white" />

        {/* Icon glow */}
        <motion.div
          className="absolute inset-0 rounded-lg blur-xl bg-white/20"
          animate={{
            opacity: isHovered ? 0.5 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
          {description}
        </p>
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered ? '0 0 30px rgba(255,255,255,0.1), inset 0 0 30px rgba(255,255,255,0.05)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
