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
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Elevate Your SEO Strategy, From Start to Finish
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
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
              {/* Glow effect background */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${mode.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>

              {/* Card content with glassmorphism */}
              <div className={`relative bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 h-full border-2 ${mode.borderColor} shadow-xl ${mode.glowClass} transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-800/80`}>
                {/* Icon and Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-white shadow-lg`}>
                    {mode.icon}
                  </div>
                  <div className={`text-5xl font-bold bg-gradient-to-r ${mode.color} bg-clip-text text-transparent`}>
                    {mode.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {mode.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {mode.description}
                </p>

                {/* Mini workflow indicator */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${mode.color}`}></div>
                    <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                        className={`h-full bg-gradient-to-r ${mode.color}`}
                      ></motion.div>
                    </div>
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${mode.color}`}></div>
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
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Switch between modes anytime or let Seology choose the best approach for you
          </p>
          <Link href="/sign-up">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Try Seology for Free
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
