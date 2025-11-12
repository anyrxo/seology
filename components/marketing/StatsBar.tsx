'use client';

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Store, TrendingUp, Zap, Target } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function StatItem({ icon, value, suffix = "", label, delay = 0 }: StatItemProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const controls = animate(count, value, {
            duration: 2,
            delay,
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [count, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center gap-3"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white pulse-scale">
        {icon}
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          <motion.span>{rounded}</motion.span>
          {suffix}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem
            icon={<Store className="h-8 w-8" />}
            value={5000}
            suffix="+"
            label="Shopify Stores"
            delay={0}
          />
          <StatItem
            icon={<Target className="h-8 w-8" />}
            value={2.5}
            suffix="M+"
            label="Keywords Optimized"
            delay={0.1}
          />
          <StatItem
            icon={<TrendingUp className="h-8 w-8" />}
            value={156}
            suffix="%"
            label="Avg Traffic Increase"
            delay={0.2}
          />
          <StatItem
            icon={<Zap className="h-8 w-8" />}
            value={24}
            suffix="/7"
            label="Automated Optimization"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
