'use client';

import { motion } from "framer-motion";
import { Search, Mail, FileText, Clock, AlertCircle } from "lucide-react";

const challenges = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Finding SEO Issues is Time-Consuming",
    description: "Manually auditing your site for SEO problems requires hours of research and technical expertise, often missing critical issues.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Fixing Issues Takes Forever",
    description: "Even after identifying problems, implementing fixes across hundreds of pages is tedious and error-prone.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: "SEO Agencies Are Expensive",
    description: "Hiring an SEO agency costs thousands per month, with limited transparency and slow turnaround times.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Reports Don't Fix Problems",
    description: "Most SEO tools only report issues—they don't actually fix them. You're left with a list of problems and no solution.",
    color: "from-amber-500 to-red-500",
  },
];

export default function TheChallenge() {
  return (
    <section id="challenge" className="py-24 bg-white dark:bg-black relative overflow-hidden">
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
              THE SEO CHALLENGE
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight">
              Why website owners struggle with effective SEO strategies
            </h2>
          </header>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto">
            Website owners face significant challenges in implementing effective SEO strategies, often due to fragmented tools and manual processes.
          </p>
        </motion.div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-black/10 dark:border-white/10 hover:shadow-lg hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white mb-4">
                {challenge.icon}
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                {challenge.title}
              </h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

