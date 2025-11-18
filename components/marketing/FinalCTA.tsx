'use client';

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Gradient fade overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_30%,transparent)]"></div>

      {/* Subtle animated orbs - monochrome */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"
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

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-6 leading-tight"
          >
            Ready to 10X Your
            <br />
            Organic Traffic?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-black/60 dark:text-white/60 mb-8"
          >
            Join 5,000+ Shopify stores that are ranking higher, getting more traffic,
            <br className="hidden md:block" />
            and growing faster with Seology.ai
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link href="/sign-up" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
              Try Seology for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/demo" className="px-8 py-4 border-2 border-black/20 dark:border-white/20 text-black dark:text-white font-bold text-lg rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
              View Demo
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 text-black/60 dark:text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-black dark:text-white" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-black dark:text-white" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-black dark:text-white" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-12 border-t border-black/10 dark:border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-black dark:text-white mb-2">5,000+</div>
                <div className="text-black/60 dark:text-white/60">Active Stores</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-black dark:text-white mb-2">$18M</div>
                <div className="text-black/60 dark:text-white/60">Monthly Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-black dark:text-white mb-2">4.9/5</div>
                <div className="text-black/60 dark:text-white/60">Customer Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
