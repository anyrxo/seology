'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "How does Seology's AI actually work?",
    answer:
      "Seology uses advanced machine learning algorithms trained on millions of successful SEO campaigns. It continuously analyzes your store, identifies optimization opportunities, and implements fixes automatically. The AI learns from your specific industry, competitors, and customer behavior to deliver personalized optimizations.",
  },
  {
    question: "Will Seology work with my Shopify theme?",
    answer:
      "Yes! Seology works with all Shopify themes and integrates seamlessly with your existing setup. It uses Shopify's API to make optimizations without affecting your theme's design or functionality. No technical knowledge required.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most stores see initial improvements within 2-3 weeks, with significant traffic increases by month 2-3. SEO is a long-term strategy, but our AI accelerates the process by working 24/7 and implementing best practices instantly. Some stores see ranking improvements in as little as 7 days.",
  },
  {
    question: "Can I switch between Auto, Plan, and Approve modes?",
    answer:
      "Absolutely! You can switch between modes at any time based on your needs. Many stores start with Approve Mode to build trust, then switch to Auto Mode once they're comfortable. You can also use different modes for different aspects of your SEO strategy.",
  },
  {
    question: "What if I already have an SEO agency?",
    answer:
      "Seology can complement your existing agency or replace them entirely. Many of our customers switched from expensive agencies ($3K-10K/month) to Seology and saw better results. Our AI works faster, never sleeps, and costs a fraction of traditional agencies.",
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer:
      "No contracts. You can cancel anytime with one click. We believe in earning your business every month through results, not locking you into long-term commitments. Your data remains yours even if you cancel.",
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer:
      "Yes! We offer a 14-day free trial (no credit card required) and a 30-day money-back guarantee. If you're not satisfied with the results, we'll refund your first month's payment, no questions asked.",
  },
  {
    question: "Will Seology slow down my store?",
    answer:
      "No, Seology actually helps improve your site speed! It runs in the background and identifies performance bottlenecks. Many stores see faster load times after using Seology because we optimize images, code, and technical elements that affect speed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
      <section id="faq" className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden px-4">
      {/* Gradient fade overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_30%,transparent)]"></div>
      <div className="container relative z-10 max-w-4xl">
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
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight px-4">
              Frequently Asked Questions
            </h2>
          </header>
          <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 px-4">
            Everything you need to know about Seology
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 text-left shadow-md hover:shadow-lg transition-all duration-300 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white pr-8">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-black/60 dark:text-white/60 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-black/60 dark:text-white/60 mb-4">
            Still have questions?
          </p>
          <Link
            href="/sign-up"
            className="text-black dark:text-white font-semibold hover:underline"
          >
            Contact our support team →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
