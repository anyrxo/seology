'use client';

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: { monthly: 49, annual: 39 },
    description: "Perfect for new stores getting started with SEO",
    features: [
      "Up to 500 products",
      "Auto Mode optimization",
      "Basic keyword tracking",
      "Monthly SEO reports",
      "Email support",
      "14-day free trial",
    ],
    color: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    name: "Professional",
    price: { monthly: 99, annual: 79 },
    description: "For growing stores serious about dominating search",
    features: [
      "Up to 2,000 products",
      "All 3 modes (Auto, Plan, Approve)",
      "Advanced keyword tracking",
      "Competitor analysis",
      "Weekly SEO reports",
      "Priority support",
      "Custom optimizations",
      "14-day free trial",
    ],
    color: "from-purple-500 to-pink-500",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 299, annual: 239 },
    description: "For established stores with high-volume needs",
    features: [
      "Unlimited products",
      "All 3 modes (Auto, Plan, Approve)",
      "Advanced keyword tracking",
      "Competitor analysis",
      "Daily SEO reports",
      "Dedicated account manager",
      "Custom integrations",
      "White-label reports",
      "API access",
      "14-day free trial",
    ],
    color: "from-orange-500 to-red-500",
    popular: false,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your store. All plans include 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-slate-100 dark:bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                isAnnual
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative ${plan.popular ? "md:-mt-4" : ""}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`px-4 py-1 bg-gradient-to-r ${plan.color} text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-1`}>
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card with glassmorphism */}
              <div
                className={`bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 ${
                  plan.popular
                    ? "border-purple-500 dark:border-purple-400"
                    : "border-slate-200 dark:border-slate-700"
                } hover:shadow-2xl hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all duration-300 h-full flex flex-col`}
              >
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Billed annually (${plan.price.annual * 12}/year)
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-6 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:scale-105`
                      : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  Try Seology for Free
                </button>

                {/* Features List */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            All plans include 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Need a custom plan? <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Contact our sales team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
