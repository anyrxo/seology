'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  TrendingUp,
  Coffee,
  Sparkles,
  ArrowRight,
  Code,
  Brain,
  Rocket,
} from 'lucide-react'

export default function CareersPage() {
  const [hoveredJob, setHoveredJob] = useState<number | null>(null)
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)

  const openPositions = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Build the future of SEO automation with Next.js, PostgreSQL, and advanced AI. Work on complex systems that automatically fix SEO issues at scale.',
      requirements: [
        '5+ years full-stack development',
        'Expert in React/Next.js and TypeScript',
        'Experience with PostgreSQL and Prisma',
        'Passion for clean code and automation',
      ],
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Design and optimize AI systems that analyze websites and generate intelligent SEO fixes. Work with cutting-edge language models and advanced AI.',
      requirements: [
        '3+ years in AI/ML engineering',
        'Experience with LLMs (GPT, Claude, etc.)',
        'Strong Python and TypeScript skills',
        'Understanding of SEO and web technologies',
      ],
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Create beautiful, intuitive interfaces for our SaaS platform. Design user experiences that make complex SEO automation feel simple and delightful.',
      requirements: [
        '4+ years product design experience',
        'Strong portfolio of SaaS products',
        'Expert in Figma and design systems',
        'Understanding of frontend development',
      ],
    },
    {
      title: 'Developer Advocate',
      department: 'Growth',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Be the voice of our developer community. Create content, build demos, and help developers integrate SEOLOGY.AI into their platforms.',
      requirements: [
        '3+ years developer relations experience',
        'Strong technical background (frontend/backend)',
        'Excellent communication and presentation skills',
        'Active in developer communities',
      ],
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness stipend',
    },
    {
      icon: MapPin,
      title: 'Remote First',
      description: 'Work from anywhere. We support flexible schedules across all timezones',
    },
    {
      icon: TrendingUp,
      title: 'Growth & Learning',
      description: '$2,000/year learning budget for courses, conferences, and certifications',
    },
    {
      icon: Coffee,
      title: 'Time Off',
      description: 'Unlimited PTO, plus company-wide shutdowns for mental health breaks',
    },
    {
      icon: Rocket,
      title: 'Equity',
      description: 'Competitive equity packages - everyone shares in our success',
    },
    {
      icon: Zap,
      title: 'Latest Tech',
      description: 'Top-tier equipment and tools. Work with cutting-edge technology',
    },
  ]

  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: "We're building something that's never been done before",
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Small team, big impact. Your work directly shapes the product',
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'We measure success by the value we create for our users',
    },
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'We care deeply about code quality, architecture, and performance',
    },
  ]

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join the Team Building the
              <br />
              <span className="text-blue-600">Future of SEO</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We're a small, ambitious team using AI to solve problems that haven't been solved
              before. If you're passionate about automation, AI, and building products that matter,
              we'd love to meet you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="#open-positions"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg"
              >
                View Open Positions
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Join SEOLOGY.AI?
            </h2>
            <p className="text-xl text-gray-600">
              We're not just building another SaaS product
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Benefits & Perks
            </h2>
            <p className="text-xl text-gray-600">
              We take care of our team so you can focus on building great things
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredBenefit(index)}
                onHoverEnd={() => setHoveredBenefit(null)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0"
                  animate={{ opacity: hoveredBenefit === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: hoveredBenefit === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <benefit.icon className="w-12 h-12 text-blue-600 mb-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
                {hoveredBenefit === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              {openPositions.length} open roles • Remote • Full-time
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((job, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredJob(index)}
                onHoverEnd={() => setHoveredJob(null)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0"
                  animate={{ opacity: hoveredJob === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      onClick={() => window.location.href = `mailto:careers@seology.ai?subject=Application: ${job.title}`}
                    >
                      Apply Now
                    </motion.button>
                  </div>

                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{job.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <motion.span
                            animate={{
                              scale: hoveredJob === index ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ delay: i * 0.1 }}
                            className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"
                          />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {hoveredJob === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't See Your Role Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Particle Dots */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Don't See Your Perfect Role?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                We're always looking for exceptional talent. Send us your resume and tell us what
                you'd love to work on.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors duration-300 text-lg"
                onClick={() => window.location.href = 'mailto:careers@seology.ai?subject=General Application'}
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Apply now or learn more about what we're building
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}>
                <a
                  href="#open-positions"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg"
                >
                  View Open Positions
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </motion.div>
              <motion.div whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}>
                <Link
                  href="/about"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-colors duration-300 text-lg"
                >
                  Learn About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
