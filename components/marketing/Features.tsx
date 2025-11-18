'use client';

import { motion } from "framer-motion";
import {
  Search,
  Wrench,
  FileText,
  Users,
  Link as LinkIcon,
  Gauge,
  Code,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Auto Keyword Optimization",
    description: "AI discovers and optimizes for high-value keywords automatically, no research needed.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Technical SEO Fixes",
    description: "Automatically fix broken links, 404 errors, duplicate content, and technical issues.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Content Enhancement",
    description: "Optimize meta tags, descriptions, headings, and content structure for maximum impact.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Competitor Analysis",
    description: "Track competitors' strategies and automatically adapt to stay ahead in rankings.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <LinkIcon className="h-6 w-6" />,
    title: "Backlink Monitoring",
    description: "Monitor your backlink profile and get alerts for new links or lost opportunities.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <Gauge className="h-6 w-6" />,
    title: "Performance Tracking",
    description: "Real-time dashboards show rankings, traffic, and ROI with actionable insights.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Schema Markup",
    description: "Automatically implement structured data to enhance search result appearance.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Site Speed Optimization",
    description: "Identify and fix performance bottlenecks that hurt rankings and conversions.",
    color: "from-yellow-500 to-orange-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
            Solution
          </h2>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Elevate Your SEO Strategy, From Start to Finish
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl p-8 h-full border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">{feature.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black dark:text-white mb-3 transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base text-black/60 dark:text-white/60 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <Link
                    href="/sign-up"
                    className="text-sm font-medium text-black dark:text-white hover:text-black/60 dark:hover:text-white/60 inline-flex items-center gap-1 transition-colors"
                  >
                    Learn more
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-black/60 dark:text-white/60">
            All features included in every plan. No hidden fees or limitations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
