import { motion } from "framer-motion";
import { Link2, Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Store",
    description: "Link your Shopify store in 60 seconds. No technical setup required.",
    icon: <Link2 className="h-8 w-8" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI scans your entire store, identifies issues, and creates optimization plan.",
    icon: <Search className="h-8 w-8" />,
    color: "from-purple-400 to-purple-600",
  },
  {
    number: "03",
    title: "Auto Optimization",
    description: "Seology automatically fixes issues and optimizes content 24/7 in your chosen mode.",
    icon: <Sparkles className="h-8 w-8" />,
    color: "from-pink-400 to-pink-600",
  },
  {
    number: "04",
    title: "See Results",
    description: "Watch your rankings climb, traffic grow, and revenue increase month over month.",
    icon: <TrendingUp className="h-8 w-8" />,
    color: "from-green-400 to-green-600",
  },
];

export default function WorkflowDiagram() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
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
            The Seology Process
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            From setup to success in four simple steps
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-green-500 origin-left"
            ></motion.div>
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
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 group">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 flex items-center justify-center text-white dark:text-slate-900 font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        className={`h-full bg-gradient-to-r ${step.color}`}
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
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center shadow-lg">
                      <ArrowRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
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
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
            Get started in minutes, see results in days
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg">
            Start Your Free Trial
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
