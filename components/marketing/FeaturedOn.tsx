'use client';

import { motion } from "framer-motion";

export default function FeaturedOn() {
  const publications = [
    { name: "Product Hunt", logo: "🚀" },
    { name: "Hacker News", logo: "📰" },
    { name: "Indie Hackers", logo: "💼" },
    { name: "BetaList", logo: "⭐" },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider">
            Featured On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium"
              >
                <span className="text-2xl">{pub.logo}</span>
                <span className="text-sm">{pub.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

