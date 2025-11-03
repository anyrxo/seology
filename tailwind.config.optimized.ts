import type { Config } from "tailwindcss";

const config: Config = {
  // Content paths for PurgeCSS
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Enable dark mode support
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Add custom animation for skeleton loaders
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
    },
  },

  plugins: [],

  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },

  // Reduce CSS output size
  corePlugins: {
    // Disable unused utilities
    preflight: true,
    container: true,
    accessibility: true,
    // You can disable specific utilities you're not using
    // Example: float: false,
  },
};

export default config;
