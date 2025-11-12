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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Comprehensive SEO tools powered by AI to dominate search rankings
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
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 h-full border border-slate-200 dark:border-slate-800 hover:border-transparent hover:shadow-2xl transition-all duration-300">
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur`}></div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <a
                    href="#"
                    className={`text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent hover:underline inline-flex items-center gap-1`}
                  >
                    Learn more
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </a>
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
          <p className="text-slate-600 dark:text-slate-400">
            All features included in every plan. No hidden fees or limitations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
