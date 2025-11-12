'use client';

import { motion } from "framer-motion";
import Header from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Help us build the future of AI-powered SEO. Work with React, Node.js, and cutting-edge ML models.",
  },
  {
    title: "Machine Learning Engineer",
    department: "AI/ML",
    location: "Remote",
    type: "Full-time",
    description: "Train and optimize our SEO AI models. Experience with NLP and search algorithms required.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design beautiful, intuitive experiences for store owners. Figma expert with e-commerce experience preferred.",
  },
  {
    title: "SEO Specialist",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description: "Help shape our SEO strategy and train our AI. Deep technical SEO knowledge required.",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Help our customers succeed with Seology. E-commerce and SEO knowledge preferred.",
  },
  {
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Create content that educates and converts. SEO writing experience required.",
  },
];

const benefits = [
  "Competitive salary + equity",
  "100% remote work",
  "Flexible hours",
  "Health, dental & vision insurance",
  "401(k) matching",
  "Unlimited PTO",
  "Latest MacBook Pro",
  "Annual learning budget",
  "Home office stipend",
  "Team retreats twice a year",
];

export default function Careers() {
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
                Join Our Mission
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Help us democratize SEO for every e-commerce store in the world. We're a small, fast-moving team building the future of AI-powered optimization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Why Seology?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                We're not just another SaaS company. We're on a mission to change how e-commerce stores approach SEO.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Real Impact",
                  description: "Your work directly helps thousands of store owners grow their businesses and achieve financial freedom.",
                },
                {
                  title: "Cutting-Edge Tech",
                  description: "Work with the latest AI/ML technologies, modern web frameworks, and scalable cloud infrastructure.",
                },
                {
                  title: "Fast Growth",
                  description: "We're growing 20%+ month-over-month. Huge opportunity for career growth and leadership roles.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8"
                >
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
                Benefits & Perks
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                We take care of our team so they can focus on building great products
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-lg p-4"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Open Positions
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                All positions are remote and open to candidates worldwide
              </p>
            </motion.div>

            <div className="space-y-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 group-hover:scale-105 whitespace-nowrap">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* No Position CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16 p-8 bg-slate-50 dark:bg-slate-900 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Don't see a perfect fit?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                We're always looking for talented people. Send us your resume and tell us why you'd be a great addition to the team.
              </p>
              <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300">
                Send General Application
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
