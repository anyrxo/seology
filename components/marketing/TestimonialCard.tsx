'use client'

import { motion } from 'framer-motion'

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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-6"
    >
      <div className="flex items-start mb-4">
        <div className="text-blue-500 text-4xl leading-none mr-2">"</div>
        <p className="text-gray-300 italic">{quote}</p>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {author.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-white font-semibold">{author}</p>
          <p className="text-gray-400 text-sm">
            {role} at {company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
