'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 bg-white dark:bg-black px-4">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Subtle animated orbs - monochrome */}
        <motion.div 
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-black/5 dark:bg-white/5 rounded-full blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-black/5 dark:bg-white/5 rounded-full blur-[100px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      {/* Gradient fade overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_30%,transparent)]"></div>

      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-black dark:text-white mb-8 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.15em]">AI-Powered SEO Automation</span>
            </motion.div>

            {/* Headline with BacklinkGPT-style typography */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto flex flex-col gap-y-3 text-left mb-8"
            >
              <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2">
                THE SEO AUTOMATION CHALLENGE
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black dark:text-white leading-[1.1] tracking-tight">
                Stop Reporting SEO Issues.
                <br />
                <span className="text-black/60 dark:text-white/60 font-normal">
                  Start Fixing Them Automatically.
                </span>
              </h1>
            </motion.header>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black/60 dark:text-white/60 mb-8 md:mb-10 leading-relaxed font-normal max-w-2xl"
            >
              The world's first AI-powered platform that doesn't just find SEO problems—it <span className="text-black dark:text-white font-semibold">logs into your CMS and fixes them</span>. Automatically.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8"
            >
              <Link href="/sign-up">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                         <Button
                           size="lg"
                           className="group relative bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl font-bold overflow-hidden w-full sm:w-auto"
                         >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Free Trial
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 dark:from-black/0 dark:via-black/10 dark:to-black/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/#features">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                         <Button
                           size="lg"
                           variant="outline"
                           className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 border-2 border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40 bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm text-black dark:text-white rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto"
                         >
                    See How It Works
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Guarantee Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse"></div>
                <span className="text-sm font-medium">14-Day Free Trial</span>
              </div>
              <div className="w-px h-4 bg-black/10 dark:bg-white/10"></div>
              <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                <span className="text-sm font-medium">No Credit Card Required</span>
              </div>
              <div className="w-px h-4 bg-black/10 dark:bg-white/10"></div>
              <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                <span className="text-sm font-medium">Cancel Anytime</span>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap items-center gap-8 text-black/60 dark:text-white/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border-2 border-black/20 dark:border-white/20 shadow-lg"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  />
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border-2 border-black/20 dark:border-white/20 shadow-lg"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  />
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border-2 border-black/20 dark:border-white/20 shadow-lg"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  />
                </div>
                <div>
                  <div className="text-black dark:text-white font-bold text-lg">5,000+</div>
                  <div className="text-xs text-black/40 dark:text-white/40">Active stores</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-black dark:text-white" />
                </div>
                <div>
                  <div className="text-black dark:text-white font-bold text-lg">156%</div>
                  <div className="text-xs text-black/40 dark:text-white/40">Avg traffic increase</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-black dark:text-white" />
                </div>
                <div>
                  <div className="text-black dark:text-white font-bold text-lg">24/7</div>
                  <div className="text-xs text-black/40 dark:text-white/40">Auto-fixing</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-3xl p-8 border border-black/10 dark:border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-black dark:text-white font-semibold text-lg">SEO Dashboard</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20"></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-4">
                    <div className="text-black/60 dark:text-white/60 text-sm mb-1">Organic Traffic</div>
                    <div className="text-black dark:text-white text-2xl font-bold">+156%</div>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-4">
                    <div className="text-black/60 dark:text-white/60 text-sm mb-1">Keywords Ranking</div>
                    <div className="text-black dark:text-white text-2xl font-bold">2,547</div>
                  </div>
                </div>

                {/* Chart placeholder */}
                <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-4 h-32 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      className="flex-1 bg-black dark:bg-white rounded-t"
                    ></motion.div>
                  ))}
                </div>
              </div>

              {/* Floating notification cards */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-6 -right-6 bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-sm border border-black/20 dark:border-white/20"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Zap className="h-5 w-5" />
                </motion.div>
                <span className="text-sm font-bold">Auto-fix applied!</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-black text-black dark:text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-sm border border-black/20 dark:border-white/20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <TrendingUp className="h-5 w-5" />
                </motion.div>
                <span className="text-sm font-bold">Ranking improved!</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-black/40 dark:text-white/40">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-black/20 dark:border-white/20 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-black/40 dark:bg-white/40 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
