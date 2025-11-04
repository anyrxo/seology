'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageCircle, HelpCircle, Sparkles, Send, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const contactOptions = [
    {
      icon: HelpCircle,
      title: 'Support',
      description: 'Get help with technical issues',
      email: 'support@seology.ai',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageCircle,
      title: 'Sales',
      description: 'Questions about pricing or plans',
      email: 'sales@seology.ai',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: 'Partnerships',
      description: 'Explore collaboration opportunities',
      email: 'partners@seology.ai',
      gradient: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                Contact Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-1"
              >
                Get in touch with our team
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Options Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative bg-white rounded-2xl border border-gray-200 p-8 text-center h-full overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 0.05 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${option.gradient}`}
                />

                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <option.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <motion.a
                    href={`mailto:${option.email}`}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gradient-to-r ${option.gradient} bg-clip-text text-transparent hover:underline font-semibold`}
                  >
                    {option.email}
                  </motion.a>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} opacity-20 -z-10`}
                  style={{ padding: '2px' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            Send Us a Message
          </h2>
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                animate={{
                  scale: focusedField === 'name' ? 1.02 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </motion.div>
              <motion.div
                animate={{
                  scale: focusedField === 'email' ? 1.02 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
            </div>
            <motion.div
              animate={{
                scale: focusedField === 'subject' ? 1.02 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="How can we help?"
                required
              />
            </motion.div>
            <motion.div
              animate={{
                scale: focusedField === 'message' ? 1.02 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                placeholder="Tell us more about your inquiry..."
                required
              />
            </motion.div>
            <div className="text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Star className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Check out our comprehensive documentation and guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Visit Help Center
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  View Guides
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
