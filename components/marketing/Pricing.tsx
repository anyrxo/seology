'use client';

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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
    color: "",
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
    color: "",
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
      <section id="pricing" className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden px-4">
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
                     PRICING
                   </div>
                   <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight px-4">
                     Simple, Transparent Pricing
                   </h2>
                 </header>
                 <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Choose the plan that fits your store. All plans include 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-black/5 dark:bg-white/5 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-white dark:bg-black text-black dark:text-white shadow-md"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                isAnnual
                  ? "bg-white dark:bg-black text-black dark:text-white shadow-md"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
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
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="px-4 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card with glassmorphism */}
              <div
                className={`relative bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border ${
                  plan.popular
                    ? "border-black dark:border-white shadow-2xl"
                    : "border-black/10 dark:border-white/10"
                } hover:shadow-2xl hover:bg-white/90 dark:hover:bg-black/90 transition-all duration-500 h-full flex flex-col group`}
              >
                {/* Animated colored border ring for popular plan - BEHIND content */}
                {plan.popular && (
                  <div className="absolute -inset-[2px] rounded-2xl opacity-100 overflow-hidden z-0">
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
                )}
                {/* Plan Name */}
                <h3 className="text-3xl font-black mb-2 text-black dark:text-white relative z-10">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-black/60 dark:text-white/60 mb-6 relative z-10">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8 relative z-10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-black dark:text-white">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-lg text-black/60 dark:text-white/60">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-black/60 dark:text-white/60 mt-2 font-semibold">
                      Billed annually (${plan.price.annual * 12}/year)
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link href="/sign-up" className="relative z-10">
                  <button
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 mb-8 ${
                      plan.popular
                        ? "bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
                        : "bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10"
                    }`}
                  >
                    Start Free Trial
                  </button>
                </Link>

                {/* Features List */}
                <ul className="space-y-3 flex-1 relative z-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-white dark:text-black" />
                      </div>
                      <span className="text-black/80 dark:text-white/80 text-sm">
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
          <p className="text-black/60 dark:text-white/60 mb-2">
            All plans include 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-black/50 dark:text-white/50">
            Need a custom plan? <Link href="/sign-up" className="text-black dark:text-white hover:underline">Contact our sales team</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
