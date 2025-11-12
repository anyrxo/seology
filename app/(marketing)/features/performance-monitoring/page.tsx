'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BarChart3,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  Eye,
  Target,
  Clock,
  Search,
  Award,
  LineChart,
  AlertTriangle,
  Globe,
  Gauge,
} from 'lucide-react'

export default function PerformanceMonitoringPage() {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [activeMetric, setActiveMetric] = useState(0)
  const [liveRanking, setLiveRanking] = useState(47)
  const [liveTraffic, setLiveTraffic] = useState(12847)

  // Live ranking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRanking((prev) => {
        const change = Math.floor(Math.random() * 5) - 2
        const newRank = prev + change
        return newRank < 1 ? 1 : newRank > 100 ? 100 : newRank
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Live traffic counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTraffic((prev) => prev + Math.floor(Math.random() * 20) + 5)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const metricExamples = [
    {
      name: 'E-Commerce Store',
      ranking: '+34 positions',
      traffic: '+284%',
      revenue: '+$127K',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      name: 'SaaS Product',
      ranking: '+18 positions',
      traffic: '+156%',
      revenue: '+$89K',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Content Site',
      ranking: '+41 positions',
      traffic: '+312%',
      revenue: '+$43K',
      gradient: 'from-purple-500 to-pink-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-cyan-500/20 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/20 rounded-full blur-3xl"
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

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] -z-10" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-cyan-300">
                Live: Rank #
                <motion.span
                  key={liveRanking}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {liveRanking}
                </motion.span>
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Track Every SEO
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Metric That Matters
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Go beyond vanity metrics. Monitor rankings, traffic, Core Web Vitals, and revenue impact
              with AI-powered insights that show you exactly what's working.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-lg shadow-lg shadow-cyan-500/25"
              >
                Start Tracking Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
              >
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="max-w-5xl mx-auto mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Data Points Tracked', value: '50M+', gradient: 'from-cyan-400 to-blue-400' },
              { label: 'Metrics Updated', value: 'Every 1h', gradient: 'from-green-400 to-emerald-400' },
              { label: 'Average Traffic Gain', value: '+217%', gradient: 'from-purple-400 to-pink-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800"
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Live Metrics Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Watch Your Metrics{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Live
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real-time updates show exactly how your SEO is performing right now
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Live Ranking Card */}
            <motion.div
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-slate-400">Average Keyword Position</span>
                </div>
                <motion.div
                  key={liveRanking}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                >
                  #{liveRanking}
                </motion.div>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Improving</span>
                </div>
              </div>
            </motion.div>

            {/* Live Traffic Card */}
            <motion.div
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Monthly Organic Visits</span>
                </div>
                <motion.div
                  key={liveTraffic}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                >
                  {liveTraffic.toLocaleString()}
                </motion.div>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+127% vs last month</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Analytics{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Move beyond traditional SEO reporting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Way */}
            <motion.div
              className="bg-red-500/5 border border-red-500/20 rounded-xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Traditional Analytics</h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Stale data updated once per day (or worse)',
                  'Confusing dashboards with vanity metrics',
                  'No connection between fixes and results',
                  'Manual report generation takes hours',
                  'Can\'t explain "why" rankings changed',
                  'Different tools for each metric type',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* SEOLOGY Way */}
            <motion.div
              className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">SEOLOGY Performance</h3>
              </div>

              <ul className="space-y-4 relative z-10">
                {[
                  'Real-time updates every hour with live previews',
                  'AI explains every trend and anomaly',
                  'Direct attribution: see which fixes drove results',
                  'Beautiful reports auto-generated daily',
                  'Predictive insights show future performance',
                  'Unified dashboard for all SEO metrics',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-slate-200"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Metric Examples */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real Results Across Industries
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how SEOLOGY monitoring drives measurable improvements
            </p>
          </motion.div>

          {/* Metric Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {metricExamples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveMetric(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeMetric === index
                    ? `bg-gradient-to-r ${example.gradient} text-white shadow-lg`
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.name}
              </motion.button>
            ))}
          </div>

          {/* Active Metric Stats */}
          <motion.div
            key={activeMetric}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Ranking Improvement</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${metricExamples[activeMetric].gradient} bg-clip-text text-transparent`}
                >
                  {metricExamples[activeMetric].ranking}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Traffic Increase</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${metricExamples[activeMetric].gradient} bg-clip-text text-transparent`}
                >
                  {metricExamples[activeMetric].traffic}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Revenue Impact</div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${metricExamples[activeMetric].gradient} bg-clip-text text-transparent`}
                >
                  {metricExamples[activeMetric].revenue}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comprehensive Performance Tracking
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              All your SEO metrics in one unified dashboard
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Keyword Rankings',
                description: 'Track positions for target keywords across all search engines. Daily updates with historical trends.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: TrendingUp,
                title: 'Organic Traffic',
                description: 'Monitor visits, pageviews, and engagement from search engines. See which pages drive the most traffic.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Zap,
                title: 'Core Web Vitals',
                description: 'Track LCP, FID, CLS, and other performance metrics that impact rankings and user experience.',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Eye,
                title: 'Visibility Score',
                description: 'AI-calculated visibility metric showing your overall search presence compared to competitors.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Target,
                title: 'Conversion Tracking',
                description: 'Connect SEO metrics to business outcomes. Track leads, sales, and revenue from organic search.',
                gradient: 'from-red-500 to-rose-500',
              },
              {
                icon: Activity,
                title: 'Backlink Monitoring',
                description: 'Track new and lost backlinks. Monitor domain authority and link quality metrics.',
                gradient: 'from-indigo-500 to-purple-500',
              },
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredMetric(index)}
                onHoverEnd={() => setHoveredMetric(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0`}
                  animate={{ opacity: hoveredMetric === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-lg flex items-center justify-center mb-4`}
                    animate={{
                      rotate: hoveredMetric === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {metric.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
                {hoveredMetric === index && (
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

      {/* AI-Powered Insights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Smart Analytics with AI
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Don't just see data—understand what it means
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: LineChart,
                title: 'Trend Analysis',
                description: 'AI identifies patterns and anomalies in your data. Get alerts when metrics spike or drop unexpectedly.',
                items: [
                  'Automatic anomaly detection',
                  'Seasonal trend analysis',
                  'Performance forecasting',
                  'Custom alert thresholds',
                ],
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: AlertTriangle,
                title: 'Impact Attribution',
                description: 'See exactly which fixes improved your metrics. AI correlates changes to ranking and traffic improvements.',
                items: [
                  'Fix impact tracking',
                  'Before/after comparisons',
                  'ROI calculation',
                  'A/B test results',
                ],
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Target,
                title: 'Competitor Benchmarking',
                description: 'Track how your performance stacks up against competitors. Identify opportunities and threats.',
                items: [
                  'Competitor keyword tracking',
                  'Visibility comparisons',
                  'Content gap analysis',
                  'Backlink comparison',
                ],
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Award,
                title: 'Goal Tracking',
                description: 'Set SEO goals and track progress automatically. Get recommendations to achieve targets faster.',
                items: [
                  'Custom goal setting',
                  'Progress tracking',
                  'Milestone notifications',
                  'Strategy recommendations',
                ],
                gradient: 'from-green-500 to-emerald-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0`}
                  animate={{ opacity: hoveredFeature === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-6`}
                    animate={{
                      rotate: hoveredFeature === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {hoveredFeature === index && (
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

      {/* Reporting Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Beautiful Reports, Automatically
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Client-ready reports generated with one click
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                title: 'Scheduled Reports',
                description: 'Automated daily, weekly, or monthly reports delivered to your inbox and stakeholders.',
              },
              {
                icon: Globe,
                title: 'White Label',
                description: 'Add your logo and branding to all reports. Perfect for agencies serving multiple clients.',
              },
              {
                icon: Gauge,
                title: 'Custom Dashboards',
                description: 'Build custom dashboards for different teams, clients, or use cases with drag-and-drop.',
              },
            ].map((report, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <report.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {report.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {report.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Tracking Performance
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                That Actually Matters
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-10">
              See the real impact of your SEO with AI-powered analytics
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-lg shadow-lg shadow-cyan-500/25"
                >
                  Start Tracking Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
              >
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-bold rounded-lg border border-slate-700 hover:bg-slate-800 transition-all duration-300 text-lg"
                >
                  View Pricing
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
