'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

interface ComingSoonProps {
  title: string
  description: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6">
                <Bell className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg font-semibold border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xl">
            <p className="text-sm text-gray-400">
              Want to be notified when this page is ready?{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                Get in touch
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
