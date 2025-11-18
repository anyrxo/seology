'use client';

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, render a placeholder
  if (!mounted) {
    return (
      <div className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 p-1">
        <div className="absolute top-1/2 left-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 shadow-md" />
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1/2 left-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === 'light' ? (
          <Sun className="w-2.5 h-2.5 text-yellow-500" />
        ) : (
          <Moon className="w-2.5 h-2.5 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
}


