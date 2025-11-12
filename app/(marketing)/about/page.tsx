'use client';

import { motion } from "framer-motion";
import Header from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Target, Users, Zap, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 animated-gradient">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                About Seology.ai
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                We're on a mission to make professional SEO accessible to every Shopify store owner, no matter their budget or technical expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  Traditional SEO agencies charge $3,000-$10,000 per month and require months to see results. We believe that's broken. Every store owner deserves access to world-class SEO without breaking the bank.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  That's why we built Seology.ai—an AI-powered SEO platform that works 24/7 to optimize your store, fix issues automatically, and boost your rankings. No contracts, no hidden fees, no technical knowledge required.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  We're not just replacing SEO agencies. We're democratizing access to professional SEO for everyone.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5,000+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Active Stores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">$18M</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">156%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Avg Traffic Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">24/7</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">AI Optimization</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Our Values
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                The principles that guide everything we build
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Target className="h-8 w-8" />,
                  title: "Results-Driven",
                  description: "We measure success by one metric: your organic traffic growth. Everything we build is designed to move that number up.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Customer-First",
                  description: "Your success is our success. We listen to feedback, iterate quickly, and build features that actually solve real problems.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Innovation",
                  description: "SEO hasn't changed much in 20 years. We're using cutting-edge AI to reimagine what's possible and deliver results faster.",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: "Transparency",
                  description: "No black boxes, no hidden fees, no confusing jargon. You always know what we're doing and why it matters.",
                  color: "from-orange-500 to-red-500",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Seology.ai was born from frustration. Our founder ran a successful Shopify store but was paying $5,000/month to an SEO agency that took 6 months to show any results. The reports were confusing, the communication was slow, and worst of all—most of the work could have been automated.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  After canceling the agency and spending months learning SEO, we realized something: 80% of SEO work is repetitive, rule-based tasks that AI could handle better and faster than humans. The remaining 20% is strategy—which AI can also help with through data analysis and competitor research.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  So we built Seology.ai. We started with a simple Auto Mode that fixed common SEO issues automatically. Store owners loved it. Then we added Plan Mode for strategic discussions and Approve Mode for those who wanted control. The results spoke for themselves: stores were seeing 150%+ traffic increases in months, not years.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Today, Seology.ai powers SEO for over 5,000 Shopify stores, generating $18M+ in monthly revenue for our customers. But we're just getting started. Our vision is to make Seology the default SEO solution for every e-commerce store in the world.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 animated-gradient">
          <div className="container max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join 5,000+ Stores Growing with Seology
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start your 14-day free trial today. No credit card required.
              </p>
              <button className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Try Seology for Free
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
