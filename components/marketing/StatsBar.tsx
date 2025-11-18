'use client';

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { TrendingUp, Zap, Target } from "lucide-react";

interface StatItemProps {
  icon?: React.ReactNode;
  image?: string;
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function StatItem({ icon, image, value, suffix = "", label, delay = 0 }: StatItemProps) {
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
      {image ? (
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + i * 0.1, duration: 0.3 }}
              className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border-2 border-black/20 dark:border-white/20 shadow-lg overflow-hidden"
            >
              <Image
                src={`${image}${i}`}
                alt="User"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white pulse-scale">
          {icon}
        </div>
      )}
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-black text-black dark:text-white">
          <motion.span>{rounded}</motion.span>
          {suffix}
        </div>
        <div className="text-sm text-black/60 dark:text-white/60 mt-1">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="py-16 bg-white dark:bg-black border-y border-black/10 dark:border-white/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem
            image="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            value={5000}
            suffix="+"
            label="Active Users"
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
