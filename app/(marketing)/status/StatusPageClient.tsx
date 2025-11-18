'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, Activity, Sparkles, Star, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    name: 'API',
    status: 'operational',
    description: 'Core API endpoints',
    uptime: '99.99%',
  },
  {
    name: 'Dashboard',
    status: 'operational',
    description: 'Web application interface',
    uptime: '99.98%',
  },
  {
    name: 'AI Analysis',
    status: 'operational',
    description: 'AI-powered SEO analysis',
    uptime: '99.95%',
  },
  {
    name: 'Shopify Integration',
    status: 'operational',
    description: 'Shopify OAuth and API',
    uptime: '99.97%',
  },
  {
    name: 'WordPress Integration',
    status: 'operational',
    description: 'WordPress REST API',
    uptime: '99.96%',
  },
  {
    name: 'Magic.js Connector',
    status: 'operational',
    description: 'Universal JavaScript connector',
    uptime: '99.99%',
  },
  {
    name: 'Job Queue',
    status: 'operational',
    description: 'Background task processing',
    uptime: '99.94%',
  },
  {
    name: 'Email Delivery',
    status: 'operational',
    description: 'Notification emails',
    uptime: '99.98%',
  },
]

const incidents = [
  {
    date: 'January 12, 2025',
    title: 'Scheduled Maintenance',
    status: 'resolved',
    description: 'Database optimization and backup - No service impact',
    duration: '30 minutes',
  },
  {
    date: 'December 28, 2024',
    title: 'API Rate Limiting',
    status: 'resolved',
    description: 'Temporary rate limiting due to increased traffic - Resolved by scaling infrastructure',
    duration: '45 minutes',
  },
]

const statusConfig = {
  operational: {
    label: 'Operational',
    color: 'text-green-600',
    bg: 'bg-green-100',
    gradient: 'from-green-500 to-emerald-500',
    icon: CheckCircle,
  },
  degraded: {
    label: 'Degraded',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    gradient: 'from-yellow-500 to-orange-500',
    icon: AlertCircle,
  },
  outage: {
    label: 'Outage',
    color: 'text-red-600',
    bg: 'bg-red-100',
    gradient: 'from-red-500 to-pink-500',
    icon: AlertCircle,
  },
}

export default function StatusPageClient() {
  const allOperational = services.every((s) => s.status === 'operational')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
              className={`p-3 ${allOperational ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-yellow-500 to-orange-600'} rounded-xl shadow-lg`}
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent"
              >
                System Status
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className={`${allOperational ? 'text-green-600' : 'text-yellow-600'} mt-1 font-semibold`}
              >
                {allOperational ? 'All Systems Operational' : 'Some Systems Experiencing Issues'}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Status Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className={`${allOperational ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} border rounded-2xl p-8 mb-12 text-center overflow-hidden relative`}
        >
          {/* Animated pulse effect */}
          {allOperational && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {allOperational ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                )}
              </motion.div>
              <h2 className={`text-2xl font-bold ${allOperational ? 'text-green-900' : 'text-yellow-900'}`}>
                {allOperational ? 'All Systems Operational' : 'Monitoring Active Issues'}
              </h2>
            </div>
            <p className={`${allOperational ? 'text-green-700' : 'text-yellow-700'} text-lg`}>
              {allOperational
                ? 'All SEOLOGY.AI services are running smoothly'
                : 'Our team is working to resolve any issues as quickly as possible'}
            </p>
          </div>
        </motion.div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 mb-12 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Service Status
          </h2>
          <div className="space-y-4">
            {services.map((service, index) => {
              const config = statusConfig[service.status as keyof typeof statusConfig]
              const StatusIcon = config.icon

              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 bg-gradient-to-r ${config.gradient}`}
                    />

                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-4 right-4"
                      >
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                      </motion.div>
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div
                        animate={{
                          rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}
                      >
                        <StatusIcon className={`w-6 h-6 ${config.color}`} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-full font-semibold ${config.bg} ${config.color}`}
                      >
                        {config.label}
                      </motion.div>
                      <p className="text-gray-600 text-sm mt-1">Uptime: {service.uptime}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 mb-12 shadow-sm hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Recent Incidents
          </h2>
          {incidents.length === 0 ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.9 }}
              >
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              </motion.div>
              <p className="text-gray-600 text-lg">No incidents in the past 30 days</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold"
                      >
                        Resolved
                      </motion.div>
                      <h3 className="text-lg font-bold text-gray-900">{incident.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{incident.date}</p>
                  </div>
                  <p className="text-gray-600 mb-2">{incident.description}</p>
                  <p className="text-gray-500 text-sm">Duration: {incident.duration}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Subscribe Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-3xl p-12 text-center text-white overflow-hidden"
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
              <Bell className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to receive notifications about system status updates and scheduled maintenance
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Subscribe to Updates
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

