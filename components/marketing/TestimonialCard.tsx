'use client'

import { motion } from 'framer-motion'
import { defaultViewport } from '@/lib/animations'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  delay?: number
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: '0 0 40px rgba(255, 255, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5)',
      }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group"
    >
      <div className="flex items-start mb-6">
        <div className="text-white/40 text-6xl leading-none mr-3 font-serif group-hover:text-white/60 transition-colors">
          "
        </div>
        <p className="text-white/80 italic text-lg leading-relaxed pt-2 group-hover:text-white transition-colors">
          {quote}
        </p>
      </div>
      <div className="flex items-center mt-6 pt-6 border-t border-white/10">
        <motion.div
          className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center text-white font-bold text-xl ring-2 ring-white/10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {author.charAt(0)}
        </motion.div>
        <div className="ml-4">
          <p className="text-white font-bold text-lg">{author}</p>
          <p className="text-white/50 text-sm">
            {role} at {company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
