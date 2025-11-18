'use client';

import { motion } from "framer-motion";
import { Link2, Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Add Your Domain",
    description: "Add your domain to start prospecting for SEO issues and optimization opportunities.",
    icon: <Link2 className="h-8 w-8" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    number: "2",
    title: "Let the AI Agent Do the Work",
    description: "Our AI agent will analyze your site, identify SEO issues, and create a fix plan on your behalf.",
    icon: <Search className="h-8 w-8" />,
    color: "from-purple-400 to-purple-600",
  },
  {
    number: "3",
    title: "Review & Convert",
    description: "Review the identified issues and fixes. Approve to automatically implement optimizations.",
    icon: <Sparkles className="h-8 w-8" />,
    color: "from-pink-400 to-pink-600",
  },
];

export default function WorkflowDiagram() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Gradient fade overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_30%,transparent)]"></div>
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <header className="mx-auto flex flex-col gap-y-3 text-center mb-6">
            <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight">
              Just 3 steps to get started
            </h2>
          </header>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Simple, fast, and effective SEO automation
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connection Lines - Desktop with animated colored gradient */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full origin-left relative overflow-hidden rounded-full"
            >
              <motion.div
                className="h-full w-full"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-2xl transition-all duration-300 group relative">
                  {/* Animated colored border ring on hover */}
                  <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                        padding: '2px',
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="w-full h-full rounded-2xl bg-white dark:bg-black"></div>
                    </motion.div>
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold shadow-lg z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white mb-4 shadow-lg relative z-10"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3 relative z-10">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black/60 dark:text-white/60 leading-relaxed relative z-10">
                    {step.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 relative z-10">
                    <div className="h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        className="h-full bg-black dark:bg-white"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                {/* Arrow - Desktop Only */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"
                  >
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-black border-2 border-black/20 dark:border-white/20 flex items-center justify-center shadow-lg">
                      <ArrowRight className="h-4 w-4 text-black dark:text-white" />
                    </div>
                  </motion.div>
                )}

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className="lg:hidden flex justify-center my-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center shadow-lg rotate-90">
                      <ArrowRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-black/60 dark:text-white/60 mb-6 text-lg">
            Get started in minutes, see results in days
          </p>
          <Link href="/sign-up">
            <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg">
              Start Your Free Trial
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </button>
          </Link>
          <p className="text-sm text-black/50 dark:text-white/50 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
