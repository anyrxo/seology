'use client';

import { motion } from "framer-motion";
import { Zap, MessageSquare, CheckCircle } from "lucide-react";
import Link from "next/link";

const modes = [
  {
    number: "1",
    title: "Auto Mode",
    description:
      "Set it and forget it. Seology automatically fixes SEO issues, optimizes content, and improves rankings 24/7 without any input from you.",
    color: "from-green-400 to-emerald-500",
    icon: <Zap className="h-8 w-8" />,
    borderColor: "border-green-500",
    glowClass: "hover:shadow-green-500/50",
  },
  {
    number: "2",
    title: "Plan Mode",
    description:
      "Collaborate with AI. Discuss strategy, get recommendations, and plan optimizations with our intelligent assistant in real-time.",
    color: "from-blue-400 to-cyan-500",
    icon: <MessageSquare className="h-8 w-8" />,
    borderColor: "border-blue-500",
    glowClass: "hover:shadow-blue-500/50",
  },
  {
    number: "3",
    title: "Approve Mode",
    description:
      "Stay in control. Review AI suggestions, approve changes, and maintain oversight with detailed reports and approval workflows.",
    color: "from-purple-400 to-pink-500",
    icon: <CheckCircle className="h-8 w-8" />,
    borderColor: "border-purple-500",
    glowClass: "hover:shadow-purple-500/50",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function ThreeModes() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-black relative overflow-hidden">
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
              THREE MODES
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight">
              Elevate Your SEO Strategy, From Start to Finish
            </h2>
          </header>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Three powerful modes to automate your SEO optimization
          </p>
        </motion.div>

        {/* Mode Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {modes.map((mode, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
                    {/* Animated colored border ring - shimmer effect */}
                    <div className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #06b6d4 100%, transparent 100%)',
                          backgroundSize: '200% 100%',
                          padding: '2px',
                        }}
                        animate={{
                          backgroundPosition: ['200% 0', '-200% 0'],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <div className="w-full h-full rounded-2xl bg-white dark:bg-black"></div>
                      </motion.div>
                    </div>

              {/* Card content with glassmorphism */}
              <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-8 h-full border border-black/10 dark:border-white/10 shadow-xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-black/90 group">
                {/* Icon and Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white shadow-lg">
                    {mode.icon}
                  </div>
                  <div className="text-5xl font-black text-black dark:text-white">
                    {mode.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                  {mode.title}
                </h3>

                {/* Description */}
                <p className="text-black/60 dark:text-white/60 leading-relaxed">
                  {mode.description}
                </p>

                {/* Mini workflow indicator */}
                <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
                    <div className="h-1 flex-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                        className="h-full bg-black dark:bg-white"
                      ></motion.div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-black/60 dark:text-white/60 mb-4">
            Switch between modes anytime or let Seology choose the best approach for you
          </p>
          <Link href="/sign-up">
            <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Try Seology for Free
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
