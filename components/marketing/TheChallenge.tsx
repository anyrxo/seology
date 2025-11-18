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
    <section id="challenge" className="py-24 bg-slate-50 dark:bg-slate-900">
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
            The SEO Challenge
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Why website owners struggle with effective SEO strategies
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
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${challenge.color} flex items-center justify-center text-white mb-4`}>
                {challenge.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {challenge.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

