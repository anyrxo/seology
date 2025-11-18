'use client';

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Founder",
    store: "Urban Threads Co.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    quote: "Seology increased our organic traffic by 245% in just 3 months. It's like having an entire SEO team working 24/7.",
    metrics: {
      traffic: "+245%",
      revenue: "$47K/mo",
    },
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "E-commerce Manager",
    store: "TechGear Plus",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    quote: "We replaced our $5K/month SEO agency with Seology. Better results, fraction of the cost. Absolute game-changer.",
    metrics: {
      traffic: "+189%",
      revenue: "$32K/mo",
    },
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Store Owner",
    store: "Eco Living Shop",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    quote: "The Auto Mode is incredible. I literally don't think about SEO anymore, and my rankings keep improving every week.",
    metrics: {
      traffic: "+167%",
      revenue: "$28K/mo",
    },
    rating: 5,
  },
  {
    name: "Sarah Park",
    role: "Marketing Director",
    store: "Fitness Essentials",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    quote: "Best investment we've made. ROI was positive within the first month. Now we're ranking for keywords we never thought possible.",
    metrics: {
      traffic: "+312%",
      revenue: "$61K/mo",
    },
    rating: 5,
  },
  {
    name: "Lucas Thompson",
    role: "CEO",
    store: "Beauty Haven",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    quote: "Seology found and fixed 200+ SEO issues we didn't even know existed. Our conversion rate improved by 40% as a result.",
    metrics: {
      traffic: "+198%",
      revenue: "$39K/mo",
    },
    rating: 5,
  },
  {
    name: "James Miller",
    role: "Founder",
    store: "Outdoor Adventure Co.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    quote: "The competitor analysis feature alone is worth the price. We're always one step ahead now.",
    metrics: {
      traffic: "+223%",
      revenue: "$44K/mo",
    },
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
      <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-black relative overflow-hidden px-4">
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
              TESTIMONIALS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white leading-tight px-4">
              Trusted by 5,000+ Stores
            </h2>
          </header>
          <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto px-4">
            Real results from real Shopify merchants
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-black/10 dark:border-white/10 hover:shadow-2xl hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-black dark:fill-white text-black dark:text-white" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-black/80 dark:text-white/80 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Metrics */}
                <div className="flex gap-4 mb-6 p-4 bg-black/5 dark:bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-black dark:text-white font-bold text-lg mb-1">
                      <TrendingUp className="h-4 w-4" />
                      {testimonial.metrics.traffic}
                    </div>
                    <div className="text-xs text-black/60 dark:text-white/60">Traffic Growth</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-black dark:text-white font-bold text-lg mb-1">
                      {testimonial.metrics.revenue}
                    </div>
                    <div className="text-xs text-black/60 dark:text-white/60">Monthly Revenue</div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10"
                  />
                  <div>
                    <div className="font-semibold text-black dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-black/60 dark:text-white/60">
                      {testimonial.role} at {testimonial.store}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-black dark:bg-white"
                    : "bg-black/20 dark:bg-white/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">4.9/5</div>
            <div className="text-slate-600 dark:text-slate-400">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">5,000+</div>
            <div className="text-slate-600 dark:text-slate-400">Active Stores</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">$18M</div>
            <div className="text-slate-600 dark:text-slate-400">Monthly Revenue Generated</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
