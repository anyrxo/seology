'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cookie, Shield, Settings, Target, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CookiesPage() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const cookieTypes = [
    {
      title: 'Essential Cookies',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.',
      items: ['Authentication and session management', 'Security and fraud prevention', 'Load balancing'],
      duration: 'Session or up to 30 days',
    },
    {
      title: 'Performance Cookies',
      icon: Settings,
      gradient: 'from-purple-500 to-pink-500',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
      items: ['Analytics and usage statistics', 'Page load times and performance metrics', 'Error tracking and diagnostics'],
      duration: 'Up to 2 years',
    },
    {
      title: 'Functional Cookies',
      icon: Cookie,
      gradient: 'from-green-500 to-emerald-500',
      description: 'These cookies enable the website to provide enhanced functionality and personalization.',
      items: ['User preferences and settings', 'Language and region preferences', 'Theme preferences (light/dark mode)'],
      duration: 'Up to 1 year',
    },
    {
      title: 'Targeting/Advertising Cookies',
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
      description: 'These cookies may be set through our site by our advertising partners.',
      items: ['Personalized advertising', 'Ad campaign measurement', 'Retargeting and remarketing'],
      duration: 'Up to 2 years',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
              className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg"
            >
              <Cookie className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent"
              >
                Cookie Policy
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mt-1"
              >
                Last updated: January 15, 2025
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
        >
          <p className="text-blue-900 font-semibold mb-2">In Short</p>
          <p className="text-blue-800 text-sm">
            This Cookie Policy explains how SEOLOGY.AI uses cookies and similar technologies to recognize you when you visit our website and use our services. It explains what these technologies are, why we use them, and your rights to control our use of them.
          </p>
        </motion.div>

        {/* What Are Cookies Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            1. What Are Cookies?
          </h2>
          <p className="text-gray-600 mb-4">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p className="text-gray-600">
            Cookies set by the website owner (in this case, SEOLOGY.AI) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>
        </motion.section>

        {/* Types of Cookies Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">
            2. Types of Cookies We Use
          </h2>

          <div className="space-y-6">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onHoverStart={() => setHoveredSection(`cookie-${index}`)}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative bg-white rounded-2xl border border-gray-200 p-6 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredSection === `cookie-${index}` ? 0.05 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-br ${type.gradient}`}
                  />

                  {hoveredSection === `cookie-${index}` && (
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
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{
                          rotate: hoveredSection === `cookie-${index}` ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 bg-gradient-to-br ${type.gradient} rounded-xl`}
                      >
                        <type.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{type.description}</p>
                    <ul className="space-y-2 mb-3">
                      {type.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 + i * 0.05 }}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <motion.span
                            animate={{
                              scale: hoveredSection === `cookie-${index}` ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${type.gradient}`}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500">
                      <strong>Duration:</strong> {type.duration}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Third-Party Cookies Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            3. Third-Party Cookies
          </h2>
          <p className="text-gray-600 mb-4">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service and deliver advertisements on and through the Service.
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Third-Party Services We Use:</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                { name: 'Clerk', purpose: 'Authentication and user management' },
                { name: 'Stripe', purpose: 'Payment processing' },
                { name: 'Vercel Analytics', purpose: 'Website performance monitoring' },
                { name: 'Anthropic', purpose: 'AI-powered SEO analysis' },
              ].map((service, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-orange-600 font-bold">•</span>
                  <span>
                    <strong>{service.name}</strong> - {service.purpose}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Your Cookie Choices Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            4. Your Cookie Choices
          </h2>
          <p className="text-gray-600 mb-4">
            If you prefer to avoid the use of cookies on our website, you must first disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Browser Controls:</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                { browser: 'Chrome', path: 'Settings → Privacy and security → Cookies and other site data' },
                { browser: 'Firefox', path: 'Options → Privacy & Security → Cookies and Site Data' },
                { browser: 'Safari', path: 'Preferences → Privacy → Manage Website Data' },
                { browser: 'Edge', path: 'Settings → Cookies and site permissions → Cookies and site data' },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-orange-600 font-bold">•</span>
                  <span>
                    <strong>{item.browser}:</strong> {item.path}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <p className="text-gray-600">
            <strong>Note:</strong> If you choose to disable cookies, some features of our website may not function properly, and you may not be able to access certain areas of the site.
          </p>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            5. Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@seology.ai" className="text-orange-600 hover:text-orange-700 hover:underline">
                privacy@seology.ai
              </a>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Website:</strong>{' '}
              <a href="https://seology.ai" className="text-orange-600 hover:text-orange-700 hover:underline">
                https://seology.ai
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> 123 SEO Street, San Francisco, CA 94102, USA
            </p>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 rounded-3xl p-12 text-center text-white overflow-hidden"
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
              <Shield className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Questions About Our Policies?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Review our Privacy Policy and Terms of Service for more information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Terms of Service
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
